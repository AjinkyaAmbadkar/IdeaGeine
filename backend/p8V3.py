import os
import json
import re
import logging
from typing import List, Dict, Union, Tuple
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_ollama import OllamaLLM, OllamaEmbeddings

logging.basicConfig(level=logging.INFO)

#############################
# Helper Functions
#############################
def extract_clean_json(raw_response: Union[str, Dict]) -> Union[List[Dict], Dict]:
    if isinstance(raw_response, dict):
        content = raw_response.get("text") or raw_response.get("message", {}).get("content", "")
    else:
        content = str(raw_response)
    content = re.sub(r"\\[nrt]", "", content).strip()
    content = re.sub(r'"([^"]*)":\s*(\d+)/10', r'"\1": \2', content)
    content = re.sub(r'\"', '"', content)
    json_match = re.search(r'(\[.*\]|\{.*\})', content, re.DOTALL)
    if not json_match:
        logging.error("❌ No valid JSON found in the response.")
        return {"idea_id": "Error", "composite_score": 0, "justification": "Could not extract JSON."}
    try:
        return json.loads(json_match.group(1))
    except json.JSONDecodeError as e:
        logging.error(f"❌ JSON decoding failed: {e}")
        return {"idea_id": "Error", "composite_score": 0, "justification": str(e)}

def load_ideas_from_txt(file_path: str) -> List[Document]:
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()
    blocks = text.split('---')
    return [Document(page_content=block.strip()) for block in blocks if block.strip()]

def experiment_text_splitting(documents: List[Document], chunk_size: int, chunk_overlap: int) -> List[Document]:
    splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(documents)

def build_vector_store(documents: List[Document], embedding_model: OllamaEmbeddings) -> FAISS:
    return FAISS.from_documents(documents, embedding_model)

def get_similar_ideas(vectorstore: FAISS, input_text: str, k: int = 3) -> str:
    try:
        similar_docs = vectorstore.similarity_search(input_text, k=k)
        return "\n".join([doc.page_content for doc in similar_docs])
    except Exception as e:
        logging.error(f"Error during similarity search: {e}")
        return ""

#############################
# Two-Phase ReAct Evaluation Functions
#############################
def react_plan_input_idea(
    input_idea: Dict,
    user_constraints: str,
    dataset_metrics: str,
    llm: OllamaLLM
) -> str:
    """
    Phase 1: Generate a chain-of-thought plan.
    The plan should indicate whether similar ideas need to be retrieved.
    Expected format (example):
      "Plan: I need to retrieve similar ideas. Action: RetrieveSimilar. Reasoning: ... "
    """
    prompt = f"""You are an expert evaluator of innovative ideas.
Please provide your chain-of-thought plan for evaluating the following idea.
Include in your plan whether you need to retrieve similar ideas from historical data.
Your response should contain a clear action statement:
either "Action: RetrieveSimilar" if you require additional context,
or "Action: NoRetrieve" if not.

Dataset Metrics: {dataset_metrics}
User Constraints: {user_constraints}
Input Idea: {input_idea["idea_text"]}

Your plan:"""
    response = llm.invoke(prompt)
    if isinstance(response, dict):
        plan = response.get("text", str(response))
    else:
        plan = response
    return plan.strip()

def react_finalize_input_idea(
    input_idea: Dict,
    user_constraints: str,
    dataset_metrics: str,
    additional_context: str,
    plan: str,
    llm: OllamaLLM
) -> Tuple[Dict, str]:
    """
    Phase 2: Produce the final evaluation given the plan and any additional context.
    Expected final answer format:
      "Final Answer: Composite Score: X/10 Justification: [your reasoning]"
    Returns a tuple: (parsed evaluation dict, final raw response text)
    """
    prompt = f"""You are an expert evaluator of innovative ideas.
Using the following information, produce your final evaluation for the idea.
Your answer must begin with "Final Answer:" and follow this exact format:
"Final Answer: Composite Score: X/10 Justification: [your reasoning]"
where X is a score out of 10.

Dataset Metrics: {dataset_metrics}
User Constraints: {user_constraints}
Input Idea: {input_idea["idea_text"]}

Additional Context: {additional_context}

Plan from previous step:
{plan}

Your final evaluation:"""
    response = llm.invoke(prompt)
    if isinstance(response, dict):
        final_text = response.get("text", str(response))
    else:
        final_text = response
    final_text = final_text.strip()
    score_match = re.search(r"Composite Score:\s*(\d+)/10", final_text)
    justification_match = re.search(r"Justification:\s*(.+)", final_text)
    evaluation = {
        "idea_id": input_idea["idea_id"],
        "composite_score": int(score_match.group(1)) if score_match else 0,
        "justification": justification_match.group(1).strip() if justification_match else "Justification not found."
    }
    return evaluation, final_text

def log_verbose_info(idea_id: str, plan: str, additional_context: str, final_text: str, evaluation: Dict):
    """
    Append the verbose chain-of-thought details to a log file.
    """
    log_entry = (
        f"==== Idea: {idea_id} ====\n"
        f"Plan:\n{plan}\n\n"
        f"Additional Context:\n{additional_context}\n\n"
        f"Final Evaluation (raw response):\n{final_text}\n\n"
        f"Parsed Evaluation:\n{json.dumps(evaluation, indent=2)}\n"
        "============================\n\n"
    )
    with open("react_verbose_log.txt", "a", encoding="utf-8") as f:
        f.write(log_entry)

def react_evaluate_input_idea_two_phase(
    input_idea: Dict,
    user_constraints: str,
    dataset_metrics: str,
    vectorstore: FAISS,
    llm: OllamaLLM
) -> Dict:
    """
    Two-phase evaluation:
      1. Planning: Generate a chain-of-thought plan.
      2. Finalization: Use the plan (and additional context if needed) to produce the final answer.
    Also logs the chain-of-thought verbose details to a text file.
    """
    plan = react_plan_input_idea(input_idea, user_constraints, dataset_metrics, llm)
    # Check if the plan requests similar ideas.
    if "Action: RetrieveSimilar" in plan:
        similar = get_similar_ideas(vectorstore, input_idea["idea_text"])
        additional_context = f"Similar Ideas: {similar}"
    else:
        additional_context = "No additional similar ideas retrieved."
    evaluation, final_text = react_finalize_input_idea(
        input_idea, user_constraints, dataset_metrics, additional_context, plan, llm
    )
    # Log the verbose chain-of-thought info.
    log_verbose_info(input_idea["idea_id"], plan, additional_context, final_text, evaluation)
    return evaluation

#############################
# Final Ranking Function
#############################
def final_ranking(evaluations: List[Dict], llm: OllamaLLM) -> List[Dict]:
    evaluations_str = "\n\n".join([
        f"Idea ID: {e['idea_id']}\nComposite Score: {e['composite_score']}/10\nJustification: {e['justification']}"
        for e in evaluations
    ])
    prompt = PromptTemplate(
        input_variables=["evaluations"],
        template=(
            "You are an expert in evaluating and ranking ideas. Ranking should be first based on the 'composite_score', higher the score better the idea! "
            "After that, judge the IDEAS with the same score based on the JUSTIFICATION they provided. Based on the evaluations provided, "
            "return the top 3 ideas strictly as a JSON list of objects with fields: idea_id, idea_summary, composite_score, justification.\n"
            "Evaluations:\n{evaluations}"
        )
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    try:
        response = chain.invoke({"evaluations": evaluations_str})
        return extract_clean_json(response)
    except Exception as e:
        logging.error(f"Error during final ranking: {e}")
        return [{"idea_id": "Error", "composite_score": 0, "justification": str(e)}]

def get_user_constraints(Input_form_json):
    """
    Collects constraints from the user-provided input JSON with predefined dropdown values.
    """
    Avai_eng_hrs = Input_form_json["Available Engineering Hours"]  # e.g., 50-100, "150-300", 300-450, 450-600, 600+
    current_budget_build = Input_form_json["Available Budget"]     # e.g., <10000, 10000-20000, 20000-30000, 30000-40000, >40000
    teams_available = Input_form_json["Number of Available Teams"] # e.g., 2, 3, 4, 5,>5;
    expected_timeline = Input_form_json["Expected Timeline"]       # e.g., 1-2, 2-4, 4-6, 6-8, 8-12"
    priority_focus = Input_form_json["Priority Focus Area"]        # e.g., Customer Experience, Operational Efficiency, Risk Reduction, Innovation

    user_constraints = (
        f"The user has approximately {Avai_eng_hrs} engineering hours available, "
        f"a budget of {current_budget_build}, and {teams_available} team(s) that can work on the project. "
        f"The expected delivery timeline is {expected_timeline} weeks, with a primary focus on {priority_focus.lower()}."
    )
    
    return user_constraints

#############################
# Main Function
#############################
def generate_top_ideas(input_form_json):
    input_ideas = [
  {
    "idea_id":1,
    "idea_title":"Introduce Optional Dark Mode",
    "idea_text":"Introduce an optional dark mode in the mobile app to reduce eye strain during night-time use",
    "Submitted_By_Age_Range":19,
    "Strategic_Alignment":"Mobile UX"
  },
  {
    "idea_id":2,
    "idea_title":"Allow Customers Checkout",
    "idea_text":"Allow customers to checkout without creating an account",
    "Submitted_By_Age_Range":30,
    "Strategic_Alignment":"Conversion Optimization"
  },
  {
    "idea_id":31,
    "idea_title":"Show Prices",
    "idea_text":"Show prices in the user's local currency and support popular local payment methods (e",
    "Submitted_By_Age_Range":26,
    "Strategic_Alignment":"Internationalization"
  },
  {
    "idea_id":32,
    "idea_title":"Implement Product Comparison",
    "idea_text":"Implement a product comparison feature where users can select multiple products and see their specifications side by side",
    "Submitted_By_Age_Range":30,
    "Strategic_Alignment":"Conversion Optimization"
  },
#   {
    
#     "idea_id": 30,
#     "idea_title": "Improve App Performance",
#     "idea_text": "Optimize the mobile application for faster loading times and smoother scrolling. Improving app performance, especially for users on older devices or slower networks, would decrease bounce rates and enhance user satisfaction.",
#     "Submitted_By_Age_Range": 45,
#     "Strategic_Alignment": "Mobile UX"
    
    
#   },
#   {
#     "idea_id":35,
#     "idea_title":"Enable Pre Order",
#     "idea_text":"Enable a pre-order option for popular items that are currently out of stock, allowing customers to reserve the product to be delivered once it\u2019s available again",
#     "Submitted_By_Age_Range":21,
#     "Strategic_Alignment":"Conversion Optimization"
#   },
]

    # input_form_json={
    # "Available Engineering Hours": "150-300",
    # "Available Budget": "20000-30000",
    # "Number of Available Teams": "3",
    # "Expected Timeline": "4-6",
    # "Priority Focus Area": "Customer Experience"
    # }

    user_constraints = get_user_constraints(input_form_json)
    dataset_metrics = (
        "Estimated Engineering Hours, Teams Required, Cross-Team Dependencies, Implementation Risk, "
        "Estimated Revenue Uplift, Estimated Users Affected, Impact on Retention, Strategic Alignment"
    )

    docs = load_ideas_from_txt("refined_ideas_with_separator.txt")
    chunks = experiment_text_splitting(docs, 2000, 600)
    logging.info(f"After splitting, historical data produced {len(chunks)} document chunks.")

    vectorstore = build_vector_store(chunks, OllamaEmbeddings(model="llama3.2"))
    logging.info("FAISS vector store built from historical data.")

    llm = OllamaLLM(model="qwen2.5:7b-instruct-q5_K_M")

    structured_evaluations = []
    for idea in input_ideas:
        logging.info(f"Processing {idea['idea_id']}...")
        evaluation = react_evaluate_input_idea_two_phase(idea, user_constraints, dataset_metrics, vectorstore, llm)
        structured_evaluations.append(evaluation)
        logging.info(f"Evaluation for {idea['idea_id']}:")
        logging.info(json.dumps(evaluation, indent=2))

    print("\n✅ All IDEA Evaluations:")
    print(json.dumps(structured_evaluations, indent=2))

    top_3 = final_ranking(structured_evaluations, llm)
    print("\n✅ Final Top 3 Ideas (Structured Output):")
    print(json.dumps(top_3, indent=2))
    return top_3

#generate_top_ideas()
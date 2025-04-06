# **IdeaGenie** 💡

**IdeaGenie** is an AI-driven decision assistant that evaluates and prioritizes innovation ideas collected through an Idea Portal. It combines a robust backend powered by an LLM-based evaluation engine with an interactive and intuitive React-based user interface.

---

**TABLE OF CONTENTS** 📚

- **Project Story** 📝
  - **About the Project** ℹ️
  - **Inspiration** ✨
  - **What It Does** ⚙️
  - **How We Built It** 🔨
  - **Challenges We Ran Into** 🚧
  - **Accomplishments We’re Proud Of** 🏆
  - **What We Learned** 🎓
  - **What’s Next for IdeaGenie** 🚀
- **Built With** 🛠️
- **Architecture** 🏗️
  - **Backend** 💻
  - **Frontend** 🖥️
- **Setup and Installation** 📦
  - **Backend Setup** ⚙️
  - **Frontend Setup** 🖥️
- **Usage** 🚦
- **Customization** 🎨
- **License** 📜

---

## **Project Story** 📝

### **About the Project** ℹ️

**IdeaGenie** was developed to streamline the process of prioritizing enhancement requests and innovation ideas. By leveraging AI and explainable decision-making, it mimics a real product or innovation team’s approach—balancing implementation effort, business impact, and ROI.

### **Inspiration** ✨

- **Identifying the Problem:** Organizations struggle to sift through overwhelming numbers of ideas.
- **Leveraging AI:** Using a ReAct (Reasoning + Action) framework with an LLM to inject intelligence into idea prioritization.
- **User-Centric Design:** Emphasis on a clear UI that not only ranks ideas but also explains the reasoning behind each decision.

### **What It Does** ⚙️

- **Idea Evaluation:** Analyzes ideas based on estimated implementation effort and potential ROI.
- **Feedback Loop:** Uses historical company data to improve recommendations over time.
- **Custom Constraints:** Incorporates business constraints to fine-tune the evaluation.
- **Explainability:** Provides detailed reasoning for the ranked ideas.
- **Interactive Dashboard:** Displays an engaging user interface for exploring ranked ideas and insights.

### **How We Built It** 🔨

- **Backend Development:**  
  - Developed a Flask API that exposes the evaluation service.
  - Created the core LLM evaluation module (`p8V3.py`) to process idea inputs and historical data.
  - Integrated a feedback loop to continuously refine recommendations.
  
- **Frontend Development:**  
  - Built a dynamic React-based dashboard.
  - Designed an intuitive interface to display evaluation results and reasoning.
  - Enabled interactive elements for adjusting business constraints and evaluation parameters.
  
- **Collaboration:** Combined expertise from product, engineering, and data science teams to create a comprehensive solution.

### **Challenges We Ran Into** 🚧

- **Data Integration:** Merging historical performance data with new idea submissions.
- **LLM Tuning:** Balancing automated reasoning with human interpretability.
- **UI/UX Design:** Ensuring that the decision-making process is transparent and accessible.
- **Scalability:** Creating a solution that scales with increasing idea submissions and data.

### **Accomplishments We’re Proud Of** 🏆

- Successfully integrating a state-of-the-art LLM to simulate ReAct-style reasoning.
- Developing an interactive dashboard that clearly explains the ranking decisions.
- Building a feedback loop that enhances the model's evaluation over time.
- Delivering a solution that is both technically advanced and user-friendly.

### **What We Learned** 🎓

- **Interdisciplinary Collaboration:** The value of merging insights from various domains.
- **Explainability in AI:** How critical it is to communicate the reasoning behind automated decisions.
- **Iterative Improvement:** The importance of continuous feedback in refining both backend logic and UI design.

### **What’s Next for IdeaGenie** 🚀

- **Enhanced Customization:** Allow users to save custom configurations and weight settings.
- **Expanded Data Integration:** Incorporate additional data sources to further refine evaluations.
- **Real-Time Feedback:** Develop real-time dashboards to monitor implemented ideas.
- **User Testing:** Gather further user feedback to drive future improvements.

---

## **Built With** 🛠️

- **Languages & Frameworks:** Python, JavaScript, React, HTML, CSS
- **Backend:** Flask, LLM integration (ReAct framework)
- **Frontend:** React, responsive design principles
- **APIs:** RESTful endpoints for idea evaluation

---

## **Architecture** 🏗️

### **Backend** 💻

- **LLM Evaluation Module (`p8V3.py`):**  
  Implements the core logic for evaluating ideas using historical data, feature ROI, and implementation effort. It employs a feedback loop that simulates a ReAct reasoning process.

- **Flask API (`main.py`):**  
  Exposes endpoints that accept idea submissions and business constraints, processes inputs via the LLM module, and returns the top three ideas along with detailed reasoning.

### **Frontend** 🖥️

- **User Interface:**  
  A React-based dashboard that displays ranked ideas and explains the decision-making process.
- **Interactivity:**  
  Enables business users to adjust evaluation parameters and view real-time updates.
- **Visual Design:**  
  The UI is designed for clarity and ease of use, as demonstrated in the provided screenshots.

---

## **Setup and Installation** 📦

### **Backend Setup** ⚙️

Clone the repository and set up a virtual environment:

```bash
git clone https://github.com/yourusername/ideagenie.git
cd ideagenie
python3 -m venv venv
source venv/bin/activate

#Install the required Dependencies
pip install -r requirements.txt

#Run Flask Application
python main.py

#Frontend Setup
cd frontend
npm install
npm start
```
## **Usage** 🚦

### **API Endpoint:**
- **/evaluate-ideas:**  
  Use this endpoint to send a JSON payload containing:
  - 💡 Idea submissions.
  - 📊 Historical feature data (ROI and implementation effort).
  - 🏢 Business constraints.

### **Interacting via the UI:**
- 👀 Access the interactive dashboard to view ranked ideas.
- ⚙️ Adjust evaluation parameters and view real-time updates.
- 📝 Examine detailed reasoning steps provided for each recommendation.

### **Feedback Loop:**
- 🔄 The system logs decisions and user feedback to continuously improve its evaluation logic.

---

## **Customization** 🎨

### **Parameter Tuning:**
- 🔧 Modify backend evaluation weights to adjust priorities between ROI and implementation effort.

### **UI Enhancements:**
- 🖼️ Customize the React dashboard with additional visualizations and interactive features.

### **Data Integration:**
- 🔌 Integrate more data sources or external APIs to further enrich the evaluation process.

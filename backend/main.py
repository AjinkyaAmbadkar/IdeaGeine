from flask import Flask, request, jsonify
from flask_cors import CORS
from p8V3 import generate_top_ideas
#from backend import generate_top_ideas

app = Flask(__name__)
CORS(app, origins=["*"])

@app.route('/')
def hello():
    return 'Hello, World! Flask is running on port 4600 🚀'

@app.route('/get_top_ideas', methods=['POST'])
def get_top_ideas():
    try:
        # Get incoming JSON payload
        payload = request.get_json()

        # Map it to the expected format
        input_form_json = {
            "Available Engineering Hours": payload.get("available_eng_hrs", ""),
            "Available Budget": payload.get("available_budget", ""),
            "Number of Available Teams": payload.get("teams_available", ""),
            "Expected Timeline": payload.get("expected_timeline", ""),
            "Priority Focus Area": payload.get("priority_focus", "")
        }

        top_ideas = generate_top_ideas(input_form_json)
        return jsonify(top_ideas)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Expose on local network, port 4600
    app.run(host='0.0.0.0', port=4600, debug=True)

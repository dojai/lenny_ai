
from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

client = OpenAI()

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def files(filename):
    return send_from_directory(".", filename)

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "Enter a question"}), 400

        response = client.responses.create(
            model="gpt-5.5",
            instructions="You are NOVOL AI, a friendly and helpful assistant. Answer questions clearly.",
            input=question
        )

        return jsonify({"answer": response.output_text})

    except Exception as e:
        print("AI error:", e)
        return jsonify({"error": "Could not get an AI response. Check your API configuration."}), 500


if __name__ == "__main__":
    app.run(debug=True)

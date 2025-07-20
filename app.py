from flask import Flask, render_template, request, jsonify
import os
import pandas as pd
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Function to check if review is fake (Dummy Logic for now)
def check_review_fake_or_real(review_text):
    if "fake" in review_text.lower():
        return "Fake"
    else:
        return "Real"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/analyze_single", methods=["POST"])
def analyze_single():
    data = request.get_json()
    review_text = data.get("review")

    if not review_text:
        return jsonify({"error": "No review text provided"}), 400

    result = check_review_fake_or_real(review_text)
    return jsonify({"review": review_text, "status": result})

@app.route("/analyze_multiple", methods=["POST"])
def analyze_multiple():
    file = request.files.get("file")
    url = request.form.get("url")

    reviews = []

    if url:
        try:
            # Simulate Amazon review extraction (Actual implementation needed)
            response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Extract review texts (This is a placeholder, real implementation may differ)
            review_elements = soup.select(".review-text-content span")
            reviews = [review.get_text(strip=True) for review in review_elements]
        except Exception as e:
            return jsonify({"error": "Failed to process URL"}), 400

    elif file:
        file_ext = file.filename.split(".")[-1].lower()
        if file_ext == "txt":
            reviews = file.read().decode("utf-8").split("\n")
        elif file_ext == "csv":
            df = pd.read_csv(file)
            reviews = df.iloc[:, 0].tolist()  # Assumes reviews are in the first column
        else:
            return jsonify({"error": "Unsupported file format"}), 400

    if not reviews:
        return jsonify({"error": "No reviews found"}), 400

    # Analyze reviews
    results = [{"review": r, "status": check_review_fake_or_real(r)} for r in reviews]
    
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

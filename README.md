# Review Authenticity Checker

This project provides a web application and a machine learning model to help determine the authenticity of product reviews. It can analyze single reviews or multiple reviews from a file (TXT or CSV) or a simulated Amazon URL.

---

## 🚀 Features

- **Single Review Analysis**: Input a single review text to get an immediate "Fake" or "Real" assessment.
- **Batch Review Analysis**: Upload a `.txt` file (one review per line) or a `.csv` file (reviews in the first column) for bulk analysis.
- **URL Review Extraction (Simulated)**: (Currently a placeholder) Simulate extraction of reviews from an Amazon product page URL for analysis.
- **Machine Learning Model**: A `RandomForestClassifier` model trained on hotel review data to classify reviews as fake or real.

---

## 📁 Project Structure

review-authenticity-checker/
├── app.py # Flask web application
├── train_model.ipynb # Jupyter notebook to train the ML model
├── requirements.txt # Python dependencies
├── model/ # Trained model (review_model.pkl) and vectorizer (vectorizer.pkl)
├── dataset/ # Dataset used for training (e.g., hotel_data.csv)
└── templates/ # HTML templates (index.html)


---

## ⚙️ Setup and Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd review-authenticity-checker

##Create a Virtual Environment (Recommended)

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


## Install Dependencies
pip install -r requirements.txt

## Prepare the Dataset
dataset/hotel_data.csv

##Train the Model
jupyter notebook


##This notebook will:

# Load and preprocess the dataset

# Train a RandomForestClassifier

# Save the model to model/review_model.pkl

# Save the TF-IDF vectorizer to model/vectorizer.pkl

# Make sure the model/ directory exists before saving.



##Run the Web App
python app.py


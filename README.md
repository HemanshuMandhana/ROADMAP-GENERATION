# 🚀 Roadmap Generation Web App

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-lightgrey.svg)](https://flask.palletsprojects.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini%20AI-API-orange)](https://aistudio.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-2.x-blue)](https://tailwindcss.com/)

A full-stack **Flask** web application that recommends courses and generates a **personalized AI-powered learning roadmap** based on user preferences.  
This was developed as a **college project**.

---

## ✨ Features

- 🔐 **Login Authentication** – Simple demo login to access the platform.
- 🎯 **Smart Course Recommendations** – Based on:
  - Category
  - Skill Level
  - Keywords
  - Price
  - Rating
- 🤖 **AI-Powered Roadmap Generation** – Uses **Google Gemini 1.5 Flash** to produce a structured, step-by-step learning plan.
- 📊 **Interactive UI** – Built with **TailwindCSS** & **GSAP animations**.
- 📅 **Dynamic Timeline** – Visual roadmap with milestones.
- 📱 **Responsive Design** – Works across devices.
- 🎨 **Custom Styles** – Smooth hover effects, micro-interactions, and scroll-triggered animations.

---

## 🛠 Tech Stack

**Backend:**
- Python 3.8+
- Flask
- Pandas
- scikit-learn
- Google Generative AI (Gemini)

**Frontend:**
- HTML5 (Jinja2 templates)
- Tailwind CSS
- GSAP & ScrollTrigger animations
- MDB UI Kit
- Custom CSS & JS

**Data:**
- CSV dataset (`table.csv`) containing course details

---

## 📂 Project Structure

```plaintext
ROADMAP-GENERATION/
│
├── app.py                 # Main Flask app
├── table.csv              # Course dataset
├── README.md
│
├── static/                # Static assets
│   ├── login_form_css.css
│   ├── login_form_js.js
│   ├── script.js
│   └── styles.css
│
└── templates/             # HTML templates
    ├── form_for_login.html
    ├── index.html
    ├── recommend.html
    └── roadmap.html
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/HemanshuMandhana/ROADMAP-GENERATION.git
cd ROADMAP-GENERATION
```
### 2️⃣ Create a Virtual Environment & Install Dependencies

```bash
python -m venv venv
source venv/bin/activate     # Mac/Linux
venv\Scripts\activate        # Windows

pip install -r requirements.txt
```

*(If `requirements.txt` is not available, manually install:)*

```bash
pip install flask pandas scikit-learn google-generativeai
```

### 3️⃣ Add Google API Key

Open `app.py` and replace:

```python
GOOGLE_API_KEY = "your-api-key-here"
```

Get your API key from [Google AI Studio](https://aistudio.google.com/).

### 4️⃣ Prepare Dataset

Ensure `table.csv` has:

```plaintext
Category, Level, Keywords, Price, Rating, Duration, Course Title, Instructor, Platform, Description
```

### 5️⃣ Run the App

```bash
python app.py
```

Open browser: **[http://127.0.0.1:5000/](http://127.0.0.1:5000/)**

---

## 📌 Recommendation Formula

```plaintext
0.4  * Keyword Similarity +
0.35 * Level Match +
0.10 * Price Similarity +
0.15 * Rating Similarity
```

---

## 📜 License

```plaintext
This project is for educational purposes.
You can freely modify and improve it.
```
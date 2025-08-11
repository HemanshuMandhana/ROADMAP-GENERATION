from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import google.generativeai as genai
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import re

app = Flask(__name__)

counter = 0  # This variable tracks whether the user has visited the login form

# Configure Google Generative AI
GOOGLE_API_KEY = "ADD_YOUR_API_KEY_HERE"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

# Load the course data
data = pd.read_csv(r'C:\Users\Owner\OneDrive\Desktop\Roadmap Generation\Roadmap Generation\table.csv')
data['Duration'] = data['Duration'].str.replace(' hours', '').astype(int)
data['Price'] = data['Price'].str.replace('Free', '0').str.replace('$', '').astype(int)

# Function to recommend courses
def recommend_courses_with_scores(user_inputs, data):
    user_df = pd.DataFrame([user_inputs])
    data_filtered = data[data['Category'] == user_inputs['Category']].reset_index(drop=True)
    if data_filtered.empty:
        return pd.DataFrame(columns=['Course Title', 'Similarity Score'])
    
    combined_data = pd.concat([data_filtered, user_df], ignore_index=True)
    tfidf_vectorizer = TfidfVectorizer()
    keywords_matrix = tfidf_vectorizer.fit_transform(combined_data['Keywords'].fillna(''))
    keywords_similarity = cosine_similarity(keywords_matrix)
    level_similarity = combined_data['Level'].iloc[:-1].apply(lambda x: 1 if x == user_inputs['Level'] else 0).values
    user_price = combined_data['Price'].iloc[-1]
    price_similarity = 1 / (1 + abs(combined_data['Price'].iloc[:-1].astype(int) - int(user_price)))
    user_rating = combined_data['Rating'].iloc[-1]
    rating_similarity = 1 / (1 + abs(combined_data['Rating'].iloc[:-1].astype(float) - float(user_rating)))
    combined_similarity = (
        0.4 * keywords_similarity[-1][:-1] +
        0.35 * level_similarity +
        0.1 * price_similarity +
        0.15 * rating_similarity
    )
    similarity_df = pd.DataFrame({
        'Course Title': data_filtered['Course Title'],
        'Similarity Score': combined_similarity
    }).sort_values(by='Similarity Score', ascending=False)
    return similarity_df

# Generate the roadmap
def generate_learning_roadmap(user_inputs):
    similarity_scores_df = recommend_courses_with_scores(user_inputs, data)
    top_courses = similarity_scores_df.head(3)['Course Title'].tolist()
    top_courses_df = data[data['Course Title'].isin(top_courses)]
    course_details = "\n".join([ 
        f"- **{row['Course Title']}** by {row['Instructor']} on {row['Platform']}: {row['Description']} "
        f"({row['Duration']} hours, rated {row['Rating']})"
        for _, row in top_courses_df.iterrows()
    ])
    
    prompt = f"""
    Based on the following courses, generate a roadmap for someone interested in {user_inputs['Category']}:

    {course_details}

    Structure the roadmap in sequential steps that build on each other, detailing each course as part of the learning path.
    No intro or outro from your side and make 3 paragraphs 250 words. Add 1. before first paragraph, 2 before 2nd paragraph and so on.  Don't use bold or any formatting.
    """
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    return response.text if hasattr(response, 'text') else response

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
    global counter
    # Redirect to login form if counter is not set
    if counter == 0:
        return redirect(url_for('form_for_login'))

    if request.method == 'POST':
        # Collect form data
        category = request.form.get('category')
        level = request.form.get('level')
        rating = request.form.get('rating')
        price = request.form.get('price')
        keywords = request.form.get('keywords')

        # Prepare user input for roadmap generation
        user_inputs = {
            'Category': category,
            'Level': level,
            'Keywords': keywords,
            'Rating': rating,
            'Price': price
        }
        print(f"Category: {category}, Level: {level}, Price: {price}, Rating: {rating}, Keywords: {keywords}")
    
        # Generate the learning roadmap
        roadmap_content = generate_learning_roadmap(user_inputs)
        response_text = roadmap_content

        # Split the content based on the numbering or a delimiter
        points = [point.strip() for point in response_text.split('\n') if point.strip()]  # or split by other delimiter if needed
        point_1 = points[0].strip()  # First point
        point_2 = points[1].strip()  # Second point
        point_3 = points[2].strip()  # Third point
        # Pass the generated roadmap content to the template
        return render_template('roadmap.html', point_1=point_1, point_2=point_2, point_3=point_3)

    # If it's a GET request, just render the form
    return render_template('recommend.html')

@app.route('/form_for_login', methods=['GET', 'POST'])
def form_for_login():
    global counter
    if request.method == 'POST':
        # Assuming login logic is successful (replace with actual logic)
        username = request.form['username']
        password = request.form['password']
        
        # Example login check (replace with actual authentication logic)
        if username == "arnav@gmail.com" and password == "12345":
            counter = 1
            # After successful login, redirect to the index page
            return redirect(url_for('index'))
        else:
            # Handle invalid login (optional)
            return "Invalid login credentials, try again."
    
    # If it's a GET request, simply render the login form
    return render_template('form_for_login.html')

@app.route('/roadmap.html', methods=['GET'])
def roadmap():
    return render_template('roadmap.html')

if __name__ == '__main__':
    app.run(debug=True)

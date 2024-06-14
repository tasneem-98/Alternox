from flask import Flask, render_template, request, redirect, url_for, jsonify, session, flash
import firebase_admin
import requests
from firebase_admin import credentials, auth, firestore

from model import Model
# Initialize Flask app
app = Flask(__name__)

cred = credentials.Certificate('alternox-cf1b9-firebase-adminsdk-xdsgg-df9205a29f.json')  # Path to your Firebase service account key JSON file
firebase_admin.initialize_app(cred)
# Initialize Firebase Admin SDK
db = firestore.client()


KEY = 'AIzaSyD9jPnBFbgxXjl7206VkX7aJbJIXpfOBFg'
recommendation = Model()
user = []

import secrets

app.secret_key = secrets.token_hex(16)  # Generate a random 16-byte secret key


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    
    try:
        # Sign in the user with email and password
        params = {"email":email, "password":password}
        response = requests.post(f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={KEY}", json=params)
        
        if response.status_code != 200:
            return redirect(url_for('index', error='Authentication failed. Please check your credentials.'))

        # Get the user's UID from the response data
        user_data = response.json()
        uid = user_data.get('localId')

        # Retrieve user's name from Firestore based on UID
        user_ref = db.collection('users').document(uid)
        user_data = user_ref.get().to_dict()
        
        if user_data:
            user_name = user_data.get('name')
            # Store user_name in session
            session['user_name'] = user_name
            return redirect(url_for('index'))

        return redirect(url_for('index'))

    except Exception as e:
        # Handle authentication errors
        return redirect(url_for('index', error=str(e)))

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_name', None)
    return redirect(url_for('index'))

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form['signupName']
    email = request.form['signupEmail']
    password = request.form['signupPassword']
    confirm_password = request.form['confirmsignupPassword']

    print("password: ", password)
    print("confirm_password: ", confirm_password)

    if password != confirm_password:
        return redirect(url_for('index', error='Passwords do not match'))

    try:
        # Create a new user with email and password
        user = auth.create_user(email=email, password=password)

        # Store additional user information in Firestore
        user_ref = db.collection('users').document(user.uid)
        user_ref.set({
            'name': name,
            'email': email
            # Add more fields as needed
        })

        return redirect(url_for('index', message='Sign up successful! Please log in.'))

    except Exception as e:
        # Handle sign-up errors
         return redirect(url_for('index', error=str(e)))



# Define data as a global variable
data = []
@app.route("/medicine", methods=['POST', 'GET'])
def medicine():
    global data  # Access the global data variable
    if request.method == 'POST':
        manufacturer = request.form['manufacturer']
        price = request.form['price']
        if price == "" or price == 0:
            price = float(1)
        else:
            price = float(price)
        #price = float(request.form['price'])
        print("The form price is", price)
        medicineType = request.form['Size']
        dosage = request.form['dosage']
        
        user_input = str(manufacturer) + " " + str(price)+ " " + str(medicineType)+ " " + str(dosage)
        recommendations = recommendation.predict(user_input)
        recommendations = recommendations.rename(columns={'brand name': 'brand_name', 'dosage form': 'dosage_form', 'mg_ml': 'mg_ml'})
        recommendations['calculated_price'] = price - recommendations['price']
        recommendations['savings_percentage'] = (recommendations['calculated_price'] / price) * 100
        recommendations['savings_percentage'] = recommendations['savings_percentage'].round().astype(int)

        recommendations['similarity_percentage'] = recommendations['similarity_percentage'].round().astype(int)

        print(recommendations.head())
        # Clear previous data
        data.clear()
        
        # Convert DataFrame to list of dictionaries
        for index, row in recommendations.iterrows():
            item = {}
            for col in recommendations.columns:
                item[col] = row[col]
            data.append(item)
        print(type(data))
        return render_template("medicine.html", data=data, manufacturer_name = manufacturer, price_total = price, size_mg_ml = medicineType, dosage_form = dosage)
    else:
        return render_template("medicine.html")

@app.route('/get_medicine_data', methods=['GET'])
def get_medicine_data():
    id = request.args.get('id')
    medicine_data = data[int(id) - 1]
    return jsonify(medicine_data)

@app.route('/alphabet')
def alphabet():
    global data_alphabet
    data_alphabet = []  # Clear the list before appending new data
    
    clicked_alphabet = request.args.get('clicked_alphabet')
    recommendations = recommendation.filter_values(clicked_alphabet)
    #print(recommendations.head())  # Check if data is fetched correctly
    
    for index, row in recommendations.iterrows():
        item = {}
        for col in recommendations.columns:
            item[col] = row[col]
        data_alphabet.append(item)
    return render_template('alphabet.html', data=data_alphabet)


@app.route('/get_alphabet', methods=['POST'])
def get_alphabet():
    data = request.get_json()
    clicked_alphabet = data['clicked_alphabet']
    # Pass the clicked alphabet to alphabet.html
    return jsonify({'clicked_alphabet': clicked_alphabet})

@app.route('/get_alphabet_data', methods=['GET'])
def get_alphabet_data():
    id = request.args.get('id')
    medicine_data = data_alphabet[int(id) - 1]
    return jsonify(medicine_data)

@app.route('/success')
def success():
    return "Login successful!"

if __name__ == '__main__':
    app.run(debug=True)

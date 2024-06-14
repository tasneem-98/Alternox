const searchButtonmedicine = document.querySelector('.searchmedicine');

document.addEventListener("DOMContentLoaded", function() {
    const searchButtonmedicine = document.querySelector('.searchmedicine');
    searchButtonmedicine.addEventListener("click", function() {
        window.location.href = "/medicine";
    });
});

const homeButton = document.querySelector('.home');

document.addEventListener("DOMContentLoaded", function() {
    const homeButton = document.querySelector('.home');
    homeButton.addEventListener("click", function() {
        window.location.href = "/";
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const redirectToHomeButton = document.getElementById('redirectToHome');
    redirectToHomeButton.onclick = function() {
        window.location.href = "/";
    };
});

// Get all medicine cards
const medicineCards = document.querySelectorAll('.medicine-card');

// Loop through each card and attach click event listener
medicineCards.forEach(card => {
    const detailsButton = card.querySelector('.details-button');
    detailsButton.addEventListener('click', function() {
        // Get the data-id attribute of the clicked card
        const id = card.getAttribute('data-id');
        console.log(id)
        // Send an AJAX request to Flask to fetch data for this id
        fetch(`/get_medicine_data?id=${id}`)
            .then(response => response.json())
            .then(data => {
                // Populate the panel with the fetched data
                populatePanel(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});


/* // Get all medicine cards
const medicineAlphabetCards = document.querySelectorAll('.medicine-alphabet-card');

// Loop through each card and attach click event listener
medicineAlphabetCards.forEach(card => {
    const detailsButton = card.querySelector('.details_alphabet-button');
    detailsButton.addEventListener('click', function() {
        // Get the data-id attribute of the clicked card
        const id = card.getAttribute('data-id');
        console.log(id)
        console.log("hello")
        // Send an AJAX request to Flask to fetch data for this id
        fetch(`/get_alphabet_data?id=${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Check if data is received correctly
                // Populate the panel with the fetched data
                populatePanel(data);
            })
            .catch(error => console.error('Error fetching data:', error));

    });
}); */

// Get all medicine cards
const medicineAlphabetCards = document.querySelectorAll('.medicine-alphabet-card');

// Loop through each card and attach click event listener
medicineAlphabetCards.forEach(card => {
    card.addEventListener('click', function() {
        // Get the data-id attribute of the clicked card
        const id = card.getAttribute('data-id');
        console.log(id)
        console.log("hello")
        // Send an AJAX request to Flask to fetch data for this id
        fetch(`/get_alphabet_data?id=${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Check if data is received correctly
                // Populate the panel with the fetched data
                populatePanel(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});

// Function to populate the panel with data
function populatePanel(data) {
    console.log(data.manufacturer)
    document.getElementById('panel-manufacturer').value = data.manufacturer;
    document.getElementById('panel-price').value = data.price;
    document.getElementById('panel-chemicalComposition').value = data.slug;
    document.getElementById('panel-medicineType').value = data.type;
    document.getElementById('panel-dosage').value = data.dosage_form;
    document.getElementById('panel-otherDetails').value = data.generic;
    // Update other fields similarly
}

// Get the search button element
/* const searchButtonmedicine = document.querySelector('.searchmedicine');

document.addEventListener("DOMContentLoaded", function() {
    const searchButtonmedicine = document.querySelector('.searchmedicine');
    searchButtonmedicine.addEventListener("click", function() {
        window.location.href = "/medicine";
    });
}); */


// Select all elements with the class '.details-button'
const detailsButton = document.querySelectorAll('.medicine-alphabet-card')
// Iterate over each button and attach the event listener
detailsButton.forEach(button => {
    button.addEventListener('click', toggleSearchPanel);
});


const searchButtons = document.querySelectorAll('.details-button');
const searchPanel = document.getElementById('searchPanel');
const closeSearchButton = document.getElementById('closeSearchButton');

function toggleSearchPanel() {
    searchPanel.style.right = searchPanel.style.right === '0px' ? '-800px' : '0px';
}

// Iterate over each button and attach the event listener
searchButtons.forEach(button => {
    button.addEventListener('click', toggleSearchPanel);
});

closeSearchButton.addEventListener('click', toggleSearchPanel);



// login
function toggleLoginPanel() {
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');
    
    loginPanel.style.right = loginPanel.style.right === '0px' ? '-600px' : '0px';
    signupPanel.style.right = '-600px';
}

//sign up
function toggleSignupPanel() {
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');
    
    signupPanel.style.right = signupPanel.style.right === '0px' ? '-600px' : '0px';
    loginPanel.style.right = '-600px';
}

const loginButton = document.querySelector('.login');
const signupLink = document.querySelector('.signup-link');
const loginLink = document.querySelector('.login-link');

loginButton.addEventListener('click', toggleLoginPanel);
signupLink.addEventListener('click', toggleSignupPanel);
loginLink.addEventListener('click', toggleLoginPanel);

const closeLoginButton = document.getElementById('closeButton');
const closeSignupButton = document.getElementById('closeSignupButton');

closeLoginButton.addEventListener('click', toggleLoginPanel);
closeSignupButton.addEventListener('click', toggleSignupPanel);

function validateSignupForm(event) {
    event.preventDefault();
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmsignupPassword').value;
    const errorMessage = document.getElementById('signupError');

    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        errorMessage.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    document.getElementById('signupForm').submit();
}

signupForm.addEventListener('submit', validateSignupForm);


// validate login form
async function validateLoginForm(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('loginError');
    const KEY = 'AIzaSyD9jPnBFbgxXjl7206VkX7aJbJIXpfOBFg';  // Replace with your actual API key

    // Reset error message display
    errorMessage.style.display = 'none';

    const params = {
        email: email,
        password: password,
        returnSecureToken: true
    };

    try {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();

        console.log("ta blah data 01: ", data)

        if (!response.ok) {
            // Display a relevant error message based on the API response
            let errorMsg = 'Authentication failed. Please check your credentials.';
            if (data.error && data.error.message) {
                switch (data.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        errorMsg = 'Email not found. Please sign up.';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMsg = 'Invalid password. Please try again.';
                        break;
                    case 'USER_DISABLED':
                        errorMsg = 'User account is disabled.';
                        break;
                    // Add more cases based on API error responses
                }
            }
            errorMessage.textContent = errorMsg;
            errorMessage.style.display = 'block';
            return;
        }

        // Handle successful authentication
        errorMessage.style.display = 'none';
        alert('Login successful!');
        document.getElementById('loginForm').submit();

    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
    }
}

loginForm.addEventListener('submit', validateLoginForm);


// alphabets
function createAlphabetCircles() {
    const circlesRow = document.getElementById("circlesRow");

    for (let i = 65; i <= 90; i++) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("colCircle");

        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle");
        circleDiv.textContent = String.fromCharCode(i);

        // Attach click event listener to each circle
        circleDiv.addEventListener("click", function() {
            const clickedAlphabet = this.textContent;
            console.log("Clicked alphabet:", clickedAlphabet);
            
            // Send AJAX request to Flask route
            fetch('/get_alphabet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({clicked_alphabet: clickedAlphabet})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Redirect to alphabet.html with clicked alphabet as a URL parameter
                window.location.href = `/alphabet?clicked_alphabet=${data.clicked_alphabet}`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });

        colDiv.appendChild(circleDiv);
        circlesRow.appendChild(colDiv);
    }
}

// Call the function to create the alphabet circles
createAlphabetCircles();


// Get the login button element
const userloginButton = document.getElementById('loginButton');
// Get the span element containing the username
const usernameSpan = document.getElementById('username');

// Replace "Login" with the username
if (usernameSpan.textContent.trim() !== '') {
    loginButton.innerHTML = usernameSpan.textContent;
}


/* // Get the price slider
// Assuming priceSlider is already defined in your code
const priceSlider = document.getElementById("price");

// Define priceValue and get the element by its ID
const priceValue = document.getElementById("price-value");

// Add an event listener to the priceSlider to update priceValue when the slider value changes
priceSlider.addEventListener("input", function() {
    // Set the textContent of priceValue to the value of priceSlider
    priceValue.textContent = priceSlider.value;
});

const sizeSlider = document.getElementById("Size");

// Define priceValue and get the element by its ID
const sizeValue = document.getElementById("Size-value");

// Add an event listener to the priceSlider to update priceValue when the slider value changes
sizeSlider.addEventListener("input", function() {
    // Set the textContent of priceValue to the value of priceSlider
    sizeValue.textContent = sizeSlider.value;
}); */

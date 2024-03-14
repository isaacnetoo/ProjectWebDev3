const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const REPLACE_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;",
    "=": "&#x3D;",
};

console.log("this is contact form ");
function sanitize(input) {
    return input.replace(/[&<>"'`=]/g, (s) => REPLACE_MAP[s]);
}

function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
        alert('Please enter your name.');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    // Sanitize all inputs
    nameInput.value = sanitize(nameInput.value);
    console.log('Sanitized name:', nameInput.value);

    emailInput.value = sanitize(emailInput.value);
    console.log('Sanitized email:', emailInput.value);

    messageInput.value = sanitize(messageInput.value);
    console.log('Sanitized message:', messageInput.value);

    if (isValid) {
        // Form is valid, submit it (replace with your actual submission logic)
        console.log('Form submitted successfully!');
    }
}

form.addEventListener('submit', validateForm);

const form = document.getElementById('login-form');

function showHint(message, isError = false) {
    const passwordHint = document.getElementById('password-hint');
    if (!passwordHint) return;

    passwordHint.textContent = message;
    passwordHint.classList.toggle('error', isError);
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput ? passwordInput.value : '';
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
        showHint('Password is invalid.', true);
        return false;
    }

    showHint('Password is valid.');
    return true;
}

function loadStoredCredentials() {
    return JSON.parse(localStorage.getItem('strangerConnectUsers') || '[]');
}

function checkCredentials(email, password) {
    const users = loadStoredCredentials();
    return users.some((entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password);
}

async function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!emailInput || !passwordInput) {
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showHint('Please enter your email and password.', true);
        return;
    }

    if (!validatePassword()) {
        return;
    }

    try {
        const isValid = checkCredentials(email, password);

        if (!isValid) {
            showHint('No matching account found for those credentials.', true);
            return;
        }

        showHint('Login successful.');
        window.location.href = '../chat/chat.html';
    } catch (error) {
        showHint('Unable to read saved credentials.', true);
    }
}

if (form) {
    form.addEventListener('submit', handleLogin);
}

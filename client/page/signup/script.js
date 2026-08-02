const dobInput = document.getElementById('dob');
const ageInput = document.getElementById('age');
const form = document.getElementById('login-form');
const hintText = document.getElementById('hint-text');
const emailInput = document.getElementById('email');
const passwordConfirmInput = document.getElementById('password-confirm');
const nameInput = document.getElementById('name');

if (form) {
    form.noValidate = true;
}

function setHint(elementId, message, isError = false) {
    const hint = document.getElementById(elementId);
    if (!hint) return;

    hint.textContent = message;
    hint.classList.toggle('error', isError);
}

function calculateAge(dobValue) {
    const dob = new Date(dobValue);
    if (Number.isNaN(dob.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
    }

    return age;
}

function updateAge() {
    const age = calculateAge(dobInput.value);

    if (age === null) {
        ageInput.value = '';
        setHint('hint-text', 'Please select a valid date of birth.', true);
        return false;
    }

    ageInput.value = age >= 0 ? `${age}` : '';

    if (age < 18) {
        setHint('hint-text', 'Only users 18+ are allowed to login.', true);
        return false;
    }

    setHint('hint-text', 'You are eligible to continue.');
    return true;
}

function validateDateOfBirth() {
    const age = calculateAge(dobInput.value);

    if (!dobInput.value) {
        setHint('hint-text', 'Please enter your date of birth.', true);
        return false;
    }

    if (age === null || age < 18) {
        setHint('hint-text', 'Login is restricted to 18+ users only.', true);
        return false;
    }

    setHint('hint-text', 'You are eligible to continue.');
    return true;
}

function validateName() {
    const nameValue = nameInput.value.trim();
    const namePattern = /^[A-Za-z\s]+$/;

    if (!nameValue) {
        setHint('name-hint', 'Name is required.', true);
        return false;
    }

    if (!namePattern.test(nameValue)) {
        setHint('name-hint', 'Name can only contain letters and spaces.', true);
        return false;
    }

    setHint('name-hint', 'Name is valid.');
    return true;
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
        setHint('email-hint', 'Email is required.', true);
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        setHint('email-hint', 'Please enter a valid email address.', true);
        return false;
    }

    setHint('email-hint', 'Email is valid.');
    return true;
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!passwordValue) {
        setHint('password-hint', 'Password is required.', true);
        return false;
    }

    if (!passwordPattern.test(passwordValue)) {
        setHint('password-hint', 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.', true);
        return false;
    }

    setHint('password-hint', 'Password looks strong.');
    return true;
}

function validatePasswordConfirmation() {
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;
    const passwordConfirmValue = passwordConfirmInput.value;

    if (!passwordConfirmValue) {
        setHint('confirm-password-hint', 'Please confirm your password.', true);
        return false;
    }

    if (passwordValue !== passwordConfirmValue) {
        setHint('confirm-password-hint', 'Passwords do not match.', true);
        return false;
    }

    setHint('confirm-password-hint', 'Passwords match.');
    return true;
}

function validateForm(event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isDobValid = validateDateOfBirth();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordMatchValid = validatePasswordConfirmation();

    const isFormValid = isNameValid && isDobValid && isEmailValid && isPasswordValid && isPasswordMatchValid;

    if (isFormValid) {
        window.location.href = '../chat/chat.html';
    }
}

if (dobInput) {
    dobInput.addEventListener('change', updateAge);
    dobInput.addEventListener('blur', updateAge);
}

if (form) {
    form.addEventListener('submit', validateForm);
}

if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
}

if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('blur', validatePasswordConfirmation);
}

if (nameInput) {
    nameInput.addEventListener('blur', validateName);
}

const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);
}

if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('input', validatePasswordConfirmation);
}
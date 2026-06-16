const dobInput = document.getElementById('dob');
const ageInput = document.getElementById('age');
const form = document.getElementById('login-form');
const hintText = document.getElementById('hint-text');

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
        hintText.textContent = 'Please select a valid date of birth.';
        hintText.classList.add('error');
        return;
    }

    ageInput.value = age >= 0 ? `${age}` : '';

    if (age < 18) {
        hintText.textContent = 'Only users 18+ are allowed to login.';
        hintText.classList.add('error');
    } else {
        hintText.textContent = 'You are eligible to continue.';
        hintText.classList.remove('error');
    }
}

function validateAge(event) {
    const age = calculateAge(dobInput.value);
    if (age === null || age < 18) {
        event.preventDefault();
        hintText.textContent = 'Login is restricted to 18+ users only.';
        hintText.classList.add('error');
    }
}

if (dobInput) {
    dobInput.addEventListener('change', updateAge);
    dobInput.addEventListener('blur', updateAge);
}

if (form) {
    form.addEventListener('submit', validateAge);
}

function validatePassword(event){
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    const passwordHint = document.getElementById('password-hint');
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

    if (!passwordPattern.test(password)) {
        passwordHint.textContent = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
        passwordHint.classList.add('error');
    } else {
        passwordHint.textContent = 'Password is valid.';
        passwordHint.classList.remove('error');
    }
}
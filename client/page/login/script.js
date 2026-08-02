
const form = document.getElementById('login-form');
const hintText = document.getElementById('hint-text');









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
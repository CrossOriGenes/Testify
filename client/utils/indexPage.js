// set an initial empty list of candidates
let CANDIDATE_LIST = [];

// fetch the candidates list at load and reassign the array
window.addEventListener('load', () => {
    const data = localStorage.getItem('Candidates');
    CANDIDATE_LIST = JSON.parse(data) || [];
});




const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    resetLoginForm();
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


/*
*
* registration form section
*
*/

const registrNameInput = document.getElementById('reg-name'),
    registrMailInput = document.getElementById('reg-mail'),
    registrPswrdInput = document.getElementById('reg-pswrd'),
    errRegsUName = document.getElementById('errRegsUName'),
    errRegsMail = document.getElementById('errRegsEmail'),
    errRegsPswrd = document.getElementById('errRegsPswrd');



// get username on change
registrNameInput.addEventListener('keyup', isNameValid);
// get lastname on change
registrPswrdInput.addEventListener('keyup', isPswrdValid);
// get mail-Id on change
registrMailInput.addEventListener('keyup', isMailValid);


// function to check username validity
function isNameValid() {
    const pattern = /^(?=.*\d).+$/;
    const val = registrNameInput.value

    if (val == '') {
        errRegsUName.innerText = `user name is required!`;
        registrNameInput.classList.add('invalid');
        return false;
    } else if (val.trim().length < 3) {
        errRegsUName.innerText = `user name too short!`;
        registrNameInput.classList.add('invalid');
        return false;
    }
    else {
        if (pattern.test(val)) {
            errRegsUName.innerText = `Improper user name!`;
            registrNameInput.classList.add('invalid');
            return false;
        }
        else {
            errRegsUName.innerText = ``;
            registrNameInput.classList.remove('invalid');
            return true;
        }
    }
}

// function to check email validity
function isMailValid() {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const val = registrMailInput.value;

    if (val == '') {
        errRegsMail.innerText = `Email is required!`;
        registrMailInput.classList.add('invalid');
        return false;
    } else if (val.trim().length <= 12) {
        errRegsMail.innerText = `Email too short!`;
        registrMailInput.classList.add('invalid');
        return false;
    }
    else {
        if (pattern.test(val)) {
            errRegsMail.innerText = ``;
            registrMailInput.classList.remove('invalid');
            return true;
        }
        else {
            errRegsMail.innerText = `Improper email Id!`;
            registrMailInput.classList.add('invalid');
            return false;
        }
    }
}

// function to check password validity
function isPswrdValid() {

    let val = registrPswrdInput.value; //get the password value
    /* Regular Expressions */
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#$%^&*])');
    const minlength = new RegExp('(?=.{8,})');


    /* strength checking */
    function checkStrength(Value) {
        var i = 0
        if (Value.length > 6)
            i++
        if (Value.length >= 10)
            i++
        if (/[A-Z]/.test(Value))
            i++
        if (/[0-9]/.test(Value))
            i++
        if (/[A-Za-z0-8]/.test(Value))
            i++
        return i
    }

    /* set strong weak or medium according to size */
    let strength = checkStrength(val);

    if (strength == 0 || val == "") {
        errRegsPswrd.innerHTML = `Password is Required!`;
        registrPswrdInput.style.border = '';
        registrPswrdInput.classList.add('invalid');
        return false;
    }
    if (strength <= 2) {
        errRegsPswrd.innerHTML = ``;
        registrPswrdInput.classList.add('invalid');
        return false;
    }
    else if (strength >= 2 && strength <= 4) {
        errRegsPswrd.innerHTML = ``;
        registrPswrdInput.classList.remove('invalid');
        registrPswrdInput.style.border = '2.2px solid #ffd634';
        registrPswrdInput.style.backgroundColor = '#fbeeba';
        return false;
    }
    else {
        if (lower.test(val) && upper.test(val) && number.test(val) && special.test(val) && minlength.test(val)) {
            errRegsPswrd.innerHTML = ``;
            registrPswrdInput.classList.remove('invalid');
            registrPswrdInput.style.border = '2.2px solid #01e701';
            registrPswrdInput.style.backgroundColor = '#a7ffa7';
            return true;
        } else {
            errRegsPswrd.innerHTML = `Improper password!`;
            registrPswrdInput.classList.add('invalid');
            return false;
        }
    }

}

const registerForm = document.getElementById('signup-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isMailValid() && isNameValid() && isPswrdValid()) {

        const data = new FormData(registerForm);
        const entries = Object.fromEntries(data);
        const newCandidate = {
            id: Math.random().toString(16).substring(2, 10),
            ...entries
        };
        CANDIDATE_LIST.push(newCandidate);
        localStorage.setItem('Candidates', JSON.stringify(CANDIDATE_LIST));

        console.log(newCandidate);
        resetForm();
        signInButton.click();
    } else {
        return;
    }

});

function resetForm() {
    registerForm.reset();
    registrPswrdInput.classList.remove('invalid');
    registrPswrdInput.style.border = '';
    registrPswrdInput.style.backgroundColor = '';
    errRegsPswrd.innerHTML = '';
}


/*
*
* login form section
*
*/

const loginMailInput = document.getElementById('login-mail'),
    loginPswrdInput = document.getElementById('login-pswrd'),
    errLoginMail = document.getElementById('errLoginMail'),
    errLoginPswrd = document.getElementById('errLoginPswrd');

// get login mail Id
loginMailInput.addEventListener('keyup', isMailExists);
// get login password
loginPswrdInput.addEventListener('keyup', isPasswordExists);

function isMailExists() {
    const val = loginMailInput.value;

    if (val == "") {
        errLoginMail.innerText = `Email is required!`;
        loginMailInput.classList.add('invalid');
        return false;
    }
    else {
        errLoginMail.innerText = ``;
        loginMailInput.classList.remove('invalid');
        return true;
    }
}

function isPasswordExists() {
    let val = loginPswrdInput.value;

    if (val == "") {
        errLoginPswrd.innerHTML = `Password is Required!`;
        loginPswrdInput.style.border = '';
        loginPswrdInput.classList.add('invalid');
        return false;
    }
    else {
        errLoginPswrd.innerHTML = ``;
        loginPswrdInput.classList.remove('invalid');
        return true;
    }
}


const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isMailExists() && isPasswordExists()) {

        const data = new FormData(loginForm);
        const entries = Object.fromEntries(data);

        const isCandidateExists = CANDIDATE_LIST.find(candt => candt.email === entries.mail);
        const isPasswordSame = isCandidateExists.password === entries.pswrd;

        if (isCandidateExists) {
            if (isPasswordSame) {
                resetLoginForm();
                window.location.href = "./hero.html";
            } else {
                const alertDiv = document.querySelector('.alert');
                if (!alertDiv) {
                    createAlert();
                }
                return;
            }
        } else {
            createAlert();
            return;
        }
    } else {
        return;
    }

});

function resetLoginForm() {
    loginForm.reset();
    loginPswrdInput.classList.remove('invalid');
    loginPswrdInput.style.border = '';
    loginPswrdInput.style.backgroundColor = '';
    errLoginPswrd.innerHTML = '';
    const alertDiv = document.querySelector('.alert');
    if (alertDiv) {
        loginForm.removeChild(alertDiv);
    }
}

function createAlert() {
    const alertDiv = document.createElement('div');
    alertDiv.setAttribute("class", "alert");
    alertDiv.classList.add("alert-danger");
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = "<p>Username/password is incorrect!<p>";
    loginForm.append(alertDiv);
}

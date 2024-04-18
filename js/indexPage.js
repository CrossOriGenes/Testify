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

//sets the panel slider left/right for login or signup as toggled
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

    if (val == '') { //if username is empty
        errRegsUName.innerText = `user name is required!`;
        registrNameInput.classList.add('invalid');
        return false;
    } else if (val.trim().length < 3) { //if username length is < 3
        errRegsUName.innerText = `user name too short!`;
        registrNameInput.classList.add('invalid');
        return false;
    }
    else {
        if (pattern.test(val)) { //if username doesn't match string pattern
            errRegsUName.innerText = `Improper user name!`;
            registrNameInput.classList.add('invalid');
            return false;
        }
        else { //valid username
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

    if (val == '') { //if email is empty
        errRegsMail.innerText = `Email is required!`;
        registrMailInput.classList.add('invalid');
        return false;
    } else if (val.trim().length <= 12) { //if email length is < 3
        errRegsMail.innerText = `Email too short!`;
        registrMailInput.classList.add('invalid');
        return false;
    }
    else {
        if (pattern.test(val)) { //if email doesn't match string pattern
            errRegsMail.innerText = ``;
            registrMailInput.classList.remove('invalid');
            return true;
        }
        else { //valid email
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

    if (strength == 0 || val == "") { //if password is empty
        errRegsPswrd.innerHTML = `Password is Required!`;
        registrPswrdInput.style.border = '';
        registrPswrdInput.classList.add('invalid');
        return false;
    }
    if (strength <= 2) { //if password length is <= 2 
        errRegsPswrd.innerHTML = ``;
        registrPswrdInput.classList.add('invalid');
        return false;
    }
    else if (strength >= 2 && strength <= 4) { //if password length is between 2 or 4
        errRegsPswrd.innerHTML = ``;
        registrPswrdInput.classList.remove('invalid');
        registrPswrdInput.style.border = '2.2px solid #ffd634';
        registrPswrdInput.style.backgroundColor = '#fbeeba';
        return false;
    }
    else { //valid password
        if (lower.test(val) && upper.test(val) && number.test(val) && special.test(val) && minlength.test(val)) {
            errRegsPswrd.innerHTML = ``;
            registrPswrdInput.classList.remove('invalid');
            registrPswrdInput.style.border = '2.2px solid #01e701';
            registrPswrdInput.style.backgroundColor = '#a7ffa7';
            return true;
        } else { //if password doesn't match conditions
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

        //check if a previous candidate with same mail Id exists or not 
        const isCandidateExists = CANDIDATE_LIST.find(candt => candt.email === entries.email);
        //get the alert popup
        const alertDiv = document.querySelector('#signup-form .alert');

        if (isCandidateExists) { //if an existing candidate is found
            if (!alertDiv) {
                createAlert("A candidate with this email already exists!", "signup");
            }
            return;
        } else {
            //register a new candidate
            const newCandidate = {
                id: Math.random().toString(16).substring(2, 10),
                ...entries
            };
            CANDIDATE_LIST.push(newCandidate);
            localStorage.setItem('Candidates', JSON.stringify(CANDIDATE_LIST)); //store in the localstorage 

            console.log(newCandidate);
            resetForm(); //reset the form
            signInButton.click(); //auto shift to the login panel 
        }
    } else {
        return;
    }

});

function resetForm() { //reset the entire form
    registerForm.reset();
    registrPswrdInput.classList.remove('invalid');
    registrPswrdInput.style.border = '';
    registrPswrdInput.style.backgroundColor = '';
    errRegsPswrd.innerHTML = '';
    const alertDiv = document.querySelector('#signup-form .alert');
    if (alertDiv) {
        registerForm.removeChild(alertDiv);
    }
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

    if (val == "") { //if email is empty
        errLoginMail.innerText = `Email is required!`;
        loginMailInput.classList.add('invalid');
        return false;
    }
    else { // email is provided
        errLoginMail.innerText = ``;
        loginMailInput.classList.remove('invalid');
        return true;
    }
}

function isPasswordExists() {
    let val = loginPswrdInput.value;

    if (val == "") { //if password is empty
        errLoginPswrd.innerHTML = `Password is Required!`;
        loginPswrdInput.style.border = '';
        loginPswrdInput.classList.add('invalid');
        return false;
    }
    else { //password is provided
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

        //check for the mail Id from the existing candidates list
        const isCandidateExists = CANDIDATE_LIST.find(candt => candt.email === entries.mail);

        if (!isCandidateExists) { //if candidate is not registered till now
            createAlert("Candidate doesn't exists!", "login");
            return;
        }
        //candidate is found but passwords unmatched
        const isPasswordSame = isCandidateExists.password === entries.pswrd;
        if (isCandidateExists && !isPasswordSame) {
            const alertDiv = document.querySelector('#login-form .alert');
            if (!alertDiv) { //create a brand new alert if there is none
                createAlert("Username/password is incorrect!", "login");
            } else { //override the alert message of the existing
                alertDiv.innerHTML = "<p>Username/password is incorrect!</p>";                
            }
            return;
        } else { //all candidate credentials matched and redirected to homepage
            resetLoginForm();
            window.location.href = "./hero.html";
        }
    }
});

//function to reset login form 
function resetLoginForm() {
    loginForm.reset();
    loginPswrdInput.classList.remove('invalid');
    loginPswrdInput.style.border = '';
    loginPswrdInput.style.backgroundColor = '';
    errLoginPswrd.innerHTML = '';
    const alertDiv = document.querySelector('#login-form .alert');
    if (alertDiv) {
        loginForm.removeChild(alertDiv);
    }
}

//function to create a brand new alert popup
function createAlert(msg, type) {
    const alertDiv = document.createElement('div');
    alertDiv.setAttribute("class", "alert");
    alertDiv.classList.add("alert-danger");
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `<p>${msg}<p>`;
    if (type === "login") {
        loginForm.append(alertDiv);
    } else {
        registerForm.append(alertDiv);
    }
}

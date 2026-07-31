/*-------------Accessing the elements------------- */

const name = document.querySelector('#name');
const mail = document.querySelector('#mail');
const pass = document.querySelector('#pass');
const signup = document.querySelector('#signup');
const validity = document.querySelector('#validity');

/*--------------*/

const email_pattern = /^[a-zA-Z0-9.+_%&*-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

mail.addEventListener('input', function(){
    const typedValue = this.value;

    const isValid = email_pattern.test(typedValue);

    if(isValid){
        validity.textContent = "Valid E-mail";
        validity.style.color = 'green';
        signup.disabled = false;
    }else{
        validity.textContent = "Enter a valid E-mail";
        validity.style.color = 'red';
        signup.disabled = true;
    }
})

/*--------------Creating Object------------------- */

const newUserINFO = {};

signup.addEventListener('click', function() {
    const userName = name.value;
    const Email = mail.value;
    const userPass = pass.value;

    newUserINFO.Userame = userName;
    newUserINFO.mail = Email;
    newUserINFO.Password = userPass;
})

console.log(newUserINFO);
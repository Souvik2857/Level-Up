/*----- variable declaration section--------*/


const userEmail = document.querySelector('#Email');
const userPass = document.querySelector('#password');
const feedback = document.querySelector('#confirm');
const btn = document.querySelector('#btn');


/*------------Email Validation Section-----------*/


const email_pattern = /^[a-zA-Z0-9.+_%&*-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

userEmail.addEventListener('input', function(){
    const typedVal = this.value;

    const isValid = email_pattern.test(typedVal);

    if(isValid){
        feedback.textContent = " valid ";
        feedback.style.color = 'green';
        btn.disabled = false;
    }else{
        feedback.textContent = "Not Valid Email";
        feedback.style.color = 'red';
        btn.disabled = true;
    }
})

/*------------------Input Saving Section----------------*/

const userINFO = {};

btn.addEventListener('click', function(){
    const mail = userEmail.value;
    const pass = userPass.value;

    userINFO.Email = mail;
    userINFO.Password = pass;
})

console.log(userINFO);
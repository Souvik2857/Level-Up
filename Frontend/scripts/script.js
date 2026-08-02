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

async function validateUser() {
    const res=await fetch('http://localhost:5000/api/login',{method:'POST',headers:{
        'Content-Type':'application/json'
    },body:JSON.stringify(userINFO)});
    const data=await res.json();
    return data;
}

const userINFO = {};

btn.addEventListener('click', async function(){
    const mail = userEmail.value;
    const pass = userPass.value;

    userINFO.email = mail;
    userINFO.password = pass;
    const value=await validateUser();
    
    if(value.isNew===true){
        window.location.href="signup.html"
    }
    if(value.success===true){
        window.location.href="dashboard.html"
    }
    if(value.success===false){
        feedback.style.color='red'
        feedback.textContent=`${value.message}`
    }

    
})
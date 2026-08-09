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
async function saveUserData() {
    validity.textContent="Verifying your gmail";
    const res=await fetch('http://localhost:5000/api/register',{method:'POST',headers:{
        "Content-type":"application/json"
    },body:JSON.stringify(newUserINFO)});
    const data=await res.json();
    return data;
    
}

const newUserINFO = {};

signup.addEventListener('click', async function() {
    const userName = name.value;
    const Email = mail.value;
    const userPass = pass.value;

    newUserINFO.username = userName;
    newUserINFO.email = Email;
    newUserINFO.password = userPass;
    const result=await saveUserData();
    if(result.success===true){
        alert('We sent a security pin to you')
        window.location.href='dashboard.html'
    }
    else if(result.status===404){
        validity.style.color='red';
        validity.textContent=`${result.message}`
    }
    else if(result.success===false){
        validity.textContent=`User is already exists`
    }

})
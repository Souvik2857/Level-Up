/*----------------Accessing the elements-----------------*/
const addTask = document.querySelector("#add-task");
const taskBox = document.querySelector("#task-box");
const taskDate = document.querySelector("#task-date");
const taskSpace = document.querySelector("#task-space");
const taskStatus = document.querySelector("#task-status");
const subChoose = document.querySelector("#sub-choose");
const subEnter = document.querySelector("#sub-enter");
const exp = document.querySelector("#exp");
const endBtn = document.querySelector("#finalise");
const emailBox = document.querySelector("#name-box");
const logout=document.querySelector('#logout')
const level=document.querySelector('#level')
const xp=document.querySelector('#xp')
//On page load function to get user saved data

function getData(){
let response = parseInt(prompt("Enter your Security key"));
  while (isNaN(response)) {
    response = parseInt(prompt("Enter a proper number"));
  }
  getUserData(response);
}
document.addEventListener("DOMContentLoaded", ()=>{
  getData();
});
async function getUserData(response) {
  const onLoadres = await fetch("http://localhost:5000/api/user/dashboard", {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ pin: response }),
  });
  const onLoadData = await onLoadres.json();
  if(onLoadData.status==false){
    alert("Invalid pin try again");
    getData()
    return
  }
  emailBox.innerHTML = `Welcome ${onLoadData.email}`;
  level.innerHTML=`${onLoadData.rank}`
  xp.innerHTML=`${onLoadData.XP}`
  /*--------------------Creating subject choosing object-------------*/
  let userSub = { subject: onLoadData.subject ? onLoadData.subject : null };
  let enter = 0;
  if (userSub.subject === null) {
    subEnter.addEventListener("click", function () {
      const enterVal = subChoose.value;

      if (enterVal.length === 0) {
        alert("Enter a subject!");
        enter = 0;
        return;
      }

      enter = 1;
      userSub.subject = enterVal;
      userSub.time = Date();

      /*------------When the user will enter their subject---------------------*/

      if (enter === 1) {
        subChoose.style.textDecoration = "line-through";
        subChoose.style.backgroundColor = "transparent";
        subChoose.disabled = true;
        subChoose.style.color = "#475569";
        subEnter.disabled = true;
        subEnter.style.background = "transparent";
      }
    });
  } else {
    subChoose.value = userSub.subject;
    subChoose.style.textDecoration = "line-through";
    subChoose.style.backgroundColor = "transparent";
    subChoose.disabled = true;
    subChoose.style.color = "#475569";
    subEnter.disabled = true;
    subEnter.style.background = "transparent";
  }

  /*------------Date-value object---------------*/

  function formatDate(dateString) {
    if (!dateString) {
      return "no date";
    }

    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  /*-------------Count of the total tasks User created--------------------*/
  let taskList=[];
  let userTasks=onLoadData.tasks;
  if(userTasks.length!=0){
    taskList.push(...userTasks);
  }
  function countCompletedTasks() {
    let count = 0;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].completed) {
        count++;
      }
    }
    return count;
  }

  /*---------Display Function------------ */

  function display() {
    const totalTasks = taskList.length;
    /*-----------------Task Completion Counter----------------*/
    const completedTasks = countCompletedTasks();

    if (totalTasks === 0) {
      taskStatus.textContent = "📋 0 tasks";
      taskStatus.style.color = "#5d8fecdd";
    } else if (completedTasks === totalTasks) {
      taskStatus.textContent = `${completedTasks}/${totalTasks} Tasks done!`;
      taskStatus.style.color = "#5d8fecdd";
    } else {
      taskStatus.textContent = ` ${completedTasks}/${totalTasks} tasks done`;
      taskStatus.style.color = "#5d8fecdd";
    }

    /*--------------Clearing The Container----------------*/
    taskSpace.innerHTML = "";

    if (taskList.length === 0) {
      taskSpace.innerHTML =
        '<p style="color: #475569; text-align: center; padding: 20px;">No tasks yet. Add one above!</p>';
      return;
    }

    /*--------------Display Tasks--------------------------*/
    for (let i = 0; i < taskList.length; i++) {
      /*----------------Checkbox display----------------------*/
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = taskList[i].completed;
      if(taskList[i].completed){
        checkbox.disabled=true
      }
      checkbox.style.marginRight = "10px";
      checkbox.style.width = "18px";
      checkbox.style.height = "18px";
      checkbox.style.accentColor = "#4f7df3";
      checkbox.style.cursor = "pointer";

      /*---------------Making the Checkbox Work properly--------------*/
      //function for saving the checkbox data if clicked and if true

      async function checkedBox(taskList) {
        const res=await fetch('http://localhost:5000/api/updateState',{method:'PATCH',headers:{
          'Content-Type':'application/json'
        },body:JSON.stringify({email:onLoadData.email,tasks:taskList})});
        const result=await res.json();
        if(result.status===501){
          alert("There is a problem in server please try again later");
        }      
      }
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskList[i].completed = true;
          checkbox.disabled = true;
          checkedBox(taskList)
          display();
        }
      });

      const taskElement = document.createElement("p");
      taskElement.textContent = taskList[i].text;
      taskElement.style.color = "#e8edf5";
      taskElement.style.fontSize = "larger";
      taskElement.style.padding = "8px 12px";
      taskElement.style.margin = "4px 0";
      taskElement.style.height = "1.7rem";
      taskElement.style.width = "100%";
      taskElement.style.background = "#1a2332";
      taskElement.style.borderRadius = "8px";
      taskElement.style.borderLeft = "3px solid #4f7df3";

      /*-----------------Displaying the dates with the tasks--------------*/
      const dateElement = document.createElement("span");
      dateElement.textContent = `${formatDate(taskList[i].date)}`;
      dateElement.style.color = "#94a3b8";
      dateElement.style.fontSize = "0.87rem";
      dateElement.style.marginLeft = "8px";
      dateElement.style.fontWeight = "300";

      /*------------------Task completion code-----------------------*/
      if (taskList[i].completed) {
        taskElement.style.textDecoration = "line-through";
        taskElement.style.color = "#475569";
        taskElement.style.borderLeftColor = "#2ecc71";
      } else {
        taskElement.style.textDecoration = "none";
        taskElement.style.color = "#e8edf5";
        taskElement.style.borderLeftColor = "#4f7df3";
      }

      /*-------------------Task boxes styling--------------------*/
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.marginBottom = "6px";

      container.appendChild(checkbox);
      container.appendChild(taskElement);
      container.appendChild(dateElement);
      taskSpace.appendChild(container);
    }
  }

  /*-----------------Task Box content store-------------------*/
  if(taskList.length===0){
  addTask.addEventListener("click", function () {
    const typedVal = taskBox.value.trim();
    const selecteDate = taskDate.value;

    if (typedVal.length === 0) {
      alert("Enter a proper task!");
      return;
    }

    taskList.push({
      text: typedVal,
      completed: false,
      date: taskDate.value || new Date().toISOString().split("T")[0],
      data: Date(),
    });

    taskBox.value = "";
    taskDate.value = "";
    display();
  });
}else{
  display();
}
  /*-------------Making Enter Key work-------------------------*/
  taskBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask.click();
    }
  });

  /*--------------User Activity Stats--------------*/

  let userjourneyEXP = {
    userName: "Player",
    Rank: "E",
    Exp: 0,
    Streak: 0,
  };

  /*-----------------Final Button Function-----------*/
  async function setUserTasks(data) {
    const res = await fetch(
      "http://localhost:5000/api/user/dashboard/saveData",
      {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const getResponse = await res.json();

    if (getResponse.status === 404) {
      alert(`${getResponse.message}`);
    } else if (getResponse.status === 500) {
      alert("server is Busy please try again later");
    } else {
      alert("Tasks Saved Successfully");
    }
  }

  endBtn.addEventListener("click", function () {
    const allTasks = taskList;
    endBtn.disabled = true;
    endBtn.style.background = "grey";
    let response = parseInt(prompt("Enter your Security key"));
    while (isNaN(response)) {
      response = parseInt(prompt("Enter a proper number"));
    }
    const data = {
      subject: userSub.subject,
      tasks: allTasks,
      pin: Number(response),
    };
    setUserTasks(data);
    return response;
  });
  //logout and redirect into login page
  logout.addEventListener('click', ()=>{
    window.location.href='login.html'
  })
}

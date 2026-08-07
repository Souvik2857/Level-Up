/*----------------Accessing the elements-----------------*/
const addTask = document.querySelector('#add-task');
const taskBox = document.querySelector('#task-box');
const taskDate = document.querySelector('#task-date');
const taskSpace = document.querySelector('#task-space');
const taskStatus = document.querySelector('#task-status');
const subChoose = document.querySelector('#sub-choose');
const subEnter = document.querySelector('#sub-enter');
const exp = document.querySelector('#exp');
const endBtn = document.querySelector('#finalise');

/*--------------------Creating subject choosing object-------------*/
let userSub={};
let enter = 0;

subEnter.addEventListener('click', function(){
    const enterVal = subChoose.value;

    if(enterVal.length === 0){
        alert("Enter a subject!");
        enter = 0;
        return;
    }

    enter = 1;
    userSub.subject = enterVal;
    userSub.time = Date();
    
    /*------------When the user will enter their subject---------------------*/
    
    if(enter === 1){
        subChoose.style.textDecoration = 'line-through';
        subChoose.style.backgroundColor = 'transparent';
        subChoose.disabled = true;
        subChoose.style.color = '#475569';
        subEnter.disabled = true;
        subEnter.style.background = 'transparent';
    }
})

/*------------Date-value object---------------*/

function formatDate(dateString){
    if(!dateString){
        return 'no date';
    }

    const date = new Date(dateString);
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}


/*-------------Count of the total tasks User created--------------------*/
let taskList = [];

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
        taskStatus.textContent = '📋 0 tasks';
        taskStatus.style.color = '#5d8fecdd';
    } else if (completedTasks === totalTasks) {
        taskStatus.textContent = `${completedTasks}/${totalTasks} Tasks done!`;
        taskStatus.style.color = '#5d8fecdd';
    } else {
        taskStatus.textContent = ` ${completedTasks}/${totalTasks} tasks done`;
        taskStatus.style.color = '#5d8fecdd';
    }
    
    /*--------------Clearing The Container----------------*/
    taskSpace.innerHTML = '';
    
    if (taskList.length === 0) {
        taskSpace.innerHTML = '<p style="color: #475569; text-align: center; padding: 20px;">No tasks yet. Add one above!</p>';
        return;
    }
    
    /*--------------Display Tasks--------------------------*/
    for (let i = 0; i < taskList.length; i++) {
        /*----------------Checkbox display----------------------*/
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = taskList[i].completed;
        checkbox.style.marginRight = '10px';
        checkbox.style.width = '18px';
        checkbox.style.height = '18px';
        checkbox.style.accentColor = '#4f7df3';
        checkbox.style.cursor = 'pointer';
        
        /*---------------Making the Checkbox Work properly--------------*/
        checkbox.addEventListener('change', function() {
            if(checkbox.checked){
                taskList[i].completed = true;
                checkbox.disabled = true;
                display();
            }
        });
        
        const taskElement = document.createElement('p');
        taskElement.textContent = taskList[i].text;
        taskElement.style.color = '#e8edf5';
        taskElement.style.fontSize = 'larger';
        taskElement.style.padding = '8px 12px';
        taskElement.style.margin = '4px 0';
        taskElement.style.height = '1.7rem';
        taskElement.style.width = '100%';
        taskElement.style.background = '#1a2332';
        taskElement.style.borderRadius = '8px';
        taskElement.style.borderLeft = '3px solid #4f7df3';

        /*-----------------Displaying the dates with the tasks--------------*/
        const dateElement = document.createElement('span');
        dateElement.textContent = `${formatDate(taskList[i].date)}`;
        dateElement.style.color = '#94a3b8';
        dateElement.style.fontSize = '0.87rem';
        dateElement.style.marginLeft = '8px';
        dateElement.style.fontWeight = '300';
        
        /*------------------Task completion code-----------------------*/
        if (taskList[i].completed) {
            taskElement.style.textDecoration = 'line-through';
            taskElement.style.color = '#475569';
            taskElement.style.borderLeftColor = '#2ecc71';
        } else {
            taskElement.style.textDecoration = 'none';
            taskElement.style.color = '#e8edf5';
            taskElement.style.borderLeftColor = '#4f7df3';
        }
        
        /*-------------------Task boxes styling--------------------*/
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '6px';
        
        container.appendChild(checkbox);
        container.appendChild(taskElement);
        container.appendChild(dateElement);
        taskSpace.appendChild(container);
    }
}

/*-----------------Task Box content store-------------------*/
addTask.addEventListener('click', function() {
    const typedVal = taskBox.value.trim();
    const selecteDate = taskDate.value;
    
    if (typedVal.length === 0) {
        alert('Enter a proper task!');
        return;
    }
    
    taskList.push({
        text: typedVal,
        completed: false,
        date: taskDate.value || new Date().toISOString().split('T')[0],
        data: Date(),
    });
    
    taskBox.value = '';
    taskDate.value = '';
    display();
    // console.log(taskList);
});

/*-------------Making Enter Key work-------------------------*/
taskBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask.click();
    }
});

/*--------------User Activity Stats--------------*/

let userjourneyEXP = {
    userName: "Player",
    Rank: 'E',
    Exp: 0,
    Streak: 0,
};

/*-----------------Final Button Function-----------*/
endBtn.addEventListener('click', function(){
    const allTasks = taskList;
    endBtn.disabled = true;
    endBtn.style.background = 'grey';
    const response = prompt("Enter your Security key");

    if(response === null){
        prompt("!Enter proper security key!");
    }else{
        console.log(response);
        return response;
    }
    // console.log(allTasks);
})
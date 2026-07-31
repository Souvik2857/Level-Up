// ─── GET ELEMENTS ───
const addTask = document.querySelector('#add-task');
const taskBox = document.querySelector('#task-box');
const taskSpace = document.querySelector('#task-space');
const taskStatus = document.querySelector('#task-status');

// ─── CREATE ARRAY ───
let taskList = [];

// ─── COUNT COMPLETED TASKS ───
function countCompletedTasks() {
    let count = 0;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].completed) {
            count++;
        }
    }
    return count; // ✅ Fixed: Return the count
}

/*---------Display Function------------ */
function display() {
    /*-----------------Task Completion Counter----------------*/
    const totalTasks = taskList.length;
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
        // ─── CHECKBOX ───
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = taskList[i].completed;
        checkbox.style.marginRight = '10px';
        checkbox.style.width = '18px';
        checkbox.style.height = '18px';
        checkbox.style.accentColor = '#4f7df3';
        checkbox.style.cursor = 'pointer';
        
        // ⭐ FIX: Use taskList[i].completed
        checkbox.addEventListener('change', function() {
            if(checkbox.checked){
                taskList[i].completed = true;
                checkbox.disable = true;
                display();
            }
        });
        
        // ─── TASK TEXT ───
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
        
        // ─── COMPLETED STYLING ───
        if (taskList[i].completed) {
            taskElement.style.textDecoration = 'line-through';
            taskElement.style.color = '#475569';
            taskElement.style.borderLeftColor = '#2ecc71';
        } else {
            taskElement.style.textDecoration = 'none';
            taskElement.style.color = '#e8edf5';
            taskElement.style.borderLeftColor = '#4f7df3';
        }
        
        // ─── CONTAINER ───
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '6px';
        
        container.appendChild(checkbox);
        container.appendChild(taskElement); // ✅ Only add it ONCE
        taskSpace.appendChild(container);
    }
}

// ─── ADD BUTTON ───
addTask.addEventListener('click', function() {
    const typedVal = taskBox.value.trim();
    
    if (typedVal.length === 0) {
        alert('Enter a proper task!');
        return;
    }
    
    taskList.push({
        text: typedVal,
        completed: false,
    });
    
    console.log("📦 Current taskList:", taskList);
    taskBox.value = '';
    display();
});

// ─── ENTER KEY ───
taskBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask.click();
    }
});

// display();
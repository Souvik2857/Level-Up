const addTask = document.querySelector('#add-task');
const taskBox = document.querySelector('#task-box');
const taskSpace = document.querySelector('#task-space');
const taskStatus = document.querySelector('#task-status');

function completedTask(){
    let count = 0;
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].completed){
            count++;
        }
    }
    return;
}


let taskList = [];

function display(){
    
    for(let i=0; i<taskList.length; i++){
        const taskElement = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = taskList[i].completed;
        checkbox.style.marginRight = '10px';
        checkbox.style.width = '18px';
        checkbox.style.height = '18px';
        checkbox.style.accentColor = '#4f7df3';
        checkbox.style.cursor = 'pointer';

        checkbox.addEventListener('change', function(){
            taskList[i].completed = !taskList.completed;
            display();
        });

        taskElement.textContent = taskList[i].text;
        taskElement.style.color = '#e8edf5';
        taskElement.style.fontSize = 'larger';
        taskElement.style.padding = '8px 12px';
        taskElement.style.margin = '4px 0';
        taskElement.style.height = '1.7rem'
        taskElement.style.width = '100%'
        taskElement.style.background = '#1a2332';
        taskElement.style.borderRadius = '8px';
        taskElement.style.borderLeft = '3px solid #4f7df3';

        taskSpace.appendChild(taskElement);

        if(taskList[i].completed){
            taskElement.style.textDecoration = 'line-through';
            taskElement.style.color = '#475569';
        }else{
            taskElement.style.textDecoration = 'none';
            taskElement.style.color = '#e8edf5'
            taskElement.style.borderLeftColor = '#4f7df3';
        }

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '6px';

        container.appendChild(checkbox);
        container.appendChild(taskElement);

        taskSpace.appendChild(container);
    }
}

addTask.addEventListener('click', function(){
    const typedVal = taskBox.value.trim();

    if(typedVal.length === 0){
        alert('Enter a poper task!');
    }else{
        taskList.push({
            text: typedVal,
            completed: false,
        });

        console.log("📦 Current taskList:", taskList);
        taskBox.value = '';
        display();
        console.log(taskList);
    }

})



// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listensers
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask );
    //Clear task event
    clearBtn.addEventListener('click' , clearTasks);
    //Filter task event
    filter.addEventListener('keyup' , filterTasks);
}
//Get Tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        
    //Create li element
    const li = document.createElement('li');
    //Add class to li
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element (for delete icon)
    const link = document.createElement('a');
    //Add class to link
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = 
    '<i class="fa fa-times"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    });
}
//Add task
function addTask(e) {
    
    if (taskInput.value === '') {
        alert('Add a task');
    }
    //Create li element
    const li = document.createElement('li');
    //Add class to li
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element (for delete icon)
    const link = document.createElement('a');
    //Add class to link
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = 
    '<i class="fa fa-times"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
   taskInput.value = '';

    e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
          tasks.splice(index, 1);
        }
      });
    
      localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear tasks
function clearTasks(e) {
    //taskList.innerHTML= '';

    //Faster than inner thml
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}
//Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}
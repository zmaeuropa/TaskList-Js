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
    //Add task event
    form.addEventListener('submit', addTask);
}

//Add task
function addTask(e) {
    
    if (taskInput.value === '') {
        alert('Add a task');
    }
    e.preventdefault();
}
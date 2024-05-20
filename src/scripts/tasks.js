import { storage } from './storage.js';

let tasks; // The variable we'll use to add our array of objects we fetch
let taskURL = '../assets/json/tasklist.json'; // the URL to fetch from

// Bind the init() function to run once the page loads
window.addEventListener('DOMContentLoaded', init);

/** Initializes every function, they all stem from here */
async function init() {
  // Attempt to fetch the task items
  try {
    await fetchTasks();
  } catch (err) {
    console.log(`Error fetch tasks: ${err}`);
    return; // Return if fetch fails
  }
  populatePage(); // Add tasks elements to page with fetched data
  bindUpdates(); // Add the event listeners to those elements
}

/**
 * Fetches all of the products from itemsURL top and stores them
 * inside the global items variable. 
 * @returns {Promise} Resolves if the items are found it localStorage or if they
 *                    are fetched correctly
 */
async function fetchTasks() {
  return new Promise((resolve, reject) => {
    let tasklist = localStorage.getItem('tasklist')
    if (tasklist) {
      tasks = JSON.parse(tasklist);
      resolve();
    } else {
      fetch(taskURL)
        // Grab the response first, catch any errors here
        .then(response => response.json())
        .catch(err => reject(err))
        // Grab the data next, cach errors here as well
        .then(data => {
          if (data) {
            localStorage.setItem('tasklist', JSON.stringify(data));
            tasks = data;
            resolve();
          }
        })
        .catch(err => reject(err));
    }
  });
}

/**
 * Adds the Fetched tasks to the webpage -> UI Task
 */
function populatePage() {
  if (!tasks) return;
  // Get all of the items currently in the cart from storage
  tasks = storage.getItems('tasklist');
  // Iterate over each of the items in the array
  const htmlDates = document.querySelectorAll('.day-container > .date');
  let visibleDates = [];
  htmlDates.forEach(date => {visibleDates.push(date.innerHTML) });

  tasks.forEach(element => {
    // Create <product-item> element and populate it with item data
    for (let i = 0; i < visibleDates.length; i++) {
      if (element.dueDate === visibleDates[i]) {
        let taskElement = document.createElement('task-element');
        taskElement.data = element;
        const day = document.querySelectorAll('.day-container')[i];
        console.log(day);
        console.log(taskElement);
        const addButton = day.querySelector('.add-task');
        day.insertBefore(taskElement, addButton);
      }
    }
  });
}

/**
 * Binds the event listeners to each item for when the add to cart & remove
 * from cart buttons get pressed
 */
function bindUpdates() {
  const days = Array.from(document.querySelectorAll('.day-container'));
  days.forEach(day => {
    const dailyTasks = Array.from(day.querySelectorAll(".task-element"));
    dailyTasks.forEach(task => {
      // Save button handler
      const fields = Array.from(task.querySelectorAll("textarea"));
      fields.forEach(field => {
        field.addEventListener('input', () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; } );
      })
      task.querySelector(".save-task").addEventListener('click', () => { saveTask(task) });
      task.querySelector(".delete-task").addEventListener('click', () => { deleteTask(task) });
      task.addEventListener('Saved', () => { saveTask(task) });
      task.addEventListener('Deleted', () => { deleteTask(task) });
    });
    // Add button handler
    day.querySelector('.add-task').addEventListener('click', () => { getNewTask(day) });
  });
}

function addTask(wrapper) {
  const inputTitle = wrapper.querySelector(".title").value;
  const inputDate = wrapper.parentElement.querySelector(".date").innerHTML;
  const inputDescription = wrapper.querySelector(".description").value;
  const inputTags = wrapper.querySelector(".tags").value;
  tasks = storage.getItems("tasklist");

  // check for unique id
  let inputId = Math.floor(Math.random() * 2000000);
  while (true) {
    let newId = true;
    for (let t in tasks) {
      if (inputId == tasks[t].id) {
        newId = false;
      }
    }
    if (newId) {
      break;
    }
    inputId = Math.floor(Math.random() * 2000000);
  }

  try {
    let taskObject = {
      id: inputId,
      title: inputTitle,
      dueDate: inputDate,
      description: inputDescription,
      tags: ((inputTags == '') ? [] : inputTags.split(' '))   // might have some trouble with this method (whitespaces)
    };
    storage.addItem("tasklist", taskObject);
    console.log(taskObject);
  } catch (err) {
    console.log(`Error Occured!`);
    return;
  }

}

// Adds new empty task template, does not save
function getNewTask(day){

  let addButton = day.lastElementChild;

  const wrapper = document.createElement('div');
  wrapper.classList.add('task');

  // Create the task title
  const title = document.createElement('textarea');
  title.placeholder = "Task Title";
  title.classList.add('title');

  const description = document.createElement('textarea');
  description.placeholder = "Task Description";
  description.classList.add('description');

  const tags = document.createElement('textarea');
  tags.placeholder = "Task Tags"
  tags.classList.add('tags');

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('task-buttons');

  const saveImg = document.createElement('img');
  saveImg.src = "../assets/icons/save.svg"
  saveImg.addEventListener('click', () => { addTask(wrapper) });
  saveImg.classList.add('save-task');

  const deleteImg = document.createElement('img');
  deleteImg.src = "../assets/icons/delete.svg"
  deleteImg.addEventListener('click', () => { deleteTask(wrapper) });
  deleteImg.classList.add('delete-task');

  buttonWrapper.append(saveImg, deleteImg);

  wrapper.append(title, description, tags, buttonWrapper);
  
  day.insertBefore(wrapper, addButton);
}

function deleteTask(wrapper){
  console.log(wrapper);
  if (wrapper.data) {
    console.log(wrapper.data);
  }
}

//Updates Task with new given content
function updateTask(id, newContent) {

    tasks = getTasks();
    updatedTask = getTask(tasks, id);
    updatedTask.content = newContent;
    saveTasks(tasks);
}

//Get all the tasks from local storage
function getTasks() {
    return storage.getItems('tasklist');
}

//Get a certain task based of id
function getTask(tasks, id) {
    return tasks.filter(task => task.id == id)[0];
}

//Saves all tasks to local storage
function saveTasks(tasks){
    localStorage.setItem('tasklist', JSON.stringify(tasks));
}

//Deletes a single specific task with double click
function deleteTaskbyId(id, element){
    const tasks = getTasks().filter(task => task.id != id);
    saveTasks(tasks);
    tasksContainer.removeChild(element);
    taskCount--;
}

//deletes all tasks with crt + shift + D
function deleteSelectedTasks(event){ 
    for(var i = 0; i < taskCount; i++){
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
    saveTasks(JSON.parse("[]"));
}
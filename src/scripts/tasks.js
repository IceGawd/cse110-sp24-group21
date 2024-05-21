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
 * Fetches all of the products from taskURL top and stores them
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
  // Get all visible dates, will probably later change to be dynamic
  const htmlDates = document.querySelectorAll('.day-container > .date');
  let visibleDates = [];
  htmlDates.forEach(date => {visibleDates.push(date.innerHTML) });

  tasks.forEach(element => {
    for (let i = 0; i < visibleDates.length; i++) {
      if (element.dueDate === visibleDates[i]) {
        // Creates an object with nothing inside
        let taskElement = document.createElement('task-element');
        // Creates all the content and styles of task
        taskElement.data = element;
        // Add task right before add-task button
        const day = document.querySelectorAll('.day-container')[i];
        const addButton = day.querySelector('.add-task');
        day.insertBefore(taskElement, addButton);
      }
    }
  });
}

/**
 * Binds the event listeners to task, specifically save and delete buttons
 * Also dynamically expands/contracts textareas
 */
function bindTaskUpdates(task) {
  const fields = Array.from(task.shadowRoot.querySelectorAll("textarea"));
  fields.forEach(field => {
    // Gives fields ability to expand/contract based on text inside
    field.addEventListener('input', () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; } );
  })
  task.addEventListener('saved', () => { saveTask(task) });
  task.addEventListener('deleted', () => { deleteTask(task) });
}

/**
 * Binds the add task button to each day
 * Binds task events
 */
function bindUpdates() {
  // Add button handler to each day
  const days = Array.from(document.querySelectorAll('.day-container'));
  days.forEach(day => {
    day.querySelector('.add-task').addEventListener('click', () => { addTask(day) });
  });
  // Task handler for all tasks
  const tasks = Array.from(document.querySelectorAll("task-element"));
  tasks.forEach(task => { bindTaskUpdates(task); });
}

/* ************************************************************************************ */

// Generates random id not found in storage
function genId() {
  // Retrieve tasks from storage
  const tasks = Array.from(document.querySelectorAll("task-element"));
  
  // Create a set of existing IDs for fast lookup
  const existingIds = new Set(tasks.map(task => task.data.id));
  
  let id;
  // Loop until a unique ID is found
  do {
    id = Math.floor(Math.random() * 2000000);
  } while (existingIds.has(id));
  
  return id;
}

/**
 * Given the day html element, add a task with date and id and other fields empty
 */
function addTask(day) {
  const date = day.querySelector(".date").innerHTML;
  const inputId = genId();

  let taskObject = {
    id: inputId,
    title: "",
    dueDate: date,
    description: "",
    tags: []  // might have some trouble with this method (whitespaces)
  };

  // Create element and bind events to buttons
  let taskElement = document.createElement('task-element');
  taskElement.data = taskObject;
  bindTaskUpdates(taskElement);

  // Add to webpage right before add button of the day
  const addButton = day.querySelector('.add-task');
  day.insertBefore(taskElement, addButton);

  console.log(taskObject);
}

/**
 * Given the task element, save its current state
 */
function saveTask(task) {
  // Get current values in fields
  const wrapper = task.shadowRoot;
  const inputTitle = wrapper.querySelector(".title").value;
  const inputDate = task.parentElement.querySelector(".date").innerHTML;
  const inputDescription = wrapper.querySelector(".description").value;
  const inputTags = wrapper.querySelector(".tags").value;

  let taskObject = {
    id: task.data.id,
    title: inputTitle,
    dueDate: inputDate,
    description: inputDescription,
    tags: ((inputTags == '') ? [] : inputTags.split(' '))   // might have some trouble with this method (whitespaces)
  };

  storage.updateItem("tasklist", taskObject);
  console.log(taskObject);
}

/**
 * Given the task element, delete it
 */
function deleteTask(task) {
  // Get the id to help remove it
  storage.removeItem("tasklist", task.data.id);
  // Remove from webpage
  const day = task.parentElement;
  day.removeChild(task);
  console.log(storage.getItems("tasklist"));
}
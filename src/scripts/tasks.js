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
    for (let i = 0; i < visibleDates.length; i++) {
      if (element.dueDate === visibleDates[i]) {
        let taskElement = document.createElement('task-element');
        taskElement.data = element;
        const day = document.querySelectorAll('.day-container')[i];
        const addButton = day.querySelector('.add-task');
        day.insertBefore(taskElement, addButton);
      }
    }
  });
}

function bindTaskUpdates(task) {
  const fields = Array.from(task.shadowRoot.querySelectorAll("textarea"));
  fields.forEach(field => {
    field.addEventListener('input', () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; } );
  })
  task.addEventListener('saved', () => { saveTask(task) });
  task.addEventListener('deleted', () => { deleteTask(task) });
}

/**
 * Binds the event listeners to each item for when the add to cart & remove
 * from cart buttons get pressed
 */
function bindUpdates() {
  const days = Array.from(document.querySelectorAll('.day-container'));
  days.forEach(day => {
    // Add button handler
    day.querySelector('.add-task').addEventListener('click', () => { addTask(day) });
  });
  const tasks = Array.from(document.querySelectorAll("task-element"));
  tasks.forEach(task => { bindTaskUpdates(task); });
}

function saveTask(task) {
  tasks = storage.getItems("tasklist");
  const wrapper = task.shadowRoot;
  const inputTitle = wrapper.querySelector(".title").value;
  const inputDate = task.parentElement.querySelector(".date").innerHTML;
  const inputDescription = wrapper.querySelector(".description").value;
  const inputTags = wrapper.querySelector(".tags").value;

  try {
    let taskObject = {
      id: task.data.id,
      title: inputTitle,
      dueDate: inputDate,
      description: inputDescription,
      tags: ((inputTags == '') ? [] : inputTags.split(' '))   // might have some trouble with this method (whitespaces)
    };
    storage.updateItem("tasklist", taskObject);
    console.log(taskObject);
  } catch (err) {
    console.log(`Error Occured!`);
    return;
  }

}

function addTask(day) {
  tasks = storage.getItems("tasklist");
  const date = day.querySelector(".date").innerHTML;

  // Generate new id
  let inputId = Math.floor(Math.random() * 2000000);
  while (true) {
    let newId = true;
    for (let t in tasks) { if (inputId == tasks[t].id) { newId = false; } }
    if (newId) { break; }
    inputId = Math.floor(Math.random() * 2000000);
  }

  let taskObject = {
    id: inputId,
    title: "",
    dueDate: date,
    description: "",
    tags: []  // might have some trouble with this method (whitespaces)
  };
  storage.addItem("tasklist", taskObject);
  let taskElement = document.createElement('task-element');
  taskElement.data = taskObject;
  bindTaskUpdates(taskElement);
  const addButton = day.querySelector('.add-task');
  day.insertBefore(taskElement, addButton);
}

function deleteTask(task) {
  storage.removeItem("tasklist", task.data.id);
  const day = task.parentElement;
  day.removeChild(task);
  console.log(storage.getItems("tasklist"));
}
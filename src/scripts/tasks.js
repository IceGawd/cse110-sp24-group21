import { storage } from './storage.js';

let tasks; // The variable we'll use to add our array of objects we fetch
let taskURL = '../assets/json/tasklist.json'; // the URL to fetch from
let currDate = new Date();

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
  setWeek(currDate);
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
  tasks = storage.getItems('tasklist');
  if (!tasks) return;

  // Get all visible dates, will probably later change to be dynamic
  const htmlDates = document.querySelectorAll('.date');
  let visibleDates = [];
  htmlDates.forEach(date => {visibleDates.push(date.innerHTML) });

  tasks.forEach(element => {
    for (let i = 0; i < 7; i++) {
      if (element.dueDate === visibleDates[i]) {
        const day = document.querySelectorAll('.day-container')[i];
        createTask(day, element);
      }
    }
  });
}

/**
 * Binds the add task button to each day
 * Binds task events
 */
function bindUpdates() {
  const htmlDate = document.querySelector('.date');
  currDate = new Date(htmlDate.innerHTML);
  document.getElementById('next-week').addEventListener('click', () => { changeWeek(7) });
  document.getElementById('prev-week').addEventListener('click', () => { changeWeek(-7) });
  const calendarSelect = document.getElementById('calendar-select');
  calendarSelect.addEventListener('change', () => {
    currDate = new Date(calendarSelect.value);
    if (!isNaN(currDate)) {
      setWeek(currDate);
    }
  })
  // Add button handler to each day
  const days = Array.from(document.querySelectorAll('.day-container'));
  days.forEach(day => {
    day.querySelector('.add-task').addEventListener('click', () => { newTask(day) });
  });
}

/* ************************************************************************************ */

/**
 * Creates task-element given data
 * Binds its save and delete buttons
 * Displays on webpage
 */
function createTask(day, data) {
  // Creates all the content and styles of task
  let taskElement = document.createElement('task-element');
  taskElement.data = data;

  // Binds updates to task
  const fields = Array.from(taskElement.shadowRoot.querySelectorAll("textarea"));
  fields.forEach(field => {
    // Gives fields ability to expand/contract based on text inside
    field.addEventListener('input', () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; } );
  })
  taskElement.addEventListener('saved', () => { saveTask(taskElement) });
  taskElement.addEventListener('deleted', () => { deleteTask(taskElement) });

  // Add to webpage right before add button of the day
  const addButton = day.querySelector('.add-task');
  day.insertBefore(taskElement, addButton);
}

/**
 * Given the day html element, add a task with date and id and other fields empty
 */
function newTask(day) {
  // Generate ID
  const taskElements = Array.from(document.querySelectorAll("task-element"));
  const existingIds = new Set(taskElements.map(element => element.data.id));
  let inputId;
  do {
    inputId = Math.floor(Math.random() * 2000000);
  } while (existingIds.has(inputId));

  const date = day.querySelector(".date").innerHTML;

  let taskObject = {
    id: inputId,
    title: "",
    dueDate: date,
    description: "",
    tags: []  // might have some trouble with this method (whitespaces)
  };
  createTask(day, taskObject);
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
  console.log(task);
  // Remove from webpage
  const day = task.parentElement;
  day.removeChild(task);
  console.log(storage.getItems("tasklist"));
}

/* ************************************************************************************ */

/**
 * Given a date, set the dates of all the days containers from Monday to Sunday
 * @param {Date} date 
 */
function setWeek(date) {
  // Compute next date
  const htmlDates = Array.from(document.querySelectorAll('.date'));
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek - 1));
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(monday);
    weekDate.setDate(monday.getDate() + i);
    // Formatting string
    let options = { year: "numeric", month: "2-digit", day: "2-digit" };
    htmlDates[i].innerHTML = weekDate.toLocaleDateString("en", options);
  }

  // Remove old task-elements from page
  let oldTasks = document.querySelectorAll('task-element');
  oldTasks.forEach(t => {
    t.parentNode.removeChild(t);
  });

  populatePage();
}

function changeWeek(days) {
  currDate.setDate(currDate.getDate() + days);
  setWeek(currDate);
}
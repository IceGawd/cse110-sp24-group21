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
    console.log(`Error fetching tasks: ${err}`);
    return; // Return if fetch fails
  }
  setWeek(currDate);
  bindUpdates(); // Add the event listeners to those elements
}

/**
 * Fetches all of the products from taskURL and stores them
 * inside the global items variable. 
 * @returns {Promise} Resolves if the items are found in localStorage or if they
 *                    are fetched correctly
 */
async function fetchTasks() {
  return new Promise((resolve, reject) => {
    let tasklist = localStorage.getItem('tasklist');
    if (tasklist) {
      tasks = JSON.parse(tasklist);
      resolve();
    } else {
      fetch(taskURL)
        // Grab the response first, catch any errors here
        .then(response => response.json())
        .catch(err => reject(err))
        // Grab the data next, catch errors here as well
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
 * Adds the fetched tasks to the webpage -> UI Task
 */
function populatePage() {
  tasks = storage.getItems('tasklist');
  if (!tasks) return;

  // Get all visible dates, will probably later change to be dynamic
  const htmlDates = document.querySelectorAll('.date');
  let visibleDates = [];
  htmlDates.forEach(date => { visibleDates.push(date.innerHTML); });

  tasks.forEach(element => {
    for (let i = 0; i < 7; i++) {
      if (element.date === visibleDates[i]) {
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
  document.getElementById('next-week').addEventListener('click', () => { changeWeek(7); });
  document.getElementById('prev-week').addEventListener('click', () => { changeWeek(-7); });
  const calendarSelect = document.getElementById('calendar-select');
  calendarSelect.addEventListener('change', () => {
    currDate = new Date(calendarSelect.value);
    if (!isNaN(currDate)) {
      setWeek(currDate);
    }
  });
  const days = Array.from(document.querySelectorAll('.day-container'));
  days.forEach(day => {
    day.querySelector('.add-task').addEventListener('click', () => { newTask(day); });
  });
}

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
    field.addEventListener('input', () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; });
    // Add event listener to save changes on input
    field.addEventListener('input', () => { saveTask(taskElement); });
  });
  taskElement.addEventListener('saved', () => { saveTask(taskElement); });
  taskElement.addEventListener('deleted', () => { deleteTask(taskElement); });
  taskElement.addEventListener('priority-changed', () => { sortTasks(day); });

  // Add to webpage right before add button of the day
  const addButton = day.querySelector('.add-task');
  day.insertBefore(taskElement, addButton);

  // Sort tasks after adding a new one
  sortTasks(day);
}

/**
 * Sets the priority of the task
 */
function setPriority(taskElement) {
  const priorities = ['low', 'medium', 'high'];
  let currentPriority = taskElement.querySelector('.priority-dropdown').value;
  let newPriorityIndex = (priorities.indexOf(currentPriority) + 1) % priorities.length;
  let newPriority = priorities[newPriorityIndex];
  taskElement.querySelector('.priority-dropdown').value = newPriority;
  taskElement.data.priority = newPriority;
  saveTask(taskElement);
  sortTasks(taskElement.parentElement);
}

  let taskObject = {
    id: inputId,
    title: "",
    date: date,
    startTime: "00:00",
    endTime: "23:59",
    description: "",
    tags: []  // might have some trouble with this method (whitespaces)
  };
  createTask(day, taskObject);
  console.log(taskObject);
/**
 * Sorts tasks by priority within the specified day container
 */
function sortTasks(day) {
  const tasks = Array.from(day.querySelectorAll('task-element'));
  tasks.sort((a, b) => {
    const priorities = ['low', 'medium', 'high'];
    return priorities.indexOf(b.data.priority) - priorities.indexOf(a.data.priority);
  });
  tasks.forEach(task => day.insertBefore(task, day.querySelector('.add-task')));
}

/** 
 * Creates a save-able object from the HTML task element
*/
function getTaskObjectFromTask(task) {
  // Get current values in fields
  const wrapper = task.shadowRoot;
  const inputTitle = wrapper.querySelector(".title").value;
  const inputDate = task.parentElement.querySelector(".date").innerHTML;
  const inputDescription = wrapper.querySelector(".description").value;
  const inputStartTime = wrapper.querySelector(".start-time").value;
  const inputEndTime = wrapper.querySelector(".end-time").value;
  const allDayBox = wrapper.querySelector(".all-day").checked;
  const inputTags = wrapper.querySelector(".tags").value;
  const inputPriority = task.querySelector('.priority-dropdown').value;

  // Create object from task information
  let taskObject = {
    id: task.data.id,
    title: inputTitle,
    date: inputDate,
    startTime: allDayBox ? "00:00" : inputStartTime,
    endTime: allDayBox ? "23:59" : inputEndTime,
    description: inputDescription,
    tags: ((inputTags == '') ? [] : inputTags.split(' ')),
    priority: inputPriority
  };

  return taskObject;
}

/**
 * Given the task element, save its current state
 */
function saveTask(task) {
  // Get the object of the task
  let taskObject = getTaskObjectFromTask(task);

  // Update task in the list
  const taskIndex = tasks.findIndex(t => t.id === taskObject.id);
  if (taskIndex >= 0) {
    tasks[taskIndex] = taskObject;
  } else {
    tasks.push(taskObject);
  }

  // Save the updated list to local storage
  localStorage.setItem('tasklist', JSON.stringify(tasks));

  // Sort tasks after saving changes
  sortTasks(task.parentElement);
}

/**
 * Given the task element, delete it
 */
function deleteTask(task) {
  // Get the id to help remove it
  const taskId = task.data.id;
  tasks = tasks.filter(t => t.id !== taskId);

  // Update local storage
  localStorage.setItem('tasklist', JSON.stringify(tasks));

  // Remove from webpage
  const day = task.parentElement;
  day.removeChild(task);
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
    tags: [],
    priority: 'low'
  };

  createTask(day, taskObject);

  // Save new task to local storage
  tasks.push(taskObject);
  localStorage.setItem('tasklist', JSON.stringify(tasks));
}

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

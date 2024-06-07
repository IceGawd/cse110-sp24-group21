import { storage } from './storage.js';

let tasks = {}; // Initialize tasks as an empty object
let taskURL = '../assets/json/tasklist.json'; // the URL to fetch from
let currDate = new Date();

// Bind the init() function to run once the page loads
window.addEventListener('DOMContentLoaded', init);

/** Initializes every function, they all stem from here */
async function init() {
  // Attempt to fetch the task items
  try {
    await fetchTasks();
    console.log(tasks);
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
        .then(response => response.json())
        .catch(err => reject(err))
        .then(data => {
          if (data) {
            // Convert the array to a hashmap
            data.forEach(task => {
              if (!tasks[task.date]) {
                tasks[task.date] = [];
              }
              tasks[task.date].push(task);
            });
            localStorage.setItem('tasklist', JSON.stringify(tasks));
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
  tasks = JSON.parse(localStorage.getItem('tasklist'));
  if (!tasks) return;

  const htmlDates = document.querySelectorAll('.date');
  let visibleDates = [];
  htmlDates.forEach(date => { visibleDates.push(date.innerHTML); });

  visibleDates.forEach(date => {
    if (tasks[date]) {
      tasks[date].forEach(task => {
        const dayIndex = visibleDates.indexOf(date);
        const day = document.querySelectorAll('.day-container')[dayIndex];
        createTask(day, task);
      });
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
  let taskElement = document.createElement('task-element');
  taskElement.data = data;

  const fields = Array.from(taskElement.shadowRoot.querySelectorAll("textarea"));
  fields.forEach(field => {
    field.addEventListener('input', () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; });
  });
  taskElement.addEventListener('deleted', () => { deleteTask(taskElement); });
  taskElement.addEventListener('priority-changed', () => { sortTasks(day); });

  const addButton = day.querySelector('.add-task');
  day.insertBefore(taskElement, addButton);

  sortTasks(day);
}

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
 * Given the task element, delete it
 */
function deleteTask(task) {
  const taskId = task.data.id;
  const date = task.data.date;
  tasks[date] = tasks[date].filter(t => t.id !== taskId);

  if (tasks[date].length === 0) {
    delete tasks[date];
  }

  localStorage.setItem('tasklist', JSON.stringify(tasks));
  const day = task.parentElement;
  day.removeChild(task);
}

/**
 * Given the day html element, add a task with date and id and other fields empty
 */
function newTask(day) {
  tasks = JSON.parse(localStorage.getItem('tasklist'));
  const existingIds = new Set();
  Object.keys(tasks).forEach(date => {
    tasks[date].forEach(task => {
      existingIds.add(task.id);
    });
  });
  let inputId;
  do {
    inputId = Math.floor(Math.random() * 2000000);
  } while (existingIds.has(inputId));

  const date = day.querySelector(".date").innerHTML;

  let taskObject = {
    id: inputId,
    title: "",
    date: date,
    startTime: "00:00",
    endTime: "23:59",
    description: "",
    tags: [],
    priority: 'low'
  };

  createTask(day, taskObject);

  if (!tasks[date]) {
    tasks[date] = [];
  }
  tasks[date].push(taskObject);
  localStorage.setItem('tasklist', JSON.stringify(tasks));
}

/**
 * Given a date, set the dates of all the days containers from Monday to Sunday
 * @param {Date} date 
 */
function setWeek(date) {
  const htmlDates = Array.from(document.querySelectorAll('.date'));
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek - 1));
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(monday);
    weekDate.setDate(monday.getDate() + i);
    let options = { year: "numeric", month: "2-digit", day: "2-digit" };
    htmlDates[i].innerHTML = weekDate.toLocaleDateString("en", options);
  }

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

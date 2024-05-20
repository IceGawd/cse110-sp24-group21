// labeling.js
// Handles all the things related to adding label, changing label, grouping tasks by labels, etc.

import { storage } from './storage.js';

// Create a new label in the storage if it doesn't exist yet
function createLabel(labelName) {
  let labels = storage.getItems('labels') || [];  // labels will be an empty array if storage.getItems('labels') returns nothing
  if (!labels.includes(labelName)) {
    labels.push(labelName);
    storage.setItem('labels', labels);
  }
}

// Assign an existing label to a task
function assignLabelsToTask(taskId, labelNames) {
  let tasks = getTasks();
  let task = getTask(tasks, taskId);
  if (task) {
    task.labels = labelNames;
    saveTasks(tasks);
  }
}

// Change labels of a task
function changeTaskLabels(taskId, newLabelNames) {
  let tasks = getTasks();
  let task = getTask(tasks, taskId);
  if (task) {
    task.labels = newLabelNames;
    saveTasks(tasks);
  }
}

// Delete a label from a task
function deleteLabel(taskId, labelName) {
    let tasks = getTasks();
    let task = getTask(tasks, taskId);
    if (task && task.labels) {
      task.labels = task.labels.filter(label => label !== labelName);
      saveTasks(tasks);
    }
  }

// Group tasks by labels
function groupTasksByLabel(labelName) {
  let tasks = getTasks();
  return tasks.filter(task => task.labels && task.labels.includes(labelName));
}

// Get the list of tasks from current local storage
function getTasks() {
  return storage.getItems('tasklist');
}

// Get a specific task by task id
function getTask(tasks, id) {
  return tasks.filter(task => task.id == id)[0];  
}

// Save the change to the list of tasks to local storage
function saveTasks(tasks) {
  storage.setItems('tasklist', tasks);
}

// Export functions
export {
  createLabel,
  assignLabelsToTask,
  changeTaskLabels,
  deleteLabel,
  groupTasksByLabel
};

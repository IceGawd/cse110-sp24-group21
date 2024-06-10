// task-element.js
const style = `
/* Task style */
.task {
  border-radius: 3%;
  position: relative;
  flex: 0 0 auto;
  margin-top: 0rem;
  margin-bottom: 0.5rem; 
  padding: 0.2rem;
  background-color: var(--task-elem-background);
  color: var(--task-elem-text-color);
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'Radio Canada', sans-serif;
}

/* Task textarea style */
textarea {
  background-color: var(--task-elem-background);
  color: var(--task-elem-text-color);
  border: 1px solid #ddd;
  padding: 0.3rem;
  font-family: inherit;
  resize: none;
}

/* Task title style */
.title {
  border-radius: 10px 10px 0 0;
}

/* Task labels style */
.labels {
  border-radius: 0 0 10px 10px;
}

/* Time elements style */
.time-div {
  border: 1px solid #ddd;
  background-color: var(--task-elem-background);
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
}

/* More time element style */
input {
  font-size: 0.8rem;
  max-width: 5.6rem;
  margin: 0.25rem;
  font-family: inherit;
}

/* Task buttons style */
.task-buttons {
  position: absolute;
  bottom: 5px;
  right: 5px; 
  display: flex;
  flex-direction: row;
  margin-top: auto;
  margin-left: 10px;
  justify-content: flex-end;
}

.task-buttons > button {
  background-position: center;
  background-color: white; 
  height: 20px;
  width: 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.5s;
}

.delete-task {
  background-image: url(../assets/icons/delete.svg);
  background-size: 35px 35px;
}

.delete-task:hover {
  background-color: #d3d3d3;
}

/* Priority dropdown style */
.priority-dropdown {
  margin-top: 10px;
  width: 12.5%; /* Adjusted width to 1/8th of its current width */
  border-radius: 15px;
  border: 1px solid #827F7F; /* Set border color */
  outline: none;
}
`;
/**
 * @class TaskElement
 * @classdesc Custom element for a task
 */
class TaskElement extends HTMLElement {
  /**
   * @constructor 
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Creates a textarea with specified text, placeholder text and class
   * @param {string} text - The text that the textarea will hold
   * @param {string} placeholderText - The placeholder text for that textarea
   * @param {string} className - The class that the textarea will be given
   * @returns {HTMLElement} returns the textarea element with the given specifications
   */
  createTextarea(text, placeholderText, className) {
    const el = document.createElement('textarea');
    el.classList.add(className);
    el.value = text;
    el.placeholder = placeholderText;
    return el;
  }

    /** 
   * Create time div holding start, end and all day status
   * @param {string} startTime - The start time for the task, if any
   * @param {string} endTime - The end time for the task, if any
   * @return {HTMLElement} returns the div element holding the rt labels
   */
  createTimeDiv(startTime, endTime) {
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time-div');

    const startLabel = document.createElement('label');
    startLabel.innerHTML = 'Start Time:';
    const startEl = document.createElement('input');
    startEl.classList.add('start-time');
    startEl.type = 'time'; startEl.value = startTime;
    startLabel.append(startEl);

    const endLabel = document.createElement('label');
    endLabel.innerHTML = 'End Time:';
    const endEl = document.createElement('input');
    endEl.classList.add('end-time');
    endEl.type = 'time'; endEl.value = endTime;
    endLabel.append(endEl);
    
    const allDayLabel = document.createElement('label');
    allDayLabel.innerHTML = 'All Day';
    const allDayEl = document.createElement('input');
    allDayEl.classList.add('all-day');
    allDayEl.type = 'checkbox';
    if ((startTime === "00:00") && (endTime === "23:59")) { allDayEl.checked = startEl.disabled = endEl.disabled = true; }
    else { allDayEl.checked = startEl.disabled = endEl.disabled = false; }
    allDayEl.addEventListener('change', () => { startEl.disabled = endEl.disabled = allDayEl.checked });
    allDayLabel.append(allDayEl);
    timeDiv.append(startLabel, endLabel, allDayLabel);
    return timeDiv;
  }

  /**
   * Create label text by taking labels from arrays and adding spaces in between each label
   * @param {*} arr - a text array of input labels
   * @returns {HTMLElement} - A textarea element with labels separated by spaces
   */
  createLabels(arr) {
    const labels = document.createElement('textarea');
    labels.classList.add('labels');
    labels.value = arr.join(' ');
    labels.placeholder = "Task Labels";
    return labels;
  }

  /**
   * Creates a dropdown selection menu for assigning different priority to a task
   * 
   * @param {*} priority - A selected priority level
   * @returns {HTMLElement} - A created dropdown element with the priority options.
   */
  createPriorityDropdown(priority) {
    const dropdown = document.createElement('select');
    dropdown.classList.add('priority-dropdown');
    const priorities = ['low', 'medium', 'high'];
    priorities.forEach(level => {
      const option = document.createElement('option');
      option.value = level;
      option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
      if (level === priority) {
        option.selected = true;
      }
      dropdown.appendChild(option);
    });
    return dropdown;
  }

  /**
   * Creates a wrapper containing task-related buttons.
   * @returns { HTMLElement } - a wrapper containing the delete button
   */
  createButtons() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('task-buttons');

    const deletedEvent = new Event('deleted', { bubbles: true, composed: true });
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => { this.dispatchEvent(deletedEvent); });
    deleteButton.classList.add('delete-task');

    buttonWrapper.append(deleteButton);
    return buttonWrapper;
  }

  /**
   * Sets the task data and creates the task element
   * @param {Object} data - The task data
   */
  set data(data) {
    this.json = data;
    const styles = document.createElement('style');
    styles.innerHTML = style;
    const wrapper = document.createElement('div');
    wrapper.classList.add('task');
    const title = this.createTextarea(data.title, "Task Title", 'title');
    const description = this.createTextarea(data.description, "Task Description", 'description');
    const time = this.createTimeDiv(data.startTime, data.endTime);
    const labels = this.createLabels(data.labels);
    const priorityDropdown = this.createPriorityDropdown(data.priority);
    const buttons = this.createButtons();

    this.addSaveEventListener(title, 'title');
    this.addSaveEventListener(description, 'description');
    this.addSaveEventListener(time.querySelector('.start-time'), 'startTime');
    this.addSaveEventListener(time.querySelector('.end-time'), 'endTime');
    this.addSaveEventListener(time.querySelector('.all-day'), 'allDay');
    this.addSaveEventListener(labels, 'labels');
    this.addSaveEventListener(priorityDropdown, 'priority');

    wrapper.append(title, description, time, labels, priorityDropdown, buttons);
    this.shadowRoot.append(styles, wrapper);
  }

  /**
   * Returns the task data
   * @returns {Object} - data of the task element
   */
  get data() {
    return this.json;
  }

 /**
 * Adds an event listener to an element to save changes to the task's JSON object and local storage, 
 * which makes the task can be auto-saved any time and updated to the home page.
 *
 * @param {*} element - The HTML element to which the event listener is added.
 * @param {*} field - The field in the task's JSON object that should be updated.
 */
  addSaveEventListener(element, field) {
    element.addEventListener('input', () => {
      if (field === 'labels') {
        this.json.labels = element.value.split(' ');
      } else if (field === 'priority') {
        this.json.priority = element.value;
        this.dispatchEvent(new Event('priority-changed', { bubbles: true, composed: true }));
      } else if (field === 'allDay' && element.checked) {
        element.parentElement.parentElement.querySelector('.start-time').value = "00:00";
        element.parentElement.parentElement.querySelector('.end-time').value = "23:59";
        this.json.startTime = "00:00";
        this.json.endTime = "23:59";
      }
      else {
        this.json[field] = element.value;
      }
      this.saveToLocalStorage();
    });
  }

  /**
   * Saves the task list to localstorage
   */
  saveToLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasklist')) || {};
    const date = this.json.date;

    if (!tasks[date]) {
      tasks[date] = [];
    }
    const taskIndex = tasks[date].findIndex(t => t.id === this.json.id);
    if (taskIndex >= 0) {
      tasks[date][taskIndex] = this.json;
    } else {
      tasks[date].push(this.json);
    }
    localStorage.setItem('tasklist', JSON.stringify(tasks));
  }
}

customElements.define('task-element', TaskElement);

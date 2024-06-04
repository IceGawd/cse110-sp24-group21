// task-element.js
const style = `
/* Task style */
.task {
  position: relative;
  flex: 0 0 auto;
  margin-top: 0rem; 
  padding: 0.1rem;
  background-color: #f4f4f4;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'Radio Canada', sans-serif;
}

/* Task textarea style */
textarea {
  border: 1px solid #ddd;
  padding: 0.3rem;
  font-family: inherit;
  resize: none;
}

/* Task title style */
.title {
  border-radius: 10px 10px 0 0;
}

/* Task tags style */
.tags {
  border-radius: 0 0 10px 10px;
}

/* Time elements style */
.time-div {
  border: 1px solid #ddd;
  background-color: white;
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
  bottom: 15px;
  right: 20px; 
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

.save-task {
  background-image: url(../assets/icons/save.svg);
  background-size: 20px 20px;
}

.save-task:hover {
  background-color: #d3d3d3;
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
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  createTextarea(text, placeholderText, className) {
    const el = document.createElement('textarea');
    el.classList.add(className);
    el.value = text;
    el.placeholder = placeholderText;
    return el;
  }

  // Create time div
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

  // Create tag text by taking tags from arrays and adding spaces in between each tag
  createTags(arr) {
    const tags = document.createElement('textarea');
    tags.classList.add('tags');
    tags.value = arr.join(' ');
    tags.placeholder = "Task Tags";
    return tags;
  }

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

  createButtons() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('task-buttons');

    const savedEvent = new Event('saved', { bubbles: true, composed: true });
    const saveButton = document.createElement('button');
    saveButton.addEventListener('click', () => { this.dispatchEvent(savedEvent); });
    saveButton.classList.add('save-task');

    const deletedEvent = new Event('deleted', { bubbles: true, composed: true });
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => { this.dispatchEvent(deletedEvent); });
    deleteButton.classList.add('delete-task');

    buttonWrapper.append(saveButton, deleteButton);
    return buttonWrapper;
  }

  set data(data) {
    this.json = data;
    const styles = document.createElement('style');
    styles.innerHTML = style;
    const wrapper = document.createElement('div');
    wrapper.classList.add('task');
    const title = this.createTextarea(data.title, "Task Title", 'title');
    const description = this.createTextarea(data.description, "Task Description", 'description');
    const time = this.createTimeDiv(data.startTime, data.endTime);
    const tags = this.createTags(data.tags);
    const priorityDropdown = this.createPriorityDropdown(data.priority);
    const buttons = this.createButtons();

    this.addSaveEventListener(title, 'title');
    this.addSaveEventListener(description, 'description');
    this.addSaveEventListener(tags, 'tags');
    this.addSaveEventListener(priorityDropdown, 'priority');

    wrapper.append(title, description, time, tags, priorityDropdown, buttons);
    this.shadowRoot.append(styles, wrapper);
  }

  get data() {
    return this.json;
  }

  addSaveEventListener(element, field) {
    element.addEventListener('input', () => {
      if (field === 'tags') {
        this.json.tags = element.value.split(' ');
      } else if (field === 'priority') {
        this.json.priority = element.value;
        this.dispatchEvent(new Event('priority-changed', { bubbles: true, composed: true }));
      } else {
        this.json[field] = element.value;
      }
      this.saveToLocalStorage();
    });
  }

  saveToLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];
    const taskIndex = tasks.findIndex(t => t.id === this.json.id);
    if (taskIndex >= 0) {
      tasks[taskIndex] = this.json;
    } else {
      tasks.push(this.json);
    }
    localStorage.setItem('tasklist', JSON.stringify(tasks));
  }
}

customElements.define('task-element', TaskElement);
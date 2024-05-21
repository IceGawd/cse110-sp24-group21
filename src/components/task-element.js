// task-element.js
const style= `
/* Task style */
.task {
  position: relative;
  flex: 0 0 auto;
  margin-top: 0px; 
  padding: 10px;
  background-color: #f4f4f4;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Task title style */
.title {
  border: 1px solid #ddd;
  border-radius: 10px 10px 0 0;
  resize: none;
}

/* Task description style */
.description {
  border: 1px solid #ddd;
  resize: none;
}

/* Task tags style */
.tags {
  border: 1px solid #ddd;
  border-radius: 0 0 10px 10px;
  resize: none;
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
`;


class TaskElement extends HTMLElement {
  constructor() {
    super(); // inherets everything from HTMLElement
    this.attachShadow({ mode: 'open' }); // Creates the Shadow DOM
  }

  // Create textarea with inner text and placeholder text
  createTextarea(text, placeholderText, className) {
    const el = document.createElement('textarea');
    el.classList.add(className);
    el.innerHTML = text;
    el.placeholder = placeholderText
    return el;
  }

  // Create tag text by taking tags from arrays and adding spaces in between each tag
  createTags(arr) {
    const tags = document.createElement('textarea');
    tags.classList.add('tags');
    let tag_content = '';
    for (let t in arr) {
      tag_content += arr[t];
      tag_content += ' ';
    }
    tags.innerHTML = tag_content.trim();
    tags.placeholder = "Task Tags"
    return tags
  }
  
  // Creates save and delete buttons and binds them to special events
  createButtons() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('task-buttons');

    const savedEvent = new Event('saved', {bubbles: true, composed: true});
    const saveButton = document.createElement('button');
    saveButton.addEventListener('click', () => { this.dispatchEvent(savedEvent); });
    saveButton.classList.add('save-task');

    const deletedEvent = new Event('deleted', {bubbles: true, composed: true});
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => { this.dispatchEvent(deletedEvent); });
    deleteButton.classList.add('delete-task');

    buttonWrapper.append(saveButton, deleteButton);
    return buttonWrapper;
  }

  // Populates element when data is set
  set data(data) {
    // Store the data passed in for later
    this.json = data;

    // Get styles from hard coded styles, needed bc of the shadow DOM
    const styles = document.createElement('style');
    styles.innerHTML = style;

    // Create the task wrapper for the fields to nest inside
    const wrapper = document.createElement('div');
    wrapper.classList.add('task');

    // Create fields and buttons inside wrapper
    const title = this.createTextarea(data.title, "Task Title", 'title');
    const description = this.createTextarea(data.description, "Task Description", 'description');
    const tags = this.createTags(data.tags);
    const buttons = this.createButtons();

    // Add all of the above elements to the wrapper
    wrapper.append(title, description, tags, buttons);

    // Append the wrapper and the styles to the Shadow DOM
    this.shadowRoot.append(styles, wrapper);
  }

  get data() {
    return this.json;
  }

}

customElements.define('task-element', TaskElement);
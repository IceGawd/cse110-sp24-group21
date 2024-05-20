// task-element.js

class TaskElement extends HTMLElement {
  constructor() {
    super(); // inherets everything from HTMLElement
    this.attachShadow({ mode: 'open' }); // Creates the Shadow DOM
  }

  set data(data) {
    this.json = data; // Store the data passed in for later

    // Store the element styles in a <style> block, needed bc of the shadow DOM
    const styles = document.createElement('style');
    styles.innerHTML = `
      .task {
        position: relative;
        flex: 0 0 auto;
        margin-right: 10px;
        padding: 10px;
        background-color: #f4f4f4;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    
    .title {
        border: 1px solid #ddd;
        border-radius: 10px 10px 0 0;
        resize: none;
    }
    
    .description {
        border: 1px solid #ddd;
        resize: none;
    }
    
    .tags {
        border: 1px solid #ddd;
        border-radius: 0 0 10px 10px;
        resize: none;
    }
    
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
    
    .task-buttons > .save-task {
        height: 15px;
        width: 15px;
        padding-top: 5px;
    }
    
    .task-buttons > .delete-task {
        height: 25px;
        width: 25px;
    }
    `;

    // Create the outer wrapper for the product to nest inside
    const wrapper = document.createElement('div');
    wrapper.classList.add('task');

    // Create the task title
    const title = document.createElement('textarea');
    title.classList.add('title');
    title.innerHTML = data.title;

    // Create the task description
    const description = document.createElement('textarea');
    description.classList.add('description');
    description.innerHTML = data.description;

    // Create the task description
    const tags = document.createElement('textarea');
    tags.classList.add('tags');
    let tag_content = '';
    for (let t in data.tags) {
      tag_content += data.tags[t];
      tag_content += ' ';
    }
    tags.innerHTML = tag_content;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('task-buttons');

    const savedEvent = new CustomEvent('Saved', {bubbles: true, composed: true});
    const deletedEvent = new CustomEvent('Deleted', {bubbles: true, composed: true});
    const handler = this;
    const saveImg = document.createElement('img');
    saveImg.src = "../assets/icons/save.svg"
    saveImg.addEventListener('click', () => { handler.dispatchEvent(savedEvent) });
    saveImg.classList.add('save-task');
  
    const deleteImg = document.createElement('img');
    deleteImg.src = "../assets/icons/delete.svg"
    deleteImg.addEventListener('click', () => { handler.dispatchEvent(deletedEvent) });
    deleteImg.classList.add('delete-task');

    buttonWrapper.append(saveImg, deleteImg);

    // Add all of the above elements to the wrapper
    wrapper.append(title, description, tags, buttonWrapper);

    console.log(wrapper);

    // Append the wrapper and the styles to the Shadow DOM
    this.shadowRoot.append(styles, wrapper);
  }

  get data() {
    return this.json;
  }

}

customElements.define('task-element', TaskElement);
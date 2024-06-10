document.addEventListener('DOMContentLoaded', () => {
    populateTaskList();
    document.getElementById('task-search').addEventListener('input', filterTasks);
});


/**
 * Populates the task list with tasks from local storage.
 */
function populateTaskList() {
    const taskList = document.getElementById('list');
    const tasks = JSON.parse(localStorage.getItem('tasklist')) || {};
    const taskEntries = Object.values(tasks).flat();
    const addTaskButton = document.querySelector('.add-task');

    taskEntries.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.insertBefore(taskElement, taskList.querySelector('#end-of-tasks'));
    });

    // Redirect to the tasks page if user clicks on the add task button at the home page
    addTaskButton.addEventListener('click', () => {
        window.location.href = './tasks.html';
    });
}

/**
 * Creates a task HTML element with the given task data.
 *
 * @param {*} task - The task object containing task details.
 * @returns {*} - The created task list item element.
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('home-task');
    li.dataset.labels = task.labels.join(' ');

    const priorityColors = {
        low: 'green',
        medium: 'orange',
        high: 'red'
    };

    li.innerHTML = `
      <svg height="40" width="40">
        <circle r="18" cx="20" cy="20" fill="${priorityColors[task.priority]}" stroke="black" stroke-width="3" />
      </svg>
      <h3 class="task-name">${task.title}</h3>
      <p class="due-date">${new Date(task.date).toLocaleDateString()}</p>
      <button class="delete-btn">
        <img src="../assets/icons/delete.svg" alt="Delete Task" />
      </button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteTask(task.id, task.date);
        li.remove();
    });

    return li;
}

/**
 * Delete a task in local storage task list based on task ID and date.
 * 
 * @param {*} taskId - The id of the task to be deleted.
 * @param {*} taskDate - The date of the task to be deleted.
 */
function deleteTask(taskId, taskDate) {
    const tasks = JSON.parse(localStorage.getItem('tasklist')) || {};
    tasks[taskDate] = tasks[taskDate].filter(task => task.id !== taskId);

    if (tasks[taskDate].length === 0) {
        delete tasks[taskDate];
    }

    localStorage.setItem('tasklist', JSON.stringify(tasks));
}


/**
 * Filters tasks displayed on the home webpage based on the search query.
 * Allows user to search tasks by label names in the home page. 
 *
 */
function filterTasks() {
    const searchQuery = document.getElementById('task-search').value.toLowerCase();
    const taskItems = document.querySelectorAll('.home-task');

    taskItems.forEach(taskItem => {
        const labels = taskItem.dataset.labels.toLowerCase();
        if (labels.includes(searchQuery)) {
            taskItem.style.display = '';
        } else {
            taskItem.style.display = 'none';
        }
    });
}
# **Backend Documentation**
Below is a breakdown of documentation for backend.

## **JSON Structure**
Detailing of the JSON structure used to load tasks

NOT FINALIZED \
tasks.json
```
[
    {
      "id": 123456,
      "title": "Example Task",
      "assignDate": "2024-05-18T13:37:27Z",
      "dueDate": "2024-05-20T23:59:59Z",
      "description": "Just an example task used for testing purposes",
      "tags": ["python", "logistics"]
    },
    {
      "id": 654321,
      "title": "Example Task 2",
      "assignDate": "2024-05-12T13:37:27Z",
      "dueDate": "2024-05-24T23:59:59Z",
      "description": "Just an example task used for testing purposes",
      "tags": ["java", "MATLAB"]
    }
]
```
## **Functions**
Documentation of all functions used in the backend \
**Detail the function name, input parameters, return type (optional), and function logic (briefly in bullet points should do)

**Examples:**
- display(taskData) →takes in a JSON element (task list), and updates the HTML accordingly
  - Changes header title, and then adds the tasks individually 
- colorChange() → toggles between dark mode and light mode when button is clicked
  - Changes background of body and container separately
  - Dropdown arrows for tasks have four different states (down and right) x (light and dark), so each arrow has three class parameters in the format “task-icon light-mode-icon right-icon” (task-icon to get all arrows, light-mode-icon to determine whether it is currently light mode (arrow is black) or dark mode (arrow is white), and right-icon to determine whether the dropdown is expanded or not) → these can be read by classList and changed when light/dark mode is activated
# **Backend Documentation**
Below is a breakdown of documentation for backend.

## **JSON Structure**
Detailing of the JSON structure used to load tasks

Updated 05/28/2024 \
`tasks.json`
```
[
    {
      "id": 123456,
      "title": "Example Task",
      "date": "05/20/2024",
      "startTime": "08:00",
      "endTime": "09:59",
      "description": "Just an example task used for testing purposes",
      "tags": ["python", "logistics"],
      "priority": "low"
    },
    {
      "id": 654321,
      "title": "Example Task 2",
      "date": "05/22/2024",
      "startTime": "10:00",
      "endTime": "12:00",
      "description": "Just an example task used for testing purposes",
      "tags": ["java", "MATLAB"],
      "priority": "high"
    }
]
```

`localStorage.entries`:
```
{
  "YYYY-MM-DD": {
    "title": "Title or something",
    "entry": "Entry text. Probably in markdown format?",
    "labels": ["not sure if these", "should be tag ids", "or actual words", "do we want tags to be editable?"]
  },
  "YYYY-MM-DD": {
    "title": "Title or something",
    "entry": "Entry text. Probably in markdown format?",
    "labels": ["not sure if these", "should be tag ids", "or actual words", "do we want tags to be editable?"]
  }
}
```

entry blurbs (for sidebar) will be ~45 characters long

## **Functions**
Documentation of all functions used in the backend \
**Detail the function name, input parameters, return type (optional), and function logic (briefly in bullet points should do)
git p
**Examples:**
- display(taskData) →takes in a JSON element (task list), and updates the HTML accordingly
  - Changes header title, and then adds the tasks individually 
- colorChange() → toggles between dark mode and light mode when button is clicked
  - Changes background of body and container separately
  - Dropdown arrows for tasks have four different states (down and right) x (light and dark), so each arrow has three class parameters in the format “task-icon light-mode-icon right-icon” (task-icon to get all arrows, light-mode-icon to determine whether it is currently light mode (arrow is black) or dark mode (arrow is white), and right-icon to determine whether the dropdown is expanded or not) → these can be read by classList and changed when light/dark mode is activated
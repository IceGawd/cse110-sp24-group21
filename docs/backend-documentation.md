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
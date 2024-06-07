# **Frontend Documentation**

Maintained by: Abdulaziz, Peter, Luca, Michael, Kane, Diego

*Last Updated: June 6, 2024*

Below is documentation for our frontend, which elaborates on our choice of our UI design implementation.

## **Overview**
- [Home Page](#home)
- [Navbar](#navbar)
- [Journal Entries](#journal-entries)
- [Calendar](#calendar-page)
- [Task Lists](#task-list)

### **Home**
The home page acts as a key interface for displaying and previewing the three main components of our application: The Journal Entries, the Calendar, and the Task List. Therefore, the source code of these parts were modifications from the implementation in their respective pages (more discussed below) with modifications to styling to match our homepage interface. We enhanced user experience by allowing for scrolling for the entries and task display.

### **Navbar**
The navbar is a custom element created to navigate through the different pages. It is implemented through a  `my-navbar` element. 

Each "button" is housed in a `nav-group` `div` which contains a hyperlink to the respective page for direction and an image icon.

It also has a maximize/minimize feature for varying UI. When maximized, there is a name of the respective page shown next to the icons.

For specific styling implementation and details, refer to `src/components/navbar.js`.



### **Journal Entries**
The journal entries page can be divided into two sections: a scrollable section on the left for the user to create, select, modify and delete journal entries, and a section on the right which is used to view the detailed journal entries themselves.

#### Display

- The left portion is implemented as an ordered list and extracts key information for the user to distinguish between the journal entries, which are scrollable.

- The entries are dynamically populated; refer to backend documentation for logic behind search and HTML DOM population.


#### Structure

- Create and edit buttons show a pop up to write the task title, date, and a description, which was implemented by a `form` element.

- Details of each task on the left section are housed within a `div` within the `li` to compartmentalize the entries further and allow for more custom design that matches our final outline (refer to UI documentation)


### **Calendar Page**
The calendar page can be divided into two parts: the left which includes a dynamic calendar and a list of upcoming tasks, as well as a right part which includes a weekly task display based on time and day of the week.

#### Display
The dynamic calendar itself is displayed via `showCalendar` function which adds the HTML date cells and buttons

The dynamic display portion relies on `currentMonth` and `currentYear` implementation to show the current dates appropriately (See `calendar.js` for implementation details).

#### Structure

- The weekly calendar display was designed using a HTML `table` structure, where each individual cell is fixed in size and amounts to a 30 minute time slot of the day. 

- Table rows `tr` were indicated with `r{specific_time}` to allow backend dynamic task population at specific times. 

- Table data entries `td` with `class="time"` were used to indicate "whole hour" marks and displayed uniquely with a solid horizontal border. 

- The table row with `id="weekdays"` in the `thead` displayed the days of the week, where each individual `th` element included two `h2` elements to with ids to indicate their unique dates and allow for dynamic navigation.

### **Task List**
The Task List is composed of two main dividers: a top one to navigate between the weeks, and another large one to display the tasks of the week. 

#### Display
The buttons and date object allow for navigation (connected with the backend) to dynamically show corresponding week tasks. To accomodate for better user experience, the task lists view is scrollable horizontally for the user to view their desired date within the week.

#### Structure
- Each day of the week was housed in a `div` container with `class="day-container"`.

- The `add-task` button dynamically populates a custom `task-element` object.

- Each `task-element` is broken down into `textarea` for description, `time-div` to display time, `tags` for tags, and `priority-dropdown` to set task priorities. Refer to `src/components/task-element.js` for implementation details.
let daysArray = [];

// Testing hashmap
let task1 = {
    date: "2024/06/02",
    description: "",
    endTime: "06:45",
    id: 1258705,
    priority: "low",
    startTime: "04:00",
    tags: [],
    title: "Task 1 very long task name ksdghjshgjhdgjhagjhdasjghv jsjdhgja jsdhgdja",
    color: "green"
};

let task2 = {
    date: "2024/07/02",
    description: "",
    endTime: "14:59",
    id: 1258705,
    priority: "low",
    startTime: "12:00",
    tags: [],
    title: "Task 2",
    color: "blue"
};

let task3 = {
    date: "2024/07/03",
    description: "",
    endTime: "18:59",
    id: 1258705,
    priority: "low",
    startTime: "13:00",
    tags: [],
    title: "Task 2",
    color: "red"
};

let task4 = {
    date: "2024/07/07",
    description: "",
    endTime: "17:30",
    id: 1258705,
    priority: "low",
    startTime: "16:59",
    tags: [],
    title: "Task 4 ksdghaighispjhghghl",
    color: "purple"
};

let task5 = {
    date: "2024/07/03",
    description: "",
    endTime: "19:59",
    id: 1258705,
    priority: "low",
    startTime: "14:00",
    tags: [],
    title: "Task 5",
    color: "red"
};
let task6 = {
    date: "2024/06/06",
    description: "blah blah blah",
    endTime: "10:00",
    id: 1258705,
    priority: "low",
    startTime: "1:00",
    tags: [],
    title: "Task 6",
    color: "blue"
};
let task7 = {
    date: "2024/06/06",
    description: "blah blah blah",
    endTime: "10:00",
    id: 1258705,
    priority: "low",
    startTime: "6:00",
    tags: [],
    title: "Task 7",
    color: "orange"
};
let task8 = {
    date: "2024/09/14",
    description: "blah blah blah",
    endTime: "10:00",
    id: 1258705,
    priority: "low",
    startTime: "00:00",
    tags: [],
    title: "Task 8",
    color: "pink"
};
let task9 = {
    date: "2024/06/02",
    description: "blah blah blah",
    endTime: "14:30",
    id: 1258705,
    priority: "low",
    startTime: "14:00",
    tags: [],
    title: "Task 9",
    color: "green"
};
let task10 = {
    date: "2024/06/03",
    description: "blah blah blah",
    endTime: "20:00",
    id: 1258705,
    priority: "low",
    startTime: "17:00",
    tags: [],
    title: "Task 10",
    color: "orange"
};
let task11 = {
    date: "2024/06/04",
    description: "blah blah blah",
    endTime: "14:00",
    id: 1258705,
    priority: "low",
    startTime: "12:00",
    tags: [],
    title: "Task 11",
    color: "red"
};

// Array of tasks
let tasks = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11];

// Create a Map to hold the date-task pairs
let taskMap = new Map();

// Populate the Map with tasks
tasks.forEach(task => {
    let date = task.date;
    if (!taskMap.has(date)) {
        taskMap.set(date, []);
    }
    taskMap.get(date).push(task);
});

// Example of accessing the tasks for a specific date
console.log(taskMap.get("2024/06/02")); // Outputs: Array with task1 and task2
console.log(taskMap.get("2024/06/03")); // Outputs: Array with task3 and task5
console.log(taskMap.get("2024/06/07")); // Outputs: Array with task4


// Function to generate a range of 
// years for the year select input
function generate_year_range(start, end) {
	let years = "";
	for (let year = start; year <= end; year++) {
		years += "<option value='" +
			year + "'>" + year + "</option>";
	}
	return years;
}

// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;

const calendar = document.getElementById("calendar");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

$dataHead = "<tr>";
for (dhead in days) {
	$dataHead += "<th data-days='" +
		days[dhead] + "'>" +
		days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear = document.getElementById("month-and-year");

// Function to navigate between next/prev months
function next() {
	currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

function previous() {
	currentYear = currentMonth === 0 ?
		currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ?
		11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

// Function to jump to a specific month and year
function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

// Filled Cell Function used as a sub-function of showCalendar
function addFilledCell(j, date,row, year, month) {
	cell = document.createElement("td");
	cell.setAttribute("data-date", date);
	cell.setAttribute("data-month", month + 1);
	cell.setAttribute("data-year", year);
	cell.setAttribute("data-month_name", months[month]);
	cell.setAttribute('data-day_of_week', j + 1);
	cell.className = "date-picker";
	cell.innerHTML = "<span>" + date + "</span";
	if (
		date === today.getDate() && 
		year === today.getFullYear() &&
		month === today.getMonth() && document.querySelector(".date-picker.selected") == null
	) {
		cell.className = "date-picker selected";
	}
	row.appendChild(cell);
}

// Function to display the calendar
function showCalendar(month, year) {
	let firstDay = new Date(year, month, 1).getDay();
	tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";
	monthAndYear.innerHTML = months[month] + " " + year;
	selectYear.value = year;
	selectMonth.value = month;

	let date = 1;
	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				addFilledCell(j, date, row, year, month);
				date++;
			}
		}
		tbl.appendChild(row);
	}
	// let datesForWeek = getDatesForWeek();
	// changeDateHeader(datesForWeek);
	datesIntoButtons();
	//addNewTasks(datesForWeek);
}

// display calendar
showCalendar(currentMonth, currentYear);

// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}
/**
 * Function to make every valid date cell of the calendar a button
 */
function datesIntoButtons(){
	let dates = document.querySelectorAll(".date-picker");
	for(let i = 0; i < dates.length; i++){
		dates[i].addEventListener("click", () => {
			if(document.querySelector(".date-picker.selected") != null){
				document.querySelector(".date-picker.selected").className = "date-picker";
			}
			dates[i].className = "date-picker selected";
			let datesForWeek = getDatesForWeek();
			changeDateHeader(datesForWeek);
			clearTasks();
			addNewTasks(datesForWeek);
		});
	}
}
function formatDate(month, day, year){
	month = JSON.stringify(month);
	year = JSON.stringify(year);
	day = JSON.stringify(day);
	let formatMonth = month < 10 ? 0 + month : month;
	let formatDay = day < 10 ? 0 + day : day;
	let formatDate = year + '/' + formatMonth + '/' + formatDay;
	return formatDate;
}
/**
 * Function to add a date in the correct format to the date array that contains the dates of a given week to display
 */
function addDateArr(datesArr, year, month, day){
	let dateFormatted = formatDate(month + 1,day, year); //add one because months was previously used with january being 0
	datesArr.push({
		dayOfMonth: day,
		date : dateFormatted
	});
}

/**
 * Function get the dates for a specific week to display
 */
function getDatesForWeek(){ 
	let dateSelected = document.querySelector(".date-picker.selected");
	let dofW = parseInt(dateSelected.dataset['day_of_week'], 10);
	let offset = 7 - dofW;
	let date = parseInt(dateSelected.dataset['date'], 10);
	let monthSelected = parseInt(dateSelected.dataset['month'],10) - 1;
	let yearSelected = parseInt(dateSelected.dataset['year'],10);
	let datesReturned = [];
	if(date < dofW){ //case where begin columns are blank
		let numBlank = dofW - date;
		let prevMonth = monthSelected === 0 ?
		11 : monthSelected - 1;
		let prevYear = monthSelected === 0 ?
		yearSelected - 1 : yearSelected;
		for(let i = numBlank; i > 0; i--){
			let dateToAdd = daysInMonth(prevMonth, prevYear) - (i - 1);
			addDateArr(datesReturned, prevYear, prevMonth, dateToAdd);
		}
		for(let i = 1; i <= 7 - numBlank; i++){
			addDateArr(datesReturned, yearSelected, monthSelected, i);
		}

	} else{ //case where whole row is filled or last columns are empty
		for(let i = 1; i <= dofW; i++){ //get dates previous to selected date in row
			let dateToAdd = date - (dofW - i);
			addDateArr(datesReturned, yearSelected, monthSelected, dateToAdd);
		}
		for(let i = dofW + 1; i <= 7; i++){
			let dateToAdd = date + (i - dofW);
			if((date + offset) > daysInMonth(monthSelected, yearSelected)){
				dateToAdd = i - dofW;
				yearSelected = monthSelected === 11 ? yearSelected + 1 : yearSelected;
			}
			addDateArr(datesReturned, yearSelected, monthSelected, dateToAdd);
		}
	}
	return datesReturned;
}
/**
 * Function to change the date header to the selected day
 */

function changeDateHeader(datesArr){
	let tableHeaders = document.querySelectorAll('.day-detail');
	for(let i = 0; i < 7 && i+1 < tableHeaders.length; i++){
		let headerDate = tableHeaders[i+1].querySelectorAll('h2')[1];
		headerDate.innerHTML = datesArr[i].dayOfMonth;
	}
}
/**
 * Function to clear the tasks that are being displayed for a selected date
 */
function clearTasks(){
	let allTasks = document.querySelectorAll(".task"); 
	if(!allTasks){
		return;
	}
	let numTasks = allTasks.length;
	for(let i = 0; i < numTasks; i++){
		allTasks[i].remove();
	}
}

/**
 * Function to get the tasks for a given week in the form of an array with seven elements,
 * each element containing an array with tasks for the corresponding day of the week
 */
function getWeekTasks(datesArr){
	let tasksArr = [];
	for(let i = 0; i < 7; i++){
		tasksArr.push(taskMap.get(datesArr[i]['date']));
	}
	return tasksArr;
}

/**
 * Function to round a given time (in the format "00:00") to the nearest 30 minutes
 */
function roundTimeBy30(timeUnrounded){
	let [hr, min] = timeUnrounded.split(":").map(part => parseInt(part, 10));
	if( min < 15){
		min = 0;
	} else if( min <= 30){
		min = 30;
	} else if(min < 45){
		min = 30
	} else{
		min = 0;
		hr += 1;
	}
	return [hr, min];
}

/**
 * Function to format the tasks for each day to be an array where each element is an object
 * containg the task, rounded start time, rounded end time
 */
function roundedFormat(tasksForDay){
	let roundedFormat = [];
	if(!tasksForDay){
		return;
	}
	for(let i = 0; i < tasksForDay.length; i++){
		let singleTask = tasksForDay[i];
		const timeStart = singleTask['startTime'];
		let newStart = roundTimeBy30(timeStart);
		const timeEnd = singleTask['endTime'];
		let newEnd = roundTimeBy30(timeEnd);
		let taskInfoObj = {
			task: tasksForDay[i],
			roundStart: newStart,
			roundEnd: newEnd
		}
		roundedFormat.push(taskInfoObj);

	}
	return roundedFormat;
}

/**
 * Function to get the number of rows a given task that will be displayed
 */
function mathRowLength(singularTask){
	const startHr = singularTask['roundStart'][0];
	const startMin = singularTask['roundStart'][1];
	const endHr = singularTask['roundEnd'][0];
	const endMin = singularTask['roundEnd'][1];
	const result = 2 * (endHr - startHr) + (Math.abs(startMin - endMin) / 30);//calculate number of rows
	return result; //multiply the result by 40 to get the exact number length of a task in pixels (one row is 40 pixels)
}

/**
 * Function to compare if a given tasks is after another task (or has an later start time) 
 * useful because you want to populate calendar in backwards chronological order for overlapping 
 */
function compareIsAfter(task1, task2){
	const hour1 = task1['roundStart'][0];
	const minute1 = task1['roundStart'][1];
	const hour2 = task2['roundStart'][0];
	const min2 = task2['roundStart'][1];
	if (hour1 < hour2 || (hour1 === hour2 && minute1 < minute2)) {
		return -1; //task 1 is after
	} else if (hour1 > hour2 || (hour1 === hour2 && minute1 > minute2)) {
		return 1; //task 2 is after
	} else {
		return 0; //they have same start time
	}
}

/**
 * Function to sort the tasks array by earliest start time
 */
function sortTasks(tasksForDay){ 
	if(!tasksForDay){
		return;
	}
	for(let i = 1; i < tasksForDay.length; i++){
		let curr = tasksForDay[i];
		let j = i -1;
		while(j >= 0 && compareIsAfter(tasksForDay[j], curr) > 0){
			tasksForDay[j + 1] = tasksForDay[j];
			j--;
		}
		tasksForDay[j+1] = curr;
	}
	return tasksForDay;
}
/**
 * Function to display tasks for a given week on the grid
 */
async function addNewTasks(datesArr){
	let tasksForWeek = getWeekTasks(datesArr);
	console.log("tasksForWeek")
	console.log(tasksForWeek)
	console.group();
	console.log(!tasksForWeek)
	if(!tasksForWeek){
		console.log("tasksForWeek undefined")
		return;
	}
	for(let i = 0; i < tasksForWeek.length; i++){
		let tasksForDay = tasksForWeek[i];
		console.log("tasksForDay")
		console.log(tasksForDay)
		if(!tasksForDay){
			continue;
		}
		tasksForDay = roundedFormat(tasksForDay);
		tasksForDay = sortTasks(tasksForDay);
		for(let j = 0; j < tasksForDay.length; j++){
			let taskLen = mathRowLength(tasksForDay[j]);
			let hr = tasksForDay[j]['roundStart'][0] < 10 ? "0" + JSON.stringify(tasksForDay[j]['roundStart'][0]) : JSON.stringify(tasksForDay[j]['roundStart'][0]);
			let min = tasksForDay[j]['roundStart'][1] === 0 ? "00" : "30";
			let rowId = "r" + hr + min;
			console.log(rowId)
			displaytaskCalendar(rowId, i + 1, tasksForDay[j]['task'], taskLen);
		}

	}
	console.groupEnd();
}

/**
 * Function to add upcoming tasks to the Upcoming Tasks section
 */
function populateUpcoming(){
	const upcomingBox = document.getElementById("upcoming-container"); //new elements will be appended to this
	let date = today.getDate();
	let monthSelected = today.getMonth() + 1;
	let yearSelected = today.getFullYear();
	date = formatDate(monthSelected, date, yearSelected);
	//get tasks for that day
	let tasksArr = taskMap.get(date);
	if(!tasksArr){
		let upcomingHdr = document.getElementById("upcoming-header");
		upcomingHdr.innerHTML = "No Tasks For Today";
		return;
	}
	
	for(let i = 0; i < tasksArr.length; i++){
		let newUpcoming = document.createElement("div");
		newUpcoming.className = "upcoming";
		let newH2 = document.createElement("h2");
		newH2.innerHTML = tasksArr[i]['title'];
		let newDate = document.createElement("p");
		newDate.className = "upcoming-date";
		newDate.innerHTML = tasksArr[i]['date'];
		let newDesc = document.createElement("p");
		newDesc.className = "upcoming-desc";
		newDesc.innerHTML = tasksArr[i]['description'];
		upcomingBox.append(newUpcoming);
		newUpcoming.appendChild(newH2);
		newUpcoming.append(newDate);
		newUpcoming.append(newDesc);

	}
}
document.addEventListener("DOMContentLoaded",()=>{
	populateUpcoming();
	let datesForWeek = getDatesForWeek();
	changeDateHeader(datesForWeek);
	addNewTasks(datesForWeek);

});
function updateTaskPos(newElem, cell, len){
	const rect = cell.getBoundingClientRect();
    newElem.style.top = `${rect.top}px`;
    newElem.style.left = `${rect.left}px`; 
	newElem.style.width = `${rect.width}px`;
	newElem.style.height = `${rect.height * len}px`;
}
/**
 * Function to display a singular task to its correct location on the grid
 */
function displaytaskCalendar(rowId, col, task,len) {
    const rCont = document.querySelector(".right-container");
    let newElem = document.createElement("div");
    newElem.className = "task";
    newElem.style.position = "absolute";
    newElem.textContent = task['title']; 
	newElem.style.backgroundColor = task['color'];
	//newElem.style.width = dimensions[0]; //gets width of element

    rCont.appendChild(newElem);
    let row = document.getElementById(rowId);
    let cells = row.querySelectorAll("td");
    let cell = cells[col]; 

	updateTaskPos(newElem, cell, len);

    // Update the position on scroll
    rCont.addEventListener("scroll", () => {
		updateTaskPos(newElem, cell, len);
    });
	//Update the position on page resizing
	window.addEventListener("resize", () => {
		updateTaskPos(newElem, cell, len);
    });
	let minBar = document.querySelector(".minimized");
	let sR = minBar.shadowRoot;
	let minButton = sR.getElementById('minimize-btn');
	//Update the position when side bar is minimized
	minButton.addEventListener("click", () => {
		updateTaskPos(newElem, cell, len);
	});
}

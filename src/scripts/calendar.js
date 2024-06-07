let daysArray = [];

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
	let formatDate = formatMonth + '/' + formatDay+ '/' + year;
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
	let allDayElems = document.getElementById("allday-tasks").querySelectorAll("th");
	for(let i = 1; i < allDayElems.length; i++){
		let pars = allDayElems[i].querySelectorAll("div");
		for(let j = 0; j < pars.length; j++){
			pars[j].innerHTML = "";
			pars[j].style.backgroundColor = "lightgray";
		}
	}
	if(!allTasks){
		return;
	}
	let numTasks = allTasks.length;
	for(let i = 0; i < numTasks; i++){
		allTasks[i].remove();
	}
}
function getTaskMap(){
	let tMap = {};
	let tasklist = localStorage.getItem('tasklist');
	if(tasklist == null){
		return tMap; //empty tMap
	}
	tMap = JSON.parse(tasklist);
	return tMap;
}

/**
 * Function to get the tasks for a given week in the form of an array with seven elements,
 * each element containing an array with tasks for the corresponding day of the week
 */
function getWeekTasks(datesArr){
	let tasksArr = [];
	let tMap = getTaskMap();
	for(let i = 0; i < 7; i++){
		tasksArr.push(tMap[datesArr[i]['date']]);
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
	const minute2 = task2['roundStart'][1];
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
	if(!tasksForWeek){
		return;
	}
	for(let i = 0; i < tasksForWeek.length; i++){
		let tasksForDay = tasksForWeek[i];
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
			displaytaskCalendar(rowId, i + 1, tasksForDay[j]['task'], taskLen);
		}

	}
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
	let taskMap = getTaskMap();
	let tasksArr = taskMap[date];
	if(!tasksArr){
		let upcomingHdr = document.getElementById("upcoming-header");
		upcomingHdr.innerHTML = "No Tasks For Today";
		return;
	}
	
	for(let i = 0; i < tasksArr.length; i++){
		let newUpcoming = document.createElement("div");
		if(!newUpcoming){
			console.log("failed to create a upcoming div for task");
			continue;
		}
		newUpcoming.className = "upcoming";

		let newH2 = document.createElement("h2");
		if(!newH2){
			console.log("failed to create a new h2 element for task");
			newUpcoming.remove();//remove what was previously created
			continue;
		}
		newH2.innerHTML = tasksArr[i]['title'];

		let newDate = document.createElement("p");
		if(!newDate){
			console.log("failed to create a new p element for task (for date) ");
			newUpcoming.remove();
			newH2.remove();
			continue;
		}
		newDate.className = "upcoming-date";
		newDate.innerHTML = tasksArr[i]['date'];

		let newDesc = document.createElement("p");
		if(!newDesc){
			console.log("failed to create a new p element for task (for description)");
			newUpcoming.remove();
			newH2.remove();
			newDate.remove();
			continue;
		}
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
	if(len == 0){
		len == 1; //if a task was less than 15 minutes long, make it still be displayed in 1 cell;
	}
	if(len == 48){ //all day task
		let allDayElems = document.getElementById("allday-tasks").querySelectorAll("th");
		let newPar = document.createElement("div");
		if(!newPar){
			console.log("failed to create p element for all day task");
			return;
		}
		newPar.innerHTML = task['title'];
		newPar.style.backgroundColor = task['color'];
		newPar.style.color = "white";
		allDayElems[col].append(newPar);
		return;
	}
    const rCont = document.querySelector(".right-container");
    let newElem = document.createElement("div");
    newElem.className = "task";
    newElem.style.position = "absolute";
    newElem.textContent = task['title']; 
	newElem.style.backgroundColor = task['color'];
	//newElem.style.width = dimensions[0]; //gets width of element
	if(!newElem){
		console.log("creating new div for task to be displayed failed")
		return;
	}
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

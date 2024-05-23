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
function addFilledCell(j, row, year, month) {
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
		month === today.getMonth()
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
				addFilledCell(j, row, year, month);
				date++;
			}
		}
		tbl.appendChild(row);
	}
	datesIntoButtons();
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
			changeDateHeader();
			clearTasks();
			addNewTasks();
		});
	}
}
/**
 * Function to change the date header to the selected day
 */
function changeDateHeader() {
	let dateHeader = document.getElementById("curr-day");
	let date = document.querySelector(".date-picker.selected");
	let dofW = date.dataset['day_of_week'];
	switch (dotW) {
		case 1:
			dofW = "Sunday"; break;
		case 2:
			dofW = "Moday"; break;
		case 3:
			dofW = "Tuesday"; break;
		case 4:
			dofW = "Wednesday"; break;
		case 5:
			dofW = "Thursday"; break;
		case 6:
			dofW = "Friday"; break;
		case 7:
			dofW = "Saturday"; break;
	}
	dateHeader.innerHTML = dofW + ", " + date.dataset['month_name'] + " " + date.dataset['date'];

}
/**
 * Function to clear the tasks that are being displayed for a selected date
 */
function clearTasks(){
	allEvents = document.querySelectorAll(".events");
	for(let i = 0; i < allEvents.length; i++){
		//remove all tasks from each hour
	}
}
/**
 * Function to display the tasks that correspond to a selected day in its appropriate time slot
 */
function addNewTasks(){

}
/**
 * Function to add upcoming tasks to the Upcoming Tasks section
 */
function populateUpcoming(){
	const upcomingBox = document.getElementById("upoming-container");
	//use current date
	//find tasks assigned to it 


}
let daysArray = [];

/**
 * Generates the range of years between start and end boundaries
 * 
 * @param {number} start - the start year
 * @param {number} end - the end year
 * @returns {string} HTML DOM string
 */
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

/**
 * Function to navigate to next month
 * 
 * Calls showCalendar function to display after navigation
 */
function next() {
	currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

/**
 * Function to navigate to previous month
 * 
 * Calls showCalendar function to display after navigation
 */
function previous() {
	currentYear = currentMonth === 0 ?
		currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ?
		11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

/**
 * Function to navigate to jump to a specific month and year
 * 
 * Calls showCalendar function to display after navigation
 */
function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

/**
 * Adds a filled cell to the calendar row with the specified date
 * 
 * This function creates a table cell (`<td>`) element for a given date, sets
 * various attributes to the cell (like date, month, year, etc.), and appends it
 * to the provided row. It also marks the cell as "selected" if the date matches
 * the current date.
 * 
 * @param {number} j - The column index of the calendar
 * @param {number} date - The date of the month
 * @param {HTMLElement} row - The row to which the cell will be appended
 * @param {number} year - The year currently being viewed
 * @param {number} month - The month currently being viewed
 */
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

/**
 * Displays a calendar for a given month and year
 * 
 * This function generates a calendar for the specified month and year, and
 * displays it in an HTML table with the ID "calendar-body". It updates the 
 * display to show the correct month and year, and fills in the calendar days.
 * 
 * @param {number} month - The month for which to display the calendar
 * @param {number} year - The year for which to display the calendar
 */
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
}
// display calendar
showCalendar(currentMonth, currentYear);

/**
 * Helper function to get the number of days in specified month
 * 
 * Calculates the number of days in a given month and year
 * 
 * @param {number} iMonth - the month for which to calculate the number of days
 * @param {number} iYear - the year for which to calculate the number of days
 * @returns {number} The number of days specified in the month
 */
function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}
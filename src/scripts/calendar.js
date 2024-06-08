import { formatDate, clearTasks, getTaskMap, addNewTasks} from "./calendar_task_display.js"

/**
 * Function to make every valid   date cell of the calendar a button 
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
 * Function to get the dates for a specific week to display, 
 * or the case some of the dates for the week include the prior month
 */
function casePriorMonthIncluded(datesArr, numBlank, monthSelected, yearSelected){
	let prevMonth = monthSelected === 0 ?
		11 : monthSelected - 1;
	let prevYear = monthSelected === 0 ?
		yearSelected - 1 : yearSelected;
	for(let i = numBlank; i > 0; i--){
		let dateToAdd = daysInMonth(prevMonth, prevYear) - (i - 1);
		addDateArr(datesArr, prevYear, prevMonth, dateToAdd);
	}
	for(let i = 1; i <= 7 - numBlank; i++){
		addDateArr(datesArr, yearSelected, monthSelected, i);
	}
}
/**
 * Function to get the dates for a specific week to display, 
 * for the cases where all the dates of the week are in the current month or some are in the next month
 */
function casePriorMonthExcluded(datesArr, yearSelected, monthSelected, dofW, date){
	let offset = 7 - dofW;
	let nextYear =  monthSelected === 11 ? yearSelected + 1 : yearSelected;
	let nextMonth = monthSelected == 11 ? 0 : monthSelected + 1;
	for(let i = 1; i <= dofW; i++){ //get dates previous to selected date in row
		let dateToAdd = date - (dofW - i);
		addDateArr(datesArr, yearSelected, monthSelected, dateToAdd);
	}
	for(let i = dofW + 1; i <= 7; i++){
		let dateToAdd = date + (i - dofW);
		if((date + offset) > daysInMonth(monthSelected, yearSelected)){
			dateToAdd = i - dofW;
			addDateArr(datesArr, nextYear, nextMonth, dateToAdd);
			continue;
		}
		addDateArr(datesArr, yearSelected, monthSelected, dateToAdd);
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
		if(!upcomingHdr){
			return;
		}
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
	if(date < dofW){ //case where begin columns are blank (so some of the dates come from prior month)
		let numBlank = dofW - date;
		casePriorMonthIncluded(datesReturned, numBlank, monthSelected, yearSelected);

	} else{ //case where whole row is filled or last columns are empty
		casePriorMonthExcluded(datesReturned, yearSelected, monthSelected, dofW, date);
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
document.addEventListener("DOMContentLoaded",()=>{
	populateUpcoming();
	let datesForWeek = getDatesForWeek();
	changeDateHeader(datesForWeek);
	datesIntoButtons();
	addNewTasks(datesForWeek);
	let nextButton = document.getElementById("next");
	nextButton.addEventListener("click", () => {
		next();
		datesIntoButtons();
	});
	let prevButton = document.getElementById("previous");
	prevButton.addEventListener("click", ()=>{
		previous();
		datesIntoButtons();
	});
	let monthButton = document.getElementById("month");
	monthButton.addEventListener("change", ()=>{
		jump();
		datesIntoButtons();
	});
	let yearButton = document.getElementById("year");
	yearButton.addEventListener("change", ()=>{
		jump();
		datesIntoButtons();
	});
	
});
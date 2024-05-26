import { storage } from './storage.js';

let entries; //dict of entries, keys are strings of dates YYYY-MM-DD
let months = ['', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
let blurbLength = 45; //length of sidebar entry blurbs in characters

window.addEventListener('DOMContentLoaded', init);

/**
 * 
 */
function init(){
    entries = storage.getItems('entries');
    populatePage();
}

function populatePage(){
    //If no entries, leave page in default state
    if(Object.keys(entries).length == 0){
        return;
    }
    let entryList = document.getElementsByClassName('entry-list')[0];
    entryList.innerHTML = '';
    //hopefully gets the entries in order by date (most recent)
    let dates = Object.keys(entries).sort((a, b) => (a==b)? 0 : (a > b)? -1 : 1);
    //adding each entry on the sidebar, and adding listeners
    for(let i = 0; i<dates.length; ++i){
        dispEntry(dates[i]);
    }
    //sets entry-container to most recent entry
    setFocus(dates[0]);
}

/**
 * Takes in a date (?), sets the focused entry (the one in entry-container) to the entry of that date
 * If no date is selected, do nothing
 * @param {string} id - YYYY-MM-DD string also used as the entry id
 */
function setFocus(id){
    if(id == "")
        return;
    let entryContainer = document.getElementsByClassName('entry-container')[0];
    //so the id doesn't collide with the ids in the sidebar
    entryContainer.id = id+"main";
    let entry = entries[id];

    entryContainer.querySelector('#title').innerHTML = entry.title;
    entryContainer.querySelector('#date').innerHTML = getDate(id);
    entryContainer.querySelector('#entry').innerHTML = '';
    entryContainer.querySelector('#entry').append(md2HTML(entry.entry));
    
    //then the labels as spans in a footer element
    //TODO: currently the labels are just strings, should probably eventually refactor into using ids. alas.
    let labels = entryContainer.querySelector('footer');
    labels.innerHTML = '';
    for(let i =0; i<entry.labels.length; ++i){
        let label = document.createElement('span');
        label.innerHTML = entry.labels[i];
        labels.append(label);
        labels.innerHTML += ',';
    }
    //cuts off last comma
    labels.innerHTML = labels.innerHTML.substring(0, labels.innerHTML.length-1);
}

/**
 * Creates entry for date if it doesn't already exist or modifies existing entry, saves changes to localStorage
 * TODO: Also needs to modify the sidebar
 * @param {string} date - YYYY-MM-DD string that serves as entry ID as well
 * @returns nothing
 */
function setEntry(date){
    //quick fix to accomodate for the fact that storage.getItems returns [] if it doesn't already exist.
    if(entries.length == 0)
        entries = {};

    //TODO: frontend isn't done with their entry adding/editing popup so...
    let entry = {
        title: "",
        entry: "",
        tags: []
    };
    if(!(date in entries)){
        entries[date] = entry;
        dispEntry(date);
        return;
    }
    entries[date] = entry;
    localStorage.setItem('entries', JSON.stringify(entries));
}


/**
 * Deletes the sidebar element and storage object corresponding 
 * @param {string} date 
 * @returns nothing
 */
function deleteEntry(date){
    if(!(date in localStorage.entries))
        return;
    let entry = document.getElementById(date);
    entry.parentNode.removeChild(entry);
    delete entries[date];
    localStorage.setItem('entries', JSON.stringify(entries));
}

/**
 * Adds entries to the sidebar
 * TODO: add entries according to chronological order, not just appending to the end 
 * @param {string} date - YYYY-MM-DD string representing date of the entry
 * @returns nothing
 */
function dispEntry(date){
    let entry = entries[date];
    let entryList = document.getElementsByClassName('entry-list')[0];

    //creating the dropdown/expandable element for the sidebar list
    let item = document.createElement('li');
    entryList.append(item);
    //setting the list item id to the entry id
    item.id = date;
    item.addEventListener('dblclick', (event) => setFocus(event.currentTarget.id));
    item = item.appendChild(document.createElement('a'));
    item.href = '#';
    item = item.appendChild(document.createElement('details'));
    item.open = 'true';
    
    //populating that element
    let title = document.createElement('summary');
    title.innerHTML = '<b>' + entry.title + '</b>';
    item.append(title);
    let blurb = document.createElement('p');
    blurb.innerHTML = getBlurb(entry.entry);
    item.append(blurb);
    let d = document.createElement('h6');
    d.innerHTML = getDate(date);
    item.append(d);
}

/**
 * @param {string} date is a YYYY-MM-DD string
 * @returns {string} of the form Mon. DD, YYYY
 */
function getDate(date){
    let d = date.split('-');
    return months[+d[1]] + " " + +d[2] + ", " + d[0];
}

/**
 * (potentially) takes in a markdown entry and strips it down to plaintext, then returns blurb-length beginning.
 * @param {string} entry is the md string 
 * @returns {string} (currently) first 45 characters of the first line of whatever you give it.
 */
function getBlurb(entry){
    let line = entry.split('\n')[0]
    return line.substring(0, Math.min(blurbLength, line.length));
}
/**
 * (potentially) takes in a markdown entry and renders it into html
 * @returns {Element} currently just returns whatever you give it in a paragraph element.
 */
function md2HTML(entry){
    let content = document.createElement('p');
    content.innerHTML = entry;
    return content;
}
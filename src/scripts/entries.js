import { storage } from './storage.js';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

let entries; //dict of entries, keys are strings of dates YYYY-MM-DD
let months = ['', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
let blurbLength = 45; //length of sidebar entry blurbs in characters
let deleteIconSrc = '../assets/icons/delete_icon.png';
let deleteIconAlt = 'Delete this entry';

window.addEventListener('DOMContentLoaded', init);

/* helper function to get the id from the date */
function getId(date){
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

/**
 * init function, fetches the entries, populates page, adds necessary listeners
 */
function init(){
    entries = storage.getItems('entries');
    populatePage();
    //adding search functionality
    let searchInput = document.getElementById('search')
    searchInput.addEventListener('input', (event) => search(event.currentTarget.value.trim()));
    //adding listeners to add/delete buttons
    document.getElementById('add-button').addEventListener('click', () => editEntry(''));
    // magic number 10 is the length of YYYY-MM-DD, since main entry id is YYYY-MM-DDmain
    document.getElementById('edit-entry').addEventListener('click', ()=> editEntry(document.getElementsByClassName('entry-container')[0].id.substring(0, 10)));
    //document.getElementById('cancel-delete').addEventListener('click', () => document.getElementById('delete-popup').style.visibility = 'hidden');
    //document.getElementById('delete').addEventListener('click', () => deleteEntry(document.getElementsByClassName('entry-container')[0].id.substring(0, 10)));
    document.getElementById('submit').addEventListener('click', (e)=> {
                                                        let data = new FormData(document.getElementById('new-entry'));
                                                        setEntry(data);
                                                        document.getElementById('popup').style.visibility = 'hidden';
                                                        setFocus(data.get('date'));
                                                    });
    // closing the popup when they don't wanna make
    document.getElementById('close').addEventListener('click', () => document.getElementById('popup').style.visibility = 'hidden');
    //set focus based on query in URL
    let query = new URL(window.location.href).searchParams;
    if(query.has('date')){
        if(query.get('date') == 'new'){
            editEntry('');
        }
        else
            setFocus(query.get('date'));
    }
}

/**
 * Displays a popup form to create or edit a journal entry.
 * 
 * If the provided `id` is an empty string, the function initializes the form for creating a new entry 
 * with default values for the title, date, entry content, and labels.
 * If an `id` is provided, it fills the form with the corresponding entry's data.
 * 
 * @param {string} id - YYYY-MM-DD string also used as the entry id
 */
function editEntry(id){
    //if is new entry, then date is an empty string
    let form = document.getElementById('new-entry');
    document.getElementById('popup').style.visibility = 'visible';
    var date = new Date();
    let dateID = getId(date);
    // check if entry of that date already exists
    if(dateID in entries || id != '') {
        let entry;
        if(id == ''){
            entry = entries[dateID];
            form.getElementsByTagName('input')[1].value = dateID;
        }
        else {
            entry = entries[id];
            form.getElementsByTagName('input')[1].value = id;
        }
        form.getElementsByTagName('input')[0].value = entry.title;
        form.getElementsByTagName('textarea')[0].innerHTML = entry.entry;
        form.getElementsByTagName('input')[2].value = entry.labels;
    }
    else{
        form.getElementsByTagName('input')[0].value = 'Title';
        form.getElementsByTagName('input')[1].value = dateID;
        form.getElementsByTagName('textarea')[0].innerHTML = 'Entry here...';
        form.getElementsByTagName('input')[2].value = 'Labels';
    }
}

/**
 * Searches the entries by label and displays only the ones with tags containing the queryLabel
 * @param {string} queryLabel - Label string that we search for
 * @returns nothing
 */
function search(queryLabel){

    if (queryLabel === '') {
        for(let i = 0; i<entriesList.length; ++i){
            entriesList[i].style.display = '';
        }    
    }
    else {
        let entriesList = document.getElementsByClassName('entry-list')[0].children;
        for(let i = 0; i<entriesList.length; ++i){
            let entry = entries[entriesList[i].id];
            if(!entry.labels.some(l => l.toLowerCase().includes(queryLabel)))
                entriesList[i].style.display = 'none';
            else
                entriesList[i].style.display = '';
            
        }
    }
}

/**
 * Populates the page with journal entries.
 * 
 * If there are no entries, the page remains in its default state. Otherwise, it populates the entry list
 * in the sidebar with the existing entries in chronological order, from least recent to most recent.
 * The most recent entry is set as the focus in the entry container.
 * 
 * @returns void
 */
function populatePage(){
    //If no entries, leave page in default state
    if(Object.keys(entries).length == 0){
        return;
    }
    let entryList = document.getElementsByClassName('entry-list')[0];
    entryList.innerHTML = '';
    //hopefully gets the entries in order by date (least recent, so each entry is prepended)
    let dates = Object.keys(entries).sort();
    //adding each entry on the sidebar, and adding listeners
    for(let i = 0; i<dates.length; ++i){
        dispEntry(dates[i]);
    }
    //sets entry-container to most recent entry
    setFocus(dates[dates.length-1]);
}

/**
 * Takes in a date/id, sets the focused entry (the one in entry-container) to the entry of that date
 * If no date is selected, set to nothing
 * @param {string} id - YYYY-MM-DD string also used as the entry id
 */
function setFocus(id){
    if(id == ""){
        let date = new Date();
        id = getId(date);
        let entryContainer = document.getElementsByClassName('entry-container')[0];
        entryContainer.style.color = '#ABABAB';
        entryContainer.querySelector('#title').innerHTML = 'Title...';
        entryContainer.querySelector('#date').innerHTML = getDate(id);
        entryContainer.querySelector('#entry').innerHTML = '<p>Entry...</p>'
        entryContainer.querySelector('footer').innerHTML = '';
        entryContainer.id = id+"main";
        return;
    }
    let entryContainer = document.getElementsByClassName('entry-container')[0];
    //so the id doesn't collide with the ids in the sidebar
    entryContainer.id = id+"main";
    let entry = entries[id];

    entryContainer.querySelector('#title').innerHTML = entry.title;
    entryContainer.querySelector('#date').innerHTML = getDate(id);
    md2HTML(entry.entry, entryContainer.querySelector('#entry'));
    
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
 * @param {FormData} data  - data from the form
 * @returns nothing
 */
function setEntry(data){
    let date = data.get('date');
    //quick fix to accomodate for the fact that storage.getItems returns [] if it doesn't already exist.
    if(entries.length == 0)
        entries = {};

    let entry = {
        title: data.get('title').trim(),
        entry: data.get('entry').trim(),
        labels: data.get('labels').trim().split(',')
    };
    //adding an entry for a new date
    if(!(date in entries)){
        entries[date] = entry;
        localStorage.setItem('entries', JSON.stringify(entries));
        dispEntry(date);
        return;
    }
    //modifying existing content for the date:
    entries[date] = entry;
    localStorage.setItem('entries', JSON.stringify(entries));
    let elem = document.getElementById(date);
    elem.querySelector('.side-title>b').innerHTML = entry.title;
    elem.querySelector('.side-blurb').innerHTML = getBlurb(entry.entry);
}


/**
 * Confirms with user that they want to delete the entry, then deletes the sidebar element and corresponding storage object
 * @param {string} date 
 * @returns nothing
 */
function deleteEntry(date){
    //confirm with user
    if(!confirm('Are you sure you want to delete this entry?'))
        return;
    if(!(date in entries))
        return;
    //if this entry is also the main entry:
    if(date == document.getElementsByClassName('entry-container')[0].id.substring(0,10)){
        let dates = Object.keys(entries).sort();
        if(dates.length == 1){
            setFocus('');
        }
        else if(date == dates[0]){
            setFocus(dates[dates.length-1]);
        }
        else{
            for(let i = 1; i<dates.length; ++i){
                if(dates[i] == date){
                    setFocus(dates[i-1]);
                    break;
                }
            }
        }
            
    }
    document.getElementById(date).remove();
    delete entries[date];
    localStorage.setItem('entries', JSON.stringify(entries));    
}

/**
 * Populates the list element with the entry data
 * @param {li} item - A li (HTML list) object to be populated with entry data
 * @param {String} date - A YYYY-MM-DD string representing date of the entry
 * @returns nothing (list element gets populated as it is passed by reference)
 */
function entryItemSetup(item, date) {
    let entry = entries[date];

    // Set basic properties to the element
    item.id = date;
    item.addEventListener('click', (event) => setFocus(event.currentTarget.id));
    item = item.appendChild(document.createElement('a'));
    item.href = '#';
    item = item.appendChild(document.createElement('div'));
    
    item.className = 'title-flex';
    let title = document.createElement('p');
    title.className = 'side-title'
    title.innerHTML = '<b>' + entry.title + '</b>';
    item.append(title);
    let btn = document.createElement('button');
    btn.className = 'delete-entry';
    //bit hacky, returns the id of the <li>, might want to give each button a unique id as well?
    btn.addEventListener('click', (event) => deleteEntry(event.currentTarget.parentElement.parentElement.parentElement.id));

    item.append(btn);
    btn = btn.appendChild(document.createElement('img'));
    btn.className = 'delete-icon';
    btn.src = deleteIconSrc;
    btn.alt = deleteIconAlt;
    item = item.parentElement;
    let blurb = document.createElement('p');
    blurb.className = 'side-blurb';
    blurb.innerHTML = getBlurb(entry.entry);
    item.append(blurb);
    let d = document.createElement('h6');
    d.innerHTML = getDate(date);
    item.append(d);
}


/**
 * Adds entries to the sidebar according to chronological order, not just appending to the end
 * @param {string} date - YYYY-MM-DD string representing date of the entry
 * @returns nothing
 */
function dispEntry(date){
    let entryList = document.getElementsByClassName('entry-list')[0];

    //creating the list item, then putting it in the correct place 
    let item = document.createElement('li');
    let items = entryList.children;
    //if is most recent (date greater than top id), add at the top
    if (items.length == 0 || date > items[0].id)
        entryList.prepend(item);
    //otherwise, add after last element with id greater than date.
    else {
        for (let i = 1; i<items.length; ++i){
            if (items[i].id < date){
                items[i-1].after(item);
                break;
            }
        }
    }

    //setting up the list item/link/dropdown
    entryItemSetup(item, date);    
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
 * Strips entry down to plaintext, then returns blurb-length beginning.
 * @param {string} entry is the md string 
 * @returns {string} (currently) first 45 characters of the first line of whatever you give it.
 */
function getBlurb(entry){
    let temp = document.createElement('div');
    md2HTML(entry, temp);
    let line = temp.innerText.split('\n')[0];
    return line.substring(0, Math.min(blurbLength, line.length));
}
/**
 * Puts rendered markdown into container:
 * Tries to render markdown using Marked; if fails, returns whatever is passed to it in a <p>
 * @param {Element} container - element that contains the rendered markdown at the end
 * @param {string} entry - markdown to be rendered
 * @returns nothing
 */
function md2HTML(entry, container){
    try{
        container.innerHTML = marked.parse(entry);
    }
    catch (err) {
        container.innerHTML = '';
        container.appendChild(document.createElement('p'));
        container.innerHTML = entry;
    }
}



import { storage } from './storage.js';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

let entries;
let numEntries = 5;
let titleLength = 14;

window.addEventListener('DOMContentLoaded', initEntries);

function initEntries(){
    entries = storage.getItems('entries');
    let addBtnHTML = document.getElementById('entries-container').querySelector('button').outerHTML;
    document.getElementById("entries-container").innerHTML = addBtnHTML;
    populateEntries();
}

function populateEntries(){
    let dates = Object.keys(entries).sort();
    let container = document.getElementById("entries-container");
    for(let i = dates.length-1; i>=0 && container.children.length < numEntries+1; --i){
        let entry = entries[dates[i]];
        let button = document.createElement('a');
        button.href = 'entries.html?date=' + dates[i];
        container.append(button);
        button = button.appendChild(document.createElement('button'));
        button.className = 'entry';
        let content = document.createElement('p');
        content.innerText = stripMd(entry.entry);
        button.append(content);

        let div = document.createElement('div');
        div.className = 'entry-header';
        let title = document.createElement('h3');
        title.innerText = (entry.title.length <= titleLength) ? entry.title : entry.title.substring(0,titleLength-3) + '...';
        div.append(title);
        let date = document.createElement('h3');
        let ymd = dates[i].split('-');
        date.innerText = ymd[1]+'/'+ymd[2]+'/'+ymd[0];
        div.append(date);
        button.prepend(div);
    }
}

/**
 * Strips a markdown string of its formatting and returns it
 * @param {string} entry - markdown string to be stripped
 * @returns string containing stripped markdown.
 */
function stripMd(entry){
    try{
        let temp = document.createElement('div');
        temp.innerHTML = marked.parse(entry);
        let ret = temp.innerText;
        return ret;
    }
    catch (err) {
        return entry;
    }
}
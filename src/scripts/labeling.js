// labeling.js
// Handles all the things related to adding label, changing label, grouping tasks by labels, etc.

import { storage } from './storage.js';
//import {saveTask } from './tasks.js';
let entriesURL = '../assets/json/entries.json';



/**
 * Helper function of fetching journal entries from lcoal json file
 */
async function fetchEntries() {
  try {
    const response = await fetch(entriesURL);
    const entries = await response.json();

    // There's some bug when calling updateItem in storage.js: TypeError: currItems.findIndex is not a function
    //storage.updateItem('entries', entries); 

    localStorage.setItem('entries', JSON.stringify(entries));
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
}

/**
 * Display entries in the current entry-list
 * @param {Object} entries - The entries to display
 */
function displayEntries(entries) {
  const entryList = document.querySelector('.entry-list');
  entryList.innerHTML = ''; // Clear the current entries

  // Sort entries by date in descending order
  const sortedDates = Object.keys(entries).sort((a, b) => new Date(b) - new Date(a));

  // Re-append sorted entries into entry-list
  sortedDates.forEach(date => {
    const entry = entries[date];
    const entryItem = document.createElement('li');
    entryItem.innerHTML = `
      <a href="#"><details open="true">
        <summary><b>${entry.title}</b></summary>
        <p>${entry.entry}</p>
        <h6>${new Date(date).toLocaleDateString()}</h6>
      </details></a>
    `;
    entryList.appendChild(entryItem);
  });
}

/**
 * Search Journal Entries by Label Name
 */
function searchEntriesByLabel() {
  const searchInput = document.getElementById('search');

  searchInput.addEventListener('input', () => {
    const queryLabel = searchInput.value.trim().toLowerCase();
    const entries = storage.getItems('entries');

    if (queryLabel === '') {
      displayEntries(entries); // Display all entries if the search bar is empty
    } else {
      // Filter entries by the label and display them
      const filteredEntries = Object.keys(entries).filter(date => {
        const entry = entries[date];
        return entry.labels && entry.labels.some(l => l.toLowerCase().includes(queryLabel));
      }).reduce((acc, date) => {
        acc[date] = entries[date];
        return acc;
      }, {});

      displayEntries(filteredEntries);
    }
  });

  // Display all entries initially
  const entries = storage.getItems('entries');
  displayEntries(entries);
}


// Initialize the functions when the DOM is loaded
window.addEventListener('DOMContentLoaded', async () => {
  await fetchEntries();
  searchEntriesByLabel();
});

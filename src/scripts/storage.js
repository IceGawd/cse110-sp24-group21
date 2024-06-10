// storage.js

// Create a wrapper object to hold all of the storage functions
// for easy exporting
export const storage = {};

/**
 * Returns an array with all of the elements currently stored
 * @returns {Array} An array of elements from the feature
 */
storage.getItems = function (feature) {
  // localStorage only stores strings so you must JSON.parse() any arrays
  return JSON.parse(localStorage.getItem(feature)) || [];
};

/**
 * Adds an item to the corresponding feature list
 * @param {string} feature - The feature to add an item to
 * @param {Object} object - The object to add to the feature list
 */
storage.addItem = function (feature, object) {
  // Get the current item list of the feature
  const currItems = storage.getItems(feature);
  // Add the new item to the list
  currItems.push(object);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem(feature, JSON.stringify(currItems));
};

/**
 * Removes an item from storage by id
 * @param {string} feature - The feature to remove an item from
 * @param {number} id - The id of the item to remove
 */
storage.removeItem = function (feature, id) {
  // Get the current item list of the feature
  const currItems = storage.getItems(feature);
  // Get the index of the item to remove
  let indexOfId = currItems.findIndex((element) => element.id == id);
  // Remove that index of the item to remove from the list
  if (indexOfId > -1) currItems.splice(indexOfId, 1);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem(feature, JSON.stringify(currItems));
};

/**
 * Updates an item from the corresponding feature list
 * @param {string} feature - The feature to update an item from
 * @param {Object} object - The object to update in the feature list
 */
storage.updateItem = function (feature, object) {
  // Get the current item list of the feature
  const currItems = storage.getItems(feature);
  // Get the index of the item to update
  let indexOfId = currItems.findIndex((element) => element.id == object.id);
  // Overwrite current item in storage with new object
  (indexOfId != -1) ? currItems[indexOfId] = object : currItems.push(object);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem(feature, JSON.stringify(currItems));
};
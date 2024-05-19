// storage.js

// Create a wrapper object to hold all of the storage functions
// for easy exporting
export const storage = {};

/**
 * Returns an array with all of the elements currently in the cart
 * @returns {Array} An array of IDs of items that are in the cart
 */
storage.getItems = function (feature) {
  // localStorage only stores strings so you must JSON.parse() any arrays
  return JSON.parse(localStorage.getItem(feature)) || [];
};

/**
 * Adds an item to the cart and stores that cart
 */
storage.addItem = function (feature, id) {
  // Get the current cart
  const currItems = storage.getItems(feature);
  // Add the id of the new item to the cart
  currItems.push(id);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem(feature, JSON.stringify(currItems));
};

/**
 * Removes an item from the cart and then stores that new cart
 */
storage.removeItem = function (feature, id) {
  // Get the current cart
  const currItems = storage.getItems(feature);
  // Get the index of the item to remove
  const indexOfId = currItems.indexOf(id);
  // Remove that index of the item to remove from the cart
  if (indexOfId > -1) currItems.splice(indexOfId, 1);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem(feature, JSON.stringify(currItems));
};

storage.updateItem = function (feature, id) {
    // Get the current cart
    const currItems = storage.getItems(feature);
    // Get the index of the item to remove
    const indexOfId = currItems.indexOf(id);
    // Update item somehow
    // localStorage only stores strings so you must JSON.stringify() any arrays
    localStorage.setItem(feature, JSON.stringify(currItems));
  };
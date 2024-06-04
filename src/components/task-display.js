/* Toggle Functionality */
function toggleIcon(el) {
    const task = el.parentNode;
    const description = task.getElementsByClassName('description')[0];
    const image = el.getElementsByTagName('img')[0];
    //change from down to right
    if (image.classList[2] == 'down-icon') {
        image.classList.replace('down-icon', 'right-icon');
        description.style.display = 'none';
        image.src = '../assets/icons/triangle-right-black.svg';
    }
    // change from right to down
    else {
        image.classList.replace('right-icon', 'down-icon')
        description.style.display = 'block';
        image.src = '../assets/icons/triangle-down-black.svg';
    }
}
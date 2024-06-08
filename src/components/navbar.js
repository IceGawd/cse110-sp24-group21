const style = `
/* Navbar styling */
:host {
    width: 20vw;
}

.nav-group {
    width: 100%;
}

.nav-icon {
    margin-left: 15px;
    padding-bottom: 10px;
}

.nav-label {
    color: #2B2B2B;
    font-size: 20px;
    padding-left: 10px;
    padding-bottom: 6px;
    text-decoration: none;
    animation: showNavLabel 0.3s forwards;
    font-family: 'Radio Canada', Arial, Helvetica, sans-serif;
}

.nav-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    
    text-decoration: none;
    background: transparent;
    border-width: 0;
    padding-top: 10px;
}

#sidebar {
    background-color: #CAC9C9;
    color: #fff;
    display: inline-flex;
    flex-direction: column;
    height: 100vh;
    width: 20vw;
    margin-top: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    position: fixed;
    transition: width 0.3s ease;
    z-index: 10000;
}

/* Hovering stuff */
.nav-row:hover {
    background-color: #FFFFFF;
    cursor: pointer;
}

.nav-row:hover .nav-label {
    font-weight: bold;
}

/* Minimized state */
:host(.minimized) {
    width: 100px;
}

:host(.minimized) #sidebar {
    width: 100px;
}

:host(.minimized) .nav-label {
    display: none;
}

:host(.minimized) .nav-row {
    // justify-content: center;
}

:host(.minimized) .nav-icon {
    margin: 0;
    padding-bottom: 10px;
    padding-left: 15px;
}

:host(.minimized) #minimize-btn {
    
}

:host(.minimized) .mini-icon {
    transform: scaleX(-1);
    padding-right: 15px;
}

/* Keyframes for showing nav-label */
@keyframes showNavLabel {
    0% {
        opacity: 0;
        display: none;
    }
    1% {
        display: block;
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* End of Navbar Styling */
`;

const html = `
<nav>
    <ul id="sidebar">
        <div class="nav-group">
            <a class="nav-row" href="./home.html">
                <img src="../assets/icons/home.svg" alt="Home Icon" class="nav-icon"/>
                <p class="nav-label">Home</p>
            </a>
            <a class="nav-row" href="./calendar.html">
                <img src="../assets/icons/calendar.svg" alt="Calendar Icon" class="nav-icon"/>
                <p class="nav-label">Calendar</p>
            </a>
            <a class="nav-row" href="./tasks.html">
                <img src="../assets/icons/tasks.svg" alt="Tasks Icon" class="nav-icon"/>
                <p class="nav-label">Tasks</p>
            </a>
            <a class="nav-row" href="./entries.html">
                <img src="../assets/icons/entries.svg" alt="Entries Icon" class="nav-icon"/>
                <p class="nav-label">Entries</p>
            </a>
        </div>
        <div class="nav-group">
            <button class="nav-row" id="minimize-btn">
                <img src="../assets/icons/minimize.svg" alt="Minimize Icon" class="nav-icon mini-icon"/>
                <p class="nav-label">Minimize</p>
            </button>
            
            <button class="nav-row" id="settings-btn">
                <img src="../assets/icons/settings.svg" alt="Settings Icon" class="nav-icon setting-icon"/>
                <p class="nav-label">Settings</p>
            </button>

        </div>
    </ul>
</nav>
`;


/**
 * Represents a custom navbar element.
 * @class MyNavbar
 * @extends HTMLElement
 */
class MyNavbar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // add our HTML and CSS to the navbar shadow DOM
        const template = document.createElement('template');
        template.innerHTML = html;
        const styleElem = document.createElement('style');
        styleElem.textContent = style;
        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(styleElem);

        // Add event listener for minimize button
        this.minimizeBtn = shadow.querySelector('#minimize-btn');
        this.minimizeBtn.addEventListener('click', this.toggleMinimize.bind(this));

        if (localStorage.getItem('navbarMinimized') === 'true') {
            this.classList.add('minimized');
        }

        // Add resize event listener
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize();
    }

    /**
     * Toggles the minimized state of the navbar.
     * If the window width is less than 800 pixels, the function returns early.
     * Otherwise, it toggles the 'minimized' class on the navbar element,
     * updates the 'navbarMinimized' value in the local storage to be remembered across sessions,
     * and adjusts the width of the 'main' element accordingly.
     */
    toggleMinimize() {
        if(window.innerWidth < 800) return;
        this.classList.toggle('minimized');
        localStorage.setItem('navbarMinimized', this.classList.contains('minimized'));
        this.updateMainWidth();
    }


    /**
     * Updates the width of the main element based on the presence of the 'minimized' class.
     */
    updateMainWidth() {
        if(this.classList.contains('minimized')) {
            document.querySelector('main').style.width = `calc(100vw - 100px)`;
        } else {
            document.querySelector('main').style.width = `80vw`;
        }
    }

    /**
     * Handles the resize event of the window.
     * If the window width is less than 800 pixels, it adds the 'minimized' class to the element,
     * sets the width of the 'main' element to 'calc(100vw - 100px)', and updates the display state.
     * If the window width is greater than or equal to 800 pixels, it removes the 'minimized' class from the element,
     * sets the width of the 'main' element to '80vw', and updates the display state if the 'navbarMinimized' flag is not set.
     */
    handleResize() {
        if (window.innerWidth < 910) {
            this.classList.add('minimized');
        } 
        else {
            if (localStorage.getItem('navbarMinimized') !== 'true') {
                this.classList.remove('minimized');
            }
        }
        this.updateMainWidth();
    }

}

customElements.define('my-navbar', MyNavbar);


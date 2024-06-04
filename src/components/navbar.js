const style = `
/* Navbar styling */
:host {
    width: 20vw;
}

.nav-group {
    width: 100%;
}

.nav-icon {
    margin-left: 20px;
}

.nav-label {
    color: #2B2B2B;
    font-size: 22px;
    padding: 10px;
    text-decoration: none;
    animation: showNavLabel 0.3s forwards;
}

.nav-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    text-decoration: none;
    background: transparent;
    border-width: 0;
    padding: 0;
}

#sidebar {
    background-color: #CAC9C9;
    color: #fff;
    display: inline-flex;
    flex-direction: column;
    min-height: 100%;
    width: 20vw;
    margin-top: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    position: fixed;
    transition: width 0.3s ease;
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
    justify-content: center;
}

:host(.minimized) .nav-icon {
    margin: 0;
    padding-top: 10px;
    padding-bottom: 10px;
}

:host(.minimized) #minimize-btn {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
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

/* Settings popup styling */
.settings-container {
    position: fixed; /* Cover the whole screen */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

.settings-container.active {
    opacity: 1;
    pointer-events: auto;
}

.settings-box {
    width: 500px;
    background: #B8B8B8; /* Corrected spelling */
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    padding: 30px;
    transform: scale(0);
    transition: transform 0.4s ease;
}

.settings-container.active .settings-box {
    transform: scale(1);
    transition-delay: .25s;
}

.settings-box h1 {
    color: #333; /* Added missing hash for color */
    line-height: 1;
}

.settings-box p {
    color: #333; /* Added missing hash for color */
    margin: 12px 0 20px;
}

.settings-box .close-btn {
    width: 100%;
    height: 45px;
    background: slategray; /* Corrected to 'slategray' */
    border-radius: 6px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
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
                <img src="../assets/icons/minimize.svg" alt="Minimize Icon" class="nav-icon"/>
                <p class="nav-label">Minimize</p>
            </button>
            
            <button class="nav-row" id="settings-btn">
                <img src="../assets/icons/settings.svg" alt="Settings Icon" class="nav-icon"/>
                <p class="nav-label">Settings</p>
            </button>
            <div class="settings-container" id="setting-container"> 
                <div class="settings-box">
                    <h1>Hello</h1>
                    <p>
                        Hello world! This is a test. 
                    </p>
                    <button class="close-btn" id="close-button">
                        Done
                    </button>
                </div>
            </div>
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

        // Add event listener for settings button
        // Add event listener for settings button
        this.showPopup = shadow.getElementById('settings-btn');
        this.popupContainer = shadow.getElementById('setting-container');
        this.closePopup = shadow.getElementById('close-button');

        this.showPopup.addEventListener('click', () => {
            this.popupContainer.classList.add('active');
        });

        this.closePopup.addEventListener('click', () => {
            this.popupContainer.classList.remove('active');
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.popupContainer) {
                this.popupContainer.classList.remove('active');
            }
        });
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
        if (window.innerWidth < 800) {
            this.classList.add('minimized');
            this.updateMainWidth();
        } 
        else {
            if (localStorage.getItem('navbarMinimized') !== 'true') {
                this.classList.remove('minimized');
                this.updateMainWidth();
            }
        }
    }

    /**
     * Creates a popup for the settings button to allow the user to change viewing preferences
     */
    settingsPopup(){

    }
}

customElements.define('my-navbar', MyNavbar);

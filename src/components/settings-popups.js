const settingHTML = `
<div class="settings-container" id="setting-container"> 
    <div class="settings-box">
        <h1>User Settings</h1>
        <p>
            Color Theme: 
        </p>
        <div id="themes">
            <button id="light" data-theme="light" aria-pressed="true">Light</button>
            <button id="dark" data-theme="dark" aria-pressed="false">Dark</button>
        </div>
        <p>
            Choose Time Zone:
        </p>
        <select name="timezone_offset" id="timezone-offset" class="span5">
            <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
            <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
            <option value="-10:00">(GMT -10:00) Hawaii</option>
            <option value="-09:50">(GMT -9:30) Taiohae</option>
            <option value="-09:00">(GMT -9:00) Alaska</option>
            <option value="-08:00">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
            <option value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
            <option value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
            <option value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
            <option value="-04:50">(GMT -4:30) Caracas</option>
            <option value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
            <option value="-03:50">(GMT -3:30) Newfoundland</option>
            <option value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
            <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
            <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
            <option value="+00:00" selected="selected">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
            <option value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</option>
            <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
            <option value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
            <option value="+03:50">(GMT +3:30) Tehran</option>
            <option value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
            <option value="+04:50">(GMT +4:30) Kabul</option>
            <option value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
            <option value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
            <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
            <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
            <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
            <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
            <option value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
            <option value="+08:75">(GMT +8:45) Eucla</option>
            <option value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
            <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
            <option value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
            <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
            <option value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
            <option value="+11:50">(GMT +11:30) Norfolk Island</option>
            <option value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
            <option value="+12:75">(GMT +12:45) Chatham Islands</option>
            <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
            <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
        </select>

        <button class="close-btn" id="close-button">
            Done
        </button>
    </div>
</div>
`;

const settingStyle = `
/* Settings popup styling */
:root,
[data-selected-theme="light"] {
    --background: #ffffff;
    --text-color: #1e1e1e;
    --settings-header: #333;
}

[data-selected-theme="dark"] {
    --background: #565656;
    --text-color: #cccccc;
    --settings-header: #d9d9d9;
}

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
    transition: opacity 0.3s ease;
    z-index: 10000;
}

.settings-container.active {
    opacity: 1;
    pointer-events: auto;
}

.settings-box {
    width: 500px;
    background: var(--background);
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    padding: 30px;
    transform: scale(0);
    transition: transform 0.25s ease;
}

.settings-container.active .settings-box {
    transform: scale(1);
    transition-delay: .2s;
}

.settings-box h1 {
    color: var(--text-color); 
    line-height: 1;
}

.settings-box p {
    color: var(--text-color); /* Added missing hash for color #333 */
    margin: 12px 0 10px;
}

.settings-box button {
    width: 20%;
    height: 45px;
    border-radius: 6px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.settings-box button#light {
    background: #978EEB;
    color: #000000;
}

.settings-box button#dark {
    background: #a6abb3;
}

.settings-box button[aria-pressed="true"] {
    background-color: var(--text-color);
    color: var(--background);
}

}
.settings-box select {
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
    margin: 12px 0 5px;
}

/* End of Setting Pop-up Styling */
`;

const iconPaths = {
    'light': {
        'Home': '../assets/icons/home.svg',
        'Calendar': '../assets/icons/calendar.svg',
        'Entries': '../assets/icons/entries.svg',
        'Tasks': '../assets/icons/tasks.svg',
        'Minimize': '../assets/icons/minimize.svg',
        'Settings': '../assets/icons/settings.svg'
    },
    'dark': {
        'Home': '../assets/icons/home-dark.svg',
        'Calendar': '../assets/icons/calendar-dark.svg',
        'Entries': '../assets/icons/entries-dark.svg',
        'Tasks': '../assets/icons/tasks-dark.svg',
        'Minimize': '../assets/icons/minimize-dark.svg',
        'Settings': '../assets/icons/settings-dark.svg'
    }
};



/**
 * Represents a custom setting element.
 * @class MySettings
 * @extends HTMLElement
 */
class MySettings extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // add our HTML and CSS to the navbar shadow DOM
        const template = document.createElement('template');
        template.innerHTML = settingHTML;
        const styleElem = document.createElement('style');
        styleElem.textContent = settingStyle;
        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(styleElem);

        // Add event listener for settings button
        const showPopup = document.querySelector('my-navbar').shadowRoot.getElementById('settings-btn');
        const popupContainer = document.querySelector('my-settings').shadowRoot.querySelector('#setting-container');
        const closePopup = document.querySelector('my-settings').shadowRoot.querySelector('#close-button');

        // Click setting button in nav bar
        showPopup.addEventListener('click', () => {
            popupContainer.classList.add('active')
        });

        // Click close button in setting pop-ups
        closePopup.addEventListener('click', () => {
            popupContainer.classList.remove('active');
        });
        
        // Click outside of the setting pop-ups
        popupContainer.addEventListener('click', (event) => {
            if (event.target === popupContainer) {
                popupContainer.classList.remove('active');
            }
        });

        // Constants we will reuse for theme changing
        const pressedButtonSelector = '[data-theme][aria-pressed="true"]';
        const themeSwitcher = document.querySelector('my-settings').shadowRoot.getElementById('themes');
        const buttons = themeSwitcher.querySelectorAll('button');

        // Gets the saved theme
        const savedTheme = localStorage.getItem('selected-theme');
        const defaultTheme = 'light';

        // Applies the given theme
        const applyTheme = (theme) => {
            const target = document.querySelector('my-settings').shadowRoot.querySelector(`[data-theme="${theme}"]`);
            document.documentElement.setAttribute("data-selected-theme", theme);
            document.querySelector('my-settings').shadowRoot.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
            target.setAttribute('aria-pressed', 'true');

            // Update navbar dynamically here
            const navbarElem = document.querySelector('my-navbar');
            const navbarShadowRoot = navbarElem.shadowRoot;

            if (navbarShadowRoot) {
                const sidebarElem = navbarShadowRoot.querySelector('ul#sidebar');
                let navbarElems = sidebarElem.querySelectorAll('.nav-row');
                navbarElems.forEach((elem) => {
                    const btnType = elem.querySelector('p').textContent;
                    // Update image icons based on mapping defined above
                    elem.querySelector('img').src = iconPaths[theme][btnType];
                });
            }
            else {
                console.error("Navbar Shadow Root not found");
            }
        };

        // Handles the selection of the theme
        const handleThemeSelection = (event) => {
            const target = event.target;
            const isPressed = target.getAttribute('aria-pressed');
            const theme = target.getAttribute('data-theme'); 

            if(isPressed !== "true") {
                applyTheme(theme);
                localStorage.setItem('selected-theme', theme);
            }
        }

        if (savedTheme && savedTheme !== defaultTheme) {
            const prevBtn = document.querySelector('my-settings').shadowRoot.querySelector('[data-theme][aria-pressed="true"]');
            prevBtn.setAttribute('aria-pressed', false);
            
            document.querySelector('my-settings').shadowRoot.querySelector(`[data-theme="${savedTheme}"]`).setAttribute('aria-pressed', true);
            
            document.documentElement.setAttribute("data-selected-theme", savedTheme);
        }

        // Making sure the theme is set correctly 
        const setInitialTheme = () => {
            const savedTheme = localStorage.getItem('selected-theme');
            if(savedTheme && savedTheme !== defaultTheme) {
              applyTheme(savedTheme);
            }
        };
          
        setInitialTheme();

        /* Adds the handleThemeSelection as a click handler to each of the buttons */
        buttons.forEach((button) => {
            button.addEventListener('click', handleThemeSelection);
        });
    }

}

customElements.define('my-settings', MySettings);
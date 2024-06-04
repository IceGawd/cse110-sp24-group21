const settingHTML = `
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
`;

const settingStyle = `
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
    z-index: 10000;
}

.settings-container.active {
    opacity: 1;
    pointer-events: auto;
}

.settings-box {
    width: 500px;
    background: #ffffff; /* Corrected spelling */
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

/* End of Setting Pop-up Styling */
`;

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
        const showPopup = document.querySelector("my-navbar").shadowRoot.getElementById('settings-btn');
        const popupContainer = document.querySelector("my-settings").shadowRoot.querySelector('#setting-container');
        const closePopup = document.querySelector("my-settings").shadowRoot.querySelector('#close-button');

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
    }

    /**
     * Creates a popup for the settings button to allow the user to change viewing preferences
     */
    settingsPopup(){

    }
}

customElements.define('my-settings', MySettings);
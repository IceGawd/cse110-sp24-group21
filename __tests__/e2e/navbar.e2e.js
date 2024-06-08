describe('e2e testing for navbar', () => {

    /* make sure to run `npm start` before running these tests 
    so that puppeteer has a link to go to*/
    beforeAll(async () => {
        await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});
    });
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

    it('Check the 6 Navbar Items', async () => {
        console.log('Checking for 6 navbar options...');
        const navItems = await page.evaluate(async () => {
            const shadowHost = document.querySelector("#main-page > my-navbar")
            if (!shadowHost) throw new Error('No shadow host found');
            const items = shadowHost.shadowRoot.querySelectorAll(".nav-row");
            return Array.from(items).map(e => e.innerHTML);
        });
        expect(navItems.length).toBe(6);
        console.log('Checking that each navItem has the correct text and icon...');
        const expectedText = ['Home', 'Calendar', 'Tasks', 'Entries', 'Minimize', 'Settings'];
        for (let i = 0; i < navItems.length; i++) {
            expect(navItems[i]).toContain('img');
            expect(navItems[i]).toContain(expectedText[i]);
        }
    });

    it('Test the Minimize Button', async () => {
        async function getSidebarWidth(sidebarHandle) {
            const width = await page.evaluate(sidebar => {
                const computedStyle = window.getComputedStyle(sidebar);
                return computedStyle.width;
            }, sidebarHandle);
            return width;
        }
        
        const navbar = await page.$('my-navbar');
        // Grab the shadowRoot of that element
        const shadowRoot = await navbar.getProperty('shadowRoot');
        const minimizeBtn = await page.evaluateHandle(root => root.querySelector('#minimize-btn'), shadowRoot);
        const sidebarHandle = await page.evaluateHandle(root => root.querySelector('#sidebar'), shadowRoot);
        const sidebarWidth = await getSidebarWidth(sidebarHandle);
        // expect sidebarWidth to be greater than 150px
        expect(parseInt(sidebarWidth)).toBeGreaterThan(150);
        // if the classes of my-navbar contain minimized, isMinized = true
        const className = await (await navbar.getProperty('className')).jsonValue();
        expect (className.includes('minimized')).toBe(false);

        await minimizeBtn.click();
        await delay(1000);
        const classNameAfterClick = await (await navbar.getProperty('className')).jsonValue();
        expect (classNameAfterClick.includes('minimized')).toBe(true);
        // Check the width of the sidebar after clicking the minimize button
        const sidebarWidthAfterClick = await getSidebarWidth(sidebarHandle);
        expect(sidebarWidthAfterClick).toBe('100px');
    });
});
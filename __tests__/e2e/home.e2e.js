describe('e2e testing for Home page', () => {
    /* custom wait function */
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

    /* make sure to run `npm start` before running these tests 
    so that puppeteer needs a link to go to*/
    beforeAll(async () => {
        await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});
    });

    /* Check the number of entries and tasks */
    async function getItemLength(key) {
        console.log('Getting the number of items...', key);
        const items = await page.evaluate(async (key) => {
            return await JSON.parse(localStorage.getItem(key));
        }, key);
        return items ? Object.keys(items).length : 0;
    }

    /* Get the elements of a selector */
    async function getElements(selector) {
        const elems = await page.evaluate(async (selector) => {
            const selectedElems = document.querySelectorAll(selector);
            return Array.from(selectedElems).map(e => e.innerHTML);
        }, selector);
        console.log('Elements:', elems);
        return elems;
    }

    /* Check that the number of entries is equal to the number in local storage
    or 5 at max */
    it('Check the number of entries', async () => {
        console.log('Checking the number of entries...');
        const localEntriesLength = await getItemLength('entries');
        const entries = await getElements('.entry');
        /* +1 comes from the add button */
        expect(entries.length).toBe(localEntriesLength > 5 ? 6 : localEntriesLength + 1);
    });

    /* Check that the number of entries is equal to the number in local storage 
    or 8 at max */
    it('Check the number of tasks', async () => {
        console.log('Checking the number of tasks...');
        const localTasksLength = await getItemLength('tasklist');
        const tasks = await getElements('.home-task');
        /* +1 comes from the add button */
        expect(tasks.length).toBe(localTasksLength + 1);
    });
});
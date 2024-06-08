describe('e2e testing for Home page', () => {
    /* custom wait function */
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

    /* make sure to run `npm start` before running these tests 
    so that puppeteer needs a link to go to*/
    beforeAll(async () => {
        await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});
    });

    /* Check that the number of entries is equal to the number in local storage
    or 5 at max */
    it('Check the number of entries', async () => {
        console.log('Checking the number of entries...');
        const localEntries = await page.evaluate(async () => {
            return await JSON.parse(localStorage.getItem('entries'));
        });
        const localEntriesLength = localEntries ? Object.keys(localEntries).length : 0;
        const entries = await page.evaluate(async () => {
            const entries = document.querySelectorAll('.entry');
            return Array.from(entries).map(e => e.innerHTML);
        });
        /* +1 comes from the add button */
        expect(entries.length).toBe(localEntriesLength > 5 ? 6 : localEntriesLength + 1);
    });

    /* Check that the number of entries is equal to the number in local storage 
    or 8 at max */
    it('Check the number of tasks', async () => {
        console.log('Checking the number of tasks...');
        const localTasks = await page.evaluate(() => JSON.parse(localStorage.getItem("tasklist")));
        //console.log('local tasks: ', localTasks);
        const localTasksLength = localTasks ? Object.keys(localTasks).length : 0;
        const tasks = await page.evaluate(async () => {
            const tasks = document.querySelectorAll('.task');
            return Array.from(tasks).map(e => e.innerHTML);
        });
        /* +1 comes from the add button */
        expect(tasks.length).toBe(localTasksLength + 1);
    });
});
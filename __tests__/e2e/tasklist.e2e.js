describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5502/src/pages/tasks.html');
    });

    it('Add new tasks', async () => {
        console.log('Checking that seven add-task buttons are clicked and task elements are created');
        // Query select all of the <add-task> elements and return the length of that array
        const buttonHandles = await page.$$('.add-task');
        for (let i = 0; i < buttonHandles.length; i++) {
            await buttonHandles[i].click();
        }
        const tasks = await page.$$('task-element');
        expect(tasks.length).toBe(7);
    });

    it('Reload page', async () => {
        console.log('Checking that the tasks persist after reloading the page');
        await page.reload();
        const tasks = await page.$$('task-element');
        expect(tasks.length).toBe(7);
    });

    it('Edit tasks', async () => { 
        console.log('Checking that the edit button works');
        // Query select all of the <task-element> elements and return the length of that array
        const taskHandles = await page.$$('task-element >>> .task');
        for (let i = 0; i < taskHandles.length; i++) {
            titleHandle = await taskHandles[i].$('.title');
            await titleHandle.type('Task ' + (i+1).toString());
            descriptionHandle = await taskHandles[i].$('.description');
            await descriptionHandle.type('Description ' + (i+1).toString());
            allDayHandle = await taskHandles[i].$('.all-day');
            await allDayHandle.click();
            startTimeHandle = await taskHandles[i].$('.start-time');
            await startTimeHandle.type(String(i + 1).padStart(2, '0') + ':00');
            endTimeHandle = await taskHandles[i].$('.end-time');
            await endTimeHandle.type(String(i + 2).padStart(2, '0') + ':00');
            tagsHandle = await taskHandles[i].$('.tags')
            await tagsHandle.type('Tag_' + (i+1).toString());
            priorityHandle = await taskHandles[i].$('.priority-dropdown');
            await priorityHandle.select(i % 3 === 0 ? 'low' : (i % 3 === 1 ? 'medium' : 'high'));
        }
        
    }, 30000);

    it('Reload page', async () => {
        console.log('Checking that the tasks persist after reloading the page');
        await page.reload();
        const tasks = await page.$$('task-element');
        expect(tasks.length).toBe(7);
    });

    it('Delete tasks', async () => {
        console.log('Checking that the delete button works');
        // Query select all of the <task-element> elements and return the length of that array
        const taskHandles = await page.$$('task-element >>> .task');
        for (let i = 0; i < taskHandles.length; i++) {
            deleteHandle = await taskHandles[i].$('.delete-task');
            await deleteHandle.click();
        }
        const tasks = await page.$$('task-element');
        expect(tasks.length).toBe(0);
    });

    it('Reload page', async () => {
        console.log('Checking that the tasks deleted after reloading the page');
        await page.reload();
        const tasks = await page.$$('task-element');
        expect(tasks.length).toBe(0);
    });

});
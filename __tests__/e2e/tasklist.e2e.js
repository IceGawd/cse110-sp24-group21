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

});
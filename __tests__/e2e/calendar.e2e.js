describe('e2e testing for calendar', () => {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    beforeAll(async () => {
      await page.goto('http://localhost:3000/', {waitUntil: 'networkidle2'});
      const navbarHandles = await page.$$('my-navbar >>> .nav-row');
      await navbarHandles[1].click();
      await delay(1000);
    });

    afterAll(async () => {
        await page.evaluate(() => localStorage.clear());
    });

    // Make reload page checking a reusable fucntion to avoid code climate issues
    // const reloadAndCheck = async (expectedCount) => {
    //     console.log(`Checking that the tasks persist after reloading the page`);
    //     await page.reload();
    //     // TODO: Check that things remain on the page after reloading
    // };

    // const createTask = async (date) => {
    //     console.log('Creating a new task');

    // };

    it('Add new tasks and check they are displayed on calendar', async () => {
        console.log('Add tasks and check they are displayed on calendar');
        await page.evaluate(() => {
            taskMap = JSON.parse(localStorage.getItem('tasklist'));
            if (!taskMap) {
                localStorage.setItem('tasklist', JSON.stringify([]));
            }
            taskMap = JSON.parse(localStorage.getItem('tasklist'));
            const existingIds = new Set();
            Object.keys(taskMap).forEach(date => {
                taskMap[date].forEach(task => {
                existingIds.add(task.id);
                });
            });
            let inputId;
            do {
                inputId = Math.floor(Math.random() * 2000000);
            } while (existingIds.has(inputId));

            const currDate = new Date();
            let options = { year: "numeric", month: "2-digit", day: "2-digit" };
            const date = currDate.toLocaleDateString("en", options);
            console.log(date);

            let taskObject = { id: inputId, title: "test", date: date, startTime: "00:00", endTime: "23:59", description: "test", labels: [], priority: 'low' };

            if (!taskMap[date]) {
                taskMap[date] = [];
            }
            taskMap[date].push(taskObject);
            localStorage.setItem('tasklist', JSON.stringify(taskMap))
        });
        await page.reload();
        const tasks = await page.$$('.task');
        expect(tasks.length).toBe(1);
    });
});

const openBtn = document.getElementById('openModuleBtn');
const moduleBox = document.getElementById('dcmModule');
const closeBtn = document.getElementById('closeModuleBtn');
const continueBtn = document.getElementById('continueBtn');

const activities = document.querySelectorAll('.daily-activity');
const cells = document.querySelectorAll('.color2, .color3');

let selectedActivityNumber = null;

/* OPEN MODULE */
openBtn.onclick = () => {
    moduleBox.style.display = 'block';
    openBtn.style.display = 'none';
};

/* CLOSE MODULE */
closeBtn.onclick = continueBtn.onclick = () => {
    moduleBox.style.display = 'none';
    openBtn.style.display = 'inline-block';
};

/* SELECT DAILY ACTIVITY */
activities.forEach((item, index) => {
    item.onclick = () => {
        selectedActivityNumber = index + 1;

        activities.forEach(a => a.classList.remove('active'));
        item.classList.add('active');
    };
});

/* CLICK TABLE CELLS */
cells.forEach(cell => {
    cell.onclick = () => {
        if (!selectedActivityNumber) {
            window.alert(
                "You have to select a daily activity from the menu above in order to set a value."
            );
            return;
        }

        /* Remove previous activity colors */
        cell.classList.remove(
            'activity-1',
            'activity-2',
            'activity-3',
            'activity-4',
            'activity-5'
        );

        /* Apply selected activity color */
        cell.classList.add('activity-' + selectedActivityNumber);

        /* Store activity (optional) */
        cell.dataset.activity = selectedActivityNumber;
    };
});

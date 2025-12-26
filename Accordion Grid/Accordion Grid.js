
/* -------------------- ELEMENT REFERENCES -------------------- */
const openBtn = document.getElementById('openModuleBtn');
const closeBtn = document.getElementById('closeBtn');
const continueBtn = document.getElementById('continueBtn');
const moduleBox = document.getElementById('module');

const containerGroups = document.querySelectorAll('.container-group');

/* -------------------- OPEN MODULE -------------------- */
openBtn.onclick = () => {
    moduleBox.style.display = 'block';
    openBtn.style.display = 'none';

    // Automatically open the first feature
    openRatings(0);
};

/* -------------------- CLOSE MODULE -------------------- */
closeBtn.onclick = continueBtn.onclick = closeModule;

function closeModule() {
    moduleBox.style.display = 'none';
    openBtn.style.display = 'block';
}

/* -------------------- OPEN SPECIFIC RATINGS -------------------- */
function openRatings(index) {
    containerGroups.forEach((group, i) => {
        const ratings = group.querySelector('.ratings');
        ratings.style.display = i === index ? 'block' : 'none';
    });
}

/* -------------------- FEATURE & RATING LOGIC -------------------- */
containerGroups.forEach((group, index) => {
    const feature = group.querySelector('.feature');
    const ratingsBox = group.querySelector('.ratings');
    const ratings = group.querySelectorAll('.rating');

    // Clicking feature allows user to return and edit
    feature.onclick = () => {
        openRatings(index);
    };

    // Clicking a rating
    ratings.forEach(rating => {
        rating.onclick = () => {

            // Remove previous selection
            ratings.forEach(r => r.classList.remove('active'));

            // Mark selected rating
            rating.classList.add('active');

            // Mark feature as completed
            feature.classList.add('completed');

            // Close current ratings
            ratingsBox.style.display = 'none';

            // Auto-open next feature
            if (containerGroups[index + 1]) {
                openRatings(index + 1);
            }
        };
    });
});

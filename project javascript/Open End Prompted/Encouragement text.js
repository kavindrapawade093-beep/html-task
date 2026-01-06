
/* ---------------- ELEMENT REFERENCES ---------------- */
const openModuleBtn = document.getElementById('openModuleBtn');
const dcmModule = document.getElementById('dcmModule');
const closeModuleBtn = document.getElementById('closeModuleBtn');
const continueBtn = document.getElementById('continueBtn');

const textarea = document.getElementById('feedbackInput');
const feedbackText = document.getElementById('feedbackText');
const progressBar = document.getElementById('progressBar');

/* ---------------- OPEN MODULE ---------------- */
openModuleBtn.onclick = () => {
    dcmModule.style.display = 'block';    /* Show module */
    openModuleBtn.style.display = 'none';/* Hide open button */
};

/* ---------------- CLOSE MODULE ---------------- */
closeModuleBtn.onclick = continueBtn.onclick = () => {
    dcmModule.style.display = 'none';     /* Hide module */
    openModuleBtn.style.display = 'inline-block'; /* Show open button */
};

/* ---------------- TEXTAREA INPUT LOGIC ---------------- */
textarea.addEventListener('input', () => {
    const length = textarea.value.length; /* Character count */

    /* Red state: 0–74 characters */
    if (length < 75) {
        progressBar.style.width = '33%';
        progressBar.style.background = 'red';
        feedbackText.style.color = 'red';
        feedbackText.textContent =
            'Not there yet... what else are you thinking? Add some more details.';
    }
    /* Orange state: 75–129 characters */
    else if (length < 130) {
        progressBar.style.width = '66%';
        progressBar.style.background = 'orange';
        feedbackText.style.color = 'orange';
        feedbackText.textContent =
            "You're getting close! Anything else to add?";
    }
    /* Green state: 130+ characters */
    else {
        progressBar.style.width = '100%';
        progressBar.style.background = 'green';
        feedbackText.style.color = 'green';
        feedbackText.textContent =
            'Oh wow! This is great! Thanks for your feedback.';
    }
});

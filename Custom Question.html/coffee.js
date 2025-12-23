
let currentStep = 1;

// DOM Elements
const openBtn = document.getElementById("openModuleBtn");
const closeBtn = document.getElementById("closeModuleBtn");
const module = document.getElementById("dcmModule");
const continueBtn = document.getElementById("continueBtn");
const questionText = document.getElementById("questionText");

// ----- INITIAL RATINGS (pre-filled) -----
let initialRatings = {
    1: [3.5, 4.5, 5],
    2: [3, 2, 4],
    3: [3, 5, 2],
    4: [1, 4.5, 4],
    5: [3.5, 4, 5]
};

// Copy initial ratings to user choices
let userChoices = JSON.parse(JSON.stringify(initialRatings));

// Store selected card per step
let selectedCard = {};

// ----- OPEN / CLOSE -----
openBtn.onclick = () => {
    module.style.display = "block";
    openBtn.style.display = "none";
    restoreStep(currentStep);
};

closeBtn.onclick = () => {
    module.style.display = "none";
    openBtn.style.display = "inline-block";
};

// ----- INITIALIZE CARDS -----
function initCards() {
    document.querySelectorAll(".dcm-cards").forEach(cardsContainer => {

        const step = parseInt(cardsContainer.dataset.step);
        const cards = Array.from(cardsContainer.querySelectorAll(".oval-option"));

        cards.forEach((card, index) => {

            // CARD CLICK (IMAGE CLICK)
            card.onclick = () => {
                cards.forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");

                selectedCard[step] = index;   // save selection
                continueBtn.disabled = false; // enable continue
            };

            // STAR CLICK
            card.querySelectorAll(".stars span").forEach(star => {
                star.onclick = e => {
                    e.stopPropagation();

                    const rating = parseInt(star.dataset.star);

                    card.querySelectorAll(".stars span").forEach(s =>
                        s.classList.remove("active")
                    );

                    for (let i = 0; i < rating; i++) {
                        card.querySelectorAll(".stars span")[i].classList.add("active");
                    }

                    if (!userChoices[step]) userChoices[step] = [];
                    userChoices[step][index] = rating;
                };
            });

        });
    });
}

// ----- RESTORE STEP -----
function restoreStep(step) {
    const stepContainer = document.querySelector(`.step[data-step="${step}"]`);
    const cards = Array.from(stepContainer.querySelectorAll(".oval-option"));

    continueBtn.disabled = true;

    cards.forEach((card, index) => {

        // restore selected card
        if (selectedCard[step] === index) {
            card.classList.add("selected");
            continueBtn.disabled = false;
        } else {
            card.classList.remove("selected");
        }

        // restore rating
        const rating = userChoices[step]?.[index] || 0;
        card.querySelectorAll(".stars span").forEach((star, i) => {
            star.classList.toggle("active", i < rating);
        });
    });
}

// ----- CONTINUE BUTTON -----
continueBtn.onclick = () => {
    document.querySelector(`.step[data-step="${currentStep}"]`).style.display = "none";

    currentStep++;

    const nextStep = document.querySelector(`.step[data-step="${currentStep}"]`);

    if (nextStep) {
        nextStep.style.display = "flex";
        restoreStep(currentStep);
        questionText.textContent = "Which coffee are you most likely to purchase?";
    } else {
        alert("Survey completed! Thank you! 😍");

        module.style.display = "none";
        openBtn.style.display = "inline-block";

        currentStep = 1;
        document.querySelectorAll(".step").forEach(s => s.style.display = "none");
        document.querySelector('.step[data-step="1"]').style.display = "flex";

        restoreStep(1);
    }
};

// ----- ON LOAD -----
window.addEventListener("load", () => {
    initCards();
    restoreStep(currentStep);
});


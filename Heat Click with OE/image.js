const openBtn = document.getElementById("openModuleBtn");
const closeBtn = document.getElementById("closeModuleBtn");
const continueBtn = document.getElementById("continueBtn");
const module = document.getElementById("dcmModule");

// Open module
openBtn.addEventListener("click", () => {
    module.style.display = "block";
    openBtn.style.display = "none";
});

// Close module (used by close & continue buttons)
closeBtn.addEventListener("click", closeModule);
continueBtn.addEventListener("click", closeModule);

function closeModule() {
    module.style.display = "none";
    openBtn.style.display = "inline-block";
}



const image = document.getElementById("heatImage");
const popup = document.getElementById("heatPopup");
const cancelBtn = document.getElementById("cancelHeat");
const submitBtn = document.getElementById("submitHeat");

let selectedFeeling = null; // Stores emoji feeling
let clickX = 0;
let clickY = 0;

// Show popup at clicked image position
image.addEventListener("click", (e) => {
    const rect = image.getBoundingClientRect();

    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;

    const offset = 180; // distance below the click
    popup.style.left = clickX + "px";
    popup.style.top = (clickY + offset) + "px"; // move popup below click
    popup.style.display = "block";
});


// Emoji selection logic
document.querySelectorAll(".emoji-row span").forEach(emoji => {
    emoji.addEventListener("click", () => {
        document.querySelectorAll(".emoji-row span")
            .forEach(e => e.classList.remove("active"));

        emoji.classList.add("active");
        selectedFeeling = emoji.dataset.feel;
    });
});

// Cancel popup
cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.querySelector("textarea").value = "";
});

// Submit heat point
submitBtn.addEventListener("click", () => {
    const comment = popup.querySelector("textarea").value.trim();

    // Validation
    if (!selectedFeeling) {
        alert("Please select how you feel (emoji).");
        return;
    }

    if (comment === "") {
        alert("Please explain why.");
        return;
    }

    // Choose dot color
    let color = "green";
    if (selectedFeeling === "neutral") color = "yellow";
    if (selectedFeeling === "sad") color = "red";

    // Create dot
    const dot = document.createElement("div");
    dot.className = "heat-dot";
    dot.style.left = clickX + "px";
    dot.style.top = clickY + "px";
    dot.style.backgroundColor = color;

    // Add dot to image
    document.querySelector(".image-wrapper").appendChild(dot);

    // Log data
    console.log({
        x: clickX,
        y: clickY,
        feeling: selectedFeeling,
        comment: comment
    });

    // Reset popup
    popup.style.display = "none";
    popup.querySelector("textarea").value = "";
    selectedFeeling = null;

    document.querySelectorAll(".emoji-row span")
        .forEach(e => e.classList.remove("active"));
});
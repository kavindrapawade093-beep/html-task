
/* ---------------- DOM ELEMENTS ---------------- */
const openBtn = document.getElementById("openModuleBtn");
const closeBtn = document.getElementById("closeModuleBtn");
const continueBtn = document.getElementById("continueBtn");
const module = document.getElementById("dcmModule");

const carousel = document.querySelector(".carousel");
const images = carousel.querySelectorAll("img");
const cursorCount = document.getElementById("cursorCount");

let selectedImages = [];
const MAX_SELECTION = 3;

/* -------- OPEN MODULE -------- */
openBtn.onclick = () => {
    module.style.display = "block";
    openBtn.style.display = "none";
    resetSelection();
};

/* -------- CLOSE MODULE -------- */
function closeModule() {
    module.style.display = "none";
    openBtn.style.display = "inline-block";
    cursorCount.style.display = "none";
}

closeBtn.onclick = closeModule;
continueBtn.onclick = closeModule;

/* -------- RESET SELECTION -------- */
function resetSelection() {
    selectedImages = [];
    images.forEach(img => {
        img.classList.remove("selected");
        img.querySelector(".badge")?.remove();
    });
    cursorCount.style.display = "none";
}

/* -------- CURSOR FOLLOW EFFECT -------- */
images.forEach(img => {
    img.addEventListener("mouseenter", () => {
        if (!img.classList.contains("selected") && selectedImages.length < MAX_SELECTION) {
            cursorCount.style.display = "flex";
            cursorCount.textContent = selectedImages.length + 1;
        }
    });

    img.addEventListener("mouseleave", () => {
        cursorCount.style.display = "none";
    });

    img.addEventListener("mousemove", e => {
        cursorCount.style.left = e.clientX + 12 + "px";
        cursorCount.style.top = e.clientY + 12 + "px";
    });

    /* -------- IMAGE SELECTION -------- */
    img.addEventListener("click", () => {
        if (img.classList.contains("selected")) {
            img.classList.remove("selected");
            img.querySelector(".badge").remove();
            selectedImages = selectedImages.filter(i => i !== img);
            selectedImages.forEach((el, idx) => {
                el.querySelector(".badge").textContent = idx + 1;
            });
            return;
        }

        if (selectedImages.length >= MAX_SELECTION) {
            alert("You can select only 3 artists.");
            return;
        }

        selectedImages.push(img);
        img.classList.add("selected");

        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = selectedImages.length;
        img.appendChild(badge);
    });
});

/* -------- 3D OVAL CAROUSEL -------- */
let rotation = 0;
const radiusX = 250;
const radiusY = 100;

images.forEach((img, i) => {
    img.dataset.angle = (360 / images.length) * i;
});

function updateCarousel() {
    images.forEach(img => {
        const angle = parseFloat(img.dataset.angle) + rotation;
        const rad = angle * Math.PI / 180;

        const x = Math.cos(rad) * radiusX;
        const y = Math.sin(rad) * radiusY;
        const z = Math.sin(rad) * radiusX;

        const depth = (z + radiusX) / (2 * radiusX);

        img.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${0.5 + depth * 0.7})`;
        img.style.opacity = (0.15 + depth * 0.85).toFixed(2);
        img.style.zIndex = Math.floor(depth * 100);
    });
}

/* -------- CAROUSEL NAVIGATION -------- */
document.getElementById("nextBtn").onclick = () => {
    rotation -= 360 / images.length;
    updateCarousel();
};
document.getElementById("prevBtn").onclick = () => {
    rotation += 360 / images.length;
    updateCarousel();
};



// Second set of buttons
document.getElementById("nextBtn2").onclick = () => {
    rotation -= 360 / images.length;
    updateCarousel();
};
document.getElementById("prevBtn2").onclick = () => {
    rotation += 360 / images.length;
    updateCarousel();
};





// Initial render
updateCarousel();

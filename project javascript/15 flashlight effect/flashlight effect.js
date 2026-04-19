/* Store mouse coordinates */
let mouseX = 0;
let mouseY = 0;

/* Select flashlight overlay */
let flashlight = document.getElementById("flashlight");

/* Track mouse movement */
document.addEventListener("mousemove", (e) => {

    /* Get mouse position */
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Update CSS variables for gradient position */
    flashlight.style.setProperty("--Xpos", mouseX + "px");
    flashlight.style.setProperty("--Ypos", mouseY + "px");
});
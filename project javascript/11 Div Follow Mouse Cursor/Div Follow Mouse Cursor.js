// Select the div element
let mydiv = document.getElementById("my-div");

/*
    Function to check if device supports touch
    Returns true for touch devices
*/
function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

/*
    Function to move the div
    Works for both mouse and touch events
*/
const move = (e) => {
    try {
        // Get X and Y coordinates based on device type
        var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
        var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    } catch (e) {
        // Ignore errors (safety)
    }

    // Update div position (offset to center it)
    mydiv.style.left = x - 30 + "px";
    mydiv.style.top = y - 30 + "px";
};

// Mouse move event (desktop)
document.addEventListener("mousemove", (e) => {
    move(e);
});

// Touch move event (mobile)
document.addEventListener("touchmove", (e) => {
    move(e);
});
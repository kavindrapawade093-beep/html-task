// Select inner and outer cursor elements
let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');

// Listen for mouse movement
document.addEventListener("mousemove", moveCursor);

// Function to update cursor positions
function moveCursor(e) {

    // Get mouse X and Y coordinates
    let x = e.clientX;
    let y = e.clientY;

    // Update inner cursor position
    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;

    // Update outer cursor position
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}
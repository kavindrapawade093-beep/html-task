/*
    Function to make the document title flash
    between its original title and a notification text
*/
function flashTitle() {
    // Store the original document title
    var titleOne = document.title;

    // Boolean flag to toggle title
    var isFlashOn = false;

    /*
        Inner function that actually toggles the title
        Runs repeatedly via setInterval
    */
    function flashTitle() {
        // Toggle title: if isFlashOn true, set original title, else set "New Notification"
        document.title = isFlashOn ? titleOne : "New Notification";

        // Toggle the boolean flag
        isFlashOn = !isFlashOn;
    }

    // Call flashTitle every 1000ms (1 second)
    setInterval(flashTitle, 1000);
}

// Start flashing title when page loads
window.onload = flashTitle;
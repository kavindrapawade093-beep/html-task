// Variables to store download start and end time
let startTime, endTime;

// Variable to store image size (in bytes)
let imageSize = "";

// Create an image object for testing download speed
let image = new Image();

// Get HTML elements to display results
let bitOutput = document.getElementById("bits");
let kboutput = document.getElementById("kbs");
let mboutput = document.getElementById("mbs");

// Image URL used to test internet speed
let imageLink = "https://picsum.photos/200/300";

// This function runs when the image finishes loading
image.onload = async function () {

    // Store end time when image is loaded
    endTime = new Date().getTime();

    // Fetch the same image to get its size from headers
    await fetch(imageLink).then((response) => {

        // Get image size from response header
        imageSize = response.headers.get("content-length");

        // Call speed calculation function
        calculateSpeed();
    });

};

// Function to calculate internet speed
function calculateSpeed() {

    // Calculate total download time in seconds
    let timeDuration = (endTime - startTime) / 1000;

    // Convert image size from bytes to bits
    let loadedBits = imageSize * 8;

    // Calculate speed in Bits per second
    let speedInBps = (loadedBits / timeDuration).toFixed(2);

    // Convert Bits per second to Kilobits per second
    let speedInKbs = (speedInBps / 1024).toFixed(2);

    // Convert Kilobits per second to Megabits per second
    let speedInMbs = (speedInKbs / 1024).toFixed(2);

    // Display calculated speeds on the page
    bitOutput.innerHTML += `${speedInBps}  `;
    kboutput.innerHTML += `${speedInKbs}  `;
    mboutput.innerHTML += `${speedInMbs}  `;
}

// Initialization function
const init = async () => {

    // Store start time before image download begins
    startTime = new Date().getTime();

    // Start downloading the image
    image.src = imageLink;
};

// Run init function when page loads
window.onload = () => init();
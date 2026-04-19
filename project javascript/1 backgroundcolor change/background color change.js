
// Function to change the background color randomly
function changeColor() {

    // Generate random values between 0 and 255 for RGB
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);

    // Apply the random RGB color to body background
    document.body.style.backgroundColor =
        'rgb(' + red + ',' + green + ',' + blue + ')';
}

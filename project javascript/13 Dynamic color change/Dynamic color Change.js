// Select input field
let inputBox = document.getElementById("input-box");

// Select color preview box
let resultBox = document.getElementById("result-box");

/*
    Function to change background color
    based on input value
*/
let changeColor = () => {

    // Get value typed in input
    let input = inputBox.value;

    // Apply input value as background color
    // (works for color names, hex, rgb, etc.)
    resultBox.style.backgroundColor = input;
};

// Listen for typing in input field
inputBox.addEventListener("input", changeColor);
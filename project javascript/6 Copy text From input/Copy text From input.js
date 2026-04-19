
/*
copy() function
----------------
Accepts the ID of an input element
Selects its text
Copies it to clipboard
*/

// Arrow function that receives input id as parameter
let copy = (textId) => {

    // Select the input element using its ID
    let input = document.getElementById(textId);

    // Select (highlight) the text inside the input
    input.select();

    // Copy the selected text to clipboard
    document.execCommand("copy");
};

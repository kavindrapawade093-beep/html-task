
// Get reference to the result paragraph
let result = document.getElementById("result");

// Get reference to the button
let btn = document.getElementById("check");

// Add click event listener to the button
btn.addEventListener("click", () => {

    // Get values from both date inputs
    let date1 = document.getElementById("date-1").value;
    let date2 = document.getElementById("date-2").value;

    // Check if any input is empty
    if (date1.length == 0 || date2.length == 0) {
        result.innerHTML = "<span>Input Some Value To get Started</span>";
    }
    // If first date is greater than second date
    else if (date1 > date2) {
        result.innerHTML = `<span>${date1} is greater than ${date2}</span>`;
    }
    // If first date is smaller than second date
    else if (date1 < date2) {
        // ❗ Typo here: innerHtml should be innerHTML
        result.innerHtml = `<span>${date2} is greater than ${date1}</span>`;
    }
    // If both dates are equal
    else if (date1 == date2) {
        result.innerHTML = `<span>${date1} is equal to ${date2}</span>`;
    }
});

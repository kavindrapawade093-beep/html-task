// Select the div container
let container = document.querySelector('.container');

// Get the current hour from system (0–23)
let timeNow = new Date().getHours();

// For example only (testing purpose) forcing time = 10 AM
timeNow = 10;

console.log(timeNow); // Print time in console

// Conditional greeting based on time
let greeting =
    timeNow >= 5 && timeNow < 12        // Condition: Morning (5 AM – 11:59 AM)
        ? "Good Morning"
        : timeNow >= 12 && timeNow < 18  // Condition: Afternoon (12 PM – 5:59 PM)
            ? "Good Afternoon"
            : "Good Evening";             // Else: Evening (6 PM – 4:59 AM)

console.log(greeting); // Print greeting in console

// Replace box text with greeting dynamically
container.innerHTML = `<h1>${greeting}</h1>`;
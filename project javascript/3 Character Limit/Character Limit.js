
/* Get textarea element */
var myText = document.getElementById("my-text");

/* Get paragraph to display character count */
var result = document.getElementById("result");

/* Maximum character limit */
var limit = 60;

/* Initial character count display */
result.textContent = 0 + "/" + limit;

/* Listen for user input in textarea */
myText.addEventListener("input", function () {

    /* Get current text length */
    var textLength = myText.value.length;

    /* Update character counter text */
    result.textContent = textLength + "/" + limit;

    /* Check if character limit is exceeded */
    if (textLength > limit) {

        /* Change textarea border color on overflow */
        myText.style.borderColor = "red";

        /* Change counter color when limit exceeded */
        result.style.color = "green";

    } else {

        /* Border color when within limit */
        myText.style.borderColor = "orange";

        /* Counter color when within limit */
        result.style.color = "red";
    }
});

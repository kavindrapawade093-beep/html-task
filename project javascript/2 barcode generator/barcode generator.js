
/* Select input field */
let input = document.getElementById("input");

/* Select button */
let btn = document.getElementById("btn-barcode-genrator");

/* Generate barcode when button is clicked */
btn.addEventListener("click", () => {

    /* Call JsBarcode library */
    JsBarcode("#barcode", input.value, {
        format: "CODE128",     /* Barcode format */
        displayValue: true,    /* Show text below barcode */
        fontSize: 24,          /* Text size */
        lineColor: "#000",     /* Barcode color */
    });
});

/* Clear input field when page loads */
window.onload = () => {
    input.value = "";
};

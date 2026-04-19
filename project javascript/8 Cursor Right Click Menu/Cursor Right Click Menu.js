const customMenu = document.getElementById("custom-menu");

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    customMenu.style.display = "block";
    customMenu.style.left = e.clientX + "px";
    customMenu.style.top = e.clientY + "px";
});

document.addEventListener("click", () => {
    customMenu.style.display = "none";
});
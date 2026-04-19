const cursor = document.querySelector('#cursor');
const cursorBorder = document.querySelector('#cursor-border');

document.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;

    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    cursorBorder.style.left = x + 'px';
    cursorBorder.style.top = y + 'px';
});
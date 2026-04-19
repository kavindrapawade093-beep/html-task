/*
 * showToast function:
 * message -> toast text
 * type -> toast type (success or error)
 */
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('taost-container');

    // Create new toast element
    const toast = document.createElement('div');

    // Add classes for styling
    toast.classList.add('toast', type);

    // Set message inside toast
    toast.innerText = message;

    // Add toast to DOM
    toastContainer.appendChild(toast);

    // Auto remove toast after 2 seconds
    setTimeout(() => {
        toast.remove();
    }, 2000);
}
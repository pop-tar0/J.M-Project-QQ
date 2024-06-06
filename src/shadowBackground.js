// Open the translucent background and return a function to close it
export const openShadowBackground = (event, dialog) => {
    event.preventDefault();
    const bgShadow = document.querySelector('.bg-shadow');
    bgShadow.style.display = 'block';

    const closeDialog = () => {
        bgShadow.style.display = 'none';
        document.querySelector(dialog).style.display = 'none';
    };

    bgShadow.addEventListener('click', closeDialog);

    // Return a function to close the dialog
    return closeDialog;
};

// Close the translucent background and return true if successful
export const closeShadowBackground = (event) => {
    event.preventDefault();
    const bgShadow = document.querySelector('.bg-shadow');
    if (!bgShadow) {
        return false; // Return false if element not found
    }

    bgShadow.style.display = 'none';

    // Return true to indicate successful closure
    return true;
};

export default {};

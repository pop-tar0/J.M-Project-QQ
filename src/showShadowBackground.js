// Open the translucent background
export const showShadowBackground = (event, dialog) => {
    event.preventDefault();
    const bgShadow = document.querySelector('.bg-shadow');
    bgShadow.style.display = 'block';

    bgShadow.addEventListener('click', () => {
        bgShadow.style.display = 'none';
        document.querySelector(dialog).style.display = 'none';
    });
};

export default {};

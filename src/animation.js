export const handleLikeButtonClick = (IconStyle, color, element) => (event) => {
    const effectIcon = event.currentTarget.querySelector(element);
    const currentColor = IconStyle.color;

    effectIcon.classList.add('color-transition');

    if (currentColor === 'rgb(255, 255, 255)') {
        effectIcon.style.color = color;
        effectIcon.classList.remove('bounce');
        effectIcon.classList.add('bounce');
    } else {
        effectIcon.style.color = 'white';
        effectIcon.classList.remove('bounce');
        effectIcon.classList.remove('color-transition');
    }

    return {
        ...IconStyle,
        color: currentColor === 'rgb(255, 255, 255)' ? color : 'white',
    };
};

export default {};

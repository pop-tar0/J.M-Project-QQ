export const colorizeIconWithAnimation = (icon, color) => {
    const iconStyle = window.getComputedStyle(icon);
    const currentColor = iconStyle.color;

    const newStyle = {
        color: currentColor === 'rgb(255, 255, 255)' ? color : 'white',
        transition: 'color 0.3s',
    };

    const newClasses = ['color-transition'];
    if (currentColor === 'rgb(255, 255, 255)') {
        newClasses.push('bounce');
    }

    return {
        style: newStyle,
        classes: newClasses,
        removeClasses: currentColor !== 'rgb(255, 255, 255)' ? ['bounce', 'color-transition'] : [],
    };
};

export default {};

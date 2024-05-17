export const toggleVisibility = (initialElement, display) => {
    const element = initialElement;
    const elementStyle = window.getComputedStyle(element);
    if (elementStyle.display === 'none') {
        element.style.display = display;
    } else {
        element.style.display = 'none';
    }
    return {
        ...initialElement,
        style: {
            ...initialElement.style,
            display: elementStyle.display === 'none' ? display : 'none',
        },
    };
};

export default {};

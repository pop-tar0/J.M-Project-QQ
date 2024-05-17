export const toggleVisibility = (initialElement) => {
    const element = initialElement;
    const elementStyle = window.getComputedStyle(element);
    if (elementStyle.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
    return {
        ...initialElement,
        style: {
            ...initialElement.style,
            display: elementStyle.display === 'none' ? 'block' : 'none',
        },
    };
};

export default {};

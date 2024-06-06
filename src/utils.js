// The function to exchange the display of the element
export const toggleVisibility = (element, display) => {
    const elementStyle = window.getComputedStyle(element);
    const newDisplay = elementStyle.display === 'none' ? display : 'none';
    return {
        display: newDisplay,
    };
};

export default {};

// The function to exchange the display of the element
export const toggleVisibility = (element, display) => {
    const elementStyle = window.getComputedStyle(element);
    const newDisplay = elementStyle.display === 'none' ? display : 'none';
    return {
        display: newDisplay,
    };
};

// The function to change minute to other type
export const timeFormatter = (minute) => {
    if (minute > 0 && minute < 60) {
        return `${minute}m`;
    }
    if (minute > 60) {
        const hours = Math.floor(minute / 60);
        return `${hours}h`;
    }
    return 'Invalid time';
};

export default {};

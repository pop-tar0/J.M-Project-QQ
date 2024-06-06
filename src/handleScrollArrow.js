export const handleScrollArrow = (initialInterval, initialContainer, toggle, hoverSpeed, holdSpeed) => {
    let interval = initialInterval;
    const container = initialContainer;

    const isScrollAtEdge = () => {
        const nextBgUp = document.querySelector('.next-bg-up');
        nextBgUp.style.display = container.scrollTop <= 0 ? 'none' : 'block';
        const nextBgDown = document.querySelector('.next-bg-down');
        nextBgDown.style.display = container.scrollTop + container.clientHeight >= container.scrollHeight ? 'none' : 'block';
    };

    const handleMouseEnter = () => {
        if (interval) return;
        interval = setInterval(() => {
            container.scrollTop -= hoverSpeed;
        }, 10);
    };

    const handleMouseLeave = () => {
        if (!interval) return;
        clearInterval(interval);
        interval = null;
    };

    const handleMouseDown = () => {
        clearInterval(interval);
        interval = setInterval(() => {
            container.scrollTop -= holdSpeed;
        }, 10);
    };

    const handleMouseUp = () => {
        if (toggle.matches(':hover')) {
            toggle.dispatchEvent(new MouseEvent('mouseenter'));
            clearInterval(interval);
            interval = setInterval(() => {
                container.scrollTop -= hoverSpeed;
            }, 10);
        }
    };

    const addEventListeners = () => {
        container.addEventListener('scroll', isScrollAtEdge);
        toggle.addEventListener('mouseenter', handleMouseEnter);
        toggle.addEventListener('mouseleave', handleMouseLeave);
        toggle.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const removeEventListeners = () => {
        container.removeEventListener('scroll', isScrollAtEdge);
        toggle.removeEventListener('mouseenter', handleMouseEnter);
        toggle.removeEventListener('mouseleave', handleMouseLeave);
        toggle.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        clearInterval(interval);
        interval = null;
    };

    // When the function is called, add event listeners
    addEventListeners();

    // Return an object that allows you to remove event listeners
    return removeEventListeners;
};

export default {};

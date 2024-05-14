export const handleScrollArrow = (initialInterval, initialContainer, toggle, hoverSpeed, holdSpeed) => {
    let interval = initialInterval;
    const container = initialContainer;

    // If scroll is not at edge, show white translucent background
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

    container.addEventListener('scroll', isScrollAtEdge);
    toggle.addEventListener('mouseenter', handleMouseEnter);
    toggle.addEventListener('mouseleave', handleMouseLeave);
    toggle.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
};

export default {};

(function () {
    'use strict';

    // Open the translucent background
    const showShadowBackground = (event, dialog) => {
        event.preventDefault();
        const bgShadow = document.querySelector('.bg-shadow');
        bgShadow.style.display = 'block';

        bgShadow.addEventListener('click', () => {
            bgShadow.style.display = 'none';
            document.querySelector(dialog).style.display = 'none';
        });
    };

    const handleScrollArrow = (initialInterval, initialContainer, toggle, hoverSpeed, holdSpeed) => {
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

    // Select Image
    // Opens the file selection dialog when the user clicks the select image button
    document.querySelector('#select-image-btn').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#fileInput').click();
    });

    document.querySelector('#fileInput').addEventListener('change', (event) => {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            for (let i = 0; i < input.files.length; i += 1) {
                const file = input.files[i];
                if (file.type.match('image.*')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.classList.add('rounded-lg');

                    const closeBtn = document.createElement('button');
                    closeBtn.classList.add('close-btn', 'absolute', 'bg-gray-300', 'rounded-full', 'text-center', 'select-none');
                    closeBtn.textContent = '✖️';

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container', 'relative', 'mt-0', 'mb-2', 'ml-1', 'mr-2');

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(closeBtn);

                    document.querySelector('#selectedImage').appendChild(imageContainer);
                }
            }
        }
    });

    // // Canceled the selected images
    document.querySelector('#selectedImage').addEventListener('click', (event) => {
        if (event.target.classList.contains('close-btn')) {
            const imageContainer = event.target.parentNode;
            imageContainer.parentNode.removeChild(imageContainer);
        }
    });

    // Selection Location
    // Open the location selection dialog
    document.querySelector('#select-location-btn').addEventListener('click', (event) => {
        showShadowBackground(event, '#select-location');
        const selectLocation = document.querySelector('#select-location');
        selectLocation.style.display = 'block';

        const closeBtn = selectLocation.querySelector('.close-btn');

        closeBtn.addEventListener('click', () => {
            const bg = document.querySelector('.bg-shadow');
            bg.style.display = 'none';
            document.querySelector('#select-location').style.display = 'none';
        });
    });

    // Hover or hold on mouse to slide options
    const scrollContainer = document.querySelector('.slide-content');
    const nextToggleUp = document.querySelector('.next-toggle-up');
    const nextToggleDown = document.querySelector('.next-toggle-down');
    let scrollInterval;

    handleScrollArrow(scrollInterval, scrollContainer, nextToggleUp, 3, 6);
    handleScrollArrow(scrollInterval, scrollContainer, nextToggleDown, -3, -6);

})();

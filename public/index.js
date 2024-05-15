(function () {
    'use strict';

    // Open the translucent background
    const openShadowBackground = (event, dialog) => {
        event.preventDefault();
        const bgShadow = document.querySelector('.bg-shadow');
        bgShadow.style.display = 'block';

        bgShadow.addEventListener('click', () => {
            bgShadow.style.display = 'none';
            document.querySelector(dialog).style.display = 'none';
        });
    };

    // Close the translucent background
    const closeShadowBackground = (event) => {
        event.preventDefault();
        const bgShadow = document.querySelector('.bg-shadow');
        bgShadow.style.display = 'none';
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
        openShadowBackground(event, '#select-location');
        const selectLocation = document.querySelector('#select-location');
        selectLocation.style.display = 'block';

        const closeBtn = selectLocation.querySelector('.close-btn');

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const bg = document.querySelector('.bg-shadow');
            bg.style.display = 'none';
            document.querySelector('#select-location').style.display = 'none';
        });
    });

    // Hover or hold on mouse to slide location options
    const slideContent = document.querySelector('.slide-content');
    const nextToggleUp = document.querySelector('.next-toggle-up');
    const nextToggleDown = document.querySelector('.next-toggle-down');
    let scrollInterval;

    handleScrollArrow(scrollInterval, slideContent, nextToggleUp, 3, 6);
    handleScrollArrow(scrollInterval, slideContent, nextToggleDown, -3, -6);

    // click location options to add location information into the post
    const locationBtns = slideContent.querySelectorAll('.location-btn');

    const showLocation = (event) => {
        event.preventDefault();
        const postContainer = document.querySelector('.post-container');
        const locationBtn = event.currentTarget;
        const location = locationBtn.querySelector('.location').textContent;

        const locationIcon = document.createElement('i');
        locationIcon.classList.add('fas', 'fa-map-marker-alt', 'my-auto', 'text-xs', 'mr-2');

        const locationName = document.createElement('div');
        locationName.classList.add('my-auto', 'select-none');
        locationName.textContent = location;

        const locationNameSide = document.createElement('div');
        locationNameSide.classList.add('location-name-side', 'flex', 'bg-gray-200', 'text-white', 'h-8', 'rounded-lg', 'w-auto');
        locationNameSide.append(locationIcon);
        locationNameSide.appendChild(locationName);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn', 'bg-gray-300', 'rounded-full', 'text-center', 'select-none', 'absolute');
        closeBtn.textContent = '✖️';

        const locationTag = document.createElement('div');
        locationTag.classList.add('location-tag', 'absolute');

        locationTag.append(locationNameSide);
        locationTag.append(closeBtn);

        postContainer.appendChild(locationTag);

        closeBtn.addEventListener('click', () => {
            locationTag.remove();
        });
    };

    locationBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const locationTag = document.querySelector('.location-tag');
            if (locationTag) {
                locationTag.remove();
            }
            showLocation(event);
            const selectLocation = document.querySelector('#select-location');
            selectLocation.style.display = 'none';
            closeShadowBackground(event);
        });
    });

})();

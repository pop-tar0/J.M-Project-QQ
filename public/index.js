(function () {
    'use strict';

    const someUtils = () => '';

    document.body.innerHTML += '';
    document.body.innerHTML += someUtils();

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

    const scrollContainer = document.querySelector('.slide');

    scrollContainer.addEventListener('scroll', () => {
        const nextBgUp = document.querySelector('.next-bg-up');
        nextBgUp.style.display = scrollContainer.scrollTop <= 0 ? 'none' : 'block';
        const nextBgDown = document.querySelector('.next-bg-down');
        nextBgDown.style.display = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight ? 'none' : 'block';
    });

    const nextToggleUp = document.querySelector('.next-toggle-up');
    const nextToggleDown = document.querySelector('.next-toggle-down');

    let scrollInterval;

    nextToggleUp.addEventListener('mouseenter', () => {
        if (scrollInterval) return;
        scrollInterval = setInterval(() => {
            scrollContainer.scrollTop -= 3;
        }, 10);
    });

    nextToggleUp.addEventListener('mouseleave', () => {
        if (!scrollInterval) return;
        clearInterval(scrollInterval);
        scrollInterval = null;
    });

    nextToggleUp.addEventListener('mousedown', () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            scrollContainer.scrollTop -= 6;
        }, 10);
    });

    document.addEventListener('mouseup', () => {
        if (nextToggleUp.matches(':hover')) {
            nextToggleUp.dispatchEvent(new MouseEvent('mouseenter'));
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                scrollContainer.scrollTop -= 3;
            }, 10);
        }
    });

    nextToggleDown.addEventListener('mouseenter', () => {
        if (scrollInterval) return;
        scrollInterval = setInterval(() => {
            scrollContainer.scrollTop += 3;
        }, 10);
    });

    nextToggleDown.addEventListener('mouseleave', () => {
        if (!scrollInterval) return;
        clearInterval(scrollInterval);
        scrollInterval = null;
    });

    nextToggleDown.addEventListener('mousedown', () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            scrollContainer.scrollTop += 6;
        }, 10);
    });

    document.addEventListener('mouseup', () => {
        if (nextToggleDown.matches(':hover')) {
            nextToggleDown.dispatchEvent(new MouseEvent('mouseenter'));
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                scrollContainer.scrollTop += 3;
            }, 10);
        }
    });

})();

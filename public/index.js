(function () {
    'use strict';

    // Open the translucent background and return a function to close it
    const openShadowBackground = (event, dialog) => {
        event.preventDefault();
        const bgShadow = document.querySelector('.bg-shadow');
        bgShadow.style.display = 'block';

        const closeDialog = () => {
            bgShadow.style.display = 'none';
            document.querySelector(dialog).style.display = 'none';
        };

        bgShadow.addEventListener('click', closeDialog);

        // Return a function to close the dialog
        return closeDialog;
    };

    // Close the translucent background and return true if successful
    const closeShadowBackground = (event) => {
        event.preventDefault();
        const bgShadow = document.querySelector('.bg-shadow');
        if (!bgShadow) {
            return false; // Return false if element not found
        }

        bgShadow.style.display = 'none';

        // Return true to indicate successful closure
        return true;
    };

    const handleScrollArrow = (initialInterval, initialContainer, toggle, hoverSpeed, holdSpeed) => {
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

    const colorizeIconWithAnimation = (icon, color) => {
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

    // The function to exchange the display of the element
    const toggleVisibility = (element, display) => {
        const elementStyle = window.getComputedStyle(element);
        const newDisplay = elementStyle.display === 'none' ? display : 'none';
        return {
            display: newDisplay,
        };
    };

    // The function to change minute to other type
    const timeFormatter = (minute) => {
        if (minute > 0 && minute < 60) {
            return `${minute}m`;
        }
        if (minute > 60) {
            const hours = Math.floor(minute / 60);
            return `${hours}h`;
        }
        return 'Invalid time';
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

    // Hover or hold on mouse to slide location options
    const slideContent = document.querySelector('.slide-content');
    const nextToggleUp = document.querySelector('.next-toggle-up');
    const nextToggleDown = document.querySelector('.next-toggle-down');
    const postInformation = document.querySelector('.post-information');
    let scrollInterval;

    // Selection Location
    // Open the location selection dialog
    document.querySelector('#select-location-btn').addEventListener('click', (event) => {
        const closeDialog = openShadowBackground(event, '#select-location');

        const selectLocation = document.querySelector('#select-location');
        selectLocation.style.display = 'block';

        const closeBtn = selectLocation.querySelector('.close-btn');

        const scrollArrowHandlerUp = handleScrollArrow(scrollInterval, slideContent, nextToggleUp, 3, 6);
        const scrollArrowHandlerDown = handleScrollArrow(scrollInterval, slideContent, nextToggleDown, -3, -6);

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // The returned function from openShadowBackground
            closeDialog();
            scrollArrowHandlerUp.removeEventListeners();
            scrollArrowHandlerDown.removeEventListeners();
        });
    });

    // Click location options to add location information into the post
    const locationBtns = slideContent.querySelectorAll('.location-btn');

    //
    const adjustMoodTagPosition = () => {
        const moodTag = document.querySelector('.mood-tag');
        if (moodTag) {
            moodTag.style.marginLeft = '8px';
        }
    };

    const showLocation = (event) => {
        event.preventDefault();
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

        postInformation.appendChild(locationTag);

        const moodTag = document.querySelector('.mood-tag');
        if (moodTag) {
            const distance = locationTag.offsetWidth + 16;
            moodTag.style.marginLeft = `${distance}px`;
        }

        closeBtn.addEventListener('click', () => {
            locationTag.remove();
            adjustMoodTagPosition();
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

    // Select Mood
    const selectMoodBtn = document.querySelector('#select-mood-btn');
    const moodBar = document.querySelector('#mood-bar');

    // Click anywhere except the .mood-bar element will close it
    document.addEventListener('click', (event) => {
        if (!moodBar.contains(event.target) && event.target !== selectMoodBtn) {
            moodBar.style.display = 'none';
        }
    });

    // Clicking the .select-mood-btn element element can control whether the bar is open or not
    selectMoodBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const newStyles = toggleVisibility(moodBar, 'flex');
        Object.assign(moodBar.style, newStyles);
    });

    // Choose one, and the others will be minimized to the side
    const emojis = moodBar.querySelectorAll('.emoji');

    const hoverOnEmoji = (emoji, emojiArray) => {
        if (emoji === emojiArray[0]) {
            emojiArray[1].classList.add('ml-2');
        } else if (emoji === emojiArray[emojiArray.length - 1]) {
            emojiArray[emojiArray.length - 1].classList.add('ml-2');
        } else {
            emoji.classList.add('ml-2', 'mr-2');
        }
    };

    const hoverOutEmoji = (emoji, emojiArray) => {
        if (emoji === emojiArray[0]) {
            emojiArray[1].classList.remove('ml-2');
        } else if (emoji === emojiArray[emojiArray.length - 1]) {
            emojiArray[emojiArray.length - 1].classList.remove('ml-2');
        } else {
            emoji.classList.remove('ml-2', 'mr-2');
        }
    };

    // Click location options to add location information into the post
    const showMood = (event) => {
        event.preventDefault();
        const mood = event.currentTarget.textContent;

        const moodContent = document.createElement('div');
        moodContent.classList.add('mood-content', 'bg-gray-200', 'h-8', 'rounded-lg', 'w-8', 'absolute', 'text-center', 'leading-8', 'text-xl', 'select-none');
        moodContent.textContent = mood;

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn', 'bg-gray-300', 'rounded-full', 'text-center', 'select-none', 'absolute');
        closeBtn.textContent = '✖️';

        const moodTag = document.createElement('div');
        moodTag.classList.add('mood-tag', 'absolute');
        moodTag.appendChild(moodContent);
        moodTag.appendChild(closeBtn);

        postInformation.appendChild(moodTag);

        const locationTag = document.querySelector('.location-tag');
        if (locationTag) {
            const distance = locationTag.offsetWidth + 16;
            moodTag.style.marginLeft = `${distance}px`;
        }

        closeBtn.addEventListener('click', () => {
            moodTag.remove();
        });
    };

    emojis.forEach((emoji) => {
        // Passing a function to addEventListener allows the function to be executed when the event occurs, rather than executing it immediately
        emoji.addEventListener('mouseenter', () => hoverOnEmoji(emoji, emojis));
        emoji.addEventListener('mouseleave', () => hoverOutEmoji(emoji, emojis));
        emoji.addEventListener('click', (e) => {
            e.preventDefault();
            const moodTag = document.querySelector('.mood-tag');
            if (moodTag) {
                moodTag.remove();
            }
            showMood(e);
            moodBar.style.display = 'none';
        });
    });

    // Put the post information into an array for easier management
    const postInfo = [
        {
            photoUrl: 'assets/img/poster1-photo.png',
            name: 'pop.dokyun_el',
            time: 15,
            textContent: 'super idol的笑容<br>都沒印何闐',
            imageUrl: 'assets/img/post-img1.png',
            likeQuantity: 300,
        },
        {
            photoUrl: 'assets/img/poster2-photo.png',
            name: 'patrick',
            time: 20,
            textContent: '我平常就是這樣呆頭呆腦才會沒煩惱啊',
            imageUrl: 'assets/img/post-img2.png',
            likeQuantity: 5790,
        },
        {
            photoUrl: 'assets/img/poster3-photo.png',
            name: 'piyan',
            time: 90,
            textContent: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            imageUrl: 'assets/img/post-img3.png',
            likeQuantity: 999,
        },
    ];

    // Generate post
    const generatePostHTML = (post) => `
    <div class="container post bg-gray-100 h-auto mx-auto mt-2 mb-2 rounded-lg">
        <div class="row flex">
            <div class="poster-information flex flex-col h-auto">
                <a href="javascript:;" class="poster-photo w-7/12 mt-2 mb-0 mx-auto btn-hover">
                    <img src="${post.photoUrl}" class="w-full h-full rounded-lg object-cover" alt="Error圖片錯誤">
                </a>
                <a href="javascript:;" class="poster-name text-center text-white mt-2 mb-0 mx-auto bg-gray-300 h-5 leading-5 font-bold btn-hover w-7/12 overflow-hidden rounded-lg hover:underline text-2xs">@${post.name}</a>
            </div>
            <div class="post-content-panel rounded-lg">
                <div class="post-content bg-white h-auto relative mt-2 mb-2 ml-0 mr-0 pt-3 pb-2 px-4 rounded-lg">
                    <div class="post-time-container flex absolute text-sm items-center">
                        <i class="fas fa-clock text-gray-300 mr-2"></i>
                        <div class="post-time text-gray-300">${timeFormatter(post.time)}</div>
                    </div>

                    <!--More Button-->
                    <div class="more-container flex flex-col absolute w-40 h-40 items-center">
                        <button class="more-btn h-10 w-10 rounded-full hover:bg-gray-100">
                            <i class="fas fa-ellipsis-h text-gray-300 text-lg mx-auto"></i>
                        </button>
                        <div class="more-bar flex-col w-full items-center mt-2" hidden>
                            <div class="more-bar-head h-4 w-4 bg-gray-200 transform rotate-45"></div>
                            <div class="more-bar-body h-auto w-full bg-gray-200 rounded-lg z-10 py-1">
                                <ul class="flex flex-col">
                                    <li>
                                        <button class="hide-btn flex bg-white hover:bg-gray-100 h-8 w-11/12 my-1 mx-auto rounded-md">
                                            <i class="fas fa-times h-8 w-8 mt-2 ml-1"></i>
                                            <div class="h-8 leading-8">隱藏</div>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="flex bg-white hover:bg-gray-100 h-8 w-11/12 my-1 mx-auto rounded-md">
                                            <i class="fas fa-exclamation-triangle h-8 w-8 mt-2 ml-1"></i>
                                            <div class="h-8 leading-8">檢舉</div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>                         
                    <p class="main-text break-words mb-2">${post.textContent}</p>
                    <img src="${post.imageUrl}" class="border-0 w-full" alt="Error圖片錯誤">
                    <div class="feedback-panel flex justify-between mt-2 w-full">
                        <div class="flex mt-1">
                            <i class="likes-icon fas fa-heart w-5 pt-1 text-navy-blue"></i>
                            <a href="javascript:;" class="likes-quantity detail tracking-wide text-black hover:underline">${post.likeQuantity}</a>
                        </div>
                        <div class="interaction-bar flex justify-between w-2/5">
                        
                            <!--Like button-->
                            <button class="like-btn bg-gray-300 text-white w-20 h-8 rounded-lg hover:opacity-80">
                                <i class="fas fa-heart like-icon"></i>
                            </button>

                            <!--Comment button-->
                            <button class="comment-btn bg-gray-300 text-white w-20 h-8 rounded-lg hover:opacity-80">
                                <i class="fas fa-comment comment-icon"></i>                    
                            </button>

                            <!-- Share button -->
                            <button class="share-btn bg-gray-300 text-white w-20 h-8 rounded-lg hover:opacity-80">
                                <i class="fas fa-share-alt share-icon"></i>
                            </button>
                        </div>
                    </div>
                    <form class="comment-container h-auto" hidden>
                        <textarea class="comment-textarea w-full pl-3 mt-2 rounded-lg bg-gray-100 h-auto"></textarea>
                        <button class="add-comment-btn absolute bg-navy-blue text-white h-8 rounded-lg hover:opacity-80" type="submit">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
`;

    // Render post
    const renderPost = (posts) => {
        const postBlock = document.querySelector('.post-block');
        postBlock.innerHTML = posts.map(generatePostHTML).join('');
    };

    document.addEventListener('DOMContentLoaded', renderPost(postInfo));

    // Post feature
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
        // Click more button on post will open .more-bar element
        const moreBtn = post.querySelector('.more-btn');
        const moreBar = post.querySelector('.more-bar');

        moreBtn.addEventListener('click', () => {
            const newStyles = toggleVisibility(moreBar, 'flex');
            Object.assign(moreBar.style, newStyles);
        });

        // Click anywhere except the moreBtn and moreBar will close it
        document.addEventListener('click', (event) => {
            let isMoreBtnClicked = false;

            // Check if the click target is any of the .more-btn elements
            if (moreBtn.contains(event.target)) {
                isMoreBtnClicked = true;
            }

            // Check if the click target is not within moreBar and not a .more-btn element
            if (!moreBar.contains(event.target) && !isMoreBtnClicked) {
                moreBar.style.display = 'none';
            }
        });

        // Click hide button to close the post
        const hideBtn = post.querySelector('.hide-btn');

        hideBtn.addEventListener('click', () => {
            if (post) {
                post.remove();
            }
        });

        // Clicking the like button
        const likeBtn = post.querySelector('.like-btn');
        const likeIcon = likeBtn.querySelector('.like-icon');
        likeBtn.addEventListener('click', () => {
            const { style, classes, removeClasses } = colorizeIconWithAnimation(likeIcon, '#f87171');
            Object.assign(likeIcon.style, style);
            classes.forEach((cls) => likeIcon.classList.add(cls));
            removeClasses.forEach((cls) => likeIcon.classList.remove(cls));
        });

        // Clicking the comment button
        const commentBtn = post.querySelector('.comment-btn');
        const commentIcon = commentBtn.querySelector('.comment-icon');
        commentBtn.addEventListener('click', () => {
            const { style, classes, removeClasses } = colorizeIconWithAnimation(commentIcon, '#fde68a');
            Object.assign(commentIcon.style, style);
            classes.forEach((cls) => commentIcon.classList.add(cls));
            removeClasses.forEach((cls) => commentIcon.classList.remove(cls));

            const commentContainer = post.querySelector('.comment-container');
            const newStyles = toggleVisibility(commentContainer, 'block');
            Object.assign(commentContainer.style, newStyles);
        });

        // Clicking the share button
        const shareBtn = post.querySelector('.share-btn');
        const shareIcon = shareBtn.querySelector('.share-icon');
        shareBtn.addEventListener('click', () => {
            const { style, classes, removeClasses } = colorizeIconWithAnimation(shareIcon, '#7dd3fc');
            Object.assign(shareIcon.style, style);
            classes.forEach((cls) => shareIcon.classList.add(cls));
            removeClasses.forEach((cls) => shareIcon.classList.remove(cls));
        });
    });

})();

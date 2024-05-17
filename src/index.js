import { closeShadowBackground, openShadowBackground } from './shadowBackground';
import { handleScrollArrow } from './handleScrollArrow';
import { handleLikeButtonClick } from './animation';

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
const postInformation = document.querySelector('.post-information');
let scrollInterval;

handleScrollArrow(scrollInterval, slideContent, nextToggleUp, 3, 6);
handleScrollArrow(scrollInterval, slideContent, nextToggleDown, -3, -6);

// Click location options to add location information into the post
const locationBtns = slideContent.querySelectorAll('.location-btn');

//
const adjustMoodTagPosition = () => {
    const moodTag = document.querySelector('.mood-tag');
    if (moodTag) {
        moodTag.style.marginLeft = '8px'; // 设置 mood tag 的左侧边距为默认值
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
    const moodBarStyle = window.getComputedStyle(moodBar);
    if (moodBarStyle.display === 'none') {
        moodBar.style.display = 'flex';
    } else {
        moodBar.style.display = 'none';
    }
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

// Click more button on post will open .more-bar element
const moreBtns = document.querySelectorAll('.more-btn');
const moreBars = document.querySelectorAll('.more-bar');

const openMoreBar = (moreBtn) => {
    // Retrieve the next sibling element node of the current element
    const moreBar = moreBtn.nextElementSibling;
    const moreBarStyle = window.getComputedStyle(moreBar);

    moreBars.forEach((initialBar) => {
        if (initialBar !== moreBar) {
            const bar = initialBar;
            bar.style.display = 'none';
        }
    });

    if (moreBarStyle.display === 'none') {
        moreBar.style.display = 'flex';
    } else {
        moreBar.style.display = 'none';
    }
};

moreBtns.forEach((moreBtn) => {
    moreBtn.addEventListener('click', () => {
        openMoreBar(moreBtn);
    });
});

// Click anywhere except the moreBtn and moreBar will close it
document.addEventListener('click', (event) => {
    moreBars.forEach((initialMoreBar) => {
        const moreBar = initialMoreBar;
        let isMoreBtnClicked = false;

        // Check if the click target is any of the .more-btn elements
        moreBtns.forEach((moreBtn) => {
            if (moreBtn.contains(event.target)) {
                isMoreBtnClicked = true;
            }
        });

        // Check if the click target is not within moreBar and not a .more-btn element
        if (!moreBar.contains(event.target) && !isMoreBtnClicked) {
            moreBar.style.display = 'none';
        }
    });
});

// Click hide button to close the post
const hideBtns = document.querySelectorAll('.hide-btn');

hideBtns.forEach((hideBtn) => {
    hideBtn.addEventListener('click', () => {
        const post = hideBtn.closest('.post');
        if (post) {
            post.remove();
        }
    });
});

// Clicking the like button will turn it red and make it bounce
const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach((likeBtn) => {
    const likeIcon = likeBtn.querySelector('.like-icon');
    const likeIconStyle = window.getComputedStyle(likeIcon);
    likeBtn.addEventListener('click', handleLikeButtonClick(likeIconStyle, '#f87171', '.like-icon'));
});

// Clicking the comment button will turn it red and make it bounce
const commentBtns = document.querySelectorAll('.comment-btn');

commentBtns.forEach((commentBtn) => {
    const commentIcon = commentBtn.querySelector('.comment-icon');
    const commentIconStyle = window.getComputedStyle(commentIcon);
    commentBtn.addEventListener('click', handleLikeButtonClick(commentIconStyle, '#fde68a', '.comment-icon'));
});

// Clicking the share button will turn it red and make it bounce
const shareBtns = document.querySelectorAll('.share-btn');

shareBtns.forEach((shareBtn) => {
    const shareIcon = shareBtn.querySelector('.share-icon');
    const shareIconStyle = window.getComputedStyle(shareIcon);
    shareBtn.addEventListener('click', handleLikeButtonClick(shareIconStyle, '#7dd3fc', '.share-icon'));
});

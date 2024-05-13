import { someUtils } from './another';

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

                const closeBtn = document.createElement('div');
                closeBtn.classList.add('close-btn', 'absolute', 'bg-gray-300', 'rounded-full', 'text-center', 'cursor-pointer', 'select-none');
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

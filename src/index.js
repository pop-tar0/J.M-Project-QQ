import { someUtils } from './another';

document.body.innerHTML += '';
document.body.innerHTML += someUtils();

// 新增貼文區加入照片
document.querySelector('#chooseImage-btn').addEventListener('click', (event) => {
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

                const closeBtn = document.createElement('div');
                closeBtn.classList.add('close-btn');
                closeBtn.textContent = '✖️';

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                imageContainer.appendChild(img);
                imageContainer.appendChild(closeBtn);

                document.querySelector('#selectedImage').appendChild(imageContainer);

                document.querySelector('#selectedImage').style.marginBottom = '10px';
                document.querySelector('#selectedImage').style.display = 'block';
            }
        }
    }
});

// 取消已選擇的照片

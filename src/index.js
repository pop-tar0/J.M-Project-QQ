import { someUtils } from './another';

document.body.innerHTML += '';
document.body.innerHTML += someUtils();

document.querySelector('#chooseImage-btn').addEventListener('click', (event) => {
    // 取消點擊事件的默認行為
    event.preventDefault();
    // 觸發 input 元素的點擊事件
    document.querySelector('#fileInput').click();
});

// 監聽 input 元素的 change 事件
document.querySelector('#fileInput').addEventListener('change', (event) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
        // 遍歷選擇的文件
        for (let i = 0; i < input.files.length; i += 1) {
            const file = input.files[i];
            // 如果是圖片文件，執行相應操作
            if (file.type.match('image.*')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                document.querySelector('#selectedImage').appendChild(img);
                document.querySelector('#selectedImage').style.marginBottom = '10px';
                document.querySelector('#selectedImage').style.display = 'block';
            }
        }
    }
});

// script.js
document.getElementById('compress-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('image-input');
    const compressionLevel = parseFloat(document.getElementById('compression-level').value);
    const resultSection = document.getElementById('result-section');
    const compressedImage = document.getElementById('compressed-image');
    const downloadLink = document.getElementById('download-link');

    if (fileInput.files.length === 0) {
        alert('Please select an image to compress.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function(blob) {
                const compressedUrl = URL.createObjectURL(blob);
                compressedImage.src = compressedUrl;
                downloadLink.href = compressedUrl;
                resultSection.style.display = 'block';
            }, 'image/jpeg', compressionLevel);
        };
    };

    reader.readAsDataURL(file);
});

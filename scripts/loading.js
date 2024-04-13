function loadingAutoImages(duration, interval = 100) {
    const images = document.querySelectorAll('img[loading="eager"]');
    const totalImages = images.length;
    let loadedImages = 0;
    const loadingBar = document.getElementById('loading-bar');
    const intervalId = setInterval(() => {
        const progress = '='.repeat(loadedImages) + '>' + ' '.repeat(totalImages - loadedImages - 1);
        const percentage = (loadedImages / totalImages) * 100;
        loadingBar.textContent = `Loading images: [${progress}] ${Math.floor(percentage)}%`;
        if (loadedImages === totalImages) {
            clearInterval(intervalId);
            loadingBar.textContent += "\nAll images loaded!";
        }
    }, interval);

    images.forEach((image) => {
        image.onload = () => {
            loadedImages++;
        };
    });
}

function loadingLazyImages(duration, interval = 100) {
    const startTime = Date.now();
    const images = document.querySelectorAll('img[loading="lazy"]');
    const totalImages = images.length;
    let loadedImages = 0;
    const loadingBar = document.getElementById('loading-bar');
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const elapsedSeconds = elapsed / 1000;
        const progress = '='.repeat(Math.min(Math.floor(elapsedSeconds / duration * totalImages), totalImages));
        const percentage = (loadedImages / totalImages) * 100;
        loadingBar.textContent = `Loading images: [${progress}] ${Math.floor(percentage)}%`;
        if (loadedImages === totalImages) {
            clearInterval(intervalId);
            loadingBar.textContent += "\nAll images loaded!";
        }
    }, interval);

    images.forEach((image) => {
        image.onload = () => {
            loadedImages++;
        };
    });
}

function loadingEagerImages(duration, interval = 100) {
    const images = document.querySelectorAll('img[loading="eager"]');
    const totalImages = images.length;
    let loadedImages = 0;
    const loadingBar = document.getElementById('loading-bar');
    const intervalId = setInterval(() => {
        const progress = '='.repeat(loadedImages) + '>' + ' '.repeat(totalImages - loadedImages - 1);
        const percentage = (loadedImages / totalImages) * 100;
        loadingBar.textContent = `Loading images: [${progress}] ${Math.floor(percentage)}%`;
        if (loadedImages === totalImages) {
            clearInterval(intervalId);
            loadingBar.textContent += "\nAll images loaded!";
        }
    }, interval);

    images.forEach((image) => {
        image.onload = () => {
            loadedImages++;
        };
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadingAutoImages(5);
    setTimeout(() => loadingLazyImages(5), 2000); // Задержка lazy loading на 2 секунды после загрузки страницы
    setTimeout(() => loadingEagerImages(5), 4000); // Задержка eager loading на 4 секунды после загрузки страницы
});

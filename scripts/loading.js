// Функция загрузки изображений с атрибутом loading="auto"
function loadingAutoImages(duration, interval = 100) {
    const images = document.querySelectorAll('img[loading="auto"]');
    loadImages(images, duration, interval);
}

// Функция загрузки изображений с атрибутом loading="eager"
function loadingAutoImages(duration, interval = 100) {
    const images = document.querySelectorAll('img[loading="eager"]');
    loadImages(images, duration, interval);
}

// Функция загрузки изображений с атрибутом loading="lazy"
function loadingLazyImages(duration, interval = 100) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    loadImages(images, duration, interval);
}

// Вспомогательная функция для загрузки изображений
function loadImages(images, duration, interval) {
    const totalImages = images.length;
    let loadedImages = 0;

    // Функция обновления прогресса загрузки
    function updateProgress() {
        const progress = '='.repeat(loadedImages) + '>' + ' '.repeat(totalImages - loadedImages - 1);
        const percentage = (loadedImages / totalImages) * 100;
        console.log(`Loading images: [${progress}] ${Math.floor(percentage)}%`);
        if (loadedImages === totalImages) {
            console.log("All images loaded!");
        }
    }

    // Отслеживание загрузки каждого изображения
    images.forEach((image) => {
        image.onload = () => {
            loadedImages++;
            updateProgress();
        };
    });

    // Запуск таймера для симуляции продолжительности загрузки
    setTimeout(() => {
        // Здесь вы можете дополнительно отслеживать загрузку изображений во времени, если нужно
    }, duration * 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    // Запуск загрузки изображений при загрузке страницы
    loadingAutoImages(5);
    setTimeout(() => loadingLazyImages(5), 2000); // Задержка загрузки lazy loading на 2 секунды после загрузки страницы
});

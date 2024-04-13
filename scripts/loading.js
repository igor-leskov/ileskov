// Функция для загрузки изображения
function loadImage(imageUrl) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.src = imageUrl;
        img.onload = function() {
            resolve(img);
        };
        img.onerror = function() {
            reject(new Error('Ошибка загрузки изображения: ' + imageUrl));
        };
    });
}

// Функция для стремительной загрузки изображений
function eagerLoadImages(imageUrls) {
    return Promise.all(imageUrls.map(function(imageUrl) {
        return loadImage(imageUrl);
    }));
}

// Функция для автоматической загрузки изображений
function autoLoadImages(imageUrls) {
    return Promise.all(imageUrls.map(function(imageUrl) {
        if (imageInViewport(imageUrl)) {
            return loadImage(imageUrl);
        }
    }));
}

// Функция для отложенной загрузки изображений
function lazyLoadImages(imageUrls) {
    return Promise.all(imageUrls.map(function(imageUrl) {
        return loadImageLazy(imageUrl);
    }));
}

// Функция для определения, видимо ли изображение во viewport
function imageInViewport(imageUrl) {
    // Реализация проверки видимости изображения во viewport
    // Ваш код здесь
}

// Автоматическое обнаружение и загрузка изображений с атрибутом loading
function processImagesWithLoadingAttribute() {
    var imagesWithLoadingAttribute = document.querySelectorAll('img[loading]');
    var imageUrls = [];
    imagesWithLoadingAttribute.forEach(function(img) {
        imageUrls.push(img.src);
    });
    
    // Определение метода загрузки
    var loadMethod;
    switch (document.loading) {
        case 'eager':
            loadMethod = eagerLoadImages;
            break;
        case 'auto':
            loadMethod = autoLoadImages;
            break;
        case 'lazy':
        default:
            loadMethod = lazyLoadImages;
    }

    // Загрузка изображений с использованием выбранного метода
    loadMethod(imageUrls).then(function(images) {
        // Обработка успешной загрузки изображений
        console.log('Изображения успешно загружены:', images);
    }).catch(function(error) {
        // Обработка ошибок загрузки изображений
        console.error('Ошибка загрузки изображений:', error);
    });
}

// Автоматическое обнаружение изображений с атрибутом loading при загрузке страницы
window.onload = function() {
    processImagesWithLoadingAttribute();
};


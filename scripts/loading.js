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

function eagerLoadImages(imageUrls) {
    return Promise.all(imageUrls.map(function(imageUrl) {
        return loadImage(imageUrl);
    }));
}

function autoLoadImages(imageUrls) {
    return Promise.all(imageUrls.map(function(imageUrl) {
        if (imageInViewport(imageUrl)) {
            return loadImage(imageUrl);
        }
    }));
}

function lazyLoadImages(imageUrls) {
    return Promise.all(imageUrls.map(function(imageUrl) {
        return loadImage(imageUrl); 
    }));
}

function imageInViewport(imageUrl) {
    var image = document.querySelector('img[src="' + imageUrl + '"]');
    if (!image) {
        return false; 
    }

    var imageRect = image.getBoundingClientRect();
    var imageTop = imageRect.top;
    var imageBottom = imageRect.bottom;

    var viewportTop = 0;
    var viewportBottom = window.innerHeight || document.documentElement.clientHeight;

    return (imageTop < viewportBottom) && (imageBottom > viewportTop);
}

function processImagesWithLoadingAttribute() {
    var imagesWithLoadingAttribute = document.querySelectorAll('img[loading]');
    var imageUrls = [];
    imagesWithLoadingAttribute.forEach(function(img) {
        imageUrls.push(img.src);
    });
    
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

    loadMethod(imageUrls).then(function(images) {

        console.log('Изображения успешно загружены:', images);
    }).catch(function(error) {

        console.error('Ошибка загрузки изображений:', error);
    });
}

window.onload = function() {
    processImagesWithLoadingAttribute();
};


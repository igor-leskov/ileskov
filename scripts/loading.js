function eagerLoadImages(imageUrls) {
    var images = [];
    for (var i = 0; i < imageUrls.length; i++) {
        images.push(loadImage(imageUrls[i]));
    }
    return images;
}

function autoLoadImages(imageUrls) {
    var images = [];
    for (var i = 0; i < imageUrls.length; i++) {
        if (imageInViewport(imageUrls[i])) {
            images.push(loadImage(imageUrls[i]));
        }
    }
    return images;
}

function lazyLoadImages(imageUrls) {
    var images = [];
    for (var i = 0; i < imageUrls.length; i++) {
        images.push(loadImageLazy(imageUrls[i]));
    }
    return images;
}

var imageUrls = [...]; 

var eagerLoadedImages = eagerLoadImages(imageUrls);

var autoLoadedImages = autoLoadImages(imageUrls);

var lazyLoadedImages = lazyLoadImages(imageUrls);

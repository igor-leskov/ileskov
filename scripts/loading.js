def eager_load_images(image_urls):
    images = []
    for image_url in image_urls:
        images.append(load_image(image_url))
    return images

def auto_load_images(image_urls):
    images = []
    for image_url in image_urls:
        if image_in_viewport(image_url):
            images.append(load_image(image_url))
    return images

def lazy_load_images(image_urls):
    images = []
    for image_url in image_urls:
        images.append(load_image_lazy(image_url))
    return images

image_urls = [...]  

eager_loaded_images = eager_load_images(image_urls)

auto_loaded_images = auto_load_images(image_urls)

lazy_loaded_images = lazy_load_images(image_urls)

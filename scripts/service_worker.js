const CACHE_NAME = 'ileskov_cache';
const urlsToCache = [
  '/styles/header_footer.css',
  '/scripts/like.js',
  '/images/logo.webp',
  '/video/video1.mp4',
  '/video/video2.mp4',
  '/video/video3.mp4',
  '/video/video4.mp4',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Кеширование файлов');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

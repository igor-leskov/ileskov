document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video');
    var playButtons = document.querySelectorAll('.play-button');
    var activeMedia = null;  // Текущий активный медиа-объект

    // Обработчики для видео
    videos.forEach(function(video) {
        video.addEventListener('loadeddata', function() {
            var videoKey = video.dataset.key; 
            var savedTime = localStorage.getItem(videoKey); 
            if (savedTime) {
                video.currentTime = parseFloat(savedTime);
            }
        });

        video.addEventListener('play', function(event) {
            var currentVideo = event.target;

            // Пауза всех других видео
            videos.forEach(function(v) {
                if (v !== currentVideo) {
                    v.pause();
                }
            });

            // Пауза активного аудио, если есть
            if (activeMedia && activeMedia.tagName.toLowerCase() === 'audio') {
                activeMedia.pause();
            }
        });

        video.addEventListener('pause', function() {
            var videoKey = video.dataset.key; 
            localStorage.setItem(videoKey, video.currentTime); 
        });

        video.addEventListener('ended', function() {
            var videoKey = video.dataset.key;
            localStorage.removeItem(videoKey);
        });
    });

    // Обработчики для кнопок воспроизведения аудио
    playButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var audioSrc = button.getAttribute('data-src');

            if (!button.audio) {
                button.audio = new Audio(audioSrc);
            }

            if (!button.classList.contains('playing')) {
                // Пауза всех видео
                videos.forEach(function(video) {
                    video.pause();
                });

                // Воспроизведение нового аудио
                button.audio.play();
                button.classList.add('playing');

                // Пауза активного видео, если есть
                videos.forEach(function(video) {
                    if (!video.paused) {
                        video.pause();
                    }
                });

                activeMedia = button.audio;
            } else {
                // Пауза аудио
                button.audio.pause();
                button.classList.remove('playing');
                activeMedia = null;
            }
        });
    });
});

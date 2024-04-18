document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video');

    videos.forEach(function(video) {
       
        video.addEventListener('loadeddata', function() {
            var savedTime = localStorage.getItem(video.src);
            if (savedTime) {
                video.currentTime = parseFloat(savedTime);
            }
        });

        video.addEventListener('play', function(event) {
            var currentVideo = event.target;

            // Пауза другим видео
            videos.forEach(function(v) {
                if (v !== currentVideo) {
                    v.pause();
                }
            });
        });

        video.addEventListener('pause', function() {
           
            localStorage.setItem(video.src, video.currentTime);
        });

        video.addEventListener('ended', function() {
           
            localStorage.removeItem(video.src);
        });
    });
});

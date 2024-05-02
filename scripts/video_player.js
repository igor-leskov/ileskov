document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video');
    var audios = document.querySelectorAll('.audio');

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

            
            videos.forEach(function(v) {
                if (v !== currentVideo) {
                    v.pause();
                }
            });

          
            audios.forEach(function(audio) {
                audio.pause();
            });
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

   
    audios.forEach(function(audio) {
        audio.addEventListener('play', function() {
           
            videos.forEach(function(video) {
                video.pause();
            });
        });
    });
});


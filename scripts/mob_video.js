document.addEventListener('DOMContentLoaded', function() {
        var videos = document.querySelectorAll('.video');

        videos.forEach(function(video) {
            video.addEventListener('play', function(event) {
                var currentVideo = event.target;

                videos.forEach(function(v) {
                    if (v !== currentVideo) {
                        v.pause();
                    }
                });
            });
        });
    });
document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video');
    var playButtons = document.querySelectorAll('.play-button');
    var activeAudio = null; 

    videos.forEach(function(video) {
        video.addEventListener('play', function() {
            if (activeAudio) {
                activeAudio.pause();
            }
            videos.forEach(function(v) {
                if (v !== video) {
                    v.pause();
                }
            });
        });
    });

    playButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var audioSrc = button.getAttribute('data-src');

            if (!button.audio) {
                button.audio = new Audio(audioSrc);
                button.audio.addEventListener('ended', function() {
                    button.classList.remove('playing');
                    button.innerHTML = '&#9658;';
                });
            }

            if (!button.classList.contains('playing')) {
                if (activeAudio) {
                    activeAudio.pause();
                    document.querySelector('.playing').classList.remove('playing');
                    document.querySelector('.playing').innerHTML = '&#9658;';
                }
                button.audio.play();
                button.classList.add('playing');
                button.innerHTML = '&#10074;&#10074;';
                activeAudio = button.audio;
            } else {
                button.audio.pause();
                button.classList.remove('playing');
                button.innerHTML = '&#9658;';
                if (activeAudio === button.audio) {
                    activeAudio = null;
                }
            }

            videos.forEach(function(video) {
                video.pause();
            });
        });
    });
});

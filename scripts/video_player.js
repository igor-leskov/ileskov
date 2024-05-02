document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video');
    var playButtons = document.querySelectorAll('.play-button');

    videos.forEach(function(video) {
   
    });

    playButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var audioSrc = button.getAttribute('data-src');
            var audio = new Audio(audioSrc);
            var isPlaying = button.classList.contains('playing');

            if (!isPlaying) {
                
                stopAllMedia();
                audio.play();
                button.classList.add('playing');
                button.innerHTML = '&#10074;&#10074;'; 
            } else {
                audio.pause();
                button.classList.remove('playing');
                button.innerHTML = '&#9658;'; 
            }

            button.audio = audio;
        });
    });

    function stopAllMedia() {
        // Остановка всех аудио
        playButtons.forEach(function(btn) {
            if (btn.audio && btn.classList.contains('playing')) {
                btn.audio.pause();
                btn.classList.remove('playing');
                btn.innerHTML = '&#9658;';
            }
        });

        videos.forEach(function(video) {
            video.pause();
        });
    }
});



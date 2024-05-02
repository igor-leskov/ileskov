document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video');
    var musicItems = document.querySelectorAll(".music-item");
    var currentVideo = null;
    var currentAudioPlayer = null;

    videos.forEach(function(video) {
        video.addEventListener('loadeddata', function() {
            var videoKey = video.dataset.key; 
            var savedTime = localStorage.getItem(videoKey); 
            if (savedTime) {
                video.currentTime = parseFloat(savedTime);
            }
        });

        video.addEventListener('play', function(event) {
            currentVideo = event.target;

            videos.forEach(function(v) {
                if (v !== currentVideo) {
                    v.pause();
                }
            });

            if (currentAudioPlayer && !currentAudioPlayer.paused) {
                currentAudioPlayer.pause();
                var playButtonPrev = document.querySelector(".playing");
                if (playButtonPrev) {
                    playButtonPrev.innerHTML = "&#9658;";
                    playButtonPrev.classList.remove("playing");
                }
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

    musicItems.forEach(function(item, index) {
        var playButton = item.querySelector(".play-button");
        var audioSrc = playButton.dataset.src;
        var audioPlayer = new Audio(audioSrc);
        var seekBar = item.querySelector(".seek-bar");

        audioPlayer.addEventListener("loadeddata", function() {
            var savedTime = localStorage.getItem(audioSrc);
            if (savedTime) {
                audioPlayer.currentTime = parseFloat(savedTime);
                seekBar.value = parseFloat(savedTime);
            }
        });

        playButton.addEventListener("click", function() {
            if (currentAudioPlayer && currentAudioPlayer !== audioPlayer) {
                currentAudioPlayer.pause();
                var playButtonPrev = document.querySelector(".playing");
                if (playButtonPrev) {
                    playButtonPrev.innerHTML = "&#9658;";
                    playButtonPrev.classList.remove("playing");
                }
            }

            currentAudioPlayer = audioPlayer;
            if (audioPlayer.paused) {
                audioPlayer.play();
                playButton.innerHTML = "&#10074;&#10074;";
                playButton.classList.add("playing");

                if (currentVideo && !currentVideo.paused) {
                    currentVideo.pause();
                }
            } else {
                audioPlayer.pause();
                localStorage.setItem(audioSrc, audioPlayer.currentTime);
                playButton.innerHTML = "&#9658;";
                playButton.classList.remove("playing");
            }
        });

        audioPlayer.addEventListener("ended", function() {
            playButton.innerHTML = "&#9658;";
            seekBar.value = 0;
            localStorage.removeItem(audioSrc); 
            if (index < musicItems.length - 1) {
                var nextButton = musicItems[index + 1].querySelector(".play-button");
                nextButton.click();
            }
        });

        audioPlayer.addEventListener("timeupdate", function() {
            seekBar.value = audioPlayer.currentTime;
        });

        seekBar.addEventListener("change", function() {
            audioPlayer.currentTime = seekBar.value;
            localStorage.setItem(audioSrc, seekBar.value); 
        });

        audioPlayer.addEventListener('play', function() {
            if (currentVideo && !currentVideo.paused) {
                currentVideo.pause();
            }
        });
    });

    musicItems.forEach(function(item) {
        var playButton = item.querySelector(".play-button");

        playButton.addEventListener("click", function() {
            if (currentVideo) {
                currentVideo.pause();
            }
        });
    });
});

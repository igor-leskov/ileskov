document.addEventListener("DOMContentLoaded", function() {
    var currentAudioPlayer = null;
    var musicItems = document.querySelectorAll(".music-item");
    var videos = document.querySelectorAll('.video');

    musicItems.forEach(function(item, index) {
        var playButton = item.querySelector(".play-button");
        var audioSrc = playButton.dataset.src;
        var audioPlayer = new Audio(audioSrc);
        var seekBar = item.querySelector(".seek-bar");
        var playIcon = playButton.querySelector(".play-icon");
        var pauseIcon = playButton.querySelector(".pause-icon");

        (function(player, button, iconPlay, iconPause) {
            playButton.addEventListener("click", function() {
                if (currentAudioPlayer && currentAudioPlayer !== player) {
                    currentAudioPlayer.pause();
                    localStorage.setItem(currentAudioPlayer.src, currentAudioPlayer.currentTime); 
                    var playButtonPrev = document.querySelector(".playing");
                    if (playButtonPrev) {
                        playButtonPrev.querySelector(".pause-icon").style.display = 'none';
                        playButtonPrev.querySelector(".play-icon").style.display = 'block';
                        playButtonPrev.classList.remove("playing");
                    }
                }

                currentAudioPlayer = player;
                if (player.paused) {
                    player.play();
                    iconPlay.style.display = 'none';
                    iconPause.style.display = 'block';
                    button.classList.add("playing");
                } else {
                    player.pause();
                    localStorage.setItem(audioSrc, player.currentTime); 
                    iconPlay.style.display = 'block';
                    iconPause.style.display = 'none';
                    button.classList.remove("playing");
                }
            });

            player.addEventListener("pause", function() {
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
                button.classList.remove("playing");
            });

            player.addEventListener("play", function() {
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
                button.classList.add("playing");
            });
        })(audioPlayer, playButton, playIcon, pauseIcon);

        audioPlayer.addEventListener("loadeddata", function() {
            var savedTime = localStorage.getItem(audioSrc);
            if (savedTime) {
                audioPlayer.currentTime = parseFloat(savedTime);
                seekBar.value = (parseFloat(savedTime) / audioPlayer.duration) * 100;
            }
        });

        audioPlayer.addEventListener("ended", function() {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            seekBar.value = 0;
            localStorage.removeItem(audioSrc); 
            if (index < musicItems.length - 1) {
                var playButtonPrev = musicItems[index].querySelector(".playing");
                if (playButtonPrev) {
                    playButtonPrev.querySelector(".pause-icon").style.display = 'none';
                    playButtonPrev.querySelector(".play-icon").style.display = 'block';
                    playButtonPrev.classList.remove("playing");
                }
                setTimeout(function() {
                    var nextButton = musicItems[index + 1].querySelector(".play-button");
                    nextButton.click();
                }, 100);
            }
        });

        audioPlayer.addEventListener("timeupdate", function() {
            if (!isNaN(audioPlayer.duration)) {
                seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            }
        });

        seekBar.addEventListener("input", function() {
            audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
            localStorage.setItem(audioSrc, audioPlayer.currentTime); 
        });
    });

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

            if (currentAudioPlayer) {
                currentAudioPlayer.pause();
                var playButton = document.querySelector(".playing");
                if (playButton) {
                    playButton.querySelector(".pause-icon").style.display = 'none';
                    playButton.querySelector(".play-icon").style.display = 'block';
                    playButton.classList.remove("playing");
                }
                currentAudioPlayer = null;
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
});


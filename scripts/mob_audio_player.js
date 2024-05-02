document.addEventListener("DOMContentLoaded", function() {
    var currentAudioPlayer = null;
    var musicItems = document.querySelectorAll(".music-item");

    musicItems.forEach(function(item, index) {
        var playButton = item.querySelector(".play-button");
        var audioSrc = playButton.dataset.src;
        var audioPlayer = new Audio(audioSrc);
        var seekBar = item.querySelector(".seek-bar");
        var playIcon = playButton.querySelector(".play-icon");
        var pauseIcon = playButton.querySelector(".pause-icon");

        // Восстановление сохраненной позиции при загрузке аудио
        audioPlayer.addEventListener("loadeddata", function() {
            var savedTime = localStorage.getItem(audioSrc);
            if (savedTime) {
                audioPlayer.currentTime = parseFloat(savedTime);
                seekBar.value = (parseFloat(savedTime) / audioPlayer.duration) * 100;
            }
        });

        playButton.addEventListener("click", function() {
            if (currentAudioPlayer && currentAudioPlayer !== audioPlayer) {
                currentAudioPlayer.pause();
                localStorage.setItem(currentAudioPlayer.src, currentAudioPlayer.currentTime); 
                var playButtonPrev = document.querySelector(".playing");
                if (playButtonPrev) {
                    playButtonPrev.querySelector(".pause-icon").style.display = 'none';
                    playButtonPrev.querySelector(".play-icon").style.display = 'block';
                    playButtonPrev.classList.remove("playing");
                }
            }

            currentAudioPlayer = audioPlayer;
            if (audioPlayer.paused) {
                audioPlayer.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                playButton.classList.add("playing");
            } else {
                audioPlayer.pause();
                localStorage.setItem(audioSrc, audioPlayer.currentTime); 
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                playButton.classList.remove("playing");
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
        var nextButton = musicItems[index + 1].querySelector(".play-button");
        nextButton.click();
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
});


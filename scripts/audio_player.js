document.addEventListener("DOMContentLoaded", function() {
    var currentAudioPlayer = null;
    var musicItems = document.querySelectorAll(".music-item");
    var lastPlayedIndex = localStorage.getItem("lastPlayedIndex");

    musicItems.forEach(function(item, index) {
        var playButton = item.querySelector(".play-button");
        var audioSrc = playButton.dataset.src;
        var audioPlayer = new Audio(audioSrc);
        var seekBar = item.querySelector(".seek-bar");
        var playIcon = playButton.querySelector(".play-icon");
        var pauseIcon = playButton.querySelector(".pause-icon");

        var storedTime = localStorage.getItem("audioTime" + index);
        if (storedTime) {
            audioPlayer.currentTime = parseFloat(storedTime);
        }

        playButton.addEventListener("click", function() {
            if (currentAudioPlayer && currentAudioPlayer !== audioPlayer) {
                currentAudioPlayer.pause();
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
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                playButton.classList.remove("playing");
            }
        });

        audioPlayer.addEventListener("ended", function() {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            seekBar.value = 0;
            if (index < musicItems.length - 1) {
                var nextButton = musicItems[index + 1].querySelector(".play-button");
                nextButton.click();
            } else {
                localStorage.setItem("lastPlayedIndex", index);
            }
        });

        audioPlayer.addEventListener("timeupdate", function() {
            seekBar.value = audioPlayer.currentTime;
            localStorage.setItem("audioTime" + index, audioPlayer.currentTime);
        });

        seekBar.addEventListener("change", function() {
            audioPlayer.currentTime = seekBar.value;
        });
    });
});

var currentAudioPlayer = null;

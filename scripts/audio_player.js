document.addEventListener("DOMContentLoaded", function() {
    var musicItems = document.querySelectorAll(".music-item");

    musicItems.forEach(function(item, index) {
        var playButton = item.querySelector(".play-button");
        var audioSrc = playButton.dataset.src;
        var audioPlayer = new Audio(audioSrc);
        var seekBar = item.querySelector(".seek-bar");

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
            } else {
                audioPlayer.pause();
                playButton.innerHTML = "&#9658;";
                playButton.classList.remove("playing");
            }
        });

        audioPlayer.addEventListener("ended", function() {
            playButton.innerHTML = "&#9658;";
            seekBar.value = 0;
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
        });
    });
});

var currentAudioPlayer = null;
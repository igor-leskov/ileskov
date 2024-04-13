function loadingAuto(duration, interval = 100) {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;  // Преобразуем секунды в миллисекунды
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const progressTime = currentTime - startTime;
        const progressWidth = Math.floor((progressTime / (duration * 1000)) * 50);
        const progressPercentage = Math.floor((progressTime / (duration * 1000)) * 100);
        const progressBar = '='.repeat(progressWidth);

        process.stdout.write(`\rLoading: [${progressBar}] ${progressPercentage}%`);
        if (currentTime >= endTime) {
            clearInterval(intervalId);
            console.log('\nLoading complete!');
        }
    }, interval);
}

loadingAuto(5);

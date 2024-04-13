function loadingLazy(duration, interval = 100) {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const elapsedSeconds = elapsed / 1000;
        const progress = Math.floor(elapsedSeconds / duration * 50);
        const progressBar = '='.repeat(progress) + ' '.repeat(50 - progress);
        const percentComplete = Math.floor(elapsedSeconds / duration * 100);
        process.stdout.write(`\rLoading: [${progressBar}] ${percentComplete}%`);
        if (elapsedSeconds >= duration) {
            clearInterval(intervalId);
            console.log("\nLoading complete!");
        }
    }, interval);
}

loadingLazy(5);

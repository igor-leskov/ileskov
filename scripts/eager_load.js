function loadingEager(duration, interval = 100) {
    const totalTicks = Math.floor(duration * 1000 / interval);
    let tick = 0;
    const intervalId = setInterval(() => {
        const progress = '='.repeat(tick) + '>' + ' '.repeat(totalTicks - tick - 1);
        const percentage = ((tick + 1) / totalTicks) * 100;
        process.stdout.write(`\rLoading: [${progress}] ${Math.floor(percentage)}%`);
        tick++;
        if (tick === totalTicks) {
            clearInterval(intervalId);
            console.log("\nLoading complete!");
        }
    }, interval);
}

loadingEager(5);

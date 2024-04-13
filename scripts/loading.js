function loadingAuto(duration, interval = 100) {
    const totalTicks = Math.floor(duration * 1000 / interval);
    let tick = 0;
    const loadingBar = document.getElementById('loading-bar');
    const intervalId = setInterval(() => {
        const progress = '='.repeat(tick) + '>' + ' '.repeat(totalTicks - tick - 1);
        const percentage = ((tick + 1) / totalTicks) * 100;
        loadingBar.textContent = `Loading: [${progress}] ${Math.floor(percentage)}%`;
        tick++;
        if (tick === totalTicks) {
            clearInterval(intervalId);
            loadingBar.textContent += "\nLoading complete!";
        }
    }, interval);
}

function loadingLazy(duration, interval = 100) {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const elapsedSeconds = elapsed / 1000;
        const progress = '='.repeat(Math.min(Math.floor(elapsedSeconds / duration * 50), 50));
        const percentage = (elapsedSeconds / duration) * 100;
        loadingBar.textContent = `Loading: [${progress}] ${Math.floor(percentage)}%`;
        if (elapsedSeconds >= duration) {
            clearInterval(intervalId);
            loadingBar.textContent += "\nLoading complete!";
        }
    }, interval);
}

function loadingEager(duration, interval = 100) {
    const totalTicks = Math.floor(duration * 1000 / interval);
    let tick = 0;
    const loadingBar = document.getElementById('loading-bar');
    const intervalId = setInterval(() => {
        const progress = '='.repeat(tick) + '>' + ' '.repeat(totalTicks - tick - 1);
        const percentage = ((tick + 1) / totalTicks) * 100;
        loadingBar.textContent = `Loading: [${progress}] ${Math.floor(percentage)}%`;
        tick++;
        if (tick === totalTicks) {
            clearInterval(intervalId);
            loadingBar.textContent += "\nLoading complete!";
        }
    }, interval);
}

document.addEventListener('DOMContentLoaded', function () {
    loadingAuto(5);
    setTimeout(() => loadingLazy(5), 2000); // Задержка запуска lazy loading на 2 секунды после загрузки страницы
    setTimeout(() => loadingEager(5), 4000); // Задержка запуска eager loading на 4 секунды после загрузки страницы
});

function checkNetworkLoad(url, dataTransferred) {
    var threshold = 50000;
    var totalDataTransferred = dataTransferred.reduce(function(a, b) { return a + b; }, 0);

    if (totalDataTransferred > threshold) {
        return "Предотвратите чрезмерную нагрузку на сеть. Общий размер достиг " + totalDataTransferred + " КиБ.";
    } else {
        return "Общий объем переданных данных находится в пределах допустимого значения.";
    }
}

var url = "https://ileskov.ee/";
var dataTransferred = [
    17124.6,  // Общий объем КиБ
    2224.9,   // /audio/Sijaem.mp3
    2212.3,   // /audio/Sijaem(Remix).mp3
    1846.2,   // /audio/Poslushaimenja.mp3
    1807.7,   // /audio/Ktebe.mp3
    1611.7,   // /audio/DevochkaOi.mp3
    1547.5,   // /audio/Nabiraju.mp3
    1530.1,   // /audio/Darts.mp3
    1492.4,   // /audio/Raditebja.mp3
    1453.7,   // /audio/Jaopjatuletaju.mp3
    1398.1    // /audio/Mnetebjanezabut.mp3
];

console.log(checkNetworkLoad(url, dataTransferred));

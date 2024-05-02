function checkNetworkLoad(url, dataTransferred) {
    var threshold = 50000;
    var totalDataTransferred = dataTransferred.reduce(function(a, b) { return a + b; }, 0);

    if (totalDataTransferred > threshold) {
        return "Предотвратите чрезмерную нагрузку на сеть. Общий размер достиг " + totalDataTransferred + " КиБ.";
    } else {
        return "Общий объем переданных данных находится в пределах допустимого значения.";
    }
}

console.log(checkNetworkLoad(url, dataTransferred));

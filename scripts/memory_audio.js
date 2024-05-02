function checkNetworkLoad(url, dataTransferred) {
    if (typeof url !== 'string' || !Array.isArray(dataTransferred) || dataTransferred.some(isNaN)) {
        return "Неверные входные данные. Пожалуйста, убедитесь, что URL является строкой, а dataTransferred - массивом чисел.";
    }

    if (dataTransferred.length === 0) {
        return "Массив переданных данных пуст.";
    }

    var threshold = 50000;
    var totalDataTransferred = dataTransferred.reduce(function(a, b) { return a + b; }, 0);

    if (totalDataTransferred > threshold) {
        return "Предотвратите чрезмерную нагрузку на сеть. Общий размер достиг " + totalDataTransferred + " КиБ.";
    } else {
        return "Общий объем переданных данных находится в пределах допустимого значения.";
    }
}

console.log(checkNetworkLoad(url, dataTransferred));

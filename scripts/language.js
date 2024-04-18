function redirectToHome() {
            window.location.href = "index.html";
        }

        // Функция для определения языка браузера
        function getBrowserLanguage() {
            return navigator.language || navigator.userLanguage;
        }

        // Определяем язык браузера и перенаправляем на соответствующую страницу 404
        document.addEventListener("DOMContentLoaded", function() {
            const browserLanguage = getBrowserLanguage();
            let redirectPage;
            const errorMessage = document.getElementById('errorMessage'); // Объявляем переменную здесь

            if (browserLanguage.startsWith('et')) {
                redirectPage = "404_et.html";
                errorMessage.innerText = "Lehekülge ei leitud";
            } else {
                redirectPage = "404.html";
                errorMessage.innerText = "Страница не найдена";
            }

            // Перенаправление на выбранную страницу
            setTimeout(function() {
                window.location.href = redirectPage;
            }, 3000); // 3 секунды задержки перед перенаправлением
        });

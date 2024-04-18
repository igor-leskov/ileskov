function redirectToHome() {
            window.location.href = "index.html";
        }

        // Функция для определения языка браузера
        function getBrowserLanguage() {
            return navigator.language || navigator.userLanguage;
        }

        // Функция для установки текста сообщения об ошибке
        function setErrorMessage() {
            const browserLanguage = getBrowserLanguage();
            let errorMessage = document.getElementById('errorMessage');

            if (errorMessage) {
                if (browserLanguage.startsWith('et')) {
                    errorMessage.innerText = "Lehekülge ei leitud";
                } else {
                    errorMessage.innerText = "Страница не найдена";
                }
            } else {
                console.error("Элемент с id 'errorMessage' не найден.");
            }
        }

        // Вызываем функцию после полной загрузки DOM
        document.addEventListener("DOMContentLoaded", function() {
            setErrorMessage();

            // Перенаправляем на главную страницу через 3 секунды
            setTimeout(function() {
                redirectToHome();
            }, 3000);
        });

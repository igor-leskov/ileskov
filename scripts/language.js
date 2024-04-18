function redirectToHome() {
            window.location.href = "index.html";
        }

        function getBrowserLanguage() {
            return navigator.language || navigator.userLanguage;
        }

        const browserLanguage = getBrowserLanguage();
        let redirectPage;
        const errorMessage = document.getElementById('errorMessage'); 

        if (browserLanguage.startsWith('et')) {
            redirectPage = "404_et.html";
            errorMessage.innerText = "Lehekülge ei leitud";
        } else {
            redirectPage = "404.html";
            errorMessage.innerText = "Страница не найдена";
        }

        setTimeout(function() {
            window.location.href = redirectPage;
        }, 3000); 

// Обработчик клика на кнопку лайка
function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;

    // Обновление общего количества лайков в localStorage
    updateTotalLikes(1); // Увеличиваем на 1 при каждом новом лайке

    // Обновление показателя лайков для этой новости
    const newsItem = button.closest('.news-item');
    const newsLikesCount = newsItem.querySelector('.total-likes-news');
    newsLikesCount.textContent = count;
}

// Добавляем обработчики событий
window.addEventListener('load', function() {
    // Обновляем общее количество лайков при загрузке страницы
    updateTotalLikesOnLoad();

    const newsFeed = document.querySelector('.news-feed');
    if (newsFeed) {
        newsFeed.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('like-button') || target.closest('.like-button')) {
                const button = target.closest('.like-button');
                if (!button.dataset.likes) {
                    updateLikeCount(button);
                    saveLikesToLocalStorage(button);
                }
            }
        });
    }

    // Показать панель cookie, если пользователь еще не согласился
    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }

    fixCookieConsentBarPosition();

    // Обработчик клика на кнопку согласия с использованием файлов cookie
    const acceptButton = document.getElementById("accept-cookies-button");
    if (acceptButton) {
        acceptButton.addEventListener("click", function() {
            // Сохраняем согласие пользователя в cookie
            acceptCookies();
            // Скрываем панель cookie
            var consentBar = document.getElementById("cookie-consent-bar");
            if (consentBar) {
                consentBar.style.display = "none";
            }
        });
    }

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const buttonId = button.dataset.id;
        const likesLocalStorage = localStorage.getItem(`likes_${buttonId}`);
        if (likesLocalStorage) {
            button.dataset.likes = likesLocalStorage;
            button.querySelector('.like-count').textContent = likesLocalStorage;
            // Устанавливаем показатель лайков для каждой новости
            const newsItem = button.closest('.news-item');
            const newsLikesCount = newsItem.querySelector('.total-likes-news');
            newsLikesCount.textContent = likesLocalStorage;
        }
    });

    // Обновление общего количества лайков при загрузке страницы
    const totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    // Показать общее количество лайков на странице
    document.querySelector('.total-likes').textContent = totalLikes;
});


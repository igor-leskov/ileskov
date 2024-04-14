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

// Функция для обновления общего количества лайков в localStorage
function updateTotalLikes(count) {
    let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    totalLikes += count; // Используйте переданное количество, а не просто увеличивайте на 1
    localStorage.setItem('totalLikes', totalLikes);
}

// Обработчик клика на кнопку лайка
function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;

    // Обновление общего количества лайков в localStorage
    updateTotalLikes(1); // Увеличиваем на 1 при каждом новом лайке

    // Показать общее количество лайков на странице
    document.querySelector('.total-likes').textContent = parseInt(localStorage.getItem('totalLikes')) || 0;
}

// Функция для обновления общего количества лайков при загрузке страницы
function updateTotalLikesOnLoad() {
    const likeButtons = document.querySelectorAll('.like-button');
    let totalLikes = 0;
    likeButtons.forEach(button => {
        const likes = parseInt(button.dataset.likes) || 0;
        totalLikes += likes;
    });
    // Показать общее количество лайков на странице
    document.querySelector('.total-likes').textContent = totalLikes;
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

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function saveLikesToLocalStorage(button) {
    const consentAccepted = getCookie("cookieconsent");
    if (consentAccepted) {
        const buttonId = button.dataset.id;
        const count = button.dataset.likes || 0;
        localStorage.setItem(`likes_${buttonId}`, count);
    }
}

function acceptCookies() {
    setCookie("cookieconsent", "accepted", 30);
    var consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar) {
        consentBar.style.display = "none";
    }
}

function fixCookieConsentBarPosition() {
    var consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar) {
        consentBar.style.position = "fixed";
    }
}

function redirectToPrivacyPolicyRu() {
    var policyPage = "privacy_policy.html";
    window.location.href = policyPage;
}

function redirectToPrivacyPolicyEt() {
    var policyPage = "privacy_policy_et.html";
    window.location.href = policyPage;
}

window.addEventListener('load', function() {

    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }

    fixCookieConsentBarPosition();

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const buttonId = button.dataset.id;
        const likesLocalStorage = localStorage.getItem(`likes_${buttonId}`);
        if (likesLocalStorage) {
            button.dataset.likes = likesLocalStorage;
            button.querySelector('.like-count').textContent = likesLocalStorage;
        }
    });

    // Обновление общего количества лайков при загрузке страницы
    const totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;
    // Показать общее количество лайков на странице
    document.querySelector('.total-likes').textContent = totalLikes;
});


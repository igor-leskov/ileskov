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

function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;
}

function saveLikesToLocalStorage(button) {
    const buttonId = button.dataset.id;
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    localStorage.setItem(`likes_${buttonId}`, count);
}

window.addEventListener('load', function() {
    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
            fixCookieConsentBarPosition();
        }
    }

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const buttonId = button.dataset.id;
        const likesLocalStorage = localStorage.getItem(`likes_${buttonId}`);
        if (likesLocalStorage) {
            button.dataset.likes = likesLocalStorage;
            button.querySelector('.like-count').textContent = likesLocalStorage;
        }
    });
});

// Функция для сохранения и отображения общего количества лайков
function updateTotalLikes() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const newsId = button.getAttribute('data-id');
        let likeCount = localStorage.getItem(`likes_${newsId}`);
        if (likeCount === null) {
            likeCount = 0;
        } else {
            likeCount = parseInt(likeCount);
        }
        button.querySelector('.total-likes-news').textContent = `общее количество ${likeCount}`;
    });
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

function saveLikesToCookie(button) {
    const consentAccepted = getCookie("cookieconsent");
    if (consentAccepted) {
        const buttonId = button.dataset.id;
        const count = button.dataset.likes || 0;
        document.cookie = `likes_${buttonId}=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
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

document.addEventListener('DOMContentLoaded', function() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newsId = button.getAttribute('data-id');
            const hasLiked = localStorage.getItem(`liked_${newsId}`);
            if (hasLiked) {
                return;
            }
            let likeCount = localStorage.getItem(`likes_${newsId}`);
            if (likeCount === null) {
                likeCount = 0;
            } else {
                likeCount = parseInt(likeCount);
            }
            likeCount++;
            localStorage.setItem(`likes_${newsId}`, likeCount);
            localStorage.setItem(`liked_${newsId}`, true);
            updateTotalLikes();
        });
    });
    updateTotalLikes();
});

function getLocalStorageItem(name) {
    return localStorage.getItem(name);
}

function setLocalStorageItem(name, value) {
    localStorage.setItem(name, value);
}

function acceptCookies() {
    setLocalStorageItem("cookieconsent", "accepted");
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

function hasLiked(newsId) {
    var likes = parseInt(getLocalStorageItem("like_" + newsId));
    return !isNaN(likes) && likes > 0;
}

function like(newsId) {
    if (!getLocalStorageItem("cookieconsent")) {
        alert("Пожалуйста, согласитесь на использование Cookie, чтобы ставить отметки Нравится новостям.");
        return;
    }

    var likesCountElement = document.querySelector('[data-news-id="' + newsId + '"] .likes-count');
    var likesCount = parseInt(likesCountElement.innerText) || 0;

    if (!hasLiked(newsId)) {
        likesCount++;
        likesCountElement.innerText = likesCount;
        setLocalStorageItem("like_" + newsId, (parseInt(getLocalStorageItem("like_" + newsId)) || 0) + 1);
    } else {
        alert("Вы уже ставили отметку Нравится для этой новости!");
    }
}

var likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var newsId = button.getAttribute('data-news-id');
        like(newsId);
    });
});

window.addEventListener('DOMContentLoaded', function() {
    var consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar && !getLocalStorageItem("cookieconsent")) {
        consentBar.style.display = "block";
    }
    fixCookieConsentBarPosition();

    var likeElements = document.querySelectorAll('[data-news-id]');
    likeElements.forEach(function(element) {
        var newsId = element.getAttribute('data-news-id');
        var likesCountElement = element.querySelector('.likes-count');
        var storedLikes = parseInt(getLocalStorageItem("like_" + newsId)) || 0;
        likesCountElement.innerText = storedLikes;
    });
});

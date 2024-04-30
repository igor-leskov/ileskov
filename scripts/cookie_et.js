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

window.addEventListener('DOMContentLoaded', function() {
    
    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }

    fixCookieConsentBarPosition();
});

function hasLiked(newsId) {
    return getCookie("like_" + newsId) === "true";
}

function like(newsId) {
    var likesCountElement = document.querySelector('[data-news-id="' + newsId + '"] .likes-count');
    var likesCount = parseInt(likesCountElement.innerText);
    
    if (!hasLiked(newsId)) {
        likesCount++;
        likesCountElement.innerText = likesCount;
        setCookie("like_" + newsId, "true", 365); 
    } else {
        alert("Te olete juba sellele uudisele Meeldimise märgi pannud!");
    }
}

function countOtherLikes() {
    var otherLikes = document.cookie.split(';').filter(function(cookie) {
        return cookie.trim().startsWith("like_") && cookie.trim().indexOf("=") !== -1;
    }).reduce(function(acc, cookie) {
        var newsId = cookie.trim().split('=')[0].split('_')[1];
        acc[newsId] = (acc[newsId] || 0) + 1;
        return acc;
    }, {});

    return otherLikes;
}

var likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var newsId = button.getAttribute('data-news-id');
        if (getCookie("cookieconsent") === "accepted") {
            like(newsId);
        } else {
            alert("Palun nõustuge Cookie kasutamisega, et saaksite uudistele Meeldimiseks märke panna.");
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    var likesFromCookies = countOtherLikes();

    for (var newsId in likesFromCookies) {
        var likesCountElement = document.querySelector('[data-news-id="' + newsId + '"] .likes-count');
        var likesCount = parseInt(likesCountElement.innerText);
        likesCount += likesFromCookies[newsId];
        likesCountElement.innerText = likesCount;
    }
});


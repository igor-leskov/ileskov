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
        alert("Palun nõustuge Cookie kasutamisega, et saaksite uudistele Meeldimiseks märke panna.");
        return;
    }

    var likesCountElement = document.querySelector('[data-news-id="' + newsId + '"] .likes-count');
    var likesCount = parseInt(likesCountElement.innerText) || 0; 

    if (!hasLiked(newsId)) {
        likesCount++;
        likesCountElement.innerText = likesCount;

        setLocalStorageItem("like_" + newsId, (parseInt(getLocalStorageItem("like_" + newsId)) || 0) + 1);
    } else {
        alert("Te olete juba sellele uudisele Meeldimise märgi pannud!);
    }
}

function countOtherLikes() {
    var otherLikes = {};
    for (var key in localStorage) {
        if (key.startsWith("like_")) {
            var newsId = key.split('_')[1];
            var count = parseInt(localStorage.getItem(key));
            if (!isNaN(count)) {
                otherLikes[newsId] = count;
            }
        }
    }
    return otherLikes;
}



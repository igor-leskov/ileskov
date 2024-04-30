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

window.addEventListener('DOMContentLoaded', function() {
    var consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar && !getLocalStorageItem("cookieconsent")) {
        consentBar.style.display = "block";
    }

    fixCookieConsentBarPosition();
});

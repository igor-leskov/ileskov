window.onload = function() {
    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }
};

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function accept_Cookies() {
    setCookie("cookieconsent", "accepted", 30);
    var consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar) {
        consentBar.style.display = "none"; 
    }
}

function redirectToPrivacyPolicyRu() {
    var policyPage = "mob_privacy_policy.html";
    window.location.href = policyPage;
}

function redirectToPrivacyPolicyEt() {
    var policyPage = "mob_privacy_policy_et.html"; 
    window.location.href = policyPage;
}

function fixCookieConsentBarPosition() {
    var consentBar = document.getElementById("cookie-consent-bar");
    if (consentBar) {
        consentBar.style.position = "fixed";
    }
}

document.addEventListener("DOMContentLoaded", function() {
   
    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }
    
    fixCookieConsentBarPosition();
    
    var style = document.createElement('style');
    style.innerHTML = `
        @font-face {
            font-family: 'Roboto';
            src: url('styles/fonts/Sair.woff2') format('woff2'),
                 url('styles/fonts/Saira.woff') format('woff'),
                 url('styles/fonts/Roboto-Regular.ttf') format('truetype');
            font-display: swap;
        }
        
        body {
            font-family: 'Roboto', sans-serif;
        }
    `;
    document.head.appendChild(style);
});

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

function updateLikes(newsId) {
    const consent = getCookie("cookieconsent");
    const likedCookie = getCookie('liked-' + newsId);

    if (consent === "accepted") {
        if (!likedCookie) {
            let likesCount = parseInt(getCookie('likes-' + newsId) || 0);
            likesCount++;
            setCookie('likes-' + newsId, likesCount, 30); 
            setCookie('liked-' + newsId, 'true', 30);
            document.getElementById('like-' + newsId).textContent = likesCount;
        } else {
            alert("Вы уже поставили отметку Нравится этой новости.");
        }
    } else {
        alert("Пожалуйста, разрешите использование Cookies для возможности ставить отметки Нравится новостям.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!getCookie("cookieconsent")) {
        var consentBar = document.getElementById("cookie-consent-bar");
        if (consentBar) {
            consentBar.style.display = "block";
        }
    }

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const newsId = this.dataset.newsId; 
            updateLikes(newsId);
        });
    });
});

window.onload = function() {
    document.querySelectorAll('.like-count').forEach(likeCountElement => {
        const newsId = likeCountElement.dataset.newsId;
        const likesCount = parseInt(getCookie('likes-' + newsId) || 0);
        likeCountElement.textContent = likesCount;
    });
};

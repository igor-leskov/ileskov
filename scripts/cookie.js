const newsFeed = document.querySelector('.news-feed');

if (newsFeed) {
    newsFeed.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('like-button') || target.closest('.like-button')) {
            const button = target.closest('.like-button');
            if (!button.dataset.likes) {
                updateLikeCount(button);
                saveLikesToCookie(button);
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
        const likesCookie = getCookie(`likes_${buttonId}`);
        if (likesCookie) {
            button.dataset.likes = likesCookie;
            button.querySelector('.like-count').textContent = likesCookie;
        }
    });
});

// Функция для сохранения и отображения общего количества лайков
function updateTotalLikes() {
  // Получаем все кнопки лайков
  const likeButtons = document.querySelectorAll('.like-button');
  
  // Для каждой кнопки лайка
  likeButtons.forEach(button => {
    // Получаем id новости из data-id атрибута кнопки
    const newsId = button.getAttribute('data-id');
    
    // Получаем количество лайков для данной новости
    const likeCount = parseInt(button.querySelector('.like-count').textContent);
    
    // Обновляем общее количество лайков для данной новости
    button.querySelector('.total-likes-news').textContent = `общее количество ${likeCount}`;
  });
}

// Обработчик события для кнопки лайка
document.addEventListener('DOMContentLoaded', function() {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Получаем id новости
      const newsId = button.getAttribute('data-id');
      
      // Проверяем, есть ли уже лайк от данного пользователя для этой новости
      const hasLiked = localStorage.getItem(`liked_${newsId}`);
      if (hasLiked) {
        // Если пользователь уже поставил лайк, то выходим из функции
        return;
      }
      
      // Увеличиваем счетчик лайков для данной новости
      const likeCountSpan = button.querySelector('.like-count');
      let likeCount = parseInt(likeCountSpan.textContent);
      likeCount++;
      likeCountSpan.textContent = likeCount;
      
      // Запоминаем, что пользователь поставил лайк для этой новости
      localStorage.setItem(`liked_${newsId}`, true);
      
      // Вызываем функцию для обновления общего количества лайков
      updateTotalLikes();
    });
  });
});


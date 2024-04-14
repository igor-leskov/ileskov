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
});

// Функция для сохранения и отображения общего количества лайков
function updateTotalLikes() {
  // Получаем все кнопки лайков
  const likeButtons = document.querySelectorAll('.like-button');
  
  // Для каждой кнопки лайка
  likeButtons.forEach(button => {
    // Получаем id новости из data-id атрибута кнопки
    const newsId = button.getAttribute('data-id');
    
    // Получаем количество лайков для данной новости из локального хранилища
    let likeCount = localStorage.getItem(`likes_${newsId}`);
    
    // Если в локальном хранилище нет информации о количестве лайков для данной новости, устанавливаем значение по умолчанию (0)
    if (likeCount === null) {
      likeCount = 0;
    } else {
      likeCount = parseInt(likeCount);
    }
    
    // Обновляем текст общего количества лайков для данной новости
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
      
      // Увеличиваем счетчик лайков для данной новости в локальном хранилище
      let likeCount = localStorage.getItem(`likes_${newsId}`);
      if (likeCount === null) {
        likeCount = 0;
      } else {
        likeCount = parseInt(likeCount);
      }
      likeCount++;
      localStorage.setItem(`likes_${newsId}`, likeCount);
      
      // Запоминаем, что пользователь поставил лайк для этой новости
      localStorage.setItem(`liked_${newsId}`, true);
      
      // Вызываем функцию для обновления общего количества лайков
      updateTotalLikes();
    });
  });
  
  // После загрузки страницы обновляем общее количество лайков
  updateTotalLikes();
});


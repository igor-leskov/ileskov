function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function hasLiked(newsId) {
  return getCookie("like_" + newsId) === "true";
}

// Функция для установки лайка
function like(newsId) {
  var likesCountElement = document.querySelector('[data-news-id="' + newsId + '"] .likes-count');
  var likesCount = parseInt(likesCountElement.innerText);
  
  if (!hasLiked(newsId)) {
    likesCount++;
    likesCountElement.innerText = likesCount;
    setCookie("like_" + newsId, "true", 365); 
  } else {
    alert("Вы уже ставили отметку Нравится для этой новости!");
  }
}

var likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var newsId = button.getAttribute('data-news-id');
    if (getCookie("cookie_consent") === "true") {
      like(newsId);
    } else {
      alert("Пожалуйста, согласитесь на использование Cookie, чтобы ставить отметки Нравится новостям.");
    }
  });
});

var likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var newsId = button.getAttribute('data-news-id');
    like(newsId);
  });
});

window.onload = function() {
  var likesFromCookies = document.cookie.split(';').filter(function(cookie) {
    return cookie.trim().startsWith("like_");
  }).reduce(function(acc, cookie) {
    var newsId = cookie.trim().split('=')[0].split('_')[1];
    acc[newsId] = (acc[newsId] || 0) + 1;
    return acc;
  }, {});

  for (var newsId in likesFromCookies) {
    var likesCountElement = document.querySelector('[data-news-id="' + newsId + '"] .likes-count');
    var likesCount = parseInt(likesCountElement.innerText);
    likesCount += likesFromCookies[newsId];
    likesCountElement.innerText = likesCount;
  }
}

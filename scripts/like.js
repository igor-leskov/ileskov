function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
    alert("Вы уже поставили лайк для этой новости!");
  }
}

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
  }).length;

  var likesCountElements = document.querySelectorAll('.likes-count');
  likesCountElements.forEach(function(element) {
    var newsId = element.parentElement.getAttribute('data-news-id');
    var likesCount = parseInt(element.innerText);
    likesCount += likesFromCookies;
    element.innerText = likesCount;
  });
}

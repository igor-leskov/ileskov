const newsFeed = document.querySelector('.news-feed');

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

function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;
}

window.onload = function() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const buttonId = button.dataset.id;
        const likesCookie = getCookie(`likes_${buttonId}`);
        if (likesCookie) {
            button.dataset.likes = likesCookie;
            button.querySelector('.like-count').textContent = likesCookie;
        }
    });
};

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

function saveLikesToCookie(button) {
    const consentAccepted = getCookie("cookieconsent"); // Check if cookie consent is accepted
    if (consentAccepted) { // Only save likes to cookies if consent is accepted
        const buttonId = button.dataset.id;
        const count = button.dataset.likes || 0;
        document.cookie = `likes_${buttonId}=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
}

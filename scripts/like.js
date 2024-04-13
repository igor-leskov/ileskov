const likeButtons = document.querySelectorAll('.like-button');

function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;

    const buttonId = button.dataset.id;
    document.cookie = `likes_${buttonId}=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

window.onload = function() {
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

likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        updateLikeCount(this);
    });
});

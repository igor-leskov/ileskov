const likeButtons = document.querySelectorAll('.like-button');

// Функция для обновления счетчика лайков
function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;
}
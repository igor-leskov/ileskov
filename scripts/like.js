const newsFeed = document.querySelector('.news-feed');

// Обработчик клика по кнопкам лайка внутри родительского элемента новостей
newsFeed.addEventListener('click', function(event) {
    // Получаем элемент, на который был сделан клик
    const target = event.target;

    // Проверяем, является ли элемент кнопкой "like" или находится ли он внутри такой кнопки
    if (target.classList.contains('like-button') || target.closest('.like-button')) {
        // Если да, получаем саму кнопку "like"
        const button = target.closest('.like-button');

        // Проверяем, есть ли уже у этой кнопки атрибут data-likes
        if (!button.dataset.likes) {
            // Если нет, обновляем счетчик лайков и сохраняем в куки
            updateLikeCount(button);
            saveLikesToCookie(button);
        }
    }
});

// Функция для обновления счетчика лайков
function updateLikeCount(button) {
    let count = parseInt(button.dataset.likes) || 0;
    count++;
    button.dataset.likes = count;
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = count;
}

// При загрузке страницы восстанавливаем счетчики лайков из куки
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

// Функция для получения значения куки по имени
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

// Функция для сохранения информации о лайках в куки
function saveLikesToCookie(button) {
    const buttonId = button.dataset.id;
    const count = button.dataset.likes || 0;
    document.cookie = `likes_${buttonId}=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

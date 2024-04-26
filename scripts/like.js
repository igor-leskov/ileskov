const likeButton = document.querySelector('.like-button');
const likeCount = document.querySelector('.like-count');
 
likeButton.addEventListener('click', () =&gt; {
  // Получаем текущее значение счетчика лайков и увеличиваем на 1
  const currentCount = parseInt(likeCount.textContent, 10);
  likeCount.textContent = currentCount + 1;
});

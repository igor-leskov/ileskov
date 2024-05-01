function changeSlide(direction) {
  var slides = document.querySelectorAll('.slide');
  var currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  slides[currentSlide].classList.remove('active'); 

  var newSlideIndex = currentSlide + direction;
  if (newSlideIndex >= slides.length) {
    newSlideIndex = 0;
  } else if (newSlideIndex < 0) {
    newSlideIndex = slides.length - 1;
  }

  slides[newSlideIndex].classList.add('active'); 
}

function slider() {
    //Slider
  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);


  function showSlides(n) {

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');
    dots.forEach(item => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  document.body.addEventListener('click', e => {

    let target = e.target;

    if (target.classList.contains('prev') || target.classList.contains('arrow-left')) {
      plusSlides(-1);
    }
    if (target.classList.contains('next') || target.classList.contains('arrow-right')) {
      plusSlides(1);
    }
    if (target.classList.contains('dot')) {
      for (let i = 0; i < dots.length + 1; i++) {
        if (target.classList.contains('dot') && target == dots[i - 1]) {
          currentSlide(i);
        }
      }
    }
  });
}

module.exports = slider;
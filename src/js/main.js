window.addEventListener('DOMContentLoaded', () => {

  'use strict';


  //пишем табы
  let tab = document.querySelectorAll('.info-header-tab'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  const hideTabContent = (a = 1) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };
  hideTabContent();

  const showTabContent = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  };

  document.body.addEventListener('click', e => {

    let target = e.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });



  //пишем таймер
  let deadline = '2019-06-28';

  const getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),

      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)));

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  const setClock = (id, endtime) => {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(() => {

        let t = getTimeRemaining(endtime);

        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;

        if (t.total <= 0) {
          clearInterval(timeInterval);
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
        }
      }, 1000);
  };
  setClock('timer', deadline);



  //Модальное окно
  let overlay = document.querySelector('.overlay'),
    isActiveBtn;

  const bindModal = (overlayStatus, overflowStatus, classListMethod, elem) => {

    if (classListMethod == 'add') {
      isActiveBtn = elem;
    }

    if (!elem) {
      elem = isActiveBtn;
    }

    overlay.style.display = overlayStatus;
    elem.classList[classListMethod]('more-splash');
    document.body.style.overflow = overflowStatus;
  };

  document.body.addEventListener('click', e => {

    let target = e.target;

    if (target && (target.classList.contains('more') || target.classList.contains('description-btn'))) {
      bindModal('block', 'hidden', 'add', target);
    }

    if (target && target.classList.contains('popup-close')) {
      bindModal('none', '', 'remove');
    }

  });



  // Отправку формы на сервер 
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вам свяжемся',
    failure: "ЧТо-то пошло не так..."
  };

  let statusMessge = document.createElement('div');
  statusMessge.classList.add('status');

  const sendForm = (elem) => {

    elem.appendChild(statusMessge);

    let promise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('POST', 'server.php');
      request.setRequestHeader('Contetnt-type', 'application/json; charset=utf-8');

      let formData = new FormData(elem),
        obj = {};

      formData.forEach((value, key) => {
        obj[key] = value;
      });

      let json = JSON.stringify(obj);
      request.send(json);

      request.addEventListener('readystatechange', () => {
        if (request.readyState < 4) {
          statusMessge.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
          resolve(statusMessge.innerHTML = message.success);
        } else {
          reject(statusMessge.innerHTML = message.failure);
        }
      });
    });

    for (let i = 0; i < elem.length; i++) {
      elem[i].value = '';
    }

    return promise;
  };

  document.body.addEventListener('submit', e => {
    e.preventDefault();
    sendForm(e.target);
  });



  // Валидация данных ввода в инпуты
  document.body.addEventListener("input", e => {
    let target = e.target;

    if (target.getAttribute("type") === "tel") {
      target.value = "+" + target.value.replace(/[^0-9]/g, "");
      if (target.value.length == 1) {
        target.value = "";
      }
    }
    if (target.getAttribute("type") === "number") {
      target.value = target.value.replace(/[,.+e]/g, "");
      if ((target.value.length == 1) && (target.value == "0")) {
        target.value = "";
      }

    }
  });



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



  //Калькулятор
  let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = 0;

  persons.addEventListener('input', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total * place.options[place.selectedIndex].value;
    }

  });

  restDays.addEventListener('input', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == '' || restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total * place.options[place.selectedIndex].value;
    }
  });

  place.addEventListener('input', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });

});
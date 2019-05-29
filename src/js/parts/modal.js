function modal() {
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
}

module.exports = modal;
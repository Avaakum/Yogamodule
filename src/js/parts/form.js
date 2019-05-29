function form() {
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
}

module.exports = form;
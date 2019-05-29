function valid() {
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
}

module.exports = valid;
'use strict';
// Модуль общих функций
window.utilities = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInteger: function (minNumber, maxNumber) {
      return Math.floor(minNumber + Math.random() * (maxNumber - minNumber));
    },
    getMaxElement: function (arr) {
      return Math.max.apply(null, arr);
    }
  };
})();

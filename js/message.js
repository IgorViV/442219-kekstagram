'use strict';
// Модуль вывода сообщений об успешной/ошибке загрузки информации на сервер
window.message = (function () {
  var showMessage = function (templateName) {
    var errorTemplate = document.querySelector('#' + templateName).content.querySelector('.' + templateName);
    var errorCloud = errorTemplate.cloneNode(true);
    errorCloud.style.zIndex = window.utilities.ERROR_POSITIN_INDEX;
    document.body.appendChild(errorCloud);

    var errorWindowOpened = true;

    var errorWindowClose = function () {
      if (errorWindowOpened) {
        document.body.removeChild(errorCloud);
        errorWindowOpened = false;
      }
    };

    errorCloud.addEventListener('click', function (evt) {

      if (evt.target.tagName === 'BUTTON') {
        errorWindowClose();
      }
    });

    document.body.addEventListener('keydown', function (evt) {
      window.utilities.isEscEvent(evt, errorWindowClose);
    });

    document.body.addEventListener('click', function () {
      errorWindowClose();
    });
  };

  return {
    isSuccess: function (nameId) {
      showMessage(nameId);
    },
    isError: function (nameId) {
      showMessage(nameId);
    }
  };
})();

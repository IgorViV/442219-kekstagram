'use strict';
// Модуль передачи данных на сервер
window.backend = (function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';

  return {
    upload: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case window.utilities.CODE_SUCCESS:
            onLoad(xhr.response);
            break;

          case window.utilities.CODE_BAD_REQUEST:
            error = 'Неверный запрос';
            break;

          case window.utilities.CODE_UNAUTHORIZED:
            error = 'Пользователь не авторизован';
            break;

          case window.utilities.CODE_NOT_FROUND_ERROR:
            error = 'Ничего не найдено';
            break;

          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }

      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения.');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.utilities.TIME_OUT_SEND;

      xhr.open('GET', URL_UPLOAD);
      xhr.send();
    },
    send: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.utilities.CODE_SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.utilities.TIME_OUT_SEND;

      xhr.open('POST', URL_SEND);
      xhr.send(data);
    }
  };
})();

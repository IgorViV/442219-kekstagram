'use strict';

(function () {
  //
  window.errorOpen = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorCloud = errorTemplate.cloneNode(true);
    errorCloud.style.zIndex = '3';
    document.body.appendChild(errorCloud);

    var errorWindowOpened = true;

    var errorWindowClose = function () {
      if (errorWindowOpened) {
        document.body.removeChild(errorCloud);
        errorWindowOpened = false;
      }
      // document.removeEventListener('keydown', escOverlayPress);
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

  // Загружаем новую фотографию на сайт:
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var buttonUploadOverlayClose = uploadForm.querySelector('.img-upload__cancel');
  // var buttonSubmitForm = uploadForm.querySelector('.img-upload__submit');

  var escOverlayPress = function (evt) {
    window.utilities.isEscEvent(evt, uploadOverlayClose);
  };

  var uploadOverlayOpen = function () {
    uploadOverlay.classList.remove('hidden');
    // document.addEventListener('keydown', escOverlayPress);
    document.addEventListener('keydown', escOverlayPress);
  };

  var uploadOverlayClose = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', escOverlayPress);
    uploadFileInput.value = '';
  };

  // Выбираем изображение для загрузки:
  uploadFileInput.addEventListener('change', uploadOverlayOpen);

  buttonUploadOverlayClose.addEventListener('click', uploadOverlayClose);

  // Проверяем хэш-теги:
  var textHashtags = uploadForm.querySelector('.text__hashtags');

  textHashtags.addEventListener('input', function (evt) {
    var userHashtag = evt.target;
    var arrHashtags = userHashtag.value.split(' '); // массив хэш-тегов
    var lengthHashtagTooShort = false; // больше одного символа
    var lengthHashtagTooLong = false; // меньше (или равно) 20-ти символов
    var notSymbolHashtag = false; // есть символ #
    var sameHashtag = false; // нет одинаковых хэш-тегов

    // Проверяем правильность введенных хэш-тегов:
    for (var n = 0; n < arrHashtags.length; n++) {
      arrHashtags[n].toLowerCase();
      if (arrHashtags[n].length < 2) {
        lengthHashtagTooShort = true;
      } else if (arrHashtags[n].length > 20) {
        lengthHashtagTooLong = true;
      } else {
        for (var m = 0; m < arrHashtags[n].length; m++) {
          var arrChar = arrHashtags[n];
          if (arrChar[0] !== '#') {
            notSymbolHashtag = true;
          }
        }
      }
    }

    // Проверяем равенство введенных хэш-тегов:
    for (var r = 0; r < arrHashtags.length - 1; r++) {
      var temp = arrHashtags[r];
      for (var s = r + 1; s < arrHashtags.length; s++) {
        if (arrHashtags[s] === temp) {
          sameHashtag = true;
        }
      }
    }

    if (arrHashtags.length > 5) {
      userHashtag.setCustomValidity('Хэш-тегов не более 5-ти');
    } else if (lengthHashtagTooShort) {
      userHashtag.setCustomValidity('Хэш-тег не менее 2-х символов');
    } else if (lengthHashtagTooLong) {
      userHashtag.setCustomValidity('Хэш-тег не более 20-ти символов');
    } else if (notSymbolHashtag) {
      userHashtag.setCustomValidity('Начало хэш-тега #');
    } else if (sameHashtag) {
      userHashtag.setCustomValidity('Не повторяйте хэш-теги');
    } else {
      userHashtag.setCustomValidity('');
    }
  });

  // Проверяем комментарии:
  var textDescription = uploadForm.querySelector('.text__description');
  textDescription.addEventListener('input', function (evt) {
    var userComment = evt.target;

    if (textDescription.value.length > 140) {
      userComment.setCustomValidity('Длина комментариев не более 140 символов');
    } else {
      userComment.setCustomValidity('');
    }
  });

  // Блокируем закрытие окна при вводе текста:
  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', escOverlayPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', escOverlayPress);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', escOverlayPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', escOverlayPress);
  });

  uploadForm.addEventListener('submit', function (evt) {
    // var main = document.querySelector('#main');
    // var errorTemplate = document.querySelector('#error').content;
    // var errorCloud = errorTemplate.cloneNode(true);
    // main.appendChild(errorCloud);

    var onLoad = function () {
      uploadOverlayClose();

    };

    var onError = function () {
      document.removeEventListener('keydown', escOverlayPress);
      window.errorOpen();
      // var fragment = document.createDocumentFragment();
      // var errorCloud = errorTemplate.cloneNode(true);

      // fragment.appendChild(errorCloud);
      // main.insertAdjacentElement('afterbegin', fragment);
      // main.appendChild(errorCloud);
    };

    window.backend.send(new FormData(uploadForm), onLoad, onError);

    evt.preventDefault();
  });

})();

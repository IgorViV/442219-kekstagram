'use strict';
// Модуль отображения полноэкранной фотографии пользователя
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var sectionPictures = document.querySelector('.pictures');

  var escUserPicturePress = function (evt) {
    window.utilities.isEscEvent(evt, userPictureClose);
  };

  var userPictureOpen = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', escUserPicturePress);
  };

  var userPictureClose = function () {
    bigPicture.classList.add('hidden');
  };

  // Функция отображения выбранной фотографии
  var renderSelectPicture = function (selectElement, classSelectElement) {
    // Находим индекс выбранного элемента
    var arrParentTarget = sectionPictures.querySelectorAll('.' + classSelectElement);
    var indexSelectPicture;
    for (var j = 0; j < arrParentTarget.length; j++) {
      if (arrParentTarget[j] === selectElement) {
        indexSelectPicture = j;
      }
    }

    bigPicture.querySelector('.big-picture__img img').src = window.arrPictures[indexSelectPicture].url;
    bigPicture.querySelector('.likes-count').textContent = window.arrPictures[indexSelectPicture].likes;
    bigPicture.querySelector('.comments-count').textContent = window.arrPictures[indexSelectPicture].comments.length;
    bigPicture.querySelector('.social__caption').textContent = window.arrPictures[indexSelectPicture].description;

    // Формируем список комментариев под полноэкранной фотографией пользователя:
    var socialComments = document.querySelector('.social__comments');
    var commentTemplate = document.querySelector('.social__comment');
    var tempArrPicturesComments = window.arrPictures[indexSelectPicture].comments.slice();
    var lengthComments = 5; // Максимальное количество отображаемых комментариев
    socialComments.innerHTML = '';

    // Функция отрисовки комментариев
    var renderComments = function (size) {
      var fragmentComment = document.createDocumentFragment();
      for (var i = 0; i < size; i++) {
        commentTemplate.querySelector('.social__picture').src = tempArrPicturesComments[i].avatar;
        commentTemplate.querySelector('.social__text').textContent = tempArrPicturesComments[i].message;
        fragmentComment.appendChild(commentTemplate.cloneNode(true));
      }
      socialComments.appendChild(fragmentComment);
      tempArrPicturesComments.splice(0, size);
    };

    // Функция проверки количества комментариев
    var sumCommentsCheck = function () {
      if (lengthComments > tempArrPicturesComments.length) {
        lengthComments = tempArrPicturesComments.length;
        // Скрываем возможность загрузки комментариев:
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
      } else {
        bigPicture.querySelector('.comments-loader').classList.remove('hidden');
      }
    };

    sumCommentsCheck();

    renderComments(lengthComments);

    // Показ дополнительных комментариев
    var buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
    buttonCommentsLoader.addEventListener('click', function () {
      sumCommentsCheck();
      renderComments(lengthComments);
    });
  };

  // Открываем фотографии пользователя
  var openEnterPictures = function () {
    if (document.activeElement.getAttribute('class') === 'picture') {
      userPictureOpen();
      renderSelectPicture(document.activeElement, document.activeElement.getAttribute('class'));
    }
  };

  sectionPictures.addEventListener('keydown', function (evt) {
    window.utilities.isEnterEvent(evt, openEnterPictures);
  });

  sectionPictures.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'IMG') {
      userPictureOpen();
      renderSelectPicture(evt.target.parentNode, evt.target.parentNode.className);
    }
  });

  bigPictureCancel.addEventListener('click', userPictureClose);
})();

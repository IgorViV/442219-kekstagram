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

  // Открываем фотографии пользователя
  sectionPictures.addEventListener('click', function (evt) {

    if (evt.target.tagName === 'IMG') {
      userPictureOpen();

      // Находим индекс выбранного элемента
      var arrParentTarget = sectionPictures.querySelectorAll('.' + evt.target.parentNode.className);

      for (var l = 0; l < arrParentTarget.length; l++) {
        if (arrParentTarget[l] === evt.target.parentNode) {
          var indexTarget = l;
        }
      }

      bigPicture.querySelector('.big-picture__img img').src = window.arrPictures[indexTarget].url;
      bigPicture.querySelector('.likes-count').textContent = window.arrPictures[indexTarget].likes;
      bigPicture.querySelector('.comments-count').textContent = window.arrPictures[indexTarget].comments.length;
      bigPicture.querySelector('.social__caption').textContent = window.arrPictures[indexTarget].description;

      // Формируем список комментариев под полноэкранной фотографией пользователя:
      var socialComments = document.querySelector('.social__comments');
      var commentTemplate = document.querySelector('.social__comment');
      var lengthComments = 5; // Максимальное количество отображаемых комментариев
      socialComments.innerHTML = '';

      // Функция отрисовки комментариев
      var renderComments = function (size) {
        var fragmentComment = document.createDocumentFragment();
        for (var i = 0; i < size; i++) {
          commentTemplate.querySelector('.social__picture').src = window.arrPictures[indexTarget].comments[i].avatar;
          commentTemplate.querySelector('.social__text').textContent = window.arrPictures[indexTarget].comments[i].message;
          fragmentComment.appendChild(commentTemplate.cloneNode(true));
        }
        socialComments.appendChild(fragmentComment);
      };

      // Функция проверки количества комментариев
      var sumCommentsCheck = function () {
        if (lengthComments > window.arrPictures[indexTarget].comments.length) {
          lengthComments = window.arrPictures[indexTarget].comments.length;
          // Скрываем счетчик комментариев и возможность загрузки комментариев:
          bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
          bigPicture.querySelector('.comments-loader').classList.add('hidden');
        } else {
          bigPicture.querySelector('.social__comment-count').classList.remove('visually-hidden');
          bigPicture.querySelector('.comments-loader').classList.remove('hidden');
        }
      };

      sumCommentsCheck();

      renderComments(lengthComments);
      // Показ дополнительных комментариев
      // var buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
      // buttonCommentsLoader.addEventListener('click', function () {
      //   var begin = lengthComments;
      //   var end = window.arrPictures[indexTarget].comments.length;
      //   window.arrPictures[indexTarget].comments.slice(begin, end);
      //   renderComments(lengthComments);
      // });
    }
  });

  bigPictureCancel.addEventListener('click', userPictureClose);
})();

'use strict';

(function () {
  // Показываем полноэкранную фотографию пользователя с комментариями:
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

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

  // Открываем фотографию пользователя:
  window.pictures.item.addEventListener('click', function (evt) {

    if (evt.target.tagName === 'IMG') {
      userPictureOpen();

      // Находим индекс выбранного элемента
      var arrParentTarget = window.pictures.item.querySelectorAll('.' + evt.target.parentNode.className);

      for (var l = 0; l < arrParentTarget.length; l++) {
        if (arrParentTarget[l] === evt.target.parentNode) {
          var indexTarget = l;
        }
      }

      bigPicture.querySelector('.big-picture__img img').src = window.pictures.arrDescriptions[indexTarget].url;
      bigPicture.querySelector('.likes-count').textContent = window.pictures.arrDescriptions[indexTarget].likes;
      bigPicture.querySelector('.comments-count').textContent = window.pictures.arrDescriptions[indexTarget].comments.length;
      bigPicture.querySelector('.social__caption').textContent = window.pictures.arrDescriptions[indexTarget].description;
    }
  });

  bigPictureCancel.addEventListener('click', userPictureClose);

  // Формируем список комментариев под полноэкранной фотографией пользователя:
  var socialComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  socialComments.innerHTML = '';
  var fragmentComment = document.createDocumentFragment();

  var lengthComments = 5; // Максимальное количество отображаемых комментариев

  for (var j = 0; j < lengthComments; j++) {
    var indexUser = window.utilities.getRandomInteger(1, 6);
    commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + indexUser + '.svg';
    commentTemplate.querySelector('.social__text').textContent = window.pictures.arrDescriptions[0].comments[j];

    fragmentComment.appendChild(commentTemplate.cloneNode(true));
  }

  socialComments.appendChild(fragmentComment);

  // Скрываем счетчик комментариев и возможность загрузки комментариев:
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
})();

'use strict';

(function () {
  // Показываем полноэкранную фотографию пользователя с комментариями:
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

  // Открываем фотографию пользователя:
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

      var onLoad = function (arrPictures) {
        bigPicture.querySelector('.big-picture__img img').src = arrPictures[indexTarget].url;
        bigPicture.querySelector('.likes-count').textContent = arrPictures[indexTarget].likes;
        bigPicture.querySelector('.comments-count').textContent = arrPictures[indexTarget].comments.length;
        bigPicture.querySelector('.social__caption').textContent = arrPictures[indexTarget].description;

        // Формируем список комментариев под полноэкранной фотографией пользователя:
        var socialComments = document.querySelector('.social__comments');
        var commentTemplate = document.querySelector('.social__comment');
        socialComments.innerHTML = '';
        var fragmentComment = document.createDocumentFragment();

        var lengthComments = 5; // Максимальное количество отображаемых комментариев

        if (lengthComments > arrPictures[indexTarget].comments.length) {
          lengthComments = arrPictures[indexTarget].comments.length;
          // Скрываем счетчик комментариев и возможность загрузки комментариев:
          bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
          bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
        } else {
          bigPicture.querySelector('.social__comment-count').classList.remove('visually-hidden');
          bigPicture.querySelector('.comments-loader').classList.remove('visually-hidden');
        }

        for (var j = 0; j < lengthComments; j++) {
          commentTemplate.querySelector('.social__picture').src = arrPictures[indexTarget].comments[j].avatar;
          commentTemplate.querySelector('.social__text').textContent = arrPictures[indexTarget].comments[j].message;

          fragmentComment.appendChild(commentTemplate.cloneNode(true));
        }

        socialComments.appendChild(fragmentComment);
      };

      var onError = function (error) {
        console.log('Ошибка сети: ' + error);
      };

      window.backend.upload(onLoad, onError);
    }
  });

  bigPictureCancel.addEventListener('click', userPictureClose);
})();

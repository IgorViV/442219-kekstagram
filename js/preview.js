'use strict';
// Модуль отображения полноэкранной фотографии пользователя
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPicturePreview = bigPicture.querySelector('.big-picture__img');
  var bigPicturePreviewImg = bigPicturePreview.querySelector('img');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var pictureLikesCount = bigPicture.querySelector('.likes-count');
  var pictureCommentsCount = bigPicture.querySelector('.comments-count');
  var pictureSocialDescription = bigPicture.querySelector('.social__caption');
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

    bigPicturePreviewImg.src = window.arrPictures[indexSelectPicture].url;
    pictureLikesCount.textContent = window.arrPictures[indexSelectPicture].likes;
    pictureCommentsCount.textContent = window.arrPictures[indexSelectPicture].comments.length;
    pictureSocialDescription.textContent = window.arrPictures[indexSelectPicture].description;

    // Формируем список комментариев под полноэкранной фотографией пользователя:
    var pictureSocial = bigPicture.querySelector('.big-picture__social');
    var socialComments = pictureSocial.querySelector('.social__comments');
    var commentTemplate = socialComments.querySelector('.social__comment');
    var userAvatarTemplate = commentTemplate.querySelector('.social__picture');
    var userMessageTemplate = commentTemplate.querySelector('.social__text');
    var tempArrPicturesComments = window.arrPictures[indexSelectPicture].comments.slice();
    var lengthComments = window.utilities.COMMENTS_SUM_MAX; // Максимальное количество отображаемых комментариев
    socialComments.innerHTML = '';

    // Функция отрисовки комментариев
    var renderComments = function (size) {
      var fragmentComment = document.createDocumentFragment();
      for (var i = 0; i < size; i++) {
        userAvatarTemplate.src = tempArrPicturesComments[i].avatar;
        userMessageTemplate.textContent = tempArrPicturesComments[i].message;
        fragmentComment.appendChild(commentTemplate.cloneNode(true));
      }
      socialComments.appendChild(fragmentComment);
      tempArrPicturesComments.splice(0, size);
    };

    // Функция проверки количества комментариев
    var buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
    var sumCommentsCheck = function () {
      if (lengthComments > tempArrPicturesComments.length) {
        lengthComments = tempArrPicturesComments.length;
        // Скрываем возможность загрузки комментариев:
        buttonCommentsLoader.classList.add('hidden');
      } else {
        buttonCommentsLoader.classList.remove('hidden');
      }
    };

    sumCommentsCheck();

    renderComments(lengthComments);

    // Показ дополнительных комментариев
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

'use strict';
// Модуль отрисовки изображений
(function () {
  var sectionPictures = document.querySelector('.pictures');

  var onLoad = function (arrPictures) {
    var arrPicturesCopy;
    var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var userPicture = userPictureTemplate.cloneNode(true);
    var userImg = userPicture.querySelector('.picture__img');
    var userLikes = userPicture.querySelector('.picture__likes');
    var userComments = userPicture.querySelector('.picture__comments');
    var fragment = document.createDocumentFragment();

    var compareElement = function (firstElement, lastElement) {

      return firstElement.likes - lastElement.likes;
    };

    var sortTypeToID = {
      'filter-popular': function () {
        arrPicturesCopy = arrPictures.slice();

        return arrPicturesCopy;
      },
      'filter-new': function () {
        var begin = window.utilities.getRandomInteger(window.utilities.FILTER_NEW_MIN, window.utilities.FILTER_NEW_MAX);
        var end = begin + window.utilities.FILTER_NEW_SHIFT;
        arrPicturesCopy = arrPictures.slice(begin, end);

        return arrPicturesCopy;
      },
      'filter-discussed': function () {
        arrPicturesCopy = arrPictures.slice();
        compareElement = function (firstElement, lastElement) {

          return firstElement.comments.length - lastElement.comments.length;
        };
        arrPicturesCopy.sort(compareElement);
        arrPicturesCopy.reverse();

        return arrPicturesCopy;
      }
    };

    // Функция сортировки фотографий пользователь в зависимости от выбраннного фильтра
    var imgFilters = document.querySelector('.img-filters');
    var formFilters = imgFilters.querySelector('.img-filters__form');
    var buttonsFilters = imgFilters.querySelectorAll('.img-filters__button');

    var renderUsersPictures = function () {
      var buttonFilterActive = imgFilters.querySelector('.img-filters__button--active');
      var arrUsersPictures = sectionPictures.querySelectorAll('.picture');
      arrUsersPictures.forEach(function (it) {
        sectionPictures.removeChild(it);
      });

      window.arrPictures = sortTypeToID[buttonFilterActive.getAttribute('ID')]();

      for (var i = 0; i < window.arrPictures.length; i++) {
        userImg.src = window.arrPictures[i].url;
        userLikes.textContent = window.arrPictures[i].likes;
        userComments.textContent = window.arrPictures[i].comments.length;

        fragment.appendChild(userPicture);
      }

      sectionPictures.appendChild(fragment);
    };

    renderUsersPictures();

    // Показываем блок фильтров сортировки изображений
    imgFilters.classList.remove('img-filters--inactive');

    // Обработчик фильтров сортировки изображеий
    var lastTimeout;
    formFilters.addEventListener('click', function (evt) {
      buttonsFilters.forEach(function (it) {
        it.classList.remove('img-filters__button--active');
      });
      if (evt.target.tagName === 'BUTTON') {
        evt.target.classList.add('img-filters__button--active');
      }

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(renderUsersPictures, window.utilities.TIME_OUT_DEBOUNCE);
    });

  };

  window.backend.upload(onLoad);

})();

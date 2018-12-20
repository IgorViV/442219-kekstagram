'use strict';
// Модуль отрисовки изображений
(function () {
  var sectionPictures = document.querySelector('.pictures');

  var onLoad = function (arrPictures) {
    var arrPicturesCopy;
    var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    var compareElement = function (firstElement, lastElement) {

      return firstElement.likes - lastElement.likes;
    };

    var filterToID = {
      'filter-popular': function () {
        arrPicturesCopy = arrPictures.slice();

        return arrPicturesCopy;
      },
      'filter-new': function () {
        var begin = window.utilities.getRandomInteger(0, 15);
        var end = begin + 10;
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

      window.arrPictures = filterToID[buttonFilterActive.getAttribute('ID')]();

      for (var i = 0; i < window.arrPictures.length; i++) {
        var userPicture = userPictureTemplate.cloneNode(true);
        userPicture.querySelector('.picture__img').src = window.arrPictures[i].url;
        userPicture.querySelector('.picture__likes').textContent = window.arrPictures[i].likes;
        userPicture.querySelector('.picture__comments').textContent = window.arrPictures[i].comments.length;

        fragment.appendChild(userPicture);
      }

      sectionPictures.appendChild(fragment);
    };

    renderUsersPictures();

    // Показываем блок фильтров изображений
    imgFilters.classList.remove('img-filters--inactive');

    // Обработчик фильтров изображеий
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
      var lastTimeout = window.setTimeout(renderUsersPictures, 500);
    });

  };

  window.backend.upload(onLoad);

})();

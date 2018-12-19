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

      renderUsersPictures();
    });

  };

  window.backend.upload(onLoad);

})();

// Доработайте модуль отрисовки изображений:

// +После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него класс .img-filters--inactive
// Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
// Популярные — фотографии в изначальном порядке.
// Новые — 10 случайных, не повторяющихся фотографий.
// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
// При переключении фильтра, все фотографии отрисованные ранее нужно убрать и вместо них показать те, которые подходят под новые условия.
// Доработайте список комментариев для фотографии в полноэкранном режиме таким образом, чтобы список комментариев показывался не полностью, а по пять элементов и следующие пять элементов добавлялись бы по нажатию на кнопку «загрузить ещё» (.comments-loader).

// Кроме частичного показа комментариев, сделайте так, чтобы в блоке .social__comment-count показывалось актуальное количество отрисованных комментариев и полное количество комментариев. При показе следующих пяти комментариев, содержимое блока должно обновляться.

// Поскольку API сервера не подразумевает частичной загрузки комментариев для фотографии, все комментарии должны скачиваться за один раз. Вам нужно сделать только частичный показ уже загруженных комментариев в разметке.

// Пункты ТЗ, выполненные в задании:
// 5. Фильтрация изображений от других пользователей
// 5.1. Популярные — фотографии в изначальном порядке.

// 5.2. Новые — 10 случайных, не повторяющихся фотографий.

// 5.3. Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.

// 5.4. Блок, с помощью которого производится фильтрация фотографий скрыт изначально и показывается только после окончания загрузки всех фотографий.

// 5.5. При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз в полсекунды (устранение дребезга).

// 4.6. Отображение дополнительных комментариев происходит при нажатии на кнопку .comments-loader. При нажатии на кнопку отображается не более 5 новых комментариев.

// 4.7. Если все комментарии показаны, кнопку .comments-loader следует скрыть, добавив класс hidden.

// Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так, чтобы при переключении фильтра, обновление списка элементов, подходящих под фильтры, происходило не чаще чем один раз в полсекунды.

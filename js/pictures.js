'use strict';

window.pictures = (function () {
  // Функция создания описания для фотографии пользователя:
  var createDescriptionPhoto = function (indexPhoto, maxComments, photoComments, photoDescription) {
    var photoData = {};
    photoData.url = 'photos/' + indexPhoto + '.jpg';
    photoData.likes = window.utilities.getRandomInteger(15, 200);
    photoData.comments = []; // Формируем массив комментариев
    var randomSumComments = window.utilities.getRandomInteger(5, maxComments); // Выбираем случайное число комментариев к фотографии
    for (var i = 0; i < randomSumComments; i++) {
      photoData.comments[i] = photoComments[window.utilities.getRandomInteger(0, photoComments.length)];
    }

    photoData.description = photoDescription[window.utilities.getRandomInteger(0, photoDescription.length)];

    return photoData;
  };

  // Функция создания массива с описаниями 25-ти фотографий пользователей:
  var createUsersDescriptionPhoto = function (sumComments, arrComments, arrDescription) {
    var usersPhoto = [];
    for (var i = 0; i < 25; i++) {
      usersPhoto[i] = createDescriptionPhoto(i + 1, sumComments, arrComments, arrDescription);
    }

    return usersPhoto;
  };

  // Создаем массив с описаниями 25-ти фотографий пользователей:
  var usersDescriptionPhotoList = createUsersDescriptionPhoto(window.data.maxSumComments, window.data.arrComments, window.data.arrDescription);

  // Создаем элементы в разметке страницы index.html, соответсвующие фотографиям пользователям:
  var usersPictures = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 25; i++) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = usersDescriptionPhotoList[i].url;
    userPicture.querySelector('.picture__likes').textContent = usersDescriptionPhotoList[i].likes;
    userPicture.querySelector('.picture__comments').textContent = usersDescriptionPhotoList[i].comments.length;

    fragment.appendChild(userPicture);
  }

  usersPictures.appendChild(fragment);

  return {
    item: usersPictures,
    arrDescriptions: usersDescriptionPhotoList,
  };
})();

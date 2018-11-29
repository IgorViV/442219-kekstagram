'use strict';

var COMMENTS_DATA = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MAX_SUM_COMMENTS = 6; // колличество оставленных комментариев для каждого фото (задаем условно)
var DESCRIPTION_DATA = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

// Функция выбора случайного числа из заданного диапазона:
var randomInteger = function (min, max) {
  var currentInteger = Math.floor(min + Math.random() * (max - min));
  return currentInteger;
};

// Функция создания описания для фотографии пользователя:
var createDescriptionPhoto = function (indexPhoto, maxComments, photoComments, photoDescription) {
  var photoData = {};
  var indexComments = randomInteger(0, photoComments.length);
  var indexDescription = randomInteger(0, photoDescription.length);
  photoData.url = 'photos/' + indexPhoto + '.jpg';
  photoData.likes = randomInteger(15, 200);
  // Формируем массив комментариев:
  photoData.comments = [];
  for (var i = 0; i < maxComments; i++) {
    photoData.comments[i] = photoComments[indexComments];
  }
  //
  photoData.description = photoDescription[indexDescription];

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
var usersDescriptionPhotoList = createUsersDescriptionPhoto(MAX_SUM_COMMENTS, COMMENTS_DATA, DESCRIPTION_DATA);

// Создаем элементы в разметке страницы index.html, соответсвующие фотографиям пользователям:
var usersPictures = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content
.querySelector('.picture');

for (var i = 0; i < 25; i++) {
  var userPicture = userPictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = usersDescriptionPhotoList[i].url;
  userPicture.querySelector('.picture__likes').textContent = usersDescriptionPhotoList[i].likes;
  // Выводим последний из оставленных комментариев:
  userPicture.querySelector('.picture__comments').textContent = usersDescriptionPhotoList[i].comments[MAX_SUM_COMMENTS - 1];

  usersPictures.appendChild(userPicture);
}

// Показываем полноэкранную фотографию пользователя с комментариями:
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').querySelector('img').src = usersDescriptionPhotoList[0].url;
bigPicture.querySelector('.likes-count').textContent = usersDescriptionPhotoList[0].likes;
bigPicture.querySelector('.comments-count').textContent = usersDescriptionPhotoList[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = usersDescriptionPhotoList[0].description;


// Формируем список комментариев под полноэкранной фотографией пользователя:
var socialComments = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');

for (var j = 0; j < 5; j++) {
  var arrComments = document.querySelectorAll('.social__comment');
  if ((arrComments.length < 5) && (arrComments.length < usersDescriptionPhotoList[0].comments.length)) {
    // Добавляем еще один блок комментариев:
    socialComments.appendChild(commentTemplate.cloneNode(true));
  }

  var indexUser = randomInteger(1, 6);
  arrComments[j].querySelector('.social__picture').src = 'img/avatar-' + indexUser + '.svg';
  arrComments[j].querySelector('.social__text').textContent = usersDescriptionPhotoList[0].comments[indexUser];
}

// Скрываем счетчик комментариев и возможность загрузки комментариев:
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

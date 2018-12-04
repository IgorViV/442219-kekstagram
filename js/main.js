'use strict';

var COMMENTS_DATA = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MAX_SUM_COMMENTS = 15; // колличество оставленных комментариев для каждого фото (задаем условно)
var DESCRIPTION_DATA = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var ESC_CODE = 27;
// var ENTER_CODE = 13;

// Функция выбора случайного числа из заданного диапазона:
var randomInteger = function (min, max) {
  var currentInteger = Math.floor(min + Math.random() * (max - min));
  return currentInteger;
};

// Функция создания описания для фотографии пользователя:
var createDescriptionPhoto = function (indexPhoto, maxComments, photoComments, photoDescription) {
  var photoData = {};
  photoData.url = 'photos/' + indexPhoto + '.jpg';
  photoData.likes = randomInteger(15, 200);
  photoData.comments = []; // Формируем массив комментариев
  var randomSumComments = randomInteger(5, maxComments); // Выбираем случайное число комментариев к фотографии
  for (var i = 0; i < randomSumComments; i++) {
    photoData.comments[i] = photoComments[randomInteger(0, photoComments.length)];
  }

  photoData.description = photoDescription[randomInteger(0, photoDescription.length)];

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
var fragment = document.createDocumentFragment();

for (var i = 0; i < 25; i++) {
  var userPicture = userPictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = usersDescriptionPhotoList[i].url;
  userPicture.querySelector('.picture__likes').textContent = usersDescriptionPhotoList[i].likes;
  userPicture.querySelector('.picture__comments').textContent = usersDescriptionPhotoList[i].comments.length;

  fragment.appendChild(userPicture);
}

usersPictures.appendChild(fragment);

// Показываем полноэкранную фотографию пользователя с комментариями:
var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').src = usersDescriptionPhotoList[0].url;
bigPicture.querySelector('.likes-count').textContent = usersDescriptionPhotoList[0].likes;
bigPicture.querySelector('.comments-count').textContent = usersDescriptionPhotoList[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = usersDescriptionPhotoList[0].description;


// Формируем список комментариев под полноэкранной фотографией пользователя:
var socialComments = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');
socialComments.innerHTML = '';
var fragmentComment = document.createDocumentFragment();

var lengthComments = 5; // Максимальное количество отображаемых комментариев
// if (lengthComments >= usersDescriptionPhotoList[0].comments.length) {
//   lengthComments = usersDescriptionPhotoList[0].comments.length;
// }

for (var j = 0; j < lengthComments; j++) {
  var indexUser = randomInteger(1, 6);
  commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + indexUser + '.svg';
  commentTemplate.querySelector('.social__text').textContent = usersDescriptionPhotoList[0].comments[j];

  fragmentComment.appendChild(commentTemplate.cloneNode(true));
}

socialComments.appendChild(fragmentComment);

// Скрываем счетчик комментариев и возможность загрузки комментариев:
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

// ОБРАБОТЧИКИ СОБЫТИЙ

// Обработчик - выбор файла для редактирования:
var uploadForm = document.querySelector('.img-upload__form');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
var buttonUploadOverlayClose = uploadForm.querySelector('.img-upload__cancel');


var escOverlayPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    uploadOverlayClose();
  }
};

var uploadOverlayOpen = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escOverlayPress);
};

var uploadOverlayClose = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escOverlayPress);
  uploadFileInput.value = '';
};

uploadFileInput.addEventListener('change', function () {
  uploadOverlayOpen();
});

buttonUploadOverlayClose.addEventListener('click', function () {
  uploadOverlayClose();
});

// Обработчик - показ выбранной фотографии в полноэкранном режиме:
// Пока не сделал

// Применение эффекта для изображения:
var effectLevel = document.querySelector('.effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

// Перемещаем пин фильтра:
effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var positionLine = effectLevelLine.getBoundingClientRect(); // Определяем координаты линии перемещения пин фильтра:
  var widthLine = positionLine.right - positionLine.left;
  var startPosition = {x: evt.clientX};

  var effectValue = function () {
    var parametrValue = Math.round((effectLevelPin.offsetLeft) * 100 / (widthLine));

    return parametrValue;
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {x: startPosition.x - moveEvt.clientX};
    startPosition = {x: moveEvt.clientX};
    if ((effectLevelPin.offsetLeft - shift.x) < 0) {
      effectLevelPin.style.left = 0 + 'px';
    } else if ((effectLevelPin.offsetLeft - shift.x) > widthLine) {
      effectLevelPin.style.left = widthLine + 'px';
    } else {
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
    }
    effectLevelDepth.style.width = effectValue() + '%';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    effectLevelValue.value = effectValue(); // Выходной параметр

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Наложение эффекта:
var effectsField = document.querySelector('.effects');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var currentClassEffect = '';

// Функция установки класса фильтра:
var setClassEffect = function (currentClass, currentEffects) {
  if (currentClass) {
    imgUploadPreview.classList.remove(currentClass);
  }

  if (currentEffects === 'effect-none') {
    currentClass = 'hidden';
    effectLevel.classList.add('hidden');
  } else if (currentEffects === 'effect-chrome') {
    currentClass = 'effects__preview--chrome';
    effectLevel.classList.remove('hidden');
  } else if (currentEffects === 'effect-sepia') {
    currentClass = 'effects__preview--sepia';
    effectLevel.classList.remove('hidden');
  } else if (currentEffects === 'effect-marvin') {
    currentClass = 'effects__preview--marvin';
    effectLevel.classList.remove('hidden');
  } else if (currentEffects === 'effect-phobos') {
    currentClass = 'effects__preview--phobos';
    effectLevel.classList.remove('hidden');
  } else if (currentEffects === 'effect-heat') {
    currentClass = 'effects__preview--heat';
    effectLevel.classList.remove('hidden');
  }

  imgUploadPreview.classList.add(currentClass);

  return currentClass;
};

effectsField.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'INPUT') {
    var targetId = evt.target.id;
  }

  currentClassEffect = setClassEffect(currentClassEffect, targetId);
});

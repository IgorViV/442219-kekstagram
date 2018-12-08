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
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

var escUserPicturePress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    userPictureClose();
  }
};

var userPictureOpen = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', escUserPicturePress);
};

var userPictureClose = function () {
  bigPicture.classList.add('hidden');
};

usersPictures.addEventListener('click', function (evt) {

  if (evt.target.tagName === 'IMG') {
    userPictureOpen();

    // Находим индекс выбранного элемента
    var arrParentTarget = usersPictures.querySelectorAll('.' + evt.target.parentNode.className);

    for (var l = 0; l < arrParentTarget.length; l++) {

      if (arrParentTarget[l] === evt.target.parentNode) {
        var indexTarget = l;
      }
    }

    bigPicture.querySelector('.big-picture__img img').src = usersDescriptionPhotoList[indexTarget].url;
    bigPicture.querySelector('.likes-count').textContent = usersDescriptionPhotoList[indexTarget].likes;
    bigPicture.querySelector('.comments-count').textContent = usersDescriptionPhotoList[indexTarget].comments.length;
    bigPicture.querySelector('.social__caption').textContent = usersDescriptionPhotoList[indexTarget].description;

  }
});

bigPictureCancel.addEventListener('click', userPictureClose);

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

// Выбираем файл для редактирования:
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

uploadFileInput.addEventListener('change', uploadOverlayOpen);

buttonUploadOverlayClose.addEventListener('click', uploadOverlayClose);

// Ищем все элементы input в блоке effects;
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectsField = document.querySelector('.effects');
var effectsRadio = effectsField.querySelectorAll('.effects__radio');
var effectLevel = document.querySelector('.effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
var setClass = '';
// Делаем начальный сброс: убираем checked в HTML элементах input (установлен на последнем фильтре);
for (var k = 0; k < effectsRadio.length; k++) {
  effectsRadio[k].removeAttribute('checked');
}

// Устанавливаем свойство checked на первом элементе;
effectsRadio[0].checked = true;
effectLevel.classList.add('hidden');

// Функция установки класса фильтра на фотографии с учетом выбранного фильтра
var setClassEffect = function (currentEffects) {
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.setAttribute('class', 'img-upload__preview');

  if (currentEffects !== 'effect-none') {
    var arrString = currentEffects.split('-');
    var newNameClass = arrString[0] + '__preview--' + arrString[arrString.length - 1];
    imgUploadPreview.classList.add(newNameClass);
    effectLevel.classList.remove('hidden');
  } else {
    effectLevel.classList.add('hidden');
    // Устанавливаем все фильтры в исходное состояние:
    depthEffect(0, 'effect-chrome');
    depthEffect(0, 'effect-sepia');
    depthEffect(0, 'effect-marvin');
    depthEffect(0, 'effect-phobos');
    depthEffect(35, 'effect-heat');
  }
};

// Функция определения ширины линии регулирования интенсивности эффекта
var widthRegulation = function () {
  var widthLine = effectLevelLine.getBoundingClientRect().right - effectLevelLine.getBoundingClientRect().left;

  return widthLine;
};

// Функция установки пин слайдера в исходное состояние - 100%
var setInitialPin = function () {
  effectLevelPin.style.left = widthRegulation() + 'px';
  effectLevelDepth.style.width = effectValue() + '%';
};

// Функция расчета величины интенсивности эффекта в зависимости от положения ПИН регулятора
var effectValue = function () {
  var parametrValue = Math.round((effectLevelPin.offsetLeft) * 100 / widthRegulation());

  return parametrValue;
};

// Функция установки интенсивности эффекта выбранного фильтра:
var depthEffect = function (setDepth, setEffect) {
  var setValue = 0;

  if (setEffect === 'effect-chrome') {
    setValue = 'grayscale(' + setDepth / 100 + ')';
  } else if (setEffect === 'effect-sepia') {
    setValue = 'sepia(' + setDepth / 100 + ')';
  } else if (setEffect === 'effect-marvin') {
    setValue = 'invert(' + setDepth + '%)';
  } else if (setEffect === 'effect-phobos') {
    setValue = 'blur(' + (setDepth / 100) * 3 + 'px)';
  } else if (setEffect === 'effect-heat') {
    setValue = 'brightness(' + (setDepth / 100) * 3 + ')';
  }

  imgUploadPreview.style.filter = setValue;
  imgUploadPreview.style.WebkitFilter = setValue;
};


// Обработчик фыбора фильтра:
effectsField.addEventListener('click', function (evt) {

  if (evt.target.nodeName === 'INPUT') {
    setClass = evt.target.id; // имя выбранного фильтра

    // Вызываем функцию установки класса фильтра на фотографии с учетом выбранного фильтра
    setClassEffect(setClass);

    // Вызываем функцию установки пин слайдера в исходное состояние - 100%
    setInitialPin();

    // Сброс фильтра в исходное состояние
    depthEffect(100, setClass);
  }

});

// Обработчик перемещения ползунка фильтра:
effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var widthLine = effectLevelLine.getBoundingClientRect().right - effectLevelLine.getBoundingClientRect().left;
  var startPosition = {x: evt.clientX};

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {x: startPosition.x - moveEvt.clientX};
    startPosition = {x: moveEvt.clientX};
    if ((effectLevelPin.offsetLeft - shift.x) < 0) {
      effectLevelPin.style.left = 0 + 'px';
    } else if ((effectLevelPin.offsetLeft - shift.x) > widthRegulation()) {
      effectLevelPin.style.left = widthLine + 'px';
    } else {
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
    }
    effectLevelDepth.style.width = effectValue() + '%';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    // Величина выбранной насыщенности эффекта
    effectLevelValue.value = effectValue();

    // Устанавливаем интенсивность фильтра взависимости от положения ползунка
    depthEffect(effectLevelValue.value, setClass);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

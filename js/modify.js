'use strict';
// Модуль редактирования фотографии
(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectsField = document.querySelector('.effects');
  var effectsRadio = effectsField.querySelectorAll('.effects__radio');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var setClass = '';

  // Делаем начальный сброс: убираем checked в переключателях фильтров (установлен на последнем фильтре);
  for (var k = 0; k < effectsRadio.length; k++) {
    effectsRadio[k].removeAttribute('checked');
  }

  // Устанавливаем свойство checked на первом переключателе "Оригинал":
  effectsRadio[0].checked = true;
  effectLevel.classList.add('hidden');

  // Функция установки класса на фотографии с учетом выбранного фильтра
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
    return effectLevelLine.getBoundingClientRect().right - effectLevelLine.getBoundingClientRect().left;
  };

  // Функция установки ПИН регулятора в исходное состояние - 100%
  var setInitialPin = function () {
    effectLevelPin.style.left = widthRegulation() + 'px';
    effectLevelDepth.style.width = effectValue() + '%';
  };

  // Функция расчета величины интенсивности эффекта в зависимости от положения ПИН регулятора
  var effectValue = function () {
    return Math.round((effectLevelPin.offsetLeft) * 100 / widthRegulation());
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

  // Вибираем фильтр:
  effectsField.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      setClass = evt.target.id;
      setClassEffect(setClass);
      // Вызываем функцию установки пин слайдера в исходное состояние - 100%
      setInitialPin();
      // Сброс фильтра в исходное состояние
      depthEffect(100, setClass);
    }
  });

  // Перемещаем ПИН регулятора интенсивности фильтра:
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

  // Меняем масштаб изображения
  var buttonScaleSmaller = document.querySelector('.scale__control--smaller');
  var buttonScaleBigger = document.querySelector('.scale__control--bigger');
  var valueScaleControl = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var scaleToNumber = {
    '25%': 25,
    '50%': 50,
    '75%': 75,
    '100%': 100
  };

  // Устанавливаем масштаб по умолчанию
  valueScaleControl.setAttribute('value', '100%');
  imgPreview.style.transform = 'scale(1.0)';

  // Функция изменения масштаба изображения на 25%
  var changeScale = function (towardUp, currentValue) {
    var newValue;
    if (scaleToNumber[currentValue] < 100 && towardUp) {
      newValue = scaleToNumber[currentValue] + 25;
    } else if ((scaleToNumber[currentValue] > 25 && !towardUp)) {
      newValue = scaleToNumber[currentValue] - 25;
    } else {
      newValue = scaleToNumber[currentValue];
    }

    valueScaleControl.setAttribute('value', newValue + '%');
    imgPreview.style.transform = 'scale(' + newValue / 100 + ')';
  };

  // Уменьшаем масштаб
  buttonScaleSmaller.addEventListener('click', function () {
    changeScale(false, valueScaleControl.getAttribute('value'));
  });

  // Увеличиваем масштаб
  buttonScaleBigger.addEventListener('click', function () {
    changeScale(true, valueScaleControl.getAttribute('value'));
  });

  //   2.1. Масштаб:

  // При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value.

  // Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%.

  // При изменении значения поля .scale__control--value изображению .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации effect-level задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

})();

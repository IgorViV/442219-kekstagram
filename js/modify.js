'use strict';
// Модуль редактирования фотографии
window.modify = (function () {
  var imgUpload = document.querySelector('.img-upload__wrapper');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var effectsField = imgUpload.querySelector('.effects');
  var effectsRadio = effectsField.querySelectorAll('.effects__radio');
  var effectLevel = imgUpload.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var setClass = '';

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
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-chrome');
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-sepia');
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-marvin');
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-phobos');
      depthEffect(window.utilities.EFFECT_BRIGHTNESS_RANGE_FIRST, 'effect-heat');
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
    effectLevelValue.setAttribute('value', window.utilities.EFFECT_VALUE_MAX);
  };

  // Функция расчета величины интенсивности эффекта в зависимости от положения ПИН регулятора
  var effectValue = function () {
    return Math.round((effectLevelPin.offsetLeft) * window.utilities.EFFECT_RANGE_LAST / widthRegulation());
  };

  // Функция установки интенсивности эффекта выбранного фильтра:
  var depthEffect = function (setDepth, setEffect) {
    var setValue = 0;

    if (setEffect === 'effect-chrome') {
      setValue = 'grayscale(' + setDepth / window.utilities.EFFECT_RANGE_LAST + ')';
    } else if (setEffect === 'effect-sepia') {
      setValue = 'sepia(' + setDepth / window.utilities.EFFECT_RANGE_LAST + ')';
    } else if (setEffect === 'effect-marvin') {
      setValue = 'invert(' + setDepth + '%)';
    } else if (setEffect === 'effect-phobos') {
      setValue = 'blur(' + (setDepth / window.utilities.EFFECT_RANGE_LAST) * window.utilities.EFFECT_SCALE_FACTOR + 'px)';
    } else if (setEffect === 'effect-heat') {
      setValue = 'brightness(' + (setDepth / window.utilities.EFFECT_RANGE_LAST) * window.utilities.EFFECT_SCALE_FACTOR + ')';
    }

    imgUploadPreview.style.filter = setValue;
    imgUploadPreview.style.WebkitFilter = setValue;
  };

  // Выбираем фильтр:
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
      if ((effectLevelPin.offsetLeft - shift.x) < window.utilities.EFFECT_RANGE_FIRST) {
        effectLevelPin.style.left = window.utilities.EFFECT_RANGE_FIRST + 'px';
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

  // Функция изменения масштаба изображения на 25%
  var changeScale = function (towardUp, currentValue) {
    var newValue;
    if (scaleToNumber[currentValue] < window.utilities.FILTER_SCALE_MAX && towardUp) {
      newValue = scaleToNumber[currentValue] + window.utilities.FILTER_SCALE_SHIFT;
    } else if ((scaleToNumber[currentValue] > window.utilities.FILTER_SCALE_MIN && !towardUp)) {
      newValue = scaleToNumber[currentValue] - window.utilities.FILTER_SCALE_SHIFT;
    } else {
      newValue = scaleToNumber[currentValue];
    }

    valueScaleControl.setAttribute('value', newValue + '%');
    imgPreview.style.transform = 'scale(' + newValue / window.utilities.FILTER_SCALE_MAX + ')';
  };

  // Уменьшаем масштаб
  buttonScaleSmaller.addEventListener('click', function () {
    changeScale(false, valueScaleControl.getAttribute('value'));
  });

  // Увеличиваем масштаб
  buttonScaleBigger.addEventListener('click', function () {
    changeScale(true, valueScaleControl.getAttribute('value'));
  });

  return { // Сброс всех фильтров
    resetFilter: function () {
      valueScaleControl.setAttribute('value', window.utilities.EFFECT_VALUE_MAX + '%');
      imgPreview.style.transform = 'scale(1.0)';

      // Делаем начальный сброс: убираем checked в переключателях фильтров (установлен на последнем фильтре);
      for (var k = 0; k < effectsRadio.length; k++) {
        effectsRadio[k].removeAttribute('checked');
      }

      // Устанавливаем свойство checked на первом переключателе "Оригинал":
      effectsRadio[0].checked = true;
      effectLevel.classList.add('hidden');

      // Вызываем функцию установки пин слайдера в исходное состояние - 100%
      setInitialPin();

      // Устанавливаем все фильтры в исходное состояние:
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-chrome');
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-sepia');
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-marvin');
      depthEffect(window.utilities.EFFECT_RANGE_FIRST, 'effect-phobos');
      depthEffect(window.utilities.EFFECT_BRIGHTNESS_RANGE_FIRST, 'effect-heat');
    }
  };
})();

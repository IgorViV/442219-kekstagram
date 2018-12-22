'use strict';
// Модуль общих функций
window.utilities = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    TIME_OUT_SEND: 10000, // window.utilities.TIME_OUT_SEND
    TIME_OUT_DEBOUNCE: 500, // window.utilities.TIME_OUT_DEBOUNCE
    HASHTAG_LENGTH_MIN: 2, // window.utilities.HASHTAG_LENGTH_MIN
    HASHTAG_LENGTH_MAX: 20, // window.utilities.HASHTAG_LENGTH_MAX
    HASHTAGS_SUM_MAX: 5, // window.utilities.HASHTAGS_SUM_MAX
    DESCRIPTION_LENGTH_MAX: 140, // window.utilities.DESCRIPTION_LENGTH_MAX
    CODE_SUCCESS: 200, // window.utilities.CODE_SUCCESS
    CODE_NOT_FROUND_ERROR: 404, // window.utilities.CODE_NOT_FROUND_ERROR
    CODE_BAD_REQUEST: 400, // window.utilities.CODE_BAD_REQUEST
    CODE_UNAUTHORIZED: 401, // window.utilities.CODE_UNAUTHORIZED
    COMMENTS_SUM_MAX: 5, // window.utilities.COMMENTS_SUM_MAX
    FILTER_NEW_MIN: 0, // window.utilities.FILTER_NEW_MIN
    FILTER_NEW_MAX: 15, // window.utilities.FILTER_NEW_MAX
    FILTER_NEW_SHIFT: 10, // window.utilities.FILTER_NEW_SHIFT
    ERROR_POSITIN_INDEX: '3', // window.utilities.ERROR_POSITIN_INDEX
    EFFECT_RANGE_FIRST: 0, // window.utilities.EFFECT_RANGE_FIRST
    EFFECT_BRIGHTNESS_RANGE_FIRST: 33, // window.utilities.EFFECT_BRIGHTNESS_RANGE_FIRST
    EFFECT_RANGE_LAST: 100, // window.utilities.EFFECT_RANGE_LAST
    EFFECT_VALUE_MAX: '100', // window.utilities.EFFECT_VALUE_MAX
    EFFECT_SCALE_FACTOR: 3, // window.utilities.EFFECT_SCALE_FACTOR
    FILTER_SCALE_MAX: 100, // window.utilities.FILTER_SCALE_MAX
    FILTER_SCALE_MIN: 25, // window.utilities.FILTER_SCALE_MIN
    FILTER_SCALE_SHIFT: 25, // window.utilities.FILTER_SCALE_SHIFT
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInteger: function (minNumber, maxNumber) {
      return Math.floor(minNumber + Math.random() * (maxNumber - minNumber));
    },
    getMaxElement: function (arr) {
      return Math.max.apply(null, arr);
    }
  };
})();

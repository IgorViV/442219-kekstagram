'use strict';

(function () {
  var sectionPictures = document.querySelector('.pictures');

  var onLoad = function (arrPictures) {
    var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      var userPicture = userPictureTemplate.cloneNode(true);
      userPicture.querySelector('.picture__img').src = arrPictures[i].url;
      userPicture.querySelector('.picture__likes').textContent = arrPictures[i].likes;
      userPicture.querySelector('.picture__comments').textContent = arrPictures[i].comments.length;

      fragment.appendChild(userPicture);
    }

    sectionPictures.appendChild(fragment);
  };

  window.backend.upload(onLoad);

})();

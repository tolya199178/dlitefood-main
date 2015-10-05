'use strict';

var module = angular.module('dLiteMeAdmin');

module.factory('imageUploadFactory', [ function ($resource) {
  var url = $.cloudinary.url('merchantAlbum', {format: 'json', type: 'list'});
  url = url + '?' + Math.ceil(new Date().getTime() / 1000);

  return $resource(url, {}, {
    photos: {method: 'GET', isArray: false}
  });
}]);

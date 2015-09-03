'use strict';

angular.module('dLiteMeAdmin')
  .controller('TrackerCtrl', function ($scope, uiGmapGoogleMapApi) {
    $scope.message = 'Hello';

    $scope.markers = [];

    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8
    }

    uiGmapGoogleMapApi.then( function (maps) {
      console.log('Loading maps');
    });
  })

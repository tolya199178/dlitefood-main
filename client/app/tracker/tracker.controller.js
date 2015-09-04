'use strict';

angular.module('dLiteMeAdmin')
  .controller('TrackerCtrl', function ($scope, $state) {
    $scope.active = {
      map: $state.includes('tracker.map'),
      street: $state.includes('tracker.street')
    }
  })

  .controller('TrackerMapCtrl', function ($scope) {
    $scope.markers = [];
    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8
    }
  })

  .controller('TrackerStreetCtrl', function ($scope) {
    
  });

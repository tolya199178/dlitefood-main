'use strict';

angular.module('dLiteMeAdmin')
  .controller('TrackerCtrl', function ($scope, $state) {
    $scope.active = {
      map: $state.includes('tracker.map'),
      street: $state.includes('tracker.street')
    }
  })

  .controller('TrackerMapCtrl', function ($scope, uiGmapGoogleMapApi) {
   
  })

  .controller('TrackerStreetCtrl', function ($scope, uiGmapGoogleMapApi) {
    
  });

'use strict';

angular.module('dLiteMeAdmin')
  .controller('HomeCtrl', function ($scope, $http, socket) {

  }).controller('chartJsCtrl', function ($scope) {

      $scope.labels  = [ "January", "February", "March", "April", "May", "June", "July" ],
      $scope.series = ['Orders', 'Users'];

      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40], //TODO: Obtain actual data from DB. *Orders*
        [28, 48, 40, 19, 86, 27, 90]  // TODO: Obtain actual data from DB. *Users*
      ];

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

  });

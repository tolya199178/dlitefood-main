'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tracker', {
        url: '/tracker',
        templateUrl: 'app/tracker/tracker.html',
        controller: 'TrackerCtrl'
      });
  });

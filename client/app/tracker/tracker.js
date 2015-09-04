'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tracker', {
        abstract: true,
        url: '/tracker',
        templateUrl: 'app/tracker/tracker.html',
        controller: 'TrackerCtrl'
      })
      .state('tracker.map', {
        url: '/tracker/map',
        views: {
          tracker_map: {
            templateUrl: "app/tracker/subviews/map.html",
            controller: 'TrackerMapCtrl'
          }
        }
      })
      .state('tracker.street', {
        url: '/tracker/street',
        views: {
          tracker_street: {
            templateUrl: "app/tracker/subviews/street.html",
            controller: 'TrackerStreetCtrl'
          }
        }
      })
  });

'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'HomeCtrl'
      });
  });

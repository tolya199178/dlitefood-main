'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'usersCtrl'
      });
  });

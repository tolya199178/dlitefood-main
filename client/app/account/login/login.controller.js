'use strict';

angular.module('dLiteMeAdmin')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {
      phoneno: '07701057692',
      password: 'tolulope'
    };
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          phoneno: $scope.user.phoneno,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });

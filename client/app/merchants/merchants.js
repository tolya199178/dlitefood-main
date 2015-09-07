'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchants', {
        url: '/merchants',
        templateUrl: 'app/merchants/merchants.html',
        controller: 'MerchantsCtrl'
      });
  });

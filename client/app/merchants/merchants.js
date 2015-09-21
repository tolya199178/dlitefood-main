'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchants', {
        url: '/merchants/list',
        templateUrl: 'app/merchants/subviews/merchants.html',
        controller: 'MerchantsCtrl'
      })

  });

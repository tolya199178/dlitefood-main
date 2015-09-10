'use strict';

angular.module('dLiteMeAdmin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchants', {
        url: '/merchants',
        templateUrl: 'app/merchants/merchants.html',
        controller: 'MerchantsCtrl'
      })
      .state('merchants-list', {
        url: '/merchant/list',
        templateUrl: 'app/merchants/subviews/merchants-list.html',
        controller: 'MerchantsCtrl'
      });
  });

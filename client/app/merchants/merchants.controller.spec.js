'use strict';

describe('Controller: MerchantsCtrl', function () {

  // load the controller's module
  beforeEach(module('dLiteMeAdmin'));

  var MerchantsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MerchantsCtrl = $controller('MerchantsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

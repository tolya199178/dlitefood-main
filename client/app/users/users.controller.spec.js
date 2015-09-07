'use strict';

describe('Controller: usersCtrl', function () {

  // load the controller's module
  beforeEach(module('dLiteMeAdmin'));

  var UsersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersCtrl = $controller('usersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

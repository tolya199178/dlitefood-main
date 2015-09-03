'use strict';

describe('Controller: TrackerCtrl', function () {

  // load the controller's module
  beforeEach(module('jffAdminApp'));

  var TrackerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrackerCtrl = $controller('TrackerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

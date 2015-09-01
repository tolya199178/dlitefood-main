angular.module('dLiteMeAdmin')
	.controller('ManageStaffCtrl', function($scope, $http, socket) {

    $scope.filterOption = [
      {name: 'Staff ID'},
      {name: 'Active Most'},
      {name: 'Less Active'},
      {name: 'Date'}
    ];

	});

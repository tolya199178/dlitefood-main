/**
 * User Controller
 * @param $scope
 * @param $modal
 * @constructor
 */
function usersCtrl($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.editUser = function () {

    var modalInstance = $modal.open({
      templateUrl: 'app/users/subviews/editUsers.html',
      controller: ModalInstanceCtrl,
      windowClass: 'animated fadeIn',
      resolver: {
        items: function () {
          return $scope.items;
        }
      }
    });



    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  }

}

/**
 * Modal Instance Controller
 * @param $scope
 * @param $modalInstance
 * @param items
 * @constructor
 */


var ModalInstanceCtrl = function($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };


  $scope.ok = function () {
    $modalInstance.close($scope.selected.items);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}



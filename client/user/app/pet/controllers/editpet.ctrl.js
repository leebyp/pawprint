angular.module('user.pet.controllers')

  .controller('EditPetCtrl', function ($scope, $modalInstance, pet) {

    $scope.pet = pet;
    
    $scope.ok = function () {
      console.log('updated');
      $modalInstance.close($scope.pet);
    };

    $scope.cancel = function () {
      console.log('cancelled');
      $modalInstance.dismiss('cancel');
    };

  });
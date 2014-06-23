'use strict';

angular.module('pawprint.user.pet')

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
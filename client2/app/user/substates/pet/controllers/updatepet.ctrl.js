'use strict';

angular.module('pawprint.user.pet')

  .controller('UpdatePetCtrl', function ($scope, $modalInstance, pet, CurrentUserFactory) {

    $scope.userId = CurrentUserFactory.getUserId();
    $scope.pet = pet;
    $scope.request = {
      userId: $scope.userId,
      petId: $scope.pet.id,
      status: 'New'
    };
    
    $scope.ok = function () {
      console.log('updated');
      $modalInstance.close($scope.request);
    };

    $scope.cancel = function () {
      console.log('cancelled');
      $modalInstance.dismiss('cancel');
    };

  });
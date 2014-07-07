'use strict';

angular.module('user.pet.directives')

  .directive('pet', function (CurrentPetsService) {
    return {
      restrict: 'AE',
      scope: {
        pet: '=pet',
        requests: '=requests',
        vaccines: '=vaccines',
        index: '=index'
      },
      templateUrl: 'app/pet/templates/pet.tpl.html',
      link: function (scope) {
        scope.stopPropagation = function () {
          event.stopPropagation();
        };
        scope.editingPet = false;
        scope.editPet = function (tempPet) {
          scope.stopPropagation();
          scope.tempPet = angular.copy(tempPet);
          scope.editingPet = !scope.editingPet;
        };
        scope.savePet = function (index) {
          scope.stopPropagation();
          scope.editingPet = !scope.editingPet;
          CurrentPetsService.savePet(index);
        };
        scope.cancelEdit = function () {
          scope.stopPropagation();
          scope.editingPet = !scope.editingPet;
          scope.pet = scope.tempPet;
        };
        scope.updatePet = function (userId, index) {
          scope.stopPropagation();
          CurrentPetsService.updatePet(userId, index);
        };
        scope.cancelRequest = function (userId, petIndex, requestIndex) {
          CurrentPetsService.cancelRequest(userId, petIndex, requestIndex);
        };
      }
    };
  });
'use strict';

angular.module('user.pet.directives')

  .directive('pet', function (CurrentPetsService) {
    return {
      restrict: 'AE',
      scope: {
        pet: '=pet',
        requests: '=requests',
        vaccines: '=vaccines',
        index: '=index',
        userId: '=userId'
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

        scope.updatingPet = false;
        scope.updatePet = function () {
          scope.stopPropagation();
          scope.updatingPet = !scope.updatingPet;
        };
        scope.sendUpdate = function (petId, index, chosenVet, newVet) {
          scope.updatePet();
          var request = {
            pet_id: petId
          };
          if (chosenVet) {
            request.vet_id = chosenVet.id;
          }
          CurrentPetsService.updatePet(index, request, newVet);
        };
        scope.cancelUpdate = function () {
          scope.updatingPet = !scope.updatingPet;
        };
        
        scope.cancelRequest = function (petIndex, requestIndex) {
          CurrentPetsService.cancelRequest(petIndex, requestIndex);
        };
      }
    };
  });
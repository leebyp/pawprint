angular.module('user.main.controllers')

  .controller('MainCtrl', function ($scope, $modal, UserService, CurrentUserService, PetService, VaccineService, Restangular) {
    console.log($scope);
    console.log(CurrentUserService.getUserId());

    $scope.userId = CurrentUserService.getUserId();
    $scope.pets = [];
    $scope.vaccines = [];
    $scope.requests = [];
    $scope.checkExpiry = VaccineService.checkExpiry;

    PetService.getPets($scope.userId).then(function (pets) {
      $scope.pets = pets;

      for (var i=0; i<$scope.pets.length; i++){
        PetService.getPetVaccines($scope.userId, $scope.pets[i].id)
          .then(function (response) {
            $scope.vaccines.push(response);
          }, function (error) {
            console.log(error);
          });
        PetService.getPetRequests($scope.userId, $scope.pets[i].id)
          .then(function (response) {
            $scope.requests.push(response);
          }, function (error) {
            console.log(error);
          });
      }
    });
    
    $scope.cancelRequest = function (petIndex, requestIndex) {
      PetService.cancelPetRequest($scope.userId, $scope.pets[petIndex].id, $scope.requests[petIndex][requestIndex])
        .then(function (response) {
          $scope.requests[petIndex].splice(requestIndex, 1);
        }, function (error) {
          console.log(error);
        });
    };

    $scope.addPet = function () {

      var modalInstance = $modal.open({
        templateUrl: 'app/pet/templates/editpet.tpl.html',
        controller: 'EditPetCtrl',
        resolve: {
          pet: function () {
            return {};
          }
        }
      });

      modalInstance.result.then(function (pet) {
        console.log(pet);
        PetService.postPet($scope.userId, pet).then(function (petResponse) {
          console.log('successfully created pet');
          console.log(petResponse);
          $scope.pets.push(petResponse);
          PetService.getPetVaccines($scope.userId, petResponse.id)
            .then(function (response) {
              $scope.vaccines.push(response);
            }, function (error) {
              console.log(error);
            });
          PetService.getPetRequests($scope.userId, petResponse.id)
            .then(function (response) {
              $scope.requests.push(response);
            }, function (error) {
              console.log(error);
            });
        }, function (error) {
          console.log(error);
        });
      });

    };

    $scope.editPet = function (index) {
    
      console.log($scope.pets[index]);
      var modalInstance = $modal.open({
        templateUrl: 'app/pet/templates/editpet.tpl.html',
        controller: 'EditPetCtrl',
        resolve: {
          pet: function () {
            return Restangular.copy($scope.pets[index]);
          }
        }
      });

      modalInstance.result.then(function (pet) {
        console.log(pet);
        pet.put().then(function (response) {
          console.log(response);
          $scope.pets[index] = response;
        }, function (error) {
          console.log(error);
        });
      }, function () {
        console.log('Modal dismissed');
      });

    };

    $scope.updatePet = function (index) {

      var modalInstance = $modal.open({
        templateUrl: 'app/pages/templates/updatepet.tpl.html',
        controller: 'UpdatePetCtrl',
        resolve: {
          pet: function () {
            return $scope.pets[index];
          }
        }
      });

      modalInstance.result.then(function (request) {
        PetService.postPetRequest(request.userId, request.petId, request).then(function (response) {
          console.log('successfully sent pet update request');
          console.log($scope.requests, 'requests');
          $scope.requests[index].push(response);
          console.log($scope.requests[index], 'PET REQUESTS.....');
        }, function (error) {
          console.log(error);
        });
      });

    };

  });

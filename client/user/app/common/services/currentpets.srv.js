angular.module('user.common.services')

  .service('CurrentPetsService', function ($q, PetRESTService, VaccineService, Restangular, $modal) {

    var pets = {
      pets: [],
      vaccines: [],
      requests: []
    };

    function retrievePets (userId) {

      return PetRESTService.getPets(userId)
        .then(function (petsResult) {

          pets.pets = petsResult;
          var vaccinePromises = [];

          angular.forEach(pets.pets, function (pet) {
            var deferred = $q.defer();
            PetRESTService.getPetVaccines(userId, pet.id)
              .then(function (response) {
                deferred.resolve(response);
              }, function (error) {
                deferred.reject();
              });
            vaccinePromises.push(deferred.promise);
          });

          return $q.all(vaccinePromises);
        })
        .then(function (vaccinesResult) {

          pets.vaccines = vaccinesResult;
          var requestPromises = [];

          angular.forEach(pets.pets, function (pet) {
            var deferred = $q.defer();
            PetRESTService.getPetRequests(userId, pet.id)
              .then(function (response) {
                deferred.resolve(response);
              }, function (error) {
                deferred.reject();
              });
            requestPromises.push(deferred.promise);
          });
      
          return $q.all(requestPromises);
        })
        .then(function (requestsResult) {

          pets.requests = requestsResult;
          return pets;
        });
    }

    function getPets () {
      return pets;
    }

    function cancelRequest (userId, petIndex, requestIndex) {
      PetRESTService.cancelPetRequest(userId, pets.pets[petIndex].id, pets.requests[petIndex][requestIndex].id)
        .then(function (response) {
          pets.requests[petIndex].splice(requestIndex, 1);
        }, function (error) {
          console.log(error);
        });
    }

    function addPet(userId) {
      var newPet = {};
      pets.pets.push(newPet);
    }

    function savePet (index) {
      pets.pets[index].put().then(function (response) {
        pets.pets[index] = response;
      }, function (error) {
        console.log(error);
      });
    }

    function updatePet (userId, index) {

      var modalInstance = $modal.open({
        templateUrl: 'app/pet/templates/updatepet.tpl.html',
        controller: 'UpdatePetCtrl',
        resolve: {
          pet: function () {
            return pets.pets[index];
          }
        }
      });

      modalInstance.result.then(function (request) {
        //@DO post the vet and then get the vetid, and then use that to post with the vetid info
        PetRESTService.postPetRequest(request.user_id, request.pet_id, request).then(function (response) {
          console.log('successfully sent pet update request');
          console.log(pets.requests, 'requests');
          pets.requests[index].push(response);
          console.log(pets.requests[index], 'PET REQUESTS.....');
        }, function (error) {
          console.log(error);
        });
      });

    }

    function updatePet (userId, index) {
      //need to confirm what to do here
    }

    this.retrievePets = retrievePets;
    this.getPets = getPets;
    this.cancelRequest = cancelRequest;
    this.addPet = addPet;
    this.savePet = savePet;
    this.updatePet = updatePet;

  });
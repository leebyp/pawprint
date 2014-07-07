angular.module('user.common.services')

  .service('CurrentPetsService', function ($q, PetRESTService, VetRESTService, VaccineService, Restangular, $modal) {

    var pets = {
      pets: [],
      vaccines: [],
      requests: []
    };

    var vets = {
      vets: []
    };

    var user = {
      id: null
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
          user.id = userId;
          return pets;
        });
    }

    function getPets () {
      return pets;
    }

    function cancelRequest (petIndex, requestIndex) {
      PetRESTService.cancelPetRequest(user.id, pets.pets[petIndex].id, pets.requests[petIndex][requestIndex].id)
        .then(function (response) {
          pets.requests[petIndex].splice(requestIndex, 1);
        }, function (error) {
          console.log(error);
        });
    }

    function addPet() {
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

    function updatePet (index, request, newVet) {

      request.user_id = user.id;
      if (!request.vet_id) {
        VetRESTService.postVet(newVet).then(function (vet) {
          vets.vets.push(vet);
          request.vet_id = vet.id;
          PetRESTService.postPetRequest(user.id, pets.pets[index].id, request).then(function (response) {
            console.log('successfully sent pet update request');
            pets.requests[index].push(response);
          }, function (error) {
            console.log(error);
          });
        });
      } else {
        PetRESTService.postPetRequest(user.id, pets.pets[index].id, request).then(function (response) {
          console.log('successfully sent pet update request');
          pets.requests[index].push(response);
        }, function (error) {
          console.log(error);
        });
      }

    }

    this.retrievePets = retrievePets;
    this.getPets = getPets;
    this.cancelRequest = cancelRequest;
    this.addPet = addPet;
    this.savePet = savePet;
    this.updatePet = updatePet;

  });
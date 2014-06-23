angular.module('user.common.services')

  .service('PetService', function (Restangular) {

    function postPet (id, data) {
      return Restangular.one('user', id).all('pets').post(data);
    }

    function getPets (id) {
      return Restangular.one('user', id).all('pets').getList();
    }

    function getPetVaccines (userId, petId) {
      return Restangular.one('user', userId).one('pets', petId).all('vaccines').getList();
    }

    function postPetRequest (userId, petId, data) {
      return Restangular.one('user', userId).one('pets', petId).all('requests').post(data);
    }

    function getPetRequests (userId, petId) {
      return Restangular.one('user', userId).one('pets', petId).all('requests').getList();
    }

    function cancelPetRequest (userId, petId, requestId) {
      return Restangular.one('user', userId).one('pets', petId).one('requests', requestId).remove();
    }

    this.postPet = postPet;
    this.getPets = getPets;
    this.getPetVaccines = getPetVaccines;
    this.postPetRequest = postPetRequest;
    this.getPetRequests = getPetRequests;
    this.cancelPetRequest = cancelPetRequest;

  });
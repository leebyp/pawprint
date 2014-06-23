'use strict';

angular.module('pawprint.user')

  .factory('PetFactory', function (Restangular, $http) {

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

    return {
      postPet: postPet,
      getPets: getPets,
      getPetVaccines: getPetVaccines,
      postPetRequest: postPetRequest,
      getPetRequests: getPetRequests,
      cancelPetRequest: cancelPetRequest
    };

  });
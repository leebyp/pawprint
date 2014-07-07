angular.module('user.common.services')

  .service('VetRESTService', function (Restangular) {

    function retrieveVets () {
      return Restangular.all('user').all('vets').getList();
    }

    function postVet (vet) {
      return Restangular.all('user').all('vets').post(vet);
    }

    this.retrieveVets = retrieveVets;
    this.postVet = postVet;

  });

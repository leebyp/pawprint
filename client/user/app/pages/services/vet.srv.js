angular.module('user.pages.services')

  .factory('VetFactory', function ($http, Restangular) {

    function getVets () {
      return Restangular.all('vets').getList().then(function (vets){
        return vets;
      });
    }

    //==========================================//
    //@NOTE dummy functions returning dummy data//
    //==========================================//

    function getVets () {
      return [
        {
          practiceName: 'abc',
          website: 'abc',
          streetAddress: 'abc',
          city: 'abc',
          zip: '123',
          phone: '123'
        },
        {
          practiceName: 'abc',
          website: 'abc',
          streetAddress: 'abc',
          city: 'abc',
          zip: '123',
          phone: '123'
        },
        {
          practiceName: 'abc',
          website: 'abc',
          streetAddress: 'abc',
          city: 'abc',
          zip: '123',
          phone: '123'
        }
      ];
    }

    return {
      getVets: getVets
    };

  });

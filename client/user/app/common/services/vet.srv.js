angular.module('user.common.services')

  .service('VetService', function (Restangular) {

    // function getVets () {
    //   return Restangular.all('vets').getList().then(function (vets){
    //     return vets;
    //   });
    // }

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

  this.getVets = getVets;

  });

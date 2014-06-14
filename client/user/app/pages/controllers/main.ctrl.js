angular.module('user.pages.controllers')
  .controller('MainCtrl', function ($scope) {
    console.log($scope);

    // @TODO retrieve properly though GET request
    // only showing expected outcome here!!
    $scope.pets = [
      {
        pet: {
          id: '123',
          name: 'Apple',
          birthdate: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vaccine: [
          {
            id: '456',
            name: 'bordetella',
            expiration: '3years',
            dateAdministered: '2013-10-09',
            dateExpired: '2014-10-09'
          }
        ],
        status: {
          vaccine: 'active',
          update: 'normal'
        },
      },
      {
         pet: {
          id: '123',
          name: 'Apple',
          birthdate: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vaccine: [
          {
            id: '456',
            name: 'bordetella',
            expiration: '3years',
            dateAdministered: '2013-10-09',
            dateExpired: '2014-10-09'
          }
        ],
        status: {
          vaccine: 'expiring',
          update: 'normal'
        },
      },
      {
         pet: {
          id: '123',
          name: 'Apple',
          birthdate: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vaccine: [
          {
            id: '456',
            name: 'bordetella',
            expiration: '3years',
            dateAdministered: '2013-10-09',
            dateExpired: '2014-10-09'
          },
          {
            id: '456',
            name: 'rabies',
            expiration: '3years',
            dateAdministered: '2013-10-09',
            dateExpired: '2014-10-09'
          }
        ],
        status: {
          vaccine: 'expired',
          update: 'pending'
        },
      },
    ];

    $scope.expand = function(pet) {
      pet.show = !pet.show;
    };

    

  });
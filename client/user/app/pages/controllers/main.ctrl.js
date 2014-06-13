angular.module('user.pages.controllers')
  .controller('MainCtrl', function ($scope) {
    console.log($scope);

    // @TODO retrieve properly though GET request
    $scope.pets = [
      {
        name: 'Apple',
        age: 3,
        imgUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg',
        vet: 'Charlie',
        vaccineStatus: 'active',
        updateStatus: 'normal'
      },
      {
        name: 'Bowser',
        age: 3,
        imgUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg',
        vet: 'Charlie',
        vaccineStatus: 'expiring',
        updateStatus: 'pending'
      },
      {
        name: 'Baci',
        age: 4,
        imgUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg',
        vet: 'Charlie',
        vaccineStatus: 'expired',
        updateStatus: 'normal'
      }
    ];

    $scope.expand = function(pet) {
      pet.show = !pet.show;
    };

  });
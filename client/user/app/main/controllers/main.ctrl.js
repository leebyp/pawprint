angular.module('user.main.controllers')

  .controller('MainCtrl', function ($scope, AuthService, CurrentUserService, CurrentPetsService, VetRESTService, VaccineService) {
    console.log($scope);

    $scope.VaccineService = VaccineService;
    
    $scope.userId = AuthService.getCookie().get('userId');

    CurrentUserService.retrieveUser($scope.userId)
      .then(function (user){
        $scope.user = user;
      });
    
    CurrentPetsService.retrievePets($scope.userId)
      .then(function (pets) {
        $scope.pets = pets;
      });

    VetRESTService.retrieveVets()
      .then(function (vets) {
        $scope.vets = vets;
      });

  });

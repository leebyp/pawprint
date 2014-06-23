angular.module('user.landing.controllers')
  
  .controller('LandingCtrl', function ($scope) {
    console.log($scope);

    //Function added to prove that tests work. Can remove
    $scope.dogSpeak = 'woof';

  });
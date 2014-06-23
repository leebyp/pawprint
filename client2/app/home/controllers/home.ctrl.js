'use strict';

angular.module('pawprint.home')

  .controller('HomeCtrl', function ($scope) {
    console.log($scope);

    //Function added to prove that tests work. Can remove
    $scope.dogSpeak = 'woof';

  });
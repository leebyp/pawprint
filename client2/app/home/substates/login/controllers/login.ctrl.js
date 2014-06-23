'use strict';

angular.module('pawprint.home.login')

  .controller('LoginCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function () {
      UserFactory.postUserLogin($scope.user)
        .then(function (response) {
          CurrentUserFactory.setId(response.id);
          $state.go('restricted.user.main');
        }, function (error) {
          $scope.loginError = true;
        });
    };
    
  });
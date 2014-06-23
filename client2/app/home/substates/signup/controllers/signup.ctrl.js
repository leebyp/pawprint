'use strict';

angular.module('pawprint.home.signup')
  
  .controller('SignupCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userSignup = function () {
      UserFactory.postUserSignup($scope.user)
        .then(function (response) {
          CurrentUserFactory.setId(response.id);
          $state.go('restricted.user.profile');
        }, function (error) {
          console.log(error);
          $scope.signupError = true;
        });
    };

  });
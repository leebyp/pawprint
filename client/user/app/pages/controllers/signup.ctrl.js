angular.module('user.pages.controllers')
  
  .controller('SignupCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userSignup = function () {
      UserFactory.postUserSignup($scope.user)
        .then(function (response) {
          CurrentUserFactory.setUserId(response.id);
          $state.go('app.profile');
        }, function (error) {
          console.log(error);
          $scope.signupError = true;
        });
    };

  });
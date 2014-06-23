angular.module('user.signup.controllers')
  
  .controller('SignupCtrl', function ($scope, $state, UserService, CurrentUserService) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userSignup = function () {
      UserService.postUserSignup($scope.user)
        .then(function (response) {
          CurrentUserService.setUserId(response.id);
          $state.go('app.profile');
        }, function (error) {
          console.log(error);
          $scope.signupError = true;
        });
    };

  });
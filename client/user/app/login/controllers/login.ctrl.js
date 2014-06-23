angular.module('user.login.controllers')

  .controller('LoginCtrl', function ($scope, $state, UserService, CurrentUserService) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function () {
      UserService.postUserLogin($scope.user)
        .then(function (response) {
          CurrentUserService.setUserId(response.id);
          $state.go('app.main');
        }, function (error) {
          $scope.loginError = true;
        });
    };
    
  });
angular.module('user.profile.controllers')
  .controller('ProfileCtrl', function ($scope, $state, UserService, CurrentUserService) {
    console.log($scope);

    $scope.userId = CurrentUserService.getUserId();
    UserService.getUser($scope.userId).then(function (response) {
      // console.log(response);
      $scope.user = response;
    });

    $scope.updateUser = function() {
      // console.log('=================');
      // console.log($scope.user);
      // console.log('=================');
      $scope.user.put().then(function (response) {
          console.log('successful put');
          // update the scope user to reflect db
          $scope.user = response;
          $scope.updateSuccess = true;
          $scope.updateError = false;
      }, function (error) {
        console.log(error);
        $scope.updateSuccess = false;
        $scope.updateError = true;
      });
    };
    
    $scope.deleteUser = function() {
      UserService.deleteUser($scope.userId).then(function (response) {
        console.log('deleted user');
        // @NOTE delete the local auth settings
        CurrentUserService.setUserId(null);
        $state.go('public.home');
      }, function (error) {
        console.log(error);
      });
    };

  });
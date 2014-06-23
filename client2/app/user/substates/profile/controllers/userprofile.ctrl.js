'use strict';

angular.module('pawprint.user.profile')
  .controller('UserProfileCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.userId = CurrentUserFactory.getUserId();
    UserFactory.getUser($scope.userId).then(function (response) {
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
      UserFactory.deleteUser($scope.userId).then(function (response) {
        console.log('deleted user');
        // @NOTE delete the local auth settings
        CurrentUserFactory.setUserId(null);
        $state.go('public.home');
      }, function (error) {
        console.log(error);
      });
    };

  });
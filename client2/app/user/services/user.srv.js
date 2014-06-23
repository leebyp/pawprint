'use strict';

angular.module('pawprint.user')

  .factory('UserFactory', function (Restangular, $http){

    function postUserSignup (data) {
      // return Restangular.all('user/signup').post(data);
      return Restangular.all('user').post(data);
    }

    function postUserLogin (data) {
      // return Restangular.all('user/login').post(data);
      return Restangular.all('user').post(data);
    }

    function getUser (id) {
      return Restangular.one('user', id).get();
    }

    function deleteUser (id) {
      return Restangular.one('user', id).remove();
    }

    return {
      postUserSignup: postUserSignup,
      postUserLogin: postUserLogin,
      getUser: getUser,
      deleteUser: deleteUser
    };

  });

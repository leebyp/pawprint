angular.module('user.common.services')

  .service('UserService', function (Restangular){

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

      this.postUserSignup = postUserSignup;
      this.postUserLogin = postUserLogin;
      this.getUser = getUser;
      this.deleteUser = deleteUser;

  });

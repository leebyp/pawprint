angular.module('user.common.services')

  .service('CurrentUserService', function () {

    var currentUser = null;

    function setUserId (userId) {
      currentUser = userId;
    }

    function getUserId () {
      return currentUser;
    }

    this.setUserId = setUserId;
    this.getUserId = getUserId;

  });
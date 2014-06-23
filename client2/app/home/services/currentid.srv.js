'use strict';

angular.module('pawprint.home')

  .factory('CurrentIdFactory', function () {

    var currentId = null;

    function setId (id) {
      currentId = id;
    }

    function getId () {
      return currentId;
    }

    return {
      setId: setId,
      getId: getId
    };

  });
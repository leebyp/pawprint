'use strict';

angular.module('admin.common.services')
  .service('vaccineService', function (Restangular, reqIDFactory) {

  function getAllVaccines(adminID) {
    return Restangular.one('admin', adminID).all('vaccines').getList();
  }

  this.getAllVaccines = getAllVaccines;
     
});
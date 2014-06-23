'use strict';

angular.module('pawprint', [
  'ui.router',
  'ui.bootstrap',
  'restangular',

  'pawprint.home',
  'pawprint.user'
  // 'pawprint.admin'
]);

angular.module('pawprint')
  .config(function ($locationProvider, $urlRouterProvider) {
    
    // routes to default state if none provided
    $urlRouterProvider.otherwise('/');

    // enable the HTML5 push/pop history API  
    // disabled to run locally with SimpleHTTPServer
    // $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });
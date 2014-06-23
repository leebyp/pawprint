'use strict';

angular.module('user', [
  'ui.router',
  'ui.bootstrap',
  'restangular',

  'user.common',
  'user.landing',
  'user.login',
  'user.main',
  'user.pet',
  'user.profile',
  'user.signup'
]);

angular.module('user')
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
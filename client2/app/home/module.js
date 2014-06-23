'use strict';

angular.module('pawprint.home', [

  'pawprint.home.login',
  'pawprint.home.signup'
]);

angular.module('pawprint.home')
  .config(function ($stateProvider) {
    
    $stateProvider
      .state('public', {
        abstract: true,
        url: '/',
        template: '<div ui-view class="container"></div>'
      })

      .state('public.home', {
        url: '',
        templateUrl: 'app/home/templates/home.tpl.html',
        controller: 'HomeCtrl'
      })

      .state('public.home.login', {
        url: 'login',
        templateUrl: 'app/home/substates/login/templates/login.tpl.html',
        controller: 'LoginCtrl'
      })

      .state('public.home.signup', {
        url: 'signup',
        templateUrl: 'app/home/substates/signup/templates/signup.tpl.html',
        controller: 'SignupCtrl'
      });

  });

angular.module('pawprint.home.login', []);
angular.module('pawprint.home.signup', []);
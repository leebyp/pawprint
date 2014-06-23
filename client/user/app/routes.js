angular.module('user')
  .config(function ($stateProvider) {

  // routing states, setting templates and controllers to use
  $stateProvider
    .state('public', {
      abstract: true,
      url: '/',
      template: '<div ui-view class="realm"></div>'
    })

    .state('public.landing', {
      url: '',
      templateUrl: 'app/landing/templates/landing.tpl.html',
      controller: 'LandingCtrl'
    })

    .state('public.login', {
      url: 'login',
      templateUrl: 'app/login/templates/login.tpl.html',
      controller: 'LoginCtrl'
    })

    .state('public.signup', {
      url: 'signup',
      templateUrl: 'app/signup/templates/signup.tpl.html',
      controller: 'SignupCtrl'
    })

    .state('app', {
      abstract: true,
      url: '/app',
      template: '<div ui-view class="container"></div>'
    })

    .state('app.main', {
      url: '',
      templateUrl: 'app/main/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('app.profile', {
      url: '^/profile',
      templateUrl: 'app/profile/templates/profile.tpl.html',
      controller: 'ProfileCtrl'
    });

  });
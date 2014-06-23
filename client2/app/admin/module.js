// top level app module generation, injecting .common and .pages dependencies
angular.module('user', [
  'ui.router',

  'user.common',
  'user.pages'
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
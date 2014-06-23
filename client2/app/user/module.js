'use strict';

angular.module('pawprint.user', [

  'pawprint.user.pet',
  'pawprint.user.profile'
]);

angular.module('pawprint.user')
  .config(function ($stateProvider) {

  // routing states, setting templates and controllers to use
  $stateProvider
    .state('restricted', {
      abstract: true,
      url: 'app/',
      template: '<div ui-view class="container"></div>'
    })

    .state('restricted.user', {
      url: 'user/',
      templateUrl: 'app/user/templates/user.tpl.html',
      controller: 'UserCtrl'
    })

    .state('restricted.user.profile', {
      url: '^/profile',
      templateUrl: 'app/user/substates/profile/templates/profile.tpl.html',
      controller: 'UserProfileCtrl'
    });

  });

angular.module('pawprint.user.pet', []);
angular.module('pawprint.user.profile', []);
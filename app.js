var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'auth/templates/login.html',
    controller: 'userController'
  });
  $routeProvider.when('/register', {
    templateUrl: 'auth/templates/register.html',
    controller: 'userController'
  });
  $routeProvider.when('/profile', {
    templateUrl: 'profile/templates/profile.html',
    controller: 'profileController'
  });
  $routeProvider.when('/meetings', {
    templateUrl: 'meetings/templates/meetings.html',
    controller: 'meetingsController'
  });
  $routeProvider.when('/createMeet', {
    templateUrl: 'meetings/templates/createMeet.html',
    controller: 'meetingsController'
  });
  $routeProvider.when('/meet', {
    templateUrl: 'meetings/templates/meet.html',
    controller: 'meetingsController'
  });

  $routeProvider.otherwise({redirectTo: '/login'});
}).run(function($rootScope, $templateCache) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });
});

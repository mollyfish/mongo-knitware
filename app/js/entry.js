require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var sweaterStreamApp = angular.module('SweaterStreamApp', ['ngRoute', 'ngCookies', 'base64']);
require('./filters/filters')(sweaterStreamApp);
require('./services/services')(sweaterStreamApp);
require('./controllers/controllers')(sweaterStreamApp);
require('./directives/directives')(sweaterStreamApp);

require('./sweaters/sweaters')(sweaterStreamApp);
require('./auth/auth')(sweaterStreamApp);

sweaterStreamApp.config(['$routeProvider', function($route) {
  $route
    .when('/sweaters', {
      templateUrl: '/templates/sweaters_view.html',
      controller: 'SweatersController'
    })
    .when('/allsweaters', {
      templateUrl: '/templates/all_sweaters.html',
      controller: 'AllSweatersController'
    })
    .when('/signup', {
      templateUrl: '/templates/auth_view_up.html',
      controller: 'SignupController'
    })
    .when('/signin', {
      templateUrl: '/templates/auth_view_in.html',
      controller: 'SigninController'
    })
    .otherwise({
      redirectTo: '/signup'
    })
}]);

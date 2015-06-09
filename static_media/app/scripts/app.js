'use strict';

/**
 * @ngdoc overview
 * @name sampleAppApp
 * @description
 * # sampleAppApp
 *
 * Main module of the application.
 */
angular
  .module('sampleAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'static/app/views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/courses', {
        templateUrl: 'static/app/views/courses.html',
        controller: 'AboutCtrl'
      })
      .when('/courses/wind-energy', {
        templateUrl: 'static/app/views/wind-energy.html',
        controller: 'AboutCtrl'
      })
      .when('/courses/wind-energy/tutorials', {
        templateUrl: 'static/app/views/tutorials.html',
        controller: 'AboutCtrl'
      })
      .when('/courses/wind-energy/assessments', {
        templateUrl: 'static/app/views/assessments.html',
        controller: 'AboutCtrl'
      })
      .when('/courses/wind-energy/assessments/online', {
        templateUrl: 'static/app/views/online.html',
        controller: 'OnlineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

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
  .config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/app/views/main.html',
        controller: 'MainCtrl'
      })

       .when('/delete_pue', {
        templateUrl: 'static/app/views/delete.html',
	controller: 'DeleteCtrl'

       })

      .when('/odl', {
        templateUrl: 'static/app/views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/servey', {
        templateUrl: 'static/app/views/servey.html',
        controller: 'SurveyCtrl'
      })

      .when('/about_us', {
        templateUrl: 'static/app/views/about2.html',

      })
       .when('/contact', {
        templateUrl: 'static/app/views/contact.html',

      })


      .when('/course/solar-generation', {
        templateUrl: 'static/app/views/tempcourse.html',

      })

	 .when('/course/tidal-energy', {
        templateUrl: 'static/app/views/tempcourse.html',

      })


	 .when('/course/biomas-energy', {
        templateUrl: 'static/app/views/tempcourse.html',

      })


      .when('/about/topic', {
        templateUrl: 'static/app/views/topic.html',
      })
      .when('/login', {
        templateUrl: 'static/app/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'static/app/views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/courses', {
        templateUrl: 'static/app/views/courses.html',
        controller: 'AboutCtrl'
      })
      .when('/feedback', {
        templateUrl: 'static/app/views/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .when('/courses/:categeory', {
        templateUrl: 'static/app/views/wind-energy.html',
        controller: 'AboutCtrl'
      })
      .when('/courses/:categeory/tutorials', {
        templateUrl: 'static/app/views/tutorials.html',
        controller: 'ChapterListCtrl'
      })

      .when('/courses/:categeory/tutorials/chapter_pdf/:path', {
        templateUrl: 'static/app/views/tutorials.html',
        controller: 'ChapterListCtrl'
      })
      .when('/courses/:categeory/tutorials/create-chapter', {
        templateUrl: 'static/app/views/create-chapter.html',
        controller: 'CreateChapterCtrl'
      })
      .when('/courses/:categeory/assessments/create_assessment', {
        templateUrl: 'static/app/views/create_assessment.html',
        controller: 'createAssessmentCtrl'
      })
      .when('/courses/:categeory/assessments', {
        templateUrl: 'static/app/views/assessments.html',
        controller: 'assessmentsCtrl'
      })
      .when('/courses/:categeory/assessments/:exam_name', {
        templateUrl: 'static/app/views/online.html',
        controller: 'OnlineCtrl'
      })
      .when('/admin', {
        templateUrl: 'static/app/views/admin.html',
        controller: 'adminCtrl' //located in login.js
      })
      .when('/exam_submit', {
        templateUrl: 'static/app/views/exam_submit.html',
        controller: 'submitExam' //located in login.js
      })
       .when('/logout', {
        templateUrl: 'static/app/views/admin.html',
        controller: 'logoutCtrl' //located in login.js
      })
      .otherwise({
        redirectTo: '/'
      });
  });

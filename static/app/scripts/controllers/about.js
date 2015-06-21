'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('assessmentsCtrl', function ($scope, $routeParams, $rootScope, $http,$location, $window, check_exam) {
        $rootScope.cat = $routeParams.categeory;

        if(!($rootScope.isAuthenticated)){
            alert('please login as user to access assignments');
            $location.path('/');
            return;
        }

        $scope.check_exam = check_exam;
        $http({
                    method: 'POST',
                    url: '/getExams',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                        'cat': $routeParams.categeory
                    }

              })
           .success(function (out) {
         	console.log('---------------->', JSON.parse(out.data).exam_list);
		
               $rootScope.exams = JSON.parse(out.data).exam_list;
               /*var exam_names = [];
               for(var temp in $rootScope.exams){
                   if(exam_names.indexOf($rootScope.exams[temp].exam_name) == -1){
                       exam_names.push($rootScope.exams[temp].exam_name)
                   }
               }
	      console.log('exams names---->', exam_names)
              $rootScope.exam_names = exam_names;*/
              $window.sessionStorage.setItem('exam_list', $rootScope.exams);

            })
            .error(function (data, status) {

        });
  });

'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('indexCtrl', function ($scope, $http, $rootScope, $window) {
        if(typeof $window.sessionStorage != 'undefined'){
            if(typeof $window.sessionStorage.user != 'undefined'){
                $rootScope.currentUser = JSON.parse($window.sessionStorage.getItem('user'));
                $rootScope.isAuthenticated = true;
                console.log("====>>>", $rootScope.currentUser)
            }
        }
  })
  .controller('logoutCtrl', function ($scope, $http, $rootScope, $window, $location) {
        if(typeof $window.sessionStorage != 'undefined'){
            $window.sessionStorage.clear();
            $rootScope.currentUser = {};
            $rootScope.isAuthenticated = false;
            console.log($rootScope.currentUser.access_exams)
            $location.path('/');
        }
  })
  .controller('LoginCtrl', function ($scope, $http, $rootScope, $window, $location) {

        $scope.submitLogin = function() {
            $scope.error_message = "";
            $http({
                method: 'POST',
                url: '/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email : $scope.formData.email,
                    password: $scope.formData.password
                },

            })
           .success(function (out) {
               console.log(out);
               if(out.status == 200){
                    $scope.error_message = "successfully logged in"
                    $rootScope.currentUser = out.data;
                    for(var k in  $rootScope.currentUser.access_exams){
                        $window.sessionStorage.setItem('present_exam', $rootScope.currentUser.access_exams[k])
                    }
                    console.log('present exam', $window.sessionStorage.getItem('present_exam'))
                    $rootScope.isAuthenticated = true;
                    $window.sessionStorage.setItem('user',JSON.stringify(out.data));
                    $location.path('/');
               }else{
                $scope.error_message = "useremail and password are wrong"
               }

            })
            .error(function (data, status) {

            });
		};
  })
   .controller('adminCtrl', function ($scope, $http, $location, $rootScope, $window) {
        $scope.submitLogin = function() {
            $http({
                method: 'POST',
                url: '/adminLogin',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email : $scope.formData.email,
                    password: $scope.formData.password
                },

            })
           .success(function (out) {
                $scope.error = "";
               if(out.status == 200){
                    $scope.error = "successfully logged in";
                    console.log(out.data, out.status)
                    $rootScope.currentUser = out.data;
                    $rootScope.isAuthenticated = true;
                    $window.sessionStorage.setItem('user',JSON.stringify(out.data));
                    $location.path('/');
               }else{
                $scope.error = "user email and password wrong";

               }
            })
            .error(function (data, status) {

            });
		};
  });


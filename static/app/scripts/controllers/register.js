'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('RegisterCtrl', function ($scope, $http, $rootScope, $location) {
        if($rootScope.currentUser.is_superuser == false){
            alert('please login as super user to create account');
            $location.path("/");
            return;
        }
        $scope.register = function(){
        $http({
            method: 'POST',
            url: '/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email : $scope.email,
                password: $scope.password,
            },
        })
       .success(function (out) {
           if(out.status == 200){
                $scope.error = out.error;
           }else{
                $scope.error = out.error;
           }
        })
        .error(function (data, status) {

        });
    };
  });

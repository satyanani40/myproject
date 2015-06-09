'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('RegisterCtrl', function ($scope, $http) {
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
               console.log(out);
            })
            .error(function (data, status) {

            });
        };
  });

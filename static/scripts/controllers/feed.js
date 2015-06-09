'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('FeedbackCtrl', function ($scope, $http) {
     $scope.submit_feedback = function(){
        $scope.error = "";
        $http({
            method: 'POST',
            url: '/feedback',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                content : $scope.content
            },

        })
        .success(function (out) {
          console.log(out);
          if(out.status == 200){
              $scope.error = "successfully submited";
          }else{
              $scope.error = "failed to submit request try again"
          }
        }).error(function (data, status) {

        });
     };
  });

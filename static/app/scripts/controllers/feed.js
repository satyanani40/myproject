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
            if($scope.content){
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
                    console.log('200 status')
                    $scope.error = "successfully submit";
                   }else{
                     console.log('status', out.status)
                     $scope.error = "failed to submit feed back try again";
                   }
                })
            }
        };
  });

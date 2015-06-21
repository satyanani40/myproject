'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('SurveyCtrl', function ($scope, $timeout) {
    $scope.hide_show = false;
    $scope.submitDetails = function(){
        console.log("details");
        $scope.json = JSON.stringify(
            [
                {
                    "question":"Enter your full name",
                    "answer":$scope.name
                },
                {
                    "question":"Please Share your e-mail address",
                    "answer":$scope.address
                },
                {
                    "question":"Please share your country name",
                    "answer":$scope.country
                },
                {
                    "question":"Overall, how well does our website meet your needs",
                    "answer":$scope.website
                },
                {
                    "question":"How easy was it to find what you were looking for on our website?",
                    "answer":$scope.looking
                },
                {
                    "question":"Did it take you more or less time than you expected to find what you were looking for on our website?",
                    "answer":$scope.expected
                },
                {
                    "question":"How visually appealing is our website?",
                    "answer":$scope.appealing
                },
                {
                    "question":"How easy is it to understand the information on our website?",
                    "answer":$scope.understand
                },
                {
                    "question":"How much do you trust the information on our website?",
                    "answer":$scope.information
                },
                {
                    "question":"How easy to answer the questions in the assessment session on our website?",
                    "answer":$scope.assessment
                },
                {
                    "question":"As a reader, I would classify myself as: *",
                    "answer":$scope.classify
                },
                {
                    "question":"How likely is it that you would recommend our website to a friend or colleague?",
                    "answer":$scope.recommend
                },
                {
                    "question":"Do you have any other comments about how we can improve our website?",
                    "answer":$scope.comments
                },
                {
                    "question":"Overall, were you satisfied with your experience at this university, neither satisfied nor dissatisfied with it, or dissatisfied with it?",
                    "answer":$scope.dissatisfied
                }
            ],null,"    "

        )
        console.log($scope.json);
	$scope.json = JSON.parse($scope.json)

	for(var temp in $scope.json){
		console.log($scope.json[temp].answer)
		if(typeof $scope.json[temp].answer == 'undefined'){
			console.log('not answered')
			$scope.json[temp].answer = "not answered"
		}else{
			console.log('answered')
		}
	}
        $timeout(function(){
            $scope.hide_show = true;
        },2000);


	 $http({
                    method: 'POST',
                    url: '/send_servey',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                        'data_servey': $scope.json
                    }

              })
                  .success(function (out) {
                 		console.log(out)
                 

            })




    }

  });

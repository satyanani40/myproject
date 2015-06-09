'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('OnlineCtrl', function ($scope, $window) {

    
    if($window.sessionStorage.length){
        $scope.questions = JSON.parse($window.sessionStorage.questions);
    }else{
        console.log(" empty questions")
        $scope.questions = [
            {
                _id : "1a",
                question : "what are you doing.?",
                a : "kali",
                b : "movie",
                c : "game",
                d : "jabar",
                e : "null",
                correct : "movie",
                bool_answered : false
            },
            {
                _id : "1b",
                question : "Who are you.?",
                a : "dog",
                b : "kkk",
                c : "man",
                d : "old dog",
                e : "null",
                correct : "man",
                bool_answered : false
            }
        ];

    }

    $scope.currentStep = 0;

 
    $scope.prevQuestion = function(questionId, questionAns){
        $scope.currentStep -= 1;
        
    }

    $scope.nextQuestion = function(questionId, questionAns){
        console.log("answer", questionAns)
        $scope.currentStep += 1;
        
    }

   

    $scope.clear_session = function(){
        $window.sessionStorage.clear();
        alert('clear')
    }

    $scope.save_answer = function(questionId, answer){
        console.log('hai',questionId, answer);
         for(var temp in $scope.questions){
            if($scope.questions[temp]._id == questionId){
                $scope.questions[temp].answered = answer;
                $scope.questions[temp].bool_answered = true;
                $window.sessionStorage.questions = JSON.stringify($scope.questions);
                return true;
            }
        }
    }

    $scope.submit_exam = function(){
        $scope.correct_answers = 0;
        $scope.wrong_answers = 0;
        $scope.total_answers = 0;
        for(var temp in $scope.questions){
            if($scope.questions[temp].correct ==  $scope.questions[temp].answered){
                $scope.correct_answers += 1;
            }else{
                $scope.wrong_answers += 1;

            }
        }
        $scope.total_answers = $scope.correct_answers+ $scope.wrong_answers;
    }
  
  });

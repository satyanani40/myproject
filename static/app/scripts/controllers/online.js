'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('OnlineCtrl', function ($scope, $window, $routeParams, $rootScope, $http) {

    if(!($rootScope.isAuthenticated)){
        alert('please login to write exam');
        $location.path('/')
    }

    $(document).ready(function(e) {
        var $worked = $("#worked");
        function update() {
            var myTime = $worked.html();
            var ss = myTime.split(":");
            var dt = new Date();
            dt.setHours(ss[0]);
            dt.setMinutes(ss[1]);
            dt.setSeconds(ss[2]);
            var dt2 = new Date(dt.valueOf() - 1000);
            var ts = dt2.toTimeString().split(" ")[0];
            if(ts == "00:00:00"){
                $scope.submit_exam();
            }
            $window.sessionStorage.setItem('time', ts)

            $worked.html(ts);
            setTimeout(update, 1000);
        }

        setTimeout(update, 1000);
    });


    if($window.sessionStorage.length){
            if(typeof $window.sessionStorage.questions != 'undefined'){
                $rootScope.questions = JSON.parse($window.sessionStorage.getItem('questions'));
                console.log($window.sessionStorage.getItem('time'));
                $rootScope.time = $window.sessionStorage.getItem('time');

            }else{

                $rootScope.cat = $routeParams.categeory;
                $http({
                        method: 'POST',
                        url: '/getExam',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        data: {
                            'cat': $routeParams.categeory,
                            'exam_name': $routeParams.exam_name
                        }

                }).success(function (out) {
                       $rootScope.questions = JSON.parse(out.data);
                       console.log('false')
                       for(var temp in $rootScope.questions){
                            $rootScope.questions[temp]['_id'] = $rootScope.questions[temp]['_id']['$oid']
                       }
                       $rootScope.time = $rootScope.questions[0]['time']
                       $window.sessionStorage.setItem('questions', JSON.stringify($rootScope.questions));
                       $window.sessionStorage.setItem('time', $rootScope.questions[0]['time']);
                       console.log($window.sessionStorage.getItem('time'))
                })
                .error(function (data, status) {

                });
            }


    }else{
        $rootScope.cat = $routeParams.categeory;
        $http({
                method: 'POST',
                url: '/getExam',
                headers: {
                    'Content-Type': 'application/json'
                },

                data: {
                    'cat': $routeParams.categeory,
                    'exam_name': $routeParams.exam_name
                }

        }).success(function (out) {
               $rootScope.questions = JSON.parse(out.data);
               for(var temp in $rootScope.questions){
                        $rootScope.questions[temp]['_id'] = $rootScope.questions[temp]['_id']['$oid'];
               }
               $window.sessionStorage.setItem('questions', JSON.stringify($rootScope.questions));
               $rootScope.time = $rootScope.questions[0]['time'];
               $window.sessionStorage.setItem('time', $rootScope.questions[0]['time']);
               console.log($window.sessionStorage.getItem('time'))

        })
        .error(function (data, status) {

        });
    }

    $scope.currentStep = 0;

 
    $scope.prevQuestion = function(questionId, questionAns){
        if($scope.currentStep == 0){
            alert('you can not go back ')
            return;
        }
        $scope.currentStep -= 1;
        
    }

    $scope.nextQuestion = function(questionId, questionAns){
        console.log("answer", questionAns)
        if($scope.currentStep == $rootScope.questions.length - 1){
            alert('you can not go farword ')
            return;
        }
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
        console.log('exam submitted')
        $scope.submitted = true;
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

        $window.sessionStorage.removeItem('questions');
        $window.sessionStorage.removeItem('time');

        $window.sessionStorage.setItem('total', $scope.total_answers);
        $window.sessionStorage.setItem('correct', $scope.correct_answers);
        $window.sessionStorage.setItem('min_pass', $rootScope.questions[0]['pass_mark']);

        if($scope.correct_answers >= $rootScope.questions[0]['pass_mark']){

            var user = JSON.parse($window.sessionStorage.getItem('user'));
            console.log(user)
            console.log('online exams ', $window.sessionStorage.getItem('exam_list'));
            var exam_list_to_next = $window.sessionStorage.getItem('exam_list')

            //console.log('exam_list==>', exam_list_to_next)
            exam_list_to_next = exam_list_to_next.split(",");
            //console.log('------after split', exam_list_to_next)
            var last_exam_accessed = user.access_exams[user.access_exams.length-1]
            //console.log('last access in user==>', last_exam_accessed)
            var index_value = exam_list_to_next.indexOf(last_exam_accessed)
            //console.log("index value", index_value)
            if (exam_list_to_next.length - 1 == index_value && index_value == -1){
                //console.log('last exam in list')
                return;
            }else{
                var next_access_exam_to = exam_list_to_next[index_value+1]
                console.log('save next exam ', next_access_exam_to)
                 $http({
                    method: 'POST',
                    url: '/updateList',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                        'exam_name': next_access_exam_to,
                        'email': user.email
                    }

                }).success(function (out) {
                    console.log(out);
                });
            }
        }

        $window.location.replace("http://python-dlpstaffs.rhcloud.com/#/exam_submit")
    }
  
  })
  .controller('submitExam', function ($scope, $window, $routeParams, $rootScope, $http, $location) {
        $scope.total_answers = $window.sessionStorage.getItem('total');
        console.log("total--------", $scope.total_answers);
        $scope.correct_answers = $window.sessionStorage.getItem('correct')
        console.log("correct----", $scope.correct_answers)
        $scope.pass_mark = $window.sessionStorage.getItem('min_pass');
        if($scope.correct_answers >= $scope.pass_mark){
            $scope.pass = true;
        }else{
            $scope.pass = false;
        }

        $window.sessionStorage.removeItem('min_pass');
        $window.sessionStorage.removeItem('total');
        $window.sessionStorage.removeItem('correct');
        $window.sessionStorage.clear();
        $rootScope.currentUser = {};
        $rootScope.isAuthenticated = false;
        console.log($rootScope.currentUser.access_exams)


        setInterval(function () {
            $location.path('/');
            //$window.location.replace("http://python-dlpstaffs.rhcloud.com/#/");
        }, 4000);
  })
  .service('check_exam', function($window) {

		this.get = function(exam) {
             var user = JSON.parse($window.sessionStorage.getItem('user'));
             console.log(user)
             if(user.access_exams.indexOf(exam) == -1){
                return false;
             }else{
                return true;
             }
		};
});

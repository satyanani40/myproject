'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('DeleteCtrl', function ($scope, $http) {
	$http({
                    method: 'POST',
                    url: '/get_all_users',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                    }

                }).success(function (out) {
       		   $scope.peoples_todelete = JSON.parse(out.peoples);
                });

	 $http({
                    method: 'POST',
                    url: '/get_all_chapters',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                    }

                }).success(function (out) {
                   $scope.chapters_todelete = JSON.parse(out.chapters);
                });


	$scope.delete_user = function(id){
		$scope.deleted_u = "";
		console.log(id);
		$http({
                    method: 'POST',
                    url: '/delete_users',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
			id: id			
                    }

                }).success(function (out) {
			console.log(out)
			if(out.status == true){
				$scope.deleted_u = "successfully deleted"
			}
			else{
				$scope.deleted_u = "failed to delete"
			}
                });
		
	}

	 $scope.delete_chapter = function(id){
                $scope.deleted_c = "";
                console.log(id);
                $http({
                    method: 'POST',
                    url: '/delete_chapter',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                        id: id
                    }

                }).success(function (out) {
                        console.log(out)
                        if(out.status == true){
                                $scope.deleted_c = "successfully deleted"
                        }
                        else{
                                $scope.deleted_c = "failed to delete"
                        }
                });

        }

	
	 $scope.delete_all_exams = function(){
                $scope.deleted = "";
                $http({
                    method: 'POST',
                    url: '/delete_all_exams',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                       
                    }

                }).success(function (out) {
                        console.log(out)
                        if(out.status == true){
                                $scope.deleted_e = "successfully deleted"
                        }
                        else{
                                $scope.deleted_e = "failed to delete"
                        }
                });

        }



  });



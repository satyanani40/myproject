'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('ChapterListCtrl', function ($scope, $http) {
        $scope.chapterArray = [];

        $http.get('/getAllChapters')
           .success(function (data) {
               console.log("return chapters data", data);
               for(var i=0; i<data.data.length; i++){
                $scope.chapterArray.push(data.data[i]);
                console.log("inse",$scope.chapterArray)
               }
               console.log("scope chapter", $scope.chapterArray);
            })
            .error(function (data, status) {
                console.log("chapter error")
            });
  });

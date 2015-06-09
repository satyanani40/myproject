var myApp = angular.module('myApp',[])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
})

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        data = JSON.stringify({'file':fd, 'data':'suresh'})
        $http.post(uploadUrl, data, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]).controller('myCtrl', ['$scope','$http',"fileUpload", function($scope, $http){
    
    $scope.uploadFile = function(){

        /*var file = $scope.myFile;
        var uploadUrl = '/chapter';
        fileUpload.uploadFileToUrl(file, uploadUrl);*/
            $http({
            method: 'POST',
            url: '/chapter',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                'chaptername': 'suresh',
                upload: $scope.file
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        })
       .success(function (out) {
           console.log(out);
        })
        .error(function (data, status) {

        });
    };


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
                username: $scope.username
            },

        })
       .success(function (out) {
           console.log(out);
        })
        .error(function (data, status) {

        });
    };

     $scope.create_exam = function(){

        /*var file = $scope.myFile;
        var uploadUrl = '/chapter';
        fileUpload.uploadFileToUrl(file, uploadUrl);*/
            $http({
            method: 'POST',
            url: '/create_exam',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                exam_name: 'exam1',
                upload: $scope.file
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        })
       .success(function (out) {
           console.log(out);
        })
        .error(function (data, status) {

        });
    };

}]);

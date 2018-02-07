angular.module("PowerGed")
    .controller("login", function ($scope, $http, $window) {
        $scope.loginClick = function () {
            var data = {
                name: $scope.name,
                password: $scope.password
            };
            $http.post('http://localhost:6969/login', data)
                .then(function(response){
                    console.log(response);
                    $window.location = '/';
                })
        }
    });
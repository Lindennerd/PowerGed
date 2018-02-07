angular.module("PowerGed")
    .controller("login", function ($scope, $http) {
        $scope.loginClick = function () {
            $http.post('http://localhost:6969/login', function () {
                var data = {
                    name: $scope.name,
                    password: $scope.password
                };
                
                // $window.location.href = '/';
            });
        }
    });
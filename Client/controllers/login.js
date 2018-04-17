angular.module("PowerGed")
    .controller("login", function ($scope, $location, authService) {

        $scope.loginClick = function () {
            var user = {
                username: $scope.username,
                password: $scope.password
            };
            authService.login(user)
                .then(function(user) {
                    localStorage.setItem('auth', user.data.token);
                    $location.path('/');
                })
                .catch(function(err) {
                    $scope.message = err.data;
                });
        }
    });
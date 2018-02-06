angular.module("PowerGed")
    .controller("login", function($window,$scope){
        $scope.login = function(){
            $window.location.href = '/';
        };
})
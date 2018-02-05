angular.module("PowerGed", [])
    .controller('login', function($scope, $http){
        $http.post("login").then(function(res){
            console.log("OK");
        })
})
var app = angular.module("PowerGed", ["ngRoute", "treeControl"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/viewer.html',
    })
    .when('/login', {
        templateUrl:"/views/login.html",
    });
});
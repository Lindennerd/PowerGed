var app = angular.module("PowerGed", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/home.html'
    })
})
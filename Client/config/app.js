var app = angular.module("PowerGed", ["ngRoute", "ui.tree"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/viewer.html',
    })
})
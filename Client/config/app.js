var app = angular.module("PowerGed", ["angularResizable", "ngRoute", "treeControl"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/viewer.html',
        title: 'POWER GED'
    })
    .when('/login', {
        templateUrl:"/views/login.html",
    });
});

/* GLOBAL VARS */

config = (function(){
    return {
        urls : {
            base: 'http://localhost:9085'
        }
    }
})();
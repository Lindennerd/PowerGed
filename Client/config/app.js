var app = angular.module("PowerGed", ["ngRoute", "treeControl", "ngMaterial"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/viewer.html',
    })
    .when('/login', {
        templateUrl:"/views/login.html",
    });
});

/* GLOBAL VARS */

config = (function(){
    return {
        urls : {
            base: 'http://localhost:6969'
        }
    }
})();
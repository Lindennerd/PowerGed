var app = angular.module("PowerGed", ["angularResizable", "ngRoute", "treeControl"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/viewer.html',
        title: 'POWER GED',
        resolve: {
            'check': function($location) {
                var token = localStorage.getItem('auth');
                if(!token) {
                    $location.path('/login');
                }
            }
        }
    })
    .when('/login', {
        templateUrl:"views/login.html"
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.run(function($http) {
    $http.defaults.headers.common['x-access-token'] = localStorage.getItem('auth');
});

/* GLOBAL VARS */

config = (function(){
    return {
        urls : {
            base: 'http://localhost:6969/node/powerged/server'
        }
    }
})();
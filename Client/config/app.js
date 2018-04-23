var app = angular.module("PowerGed", ["angularResizable", "ngRoute", "treeControl", "pdfjsViewer"]);

app.factory('authErrorInterceptor', function($q, $location) {
    return {
        request: function(config) {                                         
            config.headers['x-access-token'] =  localStorage.getItem('auth');           
            return config;
        },
        responseError: function(error) {
            if(error.statusText === 'Unauthorized') {
                $location.path('/login');
            }

            return $q.reject(error);
        }
    }
});

app.config(function($routeProvider, $httpProvider){
    $httpProvider.interceptors.push('authErrorInterceptor');

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


/* GLOBAL VARS */

config = (function(){
    return {
        urls : {
            base: 'http://localhost:6969/node/powerged/server',
            viewerjs: 'http://localhost:6969/node/powerged/viewerjs/#../server/file/'
        }
    }
})();
angular.module('PowerGed').factory('authService', function($rootScope, $cacheFactory, $http) {
    var url = config.urls.base + '/auth/';
    return {
        login: function(user) {
            return $http({
                method: 'POST',
                url: url,
                data: user,
                headers: {'Content-Type': 'application/json'}
            });
        },

        ensureIsAuthenticated: function() {
            var cache = $cacheFactory('auth');
            var token = cache.get('token');
            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
        }
    }
});
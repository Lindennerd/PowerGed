angular.module('PowerGed').factory('authErrorInterceptor', function($q) {
    return {
        responseError: function(error) {
            console.log(error);

            return $q.reject(error);
        }
    }
});
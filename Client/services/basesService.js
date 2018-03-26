angular.module("PowerGed").factory('basesService', function ($http) {
    return {
        getBases: function (callback) {
            $http.get(config.urls.base + '/base')
                .then(function (response) {
                    callback(response.data);
                });
        },

        getBase: function (baseName, path, callback) {
            if (baseName) {
                $http.get(config.urls.base + '/baseItems/', {
                    params: {
                        baseName: baseName,
                        filter:{ path: path }
                    }
                }).then(function (response) {
                    callback(response.data);
                });
            }
        },

        getBaseConfiguration: function (baseName, callback) {
            $http.get(config.urls.base + '/baseSchema/' + baseName)
                .then(function (response) {
                    if (response.data.length > 0) {
                        callback(response.data[0]);
                    }
                })
        }
    }
});
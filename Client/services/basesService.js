angular.module("PowerGed").factory('basesService', function ($http, loadingService) {
    return {
        getBases: function (callback) {
            loadingService.start('treeview-loading');
            $http.get(config.urls.base + '/base')
                .then(function (response) {
                    loadingService.stop('treeview-loading');
                    callback(response.data);
                });
        },

        getBase: function (baseName, path, callback) {
            if (baseName) {
                loadingService.start('treeview-loading');
                $http.get(config.urls.base + '/baseItems/', {
                    params: {
                        baseName: baseName,
                        filter: { path: path }
                    }
                }).then(function (response) {
                    loadingService.stop('treeview-loading');
                    callback(response.data);
                });
            }
        },

        filterItems: function (baseName, filter, projection, callback) {
            if (baseName) {
                loadingService.start('treeview-loading');
                $http.get(config.urls.base + '/baseItems/', {
                    params: {
                        baseName: baseName,
                        filter: filter,
                        projection: projection
                    }
                }).then(function (response) {
                    loadingService.stop('treeview-loading');
                    callback(response.data);
                })
            }
        },

        getBaseConfiguration: function (baseName, callback) {
            loadingService.start('treeview-loading');
            $http.get(config.urls.base + '/baseSchema/', { params: { baseName: baseName } })
                .then(function (response) {
                    if (response.data.length > 0) {
                        loadingService.stop('treeview-loading');
                        callback(response.data);
                    }
                })
        }
    }
});
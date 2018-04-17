angular.module("PowerGed").factory('filesService', function($rootScope, $http){
    return {
        loadFile: function(file, callback) {
            var url = config.urls.base + '/file/' + file;
            $http.head(url).then(function (response) {
                var headers = response.headers();
                callback(null, headers['content-type'], url);
            }, function(err) {
                callback(err);
            });
        },

        getFileSize: function(file, callback) {
            return 0;
        },

        showViewer: function(node) {
            this.node = node;
            $rootScope.$broadcast('openFile');
        },

        resetViewer: function() {
            $rootScope.$broadcast('resetEvent');
        }
    }
});
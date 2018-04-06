angular.module("PowerGed").factory('filesService', function($http){
    return {
        loadFile: function(file, callback) {
            var url = config.urls.base + '/file/' + file;
            $http.head(url).then(function (response) {
                var headers = response.headers();
                callback(null, headers['content-type'], url);
            }, function(err) {
                callback(err);
            });
        }
    }
});
angular.module("PowerGed").controller('container', function ($scope, $http, syncTreeView, filesService, loadingService) {
    $('.tooltipped').tooltip({ delay: 50 });

    // $scope.createFolder = function() {
    //     filesService.createFolder();
    // }

    // $scope.addFile = function() {
    // }

    // $scope.newBase = function() {
    // }

    $scope.hideDock = function () {
        $scope.dockVisible = !$scope.dockVisible;
        if ($scope.dockVisible) {
            //TODO Provavelmente vai virar outro controller isso
            var url = config.urls.base + '/file/' + syncTreeView.node.file;
            $http.head(url).then(function(response){
                var headers = response.headers();
                if(headers['content-type'] == 'application/pdf') {
                    $scope.pdf = true;
                    $scope.pdfUrl = url;
                }
            });
        }
    }

    $scope.expandTree = function (node) {
        syncTreeView.setNode(node);
    }

    $scope.$on('handleSyncContainer', function () {
        $scope.list = syncTreeView.node;
        $scope.actionsBar = true;
        $scope.dockVisible = false;
    });

});
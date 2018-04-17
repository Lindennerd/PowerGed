angular.module('PowerGed').controller('fileViewer', function($scope, filesService ){

    $scope.dockWidth = 0;

    $scope.$on('handleSyncContainer', function () {
        $scope.node = filesService.node;
        if ($scope.dockWidth > 170) loadFile();
    });

    $scope.$on('angular-resizable.resizeEnd', function (event, args) {
        $scope.dockWidth = args.width;
        if (event.targetScope.rDirections.indexOf('left') != -1
            && args.width > 170
            && $scope.currentLoadedFile !== filesService.node.file) {
                loadFile();
        }
    });

    $scope.$on('openFile', function() {
        $scope.dockVisible = true;
        loadFile();
    })

    $scope.$on('resetEvent', function() {
        resetScope();
    });

    function loadFile() {
        filesService.loadFile(filesService.node.file, function (err, type, url) {
            if (err) $scope.fileLoadError = 'Não foi possível carregar o arquivo';
            if (type == 'application/pdf') {
                resetScope();
                $scope.pdf = true;
                $scope.pdfUrl = url;
                $scope.currentLoadedFile = filesService.node.file;
                $scope.fileLoadError = null;
            }

            if(type.startsWith('text/plain')) {
                resetScope();
                $scope.txt = true;
                $scope.currentLoadedFile = filesService.node.file;
                $scope.textUrl = url;                    
            }

            if(type.startsWith('image')) {
                resetScope();
                $scope.image = true;
                $scope.currentLoadedFile = filesService.node.file;
                $scope.imageUrl = url;                    
            }
        });
    }

    function resetScope() {
        $scope.pdf = false;
        $scope.image = false;
        $scope.txt = false;

        $scope.pdfUrl = '';
        $scope.textUrl = '';
        $scope.imageUrl = '';
        
        $scope.currentLoadedFile = null;
        $scope.fileLoadError = null;
    }

});


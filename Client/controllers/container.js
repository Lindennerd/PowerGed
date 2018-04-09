angular.module("PowerGed")
    .controller('container', function ($scope, $http, syncTreeView, filesService, loadingService) {

        $scope.containerWidth = { 'padding-left': '290px' };
        $scope.dockWidth = '0';

        $scope.expandTree = function (node) {
            syncTreeView.setNode(node);
        }

        $scope.handleFileLoading = function(event) {
            console.log('loaded!');
        }

        $scope.$on('handleSyncContainer', function () {
            $scope.list = syncTreeView.node;
            $scope.dockVisible = false;

            if (syncTreeView.node.type === 'item' 
                    && $scope.dockWidth > 170 
                    && $scope.currentLoadedFile !== syncTreeView.node.file) {
                        loadFile();
            }
        });

        $scope.$on('handleUpdateContainerWidth', function () {
            $scope.containerWidth['padding-left'] = syncTreeView.containerWidth + 'px';
        });

        $scope.$on('angular-resizable.resizing', function (event, args) {
            if (event.targetScope.rDirections.indexOf('left') != -1) {
                $scope.dockWidth = args.width;
            }
        });

        $scope.$on('angular-resizable.resizeEnd', function (event, args) {
            if (event.targetScope.rDirections.indexOf('left') != -1
                && args.width > 170
                && $scope.currentLoadedFile !== syncTreeView.node.file) {
                    loadFile();
            }
        });

        function loadFile() {
            filesService.loadFile(syncTreeView.node.file, function (err, type, url) {
                resetScope();

                if (err) $scope.fileLoadError = 'Não foi possível carregar o arquivo';
                if (type == 'application/pdf') {
                    $scope.pdf = true;
                    $scope.pdfUrl = url;
                    $scope.currentLoadedFile = syncTreeView.node.file;
                    $scope.fileLoadError = null;
                }

                if(type.startsWith('text/plain')) {
                    $scope.txt = true;
                    $scope.currentLoadedFile = syncTreeView.node.file;
                    $scope.textUrl = url;                    
                }

                if(type.startsWith('image')) {
                    $scope.image = true;
                    $scope.currentLoadedFile = syncTreeView.node.file;
                    $scope.imageUrl = url;                    
                }
            });
        }

        function resetScope() {
            $scope.pdf = false;
            $scope.pdfUrl = '';
            $scope.currentLoadedFile = null;
            $scope.fileLoadError = null;
        }

    });
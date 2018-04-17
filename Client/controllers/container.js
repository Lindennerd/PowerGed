angular.module("PowerGed")
    .controller('container', function ($scope, $http, syncTreeviewContainer, filesService, loadingService) {

        $scope.containerWidth = { 'padding-left': '290px' };

        $scope.expandTree = function (node) {
            syncTreeviewContainer.setNode(node);
        }

        $scope.closeSearchResult = function () {
            syncTreeviewContainer.closeSearchResult();
            $scope.node = syncTreeviewContainer.node;
            $scope.searchResults = null;
            filesService.resetViewer();
        }

        $scope.$on('handleSyncContainer', function () {
            $scope.node = syncTreeviewContainer.node;
            if ($scope.node.type == "item" || $scope.searchResults) {
                filesService.showViewer($scope.node);
            }
        });

        $scope.seeDocument = function(node) {
            filesService.showViewer(node);
        }
        
        $scope.$on('handleSearchResult', function () {
            $scope.node = null;

            $scope.searchResults = syncTreeviewContainer.searchResult;
            $scope.searchFields = syncTreeviewContainer.fields;
        });

        $scope.$on('handleUpdateContainerWidth', function () {
            $scope.containerWidth['padding-left'] = syncTreeviewContainer.containerWidth + 'px';
        });
    });
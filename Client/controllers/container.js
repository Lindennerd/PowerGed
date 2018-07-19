angular.module("PowerGed")
    .controller('container', function ($scope, syncTreeviewContainer, filesService) {

        $scope.containerWidth = { 'padding-left': '290px' };

        $scope.containerObj = {};

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
            $scope.node = syncTreeviewContainer.node ? syncTreeviewContainer.node : { 
                type: 'null', 
                items: ['Nenhum documento ou pasta encontrada'] 
            };

            if ($scope.node.type == "item" || $scope.searchResults) {
                filesService.showViewer($scope.node);
            }
        });

        $scope.seeDocument = function(node) {
            filesService.showViewer(node, typeof(searchParameteres) != Array);
        }
        
        $scope.$on('handleSearchResult', function () {
            $scope.node = null;

            $scope.searchResults = syncTreeviewContainer.searchResult;
            $scope.searchFields = syncTreeviewContainer.fields;
            $scope.searchParameteres = syncTreeviewContainer.searchParameteres;
        });

        $scope.$on('handleUpdateContainerWidth', function () {
            $scope.containerWidth['padding-left'] = syncTreeviewContainer.containerWidth + 'px';
        });
    });
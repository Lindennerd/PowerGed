angular.module("PowerGed").controller('container', function($scope, syncContainer, syncTreeView, filesService){
    $('.tooltipped').tooltip({delay: 50});

    $scope.createFolder = function() {
        filesService.createFolder();
    }

    $scope.addFile = function() {
        
    }

    $scope.newBase = function() {
        
    }

    $scope.hideDock = function() {
        $scope.dockVisible = !$scope.dockVisible;
    }

    $scope.expandTree = function(node) {
        syncTreeView.setNode(node);
    }

    $scope.$on('handleSyncContainer', function(){
        $scope.list = syncContainer.list;
        $scope.actionsBar = true;

    });

});
angular.module("PowerGed").factory('syncTreeView', function($rootScope){
    var sharedService = {};
    sharedService.node = {};
    sharedService.baseName = null;

    sharedService.setNode = function(node) {
        this.node = node;
        this.publish();
    }

    sharedService.updateContainer = function(node) {
        this.node = node;
        this.publishContainer();
    }

    sharedService.setContainerWidth = function(treeWidth) {
        this.containerWidth = treeWidth;
        this.updateContainerWidthEvent();
    }

    sharedService.updateTreeSearchResult = function(result) {
        this.node = result;
        this.publishSearchEvent();
    }

    sharedService.toggleTreeView = function(dockVisible) {
        this.toggleTreeViewFlag =  !dockVisible;
        $rootScope.$broadcast('handleSyncToggleTreeview')
    }

    sharedService.publish = function() {
        $rootScope.$broadcast('handleSyncTreeView');
    }

    sharedService.publishContainer = function() {
        $rootScope.$broadcast('handleSyncContainer');
    }

    sharedService.publishSearchEvent = function() {
        $rootScope.$broadcast('handleSearchResult');
    }

    sharedService.updateContainerWidthEvent = function() {
        $rootScope.$broadcast('handleUpdateContainerWidth');
    }

    return sharedService;
});
angular.module("PowerGed").factory('syncTreeviewContainer', function ($rootScope) {
    var sharedService = {};
    sharedService.node = {};
    sharedService.baseName = null;

    sharedService.setNode = function (node) {
        this.node = node;
        $rootScope.$broadcast('handleSyncTreeView');
    }

    sharedService.updateContainer = function (node) {
        this.node = node;
        $rootScope.$broadcast('handleSyncContainer');
    }

    sharedService.setContainerWidth = function (treeWidth) {
        this.containerWidth = treeWidth;
        $rootScope.$broadcast('handleUpdateContainerWidth');
    }

    sharedService.viewSearchResult = function (result, fields) {
        this.searchResult = result;
        this.fields = fields;
        $rootScope.$broadcast('handleSearchResult');
    }

    sharedService.toggleTreeView = function () {
        $rootScope.$broadcast('handleSyncToggleTreeview')
    }

    sharedService.closeSearchResult = function () {
        $rootScope.$broadcast('handleCloseSearchResults');
    }

    return sharedService;
});
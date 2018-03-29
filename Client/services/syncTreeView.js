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

    sharedService.publish = function() {
        $rootScope.$broadcast('handleSyncTreeView')
    }

    sharedService.publishContainer = function() {
        $rootScope.$broadcast('handleSyncContainer')
    }

    return sharedService;
});
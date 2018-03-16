angular.module("PowerGed").factory('syncTreeView', function($rootScope){
    var sharedService = {};
    sharedService.node = {};
    sharedService.baseName = null;

    sharedService.setNode = function(node) {
        this.node = node;
        this.publish();
    }
    
    sharedService.publish = function() {
        $rootScope.$broadcast('handleSyncTreeView')
    }

    return sharedService;

});
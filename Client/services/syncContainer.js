angular.module("PowerGed").factory('syncContainer', function($rootScope){
    var sharedService = {};
    sharedService.list = {};

    sharedService.setList = function(items) {
        this.list = items;
        this.publish();
    }

    sharedService.publish = function() {
        $rootScope.$broadcast('handleSyncContainer')
    }

    return sharedService;
});
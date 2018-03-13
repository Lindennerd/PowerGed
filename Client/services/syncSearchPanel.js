angular.module("PowerGed").factory('syncSearchPanel', function($rootScope){
    var sharedService = {};

    sharedService.toggle = function() {
        $rootScope.$broadcast('handleSyncSearchPanel')
    }

    return sharedService;
});
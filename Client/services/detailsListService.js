angular.module("PowerGed").factory('detailsListService', function($rootScope){
    var sharedService = {};
    sharedService.list = {};

    sharedService.setList = function(items) {
        this.list = items;
        this.publish();
    }

    sharedService.publish = function() {
        $rootScope.$broadcast('handlePublish')
    }

    return sharedService;
});
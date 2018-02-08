angular.module("PowerGed").factory('detailsListService', function($rootScope){
    var sharedService = {};
    sharedService.list = {};

    sharedService.setList = function(items) {
        this.sharedService.list = items;
        this.publish();
    }

    this.publish = function() {
        $rootScope.$broadcast('handlePublish')
    }

    return sharedService;
});
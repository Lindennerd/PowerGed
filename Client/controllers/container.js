angular.module("PowerGed").controller('container', function($scope, detailsListService){
    $scope.$on('handlePublish', function(){
        $scope.list = detailsListService.list;
        console.log(detailsListService.list);
    })

});
angular.module('PowerGed')
    .controller('searchPanel', function($scope){

        $scope.$on('handleSyncSearchPanel', function(){
            $scope.visible = !$scope.visible;
        })
    })
angular.module('PowerGed')
    .controller('searchPanel', function($scope){
        $('select').material_select();


        $scope.$on('handleSyncSearchPanel', function(){
            $scope.visible = !$scope.visible;
        })
    })
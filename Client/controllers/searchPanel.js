angular.module('PowerGed')
    .controller('searchPanel', function($scope, basesService, syncTreeView){

        $scope.selectSearchTypeChange = function() {
            if($scope.searchType == "0") { /* Por Índice */
                basesService.getBaseConfiguration(syncTreeView.baseName, function(baseConfiguration) {
                    $scope.fields = baseConfiguration.fields;
                });
            }
    
        }

        $scope.$on('handleSyncSearchPanel', function(){
            $scope.visible = !$scope.visible;
        });

        $scope.hidePanel = function() { $scope.visible = false;}
    })
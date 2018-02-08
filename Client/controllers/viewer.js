angular.module("PowerGed")
    .controller('viewer', function($scope){
        $('.dropdown-button').dropdown();
        $('select').material_select();
        $('.collapsible').collapsible();

        $('.button-collapse').sideNav( {draggable: true} );
        $('.button-collapse.side-nav-right').sideNav({edge: 'right'});
        $('[data-activates="file-viewer"]').sideNav({edge: 'right', draggable: true, menuWidth: 800});

        
    });

angular.module("PowerGed").controller('treeview', function($scope, $http){

    $scope.treeOptions = {
        nodeChildren: "files",
        dirSelectable: false,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }

    $scope.updateTreeView = function() {
        $scope.dataForTheTree = $scope.bases.filter(function(base, index){
            if(base.id == $scope.selectedBaseID) {
                return base;
            }
        });
        console.log($scope.dataForTheTree[0].description);
        $scope.baseMetaData = $scope.dataForTheTree[0].description;
    }

    $http.get(config.urls.base + '/bases').then(function(response) {
        $scope.bases = response.data;
        $scope.basesName = response.data.map(function(element, index) {
            return {name: element.name, id: element.id};
        });

        
    })
});
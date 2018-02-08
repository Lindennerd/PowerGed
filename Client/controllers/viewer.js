angular.module("PowerGed")
    .controller('viewer', function($scope){
        $('.dropdown-button').dropdown();
        $('select').material_select();
        $('.collapsible').collapsible();

        $('.button-collapse').sideNav( {draggable: true} );
        $('.button-collapse.side-nav-right').sideNav({edge: 'right'});
        $('[data-activates="file-viewer"]').sideNav({edge: 'right', draggable: true, menuWidth: 800});

        
    });

angular.module("PowerGed").filter('getBasesName', function(){
    return function(base){
        return {name: base.name, id: base.id};
    }
})

angular.module("PowerGed").controller('treeview', function($scope, $http){

    $scope.treeOptions = {
        nodeChildren: "children",
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
  

    //$scope.dataForTheTree = response.data;

    $http.get(config.urls.base + '/bases').then(function(response) {
        $scope.bases = response.data;
        $scope.basesName = response.data.map(function(element, index) {
            return {name: element.name, id: element.id};
        });
    })
});
angular.module("PowerGed").controller('treeview', function ($scope, $http, syncContainer, syncTreeView) {

    $scope.treeOptions = {
        nodeChildren: "items",
        dirSelectable: true,
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
    };

    $scope.$on('handleSyncTreeView', function(){
        $scope.expandedNodes.push(syncTreeView.node);
        $scope.selectedNode = syncTreeView.node;  
        $scope.showSelected(syncTreeView.node);          
    })

    $scope.showSearch = function() {
        $scope.showSearch = true;
    }

    $scope.showSelected = function (node) {
        syncContainer.setList(node);
    }

    $http.get(config.urls.base + '/bases').then(function (response) {
        $scope.dataForTheTree = response.data;
        $scope.basesName = response.data.map(function (element, index) {
            return { name: element.name, id: element.id };
        });
        $scope.selectedNode = $scope.dataForTheTree[0];          
        $scope.showSelected($scope.dataForTheTree[0]);
        $scope.expandedNodes.push($scope.dataForTheTree[0]);
    })
});
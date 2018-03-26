angular.module("PowerGed").controller('treeview', function ($scope, $http, syncContainer, syncTreeView, basesService) {

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
        },
        isLeaf: function(node) {
            return node.type == 'item';
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

    $scope.chooseDatabase = function() {
        basesService.getBase($scope.baseName, null, function(base){
            $scope.dataForTheTree = base;
            $scope.basesName = base.map(function (element, index) {
                return { name: element.name, id: element.id };
            });

            $scope.selectedNode = $scope.dataForTheTree[0];          
            $scope.showSelected($scope.dataForTheTree[0]);
            syncTreeView.baseName = $scope.baseName;
        })
    }

    $scope.showToggle = function(node, expanded){
        if(expanded && node.type === 'folder') {
            var path = node.path == null ? ',' + node.name + ',' : node.path + node.name + ',';
            basesService.getBase($scope.baseName, path, function(result){
                node.items = result;
            });
        }
    }

    basesService.getBases(function(bases) {
        $scope.bases = bases;
    });
});
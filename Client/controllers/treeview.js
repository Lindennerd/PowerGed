angular.module("PowerGed").controller('treeview', 
    function ($scope, $window, syncTreeviewContainer, basesService) {

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

    $scope.toggleTreeView = true; 

    $scope.$on('handleSyncTreeView', function(){
        $scope.expandedNodes.push(syncTreeviewContainer.node);
        $scope.selectedNode = syncTreeviewContainer.node;  
        $scope.showSelected(syncTreeviewContainer.node);  
        
        $scope.showToggle(syncTreeviewContainer.node, true);
    });

    $scope.$on('handleSyncToggleTreeview', function() {
        $scope.toggleTreeView = !$scope.toggleTreeView 
        var sideBar = document.querySelector('#sidebar-left');
        sideBar.style.transform = $scope.toggleTreeView ? 'translateX(0)' : 'translateX(-100%)';
    });

    $scope.$on('handleSearchResult', function() { 
        if(!$window.localStorage.getItem('currentState')){
            $window.localStorage.setItem('currentState', JSON.stringify($scope.dataForTheTree));
        }

        $scope.dataForTheTree = syncTreeviewContainer.searchResult;
    });


    $scope.$on('handleCloseSearchResults', function() {
        $scope.dataForTheTree = JSON.parse($window.localStorage.getItem('currentState')); 
    })

    $scope.showSearch = function() {
        $scope.showSearch = true;
    }

    $scope.showSelected = function (node) {
        syncTreeviewContainer.updateContainer(node);
    }

    $scope.chooseDatabase = function() {
        basesService.getBase($scope.baseName, null, function(base){
            $scope.dataForTheTree = base;
            $scope.basesName = base.map(function (element, index) {
                return { name: element.name, id: element.id };
            });

            $scope.selectedNode = $scope.dataForTheTree[0];          
            $scope.showSelected($scope.dataForTheTree[0]);
            syncTreeviewContainer.baseName = $scope.baseName;
        });
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
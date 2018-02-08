angular.module("PowerGed").controller('treeview', function ($scope, $http, detailsListService) {

    $scope.treeOptions = {
        nodeChildren: "files",
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

    $scope.showSelected = function (node) {
        detailsListService.setList(node);
    }

    $http.get(config.urls.base + '/bases').then(function (response) {
        $scope.dataForTheTree = response.data;
        $scope.basesName = response.data.map(function (element, index) {
            return { name: element.name, id: element.id };
        });


    })
});
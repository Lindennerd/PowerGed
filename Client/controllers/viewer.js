angular.module("PowerGed")
    .controller('viewer', function($scope){
        $('.dropdown-button').dropdown();
        $('select').material_select();
        $('.collapsible').collapsible();

        $('.button-collapse').sideNav( {draggable: true} );
        $('.button-collapse.side-nav-right').sideNav({edge: 'right'});
        $('[data-activates="file-viewer"]').sideNav({edge: 'right', draggable: true, menuWidth: 800});

        $scope.treeOptions = {
            nodeChildren: "children",
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
        }

        $scope.dataForTheTree = [
            { "name" : "Joe", "age" : "21", "children" : [
                { "name" : "Smith", "age" : "42", "children" : [] },
                { "name" : "Gary", "age" : "21", "children" : [
                    { "name" : "Jenifer", "age" : "23", "children" : [
                        { "name" : "Dani", "age" : "32", "children" : [] },
                        { "name" : "Max", "age" : "34", "children" : [] }
                    ]}
                ]}
            ]},
            { "name" : "Albert", "age" : "33", "children" : [] },
            { "name" : "Ron", "age" : "29", "children" : [] }
        ];
        
    });
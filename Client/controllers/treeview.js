angular.module("PowerGed")
    .controller('treeview', function($scope){
        $scope.model =  {
            tree: [
                {
                  text: "Parent 1",
                  nodes: [
                    {
                      text: "Child 1",
                      nodes: [
                        {
                          text: "Grandchild 1"
                        },
                        {
                          text: "Grandchild 2"
                        }
                      ]
                    },
                    {
                      text: "Child 2"
                    }
                  ]
                },
                {
                  text: "Parent 2"
                },
                {
                  text: "Parent 3"
                },
                {
                  text: "Parent 4"
                },
                {
                  text: "Parent 5"
                }
              ]
        }
    });
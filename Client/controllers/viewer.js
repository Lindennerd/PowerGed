angular.module("PowerGed")
    .controller('viewer', function ($scope, $http, $location ,syncSearchPanel, modalAlertService, syncTreeviewContainer) {
        $('.dropdown-button').dropdown();
        $('.modal').modal();
        $('select').material_select();
        $('.collapsible').collapsible();
        $('close-view').sideNav('hide');
        $('.button-collapse').sideNav({ draggable: false });

        $scope.toggleSearchPanel = function () {
            if (!syncTreeviewContainer.baseName) {
                modalAlertService.showAlert('Selecione alguma base antes de fazer uma pesquisa', 'warning');
            } else {
                syncSearchPanel.toggle();
            }
        }

        $scope.exit = function() {
            localStorage.clear();
            $location.path('/login');
        }

        $scope.$on('angular-resizable.resizing', function(event, args){
            if(event.targetScope.rDirections.indexOf('right') != -1) {
                syncTreeviewContainer.setContainerWidth(args.width);
            }
        })
    
        $scope.$on("angular-resizable.resizeEnd", function (event, args) {
            //console.log('end '+args.width);
        });
    });
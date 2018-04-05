angular.module("PowerGed")
    .controller('viewer', function ($scope, $http, syncSearchPanel, modalAlertService, syncTreeView) {
        $('.dropdown-button').dropdown();
        $('.modal').modal();
        $('select').material_select();
        $('.collapsible').collapsible();
        $('close-view').sideNav('hide');
        $('.button-collapse').sideNav({ draggable: false });

        $scope.toggleSearchPanel = function () {
            if (!syncTreeView.baseName) {
                modalAlertService.showAlert('Selecione alguma base antes de fazer uma pesquisa', 'warning');
            } else {
                syncSearchPanel.toggle();
            }
        }

        $scope.$on('angular-resizable.resizing', function(event, args){
            syncTreeView.setContainerWidth(args.width);
        })
    
        $scope.$on("angular-resizable.resizeEnd", function (event, args) {
            //console.log('end '+args.width);
        });
    });
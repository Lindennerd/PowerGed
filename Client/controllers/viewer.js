angular.module("PowerGed")
    .controller('viewer', function ($scope, $http, syncSearchPanel, modalAlertService, syncTreeView) {
        $('.dropdown-button').dropdown();
        $('.modal').modal();
        $('select').material_select();
        $('.collapsible').collapsible();
        $('close-view').sideNav('hide');
        $('.button-collapse').sideNav({ draggable: false });
        $('.button-collapse.side-nav-right').sideNav({ edge: 'right' });
        $('[data-activates="file-viewer"]').sideNav({ closeOnClick: true, edge: 'right', draggable: true, menuWidth: 700 });

        $scope.toggleSearchPanel = function () {
            if (!syncTreeView.baseName) {
                modalAlertService.showAlert('Selecione alguma base antes de fazer uma pesquisa', 'warning');
            } else {
                syncSearchPanel.toggle();
            }
        }
    });
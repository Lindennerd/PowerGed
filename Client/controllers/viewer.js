angular.module("PowerGed")
    .controller('viewer', function($scope, syncSearchPanel){
        $('.dropdown-button').dropdown();
        $('.modal').modal({dismissible: false,opacity: 0, startingTop: '4%',endingTop: '10%',});
        $('select').material_select();
        $('.collapsible').collapsible();
        $('close-view').sideNav('hide');
        $('.button-collapse').sideNav( {draggable: false} );
        $('.button-collapse.side-nav-right').sideNav({edge: 'right'});
        $('[data-activates="file-viewer"]').sideNav({closeOnClick: true, edge: 'right', draggable: true, menuWidth: 700}); 
        
        $scope.toggleSearchPanel = function() {
            syncSearchPanel.toggle();
        }
    });
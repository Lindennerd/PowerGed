angular.module("PowerGed").controller('modalAlert', function($scope, modalAlertService) {

    $scope.$on('handleModalAlert', function(){
        $scope.type = modalAlertService.type;
        $scope.message = modalAlertService.message;

        $('#modalAlert').modal('open');
    })

})
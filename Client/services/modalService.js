angular.module("PowerGed").factory('modalAlertService', function($rootScope){
    function parseType(type) {
        if(type == "error") return "red";
        if(type == "warning") return "yellow";
        if(type == "informat") return "blue";
    }

    return {
        showAlert: function(message, type) {
            this.type = parseType(type);
            this.message = message;
            $rootScope.$broadcast('handleModalAlert');
        }
    }
});
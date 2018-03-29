angular.module('PowerGed').factory('loadingService', function(){
    return {
        start: function(id) {
            var spin = document.querySelector('#'+id);
            spin.style.display = 'block';
        },

        stop: function(id) {
            var spin = document.querySelector('#'+id);
            spin.style.display = 'none';
        }
    }
});
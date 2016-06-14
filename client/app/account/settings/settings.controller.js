(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('settingsController', settingsController);

    settingsController.$inject = ['Auth'];

    /* @ngInject */
    function settingsController(Auth) {
        var vm = this;
        vm.title = 'settingsController';

        activate();

        ////////////////

        function activate() {
            
        }
    }

})();


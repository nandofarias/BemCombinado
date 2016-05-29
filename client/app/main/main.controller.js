(function() {
    'use strict';

    angular
        .module('app.main')
        .controller('mainController', mainController);

    mainController.$inject = ['ngDialog'];

    /* @ngInject */
    function mainController(ngDialog) {
        var vm = this;
        vm.title = 'mainController';

        activate();

        ////////////////

        function activate() {
            
        }
    }
})();
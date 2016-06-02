(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('taskController', taskController);

    taskController.$inject = [];

    /* @ngInject */
    function taskController() {
        var vm = this;
        vm.title = 'taskController';

        activate();

        ////////////////

        function activate() {
            
        }
    }

})();


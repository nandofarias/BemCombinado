(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('ordersController', ordersController);

    ordersController.$inject = ['ngDialog'];

    /* @ngInject */
    function ordersController(ngDialog) {
        var vm = this;
        vm.title = 'ordersController';

        activate();

        ////////////////

        function activate() {
            vm.askTask = askTask;
        }

        function askTask() {
            ngDialog.openConfirm(
                {
                    template: 'app/tasks/task/task.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'taskController',
                    controllerAs: 'vm'
                });
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('ordersController', ordersController);

    ordersController.$inject = ['TaskService', 'ngDialog'];

    /* @ngInject */
    function ordersController(TaskService, ngDialog) {
        var vm = this;
        vm.title = 'ordersController';

        activate();

        ////////////////

        function activate() {
            vm.askTask = askTask;
            vm.deactivate = deactivate;
            TaskService.mine(
                function (data) {
                    vm.tasks = data.tasks;
                },
                function (err) {
                    console.log(err);
                }
            );
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
        
        function deactivate(task) {
            TaskService.deactivate(
                {
                    id: task._id
                },
                {},
                function (data) {
                    task.active = false;
                },
                function (err) {
                    console.log(err);
                }
            );
        }
    }

})();


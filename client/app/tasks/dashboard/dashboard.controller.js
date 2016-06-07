(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['Auth', 'TaskService'];

    /* @ngInject */
    function dashboardController(Auth, TaskService) {
        var vm = this;
        vm.title = 'dashboardController';

        activate();

        ////////////////

        function activate() {

            vm.apply = apply;
            vm.unapply = unapply;

            TaskService.get(
                function (data) {
                    vm.tasks = data.tasks;
                },
                function (err) {
                    console.log(err);
                }
            );

        }

        function apply(task) {
            TaskService.apply(
                {id: task._id},
                {},
                function (data) {
                    task.isCandidate = true;
                },
                function (err) {
                    console.log(err);
                }
            );
        }

        function unapply(task) {
            TaskService.unapply(
                {id: task._id},
                {},
                function (data) {
                    task.isCandidate = false;
                },
                function (err) {
                    console.log(err);
                }
            );
        }
    }

})();


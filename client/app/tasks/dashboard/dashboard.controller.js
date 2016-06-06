(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['TaskService'];

    /* @ngInject */
    function dashboardController(TaskService) {
        var vm = this;
        vm.title = 'dashboardController';

        activate();

        ////////////////

        function activate() {

            vm.apply = apply;

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
                    task.alreadyCandidate = true;
                },
                function (err) {
                    console.log(err);
                }
            );
        }
    }

})();


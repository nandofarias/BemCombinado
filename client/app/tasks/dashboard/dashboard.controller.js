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

            TaskService.get(
                function (data) {
                    vm.tasks = data.tasks;
                },
                function (err) {
                    console.log(err);
                }
            );

        }
    }

})();


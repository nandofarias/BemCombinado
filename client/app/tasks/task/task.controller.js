(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('taskController', taskController);

    taskController.$inject = ['TaskService', '$scope'];

    /* @ngInject */
    function taskController(TaskService, $scope) {
        var vm = this;
        vm.title = 'taskController';

        activate();

        ////////////////

        function activate() {
            vm.save = save;
            vm.task = {};
        }
        
        function save() {
            TaskService.save(vm.task,
            function (data) {
                console.log(data);
            },
            function (err) {
                console.log(err);
            })
            $scope.confirm();
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('adminController', adminController);

    adminController.$inject = ['User', 'TaskService'];

    /* @ngInject */
    function adminController(User, TaskService) {
        var vm = this;
        vm.title = 'adminController';

        activate();

        ////////////////

        function activate() {
            vm.users = User.query();
            TaskService.getAllAdmin(function(response){
                vm.tasks = response.tasks;
            });

        }
    }

})();


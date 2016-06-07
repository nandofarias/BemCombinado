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
            vm.signup = signup;
            vm.createTask = createTask;

            vm.selectedDropdownItem = null;
            vm.dropdownItems = ['Pintura', 'Conserto', 'Geral', 'Outros'];
        }

        function signup(){
            ngDialog.openConfirm(
                {
                    template: 'app/account/signup/signup.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'signupController',
                    controllerAs: 'vm',
                    data: vm.user
                });
        }
        

        function createTask(item) {
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
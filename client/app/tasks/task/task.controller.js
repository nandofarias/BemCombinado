(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('taskController', taskController);

    taskController.$inject = ['Auth', 'TaskService', '$scope', 'ngDialog'];

    /* @ngInject */
    function taskController(Auth, TaskService, $scope, ngDialog) {
        var vm = this;
        vm.title = 'taskController';

        activate();

        ////////////////

        function activate() {
            vm.save = save;
            vm.task = {};

            Auth.isLoggedIn()
                .then(function (user) {
                    console.log(user);
                })

        }
        
        function save() {

            Auth.isLoggedIn()
                .then(function (flag) {
                    if(flag){
                        TaskService.save(vm.task,
                            function (data) {
                                $scope.confirm(data);
                            },
                            function (err) {
                                console.log(err);
                            });
                    }else{
                        signup();
                    }
                })


        }

        function signup(){
            ngDialog.openConfirm(
                {
                    template: 'app/account/signup/signup.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'signupController',
                    controllerAs: 'vm'
                });
        }
        
    }

})();


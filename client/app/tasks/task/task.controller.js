(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('taskController', taskController);

    taskController.$inject = ['Auth', 'TaskService', '$scope', 'ngDialog', '$state'];

    /* @ngInject */
    function taskController(Auth, TaskService, $scope, ngDialog, $state) {
        var vm = this;
        vm.title = 'taskController';

        activate();

        ////////////////

        function activate() {
            vm.save = save;
            vm.task = {};

        }
        
        function save() {

            Auth.isLoggedIn()
                .then(function (flag) {
                    if(flag){
                        var date = vm.task.when.split('/');
                        vm.task.when = date[1] + '/' + date[0] +'/' +date[2];
                        TaskService.save(vm.task,
                            function (data) {
                                $scope.confirm(data);
                                $state.go('myOrders');
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
                    controllerAs: 'vm',
                    closeByDocument: false,
                    closeByNavigation: true
                });
        }
        
    }

})();


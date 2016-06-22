(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('signupController', signupController);

    signupController.$inject = ['Auth', '$scope', 'ngDialog'];

    /* @ngInject */
    function signupController(Auth, $scope, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.user = {};
            vm.user.skills = [];
            vm.register = register;
            vm.openLogin = openLogin;
            vm.addSkill = addSkill;
            vm.removeSkill = removeSkill;

            if($scope.hasOwnProperty('ngDialogData')){
                vm.user.name = $scope.ngDialogData.name;
            }
            if($scope.hasOwnProperty('ngDialogData')){
                vm.user.email = $scope.ngDialogData.email;
            }

        }

        function register() {
            Auth.createUser({
                name: vm.user.name,
                email: vm.user.email,
                phone: vm.user.phone,
                isTasker: vm.user.isTasker,
                skills: vm.user.skills,
                bio: vm.user.bio,
                password: vm.user.password
            })
                .then(function(user) {
                    $scope.closeThisDialog();
                })
                .catch(function(err) {
                    err = err.data;
                    vm.errors = err.errors;
                });
        }
        
        function openLogin(){
            $scope.closeThisDialog();


            ngDialog.openConfirm(
                {
                    template: 'app/account/login/login.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'loginController',
                    controllerAs: 'vm',
                    closeByDocument: false,
                    closeByNavigation: true
                });
        }

        function addSkill() {
            if(vm.skill)
                vm.user.skills.push(vm.skill);
            vm.skill = undefined;
        }

        function removeSkill(index) {
            vm.user.skills.splice(index, 1);
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['Auth'];

    /* @ngInject */
    function changePasswordController(Auth) {
        var vm = this;
        vm.title = 'changePasswordController';

        activate();

        ////////////////

        function activate() {
            vm.updatePassword = updatePassword;
            vm.user = {};
        }

        function updatePassword() {
            vm.error = undefined;
            vm.message = undefined;
            if(vm.user.newPassword === vm.user.confirmPassword){
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
                    .then(function () {
                        vm.message = "Senha alterada com sucesso";
                    })
                    .catch(function (err) {
                        vm.error = "Senha incorreta, tente novamente!";
                    })
            }else{
                vm.error = "Nova senha e senha de confirmação estão diferentes";
            }

        }
    }

})();


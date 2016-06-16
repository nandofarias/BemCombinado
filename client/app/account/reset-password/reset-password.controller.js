(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('resetPasswordController', resetPasswordController);

    resetPasswordController.$inject = ['Auth', '$stateParams'];

    /* @ngInject */
    function resetPasswordController(Auth, $stateParams) {
        var vm = this;
        vm.title = 'resetPasswordController';

        activate();

        ////////////////

        function activate() {
            vm.resetPassword = resetPassword;
        }

        function resetPassword() {
            var token = $stateParams.token;
            Auth.resetPassword(vm.newPassword, token)
                .then(function () {
                    vm.message = "Senha alterada com sucesso.";
                })
                .catch(function (err) {
                    vm.message = "Solicitação de troca de senha não encontrada.";
                })
        }
    }

})();


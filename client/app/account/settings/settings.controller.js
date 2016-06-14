(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('settingsController', settingsController);

    settingsController.$inject = ['Auth'];

    /* @ngInject */
    function settingsController(Auth) {
        var vm = this;
        vm.title = 'settingsController';
        vm.user = {};

        activate();

        ////////////////

        function activate() {
            vm.updatePassword = updatePassword;
        }

        function updatePassword() {
            Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
                .then(function () {
                    vm.message = "Senha alterada com sucesso";
                })
                .catch(function (err) {
                    vm.message = "Senha incorreta, tente novamente!";
                })
        }
    }

})();


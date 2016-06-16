(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('forgotPasswordController', forgotPasswordController);

    forgotPasswordController.$inject = ['Auth'];

    /* @ngInject */
    function forgotPasswordController(Auth) {
        var vm = this;
        vm.title = 'forgotPasswordController';

        activate();

        ////////////////

        function activate() {
            vm.recoveryPassword = recoveryPassword;
            vm.user = {};
        }
        
        function recoveryPassword(){
            Auth.forgotPassword(vm.user)
                .then(function () {
                    vm.message = "Solicitação recebida. Verifique seu e-mail para prosseguir com a sua solicitação.";
                })
                .catch(function(err){
                    vm.message = "E-mail não encontrado.";
                });
        }
    }

})();


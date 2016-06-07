(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('loginController', loginController);

    loginController.$inject = ['Auth', '$scope'];

    /* @ngInject */
    function loginController(Auth, $scope) {
        var vm = this;
        vm.title = 'loginController';

        activate();

        ////////////////

        function activate() {
            vm.login = login;
        }

        function login(){
            Auth.login({
                email: vm.user.email,
                password: vm.user.password
            })
                .then(function(user) {
                    $scope.closeThisDialog();
                })
                .catch(function(err) {
                    vm.error = err;
                });

        }
    }

})();


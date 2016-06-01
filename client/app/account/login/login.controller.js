(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('loginController', loginController);

    loginController.$inject = ['Auth', '$state', '$scope'];

    /* @ngInject */
    function loginController(Auth, $state,$scope) {
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
                    $scope.confirm();
                })
                .catch(function(err) {
                    vm.error = err;
                });

        }
    }

})();


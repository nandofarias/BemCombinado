(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('signupController', signupController);

    signupController.$inject = ['Auth', '$scope'];

    /* @ngInject */
    function signupController(Auth, $scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.user = {};
            vm.register = register;
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
                password: vm.user.password
            })
                .then(function(user) {
                    $scope.confirm();
                })
                .catch(function(err) {
                    err = err.data;
                    vm.errors = err.errors;
                });
        }
    }

})();


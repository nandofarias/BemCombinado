(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('signupController', signupController);

    signupController.$inject = ['Auth', '$state', '$scope'];

    /* @ngInject */
    function signupController(Auth, $state, $scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.user = {};
            vm.register = register;
        }

        function register() {
            Auth.createUser({
                name: vm.user.name,
                email: vm.user.email,
                password: vm.user.password
            })
                .then(function(user) {
                    vm.user = user;
                    $scope.confirm(vm.user);
                    $state.go('main', {}, {reload: true});
                })
                .catch(function(err) {
                    err = err.data;
                    angular.forEach(err.errors, function (error, field) {
                        //form[field].$setValidity('mongoose', false);
                        //vm.errors[field] = error.message;
                    });
                });


        }
    }

})();


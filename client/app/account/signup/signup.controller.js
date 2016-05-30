(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('signupController', signupController);

    signupController.$inject = ['$cookies', '$http', '$scope'];

    /* @ngInject */
    function signupController($cookies, $http, $scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.user = {};
            vm.register = register;
        }

        function register() {
            $http.post('/api/users',{
                name: vm.user.name,
                password: vm.user.password
            }).then(function (res) {
                $cookies.put('token', res.data.token);
                $scope.closeThisDialog('close');
            }).catch(function (err) {
                console.log(err);
            })
        }
    }

})();


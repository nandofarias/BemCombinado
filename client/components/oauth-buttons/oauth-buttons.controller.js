(function() {
    'use strict';

    angular
        .module('app.oauthButtons')
        .controller('oauthButtonsController', oauthButtonsController);

    oauthButtonsController.$inject = ['$window'];

    /* @ngInject */
    function oauthButtonsController($window) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.loginOauth = loginOauth;
        }

        function loginOauth(provider) {
            $window.location.href = '/auth/' + provider;
        }
    }
})();

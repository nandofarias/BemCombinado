(function () {
    'use strict';

    angular
        .module('app')
        .directive('header', header);

    header.$inject = ['ngDialog'];

    /* @ngInject */
    function header(ngDialog) {
        var directive = {
            bindToController: true,
            controller: headerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {},
            templateUrl: 'components/header/header.html'
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    headerController.$inject = ['ngDialog'];

    /* @ngInject */
    function headerController(ngDialog) {
        var vm = this;
        vm.title = 'mainController';

        activate();

        ////////////////

        function activate() {
            vm.signup = signup;
            vm.login = login;


        }

        function signup(){
            ngDialog.open(
                {
                    template: 'app/account/signup/signup.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'signupController',
                    controllerAs: 'vm'
                });
        }

        function login(){
            ngDialog.open(
                {
                    template: 'app/account/login/login.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'loginController',
                    controllerAs: 'vm'
                });
        }
    }

})();


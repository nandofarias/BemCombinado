(function () {
    'use strict';

    angular
        .module('app')
        .directive('header', header);

    header.$inject = ['ngDialog', 'Auth', '$state', '$rootScope'];

    /* @ngInject */
    function header(ngDialog, Auth, $state, $rootScope) {
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

    headerController.$inject = ['ngDialog', 'Auth', '$state', '$rootScope'];

    /* @ngInject */
    function headerController(ngDialog, Auth, $state, $rootScope) {
        var vm = this;
        vm.title = 'headerController';

        $rootScope.$on('login', function (event, args) {
            Auth.isLoggedIn()
                .then(function (flag) {
                    vm.isLoggedIn = flag;
                });
        });

        activate();

        ////////////////

        function activate() {
            vm.signup = signup;
            vm.login = login;
            vm.myOrders = myOrders;
            vm.dashboard = dashboard;
            vm.logout = logout;
            Auth.isLoggedIn()
                .then(function (flag) {
                    vm.isLoggedIn = flag;
                });
        }

        function signup(){
            ngDialog.openConfirm(
                {
                    template: 'app/account/signup/signup.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'signupController',
                    controllerAs: 'vm'
                });
        }

        function login(){
            ngDialog.openConfirm(
                {
                    template: 'app/account/login/login.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'loginController',
                    controllerAs: 'vm'
                });
        }
        
        function myOrders() {
            $state.go('myOrders');
        }

        function dashboard() {
            $state.go('dashboard');
        }
        
        function logout() {
            Auth.logout();
            Auth.isLoggedIn()
                .then(function (flag) {
                    vm.isLoggedIn = flag;
                });
            $state.go('main');
        }
    }

})();


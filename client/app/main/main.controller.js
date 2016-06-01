(function() {
    'use strict';

    angular
        .module('app.main')
        .controller('mainController', mainController);

    mainController.$inject = ['ngDialog'];

    /* @ngInject */
    function mainController(ngDialog) {
        var vm = this;
        vm.title = 'mainController';

        activate();

        ////////////////

        function activate() {
            vm.signup = signup;
            
        }

        function signup(){
            ngDialog.openConfirm(
                {
                    template: 'app/account/signup/signup.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'signupController',
                    controllerAs: 'vm'
                })
                .then(function (user) {
                    //$state.go('main');
                })
                .catch(function (err) {
                    //console.error(err);
                });
        }
    }
})();
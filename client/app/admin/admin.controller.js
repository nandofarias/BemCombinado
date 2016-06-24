(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('adminController', adminController);

    adminController.$inject = ['User'];

    /* @ngInject */
    function adminController(User) {
        var vm = this;
        vm.title = 'adminController';

        activate();

        ////////////////

        function activate() {
            vm.users = User.query();


            console.log(vm.users);
            
        }
    }

})();


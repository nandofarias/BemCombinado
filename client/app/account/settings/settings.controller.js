(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('settingsController', settingsController);

    settingsController.$inject = ['Auth', 'User'];

    /* @ngInject */
    function settingsController(Auth, User) {
        var vm = this;
        vm.title = 'settingsController';

        activate();

        ////////////////

        function activate() {
            Auth.getCurrentUser(function (user) {
               vm.user = user;
            });
            vm.editProfile = editProfile;
            vm.addSkill = addSkill;
            vm.removeSkill = removeSkill;
        }


        function editProfile() {
            vm.error = undefined;
            vm.message = undefined;
            User.update({id: vm.user._id}, vm.user
                , function () {
                    vm.message = "Perfil alterado com sucesso!";
                }, function (err) {
                    if(err.status === 403){
                        vm.error = "Email já cadastrado em outra conta";
                    }else{
                        vm.error = "Houver um erro inesperado ao acessar os dados do seu perfil, tente novamente mais tarde.";
                    }

                });
        }

        function addSkill() {
            if(vm.skill)
                vm.user.skills.push(vm.skill);
            vm.skill = undefined;
        }

        function removeSkill(index) {
            vm.user.skills.splice(index, 1);
        }
    }

})();


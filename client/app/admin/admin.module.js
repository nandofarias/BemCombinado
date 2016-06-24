(function() {
    'use strict';

    angular
        .module('app.admin', [
            'app.auth'
        ]).run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'adminController',
                    controllerAs: 'vm',
                    authenticate: 'admin'
                }
            }
        ];
    }
})();


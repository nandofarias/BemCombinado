(function() {
    'use strict';

    angular
        .module('app.account', [
            'app.oauthButtons',
            'app.auth'
        ]).run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings',
                config: {
                    url: '/settings',
                    templateUrl: 'app/account/settings/settings.html',
                    controller: 'settingsController',
                    controllerAs: 'vm',
                    authenticate: true
                }
            }
        ];
    }
})();


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
            },
            {
                state: 'forgotPassword',
                config: {
                    url: '/forgot',
                    templateUrl: 'app/account/forgot-password/forgot-password.html',
                    controller: 'forgotPasswordController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'resetPassword',
                config: {
                    url: '/reset/:token',
                    templateUrl: 'app/account/reset-password/reset-password.html',
                    controller: 'resetPasswordController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'changePassword',
                config: {
                    url: '/password',
                    templateUrl: 'app/account/change-password/change-password.html',
                    controller: 'changePasswordController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();


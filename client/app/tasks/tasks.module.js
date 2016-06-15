(function() {
    'use strict';

    angular
        .module('app.tasks',[
            'ngDialog',
            'ngResource',
            'app.auth',
            'moment-picker',
            'ng-currency'
        ])
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'myOrders',
                config: {
                    url: '/',
                    templateUrl: 'app/tasks/orders/orders.html',
                    controller: 'ordersController',
                    controllerAs: 'vm',
                    authenticate: true
                }
            },
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/tasks/dashboard/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm',
                    authenticate: true
                }
            }
        ];
    }

})();

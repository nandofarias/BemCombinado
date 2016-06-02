(function() {
    'use strict';

    angular
        .module('app.tasks',[
            'ngDialog'
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
                    url: '/myOrders',
                    templateUrl: 'app/tasks/orders/orders.html',
                    controller: 'ordersController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'app/main/dashboard/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();

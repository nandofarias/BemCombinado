(function() {
    'use strict';

    angular
        .module('app.main',[
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
                state: 'main',
                config: {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'mainController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();

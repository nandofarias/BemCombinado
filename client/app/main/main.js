(function() {
    'use strict';

    angular
        .module('app.main',[])
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $rootScope) {
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

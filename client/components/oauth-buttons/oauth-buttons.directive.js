(function() {
    'use strict';

    angular
        .module('app.oauthButtons')
        .directive('oauthButtons', oauthButtons);

    /* @ngInject */
    function oauthButtons() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'components/oauth-buttons/oauth-buttons.html',
            controller: 'oauthButtonsController',
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                classes: '@'
            }
        };
        return directive;

    }
})();

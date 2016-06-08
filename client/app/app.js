(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'app.auth',
            'app.main',
            'app.account',
            'app.tasks',
            'angulartics',
            'angulartics.google.analytics'
        ]);

})();
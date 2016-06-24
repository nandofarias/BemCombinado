(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'app.auth',
            'app.main',
            'app.account',
            'app.tasks',
            'app.admin',
            'angulartics',
            'angulartics.google.analytics'
        ]);

})();
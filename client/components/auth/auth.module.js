(function () {
    'use strict';

    angular
        .module('app.auth', [
            'ngCookies',
            'ui.router',
            'app.util',
            'ngResource',
            'app.constants'
        ])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });

})();
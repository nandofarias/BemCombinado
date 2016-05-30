(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$cookies', '$q', 'Util', '$injector'];

    /* @ngInject */
    function authInterceptor($cookies, $q, Util, $injector) {
        var state;
        var service = {
            request: request,
            responseError: responseError
        };
        return service;

        ////////////////

        function request(config) {
            config.headers = config.headers || {};
            if($cookies.get('token') && Util.isSameOrigin(config.url)){
                config.headers.Authorization = 'Bearer ' + $cookies.get('token');
            }

            return config;
        }

        function responseError(response) {
            if(response.status === 401){
                (state || (state = $injector.get('$state'))).go('main');
                // remove any stale tokens
                $cookies.remove('token');
            }

            return $q.reject(response);
        }
    }
})();
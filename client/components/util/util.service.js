(function() {
    'use strict';

    angular
        .module('app.util')
        .factory('Util', UtilService);

    UtilService.$inject = ['$window'];

    /* @ngInject */
    function UtilService($window) {
        var service = {
            safeCb: safeCb,
            urlParse: urlParse,
            isSameOrigin: isSameOrigin
        };
        return service;

        ////////////////

        function safeCb(cb) {
            return (angular.isFunction(cb)) ? cb : angular.noop;
        }

        function urlParse(url) {
            var a = document.createElement('a');
            a.href = url;

            // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
            if (a.host === '') {
                a.href = a.href;
            }

            return a;
        }


        function isSameOrigin(url, origins) {
            url = service.urlParse(url);

            origins = (origins && [].concat(origins)) || [];
            origins = origins.map(service.urlParse);
            origins.push($window.location);
            origins = origins.filter(function(o) {

                return url.hostname === o.hostname &&
                    url.port === o.port &&
                    url.protocol === o.protocol;
            });

            return (origins.length >= 1);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('User', UserService);

    UserService.$inject = ['$resource'];

    /* @ngInject */
    function UserService($resource) {
        return $resource('/api/users/:id/:controller',
            {
                id: '@_id'
            },
            {
                changePassword: {
                    method: 'PUT',
                    params: {
                        controller: 'password'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id: 'me'
                    }
                }
            }
        );
    }
})();
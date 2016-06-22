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
                },
                forgotPassword: {
                    method: 'POST',
                    params: {
                        id: 'forgot'
                    }
                },
                resetPassword: {
                    method: 'POST',
                    params: {
                        id: 'reset'
                    }
                },
                update: {
                    method: 'PUT'
                }
            }
        );
    }
})();
(function() {
    'use strict';
    angular
        .module('app.auth')
        .run(function($rootScope, $state, Auth) {
            // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
            $rootScope.$on('$stateChangeStart', function(event, next) {
                if (!next.authenticate) {
                    return;
                }

                if (typeof next.authenticate === 'string') {
                    Auth.hasRole(next.authenticate, _.noop).then(function(has) {
                        if (has) {
                            return;
                        }

                        event.preventDefault();
                        return Auth.isLoggedIn(_.noop).then(function(is) {
                            $state.go(is ? 'main' : 'main');
                        });
                    });
                } else {
                    Auth.isLoggedIn(_.noop).then(function(is) {
                        if (is) {
                            return;
                        }

                        event.preventDefault();
                        $state.go('main');
                    });
                }
            });
        });
})();

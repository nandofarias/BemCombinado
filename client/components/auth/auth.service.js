(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('Auth', AuthService);

    AuthService.$inject = ['$location', '$http', '$cookies', '$q', 'appConfig', 'Util', 'User', '$rootScope'];

    /* @ngInject */
    function AuthService($location, $http, $cookies, $q, appConfig, Util, User, $rootScope) {
        var safeCb = Util.safeCb;
        var currentUser = {};
        var userRoles = appConfig.userRoles || [];

        if($cookies.get('token') && $location.path() !== '/logout'){
            currentUser = User.get();
        }

        var Auth = {
            login: login,
            logout: logout,
            createUser: createUser,
            changePassword: changePassword,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            hasRole: hasRole,
            isAdmin: isAdmin,
            getToken: getToken
        };
        return Auth;

        ////////////////

        function login(user, callback) {
            return $http.post('/auth/local', {
                email: user.email,
                password: user.password
            })
                .then(function(res) {
                    $cookies.put('token', res.data.token);
                    currentUser = User.get();
                    $rootScope.$emit('login', {});
                    return currentUser.$promise;
                })
                .then(function(user) {
                    safeCb(callback)(null, user);
                    return user;
                })
                .catch(function(err) {
                    Auth.logout();
                    safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
        }

        function logout() {
            $cookies.remove('token');
            currentUser = {};
        }

        function createUser(user, callback) {
            return User.save(user,
                function(data) {
                    $cookies.put('token', data.token);
                    currentUser = User.get();
                    $rootScope.$emit('login', {});
                    return safeCb(callback)(null, user);
                },
                function(err) {
                    Auth.logout();
                    return safeCb(callback)(err);
                }).$promise;
        }

        function changePassword(oldPassword, newPassword, callback) {
            return User.changePassword({ id: currentUser._id }, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, function() {
                return safeCb(callback)(null);
            }, function(err) {
                return safeCb(callback)(err);
            }).$promise;
        }

        function getCurrentUser(callback) {
            if (arguments.length === 0) {
                return currentUser;
            }

            var value = (currentUser.hasOwnProperty('$promise')) ?
                currentUser.$promise : currentUser;
            return $q.when(value)
                .then(function(user) {
                    safeCb(callback)(user);
                    return user;
                }, function() {
                    safeCb(callback)({});
                    return {};
                });
        }

        function isLoggedIn(callback) {
            if (arguments.length === 0) {
                return currentUser.hasOwnProperty('role');
            }

            return Auth.getCurrentUser(null)
                .then(function(user) {
                    var is = user.hasOwnProperty('role');
                    safeCb(callback)(is);
                    return is;
                });
        }

        function hasRole(role, callback) {
            var hasRole = function(r, h) {
                return userRoles.indexOf(r) >= userRoles.indexOf(h);
            };

            if (arguments.length < 2) {
                return hasRole(currentUser.role, role);
            }

            return Auth.getCurrentUser(null)
                .then(function(user) {
                    var has = (user.hasOwnProperty('role')) ?
                        hasRole(user.role, role) : false;
                    safeCb(callback)(has);
                    return has;
                });
        }

        function isAdmin() {
            return Auth.hasRole
                .apply(Auth, [].concat.apply(['admin'], arguments));
        }

        function getToken() {
            return $cookies.get('token');
        }
    }
})();

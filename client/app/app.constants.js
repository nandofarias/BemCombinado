(function() {
    'use strict';
    angular
        .module('app.constants', [])
        .constant('appConfig', {userRoles:['guest','user','admin']});
})();

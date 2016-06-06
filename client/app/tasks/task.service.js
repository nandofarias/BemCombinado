(function () {
    'use strict';

    angular
        .module('app.tasks')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$resource'];


        /* @ngInject */
    function TaskService($resource) {

        var service = $resource('/api/tasks/:controller', {},{
            mine: {
                method: 'GET',
                params: {
                    controller: 'mine'
                }
            }
        });
        return service;
    }

})();






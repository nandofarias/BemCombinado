(function () {
    'use strict';

    angular
        .module('app.tasks')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$resource'];


        /* @ngInject */
    function TaskService($resource) {

        var service = $resource('/api/tasks/:id/:controller',
            {
                id: '@_id'
            },
            {
                mine: {
                    method: 'GET',
                    params: {
                        id: 'mine'
                    }
                },
                deactivate: {
                    method: 'PUT',
                    params: {
                        controller: 'deactivate'
                    }
                },
                apply: {
                    method: 'PUT',
                    params: {
                        controller: 'apply'
                    }
                },
                unapply: {
                    method: 'PUT',
                    params: {
                        controller: 'unapply'
                    }
                }
            }
        );
        return service;
    }

})();






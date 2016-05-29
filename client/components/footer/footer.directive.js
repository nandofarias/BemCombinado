(function () {
    'use strict';

    angular
        .module('app')
        .directive('footer', footer);
    
    /* @ngInject */
    function footer() {
        var directive = {
            bindToController: true,
            controller: footerController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'components/footer/footer.html'
        };
        return directive;


    }


    /* @ngInject */
    function footerController() {

    }

})();


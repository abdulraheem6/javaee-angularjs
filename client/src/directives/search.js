(function() {
'use strict';

/**
 * @ngdoc directive
 * @name bookshopApp.directive:SearchDirective
 * @description
 * Directive search form for table 
 */
angular.module('bookshopApp')
    .directive('anSearch', function(){
        
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/templates/search.html'
        };
        
    });
})();
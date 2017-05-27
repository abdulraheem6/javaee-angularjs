(function() {
'use strict';

/**
 * @ngdoc function
 * @name bookshopApp:controller:BookCtrl
 * @description
 * # 
 */
angular.module('bookshopApp')
    .controller('BookCtrl', function($log, $scope, $rootScope, BookService) {
        
        BookService.query(function(books) {
            $log.debug(books);
            $scope.books = books;
        }, function(error) {
        });
        
        // remove data
        $scope.remove = function(param) {
            var uri = extractSlug(param._links.href);
            
            $log.debug(uri);
            
            BookService.delete({'slug': uri}, function() {
                // Broadcast success event
                $rootScope.$broadcast('refreshTable');
            }, function(error) {
            });
        };
        
        $scope.$on('refreshTable', function() {
            BookService.query(function(books) {
                $log.debug(books);
                $scope.books = books;
            }, function(error) {
            });
        });
        
        /**
         * split URI and get the slugs
         * 
         * @param {URI} href with self rel
         * @returns {String} slug from the book
         */
        function extractSlug(uri) {
            return uri.split('/').pop();
        }
        
    });
})();
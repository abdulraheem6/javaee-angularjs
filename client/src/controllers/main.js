(function() {
'use strict';

/**
 * @ngdoc function
 * @name bookshopApp:controller:MainCtrl
 * @description
 * # MainCtrl for Main Page
 */
angular.module('bookshopApp')
    .controller('MainCtrl', function($log, $scope, $rootScope, BookService) {
        
        BookService.query(function(books) {
            $scope.books = books;
        }, function(error) {
            // Broadcast even for server error
            $rootScope.$broadcast('error');
        });
        
    });
})();
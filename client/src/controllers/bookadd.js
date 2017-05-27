(function() {
'use strict';

/**
 * @ngdoc function
 * @name bookshopApp:controller:AdminCtrl
 * @description
 * # business logic in admin dashboard
 */
angular.module('bookshopApp')
    .controller('BookAddCtrl', function($log, $scope, $routeParams, BookService) {
        
        var slug = $routeParams.slug;
        $log.debug('slug: ' + slug);

        if(slug) {
            BookService.get({'slug': slug}, function(data) {
                $scope.book = data;
            }, function(error) {
            });
        } else {
            $scope.book = {
                'tax_included': false
            };
        }
        
        // save data
        $scope.submit = function() {
            // check it's perform create or update with slug condition
            if(slug) {
                BookService.update({'slug': slug}, $scope.book);
            } else {
                BookService.save($scope.book);
            }
        };
        
    });
})();
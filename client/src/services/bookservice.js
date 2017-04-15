(function() {
'use strict';

/**
 * @ngdoc function
 * @name bookshopApp:service:BookService
 * @description
 * # Service to call books endpoint
 */

angular.module('bookshopApp')
    .factory('BookService', function($log, $resource) {
        return $resource('resources/books/:slug', {slug: '@slug'}, {
            update: {
                method: 'PUT'
            }
        });
    });
})();
(function() {
'use strict';

/**
 *
 * @ngdoc overview
 * @name bookshopApp
 * @description
 * # Single Page Application with Java EE 7
 */
    angular
        .module('bookshopApp', [
            'ngTouch',
            'ngRoute',
            'ngResource',
            'ui.bootstrap',
            'angularUtils.directives.dirPagination'
        ])
        .config(function($routeProvider, $compileProvider, $logProvider, $httpProvider) {
            //TODO: always uncomment source code below in production
            $compileProvider.debugInfoEnabled(false);
            $logProvider.debugEnabled(false);
            
            $httpProvider.interceptors.push('anInterceptor');

            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/about', {
                    templateUrl: 'views/about.html'
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html'
                })
                .when('/admin/books', {
                    templateUrl: 'views/book.html',
                    controller: 'BookCtrl'
                })
                .when('/admin/books/add', {
                    templateUrl: 'views/book_form.html',
                    controller: 'BookAddCtrl'
                })
                .when('/admin/books/edit/:slug', {
                    templateUrl: 'views/book_form.html',
                    controller: 'BookAddCtrl'
                });

        });

})();
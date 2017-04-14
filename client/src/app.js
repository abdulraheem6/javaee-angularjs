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
            'ui.bootstrap',
            'angularUtils.directives.dirPagination'
        ])
        .config(function($routeProvider, $compileProvider, $logProvider) {
            //TODO: always uncomment source code below in production
            $compileProvider.debugInfoEnabled(false);
            $logProvider.debugEnabled(false);

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
                });

        });

})();

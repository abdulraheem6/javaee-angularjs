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
(function() {
'use strict';

/**
 * @ngdoc function
 * @name bookshopApp:controller:AlertCtrl
 * @description
 * # Retrieve all broadcast about alert
 */
angular.module('bookshopApp')
    .controller('AlertCtrl', function($log, $scope) {
        
        //remove alert
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
        
        // Picks event about error message
        $scope.$on('error', function() {
            $scope.alerts = [{
                    type: 'danger', 
                    msg: 'There was a problem in the server!'
            }];
        });
        
        // Picks event about success message
        $scope.$on('success', function() {
            $scope.alerts = [{
                    type: 'success', 
                    msg: 'Operation is success!'
            }];
        });
        
        $scope.$on('created', function() {
            $scope.alerts = [{
                    type: 'success', 
                    msg: 'Data is has been saved!'
            }];
        });
        
    });
})();


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
(function() {
'use strict';

/**
 * @ngdoc directive
 * @name bookshopApp.directive:Loader
 * @description
 * Receive broadcast to show or hide loader
 */
angular.module('bookshopApp')
    .directive('anLoader', function($log) {

        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/templates/loader.html',
            link: function(scope, element) {
                var shownType = element.css('display');
                function hideElement() {
                    element.css('display', 'none');
                }
                scope.$on('loader_show', function() {
                    $log.debug('receive broadcast to show loader');

                    element.css('display', shownType);
                });

                scope.$on('loader_hide', function() {
                    $log.debug('receive broadcast to hide loader');

                    hideElement();
                });

                hideElement();
            }
        };

    });
})();
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
(function() {
'use strict';

/**
 * @ngdoc interceptors
 * @name bookshopApp.service:AnInterceptor
 *
 * @description
 * intercept any $http request and response
 */
angular.module('bookshopApp')
    .factory('anInterceptor', function($q, $log, $rootScope) {

        var loadings = 0;

        var requestInterceptor = {
            request: function(config) {
                $log.debug('request interceptor');
                
                loadings++;
                $rootScope.$broadcast('loader_show');
                
                // do wathever you want with your request
                
                return config;
            },
            response: function(response) {
                $log.debug('response interceptor');

                if((--loadings) === 0) {
                    $rootScope.$broadcast('loader_hide');
                }

                if(response.status === 204) {
                    $rootScope.$broadcast('success');
                } else if(response.status === 201) {
                    $rootScope.$broadcast('created');
                }

                return response;
            },
            responseError: function(response) {
                $log.debug('responseError interceptor');

                if(response.status === 400) {
                    $rootScope.$broadcast('error');
                }
                
                if((--loadings) === 0) {
                    $rootScope.$broadcast('loader_hide');
                }
                
                return $q.reject(response);
            }
        };

        return requestInterceptor;
    });
})();
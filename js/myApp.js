angular.module('myApp', ['myAppViews','ui.grid','ui.bootstrap','ngRoute', 'ngAnimate'])
    .config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
    	$locationProvider.hashPrefix('!');
    	$routeProvider.otherwise({
    		redirectTo:'/'
    	});

    }])
    .run(['$rootScope',function($rootScope) {
		    $rootScope.$on('$routeChangeStart', function() {
		        $rootScope.isLoading = true;
		    });

		}]);

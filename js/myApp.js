angular.module('myApp', ['myAppViews','ui.bootstrap','ngRoute', 'ngAnimate'])
    .config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
    	$locationProvider.hashPrefix('!');
    	$routeProvider.otherwise({
    		redirectTo:'/'
    	});

    }]);

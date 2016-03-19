myViews.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'js/home/home.html',
            controller: 'homeCtrl'
        });
    }])
    .controller('homeCtrl', ['$scope','$location', function($scope,$location){

    	$scope.go = function(path){
    		$location.path(path);
    		console.log('go works');
    	};
    }]);

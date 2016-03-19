myViews.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/countries', {
            templateUrl: 'js/countriesList/countriesList.html',
            controller: 'listCtrl'
        });

    }])
    .controller('listCtrl', ['listRequest','cache', '$scope', function(listRequest,cache, $scope) {

    	listRequest.then(function(response){
    		cache.put('countriesList', response);
    		console.log(cache);

    	});

    }]);

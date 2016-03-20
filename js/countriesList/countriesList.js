myViews.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/countries', {
            templateUrl: 'js/countriesList/countriesList.html',
            controller: 'listCtrl'
        });

    }])
    .controller('listCtrl', ['listRequest', 'cache', '$scope', '$location', function(listRequest, cache, $scope, $location) {
       
        $scope.gridOptions = {};
        $scope.gridOptions.enableFiltering = true;
        listRequest.then(function(response) {
   
            console.log(response);
            $scope.gridOptions.data = response;
            $scope.gridOptions.columnDefs = [{ name: 'countryName', cellTemplate: '<div>'+'<a href="#!/countries/{{row.entity.countryName}}/capital">{{row.entity.countryName}}</a>'+'</div>' }, { name: 'countryCode' }, { name: 'capital' }, { name: 'areaSqKm' , cellFilter:'number: 0'}, { name: 'population', cellFilter:'number: 0' }, { name: 'continent' }];

        });

        $scope.go = function(path) {
            $location.path(path);
        };

    }]);

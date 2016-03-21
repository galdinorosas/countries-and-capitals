myViews.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/countries', {
            templateUrl: 'js/countriesList/countriesList.html',
            controller: 'listCtrl'
        });

    }])
    .controller('listCtrl', ['listRequest', 'cache', '$scope', '$location', '$rootScope', function(listRequest, cache, $scope, $location, $rootScope) {

        $scope.gridOptions = {};
        $scope.gridOptions.enableFiltering = true;
        listRequest.getResults().then(function(response) {

            console.log(response);
            console.log('filtered', listRequest.filterResults(response));
            $scope.gridOptions.data = listRequest.filterResults(response);
            $scope.gridOptions.columnDefs = [{ name: 'countryName', cellTemplate: '<div>' + '<a href="#!/countries/{{row.entity.countryName}}/capital">{{row.entity.countryName}}</a>' + '</div>' }, { name: 'countryCode' }, { name: 'capital' }, { name: 'areaSqKm', cellFilter: 'number: 0' }, { name: 'population', cellFilter: 'number: 0' }, { name: 'continent' }];
            $rootScope.isLoading = false;

        }, function(reject) {
            console.log('failed');
        });

        $scope.go = function(path) {
            $location.path(path);
        };

    }]);

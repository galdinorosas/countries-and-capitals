myViews.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/countries/:country/capital', {
            templateUrl: 'js/countriesInfo/countriesInfo.html',
            controller: 'countryInfoCtrl'
        });
    }])
    .controller('countryInfoCtrl', ['$scope', '$routeParams', '$location', 'listRequest','capitalInfo', function($scope, $routeParams, $location, listRequest, capitalInfo) {

        $scope.country = $routeParams.country;

        var countryname = $scope.country;

        capitalInfo(function(countryname){

        }).then(function(response){
        	console.log(response);
        });
       	console.log('1st test',$scope.capitalInfo);


        console.log('2nd test',$scope.capitalInfo);

        listRequest.then(function(response) {
            $scope.countriesList = response;
            console.log(response);
        }).then(function() {

            for (var i = 0; i < $scope.countriesList.length; i++) {
                if ($scope.countriesList[i].countryName === $scope.country) {
                    $scope.population = $scope.countriesList[i].population;
                    $scope.area = $scope.countriesList[i].areaSqKm;
                    $scope.capital = $scope.countriesList[i].capital;
                    $scope.capitalPopulation = 'N/A';
                    $scope.neighbors = 'N/A';
                }

            }
            console.log($scope.countriesList);

        });

        console.log($scope.country);



    }]);

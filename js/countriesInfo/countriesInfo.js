myViews.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/countries/:country/capital', {
            templateUrl: 'js/countriesInfo/countriesInfo.html',
            controller: 'countryInfoCtrl'
        });
    }])
    .controller('countryInfoCtrl', ['$scope', '$routeParams', '$location', 'listRequest', 'capitalInfo', '$rootScope', function($scope, $routeParams, $location, listRequest, capitalInfo, $rootScope) {

        $scope.country = $routeParams.country;
        var countryname = $scope.country;

        listRequest.getResults().then(function(response) {
            var filRes = listRequest.filterResults(response);
            $scope.details = listRequest.getDetails(filRes, countryname);


            $scope.countryCode = listRequest.getCountryCode(response, countryname);
            $scope.imgCountryCode = $scope.countryCode.countryCode.toLowerCase();
            capitalInfo.neighbors($scope.countryCode.countryCode).then(function(res) {
                console.log('res', res);
                if (res.data.geonames === undefined || res.data.geonames.length === 0) {
                    $scope.noNeighbors = true;
                } else {
                    $scope.neighbors = res.data.geonames;
                    $scope.noNeighbors = false;

                }

                $rootScope.isLoading = false;
            });


            capitalInfo.capital($scope.details.capital).then(function(capitalResponse) {
                console.log('capitalResponse', capitalResponse);
                if (capitalResponse.data.geonames.length === 0) {
                    $scope.capitalPopulation = '0';
                } else {
                    $scope.capitalPopulation = capitalResponse.data.geonames[0].population;
                }

            });

        }, function(reject) {

            console.log('error');
        });

        $scope.go = function(path) {
            $location.path(path);
        };



    }]);

angular.module('myAppLibrary', [])
    .constant('COUNTRIES_LIST_URL', '')
    .factory('cache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('super-cache');
    }])
    .factory('listRequest', ['$http', '$q', function($http, $q) {
            return $http({
                method: 'GET',
                url: 'http://api.geonames.org/countryInfo?',
                params: {
                	username: 'demo'
                }

            }).then(function successCallback(response) {
                return $q.when(response);
            }, function errorCallback(response) {
                console.log('list response error');
                return $q.when(response);
            });
    }]);

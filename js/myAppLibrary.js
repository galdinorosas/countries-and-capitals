angular.module('myAppLibrary', [])
    .constant('COUNTRIES_LIST_URL', 'http://api.geonames.org/countryInfoJSON')
    .constant('CAPITAL_INFO_URL', 'http://api.geonames.org/searchJSON')
    .factory('cache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('super-cache');
    }])
    .factory('listRequest', ['$http', 'COUNTRIES_LIST_URL', '$q', function($http, COUNTRIES_LIST_URL, $q) {
        return $http({
            method: 'GET',
            url: COUNTRIES_LIST_URL,
            params: {
                username: 'galdinorosas'
            },
            resonseType: 'json',
            cache: true

        }).then(function successCallback(response) {
            filteredResponse = [];
            for (var i = 0; i < response.data.geonames.length; i++) {
                var filteredCountryInfo = {};
                var countryName = response.data.geonames[i].countryName,
                    countryCode = response.data.geonames[i].countryCode,
                    capital = response.data.geonames[i].capital,
                    area = response.data.geonames[i].areaInSqKm,
                    population = response.data.geonames[i].population,
                    continent = response.data.geonames[i].continentName;

                filteredCountryInfo = {
                    countryName: countryName,
                    countryCode: countryCode,
                    capital: capital,
                    areaSqKm: area,
                    population: population,
                    continent: continent
                };

                filteredResponse.push(filteredCountryInfo);
            }

            return $q(function(resolve, reject) {
                if (filteredResponse.length === response.data.geonames.length) {
                    resolve(filteredResponse);
                } else {
                    reject(console.log('capitals list did not work.'));
                }

            });
        }, function errorCallback(response) {
            console.log('list response error');
            return $q.when(response.data);
        });
    }])
    .factory('capitalInfo', ['$http', 'CAPITAL_INFO_URL', '$q', function($http, CAPITAL_INFO_URL, $q) {

            // return function(country) {
            //     return $http({
            //         method: 'GET',
            //         url: CAPITAL_INFO_URL,
            //         params: {
            //             q: country,
            //             name: country,
            //             name_equals: country,
            //             isNameRequired: true
            //         }
            //     });

            // }


            return function(country){
              return $http({
                    method: 'GET',
                    url: CAPITAL_INFO_URL,
                    params: {
                        q: country,
                        name: country,
                        name_equals: country,
                        isNameRequired: true,
                        username: 'galdinorosas'
                    }
                })
                .then(function(response){
                  return $q.when(response);
                });
            };


            
        }]);

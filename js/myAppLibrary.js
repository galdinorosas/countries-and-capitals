angular.module('myAppLibrary', [])
    .constant('COUNTRIES_LIST_URL', 'http://api.geonames.org/countryInfoJSON')
    .constant('CAPITAL_INFO_URL', 'http://api.geonames.org/searchJSON')
    .constant('NEIGHBORS_URL', 'http://api.geonames.org/neighboursJSON')
    .factory('cache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('super-cache');
    }])
    .factory('listRequest', ['$http', 'COUNTRIES_LIST_URL', '$q', function($http, COUNTRIES_LIST_URL, $q) {
        var factory = {};

        factory.getResults = function() {

            return $http({
                method: 'GET',
                url: COUNTRIES_LIST_URL,
                params: {
                    username: 'galdinorosas'
                },
                resonseType: 'json',
                cache: true

            });

        };

        factory.getCountryCode = function(countriesList, countryName) {
            var detailsObj = {};
            for (var i = 0; i < countriesList.data.geonames.length - 1; i++) {

                if (countriesList.data.geonames[i].countryName === countryName) {
                    detailsObj.countryCode = countriesList.data.geonames[i].countryCode;
                    console.log('detailsObj', detailsObj);
                }
            }
            return detailsObj;
        };


        factory.filterResults = function(countriesResults) {
            var filteredResponse = [];
            console.log('cr', countriesResults);
            for (var i = 0; i < countriesResults.data.geonames.length; i++) {
                var filteredCountryInfo = {};
                var countryName = countriesResults.data.geonames[i].countryName,
                    countryCode = countriesResults.data.geonames[i].countryCode,
                    capital = countriesResults.data.geonames[i].capital,
                    area = countriesResults.data.geonames[i].areaInSqKm,
                    population = countriesResults.data.geonames[i].population,
                    continent = countriesResults.data.geonames[i].continentName;

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
            return filteredResponse;
        };

        factory.getDetails = function(countriesList, countryName) {
            var detailsObj = {};
            for (var i = 0; i < countriesList.length - 1; i++) {

                if (countriesList[i].countryName === countryName) {
                    detailsObj.population = countriesList[i].population;
                    detailsObj.area = countriesList[i].areaSqKm;
                    detailsObj.capital = countriesList[i].capital;
                    detailsObj.capitalPopulation = 'N/A';
                    detailsObj.neighbors = 'N/A';
                    break;
                }
            }
            return detailsObj;

        };

        return factory;



    }])
    .factory('capitalInfo', ['$http', 'CAPITAL_INFO_URL', '$q', 'NEIGHBORS_URL', function($http, CAPITAL_INFO_URL, $q, NEIGHBORS_URL) {

        var factory = {};

        factory.capital = function(capitalName) {
            return $http({
                method: 'GET',
                url: CAPITAL_INFO_URL,
                params: {
                    q: capitalName,
                    name: capitalName,
                    name_equals: capitalName,
                    isNameRequired: true,
                    username: 'galdinorosas'
                },
                cache: true
            });
        };

        factory.neighbors = function(cID) {
            console.log('cid', cID.countryCode);
            var code = cID.countryCode;
            return $http({
                method: 'GET',
                url: NEIGHBORS_URL,
                params: {
                    country: cID,
                    username: 'galdinorosas'
                },
                cache: true
            });
        };

        return factory;

    }]);

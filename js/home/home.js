myViews.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'js/home/home.html',
            controller: 'homeCtrl'
        });
    }])
    .controller('homeCtrl', ['$scope', '$location', '$timeout', '$rootScope', function($scope, $location, $timeout, $rootScope) {

        $scope.go = function(path) {
            $location.path(path);
            console.log('go works');
        };
        $rootScope.isLoading = false;

    }]);

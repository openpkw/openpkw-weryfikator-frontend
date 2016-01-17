(function() {
    'use strict';
    angular
        .module('app')
        .config(['$routeProvider', '$locationProvider',
             function ($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
                $routeProvider
                    .when('/', {
                        templateUrl: 'app/components/calc/calc.view.html',
                        controller: 'CalcController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }]);
})();

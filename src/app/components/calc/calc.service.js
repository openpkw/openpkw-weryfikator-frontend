(function() {
    'use strict';
    angular
        .module('app.calc')
        .service('CalcService', ['$http', '$q', 'CalcDataLoader', CalcService]);

    function CalcService($http, $q, CalcDataLoader) {
        var getGeographyTaxonomy = [];
        var poolingStationsData = {};

        this.getGeographyTaxonomy = function() {
            return $http.get('/assets/resources/teryt.json');
        };

        this.loadPollingStationsData = function() {
            var deferred = $q.defer();
            $http.get('/assets/resources/106101.xml')
                .then(function(response) {
                    deferred.resolve({
                        candidates: CalcDataLoader.loadCandidates(response.data),
                        pollingStationsData: CalcDataLoader.loadPollingStationsData(response.data)
                    });
                });
            return deferred.promise;
        };
    }
})();

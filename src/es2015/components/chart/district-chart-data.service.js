const HTTP = new WeakMap();
const Q = new WeakMap();

class DistrictChartDataService {
    constructor($q, $http) {
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    loadPollingData(districtNumber) {
        var deferred = Q.get(DistrictChartDataService.instance).defer();
        DistrictChartDataService.instance.data = HTTP.get(DistrictChartDataService.instance).get('/api/openpkw/districtVotes/' + districtNumber).then((data) => {
            deferred.resolve(data);
            return deferred.promise;
        });

    };

    getGeneralResults() {
        var deferred = Q.get(DistrictChartDataService.instance).defer();
        DistrictChartDataService.instance.data.then((data) => {
            var votes = data.data.voteCommittees.sort((a, b) => {
                if (a.votes < b.votes) return 1;
                if (a.votes > b.votes) return -1;
                return 0;
            });
            var totalVotes = data.data.votersVoteNumber;

            var series = votes.map((item) => (item.votes / totalVotes) * 100);

            var result = {
                "chart": {
                    "labels": votes.map((item) => item.symbol),
                    "series": [
                        series
                    ]
                },
                "max": series.reduce((prev, curr) => prev > curr ? prev : curr)
            };
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getProtocolCount() {
        var deferred = Q.get(DistrictChartDataService.instance).defer();
        DistrictChartDataService.instance.data.then((data) => {
            var result = {
                "chart": {
                    "labels": ["Odebrane", "Nieodebrane"],
                    "series": [data.data.protocolNumber, data.data.protocolAllNumber - data.data.protocolNumber]
                },
                "sum": data.data.protocolAllNumber
            };
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getTurnoutData() {
        var deferred = Q.get(DistrictChartDataService.instance).defer();
        DistrictChartDataService.instance.data.then((data) => {
            var result = {
                "chart": {
                    "labels": ["Odebrane", "Nieodebrane"],
                    "series": [data.data.votersVoteNumber, data.data.allVotersNumber - data.data.votersVoteNumber]
                },
                "sum": data.data.allVotersNumber
            };
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    static factory($q, $http) {
        DistrictChartDataService.instance = new DistrictChartDataService($q, $http);
        DistrictChartDataService.instance.loadPollingData();
        return DistrictChartDataService.instance;
    }
}

DistrictChartDataService.factory.$inject = ['$q', '$http'];


export default DistrictChartDataService;
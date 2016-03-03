const HTTP = new WeakMap();
const Q = new WeakMap();

class DistrictDataService {
    constructor($q, $http) {
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    loadTableData() {
        var deferred = Q.get(DistrictDataService.instance).defer();
        DistrictDataService.instance.data = HTTP.get(DistrictDataService.instance).get('http://rumcajs.open-pkw.pl:9080/openpkw/districts').then((data) => {
            var districts = data.data.districts;
            var result = new Map();
            for (let district of districts) {
                result.set(district.number, {
                    cities: district.cities,
                    number: district.number,
                    name: district.name,
                    peripherals: Math.round(10000 * district.protocolNumber / district.peripheralsNumber) / 100
                });
            }
            deferred.resolve(result);
            return deferred.promise;
        });

    };

    getDistrictDataList() {
        var deferred = Q.get(DistrictDataService.instance).defer();
        DistrictDataService.instance.data.then((data) => {
            deferred.resolve(Array.from(data.values()));
        });
        return deferred.promise;
    }

    getDistrictDataMap() {
        var deferred = Q.get(DistrictDataService.instance).defer();
        DistrictDataService.instance.data.then((data) => {
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    static factory($q, $http) {
        DistrictDataService.instance = new DistrictDataService($q, $http);
        DistrictDataService.instance.loadTableData();
        return DistrictDataService.instance;
    }
}

DistrictDataService.factory.$inject = ['$q', '$http'];


export default DistrictDataService;
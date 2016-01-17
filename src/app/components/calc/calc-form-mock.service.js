(function() {
    'use strict';
    angular
        .module('app.calc')
        .service('FormMock', FormMock);

    FormMock.$inject = ['$http'];
    function FormMock($http) {
        var service = {
            getExampleData : getExampleData
        };

        return service;

        function getExampleData() {
            return $http.get('/assets/resources/example-form.json');
        }
    }
})();

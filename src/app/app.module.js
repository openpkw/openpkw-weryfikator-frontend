(function() {
    'use strict';
    angular.module('app', ['ngRoute',
        'app.calc']);

    angular.module('app.calc', ['validation.common', 'app.calc.validator.president']);
})();


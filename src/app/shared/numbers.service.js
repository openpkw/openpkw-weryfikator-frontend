(function() {
    'use strict';
    angular
        .module('numbers', [])
        .service('numbersService', numbersService);
    function numbersService() {
        var service =  {
            intVal : intVal
        };

        function intVal(mixedVar, base) {
            var tmp;
            var type = typeof mixedVar;

            if (type === 'boolean') {
                return +mixedVar;
            } else if (type === 'string') {
                tmp = parseInt(mixedVar, base || 10);
                return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
            } else if (type === 'number' && isFinite(mixedVar)) {
                return mixedVar;
            }
            return 0;
        }

        return service;
    }
})();

(function() {
    'use strict';
    angular
        .module('validation.common', [])
        .directive('positiveInt', positiveInt);
    function positiveInt() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var allowedKeyCodes = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
                                96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110];
                element.bind('keydown', function(event) {
                    if (allowedKeyCodes.indexOf(event.which) === -1) {
                        event.preventDefault();
                    }
                });
            }
        };
    }
})();

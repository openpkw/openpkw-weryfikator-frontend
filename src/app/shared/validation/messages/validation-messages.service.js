(function() {
    'use strict';
    angular
        .module('validation.messages', [])
        .service('ValidationMessagesService', ValidatorMessagesService);

    function ValidatorMessagesService() {
        var hardErrors = {};
        var softErrors = {};

        var service = {
            addHardError: addHardError,
            getHardErrors: getHardErrors,
            hardErrorsExist: hardErrorsExist,
            removeHardError: removeHardError,
            softErrorsExist: softErrorsExist,
            getSoftErrors: getSoftErrors,
            removeSoftError: removeSoftError
        };

        function addHardError(key, message) {
            hardErrors[key] = {key:key, message:message};
        }
        function getHardErrors() {
            return hardErrors;
        }
        function hardErrorsExist() {
            return !angular.equals({}, hardErrors);
        }
        function removeHardError(key) {
            delete hardErrors[key];
        }
        function getSoftErrors() {
            return softErrors;
        }
        function softErrorsExist() {
            return !angular.equals({}, softErrors);
        }
        function removeSoftError(key) {
            delete softErrors[key];
        }

        return service;
    }
})();

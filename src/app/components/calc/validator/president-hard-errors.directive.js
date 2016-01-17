(function() {
    angular
    .module('app.calc.validator.president', ['validation.messages', 'numbers'])
    .directive('presidentHardErrorP1', presidentHardErrorP1)
    .directive('presidentHardErrorP2', presidentHardErrorP2);
    presidentHardErrorP1.$inject = ['ValidationMessagesService', 'numbersService'];

    function presidentHardErrorP1(ValidationMessagesService, numbersService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('change', function (event) {
                    var modelValue = scope.vm.formData.rozliczenieKart.pole4;
                    var compareModelValue = scope.vm.formData.rozliczenieKart.pole1;
                    compareModelValue = numbersService.intVal(compareModelValue);
                    modelValue = numbersService.intVal(modelValue);
                    if (modelValue >= 0 && compareModelValue >= 0 &&
                        modelValue > compareModelValue) {
                        element.addClass('has-error');
                        angular.element(
                            document.querySelectorAll('[president-hard-error-p1]')).
                            addClass('has-error');
                        ValidationMessagesService.addHardError('P1',
                            'Liczba osób, którym wydano karty do głosowania (pkt. 4), nie może ' +
                            'być większa od liczby wyborców uprawnionych do głosowania (pkt. 1).');
                    } else {
                        ValidationMessagesService.removeHardError('P1');
                        angular.element(
                            document.querySelectorAll('[president-hard-error-p1]'))
                            .removeClass('has-error');
                        element.removeClass('has-error');
                    }
                });
            }
        };
    }
    function presidentHardErrorP2(ValidationMessagesService, numbersService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('change', function (event) {
                    var modelValue = scope.vm.formData.wynikiGlosowania.pole9;
                    var compareModelValue1 = scope.vm.formData.wynikiGlosowania.pole10;
                    var compareModelValue2 = scope.vm.formData.wynikiGlosowania.pole11;
                    modelValue = numbersService.intVal(modelValue);
                    compareModelValue1 = numbersService.intVal(compareModelValue1);
                    compareModelValue2 = numbersService.intVal(compareModelValue2);
                    if (modelValue >= 0 && compareModelValue1 >= 0 && compareModelValue2 >= 0 &&
                        modelValue !== compareModelValue1 + compareModelValue2) {
                        angular.element(
                            document.querySelectorAll('[president-hard-error-p2]')).
                            addClass('has-error');
                        element.addClass('has-error');
                        ValidationMessagesService.addHardError('P2',
                            'Liczba kart wyjętych z urny (pkt. 9) musi być równa sumie liczby ' +
                            'kart nieważnych (pkt. 10) i liczby kart ważnych (pkt. 11)');
                    } else {
                        ValidationMessagesService.removeHardError('P2');
                        angular.element(
                            document.querySelectorAll('[president-hard-error-p2]'))
                            .removeClass('has-error');
                        element.removeClass('has-error');
                    }
                });
            }
        };
    }

})();

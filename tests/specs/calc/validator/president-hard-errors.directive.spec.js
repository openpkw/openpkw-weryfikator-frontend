describe('directives: president-hard-errors', function() {
    var mockFormData;
   
    beforeEach(function () {
        module('app.calc');
        mockFormData  = {formData:{rozliczenieKart:{}}};
    });

    describe('directive: presidentHardErrorP1', function() {
        var scope, elem, directive, compiled, html;
        beforeEach(function () {
            html = '<input type="number" president-hard-error-p1 ng-model="vm.formData.rozliczenieKart.pole4"/>';
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                elem = angular.element(html);
                compiled = $compile(elem);
                compiled(scope);
                scope.vm = mockFormData;
                scope.$digest();
            });
        });

        it('Should not set has-error class if data in both model fields are the same',
            function() {
                applyScopeValue(undefined, undefined);
                expect(elem.hasClass('has-error')).toBe(false);
                applyScopeValue(0, 0);
                expect(elem.hasClass('has-error')).toBe(false);
                applyScopeValue(undefined, 0);
                expect(elem.hasClass('has-error')).toBe(false);
                applyScopeValue(0, undefined);
                expect(elem.hasClass('has-error')).toBe(false);
                applyScopeValue(100, 100);
                expect(elem.hasClass('has-error')).toBe(false);
            }
        );
        it('Should set has-error class if pole4 is grather than pole1',
            function() {
                applyScopeValue(4, 10);
                expect(elem.hasClass('has-error')).toBe(true);
                applyScopeValue(0, 1);
                expect(elem.hasClass('has-error')).toBe(true);
                applyScopeValue(undefined, 1);
                expect(elem.hasClass('has-error')).toBe(true);
            }
        );
        it('Should not set has-error class if pole1 is grather than pole4',
            function() {
                applyScopeValue(10, 4);
                expect(elem.hasClass('has-error')).toBe(false);
                applyScopeValue(1, 0);
                expect(elem.hasClass('has-error')).toBe(false);
                applyScopeValue(1, undefined);
                elem.triggerHandler('change');
                expect(elem.hasClass('has-error')).toBe(false);
            }
        );

        function applyScopeValue(pole1, pole4) {
            scope.vm.formData.rozliczenieKart.pole1 = pole1;
            scope.vm.formData.rozliczenieKart.pole4 = pole4;
            scope.$apply();
            elem.triggerHandler('change');
        }
    });
});

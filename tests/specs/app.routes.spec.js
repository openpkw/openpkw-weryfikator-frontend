describe('App routes', function () {
    var route;

    beforeEach(module('app'));

    beforeEach(inject(function ($route) {
        route = $route;
    }));

    it('Should use CalcController and calcView.html on "/"', function () {
        expect(route.routes['/'].controller).toBe('CalcController');
        expect(route.routes['/'].templateUrl).toBe('app/components/calc/calc.view.html');
    });

    it('Should redirect to "/" when undefined route', function () {
        expect(route.routes[null].redirectTo).toBe('/')
    });
});

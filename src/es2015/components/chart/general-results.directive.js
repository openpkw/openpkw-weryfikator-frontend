const SERVICE = new WeakMap();

class GeneralResultsDirective {
    constructor(chartDataService) {
        SERVICE.set(this, chartDataService);

        this.restrict = 'AE';
        this.scope = {};
        this.template = '<div id="general-results" class="ct-chart ct-perfect-fourth"></div>';
    }

    static directiveFactory(chartDataService) {
        GeneralResultsDirective.instance = new GeneralResultsDirective(chartDataService);
        return GeneralResultsDirective.instance;
    }

    link(scope, elem, attrs) {
        SERVICE.get(GeneralResultsDirective.instance).getGeneralResults().then((data) => {
            var options = {
                high: data.max,
                low: 0
            };
            new Chartist.Bar('#general-results', data.chart, options);
        });
    }
}

GeneralResultsDirective.directiveFactory.$inject = ['chartDataService'];

export default GeneralResultsDirective;
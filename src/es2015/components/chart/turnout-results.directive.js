//import ChartDataService from './chart-data.service';

const SERVICE = new WeakMap();

class TurnoutResultsDirective {
    constructor(chartDataService) {
        SERVICE.set(this, chartDataService);

        this.restrict = 'AE';
        this.scope = {};
        this.template = '<div id="turnout-results" class="ct-chart ct-perfect-fourth"></div>';
    }

    static directiveFactory(chartDataService) {
        TurnoutResultsDirective.instance = new TurnoutResultsDirective(chartDataService);
        return TurnoutResultsDirective.instance;
    }

    link(scope, elem, attrs) {
        SERVICE.get(TurnoutResultsDirective.instance).getProtocolCount().then((data) => {
            new Chartist.Pie('#turnout-results', data.chart, {});
        });
    }
}

TurnoutResultsDirective.directiveFactory.$inject = ['chartDataService'];

export default TurnoutResultsDirective;
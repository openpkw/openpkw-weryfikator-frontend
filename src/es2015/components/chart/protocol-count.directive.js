//import ChartDataService from './chart-data.service';

const SERVICE = new WeakMap();

class ProtocolCountDirective {
    constructor(chartDataService) {
        SERVICE.set(this, chartDataService);

        this.restrict = 'AE';
        this.scope = {};
        this.template = '<div id="protocol-count" class="ct-chart ct-perfect-fourth"></div>';
    }

    static directiveFactory(chartDataService) {
        ProtocolCountDirective.instance = new ProtocolCountDirective(chartDataService);
        return ProtocolCountDirective.instance;
    }

    link(scope, elem, attrs) {
        SERVICE.get(ProtocolCountDirective.instance).getProtocolCount().then((data) => {
            new Chartist.Pie('#protocol-count', data.chart, {});
        });
    }
}

ProtocolCountDirective.directiveFactory.$inject = ['chartDataService'];

export default ProtocolCountDirective;
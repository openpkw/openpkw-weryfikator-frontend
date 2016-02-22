import ChartDataService from './chart-data.service';
import GeneralResultsDirective from './general-results.directive';
import ProtocolCountDirective from './protocol-count.directive';
import TurnoutResultsDirective from './turnout-results.directive';

var moduleName = 'app.chartModule';

angular.module(moduleName, [])
    .factory('chartDataService', ChartDataService.factory);

angular.module(moduleName)
    .directive('generalResultsChart', GeneralResultsDirective.directiveFactory);

angular.module(moduleName)
    .directive('protocolCountChart', ProtocolCountDirective.directiveFactory);

angular.module(moduleName)
    .directive('turnoutResultsChart', TurnoutResultsDirective.directiveFactory);

export default moduleName;
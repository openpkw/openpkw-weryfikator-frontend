import ElectionMapService from './election-map.service';
import ElectionMapDirective from './election-map.directive';

var moduleName = 'app.mapModule';

angular.module(moduleName, [])
    .factory('ElectionMapService', ElectionMapService.factory);

angular.module(moduleName)
    .directive('electionMap', ElectionMapDirective.directiveFactory);

export default moduleName;
import CandidatesController from './candidates.controller';
import CommitteesController from './committees.controller';
import DistrictController from './district.controller';

var moduleName = 'app.tablesModule';

angular.module(moduleName, ['datatables', 'datatables.bootstrap']).controller('districtCtrl', DistrictController);

angular.module(moduleName).controller('committeesCtrl', CommitteesController);

angular.module(moduleName).controller('candidatesCtrl', CandidatesController);

export default moduleName;
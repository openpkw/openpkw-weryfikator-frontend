import DistrictDataService from './district-data.service';
import MainController from './main.controller';

var moduleName = 'app.mainModule';

angular.module(moduleName, []).factory('districtDataService', DistrictDataService.factory);

angular.module(moduleName).controller('mainController', MainController);

export default moduleName;
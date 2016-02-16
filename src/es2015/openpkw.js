import MainController from './components/main/main.controller.js';
import ElectionMap from './components/map';
import Charts from './components/chart';
import Tables from './components/table';

angular.module('opkwApp', [ElectionMap, Charts, Tables])
    .controller('mainController', MainController);
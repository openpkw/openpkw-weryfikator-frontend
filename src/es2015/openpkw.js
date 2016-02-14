import MainController from './components/main/main.controller.js';
import ElectionMap from './components/map';
import Charts from './components/chart';

angular.module('opkwApp', [ElectionMap, Charts])
    .controller('mainController', MainController);
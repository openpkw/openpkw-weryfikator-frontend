import MainController from './components/main/main.controller.js';
import ElectionMap from './components/map';

angular.module('opkwApp', [ElectionMap])
    .controller('mainController', MainController);
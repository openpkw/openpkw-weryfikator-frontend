import Main from './components/main';
import ElectionMap from './components/map';
import Charts from './components/chart';
import Tables from './components/table';

angular.module('opkwApp', ['angular-chartist', ElectionMap, Charts, Tables, Main]);
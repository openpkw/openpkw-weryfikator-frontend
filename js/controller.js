var app = angular.module('app', []);

app.controller('TestController', function ($scope, $http) {

    $http.jsonp('http://www.mocky.io/v2/564ba908110000c94accf07a?callback=JSON_CALLBACK')
    .then(function successCallback(response) {
        $scope.data = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });

    /*$scope.data = [{
        name: 'Shidhin',
        info: 'I am from Dubai'
    }, {
        name: 'Someone',
        info: 'I am from New york'
    }];*/
});
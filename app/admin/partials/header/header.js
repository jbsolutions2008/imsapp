'use strict';

angular.module('myApp.admin-header', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-header', {
    templateUrl: 'admin/partial/header/header.html',
    controller: 'admin-header-controller'
  });
}])

.controller('admin-header-controller', ['$scope', function($scope) {
 
}]);


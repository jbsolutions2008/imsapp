'use strict';
var db = new PouchDB('imspdb');
//var app = angular.module("uigridApp", ["ui.grid", "ui.grid.pagination"]);
angular.module('myApp.admin-dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-dashboard', {
    templateUrl: 'admin/dashboard/dashboard.html',
    controller: 'admin-dashboard-controller'
  });
}])

.controller('admin-dashboard-controller', ['$scope', '$location', function($scope, $location) {
  //CHECKING FOR LOGGED IN DATA STORED IN SESSION
  var loggedInData = sessionStorage.getItem("adminLogin");  
  //IF NOT FOUND REDIRECT TO LOGIN PAGE
  if(loggedInData == null){
    $location.path('/admin-login');
  }
  // LOGOUT FUNCTION
  $scope.logout = function() { 
    sessionStorage.removeItem("adminLogin");
    $location.path('/admin-login');
  }
  //REDIRECT TO PRODUCT LIST VIEW
  $scope.redirecttoproductlist = function() {     
    $location.path('/admin-product-list');
  }
  //REDIRECT TO ADD PRODUCT VIEW
  $scope.redirecttoaddproduct = function() { 
      //PASS ID IN QUERY STRING WITH URL
      $location.$$search ={id:0}
      $location.$$path = '/admin-add-edit-product'
      $location.$$compose()        
  }    
  
    
  //$window.location.href = '/admin-login/admin-login.html';
}]);



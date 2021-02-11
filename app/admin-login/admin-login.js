'use strict';
var db = new PouchDB('imspdb');
//var db = new PouchDB('http://localhost:5984/imspdb');

var loading = false;

angular.module('myApp.admin-login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-login', {
    templateUrl: 'admin-login/admin-login.html',
    controller: 'admin-login-controller'
  });
}])

.controller('admin-login-controller', ['$scope', '$location', function($scope, $location) {
  $scope.showloading = false;
  $scope.login = function(user) {         
    if(user != undefined)  {      
      $scope.showloading = true;       
        var params = {
            table: "tAdminUser",
            username: user.username,
            password: user.password
        }     
          // LOOKING FOR MATCHING DATA IN DATABASE           	
            db.find({
              selector: params,            
            }).then(data => {   
              //GOT RESPONSE FROM DATABASE              
                if (data["docs"] == ""){       
                  $scope.loading = false;
                  $scope.errorMessage = "No Matching Found";                   
                }               
                else
                {                  
                  var adminLoginLocalstorage = {
                    id: data["docs"][0]._id,
                    name: data["docs"][0].name
                  }  
                  //STORE VALUES IN SESSION STORAGE                                                             
                  sessionStorage.setItem("adminLogin", JSON.stringify(adminLoginLocalstorage));      
                  $location.path('/admin-dashboard');    
                }
                $scope.$apply();              
            }).catch(err => {
              $scope.loading = false;              
              $scope.errorMessage = err;    
              $scope.$apply();
             });                    
        };        
    }
    
}]);




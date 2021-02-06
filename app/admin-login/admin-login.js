'use strict';
//var db = new PouchDB('IMSDB');
//var db = new PouchDB('http://localhost:1234/ims');
//console.log(db);
angular.module('myApp.admin-login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-login', {
    templateUrl: 'admin-login/admin-login.html',
    controller: 'admin-login-controller'
  });
}])

.controller('admin-login-controller', ['$scope', function($scope) {
  $scope.master = {};

  $scope.login = function(user) {
    // return new Promise(resolve => { 	
    // var params = {
    //   table: "tAdminUser",
    //   username: user.username,
    //   password: user.password
    // }        	
    //   var result = db.find({
    //       selector: params,			
    //     });
    //     console.log(result);
    //     resolve(result);			
    // })
  };		
    // GetDataSet(params).then((data) => {           
    //     if (data["docs"] == "")
    //         res.json({ success: false, data: 'No Matching Found!!!' });
    //     else
    //         res.json({ success: true, data: data["docs"] });
    // });       
    // db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    //   console.log(doc.rows);      
    // });
    // console.log(user);
  

  //$scope.reset();
}]);


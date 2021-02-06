'use strict';
//var db = new PouchDB('IMSDB');
var db = new PouchDB('http://localhost:5984/imspdb');
//addAdminUser();
// var remoteCouch = true;
// var remoteDB = new PouchDB('http://localhost:5984/imspdb?name=admin&password=p@ssw0rd')

// db.replicate
//   .to(remoteDB)
//   .on('complete', function () {
//     // local changes replicated to remote
//   }).on('error', function (err) {
//     // error while replicating
//   })

// db.sync(remoteDB, {live: true})
//addTodo('test');
function addAdminUser() {	
	var adminuser = {
	  _id: new Date().toISOString(),
	  table: 'tAdminUser',
	  name: 'JBSolutions',
	  username: 'jbsolutions',
	  password: 'jb%0lutions',	  
	};
	db.put(adminuser, function callback(err, result) {
	  if (!err) {
		console.log('Successfully added user!');
	  }
	});
  }
// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',  
  'myApp.admin-login'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/admin-login'});
}]);

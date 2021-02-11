'use strict';
var db = new PouchDB('imspdb');

var remoteCouch = true;
var remoteDB = new PouchDB('http://localhost:5984/imspdb')
addAdminUser();
// db.replicate
//   .to(remoteDB)
//   .on('complete', function (response) {
// 	  console.log(response);
//     // local changes replicated to remote
//   }).on('error', function (err) {
// 	console.log(err);
//     // error while replicating
//   })
// DATABASE SYNC WITH BROWSER DATABASE WHEN APP LOADING
db.sync(remoteDB, {live: true, "auth": {username:"admin", password:"p@ssw0rd"}})

//FUNCTION TO ADD ADMIN USER IN DATABASE
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
  'myApp.admin-login',
  'myApp.admin-dashboard',
  'myApp.admin-header',
  'myApp.admin-product-list',
  'myApp.admin-add-edit-product',
  'ui.grid', 
  'ui.grid.pagination'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/admin-product-list', {templateUrl: 'admin/manage-product/list/list.html', controller: 'admin-product-list-controller'});
// DEFAULT REDIRECT TO LOGIN PAGE
  $routeProvider.otherwise({redirectTo: '/admin-login'});
}]);


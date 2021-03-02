'use strict';
var db = new PouchDB('imspdb');

var remoteCouch = true;
var remoteDB = new PouchDB('http://admin:admin@localhost:5984/imspdb')
//addAdminUser();
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
let options = {
  live: true,
  retry: true,
  continuous: true
};
db.sync(remoteDB, options)
    .on('error', err => console.log('PouchDB Error NFCs', err))
    .on('active', err => console.log('PouchDB Active', err))
    .on('complete', err => console.log('PouchDB Complete', err));
//db.sync(remoteDB, {live: true, "auth": {username:"kalps", password:"kalps123"}})


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


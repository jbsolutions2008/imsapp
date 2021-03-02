'use strict';
var db = new PouchDB('imspdb');

angular.module('myApp.admin-product-list', ['ngRoute', 'ui.grid', 'ui.grid.pagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-product-list', {
    templateUrl: 'admin/manage-product/list/list.html',
    controller: 'admin-product-list-controller'
  });
}])

.controller('admin-product-list-controller', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
  //DECLARE SELECTED PRODUCT ARRAY
  $scope.selectedProducts = [];  
  $scope.showloading = false;  
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
  // DISPLAY UI GRID OPTION
  $scope.gridOptions = {
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 5,
    columnDefs: [
      { name: '', field: 'isselected', enableFiltering: false, enableSorting: false, enableColumnMenu: false,
      headerCellTemplate: '<div><a style="cursor:pointer;color:red" ng-click="grid.appScope.removeMultipleRow()" >Delete</a></div>',
      cellTemplate: '<div><input vertical-align: middle;horizontal-align:middle" type="checkbox" value="false" name="checkbox" ng-model="row.entity.isselected" ng-change="grid.appScope.selectedcheckboxes(row.entity)" ></div>' },
      { name: 'Name', field: 'name' },
      { name: 'Price', field: 'price' },
      { name: 'Brand', field: 'brand' },
      { name: 'Details', field: 'details' },
      { name: 'Action', field: 'action', enableFiltering: false, enableSorting: false, enableColumnMenu: false,
        cellTemplate:'<div class="ngCellText">' + '<a style="cursor:pointer" ng-click="grid.appScope.editRow(row)">Edit</a>&#160;&#160;&#160;<a style="cursor:pointer" ng-click="grid.appScope.removeRow(row)">Delete</a></div>', 
      },    
    ],
    onRegisterApi: function (gridApi) {
      $scope.grid1Api = gridApi;
    }
    };   
         
    var params = {
        table: "tProduct"
    }   
    // FETCH DATA BASED ON PASSING VALUE FROM DATABASE           
    db.find({
      selector: params,
      fields: ['name', 'brand', 'price', 'details', '_id'],
    }).then(data => { 
        //RESPONSE ASSIGNED TO LOCAL VARIABLES           
        $scope.products = data["docs"];       
        //ADDED ADDITIONAL FIELD FOR CHECKBOX ADDED FOR DELETE AND DEGAULT SET TO UNCHECKED    
        for (var i = 0; i < $scope.products.length; i++) {
            $scope.products[i].isselected = false;
        }     
        //FINALLY UPDATED THE RID OPTION DATA FOR DISPLAY ON PAGE         
        $scope.gridOptions.data = $scope.products;
        //COMMIT CHANGES TO SCOPE FOR UPDATE
        $scope.$applyAsync();
    }).catch(err => {
        return err;      
     });            
    
     //ADD CHECKBOX IDS IN ARRAY FOR DELETE - WHEN CHECKED
     $scope.selectedcheckboxes = function (data) {            
      if(data.isselected)  {
        $scope.selectedProducts.push(data._id);        
      } else {
        var index = $scope.selectedProducts.indexOf(data._id);
        if (index != undefined){
          $scope.selectedProducts.splice(index, 1);
        }
      }                   
     }
     // REMOVE SELECTED PRODUCTS
     $scope.removeMultipleRow = function () {            
      $scope.showloading = true;
      // GETTING PRODUCTS IDS FROM ARRAY  
      for (var i = 0; i < $scope.selectedProducts.length; i++) {
          //ASSIGNE TO SCOPE ID
            $scope._id = $scope.selectedProducts[i];            
            //GET DOCUMENT FROM ID SPPLY
            db.get($scope._id).then(doc => {				        
                // REMOVE DATA FROM DATABASE
                db.remove(doc._id, doc._rev).then(response =>{
                  if(response.ok){          
                    //SUCCESS          
                    $scope.showloading = false;
                    $scope.successMessage = "Deleted Successfully";
                  } else {
                    //ERROR
                    $scope.showloading = false;
                    $scope.errorMessage = "Something issue!!!";
                  }
                });
              }).catch(function (err) {
                //EXCEPTION
                $scope.showloading = false;
                $scope.successMessage = err;  
              });  
              //FINALLY REMOVED DATA FROM GRID
              var index = $scope.gridOptions.data.findIndex(record => record._id === $scope._id);              
              if (index !== -1) {                
                  $scope.gridOptions.data.splice(index, 1);
              }                          
          }      
    }
    // REDIRECT TO VIEW/EDIT PRODUCT DETAILS PAGE
     $scope.editRow = function(row) {
       //REDIRECT TO EDIT PRODUCT DETAILS WITH SUPPLIED ID
      $scope._id = row.entity._id;
      $location.$$search ={id:$scope._id}
      $location.$$path = '/admin-add-edit-product'
      $location.$$compose()
      }

    // DELETE SELECTED PRODUCT
     $scope.removeRow = function(row) {      
      $scope.showloading = true;     
      $scope._id = row.entity._id;
      //GET DATABASE DOCUMENT
      db.get($scope._id).then(doc => {				        
        //THEN BY ID IT WILL DELETE IT
          db.remove(doc._id, doc._rev).then(response =>{
            if(response.ok){
              //SUCCESS
              $scope.showloading = false;
              $scope.successMessage = "Deleted Successfully";
            } else {
              //FAILURE
              $scope.showloading = false;
              $scope.errorMessage = "Something issue!!!";
            }
          });
        }).catch(function (err) {
          //EXCEPTION
          $scope.showloading = false;
          $scope.successMessage = err;  
        });
        var index = $scope.gridOptions.data.indexOf(row.entity);
        if (index !== -1) {
            $scope.gridOptions.data.splice(index, 1);
        }        
      }   
}]);



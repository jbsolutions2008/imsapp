'use strict';
var db = new PouchDB('imspdb');

angular.module('myApp.admin-add-edit-product', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-add-edit-product', {
    templateUrl: 'admin/manage-product/add-edit/add-edit.html',
    controller: 'admin-add-edit-product-controller'
  });
}])

.controller('admin-add-edit-product-controller', ['$scope', '$location', function($scope, $location) {
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
  // SHOW LOADING
  $scope.showloading = false;  
  // CHECKING FOR QUERY STRING RECEIVE FROM URL
  var id = $location.search().id;  
  $scope._id = id  
  var params = {
      table: "tProduct",
      _id: id
  }  
  // LOOKING FOR MATCHING DATA IN DATABASE
  db.find({
    selector: params,
    fields: ['name', 'brand', 'price', 'details', '_id'],
  }).then(data => {     
        // HIDE LOADING                     
        $scope.loading = false;            
        if(data["docs"] != "") {
          //ASSIGNING RESPONSE VALUES TO FORM CONTROL
          $scope.product = {};          
          $scope.product = data["docs"][0];
          $scope._id = data["docs"][0]._id;    
          //COMMIT CHANGES TO SCOPE FOR UPDATE      
          $scope.$apply();
        }               
  }).catch(err => {
    $scope.loading = false;  
    //SHOW ERROR IF GOT  
    $scope.errorMessage = err;    
   });                


  $scope.saveproduct = function(product) {     
    //CHECKING FOR PRODUT VALUES
    if(product != undefined)  {
      $scope.showloading = true;       
        if ($scope._id == 0) {          
          var productadd = {
            _id: new Date().toISOString(),
            table: 'tProduct',
            name: product.name,
            price: product.price,
            details: product.details,	  
            brand: product.brand,	  
            };		
            //UPDATE DATA IN DATABASE	
            db.put(productadd).then(response => {               
              if(response.ok){
                //IF RESPONSE OK THEN DISPLAY MESSAGE                
                $scope.successMessage = "Saved Successfully";                
              } else {
                // DISPLAY WHEN GOT ERROR
                $scope.errorMessage = "Something Wrong!!!";
              } 
              //COMMIT CHANGES TO SCOPE FOR UPDATE 
              $scope.$apply();
            }).catch(err =>{  
                //DISPLAY WHEN GOT ERROR            
                $scope.successMessage = err;            
                //COMMIT CHANGES TO SCOPE FOR UPDATE 
                $scope.$apply();
            })              
        }
        // WHEN UPDATE EXISTING PRODUCT DETAILS 
        else {
          // GET DATA FOR EXISTING PRODUCT
          db.get($scope._id).then(function (doc) {
            doc.price = product.price;
            doc.brand = product.brand;
            doc.name = product.name;
            doc.details = product.details;
            doc.table = "tProduct";        
            //UPDATE EXISTING DETAILS    
            db.put(doc).then(response => {                
                if(response.ok){
                  // SUCCESS MESSAGE
                  $scope.successMessage = "Updated Successfully";
                } else {
                  //ERROR MESSAGE DISPLAY
                  $scope.errorMessage = "Something Wrong!!!";
                }  
                //COMMIT CHANGES TO SCOPE FOR UPDATE 
                $scope.$apply();              
              }).catch(err => {
                //SHOW ERROR MESSAGE
                $scope.successMessage = err;            
                //COMMIT CHANGES TO SCOPE FOR UPDATE 
                $scope.$apply();
              });
            });            
        }		      
      };        
    }  

}]);



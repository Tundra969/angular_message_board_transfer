var myApp = angular.module('myApp', []);

myApp.controller("WelcomeController",['$scope', '$http', function($scope, $http){
    $scope.note = {};
    $scope.nameArray = [];

    //POST
    $scope.clickButton = function(clicky){
        $http.post('/people', clicky).then(function(response){
           $scope.getPeople();
        });
    };

    //GET
    $scope.getPeople = function(){
      $http.get('/people').then(function(response){
          $scope.nameArray = response.data;
      });
    };

    //DELETE
    //$scope.deleteButton = function(declicky){
    //    $http.delete('/people' + declicky).then(function(response){
    //        console.log(declicky._id);
    //        //$scope.getPeople();
    //    });
    //};

    $scope.getPeople();
}]);

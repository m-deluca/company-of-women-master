// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var companyOf = angular.module('company-of-women', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope, $location) {

  $rootScope.goHome = function() {
    $location.path('/women');
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


companyOf.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/women',
    {
      controller:'WomenController',
      templateUrl:'partials/women.html'
    })
    .when('/details/:id',{
      controller:'DetailsController',
      templateUrl:'partials/details.html'
    })
    .otherwise({redirectTo:'/women'});
}]);

companyOf.controller('WomenController', ['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){

  $scope.loadWomen = function() {
      $ionicLoading.show();
    $http.get('http://localhost:8888/Bulhoes_Alicia/public/')
    .success(function(data){
      console.log(data);
      $scope.women = data;

      $ionicLoading.hide();
    })
    .finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    })

  };

 $scope.loadWomen(); 

}]);

companyOf.controller('DetailsController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams){
      $ionicLoading.show()
    
    $http.get("http://localhost:8888/Bulhoes_Alicia/public/"+$routeParams.id)
    .success(function(data){
      console.log(data);
  
    $scope.details = data;

    for( var i = 0; i<data.length; ++i){
      $scope.women = data[i].women;
    }
    
  

      $ionicLoading.hide();
    });
}])

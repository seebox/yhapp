$controllers

.controller('MainCtrl', function($rootScope, $scope, $stateParams, $ionicSideMenuDelegate) {
  $rootScope.issync = false;
  $rootScope.isOpen = function() {
    return $ionicSideMenuDelegate.isOpen(); 
  }
  $scope.positive = false;


})

;
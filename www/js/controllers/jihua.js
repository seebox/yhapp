$controllers

.controller('jihua', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

  $rootScope.openmenu = function(){
    $rootScope.menuShow =!$rootScope.menuShow;
  }
  $rootScope.closemenu = function(){
    $rootScope.menuShow = false;
  }
  $ionicModal.fromTemplateUrl('tpls/jihua-ren.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(modal) {
    $rootScope.modalRen = modal;
  });
  $rootScope.openRen = function() {
    $rootScope.modalRen.show();
  };
  $rootScope.closeRen = function() {
    $rootScope.modalRen.hide();
  };
  
})

.controller('jihuaDetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


});
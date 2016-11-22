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
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.modalRen = modal;
  });
  $rootScope.openRen = function() {
    $rootScope.modalRen.show();
  };
  $rootScope.closeRen = function() {
    $rootScope.modalRen.hide();
  };

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.modalList = modal;
  });


})

.controller('jihuaDetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
  $ionicModal.fromTemplateUrl('piban-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPeiban = modal;
  });

})




;
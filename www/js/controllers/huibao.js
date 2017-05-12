$controllers

.controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

   $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalHuibao = modal;
  });
  $scope.huibaolist = window.localStorage.huibaolist?JSON.parse(window.localStorage.huibaolist):[];


});
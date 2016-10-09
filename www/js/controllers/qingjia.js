$controllers

.controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
   $ionicModal.fromTemplateUrl('tpls/qingjia-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalJia = modal;
  });

})

;
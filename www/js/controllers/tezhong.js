$controllers


    .controller('tezhong', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
    $ionicModal.fromTemplateUrl('tpls/tezhong-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.tezhongDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.tezhongDetail.show();
    };

    $ionicModal.fromTemplateUrl('anquan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.anquanModal = modal;
    });

    $scope.baobei = function() {
        $ionicLoading.show({ template: '审核已完成' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    }
    $scope.baopi = function() {
        $ionicLoading.show({ template: '已转到安技部审批' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000)
    }
});
$controllers

    .controller('shenpi', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
    $ionicModal.fromTemplateUrl('tpls/shenpi-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.shenpiDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.shenpiDetail.show();
    };

    $scope.yijian = "";
    $scope.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.submit = function() {
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="yijian">',
            title: '请输入审批意见',
            subTitle: '',
            scope: $scope,
            buttons: [
                { text: '取消' },
                {
                    text: '<b>提交</b>',
                    type: 'button-positive',
                    onTap: function(e) {

                        $scope.items = [10, 11, 12, 13, 14, 15, 16, 17];



                    }
                },
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }
})

;
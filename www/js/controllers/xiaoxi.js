$controllers
    .controller('xiaoxi', function($rootScope, $scope, $ionicModal, $http, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
        $ionicModal.fromTemplateUrl('tpls/xiaoxi-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.xiaoxiDetail = modal;
        });

        $scope.showDetail = function(item) {
            $scope.itemDetail = item;
            $scope.xiaoxiDetail.show();
            $http({
                method: "GET",
                url: "/mobileoa/yhapi/message/setread",
                params: { mesid: item.id }
            }).success(function(res) {

            });
        };

        $http({
            method: "GET",
            url: "/mobileoa/japi/message/queryByTarget",
            params: { targetid: $rootScope.loginBody.loginUserId }
        }).success(function(res) {
            $scope.items = res;
        });

    });
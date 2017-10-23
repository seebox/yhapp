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
            if(!item.isread){
                $http({
                    method: "GET",
                    url: "/mobileoa/yhapi/message/setread",
                    params: { mesid: item.id ,targetid:$rootScope.loginBody.loginUserId}
                }).success(function(res) {
    
                });
            }

        };
        var pagenum = 0,
            count = 15;
        $scope.items = [];
        $scope.noMore = true;
        $scope.loadData = function(isRefresh) {


            if (isRefresh) {
                pagenum = 1;
            } else {
                ++pagenum;
            }
            $http({
                method: "GET",
                url: "/mobileoa/japi/message/queryByTarget",
                params: {
                    targetid: $rootScope.loginBody.loginUserId,
                    pagenum: pagenum,
                    count: count
                }
            }).success(function(res) {
                if (isRefresh) {
                    $scope.items = res;
                } else {
                    $scope.items = $scope.items.concat(res);
                }
                if (res.length > 0) {
                    $scope.noMore = true;
                } else {
                    $scope.noMore = false;
                }

                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

    });
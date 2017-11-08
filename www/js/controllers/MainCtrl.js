$controllers.controller('MainCtrl', function($rootScope, $scope, $http, $stateParams, $ionicSideMenuDelegate) {
    $rootScope.issync = false;
    $rootScope.isOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
    };
    $scope.positive = false;
    $scope.role = true;
    $scope.colors = ['positive', 'calm', 'balanced', 'energized', 'assertive', 'royal'];
    $scope.colors = $scope.colors.concat($scope.colors);
    $scope.colors = $scope.colors.concat($scope.colors);

    $http.get('/WebapiService/GetAppPermission?userId=' + $rootScope.loginBody.loginUserId).success(function(response) {

        for (var i in response) {
            if (response[i].Name == "特种船舶审批") {
                $rootScope.tezhong = !response[i].IsHavePermission;
            }
            if (response[i].Name == "夜航船舶审批") {
                $rootScope.yehang = !response[i].IsHavePermission;
            }
        }

        $scope.playlists = [{
            name: "引航计划",
            url: "app/jihua"
        }, {
            name: "航次汇报",
            url: "app/huibao"
        }, {
            name: "引航计划审批",
            url: "app/shenpi",
            hide: $rootScope.loginBody.dept.deptParentName == "中心机关"
        }, {
            name: "特种夜航船审批",
            url: "app/tezhong",
            hide: $rootScope.tezhong || $rootScope.yehang
        }, {
            name: "码头泊位信息",
            url: "app/bowei"
        }, {
            name: "潮汐信息",
            url: "app/chaoxi"
        }, {
            name: "出航津贴查询",
            url: "app/butie"
        }, {
            name: "规章制度",
            url: "app/faguilists/GZZD"
        }, {
            name: "安全预警",
            url: "app/faguilists/AQYJ"
        }, {
            name: "航行公告信息",
            url: "app/faguilists/HXGG"
        }, {
            name: "安全公告",
            url: "app/faguilists/AQGG"
        }, {
            name: "交流互动",
            url: "app/jiaoliu"
        }, {
            name: "休假管理",
            url: "app/qingjia"
        }, {
            name: "网络学堂",
            url: "app/faguilists/WLXT"
        }, {
            name: "公文在线",
            url: "app/faguilists/GWZX"
        }, {
            name: "信息公告",
            url: "app/faguilists/XXGG"
        }, {
            name: "明文传真",
            url: "app/faguilists/MWCZ"
        }, {
            name: "消息中心",
            url: "app/xiaoxi/CENTER"
        }];
    });


})

;
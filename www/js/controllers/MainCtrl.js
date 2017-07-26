$controllers.controller('MainCtrl', function($rootScope, $scope, $stateParams, $ionicSideMenuDelegate) {
    $rootScope.issync = false;
    $rootScope.isOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
    };
    $scope.positive = false;
    $scope.role = true;
    $scope.colors = ['positive', 'calm', 'balanced', 'energized', 'assertive', 'royal'];
    $scope.colors = $scope.colors.concat($scope.colors);
    $scope.colors = $scope.colors.concat($scope.colors);
    $scope.playlists = [{
        name: "引航计划",
        url: "app/jihua"
    }, {
        name: "我的航次汇报",
        url: "app/huibao"
    }, {
        name: "引航计划审批",
        url: "app/shenpi"
    }, {
        name: "特种夜航船审批",
        url: "app/tezhong"
    }, {
        name: "码头泊位信息",
        url: "app/bowei"
    }, {
        name: "航行公告信息",
        url: "app/faguilists/HXGG"
    }, {
        name: "潮汐信息",
        url: "app/chaoxi"
    }, {
        name: "规章制度",
        url: "app/faguilists/GZZD"
    }, {
        name: "安全预警消息",
        url: "app/xiaoxi/ANQUAN"
    }, {
        name: "消息中心",
        url: "app/xiaoxi/CENTER"
    }, {
        name: "出航津贴查询",
        url: "app/butie"
    }, {
        name: "技术交流",
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
        name: "引航签证单",
        url: "app/playlists"
    }];

})

;
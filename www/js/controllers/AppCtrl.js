$controllers

    .controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

    $scope.loginData = {};
    $ionicModal.fromTemplateUrl('tpls/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
    });

    $scope.closeLogin = function() {
        $scope.modal.hide();

    };

    $scope.login = function() {
        $scope.modal.show();
    };


    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        window.localStorage.username = $scope.loginData.username;
        if (window.localStorage.username == 'admin') {
            $rootScope.role = false;
            $rootScope.userName = "张某";
            $rootScope.userTitle = "航站管理员";
            $rootScope.playlists = [{
                name: "引航计划",
                url: "app/jihua"
            }, {
                name: "引航计划审批",
                url: "app/shenpi"
            }, {
                name: "特种夜航船审批",
                url: "app/tezhong"
            }, {
                name: "航行公告信息",
                url: "app/hangxinglists"
            }, {
                name: "潮汐信息",
                url: "app/matoulists"
            }, {
                name: "规章制度",
                url: "app/faguilists"
            }, {
                name: "安全预警消息",
                url: "app/anquan"
            }, {
                name: "消息中心",
                url: "app/xiaoxi"
            }, {
                name: "技术交流",
                url: "app/jiaoliu"
            }, {
                name: "休假管理",
                url: "app/qingjia"
            }, {
                name: "网络学堂",
                url: "app/netclass"
            }, {
                name: "公文在线",
                url: "app/netclass"
            }, {
                name: "信息公告",
                url: "app/netclass"
            }, {
                name: "明文传真",
                url: "app/netclass"
            }, {
                name: "学习交流",
                url: "app/netclass"
            }];
        } else {
            $rootScope.role = true;
            $rootScope.userName = "李某";
            $rootScope.userTitle = "引航中心引航员";
            $rootScope.playlists = [{
                name: "引航计划",
                url: "app/jihua"
            }, {
                name: "我的航次汇报",
                url: "app/huibao"
            }, {
                name: "航行公告信息",
                url: "app/hangxinglists"
            }, {
                name: "潮汐信息",
                url: "app/matoulists"
            }, {
                name: "规章制度",
                url: "app/faguilists"
            }, {
                name: "安全预警消息",
                url: "app/anquan"
            }, {
                name: "消息中心",
                url: "app/xiaoxi"
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
                url: "app/netclass"
            }, {
                name: "公文在线",
                url: "app/netclass"
            }, {
                name: "信息公告",
                url: "app/netclass"
            }, {
                name: "明文传真",
                url: "app/netclass"
            }, {
                name: "学习交流",
                url: "app/netclass"
            }, {
                name: "引航签证单",
                url: "app/playlists"
            }];
        }




        $timeout(function() {
            $scope.closeLogin();
        }, 500);
    };
    $scope.doLogin();
    $rootScope.isOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
    }

});
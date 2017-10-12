$controllers
    .controller('faguilists', function($scope, $http, $ionicModal, $ionicLoading, $stateParams) {
        if ($stateParams.flag == 'AQGG') {
            $scope.title = '';
            $scope.choice = { k: 'AQGG', v: '安全公告' };
        } else if ($stateParams.flag == 'AQYJ') {
            $scope.title = '';
            $scope.choice = { k: 'AQYJ', v: '安全预警' };
        } else if ($stateParams.flag == 'GZZD') {
            $scope.types = [
                { k: 'RSGL', v: '人事管理' },
                { k: 'XZGL', v: '行政管理' },
                { k: 'DQGL', v: '党群管理' },
                { k: 'CWGL', v: '财务管理' },
                { k: 'AQGL', v: '安全管理' },
                { k: 'SCDD', v: '生产调度' }
            ];
            $http.get('cjpilot/yhapi/channelList.jspx?parent=AQGG').success(function(response) {
                //$scope.types;
            });

            $scope.title = '规章制度 - ';
            $scope.choice = { k: 'RSGL', v: '人事管理' };
            $scope.cur = "RSGL";
        } else if ($stateParams.flag == 'HXGG') {
            $scope.types = [];
            $scope.choice = { k: 'HXGG', v: '航行公告' };
        } else if ($stateParams.flag == 'GWZX') {
            $scope.types = [];
            $scope.choice = { k: 'GWZX', v: '公文在线' };
        } else if ($stateParams.flag == 'XXGG') {
            $scope.types = [];
            $scope.choice = { k: 'XXGG', v: '信息公告' };
        } else if ($stateParams.flag == 'MWCZ') {
            $scope.types = [];
            $scope.choice = { k: 'MWCZ', v: '明文传真' };
        } else if ($stateParams.flag == 'WLXT') {
            $scope.types = [
                { k: 'YWXX', v: '业务学习' },
                { k: 'ZZXX', v: '政治学习' },
                { k: 'QTXX', v: '其他学习' },
                { k: 'WSJT', v: '网上讲堂' }
            ];
            $scope.title = '网络学堂 - ';
            $scope.choice = { k: 'YWXX', v: '业务学习' };
            $scope.cur = "YWXX";
        }
        $ionicModal.fromTemplateUrl('tpls/fagui-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHangxin = modal;
        });
        var pageNo = 0,
            pageSize = 15;
        $scope.items = [];
        $scope.noMore = true;
        $scope.change = function(choice, isRefresh) {
            if (isRefresh) {
                pageNo = 1;
            } else {
                ++pageNo;
            }
            $ionicLoading.show({ template: '正在加载...' });
            $scope.selectShow = false;
            $scope.choice = choice;
            $http.get('/cjpilot/yhapi/content.jspx?type=0&channel=' + choice.k + '&pageNo=' + pageNo + '&pageSize=' + pageSize).success(function(response) {
                $ionicLoading.hide();
                if (response.body.content) {
                    if (isRefresh) {
                        $scope.items = response.body.content.list;
                    } else {
                        $scope.items = $scope.items.concat(response.body.content.list);
                    }
                }
                if (response.body.content.list.length > 0) {
                    $scope.noMore = true;
                } else {
                    $scope.noMore = false;
                }
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $scope.showDetail = function(id) {
            $http.get('/cjpilot/yhapi/content.jspx?type=1&parent=GZZD&contentId=' + id).success(function(response) {
                $scope.detail = response.body.content;
                $scope.modalHangxin.show();
            });
            $http.get('/cjpilot/yhapi/readContent.jspx?learnLengthUsed=1&contentId=' + id).success(function(response) {
                $scope.detail = response.body.content;
                $scope.modalHangxin.show();
            });
        };



    }).filter(
        'to_trusted', ['$sce', function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            }
        }]
    )

.controller('chaoxi', function($scope, $http) {

    $scope.default = {
        place: 1,
        whichDay: 1
    }
    $scope.search = function() {
        $scope.selectShow = !$scope.selectShow;
    };
    $scope.addrs = [{ name: "吴淞", id: "1" }, { name: "白茆", id: "2" }, { name: "浒浦", id: "3" }, { name: "天生港", id: "4" }, { name: "江阴", id: "5" }];
    $scope.days = [{ name: "前一天", id: "0" }, { name: "今天", id: "1" }, { name: "后一天", id: "2" }]

    $scope.search = function(place, whichDay) {
        if (place && whichDay) {
            $scope.default = {
                place: place,
                whichDay: whichDay
            }
        }
        $http.get('/cjpilot/yhapi/vpn/tide.jspx?place=' + $scope.default.place + '&whichDay=' + $scope.default.whichDay + '&nowTime=' + parseInt(new Date().getTime() / 1000)).success(function(response) {
            if (response.body.data) {
                $scope.data = response.body.data[0];
                $scope.data.nowTime = response.body.nowTime;
            }
        });
    }
    $scope.search();

});
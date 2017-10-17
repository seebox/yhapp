$controllers
    .controller('jihua', function($rootScope, $scope, $ionicModal, $timeout, $http, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

        $ionicModal.fromTemplateUrl('tpls/jihua-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.jihuaDetail = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/jihua-huibao.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.huibaoHistory = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/jihua-ren.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.peiban = modal;
        });

        $scope.showDetail = function(item) {
            $scope.jihuaItem = item;
            $scope.jihuaDetail.show();
        };
        $scope.showPeiban = function(ids) {

            $http({
                method: "POST",
                url: '/pilotserver/pilotplan/getlist?type=yhy&str={"yhyids":"' + ids.replace(/\|/g, ',') + '"}',
                params: {}
            }).success(function(res) {
                $scope.peibanItem = res.result;
            });
            $scope.peiban.show();
        }
        $scope.yhzName = $rootScope.loginBody.dept.deptName;
        $scope.sqlx = '20003';
        var pageNo = 0,
            pageSize = 15;
        $scope.jihuaList = [];
        $scope.noMore = true;

        $scope.loadData = function(str, isRefresh) {
            //imexportId:进出江标志（“20003”：进江；“20004”：出江；“20005”：移舶）
            //stationId:引航站主键
            //routeId:船舶航线（0：国内航线；1：国际航线）
            //pilot:引航员主键
            //type:类型（0：引航计划；1：航次汇报）
            //isFinish:是否完成航次汇报（0：未完成；1：已完成）

            if (isRefresh) {
                pageNo = 1;
            } else {
                ++pageNo;
            }
            $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
            var params = {
                type: 0,
                stationId: $rootScope.loginBody.dept.deptId,
                imexportId: $scope.sqlx,
                username: $rootScope.loginBody.loginUserName,
                chName: $scope.chName,
                callNo: $scope.callNo,
                pageNo: pageNo,
                pageSize: pageSize
            };

            if (str) {
                params.stationId = str.station_id;
                params.imexportId = str.sqlx;
            }
            $http({
                method: "GET",
                url: "/cjpilot/yhapi/yhjhList.jspx",
                params: params
            }).success(function(res) {
                $ionicLoading.hide();
                if (res.body.result) {
                    if (isRefresh) {
                        $scope.jihuaList = res.body.result;
                    } else {
                        $scope.jihuaList = $scope.jihuaList.concat(res.body.result);
                    }
                    if (res.body.result.length > 0) {
                        $scope.noMore = true;
                    } else {
                        $scope.noMore = false;
                    }
                } else {
                    $scope.noMore = false;
                }
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $timeout(function() {
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/getlist",
                params: { type: "yhz" }
            }).success(function(res) {
                $scope.yhzList = res.result;
            });
        }, 1000);

        $scope.search = function() {
            var str = {};
            if ($scope.sqlx) {
                str.sqlx = $scope.sqlx;
            }
            if ($scope.yinhangzhan) {
                str.station_id = $scope.yinhangzhan;
                for (var i = 0; i < $scope.yhzList.length; i++) {
                    if (str.station_id == $scope.yhzList[i].YHZID) {
                        $scope.yhzName = $scope.yhzList[i].YHZNAME;
                    }
                }
            }
            $scope.loadData(str, true);
            $scope.menuShow = false;
        };

        $scope.showhistory = function(item) {
            $http({
                method: "POST",
                url: '/pilotserver/pilotplan/getlist?type=hchb',
                params: {
                    str: JSON.stringify({ hh: item.callNo })
                }
            }).success(function(res) {
                $scope.jihuaHistory = res.result;
                $scope.huibaoHistory.show();
            });
        };

    }).filter(
        'date', [function() {
            return function(text) {
                if (text == null || text.length == 0) {
                    return "";
                } else {
                    return moment(text).format('hhmm/DD');
                }

            }
        }]
    );
// function loadData(str) {
//     $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
//     var params = { type: "yhjh", str: '{"sqlx":"20003","cbhx":"0"}' };
//     if (str) {
//         params.str = JSON.stringify(str);
//     }
//     $http({
//         method: "POST",
//         url: "/pilotserver/pilotplan/getlist",
//         params: params
//     }).success(function(res) {
//         $scope.jihuaList = res.result.plan;
//         $ionicLoading.hide();
//     });
// }
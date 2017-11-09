$controllers

    .controller('shenpi', function($rootScope, $scope, $ionicModal, $ionicPopup, $timeout, $ionicLoading, $ionicListDelegate, $ionicSideMenuDelegate, $http) {
    $ionicModal.fromTemplateUrl('tpls/shenpi-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.shenpiDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.jihuaItem = item;
        // $http({
        //     method: "POST",
        //     url: '/pilotserver/pilotplan/getlist?type=yhyqsj&str={"yhyids":"' + item.SDYHY.replace(/\|/g, ',') + '"}',
        // }).success(function(res) {
        // });
        $scope.shenpiDetail.show();
    };

    function loadData(str) {
        $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
        var params = { type: "yhjh", jhzt: "0", str: '{"sqlx":"20003","cbhx":"0"}' };
        if (str) {
            params.str = JSON.stringify(str);
        }
        $http({
            method: "POST",
            url: '/pilotserver/pilotplan/getlist?type=yhjh&str={"app":"0","shzt":"0","yhz":"' + $rootScope.loginBody.dept.deptName + '"}',
            //params: params
        }).success(function(res) {
            $scope.jihuaList = res.result;
            $ionicLoading.hide();
        });
    }
    loadData();
    $scope.delShow = false;
    $scope.showDeleteButtons = function() {
        $scope.delShow = !$scope.delShow;
        $ionicListDelegate.showDelete($scope.delShow);
    };

    $scope.doSelect = function(item) {
        item.checked = !!!item.checked;
    };
    $scope.doCancel = function() {
        $scope.delShow = false;
        $ionicListDelegate.showDelete($scope.delShow);
    };
    $scope.doShenpi = function() {
        var ids = [];
        for (var i in $scope.jihuaList) {
            if ($scope.jihuaList[i].checked) {
                ids.push($scope.jihuaList[i].ID);
            }
        }
        if (ids.length > 0) {
            var str = '武汉,芜湖,南京,镇江';
            var flag = "1";
            if (str.indexOf($rootScope.loginBody.dept.deptName) > -1) {
                flag = "0";
            }
            var params = { str: { type: "6", "partflag": flag, "shr": $rootScope.loginBody.userPersonId, ids: ids } };
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/updateplanstatus",
                params: params
            }).success(function(res) {
                $scope.doCancel();
                loadData();
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '请选择要审批的计划',
                okText: '确定'
            });
        }

    };

})

;
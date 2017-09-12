$controllers

    .controller('shenpi', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicListDelegate, $ionicSideMenuDelegate, $http) {
    $ionicModal.fromTemplateUrl('tpls/shenpi-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.shenpiDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.jihuaItem = item;

        $http({
            method: "POST",
            url: '/pilotserver/pilotplan/getlist?type=yhyqsj&str={"yhyids":"' + item.SDYHY.replace(/\|/g, ',') + '"}',
            //params: params
        }).success(function(res) {

        });
        $scope.shenpiDetail.show();
    };
    console.log($rootScope.loginBody);

    function loadData(str) {
        $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
        var params = { type: "yhjh", jhzt: "0", str: '{"sqlx":"20003","cbhx":"0"}' };
        if (str) {
            params.str = JSON.stringify(str);
        }
        $http({
            method: "POST",
            url: '/pilotserver/pilotplan/getlist?type=yhjh&str={"app":"0","yhz":"' + $rootScope.loginBody.dept.deptName + '"}',
            //params: params
        }).success(function(res) {
            $scope.jihuaList = res.result;
            $ionicLoading.hide();
        });
    }
    loadData();
    var delShow = false;
    $scope.showDeleteButtons = function() {
        delShow = !delShow;
        $ionicListDelegate.showDelete(delShow);
    };

    $scope.doShenpi = function(item) {
        var params = { str: { type: "6", "partflag": "0", "shr": $rootScope.loginBody.userPersonId, ids: [item.ID] } };

        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/updateplanstatus",
            params: params
        }).success(function(res) {
            loadData();
        });
    };

})

;
$controllers


    .controller('tezhong', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $http) {
    $ionicModal.fromTemplateUrl('tpls/tezhong-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.tezhongDetail = modal;
    });
    $ionicModal.fromTemplateUrl('tpls/yehang.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.yehangDetail = modal;
    });
    var details;
    $scope.showTzcb = function(item) {
        $scope.tzcbDetail = item;
        $scope.tezhongDetail.show();
        $http({
            method: "GET",
            url: "/WebapiService/GetSpInfo",
            params: { id: item.ID }
        }).success(function(res) {
            details = res.Details;
        });
    };
    $scope.showYhcb = function(item) {
        $scope.yhcbDetail = item;
        $scope.yehangDetail.show();
        $http({
            method: "GET",
            url: "/WebapiService/GetSpInfo",
            params: { id: item.ID }
        }).success(function(res) {
            details = res.Details;
        });
    };

    $ionicModal.fromTemplateUrl('anquan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.anquanModal = modal;
    });
    $scope.temp = {
        yj: "",
        aqcsText: "",
        IsFinish: "true"
    }
    $scope.baobei = function(tzcbDetail) {
        $http({
            method: "GET",
            url: "/WebapiService/SpFun",
            params: {
                yeOrTe: 1,
                Sqid: tzcbDetail.ID,
                nextSpDetailsId: details[1].ID,
                IsFinish: $scope.IsFinish,
                currUserId: $rootScope.loginBody.loginUserId,
                YHZAQCS: $scope.temp.aqcsText,
                AJBYJ: $scope.temp.yj,
                LDYJ: "3"
            }
        }).success(function(res) {

        });
        $ionicLoading.show({ template: '审核已完成' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    }



    $http({
        method: "GET",
        url: "/WebapiService/GetTzcbInfo",
        params: {
            where: "where 1=1",
            pageSize: 500,
            pageIndex: 1,
            isFinish: 0
        }
    }).success(function(res) {
        $scope.Tzcb = res;
    });
    $http({
        method: "GET",
        url: "/WebapiService/GetYhcbInfo",
        params: {
            where: "where 1=1",
            pageSize: 500,
            pageIndex: 1,
            isFinish: 0
        }
    }).success(function(res) {
        $scope.Yhcb = res;
    });
    $http({
        method: "GET",
        url: "WebapiService/GetAQCS"
    }).success(function(res) {
        $scope.aqcslist = res;
    });
    //$scope.aqcslist = 

});
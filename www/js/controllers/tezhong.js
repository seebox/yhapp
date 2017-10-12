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

    $scope.baobei = function(tzcbDetail) {
        $http({
            method: "GET",
            url: "/WebapiService/SpFun",
            params: {
                yeOrTe: 1,
                Sqid: tzcbDetail.ID,
                nextSpDetailsId: details[1].ID,
                IsFinish: "true",
                currUserId: $rootScope.loginBody.loginUserId,
                YHZAQCS: "1",
                AJBYJ: "2",
                LDYJ: "3"
            }
        }).success(function(res) {

        });
        $ionicLoading.show({ template: '审核已完成' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    }
    $scope.yj = "";
    $scope.baopi = function(tzcbDetail) {
        console.log($scope.yj);
        $http({
            method: "GET",
            url: "/WebapiService/SpFun",
            params: {
                yeOrTe: 1,
                Sqid: tzcbDetail.ID,
                nextSpDetailsId: details[1].ID,
                IsFinish: "false",
                currUserId: $rootScope.loginBody.loginUserId,
                YHZAQCS: "1",
                AJBYJ: $scope.yj,
                LDYJ: "3"
            }
        }).success(function(res) {

        });

        $ionicLoading.show({ template: '已转到安技部审批' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000)
    }

    $http.get('/WebapiService/GetTzcbInfo').success(function(response) {
        $scope.Tzcb = response;
    });
    $http.get('/WebapiService/GetYhcbInfo').success(function(response) {
        $scope.Yhcb = response;
    });
});
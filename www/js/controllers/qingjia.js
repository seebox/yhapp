$controllers

    .controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $http) {
    $ionicModal.fromTemplateUrl('tpls/qingjia-form.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalJia = modal;
    });
    $ionicModal.fromTemplateUrl('tpls/qingjia-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.qingjiaDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.itemDetail = item;

        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: {
                type: 'xjtj',
                str: JSON.stringify({ "yhyid": item.YHYID })
            }
        }).success(function(res) {
            $scope.tongji = res.result[0];
        });
        $scope.qingjiaDetail.show();
    };
    ///pilotserver/pilotplan / getlist ? type = yhyqsj & str = { "spr": "aa", "dw": "南通站", "yhyid": "" }
    //spr: 审批人 dw: 单位 yhyid: 引航员id

    $http({
        method: "POST",
        url: "pilotserver/pilotplan/getlist",
        params: {
            type: 'yhyqsj',
            str: JSON.stringify({ "dw": $rootScope.loginBody.dept.deptName, "yhyid": $rootScope.loginBody.userPersonId })
        }
    }).success(function(res) {
        $scope.items = res.result;
    });
}).filter(
    'dateqingjia', [function() {
        return function(text) {
            if (!text || text.length === 0) {
                return "";
            } else {
                return moment(text).format('YYYY-MM-DD');
            }

        }
    }]
);;
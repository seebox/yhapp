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
    $scope.changeTab = function(i) {
        $scope.index = i;
        if (i == 0) {
            $scope.loadData(i);
        } else {
            $scope.loadData(i);
        }

    };
    $scope.loadData = function(index) { 
        var str = JSON.stringify({ "dw": $rootScope.loginBody.dept.deptName, "yhyid": $rootScope.loginBody.userPersonId });
        if (index == 1) {
            str = JSON.stringify({ "dw": $rootScope.loginBody.dept.deptName, "spr": $rootScope.loginBody.userPersonId, "isend": 1 });
        }
        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: {
                type: 'yhyqsj',
                str: str
            }
        }).success(function(res) {

            $scope.items = res.result;
        });
    }
    $scope.loadData();

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
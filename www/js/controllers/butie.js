$controllers
    .controller('butie', function($rootScope, $scope, $http, $ionicModal) {
        $ionicModal.fromTemplateUrl('tpls/butie-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.butieDetail = modal;
        });
        $scope.openDetail = function(item) {
            $scope.item = item;
            $scope.butieDetail.show();
        };
        $scope.years = [];
        for (var i = 0; i < 12; i++) {
            $scope.years.push(moment().subtract(i, 'month').format("YYYY-MM"));
        }

        $scope.changeDate = function(date) {
            $scope.curmonth = date;
            loadData(date);
        };

        function loadData(date) {
            $http({
                method: "GET",
                url: "/cjpilot/yhapi/vpn/chjt.jspx",
                params: { pilotDate: date, yhyid: $rootScope.loginBody.loginUserId }
            }).success(function(res) {
                $scope.data = res.body.chjt;
            });
        }
        $scope.curmonth = moment().format("YYYY-MM");
        loadData($scope.curmonth);
    })
    .controller('bowei', function($rootScope, $scope, $http, $ionicModal, $ionicLoading) {
        $ionicModal.fromTemplateUrl('bowei-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.boweiDetail = modal;
        });

        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: { type: "yhz" }
        }).success(function(res) {
            $scope.yhzList = res.result;
        });

        function loadData(str) {
            $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
            var params = { type: "bwmt" };
            if (str) {
                params.str = JSON.stringify(str);
            }
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/getlist",
                params: params
            }).success(function(res) {
                $ionicLoading.hide();
                $scope.jihuaList = res.result;

            });
        }

        $scope.YHZ = "江阴站";
        var str = { yhz: '江阴站' };
        loadData(str);
        $scope.search = function() {

            if ($scope.yinhangzhan) {
                str.yhz = $scope.yinhangzhan;
                $scope.YHZ = str.yhz;
            }
            loadData(str);
            $scope.menuShow = false;
        };

        $scope.showDetail = function(item) {
            $scope.item = item;
            $scope.boweiDetail.show();
        };

    });
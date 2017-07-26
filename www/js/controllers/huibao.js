$controllers
    .controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $http) {

        $ionicModal.fromTemplateUrl('tpls/huibao-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHuibao = modal;
        });

        $scope.showDetail = function(item) {
            $scope.huibaoItem = item;
            $scope.modalHuibao.show();
        };
        $scope.huibaolist = [];

        $http.get('/cjpilot/yhapi/hchb.jspx?type=0').success(function(res) {
            $scope.huibaolist = res.body.result.list;
        });


    });
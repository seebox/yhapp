$controllers

.controller('MainCtrl', function($rootScope, $scope, $stateParams, $ionicSideMenuDelegate) {
  $rootScope.issync = false;
  $rootScope.isOpen = function() {
    return $ionicSideMenuDelegate.isOpen(); 
  }
  $scope.positive = false;
  $scope.playlists = [{
    name: "引航计划",
    url:"app/jihua"
  }, {
    name: "航次汇报",
    url:"app/huibao"
  },{
    name: "特种船夜航审批",
    url:"app/tezhong"
  }, {
    name: "辅助信息查询",
    url:"app/fuzhu"
  }, {
    name: "安全预警消息",
    url:"app/anquan"
  }, {
    name: "出航津贴查询",
    url:"app/butie"
  }, {
    name: "技术交流",
    url:"app/jiaoliu"
  }, {
    name: "休假管理",
    url:"app/qingjia"
  }, {
    name: "网络学堂",
    url:"app/netclass"
  }, {
    name: "引航签证系统",
    url:"app/playlists"
  }];

})

;
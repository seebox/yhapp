$controllers

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $timeout(function() {
      $scope.closeLogin();
    }, 500);
  };

  $rootScope.isOpen = function() {
    return $ionicSideMenuDelegate.isOpen();
  }

});
$controllers

.controller('jihua', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

  $rootScope.openmenu = function(){
    $rootScope.menuShow =!$rootScope.menuShow;
  }
  $rootScope.closemenu = function(){
    $rootScope.menuShow = false;
  }
  $ionicModal.fromTemplateUrl('tpls/jihua-ren.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(modal) {
    $rootScope.modalRen = modal;
  });
  $rootScope.openRen = function() {
    $rootScope.modalRen.show();
  };
  $rootScope.closeRen = function() {
    $rootScope.modalRen.hide();
  };
  
})

.controller('jihuaDetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


});
$controllers

.controller('MainCtrl', function($rootScope, $scope, $stateParams, $ionicSideMenuDelegate) {
  $rootScope.issync = false;
  $rootScope.isOpen = function() {
    return $ionicSideMenuDelegate.isOpen(); 
  }
  $scope.positive = false;
  $scope.playlists = [{
    icon: "t1.png",
    name: "引航计划",
    url:"app/jihua"
  }, {
    icon: "t2.png",
    name: "航次汇报",
    url:"app/jihua"
  }, {
    icon: "t3.png",
    name: "引航签证查询",
    url:"form1"
  }, {
    icon: "ben.png",
    name: "特种船夜航审批",
    url:"app/jihua"
  }, {
    icon: "max.png",
    name: "辅助信息查询",
    url:"app/jihua"
  }, {
    icon: "mike.png",
    name: "安全预警消息",
    url:"app/jihua"
  }, {
    icon: "mike.png",
    name: "出航津贴查询",
    url:"app/jihua"
  }, {
    icon: "mike.png",
    name: "技术交流",
    url:"app/jihua"
  }, {
    icon: "mike.png",
    name: "休假管理",
    url:"app/jihua"
  }, {
    icon: "mike.png",
    name: "网络学堂",
    url:"app/jihua"
  }, {
    icon: "mike.png",
    name: "引航签证系统",
    url:"app/jihua"
  }];

})

;
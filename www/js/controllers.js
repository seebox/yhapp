$controllers


.controller('anquan', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

;
$controllers

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('tpls/login.html', {
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


.controller('fuzhu', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

;
$controllers

.controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

   $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalHuibao = modal;
  });
 

});
$controllers
.controller('jiaoliu', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})
;
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
    animation: 'slide-in-up'
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


})




;
$controllers
.controller('butie', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})
;
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
$controllers
.controller('netClass', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

	$scope.choice="A";

	$scope.openSelect = function() {
		$scope.selectShow = !$scope.selectShow;
	};

	
	
})

.controller('classroom', function($rootScope, $scope, $ionicModal,$stateParams, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


	$scope.classid=$stateParams.id;
	
	
}); 
$controllers


.controller('PlaylistsCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

.controller('PlaylistCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


});
$controllers

.controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
   $ionicModal.fromTemplateUrl('tpls/qingjia-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalJia = modal;
  });

})

;
$controllers


.controller('tezhong', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

;
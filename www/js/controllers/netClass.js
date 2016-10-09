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
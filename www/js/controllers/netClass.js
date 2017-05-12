$controllers
.controller('netClass', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

	$scope.choice="A";

	$scope.openSelect = function() {
		$scope.selectShow = !$scope.selectShow;
	};

	
	
})

.controller('classroom', function($rootScope, $scope, $ionicModal,$stateParams, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


	$scope.classid=$stateParams.id;
	$scope.com = {content:""};
$scope.commlist = [];
	$scope.submit = function(){
		$scope.commlist.push($scope.com.content);
		$scope.com.content = "";
	}
	
	
}); 
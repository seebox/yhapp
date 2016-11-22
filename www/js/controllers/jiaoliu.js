$controllers
.controller('jiaoliu', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

	$ionicModal.fromTemplateUrl('jiaoliu-modal.html',{
		'scope':$scope
	}).then(function(modal){
		$scope.jiaoliuModal=modal;
	});
	
	$scope.open_jiaoliuModal=function(){
		$scope.jiaoliuModal.show();
	};
	
	$scope.close_jiaoliuModal = function() {
		$scope.jiaoliuModal.hide();
	};
	
	$ionicModal.fromTemplateUrl('users-modal.html',{
		'scope':$scope
	}).then(function(modal){
		$scope.usersModal=modal;
	});
	
	$scope.open_usersModal=function(){
		$scope.usersModal.show();
	};
	
	$scope.close_usersModal = function() {
		$scope.usersModal.hide();
	};
	
	$scope.devList = [
              { text: "吴福康", checked: false },
              { text: "朱学文", checked: false },
              { text: "朱建忠", checked: false }
            ];
	
	$scope.answer=function(){
		$scope.answerShow=!$scope.answerShow;
	};
	
	$scope.submit=function(){
		$scope.answerShow=!$scope.answerShow;
	};
	
})
;
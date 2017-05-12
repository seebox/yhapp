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
              { text: "安技部", checked: false },
              { text: "办公室", checked: false },
              { text: "引航站", checked: false }
            ];
	
	$scope.answer=function(){
		$scope.answerShow=!$scope.answerShow;
	};
	$scope.rep = {
		title:"",
		reply:""
	}
	$scope.reply = "";
	$scope.comment = "";
	$scope.submit=function(){
		$scope.answerShow=!$scope.answerShow;
	};
	$scope.tiwen=function(){
		$scope.jiaoliuModal.hide();
		$scope.items.push($scope.rep);
	};
	$scope.commlist = ['说的很好，很有心得','早就知道了'];

	$scope.comm = function(){
		$scope.commlist.push($scope.comment);
		$scope.comment = "";
	}
	$scope.items = [
		{title:"港口企业对被引船舶靠、离泊，应当做好哪些工作？",reply:"泊位的靠泊等级必须符合被靠船舶相应等级，泊位防护设施完好；"}
	]
	
})
;
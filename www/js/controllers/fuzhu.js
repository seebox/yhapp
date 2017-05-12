$controllers


.controller('fuzhu', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	$scope.search=function(){
		$scope.selectShow=!$scope.selectShow;
	};

})

.controller('boatlists', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	$scope.search=function(){
		$scope.selectShow=!$scope.selectShow;
	};

	
})

.controller('boatdetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate,$stateParams) {
	$scope.id =   $stateParams.id;
	
})

.controller('faguilists', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	$scope.search=function(){
		$scope.selectShow=!$scope.selectShow;
	};
	
})

.controller('faguidetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	
})

.controller('hangxinglists', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	$scope.search=function(){
		$scope.selectShow=!$scope.selectShow;
	};
	
})

.controller('hangxingdetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	
})

.controller('matoulists', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	$scope.search=function(){
		$scope.selectShow=!$scope.selectShow;
	};
		$scope.items = [
    {
        "key": "eight",
        "value": "082",
        "title": "8时潮高"
    },
    {
        "key": "eighteen",
        "value": "100",
        "title": "18时潮高"
    },
    {
        "key": "eleven",
        "value": "361",
        "title": "11时潮高"
    },
    {
        "key": "fifteen",
        "value": "206",
        "title": "15时潮高"
    },
    {
        "key": "five",
        "value": "118",
        "title": "5时潮高"
    },
    {
        "key": "four",
        "value": "146",
        "title": "4时潮高"
    },
    {
        "key": "fourteen",
        "value": "258",
        "title": "14时潮高"
    },
    {
        "key": "nine",
        "value": "191",
        "title": "9时潮高"
    },
    {
        "key": "nineteen",
        "value": "080",
        "title": "19时潮高"
    },
    {
        "key": "one",
        "value": "295",
        "title": "1时潮高"
    },
    {
        "key": "placeDate",
        "value": "吴淞",
        "title": "请求地点"
    },
    {
        "key": "seven",
        "value": "083",
        "title": "7时潮高"
    },
    {
        "key": "seventeen",
        "value": "127",
        "title": "17时潮高"
    },
    {
        "key": "six",
        "value": "093",
        "title": "6时潮高"
    },
    {
        "key": "sixteen",
        "value": "165",
        "title": "16时潮高"
    },
    {
        "key": "ten",
        "value": "312",
        "title": "10时潮高"
    },
    {
        "key": "thieteen",
        "value": "327",
        "title": "13时潮高"
    },
    {
        "key": "three",
        "value": "194",
        "title": "3时潮高"
    },
    {
        "key": "tidehigh1",
        "value": "076",
        "title": "潮高1"
    },
    {
        "key": "tidehigh2",
        "value": "368",
        "title": "潮高2"
    },
    {
        "key": "tidehigh3",
        "value": "060",
        "title": "潮高3"
    },
    {
        "key": "tidehigh4",
        "value": "060",
        "title": "潮高4"
    },
    {
        "key": "tidetime1",
        "value": "0736",
        "title": "低潮时间1"
    },
    {
        "key": "tidetime2",
        "value": "1129",
        "title": "低潮时间2"
    },
    {
        "key": "tidetime3",
        "value": "2004",
        "title": "低潮时间3"
    },
    {
        "key": "tidetime4",
        "value": "2004",
        "title": "低潮时间4"
    },
    {
        "key": "twelve",
        "value": "361",
        "title": "12时潮高"
    },
    {
        "key": "twenty",
        "value": "061",
        "title": "20时潮高"
    },
    {
        "key": "twentyOne",
        "value": "129",
        "title": "21时潮高"
    },
    {
        "key": "twentyThree",
        "value": "350",
        "title": "23时潮高"
    },
    {
        "key": "twentyTwo",
        "value": "278",
        "title": "22时潮高"
    },
    {
        "key": "two",
        "value": "234",
        "title": "2时潮高"
    },
    {
        "key": "zero",
        "value": "337",
        "title": "0时潮高"
    }
];
	
})

.controller('matoudetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
	
	
})

;
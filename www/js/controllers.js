$controllers

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('tpls/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
    
  };

  $scope.login = function() {
    $scope.modal.show();
  };
  
  
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    window.localStorage.username = $scope.loginData.username;
    if(window.localStorage.username == 'admin'){
      $rootScope.role = false;
      $rootScope.userName = "张某";
      $rootScope.userTitle = "航站管理员";
      $rootScope.playlists = [{
        name: "引航计划",
        url:"app/jihua"
      },{
        name: "引航计划审批",
        url:"app/shenpi"
      },{
        name: "特种夜航船审批",
        url:"app/tezhong"
      }, {
        name: "航行公告信息",
        url:"app/hangxinglists"
      }, {
        name: "潮汐信息",
        url:"app/matoulists"
      }, {
        name: "规章制度",
        url:"app/faguilists"
      }, {
        name: "安全预警消息",
        url:"app/anquan"
      }, {
        name: "消息中心",
        url:"app/xiaoxi"
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
        name: "公文在线",
        url:"app/netclass"
      }, {
        name: "信息公告",
        url:"app/netclass"
      }, {
        name: "明文传真",
        url:"app/netclass"
      }, {
        name: "学习交流",
        url:"app/netclass"
      }];
    }else{
      $rootScope.role = true;
      $rootScope.userName = "李某";
      $rootScope.userTitle = "引航中心引航员";
      $rootScope.playlists = [{
        name: "引航计划",
        url:"app/jihua"
      }, {
        name: "我的航次汇报",
        url:"app/huibao"
      }, {
        name: "航行公告信息",
        url:"app/hangxinglists"
      }, {
        name: "潮汐信息",
        url:"app/matoulists"
      }, {
        name: "规章制度",
        url:"app/faguilists"
      }, {
        name: "安全预警消息",
        url:"app/anquan"
      }, {
        name: "消息中心",
        url:"app/xiaoxi"
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
        name: "公文在线",
        url:"app/netclass"
      }, {
        name: "信息公告",
        url:"app/netclass"
      }, {
        name: "明文传真",
        url:"app/netclass"
      }, {
        name: "学习交流",
        url:"app/netclass"
      },{
        name: "引航签证单",
        url:"app/playlists"
      }];
    }




    $timeout(function() {
      $scope.closeLogin();
    }, 500);
  };
$scope.doLogin();
  $rootScope.isOpen = function() {
    return $ionicSideMenuDelegate.isOpen();
  }

});
$controllers

.controller('MainCtrl', function($rootScope, $scope, $stateParams, $ionicSideMenuDelegate) {
  $rootScope.issync = false;
  $rootScope.isOpen = function() {
    return $ionicSideMenuDelegate.isOpen(); 
  }
  $scope.positive = false;


})

;
$controllers


.controller('anquan', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

;
$controllers
.controller('butie', function($rootScope, $scope, $ionicModal,$stateParams, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


	
	
	
}); 
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
$controllers

.controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

   $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalHuibao = modal;
  });
  $scope.huibaolist = window.localStorage.huibaolist?JSON.parse(window.localStorage.huibaolist):[];


});
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
$controllers

.controller('jihua', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
    $scope.yinhangzhan = "江阴";
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

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.modalList = modal;
  });
  
 

})

.controller('jihuaDetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate,$stateParams,$cordovaActionSheet,$cordovaCamera,$cordovaImagePicker) {
  $ionicModal.fromTemplateUrl('piban-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPeiban = modal;
  });
$scope.i = $stateParams.id;
  $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalHuibao = modal; 
  });
   $scope.doHuibao = function(){
     
     var huibaolist = window.localStorage.huibaolist?JSON.parse(window.localStorage.huibaolist):[];
     huibaolist.push($stateParams.id);
     window.localStorage.huibaolist = JSON.stringify(huibaolist);
     $scope.modalHuibao.hide();
   }

     $ionicModal.fromTemplateUrl('tpls/playlist.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.playModal = modal;
  });
   
  

  $scope.play = function(){
    $scope.playModal.show();
  }

  $scope.dates1 = [0];
  $scope.dates2 = [0];
  $scope.add1 = function(){
    $scope.dates1.push($scope.dates1.length);
  }
   $scope.min1 = function(){
     if($scope.dates1.length>1)
    $scope.dates1.pop();
   };
   $scope.add2 = function(){
    $scope.dates2.push($scope.dates2.length);
  }
   $scope.min2 = function(){
     if($scope.dates2.length>1)
    $scope.dates2.pop();
   };

       $scope.upload = function() {
        $cordovaActionSheet.show({
            title: '请选择',
            buttonLabels: ['拍照', '从相册选择'],
            addCancelButtonWithLabel: '取消',
            androidEnableCancelButton: true,
        }).then(function(btnIndex) {
            switch (btnIndex) {
                case 1:
                    takePhoto();
                    break;
                case 2:
                    pickImage();
                    break;
                default:
                    break;
            }
        });
    };

    var takePhoto = function() {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI, //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
            sourceType: Camera.PictureSourceType.CAMERA, //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $rootScope.imageData = imageData;
        }, function(err) {
            
        });
    }

    var pickImage = function() {
        var options = {
            maximumImagesCount: 10,
            width: 800,
            height: 800,
            quality: 80
        };

        $cordovaImagePicker.getPictures(options)
            .then(function(results) {
                $rootScope.imageData = results[0];
            }, function(error) {});
    }

    $scope.save = function(){
        $ionicGoBack();
    }
    $scope.submit = function(){
        $.scope.$ionicGoBack()
    }


})




;
$controllers
.controller('butie', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


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
	$scope.com = {content:""};
$scope.commlist = [];
	$scope.submit = function(){
		$scope.commlist.push($scope.com.content);
		$scope.com.content = "";
	}
	
	
}); 
$controllers


.controller('PlaylistsCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

.controller('PlaylistCtrl', function($rootScope, $scope, $ionicModal, $timeout, 
$ionicLoading, $ionicPopup, $ionicSideMenuDelegate,
$cordovaActionSheet,$cordovaCamera,$cordovaImagePicker) {
    $scope.upload = function() {
        $cordovaActionSheet.show({
            title: '请选择',
            buttonLabels: ['拍照', '从相册选择'],
            addCancelButtonWithLabel: '取消',
            androidEnableCancelButton: true,
        }).then(function(btnIndex) {
            switch (btnIndex) {
                case 1:
                    takePhoto();
                    break;
                case 2:
                    pickImage();
                    break;
                default:
                    break;
            }
        });
    };

    var takePhoto = function() {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI, //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
            sourceType: Camera.PictureSourceType.CAMERA, //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $rootScope.imageData = imageData;
        }, function(err) {
            
        });
    }

    var pickImage = function() {
        var options = {
            maximumImagesCount: 10,
            width: 800,
            height: 800,
            quality: 80
        };

        $cordovaImagePicker.getPictures(options)
            .then(function(results) {
                $rootScope.imageData = results[0];
            }, function(error) {});
    }

    $scope.save = function(){
        $ionicGoBack();
    }
    $scope.submit = function(){
        $.scope.$ionicGoBack()
    }

});
$controllers

.controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
   $ionicModal.fromTemplateUrl('tpls/qingjia-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalJia = modal;
  });
  $scope.role = (window.localStorage.username=='admin');
})

;
$controllers

.controller('shenpi', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup,$ionicSideMenuDelegate) {
    
    $scope.yijian = "";
    $scope.items = [0,1,2,3,4,5,6,7,8,9];
    $scope.submit = function(){
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="yijian">',
     title: '请输入审批意见',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: '取消' },
       {
         text: '<b>提交</b>',
         type: 'button-positive',
         onTap: function(e) {

$scope.items = [10,11,12,13,14,15,16,17];

     
            
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
    }
})

;
$controllers


.controller('tezhong', function($rootScope, $scope,$ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

  $ionicModal.fromTemplateUrl('anquan-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.anquanModal = modal;
  });

  $scope.baobei = function(){
      $ionicLoading.show({template:'审核已完成'});
      $timeout(function(){
        $ionicLoading.hide();
      },2000);
  }
  $scope.baopi = function(){
      $ionicLoading.show({template:'已转到安技部审批'});
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
  }
});
$controllers


.controller('xiaoxi', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

;
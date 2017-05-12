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
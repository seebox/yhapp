$controllers.controller('PlaylistsCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {


})

.controller('PlaylistCtrl', function($rootScope, $scope, $ionicModal, $timeout,
    $ionicLoading, $ionicPopup, $ionicSideMenuDelegate,
    $cordovaActionSheet, $cordovaCamera, $cordovaImagePicker) {
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

    $scope.save = function() {
        $ionicGoBack();
    }
    $scope.submit = function() {
        $.scope.$ionicGoBack()
    }

});
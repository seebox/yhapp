$controllers
    .controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $http, $cordovaActionSheet, $cordovaCamera, $cordovaImagePicker) {

        // $ionicModal.fromTemplateUrl('tpls/huibao-detail.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.modalHuibao = modal;
        // });
        $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHuibaoForm = modal;
        });
        // $ionicModal.fromTemplateUrl('tpls/playlist.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.playModal = modal;
        // });
        $scope.index = 0;
        $scope.changeTab = function(i) {
            $scope.index = i;
            $scope.loadData(true);
        };
        $scope.showHuibao = function(item) {

            var params = {
                username: $rootScope.loginBody.loginUserName,
                cbbh: item.cbbh
            };
            $http({
                method: "GET",
                url: "/cjpilot/yhapi/yhjhBean.jspx",
                params: params
            }).success(function(res) {
                $scope.huibaoForm = {};
            });
            $scope.huibaoItem = item;
            $scope.huibaoItem.yhyName = $rootScope.loginBody.loginUserRealName;
            $scope.modalHuibaoForm.show();
        };
        $scope.modifyDetail = function(item) {
            $http.get('/cjpilot/yhapi/hchb.jspx?type=1&mode=HCHB&id=' + item.id).success(function(res) {
                $scope.huibaoForm = res.body.result.report;
                $scope.modalHuibaoForm.show();
            });

        };
        $scope.huibaolist = [];


        $http({
            method: "GET",
            url: "/cjpilot/yhapi/hchb.jspx",
            params: {
                mode: 'QZD',
                cbbh: '通w107473',
                username: $rootScope.loginBody.loginUserName
            }
        }).success(function(res) {

        });

        var pageNo = 0,
            pageSize = 15;
        $scope.jihuaList = [];
        $scope.noMore = true;

        $scope.loadData = function(isRefresh) {
            if (isRefresh) {
                pageNo = 1;
            } else {
                ++pageNo;
            }
            $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
            var params = {
                type: 1,
                isFinish: $scope.index,
                pilot: $rootScope.loginBody.userPersonId,
                stationId: $rootScope.loginBody.dept.deptId,
                username: $rootScope.loginBody.loginUserName
            };

            $http({
                method: "GET",
                url: "/cjpilot/yhapi/yhjhList.jspx",
                params: params
            }).success(function(res) {
                $ionicLoading.hide();
                if (res.body.result) {
                    if (isRefresh) {
                        $scope.jihuaList = res.body.result;
                    } else {
                        $scope.jihuaList = $scope.jihuaList.concat(res.body.result);
                    }
                    if (res.body.result.length > 0) {
                        $scope.noMore = true;
                    } else {
                        $scope.noMore = false;
                    }
                }

                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };


        // $scope.play = function() {
        //     $scope.playModal.show();
        // };
        $scope.dates1 = [0];
        $scope.dates2 = [0];
        $scope.add1 = function() {
            $scope.dates1.push($scope.dates1.length);
        };
        $scope.min1 = function() {
            if ($scope.dates1.length > 1)
                $scope.dates1.pop();
        };
        $scope.add2 = function() {
            $scope.dates2.push($scope.dates2.length);
        };
        $scope.min2 = function() {
            if ($scope.dates2.length > 1)
                $scope.dates2.pop();
        };
        $scope.huibaoForm = {};
        $scope.doHuibao = function() {
            console.log($scope.huibaoForm);
            $scope.huibaoForm.cbbh = $scope.huibaoItem.cbbh;
            $scope.huibaoForm.yhy = $rootScope.loginBody.userPersonId;
            $scope.huibaoForm.jjhyhy = "";
            $scope.huibaoForm.sessionKey = $rootScope.loginBody.sessionKey;
            $scope.huibaoForm.appId = SYSTEM.appId;
            $scope.huibaoForm.username = $rootScope.loginBody.loginUserName;
            var data = [];
            for (var k in $scope.huibaoForm) {
                data.push(k + "=" + $scope.huibaoForm[k]);
            }

            $http({
                method: "POST",
                url: "/cjpilot/yhapi/hchb/save.jsp",
                //data: data.join("&")
                params: $scope.huibaoForm
            }).success(function(res) {
                $scope.modalHuibaoForm.hide();
                if ($rootScope.imageData) {
                    filego(res.body.qzdInfo.pbid, $rootScope.imageData);
                }

            });
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
        };

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
        };

        function filego(billId, imageURI) {

            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var params = {};
            params.appId = SYSTEM.appId;
            params.sessionKey = $rootScope.loginBody.sessionKey;
            params.username = $rootScope.loginBody.loginUserName;
            params.billId = billId;
            options.params = params;
            var ft = new FileTransfer();
            var url = encodeURI(SYSTEM.host + '/yhapi/hchb/fileUpload.jsp');
            $cordovaFileTransfer.upload(url, options)
                .then(function(result) {
                    alert(result);

                }, function(err) {
                    alert(err);
                });
        }
    });
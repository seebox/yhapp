$controllers

    .controller('AppCtrl', function($rootScope, $scope, $http, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $state, $checkUpdate) {


    if (window.localStorage.loginBody) {
        $rootScope.loginBody = JSON.parse(window.localStorage.loginBody);
    } else {
        $state.go('login');
    }
    $rootScope.gologin = function() {
        $state.go('login');
    }

    $scope.checkUpdate = function() {
        $checkUpdate.go();
    }

});
$controllers.controller('MainCtrl', function($rootScope, $scope, $http, $stateParams, $ionicSideMenuDelegate) {
    $rootScope.issync = false;
    $rootScope.isOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
    };
    $scope.positive = false;
    $scope.role = true;
    $scope.colors = ['positive', 'calm', 'balanced', 'energized', 'assertive', 'royal'];
    $scope.colors = $scope.colors.concat($scope.colors);
    $scope.colors = $scope.colors.concat($scope.colors);

    $http.get('/WebapiService/GetAppPermission?userId=' + $rootScope.loginBody.loginUserId).success(function(response) {

        for (var i in response) {
            if (response[i].Name == "特种船舶审批") {
                $rootScope.tezhong = !response[i].IsHavePermission;
            }
            if (response[i].Name == "夜航船舶审批") {
                $rootScope.yehang = !response[i].IsHavePermission;
            }
        }

        $scope.playlists = [{
            name: "引航计划",
            url: "app/jihua"
        }, {
            name: "航次汇报",
            url: "app/huibao"
        }, {
            name: "引航计划审批",
            url: "app/shenpi",
            hide: $rootScope.loginBody.dept.deptParentName == "中心机关"
        }, {
            name: "特种夜航船审批",
            url: "app/tezhong",
            hide: $rootScope.tezhong || $rootScope.yehang
        }, {
            name: "码头泊位信息",
            url: "app/bowei"
        }, {
            name: "潮汐信息",
            url: "app/chaoxi"
        }, {
            name: "出航津贴查询",
            url: "app/butie"
        }, {
            name: "规章制度",
            url: "app/faguilists/GZZD"
        }, {
            name: "安全预警",
            url: "app/faguilists/AQYJ"
        }, {
            name: "航行公告信息",
            url: "app/faguilists/HXGG"
        }, {
            name: "安全公告",
            url: "app/faguilists/AQGG"
        }, {
            name: "交流互动",
            url: "app/jiaoliu"
        }, {
            name: "休假管理",
            url: "app/qingjia"
        }, {
            name: "网络学堂",
            url: "app/faguilists/WLXT"
        }, {
            name: "公文在线",
            url: "app/faguilists/GWZX"
        }, {
            name: "信息公告",
            url: "app/faguilists/XXGG"
        }, {
            name: "明文传真",
            url: "app/faguilists/MWCZ"
        }, {
            name: "消息中心",
            url: "app/xiaoxi/CENTER"
        }];
    });
    $scope.playlists = [{
        name: "引航计划",
        url: "app/jihua"
    }, {
        name: "航次汇报",
        url: "app/huibao"
    }, {
        name: "引航计划审批",
        url: "app/shenpi",
        hide: $rootScope.loginBody.dept.deptParentName == "中心机关"
    }, {
        name: "特种夜航船审批",
        url: "app/tezhong",
        hide: $rootScope.tezhong || $rootScope.yehang
    }, {
        name: "码头泊位信息",
        url: "app/bowei"
    }, {
        name: "潮汐信息",
        url: "app/chaoxi"
    }, {
        name: "出航津贴查询",
        url: "app/butie"
    }, {
        name: "规章制度",
        url: "app/faguilists/GZZD"
    }, {
        name: "安全预警",
        url: "app/faguilists/AQYJ"
    }, {
        name: "航行公告信息",
        url: "app/faguilists/HXGG"
    }, {
        name: "安全公告",
        url: "app/faguilists/AQGG"
    }, {
        name: "交流互动",
        url: "app/jiaoliu"
    }, {
        name: "休假管理",
        url: "app/qingjia"
    }, {
        name: "网络学堂",
        url: "app/faguilists/WLXT"
    }, {
        name: "公文在线",
        url: "app/faguilists/GWZX"
    }, {
        name: "信息公告",
        url: "app/faguilists/XXGG"
    }, {
        name: "明文传真",
        url: "app/faguilists/MWCZ"
    }, {
        name: "消息中心",
        url: "app/xiaoxi/CENTER"
    }];


})

;
$controllers
    .controller('butie', function($rootScope, $scope, $http, $ionicModal) {
        $ionicModal.fromTemplateUrl('tpls/butie-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.butieDetail = modal;
        });
        $scope.openDetail = function(item) {
            $scope.item = item;
            $scope.butieDetail.show();
        };
        $scope.years = [];
        for (var i = 0; i < 24; i++) {
            $scope.years.push(moment().subtract(i, 'month').format("YYYY-MM"));
        }

        $scope.changeDate = function(date) {
            $scope.curmonth = date;
            loadData(date);
        };

        function loadData(date) {
            $http({
                method: "GET",
                url: "/cjpilot/yhapi/vpn/chjt.jspx",
                params: { pilotDate: date, yhyid: $rootScope.loginBody.userPersonId }
            }).success(function(res) {
                $scope.data = res.body.chjt;
            });
        }
        $scope.curmonth = moment().format("YYYY-MM");
        loadData($scope.curmonth);
    })
    .controller('bowei', function($rootScope, $scope, $http, $ionicModal, $ionicLoading) {
        $ionicModal.fromTemplateUrl('bowei-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.boweiDetail = modal;
        });

        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: { type: "yhz" }
        }).success(function(res) {
            $scope.yhzList = res.result;
        });

        function loadData(str) {
            $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
            var params = { type: "bwmt" };
            if (str) {
                params.str = JSON.stringify(str);
            }
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/getlist",
                params: params
            }).success(function(res) {
                $ionicLoading.hide();
                $scope.jihuaList = res.result;

            });
        }

        $scope.YHZ = "江阴站";
        var str = { yhz: '江阴站' };
        loadData(str);
        $scope.search = function() {

            if ($scope.yinhangzhan) {
                str.yhz = $scope.yinhangzhan;
                $scope.YHZ = str.yhz;
            }
            loadData(str);
            $scope.menuShow = false;
        };

        $scope.showDetail = function(item) {
            $scope.item = item;
            $scope.boweiDetail.show();
        };

    });
$controllers
    .controller('faguilists', function($scope, $http, $ionicModal, $ionicLoading, $stateParams, $cordovaFileTransfer, $cordovaFileOpener2) {
        if ($stateParams.flag == 'AQGG') {
            $scope.title = '';
            $scope.choice = { k: 'AQGG', v: '安全公告' };
        } else if ($stateParams.flag == 'AQYJ') {
            $scope.title = '';
            $scope.choice = { k: 'AQYJ', v: '安全预警' };
        } else if ($stateParams.flag == 'GZZD') {
            $scope.types = [
                { k: 'RSGL', v: '人事管理' },
                { k: 'XZGL', v: '行政管理' },
                { k: 'DQGL', v: '党群管理' },
                { k: 'CWGL', v: '财务管理' },
                { k: 'AQGL', v: '安全管理' },
                { k: 'SCDD', v: '生产调度' }
            ];
            $http.get('cjpilot/yhapi/channelList.jspx?parent=AQGG').success(function(response) {
                //$scope.types;
            });

            $scope.title = '规章制度 - ';
            $scope.choice = { k: 'RSGL', v: '人事管理' };
            $scope.cur = "RSGL";
        } else if ($stateParams.flag == 'HXGG') {
            $scope.types = [];
            $scope.choice = { k: 'HXGG', v: '航行公告' };
        } else if ($stateParams.flag == 'GWZX') {
            $scope.types = [];
            $scope.choice = { k: 'GWZX', v: '公文在线' };
        } else if ($stateParams.flag == 'XXGG') {
            $scope.types = [];
            $scope.choice = { k: 'XXGG', v: '信息公告' };
        } else if ($stateParams.flag == 'MWCZ') {
            $scope.types = [];
            $scope.choice = { k: 'MWCZ', v: '明文传真' };
        } else if ($stateParams.flag == 'WLXT') {
            $scope.types = [
                { k: 'YWXX', v: '业务学习' },
                { k: 'ZZXX', v: '政治学习' },
                { k: 'QTXX', v: '其他学习' },
                { k: 'WSJT', v: '网上讲堂' }
            ];
            $scope.title = '网络学堂 - ';
            $scope.choice = { k: 'YWXX', v: '业务学习' };
            $scope.cur = "YWXX";
        }
        $ionicModal.fromTemplateUrl('tpls/fagui-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHangxin = modal;
        });
        var pageNo = 0,
            pageSize = 15;
        $scope.items = [];
        $scope.noMore = true;
        $scope.change = function(choice, isRefresh) {
            if (isRefresh) {
                pageNo = 1;
            } else {
                ++pageNo;
            }
            $ionicLoading.show({ template: '正在加载...' });
            $scope.selectShow = false;
            $scope.choice = choice;
            $http.get('/cjpilot/yhapi/content.jspx?type=0&channel=' + choice.k + '&pageNo=' + pageNo + '&pageSize=' + pageSize).success(function(response) {
                $ionicLoading.hide();
                if (response.body.content) {
                    if (isRefresh) {
                        $scope.items = response.body.content.list;
                    } else {
                        $scope.items = $scope.items.concat(response.body.content.list);
                    }
                    if (response.body.content.list.length > 0) {
                        $scope.noMore = true;
                    } else {
                        $scope.noMore = false;
                    }
                } else {
                    $scope.noMore = false;
                }

                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $scope.showDetail = function(id) {
            $http.get('/cjpilot/yhapi/content.jspx?type=1&parent=GZZD&contentId=' + id).success(function(response) {
                $scope.detail = response.body.content;
                $scope.detail.atmlist = [];
                var patt1 = /<a.*?(href=\"([^\"]*)\").*?>([^>]*?)<\/a>/g;

                while (result = patt1.exec($scope.detail.txt)) {
                    $scope.detail.atmlist.push({ url: SYSTEM.host + result[2], name: result[3] });

                }
                $scope.detail.txt = $scope.detail.txt.replace(patt1, "");
                $scope.modalHangxin.show();
            });
            $http.get('/cjpilot/yhapi/readContent.jspx?learnLengthUsed=1&contentId=' + id).success(function(response) {
                $scope.detail = response.body.content;
                $scope.modalHangxin.show();
            });
        };

        $scope.preview = function(atm) {
            var targetPath = device.platform == "Android" ? cordova.file.externalDataDirectory + atm.name : cordova.file.documentsDirectory + encodeURI(atm.name);

            $cordovaFileTransfer.download(atm.url, targetPath, {}, true).then(function(result) {

                $cordovaFileOpener2.open(targetPath, 'application/octet-stream').then(function() {}, function(err) {
                    alert(JSON.stringify(err));
                });
            }, function(err) {

            }, function(progress) {

            });
        }

    }).filter(
        'to_trusted', ['$sce', function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            }
        }]
    )

.controller('chaoxi', function($scope, $http) {

    $scope.default = {
        place: 1,
        whichDay: 1
    }
    $scope.search = function() {
        $scope.selectShow = !$scope.selectShow;
    };
    $scope.addrs = [{ name: "吴淞", id: "1" }, { name: "白茆", id: "2" }, { name: "浒浦", id: "3" }, { name: "天生港", id: "4" }, { name: "江阴", id: "5" }];
    $scope.days = [{ name: "前一天", id: "0" }, { name: "今天", id: "1" }, { name: "后一天", id: "2" }]

    $scope.search = function(place, whichDay) {
        if (place && whichDay) {
            $scope.default = {
                place: place,
                whichDay: whichDay
            }
        }
        $http.get('/cjpilot/yhapi/vpn/tide.jspx?place=' + $scope.default.place + '&whichDay=' + $scope.default.whichDay + '&nowTime=' + parseInt(new Date().getTime() / 1000)).success(function(response) {
            if (response.body.data) {
                $scope.data = response.body.data[0];
                $scope.data.nowTime = response.body.nowTime;
            }
        });
    }
    $scope.search();

});
$controllers
    .controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $http, $cordovaActionSheet, $cordovaCamera, $cordovaImagePicker, $cordovaFileTransfer) {

        $ionicModal.fromTemplateUrl('tpls/huibao-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalDetail = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHuibaoForm = modal;

        });

        $scope.index = 0;
        $scope.changeTab = function(i) {
            pageNo = 0;
            $scope.index = i;
            $scope.loadData(true);
        };
        $scope.showHuibao = function(item) {

            var params = {
                username: $rootScope.loginBody.loginUserName,
                cbbh: item.cbbh,
                pilot: $rootScope.loginBody.userPersonId
            };
            $http({
                method: "GET",
                url: "/cjpilot/yhapi/yhjhBean.jspx",
                params: params
            }).success(function(res) {
                $scope.huibaoForm = Object.assign(res.body.result.hchb, res.body.result.qzd, res.body.result.attach_list);
                $scope.huibaoForm.jjqyhsjd1 = [];
                $scope.huibaoForm.jjqyhsjd2 = [];
                $scope.huibaoForm.jjhyhsjd1 = [];
                $scope.huibaoForm.jjhyhsjd2 = [];
                if ($scope.huibaoForm.jjqyhsjd.length > 0) {
                    var arr1 = $scope.huibaoForm.jjqyhsjd.split(",");
                    for (var i = 0; i < arr1.length; i++) {
                        $scope.huibaoForm.jjqyhsjd1.push(arr1[i].split("/")[0]);
                        $scope.huibaoForm.jjqyhsjd2.push(arr1[i].split("/")[1]);
                    }
                }
                if ($scope.huibaoForm.jjhyhsjd.length > 0) {
                    var arr2 = $scope.huibaoForm.jjhyhsjd.split(",");
                    for (var i = 0; i < arr2.length; i++) {
                        $scope.huibaoForm.jjhyhsjd1.push(arr2[i].split("/")[0]);
                        $scope.huibaoForm.jjhyhsjd2.push(arr2[i].split("/")[1]);
                    }
                }
                $scope.attach_list = res.body.result.attach_list;
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
                username: $rootScope.loginBody.loginUserName,
                pageNo: pageNo,
                pageSize: pageSize
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
                } else {
                    $scope.noMore = false;
                }

                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.showDetail = function(item) {
            $scope.huibaoItem = item;
            $scope.modalDetail.show();
        }

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
            $scope.huibaoForm.jjqyhsjd = [];
            if ($scope.huibaoForm.jjqyhsjd1) {
                for (var i in $scope.huibaoForm.jjqyhsjd1) {
                    $scope.huibaoForm.jjqyhsjd.push($scope.huibaoForm.jjqyhsjd1[i] + "/" + $scope.huibaoForm.jjqyhsjd2[i]);
                }
            }
            $scope.huibaoForm.jjqyhsjd = $scope.huibaoForm.jjqyhsjd.join(",");
            $scope.huibaoForm.jjhyhsjd = [];
            if ($scope.huibaoForm.jjhyhsjd1) {
                for (var i in $scope.huibaoForm.jjhyhsjd1) {
                    $scope.huibaoForm.jjhyhsjd.push($scope.huibaoForm.jjhyhsjd1[i] + "/" + $scope.huibaoForm.jjhyhsjd2[i]);
                }
            }
            $scope.huibaoForm.jjhyhsjd = $scope.huibaoForm.jjhyhsjd.join(",");
            console.log($scope.huibaoForm);
            var data = [];
            for (var k in $scope.huibaoForm) {
                data.push(k + "=" + $scope.huibaoForm[k]);
            }

            $http({
                method: "POST",
                url: "/cjpilot/yhapi/hchb/save.jsp",
                params: $scope.huibaoForm
            }).success(function(res) {

                if ($rootScope.imageData) {

                    filego(res.body.result.qzdInfo.pbid, $rootScope.imageData);
                } else {
                    $scope.modalHuibaoForm.hide();

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

            options.fileKey = "files";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var params = {};
            options.params = params;

            var ft = new FileTransfer();

            var url = encodeURI(SYSTEM.host + '/cjpilot/yhapi/hchb/fileUpload.jsp?billId=' + billId + '&appId=' +
                SYSTEM.appId + '&username=' + $rootScope.loginBody.loginUserName + '&sessionKey=' + $rootScope.loginBody.sessionKey);

            $cordovaFileTransfer.upload(url, imageURI, options)
                .then(function(result) {
                    $scope.changeTab(1);
                    $scope.modalHuibaoForm.hide();

                }, function(err) {
                    //alert(err);
                });
        }
    }).directive('datetime', function() {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function($scope, element, attrs, ngModel) {

                $(element).on('click', function() {
                    datePicker.show(options, onSuccess, onError);
                });

                var options = {
                    date: $scope.ngModel ? $scope.ngModel : new Date(),
                    mode: 'datetime',
                    is24Hour: true
                };

                function onSuccess(date) {
                    $scope.$apply(function() {
                        $scope.ngModel = moment(date).format('YYYY-MM-DD HH:mm:ss');
                    })

                }

                function onError(error) { // Android only
                    if (error == 'cancel') {
                        $scope.$apply(function() {
                            $scope.ngModel = '';
                        })
                    } else {
                        //alert('Error: ' + error);
                    }
                }
            }
        };
    }).filter(
        'nimabi', [function() {
            return function(text) {

                return text.replace("http://198.22.240.212", SYSTEM.host);


            }
        }]
    );
$controllers
    .controller('jiaoliu', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $http) {

        $ionicModal.fromTemplateUrl('jiaoliu-modal.html', {
            'scope': $scope
        }).then(function(modal) {
            $scope.jiaoliuModal = modal;
        });

        $ionicModal.fromTemplateUrl('users-modal.html', {
            'scope': $scope
        }).then(function(modal) {
            $scope.usersModal = modal;
        });


        $scope.changedOrg = function() {
            $scope.usersModal.hide();
        };
        $scope.selectOrg = function(item) {
            item.checked = !item.checked;
        };
        $scope.rep = {
            title: "",
            reply: ""
        };
        $scope.reply = "";
        $scope.comment = "";

        $scope.changeTab = function(i) {
            $scope.index = i;
            $scope.loadData(true);
        };
        $scope.index = 0;
        var pagenum = 0,
            count = 20;

        var listUri = [
            "/mobileoa/japi/discuss/list", //不可回答
            "/mobileoa/japi/discuss/listBelongOrg", //可回答
            "/mobileoa/japi/discuss/myList" //我提问的
        ];
        $scope.items = [];
        $scope.noMore = true;
        $scope.loadData = function(isRefresh) {

            if (isRefresh) {
                pagenum = 1;
            } else {
                ++pagenum;
            }
            $http({
                method: "GET",
                url: listUri[$scope.index],
                params: {
                    orgId: $rootScope.loginBody.dept.deptId,
                    userid: $rootScope.loginBody.loginUserId,
                    pagenum: pagenum,
                    count: count
                }
            }).success(function(res) {
                $ionicLoading.hide();

                if (isRefresh) {
                    $scope.items = res;
                } else {
                    $scope.items = $scope.items.concat(res);
                }
                if (res.length > 0) {
                    $scope.noMore = true;
                } else {
                    $scope.noMore = false;
                }
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }


        $scope.tiwen = function() {
            var invites = [];
            for (var i in $scope.deptList) {
                if ($scope.deptList[i].checked) {
                    invites.push($scope.deptList[i].deptId);
                }
            }
            if ($scope.rep.reply.replace(/\s/, '').length > 0 && invites.length > 0) {
                $http.post('/mobileoa/japi/discuss/add?userid=' + $rootScope.loginBody.loginUserId, {
                    title: $scope.rep.reply,
                    invitedOrgs: invites.join(",")
                }).success(function(res) {
                    $scope.loadData(true);
                    $scope.jiaoliuModal.hide();
                });
            }

        };
        var appKey = 'lB31U03sLvvq1WKJfA1BuFl351Fu24yk';
        var nonce_str = new Date().getTime();
        var ans = ['appId=' + SYSTEM.appId, 'nonce_str=' + nonce_str, 'all=true'];
        var sign = md5(ans.sort().join('&') + '&key=' + appKey).toUpperCase();

        $http.get('/cjpilot/api/dept/getDepartment.jspx?all=true&nonce_str=' + nonce_str + '&sign=' + sign + '&appId=' + SYSTEM.appId).success(function(res) {
            $scope.deptList = res.body;
        });

        $scope.delDiscuss = function(item) {
            $http.get('/mobileoa/japi/discuss/delete/' + item.id + '?userid=' + $rootScope.loginBody.loginUserId).success(function(res) {
                $scope.loadData(true);
            });
        };

    })
    .controller('jiaoliuDetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $http, $stateParams) {

        $scope.answer = function() {
            $scope.answerShow = true;
        };

        $http.get('/mobileoa/japi/discuss/get/' + $stateParams.id + '?userid=' + $rootScope.loginBody.loginUserId).success(function(res) {
            $scope.detail = res;
        });
        $scope.replay = "";
        $scope.index = $stateParams.index;
        $scope.submit = function() {
            if ($scope.replay.replace(/\s/, '').length > 0) {
                $http.post('/mobileoa/japi/discuss/answer?bizid=' + $stateParams.id + '&userid=' + $rootScope.loginBody.loginUserId, { answerContent: $scope.replay }).success(function(res) {
                    $scope.detail = res;
                    $scope.answerShow = !$scope.answerShow;
                    $scope.replay = "";
                });
            }
        };

        $scope.comment = "";
        $scope.comm = function() {

            if ($scope.comment.replace(/\s/, '').length > 0) {
                $http.post('/mobileoa/japi/discuss/comment?bizid=' + $stateParams.id + '&userid=' + $rootScope.loginBody.loginUserId, { commentContent: $scope.comment }).success(function(res) {
                    $scope.detail = res;
                    $scope.comment = "";
                });
            }
        };

        $scope.delAnswer = function(answer) {

            $http.get('/mobileoa/japi/discuss/answer/delete/' + answer.id + '?userid=' + $rootScope.loginBody.loginUserId).success(function(res) {
                $http.get('/mobileoa/japi/discuss/get/' + $stateParams.id + '?userid=' + $rootScope.loginBody.loginUserId).success(function(res) {
                    $scope.detail = res;
                });
            });
        };

        $scope.delComment = function(comm) {

            $http.get('/mobileoa/japi/discuss/comment/delete/' + comm.id + '?userid=' + $rootScope.loginBody.loginUserId).success(function(res) {
                $http.get('/mobileoa/japi/discuss/get/' + $stateParams.id + '?userid=' + $rootScope.loginBody.loginUserId).success(function(res) {
                    $scope.detail = res;
                });
            });
        };

    });
$controllers
    .controller('jihua', function($rootScope, $scope, $ionicModal, $timeout, $http, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

        $ionicModal.fromTemplateUrl('tpls/jihua-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.jihuaDetail = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/jihua-huibao.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.huibaoHistory = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/jihua-ren.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.peiban = modal;
        });
        $ionicModal.fromTemplateUrl('tpls/boat-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.boat = modal;
        });

        $scope.showDetail = function(item) {
            $scope.jihuaItem = item;
            $scope.jihuaDetail.show();
        };
        $scope.showPeiban = function(ids) {

            $http({
                method: "POST",
                url: '/pilotserver/pilotplan/getlist?type=yhy&str={"yhyids":"' + ids.replace(/\|/g, ',') + '"}',
                params: {}
            }).success(function(res) {
                $scope.peibanItem = res.result;
            });
            $scope.peiban.show();
        }
        $scope.showBoat = function(mmsi) {
            $http({
                method: "GET",
                url: '/mobileoa/japi/message/getShipInfo',
                params: { mmsi: mmsi }
            }).success(function(res) {
                $scope.boatItem = res;
            });
            $scope.boat.show();
        }
        $scope.yhzName = $rootScope.loginBody.dept.deptName;
        $scope.sqlx = '20003';

        var pageNo = 0,
            pageSize = 15;
        $scope.jihuaList = [];
        $scope.noMore = true;

        $scope.loadData = function(str, isRefresh) {
            //imexportId:进出江标志（“20003”：进江；“20004”：出江；“20005”：移舶）
            //stationId:引航站主键
            //routeId:船舶航线（0：国内航线；1：国际航线）
            //pilot:引航员主键
            //type:类型（0：引航计划；1：航次汇报）
            //isFinish:是否完成航次汇报（0：未完成；1：已完成）

            if (isRefresh) {
                pageNo = 1;
            } else {
                ++pageNo;
            }
            $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
            var params = {
                type: 0,
                stationId: $rootScope.loginBody.dept.deptId,
                imexportId: $scope.sqlx,
                username: $rootScope.loginBody.loginUserName,
                chName: $scope.chName,
                callNo: $scope.callNo,
                pageNo: pageNo,
                pageSize: pageSize
            };

            if (str) {
                params.stationId = str.station_id;
                params.imexportId = str.sqlx;
            }
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
                } else {
                    $scope.noMore = false;
                }
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $timeout(function() {
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/getlist",
                params: { type: "yhz" }
            }).success(function(res) {
                $scope.yhzList = res.result;
            });
        }, 1000);

        $scope.search = function() {
            var str = {};
            if ($scope.sqlx) {
                str.sqlx = $scope.sqlx;
            }
            if ($scope.yinhangzhan) {
                str.station_id = $scope.yinhangzhan;
                for (var i = 0; i < $scope.yhzList.length; i++) {
                    if (str.station_id == $scope.yhzList[i].YHZID) {
                        $scope.yhzName = $scope.yhzList[i].YHZNAME;
                    }
                }
            }
            $scope.loadData(str, true);
            $scope.menuShow = false;
        };

        $scope.showhistory = function(item) {
            $http({
                method: "POST",
                url: '/pilotserver/pilotplan/getlist?type=hchb',
                params: {
                    str: JSON.stringify({ hh: item.callNo })
                }
            }).success(function(res) {
                $scope.jihuaHistory = res.result;
                $scope.huibaoHistory.show();
            });
        };

    }).filter(
        'date', [function() {
            return function(text) {
                if (text == null || text.length == 0) {
                    return "";
                } else {
                    return moment(text).format('hhmm/DD');
                }

            }
        }]
    );
// function loadData(str) {
//     $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
//     var params = { type: "yhjh", str: '{"sqlx":"20003","cbhx":"0"}' };
//     if (str) {
//         params.str = JSON.stringify(str);
//     }
//     $http({
//         method: "POST",
//         url: "/pilotserver/pilotplan/getlist",
//         params: params
//     }).success(function(res) {
//         $scope.jihuaList = res.result.plan;
//         $ionicLoading.hide();
//     });
// }
$controllers

    .controller('login', function($rootScope, $scope, $http, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $state) {

    $scope.loginData = {
        checked: true
    };


    if (window.localStorage.account) {
        $scope.loginData.username = window.localStorage.account;
        $scope.loginData.password = window.localStorage.password;
    }
    $scope.doLogin = function() {

        var appId = SYSTEM.appId;  
        var appKey = 'lB31U03sLvvq1WKJfA1BuFl351Fu24yk';
        var key = CryptoJS.enc.Utf8.parse("IcMJkg76sXQ6OU3D");
        var iv = CryptoJS.enc.Utf8.parse('SLc1LkHYorpb7imY');
        var nonce_str = new Date().getTime();

        function Encrypt(word) {
            srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            return encrypted.ciphertext.toString().toLowerCase();
        }
        if ($scope.loginData.checked) {
            window.localStorage.account = $scope.loginData.username;
            window.localStorage.password = $scope.loginData.password;
        } else {
            window.localStorage.account = "";
            window.localStorage.password = "";
        }
        var form = ['username=' + $scope.loginData.username, 'aesPassword=' + Encrypt($scope.loginData.password), 'appId=' + appId, 'nonce_str=' + nonce_str];

        var sign = md5(form.sort().join("&") + '&key=' + appKey).toUpperCase();
        $ionicLoading.show({ template: '正在登录' });

        $http.post('/cjpilot/api/user/login.jspx?' + form.join("&") + '&sign=' + sign).success(function(res) {
            if (res.status == "true") {
                window.localStorage.session = ['username=' + $scope.loginData.username, 'sessionKey=' + res.body.sessionKey, 'appId=' + appId, 'nonce_str=' + nonce_str, 'sign=' + sign];
                window.localStorage.loginBody = JSON.stringify(res.body);
                $rootScope.loginBody = res.body;
                $ionicLoading.show({ template: '登录成功' });

                if (window.plugins && window.plugins.jPushPlugin) {
                    window.plugins.jPushPlugin.setTagsWithAlias([], $rootScope.loginBody.loginUserId);
                    $http.get('/mobileoa/yhapi/message/regist?registionId=' + $rootScope.registionId + '&userid=' + $rootScope.loginBody.loginUserId).success(function(response) {});
                }
                $timeout(function() {
                    $ionicLoading.hide();
                    $state.go('app.main');
                }, 1000);
            } else {
                $ionicLoading.hide();
                var alerterr = { "password error": "密码错误", "user not found": "用户不存在" }
                $ionicPopup.alert({ template: alerterr[res.message] });
            }
        }).error(function(data, status, headers, config) {
            alert(config.url);
        });


    };

});
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
$controllers.controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $http) {

    $ionicModal.fromTemplateUrl('tpls/qingjia-form.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalJia = modal;
    });
    $ionicModal.fromTemplateUrl('tpls/qingjia-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.qingjiaDetail = modal;
    });

    $scope.showDetail = function(item) {
        if (item.COMMENTS) {
            item.COMMENTS = item.COMMENTS.split("き");
            for (var i in item.COMMENTS) {
                item.COMMENTS[i] = item.COMMENTS[i].split("キ");
            }
        }

        $scope.itemDetail = item;

        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: {
                type: 'xjtj',
                str: JSON.stringify({ "yhyid": item.YHYID })
            }
        }).success(function(res) {
            $scope.tongji = res.result[0];
        });
        $scope.qingjiaDetail.show();
    };
    $scope.changeTab = function(i) {
        $scope.index = i;
        if (i == 0) {
            $scope.loadData(i);
        } else {
            $scope.loadData(i);
        }

    };
    $scope.loadData = function(index) { 
        var str = JSON.stringify({ "dw": $rootScope.loginBody.dept.deptName, "yhyid": $rootScope.loginBody.userPersonId });
        var currentstep = "1";
        if (index == 1) {
            if ($rootScope.loginBody.dept.deptName.indexOf("总调室") > -1) {
                currentstep = "2";
            } else if ($rootScope.loginBody.dept.deptName.indexOf("中心领导") > -1) {
                currentstep = "3";
            }
            str = JSON.stringify({ "currentstep": currentstep, "dw": $rootScope.loginBody.dept.deptName, "spr": $rootScope.loginBody.userPersonId, "isend": "1" });
        }
        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: {
                type: 'yhyqsj',
                str: str
            }
        }).success(function(res) {
            $scope.items = res.result;
        });
    }
    $scope.loadData();

    $scope.doShenpi = function(item) {
        var processname = "引航站意见";
        if ($rootScope.loginBody.dept.deptName.indexOf("总调室") > -1) {
            processname = "总调室意见";
        } else if ($rootScope.loginBody.dept.deptName.indexOf("中心领导") > -1) {
            processname = "领导意见";
        }
        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/saveoffwork",
            params: {
                str: JSON.stringify({
                    "applicant": item.APPLICANT,
                    "bz": item.BZ,
                    "comments": item.yijian,
                    "currentstep": item.CURRENTSTEP,
                    "dqrq": item.DQRQ,
                    "id": item.DQRQ,
                    "isend": item.ISEND,
                    "jssj1": item.JSSJ1,
                    "jssj2": item.JSSJ2,
                    "kssj1": item.KSSJ1,
                    "kssj2": item.KSSJ2,
                    "processid": UUID.genV1().hexNoDelim,
                    "processname": processname,
                    "qjlb": item.QJLB,
                    "qxjsy": item.QXJSY,
                    "shrq": moment().format('YYYY-MM-DD'),
                    "spbm": item.SPBM,
                    "spr": item.SPR,
                    "stepid": item.CURRENTSTEP,
                    "ts1": item.TS1,
                    "ts2": item.TS2,
                    "type": item.QJLB,
                    "xjcs": item.XJCS,
                    "yhyid": item.YHYID
                })
            }
        }).success(function(res) {
            $scope.qingjiaDetail.hide();
        });
    }

}).filter(
    'dateqingjia', [function() {
        return function(text) {
            text = text + "000";

            if (!text || text.length === 0) {
                return "";
            } else {
                return moment(parseInt(text)).format('YYYY-MM-DD');
            }

        }
    }]).filter(
    'qjlb', [function() {
        return function(text) {
            if (!text) {
                return "";
            }
            if (text.charAt(0) == "1") {
                return "年休假";
            }
            if (text.charAt(1) == "1") {
                return "病假";
            }
            if (text.charAt(2) == "1") {
                return "公休假";
            }
            if (text.charAt(3) == "1") {
                return "婚假";
            }
            if (text.charAt(4) == "1") {
                return "生育假";
            }
            if (text.charAt(5) == "1") {
                return "探亲假";
            }
            if (text.charAt(6) == "1") {
                return "丧假";
            }
            if (text.charAt(7) == "1") {
                return "学习";
            }
            if (text.charAt(8) == "1") {
                return "公差";
            }
            if (text.charAt(9) == "1") {
                return "工伤";
            }
            if (text.charAt(10) == "1") {
                return "待岗";
            }

        }
    }]);
$controllers

    .controller('shenpi', function($rootScope, $scope, $ionicModal, $ionicPopup, $timeout, $ionicLoading, $ionicListDelegate, $ionicSideMenuDelegate, $http) {
    $ionicModal.fromTemplateUrl('tpls/shenpi-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.shenpiDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.jihuaItem = item;
        // $http({
        //     method: "POST",
        //     url: '/pilotserver/pilotplan/getlist?type=yhyqsj&str={"yhyids":"' + item.SDYHY.replace(/\|/g, ',') + '"}',
        // }).success(function(res) {
        // });
        $scope.shenpiDetail.show();
    };

    function loadData(str) {
        $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
        var params = { type: "yhjh", jhzt: "0", str: '{"sqlx":"20003","cbhx":"0"}' };
        if (str) {
            params.str = JSON.stringify(str);
        }
        $http({
            method: "POST",
            url: '/pilotserver/pilotplan/getlist?type=yhjh&str={"app":"0","shzt":"0","yhz":"' + $rootScope.loginBody.dept.deptName + '"}',
            //params: params
        }).success(function(res) {
            $scope.jihuaList = res.result;
            $ionicLoading.hide();
        });
    }
    loadData();
    $scope.delShow = false;
    $scope.showDeleteButtons = function() {
        $scope.delShow = !$scope.delShow;
        $ionicListDelegate.showDelete($scope.delShow);
    };

    $scope.doSelect = function(item) {
        item.checked = !!!item.checked;
    };
    $scope.doCancel = function() {
        $scope.delShow = false;
        $ionicListDelegate.showDelete($scope.delShow);
    };
    $scope.doShenpi = function() {
        var ids = [];
        for (var i in $scope.jihuaList) {
            if ($scope.jihuaList[i].checked) {
                ids.push($scope.jihuaList[i].ID);
            }
        }
        if (ids.length > 0) {
            var str = '武汉,芜湖,南京,镇江';
            var flag = "1";
            if (str.indexOf($rootScope.loginBody.dept.deptName) > -1) {
                flag = "0";
            }
            var params = { str: { type: "6", "partflag": flag, "shr": $rootScope.loginBody.userPersonId, ids: ids } };
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/updateplanstatus",
                params: params
            }).success(function(res) {
                $scope.doCancel();
                loadData();
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '请选择要审批的计划',
                okText: '确定'
            });
        }

    };

})

;
$controllers


    .controller('tezhong', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $http) {
    $ionicModal.fromTemplateUrl('tpls/tezhong-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.tezhongDetail = modal;
    });
    $ionicModal.fromTemplateUrl('tpls/yehang.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.yehangDetail = modal;
    });
    var details;
    $scope.showTzcb = function(item) {
        $scope.tzcbDetail = item;
        $scope.tezhongDetail.show();
        $http({
            method: "GET",
            url: "/WebapiService/GetSpInfo",
            params: { id: item.ID }
        }).success(function(res) {
            details = res.Details;
            $scope.tzcbDetail.NGR = res.SQUserName;
        });
    };
    $scope.showYhcb = function(item) {
        $scope.yhcbDetail = item;
        $scope.yehangDetail.show();
        $http({
            method: "GET",
            url: "/WebapiService/GetSpInfo",
            params: { id: item.ID }
        }).success(function(res) {
            details = res.Details;
            $scope.yhcbDetail.NGR = res.SQUserName;
        });
    };

    $ionicModal.fromTemplateUrl('anquan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.anquanModal = modal;
    });
    $scope.temp = {
        yj: "",
        aqcsText: "",
        IsFinish: "true"
    }
    $scope.baobei = function(tzcbDetail) {
        $http({
            method: "GET",
            url: "/WebapiService/SpFun",
            params: {
                yeOrTe: 1,
                Sqid: tzcbDetail.ID,
                nextSpDetailsId: details[1].ID,
                IsFinish: $scope.IsFinish,
                currUserId: $rootScope.loginBody.loginUserId,
                YHZAQCS: $scope.temp.aqcsText,
                AJBYJ: $scope.temp.yj,
                LDYJ: "3"
            }
        }).success(function(res) {
            $scope.tezhongDetail.hide();
            $scope.yehangDetail.hide();
            $ionicLoading.show({ template: '审核已完成' });
            $timeout(function() {
                $ionicLoading.hide();
            }, 2000);
        });

    }



    $http({
        method: "GET",
        url: "/WebapiService/GetTzcbInfo",
        params: {
            where: "where 1=1",
            pageSize: 500,
            pageIndex: 1,
            isFinish: 0
        }
    }).success(function(res) {
        $scope.Tzcb = res;
    });
    $http({
        method: "GET",
        url: "/WebapiService/GetYhcbInfo",
        params: {
            where: "where 1=1",
            pageSize: 500,
            pageIndex: 1,
            isFinish: 0
        }
    }).success(function(res) {
        $scope.Yhcb = res;
    });
    $http({
        method: "GET",
        url: "WebapiService/GetAQCS"
    }).success(function(res) {
        $scope.aqcslist = res;
    });
    $scope.aqcslist = [{
            "CSNR": "1111111111",
            "ID": "6afcf437376444e793f89fde254eceee",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 44,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "严格按照定线制、苏通大桥及上海港口相关规定。",
            "ID": "1",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 1,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "落实夜航的引领安全措施；加强了望、使用安全航速、全程备锚。",
            "ID": "2",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 6,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "严格执行洪水期的安全措施，注意流压、航道水深变化。",
            "ID": "3",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 4,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "拖轮一艘长江1号浮至码头、护航艇一艘桥区护航。",
            "ID": "42",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 42,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意航道水深变化，乘潮留足富裕水深，确保安全。",
            "ID": "5",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "加强船位监控，同意。",
            "ID": "6",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "认真落实各项安全措施，同意。",
            "ID": "7",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 15,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意拖轮工况，做好应急准备，确保安全。\r\n",
            "ID": "8",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，选择高平潮通过福姜沙南水道，谨慎操作，确保安全。\r\n",
            "ID": "9",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 16,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "属于报备。\r\n",
            "ID": "10",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "无需申报。",
            "ID": "11",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 18,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "注意收听天气状况，密切关注风力。风力不超过5级安排进出江。\r\n",
            "ID": "12",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "认真落实维护措施，留足富余水深过浅区。\r\n",
            "ID": "13",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "同意。\r\n",
            "ID": "14",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 19,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "严格执行拖轮使用规定，靠离泊时申请拖轮协助。",
            "ID": "15",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 7,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "进出锚地时申请拖轮协助。",
            "ID": "16",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 8,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇一艘全程护航；",
            "ID": "17",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "认真计算潮高，根据设标水深和船舶吃水满足富余水深通过所经航区。",
            "ID": "18",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 3,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥前，提醒船方加强对主副机的检查。",
            "ID": "19",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "拖轮、护航艇各一艘桥区护航。",
            "ID": "41",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 41,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "龙爪岩以下航道维护水深10.5m（理论深度基准面），经过此航段时必须乘潮留足富裕水深通过。",
            "ID": "22",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 22,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "引航员在实施引航前，必须认真研究海图，并依据最新海图的实际水深，在规定的通航分道内选择航路，避开浅点，确保引航安全；",
            "ID": "23",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 23,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "加强与上海港引航站的联系，提前了解该船的操纵性能和船况，并与上海港引航站协调，保证该船在吴淞高潮后半小时内实施交接；",
            "ID": "24",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 24,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥时加派一艘大马力拖轮护航，",
            "ID": "25",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 25,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "引航站指派适任引航员带队引领。",
            "ID": "39",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "船舶代理应根据航行计划，提前向海事部门申请、落实条件较好的锚地及锚位。",
            "ID": "27",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 27,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "出厂开航时安排一艘大马力拖轮从厂区护航过桥区。",
            "ID": "29",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 29,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "码头方提前清理泊位，两条大马力拖轮协助靠离泊。代理提前落实好备用锚地。",
            "ID": "43",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 43,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化，能见度和风力达不到要求暂缓开航或者择地抛锚。",
            "ID": "4",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 2,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇护航",
            "ID": "33",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇、拖轮各一艘伴航。",
            "ID": "34",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇全程、拖轮桥区各一艘护航。",
            "ID": "35",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各一艘全程护航。",
            "ID": "36",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "护航艇、拖轮各一艘全程加一艘拖轮桥区护航。",
            "ID": "37",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各两艘全程护航。",
            "ID": "38",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 15,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "进出福姜沙水道申请海事部门进行交通组织，加派一条拖轮护航。",
            "ID": "47",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 47,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "遵守福南水道航行及靠离泊管理规定，申请护航艇、拖轮各一艘护航。",
            "ID": "48",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 48,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": " 选择合适的潮水进港靠泊作业。",
            "ID": "49",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 49,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实老旧船舶安全措施，提醒船方加强对主副机的检查，全程备锚了头航行。",
            "ID": "21",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 5,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "按照主管机关要求，执行相应的安全措施。",
            "ID": "50",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 50,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化。",
            "ID": "51",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 51,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "严格遵守定线制和夜航管理规定。",
            "ID": "52",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 52,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "主副班密切配合，相互提醒。",
            "ID": "53",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 53,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "调度加强船舶监控。",
            "ID": "54",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 54,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化，能见度和风力达不到要求暂缓开航或者择地抛锚。",
            "ID": "148",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 3,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "落实夜航的引领安全措施；加强了望、使用安全航速、全程备锚。",
            "ID": "102",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 6,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化，能见度和风力达不到要求暂缓开航或者择地抛锚。",
            "ID": "103",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 2,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格执行洪水期的安全措施，注意流压、航道水深变化。",
            "ID": "104",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 4,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "十点多",
            "ID": "65bd4c28fb8f4e0eb3a8b933a877b720",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 23,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意航道水深变化，乘潮留足富裕水深，确保安全。",
            "ID": "105",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格按照定线制、苏通大桥及上海港口相关规定。",
            "ID": "101",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 1,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "加强船位监控，同意。",
            "ID": "106",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实各项安全措施，同意。",
            "ID": "107",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 21,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意拖轮工况，做好应急准备，确保安全。",
            "ID": "108",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，选择高平潮通过福姜沙南水道，谨慎操作，确保安全。",
            "ID": "109",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 16,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "属于报备。",
            "ID": "110",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 18,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "无需申报。",
            "ID": "111",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "注意收听天气状况，密切关注风力。风力不超过5级安排进出江。",
            "ID": "112",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实维护措施，留足富余水深过浅区。",
            "ID": "113",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "同意。",
            "ID": "114",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 19,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格执行拖轮使用规定，靠离泊时申请拖轮协助。",
            "ID": "115",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 7,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "进出锚地时申请拖轮协助。",
            "ID": "116",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 8,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇一艘全程护航；",
            "ID": "117",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真计算潮高，根据设标水深和船舶吃水满足富余水深通过所经航区。",
            "ID": "118",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 3,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥前，提醒船方加强对主副机的检查。",
            "ID": "119",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实老旧船舶安全措施，提醒船方加强对主副机的检查，全程备锚了头航行。",
            "ID": "120",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 5,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "龙爪岩以下航道维护水深10.5m（理论深度基准面），经过此航段时必须乘潮留足富裕水深通过。",
            "ID": "121",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 22,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "引航员在实施引航前，必须认真研究海图，并依据最新海图的实际水深，在规定的通航分道内选择航路，避开浅点，确保引航安全；",
            "ID": "122",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 23,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "加强与上海港引航站的联系，提前了解该船的操纵性能和船况，并与上海港引航站协调，保证该船在吴淞高潮后半小时内实施交接；",
            "ID": "123",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 24,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥时加派一艘大马力拖轮护航，",
            "ID": "124",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 25,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "船舶代理应根据航行计划，提前向海事部门申请、落实条件较好的锚地及锚位。",
            "ID": "125",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 27,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "出厂开航时安排一艘大马力拖轮从厂区护航过桥区。",
            "ID": "126",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 29,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇护航",
            "ID": "127",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇、拖轮各一艘伴航。",
            "ID": "128",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇全程、拖轮桥区各一艘护航。",
            "ID": "129",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各一艘全程护航。",
            "ID": "130",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "护航艇、拖轮各一艘全程加一艘拖轮桥区护航。",
            "ID": "131",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各两艘全程护航。",
            "ID": "132",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 15,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "引航站指派适任引航员带队引领。",
            "ID": "133",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "拖轮、护航艇各一艘桥区护航。",
            "ID": "134",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 41,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "拖轮一艘长江1号浮至码头、护航艇一艘桥区护航。",
            "ID": "135",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 42,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "码头方提前清理泊位，两条大马力拖轮协助靠离泊。代理提前落实好备用锚地。",
            "ID": "136",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 43,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "进出福姜沙水道申请海事部门进行交通组织，加派一条拖轮护航。",
            "ID": "137",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 47,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "遵守福南水道航行及靠离泊管理规定，申请护航艇、拖轮各一艘护航。",
            "ID": "138",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 48,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": " 选择合适的潮水进港靠泊作业。",
            "ID": "139",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 49,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "按照主管机关要求，执行相应的安全措施。",
            "ID": "140",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 50,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化。",
            "ID": "141",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 51,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格遵守定线制和夜航管理规定。",
            "ID": "142",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 52,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "主副班密切配合，相互提醒。",
            "ID": "143",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 53,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "调度加强船舶监控。",
            "ID": "144",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 54,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "请船方或代理提供主管机关书面审批材料。",
            "ID": "145",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 20,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "督促代理、码头方提前清理进出港航道。",
            "ID": "146",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 56,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "护航艇一艘，拖轮两条全程护航。",
            "ID": "147",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 57,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "测试测试测试测试赛测试1111113人发放",
            "ID": "01ba2d9e4f7d404fb65335afb59ee263",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 44,
            "TYPE": "机关科室",
            "YHZ": null
        }
    ];
});
$controllers
    .controller('xiaoxi', function($rootScope, $scope, $ionicModal, $http, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
        $ionicModal.fromTemplateUrl('tpls/xiaoxi-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.xiaoxiDetail = modal;
        });

        $scope.showDetail = function(item) {
            $scope.itemDetail = item;
            $scope.xiaoxiDetail.show();
            if(!item.isread){
                $http({
                    method: "GET",
                    url: "/mobileoa/yhapi/message/setread",
                    params: { mesid: item.id ,targetid:$rootScope.loginBody.loginUserId}
                }).success(function(res) {
    
                });
            }

        };
        var pagenum = 0,
            count = 15;
        $scope.items = [];
        $scope.noMore = true;
        $scope.loadData = function(isRefresh) {


            if (isRefresh) {
                pagenum = 1;
            } else {
                ++pagenum;
            }
            $http({
                method: "GET",
                url: "/mobileoa/japi/message/queryByTarget",
                params: {
                    targetid: $rootScope.loginBody.loginUserId,
                    pagenum: pagenum,
                    count: count
                }
            }).success(function(res) {
                if (isRefresh) {
                    $scope.items = res;
                } else {
                    $scope.items = $scope.items.concat(res);
                }
                if (res.length > 0) {
                    $scope.noMore = true;
                } else {
                    $scope.noMore = false;
                }

                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

    });
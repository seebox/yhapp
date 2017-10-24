$controllers

    .controller('AppCtrl', function($rootScope, $scope, $http, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $state) {


    if (window.localStorage.loginBody) {
        $rootScope.loginBody = JSON.parse(window.localStorage.loginBody);
    } else {
        $state.go('login');
    }
    $rootScope.gologin = function() {
        $state.go('login');
    }

});
$controllers.controller('MainCtrl', function($rootScope, $scope, $stateParams, $ionicSideMenuDelegate) {
    $rootScope.issync = false;
    $rootScope.isOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
    };
    $scope.positive = false;
    $scope.role = true;
    $scope.colors = ['positive', 'calm', 'balanced', 'energized', 'assertive', 'royal'];
    $scope.colors = $scope.colors.concat($scope.colors);
    $scope.colors = $scope.colors.concat($scope.colors);
    $scope.playlists = [{
        name: "引航计划",
        url: "app/jihua"
    }, {
        name: "航次汇报",
        url: "app/huibao"
    }, {
        name: "引航计划审批",
        url: "app/shenpi"
    }, {
        name: "特种夜航船审批",
        url: "app/tezhong"
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
                    alert(err);
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
                    mode: 'datetime'
                };

                function onSuccess(date) {
                    $scope.$apply(function() {
                        $scope.ngModel = moment(date).format('YYYY-MM-DD hh:mm:ss');
                    })

                }

                function onError(error) { // Android only
                    if (error == 'cancel') {
                        $scope.$apply(function() {
                            $scope.ngModel = '';
                        })
                    } else {
                        alert('Error: ' + error);
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

    $scope.loginData = {};

    //yhyd / 123456

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
$controllers

    .controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $http) {
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
    ///pilotserver/pilotplan / getlist ? type = yhyqsj & str = { "spr": "aa", "dw": "南通站", "yhyid": "" }
    //spr: 审批人 dw: 单位 yhyid: 引航员id

    $http({
        method: "POST",
        url: "pilotserver/pilotplan/getlist",
        params: {
            type: 'yhyqsj',
            str: JSON.stringify({ "dw": $rootScope.loginBody.dept.deptName, "yhyid": $rootScope.loginBody.userPersonId })
        }
    }).success(function(res) {
        $scope.items = res.result;
    });
}).filter(
    'dateqingjia', [function() {
        return function(text) {
            if (!text || text.length === 0) {
                return "";
            } else {
                return moment(text).format('YYYY-MM-DD');
            }

        }
    }]
);;
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

        $http({
            method: "POST",
            url: '/pilotserver/pilotplan/getlist?type=yhyqsj&str={"yhyids":"' + item.SDYHY.replace(/\|/g, ',') + '"}',
            //params: params
        }).success(function(res) {

        });
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
            url: '/pilotserver/pilotplan/getlist?type=yhjh&str={"app":"0","shzt":"0",yhz":"' + $rootScope.loginBody.dept.deptName + '"}',
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
            var params = { str: { type: "6", "partflag": "0", "shr": $rootScope.loginBody.userPersonId, ids: ids } };
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/updateplanstatus",
                params: params
            }).success(function(res) {
                $scope.delShow = false;
                //loadData();
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
        });
    };

    $ionicModal.fromTemplateUrl('anquan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.anquanModal = modal;
    });

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
                YHZAQCS: "1",
                AJBYJ: $scope.yj,
                LDYJ: "3"
            }
        }).success(function(res) {

        });
        $ionicLoading.show({ template: '审核已完成' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    }
    $scope.yj = "";
    $scope.baopi = function(tzcbDetail) {
        $http({
            method: "GET",
            url: "/WebapiService/SpFun",
            params: {
                yeOrTe: 1,
                Sqid: tzcbDetail.ID,
                nextSpDetailsId: details[1].ID,
                IsFinish: $scope.IsFinish,
                currUserId: $rootScope.loginBody.loginUserId,
                YHZAQCS: "1",
                AJBYJ: $scope.yj,
                LDYJ: "3"
            }
        }).success(function(res) {

        });

        $ionicLoading.show({ template: '已转到安技部审批' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000)
    }

    $http.get('/WebapiService/GetTzcbInfo').success(function(response) {
        $scope.Tzcb = response;
    });
    $http.get('/WebapiService/GetYhcbInfo').success(function(response) {
        $scope.Yhcb = response;
    });
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
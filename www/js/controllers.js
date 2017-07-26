$controllers

    .controller('AppCtrl', function($rootScope, $scope, $http, $ionicModal, $timeout, $ionicLoading, $ionicPopup) {

    $scope.loginData = {};
    $ionicModal.fromTemplateUrl('tpls/login.html', {
        scope: $scope
    }).then(function(modal) {
        $rootScope.loginModal = modal;
    });

    $scope.closeLogin = function() {
        $rootScope.loginModal.hide();
    };

    $scope.login = function() {
        $rootScope.loginModal.show();
    };
    $scope.userName = "李某";
    $scope.userTitle = "引航中心引航员";
    //yhyd / 123456

    if (window.localStorage.loginBody) {
        $rootScope.loginBody = JSON.parse(window.localStorage.loginBody);
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
        var form = ['username=' + $scope.loginData.username, 'aesPassword=' + Encrypt($scope.loginData.password), 'appId=' + appId, 'nonce_str=' + nonce_str];

        var sign = md5(form.sort().join("&") + '&key=' + appKey).toUpperCase();
        $ionicLoading.show({ template: '正在登录' });

        $http.post('/cjpilot/api/user/login.jspx?' + form.join("&") + '&sign=' + sign).success(function(res) {
            if (res.status == "true") {
                window.localStorage.session = ['username=' + $scope.loginData.username, 'sessionKey=' + res.body.sessionKey, 'appId=' + appId, 'nonce_str=' + nonce_str, 'sign=' + sign];
                window.localStorage.loginBody = JSON.stringify(res.body);
                $rootScope.loginBody = res.body;
                $rootScope.loginModal.hide();
                $ionicLoading.show({ template: '登录成功' });
                $timeout(function() {
                    $ionicLoading.hide();
                }, 1000);
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({ template: res.message });
            };
        });


    };

    $rootScope.isOpen = function() {
        return $ionicSideMenuDelegate.isOpen();
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
        name: "我的航次汇报",
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
        name: "航行公告信息",
        url: "app/faguilists/HXGG"
    }, {
        name: "潮汐信息",
        url: "app/chaoxi"
    }, {
        name: "规章制度",
        url: "app/faguilists/GZZD"
    }, {
        name: "安全预警消息",
        url: "app/xiaoxi/ANQUAN"
    }, {
        name: "消息中心",
        url: "app/xiaoxi/CENTER"
    }, {
        name: "出航津贴查询",
        url: "app/butie"
    }, {
        name: "技术交流",
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
        name: "引航签证单",
        url: "app/playlists"
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
        for (var i = 0; i < 12; i++) {
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
                params: { pilotDate: date, yhyid: $rootScope.loginBody.loginUserId }
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
                $scope.jihuaList = res.result;
                $ionicLoading.hide();
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
    .controller('faguilists', function($scope, $http, $ionicModal, $ionicLoading, $stateParams) {
        if ($stateParams.flag == 'GZZD') {
            $scope.types = [
                { k: 'RSGL', v: '人事管理' },
                { k: 'XZGL', v: '行政管理' },
                { k: 'DQGL', v: '党群管理' },
                { k: 'CWGL', v: '财务管理' },
                { k: 'AQGL', v: '安全管理' },
                { k: 'SCDD', v: '生产调度' }
            ];
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
                if (response.body.content) {
                    if (isRefresh) {
                        $scope.items = response.body.content.list;
                    } else {
                        $scope.items = $scope.items.concat(response.body.content.list);
                    }
                }
                if (response.body.content.list.length > 0) {
                    $scope.noMore = true;
                } else {
                    $scope.noMore = false;
                }
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $scope.showDetail = function(id) {
            $http.get('/cjpilot/yhapi/content.jspx?type=1&parent=GZZD&contentId=' + id).success(function(response) {
                $scope.detail = response.body.content;
                $scope.modalHangxin.show();
            });
        };



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
    .controller('huibao', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $http) {

        $ionicModal.fromTemplateUrl('tpls/huibao-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHuibao = modal;
        });

        $scope.showDetail = function(item) {
            $scope.huibaoItem = item;
            $scope.modalHuibao.show();
        };
        $scope.huibaolist = [];

        $http.get('/cjpilot/yhapi/hchb.jspx?type=0').success(function(res) {
            $scope.huibaolist = res.body.result.list;
        });


    });
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

        $scope.devList = [
            { id: "133", text: "安技部", checked: false },
            { id: "234", text: "办公室", checked: true }
        ];

        $scope.changedOrg = function() {
            $scope.usersModal.hide();
            console.log($scope.devList);
        }
        $scope.selectOrg = function(item) {
            item.checked = !item.checked;
        }
        $scope.rep = {
            title: "",
            reply: ""
        }
        $scope.reply = "";
        $scope.comment = "";

        $scope.changeTab = function(i) {
            $scope.index = i;
            loadData();
        }
        $scope.index = 0;
        var listUri = [
            "/mobileoa/japi/discuss/listNotBelongOrg", //不可回答
            "/mobileoa/japi/discuss/listBelongOrg", //可回答
            "/mobileoa/japi/discuss/myList" //我提问的
        ]

        function loadData() {
            $http.get(listUri[$scope.index] + '?orgId=123&userid=11').success(function(res) {
                $scope.items = res;
            });
        }
        loadData();


        $scope.tiwen = function() {
            var invites = [];
            for (var i in $scope.devList) {
                if ($scope.devList[i].checked) {
                    invites.push($scope.devList[i].id);
                }
            }
            if ($scope.rep.reply.replace(/\s/, '').length > 0 && invites.length > 0) {
                $http.post('/mobileoa/japi/discuss/add?userid=11', {
                    title: $scope.rep.reply,
                    invitedOrgs: invites.join(",")
                }).success(function(res) {
                    loadData();
                    $scope.jiaoliuModal.hide();
                });
            }

        };

        $scope.delDiscuss = function(item) {
            $http.get('/mobileoa/japi/discuss/delete/' + item.id).success(function(res) {
                loadData();
            });
        }

    })
    .controller('jiaoliuDetail', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $http, $stateParams) {

        $scope.answer = function() {
            $scope.answerShow = true;
        }

        $http.get('/mobileoa/japi/discuss/get/' + $stateParams.id).success(function(res) {
            $scope.detail = res;
        });
        $scope.replay = "";
        $scope.submit = function() {
            if ($scope.replay.replace(/\s/, '').length > 0) {
                $http.post('/mobileoa/japi/discuss/answer?bizid=' + $stateParams.id + '&userid=11', { answerContent: $scope.replay }).success(function(res) {
                    $scope.detail = res;
                    $scope.answerShow = !$scope.answerShow;
                    $scope.replay = "";
                });
            }
        };

        $scope.comment = "";
        $scope.comm = function() {

            if ($scope.comment.replace(/\s/, '').length > 0) {
                $http.post('/mobileoa/japi/discuss/comment?bizid=' + $stateParams.id + '&userid=11', { commentContent: $scope.comment }).success(function(res) {
                    $scope.detail = res;
                    $scope.comment = "";
                });
            }
        }

        $scope.delAnswer = function(answer) {

            $http.get('/mobileoa/japi/discuss/answer/delete/' + answer.id).success(function(res) {
                $http.get('/mobileoa/japi/discuss/get/' + $stateParams.id).success(function(res) {
                    $scope.detail = res;
                });
            });
        }

        $scope.delComment = function(comm) {

            $http.get('/mobileoa/japi/discuss/comment/delete/' + comm.id).success(function(res) {
                $http.get('/mobileoa/japi/discuss/get/' + $stateParams.id).success(function(res) {
                    $scope.detail = res;
                });
            });
        }

    });
$controllers
    .controller('jihua', function($rootScope, $scope, $ionicModal, $timeout, $http, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {

        $ionicModal.fromTemplateUrl('tpls/jihua-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.jihuaDetail = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/jihua-ren.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalRen = modal;
        });
        $ionicModal.fromTemplateUrl('tpls/boat-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.boatDetail = modal;
        });

        $ionicModal.fromTemplateUrl('piban-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalPeiban = modal;
        });

        $ionicModal.fromTemplateUrl('tpls/huibao-form.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalHuibao = modal;
        });


        $ionicModal.fromTemplateUrl('tpls/playlist.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.playModal = modal;
        });


        $scope.showDetail = function(item) {
            $scope.jihuaItem = item;
            $scope.jihuaDetail.show();
        };
        $scope.openHuibao = function() {
            $scope.modalHuibao.show();
        };
        $scope.huibaoForm = {};

        $scope.doHuibao = function() {
            $scope.huibaoForm.cbbh = $scope.jihuaItem.CBBH;
            $scope.huibaoForm.yhy = $rootScope.loginBody.loginUserId;
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
                data: $scope.huibaoForm
            }).success(function(res) {

            });

        };

        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: { type: "yhz" }
        }).success(function(res) {
            $scope.yhzList = res.result;
        });


        function loadData(str) {
            $ionicLoading.show({ template: "正在加载数据,请耐心等待..." });
            var params = { type: "yhjh", jhzt: "4" };
            if (str) {
                params.str = JSON.stringify(str);
            }
            $http({
                method: "POST",
                url: "/pilotserver/pilotplan/getlist",
                params: params
            }).success(function(res) {
                $scope.jihuaList = res.result.plan;
                $ionicLoading.hide();
            });
        }
        loadData();
        $scope.search = function() {
            var str = {};
            if ($scope.sqlx) {
                str.sqlx = $scope.sqlx;
            }
            if ($scope.cbhx) {
                str.cbhx = $scope.cbhx;
            }
            if ($scope.yinhangzhan) {
                str.station_id = $scope.yinhangzhan;
            }
            loadData(str);
            $scope.menuShow = false;
        };

        $scope.play = function() {
            $scope.playModal.show();
        };

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

        $scope.save = function() {
            $ionicGoBack();
        };
        $scope.submit = function() {
            $.scope.$ionicGoBack();
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

    .controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
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

    $scope.showDetail = function() {
        $scope.qingjiaDetail.show();
    }
});
$controllers

    .controller('shenpi', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
    $ionicModal.fromTemplateUrl('tpls/shenpi-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.shenpiDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.shenpiDetail.show();
    };

    $scope.yijian = "";
    $scope.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.submit = function() {
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

                        $scope.items = [10, 11, 12, 13, 14, 15, 16, 17];



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


    .controller('tezhong', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate) {
    $ionicModal.fromTemplateUrl('tpls/tezhong-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.tezhongDetail = modal;
    });

    $scope.showDetail = function(item) {
        $scope.tezhongDetail.show();
    };

    $ionicModal.fromTemplateUrl('anquan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.anquanModal = modal;
    });

    $scope.baobei = function() {
        $ionicLoading.show({ template: '审核已完成' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    }
    $scope.baopi = function() {
        $ionicLoading.show({ template: '已转到安技部审批' });
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000)
    }
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
            $scope.xiaoxiDetail.show();
        };

        $http({
            method: "GET",
            url: "/mobileoa/japi/message/queryByTarget",
            params: { targetid: $rootScope.loginBody.loginUserId }
        }).success(function(res) {

        });

    });
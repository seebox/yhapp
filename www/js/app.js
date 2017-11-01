// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'services'])

.run(function($rootScope, $ionicPlatform, $ionicPopup, $timeout, $state, $checkUpdate) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $checkUpdate.check();

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#444');
        }
        if (window.plugins && window.plugins.jPushPlugin) {
            window.plugins.jPushPlugin.init();
            if (window.localStorage.loginBody) {
                window.plugins.jPushPlugin.getRegistrationID(function(rId) {
                    $rootScope.registionId = rId;
                    $http.get('/mobileoa/yhapi/message/regist?registionId=' + rId + '&userid=' + $rootScope.loginBody.loginUserId).success(function(response) {});
                })
                window.plugins.jPushPlugin.setTagsWithAlias([], $rootScope.loginBody.loginUserId);
            }
            document.addEventListener("jpush.openNotification", function(event) {
                onNotification(event);
                $state.go("app.xiaoxi");
            }, false);
            document.addEventListener("jpush.receiveNotification", function(event) {
                onNotification(event);
            }, false);

            function onNotification(event) {
                try {
                    var alertId, alertContent, dateTime;
                    if (device.platform == "Android") {
                        alertContent = event.alert;
                        alertId = event.extras["cn.jpush.android.MSG_ID"]
                    } else {
                        alertContent = event.aps.alert;
                        alertId = event["_j_msgid"]
                    }
                    dateTime = moment().format("YYYY-MM-DD HH:mm");

                } catch (exception) {
                    alert("jpush error");
                }
            }
        }

        //延迟设置isVisible为false，防止第三方输入法返回退出当前页面  
        window.addEventListener('native.keyboardhide', function(e) {
            cordova.plugins.Keyboard.isVisible = true;
            $timeout(function() {
                cordova.plugins.Keyboard.isVisible = false;
            }, 100);
        });

        //主页面显示退出提示框  
        $ionicPlatform.registerBackButtonAction(function(e) {
            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    }
                });
            }
            if (cordova.plugins.Keyboard.isVisible) {
                cordova.plugins.Keyboard.close();
            } else {
                if ($state.current.name == 'app.main') {
                    showConfirm();
                } else {
                    $rootScope.$ionicGoBack();
                }
            }
            return false;
        }, 101);

        $rootScope.showAlert = function(tpl) {
            var confirmPopup = $ionicPopup.alert({
                title: '<strong>系统提示</strong>',
                template: '当前登录超时，或在其他终端登录',
                okText: '重新登录'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $rootScope.loginModal.show();
                }
            });
        };

    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('standard');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'tpls/app.html',
                controller: 'AppCtrl'
            })
            .state('app.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/main.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('app.jihua', {
                url: '/jihua',
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/jihua.html',
                        controller: 'jihua'
                    }
                }

            })
            .state('app.shenpi', {
                url: '/shenpi',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/shenpi.html',
                        controller: 'shenpi'
                    }
                }

            })
            .state('app.huibao', {
                url: '/huibao',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/huibao.html',
                        controller: 'huibao'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.single', {
                url: '/playlists/:playlistId',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.uploaded', {
                url: '/uploaded/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/uploaded.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.qingjia', {
                url: '/qingjia',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/qingjia.html',
                        controller: 'qingjia'
                    }
                }
            })
            .state('app.qingjia-detail', {
                url: '/qingjia/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/qingjia-detail.html',
                        controller: 'qingjia'
                    }
                }
            })
            .state('app.tezhong', {
                url: '/tezhong',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/tezhong.html',
                        controller: 'tezhong'
                    }
                }
            })
            .state('app.faguilists', {
                url: '/faguilists/:flag',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/faguilists.html',
                        controller: 'faguilists'
                    }
                }
            })
            .state('app.chaoxi', {
                url: '/chaoxi',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/chaoxi.html',
                        controller: 'chaoxi'
                    }
                }
            })
            .state('app.xiaoxi', {
                url: '/xiaoxi/:flag',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/xiaoxi.html',
                        controller: 'xiaoxi'
                    }
                }
            })
            .state('app.butie', {
                url: '/butie',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/butie.html',
                        controller: 'butie'
                    }
                }
            })
            .state('app.jiaoliu', {
                url: '/jiaoliu',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/jiaoliu.html',
                        controller: 'jiaoliu'
                    }
                }
            })
            .state('app.jiaoliu-detail', {
                url: '/jiaoliu/:id/:index',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/jiaoliu-detail.html',
                        controller: 'jiaoliuDetail'
                    }
                }
            }).state('app.bowei', {
                url: '/bowei',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'tpls/bowei.html',
                        controller: 'bowei'
                    }
                }
            }).state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'tpls/login.html',
                controller: 'login'

            });

        $urlRouterProvider.otherwise('/app/main');

    })
    .config(['$httpProvider', function($httpProvider) {
        function authInterceptor($location, $injector, $q, $rootScope) {
            var interceptor = {
                'request': function(config) {
                    config.params = config.params || {};
                    if (config.url.indexOf('.html') == -1 && config.url.indexOf('login.jspx') == -1 && config.url.indexOf('getDepartment.jspx') == -1) {
                        config.params.appId = SYSTEM.appId;
                        var sessionKey = window.localStorage.loginBody || {};

                        if (window.localStorage.loginBody) {
                            config.params.sessionKey = JSON.parse(window.localStorage.loginBody).sessionKey;
                            config.params.username = JSON.parse(window.localStorage.loginBody).loginUserName;
                        }
                    }
                    if (config.url.indexOf('.html') == -1) {
                        if (window.cordova && window.location.hostname.length === 0) {
                            config.url = SYSTEM.host + config.url;
                        }
                    }
                    return config;
                },
                'response': function(response) {
                    if (response.data.status == 'false' || response.data.message == 'no login') {
                        $rootScope.gologin();
                    }
                    return response;
                },
                'responseError': function(response) {
                    if (response.status == -1) {
                        //alert('当前网络存在异常！');
                    }
                    return $q.reject(response);
                }
            };
            return interceptor;
        }
        authInterceptor.$inject = ['$location', '$injector', '$q', '$rootScope'];
        $httpProvider.interceptors.push(authInterceptor);

    }]);

var $controllers = angular.module('starter.controllers', []);
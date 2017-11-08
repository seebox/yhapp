(function() {

    angular.module('services', [
        'services.checkUpdate'
    ]);

    angular.module('services.checkUpdate', [])

    .factory('$checkUpdate', ['$rootScope', '$http', '$cordovaAppVersion', '$ionicPopup', '$cordovaFileTransfer', '$cordovaFileOpener2', '$ionicLoading',
        function($rootScope, $http, $cordovaAppVersion, $ionicPopup, $cordovaFileTransfer, $cordovaFileOpener2, $ionicLoading) {
            // 显示是否更新对话框
            function showUpdateConfirm(ver) {
                var confirmPopup = $ionicPopup.alert({
                    title: '版本升级',
                    template: '系统有新的版本，请升级到最新版', //从服务端获取更新的内容
                    okText: '升级'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $ionicLoading.show({
                            template: "正在下载中..."
                        });
                        var url = SYSTEM.host + "/apk/yhapp" + ver + ".apk"; //可以从服务端获取更新APP的路径
                        var targetPath = (device.platform == "Android" ? cordova.file.externalDataDirectory : cordova.file.documentsDirectory) + "gangkou.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                        var trustHosts = true
                        var options = {};
                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function(result) {
                            $ionicLoading.hide();
                            // 打开下载下来的APP
                            $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive').then(function() {
                                // 成功
                            }, function(err) {
                                // 错误
                            });

                        }, function(err) {
                            alert('下载失败');
                            $ionicLoading.hide();
                        }, function(progress) {
                            //进度，这里使用文字显示下载百分比
                        });
                    } else {
                        // 取消更新
                    }
                });
            }
            return {
                go: function() {
                    $http.get("/apk/version.txt?timestamp=" + (new Date()).getTime()).success(function(data) {
                        var serverAppVersion = data.version; //从服务端获取最新版本                      
                        $cordovaAppVersion.getVersionNumber().then(function(version) {
                            if (version != serverAppVersion) {
                                showUpdateConfirm(serverAppVersion);
                            } else {
                                $ionicPopup.alert({
                                    title: '<strong>系统提示</strong>',
                                    template: '您的系统已经是最新版本',
                                    okText: '确定'
                                });
                            }
                        });
                    }).error(function(data, status) {
                        //alert('版本号获取失败');
                    });
                },
                check: function() {
                    $http.get("/apk/version.txt?timestamp=" + (new Date()).getTime()).success(function(data) {
                        var serverAppVersion = data.version; //从服务端获取最新版本                   
                        $cordovaAppVersion.getVersionNumber().then(function(version) {
                            if (version != serverAppVersion) {
                                showUpdateConfirm(serverAppVersion);
                            }
                            $rootScope.version = version;
                        });
                    }).error(function(data, status) {
                        //alert('版本号获取失败');
                    });
                }
            };

        }
    ]);


})();
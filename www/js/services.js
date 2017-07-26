(function() {

    angular.module('services', [
        'services.file',
        'services.upload',
        'services.checkUpdate'
    ]);
    angular.module('services.file', [])

    .factory('$file', ['$q', '$cordovaFileTransfer', '$timeout', '$rootScope', function($q, $cordovaFileTransfer, $timeout, $rootScope) {

        var service = {};

        function filego(file) {
            var deferred = $q.defer();
            var url = config.host + config.serveAddress + '/adjunct/download?fileId=' + file.ID + '&token=' + window.localStorage.token;
            var targetPath = device.platform == "Android" ? cordova.file.externalDataDirectory + file.FILE_NAME : cordova.file.documentsDirectory + encodeURI(file.FILE_NAME);
            var trustHosts = true;
            var options = {};

            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function(result) {
                deferred.resolve({ FILE_NAME: file.FILE_NAME, targetPath: targetPath });
            }, function(err) {
                alert(JSON.stringify(err));
                deferred.reject();
            }, function(progress) {
                $timeout(function() {
                    $rootScope.downloadProgress = (progress.loaded / progress.total) * 100;
                });
            });

            return deferred.promise;
        }
        service.falv = function(fileist, callback) {
            var ret = [];
            for (var i = 0; i < fileist.length; i++) {
                ret[i] = filego(fileist[i]);
            }
            return $q.all(ret);
        }

        return service;
    }]);
    angular.module('services.upload', [])

    .factory('$upload', ['$q', '$cordovaFileTransfer', function($q, $cordovaFileTransfer) {

        var service = {};

        function filego(bizId, bizType, imageURI) {
            var deferred = $q.defer();
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var params = {};
            params.bizId = bizId;
            params.bizType = bizType;
            params.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.params = params;
            var ft = new FileTransfer();
            $cordovaFileTransfer.upload(encodeURI(config.host + config.serveAddress + '/adjunct/upload?token=' + window.localStorage.token), imageURI, options)
                .then(function(result) {
                    deferred.resolve();
                }, function(err) {
                    deferred.reject();
                });
            return deferred.promise;
        }
        service.yinhuan = function(uuid, images, callback, onError) {
            var ret = [];

            for (var i = 0; i < images.length; i++) {
                ret[i] = filego(uuid, "aqHiddenRecordBizFile", images[i]);
            }
            $q.all(ret).then(function(result) {
                callback();
            }, function() {
                onError();
            });
        }

        service.fczp = function(uuid, images, callback) {
            var ret = [];
            for (var i = 0; i < images.length; i++) {
                ret[i] = filego(uuid, "aqHiddenRecordZgfcBizFile", images[i]);
            }
            $q.all(ret).then(function(result) {
                callback();
            });
        }

        return service;
    }]);


    angular.module('services.checkUpdate', [])

    .factory('$checkUpdate', ['$rootScope', '$http', '$cordovaAppVersion', '$ionicPopup', '$cordovaFileTransfer', '$cordovaFileOpener2', '$ionicLoading',
        function($rootScope, $http, $cordovaAppVersion, $ionicPopup, $cordovaFileTransfer, $cordovaFileOpener2, $ionicLoading) {
            // 显示是否更新对话框
            function showUpdateConfirm() {
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
                        var url = config.host + "/android-debug.apk"; //可以从服务端获取更新APP的路径
                        var targetPath = (device.platform == "Android" ? cordova.file.externalDataDirectory : cordova.file.documentsDirectory) + "gangkou.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                        var trustHosts = true
                        var options = {};
                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function(result) {
                            // 打开下载下来的APP
                            $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive').then(function() {
                                // 成功
                            }, function(err) {
                                // 错误
                            });
                            $ionicLoading.hide();
                        }, function(err) {
                            $ionicLoading.hide();
                            alert('下载失败');
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
                    $http.get("/version.txt?timestamp=" + (new Date()).getTime()).success(function(data) {
                        var serverAppVersion = data.version; //从服务端获取最新版本                      
                        $cordovaAppVersion.getVersionNumber().then(function(version) {
                            if (version != serverAppVersion) {
                                showUpdateConfirm();
                            } else {
                                $ionicPopup.alert({
                                    title: '<strong>系统提示</strong>',
                                    template: '您的系统已经是最新版本',
                                    okText: '确定'
                                });
                            }
                        });
                    }).error(function(data, status) {
                        alert(status);
                    });
                },
                check: function() {
                    $http.get("/version.txt?timestamp=" + (new Date()).getTime()).success(function(data) {
                        var serverAppVersion = data.version; //从服务端获取最新版本                   
                        $cordovaAppVersion.getVersionNumber().then(function(version) {
                            if (version != serverAppVersion) {
                                showUpdateConfirm();
                            }
                            $rootScope.version = version;
                        });
                    })
                }
            };

        }
    ]);


})();
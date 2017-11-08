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
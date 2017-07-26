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
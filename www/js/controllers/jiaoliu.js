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
            console.log($scope.deptList);
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
            loadData();
        };
        $scope.index = 0;
        var listUri = [
            "/mobileoa/japi/discuss/listNotBelongOrg", //不可回答
            "/mobileoa/japi/discuss/listBelongOrg", //可回答
            "/mobileoa/japi/discuss/myList" //我提问的
        ];
        console.log($rootScope);

        function loadData() {
            $http.get(listUri[$scope.index] + '?orgId=' + $rootScope.loginBody.dept.deptId + "&userid=" + $rootScope.loginBody.loginUserId).success(function(res) {
                $scope.items = res;
            });
        }
        loadData();


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
                    loadData();
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
                loadData();
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
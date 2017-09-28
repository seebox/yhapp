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
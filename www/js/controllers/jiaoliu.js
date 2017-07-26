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
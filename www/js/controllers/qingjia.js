$controllers.controller('qingjia', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $http) {

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
        if (item.COMMENTS) {
            item.COMMENTS = item.COMMENTS.split("き");
            for (var i in item.COMMENTS) {
                item.COMMENTS[i] = item.COMMENTS[i].split("キ");
            }
        }

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
    $scope.changeTab = function(i) {
        $scope.index = i;
        if (i == 0) {
            $scope.loadData(i);
        } else {
            $scope.loadData(i);
        }

    };
    $scope.loadData = function(index) { 
        var str = JSON.stringify({ "dw": $rootScope.loginBody.dept.deptName, "yhyid": $rootScope.loginBody.userPersonId });
        var currentstep = "1";
        if (index == 1) {
            if ($rootScope.loginBody.dept.deptName.indexOf("总调室") > -1) {
                currentstep = "2";
            } else if ($rootScope.loginBody.dept.deptName.indexOf("中心领导") > -1) {
                currentstep = "3";
            }
            str = JSON.stringify({ "currentstep": currentstep, "dw": $rootScope.loginBody.dept.deptName, "spr": $rootScope.loginBody.userPersonId, "isend": "1" });
        }
        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/getlist",
            params: {
                type: 'yhyqsj',
                str: str
            }
        }).success(function(res) {
            $scope.items = res.result;
        });
    }
    $scope.loadData();

    $scope.doShenpi = function(item) {
        var processname = "引航站意见";
        if ($rootScope.loginBody.dept.deptName.indexOf("总调室") > -1) {
            processname = "总调室意见";
        } else if ($rootScope.loginBody.dept.deptName.indexOf("中心领导") > -1) {
            processname = "领导意见";
        }
        $http({
            method: "POST",
            url: "/pilotserver/pilotplan/saveoffwork",
            params: {
                str: JSON.stringify({
                    "applicant": item.APPLICANT,
                    "bz": item.BZ,
                    "comments": item.yijian,
                    "currentstep": item.CURRENTSTEP,
                    "dqrq": item.DQRQ,
                    "id": item.DQRQ,
                    "isend": item.ISEND,
                    "jssj1": item.JSSJ1,
                    "jssj2": item.JSSJ2,
                    "kssj1": item.KSSJ1,
                    "kssj2": item.KSSJ2,
                    "processid": UUID.genV1().hexNoDelim,
                    "processname": processname,
                    "qjlb": item.QJLB,
                    "qxjsy": item.QXJSY,
                    "shrq": moment().format('YYYY-MM-DD'),
                    "spbm": item.SPBM,
                    "spr": item.SPR,
                    "stepid": item.CURRENTSTEP,
                    "ts1": item.TS1,
                    "ts2": item.TS2,
                    "type": item.QJLB,
                    "xjcs": item.XJCS,
                    "yhyid": item.YHYID
                })
            }
        }).success(function(res) {
            $scope.qingjiaDetail.hide();
        });
    }

}).filter(
    'dateqingjia', [function() {
        return function(text) {
            text = text + "000";

            if (!text || text.length === 0) {
                return "";
            } else {
                return moment(parseInt(text)).format('YYYY-MM-DD');
            }

        }
    }]).filter(
    'qjlb', [function() {
        return function(text) {
            if (!text) {
                return "";
            }
            if (text.charAt(0) == "1") {
                return "年休假";
            }
            if (text.charAt(1) == "1") {
                return "病假";
            }
            if (text.charAt(2) == "1") {
                return "公休假";
            }
            if (text.charAt(3) == "1") {
                return "婚假";
            }
            if (text.charAt(4) == "1") {
                return "生育假";
            }
            if (text.charAt(5) == "1") {
                return "探亲假";
            }
            if (text.charAt(6) == "1") {
                return "丧假";
            }
            if (text.charAt(7) == "1") {
                return "学习";
            }
            if (text.charAt(8) == "1") {
                return "公差";
            }
            if (text.charAt(9) == "1") {
                return "工伤";
            }
            if (text.charAt(10) == "1") {
                return "待岗";
            }

        }
    }]);
$controllers


    .controller('tezhong', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $http) {
    $ionicModal.fromTemplateUrl('tpls/tezhong-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.tezhongDetail = modal;
    });
    $ionicModal.fromTemplateUrl('tpls/yehang.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.yehangDetail = modal;
    });
    var details;
    $scope.showTzcb = function(item) {
        $scope.tzcbDetail = item;
        $scope.tezhongDetail.show();
        $http({
            method: "GET",
            url: "/WebapiService/GetSpInfo",
            params: { id: item.ID }
        }).success(function(res) {
            details = res.Details;
        });
    };
    $scope.showYhcb = function(item) {
        $scope.yhcbDetail = item;
        $scope.yehangDetail.show();
        $http({
            method: "GET",
            url: "/WebapiService/GetSpInfo",
            params: { id: item.ID }
        }).success(function(res) {
            details = res.Details;
        });
    };

    $ionicModal.fromTemplateUrl('anquan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.anquanModal = modal;
    });
    $scope.temp = {
        yj: "",
        aqcsText: "",
        IsFinish: "true"
    }
    $scope.baobei = function(tzcbDetail) {
        $http({
            method: "GET",
            url: "/WebapiService/SpFun",
            params: {
                yeOrTe: 1,
                Sqid: tzcbDetail.ID,
                nextSpDetailsId: details[1].ID,
                IsFinish: $scope.IsFinish,
                currUserId: $rootScope.loginBody.loginUserId,
                YHZAQCS: $scope.temp.aqcsText,
                AJBYJ: $scope.temp.yj,
                LDYJ: "3"
            }
        }).success(function(res) {
            $scope.tezhongDetail.hide();
            $scope.yehangDetail.hide();
            $ionicLoading.show({ template: '审核已完成' });
            $timeout(function() {
                $ionicLoading.hide();
            }, 2000);
        });

    }



    $http({
        method: "GET",
        url: "/WebapiService/GetTzcbInfo",
        params: {
            where: "where 1=1",
            pageSize: 500,
            pageIndex: 1,
            isFinish: 0
        }
    }).success(function(res) {
        $scope.Tzcb = res;
    });
    $http({
        method: "GET",
        url: "/WebapiService/GetYhcbInfo",
        params: {
            where: "where 1=1",
            pageSize: 500,
            pageIndex: 1,
            isFinish: 0
        }
    }).success(function(res) {
        $scope.Yhcb = res;
    });
    $http({
        method: "GET",
        url: "WebapiService/GetAQCS"
    }).success(function(res) {
        $scope.aqcslist = res;
    });
    $scope.aqcslist = [{
            "CSNR": "1111111111",
            "ID": "6afcf437376444e793f89fde254eceee",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 44,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "严格按照定线制、苏通大桥及上海港口相关规定。",
            "ID": "1",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 1,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "落实夜航的引领安全措施；加强了望、使用安全航速、全程备锚。",
            "ID": "2",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 6,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "严格执行洪水期的安全措施，注意流压、航道水深变化。",
            "ID": "3",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 4,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "拖轮一艘长江1号浮至码头、护航艇一艘桥区护航。",
            "ID": "42",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 42,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意航道水深变化，乘潮留足富裕水深，确保安全。",
            "ID": "5",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "加强船位监控，同意。",
            "ID": "6",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "认真落实各项安全措施，同意。",
            "ID": "7",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 15,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意拖轮工况，做好应急准备，确保安全。\r\n",
            "ID": "8",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，选择高平潮通过福姜沙南水道，谨慎操作，确保安全。\r\n",
            "ID": "9",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 16,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "属于报备。\r\n",
            "ID": "10",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "无需申报。",
            "ID": "11",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 18,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "注意收听天气状况，密切关注风力。风力不超过5级安排进出江。\r\n",
            "ID": "12",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "认真落实维护措施，留足富余水深过浅区。\r\n",
            "ID": "13",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "同意。\r\n",
            "ID": "14",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 19,
            "TYPE": "3",
            "YHZ": null
        },
        {
            "CSNR": "严格执行拖轮使用规定，靠离泊时申请拖轮协助。",
            "ID": "15",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 7,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "进出锚地时申请拖轮协助。",
            "ID": "16",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 8,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇一艘全程护航；",
            "ID": "17",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "认真计算潮高，根据设标水深和船舶吃水满足富余水深通过所经航区。",
            "ID": "18",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 3,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥前，提醒船方加强对主副机的检查。",
            "ID": "19",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "拖轮、护航艇各一艘桥区护航。",
            "ID": "41",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 41,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "龙爪岩以下航道维护水深10.5m（理论深度基准面），经过此航段时必须乘潮留足富裕水深通过。",
            "ID": "22",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 22,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "引航员在实施引航前，必须认真研究海图，并依据最新海图的实际水深，在规定的通航分道内选择航路，避开浅点，确保引航安全；",
            "ID": "23",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 23,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "加强与上海港引航站的联系，提前了解该船的操纵性能和船况，并与上海港引航站协调，保证该船在吴淞高潮后半小时内实施交接；",
            "ID": "24",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 24,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥时加派一艘大马力拖轮护航，",
            "ID": "25",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 25,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "引航站指派适任引航员带队引领。",
            "ID": "39",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "船舶代理应根据航行计划，提前向海事部门申请、落实条件较好的锚地及锚位。",
            "ID": "27",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 27,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "出厂开航时安排一艘大马力拖轮从厂区护航过桥区。",
            "ID": "29",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 29,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "码头方提前清理泊位，两条大马力拖轮协助靠离泊。代理提前落实好备用锚地。",
            "ID": "43",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 43,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化，能见度和风力达不到要求暂缓开航或者择地抛锚。",
            "ID": "4",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 2,
            "TYPE": "2",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇护航",
            "ID": "33",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "1",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇、拖轮各一艘伴航。",
            "ID": "34",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇全程、拖轮桥区各一艘护航。",
            "ID": "35",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各一艘全程护航。",
            "ID": "36",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "护航艇、拖轮各一艘全程加一艘拖轮桥区护航。",
            "ID": "37",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各两艘全程护航。",
            "ID": "38",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 15,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "进出福姜沙水道申请海事部门进行交通组织，加派一条拖轮护航。",
            "ID": "47",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 47,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "遵守福南水道航行及靠离泊管理规定，申请护航艇、拖轮各一艘护航。",
            "ID": "48",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 48,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": " 选择合适的潮水进港靠泊作业。",
            "ID": "49",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 49,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实老旧船舶安全措施，提醒船方加强对主副机的检查，全程备锚了头航行。",
            "ID": "21",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 5,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "按照主管机关要求，执行相应的安全措施。",
            "ID": "50",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 50,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化。",
            "ID": "51",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 51,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "严格遵守定线制和夜航管理规定。",
            "ID": "52",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 52,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "主副班密切配合，相互提醒。",
            "ID": "53",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 53,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "调度加强船舶监控。",
            "ID": "54",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 54,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化，能见度和风力达不到要求暂缓开航或者择地抛锚。",
            "ID": "148",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 3,
            "TYPE": "机关科室",
            "YHZ": null
        },
        {
            "CSNR": "落实夜航的引领安全措施；加强了望、使用安全航速、全程备锚。",
            "ID": "102",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 6,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化，能见度和风力达不到要求暂缓开航或者择地抛锚。",
            "ID": "103",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 2,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格执行洪水期的安全措施，注意流压、航道水深变化。",
            "ID": "104",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 4,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "十点多",
            "ID": "65bd4c28fb8f4e0eb3a8b933a877b720",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 23,
            "TYPE": "安技部",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意航道水深变化，乘潮留足富裕水深，确保安全。",
            "ID": "105",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格按照定线制、苏通大桥及上海港口相关规定。",
            "ID": "101",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 1,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "加强船位监控，同意。",
            "ID": "106",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实各项安全措施，同意。",
            "ID": "107",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 21,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，注意拖轮工况，做好应急准备，确保安全。",
            "ID": "108",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实安全措施，严格按章航行，选择高平潮通过福姜沙南水道，谨慎操作，确保安全。",
            "ID": "109",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 16,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "属于报备。",
            "ID": "110",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 18,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "无需申报。",
            "ID": "111",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "注意收听天气状况，密切关注风力。风力不超过5级安排进出江。",
            "ID": "112",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实维护措施，留足富余水深过浅区。",
            "ID": "113",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "同意。",
            "ID": "114",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 19,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格执行拖轮使用规定，靠离泊时申请拖轮协助。",
            "ID": "115",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 7,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "进出锚地时申请拖轮协助。",
            "ID": "116",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 8,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇一艘全程护航；",
            "ID": "117",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 11,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真计算潮高，根据设标水深和船舶吃水满足富余水深通过所经航区。",
            "ID": "118",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 3,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥前，提醒船方加强对主副机的检查。",
            "ID": "119",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "认真落实老旧船舶安全措施，提醒船方加强对主副机的检查，全程备锚了头航行。",
            "ID": "120",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 5,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "龙爪岩以下航道维护水深10.5m（理论深度基准面），经过此航段时必须乘潮留足富裕水深通过。",
            "ID": "121",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 22,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "引航员在实施引航前，必须认真研究海图，并依据最新海图的实际水深，在规定的通航分道内选择航路，避开浅点，确保引航安全；",
            "ID": "122",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 23,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "加强与上海港引航站的联系，提前了解该船的操纵性能和船况，并与上海港引航站协调，保证该船在吴淞高潮后半小时内实施交接；",
            "ID": "123",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 24,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "通过苏通大桥时加派一艘大马力拖轮护航，",
            "ID": "124",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 25,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "船舶代理应根据航行计划，提前向海事部门申请、落实条件较好的锚地及锚位。",
            "ID": "125",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 27,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "出厂开航时安排一艘大马力拖轮从厂区护航过桥区。",
            "ID": "126",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 29,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇护航",
            "ID": "127",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 9,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "遵守专用航道航行及靠离泊管理规定，申请护航艇、拖轮各一艘伴航。",
            "ID": "128",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 10,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇全程、拖轮桥区各一艘护航。",
            "ID": "129",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 12,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各一艘全程护航。",
            "ID": "130",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 13,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "护航艇、拖轮各一艘全程加一艘拖轮桥区护航。",
            "ID": "131",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 14,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "海巡艇、拖轮各两艘全程护航。",
            "ID": "132",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 15,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "引航站指派适任引航员带队引领。",
            "ID": "133",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 17,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "拖轮、护航艇各一艘桥区护航。",
            "ID": "134",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 41,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "拖轮一艘长江1号浮至码头、护航艇一艘桥区护航。",
            "ID": "135",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 42,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "码头方提前清理泊位，两条大马力拖轮协助靠离泊。代理提前落实好备用锚地。",
            "ID": "136",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 43,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "进出福姜沙水道申请海事部门进行交通组织，加派一条拖轮护航。",
            "ID": "137",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 47,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "遵守福南水道航行及靠离泊管理规定，申请护航艇、拖轮各一艘护航。",
            "ID": "138",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 48,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": " 选择合适的潮水进港靠泊作业。",
            "ID": "139",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 49,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "按照主管机关要求，执行相应的安全措施。",
            "ID": "140",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 50,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "关注天气变化。",
            "ID": "141",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 51,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "严格遵守定线制和夜航管理规定。",
            "ID": "142",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 52,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "主副班密切配合，相互提醒。",
            "ID": "143",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 53,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "调度加强船舶监控。",
            "ID": "144",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 54,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "请船方或代理提供主管机关书面审批材料。",
            "ID": "145",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 20,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "督促代理、码头方提前清理进出港航道。",
            "ID": "146",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 56,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "护航艇一艘，拖轮两条全程护航。",
            "ID": "147",
            "SFYX": 1,
            "SFYXDisplay": false,
            "SORT": 57,
            "TYPE": "引航站",
            "YHZ": null
        },
        {
            "CSNR": "测试测试测试测试赛测试1111113人发放",
            "ID": "01ba2d9e4f7d404fb65335afb59ee263",
            "SFYX": 0,
            "SFYXDisplay": false,
            "SORT": 44,
            "TYPE": "机关科室",
            "YHZ": null
        }
    ];
});
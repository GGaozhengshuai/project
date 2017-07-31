var homeApp = angular.module('homeApp', ['pageDirectives']);
homeApp.service('homeServices', function($http) {
    var service = {
        list: function(param) { //home
            return $http.post('/approval/mycountall',param, {cache:false});
        },
        draftApproval: function(param) {//草稿
            return $http.post('/approval/mybegin',param, {cache:false});
        },
        listApproval: function(param) {//待办
            return $http.post('/approval/mydoing', param,{cache:false});
        },
        alApproval: function(param) {//已办
            return $http.post('/approval/mydone', param,{cache:true});
        },
        myApproval: function(param){//我的申请
            return $http.post('/approval/myapply', param, {cache:true});
        },
        getprctype: function(param){//枚举
            return $http.post('/approval/getprctype', param, {cache:true});
        },
        listSubscriber: function(param) {//订阅
            return $http.post('/approval/mysubscriber',param, {cache:false});
        },
        purchasefdAgree: function (param) {//采购返点同意
            return $http.post('/purchasefd/agree', param, {cache: false});
        },
        mkinvoiceAgree: function (param) {//开票申请同意
            return $http.post('/mkinvoice/agree', param, {cache: false});
        },
	    pjtzAgree: function (param) {//票据台账同意
            return $http.post('/debitbill/agree', param, {cache: false});
        },
	    xsfdAgree: function (param) {//销售返点同意
            return $http.post('/salesbonus/agree', param, {cache: false});
        },
        enumFH: function(param){ //放货枚举
            return $http.post('/cargooutinfo/constlist',param ,{cache:false});
        },
        enumKCTZ: function(param) { // 库存调整
            return $http.post('/stock/enum',param ,{cache:true});
        },
        enumPDBG: function(param) { // 盘点报告、采购申请、采购返点、付款申请、开征付汇
            return $http.post('/purchase/enumlist',param ,{cache:true});
        },
        enumCGDD: function(param) { //采购订单
            return $http.post('/poheader/enumlist',param ,{cache:true});
        },
        enumCGKJHT: function(param) { // 采购框架合同
            return $http.post('/kjpo/enumlist',param ,{cache:true});
        },
        enumPay: function(param) { // 付款种类枚举接口
            return $http.post('/enum/kftype',param ,{cache:true});
        },
        findtotalbymonth : function(param){ // 获取开票信息
            return $http.post('/mkinvoice/findtotalbymonth',param,{cache:false});
        },
        holidayType : function(param){ // 请假类型
            return $http.post('/holiday/types',param,{cache:false});
        },
	    costcenter : function(param){   // 成本中心
		    return $http.post('/enuminterface/costcenter',param,{cache:false});
	    },
    };
    return service;
});

homeApp.controller('homeCtrl', ['$scope','$http','$rootScope','homeServices',function($scope,$http,$rootScope,service){

    // 绑定固定表头事件
    var fixThead = function () {
        if(!$('#tableWrap').is(':visible')) return false;
        var oh = $('#tableWrap')[0].offsetTop,
            h = $(window).scrollTop();
        if(!h){
            if($('#fixTableBox').is(':visible')) {
                $('#fixTableBox').hide();
            }
            return;
        }

        if(oh-h>1 && $('#fixTableBox').hasClass('show')) {
            $('#fixTableBox').removeClass('show')
        }
        if(oh-h<0 && !$('#fixTableBox').hasClass('show')) {
            $('#fixTableBox').addClass('show')
        }

    };
    $(window).scroll(function () {
        fixThead();
    })
    $(window).resize(function () {
        fixThead()
    })
    fixThead();

	var username = $rootScope.userName;
	if(username == 'admin') {
		$scope.isAdmin = true;
	}

    var list = service.list(),
        typeObj = service.getprctype();
    /*typeObj.success(function(data) {
        if(data.code == 200) {
            $scope.typeObj = data.data.enum.PRC;
        }
    });*/
    list.success(function(data){
        if(data.code == 200){
            $scope.dataList = data.rst.data;
            // $scope.hasScroll = $scope.dataList.length > 11;
        } else {
            swal(data.msg, "", "warning");
        }
    });
    //行项目所有数据都为0时不显示
    $scope.filterFn = function(data) {
        var returnVal = data.myapplys || data.mybegins || data.mydoings || data.mydones || data.mysubscribers;
        return returnVal;
    };
}]);
homeApp.controller('typeListCtrl', ['$scope','$http', '$stateParams', '$filter','$rootScope', 'homeServices',function($scope,$http,$stateParams,$filter,$rootScope,service) {
    $scope.controllercode = $stateParams.controllercode || '';
    $scope.controllerName = $stateParams.controllerName || '';
    $scope.myflag = $stateParams.myflag || '';
    //typeObj = service.getprctype();
    // 类型枚举
    /*typeObj.success(function (data) {
        if (data.code == 200) {
            $scope.typeObj = data.data.enum.PRC;
        }
    });*/
    $scope.statusText = {
        mybegins: '草稿',
        mydoings: '待办',
        mydones: '已办',
        mysubscribers: '订阅',
        myapplys: '申请'
    }[$scope.myflag];
    var listService = {
        mybegins: 'draftApproval',
        mydoings: 'listApproval',
        mydones: 'alApproval',
        mysubscribers: 'listSubscriber',
        myapplys: 'myApproval'
    }[$scope.myflag];

    $scope.isSWJL = false;
    // 开票申请商务经理特殊处理
    if ($scope.controllercode == 'KPSQ'){
        var roles = $rootScope.loginPerson.roles, op_business=false, leader = false;
	    console.log('roles', $rootScope.loginPerson)
        // var roles = $cookieStore.get("persion").roles, op_business=false, leader = false;
        for(var i=0, l=roles.length; i<l; i++) {
            if(roles[i].name == 'op_business' && !op_business) {
                op_business = true;
            } else if(roles[i].name == 'leader' && !leader) {
                leader = true;
            }
        }
        // Bug6692
        // 2017-5-5 busi_roles==caiwu_chunakaipiao的可以看开票申请-待办事项中开票金额
        $scope.isSWJL = op_business && leader || $rootScope.busiRoles[0].code == 'caiwu_chunakaipiao';
        if($scope.isSWJL && ($scope.myflag == 'mydoings' || $scope.myflag == 'mydones') || $scope.myflag == 'mysubscribers') {
            var findtotalbymonth = service.findtotalbymonth();
            findtotalbymonth.success(function (data) {
                $scope.sumfwfp = data.rst.sumfwfp.toFixed(2);
                $scope.sumzzfp = data.rst.sumzzfp.toFixed(2);
            })
        }
    }

    // 开票申请 - 默认加载快速开票列表
    if ($scope.controllercode == 'KPSQ' && $scope.myflag == 'mydoings') {
        // $scope.showKPSQFn = function (type) {
        //     $scope.specialq = type;

        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            numberOfPage: 0,
            pagesLength: 10,
            perPageOptions: [5,10, 20, 30, 40, 50],
            pagePromise: {},
            onChange: function () {
                    var param = {
                        page: $scope.paginationConf.currentPage,
                        limit: $scope.paginationConf.itemsPerPage,
                        processtype: $scope.controllercode.split(','),
	                    querys: {kptype: {1: 'kpfast', 2: 'kpnormal'}[$scope.activeTab]}

                    };
                //开票查询条件 判断正常发票还是收据
	            var fapType = {1:['增值税专用发票','增值税普通发票','服务发票','资金往来专用发票','服务费增值税普通发票','服务费增值税专用发票'],2:'收据'};
	            if($scope.controllercode.indexOf('KPSQ') !== -1 ){
		            $.extend(true, param, { querys: {
			            'ZFPLX':$scope.fapType ? fapType[$scope.fapType] : '',
			            'contractno': $scope.contractno,
			            'cusname':$scope.cusname,
			            'user':$scope.user,
			            'lastactiveuname':$scope.lastactiveuname,
			            'salesorgname':$scope.deptmt,
			            'XBLNR':$scope.XBLNR,
			            'contracttype':$scope.contracttype
		            }});
	            }
	            /*if($scope.fapType == '1' && $scope.controllercode.indexOf('KPSQ') !== -1 && ($scope.contractno || $scope.cusname || $scope.user || $scope.deptmt || $scope.fapType)){
		            $.extend(true, param, { querys: {'ZFPLX':fapType,'contractno': $scope.contractno,'cusname':$scope.cusname,'user':$scope.user,'salesorgname':$scope.deptmt}});
	            }else if($scope.fapType == '2' && $scope.controllercode.indexOf('KPSQ') !== -1 && ($scope.contractno || $scope.cusname || $scope.user || $scope.deptmt || $scope.fapType)){
		            $.extend(true, param, { querys: {'ZFPLX':'收据','contractno': $scope.contractno,'cusname':$scope.cusname,'user':$scope.user,'salesorgname':$scope.deptmt}});
	            }else if($scope.controllercode.indexOf('KPSQ') !== -1 && ($scope.contractno || $scope.cusname || $scope.user || $scope.deptmt)){
		            $.extend(true, param, { querys: {'contractno': $scope.contractno,'cusname':$scope.cusname,'user':$scope.user,'salesorgname':$scope.deptmt}});
	            }else{
		            $.extend(true, param, { querys: {}});
		            // $.extend(true,param,[{}]);
	            }*/

                var list = service[listService](param);
                $scope.paginationConf.pagePromise = list;
                list.success(function (data) {
                    $scope.emptyFn && $scope.emptyFn();
                    if (data.code == 200) {
                        $scope.dataList = data.rst.data.items;
                    }
                })
            }
        };
        // }
        // 默认加载快速开票
        // $scope.showKPSQFn ('kpfast');

    } else {
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            numberOfPage: 0,
            pagesLength: 10,
            perPageOptions: [5,10, 20, 30, 40, 50],
            pagePromise: {},
            onChange: function () {
                var param = {
                    page: $scope.paginationConf.currentPage,
                    limit: $scope.paginationConf.itemsPerPage,
	                processtype: $scope.controllercode.split(',')
                };
                if($scope.myflag == 'mydones' || $scope.myflag == 'mysubscribers') {
                	$.extend(true, param, { querys: {'status': $scope.status} })
	               
                }
                //controllercode.indexOf('FKSQ') !== -1
               /* if($scope.controllercode.indexOf('FKSQ') !== -1 && $scope.ZSQNO) {
                    $.extend(true, param, { docspecials: [{'ZSQNO': $scope.ZSQNO}]})
                } else if($scope.controllercode.indexOf('FKSQ') !== -1) {
                    $.extend(true, param, { ZSQNO: $scope.ZSQNO});
                }*/

	            // 客户管理
	            if($scope.controllercode === 'CUSTOMER') {
		            $.extend(true, param, { querys: {
			            'NAME': $scope.NAME ,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
                // 2017-2-15 修改查询条件
	            // 付款申请
	            if($scope.controllercode.indexOf('FKSQ') !== -1) {
		            $.extend(true, param, { querys: {
			            'ZSQNO': $scope.ZSQNO,
			            'ZZPO': $scope.ZZPO,
			            'ZSKDW': $scope.ZSKDW,
			            'ZCGSW': $scope.ZCGSW,
			            'AUFUSER0': $scope.AUFUSER0,
			            'lastactiveuname': $scope.lastactiveuname,
			            'ZSQBM': $scope.ZSQBM,
			            'EBELN': $scope.EBELN,
			            'AUFNR': $scope.AUFNR,
			            'ZSQJE': $scope.ZSQJE.replace(/,/g,''),
			            'ZSJFKJE': $scope.ZSJFKJE.replace(/,/g,'')
		            }})
		            if($scope.myflag == 'mysubscribers') {
			            $.extend(true, param, { querys: {'status': $scope.status} })
		            }
	            }
	            // 销售合同
	            if($scope.controllercode.split(',')[0]=== 'CONT') {
		            $.extend(true, param, { querys: {
			            'stomer': $scope.stomer,
			            'salesname': $scope.salesname,
			            'groupno': $scope.groupno,
			            'printed': $scope.printed,
			            'lastactiveuname': $scope.lastactiveuname
		            },'orderby':{}})
		            if($scope.myflag == 'mysubscribers') {
			            $.extend(true, param, { querys: {'status': $scope.status} })
			
		            }
		            var orderbyArr = $scope.orderby.split(':');
		            param.orderby[orderbyArr[0]] = +orderbyArr[1];
	            }
	            // 进出口销售合同
	            if($scope.controllercode.indexOf('IECONTRACT_CHANGE') !== -1) {
		            $.extend(true, param, { querys: {
			            'stomer': $scope.stomer,
			            'salesname': $scope.salesname,
			            'contracttype': $scope.contracttype,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
		            if($scope.myflag == 'mysubscribers') {
			            $.extend(true, param, { querys: {'status': $scope.status} })
			
		            }
	            }
	            // 采购订单
	            if($scope.controllercode.indexOf('ZD02') !== -1) {
		            $.extend(true, param, { querys: {
			            'EBELN': $scope.EBELN,
			            'ZZPO': $scope.ZZPO,
			            'groupno': $scope.ZZSQR,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 放货申请
	            if($scope.controllercode === 'FHSQ') {
		            $.extend(true, param, { querys: {
			            'code': $scope.code,
			            'client': $scope.client,
			            'sale': $scope.sale,
			            'fhcode': $scope.fhcode,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 销售返点
	            if($scope.controllercode.indexOf('XSFD') !== -1) {
		            $.extend(true, param, { querys: {
			            'name': $scope.name,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 借出单
	            if($scope.controllercode.indexOf('JCDRN') !== -1) {
		            $.extend(true, param, { querys: {
			            'code': $scope.code,
			            'client_name': $scope.clientname,
			            'user_name': $scope.username,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 返点冲抵应收
	            if($scope.controllercode === 'DXPZ') {
		            $.extend(true, param, { querys: {
			            'contractNo': $scope.contractNo,
			            'customer': $scope.customer,
			            'salesname': $scope.salesname,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 放货信息维护
	            if($scope.controllercode === 'FHXX') {
		            $.extend(true, param, { querys: {
			            'client': $scope.client,
			            'name': $scope.name,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }

	            // 费用申请单
	            if($scope.controllercode.indexOf('NBDD') !== -1) {
		            $.extend(true, param, { querys: {
			            'ZINORD': $scope.ZINORD,
			            // 'USER0': $scope.USER0,
			            'lastactiveuname': $scope.lastactiveuname,
                        'ZSQNR':$scope.ZSQNR
		            }})
	            }
	            // 客户信用
	            if($scope.controllercode === 'KHXY') {
		            $.extend(true, param, { querys: {
			            'cusname': $scope.cusname,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 签报
	            if($scope.controllercode === 'QB') {
		            $.extend(true, param, { querys: {
			            'signtype': $scope.signtype,
			            'creator': $scope.creator,
			            'signpeople': $scope.signpeople,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 采购申请
	            if($scope.controllercode.indexOf('ZD01') !== -1) {
		            $.extend(true, param, { querys: {
			            'BANFN': $scope.BANFN,
			            'ERNAM': $scope.ERNAM,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 部门担保
	            if($scope.controllercode== 'BMDB') {
		            $.extend(true, param, { querys: {
			            'contractno': $scope.contractno,
			            'orgname': $scope.orgname,
			            'proposer': $scope.proposer,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }

	            // 库存调整
	            if($scope.controllercode.indexOf('ZD07') !== -1) {
		            $.extend(true, param, { querys: {
			            'ZTYPE': $scope.ZTYPE,
			            'ERNAM': $scope.ERNAM,
			            'SQDH': $scope.SQDH,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 库存盘点
	            if($scope.controllercode === 'ZD13') {
		            $.extend(true, param, { querys: {
			            'RPTYPE': $scope.RPTYPE,
			            'LGNUM': $scope.LGNUM,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 银行授信
	            if($scope.controllercode.indexOf('YHSX') !== -1) {
		            $.extend(true, param, { querys: {
			            'code': $scope.code,
			            'credittype': $scope.credittype,
			            'username': $scope.username,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 开征付汇
	            if($scope.controllercode === 'KZFH') {
		            $.extend(true, param, { querys: {
			            'NAME1': $scope.NAME1,
			            'ZFKLX': $scope.ZFKLX,
			            'ZZDR': $scope.ZZDR,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 采购返点
	            if($scope.controllercode === 'ZD04') {
		            $.extend(true, param, { querys: {
			            'ZMDL': $scope.ZMDL,
			            'ZMFDXH': $scope.ZMFDXH,
			            'lastactiveuname': $scope.lastactiveuname
		            }})
	            }
	            // 物料主数据
                if($scope.controllercode === 'MM') {
                    $.extend(true, param, { querys: {
                        'code': $scope.code,
                    }})
                }

                //开票查询条件 判断正常发票还是收据
                var fapType = {1:['增值税专用发票','增值税普通发票','服务发票','资金往来专用发票','服务费增值税普通发票','服务费增值税专用发票'],2:'收据'};
	            if($scope.controllercode.indexOf('KPSQ') !== -1 ){
		            $.extend(true, param, { querys: {
			            'ZFPLX':$scope.fapType ? fapType[$scope.fapType] : '',
			            'contractno': $scope.contractno,
			            'cusname':$scope.cusname,
			            'user':$scope.user,
			            'lastactiveuname':$scope.lastactiveuname,
			            'salesorgname':$scope.deptmt,
			            'XBLNR':$scope.XBLNR,
			            'contracttype':$scope.contracttype
		            }});
	            }

	            /*if($scope.fapType == '1' && $scope.controllercode.indexOf('KPSQ') !== -1 && ($scope.contractno || $scope.cusname || $scope.user || $scope.deptmt || $scope.fapType)){
		            $.extend(true, param, { querys: {'ZFPLX':fapType,'contractno': $scope.contractno,'cusname':$scope.cusname,'user':$scope.user,'salesorgname':$scope.deptmt}});
	            }else if($scope.fapType == '2' && $scope.controllercode.indexOf('KPSQ') !== -1 && ($scope.contractno || $scope.cusname || $scope.user || $scope.deptmt || $scope.fapType)){
		            $.extend(true, param, { querys: {'ZFPLX':'收据','contractno': $scope.contractno,'cusname':$scope.cusname,'user':$scope.user,'salesorgname':$scope.deptmt}});
	            }else if($scope.controllercode.indexOf('KPSQ') !== -1 && ($scope.contractno || $scope.cusname || $scope.user || $scope.deptmt || $scope.XBLNR || $scope.lastactiveuname)){
		            $.extend(true, param, { querys: {'contractno': $scope.contractno,'cusname':$scope.cusname,'user':$scope.user,'salesorgname':$scope.deptmt,'XBLNR':$scope.XBLNR,'lastactiveuname':$scope.lastactiveuname}});
	            }else{
		            $.extend(true, param, { querys: {}});
	            }*/

                // 采购返点 - 我的代办、付款申请 - 我的已办 按照编号排序
                if($scope.controllercode == 'ZD04' && $scope.myflag == 'mydoings' ) {
                    $.extend(true, param, { orderby: {'doc.content.model.sapid':-1}})
                }

                var list = service[listService](param);
                $scope.paginationConf.pagePromise = list;
                list.success(function (data) {
                    $scope.emptyFn && $scope.emptyFn();
                    if (data.code == 200) {
                        $scope.dataList = data.rst.data.items;

                        // 销售返点申请单类型的 返点金额、可用金额、返点类型要特殊处理一下
                        if($scope.controllercode.indexOf('XSFD') !== -1) {

                            for(var i=0,l=$scope.dataList.length; i<l; i++) {
                                if($scope.dataList[i].typename == '销售返点申请单') {
                                    var items = $scope.dataList[i].content.items, type=[], total=0, usable=0;
                                    for(var j=0,len=items.length; j<len; j++) {
                                        total += items[j].bonusmoney.total*1;
                                        usable += (items[j].bonusmoney.total - items[j].bonusmoney.freeze - items[j].bonusmoney.used);
                                        type[j] = items[j].bonusbase.type;
                                    }
                                    $scope.dataList[i].total = total;
                                    $scope.dataList[i].usable = usable;
                                    // $scope.dataList[i].type = type.join(',');
                                } else {
                                    var model = $scope.dataList[i].model;
                                    $scope.dataList[i].total = model.bonusmoney.total;
                                    $scope.dataList[i].usable = (model.bonusmoney.total - model.bonusmoney.freeze - model.bonusmoney.used);
                                    // $scope.dataList[i].type = model.bonusbase.type;
                                }
                            }
                        }
                    }
                    if($scope.controllercode.indexOf('FKSQ') !== -1 && $scope.myflag == 'mydoings') {
	                    if($scope.flagsmsr && $scope.ZSQNO && $scope.dataList.length) {      // 扫码查询出结果后自动打开详情页
                            var list = $scope.dataList[0];
                            window.location = '/index.html#/'+list.controller+'?myflag='+list.myflag+'&processId='+list.processId+'&nodeId='+list.node._id;
                        } else {
	                        // 我的代办页面进入光标定位在搜索输入框
	                        if($("#fksqcode")[0]){
	                            $("#fksqcode").focus();
	                        }
                        }
	                    $scope.flagsmsr = $scope.flagsmsr ? false : $scope.flagsmsr;
                    }
                })
            }
        };
    }

    //付款申请,提供查询功能
    if ($scope.controllercode.indexOf('FKSQ') !== -1) {
        $scope.myKeyup = function(e, fn){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
            	$scope.flagsmsr = true;
                // $('#searchFKSQ').click();
                fn();
            }
        };

    }
	$scope.toggleFn = function (e) {
		var target = $(e.target);
		var obj = target.closest('.genSearch')/*$('#typeListSearch')*/, css = 'showMore';
		
		obj[obj.hasClass(css) ? 'removeClass' : 'addClass'](css);
	}
    // 草稿提供删除操作
    $scope.deleteDraftBill = function (controller, processId, nodeId, index) {
        var url = '/' + controller + '/cancel';
        var myDataPar = {};
        myDataPar.processId = processId;
        myDataPar.nodeId = nodeId;
        swal({
            title: "您确定要删除吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除",
            cancelButtonText: '关闭',
            closeOnConfirm: true
        }, function () {
            $http.post(url, myDataPar).success(function (data) {
                if (data.code == 200) {
                    console.log($scope.dataList);
                    $scope.dataList.splice(index, 1);
                    swal("删除成功", "", "success");
                    console.log('over:', $scope.dataList);
                    return false;
                } else {
                    //alert(data.msg);
                    swal(data.msg, "", "warning");
                }
            }).error(function (data) {
                alert('请求超时，服务器错误');
            });
        });

    };

    // 枚举接口
    var enumType = {
        FHXX: 'enumFH',FHSQ: 'enumFH',
        'ZD07,ZD08,ZD09,ZD10,ZD11': 'enumKCTZ',
        ZD03: 'enumCGKJHT',
        ZD13: 'enumPDBG','ZD01,ZD15': 'enumPDBG', 'FKSQ,HBFK,FKZF':'enumPDBG', ZD04:'enumPDBG', KZFH:'enumPDBG',
        'ZD02,ZD12,ZD14': 'enumCGDD'
    }[$scope.controllercode];
    if (enumType) {
        var enumList = service[enumType]();

        enumList.success(function (data) {
            if (data.code == 200) {
                //$scope.enumObj = data.rst.data.enum;
                $scope.enumObj = ['FHSQ'].indexOf($scope.controllercode)!=-1 ? data.rst
                    : $scope.controllercode.indexOf('ZD07')!=-1 ? data.rst.data.enum
                    :  data.rst.enum;
            }
        });
    }
    // 库存调整
    if($scope.controllercode.indexOf('ZD07') !== -1) {
        $scope.enumObj2 = {
            YSFS: {HK:'空运', QY:'汽运',KD:'快递', NB:'仓库内移动'},
            ZTYPE: {A1:'跨仓库调拨', A2:'仓库内转移', A3:'仓库产品报废', A4:'产品组装拆卸', A5:'产品拆箱'}
        };
    }
    // 付款申请
    if($scope.controllercode.indexOf('FKSQ') !== -1) {
        var enumPay = service.enumPay();
        enumPay.success(function (data) {
             $scope.enumPayObj = data;
        })
        $scope.enumObj2 = {ZFKZT:{1000:"中建材信息技术股份有限公司",9000:"中建材集团进出口公司",9001:"中国建材（香港）有限公司"}};
    }
    // 客户管理
    if ($scope.controllercode == 'CUSTOMER') {
        $scope.customerType = {
            business: {
                "CODE": "ZC01",
                "NAME": "业务客户"
            },
            Finance: {
                "CODE": "ZC04",
                "NAME": "财务客户"
            }
        };
    }
    // 进出口合同
    if ($scope.controllercode.indexOf('IECONTRACT_CHANGE') != -1 || $scope.controllercode == 'KZFH' || $scope.controllercode.indexOf('FKSQ') !== -1) {
        $scope.currencyName = {
            'CNY': '人民币',
            'EUR': '欧元',
            'USD': '美元',
            'CHF': '瑞士法郎',
            'HKD': '港币',
            'JPY': '日元'
        };
    }
    // 放货/放货信息维护
    if ($scope.controllercode == 'FHXX' || $scope.controllercode == 'FHSQ') {
        $scope.typeName = {
            type1: {
                "CODE": "contract",
                "NAME": "销售合同"
            },
            type2: {
                "CODE": "lend",
                "NAME": "借出单"
            }
        };
    }
    // 内部订单
    if ($scope.controllercode.indexOf('NBDD') !== -1) {
        $scope.typeName = {ZJ01: '市场费用', ZJ02: '直接运营费用',ZJ03:'项目前期费用', ZJ99:'间接运营费用'};
        var enumInside = service.costcenter();
	
	    enumInside.success(function (data) {
		    $scope.enumInside = data;
	    })
    }
    // 采购返点、开票、票据台账、销售返点
    if ($scope.controllercode == 'ZD04' || $scope.controllercode == 'KPSQ' || $scope.controllercode == 'PJTZ' || $scope.controllercode.indexOf('XSFD') !== -1) {
        $scope.$watch('activeTab', function(newVal, oldVal){
            if(newVal !== oldVal) {
                $scope['checkAllmkinvoice'+newVal] = false;
            }
        });
        $scope.cArr = [];
        $scope.cArrdata = [];
        var updateSelected = function (action, id, index) {
            if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
                $scope.cArr.push(id);
                $scope.cArrdata.push($scope.dataList[index]);
            }
            if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
                var idx = $scope.cArr.indexOf(id);
                $scope.cArr.splice(idx, 1);
                $scope.cArrdata.splice(idx, 1);
            }
        };
        $scope.updateSelection = function ($event, id, index) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id, index);
        };
        // 清空
        $scope.emptyFn = function() {
            $scope.checkAllpurchasefd = false;
            $scope.checkAllproductlend = false;
            $scope.checkAllmkinvoice1 = false;
            $scope.checkAllmkinvoice2 = false;
            $scope.checkAllsign = false;
            $scope.checkAllsalesbonus = false;
            $scope.cArr = [];
            $scope.cArrdata = [];
            console.log('cArrdata:',$scope.cArrdata);
        };
        $scope.allCheck=function($event, type) {
            //var checkbox = $event.target;
            //$scope['checkAll'+type] = checkbox.checked ? true : false;

            if ($scope['checkAll'+type]) {
                for (var i = 0; i < $scope.dataList.length; i++) {
                    $scope.cArr[i] = $scope.dataList[i].processId;
                    $scope.cArrdata[i] = $scope.dataList[i];
                }
                /*if( type == 'mkinvoice1'|| type == 'mkinvoice2') {
                   $scope.sumbckp = t;
                }*/
            } else {
                $scope.cArr = [];
                $scope.cArrdata = [];
            }
        };

	    var watchExcel = $scope.$watchCollection('cArrdata', function (newValue, oldValue) {
		    var t = 0;
		    for (var j = 0, l = newValue.length; j < l; j++) {
			    if ($scope.controllercode == 'KPSQ') {
				    t += newValue[j].model.invoiceamount*100;
			    } else if ($scope.controllercode == 'ZD04') {
				    t += newValue[j].model.ZMFDJE*100;
			    } else {
				    t += newValue[j].total*100;
			    }
		    }
		    if ($scope.controllercode == 'KPSQ') {
			    $scope.sumbckp = t/100;
		    } else  if ($scope.controllercode == 'ZD04'){
			    $scope.sumfdje = t/100;
			    $scope.selectNum = newValue.length;
		    } else {
			    $scope.sumxsfdje = t/100;
			    $scope.selectNumxs = newValue.length;
		    }
	    });

        $scope.applyAgreeAll = function() {
            //return false;
            if(!$scope.cArrdata.length){
                swal("请勾选列表", "", "warning");
                return false;
            }

            for(var i= 0,l=$scope.cArrdata.length; i<l; i++) {
                applyAgree($scope.cArrdata[i]);
            }
        };
        //var applyObj = $scope.applyObj = {};
        var applyAgree = function (paramData) {
            var param = {};
            param.doc = {model: paramData.model};
            //param.comment = applyObj.applyIdea;
            param.processId = paramData.processId;
            param.nodeId = paramData.node._id;
            //param.candidates = $scope.candidates;
            //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
            var agreenService = {'ZD04': 'purchasefdAgree', 'KPSQ': 'mkinvoiceAgree', 'PJTZ': 'pjtzAgree'}[$scope.controllercode];
	        if($scope.controllercode.indexOf('XSFD') !== -1) {
		        agreenService = 'xsfdAgree';
	        }
	        console.log('agreenService', agreenService,param)
            var applyAgree = service[agreenService](param);
            applyAgree.success(function (data) {
                if (data.code == 200) {
                    updateSelected('remove', param.processId);
                     /*var ii = $scope.dataList.indexOf(paramData);
                    $scope.dataList.splice(ii, 1);*/

                    if(!$scope.cArrdata.length) {
                        swal({
                            title: "审批成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            closeOnConfirm: true
                        }, function () {
                            location.reload();
                            //window.location.href = '/index.html#/myTodo';
                        });
                        /*swal('审批成功', '', 'success');
                        $scope.initList();*/
                    }
                } else {
                    swal({
                        title:'审批错误',
                        text:data.msg,
                        type:'error'
                    });
                }

            }).error(function (error) {
                alert(error);
            });
        }
    }
    //请休假
    if ($scope.controllercode == 'QXJ') {
        //请假类型
        var  holidayType=service.holidayType();
        holidayType.success(function(data){
            if(data.code==200){
                $scope.holidayData=data.rst.enum;
            }
        });
    }
}]);


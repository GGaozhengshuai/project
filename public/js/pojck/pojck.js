var pojckApp = angular.module('pojckApp', ['pageDirectives','formDirectives']);
pojckApp.service('pojckService',function($http) {
    var service = {
        listpojck: function (param) {
            return $http.post('/pojck/list', param, {cache: false});
        },
        viewpojck: function (param) {
            return $http.post('/pojck/read', param, {cache: true});
        },
        pojckdetail: function (param) {  //审批
            return $http.post('/pojck/detail', param, {cache: false});
        },
        pojckAgree: function (param) {//同意
            return $http.post('/pojck/agree', param, {cache: false});
        },
        pojckDisagree: function (param) {//驳回
            return $http.post('/pojck/disagree', param, {cache: false});
        },
        pojckCancel: function (param) {//取消
            return $http.post('/pojck/cancel', param, {cache: false});
        },
        pojckRecall: function (param) {//召回
            return $http.post('/pojck/recall', param, {cache: false});
        },
        enumPurchase: function (param) { // 枚举接口
            return $http.post('/purchase/enumlist', param, {cache: true});
        },
        pojckEnum: function (param) { // 枚举接口
            return $http.post('/pojck/enumlist', param, {cache: true});
        },
        pojckSave: function (param) {//保存
            return $http.post('/pojck/save', param, {cache: false});
        },
        getpojckprocesslog: function (param) {//保存
            return $http.post('/pojck/getprocesslog', param, {cache: false});
        },
        getskbysalesorderidorsupplierorderid: function (param) {
            return $http.post('/credit/getskbysalesorderidorsupplierorderid', param, {cache: true});

        },
        selectconbyzzpo :function(param){//根据供应商订单号查询合同
            return $http.post('/poheader/selectconbyzzpo',param,{cache:true});
        },
        selectconbyzzsdpo :function(param){//根据销售订单号查询合同
            return $http.post('/poheader/selectconbyzzsdpo',param,{cache:true});
        }
    }
    return service;
});

pojckApp.controller('pojckOrderCtrl',['$scope','$stateParams','pojckService',function($scope,$stateParams,pojck){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,EBELN:$scope.EBELN,EKGRP:$scope.EKGRP,LIFNR_NAME:$scope.LIFNR_NAME,ERNAM:$scope.ERNAM,BEDAT:$scope.BEDAT};
            var customerPromise = pojck.listpojck(param);
            customerPromise.success(function(data){
                if(data.code == 200){
                    $scope.dataList = data.rst.data.items;
                    for(var x in $scope.dataList){
                        if($scope.dataList[x].BSART){
                            var type = getField(data.rst.data.enum,'code',$scope.dataList[x].BSART)
                            $scope.dataList[x].BSART = type.name;
                        }
                        if($scope.dataList[x].EKORG){
                            var type = getField(data.rst.data.enum,'code',$scope.dataList[x].EKORG)
                            $scope.dataList[x].EKORG = type.name;
                        }
                        if($scope.dataList[x].EKGRP){
                            var type = getField(data.rst.data.enum,'code',$scope.dataList[x].EKGRP)
                            $scope.dataList[x].EKGRP = type.name;
                        }
                    }
                }else {
                    alert(data.msg);
                }

            });
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
pojckApp.controller('pojckViewCtrl',['$scope','$stateParams','$state','pojckService',function($scope,$stateParams,$state,pojck){
    var ZZSDPO;
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, EBELN:$stateParams.id};
            var viewPur = pojck.viewpojck(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function(data){
                if(data.code == 200){
                    $scope.purchaseList = data.rst.data.model;
                    ZZSDPO = data.rst.data.model.ZZSDPO;
                    $scope.dataList = data.rst.data.items;
                    if($scope.purchaseList.ZZTQXD == '0'){
                        $scope.purchaseList.ZZTQXD ='正常下单';
                    }else if($scope.purchaseList.ZZTQXD == '1'){
                        $scope.purchaseList.ZZTQXD ='提前下单';
                    } else {
                        $scope.purchaseList.ZZTQXD ='未认领';
                    }

                    $scope.enumobj = data.rst.data.enum;
                    if($scope.purchaseList.BUKRS){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.BUKRS);
                        $scope.BUKRS = type.name;
                    }
                    if($scope.purchaseList.BSART){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.BSART);
                        $scope.BSART = type.name;
                    }
                    if($scope.purchaseList.EKORG){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.EKORG);
                        $scope.EKORG = type.name;
                    }
                    if($scope.purchaseList.EKGRP){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.EKGRP);
                        $scope.EKGRP = type.name;
                    }
                    if($scope.purchaseList.ZZCP){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.ZZCP);
                        $scope.ZZCP = type.name;
                    }
                    if($scope.purchaseList.WAERS){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.WAERS);
                        $scope.WAERS = type.name;
                    }
                    if($scope.purchaseList.ZZJWCP){
                        var type = getField(data.rst.data.enum,'code', $scope.purchaseList.ZZJWCP);
                        $scope.ZZJWCP = type.name;
                    }
                }
            }).error(function(error){
                alert(error);
            });
        }
    };
    var idx = 1;
    $scope.show=function(){
        if(idx == 1){
            $scope.emerge = true;
            idx = 2;
        }else{
            $scope.emerge = false;
            idx = 1;
        }

    }
    $scope.viewPurchase = function(){
        $("#chsBox").dialog({
            autoOpen: false,
            width: 400,
            modal: true,
            buttons: [{
                text: "关闭",
                class: "gray_bg",
                click: function () {
                    $(this).dialog("close");
                    $(".layer").hide();
                }
            }]
        });
        $("#chsBox").dialog("open");

        var param = {page: 1, limit: 9999, EBELN:$stateParams.id};
        var viewPur = pojck.viewpojck(param);
        viewPur.success(function (data) {
            if (data.code == 200) {
                $scope.cgList = [];
                var rep = {};
                data.rst.data.items.forEach(function(item){    //去重
                    if(item.BANFN != ""){
                        if(!rep[item.BANFN]){
                            rep[item.BANFN] = true;
                            return $scope.cgList.push(item);
                        }
                    }
                });
            }else {
                alert(data.msg);
            }
        })
    }

    $scope.contractdetails = function(e,ZZPO,ZZSDPO){
        var param = { ZZPO:ZZPO};
        var purList = pojck.selectconbyzzpo(param);
        purList.success(function (data) {
            if(data.code==200){
                if(data.rst.items.length){
                    $scope.purList=data.rst.items;
                }else {
                    var par={ZZSDPO:ZZSDPO};
                    var pur2List = pojck.selectconbyzzsdpo(par);
                    pur2List.success(function (data) {
                        if(data.code==200){
                            $scope.purList=data.rst.items;
                        }else {
                            swal(data.msg,'','error');
                        }
                    })
                }
            }else {
                swal(data.msg,'','error');
            }
        })
        $("#purListBox").dialog({
            autoOpen: false,
            width: 400,
            modal: true,
            buttons: [{
                text: "关闭",
                class: "gray_bg",
                click: function () {
                    $(this).dialog("close");
                    $(".layer").hide();
                }
            }]
        });
        $("#purListBox").dialog("open");
    }
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = pojck.getpojckprocesslog({id: vm.purchaseList.EBELN,type:'ZD14',gettype:'group'}); // 直接取值数据中 申请人（proposer）
            processlog.success(function (data) {
                if (data.rst.length != 0) {
                    vm.processlog = data.rst;
                    vm.activeTab = type;
                } else {
                    swal('没有审批信息', '', 'warning');
                }
            });
        } else {
            vm.activeTab = type;
        }
    };
    // 审批记录 END
}]);

pojckApp.controller('pojckCtrl',['$scope','$stateParams','$state','pojckService',function($scope,$stateParams,$state,pojck){
    var ZZSDPO;
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
                processId: $stateParams.processId,
                nodeId: $stateParams.nodeId
            };
            if($stateParams.myflag == 'mysubscriber') {
                $.extend(param, {myflag: "mysubscriber" })
            }
            var viewPur = pojck.pojckdetail(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    ZZSDPO = data.rst.doc.model.ZZSDPO;
                    $scope.dataList = data.rst.doc.items;
                    $scope.doc = data.rst.doc;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;

                    var enumData = pojck.enumPurchase();
                    enumData.success(function(enumData) {
                        $scope.enumData=enumData.rst.enum;
                    }).error(function(error){
                        alert(error);
                    });
                    var pojckenum = pojck.pojckEnum();
                    pojckenum.success(function(data){
                        if(data.code = 200){
                           $scope.enumBUKRS = data.rst.enum.BUKRS;
                           $scope.enumBSART = data.rst.enum.BSART;
                           $scope.enumEKORG = data.rst.enum.EKORG;
                           $scope.enumEKGRP = data.rst.enum.EKGRP;
                           $scope.enumZZCP = data.rst.enum.ZZCP;
                           $scope.enumWAERS = data.rst.enum.WAERS;
                           $scope.enumZZJWCP = data.rst.enum.ZZJWCP;
                           $scope.enumMWSKZ = data.rst.enum.MWSKZ;
                        }
                    });
                    if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                        $scope.agreeBtn = true;
                        $scope.disagreeBtn = true;
                        $scope.cancelBtn = true;
                        $scope.textareaBtn = true;
                        $scope.ifPoheader = data.rst.nodeType == 'business_login' || data.rst.nodeType == 'business_manager' ?  true : false;  //商务 （商务经理）开放打印按钮
                    }
                    if (data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active') {
                        $scope.recallBtn = true;
                        $scope.textareaBtn = true;
                    }
                    if ($stateParams.myflag == 'mybegin') {
                        $scope.editBtn = true;
                        $scope.apCot = data.rst.processlog.length>1 ? true : false;
                        //$scope.apCot = false;
                    }
                }else {
                    alert(data.msg);
                }
            }).error(function (error) {
                alert(error);
            });
        }
    };
    $scope.viewPurchase1 = function(){
        $("#chsBox").dialog({
            autoOpen: false,
            width: 400,
            modal: true,
            buttons: [{
                text: "关闭",
                class: "gray_bg",
                click: function () {
                    $(this).dialog("close");
                    $(".layer").hide();
                }
            }]
        });
        $("#chsBox").dialog("open");

        var param = {page: 1, limit: 9999, processId: $stateParams.processId, nodeId: $stateParams.nodeId};
        var viewPur = pojck.pojckdetail(param);
        viewPur.success(function (data) {
            if (data.code == 200) {
                $scope.cgList = [];
                var rep = {};
                data.rst.doc.items.forEach(function(item){    //去重
                    if(item.BANFN != ""){
                        if(!rep[item.BANFN]){
                            rep[item.BANFN] = true;
                            return $scope.cgList.push(item);
                        }
                    }
                });
            }else {
                alert(data.msg);
            }
        })
    }
    $scope.contractdetails = function(e,ZZPO){
        if(ZZPO == ""){
            swal('未找到关联的合同','','warning');
            return false;
        }else{
            var getcontractbysupplierorderid = pojck.getskbysalesorderidorsupplierorderid({supplierorderid:ZZPO,salesorderid:ZZSDPO});
            getcontractbysupplierorderid.success(function(data){
                if(data.code == 200){
                    if(data.rst.data.length == 0){
                        swal({
                            title:'',
                            text:'该采购订单号没有对应的销售详情',
                            type:'warning'
                        });
                        return false;
                    }else{
                        var id = data.rst.data[0]._id;
                        if(data.rst.data[0].contractbase.classification == '0'){
                            $state.go('contractOrderView',{id:id});
                            // $(e.target).attr('href','index.html#/contractOrderView?id='+id);
                        }else if(data.rst.data[0].contractbase.classification == '1'){
                            $state.go('iecontractView',{id:id});
                            // $(e.target).attr('href','index.html#/iecontractView?id='+id);
                        }else if(data.rst.data[0].contractbase.classification == '2'){
                            $state.go('loanBillView',{id:id});
                            // $(e.target).attr('href','index.html#/loanBillView?id='+id);
                        }
                    }
                }else{
                    swal(data.msg,'','error');
                }
            });
        }

    }
    var applyObj = $scope.applyObj = {};
    $scope.applySave = function(){
        var param = {};
        delete  $scope.doc.items;
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = pojck.pojckSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function () {
        $scope.applyFn = function(selIndex){
            var param = {};
            param.doc = $scope.doc;
            param.comment = applyObj.applyIdea;
            param.processId = $stateParams.processId;
            param.nodeId = $stateParams.nodeId;
            param.candidates = $scope.candidates;
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            var applyAgree = pojck.pojckAgree(param);
            applyAgree.success(function (data) {
                if (data.code == 200) {
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回采购订单待办",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14';
                    });
                } else {
                    swal("提交失败！", '', "error");
                }
            }).error(function (error) {
                alert(error);
            });
        }
        // console.log($scope.candidates.length)
        // console.log($scope.candidates[0].receivers.length)
        // console.log($scope.candidates[0].coop)
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or'&& $scope.candidates[0].coop !=='and')){
            $scope.receivers = $scope.candidates[0].receivers;
            $("#approversDialog").dialog({
                autoOpen: false,
                modal: true,
                width: 500
            });
            $("#approversDialog").dialog("open");
        } else {
            $scope.applyFn(-1);
        }
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        var disagree = pojck.pojckDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购订单待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyCancel = function () {//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        var cancel = pojck.pojckCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购订单待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14'; });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyRecall = function () {//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = pojck.pojckRecall(param);
        recall.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "召回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/index';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    var idx = 1;
    $scope.show=function(){
        if(idx == 1){
            $scope.emerge=true;
            idx = 2;
        }else{
            $scope.emerge=false;
            idx = 1;
        }

    }
}]);

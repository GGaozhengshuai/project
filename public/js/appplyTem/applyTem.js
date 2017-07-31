var applyApp = angular.module('applyApp', ['pageDirectives', 'formDirectives']);
applyApp.service('applyServices', function ($http) {
    var service = {//采购申请
        purchase: function (param) {
            return $http.post('/purchase/detail', param, {cache: false});
        },
        purchaseSave: function (param) {//同意
            return $http.post('/purchase/save', param, {cache: false});
        },
        agree: function (param) {//同意
            return $http.post('/purchase/agree', param, {cache: false});
        },
        disagree: function (param) {//驳回
            return $http.post('/purchase/disagree', param, {cache: false});
        },
        cancel: function (param) {//取消
            return $http.post('/purchase/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/purchase/recall', param, {cache: false});
        },
        purchasefd: function (param) {//采购返点
            return $http.post('/purchasefd/detail', param, {cache: false});
        },
        purchasefdSave: function (param) {//同意
            return $http.post('/purchasefd/save', param, {cache: false});
        },
        purchasefdAgree: function (param) {//同意
            return $http.post('/purchasefd/agree', param, {cache: false});
        },
        purchasefdDisagree: function (param) {//驳回
            return $http.post('/purchasefd/disagree', param, {cache: false});
        },
        purchasefdCancel: function (param) {//取消
            return $http.post('/purchasefd/cancel', param, {cache: false});
        },
        purchasefdRecall: function (param) {//召回
            return $http.post('/purchasefd/recall', param, {cache: false});
        },//内部订单
        interiorSave: function (param) {//保存
            return $http.post('/interiorbills/save', param, {cache: false});
        },
        interiorbills: function (param) {
            return $http.post('/interiorbills/detail', param, {cache: false});
        },
        interiorAgree: function (param) {//同意
            return $http.post('/interiorbills/agree', param, {cache: false});
        },
        interiorDisagree: function (param) {//驳回
            return $http.post('/interiorbills/disagree', param, {cache: false});
        },
        interiorCancel: function (param) {//取消
            return $http.post('/interiorbills/cancel', param, {cache: false});
        },
        interiorRecall: function (param) {//召回
            return $http.post('/interiorbills/recall', param, {cache: false});
        },//框架合同
        kjpo: function (param) {
            return $http.post('/kjpo/detail', param, {cache: false});
        },
        kjpoSave: function (param) {//保存
            return $http.post('/kjpo/save', param, {cache: false});
        },
        kjpoAgree: function (param) {//同意
            return $http.post('/kjpo/agree', param, {cache: false});
        },
        kjpoDisagree: function (param) {//驳回
            return $http.post('/kjpo/disagree', param, {cache: false});
        },
        kjpoCancel: function (param) {//取消
            return $http.post('/kjpo/cancel', param, {cache: false});
        },
        kjpoRecall: function (param) {//召回
            return $http.post('/kjpo/recall', param, {cache: false});
        },//采购订单
        poheader: function (param) {
            return $http.post('/poheader/detail', param, {cache: false});
        },
        poheaderSave: function (param) {//保存
            return $http.post('/poheader/save', param, {cache: false});
        },
        poheaderAgree: function (param) {//同意
            return $http.post('/poheader/agree', param, {cache: false});
        },
        poheaderDisagree: function (param) {//驳回
            return $http.post('/poheader/disagree', param, {cache: false});
        },
        poheaderCancel: function (param) {//取消
            return $http.post('/poheader/cancel', param, {cache: false});
        },
        poheaderRecall: function (param) {//召回
            return $http.post('/poheader/recall', param, {cache: false});
        },//维修采购
        wxpoSave: function (param) {//同意
            return $http.post('/wxpo/save', param, {cache: false});
        },
        wxpo: function (param) {
            return $http.post('/wxpo/detail', param, {cache: false});
        },
        wxpoAgree: function (param) {//同意
            return $http.post('/wxpo/agree', param, {cache: false});
        },
        wxpoDisagree: function (param) {//驳回
            return $http.post('/wxpo/disagree', param, {cache: false});
        },
        wxpoCancel: function (param) {//取消
            return $http.post('/wxpo/cancel', param, {cache: false});
        },
        wxpoRecall: function (param) {//召回
            return $http.post('/wxpo/recall', param, {cache: false});
        },//库存调整
        stock: function (param) {
            return $http.post('/stock/detail', param, {cache: false});
        },
        stockSave: function (param) {//同意
            return $http.post('/stock/save', param, {cache: false});
        },
        stockAgree: function (param) {//同意
            return $http.post('/stock/agree', param, {cache: false});
        },
        stockDisagree: function (param) {//驳回
            return $http.post('/stock/disagree', param, {cache: false});
        },
        stockCancel: function (param) {//取消
            return $http.post('/stock/cancel', param, {cache: false});
        },
        stockRecall: function (param) {//召回
            return $http.post('/stock/recall', param, {cache: false});
        },
        enumPurchase: function(param) { // 枚举接口
            return $http.post('/purchase/enumlist',param ,{cache:true});
        },
        enumpur: function(param) { // 枚举接口
            return $http.post('/stock/enum',param ,{cache:true});
        },
        wxpoEnum: function(param) { // 枚举接口
            return $http.post('/wxpo/enumlist',param ,{cache:true});
        },
        purchaseSave : function(param){
            return $http.post('/purchase/save',param ,{cache:false});
        },
        purchaseCreateprocess : function(param){
            return $http.post('/purchase/createprocess',param ,{cache:false});
        },
        enumCGKJHT: function(param) { // 采购框架合同
            return $http.post('/kjpo/enumlist',param ,{cache:true});
        },
        enumcgdd :function(param){
            return $http.post('/poheader/enumlist',param,{cache:true});
        },
        getskbysalesorderidorsupplierorderid :function(param){
            return $http.post('/credit/getskbysalesorderidorsupplierorderid',param,{cache:true});
        },
        costcenter : function(param){
            return $http.post('/enuminterface/costcenter',param,{cache:false});
        },
        // 获取枚举 费用申请单成本中心、种类
        enumlist : function(param){
            return $http.post('/enuminterface/enumlist',param,{cache:false});
        },
        details:function(param){
            return $http.post('/interiorbills/details',param,{cache:false});
        },
        interiorbillscancel: function(param){
            return $http.post('/interiorbillscancel/recall',param,{cache:false});
        },
        insideDel : function(param){      //查询是否可以作废
            return $http.post('/interiorbillscancel/docheck',param,{cache:false});
        }
    };
    return service;
});
//库存调整
applyApp.controller('applyStockCtrl', ['$scope', '$stateParams', 'applyServices', function ($scope, $stateParams, apply) {
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            if($stateParams.type == 'A4' || $stateParams.type == 'A5') {
                var param = {
                    page: 1,
                    limit: 9999,
                    processId: $stateParams.processId,
                    nodeId: $stateParams.nodeId
                };
            } else {
                var param = {
                    page: $scope.paginationConf.currentPage,
                    limit: $scope.paginationConf.itemsPerPage,
                    processId: $stateParams.processId,
                    nodeId: $stateParams.nodeId
                };
            }
            if($stateParams.myflag == 'mysubscriber') {
                $.extend(param, {myflag: "mysubscriber" })
            }
            var viewPur = apply.stock(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    $scope.dataList = data.rst.doc.items; //行项目
                    if (data.rst.doc.model.ZTYPE == 'A4') {//产品组装拆卸
                        $scope.storeType2 = true;
                    } else if (data.rst.doc.model.ZTYPE == 'A5') {//产品拆箱
                        $scope.storeType3 = true;
                    } else {
                        $scope.storeType = true;
                    }
                    if(data.rst.doc.model.ZTYPE == 'A1'){
                        $scope.transportation=true;
                    }else{
                        $scope.transportation=false;
                    }
                    var enumData = apply.enumpur();
                    enumData.success(function(data) {
                        $scope.ENUMOBJ = data.rst.data.enum;
                        if ($scope.purchaseList.LGORT){
                            var type = getField(data.rst.data.enum.LGORT,'code', $scope.purchaseList.LGORT);
                            $scope.LGORT = type.name;
                        }

                        if($scope.purchaseList.ZSTATUS){
                            var type = getField(data.rst.data.enum.ZSTATUS,'code',$scope.purchaseList.ZSTATUS);
                            $scope.ZSTATUS = type.name;
                        }
                        if($scope.purchaseList.CDEPT){
                            var type = getField(data.rst.data.enum.CDEPT,'code',$scope.purchaseList.CDEPT);
                            $scope.CDEPT = type.name;
                        }
                        $scope.enumObj(data.rst.data.enum.LGORT);
                        $scope.enumObj(data.rst.data.enum.MEINS);
                        $scope.enumObj(data.rst.data.enum.ZUMEINS);
                    }).error(function(error){
                        alert(error);
                    });
                    $scope.businessType = {
                        'A1':'跨仓库调拨',
                        'A2':'仓库内转移',
                        'A3':'仓库产品报废',
                        'A4':'产品组装拆卸',
                        'A5':'产品拆箱',
                        'A6':'销售退货库存转移',
                        'A7':'内部部门领用申请',
                        'A8':'内部领用发货到资产时'
                    }
                    if ($scope.purchaseList.YSFS == 'HK') {
                        $scope.purchaseList.YSFS = '空运';
                    }else if($scope.purchaseList.YSFS == 'QY'){
                        $scope.purchaseList.YSFS = '汽运';
                    }else if($scope.purchaseList.YSFS == 'KD'){
                        $scope.purchaseList.YSFS = '快递';
                    }else if($scope.purchaseList.YSFS == 'NB'){
                        $scope.purchaseList.YSFS = '仓库内移动';
                    }
                    $scope.doc = data.rst.doc;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;
                    if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                        $scope.agreeBtn = true;
                        $scope.disagreeBtn = true;
                        $scope.cancelBtn = true;
                        $scope.textareaBtn = true;
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


    var temp = {};
    $scope.enumObj = function(obj){
        if(!obj) return false;
        obj.forEach(function(i){
            temp[i.code] = i.name;
        });
        $scope.objenum = temp;
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

        var addInside = apply.stockSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function () {
        var param = {};
        delete  $scope.doc.items;
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
        var applyAgree = apply.stockAgree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回库存调整待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=库存调整&&controllercode=ZD07,ZD08,ZD09,ZD10,ZD11';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.stockDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回库存调整待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=库存调整&&controllercode=ZD07,ZD08,ZD09,ZD10,ZD11';
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
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.stockCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回库存调整待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=库存调整&&controllercode=ZD07,ZD08,ZD09,ZD10,ZD11';
                });
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
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = apply.stockRecall(param);
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
}]);


//维修采购
applyApp.controller('applyWxpoCtrl', ['$scope', '$stateParams', 'applyServices', function ($scope, $stateParams, apply) {
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
            var viewPur = apply.wxpo(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    $scope.doc = data.rst.doc;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;
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
                    var wxcg = apply.wxpoEnum();
                    wxcg.success(function(data){
                        if(data.code == 200){
                            $scope.enumObj = data.rst.enum;
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
                    swal(data.msg, '', 'warning');
                }
            }).error(function (error) {
                alert(error);
            });
        }
    };
    //查看采购申请
    $scope.viewpurchase1 = function(){
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
        var viewPur = apply.wxpo(param);
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
                swal(data.msg, '', 'warning');
            }
        })
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

        var addInside = apply.wxpoSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function () {
        // 提交
        $scope.applyFn = function (selIndex) {
            var param = {};
            delete  $scope.doc.items;
            param.doc = $scope.doc;
            param.comment = applyObj.applyIdea;
            param.nodeId = $stateParams.nodeId;
            param.processId = $stateParams.processId;
            param.candidates = $scope.candidates;
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
            var applyAgree = apply.wxpoAgree(param);
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
                        // window.location.href = '/index.html#/index';
	                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14';
                    });
                } else {
                    swal("提交失败！", '', "error");
                }
            }).error(function (error) {
                alert(error);
            });
        };
        if ($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
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
    };
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.wxpoDisagree(param);
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
                    // window.location.href = '/index.html#/index';
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
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.wxpoCancel(param);
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
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14';
                });
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
        var recall = apply.wxpoRecall(param);
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
}]);
//采购订单
applyApp.controller('applyPoheaderCtrl', ['$scope', '$stateParams','$state', 'applyServices', function ($scope, $stateParams,$state,apply) {
    var ZZSDPO;   // 获取销售订单号
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
            var viewPur = apply.poheader(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    ZZSDPO = data.rst.doc.model.ZZSDPO;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;
                    $scope.doc = data.rst.doc;

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

                    /*var param1 = {processId: $stateParams.processId,nodeId: $stateParams.nodeId};
                    var viewPur1 = apply.poheader(param1);
                    viewPur1.success(function (data) {
                        if(data.code == 200){
                            $scope.doc = data.rst.doc;
                            delete  $scope.doc.items;
                        }
                    });*/
                }else {
                    alert(data.msg);
                }
            }).error(function (error) {
                alert(error);
            });
        }
    };
    //查看采购申请
    $scope.viewpurchase = function(){
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

        var param = {page: 1, limit: 9999, processId: $stateParams.processId, nodeId: $stateParams.nodeId,myflag: "mysubscriber"};
        var viewPur = apply.poheader(param);
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
    var fdenum = apply.enumcgdd();
    fdenum.success(function(data){
        $scope.enumobj = data.rst.enum;
    });
    $scope.contractdetails = function(e,ZZPO){
        if(ZZPO == ""){
            swal('未找到关联的合同','','warning');
            return false;
        }else{
            var getcontractbysupplierorderid = apply.getskbysalesorderidorsupplierorderid({supplierorderid:ZZPO,salesorderid:ZZSDPO});
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

        var addInside = apply.poheaderSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function () {
        // 提交
        $scope.applyFn = function (selIndex) {
            var param = {};
            delete  $scope.doc.items;
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
            //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
            var applyAgree = apply.poheaderAgree(param);
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
                        // window.location.href = '/index.html#/index';
	                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14';
                    });
                } else {
                    swal("提交失败！", '', "error");
                }
            }).error(function (error) {
                alert(error);
            });
        };
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop !=='or' && $scope.candidates[0].coop !=='and')){
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
    };
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        var disagree = apply.poheaderDisagree(param);
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
                    // window.location.href = '/index.html#/index';
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
        var cancel = apply.poheaderCancel(param);
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
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购订单&&controllercode=ZD02,ZD12,ZD14';
                });
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
        var recall = apply.poheaderRecall(param);
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
}]);


//框架合同
applyApp.controller('applyKjpoCtrl', ['$scope', '$stateParams', 'applyServices', function ($scope, $stateParams, apply) {
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
            var viewPur = apply.kjpo(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    $scope.doc = data.rst.doc;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;
                    if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                        $scope.agreeBtn = true;
                        $scope.disagreeBtn = true;
                        $scope.cancelBtn = true;
                        $scope.textareaBtn = true;
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
                    var kjpo = apply.enumCGKJHT();
                    kjpo.success(function(data){
                        $scope.enumMATKL = data.rst.enum.MATKL;
                        $scope.enumLGORT = data.rst.enum.LGORT;
                    });
                }else {
                    alert(data.msg);
                }
            }).error(function (error) {
                alert(error);
            });
        }
    };
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

        var addInside = apply.kjpoSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function () {
        var param = {};
        delete  $scope.doc.items;
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
        var applyAgree = apply.kjpoAgree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回框架合同待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=框架合同&&controllercode=ZD03';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.kjpoDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回框架合同待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=框架合同&&controllercode=ZD03';
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
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.kjpoCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回框架合同待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=框架合同&&controllercode=ZD03';
                });
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
        var recall = apply.kjpoRecall(param);
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
}]);
//采购返点
applyApp.controller('applyPurchasefdCtrl', ['$scope', '$stateParams', 'applyServices', function ($scope, $stateParams, apply) {

    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = apply.purchasefd(param);
    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.purchaseList = data.rst.doc.model;//基本信息
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            console.log($stateParams.myflag);
            if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
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
            if($scope.purchaseList.ZOPERATION == 'I'){
                $scope.ZOPERATION = '新增';
            }else if($scope.purchaseList.ZOPERATION == 'U'){
                $scope.ZOPERATION = '修改';
            }else if($scope.purchaseList.ZOPERATION == 'D'){
                $scope.ZOPERATION = '作废';
            }
        }else {
            alert(data.msg);
        }
    }).error(function (error) {
        alert(error);
    });
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

        var addInside = apply.purchasefdSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function () {
        var param = {};
        delete  $scope.doc.items;
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
        var applyAgree = apply.purchasefdAgree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购返点待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购返点&&controllercode=ZD04';
                });
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
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.purchasefdDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购返点待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购返点&&controllercode=ZD04';
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
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.purchasefdCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购返点待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购返点&&controllercode=ZD04';
                });
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
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        var recall = apply.purchasefdRecall(param);
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

}]);
//采购申请
applyApp.controller('applyPurchaseCtrl', ['$scope', '$stateParams', 'applyServices', 'messageAppServe', function ($scope, $stateParams, apply, message) {
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
            var viewPur = apply.purchase(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    $scope.doc = data.rst.doc;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = $stateParams.nodeId;
                    var enumData = apply.enumPurchase(param);
                    enumData.success(function(data) {
                        $scope.enumBSART=data.rst.enum.BSART;
                        $scope.enumEKGRP =data.rst.enum.EKGRP;
                        $scope.enumZZCP = data.rst.enum.ZZCP;
                        $scope.enumMATKL = data.rst.enum.MATKL;
                        $scope.enumMEINS = data.rst.enum.MEINS;
                        $scope.enumWAERS = data.rst.enum.WAERS;
                        $scope.enumZMWSKZ = data.rst.enum.ZMWSKZ;
                        $scope.enumObj = data.rst.enum;
                    }).error(function(error){
                        alert(error);
                    });
                    if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                        $scope.agreeBtn = true;
                        $scope.disagreeBtn = true;
                        $scope.cancelBtn = true;
                        $scope.textareaBtn = true;
                    }
                    if (data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active') {
                        //if(data.rst.doc.model.ZFLAG_RL == 'X'){
                            $scope.recallBtn = true;
                            $scope.textareaBtn = true;
                        //}
                    }
                    if ($stateParams.myflag == 'mybegin') {
                        //if(data.rst.doc.model.ZFLAG_RL == 'X'){
                            $scope.editBtn = true;
                        //}
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

        var addInside = apply.purchaseSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };

    $scope.applyAgree = function () {
        var param = {};
        delete  $scope.doc.items;
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.candidates = $scope.candidates;
        //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
        var applyAgree = apply.agree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购申请待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购申请&&controllercode=ZD01,ZD15';
                });
                // 发送消息
                if((data.rst != null || data.rst.length >0) && data.rst.status === 'done') {
                  var _comment = $scope.purchaseList.comment != '' && $scope.purchaseList.comment != undefined ? "，提前下单原因：" + $scope.purchaseList.comment : "";
                  var _title = "审批完成-采购申请号：" + $scope.purchaseList.BANFN + "," + "供应商订单号："+ $scope.purchaseList.ZZPO +"，项目名称：" + $scope.purchaseList.ZZXM + _comment;
                  var msg = {
                    ntype: 'system',
                    title: _title,
                    content: " ",
                    receivers: $scope.purchaseList.ERNAM,
                    sendtype: "listcast"
                  };
                  sendMessage(message, msg, function(result){
                    console.log(result);
                  });
                }
                // 发送消息 END
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购申请待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购申请&&controllercode=ZD01,ZD15';
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
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.cancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回采购申请待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=采购申请&&controllercode=ZD01,ZD15';
                });
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
        var recall = apply.recall(param);
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
}]);
//采购申请编辑
applyApp.controller('PurchaseEditCtrl',['$scope','$stateParams','applyServices',function($scope, $stateParams, apply){
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
            var viewPur = apply.purchase(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
                    $scope.doc = data.rst.doc;
                    $scope.candidates = data.rst.candidates;
                    $scope.processlog = data.rst.processlog;
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = $stateParams.nodeId;
                    var enumData = apply.enumPurchase(param);
                    enumData.success(function(data) {
                        $scope.enumBSART=data.rst.enum.BSART;
                        $scope.enumEKGRP =data.rst.enum.EKGRP;
                        $scope.enumZZCP = data.rst.enum.ZZCP;
                        $scope.enumMATKL = data.rst.enum.MATKL;
                        $scope.enumMEINS = data.rst.enum.MEINS;
                        $scope.enumWAERS = data.rst.enum.WAERS;
                    }).error(function(error){
                        alert(error);
                    });
                    if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                        $scope.agreeBtn = true;
                        $scope.disagreeBtn = true;
                        $scope.cancelBtn = true;
                        $scope.textareaBtn = true;
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
    $scope.addData = function(data,statue){
        var arr=$scope.dataList;
        var param={doc:{model:data,items:arr},processId:$scope.processId,nodeId:$scope.nodeId}
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.doc.model.task = 'neo';

        if(statue == "save"){
            var addInside = apply.purchaseSave(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            //addParam.processId = data.rst.processId;
            //addParam.candidates = data.rst.candidates;
            var applyAdd = apply.purchaseCreateprocess(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/purchaseList';
                    });
                    //swal("提交成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }
    }
}]);
//费用申请单
applyApp.controller('applyInteriorbillsCtrl', ['$scope', '$stateParams', 'applyServices', function ($scope, $stateParams, apply) {
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var enumlist = apply.enumlist({enums:['costcenter','fysqdcosttype']});
    enumlist.success(function(data){
        $scope.costcenterSel = data.data.costcenter;
        $scope.categorySel = data.data.fysqdcosttype; // 费用种类
    });
    var applyView = apply.interiorbills(param);
    applyView.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.purchaseList = data.rst.doc.model;
            $scope.itemsList = data.rst.doc.items;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;

            $scope.NBDDZF = data.rst.property.type == 'NBDDZF' ? true : false;
            if ($scope.purchaseList.AUART) {
                //var type = getField(data.rst.doc.enum, 'code', $scope.purchaseList.AUART);
                //$scope.AUART = type ? type.name : $scope.purchaseList.AUART;
                //2016-7-19 自己翻译
                var auartTxt = {ZJ01: '市场费用', ZJ02: '直接运营费用',ZJ03:'项目前期费用', ZJ99:'间接运营费用'};
                $scope.AUART = auartTxt[$scope.purchaseList.AUART];
            }
            //成本中心
            /*var costcenter = apply.costcenter();
            costcenter.success(function(data){
                $scope.costcenterSel = data;
            });*/

            var details = apply.details({'AUFNR':$scope.purchaseList.AUFNR});   //查询费用使用详情
            details.success(function(data){
                if(data.code == 200){
                    $scope.DontuseMoney = data.rst;
                }
            });

            if(data.rst.doc.model.ZZJYSJE){
                $scope.dataInside = true;
                $scope.dataWater = true;
               // $scope.nbddLable = false;
                $scope.zzjefalse = false;
                $scope.zzjetrue = true;
                if($scope.purchaseList.USER3.indexOf('{') > -1 || $scope.purchaseList.USER3.indexOf('}') > -1){
                    $scope.purchaseList.USER3 = eval('('+ $scope.purchaseList.USER3 +')');
                }else{
                    $scope.purchaseList.USER3 = {
                        describe : $scope.purchaseList.USER3,
                        instructions : $scope.purchaseList.USER3
                    }
                }
            }else{
                $scope.dataInside = false;
                $scope.dataWater = false;
               // $scope.nbddLable = true;
                $scope.zzjefalse = true;
                $scope.zzjetrue = false;
            }
            if (data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing') {
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
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


            var temp = {};
            data.rst.doc.enum.BUKRS.forEach(function(i){
                temp[i.code] = i.name;
            });
            $scope.BUKRS = temp;
        }else {
            alert(data.msg);
        }
    }).error(function (error) {
        alert(error);
    });
    $scope.applySave = function(){
        var param = {},USER3 ={};
        if($scope.purchaseList.ZZJYSJE){
            USER3.USER3 = JSON.stringify($scope.purchaseList.USER3);
            param.doc = $scope.doc.model;
            $.extend(true, param.doc,USER3);
        }else{
            param.doc = $scope.doc.model;
        }

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = apply.interiorSave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    var applyObj = $scope.applyObj = {};
    $scope.applyAgree = function (applyObj) {
        var param = {};
        if($scope.purchaseList.ZZJYSJE){    //判断追加预算金额是否有值
            $scope.doc.model.USER3 = JSON.stringify($scope.purchaseList.USER3);
        }
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        var applyAgree = apply.interiorAgree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回费用申请单待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=费用申请单&&controllercode=NBDD,NBDDZF';
                });
            }else{
                swal({
                    title:'',
                    text:data.msg,
                    type:'error'
                })
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        ;
        var disagree = apply.interiorDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回费用申请单待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=费用申请单&&controllercode=NBDD,NBDDZF';
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
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        var cancel = apply.interiorCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回费用申请单待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=费用申请单&&controllercode=NBDD,NBDDZF';
                });
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
        if($scope.NBDDZF == true){     //作废单独写了一个召回接口
            var recall = apply.interiorbillscancel(param);
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
            })
        }else{
            var recall = apply.interiorRecall(param);
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

    }
}]);


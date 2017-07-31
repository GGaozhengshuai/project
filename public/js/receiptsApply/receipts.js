var receiptsApp = angular.module('receiptsApp', ['pageDirectives','formDirectives']);
receiptsApp.service('receiptService',function($http){
    var service={
        listreceipts: function(param) {
            return $http.post('/billapply/list',param ,{cache:false});
        },
        viewreceipts: function(param) {
            return $http.post('/billapply/view',param ,{cache:true});
        },
        addreceipts: function(param){
            return $http.post('/billapply/save',param ,{cache:false});
        },
        updatereceipts: function(param){
            return $http.post('/billapply/update',param ,{cache:false});
        },
        receiptsAdd: function(param){
            return $http.post('/billapply/createprocess',param ,{cache:false});
        },
        selectporeceipts: function(param){
            return $http.post('/billapply/selectpo',param ,{cache:false});
        },//审批接口
        applyView: function(param) {
            return $http.post('/billapply/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/billapply/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/billapply/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/billapply/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/billapply/recall',param ,{cache:false});
        },
        selectddje : function(param){
            return $http.post('/billapply/selectddje',param,{cache:false});
        },
        checkprocess : function(param){
            return $http.post('/billapply/checkprocess',param,{cache:false});
        },
        getprocesslog: function(param) {
            return $http.post('/billapply/getprocesslog',param,{cache:false});
        }
    }
    return service;
});
receiptsApp.controller('newreceiptsCtrl',['$scope','$stateParams','receiptService',function($scope,$stateParams,receipt){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = receipt.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.purchaseList = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.comeList = data.rst.doc.items;
            $scope.comeList.forEach(function(item){
                if(item.ZKZFHJE && item.YDDJE){
                    $scope.Ifshow = true;
                }else{
                    $scope.Ifshow = false;
                }
            });
            if(data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
            }
            if(data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active'){
                $scope.recallBtn = true;
                $scope.textareaBtn = true;
            }
            if($stateParams.myflag == 'mybegin'){
                $scope.editBtn = true;
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
            }

            var type = data.rst.doc.model.ZSFYH;
            if(type=="是"){
                $scope.billType = true;
            }else{
                $scope.billType = true;
            }
        }

    }).error(function(error){
        alert(error);
    });

    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.items = $scope.doc.items;
        param.doc = $scope.doc.model;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = receipt.addreceipts(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;

        var applyAgree = receipt.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回到单申请待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=到单申请&&controllercode=DDSQ'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = receipt.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回到单申请待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=到单申请&&controllercode=DDSQ'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = receipt.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回到单申请待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=到单申请&&controllercode=DDSQ'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = receipt.recall(param);
        recall.success(function(data){
            if(data.code == 200){
                swal({
                    title: "召回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function(){  window.location.href='/index.html#/index'; });
            }else {
                swal(data.msg, '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }

}]);

receiptsApp.controller('receiptsCtrl',['$scope','$stateParams','$state','receiptService',function($scope,$stateParams,$state,receipt){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, ZDDAT: $scope.ZDDAT, ZSFYH: $scope.ZSFYH, ZSQNO: $scope.ZSQNO,ZCRNAM:$scope.ZCRNAM,EBELN:$scope.EBELN,ZDDJE:$scope.ZDDJE};
            var customerPromise = receipt.listreceipts(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.ifChange = function(ZSQNO){
        var checkprocess = receipt.checkprocess({ZSQNO:ZSQNO});
        checkprocess.success(function(data){
            if(data.code == 200){
                $state.go('receiptsChange',{ZSQNO:ZSQNO});
            }else{
                swal(data.msg,'','warning');
            }
        });
    }
}]);
receiptsApp.controller('receiptsViewCtrl',['$scope','$stateParams','receiptService',function($scope,$stateParams,receipt){
    var ORDER_DATA = {};
    var viewCont = receipt.viewreceipts({sapid:$stateParams.id});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.comeList = data.rst.data.items;

        var type = data.rst.data.model.ZSFYH;
        if(type=="是"){
            $scope.billType = true;
        }else{
            $scope.billType = false;
        }

    });
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = receipt.getprocesslog({type: 'DDSQ', id: vm.ORDER_DATA.ZSQNO}); // 需确认
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
receiptsApp.controller('receiptsChangeCtrl',['$scope','$stateParams','$state','receiptService',function($scope,$stateParams,$state,receipt){
    var ZDDJEArr = [];    //存储原始金额
    var viewCont = receipt.viewreceipts({sapid:$stateParams.ZSQNO});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.comeList = data.rst.data.items;
        for(var x in $scope.comeList){
            ZDDJEArr.push($scope.comeList[x].ZDDJE);
        }
        var type = data.rst.data.model.ZSFYH;
        if(type=="是"){
            $scope.billType = true;
            $scope.cfDateDis = true;
        }else{
            $scope.billType = true;
            $scope.cfDateDis = false;
        }
    });
    $scope.typeChange = function(type){
        if(type=="是"){
            $scope.billType = true;
            $scope.ORDER_DATA.ZCFDAT = '';
            $scope.ORDER_DATA.ZYHQX = '';
            $scope.cfDateDis = true;
        }else{
            $scope.billType = true;
            $scope.cfDateDis = false;;
        }
    }
    $scope.watchDate = function(){
        $scope.$watch('ORDER_DATA.ZDDAT',function(newValue,oldValue,scope){
            if(newValue != oldValue){
                $scope.ORDER_DATA.ZYHQX = '';
                $scope.ORDER_DATA.ZCFDAT = '';
            }
        });
    }
    $scope.Date=function(data,days){//计算日期
        var nd = new Date(data);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;

        $scope.ORDER_DATA.ZCFDAT=result;
        if(days==null){
            $scope.ORDER_DATA.ZCFDAT="";
        }
        return  $scope.ORDER_DATA.ZCFDAT;
    };
    $scope.bgddje = function(idx,ZDDJE){
        for(var x in ZDDJEArr){
            if(x == idx){
                if(ZDDJE <= 0){
                    swal({
                        title:'到单金额必须大于0,小于原始到单金额',
                        text:'标注:输入错误信息时，会恢复原始到单金额',
                        type:'warning'
                    })
                    $scope.comeList.forEach(function(item){
                        return item.ZDDJE = ZDDJEArr[x];
                    });
                }
                if(ZDDJE > ZDDJEArr[x]){
                    swal({
                      title:'到单金额必须大于0,小于原始到单金额',
                      text:'标注:输入错误信息时，会恢复原始到单金额',
                      type:'warning'
                    })
                    $scope.comeList.forEach(function(item){
                        return item.ZDDJE = ZDDJEArr[x];
                    });
                }
            }
        }
    }

    var cgindex = 0;
    $scope.purchase=function(index){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        cgindex = index;
    }
    $scope.cusSelect = function(EBELN,ZFKFS,ZKZFH,ZFKLX,ZKZFHJE,YDDJE){
        for(var x in $scope.comeList){
            if($scope.comeList[x].EBELN == EBELN){
                swal('不能关联相同的采购订单号!','','warning');
                $( "#cusBox" ).dialog("destroy");
                $(".ui-dialog").remove();
                return false;
            }
        }
        var tr = $("#listTable").find(".list").eq(cgindex);
        tr.find("input:eq(0)").val(EBELN).trigger('change');
        tr.find("input:eq(1)").val(ZFKFS).trigger('change');
        tr.find("input:eq(2)").val(ZKZFH).trigger('change');
        tr.find("input:eq(3)").val(ZFKLX).trigger('change');
        tr.find("input:eq(4)").val(ZKZFHJE).trigger('change');
        tr.find("input:eq(5)").val(YDDJE).trigger('change');
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }


    $scope.addData = function(data,statue){
        var param = {};
        var addParam = {};
        addParam.doc = data;
        param.doc = data;
        param.items = $scope.comeList;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(statue == "save"){
            var addInside = receipt.addreceipts(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                    //swal({title: "保存成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/receipts'; });
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                //addParam.processId = data.rst.processId;
                //addParam.candidates = data.rst.candidates;
                var applyAdd = receipt.receiptsAdd(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/receipts'; });
                    }else {
                        alert(data.msg);
                    }
                });
            };
            var addInside = receipt.addreceipts(param);
            addInside.success(function(data){
                if(data.code == 200){
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' || data.rst.candidates[0].coop!=='and')) {
                        $scope.receivers = data.rst.candidates[0].receivers;
                        param.candidates = data.rst.candidates;
                        $("#approversDialog").dialog({
                            autoOpen: false,
                            modal: true,
                            width: 500
                        });
                        $("#approversDialog").dialog("open");
                    } else {
                        $scope.applyFn(-1);
                    }
                }else {
                    swal(data.msg, '', 'warning');
                }
            });
        }
    }
}]);
receiptsApp.controller('receiptsEditCtrl',['$scope','$stateParams','receiptService',function($scope,$stateParams,receipt){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = receipt.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.comeList = data.rst.doc.items;
            var type = data.rst.doc.model.ZSFYH;
            if(type=="是"){
                $scope.billType = true;
                $scope.cfDateDis = true;
            }else{
                $scope.billType = true;
                $scope.cfDateDis = false;
            }

            $scope.typeChange = function(type){
                if(type=="是"){
                    $scope.billType = true;
                    $scope.cfDateDis = true;
                }else{
                    $scope.billType = true;
                    $scope.cfDateDis = false;
                }
            }
        }
    }).error(function(error){
        alert(error);
    });


    var comeList = $scope.comeList =[{EBELN:'', ZFKFS:'', ZKZFH:'', ZFKLX:'', ZDDJE:'', ZSFYS:''}];
    $scope.comeAdd = function(type){
        if(type == 'items'){
            var obj= {EBELN:'', ZFKFS:'', ZKZFH:'', ZFKLX:'', ZDDJE:'', ZSFYS:''};
            $scope.comeList.push(obj);
        }
    }

    $scope.comeDel = function(idx, type){
        if(type == 'items'){
            $scope.comeList.splice(idx,1);
        }

    }

    var cgindex = 0;
    $scope.purchase=function(index){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        cgindex = index;
    }
    $scope.cusSelect = function(EBELN,ZFKFS,ZKZFH,ZFKLX,ZKZFHJE,YDDJE){
        var flag = $scope.comeList.find(function(item ,idx){
            return item.EBELN == EBELN && item.ZKZFH == ZKZFH
        });

        if (flag){
            swal('该数据已被选择，请重新选择!','','warning');
            return false;
        }
        var tr = $("#listTable").find(".list").eq(cgindex);
        tr.find("input:eq(0)").val(EBELN).trigger('change');
        tr.find("input:eq(1)").val(ZFKFS).trigger('change');
        tr.find("input:eq(2)").val(ZKZFH).trigger('change');
        tr.find("input:eq(3)").val(ZFKLX).trigger('change');
        tr.find("input:eq(4)").val(ZKZFHJE).trigger('change');
        tr.find("input:eq(5)").val(YDDJE).trigger('change');
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.Date=function(data,days){   //计算日期
            var nd = new Date(data);
            nd = nd.valueOf();
            nd = nd + days * 24 * 60 * 60 * 1000;
            nd = new Date(nd);
            var y = nd.getFullYear();
            var m = nd.getMonth()+1;
            var d = nd.getDate();
            if(m <= 9) m = "0"+m;
            if(d <= 9) d = "0"+d;
            var result = y+"-"+m+"-"+d;

            $scope.ORDER_DATA.ZCFDAT=result;
            if(days==null){
                $scope.ORDER_DATA.ZCFDAT="";
            }
            return  $scope.ORDER_DATA.ZCFDAT;

    }
    $scope.billje = function(idx,ZDDJE,ZKZFHJE,YDDJE,ZKZFH){
        var kzfhh = receipt.selectddje({ZKZFH:ZKZFH});
        kzfhh.success(function(data){
            if(data.code == 200){
                if(ZDDJE > 0 && ZDDJE >　(ZKZFHJE　-　YDDJE　-　data.rst.spddje).toFixed(2)){
                    swal({
                        title:'请输入正确数据',
                        text:'到单金额不能大于开证付汇金额-已到单金额',
                        type:'warning'
                    });
                    $scope.comeList[idx].ZDDJE = '';
                }
            }
        });

    }
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整(错误)，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        var addParam = {};
        addParam.doc = data;
        param.doc = data;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if($scope.comeList.length == 0){
            swal('请关联采购订单','','warning');
            return false;
        }
        param.items = $scope.comeList;
       // console.log(param);
        if(statue == "save"){
            var addInside = receipt.addreceipts(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            if($stateParams.sapid){
                param.processId = data.rst.processId;
                param.nodeId = data.rst.nodeId;
            }else{
                param.nodeId = $stateParams.nodeId;
            }
            // 提交
            $scope.applyFn = function (selIndex) {
                if (selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }

                //addParam.processId = data.rst.processId;
                //addParam.candidates = data.rst.candidates;
                var applyAdd = receipt.receiptsAdd(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/receipts'; });
                    }else {
                        alert(data.msg);
                    }
                });
            };
            var addInside = receipt.addreceipts(param);
            addInside.success(function(data){
                if(data.code == 200){
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' || data.rst.candidates[0].coop!=='and')) {
                        $scope.receivers = data.rst.candidates[0].receivers;
                        param.candidates = data.rst.candidates;
                        $("#approversDialog").dialog({
                            autoOpen: false,
                            modal: true,
                            width: 500
                        });
                        $("#approversDialog").dialog("open");
                    } else {
                        $scope.applyFn(-1);
                    }
                }else {
                    swal(data.msg, '', 'warning');
                }
            });
        }
    }

}]);

receiptsApp.controller('receiptsAddCtrl',['$scope','receiptService',function($scope,receipt){
    var ORDER_DATA =  $scope.ORDER_DATA ={};

    $scope.typeChange = function(type){
        if(type=="是"){
            $scope.billType = true;
            $scope.cfDateDis = true;
        }else{
            $scope.billType = true;
            $scope.cfDateDis = false;
        }
    }

    $scope.Date=function(data,days){//计算日期
        var nd = new Date(data);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;

        $scope.ORDER_DATA.ZCFDAT=result;
        if(days==null){
            $scope.ORDER_DATA.ZCFDAT="";
        }
        return  $scope.ORDER_DATA.ZCFDAT;
    };



    var comeList = $scope.comeList =[{EBELN:'', ZFKFS:'', ZKZFH:'', ZFKLX:'', ZDDJE:'', ZKZFHJE:'',YDDJE:''}];
    $scope.comeAdd = function(type){
        if(type == 'items'){
            var obj= {EBELN:'', ZFKFS:'', ZKZFH:'', ZFKLX:'', ZDDJE:'', ZKZFHJE:'',YDDJE:''};
            $scope.comeList.push(obj);
        }
    }

    $scope.comeDel = function(idx, type){
        if(type == 'items'){
            $scope.comeList.splice(idx,1);
        }
    }

    var cgindex = 0;
    $scope.purchase=function(index){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        cgindex = index;
    }
    $scope.cusSelect = function(EBELN,ZFKFS,ZKZFH,ZFKLX,ZKZFHJE,YDDJE){
        var flag = $scope.comeList.find(function(item ,idx){
            return item.EBELN == EBELN && item.ZKZFH == ZKZFH
        });

        if (flag){
            swal('该数据已被选择，请重新选择!','','warning');
            return false;
        }

        var tr = $("#listTable").find(".list").eq(cgindex);
        tr.find("input:eq(0)").val(EBELN).trigger('change');
        tr.find("input:eq(1)").val(ZFKFS).trigger('change');
        tr.find("input:eq(2)").val(ZKZFH).trigger('change');
        tr.find("input:eq(3)").val(ZFKLX).trigger('change');
        tr.find("input:eq(4)").val(ZKZFHJE).trigger('change');
        tr.find("input:eq(5)").val(YDDJE).trigger('change');
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.billje = function(idx,ZDDJE,ZKZFHJE,YDDJE,ZKZFH){
        if(ZDDJE < 0 || ZDDJE == 0){
            swal('到单金额必须大于0','','warning');
            return false;
        }
        var kzfhh = receipt.selectddje({ZKZFH:ZKZFH});
        kzfhh.success(function(data){
            if(data.code == 200){
                console.log((ZKZFHJE　-　YDDJE　-　data.rst.spddje).toFixed(2));
                if(ZDDJE > 0 && ZDDJE >　(ZKZFHJE　-　YDDJE　-　data.rst.spddje).toFixed(2)){
                    swal({
                        title:'请输入正确数据',
                        text:'到单金额不能大于开证付汇金额-已到单金额',
                        type:'warning'
                    });
                    $scope.comeList[idx].ZDDJE = '';
                }
            }
        });

    }
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整(错误)，请检查后再保存", "", "warning");
            return false;
        }
        var param = {processId:$scope.processId,nodeId:$scope.nodeId};
        var addParam = {};
        addParam.doc = data;
        param.doc = data;
        if($scope.comeList.length == 0){
            swal('请关联采购订单','','warning');
            return false;
        }
        param.items = $scope.comeList;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(statue == "save"){
            var addInside = receipt.addreceipts(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    //swal({title: "保存成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/receipts'; });
                }else {
                    swal(data.msg, '', 'warning');
                }
            });
        }else if(statue == 'apply'){
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var applyAdd = receipt.receiptsAdd(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/receipts'; });
                    }else {
                        alert(data.msg);
                    }
                });
            };
            var addInside = receipt.addreceipts(param);
            addInside.success(function(data){
                if(data.code == 200){
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    var applyView = receipt.applyView({processId:$scope.processId,nodeId:$scope.nodeId});
                    applyView.success(function(data){
                        $.extend(true,param.doc,{ZSQNO:data.rst.doc.model.ZSQNO});
                    });
                    if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' || data.rst.candidates[0].coop!=='and')) {
                        $scope.receivers = data.rst.candidates[0].receivers;
                        param.candidates = data.rst.candidates;
                        $("#approversDialog").dialog({
                            autoOpen: false,
                            modal: true,
                            width: 500
                        });
                        $("#approversDialog").dialog("open");
                    } else {
                        $scope.applyFn(-1);
                    }
                }else {
                    swal(data.msg, '', 'warning');
                }
            });
        }
    }



}]);

receiptsApp.controller('cuxboxCtrl',['$scope','receiptService',function($scope,receipt){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, EBELN:$scope.EBELN};
            var customerPromise = receipt.selectporeceipts(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

}]);

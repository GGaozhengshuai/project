var issueApp = angular.module('issueApp', ['pageDirectives','formDirectives']);
issueApp.service('issueServices', function($http) {
    var service = {
        listInside: function(param) {
            return $http.post('/kzfh/list',param ,{cache:false});
        },
        viewInside: function(param) {
            return $http.post('/kzfh/view',param ,{cache:true});
        },
        addInside: function(param){
            return $http.post('/kzfh/save',param ,{cache:false});
        },
        updateInside: function(param){
            return $http.post('/kzfh/update',param ,{cache:false});
        },
        deleteInside: function(param){
            return $http.post('/kzfh/delete',param ,{cache:false});
        },
        applyAdd: function(param){
            return $http.post('/kzfh/createprocess',param ,{cache:false});
        },//审批接口
        applyView: function(param) {
            return $http.post('/kzfh/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/kzfh/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/kzfh/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/kzfh/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/kzfh/recall',param ,{cache:false});
        },
        cgData: function(param){//供应商数据
            return $http.post('/kzfh/selectgysyh',param ,{cache:false});
        },
        cghtData: function(param){//采购合同
            return $http.post('/kzfh/selectpo',param ,{cache:false});
        },//审批接口
        applyView: function(param) {
            return $http.post('/kzfh/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/kzfh/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/kzfh/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/kzfh/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/kzfh/recall',param ,{cache:false});
        },
        bbenum: function(param){//召回
            return $http.post('/kzfh/enum',param ,{cache:false});
        },
        xzjc : function(param){//新增检测
            return $http.post('/kzfh/checkkzfhje',param,{cache:false})
        },
        selectmoney : function(param){
            return $http.post('/kzfh/selectmoney',param,{cache:false})
        },
        selectmoneyfromdaodan : function(param){
            return $http.post('/kzfh/selectmoneyfromdaodan',param,{cache:false})
        },
        checkprocess :function(param){
            return $http.post('/kzfh/checkprocess',param,{cache:false});
        },
        getprocesslog: function(param) {
            return $http.post('/kzfh/getprocesslog',param,{cache:false});
        }
    };
    return service;
});

issueApp.controller('issueOrderCtrl', ['$scope','$state','issueServices',function($scope,$state,income){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,ZKZFH:$scope.ZKZFH,ZFKZT:$scope.ZFKZT,NAME1:$scope.NAME1,ZZDR:$scope.ZZDR,ZSQRQ:$scope.ZSQRQ};
            var customerPromise = income.listInside(param);
            customerPromise.success(function(data){
                if(data.code==200){
                    $scope.dataList=data.rst.data.items;
                }
            })
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    var zbb=income.bbenum();
    zbb.success(function(data){
        if(data.code == 200){
            $scope.ZBB = data.rst.data.enum.ZBB;
        }else{
            alert(data.msg);
        }
    });
    $scope.Ifchange = function(ZKZFH){
        var checkprocess = income.checkprocess({ZKZFH:ZKZFH});
        checkprocess.success(function(data){
            if(data.code == 200){
                $state.go('issueOrderChange',{id:ZKZFH});
            }else{
                swal(data.msg,'','warning');
            }
        });
    }
}]);

issueApp.controller('issueGyCtrl', ['$scope','issueServices',function($scope,payment){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage};
            param.NAME1 =$scope.NAME1;
            var customerPromise = payment.cgData(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
issueApp.controller('issueOrderAddCtrl', ['$scope','issueServices',function($scope,payment){
    var ORDER_DATA =  $scope.ORDER_DATA ={};

    $scope.customerBox = function(){
        $( "#gyBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#gyBox" ).dialog( "open" );
    }
    $scope.cusSelect = function(id,name,name2,BANKA,BANKN){
        $scope.ORDER_DATA.NAME1 = name;
        $scope.ORDER_DATA.NAME2 = name2;
        $scope.ORDER_DATA.LIFNR = id;
        $scope.ORDER_DATA.ZYHMC = BANKA;
        $scope.ORDER_DATA.ZYHZH = BANKN;
        $( "#gyBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    var glCgList = $scope.billsList =[{EBELN:'', VBELN:'', ZHKMC:'', ZEBELN:'', ZVBELN:'', ZDDZJE:'', ZYKZFHJE:'', ZKZFHJE:''}];
    var xshtNum;
    $scope.comeAdd = function(type){
        $( "#glCgBox" ).dialog({
            autoOpen: false,
            width: 800,
            height:600,
            modal: true
        });
        var glPara = {ZFKZT:$scope.ORDER_DATA.ZFKZT, LIFNR:$scope.ORDER_DATA.LIFNR}
        var cgl = payment.cghtData(glPara);
        cgl.success(function(data){
            if(data.code == 200){
                $scope.glcgDataList = data.rst.data.items;
                for(var x in $scope.glcgDataList){
                    xshtNum = $scope.glcgDataList[x].EBELN;
                }
            }else {
                alert(data.msg);
            }
        })

        $( "#glCgBox" ).dialog( "open" );
    }
   /* $scope.cusSelect = function(id,name){
        $scope.ORDER_DATA.NAME1 = name;
        $scope.ORDER_DATA.LIFNR = id;
        $( "#gyBox" ).dialog( "destroy" );
        $(".ui-dialog").remove();
    }*/
    var glCgList = $scope.glCgList =[];
    $scope.glcgSelect = function(EBELN,VBELN,ZHKMC,ZEBELN,ZVBELN,ZDDZJE,ZYKZFHJE){
        for(var x in $scope.glCgList){
            if($scope.glCgList[x].EBELN == EBELN){
                swal("该采购订单已被关联！！", "", "warning");
                $( "#glCgBox" ).dialog( "destroy" );
                $(".ui-dialog").remove();
                return false;
            }
        }
        var data = {};
        data.EBELN = EBELN;
        data.VBELN = VBELN;
        data.ZHKMC = ZHKMC;
        data.ZEBELN = ZEBELN;
        data.ZVBELN = ZVBELN;
        data.ZDDZJE = ZDDZJE;
        data.ZYKZFHJE = ZYKZFHJE;
        $scope.glCgList.push(data);
        $( "#glCgBox" ).dialog( "destroy" );
        $(".ui-dialog").remove();
    }
    $scope.comeDel = function(idx){
        $scope.glCgList.splice(idx,1);
    }
    $scope.bckzNum = function(idx,ZKZFHJE,ZDDZJE,ZYKZFHJE){
        if(ZKZFHJE < 0 || ZKZFHJE > Number(ZDDZJE) - Number(ZYKZFHJE)){
            swal('本次开证付汇金额超出可填数值，请修改','','warning');
            for(var x in $scope.glCgList){
                $scope.glCgList[idx].ZKZFHJE = '';
            }
        }

    }
    var ZKZFHJE=0;
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整(错误)，请检查后再保存", "", "warning");
            return false;
        }
        ZKZFHJE=0;
        var doc={},param= {};
        doc.HEADER_DATA = data;
        doc.ITEM_DATA = $scope.glCgList;
        param.doc = doc;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(statue == "save"){
            var addInside = payment.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    for(var x in $scope.glCgList){
                        ZKZFHJE+=parseFloat($scope.glCgList[x].ZKZFHJE);
                        if($scope.glCgList[x].ZKZFHJE > $scope.glCgList[x].ZDDZJE - $scope.glCgList[x].ZYKZFHJE){
                            swal({title:'保存成功',text:"本次开证付汇金额大于订单总金额-已开证付汇金额！",type:'success'});
                        }else{
                            swal("保存成功", "", "success");
                        }
                    }
                    $scope.ZKZFHJE = ZKZFHJE;
                    //swal({title: "保存成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/issueOrder'; });
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            $scope.glCgList.forEach(function(item){
                return $scope.ZKZFHJE = ZKZFHJE+=parseFloat(item.ZKZFHJE);
            });
            if(data.ZFKLX == '开证' && data.ZBB == 'USD' && parseFloat($scope.ZKZFHJE) < 2000000){      //付款类型 为开证  开证付汇金额小于200万美金    bug5910
                param.comment = '系统审批完成后还需陈总线下签字审批';
            }
            var check = payment.xzjc(param);
            check.success(function(data){
                if(data.code == 200){
                    if(data.rst.length > 0){
                        for(var x in data.rst){
                            for(var  i in $scope.glCgList){
                                if(data.rst[x].EBELN == $scope.glCgList[i].EBELN){
                                    swal({
                                         title:'',
                                        text:data.rst[x].EBELN+'最大开证付汇金额'+data.rst[x].ZDKZFHJE.toFixed(2)+','+'审批中金额'+data.rst[x].SPZKZFHJE.toFixed(2),
                                        type:'warning'
                                    })
                                    return false;
                                }
                            }
                        }
                    }else{
                        var applyAdd = payment.applyAdd(param);
                        applyAdd.success(function(data){
                            if(data.code == 200){
                                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/issueOrder'; });
                            }else {
                                alert(data.msg);
                            }
                        });
                    }
                }
            });
        }
    }

}]);
issueApp.controller('issueOrderEditCtrl', ['$scope','$stateParams', 'issueServices',function($scope, $stateParams, payment){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    $scope.customerBox = function(){
        $( "#gyBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#gyBox" ).dialog( "open" );
    }
    $scope.cusSelect = function(id,name,name2,BANKN,BANKA){
        $scope.ORDER_DATA.NAME1 = name;
        $scope.ORDER_DATA.NAME2 = name2;
        $scope.NAME = name + name2;
        $scope.ORDER_DATA.LIFNR = id;
        $scope.ORDER_DATA.ZYHMC = BANKN;
        $scope.ORDER_DATA.ZYHZH = BANKA;
        $( "#gyBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    var glCgList = $scope.billsList =[{EBELN:'', VBELN:'', ZHKMC:'', ZEBELN:'', ZVBELN:'', ZDDZJE:'', ZYKZFHJE:'', ZKZFHJE:''}];
    $scope.comeAdd = function(type){
        $( "#glCgBox" ).dialog({
            autoOpen: false,
            width: 800,
            height:600,
            modal: true
        });
        var glPara = {ZFKZT:$scope.ORDER_DATA.ZFKZT, LIFNR:$scope.ORDER_DATA.LIFNR}
        var cgl = payment.cghtData(glPara);
        cgl.success(function(data){
            if(data.code == 200){
                $scope.glcgDataList = data.rst.data.items;
            }else {
                alert(data.msg);
            }
        })

        $( "#glCgBox" ).dialog( "open" );
    }

   /* $scope.cusSelect = function(id,name){
        $scope.ORDER_DATA.NAME1 = name;
        $scope.ORDER_DATA.LIFNR = id;
        $( "#gyBox" ).dialog( "destroy" );
        $(".ui-dialog").remove();
    }*/
    var glCgList = $scope.glCgList =[];
    $scope.glcgSelect = function(EBELN,VBELN,ZHKMC,ZEBELN,ZVBELN,ZDDZJE,ZYKZFHJE){
        for(var x in $scope.glCgList){
            if($scope.glCgList[x].EBELN == EBELN){
                swal("该采购订单已被关联！！", "", "warning");
                $( "#glCgBox" ).dialog( "destroy" );
                $(".ui-dialog").remove();
                return false;
            }
        }
        var data = {};
        data.EBELN = EBELN;
        data.VBELN = VBELN;
        data.ZHKMC = ZHKMC;
        data.ZEBELN = ZEBELN;
        data.ZVBELN = ZVBELN;
        data.ZDDZJE = ZDDZJE;
        data.ZYKZFHJE = ZYKZFHJE;
        $scope.glCgList.push(data);
        $( "#glCgBox" ).dialog( "destroy" );
        $(".ui-dialog").remove();
    }
    $scope.comeDel = function(idx){
        $scope.glCgList.splice(idx,1);
    };

    var viewCont = payment.viewInside({sapid:$stateParams.sapid, processId:$stateParams.processId});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.NAME = data.rst.data.model.NAME1 + data.rst.data.model.NAME2;
            $scope.glCgList = data.rst.data.items;
            if(data.rst.data.model.task){
                $scope.changeJE = true;
                $scope.KZFHJE = true;
            }else{
                $scope.changeJE = false;
                $scope.KZFHJE = false;
            }
        }else{
            alert(data.msg);
        }

    });
    var ZKZFHJE=0;
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整(错误)，请检查后再保存", "", "warning");
            return false;
        }
        ZKZFHJE=0;
        var doc={},param= {};
        doc.HEADER_DATA = data;
        doc.ITEM_DATA = $scope.glCgList;
        param.doc = doc;

        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        if(statue == "save"){
            var addInside = payment.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    for(var x in $scope.glCgList){
                        ZKZFHJE+=parseFloat($scope.glCgList[x].ZKZFHJE);
                        if($scope.glCgList[x].ZKZFHJE > $scope.glCgList[x].ZDDZJE - $scope.glCgList[x].ZYKZFHJE){
                            swal({title:'保存成功',text:"本次开证付汇金额大于订单总金额-已开证付汇金额！",type:'success'});
                        }else{
                            swal("保存成功", "", "success");
                        }
                    }
                    $scope.ORDER_DATA.ZKZFHJE = ZKZFHJE;
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            param.processId = $stateParams.processId;
            if($stateParams.sapid){
                param.nodeId = data.rst.nodeId;
            }else{
                param.nodeId = $stateParams.nodeId;
            }
            $scope.glCgList.forEach(function(item){
                return $scope.ZKZFHJE = ZKZFHJE+=parseFloat(item.ZKZFHJE);
            });
            if(data.ZFKLX == '开证' && data.ZBB == 'USD' && parseFloat($scope.ZKZFHJE) < 2000000){      //付款类型 为开证  开证付汇金额小于200万美金    bug5910
                param.comment = '系统审批完成后还需陈总线下签字审批';
            }
            var check = payment.xzjc(param);
            check.success(function(data){
                if(data.code == 200){
                    if(data.rst.length > 0){
                        for(var x in data.rst){
                            for(var  i in $scope.glCgList){
                                if(data.rst[x].EBELN == $scope.glCgList[i].EBELN){
                                    swal({
                                        title:'',
                                        text:data.rst[x].EBELN+'最大开证付汇金额'+data.rst[x].ZDKZFHJE.toFixed(2)+','+'审批中金额'+data.rst[x].SPZKZFHJE.toFixed(2),
                                        type:'warning'
                                    })
                                    return false;
                                }
                            }
                        }
                    }else{
                        var applyAdd = payment.applyAdd(param);
                        applyAdd.success(function(data){
                            if(data.code == 200){
                                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/issueOrder'; });
                            }else {
                                alert(data.msg);
                            }
                        });
                    }
                }
            });
        }
    }
}]);
issueApp.controller('issueOrderViewCtrl', ['$scope', '$stateParams', 'issueServices',function($scope, $stateParams, income){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var viewCont = income.viewInside({sapid:$stateParams.id});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.glCgList = data.rst.data.items;
            var zbb=income.bbenum();
            zbb.success(function(data){
                if(data.code == 200){
                    if($scope.ORDER_DATA.ZBB){
                        var type = getField(data.rst.data.enum,'code',$scope.ORDER_DATA.ZBB)
                        $scope.ZBB = type.name;
                    }
                }else{
                    alert(data.msg);
                }
            });
        }else{
            alert(data.msg);
        }

    });
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = income.getprocesslog({id: vm.ORDER_DATA.ZKZFH}); // 直接取值数据中 申请人（proposer）
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

issueApp.controller('applyKzfhCtrl', ['$scope','$stateParams','issueServices',function($scope,$stateParams,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = apply.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.glCgList = data.rst.doc.items;

            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;

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
            if(data.rst.doc.model.task){
                $scope.changeJE = true;
            }else{
                $scope.changeJE = false;
            }
            var zbb=apply.bbenum();
            zbb.success(function(data){
                if(data.code == 200){
                    if($scope.ORDER_DATA.ZBB){
                        var type = getField(data.rst.data.enum,'code',$scope.ORDER_DATA.ZBB)
                        $scope.ZBB = type.name;
                    }
                }else{
                    alert(data.msg);
                }
            });
            var newprev = $scope.billPrev;  //关务人员必填 开证付汇银行
            if(newprev.approval_custom) {
                $scope.kzfhBank = $stateParams.myflag == 'mydoing' ? true : false;
            }
            $scope.kzfhBankdisabled = $stateParams.myflag == 'mydoing' && newprev.approval_custom ? false : true;
        }else{
            alert(data.msg);
        }
    }).error(function(error){
        alert(error);
    });
    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {},doc = {};
        doc.HEADER_DATA = $scope.doc.model;
        doc.ITEM_DATA = $scope.doc.items;
        param.doc = doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = apply.addInside(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
          keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
          swal("您有信息填写不完整，请检查后再保存", "", "warning");
          return false;
        }
        // 提交
        $scope.applyFn = function (selIndex) {
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
            //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
            var applyAgree = apply.agree(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回开证付汇待办",
                        closeOnConfirm: true
                    }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=开证付汇&&controllercode=KZFH' });
                }else {
                    swal(data.msg, '', "error");
                }
            }).error(function(error){
                swal(error, '', "error");
                //alert(error);
            });
        };
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' && $scope.candidates[0].coop!=='and')){
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
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回开证付汇待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=开证付汇&&controllercode=KZFH'; });
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
        var cancel = apply.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回开证付汇待办",
                    closeOnConfirm: true
                }, function(){   window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=开证付汇&&controllercode=KZFH'; });
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
        var recall = apply.recall(param);
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

issueApp.controller('glcgBoxCtrl', ['$scope','issueServices',function($scope,apply){
    $scope.search = function() {
        var glPara = {ZFKZT: $scope.ORDER_DATA.ZFKZT, LIFNR: $scope.ORDER_DATA.LIFNR, EBELN: $scope.EBELN}
        var cgl = apply.cghtData(glPara);
        cgl.success(function (data) {
            if (data.code == 200) {
                $scope.glcgDataList = data.rst.data.items;
            } else {
                alert(data.msg);
            }
        })
    }
}]);

//开证付汇变更
issueApp.controller('issueOrderChangeCtrl',['$scope','$stateParams','issueServices',function($scope,$stateParams,income){
    var viewCont = income.viewInside({sapid:$stateParams.id});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.glCgList = data.rst.data.items;
            for(var x in $scope.glCgList){
                $scope.glCgList[x].bgje = $scope.glCgList[x].ZKZFHJE;
            }
            var zbb=income.bbenum();
            zbb.success(function(data){
                if(data.code == 200){
                    $scope.enumZBB = data.rst.data.enum;
                    if($scope.ORDER_DATA.ZBB){
                        var type = getField(data.rst.data.enum,'code',$scope.ORDER_DATA.ZBB)
                        $scope.ZBB = type.name;
                    }
                }else{
                    alert(data.msg);
                }
            });
            var doc={};
            doc.ITEM_DATA = $scope.glCgList;
            var selectmoney = income.selectmoney({doc:doc});
            selectmoney.success(function(data){
                for(var x in  data.rst.items){
                    for(var i in  $scope.glCgList){
                        if(data.rst.items[x].EBELN == $scope.glCgList[i].EBELN){
                            $scope.glCgList[i].DDJEZJ = data.rst.items[x].DDJEZJ;
                        }
                    }
                }
            });
        }else{
            alert(data.msg);
        }

    });
    var ZKZFHJE = 0;
    $scope.addData = function(data,statue){
        var doc={},param= {};
        doc.HEADER_DATA = data;
        doc.HEADER_DATA.task = 'D';
        doc.ITEM_DATA = $scope.glCgList;
        param.doc = doc;

        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        ZKZFHJE = 0;
        if(statue == "save"){
            var addInside = income.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    for(var x in $scope.glCgList){
                        ZKZFHJE+=parseFloat($scope.glCgList[x].bgje);
                    }
                    $scope.ZKZFHJE = ZKZFHJE;
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var param1={};
            //查到单金额，审批中到单金额
            var selectmoneyfromdaodan = income.selectmoneyfromdaodan(param);
            selectmoneyfromdaodan.success(function(data){
                if(data.code == 200){
                    $scope.doc = data.rst;
                    param1.doc = $scope.doc;

                    var check = income.xzjc(param1);
                    check.success(function(data){
                        if(data.code == 200){
                            if(data.rst.length > 0){
                                for(var x in data.rst){
                                    for(var  i in $scope.glCgList){
                                        if(data.rst[x].EBELN == $scope.glCgList[i].EBELN){
                                            swal({
                                                title:'',
                                                text:data.rst[x].EBELN+'最大变更开证付汇金额'+data.rst[x].ZDKZFHJE.toFixed(2)+','+'审批中金额'+data.rst[x].SPZKZFHJE+','+'最小变更开证付汇金额'+data.rst[x].ZXKZFHJE+','+'到单金额'+data.rst[x].ddje,
                                                type:'warning'
                                            })
                                            return false;
                                        }
                                    }
                                }
                            }else{
                                var applyAdd = income.applyAdd(param1);
                                applyAdd.success(function(data){
                                    if(data.code == 200){
                                        swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/issueOrder'; });
                                    }else {
                                        alert(data.msg);
                                    }
                                });
                            }
                        }
                    });
                }
            });

        }
    }
}]);

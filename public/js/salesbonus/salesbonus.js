var salesbonusApp = angular.module('salesbonusApp', ['pageDirectives','formDirectives','uploadifyApp']);
salesbonusApp.service('salesbonusApp', function($http) {
    var service = {
        listsalesbonus: function(param) {
            return $http.post('/salesbonus/list',param ,{cache:false});
        },
        viewsalesbonus: function(param) {
            return $http.post('/salesbonus/view',param ,{cache:true});
        },
        savesalesbonus: function(param) {
            return $http.post('/salesbonus/save',param ,{cache:false});
        },
        savesalesAdd: function(param){
            return $http.post('/salesbonus/createprocess',param ,{cache:false});
        },
        transfer: function(param) {  //转移
            return $http.post('/salesbonus/transfer',param ,{cache:false});
        },
        change: function(param) {  //修改
            return $http.post('/salesbonus/alter',param ,{cache:false});
        },
        nullify: function(param) {  //修改
            return $http.post('/salesbonus/nullify',param ,{cache:false});
        },
        exportexcel: function(param) {  //导出现状
            return $http.post('/salesbonus/exportexcel',param ,{cache:false});
        },
        applyView: function(param) {
            return $http.post('/salesbonus/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/salesbonus/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/salesbonus/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/salesbonus/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/salesbonus/recall',param ,{cache:false});
        },
        verifyclient: function(param){//客户名称
            return $http.post('/salesbonus/verifyclient',param ,{cache:false});
        },
        uselog: function(param){//返点变更记录
            return $http.post('/salesbonus/uselog',param ,{cache:false});
        },
        enumlist: function(param){//enum
            return $http.post('/salesbonus/enumlist',param ,{cache:false});
        },
        freeze: function(param){//enum
            return $http.post('/salesbonus/freeze',param ,{cache:false});
        },
        savesalesbg: function(param) {
            return $http.post('/salesbonusbg/save',param ,{cache:false});
        },
        savesalesbgAdd: function(param){
            return $http.post('/salesbonusbg/createprocess',param ,{cache:false});
        },
        savesaleszy: function(param) {
            return $http.post('/salesbonuszy/save',param ,{cache:false});
        },
        savesaleszyAdd: function(param){
            return $http.post('/salesbonuszy/createprocess',param ,{cache:false});
        },
        savesalesjd: function(param) {
            return $http.post('/salesbonusjd/save',param ,{cache:false});
        },
        savesaleszyjdAdd: function(param){
            return $http.post('/salesbonusjd/createprocess',param ,{cache:false});
        },
        salesbonuslog : function(param){
            return $http.post('/salesbonus/getprocesslog',param,{cache:false});
        }
    }
    return service;
});
salesbonusApp.controller('salesbonusCtrl', ['$scope','salesbonusApp',function($scope,salesbonus){
    $scope.marketList = [];
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {
                page:$scope.paginationConf.currentPage,
                limit:$scope.paginationConf.itemsPerPage,
                client:$scope.client,
                provider:$scope.provider,
                department:$scope.department.name,
                code:$scope.code,
                user:$scope.user.name,
                type:$scope.bonusbase.type,
                start:$scope.bonusinfo.start,
                end:$scope.bonusinfo.end,
                sort:'-bonusinfo.start',
                status : $scope.fdstate
            };
            var customerPromise = salesbonus.listsalesbonus(param);
            customerPromise.success(function(data){
                $scope.dataList=data.rst.data.items;
                var xsfdenum=salesbonus.enumlist();
                xsfdenum.success(function(data){
                    if(data.code == 200){
                        $scope.parAry=[];
                        $scope.par={};
                        if($scope.client){
                            $scope.parAry.push("client");
                            $scope.par.client=$scope.client;
                        };
                        if($scope.provider){
                            $scope.parAry.push("provider");
                            $scope.par.provider=$scope.provider;
                        };
                        if($scope.department.name){
                            $scope.parAry.push("department");
                            $scope.par.department=$scope.department.name;
                        };
                        if($scope.code){
                            $scope.parAry.push("code");
                            $scope.par.code=$scope.code;
                        };
                        if($scope.user.name){
                            $scope.parAry.push("user");
                            $scope.par.user=$scope.user.name;
                        };
                        if($scope.bonusbase.type){
                            $scope.parAry.push("bonusbase");
                            $scope.par.bonusbase=$scope.bonusbase.type;
                        };
                        if($scope.bonusinfo.start){
                            $scope.parAry.push("start");
                            $scope.par.start=$scope.bonusinfo.start;
                        };
                        if($scope.bonusinfo.end){
                            $scope.parAry.push("end");
                            $scope.par.end=$scope.bonusinfo.end;
                        };
                        $scope.status=data.rst.enum.status;
                    }
                });
                if(Date.parse($scope.bonusinfo.start) > Date.parse($scope.bonusinfo.end)){
                    swal('生效日期截止不能小于生效日期起始','','warning');
                    return false;
                }
                //点击分页下一页取消全选按钮选中状态
                var parent = $("#occTable").find("#list");
                var check = parent.find("input:eq(0)");
                check.removeAttr("checked");


                if($scope.dataList.length > 10){
                    var parent1 = $("#occTable").find("#list");
                    var check1 = parent.find("input:eq(0)");
                    check1.removeAttr("checked");
                    $scope.dataList.forEach(function(item){
                        item.checkAll = false;
                    })
                    cArr=[];
                }
            });
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

    var cArr=[];
    $scope.checkSelect = function(idx,data){
        var parent = $("#occTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr("checked",'checked');
            cArr.push(data);
        }else{
            check.removeAttr("checked");
            cArr.splice(data,idx);
        }

    }
    $scope.allCheck=function($event){
        var checkbox = $event.target;
        $scope.checkAll= checkbox.checked ? true : false;
        if(checkbox.checked){
            $scope.dataList.forEach(function(item){
                item.checkAll=true;
                cArr.push(item._id);
            })
        }else{
            cArr = [];
            $scope.dataList.forEach(function(item){
                item.checkAll=false;
            })
        }
    }
    $scope.exportexcel=function(){
        if($scope.parAry.length>0 && cArr.length == 0){
            var str="";
            for(var i=0;i<$scope.parAry.length;i++){
                if(i==0){
                    str=str+"?"+$scope.parAry[0]+"="+$scope.par[$scope.parAry[0]];
                }else{
                    str=str+"&"+$scope.parAry[i]+"="+$scope.par[$scope.parAry[i]];
                }
            }
            var path='/salesbonus/exportexcel'+str;
            console.log(path)
            window.open(path);
            console.log(1)
        }else if(cArr.length > 0){

            var path = '/salesbonus/exportexcel?';
            var strArr = [];
            $.each(cArr,function(key,value){
                var para = 'ids='+value;
                strArr.push(para);
            });
            var str = strArr.join("&");
            path = path+str;
            window.open(path);
            console.log(3);


        }else{
            var path='/salesbonus/exportexcel?client&provider&department&code&user&bonusbase';
            window.open(path);
            console.log(2);
        }

    }
    $scope.exportlogs=function(){
        if($scope.parAry.length>0 && cArr.length == 0){
            var str="";
            for(var i=0;i<$scope.parAry.length;i++){
                if(i==0){
                    str=str+"?"+$scope.parAry[0]+"="+$scope.par[$scope.parAry[0]];
                }else{
                    str=str+"&"+$scope.parAry[i]+"="+$scope.par[$scope.parAry[i]];
                }
            }
            var path='/salesbonus/exportlogs'+str;
            window.open(path);
        }else if(cArr.length > 0){

            var path = '/salesbonus/exportlogs?';
            var strArr = [];
            $.each(cArr,function(key,value){
                var para = 'ids='+value;
                strArr.push(para);
            });
            var str = strArr.join("&");
            path = path+str;
            window.open(path);
        }else{
            var path='/salesbonus/exportlogs?client&provider&department&code&user&bonusbase';
            window.open(path);
        }
    }
    $scope.view=function(id){
        var code_fdid=salesbonus.uselog({code:id});
        code_fdid.success(function(data){
            if(data.code == 200){
                for(var x in data.rst.data){
                    if(data.rst.data[x].status == 'release'){
                        $scope.marketList = [];
                    }
                    if(data.rst.data[x].task == 'use' && data.rst.data[x].status != 'transfer'){
                        $scope.marketList.push(data.rst.data[x]);

                        for(var j in $scope.marketList){}
                        $scope.marketList[j].sum = data.rst.data[x].sum;
                        $scope.marketList[j].date = data.rst.data[x].date;
                    }



                }
            }
        });
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        $scope.marketList = [];
    }

    /* $scope.sxdate=function(data1,data2){
     if(Date.parse(data1) > Date.parse(data2)){
     swal('生效日期截止不能小于生效日期起始','','warning');
     return false;
     }
     }*/

}]);
salesbonusApp.controller('salesbonusViewCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var ORDER_DATA = {};
    var viewCont = salesbonus.viewsalesbonus({_id:$stateParams.id});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst;
        }else {
            alert(data.msg);
        }

    });
    var xsfdenum=salesbonus.enumlist();
    xsfdenum.success(function(data){
        if(data.code == 200){
            $scope.status=data.rst.enum.status;
        }
    });


    // 审批记录
    var vm = $scope;
    vm.activeTab = 1;
    vm.processlog = null;

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = salesbonus.salesbonuslog({id:vm.ORDER_DATA.code,type:'XSFD'}); // 直接取值数据中 申请人（proposer）
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
}]);
salesbonusApp.controller('salesbonuszf', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var ORDER_DATA = {};
    var viewCont = salesbonus.viewsalesbonus({_id:$stateParams.id});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst;
        }else {
            alert(data.msg);
        }

    });
    $scope.nullify=function(data){
        swal(
            {
                title: "确定作废此返点吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            },
            function () {
                $( "#zfBox" ).dialog({
                    autoOpen: false,
                    width: 550,
                    modal: true
                });
                $( "#zfBox" ).dialog( "open" );
                $scope.zfSave = function(note){
                    data.bonusbase.note += note;
                    var deleteUser = salesbonus.nullify({doc:{items:[data]}});
                    deleteUser.success(function (data) {
                        if (data.code == 200) {
                            $( "#zfBox" ).dialog("destroy");
                            $(".ui-dialog").remove();
                            swal({title: "作废成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                        } else {
                            swal('作废失败','','error');
                        }
                    }).error(function (error) {
                        alert(error);
                    });
                }

            }
        );
    }
}]);
salesbonusApp.controller('examineCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){

    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = salesbonus.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.fdList = data.rst.doc.items;
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

        }

    }).error(function(error){
        alert(error);
    });


    var vm = $scope;
    vm.saleDownloadClick = function(){
        window.open('salesbonus/processtocsv?processId='+vm.processId);
    }

    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = salesbonus.savesalesbonus(param);
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

        var applyAgree = salesbonus.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
            }else {
                swal('审批错误','','error');
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
        var disagree = salesbonus.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var cancel = salesbonus.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var recall = salesbonus.recall(param);
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
salesbonusApp.controller('salesbonusAddCtrl', ['$scope','$rootScope','salesbonusApp',function($scope,$rootScope,salesbonus){
    var cgList = $scope.cgList =[];
    var excleData = $scope.file =[];
    $scope.fileError=[];
    $scope.fileErrorEdit = true;
    $scope.errorText = true;
    var person = $rootScope.loginPerson;
    console.log(person);
    $scope.name=person.username;
    $scope.username = person.user.name;
    $scope.orgname=person.user.orgname;
    $scope.del=function(index){
        $scope.fileError.splice(index,1);
    }
    $scope.edit=function(){
        $scope.fileErrorEdit = false;
        $scope.errorText = false;
    }
    $scope.jlsyType=function(benefit){
        if(benefit !== '设备' && benefit !== '服务'&& benefit !== '通用'){
            swal('请输入合法激励受益类型','','warning');
            return false;
        }
    }
    $scope.cpxType=function(secondary){
        var cpx = salesbonus.enumlist();
        cpx.success(function(data){
            if(data.code == 200){
                for(var x in data.rst.enum.cpx){
                    if(secondary == data.rst.enum.cpx[x]){
                        break;
                    }else{
                        swal('请输入合法产品线','','warning');
                        return false;
                    }
                }
            }else{

            }
        });
    }
    $scope.sybType=function(name){
        if(name != '光伏事业部' && name !='华为事业部' && name != '软件及应用事业部'){
            swal('请输入合法事业部','','warning');
            return false;
        }
    }
    $scope.fdType=function(type){
        if(type != '分销返点' && type != '项目返点' && type != '框架协议返点' && type != '代理商委托' && type != '其他'){
            swal('请输入合法返点类型','','warning');
            return false;
        }
    }
    $scope.clientName=function(name){
        var userName=salesbonus.verifyclient({name:name});
        userName.success(function(data){
            if(data.code == 200){
                if(data.rst.exist == 'no'){
                    swal("请输入已经认证过的业务客户！！", "", "warning");
                    return false;
                }
            }
        })
    }
    $scope.allCheck = function(){
        var parent = $("#cgList").find(".allList").eq(0);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.file){
                $scope.file[x].rightAdd = true;
            }
            for(var j in $scope.fileError){
                $scope.fileError[j].errorAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var i in $scope.file){
                delete  $scope.file[i].rightAdd;
            }
            for(var g in $scope.fileError){
                delete $scope.fileError[g].errorAdd;
            }
        }
    }
    $scope.checkDel = function(idx){
        var parent = $("#cgList").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.file){
                $scope.file[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.file){
                delete  $scope.file[idx].rightAdd;
            }

        }
    }
    $scope.DelError = function(idx){
        var parent = $("#cgList").find(".listerror").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            $scope.touch = true;
            for(var x in $scope.fileError){
                $scope.fileError[idx].errorAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.fileError){
                delete $scope.fileError[idx].errorAdd;
            }
        }
    }

    $scope.xsfdDel = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.file.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.file = rightArr;
        $scope.fileError.forEach(function(item){
            if(item.errorAdd){

            }else{
                errorArr.push(item)
            }
        });
        $scope.fileError = errorArr;
    }
    $scope.addData = function(data,statue){
        if($scope.cgList.length <= 0 && $scope.file.length <= 0 && $scope.fileError.length<=0){
            swal("请添加数据", "", "warning");
            return false;
        }
        if($scope.errorText == true && $scope.fileError.length != 0){
            swal({title:'',text:$scope.excelModel.msg,type: "error"});
            return false;
        }
        if($scope.fileError.length !== 0){
            for(var x in $scope.fileError){
                if($scope.fileError[x].department.name != '光伏事业部' && $scope.fileError[x].department.name != '华为事业部' && $scope.fileError[x].department.name != '软件及应用事业部'){
                    swal('请输入合法事业部！','','warning');
                    return false;
                }else if($scope.fileError[x].bonusbase.type != '分销返点' && $scope.fileError[x].bonusbase.type != '项目返点'&& $scope.fileError[x].bonusbase.type != '框架协议返点' && $scope.fileError[x].bonusbase.type != '代理商委托' && $scope.fileError[x].bonusbase.type != '其他'){
                    swal('请输入合法返点类型','','warning');
                    return false;
                }else if($scope.fileError[x].bonusbase.benefit != '设备' && $scope.fileError[x].bonusbase.benefit != '服务' && $scope.fileError[x].bonusbase.benefit != '通用'){
                    swal('请输入合法激励受益类型','','warning');
                    return false;
                }

            }
        }
        var arr = $scope.cgList.concat($scope.file,$scope.fileError);
        var param = {doc:{model:{code:$scope.excelModel.model.code},items:arr}};
        if(statue == "save"){
            var addInside = salesbonus.savesalesbonus(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = salesbonus.savesalesAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                }else {
                    alert(data.msg);
                }
            });
        }
    }
}]);
salesbonusApp.controller('salesbonusEditCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var cgList = $scope.cgList =[];
    var excleData = $scope.file =[];
    $scope.fileError=[];
    $scope.fileErrorEdit = true;
    $scope.errorText = true;
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = salesbonus.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.file = data.rst.doc.items;
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

        }

    }).error(function(error){
        alert(error);
    });
    $scope.del=function(index){
        $scope.fileError.splice(index,1);
    }
    $scope.edit=function(){
        $scope.fileErrorEdit = false;
        $scope.errorText = false;
    }
    $scope.jlsyType=function(benefit){
        if(benefit !== '设备' && benefit !== '服务'&& benefit !== '通用'){
            swal('请输入合法激励受益类型','','warning');
            return false;
        }
    }
    $scope.cpxType=function(secondary){
        var cpx = salesbonus.enumlist();
        cpx.success(function(data){
            if(data.code == 200){
                for(var x in data.rst.enum.cpx){
                    if(secondary == data.rst.enum.cpx[x]){
                        break;
                    }else{
                        swal('请输入合法产品线','','warning');
                        return false;
                    }
                }
            }else{

            }
        });
    }
    $scope.sybType=function(name){
        if(name != '光伏事业部' && name !='华为事业部' && name != '软件及应用事业部'){
            swal('请输入合法事业部','','warning');
            return false;
        }
    }
    $scope.fdType=function(type){
        if(type != '分销返点' && type != '项目返点' && type != '框架协议返点' && type != '代理商委托' && type != '其他'){
            swal('请输入合法返点类型','','warning');
            return false;
        }
    }
    $scope.clientName=function(name){
        var userName=salesbonus.verifyclient({name:name});
        userName.success(function(data){
            if(data.code == 200){
                if(data.rst.exist == 'yes'){

                }else if(data.rst.exist == 'no'){
                    swal("请输入已经认证过的业务客户！！", "", "warning");
                    return false;
                }
            }else{

            }
        })
    }
    $scope.allCheck = function(){
        var parent = $("#cgList").find(".allList").eq(0);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.file){
                $scope.file[x].rightAdd = true;
            }
            for(var j in $scope.fileError){
                $scope.fileError[j].errorAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var i in $scope.file){
                delete  $scope.file[i].rightAdd;
            }
            for(var g in $scope.fileError){
                delete $scope.fileError[g].errorAdd;
            }
        }
    }
    $scope.checkDel = function(idx){
        var parent = $("#cgList").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.file){
                $scope.file[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.file){
                delete  $scope.file[idx].rightAdd;
            }

        }
    }
    $scope.DelError = function(idx){
        var parent = $("#cgList").find(".listerror").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.fileError){
                $scope.fileError[idx].errorAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.fileError){
                delete $scope.fileError[idx].errorAdd;
            }
        }
    }

    $scope.xsfdDel = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.file.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.file = rightArr;
        $scope.fileError.forEach(function(item){
            if(item.errorAdd){

            }else{
                errorArr.push(item)
            }
        });
        $scope.fileError = errorArr;
    }
    $scope.addData = function(data,statue){
        if($scope.cgList.length <= 0 && $scope.file.length <= 0 && $scope.fileError.length<=0){
            swal("请添加数据", "", "warning");
            return false;
        }
        var arr = $scope.cgList.concat($scope.file,$scope.fileError);
        var param = {doc:{model:data,items:arr}};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if(statue == "save"){
            var addInside = salesbonus.savesalesbonus(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = salesbonus.savesalesAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                    //swal("提交成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }
    }
}]);


salesbonusApp.controller('salesbonusTransferCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId,_id:$stateParams.id};
    var viewPur = salesbonus.viewsalesbonus(param);
    var fduserName;
    var fduserId;
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            fduserName=data.rst.user.name;
            $scope.clientName=function(name){
                var userName=salesbonus.verifyclient({name:name});
                userName.success(function(data){
                    if(data.code == 200){
                        if(data.rst.id){
                            fduserId = data.rst.id;
                        }else{
                            swal("请输入已经认证过的业务客户！！", "", "warning");
                            return false;
                        }
                    }else{

                    }
                })
            }
        }
    }).error(function(error){
        alert(error);
    });
    $scope.compare=function(data,sum){
        if( data > sum){
            $scope.zyStyle = {
                border : '1px solid red'
            }
        }else{
            $scope.zyStyle = {
                border : '1px solid #ddd'
            }
        }
    }

    $scope.addData = function(data){
        if($scope.ORDER_DATA.bonusmoney.transfer > $scope.ORDER_DATA.bonusmoney.total - $scope.ORDER_DATA.bonusmoney.freeze - $scope.ORDER_DATA.bonusmoney.used){
            swal('转移金额不能大于可用金额','','warning');
            return false;
        }else if($scope.ORDER_DATA.bonusmoney.transfer<=0){
            swal("转移金额不能为0！！", "", "warning");
            return false;
        }
        var userName=salesbonus.verifyclient({name:$scope.ORDER_DATA.user.name});
        userName.success(function(data){
            if(data.code == 200){
                if(data.rst.id){

                }else{
                    swal("请输入已经认证过的业务客户！！", "", "warning");
                    return false;
                }
            }
        })
        if(data.user.name == fduserName){
            swal("请更换转移客户！！", "", "warning");
            return false;
        }else{
            $scope.ORDER_DATA.docName = $scope.docName;
            data.user.id = fduserId;
            var param = {doc:{items:[data],model:{code:$scope.ORDER_DATA.code}}};
            var addInside = salesbonus.transfer(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                    // $scope.file.items = [];
                }else {
                    alert(data.msg);
                }
            });
        }

    }
}]);
salesbonusApp.controller('salesbonuszyCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = salesbonus.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.items[0];
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

        }

    }).error(function(error){
        alert(error);
    });

    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = salesbonus.savesaleszy(param);
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

        var applyAgree = salesbonus.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var disagree = salesbonus.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var cancel = salesbonus.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var recall = salesbonus.recall(param);
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
salesbonusApp.controller('salesbonuszyedit', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = salesbonus.applyView(param);
    var fduserName;
    var fduserId;
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.items[0];
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.clientName=function(name){
                var userName=salesbonus.verifyclient({name:name});
                userName.success(function(data){
                    if(data.code == 200){
                        if(data.rst.id){
                            fduserId = data.rst.id;
                        }else{
                            swal("请输入已经认证过的业务客户！！", "", "warning");
                            return false;
                        }
                    }else{

                    }
                })
            }
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

        }

    }).error(function(error){
        alert(error);
    });

    $scope.compare=function(data,sum){
        if( data > sum){
            $scope.zyStyle = {
                border : '1px solid red'
            }
        }else{
            $scope.zyStyle = {
                border : '1px solid #ddd'
            }
        }
    }

    $scope.addData = function(data,statue){
        if($scope.ORDER_DATA.bonusmoney.transfer > $scope.ORDER_DATA.bonusmoney.total - $scope.ORDER_DATA.bonusmoney.freeze - $scope.ORDER_DATA.bonusmoney.used){
            swal('转移金额不能大于可用金额','','warning');
            return false;
        }else if($scope.ORDER_DATA.bonusmoney.transfer<=0){
            swal("转移金额不能为0！！", "", "warning");
            return false;
        }
        var userName=salesbonus.verifyclient({name:$scope.ORDER_DATA.user.name});
        userName.success(function(data){
            if(data.code == 200){
                if(data.rst.id){

                }else{
                    swal("请输入已经认证过的业务客户！！", "", "warning");
                    return false;
                }
            }
        })
        if(data.user.name == fduserName){
            swal("请更换转移客户！！", "", "warning");
            return false;
        }else {
            data.user.id = fduserId;
            var param = {
                doc: {items: [data], model: {code: $scope.ORDER_DATA.code}},
                processId: $scope.processId,
                nodeId: $scope.nodeId
            };
            if (statue == "save") {
                var addInside = salesbonus.savesaleszy(param);
                addInside.success(function (data) {
                    if (data.code == 200) {
                        swal("保存成功", "", "success");
                    } else {
                        alert(data.msg);
                    }
                });
            } else if (statue == 'apply') {
                var applyAdd = salesbonus.savesaleszyAdd(param);
                applyAdd.success(function (data) {
                    if (data.code == 200) {
                        swal({
                            title: "提交成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/salesbonusOrder';
                        });
                    } else {
                        alert(data.msg);
                    }
                });
            }
        }
    }

}]);


salesbonusApp.controller('salesbonusChangeCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId,_id:$stateParams.id};
    var viewPur = salesbonus.viewsalesbonus(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst;
            //$scope.ORDER_DATA.bonusmoney.total = '';
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
        }
    }).error(function(error){
        alert(error);
    });
    $scope.rebNum=function(num,znum,dysum){
        if( num > znum || num < dysum){
            $scope.fdjeInput = {
                border:'1px solid red'
            }
        }else{
            $scope.fdjeInput = {
                border:'1px solid #ddd'
            }
        }
    }
    $scope.addData = function(data){
        if($scope.ORDER_DATA.bonusmoney.total > $scope.ORDER_DATA.bonusmoney.origintotal || $scope.ORDER_DATA.bonusmoney.total < $scope.ORDER_DATA.bonusmoney.freeze + $scope.ORDER_DATA.bonusmoney.used){
            swal('请检查：（冻结金额+已用金额）≤返点金额≤原始金额','','warning');
            return false;
        }else if(($scope.ORDER_DATA.bonusmoney.total-$scope.ORDER_DATA.bonusmoney.freeze-$scope.ORDER_DATA.bonusmoney.used)<0){
            swal('可用金额不能小于0','','warning');
            return false;
        }
        var param = {doc:{items:[data],model:{code:$scope.ORDER_DATA.code}}};
        var addInside = salesbonus.change(param);
        addInside.success(function(data){
            if(data.code == 200){
                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                // $scope.file.items = [];
            }else {
                alert(data.msg);
            }
        });
    }
}]);
salesbonusApp.controller('salesbonusbgCtrl',['$scope','$stateParams','salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = salesbonus.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.items[0];
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

        }

    }).error(function(error){
        alert(error);
    });
    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = salesbonus.savesaleszy(param);
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
        var applyAgree = salesbonus.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var disagree = salesbonus.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var cancel = salesbonus.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var recall = salesbonus.recall(param);
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
salesbonusApp.controller('salesbonusbgEditCtrl',['$scope','$stateParams','salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = salesbonus.applyView(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.items[0];
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;

        }

    }).error(function(error){
        alert(error);
    });
    $scope.rebNum=function(num,znum,dysum){
        if( num > znum || num < dysum){
            $scope.fdjeInput = {
                border:'1px solid red'
            }
        }else{
            $scope.fdjeInput = {
                border:'1px solid #ddd'
            }
        }
    }
    $scope.addData = function(data,statue){
        if($scope.ORDER_DATA.bonusmoney.total > $scope.ORDER_DATA.bonusmoney.origintotal || $scope.ORDER_DATA.bonusmoney.total < $scope.ORDER_DATA.bonusmoney.freeze + $scope.ORDER_DATA.bonusmoney.used){
            swal('请检查：（冻结金额+已用金额）≤返点金额≤原始金额','','warning');
            return false;
        }else if(($scope.ORDER_DATA.bonusmoney.total-$scope.ORDER_DATA.bonusmoney.freeze-$scope.ORDER_DATA.bonusmoney.used)<0){
            swal('可用金额不能小于0','','warning');
            return false;
        }
        var param = {doc:{items:[data],model:{code:$scope.ORDER_DATA.code}}};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if(statue == "save"){
            var addInside = salesbonus.savesalesbg(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = salesbonus.savesalesbgAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                }else {
                    alert(data.msg);
                }
            });
        }
    }
}]);


salesbonusApp.controller('salesbonusFreezeCtrl',['$scope','$stateParams','salesbonusApp',function($scope,$stateParams,salesbonus){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId,_id:$stateParams.id};
    var viewPur = salesbonus.viewsalesbonus(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
        }
    }).error(function(error){
        alert(error);
    });
    $scope.freezeNum = function(freeze,dynum){
        if(freeze > dynum){
            $scope.djMoney = {
                border:'1px solid red'
            }
        }else{
            $scope.djMoney = {
                border:'1px solid #ddd'
            }
        }
    }
    $scope.addData = function(data){
        if($scope.ORDER_DATA.bonusmoney.freeze > $scope.ORDER_DATA.bonusmoney.total- $scope.ORDER_DATA.bonusmoney.used){
            swal('冻结金额不能大于可用金额','','warning');
            return false;
        }else if(($scope.ORDER_DATA.bonusmoney.total-$scope.ORDER_DATA.bonusmoney.freeze-$scope.ORDER_DATA.bonusmoney.used)<0){
            swal('可用金额不能小于0','','warning');
            return false;
        }
        var param = {doc:{items:[data],model:{code:$scope.ORDER_DATA.code}}};
        var addInside = salesbonus.freeze(param);
        addInside.success(function(data){
            if(data.code == 200){
                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                // $scope.file.items = [];
            }else {
                alert(data.msg);
            }
        });
    }
}]);
salesbonusApp.controller('salesbonusjdCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = salesbonus.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.items[0];
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

        }

    }).error(function(error){
        alert(error);
    });

    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = salesbonus.savesalesjd(param);
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
        var applyAgree = salesbonus.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var disagree = salesbonus.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var cancel = salesbonus.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售返点待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=销售返点&&controllercode=XSFD,XSFDJD,XSFDZY,XSFDZF,XSFDBG'; });
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
        var recall = salesbonus.recall(param);
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
salesbonusApp.controller('salesbonusjdeditCtrl', ['$scope', '$stateParams', 'salesbonusApp',function($scope, $stateParams, salesbonus){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = salesbonus.applyView(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.items[0];
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

        }

    }).error(function(error){
        alert(error);
    });
    $scope.freezeNum = function(freeze,dynum){
        if(freeze > dynum){
            $scope.djMoney = {
                border:'1px solid red'
            }
        }else{
            $scope.djMoney = {
                border:'1px solid #ddd'
            }
        }
    }
    $scope.addData = function(data,statue){
        if($scope.ORDER_DATA.bonusmoney.freeze > $scope.ORDER_DATA.bonusmoney.total- $scope.ORDER_DATA.bonusmoney.used){
            swal('冻结金额不能大于可用金额','','warning');
            return false;
        }else if(($scope.ORDER_DATA.bonusmoney.total-$scope.ORDER_DATA.bonusmoney.freeze-$scope.ORDER_DATA.bonusmoney.used)<0){
            swal('可用金额不能小于0','','warning');
            return false;
        }
        var param = {doc:{items:[data],model:{code:$scope.ORDER_DATA.code}},processId:$scope.processId,nodeId:$scope.nodeId};
        if(statue == "save"){
            var addInside = salesbonus.savesalesjd(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = salesbonus.savesaleszyjdAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/salesbonusOrder'; });
                }else {
                    alert(data.msg);
                }
            });
        }
    }
}]);

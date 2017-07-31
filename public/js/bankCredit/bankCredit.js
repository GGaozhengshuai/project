var bankCreditApp = angular.module('bankCreditApp', ['pageDirectives','formDirectives']);
bankCreditApp.service('bankServices', function($http) {
    var service = {
        listInside: function(param) {
            return $http.post('/bankcredit/list',param ,{cache:false});
        },
        viewInside: function(param) {
            return $http.post('/bankcredit/read',param ,{cache:true});
        },
        addInside: function(param){
            return $http.post('/bankcredit/save',param ,{cache:false});
        },
        updateInside: function(param){
            return $http.post('/bankcredit/update',param ,{cache:false});
        },
        deleteInside: function(param){
            return $http.post('/bankcredit/delete',param ,{cache:false});
        },
        fkdWlist: function(param){
            return $http.post('/bankcredit/selectfksq',param,{cache:false});
        },
        applyAdd: function(param){
            return $http.post('/bankcredit/createprocess',param ,{cache:false});
        },//审批接口
        applyView: function(param) {
            return $http.post('/bankcredit/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/bankcredit/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/bankcredit/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/bankcredit/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/bankcredit/recall',param ,{cache:false});
        },//银行授信额度管理
        bkList: function(param){
            return $http.post('/bankmoney/list',param,{cache:false});
        },
        bkAdd: function(param){
            return $http.post('/bankmoney/add',param ,{cache:false});
        },
        bkUpdate: function(param) {
            return $http.post('/bankmoney/update',param ,{cache:false});
        },
        bkRead: function(param) {
            return $http.post('/bankmoney/read',param ,{cache:false});
        },
        bkDelete: function(param) {
            return $http.post('/bankmoney/delete',param ,{cache:false});
        },//部门银行授信额度
        bmList: function(param){
            return $http.post('/deptmoney/list',param,{cache:false});
        },
        bmAdd: function(param){
            return $http.post('/deptmoney/add',param ,{cache:false});
        },
        bmUpdate: function(param) {
            return $http.post('/deptmoney/update',param ,{cache:false});
        },
        bmRead: function(param) {
            return $http.post('/deptmoney/read',param ,{cache:false});
        },
        bmSelectRead: function(param) {
            return $http.post('/bankcredit/selectdeptmoney',param ,{cache:false});
        },
        bkSelectRead: function(param) {
            return $http.post('/bankcredit/selectbankmoney',param ,{cache:false});
        },
        bmDelete: function(param) {
            return $http.post('/deptmoney/delete',param ,{cache:false});
        },
        listEmployee: function(param) {
            return $http.post('/org/read',param ,{cache:false});
        },
        listUser: function(param){
            return $http.post('/user/list',param);
        },
        gysList: function(param){//供应商
            return $http.post('/credit/selectgysyh',param ,{cache:false});
        },
        htList: function(param){//合同
            return $http.post('/bankcredit/selectcontract',param ,{cache:false});
        },
        updatebankcredit: function(param){//追加银行授信信息
            return $http.post('/bankcredit/updatebankcredit',param ,{cache:false});
        },
        viewpay: function(param) {
            return $http.post('/credit/view',param ,{cache:true});
        },
        payView: function(param) {//付款申请
            return $http.post('/credit/detail',param ,{cache:false});
        },
        checkfksq : function(param){
            return $http.post('/bankcredit/checkfksq',param,{cache:false});
        },
        exportexcel : function(param){
            return $http.post('bankcredit/exportexcel',param,{cache:false});
        },
        selectundate : function(param){
            return $http.post('bankcredit/selectundate',param,{cache:false});
        },
        selectused : function(param){
            return $http.post('bankcredit/selectused',param,{cache:false});
        },
        creditforsap : function(param){
            return $http.post('bankcredit/creditforsap',param,{cache:false});
        },
        bankpay : function (param) {
            return $http.post('bankcredit/bankpay',param,{cache:false});
        },
        findorgid : function(param){
            return $http.post('/org/findorgid',param,{cache:false});
        },
        getprocesslog: function(param) {
            return $http.post('/bankcredit/getprocesslog',param,{cache:false});
        },
        checkyhsxzf : function(param){
            return $http.post('bankcredit/checkyhsxzf',param,{cache:false});
        }
    };
    return service;
});

bankCreditApp.controller('bkBankCreditCtrl', ['$scope','$stateParams','$rootScope','$filter','bankServices',function($scope,$stateParams,$rootScope,$filter,service){
   $scope.ORDER_DATA={};
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage};
            var customerPromise = service.bkList(param);
            $scope.opprev = $rootScope.opprev;
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.addBkBox = function(){
        $( "#bkBox" ).dialog({
            autoOpen: false,
            width: 400,
            modal: true
        });
        $( "#bkBox" ).dialog( "open" );
    }
    $scope.bkCancel = function(){
        $( "#bkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.rightDate=function (startdate) {
        var d = new Date();
        var str = $filter('date')(d,'yyyy-MM-dd');
        if(Date.parse(startdate) < Date.parse(str)){
            swal("有效开始时间选择不能早于当前日期 ", "","warning");
            $scope.ORDER_DATA.startdate="";
            return false;
        }

    }
    $scope.addData = function(data){
        var param = {};
        param = data;
        var bkAdd = service.bkAdd(param);
        bkAdd.success(function(data){
            if(data.code == 200){
                swal("添加成功", "", "success");
                $( "#bkBox" ).dialog("destroy");
                $(".ui-dialog").remove();
                $scope.search();
            }else {
                //alert(data.msg);
                swal(data.msg, "", "warning");
            }
        });
    }
    $scope.bkDelet = function(id,index){
        var param = {};
        param._id = id;
        swal({
            title: "确定要删除吗？",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: false
        }, function(){
            var bkDelete = service.bkDelete(param);
            bkDelete.success(function(data){
                if(data.code == 200){
                    $scope.dataList.splice(index,1);
                    swal("删除成功", "", "success");
                }else {
                    //alert(data.msg);
                    swal(data.msg, "", "warning");
                }
            });
        });
    }

    //变更 银行授信
    var vm = $scope;

    vm.bankChange = function(v){
        vm.bank = v.bank;
        vm.rmblimit = v.rmblimit;
        vm.startdate = $filter('date')(v.startdate,'yyyy-MM-dd');
        vm._id = v._id;
        vm.usedrmb = v.usedrmb;
        $( "#changebankbox" ).dialog({
            autoOpen: false,
            width: 400,
            modal: true
        });
        $( "#changebankbox" ).dialog( "open" );
    }


    vm.cbkCancel = function(){
        $( "#changebankbox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }


    vm.changeSave = function(){
        var bkUpdate = service.bkUpdate({'bank':vm.bank,'rmblimit':vm.rmblimit,'startdate':vm.startdate,'_id':vm._id,'usedrmb':vm.usedrmb});
        bkUpdate.success(function(data){
            if(data.code == 200){
                swal('变更成功','','success');
                $( "#changebankbox" ).dialog("destroy");
                vm.search();
            }
        });
    }
}]);

bankCreditApp.controller('bmBankCreditCtrl', ['$scope','$stateParams','$rootScope','bankServices',function($scope,$stateParams,$rootScope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage};
            var customerPromise = service.bmList(param);
            $scope.opprev = $rootScope.opprev;
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.addBkBox = function(){
        $( "#bmBox" ).dialog({
            autoOpen: false,
            width: 400,
            modal: true
        });
        $( "#bmBox" ).dialog( "open" );
    }
    $scope.bmCancel = function(){
        $( "#bmBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.getEmployee = function(id,name){
        var param = { _id: id, hasuser:true};
        var employeeList = service.listEmployee(param);
        $scope.orgname = name;
        if(name){
            $scope.empName = name;
        }else{
            $scope.empName = '中建材集团';
        }
        $scope.orgid = id;
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0 && data.rst.data.belongs.orgs[0].level<1){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                    //$scope.employeeUser = data.rst.data.belongs.users;
                }

            }
        })
    };

    $scope.getEmployee1 = function(){
        $scope.orgname = '综合';
        $scope.orgid = '9900';
    }
    $scope.employee = function(){
        $( "#emBox" ).dialog({
            autoOpen: false,
            width: 300,
            height:480,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee();
        $( "#emBox" ).dialog( "open" );

    }

    $scope.addData = function(){
        var param = {};
        param.orgname = $scope.orgname;
        param.orgid = $scope.orgid;
        param.deptlimit = $scope.deptlimit;
        var bkAdd = service.bmAdd(param);
        bkAdd.success(function(data){
            if(data.code == 200){
                swal("添加成功", "", "success");
                $( "#bmBox" ).dialog("destroy");
                $(".ui-dialog").remove();
                $scope.search();
            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }
    $scope.bkDelet = function(id,index){
        var param = {};
        param._id = id;
        swal({
            title: "确定要删除吗？",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: true
        }, function(){
            var bkDelete = service.bmDelete(param);
            bkDelete.success(function(data){
                if(data.code == 200){
                    $scope.dataList.splice(index,1);
                    swal("删除成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        });
    }

    //变更额度
    var vm = $scope;
    vm.bankedClick = function(v){
        vm.orgname = v.orgname;
        vm.deptlimit = v.deptlimit;
        vm.orgid = v.orgid;
        vm.deptused = v.deptused;
        vm._id = v._id;

        $( "#bmchBox" ).dialog({
            autoOpen: false,
            width: 400,
            modal: true
        });
        $( "#bmchBox" ).dialog( "open" );
    }

    vm.bmclose = function(){
        $( "#bmchBox" ).dialog("destroy");
    }

    vm.changeSaveCli = function(){
        var bmUpdate = service.bmUpdate({
            'orgname':vm.orgname,
            'deptlimit':vm.deptlimit,
            'orgid':vm.orgid,
            'deptused':vm.deptused,
            '_id':vm._id
        });
        bmUpdate.success(function(data){
            if(data.code == 200){
                swal('变更成功','','success');
                $( "#bmchBox" ).dialog("destroy");
                vm.search();
            }
        });
    }
}]);

bankCreditApp.controller('userNameBoxCtrl', ['$scope','bankServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.useSname};
            var customerPromise = service.listUser(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);

bankCreditApp.controller('fkdBoxCtrl', ['$scope','bankServices',function($scope,service){
    $scope.search = function(){
        var param={ZSQNO: $scope.ZSQNO,credittype:$scope.ORDER_DATA.credittype,ZSKDW:$scope.ORDER_DATA.ZSKDW};
        var fkdWlist = service.fkdWlist(param);
        fkdWlist.success(function(data){
            if(data.code == 200){
                $scope.fkWsList = data.rst.data.items;
            }else{
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }
}]);


bankCreditApp.controller('applyBankCreditCtrl', ['$scope','$stateParams','$rootScope','bankServices',function($scope,$stateParams,$rootScope,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = apply.applyView(param);
    $scope.processId = $stateParams.processId;
    $scope.nodeId = $stateParams.nodeId;
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.bankFkList = data.rst.doc.model.fksqinfo;
            $scope.candidates = data.rst.candidates;
            if(data.rst.doc.model.credittype == "保函"){
                $scope.ifBh = false;
                $scope.ifBhBot = true;
                if(!data.rst.doc.model.loiinfo && data.rst.doc.model.opendate){
                    $scope.yinh3If = true;
                }
            }else {
                $scope.ifBh = true;
                $scope.ifBhBot = false;
                if(!data.rst.doc.model.returninfo && data.rst.doc.model.opendate){
                    $scope.yinh2If = true;
                }
            }
            $scope.bankzf = data.rst.doc.model.DOCTYPE ? true : false;
            if(!data.rst.doc.model.opendate){
                $scope.yinh1If = true;
            }
            var moneycountry = {
                'CNY':'人民币',
                'EUR':'欧元',
                'USD':'美元',
                'CHF':'瑞士法郎',
                'HKD':'港币',
                'JPY':'日元',
            }
            $scope.moneycountry = moneycountry;
            $scope.processlog = data.rst.processlog;
            $scope.doc = data.rst.doc;
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
            if($stateParams.pay){
                $scope.textareaBtn = false;
                $scope.agreeBtn = false;
                $scope.disagreeBtn = false;
                $scope.cancelBtn = false;
                $scope.editBtn = false;
                $scope.recallBtn = false;
            }

        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    }).error(function(error){
        alert(error);
    });
    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc.model;

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
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        if($scope.ORDER_DATA.creditmoney - $scope.ORDER_DATA.deptunused>0 || $scope.ORDER_DATA.creditmoney -$scope.ORDER_DATA.unusedrmb>0){
            // 判断是否显示提示信息
            if($scope.ORDER_DATA.creditmoney - $scope.ORDER_DATA.deptunused>0 || $scope.ORDER_DATA.creditmoney -$scope.ORDER_DATA.unusedrmb>0){
                swal({
                    title: "确定要执行审批操作吗？",
                    text: "授信金额不能大于部门可用银行授信额度或者银行可用人民币授信额度",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: '确定'
                }, function(){ $scope.applyAgreeOk(param); });
                return false;
            }
        }
        $scope.applyAgreeOk(param);
        //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];

    };
    $scope.applyAgreeOk = function(param) {

        $scope.applyFn = function (selIndex) {
            //var param = {};
            //param.doc = $scope.doc;
            //param.comment = applyObj.applyIdea;
            //param.processId = $stateParams.processId;
            //param.nodeId = $stateParams.nodeId;
            //param.nodeType = $scope.nodeType;
            //param.candidates = $scope.candidates;
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            var applyAgree = apply.agree(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回银行授信待办",
                        closeOnConfirm: true
                    }, function(){
                    	// window.location.href='/index.html#/index';
	                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=银行授信&&controllercode=YHSX,YHSXZF';
                    });
                }else {
                    swal("提交失败！", '', "error");
                }
            }).error(function(error){
                alert(error);
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
                    confirmButtonText: "返回银行授信待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=银行授信&&controllercode=YHSX,YHSXZF';
                });
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
                    confirmButtonText: "返回银行授信待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=银行授信&&controllercode=YHSX,YHSXZF';
                });
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


bankCreditApp.controller('bankCreditOrderCtrl', ['$scope','$rootScope','$filter','bankServices',function($scope,$rootScope,$filter,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,code:$scope.code, creditbody:$scope.creditbody,credittype: $scope.credittype,orgname:$scope.orgname,bankname:$scope.bankname,status:$scope.status,contractno:$scope.contractno};
            var customerPromise = service.listInside(param);
            customerPromise.success(function(data){
                if(data.code==200){
                    $scope.opprve = $rootScope.opprve;
                    $scope.dataList=data.rst.data.items;
                }
            })
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    var bkList = service.bkList();
    bkList.success(function(data){
        if(data.code == 200){
            $scope.bklistItem = data.rst.data.items;
        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    });
    //$scope.exportexcel = function(date){
    //    if(date == ''){
    //        swal('请输入日期','','warning');
    //    }else{
    //       var path = '/bankcredit/exportexcel?date='+date;
    //        console.log(path);
    //        window.open(path);
    //    }
    //}

    var vm = $scope;

    vm.bankNullify = function(v){
        var checkfkArr = [];
        _.forEach(v.fksqinfo,function(item){
           // fkjson.ZSQNO = item.ZSQNO;
            checkfkArr.push(item.ZSQNO);
        });
        var  checkyhsxzf = service.checkyhsxzf({code:v.code,fksqinfo:checkfkArr});
        checkyhsxzf.success(function(data){
            if(data.code == 200){
                swal({
                    title: "确定要执行作废吗？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: '确定'
                }, function(){
                    var param = _.extend(v,{DOCTYPE:'YHSXZF'});
                    var applyAdd = service.applyAdd({doc:param});
                    applyAdd.success(function(data){
                            if(data.code == 200){
                                swal('作废申请已提交','','success');
                                vm.search();
                            }else{
                                swal(data.msg,'','error');
                            }
                    });

                });
            }else{
                swal(data.msg,'','error');
            }
        });
    }

}]);

bankCreditApp.controller('gysBoxCtrl', ['$scope','bankServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, ZSKDW:$scope.ZSKDW};
            var customerPromise = service.gysList(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.cusSelect = function(LIFNR,NAME1,BANKN,BANKA){
        $scope.ORDER_DATA.ZSKDW = NAME1;//供应商名称
        $scope.ORDER_DATA.providerid = LIFNR;//供应商编号
        $( "#gysBoxBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
}]);
bankCreditApp.controller('yhhtBoxCtrl', ['$scope','bankServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, project:$scope.project,contractno:$scope.contractno};
            var customerPromise = service.htList(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.htSelect = function(project,stomer,contractno,contractmoney){
        $scope.ORDER_DATA.project = project;//销售合同号
        $scope.ORDER_DATA.stomer = stomer;
        $scope.ORDER_DATA.contractno = contractno;
        $scope.ORDER_DATA.contractmoney = contractmoney;

        // $scope.ORDER_DATA.providername = NAME1;//供应商名称
        // $scope.ORDER_DATA.providerid = LIFNR;//供应商编号
        $( "#yhhtBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
}]);
bankCreditApp.controller('bankCreditOrderAddCtrl', ['$scope','bankServices','$state','$stateParams',function($scope,service,$state,$stateParams){

    $scope.bankCancel=true;
    $scope.ifShow = false;
    $scope.creditbodyEdiet = false;
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    $scope.ORDER_DATA.bank = {};
    $scope.bankF1kList=[];
    $scope.ORDER_DATA.jehj = 0;
    if($stateParams.sap){
        $scope.ifBh = true;
        $scope.ifShow = true;
        var sapid = {sapid:$stateParams.sap};
        var viewpay = service.viewpay(sapid);
        viewpay.success(function(data){
            if(data.code==200){
                $scope.ORDER= data.rst.data.model;
                $scope.ORDER_DATA.creditbody= $scope.ORDER.ZFKZT;
                $scope.ORDER_DATA.credittype= $scope.ORDER.ZFKFS;
                $scope.ORDER_DATA.creditmoney=+$scope.ORDER.ZSJFKJE;
                $scope.ORDER_DATA.ZSKDW= $scope.ORDER.ZSKDW;
                $scope.ORDER_DATA.ZSKDW= $scope.ORDER.ZSKDW;
                $scope.ORDER_DATA.moneycountry= "CNY";
                /* $scope.ORDER_DATA.margin= 0;*/
                console.log(data.rst.data.model.ZSJDAT,data.rst.data.model.ZJHDAT)
                //var sArr = data.rst.data.model.ZSJDAT.split("-");
                //var eArr = data.rst.data.model.ZJHDAT.split("-");
                //var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
                //var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
                //var result = (sRDate-eRDate)/(24*60*60*1000);
                //$scope.ORDER_DATA.limitdays=result;
                if($scope.ORDER.ZSQNO){
                    $scope.ifBh=true;
                    $scope.bankCancel=false;
                    $scope.ORDER_DATA.ZBM = data.rst.data.model.ZBM;
                    var fkzjEnum= {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'}[data.rst.data.model.ZBM];     //付款申请单需要用到翻译资金占用部门enum
                    $scope.bankF1kList=[{ZSQNO:data.rst.data.model.ZSQNO,ZSKDW:data.rst.data.model.ZSKDW,ZFKFS:data.rst.data.model.ZFKFS,ZSJFKJE:data.rst.data.model.ZSJFKJE,ZBM:fkzjEnum}]

                    $scope.ORDER_DATA.jehj=+data.rst.data.model.ZSJFKJE;
                    if(data.rst.data.model.ZBM == '9900'){
                        var bmRead = service.bmSelectRead({'ZBMID':'9900'});
                        bmRead.success(function(data){
                            $scope.ORDER_DATA.ZBMID = '9900';
                            $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                            $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                        });
                    }else{
                        var findorgidjk = service.findorgid({ZBM:fkzjEnum});
                        findorgidjk.success(function(data){
                            $scope.ORDER_DATA.ZBMID = data.rst.data._id;
                            var bmRead = service.bmSelectRead({'ZBMID':data.rst.data._id});
                            bmRead.success(function(data){
                                $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                                $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                            });
                        });
                    }
                }
            }else{
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }
    if($stateParams.proId&&$stateParams.noId){
        $scope.ifBh = true;
        $scope.ifShow = true;
        $scope.creditbodyEdiet = true;
        var paramPay  = {processId:$stateParams.proId, nodeId:$stateParams.noId};
        var viewpay = service.payView(paramPay);
        viewpay.success(function(data){
            if(data.code==200){
                $scope.ORDER1= data.rst.doc.model;
                $scope.ORDER_DATA.creditbody= $scope.ORDER1.ZFKZT;
                $scope.ORDER_DATA.credittype= $scope.ORDER1.ZFKFS;
                $scope.ORDER_DATA.creditmoney= +$scope.ORDER1.ZSJFKJE;
                $scope.ORDER_DATA.ZSKDW= $scope.ORDER1.ZSKDW;
                $scope.ORDER_DATA.providerid= $scope.ORDER1.LIFNR;
                $scope.ORDER_DATA.moneycountry= "CNY";
                /* $scope.ORDER_DATA.margin= 0;*/
                /* var sArr = data.rst.doc.model.ZSJDAT.split("-");
                 var eArr = data.rst.doc.model.ZJHDAT.split("-");
                 var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
                 var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
                 var result = (eRDate-sRDate)/(24*60*60*1000);
                 $scope.ORDER_DATA.limitdays=result;*/
                if($scope.ORDER1.ZSQNO){
                    $scope.ifBh=true;
                    $scope.bankCancel=false;
                    $scope.ORDER_DATA.ZBM = data.rst.doc.model.ZBM;
                    var fkzjEnum= {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'}[data.rst.doc.model.ZBM];
                    $scope.bankF1kList=[{ZSQNO:data.rst.doc.model.ZSQNO,ZSKDW:data.rst.doc.model.ZSKDW,ZFKFS:data.rst.doc.model.ZFKFS,ZSJFKJE:data.rst.doc.model.ZSJFKJE,ZBM:fkzjEnum}]
                    $scope.ORDER_DATA.jehj=+data.rst.doc.model.ZSJFKJE;
                    if(data.rst.doc.model.ZBM == '9900'){
                        var bmRead = service.bmSelectRead({'ZBMID':'9900'});
                        bmRead.success(function(data){
                            $scope.ORDER_DATA.ZBMID = '9900';
                            $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                            $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                        });
                    }else{
                        var findorgidjk = service.findorgid({ZBM:fkzjEnum});
                        findorgidjk.success(function(data){
                            $scope.ORDER_DATA.ZBMID = data.rst.data._id;
                            var bmRead = service.bmSelectRead({'ZBMID':data.rst.data._id});
                            bmRead.success(function(data){
                                $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                                $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                            });
                        });
                    }
                }
            }else{
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }

    //供应商
    $scope.gysBox = function(){
        $( "#gysBoxBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#gysBoxBox" ).dialog( "open" );
        $scope.$watch('ZSKDW',function(){
            $scope.bankFkList.forEach(function(item){
                item.ZSQNO = '';
                item.ZSKDW = '';
                item.ZFKFS = '';
                item.ZSJFKJE = '';
            });
            $scope.ORDER_DATA.jehj = 0;
        });
    }
    //合同
    $scope.htBox = function(){
        $( "#yhhtBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#yhhtBox" ).dialog( "open" );
    }
    //授信品种为“非保函”时，默认值为中建材信息技术股份有限公司
    $scope.sxpz = function(type){
        if(type == '保函'){
            $scope.ifBh = false;
            $scope.ifBhBot = true;
            $scope.ifzjzybm = false;        //资金占用部门
            $scope.ORDER_DATA.creditbody = '';
        }else{
            $scope.ORDER_DATA.creditbody = '1000';
            $scope.ifBh = true;
            $scope.ifBhBot = false;
            $scope.ifzjzybm = true;
            $scope.label = type == '应收账款保理' ? false : true;
            $scope.ifzjzybm = type == '应收账款保理' ? false : true;
            $scope.ORDER_DATA.ZBM = '';
            $scope.ORDER_DATA.ZBMID = '';
        }
    }
    $scope.userBox = function(){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#userBox" ).dialog( "open" );
    }
    $scope.userSelect = function(user, userId, orgName, orgId){
        $scope.ORDER_DATA.username = user;
        $scope.ORDER_DATA.userid = userId;
        $scope.ORDER_DATA.orgname = orgName;
        $scope.ORDER_DATA.orgid = orgId;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
        //var bmRead = service.bmSelectRead({'orgid':orgId});
        //bmRead.success(function(data){
        //    if(data.code == 200){
        //        $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
        //        $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
        //    }else{
        //        swal(data.msg, "", "warning");
        //        $scope.ORDER_DATA.username = '';
        //        //alert(data.msg);
        //    }
        //});

    }
    //资金占用部门获取银行额度
    $scope.zjzybm = function(ZBM) {
        var enumZBM = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'}[ZBM];
        if(ZBM == '9900'){
            var bmRead = service.bmSelectRead({'ZBMID':'9900'});
            bmRead.success(function(data){
                $scope.ORDER_DATA.ZBMID = '9900';
                $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
            });
        }else{
            var findorgidjk = service.findorgid({ZBM:enumZBM});
            findorgidjk.success(function(data){
                $scope.ORDER_DATA.ZBMID = data.rst.data._id;
                var bmRead = service.bmSelectRead({'ZBMID':data.rst.data._id});
                bmRead.success(function(data){
                    if(data.code == 200){
                        $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                        $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                    }else{
                        $scope.ORDER_DATA.deptused = '';
                        $scope.ORDER_DATA.deptunused = '';
                    }
                });
            });
        }

    }

    var bkList = service.bkList();
    bkList.success(function(data){
        if(data.code == 200){
            $scope.bklistItem = data.rst.data.items;
        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    });
    $scope.bankSelect = function(id){
        $scope.bklistItem.forEach(function(item){    //反差一次 银行接口 需要给后台传送 银行名字
            if(item._id == id){
                $scope.ORDER_DATA.bank.name = item.bank;
            }
        });
        if(id == undefined){
            $scope.ORDER_DATA.usedrmb = '';
            $scope.ORDER_DATA.unusedrmb = '';
        }else{
            var selectObj = getField($scope.bklistItem,'_id',id) || {};
            $scope.ORDER_DATA.bank.name = selectObj.bank;
            var bkRead = service.bkSelectRead({'_id':id});
            bkRead.success(function(data){
                if(data.code == 200){
                    $scope.ORDER_DATA.usedrmb = data.rst.data.usedsum;
                    $scope.ORDER_DATA.unusedrmb = data.rst.data.unusedsum;
                }else{
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }
    }
    var bankFkList = $scope.bankFkList = [];

    $scope.bankFkAdd = function(){
        //if($scope.bankF1kList.length > 0 || $scope.bankFkList.length > 0){
        //    swal('只能添加一条付款申请单','','warning');
        //    return false;
        //}
        var obj = {"ZSQNO":'',"ZSKDW":'',"ZFKFS":'',"ZSJFKJE":'','ZFKSTA':''};
        $scope.bankFkList.push(obj);
        $scope.showJehj = true;
    }

    var bkfIndex = 0;
    $scope.bankFkBox = function(index){
        $( "#bankFkBox" ).dialog({
            autoOpen: false,
            width: 700,
            height:400,
            modal: true
        });
        $( "#bankFkBox" ).dialog( "open" );
        var param={credittype:$scope.ORDER_DATA.credittype,ZSKDW:$scope.ORDER_DATA.ZSKDW};
        var fkdWlist = service.fkdWlist(param);
        fkdWlist.success(function(data){
            if(data.code == 200){
                $scope.fkWsList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
        bkfIndex = index;
    }
    $scope.fkdwSelect = function(idx,v){
        var zbmenum = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'}[v.ZBM];

        if(v.ZHB == 'Y'){
            swal('该付款申请已合并付款,不可引用','','warning');
            return false;
        }

        var sTd = $("#itemTable").find(".list").eq(bkfIndex);
        sTd.find("input:eq(0)").val(v.ZSQNO).trigger('change');
        sTd.find("input:eq(1)").val(v.ZSKDW).trigger('change');
        sTd.find("input:eq(2)").val(v.ZFKFS).trigger('change');
        sTd.find("input:eq(3)").val(v.ZSJFKJE).trigger('change');
        sTd.find("input:eq(4)").val(v.ZBM).trigger('change');
        sTd.find("input:eq(5)").val(v.ZFKSTA).trigger('change');

        var count = 0;
        for(var x = 0; x < $scope.bankFkList.concat($scope.bankF1kList).length; x++){
            count += parseFloat($scope.bankFkList.concat($scope.bankF1kList)[x].ZSJFKJE);
            $scope.bankFkList[bkfIndex].ZBM = zbmenum;
        }
        var ifNiArr;
        $scope.bankFkList.forEach(function(item){
            if(item.ZSQNO != '' && item.ZSKDW != '' && item.ZFKFS != '' && item.ZSJFKJE != ''&& item.ZBM != '' && item.ZFKSTA != ''){
                return ifNiArr = true;
            }
        });
        if( $scope.bankFkList.length > 1){
            for(var i = 0 ; i < $scope.bankFkList.length; i++){
                if( $scope.bankFkList[i].ZSQNO != ''&& $scope.bankFkList[i].ZSKDW != '' && $scope.bankFkList[i].ZFKFS != '' && $scope.bankFkList[bkfIndex].ZSJFKJE != ''&& $scope.bankFkList[bkfIndex].ZBM != ''){
                    if($scope.bankFkList[0].ZBM !== $scope.bankFkList[i].ZBM){
                        swal('请选择相同的资金占用部门','','warning');
                        $scope.bankFkList[bkfIndex].ZSQNO = '';
                        $scope.bankFkList[bkfIndex].ZSKDW = '';
                        $scope.bankFkList[bkfIndex].ZFKFS = '';
                        $scope.bankFkList[bkfIndex].ZSJFKJE = '';
                        $scope.bankFkList[bkfIndex].ZBM = '';
                        return false;
                    }
                }

            }
        }
        console.log(count);
        $scope.ORDER_DATA.jehj = count;

        if(v.SPZT=="active"){
            $scope.bankFkList[bkfIndex].show=false;
            $scope.ORDER_DATA.ZBM= v.ZBM;
            if(v.ZBM == '9900'){
                var bmRead = service.bmSelectRead({'ZBMID':'9900'});
                bmRead.success(function(data){
                    $scope.ORDER_DATA.ZBMID = '9900';
                    $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                    $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                });
            }else{
                var findorgid = service.findorgid({ZBM:zbmenum});
                findorgid.success(function(data){
                    $scope.ORDER_DATA.ZBMID = data.rst.data._id;
                    var bmRead = service.bmSelectRead({'ZBMID':data.rst.data._id});
                    bmRead.success(function(data){
                        if(data.code == 200){
                            $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                            $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                        }else{
                            $scope.ORDER_DATA.deptused = '';
                            $scope.ORDER_DATA.deptunused = '';
                        }

                    });
                });
            }

        }else if(v.SPZT=="done"){
            $scope.bankFkList[bkfIndex].show=true;
            $scope.ORDER_DATA.ZBM= v.ZBM;
            if(v.ZBM == '9900'){
                var bmRead1 = service.bmSelectRead({'ZBMID':'9900'});
                bmRead1.success(function(data){
                    $scope.ORDER_DATA.ZBMID = '9900';
                    $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                    $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                });
            }else{
                var findorgid1 = service.findorgid({ZBM:zbmenum});
                findorgid1.success(function(data){
                    $scope.ORDER_DATA.ZBMID = data.rst.data._id;

                    var bmRead1 = service.bmSelectRead({'ZBMID':data.rst.data._id});
                    bmRead1.success(function(data){
                        if(data.code == 200){
                            $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                            $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                        }else{
                            $scope.ORDER_DATA.deptused = '';
                            $scope.ORDER_DATA.deptunused = '';
                        }

                    });
                });
            }

        }

        $( "#bankFkBox" ).dialog( "destroy" );
        $(".ui-dialog").remove();
    };
    $scope.ZBM = {'信息产品事业群':'1000','合作业务部':'2000','医疗产品部':'3000','综合':'9900'};
    $scope.ZBM1 = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'};
    $scope.bankFkDel = function(index){
        if($scope.bankFkList.concat($scope.bankF1kList).length <= 1 && $scope.ORDER_DATA.credittype != "应收账款保理"){
            swal("至少要填写一个", "", "warning");
            return false;
        }
        $scope.ORDER_DATA.jehj-=$scope.bankFkList[index].ZSJFKJE;
        /*count=$scope.ORDER_DATA.jehj;*/
        $scope.bankFkList.splice(index,1);
    }
    $scope.addDataOk = function(statue, param) {
        if(statue == "save"){
            var addInside = service.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    if($scope.bankFkList.length != 0){
                      //  $scope.bankFkList[0].ZBM = $scope.ZBM1[$scope.bankFkList[0].ZBM];
                        for(var i = 0; i < $scope.bankFkList.length;i++){
                            $scope.bankFkList[i].ZBM = $scope.ZBM1[$scope.bankFkList[i].ZBM];
                        }
                    }else if($scope.bankF1kList.length != 0){
                        $scope.bankF1kList[0].ZBM = $scope.ZBM1[$scope.bankF1kList[0].ZBM];
                    }
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var addInside = service.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    param.processId = $scope.processId;
                    param.nodeId = $scope.nodeId;
                    var checkfksq = service.checkfksq(param);
                    checkfksq.success(function(data){
                        if(data.code == 200){
                            var applyAdd = service.applyAdd(param);
                            applyAdd.success(function(data){
                                if(data.code == 200){
                                    swal({
                                        title: "提交成功",
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "返回列表",
                                        closeOnConfirm: true
                                    }, function(){   window.location.href='/index.html#/bankCreditOrder'; });
                                }else {
                                    //swal({
                                    //    title:data.msg,
                                    //    type:"warning",
                                    //    showCancelButton: false,
                                    //    confirmButtonColor: "#DD6B55",
                                    //    confirmButtonText: "返回列表",
                                    //    closeOnConfirm: true
                                    //},function(){window.location.href='/index.html#/bankCreditOrder';});
                                    swal(data.msg,'','warning');
                                }
                            });
                        }else{
                            //swal({
                            //    title:data.msg,
                            //    type:"error",
                            //    showCancelButton: false,
                            //    confirmButtonColor: "#DD6B55",
                            //    confirmButtonText: "返回列表",
                            //    closeOnConfirm: true
                            //},function(){window.location.href='/index.html#/bankCreditOrder';});
                            swal(data.msg,'','warning');
                        }
                    });
                }
            });
        }
    };
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            console.log(keyData);
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var doc={},param= {};
        doc = data;

        // 计算付款单合计金额
        if($scope.ORDER_DATA.credittype!="保函" &&  $scope.ORDER_DATA.credittype != "应收账款保理"){
            doc.fksqinfo = $scope.bankFkList.concat($scope.bankF1kList);
            if(statue=='apply'){
                if(!doc.fksqinfo.length){
                    swal("付款单必填", "", "warning");
                    return false;
                }
            }
            if($scope.ORDER_DATA.jehj!==$scope.ORDER_DATA.creditmoney){
                swal("金额合计必须与授信额度相等", "", "warning");
                return false;
            }
        }else{
            doc.fksqinfo = [];
        }
        if($scope.ORDER_DATA.credittype == "应收账款保理" && ($scope.bankFkList.length !== 0 || $scope.bankF1kList.length !== 0)){
            doc.fksqinfo = $scope.bankFkList.concat($scope.bankF1kList);
            if($scope.ORDER_DATA.jehj!==$scope.ORDER_DATA.creditmoney){
                swal("金额合计必须与授信额度相等", "", "warning");
                return false;
            }
        }
        if($scope.bankFkList.length>0){
            var gyName=$scope.bankFkList[0].ZSKDW;
            var gyNum=$scope.bankFkList[0].ZFKFS;
            for(var i=0;i<$scope.bankFkList.length;i++){
                if($scope.bankFkList[i].ZSKDW!==gyName||$scope.bankFkList[i].ZFKFS!==gyNum){
                    swal("关联多个付款申请单时，供应商名称和实际付款方式必须一样", "", "warning");
                    return false;
                }
                $scope.bankFkList[i].ZBM = $scope.ZBM[$scope.bankFkList[i].ZBM]
            }
        }

        if($scope.bankF1kList.length>0){
            $scope.bankF1kList[0].ZBM = $scope.ZBM[$scope.bankF1kList[0].ZBM]
        }
        if($scope.ORDER_DATA.deptunused == '' && $scope.ORDER_DATA.deptused == ''){
            swal('部门额度没有设置,请先部门额度设置','','warning');
            return false;
        }

        doc.bankfj = $scope.docName;
        param.doc = doc;

        if($scope.ORDER_DATA.creditmoney- $scope.ORDER_DATA.deptunused>0 || $scope.ORDER_DATA.creditmoney-$scope.ORDER_DATA.unusedrmb>0){
            swal({
                title: "确定要执行此操作吗？",
                text: "授信金额不能大于部门可用银行授信额度或者银行可用人民币授信额度",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            }, function(){ $scope.addDataOk(statue,param); });
            return false;
        }
        $scope.addDataOk(statue,param);
    }
}]);
bankCreditApp.controller('bankCreditOrderEditCtrl', ['$scope','$stateParams', '$filter', 'bankServices',function($scope, $stateParams, $filter, service){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    //供应商
    $scope.gysBox = function(){
        $( "#gysBoxBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#gysBoxBox" ).dialog( "open" );
    };

    //合同
    $scope.htBox = function(){
        $( "#yhhtBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#yhhtBox" ).dialog( "open" );
    };
    $scope.sxpz = function(type){
        if(type == '保函'){
            $scope.ifBh = false;
            $scope.ifBhBot = true;
            $scope.ifzjzybm = false;        //资金占用部门
            $scope.ORDER_DATA.creditbody = '';
        }else{
            $scope.ORDER_DATA.creditbody = '1000';
            $scope.ifBh = true;
            $scope.ifBhBot = false;
            $scope.ifzjzybm = true;
            $scope.label = type == '应收账款保理' ? false : true;
            $scope.ifzjzybm = type == '应收账款保理' ? false : true;
            $scope.ORDER_DATA.ZBM = '';
            $scope.ORDER_DATA.ZBMID = '';
        }
    };
    $scope.userBox = function(){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#userBox" ).dialog( "open" );
    };
    $scope.userSelect = function(user, userId, orgName, orgId){
        $scope.ORDER_DATA.username = user;
        $scope.ORDER_DATA.userid = userId;
        $scope.ORDER_DATA.orgname = orgName;
        $scope.ORDER_DATA.orgid = orgId;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
        //var bmRead = service.bmSelectRead({'orgid':orgId});
        //bmRead.success(function(data){
        //    if(data.code == 200){
        //        $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
        //        $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
        //    }else{
        //        swal(data.msg, "", "warning");
        //        //alert(data.msg);
        //    }
        //});

    };
    //资金占用部门获取银行额度
    $scope.zjzybm = function(ZBM) {
        if(ZBM == '9900'){
            var bmRead = service.bmSelectRead({'ZBMID':'9900'});
            bmRead.success(function(data){
                $scope.ORDER_DATA.ZBMID = '9900';
                $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
            });
        }else{
            var enumZBM = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'}[ZBM];
            var findorgidjk = service.findorgid({ZBM:enumZBM});
            findorgidjk.success(function(data){
                $scope.ORDER_DATA.ZBMID = data.rst.data._id;
                var bmRead = service.bmSelectRead({'ZBMID':data.rst.data._id});
                bmRead.success(function(data){
                    if(data.code == 200){
                        $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                        $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                    }else{
                        $scope.ORDER_DATA.deptused = '';
                        $scope.ORDER_DATA.deptunused = '';
                    }

                });
            });
        }
    }
    var bkList = service.bkList();
    bkList.success(function(data){
        if(data.code == 200){
            $scope.bklistItem = data.rst.data.items;
        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    });
    $scope.bankSelect = function(id){
        $scope.bklistItem.forEach(function(item){
            if(item._id == id){
                $scope.ORDER_DATA.bank.name = item.bank;
            }
        });
        if(id == undefined){
            $scope.ORDER_DATA.usedrmb = '';
            $scope.ORDER_DATA.unusedrmb = '';
        }else{
            var bkRead = service.bkSelectRead({'_id':id}) || {};
            bkRead.success(function(data){
                if(data.code == 200){
                    $scope.ORDER_DATA.usedrmb = data.rst.data.usedsum;
                    $scope.ORDER_DATA.unusedrmb = data.rst.data.unusedsum;
                }else{
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }
    };

    $scope.ZBM = {'信息产品事业群':'1000','合作业务部':'2000','医疗产品部':'3000','综合':'9900'};
    $scope.ZBM1 = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'};
    var bankFkList = $scope.bankFkList = [{"ZSQNO":'',"ZSKDW":'',"ZFKFS":'',"ZSJFKJE":'',"ZFKSTA":''}];
    $scope.bankFkAdd = function(){
        var obj = {"ZSQNO":'',"ZSKDW":'',"ZFKFS":'',"ZSJFKJE":'',"ZFKSTA":''};
        $scope.bankFkList.push(obj);
    };
    $scope.bankFkDel = function(index){
        if($scope.bankFkList.length <= 1 && $scope.ORDER_DATA.credittype != "应收账款保理"){
            swal("至少要填写一个", "", "warning");
            return false;
        }
        /* $scope.ORDER_DATA.jehj-=$scope.bankFkList[index].ZSJFKJE;
         count=$scope.ORDER_DATA.jehj;*/
        $scope.bankFkList.splice(index,1);
    };
    var bkfIndex = 0;
    $scope.bankFkBox = function(index){
        $( "#bankFkBox" ).dialog({
            autoOpen: false,
            width: 700,
            height:400,
            modal: true
        });
        $( "#bankFkBox" ).dialog( "open" );
        var param={credittype:$scope.ORDER_DATA.credittype,ZSKDW:$scope.ORDER_DATA.ZSKDW};
        var fkdWlist = service.fkdWlist(param);
        fkdWlist.success(function(data){
            if(data.code == 200){
                $scope.fkWsList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
        bkfIndex = index;
    };

    $scope.fkdwSelect = function(idx,v){
        var zbmenum = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'}[v.ZBM];

        if(v.ZHB == 'Y'){
            swal('该付款申请已合并付款,不可引用','','warning');
            return false;
        }

        var sTd = $("#itemTable").find(".list").eq(bkfIndex);
        sTd.find("input:eq(0)").val(v.ZSQNO).trigger('change');
        sTd.find("input:eq(1)").val(v.ZSKDW).trigger('change');
        sTd.find("input:eq(2)").val(v.ZFKFS).trigger('change');
        sTd.find("input:eq(3)").val(v.ZSJFKJE).trigger('change');
        sTd.find("input:eq(4)").val(v.ZBM).trigger('change');
        sTd.find("input:eq(5)").val(v.ZFKSTA).trigger('change');

        var count = 0;
        for(var i = 0; i < $scope.bankFkList.length; i++){
            count += parseFloat($scope.bankFkList[i].ZSJFKJE);
            $scope.bankFkList[bkfIndex].ZBM = zbmenum;
        }

        if( $scope.bankFkList.length > 1){
            for(var i = 0 ; i < $scope.bankFkList.length; i++){
                if( $scope.bankFkList[i].ZSQNO != ''&& $scope.bankFkList[i].ZSKDW != '' && $scope.bankFkList[i].ZFKFS != '' && $scope.bankFkList[bkfIndex].ZSJFKJE != ''&& $scope.bankFkList[bkfIndex].ZBM != ''){
                    if($scope.bankFkList[0].ZBM !== $scope.bankFkList[i].ZBM){
                        swal('请选择相同的资金占用部门','','warning');
                        $scope.bankFkList[bkfIndex].ZSQNO = '';
                        $scope.bankFkList[bkfIndex].ZSKDW = '';
                        $scope.bankFkList[bkfIndex].ZFKFS = '';
                        $scope.bankFkList[bkfIndex].ZSJFKJE = '';
                        $scope.bankFkList[bkfIndex].ZBM = '';
                        return false;
                    }
                }

            }
        }
        console.log(count)
        $scope.ORDER_DATA.jehj = count;
        if(v.SPZT=="active"){
            $scope.bankFkList[bkfIndex].show=false;
            $scope.ORDER_DATA.ZBM= v.ZBM;
            if(v.ZBM == '9900'){
                var bmRead = service.bmSelectRead({'ZBMID':'9900'});
                bmRead.success(function(data){
                    $scope.ORDER_DATA.ZBMID = '9900';
                    $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                    $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                });
            }else{
                var findorgid = service.findorgid({ZBM:zbmenum});
                findorgid.success(function(data){
                    $scope.ORDER_DATA.ZBMID = data.rst.data._id;
                    var bmRead = service.bmSelectRead({'ZBMID':data.rst.data._id});
                    bmRead.success(function(data){
                        if(data.code == 200){
                            $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                            $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                        }else{
                            $scope.ORDER_DATA.deptused = '';
                            $scope.ORDER_DATA.deptunused = '';
                        }

                    });
                });
            }

        }else if(v.SPZT=="done"){
            $scope.bankFkList[bkfIndex].show=true;
            $scope.ORDER_DATA.ZBM= v.ZBM;
            if(v.ZBM == '9900'){
                var bmRead1 = service.bmSelectRead({'ZBMID':'9900'});
                bmRead1.success(function(data){
                    $scope.ORDER_DATA.ZBMID = '9900';
                    $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                    $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                });
            }else{
                var findorgid1 = service.findorgid({ZBM:zbmenum});
                findorgid1.success(function(data){
                    $scope.ORDER_DATA.ZBMID = data.rst.data._id;

                    var bmRead1 = service.bmSelectRead({'ZBMID':data.rst.data._id});
                    bmRead1.success(function(data){
                        if(data.code == 200){
                            $scope.ORDER_DATA.deptused = data.rst.data.usedsum;
                            $scope.ORDER_DATA.deptunused = data.rst.data.unusedsum;
                        }else{
                            $scope.ORDER_DATA.deptused = '';
                            $scope.ORDER_DATA.deptunused = '';
                        }

                    });
                });
            }

        }

        $( "#bankFkBox" ).dialog( "destroy" );
        $(".ui-dialog").remove();
    };
    if($stateParams.sapid){//判断数据来源（sap or 草稿）
        $scope.draftStatue = true;
        $scope.saveBtn = true;
    }else{
        $scope.saveBtn = false;
    }
    var viewCont = service.viewInside({sapid:$stateParams.sapid, processId:$stateParams.processId});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.DOCTYPE = data.rst.data.model.DOCTYPE == 'YHSXZF' ? true : false;
        $scope.docName = $scope.ORDER_DATA.bankfj;
        var fkenum = {'1000':'信息产品事业群','2000':'合作业务部','3000':'医疗产品部','9900':'综合'};
        $scope.bankFkList = data.rst.data.model.fksqinfo;

        $scope.ORDER_DATA.timestamp = $filter("date")($scope.ORDER_DATA.timestamp, "yyyy-MM-dd");
        if(data.rst.data.model.credittype == "保函"){
            $scope.ifBh = false;
            $scope.ifBhBot = true;
        }else {
            $scope.ifBh = true;
            $scope.ifBhBot = false;
            for(var i = 0; i < $scope.bankFkList.length; i++){
                $scope.bankFkList[i].ZBM = fkenum[$scope.bankFkList[i].ZBM];
            }
        }
        if(data.rst.data.model.credittype == "保函"||data.rst.data.model.credittype == "应收账款保理"){
            $scope.label=false;
        }else {
            $scope.label=true;
        }
    });
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var doc={},param= {};
        doc = data;
        if($scope.bankFkList.length){
            var gyName=$scope.bankFkList[0].ZSKDW;
            var gyNum=$scope.bankFkList[0].ZFKFS;
        }
        // 计算付款单合计金额
        if($scope.ORDER_DATA.credittype!="保函" &&  $scope.ORDER_DATA.credittype != "应收账款保理"){
            /*var jehj= 0;
             for (var i= 0, l=$scope.bankF1kList.length; i<l; i++) {
             jehj +=$scope.bankF1kList[i].ZSJFKJE;
             }
             console.log($scope.bankF1kList, jehj, $scope.ORDER_DATA.creditmoney, $scope.jehj!== $scope.ORDER_DATA.creditmoney)*/
            if(statue=='apply'){
                if(!$scope.bankFkList.length){
                    swal("付款单必填", "", "warning");
                    return false;
                }
            }
            if($scope.ORDER_DATA.jehj!==Number($scope.ORDER_DATA.creditmoney)){
                swal("金额合计必须与授信额度相等", "", "warning");
                //alert();
                return false;
            }
            doc.fksqinfo = $scope.bankFkList;      //todo   非保函是传关联付款单，非保函传给后台为空数组
        }else{
            doc.fksqinfo = [];
        }
        if($scope.ORDER_DATA.credittype == "应收账款保理" && $scope.bankFkList.length !== 0){
            if($scope.ORDER_DATA.jehj !== parseFloat($scope.ORDER_DATA.creditmoney)){
                swal("金额合计必须与授信额度相等", "", "warning");
                return false;
            }
            doc.fksqinfo = $scope.bankFkList;
        }
        for(var i=0;i<$scope.bankFkList.length;i++){
            if($scope.bankFkList[i].ZSKDW!==gyName||$scope.bankFkList[i].ZFKFS!==gyNum){
                swal("关联多个付款申请单时，供应商名称和实际付款方式必须一样", "", "warning");
                //alert();
                return false;
            }
            $scope.bankFkList[i].ZBM = $scope.ZBM[$scope.bankFkList[i].ZBM]
        }


        if($scope.ORDER_DATA.deptunused == '' && $scope.ORDER_DATA.deptused == ''){
            swal('部门额度没有设置,请先部门额度设置','','warning');
            return false;
        }

        doc.bankfj = $scope.docName;
        param.doc = doc;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        if(statue == "save"){
            var addInside = service.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    for(var i = 0 ; i < $scope.bankFkList.length;i++){
                        $scope.bankFkList[i].ZBM = $scope.ZBM1[$scope.bankFkList[i].ZBM];
                    }
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            if($scope.DOCTYPE == true){
                var checkfkArr = [];
                _.forEach($scope.bankFkList,function(item){
                    checkfkArr.push(item.ZSQNO);
                });
                var  checkyhsxzf = service.checkyhsxzf({code:$scope.ORDER_DATA.code,fksqinfo:checkfkArr});
                checkyhsxzf.success(function(data){
                    if(data.code == 200){
                        var applyAdd = service.applyAdd(param);
                        applyAdd.success(function(data){
                            if(data.code == 200){
                                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/bankCreditOrder'; });
                            }else {
                                swal(data.msg, "", "warning");
                            }
                        });
                    }else{
                        swal(data.msg,'','error');
                    }
                });
            }else{
                var checkfksq = service.checkfksq(param);
                checkfksq.success(function(data){
                    if(data.code == 200){
                        var applyAdd = service.applyAdd(param);
                        applyAdd.success(function(data){
                            if(data.code == 200){
                                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/bankCreditOrder'; });
                            }else {
                                swal(data.msg, "", "warning");
                            }
                        });
                    }else{
                        swal({
                            title:'',
                            text:data.msg,
                            type:'error'
                        });
                    }
                });
            }
        }
    }
}]);
bankCreditApp.controller('bankCreditOrderViewCtrl', ['$scope', '$stateParams','$rootScope','$filter', 'bankServices',function($scope, $stateParams,$rootScope,$filter,service){
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var moneycountry = {
        'CNY':'人民币',
        'EUR':'欧元',
        'USD':'美元',
        'CHF':'瑞士法郎',
        'HKD':'港币',
        'JPY':'日元',
    }
    console.log($rootScope.busiRoles);   //部门信息
    $scope.moneycountry = moneycountry;
    $scope.tqhkList = [];  // 初始提前还款数据
    var viewCont = service.viewInside({_id:$stateParams.id});

    viewCont.success(function(data) {
        if(data.code==200){
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.bankFkList = data.rst.data.model.fksqinfo;
            if(data.rst.data.model.returninfo.length !== 0){
                $scope.tqhkList = data.rst.data.model.returninfo;
            }
            if(data.rst.data.model.credittype == "保函"){
                $scope.ifBh = false;
                $scope.ifBhBot = true;
                if(!data.rst.data.model.loiinfo && data.rst.data.model.opendate && $rootScope.busiRoles[0].code.indexOf('caiwu_') !== -1){
                    $scope.yinh3If = true;
                }
            }else {
                $scope.ifBh = true;
                $scope.ifBhBot = false;
                if((parseFloat(data.rst.data.model.creditmoney) !== parseFloat(data.rst.data.model.hkzje) || !(data.rst.data.model.returninfo.length !== 0))&& data.rst.data.model.opendate && $rootScope.busiRoles[0].code.indexOf('caiwu_') !== -1){
                    var currentDate = new Date();
                    var currentDate1 = $filter('date')(currentDate,'yyyy-MM-dd');
                    if(Date.parse($scope.ORDER_DATA.moneybackdate) > Date.parse(currentDate1) || Date.parse($scope.ORDER_DATA.moneybackdate) == Date.parse(currentDate1)){
                        $scope.yinh2If = true;
                    }else{
                        $scope.yinh2If = false;
                    }
                }
            }
            if(!data.rst.data.model.opendate && $rootScope.busiRoles[0].code.indexOf('caiwu_') !== -1){
                $scope.yinh1If = true;
            }
        }
    });
    // var persion = $cookieStore.get("persion");
    var persion = $rootScope.loginPerson;
    //办理银行授信
    $scope.blBanksxBox = function(){
        $( "#blBanksxBox" ).dialog({
            autoOpen: false,
            width: 350,
            modal: true
        });
        $( "#blBanksxBox" ).dialog( "open" );

        $scope.shrUserName = persion.user.name;
        $scope.shrUser = persion.username;
        $scope.shrUserId = persion.user._id;
    }
    $scope.$watch('dqDate',function(newvalue){
        $scope.edDate = newvalue;
    });
    $scope.blBanksx = function(klDate, dqDate, shrUser, shrUserId, edDate,code,creditmoney){
        var uparam = {},bparam = {},doc = {},fksqJson = {},blbankparam = {};
        var fksqNumberArr = [];
        _.forEach($scope.bankFkList,function(item){
            fksqNumberArr.push({'ZSQNO':item.ZSQNO});
        });

        uparam._id = $stateParams.id;
        if(!klDate){
            swal("不能为空！", "", "warning");
            //alert();
            return false;
        }
        uparam.opendate = klDate;
        uparam.duedate  = dqDate;
        uparam.auditorname = shrUser;
        uparam.auditorid = shrUserId;
        uparam.moneybackdate = edDate;

        doc.ZLSH = code;
        doc.ZSXPZ = $scope.ORDER_DATA.credittype;
        doc.ZKLR = klDate;
        doc.ZDQR = dqDate;
        doc.ZSXJE = creditmoney;
        doc.ZBM = $scope.ORDER_DATA.ZBM;
        doc.ZSXYH = $scope.ORDER_DATA.bank.name;
        bparam.model = doc;
        bparam.items = fksqNumberArr;

        blbankparam.doc = bparam;

        if($scope.ORDER_DATA.credittype !== '保函' && $scope.ORDER_DATA.credittype !== '应收账款保理'){
            var creditforsap = service.creditforsap(blbankparam);
            creditforsap.success(function(data){
                if(data.code == 200){
                    var update = service.updatebankcredit(uparam);
                    update.success(function(data) {
                        if(data.code == 200){
                            swal({
                                title: "保存成功",
                                text: "",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定",
                                closeOnConfirm: true
                            }, function(){ location.reload(); });

                        }else {
                            swal(data.msg, "", "warning");
                        }
                    });
                }
            });
        }else{
            var update = service.updatebankcredit(uparam);
            update.success(function(data) {
                if(data.code == 200){
                    swal({
                        title: "保存成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        closeOnConfirm: true
                    }, function(){ location.reload(); });

                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }



    }
    $scope.closeBlanksx = function(){
        $( "#blBanksxBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    //提前还款
    $scope.tqhkBox = function(){
        $( "#tqhkBox" ).dialog({
            autoOpen: false,
            width: 350,
            modal: true
        });
        $( "#tqhkBox" ).dialog( "open" );
       // $scope.tqhkMon = $scope.ORDER_DATA.creditmoney;
        var todayTime = new Date();
        $scope.tqDate = $filter('date')(todayTime,'yyyy-MM-dd');
        $scope.shrUser = persion.user.name;
        $scope.shrUserId = persion.user._id;
    }
    $scope.tqhksx = function(tqhkMon, tqDate, shrUser, shrUserId,code){
        if( tqhkMon > (parseFloat($scope.ORDER_DATA.creditmoney) - parseFloat($scope.ORDER_DATA.hkzje)) || tqhkMon < 0){
            swal('提前还款金额必须大于0且小于等于授信金额-提前还款总金额','','warning');
            return false;
        }
        var uparam = {};
        var returninfo = {},doc = {},tqhkparam = {},Model = {},bankId = {};
        uparam._id = $stateParams.id;


        bankId.id= $scope.ORDER_DATA.bank.id;
        bankId.name= $scope.ORDER_DATA.bank.name;
        uparam.bank = bankId;
        uparam.returnmoney = tqhkMon;
        uparam.creditbody = $scope.ORDER_DATA.creditbody;
        uparam.ZBMID = $scope.ORDER_DATA.ZBMID;
        if($scope.ORDER_DATA.hkzje){
            uparam.hkzje =parseFloat($scope.ORDER_DATA.hkzje) + parseFloat(tqhkMon);
        }else{
            uparam.hkzje = tqhkMon;
        }
        if(!tqhkMon){
            swal("不能为空！", "", "warning");
            return false;
        }
        if(tqhkMon>$scope.ORDER_DATA.creditmoney){
            swal("提前还款金额不能大于授信额度", "", "warning");
            return  false;
        }
        if(tqDate>$scope.ORDER_DATA.duedate){
            swal("提前还款日期不能超过到期日", "", "warning");
            return  false;
        }

        returninfo.returnmoney = tqhkMon;
        returninfo.returndate  = tqDate;
        returninfo.auditorname = shrUser;
        returninfo.auditorid = shrUserId;

        uparam.returninfo = $scope.tqhkList.concat([returninfo]);
        if(parseFloat(tqhkMon) == (parseFloat($scope.ORDER_DATA.creditmoney)-parseFloat($scope.ORDER_DATA.hkzje))){
            uparam.moneybackdate = tqDate;
            uparam.duedate = tqDate;
        }else{
            uparam.moneybackdate = $scope.ORDER_DATA.moneybackdate;
            uparam.duedate = $scope.ORDER_DATA.moneybackdate;
        }
        if($scope.ORDER_DATA.creditmoney == tqhkMon){
            $scope.ORDER_DATA.moneybackdate=tqDate;
            $scope.ORDER_DATA.duedate=tqDate;
        }

        doc.ZLSH = code;
        doc.ZHKRQ = tqDate;
        doc.ZHKJE = tqhkMon;
        Model.model = doc;
        tqhkparam.doc = Model;

        if($scope.ORDER_DATA.credittype !== '保函'){
            var bankpay = service.bankpay(tqhkparam);
            bankpay.success(function(data){
                if(data.code == 200){
                    var update = service.updatebankcredit(uparam);
                    update.success(function(data) {
                        if(data.code == 200){
                            swal({
                                title: "保存成功",
                                text: "",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定",
                                closeOnConfirm: true
                            }, function(){location.reload();});
                        }else {
                            swal(data.msg, "", "warning");
                            //alert(data.msg);
                        }
                    });
                }
            });
        }else{
            var update = service.updatebankcredit(uparam);
            update.success(function(data) {
                if(data.code == 200){
                    swal({
                        title: "保存成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        closeOnConfirm: true
                    }, function(){location.reload();});
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }


    }
    $scope.closeTqhk = function(){
        $( "#tqhkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    //保函提前退回
    $scope.bhtqthBox = function(){
        $( "#bhtqthBox" ).dialog({
            autoOpen: false,
            width: 350,
            modal: true
        });
        $( "#bhtqthBox" ).dialog( "open" );
        $scope.shrUserName = persion.user.name;
        $scope.shrUser = persion.username;
        $scope.shrUserId = persion.user._id;
    }
    $scope.bhtqthsx = function(dtqDate, shrUser, shrUserId){
        var uparam = {},loiinfo = {},bankId = {};
        uparam._id = $stateParams.id;
        if(!dtqDate){
            swal("不能为空！", "", "warning");
            //alert();
            return false;}
        loiinfo.returndate = dtqDate;
        loiinfo.auditorname = shrUser;
        loiinfo.auditorid = shrUserId;

        uparam.loiinfo = loiinfo;
        uparam.moneybackdate = dtqDate;

        bankId.id= $scope.ORDER_DATA.bank.id;
        bankId.name= $scope.ORDER_DATA.bank.name;
        uparam.bank = bankId;
        uparam.creditmoney = $scope.ORDER_DATA.creditmoney;
        uparam.creditbody = $scope.ORDER_DATA.creditbody;
        uparam.ZBMID = $scope.ORDER_DATA.ZBMID;
        uparam.hkzje = $scope.ORDER_DATA.creditmoney;

        var update = service.updatebankcredit(uparam);
        update.success(function(data) {
            if(data.code == 200){
                swal({
                    title: "保存成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                }, function(){ location.reload(); });


            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }
    $scope.closeBhtqth = function(){
        $( "#bhtqthBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }

    $scope.klrFf = function(date){
        var date = date;
        var days = $scope.ORDER_DATA.limitdays;
        var nd = new Date(date);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;

        $scope.dqDate=result;
        $scope.edDate=result;
        if(days==null){
            $scope.dqDate="";
            $scope.dqDate='';
        }

    }
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = service.getprocesslog({id: vm.ORDER_DATA.code}); // 直接取值数据中 申请人（proposer）
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

//银行授信导出
bankCreditApp.controller('bankExportCtrl',['$scope','$rootScope','bankServices',function($scope,$rootScope,bankServices){
    $scope.opprev = $rootScope.opprev;
    var param = {};
    $scope.search = function(type,date){
        if(type == '' || date == ''){
            swal('请输入查询条件','','warning');
            return false;
        }
        $scope.oneTable = false;
	    $scope.twoTable = false;
        switch (type){
            case  '1':param = {date:date,creditbody:'1000',type:'cw'};break;
            case  '2':param = {date:date,creditbody:'1000',type:'sw'};break;
            case  '3':param = {date:date,creditbody:'9000',type:'cw'};break;
            case  '4':param = {date:date,creditbody:'9000',type:'sw'};break;
            case  '5':param = {date:date,creditbody:'9001',type:'cw'};break;
            case  '6':param = {date:date,creditbody:'9001',type:'sw'};break;
        }
        if(type == '1'|| type == '3' || type == '5'){
            $scope.swIf = false;
        }else if(type == '2'|| type == '4' || type == '6'){
            $scope.swIf = true;
        }
	    var vm = $scope;
	    vm.table = false;
	    vm.loadData = true;
	    vm.tableApi = null;
	    vm.tableOptions = {
		    multiSelect: true,
		    enableRowSelection: true,
		    enableSelectAll: true,
		    selectionRowHeaderWidth: 1,
		    // enableVerticalScrollbar: 0,
		    // enableHorizontalScrollbar: 0,
		    onRegisterApi: function (api) {
			    vm.tableApi = api;
		    }
	    };
        if(type !== '7'){
	        vm.tableHeader = [
		        {name: 'code', displayName: "银行授信申请号",  width: 180, cellTooltip: true},
		        {name: 'bank.name', displayName: "授信银行", width: 200, cellTooltip: true},
		        {name: 'creditmoney', displayName: "授信金额", cellTooltip: true, cellFilter: 'currency : \'￥\''},
		        {name: 'creditmoney2', displayName: "未到期授信金额", cellTooltip: true, cellFilter: 'currency : \'￥\''},
		        {name: 'credittype', displayName: "授信种类",   cellTooltip: true},
		        {name: 'duedate', displayName: "到期日",  width: 120,  cellTooltip: true, cellFilter: 'date:\'yyyy-MM-dd\'' }
	        ];
	        if($scope.swIf) {
		        vm.tableHeader = vm.tableHeader.concat([
			        {name: 'fksqinfo[0].whxje', displayName: "付款单未关联金额",  width: 140, cellTooltip: true },
			        {name: 'fksqinfo[0].ZSQNO', displayName: "关联的付款申请号",  width: 180, cellTooltip: true }
		        ])
	        }

            var selectundate = bankServices.selectundate(param);
            selectundate.success(function(data){
                $scope.dataList = data.rst.data || [];
	            if($scope.dataList) {
	                $scope.dataList.forEach(function(item){         //bug6227
		                item.tqhhjeSum = 0;
		                item.creditmoney2 = item.creditmoney;
		                if(item.returninfo.length !== 0){
	                        var syje = 0;
	                        item.returninfo.forEach(function(item1){
	                            if(Date.parse(item1.returndate) <= Date.parse(date)){
	                                syje += item1.returnmoney;
		                            item.creditmoney2 = item.creditmoney - syje;
                                    item.duedate = item.creditmoney2 > 0  ? item.duedate : item.returninfo[item.returninfo.length-1].returndate;
	                                return item.tqhhjeSum = syje;
	                            }
	                        });
	                    }
	                });
	            }
                // $scope.hasScroll = $scope.dataList.length > 10;
                $scope.oneTable = true;

	            if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
	            genTable(vm.tableOptions, vm.tableHeader, $scope.dataList, function (data) {
		            var dataLen = data.data.length;
		            if(dataLen) {
		              vm.loadData = true;
			            if(dataLen < 10) {
				            $scope.gridHeight = data.data.length * data.rowHeight + data.headerRowHeight + 15;
			            } else {
				            $scope.gridHeight =  10 * data.rowHeight + data.headerRowHeight + 15;
			            }
			            angular.element('.grid').height($scope.gridHeight);
			            vm.table = data;
		            } else {
			            vm.loadData = false;
			            vm.tableApi = null;
			            vm.table = false;
		            }
	            });
            });
        }else{
            var selectused = bankServices.selectused({date:date});
            selectused.success(function(data){
                if(data.code == 200){
                	var data = data.rst.data, dataList=[];
	                $scope.dataList = data.concat([]);
	                $scope.dataList.forEach(function (item,i) {
		                var arr={};
		                if(i>0) {
		                	item.forEach(function (items,idx) {
		                		arr['name'+idx] = items;
			                })
			                console.log('arr',arr)
		                }
		                dataList[i] = arr;
	                })
	                $scope.dataList = dataList;
	                $scope.dataThead =data[1];
	                $scope.dataDate = data[0][0];
	                $scope.dataList.splice(0,2);

	                // $scope.hasScroll = $scope.dataList.length > 10;
	                $scope.twoTable = true;
	                vm.tableHeader = [];
	                $scope.dataThead.forEach(function (item,i) {
		                vm.tableHeader.push({
			                name:'name'+i, displayName: item, cellTooltip: true, width:120,cellFilter:'number:2'
		                })
		                if(i==0) {
			                $.extend(vm.tableHeader[i], {width:160,pinnedLeft: true,cellFilter:''})
		                }
	                })
	                if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
	                genTable(vm.tableOptions, vm.tableHeader, $scope.dataList, function (data) {
		                var dataLen = data.data.length;
		                if(dataLen) {
		                  vm.loadData = true;
			                if(dataLen < 10) {
				                $scope.gridHeight = data.data.length * data.rowHeight + data.headerRowHeight + 15;
			                } else {
				                $scope.gridHeight =  10 * data.rowHeight + data.headerRowHeight + 15;
			                }
			                angular.element('.grid').height($scope.gridHeight);
			                vm.table = data;
		                } else {
			                vm.loadData = false;
			                vm.tableApi = null;
			                vm.table = false;
		                }
	                });

                }
            });
        }
    }
    $scope.exportexcal = function(type,date){
        switch (type){
            case  '1': window.open('bankcredit/exportundate?date='+date+'&creditbody='+'1000'+'&type='+'cw');break;
            case  '2': window.open('bankcredit/exportundate?date='+date+'&creditbody='+'1000'+'&type='+'sw');break;
            case  '3': window.open('bankcredit/exportundate?date='+date+'&creditbody='+'9000'+'&type='+'cw');break;
            case  '4': window.open('bankcredit/exportundate?date='+date+'&creditbody='+'9000'+'&type='+'sw');break;
            case  '5': window.open('bankcredit/exportundate?date='+date+'&creditbody='+'9001'+'&type='+'cw');break;
            case  '6': window.open('bankcredit/exportundate?date='+date+'&creditbody='+'9001'+'&type='+'sw');break;
            case  '7': window.open('bankcredit/exportexcel?date='+date);break;
        }
    }
}]);

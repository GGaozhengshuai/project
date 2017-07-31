var deptassureApp = angular.module('deptassureApp', ['pageDirectives', 'formDirectives', 'uploadifyApp','ui.autocomplete']);
deptassureApp.service('deptassureServices', function ($http) {
    var service = {
        listInside: function (param) {
            return $http.post('/deptassure/list', param, {cache: false});
        },
        viewCustomer: function (param) {
            return $http.post('/deptassure/read', param, {cache: true});
        },
        deptassureEidet: function (param) {
            return $http.post('/deptassure/view', param, {cache: true});
        },
        deptassureView: function (param) {
            return $http.post('/deptassure/detail', param, {cache: false});
        },
        deptassureSave: function (param) {
            return $http.post('/deptassure/save', param, {cache: false});
        },
        deptassureAdd: function (param) {
            return $http.post('/deptassure/createprocess', param, {cache: false});
        },
        checkbillno: function (param) {//单据号
            return $http.post('deptassure/checkbillno', param, {cache: false});
        },
        selectcontract: function (param) {//根据销售合同号查询
            return $http.post('deptassure/selectcontract', param, {cache: false});
        },
        selectdeptmoney: function (param) {//部门担保额度
            return $http.post('deptassure/selectdeptmoney', param, {cache: false});
        },
        listUser: function(param){//部门
            return $http.post('/user/list',param);
        },
        deptlimitInside: function (param) {//部门担保设置
            return $http.post('/deptlimit/list', param, {cache: false});
        },
        deptlimitAdd: function (param) {//
            return $http.post('/deptlimit/add', param, {cache: false});
        },
        deptlimitupdata: function (param) {//
            return $http.post('deptlimit/update', param, {cache: false});
        },
        deptlimitDelete: function (param) {//
            return $http.post('/deptlimit/delete', param, {cache: false});
        },
        listEmployee: function(param) {
            return $http.post('/org/read',param ,{cache:false});
        },
        freeMoney: function(param) {//释放
            return $http.post('deptassure/freemoney ',param ,{cache:false});
        },
        exportexcel: function(param) {  //导出
            return $http.post('deptassure/exportexcel',param ,{cache:false});
        },
        getprocesslog: function(param) {  //审批日志
          return $http.post('deptassure/getprocesslog',param ,{cache:false});
        },
        checkcontract : function(param){    //校验该合同是否已存在部门担保申请
            return $http.post('deptassure/checkcontract',param,{cache:false});
        } ,
        checkoneorg : function(param){  //子级部门校验
            return $http.post('deptlimit/checkoneorg',param,{cache:false});
        },
        contractInforInside: function(param) {//合同信息
            return $http.post('/contract/list',param ,{cache:false});
        },
};
    return service;
});
deptassureApp.controller('proposerBoxCtrl', ['$scope','deptassureServices',function($scope,deptassure){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.proposer};
            var customerPromise = deptassure.listUser(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };


}]);
deptassureApp.controller('deptlimitCtrl', ['$scope', '$stateParams', '$rootScope','deptassureServices', function ($scope,$stateParams,$rootScope,deptassure) {
    var ht = $scope.ht = {};
    $scope.level=0;
    var paramOrg = { _id: "5742a607779ec2cb740517f7", hasuser:true,level:0,pid:"5742a607779ec2cb740517f6"};
    var paramOrgList = deptassure.listEmployee(paramOrg);
    paramOrgList.success(function (data) {
        if(data.code==200){
            $scope.orgData=data.rst.data.belongs.orgs;
        }else {
            swal({
                title:'',
                text:data.msg,
                type:"warning"
            });
        }
    })
    $scope.htTab = function(type){
        $scope.ht.activeTab = type;
        if(type==1){
            $scope.level=0;
        }else if(type==2){
            $scope.level=1;
        }
    }
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, level:$scope.level};
            var customerPromise = deptassure.deptlimitInside(param);
            customerPromise.success(function (data) {
                if (data.code == 200) {
                    if($scope.level==1){
                        $scope.dataList2=data.rst.data.items;
                    }else{
                        $scope.dataList1=data.rst.data.items;
                    }
                } else {

                    swal({
                        title:"",
                        text:data.msg,
                        type:"error"
                    })
                }
            }).error(function (error) {
                swal({
                    title:"",
                    text:error,
                    type:"error"
                })
            })
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.bmdbsfBox = function(){
        $scope.orgname='';
        $scope.deptlimit='';
        if($scope.level==1){
            $( "#bmdbsfBox2" ).dialog({
                autoOpen: false,
                width: 400,
                modal: true
            });
            $( "#bmdbsfBox2" ).dialog( "open" );
        }else {
            $( "#bmdbsfBox" ).dialog({
                autoOpen: false,
                width: 400,
                modal: true
            });
            $( "#bmdbsfBox" ).dialog( "open" );
        }

    }

    $scope.orgChange=function (orgname) {
        for(var i=0;i<$scope.orgData.length;i++){
            if($scope.orgData[i].orgname==orgname){
                $scope.orgname=$scope.orgData[i].orgname;
                 $scope.orgid=$scope.orgData[i]._id;
                 $scope.pid=$scope.orgData[i].pid;
            }
        }
    }
    $scope.closeTqhk = function(){
        if($scope.level==1){
            $( "#bmdbsfBox2" ).dialog("destroy");
            $(".ui-dialog").remove();
        }else{
            $( "#bmdbsfBox" ).dialog("destroy");
            $(".ui-dialog").remove();
        }

    }
    $scope.getEmployee = function(id,name,level,pid){
        $scope.pid=pid;
        var param = { _id: id, hasuser:true,level:level,pid:pid};
            var employeeList = deptassure.listEmployee(param);
            $scope.orgname = name;
            if(name){
                $scope.empName = name;
            }else{
                $scope.empName = '中建材集团';
            }
            $scope.orgid = id;
            employeeList.success(function(data){
                if(data.code == 200){
                    if(data.rst.data.belongs.orgs != 0&&data.rst.data.belongs.orgs[0].level<1){
                        $scope.employeeList = data.rst.data.belongs.orgs;
                        $scope.employeeNav = data.rst.data.superorgs;
                        //$scope.employeeUser = data.rst.data.belongs.users;
                    }else{
                        $( "#emBox").dialog( "close" );
                    }

                }
            })

    };
    $scope.employee = function(){
        $( "#emBox" ).dialog({
            autoOpen: false,
            width: 300,
            height:200,
            modal: true,
            position:{  at: "center center" }
        });
        $scope.getEmployee();
        $( "#emBox" ).dialog( "open" );

    }
    $scope.addData = function(){
        if($scope.level==1){
            var par={money:$scope.deptlimit,pid:$scope.pid,statue:2};
            var checkoneorg  = deptassure.checkoneorg (par);
            checkoneorg .success(function(data){
                if(data.code==200){
                    var param = {};
                    param.orgname = $scope.orgname;
                    param.orgid = $scope.orgid;
                    param.deptlimit = $scope.deptlimit;
                    param.level = $scope.level;
                    param.pid =$scope.pid;
                    var bkAdd = deptassure.deptlimitAdd(param);
                    bkAdd.success(function(data){
                        if(data.code == 200){
                            swal("添加成功", "", "success");
                            $( "#bmdbsfBox2" ).dialog("destroy");
                            $(".ui-dialog").remove();
                            $scope.paginationConf.onChange();
                        }else {
                            swal({
                                title:'',
                                text:data.msg,
                                type:"warning"
                            });
                        }
                    });
                }else {
                    swal({
                        title:'',
                        text:data.msg,
                        type:"warning"
                    });
                }
            })

        }else {
            var param = {};
            param.orgname = $scope.orgname;
            param.orgid = $scope.orgid;
            param.deptlimit = $scope.deptlimit;
            param.level = 0;
            param.pid = $scope.pid;
            var bkAdd = deptassure.deptlimitAdd(param);
            bkAdd.success(function(data){
                if(data.code == 200){
                    swal("添加成功", "", "success");
                    $( "#bmdbsfBox" ).dialog("destroy");
                    $(".ui-dialog").remove();
                    $scope.paginationConf.onChange();
                }else {
                    swal({
                        title:'',
                        text:data.msg,
                        type:"warning"
                    });
                }
            });
        }

    }
    $scope.bkDelet = function(id,index){
        var param = {};
        param._id = id;
        swal({
            title: "确定要删除吗？",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: true
        }, function(){
            var bkDelete = deptassure.deptlimitDelete(param);
            bkDelete.success(function(data){
                if(data.code == 200){
                    $scope.paginationConf.onChange();
                    swal("删除成功", "", "success");
                }else {
                    swal({
                        title:'',
                        text:data.msg,
                        type:error
                    });
                }
            });
        });
    }
    $scope.bkEdit=function(id,index){
        $( "#deptlimitEdit" ).dialog({
            autoOpen: false,
            width: 400,
            modal: true
        });
        $( "#deptlimitEdit" ).dialog( "open" );
        if($scope.level==1){
            $scope.part=$scope.dataList2[index].orgname;
        }else {
            $scope.part=$scope.dataList1[index].orgname;
        }
        $scope.editDep = function(){
            var par={money:$scope.deptlimit};
            if($scope.level==1){
                par.oldmoney=$scope.dataList2[index].deptlimit;
                par.pid=$scope.dataList2[index].pid;
                par.statue=2;
            }else{
                par.oldmoney=$scope.dataList1[index].deptlimit;
                par.orgid=$scope.dataList1[index].orgid;
                par.statue=1;
            }
            var checkoneorg  = deptassure.checkoneorg (par);
            checkoneorg .success(function(data){
                if(data.code==200){
                    var param = {};
                    if($scope.level==1){
                        param.orgname = $scope.dataList2[index].orgname;
                        param.orgid = $scope.dataList2[index].orgid;
                        param.deptlimit = $scope.deptlimit;
                        param.deptused = $scope.dataList2[index].deptused;
                        param.deptunused = $scope.dataList2[index].deptunused;
                        param.username = $scope.dataList2[index].username;
                    }else {
                        param.orgname = $scope.dataList1[index].orgname;
                        param.orgid = $scope.dataList1[index].orgid;
                        param.deptlimit = $scope.deptlimit;
                        param.deptused = $scope.dataList1[index].deptused;
                        param.deptunused = $scope.dataList1[index].deptunused;
                        param.username = $scope.dataList1[index].username;
                    }
                    param._id = id;
                    var bkAdd = deptassure.deptlimitupdata(param);
                    bkAdd.success(function(data){
                        if(data.code == 200){
                            swal("修改成功", "", "success");
                            $( "#deptlimitEdit" ).dialog("destroy");
                            $(".ui-dialog").remove();
                            $scope.paginationConf.onChange();
                        }else {
                            swal({
                                title:'',
                                text:data.msg,
                                type:"error"
                            });
                        }
                    });
                }else {
                    swal({
                        title:'',
                        text:data.msg,
                        type:"warning"
                    });
                }
            })




        }
    }
    $scope.closeTqhkE = function(){
        $( "#deptlimitEdit" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
}]);
deptassureApp.controller('contractInforCtrl', ['$scope','deptassureServices',function($scope,deptassure){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, contractno:$scope.contractno};
            var customerPromise = deptassure.contractInforInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

}]);
deptassureApp.controller('deptassureOrderCtrl', ['$scope', 'deptassureServices', function ($scope, deptassure) {
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
                code: $scope.code,
                orgname: $scope.orgname,
                contractno: $scope.contractno,
                isfree: $scope.isfree,
                stomer: $scope.stomer,

            };
            var deptassurePromise = deptassure.listInside(param);
            $scope.paginationConf.pagePromise = deptassurePromise;
            $scope.emptyFn && $scope.emptyFn();
        }
    };
    $scope.cArr=[],$scope.ary=[];
    $scope.checkSelect = function(idx,data1,data2,data3,id){
        var obj={};
        obj.code=data1;
        obj.orgname=data2;
        obj.oneorgid=data3;
        obj._id=id;
        var parent = $("#occTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        console.log(check)
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr("checked",'checked');
            /*if($scope.cArr.length>0){
                swal("不能批量释放", "", "warning");
                check.removeAttr("checked");
                return false;
            }*/
           $scope.cArr.push(obj);
           $scope.ary.push(idx);
        }else{
            check.removeAttr("checked");
            for(var i=0;i<$scope.cArr.length;i++){
                if($scope.ary[i]==idx){
                    $scope.cArr.splice(i,1);
                    $scope.ary.splice(i,1);
                }
            }
        }

    }
    // 清空
    $scope.emptyFn = function() {
        $scope.checkAll = false;
        $scope.cArr = [];
        $scope.ary = [];
    };
    $scope.allCheck=function($event,data){
        $scope.cArr=[];
        $scope.ary=[];
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            var count=0;
            for(var x in data){
                $scope.cArr.push({code:data[x].code,orgname:data[x].orgname,oneorgid :data[x].oneorgid,_id:data[x]._id});
                $scope.ary.push(count);
                count++;
            }
        } else {
            $scope.cArr=[];
            $scope.ary=[];
        }
        /*var parent = $("#occTable").find("#list");
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr("checked",'checked');
            var count=0;
            for(var x in data){
                $scope.cArr.push({code:data[x].code,orgname:data[x].orgname,oneorgid :data[x].oneorgid,_id:data[x]._id});
                $scope.ary.push(count);
                count++;
            }
        }else{
            check.removeAttr("checked");
            $scope.cArr=[];
            $scope.ary=[];
        }*/
    }

    $scope.listBox=function(){
         if($scope.cArr.length<1){
            swal("请勾选列表", "", "warning");
            return false;
        }else if($scope.cArr.length>1){
                 swal("不能批量释放", "", "warning");
                 return false;
         } else{
            $("#listBox").dialog({
                autoOpen: false,
                width: 350,
                modal: true
            });
            $("#listBox").dialog("open");
        }

    }
    $scope.listCancel = function(){
        $( "#listBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.listSelect = function(freemoney){
        var par = {};
        par.money = freemoney;
        // 依据bug4772备注,oneorgid为销售部门id
        par.oneorgid = $scope.cArr[0].oneorgid;
        par.code = $scope.cArr[0].code;
        par.sfType = "手动";
        var bkAdd = deptassure.freeMoney(par);
        bkAdd.success(function(data){
            if(data.code == 200){
                swal("释放成功", "", "success");
                $scope.cArr=[],$scope.ary=[];
                $( "#listBox" ).dialog("destroy");
                $(".ui-dialog").remove();
                $scope.search();
            }else {
                swal({
                    title:'',
                    text:data.msg,
                    type:"error"
                });
                $( "#listBox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }
        });
    }

    $scope.exportexcel=function(){
        //导出
        $scope.parAry=[];
        $scope.par={};
        if($scope.code){
            $scope.parAry.push("code");
            $scope.par.code=$scope.code;
        };
        if($scope.orgname){
            $scope.parAry.push("orgname");
            $scope.par.orgname=$scope.orgname;
        };
        if($scope.contractno){
            $scope.parAry.push("contractno");
            $scope.par.contractno=$scope.contractno;
        };
        if($scope.isfree){
            $scope.parAry.push("isfree");
            $scope.par.isfree=$scope.isfree;
        };
        var str="";
        for(var i=0;i<$scope.parAry.length;i++){
            if(i==0){
                str=str+"?"+$scope.parAry[0]+"="+$scope.par[$scope.parAry[0]];
            }else{
                str=str+"&"+$scope.parAry[i]+"="+$scope.par[$scope.parAry[i]];
            }
        }
        if($("#allcheck").get(0).checked){
            var path='deptassure/exportexcel'+str;
            console.log(path)
            window.open(path);
        }else{
            if($scope.cArr.length<=0){
                swal("请勾选列表", "", "warning");
                return false;
            }
            var path = 'deptassure/exportexcel?';
            var strArr = [];
            $.each($scope.cArr,function(key,value){
                var para = 'ids='+value._id;

                strArr.push(para);
            });
            var str = strArr.join("&");
            path = path+str;
            window.open(path);
        }

    }
}]);
deptassureApp.controller('deptassureAddCtrl', ['$scope', '$stateParams', '$rootScope','$filter','deptassureServices', function ($scope,$stateParams,$rootScope,$filter,deptassure) {
    $scope.ORDER_DATA={};
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.proposer=person.user.name;
    $scope.ORDER_DATA.orgname=person.user.orgname;
    $scope.ORDER_DATA.orgid=person.user.orgid;

    $scope.assureChange=function(assuremoney){
        $scope.ORDER_DATA.deptused=($scope.deptusedBox*1+(assuremoney*1||0)).toFixed(2);
        $scope.ORDER_DATA.deptunused=($scope.deptunusedBox*1-(assuremoney||0)).toFixed(2);
        if(parseFloat(assuremoney) > $scope.ORDER_DATA.contractmoney){
            swal('不能大于合同金额','','warning');
            $scope.ORDER_DATA.assuremoney = 0;
            $scope.ORDER_DATA.assurebl = 0;
        }else if(assuremoney){
            $scope.ORDER_DATA.assurebl = (parseFloat(assuremoney)/parseFloat($scope.ORDER_DATA.contractmoney)).toFixed(2);
        }
    }
    $scope.assurebl = function(assurebl){
        if(parseFloat(assurebl) > 1){
            swal('担保比例不能大于1','','warning');
            $scope.ORDER_DATA.assuremoney = 0;
            $scope.ORDER_DATA.assurebl = 0;
            return
        }else if(assurebl){
            $scope.ORDER_DATA.assuremoney =(parseFloat($scope.ORDER_DATA.contractmoney)*parseFloat(assurebl)).toFixed(2);
            $scope.ORDER_DATA.deptused=($scope.deptusedBox*1+($scope.ORDER_DATA.assuremoney*1||0)).toFixed(2);
            $scope.ORDER_DATA.deptunused=($scope.deptunusedBox*1-($scope.ORDER_DATA.assuremoney||0)).toFixed(2);
        }
    }
    $scope.proposerBox = function(){
        $( "#proposerBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#proposerBox" ).dialog( "open" );
    }
    $scope.proposerSelect = function(user, userId, orgName, orgId){
        $scope.ORDER_DATA.proposer = user;
        $scope.ORDER_DATA.userid = userId;
        $scope.ORDER_DATA.orgname = orgName;
        $scope.ORDER_DATA.orgid = orgId;
        $( "#proposerBox" ).dialog("destroy");
        $(".ui-dialog").remove();

    }
    //设置默认日期
    var today = new Date();
    $scope.ORDER_DATA.creatdate= $filter('date')(today,'yyyy-MM-dd');
    $scope.contractBox = function(){
        $( "#contractInforBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractInforBox" ).dialog( "open" );
    };
    $scope.selectContr=function (contractno,salesname,salesorgname,stomer,salesorgname2,contractmoney) {
        var checkcontract = deptassure.checkcontract({contractno:contractno});
        checkcontract.success(function(data){
            if(data.code == 200){
                var par={salesname:salesname};
                var partMoney=deptassure.selectdeptmoney(par);
                partMoney.success(function(data){
                    if(data.code==200){
                        $scope.ORDER_DATA.contractno = contractno;
                        $scope.ORDER_DATA.salesname = salesname;
                        $scope.ORDER_DATA.salesorgname =salesorgname;
                        $scope.ORDER_DATA.stomer = stomer;
                        $scope.ORDER_DATA.salesorgname2 =salesorgname2;   //6630添加 事业部
                        $scope.ORDER_DATA.contractmoney =contractmoney;   //6815添加 合同金额
                        $scope.ORDER_DATA.oneorgid=data.rst.oneorgid;//一级部门
                        $scope.ORDER_DATA.deptlimit=data.rst.data.sum.toFixed(2);
                        $scope.ORDER_DATA.deptused=data.rst.data.usedsum.toFixed(2);
                        $scope.deptusedBox=data.rst.data.usedsum.toFixed(2);
                        $scope.ORDER_DATA.deptunused=data.rst.data.unusedsum.toFixed(2);
                        $scope.deptunusedBox=data.rst.data.unusedsum.toFixed(2);
                        $( "#contractInforBox" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }else{
                        swal({title:'', text:data.msg, type:"warning"});
                    }
                });
            }else{
                swal({
                    title: "",
                    text: data.rst.join('<br/>'),
                    html:true,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: '关闭',
                    closeOnConfirm: true
                }, function (isConfirm) {
                    if(isConfirm){
                        var par={salesname:salesname};
                        var partMoney=deptassure.selectdeptmoney(par);
                        partMoney.success(function(data){
                            if(data.code==200){
                                $scope.ORDER_DATA.contractno = contractno;
                                $scope.ORDER_DATA.salesname = salesname;
                                $scope.ORDER_DATA.salesorgname =salesorgname;
                                $scope.ORDER_DATA.stomer = stomer;
                                $scope.ORDER_DATA.salesorgname2 =salesorgname2;   //6630添加 事业部
                                $scope.ORDER_DATA.contractmoney =contractmoney;   //6815添加 合同金额
                                $scope.ORDER_DATA.oneorgid=data.rst.oneorgid;//一级部门
                                $scope.ORDER_DATA.deptlimit=data.rst.data.sum.toFixed(2);
                                $scope.ORDER_DATA.deptused=data.rst.data.usedsum.toFixed(2);
                                $scope.deptusedBox=data.rst.data.usedsum.toFixed(2);
                                $scope.ORDER_DATA.deptunused=data.rst.data.unusedsum.toFixed(2);
                                $scope.deptunusedBox=data.rst.data.unusedsum.toFixed(2);
                                $( "#contractInforBox" ).dialog("destroy");
                                $(".ui-dialog").remove();
                            }else{
                                swal({title:'', text:data.msg, type:"warning"});
                            }
                        });
                    }else{
                        $scope.ORDER_DATA.contractno="";
                        $scope.$apply();
                    }
                });
            }
        });
    }
    $scope.addData = function (ORDER_DATA,type) {
        var requiredObj = $scope.deptassureForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.deptassureForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.deptlimit){
            swal("该部门尚未分配额度，请重新选择", "", "warning");
            return false;
        }

        var doc = {}, param = {processId:$scope.processId,nodeId:$scope.nodeId,doc:ORDER_DATA};
       if(type=='save'){
           var addInside = deptassure.deptassureSave(param);
           addInside.success(function (data) {
               if (data.code == 200) {
                   $scope.processId=data.rst.processId;
                   $scope.nodeId=data.rst.nodeId;
                   swal("保存成功", "", "success");


               } else {

                   swal({
                       title:"",
                       text:data.msg,
                       type:"error"
                   })
               }
           }).error(function (error) {

               swal({
                   title:"",
                   text:error,
                   type:"error"
               })
           })
       }else if(type=='updata'){
         if($scope.ORDER_DATA.deptunused<0){
           swal({
              title: "部门担保剩余额度小于0！",
              text: "",
              type: "warning",
              showCancelButton: true,
              cancelButtonText: "取消",
               confirmButtonText: "确定"
            },
            function () {
              var addInside = deptassure.deptassureAdd(param);
               addInside.success(function (data) {
               if (data.code == 200) {
               swal("提交成功", "", "success");
               window.location.href = '/index.html#/deptassureOrder';
               } else {
               /*alert(data.msg);*/
               swal({
               title:"",
               text:data.msg,
               type:"error"
               })
               }
               }).error(function (error) {
               /*alert(error);*/
               swal({
               title:"",
               text:error,
               type:"error"
               })
               })
            }
            );
         }else{
           var addInside = deptassure.deptassureAdd(param);
            addInside.success(function (data) {
            if (data.code == 200) {
            swal("提交成功", "", "success");
            window.location.href = '/index.html#/deptassureOrder';
            } else {

            swal({
            title:"",
            text:data.msg,
            type:"error"
            })
            }
            }).error(function (error) {

            swal({
            title:"",
            text:error,
            type:"error"
            })
            })
         }

       }

    }
}]);
deptassureApp.controller('deptassureCtrl', ['$scope', '$stateParams', 'deptassureServices', function ($scope,$stateParams, deptassure) {
    $scope.ORDER_DATA={};
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }

    var viewPur = deptassure.deptassureView(param);

    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            if ($stateParams.myflag == 'mybegin') {
                $scope.editBtn = true;
            }
        }
    }).error(function (error) {
        swal({
            title:"",
            text:error,
            type:"error"
        })
    });
}]);

deptassureApp.controller('deptassureViewCtrl', ['$scope', '$stateParams', 'deptassureServices', function ($scope,$stateParams, deptassure) {
    $scope.ORDER_DATA={};
    $scope.sfList=[];
    var param = {_id: $stateParams.id};
    var viewPur = deptassure.viewCustomer(param);

    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.sfList = data.rst.data.model.freeInfo;

        }
    }).error(function (error) {
        swal({
            title:"",
            text:error,
            type:"error"
        })
    });

  // 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = deptassure.getprocesslog({id: vm.ORDER_DATA.code});
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
deptassureApp.controller('deptassureEditCtrl', ['$scope', '$stateParams', '$rootScope', 'deptassureServices', function ($scope,$stateParams,$rootScope, deptassure) {
    $scope.ORDER_DATA={};
    var param = {sapid: $stateParams.sapid, processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    var viewPur = deptassure.deptassureEidet(param);

    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.deptusedBox=data.rst.data.model.deptused-data.rst.data.model.assuremoney;
            $scope.deptunusedBox=data.rst.data.model.deptunused*1+data.rst.data.model.assuremoney*1;
            $scope.lastmoney = eval($scope.ORDER_DATA.assuremoney)-eval($scope.ORDER_DATA.freemoney);
        }
    }).error(function (error) {
        swal({
            title:"",
            text:error,
            type:"error"
        })
    });
    $scope.proposerBox = function(){
        $( "#proposerBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#proposerBox" ).dialog( "open" );
    }
    $scope.proposerSelect = function(user, userId, orgName, orgId){
        $scope.ORDER_DATA.proposer = user;
        $scope.ORDER_DATA.userid = userId;
        $scope.ORDER_DATA.orgname = orgName;
        $scope.ORDER_DATA.orgid = orgId;
        $( "#proposerBox" ).dialog("destroy");
        $(".ui-dialog").remove();

    }
    $scope.contractBox = function(){
        $( "#contractInforBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractInforBox" ).dialog( "open" );
    };
    $scope.selectContr=function (contractno,salesname,salesorgname,stomer,salesorgname2,contractmoney) {
        var checkcontract = deptassure.checkcontract({contractno:contractno});
        checkcontract.success(function(data){
            if(data.code == 200){
                var par={salesname:salesname};
                var partMoney=deptassure.selectdeptmoney(par);
                partMoney.success(function(data){
                    if(data.code==200){
                        $scope.ORDER_DATA.contractno = contractno;
                        $scope.ORDER_DATA.salesname = salesname;
                        $scope.ORDER_DATA.salesorgname =salesorgname;
                        $scope.ORDER_DATA.stomer = stomer;
                        $scope.ORDER_DATA.salesorgname2 =salesorgname2;   //6630添加 事业部
                        $scope.ORDER_DATA.contractmoney =contractmoney;   //6815添加 合同金额
                        $scope.ORDER_DATA.oneorgid=data.rst.oneorgid;//一级部门
                        $scope.ORDER_DATA.deptlimit=data.rst.data.sum.toFixed(2);
                        $scope.ORDER_DATA.deptused=data.rst.data.usedsum.toFixed(2);
                        $scope.deptusedBox=data.rst.data.usedsum.toFixed(2);
                        $scope.ORDER_DATA.deptunused=data.rst.data.unusedsum.toFixed(2);
                        $scope.deptunusedBox=data.rst.data.unusedsum.toFixed(2);
                        $( "#contractInforBox" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }else{
                        swal({title:'', text:data.msg, type:"warning"});
                    }
                });
            }else{
                swal({
                    title: "",
                    text: data.rst.join('<br/>'),
                    html:true,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: '关闭',
                    closeOnConfirm: true
                }, function (isConfirm) {
                    if(isConfirm){
                        var par={salesname:salesname};
                        var partMoney=deptassure.selectdeptmoney(par);
                        partMoney.success(function(data){
                            if(data.code==200){
                                $scope.ORDER_DATA.contractno = contractno;
                                $scope.ORDER_DATA.salesname = salesname;
                                $scope.ORDER_DATA.salesorgname =salesorgname;
                                $scope.ORDER_DATA.stomer = stomer;
                                $scope.ORDER_DATA.salesorgname2 =salesorgname2;   //6630添加 事业部
                                $scope.ORDER_DATA.contractmoney =contractmoney;   //6815添加 合同金额
                                $scope.ORDER_DATA.oneorgid=data.rst.oneorgid;//一级部门
                                $scope.ORDER_DATA.deptlimit=data.rst.data.sum.toFixed(2);
                                $scope.ORDER_DATA.deptused=data.rst.data.usedsum.toFixed(2);
                                $scope.deptusedBox=data.rst.data.usedsum.toFixed(2);
                                $scope.ORDER_DATA.deptunused=data.rst.data.unusedsum.toFixed(2);
                                $scope.deptunusedBox=data.rst.data.unusedsum.toFixed(2);
                                $( "#contractInforBox" ).dialog("destroy");
                                $(".ui-dialog").remove();
                            }else{
                                swal({title:'', text:data.msg, type:"warning"});
                            }
                        });
                    }else{
                        $scope.ORDER_DATA.contractno="";
                        $scope.$apply();
                    }
                });
            }
        });
    }
    $scope.assureChange=function(assuremoney){
        $scope.ORDER_DATA.deptused=($scope.deptusedBox*1+(assuremoney*1||0)).toFixed(2);
        $scope.ORDER_DATA.deptunused=($scope.deptunusedBox*1-(assuremoney||0)).toFixed(2);
        if(parseFloat(assuremoney) > $scope.ORDER_DATA.contractmoney){
            swal('不能大于合同金额','','warning');
            $scope.ORDER_DATA.assuremoney = 0;
            $scope.ORDER_DATA.assurebl = 0;
        }else if(assuremoney){
            $scope.ORDER_DATA.assurebl = (parseFloat(assuremoney)/parseFloat($scope.ORDER_DATA.contractmoney)).toFixed(2);
        }
    }
    $scope.assurebl = function(assurebl){
        if(parseFloat(assurebl) > 1){
            swal('担保比例不能大于1','','warning');
            $scope.ORDER_DATA.assuremoney = 0;
            $scope.ORDER_DATA.assurebl = 0;
            return
        }else if(assurebl){
            $scope.ORDER_DATA.assuremoney =(parseFloat($scope.ORDER_DATA.contractmoney)*parseFloat(assurebl)).toFixed(2);
            $scope.ORDER_DATA.deptused=($scope.deptusedBox*1+($scope.ORDER_DATA.assuremoney*1||0)).toFixed(2);
            $scope.ORDER_DATA.deptunused=($scope.deptunusedBox*1-($scope.ORDER_DATA.assuremoney||0)).toFixed(2);
        }
    }
    $scope.addData = function (ORDER_DATA,type) {
        var requiredObj = $scope.deptassure1Form.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.deptassure1Form.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.deptlimit){
            swal("该部门尚未分配额度，请重新选择", "", "warning");
            return false;
        }
        var doc = {}, param = {processId:$stateParams.processId,nodeId:$stateParams.nodeId,doc:ORDER_DATA};
        if(type=='save'){
            var addInside = deptassure.deptassureSave(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");


                } else {
                    swal({
                        title:"",
                        text:data.msg,
                        type:"error"
                    })
                }
            }).error(function (error) {
                swal({
                    title:"",
                    text:error,
                    type:"error"
                })
            })
        }else if(type=='updata'){
          if($scope.ORDER_DATA.deptunused<0){
            swal({
                title: "部门担保剩余额度小于0！",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "取消",
                confirmButtonText: "确定"
              },
              function () {
                var addInside = deptassure.deptassureAdd(param);
                addInside.success(function (data) {
                  if (data.code == 200) {
                    swal("提交成功", "", "success");
                    window.location.href = '/index.html#/deptassureOrder';
                  } else {
                    /*alert(data.msg);*/
                    swal({
                      title:"",
                      text:data.msg,
                      type:"error"
                    })
                  }
                }).error(function (error) {
                  swal({
                    title:"",
                    text:error,
                    type:"error"
                  })
                })
              }
            );
          }else{
            var addInside = deptassure.deptassureAdd(param);
            addInside.success(function (data) {
              if (data.code == 200) {
                swal("提交成功", "", "success");
                window.location.href = '/index.html#/deptassureOrder';
              } else {
                swal({
                  title:"",
                  text:data.msg,
                  type:"error"
                })
              }
            }).error(function (error) {
              swal({
                title:"",
                text:error,
                type:"error"
              })
            })
          }

        }

    }

}]);

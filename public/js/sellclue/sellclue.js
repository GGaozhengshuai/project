var sellclueApp = angular.module('sellclueApp', ['pageDirectives', 'formDirectives', 'uploadifyApp','ui.autocomplete']);
sellclueApp.service('sellclueServices', function ($http) {
    var service = {
        listInside: function (param) {
            return $http.post('/sellclue/list', param, {cache: false});
        },
        viewInside: function (param) {
            return $http.post('/sellclue/view', param, {cache: true});
        },
        addInside: function (param) {
            return $http.post('/sellclue/save', param, {cache: false});
        },
        updateInside: function (param) {
            return $http.post('/sellclue/update', param, {cache: false});
        },
        productline: function (param) {//
            return $http.post('/sellclue/productline', param, {cache: false});
        },
        listCpx: function(param){//产品线
            return $http.post('/sellclue/cpxenum',param ,{cache:false});
        },
        updatesalesclerk: function (param) {//转移
            return $http.post('/sellclue/updatesalesclerk', param, {cache: false});
        },
        listUser: function(param){//用户接口
            return $http.post('/user/list',param);
        },
        list2: function(param){//客户接口
            return $http.post('/customer/list2',param);
        },
        relevancepurchase: function(param){//关联采购单据
            return $http.post('/sellclue/relevancepurchase',param);
        },
        relevancecontract: function(param){//关联销售合同
            return $http.post('/sellclue/relevancecontract',param);
        },
        saveproduct: function(param){//导入
            return $http.post('/sellclue/saveproduct',param);
        },
        cpxxhenum: function(param){//产品类型
            return $http.post('/sellclue/cpxxhenum',param);
        },

    };
    return service;
});
sellclueApp.controller('cusBoxCtrl', ['$scope', 'sellclueServices', function ($scope, sellclue) {
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var param = {
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                NAME: $scope.cusname
            }
            var sellcluePromise = sellclue.list2(param);
            $scope.paginationConf.pagePromise = sellcluePromise;
        }
    };
}]);
sellclueApp.controller('sellclueBoxCtrl', ['$scope', 'sellclueServices', function ($scope, sellclue) {
    $scope.salesClick=function(salesclerk1){
        $scope.department1="";
        if(salesclerk1){
            var userPromise = sellclue.listUser({page:1, limit:100, name:salesclerk1});
            userPromise.success(function(data){
                if(data.code==200){
                    if(data.rst.data.items.length==0){
                        swal("无此销售人员！", "","warning");
                        $scope.salesclerk1="";
                    }else if(data.rst.data.items.length>0){
                        $scope.department1=data.rst.data.items[0].orgname;
                    }

                }
            })
        }

    }
    $scope.sellclueSelect=function(salesclerk1,department1){
        if(!salesclerk1){
            swal("请填写销售人员！", "","warning");
            return false;
        }
        par={salesclerk:salesclerk1,department:department1,ids:$scope.cArr};
        var sellclueBox=sellclue.updatesalesclerk(par);
        sellclueBox.success(function(data){
            if(data.code==200){
                for(var i=0;i<$scope.ary.length;i++){
                    $scope.dataList[$scope.ary[i]].salesclerk=salesclerk1;
                    $scope.dataList[$scope.ary[i]].department=department1;
                }
                console.log($scope.dataList)
                $("#sellclueBox").dialog("destroy");
                $(".ui-dialog").remove();
            }else{
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })
    }
}]);
sellclueApp.controller('productinfoCtrl', ['$scope', 'sellclueServices', function ($scope, sellclue) {
    $scope.fileError=[];
    $scope.Filedata=[];
    $scope.del=function(index){
        $scope.fileError.splice(index,1);
    }
    $scope.addData = function (Filedata,fileError) {
        if(fileError.length!=0){
            swal("请把错误数据删除再保存!", "","warning");
            return false;
        }else if(Filedata.length==0){
            swal("导入数据为空!", "","warning");
            return false;
        }
        var doc = {}, param = {};
        doc.items = Filedata;
        param.doc = doc;

        var addInside = sellclue.saveproduct(param);
        addInside.success(function (data) {
            if (data.code == 200) {
                    swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    });
            } else {
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })
    }
}]);


sellclueApp.controller('sellclueOrderCtrl', ['$scope', 'sellclueServices', function ($scope, sellclue) {
    $scope.dataLimit=function(){
      if($scope.datebefore){
          if(Date.parse($scope.dateafter) < Date.parse($scope.datebefore)){
              swal("预计下单结束日期不能早于预计下单开始日期", "","warning");
              $scope.dateafter='';
              return false;
          }
      }
    }
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
                sellclueno: $scope.sellclueno,
                department: $scope.department,
                salesclerk: $scope.salesclerk,
                proscheduleprecent: $scope.proscheduleprecent,
                datebefore: $scope.datebefore,
                dateafter: $scope.dateafter
            };
            var sellcluePromise = sellclue.listInside(param);
            sellcluePromise.success(function(data){
                if(data.code==200){
                    $scope.dataList=data.rst.data.items;
                    for(var i=0;i<$scope.dataList.length;i++){
                        if($scope.dataList[i].state=="有效"){
                            $scope.dataList[i].canEdit=false;
                        }else{
                            $scope.dataList[i].canEdit=true;
                        }
                    }
                }else{
                    swal(
                        {
                            title: "",
                            text: data.msg,
                            type: "warning",
                        })
                }
            }).error(function (error) {
                swal({
                    title:'',
                    text:error,
                    type:"error"
                })            })
            $scope.paginationConf.pagePromise = sellcluePromise;
        }
    };
    $scope.cArr=[],$scope.ary=[];
    $scope.checkSelect = function(idx,data){
        var parent = $("#occTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr("checked",'checked');
            $scope.cArr.push(data);
            $scope.ary.push(idx);
        }else{
            check.removeAttr("checked");
            for(var i=0;i<$scope.cArr.length;i++){
                if($scope.cArr[i]==data){
                    $scope.cArr.splice(i,1);
                    $scope.ary.splice(i,1);
                }
            }
        }

    }
    $scope.allCheck=function(data){
        $scope.cArr.splice(0,$scope.cArr.length);
        $scope.ary.splice(0,$scope.ary.length);
        var check = $("#occTable").find("#allCheck");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr("checked",'checked');
            var count=0;
            for(var x in data){
                $scope.cArr.push(data[x]._id);
                $scope.ary.push(count);
                count++;
            }
        }else{
            check.removeAttr("checked");
            $scope.cArr.splice(0,$scope.cArr.length);
            $scope.ary.splice(0,$scope.ary.length);
        }
    }
    /* $scope.sellclueOut=function(){
     if(cArr.length<=0){
     alert("请勾选列表");
     return false;
     }
     var path = '/salesbonus/exportexcel?';
     var strArr = [];
     $.each(cArr,function(key,value){
     var para = 'ids='+value;
     strArr.push(para);
     });
     var str = strArr.join("&");
     path = path+str;
     window.open(path);
     }*/
    $scope.sellclueGo=function(){
        if($scope.cArr.length<1){
            swal("请勾选列表", "", "warning");
            return false;
        }
        $("#sellclueBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#sellclueBox").dialog("open");
    }
    $scope.changeGo=function(){
        if($scope.cArr.length<1){
            swal("请勾选列表", "", "warning");
            return false;
        }
        window.open('sellclue/exportxsxsbbexcel?id='+$scope.cArr);
    }

}]);
sellclueApp.controller('sellclueAddCtrl', ['$scope', '$stateParams', '$rootScope','$filter','sellclueServices', function ($scope,$stateParams,$rootScope,$filter,sellclue) {
    var ht = $scope.ht = {};
    $scope.htTab = function(type){
        $scope.ht.activeTab = type;
    }
    $scope.PRODUCT={};
    $scope.ORDER_DATA={};
    //基本信息
    var today = new Date();
    $scope.ORDER_DATA.creatdate= $filter('date')(today,'yyyy-MM-dd');
    $scope.customerBox = function () {
        $("#cusBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#cusBox").dialog("open");
        $scope.cusSelect = function (name) {
            $scope.ORDER_DATA.cusname = name;
            $("#cusBox").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }
    //产品线
    $scope.productOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            mustMatch:true,
            source: function (request, response) {
                var listCpx = sellclue.listCpx({cpxname:$scope.ORDER_DATA.productline});
                listCpx.success(function(data) {
                    if (data.code == 200) {
                        var dataItems = data.rst.data.enum.CPX;
                        if (!dataItems.length) {
                            dataItems.push({
                                'val': '未找到'
                            });
                        }
                        response($.map(dataItems, function (item) {
                            if (item.val == '未找到') {
                                return {label: item.val, value: ''};
                            } else {
                                return {label: item.val, value: item.name, code: item.key};
                            }

                        }));
                    } else {
                        swal(data.msg, "", "warning");
                    }
                })
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.productline = ui.item.value;
                $scope.box = [];
                var cpxxhenum = sellclue.cpxxhenum();
                cpxxhenum.success(function(data){
                    if(data.code==200){
                        $scope.box=data.rst.data.enum.CPXXH;

                        var ary=[];
                        if($scope.box){
                            for(var i=0;i<$scope.box.length;i++){
                                if($scope.box[i].prodline===$scope.ORDER_DATA.productline){
                                    ary.push({val1:$scope.box[i].val1,val2:$scope.box[i].val2})
                                }
                            }
                            $scope.producttypeData=ary;
                        }
                    }
                });

            }
        }

    };
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.salesclerk = person.user.name;
    /*$scope.PRODUCT.updatename = person.user.name;*/
    /*$scope.ORDER_DATA.createname = person.user.name;*/
    $scope.ORDER_DATA.department = person.user.orgname;
    /* $scope.ORDER_DATA.createdep = person.user.orgname;*/
    $scope.userBox = function(userType){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true,
            open: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = true;
                    })
                })
            },
            close: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = false;
                    })
                })
            }

        });
        $( "#userBox" ).dialog( "open" );
        $scope.userType = userType;


    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        if(userType == 'salsUser'){
            $scope.ORDER_DATA.salesclerk = user;
            $scope.ORDER_DATA.department = orgName;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.technicisOption={
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            mustMatch:true,
            source: function (request, response) {
                var userPromise = sellclue.listUser({page:1, limit:100, name:$scope.ORDER_DATA.technicistname});
                userPromise.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.items;
                        //$('.ui-autocomplete').css({'height': (dataItems.length<4 ? !dataItems.length ? '25px' : 25*dataItems.length +'px' : '100px')});
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.name, value: item.name,  orgname:item.orgname };
                            }
                        }));
                    }else {
                        swal(
                            {
                                title: "",
                                text: data.msg,
                                type: "warning",
                            })
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.department = ui.item.orgname;
            }
        }
    };

    $scope.purchaseBox=function(purchaseData,$event){
        var purchasePromise = sellclue.relevancepurchase({page:1, limit:100, purchase:purchaseData});
        purchasePromise.success(function(data){
            if(data.code==200){
                $scope.ORDER_DATA.purchaseamount=data.rst;
            }else{
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })

    }
    $scope.billsalesBox=function(billsalesData,$event){
        var billsalesPromise = sellclue.relevancecontract({page:1, limit:100, billsales:billsalesData});
        billsalesPromise.success(function(data){
            if(data.code==200){
                $scope.ORDER_DATA.salesamount=data.rst;
            }else{
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })

    }
    $scope.scheduleChange=function(schedule){
        switch (schedule){
            case "项目丢失":
                $scope.ORDER_DATA.proscheduleprecent="0%";
                $scope.ORDER_DATA.proscheduledeclare="项目丢失";
                $scope.cusMust=false;
                $scope.ORDER_DATA.state="关闭";
                $scope.tradeShow=false;
                $scope.declareShow=true;
                break;
            case "得到信息":
                $scope.ORDER_DATA.proscheduleprecent="5%";
                $scope.ORDER_DATA.proscheduledeclare="得到项目信息";
                $scope.cusMust=false;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=false;
                $scope.declareShow=false;
                break;
            case "项目确认":
                $scope.ORDER_DATA.proscheduleprecent="10%";
                $scope.ORDER_DATA.proscheduledeclare="项目有预算、时间等进度安排，确认厂商、集成商有参与，并有中建的销售机会";
                $scope.cusMust=false;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            case "项目中标":
                $scope.ORDER_DATA.proscheduleprecent="50%";
                $scope.ORDER_DATA.proscheduledeclare="项目已经确定，有具体交付时间、具体配置、有确定的集成商";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            case "初步确认商务条件":
                $scope.ORDER_DATA.proscheduleprecent="75%";
                $scope.ORDER_DATA.proscheduledeclare="已经与厂商或集成商初步确定好商务条件，如下单、交货、付款条件等";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            case "厂商特价审批":
                $scope.ORDER_DATA.proscheduleprecent="90%";
                $scope.ORDER_DATA.proscheduledeclare="厂商已经提交特价申请";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            default :
                $scope.ORDER_DATA.proscheduleprecent="100%";
                $scope.ORDER_DATA.proscheduledeclare="双方签订销售合同";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="完成";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
        }
    }
//产品信息
    $scope.productinfoList=[];
    $scope.productinfoAdd = function () {
        var obj = {productline:$scope.ORDER_DATA.productline,producttype1:'',typedescribe:'',number:'',expectamount:''};
        $scope.productinfoList.push(obj);
    };
    $scope.productinfoDel = function (idx) {
        if ($scope.productinfoList.length <= 0) {
            swal("不能再删了!", "","warning");
            return false;
        }
        $scope.productinfoList.splice(idx, 1);
    };
    $scope.producttypeClick=function(type,index){
        if(type&&type.val2){
            $scope.productinfoList[index].typedescribe=type.val2;
        }

    }
//跟踪表
    $scope.sellclueList=[];
    $scope.sellclueBoxAdd = function () {
        var obj = {username:person.user.name,updatedate:$filter('date')(today,'yyyy-MM-dd'),workcontent:'',workinfo:'',workdate:''};
        $scope.sellclueList.push(obj);
    };
    $scope.sellclueDel = function (idx) {
        if ($scope.sellclueList.length <= 0) {
            swal("不能再删了!", "","warning");
            return false;
        }
        $scope.sellclueList.splice(idx, 1);
    };

    var sellclueId = $scope.sellclueId = '';
    $scope.addData = function (part,type) {
        var requiredObj3= $scope.modelForm.$error.required;
        angular.forEach(requiredObj3,function(keyData){
            keyData.$dirty = true;
        })
        if(part=="model"){
            var requiredObj3= $scope.modelForm.$error.required;
            angular.forEach(requiredObj3,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }else if(part=="selltrace"){
            var requiredObj4= $scope.selltraceForm.$error.required;
            angular.forEach(requiredObj4,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.selltraceForm.$valid||!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }else if(part=="productinfo"){
            var requiredObj5= $scope.productinfoForm.$error.required;
            angular.forEach(requiredObj5,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.productinfoForm.$valid||!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }

        var doc = {}, param = {processId:$scope.processId,nodeId:$scope.nodeId};
        doc.model = $scope.ORDER_DATA;
        doc.selltrace = $scope.sellclueList;
        if($scope.productinfoList){
            var count=0;
            for(var i=0;i<$scope.productinfoList.length;i++){
                if($scope.productinfoList[i].producttype1){
                 $scope.productinfoList[i].producttype=$scope.productinfoList[i].producttype1.val1;
                 }
                count+=eval($scope.productinfoList[i].expectamount);
                /*if($scope.ORDER_DATA.productline!==$scope.productinfoList[i].productline){
                    alert("基本信息与产品信息中的产品线不一致");
                    return false;
                }*/
            }
            if($scope.ORDER_DATA.contractamount<count){
                swal("预估金额小计之和不能大于预计合同金额!", "","warning");
                return false;
            }
        }
        doc.productinfo = $scope.productinfoList;
        doc._id = $scope.sellclueId;
        doc.producttypeData = $scope.producttypeData;//产品线对应的产品类型和产品描述
        param.doc = doc;
        param.status = part;

        var addInside = sellclue.addInside(param);
        addInside.success(function (data) {
            if (data.code == 200) {
                if (type == 'save') {
                    $scope.sellclueId = data.rst._id;
                    /*swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    });*/
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    if(part=="selltrace"||part=="productinfo"){
                        $scope.ht.activeTab = "1";
                    }
                }
            } else {
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })
    }
}]);

sellclueApp.controller('sellclueViewCtrl', ['$scope', '$stateParams', 'sellclueServices', function ($scope,$stateParams, sellclue) {
    var ht = $scope.ht = {};
    $scope.htTab = function(type){
        $scope.ht.activeTab = type;
    }
    $scope.ORDER_DATA={};
    $scope.sellclueList = [];
    $scope.productinfoList = [];
    $scope.PRODUCT={};
    $scope.sellclue={};
    var param = {_id: $stateParams.id};
    var viewPur = sellclue.viewInside(param);

    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.sellclueList = data.rst.selltrace;
            $scope.productinfoList = data.rst.productinfo;
            if($scope.productinfoList){
                $scope.PRODUCT=$scope.productinfoList[0];
            }
            if($scope.sellclueList){
                $scope.sellclue=$scope.sellclueList[0];
            }
            $scope.ORDER_DATA = data.rst;
        }
    }).error(function (error) {
        swal({
            title:'',
            text:error,
            type:"error"
        })    });
}]);
sellclueApp.controller('sellclueEditCtrl', ['$scope', '$stateParams', '$rootScope','$filter', 'sellclueServices', function ($scope,$stateParams,$rootScope,$filter, sellclue) {
    var ht = $scope.ht = {};
    $scope.htTab = function(type){
        $scope.ht.activeTab = type;
    }
    $scope.ORDER_DATA={};
    $scope.productinfo1List=[];
    $scope.PRODUCT={};
    $scope.sellclueList = [];
    $scope.productinfoList = [];
    $scope.sellclue={};
    var param = {_id: $stateParams.sapid};
    var viewPur = sellclue.viewInside(param);
    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.sellclueList = data.rst.selltrace;
            $scope.productinfoList = data.rst.productinfo;
            $scope.sellclueId=data.rst._id;
            $scope.producttypeData=data.rst.producttypeData;
            if($scope.productinfoList.length>0){
                $scope.PRODUCT=$scope.productinfoList[0];
               /* $scope.productHidden=true;*/
                $scope.productShow=false;
            }
            if($scope.sellclueList>0){
                $scope.sellclue=$scope.sellclueList[0];
                for(var i= 0;i<$scope.sellclueList.length;i++ ){
                    $scope.sellclueList[i].updatedate=$filter('date')($scope.sellclueList[i].updatedate,'yyyy-MM-dd');
                    $scope.sellclueList[i].workdate=$filter('date')($scope.sellclueList[i].workdate,'yyyy-MM-dd');
                }
            }
            $scope.ORDER_DATA = data.rst;
            $scope.ORDER_DATA.createdate=$filter('date')( $scope.ORDER_DATA.createdate,'yyyy-MM-dd');
            $scope.ORDER_DATA.estimateddeliverydate=$filter('date')($scope.ORDER_DATA.estimateddeliverydate,'yyyy-MM-dd');
            $scope.ORDER_DATA.estimateddeliverydate=$filter('date')($scope.ORDER_DATA.estimateddeliverydate,'yyyy-MM-dd');
            $scope.ORDER_DATA.estimatedorderdate=$filter('date')($scope.ORDER_DATA.estimatedorderdate,'yyyy-MM-dd');
            $scope.ORDER_DATA.signingdate=$filter('date')($scope.ORDER_DATA.signingdate,'yyyy-MM-dd');
            $scope.ORDER_DATA.updatedate=$filter('date')($scope.ORDER_DATA.updatedate,'yyyy-MM-dd');
            $scope.proLine = data.rst.productline;

            if($scope.ORDER_DATA.proscheduleprecent=="0%"){
                $scope.declareShow=true;
            }else{
                $scope.declareShow=false;
            }
            if($scope.ORDER_DATA.proscheduleprecent=="0%"||$scope.ORDER_DATA.proscheduleprecent=="5%"){
                $scope.tradeShow=false;
            }else{
                $scope.tradeShow=true;
            }
        }
    }).error(function (error) {
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    $scope.productOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            mustMatch:true,
            source: function (request, response) {
                var listCpx = sellclue.listCpx({cpxname:$scope.ORDER_DATA.productline});
                listCpx.success(function(data) {
                    if (data.code == 200) {
                        var dataItems = data.rst.data.enum.CPX;
                        if (!dataItems.length) {
                            dataItems.push({
                                'val': '未找到'
                            });
                        }
                        response($.map(dataItems, function (item) {
                            if (item.val == '未找到') {
                                return {label: item.val, value: ''};
                            } else {
                                return {label: item.val, value: item.name, code: item.key};
                            }

                        }));
                    } else {
                        swal(data.msg, "", "warning");
                    }
                })
            },
            select: function( event, ui ) {
                swal({
                        title: "是否清空已有产品信息！",
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定"
                    },
                    function () {
                        $scope.ORDER_DATA.productline = ui.item.value;
                        $scope.productinfoList=[];
                        $scope.productinfo1List=[];
                        var cpxxhenum = sellclue.cpxxhenum();
                        cpxxhenum.success(function(data){
                            if(data.code==200){
                                $scope.box=data.rst.data.enum.CPXXH;
                                var ary=[];
                                if($scope.box){
                                    for(var i=0;i<$scope.box.length;i++){
                                        if($scope.box[i].prodline===$scope.ORDER_DATA.productline){
                                            ary.push({val1:$scope.box[i].val1,val2:$scope.box[i].val2})
                                        }
                                    }
                                    $scope.producttypeData=ary;
                                }
                            }
                        })
                    }
                );
            }
        }

    };

    $scope.userBox = function(userType){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true,
            open: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = true;
                    })
                })
            },
            close: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = false;
                    })
                })
            }

        });
        $( "#userBox" ).dialog( "open" );
        $scope.userType = userType;


    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        if(userType == 'salsUser'){
            $scope.ORDER_DATA.salesclerk = user;
            $scope.ORDER_DATA.department = orgName;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.scheduleChange=function(schedule){
        switch (schedule){
            case "项目丢失":
                $scope.ORDER_DATA.proscheduleprecent="0%";
                $scope.ORDER_DATA.proscheduledeclare="项目丢失";
                $scope.cusMust=false;
                $scope.ORDER_DATA.state="关闭";
                $scope.tradeShow=false;
                $scope.declareShow=true;
                break;
            case "得到信息":
                $scope.ORDER_DATA.proscheduleprecent="5%";
                $scope.ORDER_DATA.proscheduledeclare="得到项目信息";
                $scope.cusMust=false;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=false;
                $scope.declareShow=false;
                break;
            case "项目确认":
                $scope.ORDER_DATA.proscheduleprecent="10%";
                $scope.ORDER_DATA.proscheduledeclare="项目有预算、时间等进度安排，确认厂商、集成商有参与，并有中建的销售机会";
                $scope.cusMust=false;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            case "项目中标":
                $scope.ORDER_DATA.proscheduleprecent="50%";
                $scope.ORDER_DATA.proscheduledeclare="项目已经确定，有具体交付时间、具体配置、有确定的集成商";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            case "初步确认商务条件":
                $scope.ORDER_DATA.proscheduleprecent="75%";
                $scope.ORDER_DATA.proscheduledeclare="已经与厂商或集成商初步确定好商务条件，如下单、交货、付款条件等";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            case "厂商特价审批":
                $scope.ORDER_DATA.proscheduleprecent="90%";
                $scope.ORDER_DATA.proscheduledeclare="厂商已经提交特价申请";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="有效";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
            default :
                $scope.ORDER_DATA.proscheduleprecent="100%";
                $scope.ORDER_DATA.proscheduledeclare="双方签订销售合同";
                $scope.cusMust=true;
                $scope.ORDER_DATA.state="完成";
                $scope.tradeShow=true;
                $scope.declareShow=false;
                break;
        }
    }
    $scope.technicisOption={
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            mustMatch:true,
            source: function (request, response) {
                var userPromise = sellclue.listUser({page:1, limit:100, name:$scope.ORDER_DATA.technicistname});
                userPromise.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.items;
                        //$('.ui-autocomplete').css({'height': (dataItems.length<4 ? !dataItems.length ? '25px' : 25*dataItems.length +'px' : '100px')});
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.name, value: item.name,  orgname:item.orgname };
                            }
                        }));
                    }else {
                        swal(
                            {
                                title: "",
                                text: data.msg,
                                type: "warning",
                            })
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.department = ui.item.orgname;
            }
        }
    };
    $scope.purchaseBox=function(purchaseData){
        var purchasePromise = sellclue.relevancepurchase({page:1, limit:100, purchase:purchaseData});
        purchasePromise.success(function(data){
            if(data.code==200){
                $scope.ORDER_DATA.purchaseamount=data.rst;
            }else{
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })
    }
    $scope.billsalesBox=function(billsalesData){
        var billsalesPromise = sellclue.relevancecontract({page:1, limit:100, billsales:billsalesData});
        billsalesPromise.success(function(data){
            if(data.code==200){
                $scope.ORDER_DATA.salesamount=data.rst;
            }else{
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })
    }
    $scope.customerBox = function () {
        $("#cusBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#cusBox").dialog("open");
        $scope.cusSelect = function (name) {
            $scope.ORDER_DATA.cusname = name;
            $("#cusBox").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }
//产品信息
    $scope.productinfoAdd = function () {
        var obj = {productline:$scope.ORDER_DATA.productline,producttype:'',typedescribe:'',number:'',expectamount:''};
        $scope.productinfo1List.push(obj);
    };
    $scope.productinfoDel = function (idx) {
        if ($scope.productinfo1List.length <= 0) {
            swal("不能再删了！", "","warning");
            return false;
        }
        $scope.productinfo1List.splice(idx, 1);
    };
    $scope.producttypeClick=function(type,index){
        if(type&&type.val2){
            $scope.productinfo1List[index].typedescribe=type.val2;
        }

    }
//跟踪表
//     var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    var today = new Date();
    $scope.sellclueBoxAdd = function () {
        var obj = {username:person.user.name,updatedate:$filter('date')(today,'yyyy-MM-dd'),workcontent:'',workinfo:'',workdate:''};
        $scope.sellclueList.push(obj);
    };
    $scope.sellclueDel = function (idx) {
        if ($scope.sellclueList.length <= 0) {
            swal("不能再删了！", "","warning");
            return false;
        }
        $scope.sellclueList.splice(idx, 1);
    };
    $scope.addData = function (part,type) {
        var requiredObj3= $scope.modelForm.$error.required;
        angular.forEach(requiredObj3,function(keyData){
            keyData.$dirty = true;
        })
        if(part=="model"){
            var requiredObj3= $scope.modelForm.$error.required;
            angular.forEach(requiredObj3,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }else if(part=="selltrace"){
            var requiredObj4= $scope.selltraceForm.$error.required;
            angular.forEach(requiredObj4,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.selltraceForm.$valid||!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }else if(part=="productinfo"){
            var requiredObj5= $scope.productinfoForm.$error.required;
            angular.forEach(requiredObj5,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.productinfoForm.$valid||!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }

        var doc = {}, param = {processId:$scope.processId,nodeId:$scope.nodeId};
        doc.model = $scope.ORDER_DATA;
        doc.selltrace = $scope.sellclueList;
        if($scope.productinfoList||$scope.productinfo1List){
            $scope.productinfoListAll=$scope.productinfoList.concat($scope.productinfo1List);
            var count=0;
            for(var i=0;i<$scope.productinfoListAll.length;i++){
                if($scope.productinfoListAll[i].producttype1){
                    $scope.productinfoListAll[i].producttype=$scope.productinfoListAll[i].producttype1.val1;
                }
                count+=eval($scope.productinfoListAll[i].expectamount);
                /*if($scope.ORDER_DATA.productline!==$scope.productinfoList[i].productline){
                 alert("基本信息与产品信息中的产品线不一致");
                 return false;
                 }*/
            }
            if($scope.ORDER_DATA.contractamount<count){
                swal("预估金额小计之和不能大于预计合同金额!", "","warning");
                return false;
            }
        }
        doc.productinfo = $scope.productinfoListAll;
        doc._id = $scope.sellclueId;
        param.doc = doc;
        param.status = part;
        doc.producttypeData = $scope.producttypeData;//产品线对应的产品类型和产品描述
        var addInside = sellclue.addInside(param);
        addInside.success(function (data) {
            if (data.code == 200) {
                if (type == 'save') {
                    $scope.sellclueId = data.rst._id;
                    /*swal({
                     title: "保存成功",
                     type: "success",
                     showCancelButton: false,
                     confirmButtonColor: "#DD6B55",
                     confirmButtonText: "返回列表",
                     closeOnConfirm: true
                     });*/
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    if(part=="selltrace"||part=="productinfo"){
                        $scope.ht.activeTab = "1";
                    }
                }
            } else {
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })        })
    }
}]);

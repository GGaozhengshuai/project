var creditMemoApp = angular.module('creditMemoApp', ['pageDirectives','formDirectives','ui.autocomplete', 'MyFilterApp']);
creditMemoApp.service('creditMemoServices', function($http) {
    var service = {
        contractList: function(param) {
            return $http.post('/contract/list',param ,{cache:false});
        },
        listInside: function(param) {
            return $http.post('/borrowcredence/list',param ,{cache:false});
        },
        viewInside: function(param) {
            return $http.post('/borrowcredence/view',param ,{cache:true});
        },
        detailView: function(param) {//审批接口
            return $http.post('/borrowcredence/detail',param ,{cache:false});
        },
        addInside: function(param){
            return $http.post('/borrowcredence/save',param ,{cache:false});
        },
        addApply: function(param){
            return $http.post('/borrowcredence/createprocess',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/borrowcredence/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/borrowcredence/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/borrowcredence/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/borrowcredence/recall',param ,{cache:false});
        },
        listUser: function(param){//用户接口
            return $http.post('/user/list',param);
        },
        listFd: function(param){//销售返点接口
            return $http.post('/salesbonus/list',param ,{cache:false});
        },
        check: function(param) {
            return $http.post('/borrowcredence/check',param ,{cache:false});
        },
	    getprocesslog: function (param) {
		    return $http.post('/borrowcredence/getprocesslog',param,{cache:false});
	    }
    };
    return service;
});

creditMemoApp.controller('contractCreBoxCtrl', ['$scope','creditMemoServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($scope.contractno==''){
                swal("必须查询条件", "", "warning");
                return true;
            }
            var param  = {page:$scope.paginationConf.currentPage, limit:5, contractno:$scope.contractno, escompany:'中建材信息技术股份有限公司'};
            var customerPromise = service.contractList(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

}]);

creditMemoApp.controller('userBoxCtrl', ['$scope','creditMemoServices',function($scope,service){
	// 2017-2-24 需求要增加分页
	$scope.paginationConf = {
		currentPage: 1,
		itemsPerPage: 5,
		numberOfPage:0,
		pagesLength: 10,
		perPageOptions: [5,10, 20, 30, 40, 50],
		pagePromise:{},
		onChange: function(){
			var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.useSname};
			
			var customerPromise = service.listUser(param);
			$scope.paginationConf.pagePromise = customerPromise;
		}
	}
   /* $scope.userSearch = function(){
        if($scope.useSname==''){
            swal("必须输入查询条件", "", "warning");
            return false;
        }
        var param  = {page:1, limit:10, name:$scope.useSname};
        var listUser = service.listUser(param);
        listUser.success(function(data){
            if(data.code == 200){
                $scope.userDateList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    }*/
}]);
creditMemoApp.controller('creditMemoOrderCtrl', ['$scope','creditMemoServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, No:$scope.No, customer: $scope.customer, contractNo: $scope.contractNo};
            var customerPromise = service.listInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
creditMemoApp.controller('creditMemoOrderAddCtrl', ['$scope','$stateParams','$rootScope','creditMemoServices',function($scope,$stateParams,$rootScope,service){

    var ORDER_DATA =  $scope.ORDER_DATA ={};
    ORDER_DATA.rebateitem = $scope.ORDER_DATA.rebateitem = [];

    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.requestor = person.user.name;
    $scope.ORDER_DATA.requestorId = person.user._id;
    $scope.ORDER_DATA.department = person.user.orgname;
    $scope.ORDER_DATA.departmentId = person.user.orgid;
    $scope.userBox = function(){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            // height:400,
            modal: true
        });
        $( "#userBox" ).dialog( "open" );
    }
    $scope.userSelect = function(user, userId, orgName, orgId){
        $scope.ORDER_DATA.requestor = user;
        $scope.ORDER_DATA.requestorId = userId;
        $scope.ORDER_DATA.department = orgName;
        $scope.ORDER_DATA.departmentId = orgId;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.contractBox = function(){
        $( "#contractBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractBox" ).dialog( "open" );
    }
    $scope.selectContr = function(contractno,stomer,stomerid,receipttype,contractmoney,salesorderid,rebatemoney,salesname,salesid,salesorgnanme,salesorgid,salesorgnanme2,salesorgid2){
        var listInside = service.listInside({contractNo:contractno});
        listInside.success(function(data){
            if(data.code == 200){
                if(data.rst.data.items.length != 0){
                    $( "#contractBox" ).dialog("destroy");
                    $(".ui-dialog").remove();

                    $( "#fdHistory" ).dialog({
                        autoOpen: false,
                        width: 450,
                        modal: true,
                        buttons: [
                            {
                                text: "关闭",
                                class: "gray_bg",
                                click: function() {
                                    $( this ).dialog( "destroy" );
                                    $(".ui-dialog").remove();
                                }
                            },
                            {
                                text: "确定",
                                class: "red_bg",
                                click: function() {
                                    var check = service.check({'salesorderid':salesorderid});
                                    check.success(function(data){
                                        if(data.code == 200){
                                            $scope.ORDER_DATA.contractNo = contractno;
                                            $scope.ORDER_DATA.customer = stomer;
                                            $scope.ORDER_DATA.customerId = stomerid;
                                            $scope.ORDER_DATA.tax = receipttype;
                                            $scope.ORDER_DATA.contractMoney = contractmoney;
                                            $scope.ORDER_DATA.contractOrderId = salesorderid;
                                            $scope.ORDER_DATA.rebatemoney = rebatemoney;
                                            $scope.ORDER_DATA.rebateitem = [];
                                            $scope.ORDER_DATA.thisMoney = '';
                                            $scope.ZWHXJE =  data.rst.data.ZWHXJE;
                                            $scope.ORDER_DATA.salesname = salesname;
                                            $scope.ORDER_DATA.salesid = salesid;
                                            $scope.ORDER_DATA.salesorgnanme = salesorgnanme;
                                            $scope.ORDER_DATA.salesorgid = salesorgid;
                                            $scope.ORDER_DATA.salesorgnanme2 = salesorgnanme2;
                                            $scope.ORDER_DATA.salesorgid2 = salesorgid2;
                                            //$( "#contractBox" ).dialog("destroy");
                                            //$(".ui-dialog").remove();
                                        }else {
                                            swal(data.msg, "", "warning");
                                        }
                                    });
                                    $( this ).dialog( "destroy" );
                                    $(".ui-dialog").remove();
                                }
                            }
                        ]
                    });
                    $( "#fdHistory" ).dialog( "open" );
                    $scope.dataList = data.rst.data.items;
                }else{
                    var check = service.check({'salesorderid':salesorderid});
                    check.success(function(data){
                        if(data.code == 200){
                            $scope.ORDER_DATA.contractNo = contractno;
                            $scope.ORDER_DATA.customer = stomer;
                            $scope.ORDER_DATA.customerId = stomerid;
                            $scope.ORDER_DATA.tax = receipttype;
                            $scope.ORDER_DATA.contractMoney = contractmoney;
                            $scope.ORDER_DATA.contractOrderId = salesorderid;
                            $scope.ORDER_DATA.rebatemoney = rebatemoney;
                            $scope.ORDER_DATA.rebateitem = [];
                            $scope.ORDER_DATA.thisMoney = '';
                            $scope.ZWHXJE =  data.rst.data.ZWHXJE;
                            $scope.ORDER_DATA.salesname = salesname;
                            $scope.ORDER_DATA.salesid = salesid;
                            $scope.ORDER_DATA.salesorgnanme = salesorgnanme;
                            $scope.ORDER_DATA.salesorgid = salesorgid;
                            $scope.ORDER_DATA.salesorgnanme2 = salesorgnanme2;
                            $scope.ORDER_DATA.salesorgid2 = salesorgid2;
                            $( "#contractBox" ).dialog("destroy");
                            $(".ui-dialog").remove();
                        }else {
                            swal(data.msg, "", "warning");
                        }
                    });
                }
            }
        });


    }

    $scope.fdBox = function(){//销售返点
        $scope.fdTotal = 0;
        if(!$scope.ORDER_DATA.contractNo){
            swal("请先选择销售合同", "", "warning");
            return false;
        }

        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        var fParam = {'userid': $scope.ORDER_DATA.customerId,'receipttype':$scope.ORDER_DATA.tax,'task':'contract'}//,'money': $scope.ORDER_DATA.contactname
        var listFd = service.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
                if(data.rst.data.items.length<=0){
                    swal('此销售合同中的客户没有返点请修改销售合同', "", "warning");
                    return false;
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.fdCheck = function(index){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());
        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        })
        $scope.fdTotal = Math.round(checkAccount*100)/100;
    }
    $scope.fdListDelet = function(index){
        $scope.ORDER_DATA.rebatemoney = Math.round(($scope.ORDER_DATA.rebatemoney*1 - $scope.fdList[index].amount*1)*100)/100;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
        $scope.fdList.splice(index,1);
    }
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else if(parseFloat($scope.fdTotal) > parseFloat($scope.ZWHXJE)){
            swal("返点金额不可大于合同应收未核销金额"+$scope.ZWHXJE, "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(Number(allCheckCont.toFixed(2))<kyToCount){
                    swal("选中的返点总金额"+Number(allCheckCont.toFixed(2))+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(Number(allCheckCont.toFixed(2))<kyToCount){
                    swal("您输入的返点金额"+Number(kyToCount.toFixed(2))+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder =  Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }


            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();

            $scope.$apply(function () {
                $scope.ORDER_DATA.rebateitem = checkArr;
                $scope.ORDER_DATA.thisMoney = Math.round($scope.fdTotal*100)/100;

            });
        }
    }

    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.rebateitem.length<=0){
            swal("请选择返点", "", "warning");
            return false;
        }
        var param= {};
        param.doc = data;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(statue == "save"){
            var addInside = service.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            }).error(function(error){
                alert(error);
            });
        }else if(statue == 'apply'){
            var addApply = service.addApply(param);
            addApply.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回合同列表",
                        closeOnConfirm: true
                    }, function(){ window.location.href='/index.html#/creditMemoOrder'; });
                }else {
                    swal(data.msg, "", "warning");
                }
            }).error(function(error){
                alert(error);
            });
        }
    }

}]);
creditMemoApp.controller('creditMemoOrderEditCtrl', ['$scope','$filter','$rootScope','$stateParams', 'creditMemoServices',function($scope,$filter, $rootScope, $stateParams, service){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    ORDER_DATA.rebateitem = $scope.ORDER_DATA.rebateitem = [];

    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    var detailView = service.detailView(param);
    detailView.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
        }else{
            swal(data.msg, "", "warning");
        }
    });
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.requestor = person.user.name;
    $scope.ORDER_DATA.requestorId = person.user._id;
    $scope.ORDER_DATA.department = person.user.orgname;
    $scope.ORDER_DATA.departmentId = person.user.orgid;
    $scope.userBox = function(){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            height:400,
            modal: true
        });
        $( "#userBox" ).dialog( "open" );
    }
    $scope.userSelect = function(user, userId, orgName, orgId){
        $scope.ORDER_DATA.requestor = user;
        $scope.ORDER_DATA.requestorId = userId;
        $scope.ORDER_DATA.department = orgName;
        $scope.ORDER_DATA.departmentId = orgId;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.contractBox = function(){
        $( "#contractBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractBox" ).dialog( "open" );
    }
    $scope.selectContr = function(contractno,stomer,stomerid,receipttype,contractmoney,salesorderid,rebatemoney,salesname,salesid,salesorgnanme,salesorgid,salesorgnanme2,salesorgid2){
        var listInside = service.listInside({contractNo:contractno});
        listInside.success(function(data){
            if(data.code == 200){
                if(data.rst.data.items.length != 0){
                    $( "#contractBox" ).dialog("destroy");
                    $(".ui-dialog").remove();

                    $( "#fdHistory" ).dialog({
                        autoOpen: false,
                        width: 450,
                        modal: true,
                        buttons: [
                            {
                                text: "关闭",
                                class: "gray_bg",
                                click: function() {
                                    $( this ).dialog( "destroy" );
                                    $(".ui-dialog").remove();
                                }
                            },
                            {
                                text: "确定",
                                class: "red_bg",
                                click: function() {
                                    var check = service.check({'salesorderid':salesorderid});
                                    check.success(function(data){
                                        if(data.code == 200){
                                            $scope.ORDER_DATA.contractNo = contractno;
                                            $scope.ORDER_DATA.customer = stomer;
                                            $scope.ORDER_DATA.customerId = stomerid;
                                            $scope.ORDER_DATA.tax = receipttype;
                                            $scope.ORDER_DATA.contractMoney = contractmoney;
                                            $scope.ORDER_DATA.contractOrderId = salesorderid;
                                            $scope.ORDER_DATA.rebatemoney = rebatemoney;
                                            $scope.ORDER_DATA.rebateitem = [];
                                            $scope.ORDER_DATA.thisMoney = '';
                                            $scope.ZWHXJE =  data.rst.data.ZWHXJE;
                                            $scope.ORDER_DATA.salesname = salesname;
                                            $scope.ORDER_DATA.salesid = salesid;
                                            $scope.ORDER_DATA.salesorgnanme = salesorgnanme;
                                            $scope.ORDER_DATA.salesorgid = salesorgid;
                                            $scope.ORDER_DATA.salesorgnanme2 = salesorgnanme2;
                                            $scope.ORDER_DATA.salesorgid2 = salesorgid2;
                                            //$( "#contractBox" ).dialog("destroy");
                                            //$(".ui-dialog").remove();
                                        }else {
                                            swal(data.msg, "", "warning");
                                        }
                                    });
                                    $( this ).dialog( "destroy" );
                                    $(".ui-dialog").remove();
                                }
                            }
                        ]
                    });
                    $( "#fdHistory" ).dialog( "open" );
                    $scope.dataList = data.rst.data.items;
                }else{
                    var check = service.check({'salesorderid':salesorderid});
                    check.success(function(data){
                        if(data.code == 200){
                            $scope.ORDER_DATA.contractNo = contractno;
                            $scope.ORDER_DATA.customer = stomer;
                            $scope.ORDER_DATA.customerId = stomerid;
                            $scope.ORDER_DATA.tax = receipttype;
                            $scope.ORDER_DATA.contractMoney = contractmoney;
                            $scope.ORDER_DATA.contractOrderId = salesorderid;
                            $scope.ORDER_DATA.rebatemoney = rebatemoney;
                            $scope.ORDER_DATA.rebateitem = [];
                            $scope.ORDER_DATA.thisMoney = '';
                            $scope.ZWHXJE =  data.rst.data.ZWHXJE;
                            $scope.ORDER_DATA.salesname = salesname;
                            $scope.ORDER_DATA.salesid = salesid;
                            $scope.ORDER_DATA.salesorgnanme = salesorgnanme;
                            $scope.ORDER_DATA.salesorgid = salesorgid;
                            $scope.ORDER_DATA.salesorgnanme2 = salesorgnanme2;
                            $scope.ORDER_DATA.salesorgid2 = salesorgid2;
                            $( "#contractBox" ).dialog("destroy");
                            $(".ui-dialog").remove();
                        }else {
                            swal(data.msg, "", "warning");
                        }
                    });
                }
            }
        });


    }


    $scope.fdBox = function(){//销售返点
        $scope.fdTotal = 0;
        if(!$scope.ORDER_DATA.contractNo){
            swal("请先选择销售合同", "", "warning");
            return false;
        }

        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        var fParam = {'userid': $scope.ORDER_DATA.customerId,'receipttype':$scope.ORDER_DATA.tax,'task':'contract'}//,'money': $scope.ORDER_DATA.contactname
        var listFd = service.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
                if(data.rst.data.items.length<=0){
                    swal('此销售合同中的客户没有返点请修改销售合同', "", "warning");
                    return false;
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.fdCheck = function(index){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());
        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        })
        $scope.fdTotal = Math.round(checkAccount*100)/100;
    }
    $scope.fdListDelet = function(index){
        $scope.ORDER_DATA.rebatemoney = Math.round(($scope.ORDER_DATA.rebatemoney*1 - $scope.fdList[index].amount*1)*100)/100;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
        $scope.fdList.splice(index,1);
    }
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(Number(allCheckCont.toFixed(2))<kyToCount){
                    swal("选中的返点总金额"+Number(allCheckCont.toFixed(2))+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(Number(allCheckCont.toFixed(2))<kyToCount){
                    swal("您输入的返点金额"+Number(kyToCount.toFixed(2))+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder =  Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }


            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();

            $scope.$apply(function () {
                $scope.ORDER_DATA.rebateitem = checkArr;
                $scope.ORDER_DATA.thisMoney = Math.round($scope.fdTotal*100)/100;
            });
        }
    }

    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.rebateitem.length<=0){
            swal("请选择返点", "", "warning");
            return false;
        }
        var param= {};
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.doc = data;

        if(statue == "save"){
            var addInside = service.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var addApply = service.addApply(param);
            addApply.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回合同列表",
                        closeOnConfirm: true
                    }, function(){ window.location.href='/index.html#/creditMemoOrder'; });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }
}]);
creditMemoApp.controller('applyCreditMemoCtrl', ['$scope', '$stateParams','$state', 'creditMemoServices',function($scope, $stateParams, $state,service){
    var ORDER_DATA = {};
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var detailView = service.detailView(param);
    detailView.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.apCot = true;
            $scope.processlog = data.rst.processlog;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            console.log(data.rst.doc.model._id);
            if(data.rst.doc.model._id == undefined || data.rst.doc.model._id == ''){
                $scope.editTem = 'creditMemoOrderEdit';
            }else{
                $scope.editTem = 'creditMemoOrderChange';
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
                $scope.apCot = false;
            }
        }else{
            swal(data.msg, "", "warning");
        }
    });
    var applyObj =  $scope.applyObj ={};
    $scope.applyAgree = function(){
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;

        var applyAgree = service.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回返点冲抵应收待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=返点冲抵应收&&controllercode=DXPZ';
                });
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
        var disagree = service.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回返点冲抵应收待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=返点冲抵应收&&controllercode=DXPZ';
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
        var cancel = service.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回返点冲抵应收待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=返点冲抵应收&&controllercode=DXPZ';
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
        var recall = service.recall(param);
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
creditMemoApp.controller('creditMemoOrderViewCtrl', ['$scope', '$stateParams','$state', 'creditMemoServices',function($scope, $stateParams, $state,service){
    var ORDER_DATA = {};
    var viewCont = service.viewInside({_id:$stateParams.id});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.data;
        }else {
            swal(data.msg, '', "error");
        }
    });
    $scope.mesgChange = function(salesorderid){
        var check = service.check({salesorderid:salesorderid});
        check.success(function(data) {
            if(data.code == 200){
                window.location.href='/index.html#/creditMemoOrderChange?id='+$stateParams.id;
            }else {
                swal(data.msg, '', "error");
            }
        });
    };
	// 审批记录
	var vm = $scope;
	vm.activeTab = 1
	vm.processlog = null
	
	vm.htTab = function (type) {
		// 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
		if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
			var processlog = service.getprocesslog({id: vm.ORDER_DATA.No}); // 直接取值数据中 申请人（proposer）
			processlog.success(function (data) {
				if (data.rst.length != 0) {
					vm.processlog = data.rst;
					vm.activeTab = type;
				} else {
					swal('没有审批信息', '', 'warning');
				}
                vm.activeTab = type;
			});
		} else {
			vm.activeTab = type;
		}
	};
	// 审批记录 END
}]);

creditMemoApp.controller('creditMemoOrderChangeCtrl', ['$scope','$filter','$rootScope','$stateParams', 'creditMemoServices',function($scope,$filter, $rootScope, $stateParams, service){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    ORDER_DATA.rebateitem = $scope.ORDER_DATA.rebateitem = [];
    var Addrebateitem  = $scope.Addrebateitem = [];
    var rebateitem = $scope.rebateitem  = [];
    if($stateParams.id){
        var viewCont = service.viewInside({_id:$stateParams.id});
        viewCont.success(function(data) {
            if(data.code == 200){
                $scope.ORDER_DATA = data.rst.data;
                $scope.rebateitem = data.rst.data.rebateitem;
                /*$scope.ORDER_DATA.No = '';*/
            }else {
                swal(data.msg, '', "error");
            }
        });
    }else {
        var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
        var detailView = service.detailView(param);
        detailView.success(function(data) {
            if(data.code == 200){
                $scope.ORDER_DATA = data.rst.doc.model;
                $scope.rebateitem = data.rst.doc.model.rebateitem;
                $scope.processId = data.rst.processId;
                $scope.nodeId = data.rst.nodeId;
            }else{
                swal(data.msg, "", "warning");
            }
        });
    }

    $scope.fdBox = function(){//销售返点
        $scope.fdTotal = 0;
        if(!$scope.ORDER_DATA.contractNo){
            swal("请先选择销售合同", "", "warning");
            return false;
        }

        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        var fParam = {'userid': $scope.ORDER_DATA.customerId,'receipttype':$scope.ORDER_DATA.tax,'task':'contract'}//,'money': $scope.ORDER_DATA.contactname
        var listFd = service.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
                if(data.rst.data.items.length<=0){
                    swal('此销售合同中的客户没有返点请修改销售合同', "", "warning");
                    return false;
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.fdCheck = function(index){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());
        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        })
        $scope.fdTotal = checkAccount;
    }
    $scope.fdListDelet = function(index,type){
        var amTotal  = 0;
        if(type=='rebate'){
            $scope.rebateitem.splice(index,1);
            $.each($scope.rebateitem,function(key,value){
                amTotal+=parseFloat(value.amount3);
            });
        }else{
            $scope.Addrebateitem.splice(index,1);
            $.each($scope.Addrebateitem,function(key,value){
                amTotal+=parseFloat(value.amount3);
            });
            $.each($scope.rebateitem,function(key,value){
                amTotal+=parseFloat(value.amount3);
            });
        }
        $scope.ORDER_DATA.thisMoney = amTotal;
    }
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(allCheckCont<kyToCount){
                    swal("选中的返点总金额"+allCheckCont+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = par2.find("td:eq(7)").html();
                            checkObj.amount3 = kyToCount;
                            checkObj.amount = kyToCount;
                            checkObj.amount2 = kyToCount;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = par2.find("td:eq(7)").html();
                            checkObj.amount3 = kyCount;
                            checkObj.amount2 = kyCount;
                            checkObj.amount = kyCount;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(allCheckCont<kyToCount){
                    swal("您输入的返点金额"+kyToCount+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = par2.find("td:eq(7)").html();
                            checkObj.amount3 = kyToCount;
                            checkObj.amount2 = kyToCount;
                            checkObj.amount = kyToCount;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = par2.find("td:eq(7)").html();
                            checkObj.amount2 = kyCount;
                            checkObj.amount3 = kyCount;
                            checkObj.amount = kyCount;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }


            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();

            $scope.$apply(function () {
                $scope.Addrebateitem = checkArr;
                $scope.ORDER_DATA.thisMoney = parseFloat($scope.fdTotal)+parseFloat($scope.ORDER_DATA.thisMoney);
            });
        }
    }
    $scope.fdBlur = function(amount,amount3,index){
        if(parseFloat(amount3)>parseFloat(amount)){
            $scope.ORDER_DATA.rebateitem[index].amount3 = amount;
            swal('修改的金额不能大于'+amount, "", "warning");
            return false;
        }
        var amountVal = $("#fdList").find('.amountVal');
        var amTotal = 0;
        $.each(amountVal,function(key,value){
            amTotal+=parseFloat($(this).val());
        })
        $scope.ORDER_DATA.thisMoney = amTotal;
    }
    $scope.addData = function(data,statue){
        var param= {};
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.doc = data;
        param.doc.rebateitem = $scope.rebateitem.concat($scope.Addrebateitem);
        if(statue == "save"){
            var addInside = service.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var addApply = service.addApply(param);
            addApply.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回合同列表",
                        closeOnConfirm: true
                    }, function(){ window.location.href='/index.html#/creditMemoOrder'; });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }
}]);









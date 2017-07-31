var incomeApp = angular.module('incomeApp', ['pageDirectives', 'formDirectives']);
incomeApp.service('incomeServices', function ($http) {
    var service = {
        listReceivable: function (param) {//应收查询接口
            return $http.post('/receivablesplan/selectar', param, {cache: false});
        },
        listDebitbill: function (param) {
            return $http.post('/debitbill/list', param, {cache: false});
        },
        addDebitbill: function (param) {
            return $http.post('/debitbill/save', param, {cache: false});
        },
        createprocessDebitbill: function (param) {
            return $http.post('/debitbill/createprocess', param, {cache: false});
        },
        viewDebitbill: function (param) {
            return $http.post('/debitbill/view', param, {cache: false});
        },
        detailDebitbill: function (param) {
            return $http.post('/debitbill/detail', param, {cache: false});
        },
        listInside: function (param) {
            return $http.post('/receivablesplan/list', param, {cache: false});
        },
        viewInside: function (param) {
            return $http.post('/receivablesplan/view', param, {cache: true});
        },
        addInside: function (param) {
            return $http.post('/receivablesplan/save', param, {cache: false});
        },
        updateInside: function (param) {
            return $http.post('/receivablesplan/update', param, {cache: false});
        },
        deleteInside: function (param) {
            return $http.post('/receivablesplan/delete', param, {cache: false});
        },
        applyAdd: function (param) {
            return $http.post('/receivablesplan/createprocess', param, {cache: false});
        },//审批接口
        applyView: function (param) {
            return $http.post('/receivablesplan/detail', param, {cache: false});
        },
        agree: function (param) {//同意
            return $http.post('/debitbill/agree', param, {cache: false});
        },
        disagree: function (param) {//驳回
            return $http.post('/debitbill/disagree', param, {cache: false});
        },
        cancel: function (param) {//取消
            return $http.post('/debitbill/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/debitbill/recall', param, {cache: false});
        },
        selectYwys: function (param) {//业务应收
            return $http.post('/receivablesplan/selectywys', param, {cache: false});
        },
        selectSo: function (param) {//销售订单
            return $http.post('/receivablesplan/selectso', param, {cache: false});
        },
        selectDebit: function (param) {//销售订单编码
            return $http.post('/debitbill/selectdebit', param, {cache: false});
        },
        selectdebitbycont: function (param) {//销售合同编码
            return $http.post('/debitbill/selectdebitbycont', param, {cache: false});
        },
        listCustomer: function (param) {//客户名称
            return $http.post('/receivablesplan/selectcustom', param, {cache: false});
        },
        selectbyname : function(param){
            return $http.post('/receivablesplan/selectbyname',param,{cache:false});
        },
        getprocesslog: function(param) {
            return $http.post('/debitbill/getprocesslog',param,{cache:false});
        }
    };
    return service;
});
incomeApp.controller('incomeOrderCtrl', ['$scope', '$rootScope','incomeServices', function ($scope,$rootScope ,income) {
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
                ZJHDBHK: $scope.ZJHDBHK,
                BUKRS: $scope.BUKRS,
                NAME1: $scope.NAME1,
                ZBM: $scope.ZBM,
                ZCRNAM: $scope.ZCRNAM,
                ZBSTKD: $scope.ZBSTKD,
                dateStar: $scope.dateStar,
                dateEnd: $scope.dateEnd
            };
            var customerPromise = income.listInside(param);
            $scope.opprev = $rootScope.opprev;
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.incomEdit=function(ZJHDBHK){
        var viewCont = income.viewInside({sapid:ZJHDBHK});
        viewCont.success(function (data) {
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.comeList = data.rst.data.items||[];
            var num=0;
           for(var i=0;i<$scope.comeList.length;i++){
               if($scope.comeList[i].ZHXZT=="4"){
                    num++;
               }
           }
           if(num==($scope.comeList.length+1)){
               swal("该计划单已经全部收款，不可变更", "","warning");
               return false;
           }else{
               window.location.href ="index.html#/incomeEdit?sapid="+ZJHDBHK;
           }
        });
    }
}]);
incomeApp.controller('debitbillListCtrl', ['$scope','$rootScope', 'incomeServices', function ($scope,$rootScope, income) {
    var vm=$scope;
    vm.table = false;
    vm.loadData = true;
    vm.tableApi = null;
    vm.tableOptions = {
        resizable: false,
        selectionRowHeaderWidth: 42,
        // enableVerticalScrollbar: 0,
        enableHorizontalScrollbar: 0,
        onRegisterApi: function (api) {
            vm.tableApi = api;
        }
    }
    vm.tableHeader = [
        {name: 'ZPJDH', displayName: "票据单号", cellTooltip: true, sort: {direction: 'desc'}, cellTemplate: '<div class="ui-grid-cell-contents link"><a target="_blank" href="index.html#/debitbillView/{{row.entity.ZPJDH}}">{{row.entity.ZPJDH}}</a></div>',enableSorting: true},
        {name: 'ZPTYPE', displayName: "票据种类", cellTooltip: true},
        {name: 'NAME1', displayName: "客户名称", cellTooltip: true},
        {name: 'ZAMOUNT', displayName: "票据金额",  cellTooltip: true, cellFilter: 'currency: \'￥\'' },
        {name: 'ZDQDAT', displayName: "到期日期",  cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'ZSPDAT', displayName: "收票日期", cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'ZBZ', displayName: "备注",  cellTooltip: true},
        {name: 'ZSPSW', displayName: "收票商务",  cellTooltip: true},
        {name: 'ZPJZT', displayName: "票据状态",  cellTooltip: true},
        {
            name: 'actions',
            displayName: "操作",
            enableSorting: false,
            pinnedRight: true,
            width: 100,
            cellTemplate: 'debitbillAction.html'
        }
    ];
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
                ZPTYPE: $scope.ZPTYPE,
                NAME1: $scope.NAME1,
                ZPJZT: $scope.ZPJZT,
                ZSPSW: $scope.ZSPSW,
                ZPJDH: $scope.ZPJDH,
                dateStar : $scope.dateStar,
                dateEnd : $scope.dateEnd
            };
            var customerPromise = income.listDebitbill(param);
            customerPromise.success(function (data) {
                if (data.code = 200) {
                    $scope.dataList = data.rst.data.items;
                    genTable(vm.tableOptions, vm.tableHeader, $scope.dataList, function (data) {
                        var dataLen = data.data.length;
                        if(dataLen) {
                            vm.loadData = true;
                            if(dataLen < 10) {
                                angular.element('.grid').height(
                                    data.data.length * 42 + 42 + 2
                                );
                            } else {
                                angular.element('.grid').height(
                                    10 * data.rowHeight + data.headerRowHeight + 2
                                );
                            }
                            vm.table = data;
                        } else {
                            vm.loadData = false;
                            vm.tableApi = null;
                            vm.table = false;
                        }
                    });
                    $scope.opprev = $rootScope.opprev;
                }
            })
            $scope.opprev = $rootScope.opprev;
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.comeDel=function(index){
        if ($scope.dataList.length < 1) {
            swal("不能再删了", "","warning");

            return false;
        }
        $scope.dataList.splice(index, 1);
    }
}]);
incomeApp.controller('receivableListCtrl', ['$rootScope','$scope', '$state','$stateParams', 'incomeServices', function ($rootScope,$scope,$state,$stateParams,income) {
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
                NAME1: $scope.NAME1,
                VBELN: $scope.VBELN,
                ZDQR_START:$scope.ZDQR_START,
                ZDQR_END:$scope.ZDQR_END,
                ZCQBS: $scope.ZCQBS,
                ZCQTS: $scope.ZCQTS,
                ZBSTKD: $scope.ZBSTKD,
                ZPERNR: $scope.ZPERNR,
                ZHXSTA: $scope.ZHXSTA,
            };
            var listReceivable = income.listReceivable(param);
            $scope.paginationConf.pagePromise = listReceivable;
        }
    };

    $scope.receivableSelect = function (idx) {
        var parent = $("#ccTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
        } else {
            check.removeAttr("checked");
        }
    }
    //查看收款计划详情
    $scope.incomeView = function(){
        var ckbox = $("#ccTable").find("[checked='checked']");
        var xzList = [];
        $(ckbox).each(function (key, value) {
            var par = $(this).parent().parent();
            var arr = {};
            arr.NAME1 = par.find("td:eq(1)").html();
            arr.ZBSTKD = par.find("td:eq(2)").html();

            xzList.push(arr);
        });
        if(xzList.length==0){
            swal("请勾选数据", "","warning");
            return false;
        }
        if(xzList.length > 1){
            swal('只能选择一条应收查询信息','','warning');
            return false;
        }else{
            xzList.forEach(function(item){
                return $state.go('receivableIncomeView',{code:item.ZBSTKD,name:item.NAME1});
            });
        }
    }
    $scope.receivableBill=function(){
        var ckbox = $("#ccTable").find("[checked='checked']");
        var ccList = [];
        $(ckbox).each(function (key, value) {
            var par = $(this).parent().parent();
            var arr = {};
            arr.NAME1 = par.find("td:eq(1)").html();
            arr.KUNNR = par.find("td:eq(17)").html();
           /* arr.KUNNR = par.find("td:eq(1)").html();*/
            arr.ZBSTKD = par.find("td:eq(2)").html();
            arr.VBELN = par.find("td:eq(3)").html();
            arr.ZCREATE_ORG = par.find("td:eq(4)").html();
            arr.ZPERNR_NAME = par.find("td:eq(5)").html();
            arr.ZPRJ_NAME = par.find("td:eq(15)").html();
            arr.ZJHJE = par.find("td:eq(12)").html();
            arr.ZYWYSBH = par.find("td:eq(16)").html();
            arr.ZYSWS = par.find("td:eq(8)").html();
            arr.ZSKZL = '货款';
            ccList.push(arr);
        });
        if(ccList.length==0){
            swal("请勾选数据", "","warning");
            return false;
        }
        for(var i=0;i<ccList.length;i++){
            if(ccList[i].BUKRS!==ccList[0].BUKRS){
                swal("勾选的收款计划单的公司代码不一致", "","warning");
                return false;
            }
            if(ccList[i].NAME1!==ccList[0].NAME1){
                swal("勾选的收款计划单的客户名称不一致", "","warning");
                return false;
            }
        }
        $rootScope.rootData=ccList;
        window.location.href='index.html#/incomeOrderAdd?receivable=1';
    }
}]);
incomeApp.controller('cusCtrl', ['$scope', 'incomeServices', function ($scope, income) {
    /*$scope.paginationConf = {
     currentPage: 1,
     itemsPerPage: 5,
     numberOfPage: 0,
     pagesLength: 10,
     perPageOptions: [5,10, 20, 30, 40, 50],
     pagePromise: {},
     onChange: function () {
     var param = {
     page: $scope.paginationConf.currentPage,
     limit: $scope.paginationConf.itemsPerPage,
     NAME1: $scope.NAME1,
     };
     console.log(param)
     var customerPromise = income.listCustomer(param);
     $scope.paginationConf.pagePromise = customerPromise;
     }
     };*/
    $scope.cusSearch = function(){
        if(!$scope.NAME1){
            swal("请输入客户名称！", "","warning");
            return false;
        }
        var param = {
            page: 1,
            limit: 100,
            NAME1: $scope.NAME1,
        };
        var customerPromise = income.listCustomer(param);
        customerPromise.success(function (data) {
            if (data.code == 200) {
                $scope.dataList = data.rst.data.items;
            } else {
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        })
    }

}]);
incomeApp.controller('xshthBoxCtrl', ['$scope', 'incomeServices', function ($scope, income) {
    $scope.xsSearch=function(){
        var param = {
            KUNNR: $scope.ORDER_DATA.KUNNR,
            BUKRS:$scope.ORDER_DATA.BUKRS,
            ZBSTKD:$scope.ZBSTKD,
            ZPERNR_NAME:$scope.ZPERNR_NAME,
        };
        var customerPromise = income.selectSo(param);
        customerPromise.success(function (data) {
            if (data.code == 200) {
                $scope.xshthList = data.rst.data.items;
                if (data.rst.data.items.length <= 0) {
                    $scope.xsShow = true;
                } else {
                    $scope.xsShow = false;
                }
            }else{
                swal(
                    {
                        title: "",
                        text: data.msg,
                        type: "warning",
                    })
            }
        })
    }

    $scope.ccSelect = function (VBELN, ZBSTKD,ZCREATE_ORG,ZPERNR_NAME,ZPRJ_NAME,KZWI1,ZJHJE) {
        $scope.comeList[$scope.comeList.length-1].VBELN = VBELN;
        $scope.comeList[$scope.comeList.length-1].ZBSTKD = ZBSTKD;
        $scope.comeList[$scope.comeList.length-1].ZCREATE_ORG = ZCREATE_ORG;
        $scope.comeList[$scope.comeList.length-1].ZPERNR_NAME = ZPERNR_NAME;
        $scope.comeList[$scope.comeList.length-1].ZPRJ_NAME = ZPRJ_NAME;
        $scope.comeList[$scope.comeList.length-1].KZWI1 = KZWI1;
        $scope.comeList[$scope.comeList.length-1].ZJHJE = ZJHJE;
        $scope.ZBSTKD="";
        $scope.ZPERNR_NAME="";
        $scope.xshthList=[];
        /* $scope.comeList[index].ZYSWS = KZWI1;*/
        $("#xshthBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
}]);

incomeApp.controller('incomeOrderAddCtrl', ['$rootScope','$scope','$filter','$stateParams', 'incomeServices', function ($rootScope,$scope,$filter ,$stateParams,income) {
    var ORDER_DATA = $scope.ORDER_DATA = {};
    $scope.ORDER_DATA.BUKRS = "1000";
    $scope.ORDER_DATA.WAERS = "CNY";
    var comeList = $scope.comeList = [{
        ZHXM: '',
        ZSKZL: '',
        ZBSTKD: '',
        VBELN: '',
        ZCREATE_ORG: '',
        ZPERNR_NAME: '',
        ZPRJ_NAME: '',
        KZWI1: '',
        ZJHJE: '',
        ZYWYSBH: '',
        ZYSWS: '',
        ZJE: '',
        ZJHRQ: '',
        ZXSBZ: '',
    }];
    var today = new Date();
    $scope.ORDER_DATA.ZCRDAT= $filter('date')(today,'yyyy-MM-dd');
    if($stateParams.receivable){
        if($rootScope.rootData){
            $scope.comeList= $rootScope.rootData;
            $scope.ORDER_DATA.NAME1=$rootScope.rootData[0].NAME1;
            $scope.ORDER_DATA.KUNNR=$rootScope.rootData[0].KUNNR;
            $scope.billShow=true;
            console.log($scope.comeList);
            for(var i=0;i<$scope.comeList.length;i++){
              if($scope.comeList[i].VBELN){
                var param = {
                  KUNNR: $scope.ORDER_DATA.KUNNR,
                  BUKRS:$scope.ORDER_DATA.BUKRS,
                  ZBSTKD:$scope.comeList[i].ZBSTKD,
                  ZPERNR_NAME:$scope.comeList[i].ZPERNR_NAME,
                  VBELN:$scope.comeList[i].VBELN
                };
                (function(i){
                  var customerPromise = income.selectSo(param);
                  customerPromise.success(function (data) {
                    if (data.code == 200) {
                      if(data.rst.data.items.length == 0){

                      }else{
                        $scope.comeList[i].KZWI1=data.rst.data.items[0].KZWI1;
                      }

                    }else{
                      swal(
                        {
                          title: "",
                          text: data.msg,
                          type: "warning",
                        })
                    }
                  })
                })(i)
              }


            }
        }
    }else{
        $scope.billShow=false;
    }
    $scope.customerBox = function () {
        $("#cusBox").dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true
        });
        $("#cusBox").dialog("open");
    }

    $scope.cusSelect = function (id, name) {
        $scope.ORDER_DATA.NAME1 = name;
        $scope.ORDER_DATA.KUNNR = id;
        $("#cusBox").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.billChange = function (ZSKZL,index) {
        $scope.comeList[index].ZBSTKD='';
        $scope.comeList[index].VBELN='';
        $scope.comeList[index].ZCREATE_ORG='';
        $scope.comeList[index].ZPERNR_NAME='';
        $scope.comeList[index].ZPRJ_NAME='';
        $scope.comeList[index].KZWI1='';
        $scope.comeList[index].ZJHJE='';
        $scope.comeList[index].ZYWYSBH='';
        $scope.comeList[index].ZYSWS='';
        $scope.comeList[index].ZJE='';
        $scope.comeList[index].ZJHRQ='';
        $scope.comeList[index].ZXSBZ='';
    }
    $scope.xshthBox = function (index) {
       /* $scope.comeList[index].VBELN = '';
        $scope.comeList[index].ZYWYSBH = '';
        $scope.comeList[index].ZYSWS = '';
        $scope.comeList[index].ZJHJE = '';
        $scope.comeList[index].ZJE = '';
        $scope.comeList[index].ZJHRQ = '';*/
        if(!$scope.ORDER_DATA.NAME1){

            swal("请先选择客户名称！", "","warning");
            return false;
        }

        $("#xshthBox").dialog({
            autoOpen: false,
            width: 1000,
            modal: true
        });
        $("#xshthBox").dialog("open");

    }
    $scope.ywbmBox = function (index) {
        $("#ywbmBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#ywbmBox").dialog("open");
        var ywbm = income.selectYwys({VBELN: $scope.comeList[index].VBELN});
        ywbm.success(function (data) {
            if (data.code == 200) {
                    $scope.xshthList = data.rst.data.items;
            }
        })
        $scope.ywSelect = function (ZYWYS, WHXJE) {
            $scope.comeList[index].ZYWYSBH = ZYWYS;
            $scope.comeList[index].ZYSWS = WHXJE;
            $("#ywbmBox").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };

    $scope.comeAdd = function () {
        var obj = {
            ZHXM: '',
            ZSKZL: '',
            ZBSTKD: '',
            VBELN: '',
            ZCREATE_ORG: '',
            ZPERNR_NAME: '',
            ZPRJ_NAME: '',
            KZWI1: '',
            ZJHJE: '',
            ZYWYSBH: '',
            ZYSWS: '',
            ZJE: '',
            ZJHRQ: '',
            ZXSBZ: '',
        };
        $scope.comeList.push(obj);
    }

   /* $scope.comeDel = function (idx, type) {
        if ($scope.comeList.length <= 1) {
            swal("不能再删了！", "","warning");

            return false;
        }
        $scope.comeList.splice(idx, 1);
    }*/
    $scope.checkDel = function(idx){
        var parent = $("#itemTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.comeList){
                $scope.comeList[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.comeList){
                delete  $scope.comeList[idx].rightAdd;
            }

        }
    }
    $scope.comeDel = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.comeList.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.comeList = rightArr;
    }
    $scope.addNumber=function(all){
        if(all==true){
            for(var x in $scope.comeList){
                $scope.comeList[x].rightAdd = true;
            }
        }else{
            for(var x in $scope.comeList){
                delete  $scope.comeList[x].rightAdd;
            }
        }
    };
    $scope.countRange=function(ZBSTKD,KZWI1,ZJHJE,ZJE,index){
        if(ZJE<=0){
            swal("本次计划金额必须大于0！", "","warning");
            $scope.comeList[index].ZJE="";
            return false;
        }
     if(ZBSTKD){
         if(ZJE>KZWI1-ZJHJE){
             swal("本次计划金额必须小于销售订单金额-订单已计划金额！", "","warning");
             $scope.comeList[index].ZJE="";
             return false;
         }
     }
    }
    $scope.addData = function (data, statue) {
        if($scope.comeList.length==0){
            swal("收款计划明细必填", "", "warning");
            return false;
        }
        var requiredObj2 = $scope.incomeForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.incomeForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var date;
        for(var x in $scope.comeList){
            date = $filter('date')($scope.comeList[x].ZJHRQ,'yyyy-MM-dd');
        }
        var d = new Date();
        var str = $filter('date')(d,'yyyy-MM-dd');
        if(Date.parse(date) < Date.parse(str)){
            swal("计划收款日期不能填写当日之前的日期", "","warning");
            return false;
        }

        var param = {};
        var addParam = {};
        addParam.doc = data;
        param.doc = data;
        param.items = $scope.comeList;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {
            var addInside = income.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/incomeOrder';
                    });
                } else {
                    swal(
                        {
                            title: "",
                            text: data.msg,
                            type: "warning",
                        })
                }
            });
        }
    }

}]);

incomeApp.controller('debitbillAddCtrl', ['$scope','$rootScope','$filter', 'incomeServices', function ($scope,$rootScope, $filter,income) {
    var dqDate = new Date();
    var newDate = $filter('date')(dqDate,'yyyy-MM-dd');    //6695bug
    $scope.debitList=[{
        ZPTYPE: '',
        ZPJDH: '',
        NAME1: '',
        KUNNR: '',
        ZAMOUNT: '',
        ZCPDAT: '',
        ZDQDAT: '',
        ZSPDAT: newDate,
        ZBZ:''
    }];
    $scope.detAdd = function () {
        var obj = {
            ZPTYPE: '',
            ZPJDH: '',
            NAME1: '',
            KUNNR: '',
            ZCPR: '',
            ZFKYH: '',
            ZAMOUNT: '',
            ZCPDAT: '',
            ZDQDAT: '',
            ZSPDAT: newDate,
            ZBZ:''
        };
        $scope.debitList.push(obj);
    }

    $scope.detDel = function (idx) {
        if ($scope.debitList.length <=1) {
            swal("不能再删了！", "","warning");

            return false;
        }
        $scope.debitList.splice(idx, 1);
    }

    $scope.cusShow = function (index) {
        $("#cusBox1").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#cusBox1").dialog("open");
        $scope.cusSelect = function (id, name) {
            $scope.debitList[index].NAME1 = name;
            $scope.debitList[index].KUNNR = id;
            $("#cusBox1").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }
    $scope.addData = function (statue) {
        var requiredObj2 = $scope.deForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.deForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        for(var i=0;i<$scope.debitList.length;i++){
            if($scope.debitList[i].ZCPDAT&&$scope.debitList[i].ZDQDAT){
                if(Date.parse($scope.debitList[i].ZCPDAT)>Date.parse($scope.debitList[i].ZDQDAT)){
                    swal("出票日期不能大于到期日期！", "","warning");
                    return false;
                }
                if(Date.parse($scope.debitList[i].ZCPDAT)>Date.parse($scope.debitList[i].ZSPDAT)){
                    swal("出票日期不能大于收据日期！", "","warning");
                    return false;
                }
            }
        }
        param.items= $scope.debitList;
        param.doc= {};
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {
            var addInside = income.addDebitbill(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");

                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            //判断申请人是否为运营管理部人
            var person = $rootScope.loginPerson;
            if(person.user.orgname=='运营管理部'){
                for(var j=0;j<$scope.debitList.length;j++){
                    $scope.debitList[j].ZSPSW=person.user.name;
                }
            }

            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                    if(person.user.orgname!='运营管理部'){
                        if(param.candidates[0].type=="business"||param.candidates[0].type=="business_inter"){
                            for(var m=0;m<$scope.debitList.length;m++){
                                $scope.debitList[m].ZSPSW=selObj.name;
                            }
                        }else{
                            for(var n=0;n<$scope.debitList.length;n++){
                                $scope.debitList[n].ZSPSW="";
                            }
                        }
                    }

                }
                var applyAdd = income.createprocessDebitbill(param);
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
                            window.location.href = '/index.html#/debitbillList';
                        });
                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            };
            var addInside = income.addDebitbill(param);
            addInside.success(function (data) {
                if (data.code == 200) {
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
                        if(person.user.orgname!='运营管理部'){
                            for(var p=0;p<$scope.debitList.length;p++){
                                $scope.debitList[p].ZSPSW="";
                            }
                        }
                        $scope.applyFn(-1);
                    }
                } else {
                    swal(data.msg, "", "warning");
                }
            });

        }
    }

}]);

incomeApp.controller('incomeOrderViewCtrl', ['$scope', '$stateParams', 'incomeServices', function ($scope, $stateParams, income) {
    var ORDER_DATA = {};
    $scope.comeList=[];
    var viewCont = income.viewInside({sapid: $stateParams.id});
    viewCont.success(function (data) {
        if(data.code==200){
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.comeList = data.rst.data.items||[];
            var num=0;
            for(var i=0;i<$scope.comeList.length;i++){
                if($scope.comeList[i].ZHXZT=="4"){
                    num++;
                }
            }
            if(num==($scope.comeList.length+1)){
                $scope.incomeEdit=false;
            }else{
                $scope.incomeEdit=true;
            }


            for(var i=0;i<$scope.comeList.length;i++){
                if($scope.comeList[i].ZSKZL=="货款"){
                  if($scope.comeList[i].VBELN){
                    var param = {
                      KUNNR: $scope.ORDER_DATA.KUNNR,
                      BUKRS:$scope.ORDER_DATA.BUKRS,
                      ZBSTKD:$scope.comeList[i].ZBSTKD,
                      ZPERNR_NAME:$scope.comeList[i].ZPERNR_NAME,
                      VBELN:$scope.comeList[i].VBELN
                    };
                    (function(i){
                      var customerPromise = income.selectSo(param);
                      customerPromise.success(function (data) {
                        if (data.code == 200) {
                          $scope.comeList[i].KZWI1=data.rst.data.items[0].KZWI1;
                          $scope.comeList[i].ZJHJE=data.rst.data.items[0].ZJHJE;
                        }else{
                          swal(
                            {
                              title: "",
                              text: data.msg,
                              type: "warning",
                            })
                        }
                      })
                    })(i)
                  }

                }


            }
            switch (data.rst.data.model.WAERS){
                case "CNY":
                    $scope.ORDER_DATA.WAERS="人民币";
                    break;
                case "EUR":
                    $scope.ORDER_DATA.WAERS="欧元";
                    break;
                case "USD":
                    $scope.ORDER_DATA.WAERS="美元";
                    break;
                case "CHF":
                    $scope.ORDER_DATA.WAERS="瑞士法郎";
                    break;
                case "HKD":
                    $scope.ORDER_DATA.WAERS="港币";
                    break;
                default :
                    $scope.ORDER_DATA.WAERS="日元";
            }
        }else{
            swal(
                {
                    title: "",
                    text: data.msg,
                    type: "warning",
                })
        }

    });
}]);
incomeApp.controller('incomeEditCtrl', ['$scope','$filter', '$stateParams', 'incomeServices', function ($scope,$filter, $stateParams, income) {
    var ORDER_DATA = $scope.ORDER_DATA = {};
    $scope.box = [];
    $scope.xshthBox = function (index) {
        if(!$scope.ORDER_DATA.NAME1){

            swal("请先选择客户名称！", "","warning");
            return false;
        }

        $("#xshthBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#xshthBox").dialog("open");
    }
    $scope.ywbmBox = function (index) {
        $("#ywbmBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#ywbmBox").dialog("open");
        var ywbm = income.selectYwys({VBELN: $scope.comeList[index].VBELN});
        ywbm.success(function (data) {
            if (data.code == 200) {
                $scope.xshthList = data.rst.data.items;
            }
        })
        $scope.ywSelect = function (ZYWYS, WHXJE) {
            $scope.comeList[index].ZYWYSBH = ZYWYS;
            $scope.comeList[index].ZYSWS = WHXJE;
            $("#ywbmBox").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.countRange=function(ZBSTKD,KZWI1,ZJHJE,ZJE,index){
        if(ZJE<=0){
            swal("本次计划金额必须大于0！", "","warning");
            $scope.comeList[index].ZJE="";
            return false;
        }
        if(ZBSTKD){
            if(ZJE>KZWI1-ZJHJE){
                swal("本次计划金额必须小于销售订单金额-订单已计划金额！", "","warning");
                $scope.comeList[index].ZJE="";
                return false;
            }
        }
    }
    $scope.dateLime=function(oldData,index){
        if(oldData==$scope.ary1[index]){
            return false;
        }
        var d = new Date();
        var str = $filter('date')(d,'yyyy-MM-dd');
        if(Date.parse(oldData) < Date.parse(str)){
            swal("计划收款日期必须大于系统当前日期", "","warning");
            $scope.comeList[index].ZJHRQ='';
            return false;
    }
    }
    var viewCont = income.viewInside({sapid: $stateParams.sapid, processId: $stateParams.processId});
    viewCont.success(function (data) {
        if(data.code==200){
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.comeList = data.rst.data.items;
            $scope.ary=[],$scope.ary1=[];
            for(var i=0;i<$scope.comeList.length;i++){
                $scope.ary.push($scope.comeList[i].ZJE);
                $scope.ary1.push($scope.comeList[i].ZJHRQ);
                if($scope.comeList[i].ZSKZL=="货款"){
                  if($scope.comeList[i].VBELN){
                    var param = {
                      KUNNR: $scope.ORDER_DATA.KUNNR,
                      BUKRS:$scope.ORDER_DATA.BUKRS,
                      ZBSTKD:$scope.comeList[i].ZBSTKD,
                      ZPERNR_NAME:$scope.comeList[i].ZPERNR_NAME,
                      VBELN:$scope.comeList[i].VBELN
                    };
                    (function(i){
                      var customerPromise = income.selectSo(param);
                      customerPromise.success(function (data) {
                        if (data.code == 200) {
                          $scope.comeList[i].KZWI1=data.rst.data.items[0].KZWI1;
                          $scope.comeList[i].ZJHJE=data.rst.data.items[0].ZJHJE;
                        }else{
                          swal(
                            {
                              title: "",
                              text: data.msg,
                              type: "warning",
                            })
                        }
                      })
                    })(i)
                  }

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


    });

    $scope.addData = function (data, statue) {
        var requiredObj2 = $scope.incomeForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.incomeForm.$valid){
            return false;
        }
        var param = {};
        var addParam = {};
        addParam.doc = data;
        param.doc = data;
        param.doc.TASK="U";
        param.items = $scope.comeList;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {
            var addInside = income.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");
                    /*swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/incomeOrder';
                    });*/
                } else {
                    swal(
                        {
                            title: "",
                            text: data.msg,
                            type: "warning",
                        })
                }
            });
        }
    }
}]);
incomeApp.controller('debitbillViewCtrl', ['$scope', '$stateParams', 'incomeServices', function ($scope, $stateParams, income) {
    var vm=$scope;
    vm.table = false;
    vm.loadData = false;
    vm.tableApi = null;
    vm.tableOptions = {
        resizable: false,
      /*  multiSelect: true,
        enableRowSelection: true,
        enableSelectAll: true,*/
        selectionRowHeaderWidth: 42,
         enableVerticalScrollbar: 0,
        enableHorizontalScrollbar: 0,
        onRegisterApi: function (api) {
            vm.tableApi = api;
        }
    }
    vm.tableHeader = [
        {name: 'ZPTYPE', displayName: "票据种类", cellTooltip: true,},
        {name: 'ZPJDH', displayName: "票据单号", cellTooltip: true},
        {name: 'NAME1', displayName: "客户名称", cellTooltip: true},
        {name: 'KUNNR', displayName: "客户编码", cellTooltip: true},
        {name: 'ZAMOUNT', displayName: "票据金额", cellTooltip: true, cellFilter: 'currency: \'￥\'' },
        {name: 'ZTXJE', displayName: "贴息金额", cellTooltip: true, cellFilter: 'currency: \'￥\'' },
        {name: 'ZBSCS', displayName: "背书次数", cellTooltip: true},
        {name: 'ZCPDAT', displayName: "出票日期", cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'ZDQDAT', displayName: "到期日期",  cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'ZSPDAT', displayName: "收票日期",  cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'ZBZ', displayName: "备注",  cellTooltip: true},
        {name: 'ZSPSW', displayName: "收票商务",  cellTooltip: true},
        {name: 'ZTSDAT', displayName: "预计托收日期",  cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'ZPJZT', displayName: "票据状态",  cellTooltip: true},
    ];


    var viewCont = income.viewDebitbill({sapid: $stateParams.id});
    viewCont.success(function (data) {
        if(data.code==200){
            $scope.dataList= [data.rst.data.model];
            genTable(vm.tableOptions, vm.tableHeader, $scope.dataList, function (data) {
                vm.loadData = true;
                vm.table = data;
            });
        }else {
            swal(
                {
                    title: "",
                    text: data.msg,
                    type: "warning",
                })
        }
    });
    // 审批记录
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = income.getprocesslog({type: 'PJTZ', id: vm.dataList.ZPJDH,gettype:'group'}); // 直接取值数据中 申请人（proposer）
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

incomeApp.controller('debitbillEditCtrl', ['$scope','$rootScope', '$stateParams','$filter', 'incomeServices', function ($scope,$rootScope, $stateParams,$filter, income) {
    $scope.debitList=[];
    var viewCont = income.viewDebitbill({sapid: $stateParams.id});
    viewCont.success(function (data) {
        if(data.code==200){
            $scope.debitList = [data.rst.data.model];
            for(var i=0;i<$scope.debitList.length;i++){
                if($scope.debitList[i].ZPJZT=="商务已收票"){
                    $scope.debitList[i].billInfor=false;
                }else{
                    $scope.debitList[i].billInfor=true;
                }
            }
        }else {
            swal(
                {
                    title: "",
                    text: data.msg,
                    type: "warning",
                })
        }
    });
    $scope.cusShow = function (index) {
        $("#cusBox1").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#cusBox1").dialog("open");
        $scope.cusSelect = function (id, name) {
            $scope.debitList[index].NAME1 = name;
            $scope.debitList[index].KUNNR = id;
            $("#cusBox1").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }
    $scope.dataChange=function(ZDQDAT,index){
    var str = $filter('date')(ZDQDAT,'yyyy-MM-dd');
    var str1=Date.parse(str)-432000000;
    $scope.debitList[index].ZTSDAT=$filter('date')(str1,'yyyy-MM-dd');
}
    $scope.detAdd = function () {
        var obj = {
            ZPTYPE: '',
            ZPJDH: '',
            NAME1: '',
            ZAMOUNT: '',
            ZTXJE: '',
            ZBSCS: '',
            ZCPDAT: '',
            ZDQDAT: '',
            ZSPDAT: '',
            ZSPSW: '',
            ZTSDAT: '',
            ZPJZT: '',
            ZBZ:''
        };
        $scope.debitList.push(obj);
    }

    $scope.detDel = function (idx) {
        if ($scope.debitList.length <= 1) {
            swal("不能再删了！", "","warning");

            return false;
        }
        $scope.debitList.splice(idx, 1);
    }


    $scope.addData = function (statue) {
        var requiredObj2 = $scope.debitbillForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.debitbillForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        for(var i=0;i<$scope.debitList.length;i++){
            if($scope.debitList[i].ZCPDAT&&$scope.debitList[i].ZDQDAT){
                if(Date.parse($scope.debitList[i].ZCPDAT)>Date.parse($scope.debitList[i].ZDQDAT)){
                    swal("出票日期不能大于到期日期！", "","warning");
                    return false;
                }
                if(Date.parse($scope.debitList[i].ZCPDAT)>Date.parse($scope.debitList[i].ZSPDAT)){
                    swal("出票日期不能大于收据日期！", "","warning");
                    return false;
                }
            }
        }
        param.items= $scope.debitList;
        param.doc= {};
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {
            var addInside = income.addDebitbill(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");

                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            //判断申请人是否为运营管理部人
            var person = $rootScope.loginPerson;
            if(person.user.orgname=='运营管理部'){
                for(var j=0;j<$scope.debitList.length;j++){
                    $scope.debitList[j].ZSPSW=person.user.name;
                }
            }

            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                    if(person.user.orgname!='运营管理部'){
                        if(param.candidates[0].type=="business"||param.candidates[0].type=="business_inter"){
                            for(var m=0;m<$scope.debitList.length;m++){
                                $scope.debitList[m].ZSPSW=selObj.name;
                            }
                        }else{
                            for(var n=0;n<$scope.debitList.length;n++){
                                $scope.debitList[n].ZSPSW="";
                            }
                        }
                    }

                }
                var applyAdd = income.createprocessDebitbill(param);
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
                            window.location.href = '/index.html#/debitbillList';
                        });
                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            };
            var addInside = income.addDebitbill(param);
            addInside.success(function (data) {
                if (data.code == 200) {
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
                        if(person.user.orgname!='运营管理部'){
                            for(var p=0;p<$scope.debitList.length;p++){
                                $scope.debitList[p].ZSPSW="";
                            }
                        }
                        $scope.applyFn(-1);
                    }
                } else {
                    swal(data.msg, "", "warning");
                }
            });

        }
    }
}]);
incomeApp.controller('debitbillCtrl', ['$scope', '$stateParams', 'incomeServices', function ($scope, $stateParams, apply) {
    $scope.debitList=[];
    var detailpParam = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(detailpParam, {myflag: "mysubscriber" })
    }
    var viewPur = apply.detailDebitbill(detailpParam);

    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.debitList = data.rst.doc.items;

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
        }
    }).error(function (error) {
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    var applyObj = $scope.applyObj = {};
    $scope.applySave = function(){
        var param = {};
        param.items= $scope.debitList;
        param.doc= {};
        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = apply.addDebitbill(param);
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
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
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
                    confirmButtonText: "返回票据台账待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=票据台账&&controllercode=PJTZ';
                });
            } else {
                swal("审批失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
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
                    confirmButtonText: "返回票据台账待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=票据台账&&controllercode=PJTZ';
                });
            } else {
                swal("驳回失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
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
                    confirmButtonText: "返回票据台账待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=票据台账&&controllercode=PJTZ'; });
            } else {
                swal("取消失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
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
                swal("召回失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    }
}]);
incomeApp.controller('debitbillOrderEditCtrl', ['$scope','$rootScope', '$stateParams','$filter', 'incomeServices', function ($scope,$rootScope, $stateParams, $filter,income) {
    $scope.debitList=[];
    var detailpParam = {sapid: $stateParams.sapid, processId: $stateParams.processId,nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(detailpParam, {myflag: "mysubscriber" })
    }

    var viewCont = income.detailDebitbill(detailpParam);
    viewCont.success(function (data) {
        if(data.code==200){
            $scope.debitList = data.rst.doc.items;
        }else {
            swal(
                {
                    title: "",
                    text: data.msg,
                    type: "warning",
                })
        }
    });
    $scope.cusShow = function (index) {
        $("#cusBox1").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#cusBox1").dialog("open");
        $scope.cusSelect = function (id, name) {
            $scope.debitList[index].NAME1 = name;
            $scope.debitList[index].KUNNR = id;
            $("#cusBox1").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }

    $scope.detAdd = function () {
        var dqDate = new Date();
        var newDate = $filter('date')(dqDate,'yyyy-MM-dd');
        var obj = {
            ZPTYPE: '',
            ZPJDH: '',
            NAME1: '',
            ZAMOUNT: '',
            ZCPDAT: '',
            ZDQDAT: '',
            ZSPDAT:newDate,
            ZBZ: '',
        };
        $scope.debitList.push(obj);
    }

    $scope.detDel = function (idx) {
        if ($scope.debitList.length <=1) {
            swal("不能再删了！", "","warning");

            return false;
        }
        $scope.debitList.splice(idx, 1);
    }


    $scope.addData = function (statue) {
        var requiredObj2 = $scope.debitbillForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.debitbillForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }

        var param = {};
        for(var i=0;i<$scope.debitList.length;i++){
            if($scope.debitList[i].ZCPDAT&&$scope.debitList[i].ZDQDAT){
                if(Date.parse($scope.debitList[i].ZCPDAT)>Date.parse($scope.debitList[i].ZDQDAT)){
                    swal("出票日期不能大于到期日期！", "","warning");
                    return false;
                }
                if(Date.parse($scope.debitList[i].ZCPDAT)>Date.parse($scope.debitList[i].ZSPDAT)){
                    swal("出票日期不能大于收据日期！", "","warning");
                    return false;
                }
            }
        }
        param.items= $scope.debitList;
        param.doc= {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if (statue == "save") {
            var addInside = income.addDebitbill(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");

                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            //判断申请人是否为运营管理部人
            var person = $rootScope.loginPerson;
            if(person.user.orgname=='运营管理部'){
                for(var j=0;j<$scope.debitList.length;j++){
                    $scope.debitList[j].ZSPSW=person.user.name;
                }
            }

            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                    if(person.user.orgname!='运营管理部'){
                        if(param.candidates[0].type=="business"||param.candidates[0].type=="business_inter"){
                            for(var m=0;m<$scope.debitList.length;m++){
                                $scope.debitList[m].ZSPSW=selObj.name;
                            }
                        }else{
                            for(var n=0;n<$scope.debitList.length;n++){
                                $scope.debitList[n].ZSPSW="";
                            }
                        }
                    }

                }
                var applyAdd = income.createprocessDebitbill(param);
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
                            window.location.href = '/index.html#/debitbillList';
                        });
                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            };
            var addInside = income.addDebitbill(param);
            addInside.success(function (data) {
                if (data.code == 200) {
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
                        if(person.user.orgname!='运营管理部'){
                            for(var p=0;p<$scope.debitList.length;p++){
                                $scope.debitList[p].ZSPSW="";
                            }
                        }
                        $scope.applyFn(-1);
                    }
                } else {
                    swal(data.msg, "", "warning");
                }
            });

        }
    }
}]);

incomeApp.controller('receivableIncomeViewCtrl',['$scope','$stateParams','$rootScope','incomeServices',function($scope, $stateParams,$rootScope, income){
    $scope.dataList = [];
    $scope.dataList1 = [];
    var param = {page: 1, limit: 10, ZBSTKD: $stateParams.code, NAME1: $stateParams.name};
    var listInside = income.listInside(param);
    listInside.success(function(data){
        $scope.dataList = data.rst.data.items;
        var selectbyname = income.selectbyname({NAME1: $stateParams.name});
        selectbyname.success(function(data){
            $scope.dataList = $scope.dataList.concat(data.rst.data.items);
        });
    });

    var listReceivable = income.listReceivable(param);
    listReceivable.success(function(data){
        $scope.dataList1 = data.rst.data.items;
    });


    //收款变更
    $scope.incomEdit=function(ZJHDBHK){
        var viewCont = income.viewInside({sapid:ZJHDBHK});
        viewCont.success(function (data) {
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.comeList = data.rst.data.items||[];
            var num=0;
            for(var i=0;i<$scope.comeList.length;i++){
                if($scope.comeList[i].ZHXZT=="4"){
                    num++;
                }
            }
            if(num==($scope.comeList.length+1)){
                swal("该计划单已经全部收款，不可变更", "","warning");
                return false;
            }else{
                window.location.href ="index.html#/incomeEdit?sapid="+ZJHDBHK;
            }
        });
    }
    //业务应收
    $scope.receivableSelect = function (idx) {
        var parent = $("#ccTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
        } else {
            check.removeAttr("checked");
        }
    }
    $scope.receivableBill=function(){
        var ckbox = $("#ccTable").find("[checked='checked']");
        var ccList = [];
        $(ckbox).each(function (key, value) {
            var par = $(this).parent().parent();
            var arr = {};
            arr.NAME1 = par.find("td:eq(1)").html();
            arr.KUNNR = par.find("td:eq(17)").html();
            /* arr.KUNNR = par.find("td:eq(1)").html();*/
            arr.ZBSTKD = par.find("td:eq(2)").html();
            arr.VBELN = par.find("td:eq(3)").html();
            arr.ZCREATE_ORG = par.find("td:eq(4)").html();
            arr.ZPERNR_NAME = par.find("td:eq(5)").html();
            arr.ZPRJ_NAME = par.find("td:eq(15)").html();
            arr.ZJHJE = par.find("td:eq(12)").html();
            arr.ZYWYSBH = par.find("td:eq(16)").html();
            arr.ZYSWS = par.find("td:eq(8)").html();
            arr.ZSKZL = '货款';
            ccList.push(arr);
        });
        if(ccList.length==0){
            swal("请勾选数据", "","warning");
            return false;
        }
        for(var i=0;i<ccList.length;i++){
            if(ccList[i].BUKRS!==ccList[0].BUKRS){
                swal("勾选的收款计划单的公司代码不一致", "","warning");
                return false;
            }
            if(ccList[i].NAME1!==ccList[0].NAME1){
                swal("勾选的收款计划单的客户名称不一致", "","warning");
                return false;
            }
        }
        $rootScope.rootData=ccList;
        window.location.href='index.html#/incomeOrderAdd?receivable=1';
    }
}]);

var mkinvoiceApp = angular.module('mkinvoiceApp', ['pageDirectives', 'formDirectives', 'uploadifyApp']);
mkinvoiceApp.service('mkinvoiceServices', function ($http) {
    var service = {
        listInside: function (param) {
            return $http.post('/mkinvoice/list', param, {cache: false});
        },
        viewInside: function (param) {
            return $http.post('/mkinvoice/view', param, {cache: true});
        },
        addInside: function (param) {
            return $http.post('/mkinvoice/save', param, {cache: false});
        },
        updateInside: function (param) {
            return $http.post('/mkinvoice/update', param, {cache: false});
        },
        deleteInside: function (param) {
            return $http.post('/mkinvoice/delete', param, {cache: false});
        },
        applyAdd: function (param) {
            return $http.post('/mkinvoice/createprocess', param, {cache: false});
        },//
        applyView: function (param) {
            return $http.post('/mkinvoice/detail', param, {cache: false});
        },
        agree: function (param) {//同意
            return $http.post('/mkinvoice/agree', param, {cache: false});
        },
        disagree: function (param) {//不同意
            return $http.post('/mkinvoice/disagree', param, {cache: false});
        },
        cancel: function (param) {//取消
            return $http.post('/mkinvoice/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/mkinvoice/recall', param, {cache: false});
        },
        contractData: function (param) {//合同号查询
            return $http.post('/mkinvoice/selectbilldn', param, {cache: false});
        },
        nameData: function (param) {//客户名称查询
            return $http.post('/mkinvoice/selectcus', param, {cache: false});
        },
        name1Data: function (param) {//开票客户名称查询
            return $http.post('/mkinvoice/selectcusbank', param, {cache: false});
        },
        timeReg: function (param) {//
            return $http.post('/mkinvoice/addsjkpsj', param, {cache: false});
        },
        recemoney: function (param) {//已开收据金额查询
            return $http.post('/mkinvoice/recemoney', param, {cache: false});
        } ,
        exportexcel: function (param) {//下载发票清单
            return $http.post('/mkinvoice/exportexcel', param, {cache: false});
        },
        selectbycont: function (param) {//销售合同
            return $http.post('/mkinvoice/selectbycont', param, {cache: false});
        },
        findtotalbymonth : function(param){
            return $http.post('/mkinvoice/findtotalbymonth',param,{cache:false});
        },
        checkwebdata :function(param){
            return $http.post('/mkinvoice/checkwebdata',param,{cache:false});
        },
        statuschange: function(param) {
            return $http.post('/mkinvoice/statuschange',param ,{cache:false});
        },
        simulateinvoice: function(param) {//模拟开票接口
            return $http.post('/mkinvoice/simulateinvoice',param ,{cache:false});
        },
        enum: function(param) {//计量单位
            return $http.post('/mkinvoice/enum',param ,{cache:false});
        },
        getprocesslog: function(param) {
            return $http.post('/mkinvoice/getprocesslog',param,{cache:false});
        },
        checkcontractnofromprocess  : function(param) {
            return $http.post('/mkinvoice/checkcontractnofromprocess  ',param,{cache:false});
        },
        invalidrecbill: function(param) {
            return $http.post('/mkinvoice/invalidrecbill',param,{cache:false});
        }

    };
    return service;
});
mkinvoiceApp.controller('mkinvoiceCheckCtrl', ['$scope','$rootScope', '$timeout', 'mkinvoiceServices', function ($scope, $rootScope, $timeout, mkinvoice) {
    var findtotalbymonth = mkinvoice.findtotalbymonth(), vm = $scope;
    findtotalbymonth.success(function(data){
        $scope.sumfwfp = data.rst.sumfwfp.toFixed(2);
        $scope.sumzzfp = data.rst.sumzzfp.toFixed(2);
    })

    vm.table = false;
    vm.loadData = true;
    vm.tableApi = null;
    vm.tableOptions = {
      resizable: false,
      multiSelect: true,
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 42,
      // enableVerticalScrollbar: 0,
      enableHorizontalScrollbar: 0,
      onRegisterApi: function (api) {
        vm.tableApi = api;
      }
    }
    vm.tableHeader = [
      {name: 'XBLNR', displayName: "开票申请号", cellTooltip: true, sort: {direction: 'desc'}, cellTemplate: '<div class="ui-grid-cell-contents link"><a target="_blank" href="index.html#/mkinvoiceView/{{row.entity._id}}">{{row.entity.XBLNR}}</a></div>',enableSorting: true},
      {name: 'ZFPLX', displayName: "发票类型", cellTooltip: true},
      {name: 'contractno', displayName: "销售合同号", cellTooltip: true},
      {name: 'cusname', displayName: "客户名称", cellTooltip: true},
      {name: 'invoiceamount', displayName: "发票总金额", width:110, cellTooltip: true, cellFilter: 'currency: \'￥\'' },
      {name: 'sjkpsj', displayName: "实际开票时间", width:110, cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\''},
      {name: 'user', displayName: "申请人", width:90, cellTooltip: true},
      {name: 'statusofrecbill', displayName: "是否作废", width:90, cellTooltip: true},
      {name: 'printed', displayName: "是否打印", width:75, cellTooltip: true},
      {
        name: 'actions',
        displayName: "操作",
        enableSorting: false,
        pinnedRight: true,
        width: 100,
        cellTemplate: 'mkinvoiceAction.html'
      }
    ];

    vm.tableSelectRow = function() {
      if(vm.tableApi && vm.loadData) return;
      $timeout(function() {
        var _select = vm.tableApi.selection;
        // 监听单选
        _select.on.rowSelectionChanged(vm, function(row){
          var id = row.entity.XBLNR, action = row.isSelected ? 'add' : 'remove';
          updateSelected(action, id);
        });
        // 监听全选
        _select.on.rowSelectionChangedBatch(vm, function(rows){
            if(rows[0].isSelected) {
              $scope.allCheck(rows[0].isSelected);
            } else {
              $scope.emptyFn();
            }
        })
      })
    };
    $scope.paginationConf = {
      currentPage: 1,
      itemsPerPage: 10,
      numberOfPage: 0,
      pagesLength: 10,
      perPageOptions: [10, 20, 40, 80],
      pagePromise: {},
      onChange: function () {
        var param = {
          page: $scope.paginationConf.currentPage,
          limit: $scope.paginationConf.itemsPerPage,
          XBLNR: $scope.XBLNR,
          ZFPLX: $scope.ZFPLX,
          cusname: $scope.cusname,
          user: $scope.user,
          contractno: $scope.contractno,
            statusofrecbill: $scope.statusofrecbill,
          printed:$scope.printed
        }
        var mkinvoicePromise = mkinvoice.listInside(param);
        mkinvoicePromise.success(function (data) {
          if (data.code = 200) {
            $scope.dataList = data.rst.data.items;
            $scope.dataList.forEach(function (v, k) {
              _.forEach(v, function (val, key) {
                switch (key) {
                  case 'hasprint': // 是否打印
                    v[key] = val ? '是' : '否';
                    break;
                  case 'printed' :
                    v[key] = val ? '是':'否';
                    break;
                  case 'statusofrecbill' :
                     v[key] = val ?  '是':'否';
                     break;
                }
              });
            });
            if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
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
                vm.tableSelectRow();
              } else {
                vm.loadData = false;
                vm.tableApi = null;
                vm.table = false;
              }
            });
            $scope.opprev = $rootScope.opprev;
            for (var i = 0; i < $scope.dataList.length; i++) {
              var conTal = "";
              var obj = {};
              if ((!$scope.dataList[i].sjkpsj) && ($scope.dataList[i].ZFPLX != '收据')) {
                $scope.dataList[i].kpCan = true;
              } else {
                $scope.dataList[i].kpCan = false;
              }
              for (var j = 0; j < $scope.dataList[i].htxq.length; j++) {
                if (!obj[$scope.dataList[i].htxq[j].contractno]) {
                  obj[$scope.dataList[i].htxq[j].contractno] = true;
                  if (j == 0) {
                    conTal += $scope.dataList[i].htxq[j].contractno;
                  } else {
                    conTal += "," + $scope.dataList[i].htxq[j].contractno;
                  }
                }
              }
              $scope.dataList[i].contractno = conTal;
              if($scope.dataList[i].ZFPLX == '收据'){
                  $scope.dataList[i].contractno = $scope.dataList[i].recebill[0].contractno;
              }
            }
          }
        })
        $scope.paginationConf.pagePromise = mkinvoicePromise;
        $scope.emptyFn && $scope.emptyFn();
      }
    };


    $scope.recebillBox=function(id,tqkpno,ZFPLX){
        if(tqkpno=='0'){
            window.location.href = '/index.html#/mkinvoiceView/'+id+'?recebill=2';
        }else{
            swal("该申请单为提前开票，不可进行冲销操作", "", "warning");
            return false;
        }
    }
    //批量打印
    $scope.cArr = [];
    var updateSelected = function (action, id, index) {
        if (action == 'add') {
            $scope.cArr.push(id);
        }
        if (action == 'remove') {
            for (var i = 0; i < $scope.cArr.length; i++) {
                if ($scope.cArr[i] == id) {
                    $scope.cArr.splice(i, 1);
                }
            }
        }
    };
    $scope.updateSelection = function ($event, id, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, index);
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
    };
    $scope.allCheck = function (check) {
        if (check) {
            for(var i= 0,l=$scope.dataList.length;i<l;i++){
                $scope.dataList[i].check=true;
                $scope.cArr[i] = $scope.dataList[i].XBLNR;
            }
        } else {
            $scope.cArr = [];
        }
    };
    $scope.printFn = function (e) {
        if ($scope.cArr.length <= 0) {
            swal("请勾选列表", "", "warning");
            $(e.target).attr('href', 'javascript:void(0);');
            return false;
        } else {
            $(e.target).attr('href', '/print/printht.html?uri=/mkinvoice/printview&XBLNR=' + $scope.cArr.join(';;'));
        }
    };
    //作废功能
    $scope.destroy=function (XBLNR) {
        swal({title: "作废收据！",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "取消",
                confirmButtonText: "确定" },
            function(){
                var destroy = mkinvoice.invalidrecbill({XBLNR:XBLNR});
                destroy.success(function (data) {
                    if (data.code = 200) {
                        swal(
                            {
                                title: "",
                                text: "作废成功",
                                type: "success",
                            })
                        window.location.reload()

                    }else {
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
                    })
                });
            }
        );

    }
}]);
mkinvoiceApp.controller('billBoxCtrl', ['$scope', 'mkinvoiceServices', function ($scope, mkinvoice) {
    $scope.search = function(){
       /* if(!$scope.contractno){
            swal("请输入合同号", "", "warning");
            return false;
        }*/
        var param  = {contractno: $scope.contractno};
        var mkinvoicePromise = mkinvoice.recemoney(param);
        mkinvoicePromise.success(function(data){
            if(data.code == 200){
                $scope.billList = data.rst;
            }else {
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
mkinvoiceApp.controller('nameBoxCtrl', ['$scope', 'mkinvoiceServices', function ($scope, mkinvoice) {
    $scope.dataList=[];
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage:10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var param = {
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                cusname: $scope.name
            };
            var mkinvoicePromise = mkinvoice.nameData(param);
            $scope.paginationConf.pagePromise = mkinvoicePromise;
        }
    };
}]);
mkinvoiceApp.controller('mkinvoiceAddCtrl', ['$scope', '$stateParams', '$window', 'mkinvoiceServices', function ($scope,$stateParams, $window, mkinvoice) {
    $scope.sdef = {};
    $scope.a = {};
    var dataList = $scope.dataList = [];
    $scope.Filedata={};
    $scope.Filedata.items=[];
    $scope.glCgList = [];
    $scope.invoiceCgList = [];
    $scope.upBill=true;
    $scope.downBill=true;
    $scope.dtBill=true;
    $scope.agreeEdit=true;
    $scope.saveDown=false;
    //计量单位
        var meinsBoxPromise = mkinvoice.enum();
        meinsBoxPromise.success(function(data){
            if(data.code==200){
                $scope.meinsBox=data.rst.data.enum.MEINS;
            }
        })
    //合同入口
    if($stateParams.contractno){
        $scope.dtBill=false;
        $scope.sdef.cusname=$stateParams.stomer;
        $scope.sdef.KUNNR=$stateParams.stomerid;
        /*var para= {KUNNR:$stateParams.stomerid};
        var nameCheck=mkinvoice.name1Data(para);
        nameCheck.success(function(data){
            if(data.code==200){
                $scope.sdef.cusname=$stateParams.stomer;
                $scope.sdef.KUNNR=$stateParams.stomerid;
                if(data.rst.data.items.length>0){
                    $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                    $scope.sdef.adress = data.rst.data.items[0].adress;
                    $scope.sdef.tel = data.rst.data.items[0].tel;
                    $scope.sdef.bank = data.rst.data.items[0].bank;
                    $scope.sdef.account = data.rst.data.items[0].account;
                    $scope.sdef.NAME1 = data.rst.data.items[0].koinh;
                }

            }
        });*/
        if($stateParams.receipttype=="17"||$stateParams.receipttype=="0"){
            $scope.upBill=true;
            $scope.downBill=false;
        }else if($stateParams.receipttype=="6"){
            $scope.upBill=false;
            $scope.downBill=true;
        }
        $scope.a.contNum=$stateParams.contractno;
    }
    $scope.recebillList = [{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
    $scope.billingName  = function (oldName,cus) {
        if(oldName&&cus){
                if($scope.sdef.ZFPLX!="收据"){
                    swal({title: "更改用户名称会清空列表信息和发票信息！",
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                            confirmButtonText: "确定" },
                        function(){
                            $scope.glCgList=[];
                            $scope.contractMsgList=[];
                            $scope.invoiceCgList=[];
                            $scope.Filedata.items=[];
                            $scope.sdef.sumhsje='';
                            $scope.totalproductout='';
                            $scope.sdef.isfpandxsht='';
                            ary1=[];
                            $("#nameBox").dialog({
                                autoOpen: false,
                                width: 750,
                                modal: true
                            });
                            $("#nameBox").dialog("open");
                        }
                    );
                }else{
                    swal({title: "更改用户名称会清空列收据信息！",
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                            confirmButtonText: "确定" },
                        function(){
                            $scope.recebillList=[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                            $("#nameBox").dialog({
                                autoOpen: false,
                                width: 750,
                                modal: true
                            });
                            $("#nameBox").dialog("open");
                        }
                    );
                }
        }else{
            $("#nameBox").dialog({
                autoOpen: false,
                width: 750,
                modal: true
            });
            $("#nameBox").dialog("open");
        }
        $scope.nameSelect = function (cusname,par,KTOKD,processing) {
            if(KTOKD=="ZC04"){
                swal("该客户为非业务客户！", "", "warning");
                   return false;
            }
            if(processing){
                swal('审批中不可用改客户','','warning') ;return
            }
            $scope.sdef.cusname=cusname;
            console.log(par)
            $scope.sdef.KUNNR=par;
           /* var para= {KUNNR:par};
            var nameCheck=mkinvoice.name1Data(para);
            nameCheck.success(function(data){
                if(data.code==200){
                    if(cus){
                        $scope.sdef.cusname=cusname;
                        $scope.sdef.KUNNR=par;
                    }

                    if(data.rst.data.items.length==0){
                        swal("该客户的开票信息尚未维护！", "", "warning");
                        if(cus){
                            $scope.sdef.cusname="";
                        }
                        $scope.sdef.nsrnum = "";
                        $scope.sdef.adress = "";
                        $scope.sdef.tel = "";
                        $scope.sdef.bank = "";
                        $scope.sdef.account = "";
                        $scope.sdef.NAME1="";
                        return false;
                    }
                    if(data.rst.data.items.length>0){
                        if(data.rst.data.items[0].koinh==''){
                            swal("该客户的开票信息尚未维护！", "", "warning");
                            if(cus){
                                $scope.sdef.cusname="";
                            }
                            $scope.sdef.nsrnum = "";
                            $scope.sdef.adress = "";
                            $scope.sdef.tel = "";
                            $scope.sdef.bank = "";
                            $scope.sdef.account = "";
                            $scope.sdef.NAME1="";
                            return false;
                        }
                        if($scope.sdef.ZFPLX&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
                            if(data.rst.data.items[0].nsrnum==''||data.rst.data.items[0].adress==''||data.rst.data.items[0].tel==''||data.rst.data.items[0].bank==''||data.rst.data.items[0].account==''){
                                swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                                $scope.sdef.cusname='';
                                return false;
                            }
                        }
                        $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                        $scope.sdef.adress = data.rst.data.items[0].adress;
                        $scope.sdef.tel = data.rst.data.items[0].tel;
                        $scope.sdef.bank = data.rst.data.items[0].bank;
                        $scope.sdef.account = data.rst.data.items[0].account;
                        $scope.sdef.NAME1=data.rst.data.items[0].koinh;
                    }
                }
            });*/
            $("#nameBox").dialog("destroy");
            $(".ui-dialog").remove();
        };
    };

    var typeBox="";
    $scope.type = function (type) {
      if($scope.glCgList.length>0){
        if(type!=typeBox){
          if( typeBox ="增值税专用发票"){
            if(type!="增值税普通发票"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              $scope.sdef.ZFPLX=typeBox;
              $scope.contractShow = true;
              $scope.contract1Show = false;
              $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
              $scope.sdef.invoiceamount = "";
              return false;
            }else{
              typeBox=type;
            }
          }else if(typeBox ="增值税普通发票"){
            if(type!="增值税专用发票"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              $scope.sdef.ZFPLX=typeBox;
              $scope.contractShow = true;
              $scope.contract1Show = false;
              $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
              $scope.sdef.invoiceamount = "";
            }else{
              typeBox=type;
            }
          }else if(typeBox ="服务发票"){
            if(type!="服务费增值税普通发票"&&type!="服务费增值税专用发票"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              scope.sdef.ZFPLX=typeBox;
              scope.contractShow = true;
              scope.contract1Show = false;
              $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
              $scope.sdef.invoiceamount = "";
            }else{
              typeBox=type;
            }
          } else if(typeBox ="服务费增值税普通发票"){
            if(type!="服务发票"&&type!="服务费增值税专用发票"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              scope.sdef.ZFPLX=typeBox;
              scope.contractShow = true;
              scope.contract1Show = false;
              $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
              $scope.sdef.invoiceamount = "";
            }else{
              typeBox=type;
            }
          }else if(typeBox ="服务费增值税专用发票"){
            if(type!="服务发票"&&type!="服务费增值税普通发票"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              scope.sdef.ZFPLX=typeBox;
              scope.contractShow = true;
              scope.contract1Show = false;
              $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
              $scope.sdef.invoiceamount = "";
            }else{
              typeBox=type;
            }
          }else if(typeBox ="资金往来专用发票"){
            if(type!="收据"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              scope.sdef.ZFPLX=typeBox;
              $scope.contractShow = false;
              $scope.contract1Show = true;
              $scope.glCgList = [];
              $scope.contractMsgList = [];
              $scope.sdef.sumsapinvoice = "";
              $scope.totalproductout = "";
              $scope.sdef.invoiceamount = "";
              $scope.sdef.redinvoice = "";
              $scope.sdef.amountoffandchd = "";
              $scope.sdef.amountofsapkpzje = "";

              $scope.sdef.isfpandxsht = "";
              $scope.invoiceCgList = [];
              $scope.Filedata.items = [];
            }else{
              typeBox=type;
            }
          }else if(typeBox ="收据"){
            if(type!="资金往来专用发票"){
              swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
              scope.sdef.ZFPLX=typeBox;
              $scope.contractShow = false;
              $scope.contract1Show = true;
              $scope.glCgList = [];
              $scope.contractMsgList = [];
              $scope.sdef.sumsapinvoice = "";
              $scope.totalproductout = "";
              $scope.sdef.invoiceamount = "";
              $scope.sdef.redinvoice = "";
              $scope.sdef.amountoffandchd = "";
              $scope.sdef.amountofsapkpzje = "";
              $scope.sdef.isfpandxsht = "";
              $scope.invoiceCgList = [];
              $scope.Filedata.items = [];
            }else{
              typeBox=type;
            }
          }
        }
      }else{
        typeBox=type;
        if (type=="收据") {
          $scope.contractShow = false;
          $scope.contract1Show = true;
          $scope.glCgList = [];
          $scope.contractMsgList = [];
          $scope.sdef.sumsapinvoice = "";
          $scope.totalproductout = "";
          $scope.sdef.invoiceamount = "";
          $scope.sdef.redinvoice = "";
          $scope.sdef.amountoffandchd = "";
          $scope.sdef.amountofsapkpzje = "";
          $scope.sdef.isfpandxsht = "";
          $scope.invoiceCgList = [];
          $scope.Filedata.items = [];
        } else {
          $scope.contractShow = true;
          $scope.contract1Show = false;
          $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
          $scope.sdef.invoiceamount = "";
        };
      }
        if(type=="增值税专用发票"||type=="增值税普通发票"){
            $scope.sdef.rate ="17%";
        }else if(type=="资金往来专用发票"||type=="收据"){
            $scope.sdef.rate ="";
        }else if(type=="服务发票"||type=="服务费增值税普通发票"||type=="服务费增值税专用发票"){
            $scope.sdef.rate ="6%";
        }
        if(type=="增值税普通发票"||type=="服务费增值税普通发票"||type=="收据"){
            $scope.requireShow=false;
        }else{
            $scope.requireShow=true;
        }
        if($scope.sdef.cusname&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
                if($scope.sdef.nsrnum==''||$scope.sdef.adress==''||$scope.sdef.tel==''||$scope.sdef.bank==''||$scope.sdef.account==''){
                    swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                    $scope.sdef.cusname="";
                    $scope.sdef.nsrnum = "";
                    $scope.sdef.adress = "";
                    $scope.sdef.tel = "";
                    $scope.sdef.bank = "";
                    $scope.sdef.account = "";
                    $scope.sdef.NAME1="";
                    return false;
                }
        }
    }
    var KUNNR_NAME;    /*客户名称*/
    var contracttype;   /*合同类型*/
    var contractmoney;    /*合同金额*/
    var contractno;    /*合同金额*/
    var groupno;
    var NAME1 ;/*开票客户名称*/
    var kpcusid;/*开票客户名称编码*/
    $scope.recodeAll=[];

    $scope.contNumBox=function(contNum){
        if(!$scope.sdef.selectby){
            swal("请选择开票类型！", "", "warning");
            return false;
        }
        if(!contNum){
            swal("销售合同号不能为空！", "", "warning");
            return false;
        }
        if(!$scope.sdef.cusname){
            swal("请先选择客户名称！", "", "warning");
            return false;
        }
        if(!$scope.sdef.ZFPLX){
            swal("请先选择发票类型！", "", "warning");
            return false;
        }
        var pay = mkinvoice.selectbycont({contractno:contNum,selectby:$scope.sdef.selectby});
        pay.success(function(data){
            if(data.code==200){
                if(data.rst){
                    if((data.rst.receipttype!="税率17%"&&data.rst.receipttype!="税率0")&&($scope.sdef.ZFPLX=="增值税专用发票"||$scope.sdef.ZFPLX=="增值税普通发票")){
                        swal("该合同税率为"+data.rst.receipttype+"，不可开增值税类发票！", "", "warning");
                        $scope.a.contNum="";
                        return false;
                    }else if(data.rst.receipttype!="税率6%"&&($scope.sdef.ZFPLX=="服务发票"||$scope.sdef.ZFPLX=="服务费增值税普通发票"||$scope.sdef.ZFPLX=="服务费增值税专用发票")){
                        swal("该合同税率为"+data.rst.receipttype+"，不可开服务费类发票！", "", "warning");
                        $scope.a.contNum="";
                        return false;
                    }else{
                        $scope.a.contNum="";


                        KUNNR_NAME = data.rst.KUNNR_NAME;
                        contracttype = data.rst.contracttype;
                        contractmoney = data.rst.contractmoney;
                        contractno = data.rst.contractno;
                        groupno = data.rst.groupno;
                        salesorgname = data.rst.salesorgname;
                        salesorgid = data.rst.salesorgid;
                        tradername = data.rst.tradername;
                        traderlogin = data.rst.traderlogin;
                        KUNNR = data.rst.KUNNR;
                        NAME1 = data.rst.NAME1;
                        kpcusid = data.rst.kpcusid;
                        $scope.list=data.rst;
                        $scope.recodeAll=data.rst.VBELN;
                        if(KUNNR!=$scope.sdef.KUNNR){
                            swal("此合同号的客户名称是"+KUNNR_NAME+",与基本信息部分的客户名称不一致", "", "warning");
                            $("#contNum").dialog("destroy");
                            $(".ui-dialog").remove();
                            return false;
                        }
                        if($scope.sdef.NAME1){
                            if($scope.sdef.kpcusid!=kpcusid){
                                swal("此合同号的开票客户名称是"+NAME1+",与基本信息部分的开票客户名称不一致", "", "warning");
                                $("#contNum").dialog("destroy");
                                $(".ui-dialog").remove();
                                return false;
                            }else {
                                $("#contNum").dialog({
                                    autoOpen: false,
                                    width: 500,
                                    height: 400,
                                    modal: true
                                });
                                $("#contNum").dialog("open");
                            }
                        }else {

                            var para= {KUNNR:kpcusid};
                            var nameCheck=mkinvoice.name1Data(para);
                            nameCheck.success(function(data){
                                if(data.code==200){
                                    if(data.rst.data.items.length==0){
                                        swal("该客户的开票信息尚未维护！", "", "warning");
                                        $scope.sdef.nsrnum = "";
                                        $scope.sdef.adress = "";
                                        $scope.sdef.tel = "";
                                        $scope.sdef.bank = "";
                                        $scope.sdef.account = "";
                                        $scope.sdef.NAME1="";
                                        $("#contNum").dialog("destroy");
                                        $(".ui-dialog").remove();
                                        return false;
                                    }
                                    if(data.rst.data.items.length>0){
                                        if(data.rst.data.items[0].koinh==''){
                                            swal("该客户的开票信息尚未维护！", "", "warning");
                                            $scope.sdef.nsrnum = "";
                                            $scope.sdef.adress = "";
                                            $scope.sdef.tel = "";
                                            $scope.sdef.bank = "";
                                            $scope.sdef.account = "";
                                            $scope.sdef.NAME1="";
                                            $("#contNum").dialog("destroy");
                                            $(".ui-dialog").remove();
                                            return false;
                                        }else {
                                            $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                            $scope.sdef.adress = data.rst.data.items[0].adress;
                                            $scope.sdef.tel = data.rst.data.items[0].tel;
                                            $scope.sdef.bank = data.rst.data.items[0].bank;
                                            $scope.sdef.account = data.rst.data.items[0].account;
                                            $scope.sdef.NAME1=NAME1;
                                            $scope.sdef.kpcusid=kpcusid;
                                            $("#contNum").dialog({
                                                autoOpen: false,
                                                width: 500,
                                                height: 400,
                                                modal: true
                                            });
                                            $("#contNum").dialog("open");

                                        }
                                        if($scope.sdef.ZFPLX&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
                                            if(data.rst.data.items[0].nsrnum==''||data.rst.data.items[0].adress==''||data.rst.data.items[0].tel==''||data.rst.data.items[0].bank==''||data.rst.data.items[0].account==''){
                                                swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                                                $scope.sdef.nsrnum = "";
                                                $scope.sdef.adress = "";
                                                $scope.sdef.tel = "";
                                                $scope.sdef.bank = "";
                                                $scope.sdef.account = "";
                                                $scope.sdef.NAME1="";
                                                $("#contNum").dialog("destroy");
                                                $(".ui-dialog").remove();

                                            }else {
                                                $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                                $scope.sdef.adress = data.rst.data.items[0].adress;
                                                $scope.sdef.tel = data.rst.data.items[0].tel;
                                                $scope.sdef.bank = data.rst.data.items[0].bank;
                                                $scope.sdef.account = data.rst.data.items[0].account;
                                                $scope.sdef.NAME1=NAME1;
                                                $scope.sdef.kpcusid=kpcusid;

                                                $("#contNum").dialog({
                                                    autoOpen: false,
                                                    width: 500,
                                                    height: 400,
                                                    modal: true
                                                });
                                                $("#contNum").dialog("open");

                                            }
                                        }else {
                                            $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                            $scope.sdef.adress = data.rst.data.items[0].adress;
                                            $scope.sdef.tel = data.rst.data.items[0].tel;
                                            $scope.sdef.bank = data.rst.data.items[0].bank;
                                            $scope.sdef.account = data.rst.data.items[0].account;
                                            $scope.sdef.NAME1=NAME1;
                                            $scope.sdef.kpcusid=kpcusid;
                                            console.log( $scope.list,
                                                $scope.recodeAll)
                                            $("#contNum").dialog({
                                                autoOpen: false,
                                                width: 500,
                                                height: 400,
                                                modal: true
                                            });
                                            $("#contNum").dialog("open");

                                        }

                                    }
                                }
                            });
                        }
                        $scope.VBELNSelect=function(VBELN){
                            $scope.parType="VBELN";
                            $("#contNum").dialog("destroy");
                            $(".ui-dialog").remove();
                            var param  = {KUNNR:KUNNR,tradername:tradername,traderlogin:traderlogin,VBELN: VBELN,contractno:contractno,contracttype:contracttype,KUNNR_NAME:KUNNR_NAME,contractmoney:contractmoney,groupno:groupno,salesorgid:salesorgid,salesorgname:salesorgname,kpcusid:$scope.sdef.kpcusid,NAME1:$scope.sdef.NAME1};

                             var mkinvoicePromise = mkinvoice.contractData(param);
                            mkinvoicePromise.success(function(data){

                                if(data.code == 200){
                                    $("#cusBox").dialog({
                                        autoOpen: false,
                                        width: 1000,
                                        height: 600,
                                        modal: true
                                    });
                                    $("#cusBox").dialog("open");
                                    $scope.dataList = data.rst.data.items;
                                }else {
                                    swal(
                                        {
                                            title: "",
                                            text: data.msg,
                                            type: "warning",
                                        })

                                }
                            })

                        }
                        $scope.nbjsddhSelect=function(nbjsddh){

                            $scope.parType="nbjsddh";
                            $("#contNum").dialog("destroy");
                            $(".ui-dialog").remove();


                            var param  = {KUNNR:KUNNR,tradername:tradername,traderlogin:traderlogin,nbjsddh: nbjsddh,contractno:contractno,contracttype:contracttype,KUNNR_NAME:KUNNR_NAME,contractmoney:contractmoney,groupno:groupno,salesorgid:salesorgid,salesorgname:salesorgname,kpcusid:$scope.sdef.kpcusid,NAME1:$scope.sdef.NAME1};
                            var Promise = mkinvoice.contractData(param);
                            Promise.success(function(data){
                                if(data.code == 200){
                                    $("#cusBox").dialog({
                                        autoOpen: false,
                                        width: 1000,
                                        height: 600,
                                        modal: true
                                    });
                                    $("#cusBox").dialog("open");
                                    $scope.dataList = data.rst.data.items;

                                }else {
                                    swal(
                                        {
                                            title: "",
                                            text: data.msg,
                                            type: "warning",
                                        })

                                }
                            })

                        }
                    }
                }else{
                    swal("该销售合同号不存在！", "", "warning");
                    $scope.a.contNum="";
                    return false;
                }

            }else{
                swal(data.msg, "", "warning");
            }
        })

        $scope.xqChange=function(xqnum,KWMENG,thsl,idx,ZKKSL){
            if($scope.sdef.selectby=="退货订单号"){
                if(xqnum>ZKKSL){
                    swal("退货订单，不可提前开票！", "", "warning");
                    $scope.dataList[idx].xqnum="";
                    return true;
                }
                if(KWMENG==0){
                    swal("可开数量为0，不可提前开票！", "", "warning");
                    $scope.dataList[idx].xqnum="";
                    return true;
                }
            }else{
                if(xqnum<0||eval(xqnum)>KWMENG-thsl){
                    swal("需求数量必须大于0，小于等于未开数量减退货数量！", "", "warning");
                    $scope.dataList[idx].xqnum="";
                    return true;
                }
            }

        }
    }
    $scope.contractSelect = function (idx,ZKKSL) {
        if($scope.sdef.selectby=='退货订单号'){
            if(ZKKSL==0){
                swal("可开数量是0，不可进行开票！", "", "warning");
                return false;
            }
        }
        var parent = $("#ccTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
        } else {
            check.removeAttr("checked");
        }

    }
    $scope.selectChange=function(){
        $scope.$watch('sdef.selectby',function(newValue,oldValue, scope){
            if($scope.glCgList.length>0){
                if(newValue!=oldValue){
                    console.log(oldValue)
                    swal({title: "更改开票类型会清空列表信息和发票信息！",
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                            confirmButtonText: "确定" },
                        function(){
                            $scope.glCgList=[];
                            $scope.contractMsgList=[];
                            $scope.invoiceCgList=[];
                            $scope.Filedata.items=[];
                            $scope.sdef.sumhsje='';
                            $scope.totalproductout='';
                            $scope.sdef.isfpandxsht='';
                            $scope.sdef.sumsapinvoice='';
                            $scope.sdef.invoiceamount='';
                            $scope.sdef.redinvoice='';
                            $scope.sdef.amountoffandchd='';
                            ary1=[];
                        }
                    );
                }
            }

        });
    }
    $scope.ccCancle = function () {
        $("#cusBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    // var allAccount = 0;
    var ary1=[];
    var storageMaterial = [];
    $scope.contractMsgList = [];   /*合同信息表*/
    var contractTab = [];
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.ccSelect = function (selectData) {
        var cArr = $scope.glCgList;
        var ckbox = $("#ccTable").find("[checked='checked']");
        var ccList = [];
        var invList = [];
        var invList1 = [];
        $(ckbox).each(function (key, value) {
            var par = $(this).parent().parent();
            var arr = {}, obj = {}, obj1 = {};
            arr.VBELN = par.find("td:eq(1)").html();
            /*arr.KUNNR_NAME = par.find("td:eq(2)").html();*/
            arr.KUNNR = par.find("td:eq(2)").html();
            arr.contractno = par.find("td:eq(3)").html();
            arr.MATNR = par.find("td:eq(5)").html();
            arr.KWMENG = par.find("td:eq(6)").html();
            arr.KZWI1 = par.find("td:eq(7)").html();
            arr.thsl = par.find("td:eq(8)").html();
            arr.xqnum = par.find("input:eq(1)").val();
            arr.hsje = eval(arr.KZWI1*arr.xqnum).toFixed(2);
            arr.ZKKSL = par.find("td:eq(9)").html();

            arr.groupno= par.find("td:eq(24)").html();
            arr.salesorgname = par.find("td:eq(25)").html();
            arr.salesorgid = par.find("td:eq(26)").html();
            arr.ZPC_NUM = par.find("td:eq(13)").html();
            /* if($scope.sdef.ZFPLX.indexOf("服务")<0){

             arr.ZPC_NUM = par.find("td:eq(13)").html();

             }*/
            if((par.find("td:eq(17)").html())!="专有服务"&&arr.xqnum>0&&arr.xqnum>eval(arr.ZKKSL)-eval(arr.thsl)) {
                arr.tqkpno=eval(arr.xqnum)-eval(arr.ZKKSL)+eval(arr.thsl);

            }else{
                arr.tqkpno='';
            }
            arr.DN_DATA=eval(par.find("td:eq(27)").html());
            arr.fandchd=eval(par.find("td:eq(28)").html());
            arr.tradername =par.find("td:eq(29)").html();
            arr.traderlogin=par.find("td:eq(30)").html();
            arr.KUNNR_NAME=par.find("td:eq(31)").html();
            arr.MTART = par.find("td:eq(32)").html();
            arr.PSTYV = par.find("td:eq(33)").html();
            arr.ZDDSL = par.find("td:eq(34)").html();
            arr.NAME1 = par.find("td:eq(35)").html();
            arr.kpcusid = par.find("td:eq(36)").html();

            obj.MATNR =par.find("td:eq(5)").html();
            obj.POSNR =par.find("td:eq(4)").html();
            obj.ZZKPMS = par.find("td:eq(14)").html().replace(/\s+/g, '');
            obj.ZZKPMS = obj.ZZKPMS.replace(/,+/g, '、');
            obj.ZZGKXH = par.find("td:eq(15)").html();
            /*obj.MEINS = par.find("td:eq(16)").html();*/
            obj.MEINS =getField($scope.meinsBox, 'code',par.find("td:eq(16)").html()).name;
            obj.xqnum = arr.xqnum;
            obj.KZWI1 = par.find("td:eq(7)").html();
            obj.identShow =true;

            obj1.MATNR =par.find("td:eq(5)").html();
            obj1.POSNR =par.find("td:eq(4)").html();
            obj1.ZZKPMS = par.find("td:eq(14)").html().replace(/\s+/g, '');
            obj1.ZZKPMS = obj1.ZZKPMS.replace(/,+/g, '、');
            obj1.ZZGKXH = par.find("td:eq(15)").html();
            obj1.MEINS =getField($scope.meinsBox, 'code',par.find("td:eq(16)").html()).name;
            obj1.xqnum = arr.xqnum;
            obj1.KZWI1 = par.find("td:eq(7)").html();
            obj1.identShow =true;

            arr.contracttype = par.find("td:eq(17)").html();
            arr.LFSTK = par.find("td:eq(18)").html();
            arr.zdfhje = (+par.find("td:eq(19)").html()).toFixed(2);
            arr.zdmcfhsj = par.find("td:eq(20)").html();
            /* arr.VBELN_DN = par.find("td:eq(21)").html();*/
            arr.VKORG = par.find("td:eq(22)").html();

            arr.contractmoney = par.find("td:eq(23)").html();
            arr.POSNR = par.find("td:eq(4)").html();
            arr.identification =arr.contractno+arr.POSNR;
            arr.identShow =true;
            ccList.push(arr);
            invList.push(obj);
            invList1.push(obj1);

            contractTab.push(arr);
            for(var x =0;x<contractTab.length;x++){
                if(contractTab.length > 1){
                    contractTab.splice(x,1);
                }
            }
        });

        if(ccList.length){
            $scope.contractnoFlag=true;
            for(var a=0;a<$scope.contractMsgList.length;a++){
                if($scope.contractMsgList[a].contractno==selectData[0].contractno){
                    $scope.contractnoFlag=false;
                }
            }
            for(var f=0;f<selectData.length;f++){
                if(selectData[f].ZKKSL-selectData[f].thsl<=0&&selectData[f].thsl>0&&$scope.contractnoFlag){
                    var arrBox = {}, objBox = {}, obj1Box = {};
                    arrBox.VBELN = selectData[f].VBELN;
                    /*arr.KUNNR_NAME = par.find("td:eq(2)").html();*/
                    arrBox.KUNNR = selectData[f].KUNNR;
                    arrBox.contractno = selectData[f].contractno;
                    arrBox.MATNR = selectData[f].MATNR;
                    arrBox.KWMENG = selectData[f].KWMENG;
                    arrBox.KZWI1 = selectData[f].KZWI1;
                    arrBox.thsl = selectData[f].thsl;
                    arrBox.xqnum =0;
                    arrBox.hsje =0;
                    arrBox.ZKKSL =selectData[f].ZKKSL;

                    arrBox.groupno= selectData[f].groupno;
                    arrBox.salesorgname = selectData[f].salesorgname;
                    arrBox.salesorgid =selectData[f].salesorgid;
                    arrBox.ZPC_NUM = selectData[f].ZPC_NUM;
                    arrBox.tqkpno='';
                    arrBox.DN_DATA=selectData[f].DN_DATA;
                    arrBox.fandchd= selectData[f].fandchd;
                    arrBox.tradername =selectData[f].tradername;
                    arrBox.traderlogin=selectData[f].traderlogin;
                    arrBox.KUNNR_NAME=selectData[f].KUNNR_NAME;
                    arrBox.MTART =selectData[f].MTART;
                    arrBox.PSTYV =selectData[f].PSTYV;
                    arrBox.ZDDSL =selectData[f].ZDDSL;
                    arrBox.NAME1 = selectData[f].NAME1;
                    arrBox.kpcusid = selectData[f].kpcusid;
                    objBox.MATNR =selectData[f].MATNR;
                    objBox.POSNR =selectData[f].POSNR;
                    objBox.ZZKPMS = selectData[f].ZZKPMS.replace(/\s+/g, '');
                    objBox.ZZKPMS = objBox.ZZKPMS.replace(/,+/g, '、');
                    objBox.ZZGKXH = selectData[f].ZZGKXH;
                    objBox.MEINS =getField($scope.meinsBox, 'code',selectData[f].MEINS).name;
                    objBox.xqnum = 0;
                    objBox.KZWI1 = selectData[f].KZWI1;
                    objBox.identShow =false;

                    obj1Box.MATNR =selectData[f].MATNR;
                    obj1Box.POSNR =selectData[f].POSNR;

                    obj1Box.ZZKPMS = selectData[f].ZZKPMS.replace(/\s+/g, '');
                    obj1Box.ZZKPMS = obj1Box.ZZKPMS.replace(/,+/g, '、');
                    obj1Box.ZZGKXH = selectData[f].ZZGKXH;
                    obj1Box.MEINS =getField($scope.meinsBox, 'code',selectData[f].MEINS).name;
                    obj1Box.xqnum = 0;
                    obj1Box.KZWI1 = selectData[f].KZWI1;
                    obj1Box.identShow =false;
                    arrBox.contracttype = selectData[f].contracttype;
                    arrBox.LFSTK = selectData[f].LFSTK;
                    arrBox.zdfhje =  selectData[f].zdfhje.toFixed(2);
                    arrBox.zdmcfhsj = selectData[f].zdmcfhsj;
                    /* arr.VBELN_DN = par.find("td:eq(21)").html();*/
                    arrBox.VKORG = selectData[f].VKORG;

                    arrBox.contractmoney = selectData[f].contractmoney;
                    arrBox.POSNR = selectData[f].POSNR;
                    arrBox.identification =arrBox.contractno+arrBox.POSNR;
                    arrBox.identShow =false;

                    ccList.push(arrBox);
                    invList.push(objBox);
                    invList1.push(obj1Box);
                }
            }
        }
        for(var w=0;w<ccList.length;w++){
            if((ccList[w].xqnum.toString().split(".")[1])){
                if((ccList[w].xqnum.toString().split(".")[1].length)>3){
                    swal("您有信息填写不完整，请检查后再保存", "", "warning");
                    ccList = [],invList = [],invList1 = [],arr = {}, obj = {};
                    return false;
                }
            }
            console.log(ccList[w].VKORG)
            if($scope.parType=="VBELN"){
                if(ccList[w].KUNNR!=$scope.sdef.KUNNR){
                    swal("所选合同中客户名称和基本信息中客户名称不一致", "", "warning");
                    ccList = [],invList = [],invList1 = [],arr = {}, obj = {};
                    return false;
                }
            }
            if($scope.parType=="nbjsddh"){
                if(ccList[w].VKORG=="9000"){
                    $scope.sdef.KUNNR=ccList[w].KUNNR;
                    $scope.sdef.cusname=ccList[w].KUNNR_NAME;
                    var parma= {KUNNR:$scope.sdef.KUNNR};
                    var nameCheck=mkinvoice.name1Data(parma);
                    nameCheck.success(function(data){
                        if(data.code==200){
                            if(data.rst.data.items.length==0){
                                swal("该客户的开票信息尚未维护！", "", "warning");
                                $scope.sdef.cusname="";
                                $scope.sdef.nsrnum = "";
                                $scope.sdef.adress = "";
                                $scope.sdef.tel = "";
                                $scope.sdef.bank = "";
                                $scope.sdef.account = "";
                                $scope.sdef.NAME1="";
                                return false;
                            }
                            if(data.rst.data.items.length>0){
                                if(data.rst.data.items[0].koinh==''){
                                    swal("该客户的开票信息尚未维护！", "", "warning");
                                    $scope.sdef.cusname="";
                                    $scope.sdef.nsrnum = "";
                                    $scope.sdef.adress = "";
                                    $scope.sdef.tel = "";
                                    $scope.sdef.bank = "";
                                    $scope.sdef.account = "";
                                    $scope.sdef.NAME1="";
                                    return false;
                                }
                                $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                $scope.sdef.adress = data.rst.data.items[0].adress;
                                $scope.sdef.tel = data.rst.data.items[0].tel;
                                $scope.sdef.bank = data.rst.data.items[0].bank;
                                $scope.sdef.account = data.rst.data.items[0].account;
                                $scope.sdef.NAME1 = data.rst.data.items[0].koinh;
                            }

                        }
                    });

                }

            }



        }
        for(var x=0;x<$scope.glCgList.length;x++){
            for(var p=0;p<ccList.length;p++){
                if($scope.glCgList[x].contractno==ccList[p].contractno && $scope.glCgList[x].POSNR==ccList[p].POSNR){
                    swal({
                        title:'',
                        text:'已选择销售合同号'+$scope.glCgList[x].contractno+'行项目号为：'+$scope.glCgList[x].POSNR+'的物料!',
                        type:'warning'
                    });
                    return true;
                }

            }
        }

        storageMaterial.push(ccList);

        $scope.glCgList = cArr.concat(ccList);
        $scope.oldglCgList = angular.copy($scope.glCgList)
        if($scope.parType=="nbjsddh"){
            for(var w=0;w<ccList.length;w++){
                if(ccList[w].VKORG!="9000"&&$scope.list.nbjsddh){
                    $scope.sdef.cusname="中建材集团进出口公司";
                    $scope.sdef.NAME1="中建材集团进出口公司";
                    var namePromise = mkinvoice.nameData({cusname:"中建材集团进出口公司"});
                    namePromise.success(function(data){//更改客户信息
                        if(data.code==200){
                            $scope.sdef.KUNNR=data.rst.data.items[0].KUNNR;
                            var para= {KUNNR:$scope.sdef.KUNNR};
                            var nameChange=mkinvoice.name1Data(para);
                            nameChange.success(function(data){
                                if(data.code==200){
                                    $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                    $scope.sdef.adress = data.rst.data.items[0].adress;
                                    $scope.sdef.tel = data.rst.data.items[0].tel;
                                    $scope.sdef.bank = data.rst.data.items[0].bank;
                                    $scope.sdef.account = data.rst.data.items[0].account;
                                    $scope.sdef.NAME1=data.rst.data.items[0].koinh;
                                }
                            });
                        }
                    });

                    break;
                }
            }
        }


        $scope.flag1 =true;
        $scope.timestamp = new Date().getTime();
        ary1=ary1.concat(invList1);
        if($scope.sdef.isfpandxsht=="是"){
            $scope.invoiceCgList = ary1;
        }else if($scope.sdef.isfpandxsht=="否"){
            $scope.invoiceCgList=[];
            for(var v=0;v<ary1.length;v++){
                var objBox={};
                objBox.MATNR=ary1[v].MATNR;
                objBox.POSNR=ary1[v].POSNR;
                objBox.MATNR.ZZKPMS=ary1[v].ZZKPMS;
                objBox.MATNR.ZZGKXH=ary1[v].ZZGKXH;
                objBox.MATNR.MEINS=ary1[v].MEINS;
                objBox.MATNR.xqnum=ary1[v].xqnum;
                objBox.MATNR.KZWI1=ary1[v].KZWI1;
                $scope.invoiceCgList.push(objBox);
            }
        }

        var rataMoney=0;
        for(var h=0;h<$scope.glCgList.length;h++){
            rataMoney+=parseFloat($scope.glCgList[h].hsje);

            $scope.sdef.sumhsje=rataMoney.toFixed(2);
        }
        if(ccList.length==0){
            swal("请选择数据", "","warning");
            return false;
        }
        $scope.contractMsg = true;
        for(var x = 0 ; x < $scope.contractMsgList.length; x++){
            for(var j in contractTab){
                if($scope.contractMsgList[x].contractno == contractTab[j].contractno){
                    contractTab.splice(j,1);
                }
            }
           // $scope.totalproductout += parseFloat($scope.contractMsgList[x].zdfhje);

        }
        $scope.contractMsgList = $scope.contractMsgList.concat(contractTab);
        $scope.totalproductout = 0;
        $scope.contractMsgList.forEach(function(item){
            $scope.totalproductout += parseFloat(item.zdfhje);
        });
        $("#cusBox").dialog("destroy");
        $(".ui-dialog").remove();

        $(ckbox).each(function (key, value) {
            $(this).removeAttr("checked");
        });
    };
    /*$scope.addNumber=function(all){
    if(all==true){
        for(var i=0;i<$scope.dataList.length;i++){
            if($scope.dataList[i].ZKKSL>0&&$scope.dataList[i].ZKKSL<($scope.dataList[i].KWMENG-$scope.dataList[i].thsl)){
                $scope.dataList[i].xqnum=$scope.dataList[i].ZKKSL;
            }else{
                $scope.dataList[i].xqnum='';
            }
        }

    }else{
        for(var i=0;i<$scope.dataList.length;i++){
                $scope.dataList[i].xqnum='';
        }
    }
    };*/
    /*删除*/
    $scope.htArr=[];
    $scope.htArrIndex=[];
    $scope.allCheck = function ($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.glCgList.length; i++) {
             $scope.htArr[i] = $scope.glCgList[i].contractno;
             $scope.htArrIndex[i] = i;
             }
        } else {
            $scope.htArr=[];
            $scope.htArrIndex=[];
        }
    };
    var htSelected = function (action, contractno, index) {
        if (action == 'add' ) {
            $scope.htArr.push(contractno);
            $scope.htArrIndex.push(index);

        }
        if (action == 'remove') {
            $scope.htArr.splice($scope.htArrIndex[index], 1);
            $scope.htArrIndex.splice(index, 1);
        }
    };
    $scope.htSelection = function ($event, contractno, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        htSelected(action, contractno, index);
    };
    $scope.htDel=function() {
        if ($scope.htArr.length <= 0) {
            swal("请勾选列表", "", "warning");
            return false;
        }
        if($scope.htArr.length==$scope.glCgList.length){
            $scope.glCgList=[];
            $scope.contractMsgList=[];
            $scope.totalproductout='';
            $scope.sdef.sumsapinvoice='';
            $scope.sdef.amountoffandchd='';
            $scope.sdef.invoiceamount='';
            $scope.sdef.redinvoice='';


            ary1=[];
            if($scope.sdef.isfpandxsht !="否"){
                $scope.invoiceCgList=[];
            }
            $scope.all=false;
            $scope.checkAll=false;
        }else{
            for(var i=0;i<$scope.htArrIndex.length;i++){
              for(var k=0;k<$scope.glCgList.length;k++){
                  if($scope.htArrIndex[i]==k){
                      $scope.glCgList[k].payFlag="selected";
                      break;
                  }
              }
            }
            for(var j=0;j<$scope.glCgList.length;j++){
                if($scope.glCgList[j].payFlag=="selected"){
                    console.log(j)
                    $scope.glCgList.splice(j, 1);
                    ary1.splice(j, 1);
                    /*if($scope.sdef.isfpandxsht=="是"){
                        $scope.invoiceCgList.splice(j, 1);
                    }*/
                    j--;
                }
            }
            for(var s=0;s<$scope.glCgList.length;s++){
                if(!$scope.glCgList[s].identShow){
                    for(var t=0;t<$scope.glCgList.length;t++){
                        if(s!=t&&$scope.glCgList[s].contractno==$scope.glCgList[t].contractno&&$scope.glCgList[t].identShow){
                            $scope.contractnoFlag=true;
                        }
                    }
                    if(!$scope.contractnoFlag){
                        $scope.glCgList.splice(s, 1);
                        ary1.splice(s, 1);
                        s--;
                        t--;
                    }

                }
            }
            for(m=0;m<$scope.htArr.length;m++){
                for(var j=0;j<$scope.glCgList.length;j++){
                    if($scope.glCgList[j].contractno==$scope.htArr[m]){
                        $scope.htArr.splice(m,1);
                        m--;
                        break;
                    }
                }
            }
            for(var n=0;n<$scope.htArr.length;n++){
                for(var p=0;p<$scope.contractMsgList.length;p++){
                    if($scope.contractMsgList[p].contractno==$scope.htArr[n]){
                        $scope.contractMsgList.splice(p,1);
                        break;
                    }
                }
            }
            var htTal=0;
            for(var q=0;q<$scope.contractMsgList.length;q++){
                htTal+=$scope.contractMsgList[q].zdfhje*1;
            }
            $scope.totalproductout=htTal;
        }
        $scope.timestamp = new Date().getTime();
        $scope.htArr=[];
        $scope.htArrIndex=[];
        $scope.flag1 =true;

    }
    $scope.xqnumNum=function(xqnum,ZKKSL,KZWI1,KWMENG,thsl,index){
        if($scope.sdef.selectby=="退货订单号"){
             if(xqnum*1>ZKKSL){
                 swal("退货订单，不可提前开票！", "", "warning");
                 $scope.glCgList[index].xqnum="";
                 return false;
             }
        }else{
            if(eval(xqnum)<=0||eval(xqnum)>KWMENG-thsl){
                swal("需求数量必须大于0，小于等于未开数量减退货数量！", "", "warning");
                $scope.glCgList[index].xqnum="";
                return false;
            }
        }
        if ($scope.sdef.isfpandxsht == "是") {
            $scope.invoiceCgList[index].xqnum = xqnum;
        }
        if($scope.glCgList[index].contracttype!="专有服务"&&xqnum>0&&xqnum>eval(ZKKSL)-eval(thsl)) {
            $scope.glCgList[index].tqkpno = eval(xqnum) - eval(ZKKSL) + eval(thsl);

        }else{
            $scope.glCgList[index].tqkpno='';
        }
        $scope.flag1=true;
        $scope.timestamp = new Date().getTime();
        if(xqnum&&KZWI1){
            $scope.glCgList[index].hsje=(eval(xqnum)*eval(KZWI1)).toFixed(2);
        }else{
            $scope.glCgList[index].hsje="";

        }
    }

   /* var timestamp = new Date().getTime();*/
    //SAP模拟开票
    $scope.sapTotal=function(glCgList,sdef){
        for(var i=0;i<glCgList.length;i++){
            if(glCgList[i].identShow&&(glCgList[i].xqnum<=0||!glCgList[i].xqnum)){
                swal("需求数量必须大于0！", "", "warning");
                return false;
            }
            if(glCgList[i].tqkpno>0){
                glCgList[i].logo="T";
            }else{
                glCgList[i].logo="";
            }
         /* if($scope.oldglCgList[i].xqnum !== glCgList[i].xqnum || $scope.oldglCgList.length !== glCgList.length){
              var newTimestamp = new Date().getTime();
          };*/

        }
       /* if(newTimestamp) {
          timestamp = newTimestamp;
          $scope.oldglCgList = angular.copy(glCgList);
        }*/
        var doc={};
        doc.model=sdef;
        doc.htxq=glCgList;
        if(doc.model) { doc.model.timeID = $scope.timestamp; }

        var simulateinvoice = mkinvoice.simulateinvoice(doc);
        simulateinvoice.success(function (data) {
            if (data.code == 200) {
              $scope.flag1=false;
                $scope.agreeEdit=false;
                for (var i = 0; i < data.rst.data.htxq.length; i++) {
                    for(var j=0;j<$scope.glCgList.length;j++){
                        if($scope.glCgList[j].identification==data.rst.data.htxq[i].identification){
                            $scope.glCgList[j].sapinvoice=data.rst.data.htxq[i].sapinvoice.toFixed(2);
                            $scope.glCgList[j].fandchd=data.rst.data.htxq[i].fandchd.toFixed(2)*1;
                            $scope.glCgList[j].custKey=data.rst.data.htxq[i].key;
                            ary1[j].hsje = $scope.glCgList[i].sapinvoice;
                            break;
                        }
                    }

                }

                $scope.sdef.isfpandxsht="";
                $scope.invoiceCgList=[];
                $scope.Filedata.items=[];

                $scope.savedata=data.rst.data.savedata;
                $scope.sdef.sumsapinvoice=data.rst.data.sumsapinvoice.toFixed(2);
                $scope.sdef.amountoffandchd=data.rst.data.amountoffandchd.toFixed(2);
                $scope.sdef.amountofsapkpzje=data.rst.data.amountofsapkpzje.toFixed(2);
                if($scope.sdef.selectby=="退货订单号"){
                    $scope.sdef.redinvoice=($scope.sdef.sumsapinvoice- $scope.sdef.amountoffandchd).toFixed(2)*1;
                    $scope.sdef.invoiceamount='';
                }else{
                    console.log($scope.sdef.sumsapinvoice- $scope.sdef.amountoffandchd)
                    $scope.sdef.invoiceamount=($scope.sdef.sumsapinvoice- $scope.sdef.amountoffandchd).toFixed(2)*1;
                    $scope.sdef.redinvoice='';
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });

    }
    $scope.agreen = function () {

        if ($scope.sdef.isfpandxsht =="否"||$scope.sdef.isfpandxsht =="") {
            $scope.invoiceCgList=[];
            for(var i=0;i<ary1.length;i++){
                var obj={};
                obj.MATNR=ary1[i].MATNR;
                obj.POSNR=ary1[i].POSNR;
                obj.ZZKPMS=ary1[i].ZZKPMS;
                obj.ZZGKXH=ary1[i].ZZGKXH;
                obj.MEINS=ary1[i].MEINS;
                obj.xqnum=ary1[i].xqnum;
                obj.KZWI1=ary1[i].KZWI1;
                obj.hsje=ary1[i].hsje;
                obj.identShow=ary1[i].identShow;
                $scope.invoiceCgList.push(obj)
            }
            /*if($scope.invoiceCgList.length==0&&$scope.Filedata.items.length==0){
                for(var i=0;i<$scope.glCgList.length;i++){
                    ary[i].hsje=$scope.glCgList[i].sapinvoice;
                }
            }*/
            $scope.canDel = false;
            $scope.canAdd = false;
            $scope.canDown = true;
            $scope.invoiceShow = false;
            $scope.invoiceList = false;
           /* $scope.invoiceCgList =ary;*/

            $scope.Filedata.items = [];
            for(var k=0;k<$scope.glCgList.length;k++){
                $scope.invoiceCgList[k].xqnum=$scope.glCgList[k].xqnum;
            }
        } else if ($scope.sdef.isfpandxsht =="是") {
            $scope.canDel = true;
            $scope.canAdd = true;
            $scope.canDown = false;
            $scope.invoiceShow = false;
            $scope.invoiceList = true;
            console.log(ary1)
            $scope.invoiceCgList = ary1;
            for(var b=0;b<$scope.glCgList.length;b++){
                $scope.invoiceCgList[b].xqnum=$scope.glCgList[b].xqnum;
            }
        }
    }
    $scope.djChange=function(id){
        if($scope.invoiceCgList[id].xqnum&&$scope.invoiceCgList[id].hsje){
            $scope.invoiceCgList[id].KZWI1=($scope.invoiceCgList[id].hsje/$scope.invoiceCgList[id].xqnum).toFixed(2);
        }else{
            $scope.invoiceCgList[id].KZWI1="";
        }
    }
    $scope.invoiceAdd = function () {
        var obj = {MATNR:'',ZZKPMS: '', ZZGKXH: '', MEINS: '', xqnum: '', KZWI1: '', rate: '', hsje: '',identShow:true};
        $scope.invoiceCgList.push(obj);
    };
    $scope.invoiceDel = function (idx) {
        if ($scope.invoiceCgList.length <= 0) {
            swal("不能再删了！", "", "warning");
            return false;
        }
        $scope.invoiceCgList.splice(idx, 1);
    };
    $scope.filedataDel = function (idx) {
        if ($scope.Filedata.items.length<=0) {
            swal("不能再删了！", "", "warning");
            return false;
        }
        $scope.Filedata.items.splice(idx, 1);
    };
    $scope.allDell = function ($event) {
        var checkbox = $event.target;
        $scope.dellAll = checkbox.checked ? true : false;
        if ($scope.dellAll) {
            for(var i=0;i<$scope.invoiceCgList.length;i++){
                $scope.invoiceCgList[i].rightAdd = true;
            }
        } else {
            for(var j=0;j<$scope.invoiceCgList.length;j++){
                delete  $scope.invoiceCgList[j].rightAdd;
            }
        }
    };
    $scope.checkDel = function(idx){
        var parent = $("#cgList").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.invoiceCgList){
                $scope.invoiceCgList[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.invoiceCgList){
                delete  $scope.invoiceCgList[idx].rightAdd;
            }

        }
    }
    $scope.xsfdDel = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.invoiceCgList.forEach(function(item,index){
            if(item.rightAdd){
                if($scope.sdef.isfpandxsht =="是"){
                    delete  ary1[index].rightAdd;
                }else{
                    delete  $scope.invoiceCgList[index].rightAdd;
                }

            }else{
                rightArr.push(item)
            }
        });
        $scope.invoiceCgList = rightArr;
        /*if($("#allCheck").attr("checked") == "checked"){
         $("#allCheck").removeAttr("checked");
         for(var x in $scope.invoiceCgList){
         delete  $scope.invoiceCgList[x].rightAdd;
         }
         $scope.all=false;
         }*/

    }
    //下载
    $scope.mkinvoic2Excel=function(){
        var path = '/mkinvoice/exportexcel2?'+'id='+$scope.processId;
        window.open(path);
    }
    //收据信息
    $scope.billBox = function () {
        if($scope.sdef.cusname==""){
            swal("请先选择客户名称！", "", "warning");
            return false;
        }
        $("#billBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#billBox").dialog("open");
        $scope.billSelect = function (contractno,htje,yksjje,stomerid,tradername,traderlogin,NAME1,kpcusid) {
            console.log(stomerid)
            console.log($scope.sdef.KUNNR)
            if(stomerid!=$scope.sdef.KUNNR){
                swal("所选合同中的客户编码与基本信息中的客户编码不一致！", "", "warning");
                return false;
            }
            $scope.sdef.NAME1=NAME1;
            $scope.sdef.kpcusid=kpcusid;
            var para= {KUNNR:$scope.sdef.kpcusid};
            var nameCheck=mkinvoice.name1Data(para);
            nameCheck.success(function(data){
                if(data.code==200){
                    if(data.rst.data.items.length==0){
                        swal("该客户的开票信息尚未维护！", "", "warning");
                        $scope.sdef.nsrnum = "";
                        $scope.sdef.adress = "";
                        $scope.sdef.tel = "";
                        $scope.sdef.bank = "";
                        $scope.sdef.account = "";
                        $scope.sdef.NAME1="";
                        $("#billBox").dialog("destroy");
                        $(".ui-dialog").remove();
                        return false;
                    }
                    if(data.rst.data.items.length>0){
                        if(data.rst.data.items[0].koinh==''){
                            swal("该客户的开票信息尚未维护！", "", "warning");
                            $scope.sdef.nsrnum = "";
                            $scope.sdef.adress = "";
                            $scope.sdef.tel = "";
                            $scope.sdef.bank = "";
                            $scope.sdef.account = "";
                            $scope.sdef.NAME1="";
                            $("#billBox").dialog("destroy");
                            $(".ui-dialog").remove();
                            return false;
                        }
                        if($scope.sdef.ZFPLX&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
                            if(data.rst.data.items[0].nsrnum==''||data.rst.data.items[0].adress==''||data.rst.data.items[0].tel==''||data.rst.data.items[0].bank==''||data.rst.data.items[0].account==''){
                                swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                                $scope.sdef.cusname='';
                                $("#billBox").dialog("destroy");
                                $(".ui-dialog").remove();
                                return false;
                            }
                        }
                        $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                        $scope.sdef.adress = data.rst.data.items[0].adress;
                        $scope.sdef.tel = data.rst.data.items[0].tel;
                        $scope.sdef.bank = data.rst.data.items[0].bank;
                        $scope.sdef.account = data.rst.data.items[0].account;
                    }
                }
            });
            $scope.recebillList[0].contractno=contractno;
            $scope.recebillList[0].htje=htje;
            $scope.recebillList[0].yksjje=yksjje;
            $scope.recebillList[0].tradername=tradername;
            $scope.recebillList[0].traderlogin=traderlogin;
            $("#billBox").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }
    $scope.sjjeNum=function(sjje,htje,yksjje,index){
        if(sjje<0){
            swal("收据金额必须大于0！", "", "warning");
            $scope.recebillList[index].sjje='';
            return false;
        }
        if(sjje>eval(htje)-eval(yksjje)){
            swal({title: "收据金额大于合同金额-已开收据金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "确定",
                    confirmButtonText: "取消" },
                function() {
                    $scope.$apply(function () {
                        $scope.recebillList[index].sjje='';
                        $scope.sdef.invoiceamount="";
                    });
                }
            );
        }
            $scope.sdef.invoiceamount=$scope.recebillList[index].sjje;

    }
    $scope.addData = function (sdef, glCgList, invoiceCgList,filedata,recebillList, statue) {
        var doc = {}, param = {};
        var requiredObj2 = $scope.mkinvoiceForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })
        console.log(requiredObj2)
        if(!$scope.mkinvoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.glCgList.length>0){
            for(var g=0;g<$scope.glCgList.length;g++){
                if($scope.glCgList[g].xqnum===""){
                    swal("列表信息部分的需求数量不能为空", "", "warning");
                    return false;
                }
            }
            if($scope.sdef.selectby=="退货订单号"){
                if($scope.sdef.redinvoice<0){
                    swal("红色发票金额小于0，不能进行开票", "", "warning");
                    return false;
                }
            }else{
                if($scope.sdef.invoiceamount<0){
                    swal("发票总金额小于0，不能进行开票", "", "warning");
                    return false;
                }
            }
            doc.ary = ary1;
        }
        doc.sdef = sdef;
        doc.sdef.totalproductout = $scope.totalproductout;   //放货总金额
        doc.htxq = glCgList;
        doc.savedata = $scope.savedata;
        doc.recebill= recebillList;
        doc.htxx = $scope.contractMsgList;
        if(filedata.length>0){
            doc.billdetail = filedata;
        }else {
            doc.billdetail = invoiceCgList;
        }
        param.doc = doc;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(glCgList.length>0){
            for(var j=0;j<glCgList.length;j++){
                glCgList[j].rate=$scope.sdef.rate;
            }
            for(var i=0;i<glCgList.length;i++){
                if(!glCgList[i].contractno){
                    swal("销售合同号为必填项！", "", "warning");
                    return;
                }
                if(glCgList[i].xqnum=="0"&&glCgList[i].identShow){
                    swal("需求数量不能为0！", "", "warning");
                    return;
                }
                if(glCgList[i].xqnum===""){
                    swal("需求数量不能为空！", "", "warning");
                    return;
                }
                if(glCgList[i].tqkpno>0){
                    glCgList[i].logo="T";
                }else{
                    glCgList[i].logo="";
                }
            }
            for(var x in glCgList){
                console.log(glCgList[x].VKORG)
                if(glCgList[x].VKORG == '9001'){
                    swal("销售合同号为"+glCgList[x].VBELN+"的销售主体为9001，不能开具增值税发票", "", "warning");
                    return;
                }
                if(glCgList[x].VKORG == '9001' || glCgList[x].VKORG == '9000'){
                    glCgList[x].xszz1 = true;
                    glCgList[x].xszz2 = false;
                }else if( glCgList[x].VKORG == '1000' || glCgList[x].VKORG == '2000' || glCgList[x].VKORG == '3000'){
                    glCgList[x].xszz2 = true;
                    glCgList[x].xszz1 = false;
                }
            }
            if($scope.flag1==true){
                swal("请先计算SAP开票金额！", "", "warning");
                return;
            }
        }




        if (statue == "save") {
            var newParam = null;
            newParam = angular.copy(param);
            if(param.doc.htxq.length > 0){
                _.forEach(newParam.doc.htxq,function(val, key){
                    newParam.doc.htxq[key] = {key: $scope.glCgList[key].custKey, xqnum: newParam.doc.htxq[key].xqnum,traderlogin: newParam.doc.htxq[key].traderlogin}
                })
            }
            var addInside = mkinvoice.addInside(newParam);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    $scope.mkinvoiceRready=true;
                    $scope.canAdd=true;
                    $scope.invoiceList=true;
                    if($scope.contractShow){
                        $scope.saveDown=true;
                    }

                    swal("保存成功", "", "success");
                    // $window.location.reload();
                    //swal({title: "保存成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });
                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            if($scope.contractShow){
                if(glCgList.length==0){
                    swal("列表信息为必填项！", "", "warning");
                    return;
                }
                if($scope.invoiceCgList.length==0&&$scope.Filedata.items.length==0){
                    swal("发票信息部分必填", "", "warning");
                    return false;
                }
                var glCgListBox=[];
                for(var i=0;i<glCgList.length;i++){
                    if(!glCgList[i].contractno){
                        swal("销售合同号为必填项！", "", "warning");
                        return;
                    }
                    if(glCgList[i].xqnum=="0"&&glCgList[i].identShow){
                        swal("需求数量不能为0！", "", "warning");
                        return;
                    }
                    if(glCgList[i].xqnum===""){
                        swal("需求数量不能为空！", "", "warning");
                        return;
                    }
                    if(glCgList[i].tqkpno>0){
                        glCgListBox.push(glCgList[i].MTART);
                        glCgList[i].logo="T";
                    }else{
                        glCgList[i].logo="";
                    }
                }
                // for(var f=0;f<glCgListBox.length;f++){
                //     if(glCgListBox[0]!=glCgListBox[f]){
                //         swal("提前开票物料类型不一致！", "", "warning");
                //         return;
                //     }
                // }
                for(var x in glCgList){
                    console.log(glCgList[x].VKORG)
                    if(glCgList[x].VKORG == '9001'){
                        swal("销售合同号为"+glCgList[x].VBELN+"的销售主体为9001，不能开具增值税发票", "", "warning");
                        return;
                    }
                    if(glCgList[x].VKORG == '9001' || glCgList[x].VKORG == '9000'){
                        glCgList[x].xszz1 = true;
                        glCgList[x].xszz2 = false;
                    }else if( glCgList[x].VKORG == '1000' || glCgList[x].VKORG == '2000' || glCgList[x].VKORG == '3000'){
                        glCgList[x].xszz2 = true;
                        glCgList[x].xszz1 = false;
                    }
                }
                if($scope.flag1==true){
                    swal("请先计算SAP开票金额！", "", "warning");
                    return;
                }
                doc.ary = ary1;
            }
            if(glCgList){
                $scope.xszz1Box=false;
                $scope.xszz2Box=false;
                for(var j=0;j<glCgList.length;j++){
                    if(glCgList[j].xszz1 == true){
                        $scope.xszz1Box=true;
                    }else{
                        if(glCgList[j].tqkpno>0&&(!glCgList[j].ZPC_NUM)){
                            swal("供应商订单号不能为空！", "", "warning");
                            return false;
                        }
                    }
                    console.log(glCgList[j].xszz2,glCgList[j].xszz1)
                    if(glCgList[j].xszz2 == true){
                        $scope.xszz2Box=true;
                    }
                    /* console.log(glCgList[j].xszz1,$scope.xszz1Box)
                     console.log(glCgList[j].xszz2,$scope.xszz2Box)*/
                }
                if($scope.xszz1Box == true  && $scope.xszz2Box == true){
                    swal('销售组织，9000或9001不能与1000/2000/3000同时并存','','warning');
                    return false;
                }
            }
            $scope.applyFn = function (selIndex) {
                if( selIndex !== -1 ) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var checkwebdata = mkinvoice.checkwebdata(param);
                checkwebdata.success(function(data){
                    if(data.code == 200){
                        if(data.rst.data.length > 0){
                            for(var x in data.rst.data){
                                swal({
                                    title:'',
                                    text:data.rst.msg + ',合同号为'+ data.rst.data[x].contractno+',',
                                    type:'warning'
                                });
                                return false;
                            }
                        }else{
                            console.log($scope.glCgList, 'savepress');

                            var newParam = null;
                            newParam = angular.copy(param);
                            if(param.doc.htxq.length > 0){
                                _.forEach(newParam.doc.htxq,function(val, key){
                                    newParam.doc.htxq[key] = {key: $scope.glCgList[key].custKey, xqnum: newParam.doc.htxq[key].xqnum,traderlogin: newParam.doc.htxq[key].traderlogin}
                                })
                            }
                            var applyAdd = mkinvoice.applyAdd(newParam);
                            applyAdd.success(function (data) {
                                if (data.code == 200) {
                                    $scope.mkinvoiceRready=true;
                                    $scope.canAdd=true;
                                    $scope.invoiceList=true;
                                    /* $scope.mkinvoiceOk=true;*/
                                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });
                                    window.location.href = '/index.html#/mkinvoiceCheck';
                                } else {
                                    swal(data.msg, "", "warning");
                                }
                            });
                        }
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });

            };
            var addInside = mkinvoice.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    var viewCont = mkinvoice.applyView({processId: param.processId , nodeId:  param.nodeId});
                    viewCont.success(function (data) {
                        if (data.code == 200) {
                            param.doc.sdef.XBLNR=data.rst.doc.model.XBLNR;
                            if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' && data.rst.candidates[0].coop!=='and')) {
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
                        }
                    }).error(function (error) {
                        swal({
                            title:'',
                            text:error,
                            type:"error"
                        })
                    });

                } else {
                    swal(data.msg, "", "warning");
                }
            });
           /* var paramm={doc:doc};
            var checkcontractnofromprocess = mkinvoice.checkcontractnofromprocess(paramm);
            checkcontractnofromprocess.success(function (data) {
                if(data.code==200){
// 提交
                    $scope.applyFn = function (selIndex) {
                        if( selIndex !== -1 ) {
                            $("#approversDialog").dialog("destroy");
                            $(".ui-dialog").remove();
                            var selObj = $scope.receivers[selIndex];
                            param.candidates[0].receivers = [selObj];
                        }
                        var checkwebdata = mkinvoice.checkwebdata(param);
                        checkwebdata.success(function(data){
                            if(data.code == 200){
                                if(data.rst.data.length > 0){
                                    for(var x in data.rst.data){
                                        swal({
                                            title:'',
                                            text:data.rst.msg + ',合同号为'+ data.rst.data[x].contractno+',',
                                            type:'warning'
                                        });
                                        return false;
                                    }
                                }else{
                                    console.log($scope.glCgList, 'savepress');

                                    var newParam = null;
                                    newParam = angular.copy(param);
                                    if(param.doc.htxq.length > 0){
                                        _.forEach(newParam.doc.htxq,function(val, key){
                                            newParam.doc.htxq[key] = {key: $scope.glCgList[key].custKey, xqnum: newParam.doc.htxq[key].xqnum,traderlogin: newParam.doc.htxq[key].traderlogin}
                                        })
                                    }
                                    var applyAdd = mkinvoice.applyAdd(newParam);
                                    applyAdd.success(function (data) {
                                        if (data.code == 200) {
                                            $scope.mkinvoiceRready=true;
                                            $scope.canAdd=true;
                                            $scope.invoiceList=true;
                                            /!* $scope.mkinvoiceOk=true;*!/
                                            swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });
                                            window.location.href = '/index.html#/mkinvoiceCheck';
                                        } else {
                                            swal(data.msg, "", "warning");
                                        }
                                    });
                                }
                            }else {
                                swal(data.msg, "", "warning");
                            }
                        });

                    };
                    var addInside = mkinvoice.addInside(param);
                    addInside.success(function (data) {
                        if (data.code == 200) {
                            param.processId = $scope.processId = data.rst.processId;
                            param.nodeId = $scope.nodeId = data.rst.nodeId;
                            var viewCont = mkinvoice.applyView({processId: param.processId , nodeId:  param.nodeId});
                            viewCont.success(function (data) {
                                if (data.code == 200) {
                                    param.doc.sdef.XBLNR=data.rst.doc.model.XBLNR;
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
                                }
                            }).error(function (error) {
                                swal({
                                    title:'',
                                    text:error,
                                    type:"error"
                                })
                            });

                        } else {
                            swal(data.msg, "", "warning");
                        }
                    });
                }else {
                    swal(data.msg, "", "warning");
                    return;
                }
            })*/


        }
    }

}]);
mkinvoiceApp.controller('mkinvoiceViewCtrl', ['$scope', '$stateParams', '$http', 'mkinvoiceServices', function ($scope, $stateParams,$http, mkinvoice) {
    if($stateParams.recebill=="2"){
        $scope.receBill=true;
    }else{
        $scope.receBill=false;
    }
    $scope.sdef = {};
    $scope.glCgList = [];
    $scope.invoiceCgList = [];
    $scope.thdd = [];
    //计量单位
    var meinsBoxPromise = mkinvoice.enum();
    meinsBoxPromise.success(function(data){
        if(data.code==200){
            $scope.meinsBox=data.rst.data.enum.MEINS;
        }
    })
    var viewCont = mkinvoice.viewInside({_id:$stateParams.id});
    viewCont.success(function (data) {
        if (data.code == 200) {
            $scope.sdef =data.rst.data.model;
           /* $scope.fpje = eval($scope.sdef.invoiceamount).toFixed(2);   /!*发票金额*!/
            $scope.sumhsje = eval($scope.sdef.sumhsje).toFixed(2);   /!*含税金额*!/
            $scope.sumsapinvoice = eval($scope.sdef.sumsapinvoice).toFixed(2);   /!*SAP开票金额合计*!/
            $scope.invoiceamount = eval($scope.sdef.invoiceamount).toFixed(2);   /!*底部含税金额*!/
            */
            for(var r=0;r<data.rst.data.htxq.length;r++){
                if(data.rst.data.htxq[r].identShow===undefined){
                    data.rst.data.htxq[r].identShow=true;
                }
            }
            $scope.glCgList = data.rst.data.htxq||[];

            $scope.contractMsgList = data.rst.data.htxx;
            $scope.recebillList = data.rst.data.recebill;
            $scope.thdd = data.rst.data.thdd;
            if($scope.glCgList.length){
                if($scope.glCgList[0].cxfph){
                    $scope.cxhiden=false;
                }else{
                    $scope.cxhiden=true;
                }
            }


            /*$scope.recebillClick=function(){
                window.location.href = '/index.html#/mkinvoiceView/'+$stateParams.id+'?recebill=2';

            }*/
            for(var q=0;q<data.rst.data.billdetail.length;q++){
                if(data.rst.data.billdetail[q].identShow===undefined){
                    data.rst.data.billdetail[q].identShow=true;
                }
            }
            $scope.invoiceCgList = data.rst.data.billdetail;
            if($scope.invoiceCgList.length>0){
                $scope.downShow=false;
            }else{
                $scope.downShow=true;
            }
            if ($scope.sdef.ZFPLX == "收据") {
                $scope.contractShow = false;
                $scope.contract1Show = true;
            } else {
                $scope.contractShow = true;
                $scope.contract1Show = false;
            }
        }
        $scope.mkinvoicExcel=function(){
            var path = '/mkinvoice/exportexcel?'+'id='+$stateParams.id;
            console.log(path)
            window.open(path);
        }
        $scope.addData=function(){
            var doc = {}, param = {};
            doc.sdef = $scope.sdef;
            doc.htxq = $scope.glCgList;
            doc.recebill= $scope.recebillList;
            doc.billdetail = $scope.invoiceCgList;
            doc.thdd = $scope.thdd;
            doc.sdef.task="D";
            doc.htxx = $scope.contractMsgList;
            param.doc=doc;
            param.processId = $scope.processId;
            param.nodeId = $scope.nodeId;
            // 提交
            $scope.applyFn = function (selIndex) {
                if( selIndex !== -1 ) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var applyAdd = mkinvoice.applyAdd(param);

                applyAdd.success(function (data) {
                    if (data.code == 200) {
                        statuschange  = mkinvoice.statuschange ({XBLNR:$scope.sdef.XBLNR});
                        statuschange.success(function (data){
                            if (data.code == 200){
                                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });

                            }else{
                                swal(
                                    {
                                        title: "",
                                        text: data.msg,
                                        type: "warning",
                                    })
                            }
                                })
                    } else {
                        swal(
                            {
                                title: "",
                                text: data.msg,
                                type: "warning",
                            })
                    }
                });
            };
            var addInside = mkinvoice.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    var viewCont = mkinvoice.applyView({processId: param.processId , nodeId:  param.nodeId});
                    viewCont.success(function (data) {
                        if (data.code == 200) {
                            param.doc.sdef.XBLNR=data.rst.doc.model.XBLNR;
                            if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' && data.rst.candidates[0].coop!=='and')) {
                                $scope.receivers = data.rst.candidates[0].receivers;
                                param.candidates = data.rst.candidates;
                                $("#approversDialog").dialog({
                                    autoOpen: false,
                                    modal: true,
                                    width: 500,
                                    close: function() {
                                        $http.post('/mkinvoice/cancel', {processId: param.processId,nodeId:param.nodeId}).success(function (data) {
                                            if (data.code == 200) {
                                                console.log($scope.dataList);
                                            } else {
                                                //swal(data.msg, "", "warning");
                                            }
                                        }).error(function (data) {
                                            alert('请求超时，服务器错误');
                                        });
                                    }
                                });
                                $("#approversDialog").dialog("open");
                            } else {

                                $scope.applyFn(-1);
                            }
                        }
                    }).error(function (error) {
                        swal({
                            title:'',
                            text:error,
                            type:"error"
                        })
                    });

                } else {
                    swal(data.msg, "", "warning");
                }
            });




        }
    })
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = mkinvoice.getprocesslog({type: 'KPSQ', id: vm.sdef.XBLNR,gettype:'group'}); // 直接取值数据中 申请人（proposer）
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

mkinvoiceApp.controller('mkinvoiceCtrl', ['$scope', '$stateParams', 'mkinvoiceServices', function ($scope, $stateParams, mkinvoice) {
    $scope.sdef = {};
    $scope.glCgList = [];
    $scope.invoiceCgList = [];
    $scope.recebillList = [];
    $scope.savedata = [];
    $scope.contractMsgList = [];
    $scope.thdd = [];
    //计量单位
    var meinsBoxPromise = mkinvoice.enum();
    meinsBoxPromise.success(function(data){
        if(data.code==200){
            $scope.meinsBox=data.rst.data.enum.MEINS;
        }
    })
    //下载
    $scope.mkinvoic2Excel=function(){
        var path = '/mkinvoice/exportexcel2?'+'id='+$stateParams.processId;
        window.open(path);
    }
    var mkParam = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(mkParam, {myflag: "mysubscriber" })
    }

    var viewCont = mkinvoice.applyView(mkParam);
    viewCont.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.sdef=data.rst.doc.model;
            data.rst.doc.htxq = data.rst.doc.htxq ? data.rst.doc.htxq : data.rst.doc['htxq'] = [];
            for(var r=0;r<data.rst.doc.htxq.length;r++){
                if(data.rst.doc.htxq[r].identShow===undefined){
                    data.rst.doc.htxq[r].identShow=true;
                }
            }
             $scope.glCgList=data.rst.doc.htxq;
            $scope.contractMsgList = data.rst.doc.htxx;
            $scope.savedata=data.rst.doc.savedata;
            $scope.thdd =data.rst.doc.thdd;
            $scope.totalproductout = 0;
            $scope.contractMsgList.forEach(function(item){
                return $scope.totalproductout += parseFloat(item.zdfhje);
            });
            for(var w=0;w<data.rst.doc.billdetail.length;w++){
                if(data.rst.doc.billdetail[w].identShow===undefined){
                    data.rst.doc.billdetail[w].identShow=true;
                }
            }
            $scope.invoiceCgList=data.rst.doc.billdetail;
            $scope.recebillList = data.rst.doc.recebill;
            if($scope.sdef.task=="D"){
                $scope.titelShow=false;
            }else{
                $scope.titelShow=true;
            }
            if( $scope.invoiceCgList.length>0){
                $scope.downShow=false;
            }else{
                $scope.downShow=true;
            }
            if ($scope.sdef.ZFPLX == "收据") {
                $scope.contractShow = false;
                $scope.contract1Show = false;
            } else {
                $scope.contractShow = true;
                $scope.contract1Show = true;
            }
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
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
        var doc={};
        doc.sdef = $scope.sdef;
        doc.sdef.totalproductout = $scope.totalproductout;   //放货总金额
        doc.htxq = $scope.glCgList;
        doc.savedata = $scope.savedata;
        doc.recebill= $scope.recebillList;
        doc.htxx = $scope.contractMsgList;
        doc.billdetail = $scope.invoiceCgList;
        doc.thdd = $scope.thdd;
        param.doc = doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        var addInside = mkinvoice.addInside(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function (applyObj) {
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        var customerAgree = mkinvoice.agree(param);
        customerAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回开票申请待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=开票申请&&controllercode=KPSQ';
                });
            }else {
                swal({
                    title:'',
                    text:data.msg,
                    type:'error'
                });
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
        var disagree = mkinvoice.disagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回开票申请待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=开票申请&&controllercode=KPSQ';
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
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        var cancel = mkinvoice.cancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=开票申请&&controllercode=KPSQ'; });
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
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        var recall = mkinvoice.recall(param);
        recall.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "召回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回开票申请待办",
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

mkinvoiceApp.controller('mkinvoiceEdit', ['$scope', '$window', '$stateParams', 'mkinvoiceServices', function ($scope, $window, $stateParams, mkinvoice) {
    $scope.sdef = {};
    var ary=[];
    var ary1=[];
    $scope.a = {};
    var dataList = $scope.dataList = [];
    $scope.Filedata={};
    $scope.Filedata.items=[];
    $scope.glCgList = [];
    $scope.invoiceCgList = [];
    $scope.saveDown=false;
  var typeBox="";

    $scope.thdd = [];

    //计量单位
    var meinsBoxPromise = mkinvoice.enum();
    meinsBoxPromise.success(function(data){
        if(data.code==200){
            $scope.meinsBox=data.rst.data.enum.MEINS;
        }
    })
    $scope.recebillList = [{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
    //下载
    $scope.mkinvoic2Excel=function(){
        var path = '/mkinvoice/exportexcel2?'+'id='+$scope.processId;
        window.open(path);
    }
    var mkParam = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(mkParam, {myflag: "mysubscriber" })
    }

    var mkinvoiceData = mkinvoice.applyView(mkParam);
    mkinvoiceData.success(function(data){
        if (data.code == 200) {
            $scope.sdef = data.rst.doc.model;
            typeBox=$scope.sdef.ZFPLX;
            data.rst.doc.htxq = data.rst.doc.htxq ? data.rst.doc.htxq : data.rst.doc['htxq'] = [];
            for(var r=0;r<data.rst.doc.htxq.length;r++){
                if(data.rst.doc.htxq[r].identShow===undefined){
                    data.rst.doc.htxq[r].identShow=true;
                }
            }
            $scope.glCgList = data.rst.doc.htxq||[];
            $scope.oldglCgList = angular.copy($scope.glCgList)
            if($scope.glCgList.length){
                $scope.flag1=true;
                $scope.saveDown=true;
            }
            $scope.thdd = data.rst.doc.thdd;
            $scope.contractMsgList = data.rst.doc.htxx;
            $scope.processId=data.rst.processId;
            $scope.nodeId=data.rst.nodeId;

            $scope.totalproductout = 0;
            $scope.contractMsgList.forEach(function(item){
                return $scope.totalproductout += parseFloat(item.zdfhje);
            });
           /* $scope.invoiceCgList = data.rst.doc.billdetail;*/
            for(var s=0;s<data.rst.doc.billdetail.length;s++){
                if(data.rst.doc.billdetail[s].identShow===undefined){
                    data.rst.doc.billdetail[s].identShow=true;
                }
            }
            $scope.invoiceCgList=data.rst.doc.billdetail;
            for(var t=0;t<data.rst.doc.ary.length;t++){
                if(data.rst.doc.ary[t].identShow===undefined){
                    data.rst.doc.ary[t].identShow=true;
                }
            }
            ary1= data.rst.doc.ary;
            if($scope.sdef.isfpandxsht =="否"){
                $scope.invoiceList= false;
                $scope.canDown= true;
            }else{
                $scope.invoiceList= true;
                $scope.canDown= false;
            }
            $scope.recebillList = data.rst.doc.recebill;
            if ($scope.sdef.ZFPLX == "收据") {
                $scope.contractShow = false;
                $scope.contract1Show = true;
            } else {
                $scope.contractShow = true;
                $scope.contract1Show = false;
            }
            if($scope.sdef.ZFPLX=="增值税普通发票"||$scope.sdef.ZFPLX=="服务费增值税普通发票"||$scope.sdef.ZFPLX=="收据"){
                $scope.requireShow=false;
            }else{
                $scope.requireShow=true;
            }
        }
    }).error(function (error) {
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });

    $scope.billingName  = function (oldName,cus) {
        if(oldName&&cus){
            if($scope.sdef.ZFPLX!="收据"){
                swal({title: "更改用户名称会清空列表信息和发票信息！",
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定" },
                    function(){
                        $scope.glCgList=[];
                        $scope.contractMsgList=[];
                        $scope.invoiceCgList=[];
                        $scope.Filedata.items=[];
                        $scope.sdef.sumhsje='';
                        $scope.totalproductout='';
                        $scope.sdef.isfpandxsht='';
                        ary1=[];
                        $("#nameBox").dialog({
                            autoOpen: false,
                            width: 750,
                            modal: true
                        });
                        $("#nameBox").dialog("open");
                    }
                );
            }else{
                swal({title: "更改用户名称会清空列收据信息！",
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定" },
                    function(){
                        $scope.recebillList=[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                        $("#nameBox").dialog({
                            autoOpen: false,
                            width: 750,
                            modal: true
                        });
                        $("#nameBox").dialog("open");
                    }
                );
            }
        }else{
            $("#nameBox").dialog({
                autoOpen: false,
                width: 750,
                modal: true
            });
            $("#nameBox").dialog("open");
        }
        $scope.nameSelect = function (cusname,par,KTOKD) {
            if(KTOKD=="ZC04"){
                swal("该客户为非业务客户！", "", "warning");
                return false;
            }
            if(processing){
                swal('审批中不可用改客户','','warning') ;return
            }
            $scope.sdef.cusname=cusname;
            $scope.sdef.KUNNR=par;
            /* var para= {KUNNR:par};
             var nameCheck=mkinvoice.name1Data(para);
             nameCheck.success(function(data){
             if(data.code==200){
             if(cus){
             $scope.sdef.cusname=cusname;
             $scope.sdef.KUNNR=par;
             }

             if(data.rst.data.items.length==0){
             swal("该客户的开票信息尚未维护！", "", "warning");
             if(cus){
             $scope.sdef.cusname="";
             }
             $scope.sdef.nsrnum = "";
             $scope.sdef.adress = "";
             $scope.sdef.tel = "";
             $scope.sdef.bank = "";
             $scope.sdef.account = "";
             $scope.sdef.NAME1="";
             return false;
             }
             if(data.rst.data.items.length>0){
             if(data.rst.data.items[0].koinh==''){
             swal("该客户的开票信息尚未维护！", "", "warning");
             if(cus){
             $scope.sdef.cusname="";
             }
             $scope.sdef.nsrnum = "";
             $scope.sdef.adress = "";
             $scope.sdef.tel = "";
             $scope.sdef.bank = "";
             $scope.sdef.account = "";
             $scope.sdef.NAME1="";
             return false;
             }
             if($scope.sdef.ZFPLX&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
             if(data.rst.data.items[0].nsrnum==''||data.rst.data.items[0].adress==''||data.rst.data.items[0].tel==''||data.rst.data.items[0].bank==''||data.rst.data.items[0].account==''){
             swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
             $scope.sdef.cusname='';
             return false;
             }
             }
             $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
             $scope.sdef.adress = data.rst.data.items[0].adress;
             $scope.sdef.tel = data.rst.data.items[0].tel;
             $scope.sdef.bank = data.rst.data.items[0].bank;
             $scope.sdef.account = data.rst.data.items[0].account;
             $scope.sdef.NAME1=data.rst.data.items[0].koinh;
             }
             }
             });*/
            $("#nameBox").dialog("destroy");
            $(".ui-dialog").remove();
        };
    };

    $scope.type = function (type) {
        if($scope.glCgList.length>0){
            if(type!=typeBox){
                if( typeBox ="增值税专用发票"){
                    if(type!="增值税普通发票"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        $scope.sdef.ZFPLX=typeBox;
                        $scope.contractShow = true;
                        $scope.contract1Show = false;
                        $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                        $scope.sdef.invoiceamount = "";
                        return false;
                    }else{
                        typeBox=type;
                    }
                }else if(typeBox ="增值税普通发票"){
                    if(type!="增值税专用发票"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        $scope.sdef.ZFPLX=typeBox;
                        $scope.contractShow = true;
                        $scope.contract1Show = false;
                        $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                        $scope.sdef.invoiceamount = "";
                    }else{
                        typeBox=type;
                    }
                }else if(typeBox ="服务发票"){
                    if(type!="服务费增值税普通发票"&&type!="服务费增值税专用发票"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        scope.sdef.ZFPLX=typeBox;
                        scope.contractShow = true;
                        scope.contract1Show = false;
                        $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                        $scope.sdef.invoiceamount = "";
                    }else{
                        typeBox=type;
                    }
                } else if(typeBox ="服务费增值税普通发票"){
                    if(type!="服务发票"&&type!="服务费增值税专用发票"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        scope.sdef.ZFPLX=typeBox;
                        scope.contractShow = true;
                        scope.contract1Show = false;
                        $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                        $scope.sdef.invoiceamount = "";
                    }else{
                        typeBox=type;
                    }
                }else if(typeBox ="服务费增值税专用发票"){
                    if(type!="服务发票"&&type!="服务费增值税普通发票"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        scope.sdef.ZFPLX=typeBox;
                        scope.contractShow = true;
                        scope.contract1Show = false;
                        $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                        $scope.sdef.invoiceamount = "";
                    }else{
                        typeBox=type;
                    }
                }else if(typeBox ="资金往来专用发票"){
                    if(type!="收据"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        scope.sdef.ZFPLX=typeBox;
                        $scope.contractShow = false;
                        $scope.contract1Show = true;
                        $scope.glCgList = [];
                        $scope.contractMsgList = [];
                        $scope.sdef.sumsapinvoice = "";
                        $scope.totalproductout = "";
                        $scope.sdef.invoiceamount = "";
                        $scope.sdef.redinvoice = "";
                        $scope.sdef.amountoffandchd = "";
                        $scope.sdef.amountofsapkpzje = "";

                        $scope.sdef.isfpandxsht = "";
                        $scope.invoiceCgList = [];
                        $scope.Filedata.items = [];
                    }else{
                        typeBox=type;
                    }
                }else if(typeBox ="收据"){
                    if(type!="资金往来专用发票"){
                        swal("所选发票类型税率与之前的发票类型税率不相等！", "", "warning");
                        scope.sdef.ZFPLX=typeBox;
                        $scope.contractShow = false;
                        $scope.contract1Show = true;
                        $scope.glCgList = [];
                        $scope.contractMsgList = [];
                        $scope.sdef.sumsapinvoice = "";
                        $scope.totalproductout = "";
                        $scope.sdef.invoiceamount = "";
                        $scope.sdef.redinvoice = "";
                        $scope.sdef.amountoffandchd = "";
                        $scope.sdef.amountofsapkpzje = "";
                        $scope.sdef.isfpandxsht = "";
                        $scope.invoiceCgList = [];
                        $scope.Filedata.items = [];
                    }else{
                        typeBox=type;
                    }
                }
            }
        }else{
            typeBox=type;
            if (type=="收据") {
                $scope.contractShow = false;
                $scope.contract1Show = true;
                $scope.glCgList = [];
                $scope.contractMsgList = [];
                $scope.sdef.sumsapinvoice = "";
                $scope.totalproductout = "";
                $scope.sdef.invoiceamount = "";
                $scope.sdef.redinvoice = "";
                $scope.sdef.amountoffandchd = "";
                $scope.sdef.amountofsapkpzje = "";
                $scope.sdef.isfpandxsht = "";
                $scope.invoiceCgList = [];
                $scope.Filedata.items = [];
            } else {
                $scope.contractShow = true;
                $scope.contract1Show = false;
                $scope.recebillList =[{contractno:"",htje:"",yksjje:"",sjsm:"",sjje:""}];
                $scope.sdef.invoiceamount = "";
            };
        }
        if(type=="增值税专用发票"||type=="增值税普通发票"){
            $scope.sdef.rate ="17%";
        }else if(type=="资金往来专用发票"||type=="收据"){
            $scope.sdef.rate ="";
        }else if(type=="服务发票"||type=="服务费增值税普通发票"||type=="服务费增值税专用发票"){
            $scope.sdef.rate ="6%";
        }
        if(type=="增值税普通发票"||type=="服务费增值税普通发票"||type=="收据"){
            $scope.requireShow=false;
        }else{
            $scope.requireShow=true;
        }
        if($scope.sdef.cusname&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
            if($scope.sdef.nsrnum==''||$scope.sdef.adress==''||$scope.sdef.tel==''||$scope.sdef.bank==''||$scope.sdef.account==''){
                swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                $scope.sdef.cusname="";
                $scope.sdef.nsrnum = "";
                $scope.sdef.adress = "";
                $scope.sdef.tel = "";
                $scope.sdef.bank = "";
                $scope.sdef.account = "";
                $scope.sdef.NAME1="";
                return false;
            }
        }
    }
    var KUNNR_NAME;    /*客户名称*/
    var contracttype;   /*合同类型*/
    var contractmoney;   /*合同金额*/
    var contractno; //合同号
    var groupno;
    $scope.recodeAll=[];
    $scope.contNumBox=function(contNum){
        if(!$scope.sdef.selectby){
            swal("请选择开票类型！", "", "warning");
            return false;
        }
        if(!contNum){
            swal("销售合同号不能为空！", "", "warning");
            return false;
        }
        if(!$scope.sdef.cusname){
            swal("请先选择客户名称！", "", "warning");
            return false;
        }
        if(!$scope.sdef.ZFPLX){
            swal("请先选择发票类型！", "", "warning");
            return false;
        }
        var pay = mkinvoice.selectbycont({contractno:contNum,selectby:$scope.sdef.selectby});
        pay.success(function(data){
            if(data.code==200){
                if(data.rst){
                    if((data.rst.receipttype!="税率17%"&&data.rst.receipttype!="税率0")&&($scope.sdef.ZFPLX=="增值税专用发票"||$scope.sdef.ZFPLX=="增值税普通发票")){
                        swal("该合同税率为"+data.rst.receipttype+"，不可开增值税类发票！", "", "warning");
                        $scope.a.contNum="";
                        return false;
                    }else if(data.rst.receipttype!="税率6%"&&($scope.sdef.ZFPLX=="服务发票"||$scope.sdef.ZFPLX=="服务费增值税普通发票"||$scope.sdef.ZFPLX=="服务费增值税专用发票")){
                        swal("该合同税率为"+data.rst.receipttype+"，不可开服务费类发票！", "", "warning");
                        $scope.a.contNum="";
                        return false;
                    }else{
                        $scope.a.contNum="";


                        KUNNR_NAME = data.rst.KUNNR_NAME;
                        contracttype = data.rst.contracttype;
                        contractmoney = data.rst.contractmoney;
                        contractno = data.rst.contractno;
                        groupno = data.rst.groupno;
                        salesorgname = data.rst.salesorgname;
                        salesorgid = data.rst.salesorgid;
                        tradername = data.rst.tradername;
                        traderlogin = data.rst.traderlogin;
                        KUNNR = data.rst.KUNNR;
                        NAME1 = data.rst.NAME1;
                        kpcusid = data.rst.kpcusid;
                        $scope.list=data.rst;
                        $scope.recodeAll=data.rst.VBELN;
                        if(KUNNR!=$scope.sdef.KUNNR){
                            swal("此合同号的客户名称是"+KUNNR_NAME+",与基本信息部分的客户名称不一致", "", "warning");
                            $("#contNum").dialog("destroy");
                            $(".ui-dialog").remove();
                            return false;
                        }
                        if($scope.sdef.NAME1){
                            if($scope.sdef.kpcusid!=kpcusid){
                                swal("此合同号的开票客户名称是"+NAME1+",与基本信息部分的开票客户名称不一致", "", "warning");
                                $("#contNum").dialog("destroy");
                                $(".ui-dialog").remove();
                                return false;
                            }else {
                                $("#contNum").dialog({
                                    autoOpen: false,
                                    width: 500,
                                    height: 400,
                                    modal: true
                                });
                                $("#contNum").dialog("open");
                            }
                        }else {

                            var para= {KUNNR:kpcusid};
                            var nameCheck=mkinvoice.name1Data(para);
                            nameCheck.success(function(data){
                                if(data.code==200){
                                    if(data.rst.data.items.length==0){
                                        swal("该客户的开票信息尚未维护！", "", "warning");
                                        $scope.sdef.nsrnum = "";
                                        $scope.sdef.adress = "";
                                        $scope.sdef.tel = "";
                                        $scope.sdef.bank = "";
                                        $scope.sdef.account = "";
                                        $scope.sdef.NAME1="";
                                        $("#contNum").dialog("destroy");
                                        $(".ui-dialog").remove();
                                        return false;
                                    }
                                    if(data.rst.data.items.length>0){
                                        if(data.rst.data.items[0].koinh==''){
                                            swal("该客户的开票信息尚未维护！", "", "warning");
                                            $scope.sdef.nsrnum = "";
                                            $scope.sdef.adress = "";
                                            $scope.sdef.tel = "";
                                            $scope.sdef.bank = "";
                                            $scope.sdef.account = "";
                                            $scope.sdef.NAME1="";
                                            $("#contNum").dialog("destroy");
                                            $(".ui-dialog").remove();
                                            return false;
                                        }else {
                                            $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                            $scope.sdef.adress = data.rst.data.items[0].adress;
                                            $scope.sdef.tel = data.rst.data.items[0].tel;
                                            $scope.sdef.bank = data.rst.data.items[0].bank;
                                            $scope.sdef.account = data.rst.data.items[0].account;
                                            $scope.sdef.NAME1=NAME1;
                                            $scope.sdef.kpcusid=kpcusid;
                                            $("#contNum").dialog({
                                                autoOpen: false,
                                                width: 500,
                                                height: 400,
                                                modal: true
                                            });
                                            $("#contNum").dialog("open");

                                        }
                                        if($scope.sdef.ZFPLX&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
                                            if(data.rst.data.items[0].nsrnum==''||data.rst.data.items[0].adress==''||data.rst.data.items[0].tel==''||data.rst.data.items[0].bank==''||data.rst.data.items[0].account==''){
                                                swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                                                $scope.sdef.nsrnum = "";
                                                $scope.sdef.adress = "";
                                                $scope.sdef.tel = "";
                                                $scope.sdef.bank = "";
                                                $scope.sdef.account = "";
                                                $scope.sdef.NAME1="";
                                                $("#contNum").dialog("destroy");
                                                $(".ui-dialog").remove();

                                            }else {
                                                $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                                $scope.sdef.adress = data.rst.data.items[0].adress;
                                                $scope.sdef.tel = data.rst.data.items[0].tel;
                                                $scope.sdef.bank = data.rst.data.items[0].bank;
                                                $scope.sdef.account = data.rst.data.items[0].account;
                                                $scope.sdef.NAME1=NAME1;
                                                $scope.sdef.kpcusid=kpcusid;

                                                $("#contNum").dialog({
                                                    autoOpen: false,
                                                    width: 500,
                                                    height: 400,
                                                    modal: true
                                                });
                                                $("#contNum").dialog("open");

                                            }
                                        }else {
                                            $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                            $scope.sdef.adress = data.rst.data.items[0].adress;
                                            $scope.sdef.tel = data.rst.data.items[0].tel;
                                            $scope.sdef.bank = data.rst.data.items[0].bank;
                                            $scope.sdef.account = data.rst.data.items[0].account;
                                            $scope.sdef.NAME1=NAME1;
                                            $scope.sdef.kpcusid=kpcusid;
                                            console.log( $scope.list,
                                                $scope.recodeAll)
                                            $("#contNum").dialog({
                                                autoOpen: false,
                                                width: 500,
                                                height: 400,
                                                modal: true
                                            });
                                            $("#contNum").dialog("open");

                                        }

                                    }
                                }
                            });
                        }
                        $scope.VBELNSelect=function(VBELN){
                            $scope.parType="VBELN";
                            $("#contNum").dialog("destroy");
                            $(".ui-dialog").remove();
                            var param  = {KUNNR:KUNNR,tradername:tradername,traderlogin:traderlogin,VBELN: VBELN,contractno:contractno,contracttype:contracttype,KUNNR_NAME:KUNNR_NAME,contractmoney:contractmoney,groupno:groupno,salesorgid:salesorgid,salesorgname:salesorgname,kpcusid:$scope.sdef.kpcusid,NAME1:$scope.sdef.NAME1};

                            var mkinvoicePromise = mkinvoice.contractData(param);
                            mkinvoicePromise.success(function(data){

                                if(data.code == 200){
                                    $("#cusBox").dialog({
                                        autoOpen: false,
                                        width: 1000,
                                        height: 600,
                                        modal: true
                                    });
                                    $("#cusBox").dialog("open");
                                    $scope.dataList = data.rst.data.items;
                                }else {
                                    swal(
                                        {
                                            title: "",
                                            text: data.msg,
                                            type: "warning",
                                        })

                                }
                            })

                        }
                        $scope.nbjsddhSelect=function(nbjsddh){

                            $scope.parType="nbjsddh";
                            $("#contNum").dialog("destroy");
                            $(".ui-dialog").remove();


                            var param  = {KUNNR:KUNNR,tradername:tradername,traderlogin:traderlogin,nbjsddh: nbjsddh,contractno:contractno,contracttype:contracttype,KUNNR_NAME:KUNNR_NAME,contractmoney:contractmoney,groupno:groupno,salesorgid:salesorgid,salesorgname:salesorgname,kpcusid:$scope.sdef.kpcusid,NAME1:$scope.sdef.NAME1};
                            var Promise = mkinvoice.contractData(param);
                            Promise.success(function(data){
                                if(data.code == 200){
                                    $("#cusBox").dialog({
                                        autoOpen: false,
                                        width: 1000,
                                        height: 600,
                                        modal: true
                                    });
                                    $("#cusBox").dialog("open");
                                    $scope.dataList = data.rst.data.items;

                                }else {
                                    swal(
                                        {
                                            title: "",
                                            text: data.msg,
                                            type: "warning",
                                        })

                                }
                            })

                        }
                    }
                }else{
                    swal("该销售合同号不存在！", "", "warning");
                    $scope.a.contNum="";
                    return false;
                }

            }else{
                swal(data.msg, "", "warning");
            }
        })

        $scope.xqChange=function(xqnum,KWMENG,thsl,idx,ZKKSL){
            if($scope.sdef.selectby=="退货订单号"){
                if(xqnum>ZKKSL){
                    swal("退货订单，不可提前开票！", "", "warning");
                    $scope.dataList[idx].xqnum="";
                    return true;
                }
                if(KWMENG==0){
                    swal("可开数量为0，不可提前开票！", "", "warning");
                    $scope.dataList[idx].xqnum="";
                    return true;
                }
            }else{
                if(xqnum<0||eval(xqnum)>KWMENG-thsl){
                    swal("需求数量必须大于0，小于等于未开数量减退货数量！", "", "warning");
                    $scope.dataList[idx].xqnum="";
                    return true;
                }
            }

        }
    }
   /* var timestamp = new Date().getTime();*/
    //SAP模拟开票
    $scope.sapTotal=function(glCgList,sdef){
        for(var i=0;i<glCgList.length;i++){
            console.log(glCgList[i].xqnum)
            if(glCgList[i].identShow&&(glCgList[i].xqnum<=0||!glCgList[i].xqnum)){
                swal("需求数量必须大于0！", "", "warning");
                return false;
            }
            if(glCgList[i].tqkpno>0){
                glCgList[i].logo="T";
            }else{
                glCgList[i].logo="";
            }
          /*if($scope.oldglCgList[i].xqnum !== glCgList[i].xqnum || $scope.oldglCgList.length !== glCgList.length){
            var newTimestamp = new Date().getTime();
          };*/
        }
        /*if(newTimestamp) {
          timestamp = newTimestamp;
          $scope.oldglCgList = angular.copy(glCgList);
        }*/

        var doc={};
        doc.model=sdef;
        doc.htxq=glCgList;
        if(doc.model) { doc.model.timeID = $scope.timestamp; }
        var simulateinvoice = mkinvoice.simulateinvoice(doc);
        simulateinvoice.success(function (data) {
            if (data.code == 200) {
                $scope.flag1=false;
                $scope.agreeEdit=false;
                for (var i = 0; i < data.rst.data.htxq.length; i++) {
                    for(var j=0;j<$scope.glCgList.length;j++){
                        if($scope.glCgList[j].identification==data.rst.data.htxq[i].identification){
                            $scope.glCgList[j].sapinvoice=data.rst.data.htxq[i].sapinvoice.toFixed(2);
                            $scope.glCgList[j].fandchd=data.rst.data.htxq[i].fandchd.toFixed(2)*1;
                            $scope.glCgList[j].custKey=data.rst.data.htxq[i].key;
                            ary1[j].hsje = $scope.glCgList[i].sapinvoice;
                            break;
                        }
                    }

                }

                $scope.sdef.isfpandxsht="";
                $scope.invoiceCgList=[];
                $scope.Filedata.items=[];

                $scope.savedata=data.rst.data.savedata;
                $scope.sdef.sumsapinvoice=data.rst.data.sumsapinvoice.toFixed(2);
                $scope.sdef.amountoffandchd=data.rst.data.amountoffandchd.toFixed(2);
                $scope.sdef.amountofsapkpzje=data.rst.data.amountofsapkpzje.toFixed(2);
                if($scope.sdef.selectby=="退货订单号"){
                    $scope.sdef.redinvoice=($scope.sdef.sumsapinvoice- $scope.sdef.amountoffandchd).toFixed(2)*1;
                    $scope.sdef.invoiceamount='';
                }else{
                    console.log($scope.sdef.sumsapinvoice- $scope.sdef.amountoffandchd)
                    $scope.sdef.invoiceamount=($scope.sdef.sumsapinvoice- $scope.sdef.amountoffandchd).toFixed(2)*1;
                    $scope.sdef.redinvoice='';
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });

    }
    $scope.contractSelect = function (idx,ZKKSL) {
        if($scope.sdef.selectby=='退货订单号'){
            if(ZKKSL==0){
                swal("开票数量是0，不可进行开票！", "", "warning");
                return false;
            }
        }
        var parent = $("#ccTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
        } else {
            check.removeAttr("checked");
        }
    }
    $scope.ccCancle = function () {
        $("#cusBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    // var allAccount = 0;
    $scope.contractMsgList = [];   /*合同信息表*/
    var contractTab = [];
    var storageMaterial = [];
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.ccSelect = function (selectData) {
        var cArr = $scope.glCgList;
        var ckbox = $("#ccTable").find("[checked='checked']");
        var ccList = [];
        var invList = [];
        var invList1 = [];
        $(ckbox).each(function (key, value) {
            var par = $(this).parent().parent();
            var arr = {}, obj = {}, obj1 = {};
            arr.VBELN = par.find("td:eq(1)").html();
            /*arr.KUNNR_NAME = par.find("td:eq(2)").html();*/
            arr.KUNNR = par.find("td:eq(2)").html();
            arr.contractno = par.find("td:eq(3)").html();
            arr.MATNR = par.find("td:eq(5)").html();
            arr.KWMENG = par.find("td:eq(6)").html();
            arr.KZWI1 = par.find("td:eq(7)").html();
            arr.thsl = par.find("td:eq(8)").html();
            arr.xqnum = par.find("input:eq(1)").val();
            arr.hsje = eval(arr.KZWI1*arr.xqnum).toFixed(2);
            arr.ZKKSL = par.find("td:eq(9)").html();

            arr.groupno= par.find("td:eq(24)").html();
            arr.salesorgname = par.find("td:eq(25)").html();
            arr.salesorgid = par.find("td:eq(26)").html();
            arr.ZPC_NUM = par.find("td:eq(13)").html();
            /* if($scope.sdef.ZFPLX.indexOf("服务")<0){

             arr.ZPC_NUM = par.find("td:eq(13)").html();

             }*/
            if((par.find("td:eq(17)").html())!="专有服务"&&arr.xqnum>0&&arr.xqnum>eval(arr.ZKKSL)-eval(arr.thsl)) {
                arr.tqkpno=eval(arr.xqnum)-eval(arr.ZKKSL)+eval(arr.thsl);

            }else{
                arr.tqkpno='';
            }
            arr.DN_DATA=eval(par.find("td:eq(27)").html());
            arr.fandchd=eval(par.find("td:eq(28)").html());
            arr.tradername =par.find("td:eq(29)").html();
            arr.traderlogin=par.find("td:eq(30)").html();
            arr.KUNNR_NAME=par.find("td:eq(31)").html();
            arr.MTART = par.find("td:eq(32)").html();
            arr.PSTYV = par.find("td:eq(33)").html();
            arr.ZDDSL = par.find("td:eq(34)").html();
            arr.NAME1 = par.find("td:eq(35)").html();
            arr.kpcusid = par.find("td:eq(36)").html();

            obj.MATNR =par.find("td:eq(5)").html();
            obj.POSNR =par.find("td:eq(4)").html();
            obj.ZZKPMS = par.find("td:eq(14)").html().replace(/\s+/g, '');
            obj.ZZKPMS = obj.ZZKPMS.replace(/,+/g, '、');
            obj.ZZGKXH = par.find("td:eq(15)").html();
            /*obj.MEINS = par.find("td:eq(16)").html();*/
            obj.MEINS =getField($scope.meinsBox, 'code',par.find("td:eq(16)").html()).name;
            obj.xqnum = arr.xqnum;
            obj.KZWI1 = par.find("td:eq(7)").html();
            obj.identShow =true;

            obj1.MATNR =par.find("td:eq(5)").html();
            obj1.POSNR =par.find("td:eq(4)").html();
            obj1.ZZKPMS = par.find("td:eq(14)").html().replace(/\s+/g, '');
            obj1.ZZKPMS = obj1.ZZKPMS.replace(/,+/g, '、');
            obj1.ZZGKXH = par.find("td:eq(15)").html();
            obj1.MEINS =getField($scope.meinsBox, 'code',par.find("td:eq(16)").html()).name;
            obj1.xqnum = arr.xqnum;
            obj1.KZWI1 = par.find("td:eq(7)").html();
            obj1.identShow =true;

            arr.contracttype = par.find("td:eq(17)").html();
            arr.LFSTK = par.find("td:eq(18)").html();
            arr.zdfhje = (+par.find("td:eq(19)").html()).toFixed(2);
            arr.zdmcfhsj = par.find("td:eq(20)").html();
            /* arr.VBELN_DN = par.find("td:eq(21)").html();*/
            arr.VKORG = par.find("td:eq(22)").html();

            arr.contractmoney = par.find("td:eq(23)").html();
            arr.POSNR = par.find("td:eq(4)").html();
            arr.identification =arr.contractno+arr.POSNR;
            arr.identShow =true;
            ccList.push(arr);
            invList.push(obj);
            invList1.push(obj1);

            contractTab.push(arr);
            for(var x =0;x<contractTab.length;x++){
                if(contractTab.length > 1){
                    contractTab.splice(x,1);
                }
            }
        });

        if(ccList.length){
            $scope.contractnoFlag=true;
            for(var a=0;a<$scope.contractMsgList.length;a++){
                if($scope.contractMsgList[a].contractno==selectData[0].contractno){
                    $scope.contractnoFlag=false;
                }
            }
            for(var f=0;f<selectData.length;f++){
                if(selectData[f].ZKKSL-selectData[f].thsl<=0&&selectData[f].thsl>0&&$scope.contractnoFlag){
                    var arrBox = {}, objBox = {}, obj1Box = {};
                    arrBox.VBELN = selectData[f].VBELN;
                    /*arr.KUNNR_NAME = par.find("td:eq(2)").html();*/
                    arrBox.KUNNR = selectData[f].KUNNR;
                    arrBox.contractno = selectData[f].contractno;
                    arrBox.MATNR = selectData[f].MATNR;
                    arrBox.KWMENG = selectData[f].KWMENG;
                    arrBox.KZWI1 = selectData[f].KZWI1;
                    arrBox.thsl = selectData[f].thsl;
                    arrBox.xqnum =0;
                    arrBox.hsje =0;
                    arrBox.ZKKSL =selectData[f].ZKKSL;

                    arrBox.groupno= selectData[f].groupno;
                    arrBox.salesorgname = selectData[f].salesorgname;
                    arrBox.salesorgid =selectData[f].salesorgid;
                    arrBox.ZPC_NUM = selectData[f].ZPC_NUM;
                    arrBox.tqkpno='';
                    arrBox.DN_DATA=selectData[f].DN_DATA;
                    arrBox.fandchd= selectData[f].fandchd;
                    arrBox.tradername =selectData[f].tradername;
                    arrBox.traderlogin=selectData[f].traderlogin;
                    arrBox.KUNNR_NAME=selectData[f].KUNNR_NAME;
                    arrBox.MTART =selectData[f].MTART;
                    arrBox.PSTYV =selectData[f].PSTYV;
                    arrBox.ZDDSL =selectData[f].ZDDSL;
                    arrBox.NAME1 = selectData[f].NAME1;
                    arrBox.kpcusid = selectData[f].kpcusid;
                    objBox.MATNR =selectData[f].MATNR;
                    objBox.POSNR =selectData[f].POSNR;
                    objBox.ZZKPMS = selectData[f].ZZKPMS.replace(/\s+/g, '');
                    objBox.ZZKPMS = objBox.ZZKPMS.replace(/,+/g, '、');
                    objBox.ZZGKXH = selectData[f].ZZGKXH;
                    objBox.MEINS =getField($scope.meinsBox, 'code',selectData[f].MEINS).name;
                    objBox.xqnum = 0;
                    objBox.KZWI1 = selectData[f].KZWI1;
                    objBox.identShow =false;

                    obj1Box.MATNR =selectData[f].MATNR;
                    obj1Box.POSNR =selectData[f].POSNR;

                    obj1Box.ZZKPMS = selectData[f].ZZKPMS.replace(/\s+/g, '');
                    obj1Box.ZZKPMS = obj1Box.ZZKPMS.replace(/,+/g, '、');
                    obj1Box.ZZGKXH = selectData[f].ZZGKXH;
                    obj1Box.MEINS =getField($scope.meinsBox, 'code',selectData[f].MEINS).name;
                    obj1Box.xqnum = 0;
                    obj1Box.KZWI1 = selectData[f].KZWI1;
                    obj1Box.identShow =false;
                    arrBox.contracttype = selectData[f].contracttype;
                    arrBox.LFSTK = selectData[f].LFSTK;
                    arrBox.zdfhje =  selectData[f].zdfhje.toFixed(2);
                    arrBox.zdmcfhsj = selectData[f].zdmcfhsj;
                    /* arr.VBELN_DN = par.find("td:eq(21)").html();*/
                    arrBox.VKORG = selectData[f].VKORG;

                    arrBox.contractmoney = selectData[f].contractmoney;
                    arrBox.POSNR = selectData[f].POSNR;
                    arrBox.identification =arrBox.contractno+arrBox.POSNR;
                    arrBox.identShow =false;

                    ccList.push(arrBox);
                    invList.push(objBox);
                    invList1.push(obj1Box);
                }
            }
        }
        for(var w=0;w<ccList.length;w++){
            if((ccList[w].xqnum.toString().split(".")[1])){
                if((ccList[w].xqnum.toString().split(".")[1].length)>3){
                    swal("您有信息填写不完整，请检查后再保存", "", "warning");
                    ccList = [],invList = [],invList1 = [],arr = {}, obj = {};
                    return false;
                }
            }
            console.log(ccList[w].VKORG)
            if($scope.parType=="VBELN"){
                if(ccList[w].KUNNR!=$scope.sdef.KUNNR){
                    swal("所选合同中客户名称和基本信息中客户名称不一致", "", "warning");
                    ccList = [],invList = [],invList1 = [],arr = {}, obj = {};
                    return false;
                }
            }
            if($scope.parType=="nbjsddh"){
                if(ccList[w].VKORG=="9000"){
                    $scope.sdef.KUNNR=ccList[w].KUNNR;
                    $scope.sdef.cusname=ccList[w].KUNNR_NAME;
                    var parma= {KUNNR:$scope.sdef.KUNNR};
                    var nameCheck=mkinvoice.name1Data(parma);
                    nameCheck.success(function(data){
                        if(data.code==200){
                            if(data.rst.data.items.length==0){
                                swal("该客户的开票信息尚未维护！", "", "warning");
                                $scope.sdef.cusname="";
                                $scope.sdef.nsrnum = "";
                                $scope.sdef.adress = "";
                                $scope.sdef.tel = "";
                                $scope.sdef.bank = "";
                                $scope.sdef.account = "";
                                $scope.sdef.NAME1="";
                                return false;
                            }
                            if(data.rst.data.items.length>0){
                                if(data.rst.data.items[0].koinh==''){
                                    swal("该客户的开票信息尚未维护！", "", "warning");
                                    $scope.sdef.cusname="";
                                    $scope.sdef.nsrnum = "";
                                    $scope.sdef.adress = "";
                                    $scope.sdef.tel = "";
                                    $scope.sdef.bank = "";
                                    $scope.sdef.account = "";
                                    $scope.sdef.NAME1="";
                                    return false;
                                }
                                $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                $scope.sdef.adress = data.rst.data.items[0].adress;
                                $scope.sdef.tel = data.rst.data.items[0].tel;
                                $scope.sdef.bank = data.rst.data.items[0].bank;
                                $scope.sdef.account = data.rst.data.items[0].account;
                                $scope.sdef.NAME1 = data.rst.data.items[0].koinh;
                            }

                        }
                    });

                }

            }



        }
        for(var x=0;x<$scope.glCgList.length;x++){
            for(var p=0;p<ccList.length;p++){
                if($scope.glCgList[x].contractno==ccList[p].contractno && $scope.glCgList[x].POSNR==ccList[p].POSNR){
                    swal({
                        title:'',
                        text:'已选择销售合同号'+$scope.glCgList[x].contractno+'行项目号为：'+$scope.glCgList[x].POSNR+'的物料!',
                        type:'warning'
                    });
                    return true;
                }

            }
        }

        storageMaterial.push(ccList);

        $scope.glCgList = cArr.concat(ccList);
        $scope.oldglCgList = angular.copy($scope.glCgList)
        if($scope.parType=="nbjsddh"){
            for(var w=0;w<ccList.length;w++){
                if(ccList[w].VKORG!="9000"&&$scope.list.nbjsddh){
                    $scope.sdef.cusname="中建材集团进出口公司";
                    $scope.sdef.NAME1="中建材集团进出口公司";
                    var namePromise = mkinvoice.nameData({cusname:"中建材集团进出口公司"});
                    namePromise.success(function(data){//更改客户信息
                        if(data.code==200){
                            $scope.sdef.KUNNR=data.rst.data.items[0].KUNNR;
                            var para= {KUNNR:$scope.sdef.KUNNR};
                            var nameChange=mkinvoice.name1Data(para);
                            nameChange.success(function(data){
                                if(data.code==200){
                                    $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                                    $scope.sdef.adress = data.rst.data.items[0].adress;
                                    $scope.sdef.tel = data.rst.data.items[0].tel;
                                    $scope.sdef.bank = data.rst.data.items[0].bank;
                                    $scope.sdef.account = data.rst.data.items[0].account;
                                    $scope.sdef.NAME1=data.rst.data.items[0].koinh;
                                }
                            });
                        }
                    });

                    break;
                }
            }
        }


        $scope.flag1 =true;
        $scope.timestamp = new Date().getTime();
        ary1=ary1.concat(invList1);
        if($scope.sdef.isfpandxsht=="是"){
            $scope.invoiceCgList = ary1;
        }else if($scope.sdef.isfpandxsht=="否"){
            $scope.invoiceCgList=[];
            for(var v=0;v<ary1.length;v++){
                var objBox={};
                objBox.MATNR=ary1[v].MATNR;
                objBox.POSNR=ary1[v].POSNR;
                objBox.MATNR.ZZKPMS=ary1[v].ZZKPMS;
                objBox.MATNR.ZZGKXH=ary1[v].ZZGKXH;
                objBox.MATNR.MEINS=ary1[v].MEINS;
                objBox.MATNR.xqnum=ary1[v].xqnum;
                objBox.MATNR.KZWI1=ary1[v].KZWI1;
                $scope.invoiceCgList.push(objBox);
            }
        }

        var rataMoney=0;
        for(var h=0;h<$scope.glCgList.length;h++){
            rataMoney+=parseFloat($scope.glCgList[h].hsje);

            $scope.sdef.sumhsje=rataMoney.toFixed(2);
        }
        if(ccList.length==0){
            swal("请选择数据", "","warning");
            return false;
        }
        $scope.contractMsg = true;
        for(var x = 0 ; x < $scope.contractMsgList.length; x++){
            for(var j in contractTab){
                if($scope.contractMsgList[x].contractno == contractTab[j].contractno){
                    contractTab.splice(j,1);
                }
            }
            // $scope.totalproductout += parseFloat($scope.contractMsgList[x].zdfhje);

        }
        $scope.contractMsgList = $scope.contractMsgList.concat(contractTab);
        $scope.totalproductout = 0;
        $scope.contractMsgList.forEach(function(item){
            $scope.totalproductout += parseFloat(item.zdfhje);
        });
        $("#cusBox").dialog("destroy");
        $(".ui-dialog").remove();

        $(ckbox).each(function (key, value) {
            $(this).removeAttr("checked");
        });
    };
    /*删除*/
    $scope.htArr=[];
    $scope.htArrIndex=[];
    $scope.allCheck = function ($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.glCgList.length; i++) {
                $scope.htArr[i] = $scope.glCgList[i].contractno;
                $scope.htArrIndex[i] = i;
            }
        } else {
            $scope.htArr=[];
            $scope.htArrIndex=[];
        }
    };
    var htSelected = function (action, contractno, index) {
        if (action == 'add' ) {
            $scope.htArr.push(contractno);
            $scope.htArrIndex.push(index);
        }
        if (action == 'remove') {
            $scope.htArr.splice($scope.htArrIndex[index], 1);
            $scope.htArrIndex.splice(index, 1);
        }
    };
    $scope.htSelection = function ($event, contractno, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        htSelected(action, contractno, index);
    };
    $scope.htDel=function() {
        if ($scope.htArr.length <= 0) {
            swal("请勾选列表", "", "warning");
            return false;
        }
        if($scope.htArr.length==$scope.glCgList.length){
            $scope.glCgList=[];
            $scope.contractMsgList=[];
            $scope.totalproductout='';
            $scope.sdef.sumsapinvoice='';
            $scope.sdef.amountoffandchd='';
            $scope.sdef.invoiceamount='';
            $scope.sdef.redinvoice='';


            ary1=[];
            if($scope.sdef.isfpandxsht !="否"){
                $scope.invoiceCgList=[];
            }
            $scope.all=false;
            $scope.checkAll=false;
        }else{
            for(var i=0;i<$scope.htArrIndex.length;i++){
                for(var k=0;k<$scope.glCgList.length;k++){
                    if($scope.htArrIndex[i]==k){
                        $scope.glCgList[k].payFlag="selected";
                        break;
                    }
                }
            }
            for(var j=0;j<$scope.glCgList.length;j++){
                if($scope.glCgList[j].payFlag=="selected"){
                    console.log(j)
                    $scope.glCgList.splice(j, 1);
                    ary1.splice(j, 1);
                    //if($scope.sdef.isfpandxsht=="是"){
                    //    $scope.invoiceCgList.splice(j, 1);
                    //}
                    j--;
                }
            }
            for(var s=0;s<$scope.glCgList.length;s++){
                if(!$scope.glCgList[s].identShow){
                    for(var t=0;t<$scope.glCgList.length;t++){
                        if(s!=t&&$scope.glCgList[s].contractno==$scope.glCgList[t].contractno&&$scope.glCgList[t].identShow){
                            $scope.contractnoFlag=true;
                        }
                    }
                    if(!$scope.contractnoFlag){
                        $scope.glCgList.splice(s, 1);
                        ary1.splice(s, 1);
                        s--;
                        t--;
                    }

                }
            }
            for(m=0;m<$scope.htArr.length;m++){
                for(var j=0;j<$scope.glCgList.length;j++){
                    if($scope.glCgList[j].contractno==$scope.htArr[m]){
                        $scope.htArr.splice(m,1);
                        m--;
                        break;
                    }
                }
            }
            for(var n=0;n<$scope.htArr.length;n++){
                for(var p=0;p<$scope.contractMsgList.length;p++){
                    if($scope.contractMsgList[p].contractno==$scope.htArr[n]){
                        $scope.contractMsgList.splice(p,1);
                        break;
                    }
                }
            }
            var htTal=0;
            for(var q=0;q<$scope.contractMsgList.length;q++){
                htTal+=$scope.contractMsgList[q].zdfhje*1;
            }
            $scope.totalproductout=htTal;
        }
        $scope.timestamp = new Date().getTime();
        $scope.htArr=[];
        $scope.htArrIndex=[];
        $scope.flag1 =true;

    }
    $scope.xqnumNum=function(xqnum,ZKKSL,KZWI1,KWMENG,thsl,index){
        if($scope.sdef.selectby=="退货订单号"){
            if(xqnum*1>ZKKSL){
                swal("退货订单，不可提前开票！", "", "warning");
                $scope.glCgList[index].xqnum="";
                return false;
            }
        }else{
            if(eval(xqnum)<=0||eval(xqnum)>KWMENG-thsl){
                swal("需求数量必须大于0，小于等于未开数量减退货数量！", "", "warning");
                $scope.glCgList[index].xqnum="";
                return false;
            }
        }

        if ($scope.sdef.isfpandxsht == "是") {
            $scope.invoiceCgList[index].xqnum = xqnum;
        }
        if($scope.glCgList[index].contracttype!="专有服务"&&xqnum>0&&xqnum>eval(ZKKSL)-eval(thsl)) {
            $scope.glCgList[index].tqkpno = eval(xqnum) - eval(ZKKSL) + eval(thsl);

        }else{
            $scope.glCgList[index].tqkpno='';
        }
        $scope.flag1=true;
        $scope.timestamp = new Date().getTime();
        if(xqnum&&KZWI1){
            $scope.glCgList[index].hsje=(eval(xqnum)*eval(KZWI1)).toFixed(2);
        }else{
            $scope.glCgList[index].hsje="";

        }
    }
    $scope.djChange=function(id){
        if($scope.invoiceCgList[id].xqnum&&$scope.invoiceCgList[id].hsje){
            $scope.invoiceCgList[id].KZWI1=($scope.invoiceCgList[id].hsje/$scope.invoiceCgList[id].xqnum).toFixed(2);
        }else{
            $scope.invoiceCgList[id].KZWI1="";
        }
    }

    $scope.agreen = function () {

        if ($scope.sdef.isfpandxsht =="否"||$scope.sdef.isfpandxsht =="") {
            $scope.invoiceCgList=[];
            for(var i=0;i<ary1.length;i++){
                var obj={};
                obj.MATNR=ary1[i].MATNR;
                obj.POSNR=ary1[i].POSNR;
                obj.ZZKPMS=ary1[i].ZZKPMS;
                obj.ZZGKXH=ary1[i].ZZGKXH;
                obj.MEINS=ary1[i].MEINS;
                obj.xqnum=ary1[i].xqnum;
                obj.KZWI1=ary1[i].KZWI1;
                obj.identShow=ary1[i].identShow;
                obj.hsje=ary1[i].hsje;
                $scope.invoiceCgList.push(obj)
            }
            /*if($scope.invoiceCgList.length==0&&$scope.Filedata.items.length==0){
             for(var i=0;i<$scope.glCgList.length;i++){
             ary[i].hsje=$scope.glCgList[i].sapinvoice;
             }
             }*/
            $scope.canDel = false;
            $scope.canAdd = false;
            $scope.canDown = true;
            $scope.invoiceShow = false;
            $scope.invoiceList = false;
            /* $scope.invoiceCgList =ary;*/

            $scope.Filedata.items = [];
            for(var k=0;k<$scope.glCgList.length;k++){
                $scope.invoiceCgList[k].xqnum=$scope.glCgList[k].xqnum;
            }
        } else if ($scope.sdef.isfpandxsht =="是") {
            $scope.canDel = true;
            $scope.canAdd = true;
            $scope.canDown = false;
            $scope.invoiceShow = false;
            $scope.invoiceList = true;
            $scope.invoiceCgList = ary1;
            for(var b=0;b<$scope.glCgList.length;b++){
                $scope.invoiceCgList[b].xqnum=$scope.glCgList[b].xqnum;
            }
        }
    }

    $scope.invoiceAdd = function () {
        var obj = {MATNR:'',ZZKPMS: '', ZZGKXH: '', MEINS: '', xqnum: '', KZWI1: '', rate: '', hsje: '',identShow:true};
        $scope.invoiceCgList.push(obj);
    };
    $scope.invoiceDel = function (idx) {
        if ($scope.invoiceCgList.length <= 0) {
            swal("不能再删了！", "", "warning");
            return false;
        }
        $scope.invoiceCgList.splice(idx, 1);
    };
    $scope.filedataDel = function (idx) {
        if ($scope.Filedata.items.length<=0) {
            swal("不能再删了！", "", "warning");
            return false;
        }
        $scope.Filedata.items.splice(idx, 1);
    };
    $scope.allDell = function ($event) {
        var checkbox = $event.target;
        $scope.dellAll = checkbox.checked ? true : false;
        if ($scope.dellAll) {
            for(var i=0;i<$scope.invoiceCgList.length;i++){
                $scope.invoiceCgList[i].rightAdd = true;
            }
        } else {
            for(var j=0;j<$scope.invoiceCgList.length;j++){
                delete  $scope.invoiceCgList[j].rightAdd;
            }
        }
    };
    $scope.checkDel = function(idx){
        var parent = $("#cgList").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.invoiceCgList){
                $scope.invoiceCgList[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.invoiceCgList){
                delete  $scope.invoiceCgList[idx].rightAdd;
            }

        }
    }
    $scope.xsfdDel = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.invoiceCgList.forEach(function(item,index){
            if(item.rightAdd){
                if($scope.sdef.isfpandxsht =="是"){
                    delete  ary1[index].rightAdd;
                }else{
                    delete  $scope.invoiceCgList[index].rightAdd;
                }

            }else{
                rightArr.push(item)
            }
        });
        $scope.invoiceCgList = rightArr;
        /*if($("#allCheck").attr("checked") == "checked"){
         $("#allCheck").removeAttr("checked");
         for(var x in $scope.invoiceCgList){
         delete  $scope.invoiceCgList[x].rightAdd;
         }
         $scope.all=false;
         }*/

    }
    //收据信息
    $scope.billBox = function () {
        if($scope.sdef.cusname==""){
            swal("请先选择客户名称！", "", "warning");
            return false;
        }
        $("#billBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#billBox").dialog("open");
        $scope.billSelect = function (contractno,htje,yksjje,stomerid,tradername,traderlogin,NAME1,kpcusid) {
            if(stomerid!=$scope.sdef.KUNNR){
                swal("所选合同中的客户编码与基本信息中的客户编码不一致！", "", "warning");
                return false;
            }
            $scope.sdef.NAME1=NAME1;
            $scope.sdef.kpcusid=kpcusid;
            var para= {KUNNR:$scope.sdef.kpcusid};
            var nameCheck=mkinvoice.name1Data(para);
            nameCheck.success(function(data){
                if(data.code==200){
                    if(data.rst.data.items.length==0){
                        swal("该客户的开票信息尚未维护！", "", "warning");
                        $scope.sdef.nsrnum = "";
                        $scope.sdef.adress = "";
                        $scope.sdef.tel = "";
                        $scope.sdef.bank = "";
                        $scope.sdef.account = "";
                        $scope.sdef.NAME1="";
                        $("#billBox").dialog("destroy");
                        $(".ui-dialog").remove();
                        return false;
                    }
                    if(data.rst.data.items.length>0){
                        if(data.rst.data.items[0].koinh==''){
                            swal("该客户的开票信息尚未维护！", "", "warning");
                            $scope.sdef.nsrnum = "";
                            $scope.sdef.adress = "";
                            $scope.sdef.tel = "";
                            $scope.sdef.bank = "";
                            $scope.sdef.account = "";
                            $scope.sdef.NAME1="";
                            $("#billBox").dialog("destroy");
                            $(".ui-dialog").remove();
                            return false;
                        }
                        if($scope.sdef.ZFPLX&&$scope.sdef.ZFPLX.indexOf("普通")<0&&$scope.sdef.ZFPLX!="收据"){
                            if(data.rst.data.items[0].nsrnum==''||data.rst.data.items[0].adress==''||data.rst.data.items[0].tel==''||data.rst.data.items[0].bank==''||data.rst.data.items[0].account==''){
                                swal("所开发票为非普通发票，需将客户开票信息全部维护完整！", "", "warning");
                                $scope.sdef.cusname='';
                                $("#billBox").dialog("destroy");
                                $(".ui-dialog").remove();
                                return false;
                            }
                        }
                        $scope.sdef.nsrnum = data.rst.data.items[0].nsrnum.replace(/\s+/g, '');
                        $scope.sdef.adress = data.rst.data.items[0].adress;
                        $scope.sdef.tel = data.rst.data.items[0].tel;
                        $scope.sdef.bank = data.rst.data.items[0].bank;
                        $scope.sdef.account = data.rst.data.items[0].account;
                    }
                }
            });
            $scope.recebillList[0].contractno=contractno;
            $scope.recebillList[0].htje=htje;
            $scope.recebillList[0].yksjje=yksjje;
            $scope.recebillList[0].tradername=tradername;
            $scope.recebillList[0].traderlogin=traderlogin;
            $("#billBox").dialog("destroy");
            $(".ui-dialog").remove();
        };
    }
    $scope.sjjeNum=function(sjje,htje,yksjje,index){
        if(sjje<0){
            swal("收据金额必须大于0！", "", "warning");
            $scope.recebillList[index].sjje='';
            return false;
        }
        if(sjje>eval(htje)-eval(yksjje)){
            swal({title: "收据金额大于合同金额-已开收据金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "确定",
                    confirmButtonText: "取消" },
                function() {
                    $scope.$apply(function () {
                        $scope.recebillList[index].sjje='';
                        $scope.sdef.invoiceamount="";
                    });
                }
            );
        }
        $scope.sdef.invoiceamount=$scope.recebillList[index].sjje;

    }
    $scope.addData = function (sdef, glCgList, invoiceCgList,filedata,recebillList, statue) {
        var doc = {}, param = {};
        var requiredObj2 = $scope.mkinvoiceForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.mkinvoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.glCgList.length>0){
            for(var g=0;g<$scope.glCgList.length;g++){
                if($scope.glCgList[g].xqnum===""){
                    swal("列表信息部分的需求数量不能为空", "", "warning");
                    return false;
                }
            }
            if($scope.sdef.selectby=="退货订单号"){
                if($scope.sdef.redinvoice<0){
                    swal("红色发票金额小于0，不能进行开票", "", "warning");
                    return false;
                }
            }else{
                if($scope.sdef.invoiceamount<0){
                    swal("发票总金额小于0，不能进行开票", "", "warning");
                    return false;
                }
            }
            doc.ary = ary1;
        }
        doc.sdef = sdef;
        doc.sdef.totalproductout = $scope.totalproductout;   //放货总金额
        doc.htxq = glCgList;
        doc.savedata = $scope.savedata;
        doc.recebill= recebillList;
        doc.htxx = $scope.contractMsgList;
        doc.thdd = $scope.thdd;
        if(filedata.length>0){
            doc.billdetail = filedata;
        }else {
            doc.billdetail = invoiceCgList;
        }

        param.doc = doc;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(glCgList.length>0){
            for(var j=0;j<glCgList.length;j++){
                glCgList[j].rate=$scope.sdef.rate;
            }
            for(var i=0;i<glCgList.length;i++){
                if(!glCgList[i].contractno){
                    swal("销售合同号为必填项！", "", "warning");
                    return;
                }
                if(glCgList[i].xqnum=="0"&&glCgList[i].identShow){
                    swal("需求数量不能为0！", "", "warning");
                    return;
                }
                if(glCgList[i].xqnum===""){
                    swal("需求数量不能为空！", "", "warning");
                    return;
                }
                if(glCgList[i].tqkpno>0){
                    glCgList[i].logo="T";
                }else{
                    glCgList[i].logo="";
                }
            }
            for(var x in glCgList){
                console.log(glCgList[x].VKORG)
                if(glCgList[x].VKORG == '9001'){
                    swal("销售合同号为"+glCgList[x].VBELN+"的销售主体为9001，不能开具增值税发票", "", "warning");
                    return;
                }
                if(glCgList[x].VKORG == '9001' || glCgList[x].VKORG == '9000'){
                    glCgList[x].xszz1 = true;
                    glCgList[x].xszz2 = false;
                }else if( glCgList[x].VKORG == '1000' || glCgList[x].VKORG == '2000' || glCgList[x].VKORG == '3000'){
                    glCgList[x].xszz2 = true;
                    glCgList[x].xszz1 = false;
                }
            }
            if($scope.flag1==true){
                swal("请先计算SAP开票金额！", "", "warning");
                return;
            }
        }




        if (statue == "save") {
            var newParam = null;
            newParam = angular.copy(param);
            if(param.doc.htxq.length > 0){
                _.forEach(newParam.doc.htxq,function(val, key){
                    newParam.doc.htxq[key] = {key: $scope.glCgList[key].custKey, xqnum: newParam.doc.htxq[key].xqnum,traderlogin: newParam.doc.htxq[key].traderlogin}
                })
            }
            var addInside = mkinvoice.addInside(newParam);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    $scope.mkinvoiceRready=true;
                    $scope.canAdd=true;
                    $scope.invoiceList=true;
                    if($scope.contractShow){
                        $scope.saveDown=false;
                    }
                    swal("保存成功", "", "success");
                    // $window.location.reload();
                    //swal({title: "保存成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });
                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            if($scope.contractShow){
                if(glCgList.length==0){
                    swal("列表信息为必填项！", "", "warning");
                    return;
                }
                if($scope.invoiceCgList.length==0&&$scope.Filedata.items.length==0){
                    swal("发票信息部分必填", "", "warning");
                    return false;
                }
              var  glCgListBox=[];
                for(var i=0;i<glCgList.length;i++){
                    if(!glCgList[i].contractno){
                        swal("销售合同号为必填项！", "", "warning");
                        return;
                    }
                    if(glCgList[i].xqnum=="0"&&glCgList[i].identShow){
                        swal("需求数量不能为0！", "", "warning");
                        return;
                    }
                    if(glCgList[i].xqnum===""){
                        swal("需求数量不能为空！", "", "warning");
                        return;
                    }
                    if(glCgList[i].tqkpno>0){
                        glCgListBox.push(glCgList[i].MTART);
                        glCgList[i].logo="T";
                    }else{
                        glCgList[i].logo="";
                    }
                }
                // for(var f=0;f<glCgListBox.length;f++){
                //     if(glCgListBox[0]!=glCgListBox[f]){
                //         swal("提前开票物料类型不一致！", "", "warning");
                //         return;
                //     }
                // }
                for(var x in glCgList){
                    console.log(glCgList[x].VKORG)
                    if(glCgList[x].VKORG == '9001'){
                        swal("销售合同号为"+glCgList[x].VBELN+"的销售主体为9001，不能开具增值税发票", "", "warning");
                        return;
                    }
                    if(glCgList[x].VKORG == '9001' || glCgList[x].VKORG == '9000'){
                        glCgList[x].xszz1 = true;
                        glCgList[x].xszz2 = false;
                    }else if( glCgList[x].VKORG == '1000' || glCgList[x].VKORG == '2000' || glCgList[x].VKORG == '3000'){
                        glCgList[x].xszz2 = true;
                        glCgList[x].xszz1 = false;
                    }
                }
                if($scope.flag1==true){
                    swal("请先计算SAP开票金额！", "", "warning");
                    return;
                }
                doc.ary = ary1;
            }




            if(glCgList){
                $scope.xszz1Box=false;
                $scope.xszz2Box=false;
                for(var j=0;j<glCgList.length;j++){
                    if(glCgList[j].xszz1 == true){
                        $scope.xszz1Box=true;
                    }else{
                        if(glCgList[j].tqkpno>0&&(!glCgList[j].ZPC_NUM)){
                            swal("供应商订单号不能为空！", "", "warning");
                            return false;
                        }
                    }
                    console.log(glCgList[j].xszz2,glCgList[j].xszz1)
                    if(glCgList[j].xszz2 == true){
                        $scope.xszz2Box=true;
                    }
                    /* console.log(glCgList[j].xszz1,$scope.xszz1Box)
                     console.log(glCgList[j].xszz2,$scope.xszz2Box)*/
                }
                if($scope.xszz1Box == true  && $scope.xszz2Box == true){
                    swal('销售组织，9000或9001不能与1000/2000/3000同时并存','','warning');
                    return false;
                }
            }
            $scope.applyFn = function (selIndex) {
                if( selIndex !== -1 ) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var checkwebdata = mkinvoice.checkwebdata(param);
                checkwebdata.success(function(data){
                    if(data.code == 200){
                        if(data.rst.data.length > 0){
                            for(var x in data.rst.data){
                                swal({
                                    title:'',
                                    text:data.rst.msg + ',合同号为'+ data.rst.data[x].contractno+',',
                                    type:'warning'
                                });
                                return false;
                            }
                        }else{
                            console.log($scope.glCgList, 'savepress');

                            var newParam = null;
                            newParam = angular.copy(param);
                            if(param.doc.htxq.length > 0){
                                _.forEach(newParam.doc.htxq,function(val, key){
                                    newParam.doc.htxq[key] = {key: $scope.glCgList[key].custKey, xqnum: newParam.doc.htxq[key].xqnum,traderlogin: newParam.doc.htxq[key].traderlogin}
                                })
                            }
                            var applyAdd = mkinvoice.applyAdd(newParam);
                            applyAdd.success(function (data) {
                                if (data.code == 200) {
                                    $scope.mkinvoiceRready=true;
                                    $scope.canAdd=true;
                                    $scope.invoiceList=true;
                                    /* $scope.mkinvoiceOk=true;*/
                                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });
                                    window.location.href = '/index.html#/mkinvoiceCheck';
                                } else {
                                    swal(data.msg, "", "warning");
                                }
                            });
                        }
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });

            };
            var addInside = mkinvoice.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    var viewCont = mkinvoice.applyView({processId: param.processId , nodeId:  param.nodeId});
                    viewCont.success(function (data) {
                        if (data.code == 200) {
                            param.doc.sdef.XBLNR=data.rst.doc.model.XBLNR;
                            if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' && data.rst.candidates[0].coop!=='and')) {
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
                        }
                    }).error(function (error) {
                        swal({
                            title:'',
                            text:error,
                            type:"error"
                        })
                    });

                } else {
                    swal(data.msg, "", "warning");
                }
            });
           /* var paramm={doc:doc};
            var checkcontractnofromprocess = mkinvoice.checkcontractnofromprocess(paramm);
            checkcontractnofromprocess.success(function (data) {
                if(data.code==200){
// 提交
                    $scope.applyFn = function (selIndex) {
                        if( selIndex !== -1 ) {
                            $("#approversDialog").dialog("destroy");
                            $(".ui-dialog").remove();
                            var selObj = $scope.receivers[selIndex];
                            param.candidates[0].receivers = [selObj];
                        }
                        var checkwebdata = mkinvoice.checkwebdata(param);
                        checkwebdata.success(function(data){
                            if(data.code == 200){
                                if(data.rst.data.length > 0){
                                    for(var x in data.rst.data){
                                        swal({
                                            title:'',
                                            text:data.rst.msg + ',合同号为'+ data.rst.data[x].contractno+',',
                                            type:'warning'
                                        });
                                        return false;
                                    }
                                }else{
                                    console.log($scope.glCgList, 'savepress');

                                    var newParam = null;
                                    newParam = angular.copy(param);
                                    if(param.doc.htxq.length > 0){
                                        _.forEach(newParam.doc.htxq,function(val, key){
                                            newParam.doc.htxq[key] = {key: $scope.glCgList[key].custKey, xqnum: newParam.doc.htxq[key].xqnum,traderlogin: newParam.doc.htxq[key].traderlogin}
                                        })
                                    }
                                    var applyAdd = mkinvoice.applyAdd(newParam);
                                    applyAdd.success(function (data) {
                                        if (data.code == 200) {
                                            $scope.mkinvoiceRready=true;
                                            $scope.canAdd=true;
                                            $scope.invoiceList=true;
                                            /!* $scope.mkinvoiceOk=true;*!/
                                            swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/mkinvoiceCheck'; });
                                            window.location.href = '/index.html#/mkinvoiceCheck';
                                        } else {
                                            swal(data.msg, "", "warning");
                                        }
                                    });
                                }
                            }else {
                                swal(data.msg, "", "warning");
                            }
                        });

                    };
                    var addInside = mkinvoice.addInside(param);
                    addInside.success(function (data) {
                        if (data.code == 200) {
                            param.processId = $scope.processId = data.rst.processId;
                            param.nodeId = $scope.nodeId = data.rst.nodeId;
                            var viewCont = mkinvoice.applyView({processId: param.processId , nodeId:  param.nodeId});
                            viewCont.success(function (data) {
                                if (data.code == 200) {
                                    param.doc.sdef.XBLNR=data.rst.doc.model.XBLNR;
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
                                }
                            }).error(function (error) {
                                swal({
                                    title:'',
                                    text:error,
                                    type:"error"
                                })
                            });

                        } else {
                            swal(data.msg, "", "warning");
                        }
                    });
                }else {
                    swal(data.msg, "", "warning");
                    return;
                }
            })*/

        }
    }

}]);

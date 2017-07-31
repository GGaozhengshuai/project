var paymentApp = angular.module('paymentApp', ['pageDirectives', 'formDirectives', 'treeControl']);
paymentApp.service('paymentServices', function ($http) {
    var service = {
        listInside: function (param) {
            return $http.post('/credit/list', param, {cache: false});
        },
        viewInside: function (param) {
            return $http.post('/credit/view', param, {cache: true});
        },
        addInside: function (param) {
            return $http.post('/credit/save', param, {cache: false});
        },
        updateInside: function (param) {
            return $http.post('/credit/update', param, {cache: false});
        },
        deleteInside: function (param) {
            return $http.post('/credit/delete', param, {cache: false});
        },
        applyAdd: function (param) {
            return $http.post('/credit/createprocess', param, {cache: false});
        },
        listBox: function (param) {
            return $http.post('/credit/selectgysyh', param, {cache: false});
        },
        cgData: function (param) {
            return $http.post('/credit/selectpo', param, {cache: false});
        },
        cxdkData: function (param) {//冲抵核销-挂账款
            return $http.post('/credit/selectdk', param, {cache: false});
        },
        selectdk2: function (param) {//冲抵核销-抵扣查询
            return $http.post('/credit/selectdk2', param, {cache: false});
        },
        cxppData: function (param) {//冲抵核销-品牌基金
            return $http.post('/credit/selectppjj', param, {cache: false});
        },
        nbData: function (param) {//
            return $http.post('/credit/selectio', param, {cache: false});
        },//审批接口
        applyView: function (param) {
            return $http.post('/credit/detail', param, {cache: false});
        },
        agree: function (param) {//同意
            return $http.post('/credit/agree', param, {cache: false});
        },
        disagree: function (param) {//驳回
            return $http.post('/credit/disagree', param, {cache: false});
        },
        cancel: function (param) {//取消
            return $http.post('/credit/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/credit/recall', param, {cache: false});
        },
        listPurOrder: function (param) {//采购订单
            return $http.post('/poheader/list', param, {cache: false});
        },
        getcontractbyorderid: function (param) {//销售详情
            return $http.post('/credit/getcontractbysalesorderidorsupplierorderid', param, {cache: false});
        },
        getskbysalesorderidorsupplierorderid: function (param) {//收款情况
            return $http.post('/credit/getskbysalesorderidorsupplierorderid', param, {cache: false});
        },
        enumPurchase: function (param) { // 枚举接口
            return $http.post('/pojck/enumlist', param, {cache: true});
        },
        enumPay: function (param) { // 付款种类枚举接口
            return $http.post('/enuminterface/fktype', param, {cache: true});
        },
        getcreditbycode: function (param) { // 客户信用
            return $http.post('/cuscredit/getcreditbycode', param, {cache: true});
        },
        receivablesplan: function (param) {
            return $http.post('/receivablesplan/selectar', param, {cache: false});
        },
        list: function (param) {
            return $http.post('/dzd/list', param, {cache: false});
        },
        salesforcontractlist: function (param) {// 商务人员接口
            return $http.post('/user/list', param, {cache: false});
        },
        checkdohb : function (param) {// 判断能否做合并
            return $http.post('/credit/checkdohb ', param, {cache: false});
        },
        checkdozf : function (param) {// 判断能否做作废
            return $http.post('/credit/checkdozf ', param, {cache: false});
        },
        checkdobg : function (param) {//变更时检查是否在审批中
            return $http.post('/credit/checkdobg ', param, {cache: false});
        },
        enumlist : function (param) {//成本中心
            return $http.post('/credit/enumlist', param, {cache: false});
        },
        costcenterflat : function (param) {//审批完成成本中心
            return $http.post('/enuminterface/costcenterflat', param, {cache: false});
        },
        selectprocredit : function (param) {   //查审批中的付款申请的单子
            return $http.post('bankcredit/selectprocredit ', param, {cache: false});
        },

        listCredit: function (param) {// 客户信用查询
            return $http.post('/cuscredit/list', param, {cache: false});
        },
        getprocesslog: function(param) {
            return $http.post('/credit/getprocesslog',param,{cache:false});
        }

    };
    return service;
});

paymentApp.controller('paymentOrderCtrl', ['$scope', '$state','$rootScope', '$timeout', 'paymentServices', function ($scope, $state, $rootScope, $timeout, payment) {
    var payData = payment.enumPay(), vm = $scope;
    payData.success(function (data) {
        // 付款种类信息
        $scope.payData = data;
    });
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    //商务人员
    var salesforcontractlistData = payment.salesforcontractlist({"roles": ["approval_business", "approval_business_inter","approval_business_supervisor_oem","approval_business_oem"],limit:"100"});

    salesforcontractlistData.success(function (data) {
        if (data.code == 200) {
            $scope.cusData = data.rst.data.items;
        }
    });
    //权限
    var cusLimit =$rootScope.billPrev;
    if(cusLimit.hbfk_page){
        $scope.cusShow = true;
    }else{
        $scope.cusShow = false;
    }

    vm.table = false;
    vm.loadData = true;
    vm.tableApi = null;
    vm.tableOptions = {
      multiSelect: true,
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 42,
      // enableVerticalScrollbar: 0,
      // enableHorizontalScrollbar: 0,
      onRegisterApi: function (api) {
        vm.tableApi = api;
      }
    };
    vm.tableHeader = [
      {name: 'ZSQNO', displayName: "付款申请单号",  width: 135, cellTooltip: true, sort: {direction: 'desc'}, cellTemplate: '<div class="ui-grid-cell-contents link"><a target="_blank" href="index.html#/paymentOrderView/{{row.entity.ZSQNO}}">{{row.entity.ZSQNO}}</a></div>',pinnedLeft: true,enableSorting: true},
      {name: 'ZHB', displayName: "是否合并",  width: 80, cellTooltip: true},
      {name: 'ZSKDW', displayName: "供应商名称",  width: 135, cellTooltip: true},
      {name: 'ZZPO', displayName: "供应商订单号",  width: 135, cellTooltip: true},
      {name: 'EBELN', displayName: "采购订单号",  width: 100, cellTooltip: true},
      {name: 'ZFKFS', displayName: "付款方式",  width: 95, cellTooltip: true, cellFilter: 'date: "yyyy-MM-dd"'},
      {name: 'ZSQJE', displayName: "申请付款金额",  width: 130, cellTooltip: true, cellFilter: 'currency: ""',enableSorting: true },
      {name: 'ZSJFKJE', displayName: "实际付款金额",  width: 135, cellTooltip: true, cellFilter: 'currency: ""',enableSorting: true },
      {name: 'ZJHDAT', displayName: "计划付款时间",  width: 120, cellTooltip: true, cellFilter: 'date: "yyyy-MM-dd"',enableSorting: true},
      {name: 'ZSJDAT', displayName: "实际付款时间",  width: 120, cellTooltip: true, cellFilter: 'date: "yyyy-MM-dd"'},
      {name: 'ZFKSTA', displayName: "付款状态",  width: 85, cellTooltip: true},
      {name: 'AUFUSER0', displayName: "申请人",  width: 100, cellTooltip: true},
      {name: 'ZCGSW', displayName: "商务人员",  width: 90, cellTooltip: true},
      {name: 'ZSQNO_HB', displayName: "合并付款单号",  width: 135, cellTooltip: true},
      {name: 'ZFKZT', displayName: "付款主体",  width: 215, cellTooltip: true},
      {name: 'ZFKZL', displayName: "付款种类",  width: 100, cellTooltip: true},
      {name: 'LOEVM', displayName: "是否作废",  width: 100, cellTooltip: true},
      {name: 'hasprint', displayName: "是否打印",  width: 100, cellTooltip: true,enableSorting: true},
      {
        name: 'actions',
        displayName: "操作",
        enableSorting: false,
        pinnedRight: true,
        width: 100,
        cellTemplate: 'paymentAction.html'
      }
    ];

    vm.tableSelectRow = function() {
      if(vm.tableApi && vm.loadData) return;
      $timeout(function() {
        var _select = vm.tableApi.selection;
        // 监听单选
        _select.on.rowSelectionChanged(vm, function(row){
          var id = row.entity.ZSQNO, action = row.isSelected ? 'add' : 'remove',
          index = vm.tableApi.grid.renderContainers.body.visibleRowCache.indexOf(row);
          updateSelected(action, id, index , row.entity.hbing, row.entity.ZSQNO_HB, row.entity.ZHB);
          // if(row.isSelected) {
          //   vm.cArr.push(id);
          // } else {
          //   for(var i = vm.cArr.length - 1; i >= 0; i--) {
          //     if(vm.cArr[i] === id) { vm.cArr.splice(i, 1); }
          //   }
          // }
        });
        // 监听全选
        _select.on.rowSelectionChangedBatch(vm, function(rows){
          // for(var i = rows.length - 1; i >= 0; i--) {
          if(rows[0].isSelected) {
            $scope.allCheck(rows[0].isSelected);
            // vm.cArr[i] = rows[i].entity.XBLNR
          } else {
            // vm.cArr.splice(i, 1);
            $scope.emptyFn();
          }
          // }
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
                ZSQNO: $scope.ZSQNO,
                ZFKZT: $scope.ZFKZT,
                ZFKZL: $scope.ZFKZL,
                ZSKDW: $scope.ZSKDW,
                AUFUSER0: $scope.AUFUSER0,
                ZSJDAT: $scope.ZSJDAT,
                ZFKSTA: $scope.ZFKSTA,
                HAS_HB: $scope.HAS_HB,
                ZCGSW: $scope.ZCGSW,
                EBELN: $scope.EBELN,
                LOEVM : $scope.LOEVM ,
                ZZPO: $scope.ZZPO
            };
            var customerPromise = payment.listInside(param);
            customerPromise.success(function (data) {
              if (data.code = 200) {
                var list = data.rst.data.items;
                list.forEach(function (v, k) {
                  _.forEach(v, function (val, key) {
                    switch (key) {
                      case 'ZHB':
                        v[key] = {Y: '是', N: '否'}[val];
                        break;
                      case 'ZJHDAT':
                        v[key] = val === "0000-00-00" ? "" : val;
                        break;
                      case 'ZSJDAT':
                        v[key] = val === "0000-00-00" ? "" : val;
                        break;
                      case 'ZFKZT':
                        v[key] = vm.enumobj.ZFKZT[val];
                        break;
                      case 'ZFKZL':
                        var _field = getField(vm.payData, 'CODE1', val.substring(0,2));
                        v[key] = _field !== undefined ? _field.TITLE : "";
                        break;
                      case 'hasprint': // 是否打印
                        v[key] = val ? '是' : '否';
                        break;
                      case 'LOEVM':
                         v[key] =val=="X"?"是":"否";
                         break;
                    }
                  });
                });
                if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
                genTable(vm.tableOptions, vm.tableHeader, list, function (data) {
                  var dataLen = data.data.length;
                  if(dataLen) {
                    vm.loadData = true;
                    if(dataLen < 10) {
                      angular.element('.grid').height(
                        data.data.length * data.rowHeight + data.headerRowHeight + 15
                      );
                    } else {
                      angular.element('.grid').height(
                        10 * data.rowHeight + data.headerRowHeight + 15
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
              }
            });
            $scope.opprev = $rootScope.opprev;  //权限控制
            $scope.paginationConf.pagePromise = customerPromise;
            $scope.emptyFn && $scope.emptyFn();
        }
    };
    $scope.enumobj = {ZFKZT: {1000: "中建材信息技术股份有限公司", 9000: "中建材集团进出口公司", 9001: "中国建材（香港）有限公司"}};
    $scope.cArr = [];
    $scope.cArrIndex = [];
    $scope.cArrcode = [];
    var updateSelected = function (action, id, index, hbing, checkbox,ZSQNO_HB) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrIndex.push(index);
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrIndex.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, index, hbing,ZSQNO_HB,ZHB) {

        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, index, hbing, checkbox,ZSQNO_HB);
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
    };
    $scope.allCheck = function (check) {
        if (check) {
            for (var i = 0; i < $scope.dataList.length; i++) {
                $scope.cArr[i] = $scope.dataList[i].ZSQNO;
                $scope.cArrIndex[i] = i;
            }
        } else {
            $scope.cArr = [];
            $scope.cArrIndex = [];
        }
    };
    $scope.colPay = function () {
        if ($scope.cArr.length <= 0) {
            swal("请勾选列表", "", "warning");
            return false;
        } else {
            var ZSKDW = $scope.dataList[$scope.cArrIndex[0]].ZSKDW;
            var ZFKZL = $scope.dataList[$scope.cArrIndex[0]].ZFKZL.substring(0, 2);
            for (var i = 0; i < $scope.cArrIndex.length; i++) {
                console.log($scope.dataList[$scope.cArrIndex[i]].ZSKDW)
                console.log($scope.dataList[$scope.cArrIndex[i]].ZFKZL.substring(0, 2))
                if ($scope.dataList[$scope.cArrIndex[i]].ZSKDW != ZSKDW || $scope.dataList[$scope.cArrIndex[i]].ZFKZL.substring(0, 2) != ZFKZL) {
                    swal("所选记录必须供应商、付款种类第一级别全部一致", "", "warning");
                    return false;
                }
            }
            var checkdohb= payment.checkdohb ({ZSQNOs: $scope.cArr});
            checkdohb .success(function (data) {
                if (data.code == 200) {
                    if(data.rst.data.canhb!=true){
                        swal(data.rst.data.msg, "", "warning");
                        return false;
                    }else{
                        $state.go('paymentOrderAdd', {payCode: $scope.cArr});
                    }
                }
            });

        }
    }
    $scope.printFn = function (e) {
        if ($scope.cArr.length <= 0) {
            swal("请勾选列表", "", "warning");
            $(e.target).attr('href', 'javascript:void(0);');
            return false;
        } else {
            $(e.target).attr('href', '/print/printht.html?uri=/credit/printview&ZSQNO=' + $scope.cArr.join(';;'));
        }
    };
    $scope.destroy=function(ZSQNON){
        swal({title: "是否作废？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "否",
                confirmButtonText: "是" },
            function(){
                var checkdozf= payment.checkdozf({ZSQNO:ZSQNON});
                checkdozf .success(function (data) {
                    if (data.code == 200) {
                        if(data.rst.data.canzf==false){
                            swal(data.rst.data.msg, "", "warning");
                            return false;
                        }else{
                            var viewCont = payment.viewInside({sapid:ZSQNON});
                            viewCont.success(function (data) {
                                var doc = {}, param = {processId: $scope.processId, nodeId: $scope.nodeId,sapid:ZSQNON};
                                doc.HEADER_DATA =data.rst.data.model;
                                doc.HEADER_DATA.LOEVM="X";
                                doc.PO_DATA = data.rst.data.pos;
                                doc.HX_DATA =data.rst.data.hxs;
                                doc.IO_DATA =data.rst.data.ios;
                                doc.HB_DATA = data.rst.data.hbs;
                                doc.DN_DATA = data.rst.data.dns ;
                                doc.DOCTYPE = 'FKZF'
                                param.doc = doc;
                                var applyAdd = payment.applyAdd(param);
                                applyAdd.success(function (data) {
                                    if (data.code == 200) {
                                        swal("作废提交成功", "", "success");
                                        $scope.processId = data.rst.processId;
                                        $scope.nodeId = data.rst.nodeId;
                                    }
                                    else {
                                        swal(data.msg, "", "warning");
                                    }
                                });
                            });
                        }
                    }
                });
            }
        );


    }
    $scope.payChge=function(ZSQNO1){
        var checkdobg= payment.checkdobg({ZSQNO:ZSQNO1});
        checkdobg .success(function (data) {
            if (data.code == 200) {
                if(data.rst.data.canbg ==false){
                    swal(data.rst.data.msg, "", "warning");
                    return false;
                }else{
                    window.location.href = '/index.html#/hbEdit?sapid='+ZSQNO1;
                }
            }
        });
    }
}]);
paymentApp.controller('boxCtrl', ['$scope', 'paymentServices', function ($scope, payment) {
    $scope.paginationConf = {
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
                ZSKDW: $scope.ZSKDW
            };
            var customerPromise = payment.listBox(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.cusSelect = function (LIFNR, NAME1, BANKA, BANKN,PROVZ,ORT01) {
        if (BANKA == '' || BANKN == '') {
            swal('请先维护该供应商银行信息，方可创建付款申请', '', 'warning');
            return false;
        }
        $scope.ORDER_DATA.ZSKDW = NAME1;//供应商名称
        $scope.ORDER_DATA.LIFNR = LIFNR;//供应商编号
        $scope.ORDER_DATA.ZYHZH = BANKN;//银行账号
        $scope.ORDER_DATA.ZYHMC_CN = BANKA;//银行名称
        $scope.ORDER_DATA.PROVZ = PROVZ;
        $scope.ORDER_DATA.ORT01 = ORT01;
        $("#tipBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
}]);
paymentApp.controller('cgCtrl', ['$scope', 'paymentServices', function ($scope, payment) {
    var enumPur = payment.enumPurchase();
    enumPur.success(function (data) {
        if (data.code == 200) {
            $scope.enumObj = data.rst.enum;
            //console.log($scope.enumObj)
        } else {
        }

    });
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var param;
            if($scope.EBELN){
                param = {
                    page: $scope.paginationConf.currentPage,
                    limit: $scope.paginationConf.itemsPerPage,
                    EBELN: [$scope.EBELN],
                    LIFNR: $scope.ORDER_DATA.LIFNR,
                    ZFKZT: $scope.ORDER_DATA.ZFKZT,
                };
            }else{
                param = {
                    page: $scope.paginationConf.currentPage,
                    limit: $scope.paginationConf.itemsPerPage,
                    EBELN: [],
                    LIFNR: $scope.ORDER_DATA.LIFNR,
                    ZFKZT: $scope.ORDER_DATA.ZFKZT,
                };
            }

            var customerPromise = payment.cgData(param);
            $scope.paginationConf.pagePromise = customerPromise;
            $scope.emptyFn();
        }
    };
    $scope.ccSelect = function () {
        if($scope.cArr.length==0){
            swal("请勾选数据", "", "warning");
            return false;
        }
        for(var i=0;i<$scope.cgList.length;i++){
            /*if($scope.cgList[i].ZYWYF==ZYWYF){
                swal("此条数据已添加", "", "warning");
                return false;
            }*/
            for(var j=0;j<$scope.cArr.length;j++){
                if($scope.cgList[i].ZYWYF==$scope.cArr[j].ZYWYF){
                    swal("应付编号是"+$scope.cArr[j].ZYWYF+"的数据已存在", "", "warning");
                    return false;
                }
            }
        }

       /* para.EBELN = EBELN;
        para.ZZPO = ZZPO;
        para.ZZCP = ZZCP;
        para.ZZCPTXT = $scope.enumObj.ZZCP[ZZCP];
        para.EKORG = EKORG;
        para.EKORGTXT = $scope.enumObj.EKORG[EKORG];
        para.BSART = BSART;
        para.BSARTTXT = $scope.enumObj.BSART[BSART];
        para.ZZYS = ZZYS;
        para.ZSQJE = ZYFJE;
        para.ZZJHRQ = ZZJHRQ;
        para.ZSWRY = ZSWRY;
        para.ZYWYF = ZYWYF;
        para.ZYFJE = ZYFJE;
        para.ZZSDPO = ZZSDPO;
        para.ZPOJE = ZPOJE;*/
        $("#cgBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.cgDialog=false;
        $scope.$emit('to-cg', $scope.cArr);
    }
    $scope.ccCancle=function () {
        $("#cgBox").dialog("destroy");
        $(".ui-dialog").remove();

    }
    $scope.cArr = [];
    var updateSelected1 = function (action, dataList, index) {
        if (action == 'add') {
            /*for(var i=0;i<$scope.cgList.length;i++){
                if($scope.cgList[i].ZYWYF==dataList[index].ZYWYF){
                    swal("此条数据已添加", "", "warning");
                    return false;
                }
            }*/
            $scope.cArr.push(_.extend(dataList[index],{'ZPOJE':dataList[index].NETPR,'ZZCPTXT':$scope.enumObj.ZZCP[dataList[index].ZZCP],'EKORGTXT':$scope.enumObj.EKORG[dataList[index].EKORG],'BSARTTXT':$scope.enumObj.BSART[dataList[index].BSART]}));
        }
        if (action == 'remove') {
            for (var i = 0; i < $scope.cArr.length; i++) {
                console.log($scope.cArr[i])
                if ($scope.cArr[i].ZYWYF== dataList[index].ZYWYF) {
                    $scope.cArr.splice(i, 1);
                }
            }
        }
    };
    $scope.updateSelection1 = function ($event, dataList, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected1(action, dataList, index);
    };
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
    };
    $scope.allCheck1 = function (check,dataList,all) {
        if (all) {
            for(var i= 0,l=dataList.length;i<l;i++){
                dataList[i].check=true;
                $scope.cArr.push(_.extend(dataList[i],{'ZPOJE':dataList[i].NETPR,'ZZCPTXT':$scope.enumObj.ZZCP[dataList[i].ZZCP],'EKORGTXT':$scope.enumObj.EKORG[dataList[i].EKORG],'BSARTTXT':$scope.enumObj.BSART[dataList[i].BSART]}));
            }
        } else {
            $scope.cArr = [];
        }
    };
}]);
paymentApp.controller('cxCtrl', ['$scope', 'paymentServices', function ($scope, payment) {
    $scope.paginationConf = {
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
                ZLSH: $scope.ZSQNO,
                LIFNR: $scope.ORDER_DATA.LIFNR,
                ZBUKRS: $scope.ORDER_DATA.ZFKZT,
            };
            param.LIFNR = $scope.ORDER_DATA ? $scope.ORDER_DATA.LIFNR : '';
            var customerPromise = payment.cxdkData(param);
            $scope.paginationConf.pagePromise = customerPromise;

        }
    };
    $scope.$on('cxCtrl', function (d, data) {
        $scope.paginationConf.onChange(data);

    });

    $scope.cusSelect = function (ZSQNO, left,ZJE) {
        for(var i=0;i<$scope.cxList.length;i++){
            if($scope.cxList[i].ZSQNO_YF==ZSQNO){
                swal("一个流水号在一个付款申请中只可添加一次", "", "warning");
                return false;
            }
        };
        var para = {};
        para.ZSQNO_YF = ZSQNO;
        para.left = left;
        para.ZJE = ZJE;

        $("#cxBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.$emit('to-cx', para);
    }
}]);
paymentApp.controller('dkCtrl', ['$scope', 'paymentServices', function ($scope, payment) {
    $scope.paginationConf = {
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
                ZLSH: $scope.ZSQNO,
                ZBUKRS: $scope.ORDER_DATA.ZFKZT,
                LIFNR: $scope.ORDER_DATA.LIFNR,
                ZZPO: $scope.ZZPO
            };
            param.LIFNR = $scope.ORDER_DATA ? $scope.ORDER_DATA.LIFNR : '';
            var customerPromise = payment.selectdk2(param);
            $scope.paginationConf.pagePromise = customerPromise;

        }
    };
    $scope.$on('dkCtrl', function (d, data) {
        $scope.paginationConf.onChange(data);
    });

    $scope.cusSelect = function (ZLSH, ZZPO, left,ZJE) {
        for(var i=0;i<$scope.cxList.length;i++){
            if($scope.cxList[i].ZSQNO_YF==ZLSH){
                swal("一个流水号在一个付款申请中只可添加一次", "", "warning");
                return false;
            }
        };
        var para = {};
        para.ZSQNO_YF = ZLSH;
        para.ZZPO = ZZPO;
        para.left = left;
        para.ZJE = ZJE;
        $("#dkBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.$emit('to-dk', para);
    }
}]);
paymentApp.controller('cxppCtrl', ['$scope', 'paymentServices', function ($scope, payment) {
    $scope.paginationConf = {
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
                ZLSH: $scope.ZMZSBH,
                LIFNR: $scope.ORDER_DATA.LIFNR,
                ZBUKRS: $scope.ORDER_DATA.ZFKZT,
            };

            param.ZSKDW = $scope.ORDER_DATA ? $scope.ORDER_DATA.ZSKDW : '';
            var customerPromise = payment.cxppData(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.$on('cxppCtrl', function (d, data) {
        $scope.paginationConf.onChange(data);
    });

    $scope.cusSelect = function (VBELN, left,ZJE) {
        for(var i=0;i<$scope.cxList.length;i++){
            if($scope.cxList[i].ZSQNO_YF==VBELN){
                swal("一个流水号在一个付款申请中只可添加一次", "", "warning");
                return false;
            }
        };
        var para = {};
        para.ZSQNO_YF = VBELN;
        para.left = left;
        para.ZJE = ZJE;
        $("#cxppBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.$emit('to-cxpp', para);
    }
}]);
paymentApp.controller('nbCtrl', ['$scope', 'paymentServices', function ($scope, payment) {
    var costcenterflat = payment.costcenterflat();
    costcenterflat.success(function (data) {
        $scope.cenData = data;
    });
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage: 0,
        pagesLength: 10,
        height: 400,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function (AUFNR) {
            var param = {

                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                AUFNR: $scope.AUFNR,
                ZINORD: $scope.ZINORD,
                BU1: $scope.$parent.ORDER_DATA.BU1,
                BU2: $scope.$parent.ORDER_DATA.BU2
                // BU3: $scope.$parent.ORDER_DATA.BU3
            };
            var customerPromise = payment.nbData(param);
            customerPromise.success(function (data) {
                if (data.code == 200) {
                    $scope.nbDataList = data.rst.data.items;
                    for(var i=0;i<$scope.nbDataList.length;i++){
                        $scope.nbDataList[i].WTGES=Math.round( $scope.nbDataList[i].WTGES*100)/100;
                        $scope.nbDataList[i].left=Math.round( $scope.nbDataList[i].left*100)/100;
                    }
                }
            })
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

    $scope.$on('to-nbData', function (d, data) {
        $scope.AUFNR="";
        $scope.nbDataList=[];
    });
    $scope.cusSelect = function (AUFNR,ZINORD,ZSQNR, ZYSJE, WTGEV, left,RESPCCTR) {
        var para = {};
        para.AUFNR = AUFNR;
        para.ZINORD = ZINORD;
        para.ZSQNR = ZSQNR;
        para.ZYSJE = ZYSJE;
        para.ZYFP = WTGEV;
        para.WZYFP = left;
        para.RESPCCTR = RESPCCTR;
        $("#nbBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.$emit('to-nb', para);
    }
}]);


paymentApp.controller('paymentOrderAddCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', 'paymentServices', function ($scope, $rootScope, $filter, $stateParams, payment) {
    var ORDER_DATA = $scope.ORDER_DATA = {};
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.filterFn=function(data){
        var returnVal=(data.BU1.CODE1!="16");
        return returnVal;
    }
    var payData = payment.enumPay();
    payData.success(function (data) {
        // 付款种类信息
        var fkzlMsg = {};
        fkzlMsg = data;
        for(var i=0;i<fkzlMsg.length;i++){
            if(fkzlMsg[i].BU1.TITLE == '直接运营费用'){
                for(j=0;j<fkzlMsg[i].BU1.BU2.length;j++){
                    if(fkzlMsg[i].BU1.BU2[j].CODE2=='52'){
                        fkzlMsg[i].BU1.BU2.splice(j,1);
                    }
                }
            }
        }
        $scope.payData = fkzlMsg;

    });
    $scope.ORDER_DATA.WAERS = "CNY";
    /* $scope.goShow = false;*/
    $scope.ORDER_DATA.ZFKZT = "1000";
    $scope.sfCol = true;
    $scope.ORDER_DATA.ZHB = "N";
    $scope.centerShow =true;
    var today = new Date();
    $scope.ORDER_DATA.ZSQRQ = $filter('date')(today, 'yyyy-MM-dd');
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.AUFUSER0 = person.user.name;
    $scope.ORDER_DATA.ZSQBM = person.user.orgname;
    $scope.ORDER_DATA.ZSQRID = person.user.login;
    $scope.ORDER_DATA.ZBMID = person.user.orgid;
    //抵扣权限
    var dkLimit = $rootScope.busiRoles;
    console.log(dkLimit)
    $scope.dkShow= false;
    $scope.dkShow1= false;
    for(var ii=0;ii<dkLimit.length;ii++){
        if(dkLimit[ii].code=='xinxi_caigouzhuanyuan'||dkLimit[ii].code=='xinxi_caigouzhuguan'){
            $scope.dkShow = true;
            $scope.dkShow1 = false;
        }else if(dkLimit[ii].code=='yyglb_neimao_jingli'||dkLimit[ii].code=='yyglb_guoji_jingli'||dkLimit[ii].code=='yyglb_neimao_xiaoshouzhixing'||dkLimit[ii].code=='yyglb_neimao_yuanchangxianjie'||dkLimit[ii].code=='yyglb_guoji_hetongzhixing'){
            $scope.dkShow1= true;
            $scope.dkShow = false;
        }
    }

    $scope.fkztChange = function () {
        $scope.cgList = [];
        $scope.cxList = [];
        $scope.sumcgList = 0;
        $scope.sumcxList = 0;
    };
    $scope.customerBox = function () {
        $("#tipBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#tipBox").dialog("open");
        $scope.$watch('ORDER_DATA.ZSKDW', function (newValue, oldValue, scope) {
            if (newValue != oldValue) {
                scope.cgList = [];
                scope.cxList = [];
                scope.dns = [];
                scope.sumcgList = 0;
                scope.sumcxList = 0;

            }
        });
    };
    $scope.payChange = function (type) {//付款种类
        $scope.ORDER_DATA.BU2 = "";
        $scope.ORDER_DATA.BU3 = "";
        if (!$stateParams.payCode) {
            if (type == "15") {
                $scope.cgOrder = true;
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.centerShow =true;
                $scope.ORDER_DATA.KOSTL ='';
                $scope.transportShow=false;
                $scope.nbList=[];
                $scope.sumnbList="";
                $scope.dns=[];
                $scope.ORDER_DATA.KOSTL='';
            } else {
                $scope.cgOrder = false;
                $scope.cgList = [];
                $scope.sumcgList ='';
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.centerShow =false;
                $scope.transportShow=false;
            }
        }

    }
    $scope.payChange2 = function (type) {//付款种类2级
        $scope.ORDER_DATA.BU3 = "";
        if(!$stateParams.payCode){
            if($scope.ORDER_DATA.BU1=="15"){
                $scope.cgOrder = true;
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.centerShow =true;
                $scope.transportShow=false;
                $scope.ORDER_DATA.KOSTL='';

            }else{
                if($scope.ORDER_DATA.BU1=="19"&&type=="56"){
                    $scope.transportShow=true;
                    $scope.cgOrder = false;
                    $scope.glOrder = false;
                    $scope.sfCol = false;
                    $scope.centerShow =false;
                    $scope.cgList =[];
                    $scope.sumcgList ="";
                    $scope.cxList =[];
                    $scope.sumcxList ="";
                    $scope.nbList=[];
                    $scope.sumnbList="";

                }else{
                    if($scope.ORDER_DATA.BU2&&$scope.nbList.length){
                        $scope.nbList=[];
                    }
                    $scope.cgOrder = false;
                    $scope.glOrder = true;
                    $scope.sfCol = true;
                    $scope.centerShow =false;
                    $scope.transportShow=false;
                    $scope.cgList =[];
                    $scope.sumcgList ="";
                    $scope.cxList =[];
                    $scope.sumcxList ="";
                    $scope.dns=[];
                }
            }
        }

    }

    var enumPur = payment.enumPurchase();
    enumPur.success(function (data) {
        if (data.code == 200) {
            $scope.enumObj = data.rst.enum;
            //console.log($scope.enumObj)
        } else {
        }

    });
    //成本中心
    var enumlist= payment.enumlist();
    enumlist.success(function (data) {
        if (data.code == 200) {
            $scope.costcenterSel = data.rst.data.costcenter;
            $scope.provinceData=data.rst.data.province;
        }

    });
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    $scope.payCostcenterFn = function () {
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 500,
            modal: true
        });
        $("#costCenterDialog").dialog("open");
        $scope.groupsTreeModel = $scope.costcenterSel;
        $scope.showSelected = function (sel) {
            $scope.selectedNode = sel;
        };
        $scope.selectTypeFn = function () {
            var val = $scope.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
            $scope.ORDER_DATA.KOSTL= val.code;
            $scope.ORDER_DATA.KOSTLTEXT= val.text;
            $scope.nbList=[];
            $scope.sumnbList='';
            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.typeChange = function (type) {//付款方式
        if (type == "国内信用证") {
            $scope.type1 = true;
        } else {
            $scope.type1 = false;
        }
    }
    var cgList = $scope.cgList = [];
    var cxList = $scope.cxList = [];
    var nbList = $scope.nbList = [];
    var payList = $scope.payList = [];
    if ($stateParams.orderLifnr) {
        var orderLifnr = $stateParams.orderLifnr;
        var orderEBELN = $stateParams.orderEBELN;
        var orderName = $stateParams.orderName;
        if ($.type(orderLifnr) == "string"){
            orderLifnr=[orderLifnr];
            orderEBELN=[orderEBELN];
            orderName=[orderName];
        }
        var par = {LIFNR: orderLifnr[0], EBELN: orderEBELN, page: 1, limit: 5};
        var purchasePromise = payment.cgData(par);
        purchasePromise.success(function(data){
            if (data.code == 200){
                if(data.rst.data.items.length>0){
                    var toal = 0;
                    $scope.cgList=$scope.cgList.concat(data.rst.data.items);
                    $scope.ORDER_DATA.ZCGSW=$scope.cgList[0].ZSWRY;
                    for (var i = 0; i < data.rst.data.items.length; i++){
                        $scope.cgList[i].EKORGTXT = $scope.enumObj.EKORG[data.rst.data.items[i].EKORG];
                        $scope.cgList[i].BSARTTXT = $scope.enumObj.BSART[data.rst.data.items[i].BSART];
                        $scope.cgList[i].ZZCPTXT = $scope.enumObj.ZZCP[data.rst.data.items[i].ZZCP];
                        $scope.cgList[i].ZPOJE = data.rst.data.items[i].NETPR;
                        toal += parseFloat($scope.cgList[i].ZSQJE);

                    }
                    $scope.sumcgList = toal;
                    var lifnr = orderName[0];
                    var param = {limit: 100, page: 1, ZSKDW: lifnr};
                    var customerPromise = payment.listBox(param);
                    customerPromise.success(function (data) {
                        if(data.rst.data.items.length > 0){
                            for (var x in data.rst.data.items) {
                                if (orderLifnr[0] == data.rst.data.items[x].LIFNR) {
                                    $scope.ORDER_DATA.ZSKDW = data.rst.data.items[x].NAME1+data.rst.data.items[x].NAME2;
                                    $scope.ORDER_DATA.LIFNR = data.rst.data.items[x].LIFNR;
                                    $scope.ORDER_DATA.ZYHMC_CN = data.rst.data.items[x].BANKA;
                                    $scope.ORDER_DATA.ZYHZH = data.rst.data.items[x].BANKN;
                                    $scope.ORDER_DATA.PROVZ = data.rst.data.items[x].PROVZ;
                                    $scope.ORDER_DATA.ORT01 = data.rst.data.items[x].ORT01;
                                    if ($scope.ORDER_DATA.ZSKDW == '' || $scope.ORDER_DATA.LIFNR == '' || $scope.ORDER_DATA.ZYHMC_CN == '' || $scope.ORDER_DATA.ZYHZH == '') {
                                        swal('请先维护该供应商银行信息，方可创建付款申请', '', 'warning');
                                        return false;
                                    }
                                }
                            }
                        }else{
                            swal('请先维护该供应商银行信息，方可创建付款申请', '', 'warning');
                        }

                    })
                }
            }
        })
        $scope.ORDER_DATA.BU1 = "15";
        $scope.cgOrder = true;
        $scope.glOrder = false;
    }
    if ($stateParams.payCode) {//合并付款单
        $scope.payState = true;
        $scope.sfCol = true;
        $scope.ORDER_DATA.ZHB = "N";
        if ($.type($stateParams.payCode) == "string") {
            $stateParams.payCode = [$stateParams.payCode];
        }
        var ZSQJE = 0, ZWHXJE = 0, ZSJFKJE = 0;
        for (var j = 0; j < $stateParams.payCode.length; j++) {
            var param = {ZSQNO: $stateParams.payCode[j]};
            var payDate = payment.listInside(param);
            payDate.success(function (data) {
                if (data.code == 200) {
                    if(j==0){
                        $scope.ORDER_DATA.ZDFQK = data.rst.data.items[0].ZDFQK;
                    }
                    if(j!=0&&$scope.ORDER_DATA.ZDFQK != data.rst.data.items[0].ZDFQK){
                        $scope.ORDER_DATA.ZDFQK='非垫付款';
                    }
                    $scope.ORDER_DATA.ZSKDW = data.rst.data.items[0].ZSKDW;
                    $scope.ORDER_DATA.LIFNR = data.rst.data.items[0].LIFNR;
                    $scope.ORDER_DATA.ZYHMC_CN = data.rst.data.items[0].ZYHMC_CN;
                    $scope.ORDER_DATA.ZYHZH = data.rst.data.items[0].ZYHZH;
                    $scope.ORDER_DATA.PROVZ = data.rst.data.items[0].PROVZ;
                    $scope.ORDER_DATA.ORT01 = data.rst.data.items[0].ORT01;
                    $scope.ORDER_DATA.BU1 = data.rst.data.items[0].ZFKZL.substring(0, 2);
                    if ($scope.ORDER_DATA.BU1 == "15") {
                        $scope.centerShow =true;

                    } else {
                        $scope.centerShow =false;
                    }
                    $scope.payList.push(data.rst.data.items[0]);
                    ZSQJE += (data.rst.data.items[0].ZSQJE);
                    ZWHXJE += (data.rst.data.items[0].ZWHXJE);
                    ZSJFKJE += (data.rst.data.items[0].ZSJFKJE);
                    $scope.ORDER_DATA.ZSQJE = parseFloat(ZSQJE.toFixed(2));
                    $scope.ORDER_DATA.ZWHXJE = ZWHXJE.toFixed(2);
                    $scope.ORDER_DATA.ZSJFKJE = ZSJFKJE.toFixed(2);
                }
            });

        }


    } else {
        $scope.payState = false;
    }
    $scope.comeAdd = function (type) {
        if (type == 'cgList') {//采购订单
            $("#cgBox").dialog({
                autoOpen: false,
                width:1000,
                height: 400,
                modal: true
            });
            $("#cgBox").dialog("open");
            $scope.cgDialog=true;
        } else if (type == 'cxList') {//冲抵核销信息
            var obj = {ZCDLX: '', ZSQNO_YF: '', ZZPO: '', left: '', EBELN: '', ZCDJE: ''};
            $scope.cxList.push(obj);
        } else if (type == 'nbList') {//内部订单
            var obj = {AUFNR: '',ZINORD:'', ZSQNR:'', ZYSJE: '', ZYFP: '', WZYFP: '', ZSQJE: ''};
            $scope.nbList.push(obj);
        }
    }
    //合并添加付款单
    $scope.cArr = [];
    $scope.cArrIndex = [];
    var updateSelected = function (action, id, index, hbing, checkbox) {
        if (action == 'add') {
            if (hbing == true) {
                swal("付款申请号" + id + "正在合并中", "", "warning");
                $scope.paymentList[index].check=false;
                return false;
            }else{
                $scope.cArr.push($scope.paymentList[index]);
                $scope.cArrIndex.push(index);
            }

        }
        if (action == 'remove') {
            for (var i = 0; i < $scope.cArr.length; i++) {
                if ($scope.cArr[i].ZSQNO == id) {
                    $scope.cArr.splice(i, 1);
                    $scope.cArrIndex.splice(i, 1);
                }
            }
        }
    };
    $scope.updateSelection = function ($event, id, index, hbing,ZHB) {
        var checkbox = $event.target;
        var checkdohb= payment.checkdohb ({ZSQNOs: [id]});
        checkdohb .success(function (data) {
            if (data.code == 200) {
                if(data.rst.data.canhb!=true){
                    swal(data.rst.data.msg, "", "warning");
                    $scope.paymentList[index].check=false;
                    return false;
                }else{
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id, index, hbing, checkbox);
                }
            }
        });
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
    };
    $scope.allCheck = function ($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.paymentList.length; i++) {
                if($scope.paymentList[i].ZHB=='N'){
                    swal( $scope.paymentList[i].ZSQNO + "付款单不能合并", "", "warning");
                    checkbox.checked=false;
                    $scope.paymentList[i].check=false;
                }else{
                    $scope.paymentList[i].check=true;
                    $scope.cArr[i] = $scope.paymentList[i];
                    $scope.cArrIndex[i] = i;
                }

            }
        } else {
            $scope.cArr = [];
            $scope.cArrIndex = [];
        }
    };
    $scope.payAdd = function () {
        var ary=[];
        for(var i=0;i<$scope.payList.length;i++){
            ary.push($scope.payList[i].ZSQNO);
        }
        var par = {
            LIFNR: $scope.ORDER_DATA.LIFNR,
            ZHB: 'Y',
            ZFKZL: $scope.ORDER_DATA.BU1,
            ZFKSTA: '未付款',
            choosedsubs: ary,
            HAS_HB:'N'
        };
        var payPromise = payment.listInside(par);
        payPromise.success(function (data) {
            if (data.code == 200) {
                $("#payAddList").dialog({
                    autoOpen: false,
                    width:1200,
                    modal: true
                });
                $("#payAddList").dialog("open");
                $scope.enumobj = {ZFKZT: {1000: "中建材信息技术股份有限公司", 9000: "中建材集团进出口公司", 9001: "中国建材（香港）有限公司"}};
                $scope.paymentList = data.rst.data.items;
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
    $scope.payCancle = function () {
        $("#payAddList").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.paySelect = function () {
        $scope.payList = $scope.payList.concat($scope.cArr);
        var sqNum= 0,whxNum= 0,sjNum=0;
        for(var i=0;i<$scope.payList.length;i++){
            sqNum+=$scope.payList[i].ZSQJE;
            whxNum+=$scope.payList[i].ZWHXJE;
            sjNum+=$scope.payList[i].ZSJFKJE;
        }
        $scope.ORDER_DATA.ZSQJE=sqNum.toFixed(2);
        $scope.ORDER_DATA.ZWHXJE=whxNum.toFixed(2);
        $scope.ORDER_DATA.ZSJFKJE=sjNum.toFixed(2);
        $scope.cArr = [];
        $scope.cArrIndex = [];
        $("#payAddList").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.comeDel = function (idx, type) {
        if (type == 'cgList') {
            /*if(cgList.length <= 1){
             alert("不能再删了！");
             return false;
             }*/
            /* for (var x in $scope.cgList) {
             $scope.sumcgList = $scope.sumcgList - $scope.cgList[idx].ZSQJE;
             break;
             }*/
            $scope.sumcgList = ($scope.sumcgList - $scope.cgList[idx].ZSQJE).toFixed(2);
            $scope.cgList.splice(idx, 1);
            if ($scope.cgList.length != 0) {
                $scope.ORDER_DATA.ZCGSW = $scope.cgList[0].ZSWRY;
            } else {
                $scope.ORDER_DATA.ZCGSW = "";
            }

        } else if (type == 'cxList') {
            /*for (var x in $scope.cxList) {
             $scope.sumcgList = $scope.sumcgList - $scope.cxList[idx].ZCDJE;
             break;
             }*/
            $scope.sumcxList = ($scope.sumcxList - $scope.cxList[idx].ZCDJE).toFixed(2);
            $scope.cxList.splice(idx, 1);
        } else if (type == 'nbList') {
            /*for (var x in $scope.nbList) {
             $scope.sumnbList = $scope.sumnbList - $scope.nbList[idx].ZSQJE;
             break;
             }*/
            $scope.sumnbList = ($scope.sumnbList - $scope.nbList[idx].ZSQJE).toFixed(2);
            $scope.nbList.splice(idx, 1);
            for(var j=0;j<$scope.nbList.length;j++){
                if($scope.nbList[j].AUFNR){
                    $scope.flagCost=true;
                }
            }
            if($scope.flagCost!=true){
                $scope.ORDER_DATA.KOSTL='';
            }
        } else if (type == 'payList') {
            $scope.payList.splice(idx, 1);
            var sqNum= 0,whxNum= 0,sjNum=0;
            for(var i=0;i<$scope.payList.length;i++){
                sqNum+=$scope.payList[i].ZSQJE;
                whxNum+=$scope.payList[i].ZWHXJE;
                sjNum+=$scope.payList[i].ZSJFKJE;
            }
            $scope.ORDER_DATA.ZSQJE=sqNum.toFixed(2);
            $scope.ORDER_DATA.ZWHXJE=whxNum.toFixed(2);
            $scope.ORDER_DATA.ZSJFKJE=sjNum.toFixed(2);
        }
    }
    $scope.sumcgList = $scope.sumnbList = $scope.sumcxList = 0;
    $scope.sumFn = function (ZYFJE, ZSQJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if (ZYFJE * 1 < ZSQJE * 1) {
            swal({
                    title: "申请支付金额大于应付金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.cgList[index].ZSQJE = "";
                    })
                }
            );
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        $scope['sum' + id] = sum.toFixed(2);
        /*$scope.ORDER_DATA.ZSQJE = sum;*/

    }
    $scope.sumFn1 = function (left, ZCDJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if (left * 1 < ZCDJE * 1) {
            swal({
                    title: "冲抵金额不能大于可用冲抵金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.cxList[index].ZCDJE = "";
                        var sum = 0;
                        for(var i=0;i<$scope.cxList.length;i++){
                            sum+=$scope.cxList[i].ZCDJE;
                        }
                        $scope.sumcxList = (sum*1).toFixed(2) ;
                    })
                }
            );
            return false;
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        $scope['sum' + id] = sum.toFixed(2);
    }
    $scope.sumFn2 = function (ZYFP, ZSQJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if ($scope.nbList[index].AUFNR) {
            $scope.fyShow = true;
        } else {
            $scope.fyShow = false;
        }
        if (ZYFP * 1 < ZSQJE * 1) {
            swal({
                    title: "本次申请支付金额不能大于未使用金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.nbList[index].ZSQJE = "";
                    })
                }
            );
            return false;
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        $scope['sum' + id] = sum.toFixed(2);
    }
    //采购申请单
    var cgindex = 0;
    $scope.cgData = function (index) {
        /* $scope.$broadcast('cgCtrl', $scope.ORDER_DATA.LIFNR);*/
        $("#cgBox").dialog({
            autoOpen: false,
            width:1000,
            height: 400,
            modal: true
        });
        $("#cgBox").dialog("open");
        cgindex = index;
    }
    $scope.$on('to-cg', function (d, data) {
        if ($scope.cgList.length == 0) {
            $scope.ORDER_DATA.ZCGSW = data[0].ZSWRY;
        }
        $scope.cgList=$scope.cgList.concat(data);
        var total = 0;
        for (var m = 0; m < $scope.cgList.length; m++) {
            total += eval($scope.cgList[m].ZSQJE);
        }
        $scope.sumcgList = total.toFixed(2);
        $scope.cgDialog=false;
    });

    //冲销申请单
    var cxindex = 0;
    $scope.cgCode = function (ZSQNO, index) {
        if (ZSQNO) {
            var num = 0;
            for (var i = 0; i < $scope.cgList.length; i++) {
                if (ZSQNO == $scope.cgList[i].EBELN) {
                    num++;
                }
            }
            if (num == 0) {
                swal("此采购订单号不存在", "", "warning");
                $scope.cxList[index].EBELN = "";
                return false;
            }
        }

    }
    $scope.cxSelect = function (index, type) {
        if (type == '挂账款') {
            $scope.$broadcast('cxCtrl', $scope.ORDER_DATA.LIFNR);
            $("#cxBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.cxDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.cxDialog = false;
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].ZSQNO = '';
                            $scope.cxList[index].ZCDJE = '';
                            var all = 0;
                            if ($scope.cxList.length > 1) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all += parseFloat($scope.cxList[i].ZCDJE);
                                }
                            }

                            $scope.sumcxList = all.toFixed(2);

                        })
                    }, 0)
                }
            });
            $("#cxBox").dialog("open");
        } else if (type == '品牌基金/能力提升') {
            $scope.$broadcast('cxppCtrl', $scope.ORDER_DATA.ZSKDW);
            $("#cxppBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.cxppDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.cxppDialog = false;
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].ZSQNO = '';
                            $scope.cxList[index].ZCDJE = '';
                            var all1 = 0;
                            if ($scope.cxList.length > 1) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all1 += parseFloat($scope.cxList[i].ZCDJE);
                                }
                            }

                            $scope.sumcxList = all1.toFixed(2);
                        })
                    }, 0)
                }
            });
            $("#cxppBox").dialog("open");
        } else if (type == '抵扣款') {
            $scope.$broadcast('dkCtrl', $scope.ORDER_DATA.LIFNR);
            $("#dkBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.openDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.openDialog = false;
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].ZSQNO = '';
                            $scope.cxList[index].ZCDJE = '';
                            var all1 = 0;
                            if ($scope.cxList.length > 1) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all1 += parseFloat($scope.cxList[i].ZCDJE);
                                }
                            }

                            $scope.sumcxList = all1.toFixed(2);
                        })
                    }, 0)
                }
            });
            $("#dkBox").dialog("open");
        }
        ;
        cxindex = index;
    }
    $scope.$on('to-cx', function (d, data) {
        $scope.cxDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /* tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all = 0;
        if ($scope.cxList.length > 0) {
            for (var i = 0; i < $scope.cxList.length; i++) {
                all += parseFloat($scope.cxList[i].ZCDJE);
            }
        }

        $scope.sumcxList = all.toFixed(2);
    });
    $scope.$on('to-cxpp', function (d, data) {
        $scope.cxppDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /*tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all2 = 0;
        if ($scope.cxList.length > 0) {
            console.log(all2)
            for (var i = 0; i < $scope.cxList.length; i++) {
                all2 += parseFloat($scope.cxList[i].ZCDJE);
                console.log(($scope.cxList[i].ZCDJE))
            }
        }

        $scope.sumcxList = all2.toFixed(2);
    });
    $scope.$on('to-dk', function (d, data) {
        $scope.openDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(1)").val(data.ZZPO).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /* tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all1 = 0;
        if ($scope.cxList.length > 0) {
            for (var i = 0; i < $scope.cxList.length; i++) {
                all1 += parseFloat($scope.cxList[i].ZCDJE);
            }
        }

        $scope.sumcxList = all1.toFixed(2);
    });
    //内部订单
    var nbindex = 0;
    $scope.nbSelect = function (index) {
        $("#nbBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#nbBox").dialog("open");
        $scope.$broadcast("to-nbData","data");
        nbindex = index;
    };
    $scope.$on('to-nb', function (d, data) {
        var tr = $("#nbList").find(".list").eq(nbindex);
        for(var i=0;i<$scope.nbList.length;i++){
            if($scope.nbList[i].AUFNR==data.AUFNR){
                swal("同一个费用申请单不能重复添加", "", "warning");
                return false;
            }
        }
        if(!$scope.ORDER_DATA.KOSTL){
            $scope.ORDER_DATA.KOSTL=data.RESPCCTR;
        }else{
            if($scope.ORDER_DATA.KOSTL!=data.RESPCCTR){
                swal("成本中心必须一致", "", "warning");
                return false;
            }
        }
        $scope.nbList[nbindex].AUFNR=data.AUFNR;
        $scope.nbList[nbindex].ZSQNR=data.ZSQNR;
        $scope.nbList[nbindex].ZYSJE=data.ZYSJE;
        $scope.nbList[nbindex].ZYFP=data.ZYFP;
        $scope.nbList[nbindex].WZYFP=data.WZYFP;
        $scope.nbList[nbindex].AUFEX=data.ZINORD;
        if (data.AUFNR) {
            $scope.fyShow = true;
        } else {
            $scope.fyShow = false;
        }

    });
    //运输委托单
    $scope.transportList=[];
    $scope.ErrowList=[];
    $scope.dns=[];
    $scope.addPage=true;
    $scope.transportClick = function () {
        $scope.excleFormData = {LIFNR: $scope.ORDER_DATA.LIFNR}

        if($scope.ORDER_DATA.ZSKDW){
            $("#transportBox").dialog({
                autoOpen: false,
                width:1000,
                modal: true
            });
            $("#transportBox").dialog("open");
        }else{
            swal("您先选择供应商名称", "", "warning");
            return false;
        }

    };
    $scope.closeTransport=function(){
        $("#transportBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.transportData=function(){
        if($scope.ErrowList.length>0){
            swal("有不存在、未维护实际总费用或者有相应付款申请单号已被标记的数据，请删除后再操作！", "", "warning");
            return false;
        }
        $scope.dns=$scope.transportList;
        $("#transportBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    // 处理导入数据
    $scope.excleConf = {
        formData: $scope.excleFormData,
        buttonText: '上传单号',
        uploader: '/credit/importdns'
    };
    $scope.getUploadCallback = function (uploadData) {
        $scope.transportList = uploadData.right;
        $scope.ErrowList = uploadData.error;
        var sum=0;
        for(var i=0;i<$scope.transportList.length;i++){
            sum+=+$scope.transportList[i].ZSJZF;
        }
        for(var j=0;j<$scope.ErrowList.length;j++){
            sum+=+$scope.ErrowList[j].ZSJZF;
        }
        $scope.sum=sum;
    };
    $scope.filedataDel = function (idx,type) {
        if(type=="right"){
            $scope.transportList.splice(idx, 1);
        }else if(type=="errow"){
            $scope.ErrowList.splice(idx, 1);
        }
        var sum=0;
        for(var i=0;i<$scope.transportList.length;i++){
            sum+=+$scope.transportList[i].ZSJZF;
        }
        for(var j=0;j<$scope.ErrowList.length;j++){
            sum+=+$scope.ErrowList[j].ZSJZF;
        }
        $scope.sum=sum;

    };
    $scope.addData = function (data, statue) {
        var requiredObj1 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj1, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.cgList.length>0){
            for(var f=0;f<$scope.cgList.length;f++){
                if($scope.cgList[f].ZSQJE<=0){
                    swal("采购订单的申请支付金额必须大于0", "", "warning");
                    return false;
                }
            }
        }
//品牌基金类的的冲抵金额之和，必须小于等于该采购订单本次申请支付金额的50%
        if($scope.cxList.length>0){
            for(var i=0;i<$scope.cxList.length;i++ ){
                if($scope.cxList[i].ZCDLX=="品牌基金/能力提升"){
                    var cxNum=0;
                    cxNum+=+$scope.cxList[i].ZCDJE;
                    for(var j=(i+1);j<$scope.cxList.length;j++){
                        if($scope.cxList[j].ZCDLX=="品牌基金/能力提升"&&$scope.cxList[j].EBELN==$scope.cxList[i].EBELN){
                            cxNum+=+$scope.cxList[j].ZCDJE;
                        }
                    }
                    var ebeln=0;
                    for(var k=0;k<$scope.cgList.length;k++){
                        if($scope.cgList[k].EBELN==$scope.cxList[i].EBELN){
                            ebeln+=+$scope.cgList[k].ZSQJE;
                        }
                    }
                    console.log(cxNum)
                    console.log(ebeln/2)
                    if(cxNum>(ebeln/2)){
                        swal("采购订单号为"+$scope.cxList[i].EBELN+"的品牌基金的的冲抵金额之和，必须小于等于该采购订单本次申请支付金额的50%", "", "warning");
                        return false;
                    }
                }
            }
        }


        if ($scope.ORDER_DATA.BU3 == "") {
            $scope.ORDER_DATA.BU3 = "000";
        }
        /*var costcenter = $scope.costcentersubsubsub || $scope.costcentersubsub || $scope.costcentersub || $scope.costcenter;
         $scope.ORDER_DATA.KOSTL=costcenter.split('|')[1];
         $scope.ORDER_DATA.KOSTLTEXT=costcenter.split('|')[2];
         $scope.ORDER_DATA.KOSTLALL=[$scope.costcenter, $scope.costcentersub, $scope.costcentersubsub,$scope.costcentersubsubsub].join('==');
         */ $scope.ORDER_DATA.ZFKZL = $scope.ORDER_DATA.BU1 + $scope.ORDER_DATA.BU2 + $scope.ORDER_DATA.BU3;
        var doc = {}, param = {processId: $scope.processId, nodeId: $scope.nodeId};
        $scope.ORDER_DATA.ZURLNAM = $scope.docName;
        doc.HEADER_DATA = data;
        doc.PO_DATA = $scope.cgList;
        doc.HX_DATA = $scope.cxList;
        doc.IO_DATA = $scope.nbList;
        doc.HB_DATA = $scope.payList;
        doc.DN_DATA= $scope.dns ;
        if($scope.payList.length>0){
            doc.DOCTYPE = 'HBFK'
        }
        param.doc = doc;
        if(!$stateParams.payCode){
            if ($scope.ORDER_DATA.BU1 == '15') {
                $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList||'0');
                $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");

            } else {
                $scope.ORDER_DATA.ZWHXJE = "";
                $scope.ORDER_DATA.ZSJFKJE = $scope.ORDER_DATA.ZSQJE;
            }
        }

        param.doc = doc;
        if (statue == "save") {

            var addInside = payment.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    window.location.href = '/index.html#/paymentOrder';
                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            if ($scope.ORDER_DATA.BU1 == '15' && $scope.ORDER_DATA.ZBM == "1000") {
                for (var i = 0; i < $scope.cgList.length; i++) {
                    if (!$scope.cgList[i].ZZCPTXT) {
                        swal("采购订单无产品线不能提交，请修改采购订单后再提交！", "", "warning");
                        return false;
                    }
                }
            }
            //运输委托单 申请付款金额 与 实际总费用小计值是否一致，不一致需提示允许保存草稿，不允许提交审批；
            if($scope.ORDER_DATA.BU1=="19"&&$scope.ORDER_DATA.BU2=="56"&&!$scope.payState){
                if($scope.dns.length){
                    if($scope.ORDER_DATA.ZSQJE!=$scope.sum){
                        swal("申请付款金额与实际总费用小计必须一致！", "", "warning");
                        return false;
                    }
                }/*else{
                    swal("运输委托单不能为空！", "", "warning");
                    return false;
                }*/

            }
            if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcxList && $scope.sumcgList*1 < $scope.sumcxList*1&&$scope.cgList.length) {
                swal("冲抵核销合计不能大于申请支付金额小计！", "", "warning");
                return false;
            }
            if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 < $scope.ORDER_DATA.ZSQJE&&$scope.cgList.length) {
                swal("申请支付金额大于采购订单申请支付金额小计！", "", "warning");
                return false;

            } else if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 > $scope.ORDER_DATA.ZSQJE&&$scope.cgList.length) {
                swal("申请支付金额不可小于采购订单申请支付金额小计！", "", "warning");
                return false;
            } else if ($scope.ORDER_DATA.BU1 !== '15' && $scope.sumnbList && $scope.sumnbList != $scope.ORDER_DATA.ZSQJE&&$scope.nbList.length) {
                swal("申请付款金额与费用申请单合计不相等！", "", "warning");
                return false;
            } else {
                var applyAdd = payment.applyAdd(param);
                applyAdd.success(function (data) {
                    if (data.code == 200) {
                        $scope.processId = data.rst.processId;
                        $scope.nodeId = data.rst.nodeId;
                        swal({
                            title: "提交成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回付款申请列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/paymentOrder';
                        });
                        /*if (($scope.ORDER_DATA.ZFKFS == "流动资金贷款" || $scope.ORDER_DATA.ZFKFS == "银行承兑汇票" || $scope.ORDER_DATA.ZFKFS == "国内信用证" || $scope.ORDER_DATA.ZFKFS == "商业承兑汇票")&&$scope.payList.length==0) {
                         $scope.goShow = true;
                         }*/
                        ;
                    }
                    else {
                        if(data.msg.indexOf("不允许重复操作")>0){
                            swal("不能重复提交", "", "warning");
                        }else{
                            swal(data.msg, "", "warning");
                        }

                    }
                });


            }
        }
    }

}]);
paymentApp.controller('paymentOrderEditCtrl', ['$scope','$rootScope', '$stateParams', 'paymentServices', function ($scope,$rootScope, $stateParams, payment) {
    var ORDER_DATA = $scope.ORDER_DATA = {};
    $scope.cgList = [];
    $scope.cxList = [];
    $scope.nbList = [];
    $scope.payList = [];
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.filterFn=function(data){
        var returnVal=(data.BU1.CODE1!="16");
        return returnVal;
    }
    var payData = payment.enumPay();
    payData.success(function (data) {
        // 付款种类信息
        var fkzlMsg = {};
        fkzlMsg = data;
        for(var i=0;i<fkzlMsg.length;i++){
            if(fkzlMsg[i].BU1.TITLE == '直接运营费用'){
                for(j=0;j<fkzlMsg[i].BU1.BU2.length;j++){
                    if(fkzlMsg[i].BU1.BU2[j].CODE2=='52'){
                        fkzlMsg[i].BU1.BU2.splice(j,1);
                    }
                }
            }
        }
        $scope.payData = fkzlMsg;
    });
    var enumPur = payment.enumPurchase();
    enumPur.success(function (data) {
        if (data.code == 200) {
            $scope.enumObj = data.rst.enum;
        } else {
        }

    });
    //抵扣权限
    var dkLimit = $rootScope.busiRoles;
    $scope.dkShow= false;
    $scope.dkShow1= false;
    for(var ii=0;ii<dkLimit.length;ii++){
        if(dkLimit[ii].code=='xinxi_caigouzhuanyuan'||dkLimit[ii].code=='xinxi_caigouzhuguan'){
            $scope.dkShow = false;
            $scope.dkShow1 = true;
        }else if(dkLimit[ii].code=='yyglb_neimao_jingli'||dkLimit[ii].code=='yyglb_guoji_jingli'||dkLimit[ii].code=='yyglb_neimao_xiaoshouzhixing'||dkLimit[ii].code=='yyglb_neimao_yuanchangxianjie'||dkLimit[ii].code=='yyglb_guoji_hetongzhixing'){
            $scope.dkShow1= false;
            $scope.dkShow = true;
        }
    }
    //客户信用
    $scope.cusXy = function (stomerid,stomer) {
        // var listCredit = apply.listCredit({ cusname: stomer});
        var listCredit = payment.listCredit({ cusname: stomer});
        listCredit.success(function(data){
            if (data.code == 200) {
                if(data.rst.data.items.length==0){
                    swal("该客户没有维护客户信用", "", "warning");
                    return false;
                }else{
                    var param = {cuscode: stomerid};
                    var getcreditbycode = payment.getcreditbycode(param);
                    getcreditbycode.success(function (data) {
                        if (data.code == 200) {
                            var id = data.rst._id;
                            window.open("index.html#/creditTabView/" + id + "?flag=pay&cuscode="+stomerid+"&cusname="+stomer);
                            $("#saleBox").dialog("destroy");
                            $(".ui-dialog").remove();
                        } else {
                            swal(data.msg, "", "warning");
                        }
                    }).error(function (error) {
                        swal({
                            title: "",
                            text: error,
                            type: "error"
                        })
                    });
                }
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        })

    }
    $scope.sumcgList = $scope.sumnbList = $scope.sumcxList = 0;
    $scope.sumFn = function (ZYFJE, ZSQJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if (ZYFJE * 1 < ZSQJE * 1) {
            swal({
                    title: "申请支付金额大于应付金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.cgList[index].ZSQJE = "";
                    })
                }
            );
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        $scope['sum' + id] = sum.toFixed(2);
        /*$scope.ORDER_DATA.ZSQJE = sum;*/

    }
    $scope.sumFn1 = function (left, ZCDJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if (left * 1 < ZCDJE * 1) {
            console.log(11)
            swal({
                    title: "冲抵金额不能大于可用冲抵金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.cxList[index].ZCDJE = "";
                        var sum = 0;
                        for(var i=0;i<$scope.cxList.length;i++){
                            sum+=$scope.cxList[i].ZCDJE;
                        }
                        $scope.sumcxList = (sum*1).toFixed(2) ;
                        $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList|| "0");
                        $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");
                    })
                }
            );
            return false;
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        $scope['sum' + id] = sum.toFixed(2);
    }
    $scope.sumFn2 = function (ZYFP, ZSQJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if ($scope.nbList[index].AUFNR) {
            $scope.fyShow = true;
        } else {
            $scope.fyShow = false;
        }
        if (ZYFP * 1 < ZSQJE * 1) {

            swal({
                    title: "本次申请支付金额不能大于未使用金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.nbList[index].ZSQJE = "";
                    })
                }
            );
            return false;
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        $scope['sum' + id] = sum.toFixed(2);
    }
    $scope.fkztChange = function () {
        $scope.cgList = [];
        $scope.cxList = [];
        $scope.sumcgList = 0;
        $scope.sumcxList = 0;
    };
    $scope.customerBox = function () {
        $("#tipBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#tipBox").dialog("open");
        $scope.$watch('ORDER_DATA.ZSKDW', function (newValue, oldValue, scope) {
            if (newValue != oldValue) {
                scope.cgList = [];
                scope.cxList = [];
                scope.sumcgList = 0;
                scope.sumcxList = 0;
                scope.dns = [];
            }
        });
    };
    $scope.payChange = function (type) {//付款种类
        $scope.ORDER_DATA.BU2 = "";
        $scope.ORDER_DATA.BU3 = "";
        if (!$scope.payState) {
            if (type == "15") {
                $scope.cgOrder = true;
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.centerShow =true;
                $scope.transportShow=false;
                $scope.nbList=[];
                $scope.sumnbList="";
                $scope.dns=[];
                $scope.ORDER_DATA.KOSTL='';
            } else {
                $scope.cgList = [];
                $scope.sumcgList ='';
                $scope.cgOrder = false;
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.centerShow =false;
                $scope.transportShow=false;
            }
        }

    }
    $scope.payChange2 = function (type) {//付款种类2级
        $scope.ORDER_DATA.BU3 = "";
        if(!$scope.payState){
            if($scope.ORDER_DATA.BU1=="15"){
                $scope.cgOrder = true;
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.centerShow =true;
                $scope.transportShow=false;
                $scope.ORDER_DATA.KOSTL='';
            }else{

                if($scope.ORDER_DATA.BU1=="19"&&type=="56"){
                    $scope.transportShow=true;
                    $scope.cgOrder = false;
                    $scope.glOrder = false;
                    $scope.sfCol = false;
                    $scope.centerShow =false;
                    $scope.cgList =[];
                    $scope.sumcgList ="";
                    $scope.cxList =[];
                    $scope.sumcxList ="";
                    $scope.nbList=[];
                    $scope.sumnbList="";
                }else{
                    if($scope.ORDER_DATA.BU2&&$scope.nbList.length){
                        $scope.nbList=[];
                    }
                    $scope.cgOrder = false;
                    $scope.glOrder = true;
                    $scope.sfCol = true;
                    $scope.centerShow =false;
                    $scope.transportShow=false;
                    $scope.cgList =[];
                    $scope.sumcgList ="";
                    $scope.cxList =[];
                    $scope.sumcxList ="";
                    $scope.dns=[];
                }
            }
        }
        console.log($scope.glOrder)
    }
    $scope.typeChange = function (type) {//付款方式
        if (type == "国内信用证") {
            $scope.type1 = true;
        } else {
            $scope.type1 = false;
        }
    }
    $scope.comeAdd = function (type) {
        if (type == 'cgList') {//采购订单
            $("#cgBox").dialog({
                autoOpen: false,
                width:1000,
                height: 400,
                modal: true
            });
            $("#cgBox").dialog("open");
            $scope.cgDialog=true;
        } else if (type == 'cxList') {//冲抵核销信息
            var obj = {ZCDLX: '', ZSQNO_YF: '', ZZPO: '', left: '', EBELN: '', ZCDJE: ''};
            $scope.cxList.push(obj);
        } else if (type == 'nbList') {//内部订单
            var obj = {AUFNR: '',ZINORD:'',ZSQNR:'',  ZYSJE: '', ZYFP: '', WZYFP: '', ZSQJE: ''};
            $scope.nbList.push(obj);
        }
    }

    $scope.comeDel = function (idx, type) {
        if (type == 'cgList') {
            /*if(cgList.length <= 1){
             alert("不能再删了！");
             return false;
             }*/
            /* for (var x in $scope.cgList) {
             $scope.sumcgList = $scope.sumcgList - $scope.cgList[idx].ZSQJE;
             break;
             }*/
            $scope.sumcgList = ($scope.sumcgList - $scope.cgList[idx].ZSQJE).toFixed(2);
            $scope.cgList.splice(idx, 1);
            if ($scope.cgList.length != 0) {
                $scope.ORDER_DATA.ZCGSW = $scope.cgList[0].ZSWRY;
            } else {
                $scope.ORDER_DATA.ZCGSW = "";
            }

        } else if (type == 'cxList') {
            /*for (var x in $scope.cxList) {
             $scope.sumcgList = $scope.sumcgList - $scope.cxList[idx].ZCDJE;
             break;
             }*/
            $scope.sumcxList = ($scope.sumcxList - $scope.cxList[idx].ZCDJE).toFixed(2);
            $scope.cxList.splice(idx, 1);
        } else if (type == 'nbList') {
            /*for (var x in $scope.nbList) {
             $scope.sumnbList = $scope.sumnbList - $scope.nbList[idx].ZSQJE;
             break;
             }*/
            $scope.sumnbList = ($scope.sumnbList - $scope.nbList[idx].ZSQJE).toFixed(2);
            $scope.nbList.splice(idx, 1);

            for(var j=0;j<$scope.nbList.length;j++){
                if($scope.nbList[j].AUFNR){
                    $scope.flagCost=true;
                }
            }
            if($scope.flagCost!=true){
                $scope.ORDER_DATA.KOSTL='';
            }
        } else if (type == 'payList') {
            $scope.payList.splice(idx, 1);
            var sqNum= 0,whxNum= 0,sjNum=0;
            for(var i=0;i<$scope.payList.length;i++){
                sqNum+=$scope.payList[i].ZSQJE;
                whxNum+=$scope.payList[i].ZWHXJE;
                sjNum+=$scope.payList[i].ZSJFKJE;
            }
            $scope.ORDER_DATA.ZSQJE=sqNum.toFixed(2);
            $scope.ORDER_DATA.ZWHXJE=whxNum.toFixed(2);
            $scope.ORDER_DATA.ZSJFKJE=sjNum.toFixed(2);
        }
    }
    //采购申请单
    var cgindex = 0;
    $scope.cgData = function (index) {
        /* $scope.$broadcast('cgCtrl', $scope.ORDER_DATA.LIFNR);*/
        $("#cgBox").dialog({
            autoOpen: false,
            width: 1000,
            height: 400,
            modal: true
        });
        $("#cgBox").dialog("open");
        cgindex = index;
    }
    $scope.$on('to-cg', function (d, data) {
        if ($scope.cgList.length == 0) {
            $scope.ORDER_DATA.ZCGSW = data[0].ZSWRY;
        }
        $scope.cgList=$scope.cgList.concat(data);
        var total = 0;
        for (var m = 0; m < $scope.cgList.length; m++) {
            total += eval($scope.cgList[m].ZSQJE);
        }
        $scope.sumcgList = total.toFixed(2);
        $scope.cgDialog=false;
    });

    //冲销申请单
    var cxindex = 0;
    $scope.cgCode = function (ZSQNO, index) {
        if (ZSQNO) {
            var num = 0;
            for (var i = 0; i < $scope.cgList.length; i++) {
                if (ZSQNO == $scope.cgList[i].EBELN) {
                    num++;
                }
            }
            if (num == 0) {
                swal("此采购订单号不存在", "", "warning");
                $scope.cxList[index].EBELN = "";
                return false;
            }
        }

    }
    $scope.cxSelect = function (index, type) {
        if (type == '挂账款') {
            $scope.$broadcast('cxCtrl', $scope.ORDER_DATA.LIFNR);
            $("#cxBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.cxDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.cxDialog = false;
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].EBELN = '';
                            $scope.cxList[index].ZCDJE = '';
                            $scope.cxList[index].ZCDJENUM = '';
                            var all = 0;
                            if ($scope.cxList.length > 1) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all += parseFloat($scope.cxList[i].ZCDJE);
                                }
                            }

                            $scope.sumcxList = all.toFixed(2);

                        })
                    }, 0)
                }
            });
            $("#cxBox").dialog("open");
        } else if (type == '品牌基金/能力提升') {
            $scope.$broadcast('cxppCtrl', $scope.ORDER_DATA.ZSKDW);
            $("#cxppBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.cxppDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.cxppDialog = false;
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].EBELN = '';
                            $scope.cxList[index].ZCDJE = '';
                            $scope.cxList[index].ZCDJENUM = '';
                            var all1 = 0;
                            if ($scope.cxList.length > 1) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all1 += parseFloat($scope.cxList[i].ZCDJE);
                                }
                            }

                            $scope.sumcxList = all1.toFixed(2);
                        })
                    }, 0)
                }
            });
            $("#cxppBox").dialog("open");
        } else if (type == '抵扣款') {
            $scope.$broadcast('dkCtrl', $scope.ORDER_DATA.LIFNR);
            $("#dkBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.openDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.openDialog = false;
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].EBELN = '';
                            $scope.cxList[index].ZCDJE = '';
                            $scope.cxList[index].ZCDJENUM = '';
                            var all1 = 0;
                            if ($scope.cxList.length > 1) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all1 += parseFloat($scope.cxList[i].ZCDJE);
                                }
                            }

                            $scope.sumcxList = all1.toFixed(2);
                        })
                    }, 0)
                }
            });
            $("#dkBox").dialog("open");
        }
        ;
        cxindex = index;
    }
    $scope.$on('to-cx', function (d, data) {
        $scope.cxDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /* tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all = 0;
        if ($scope.cxList.length > 0) {
            for (var i = 0; i < $scope.cxList.length; i++) {
                all += parseFloat($scope.cxList[i].ZCDJE);
            }
        }

        $scope.sumcxList = all.toFixed(2);
    });
    $scope.$on('to-cxpp', function (d, data) {
        $scope.cxppDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /*tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all2 = 0;
        if ($scope.cxList.length > 0) {
            console.log(all2)
            for (var i = 0; i < $scope.cxList.length; i++) {
                all2 += parseFloat($scope.cxList[i].ZCDJE);
                console.log(($scope.cxList[i].ZCDJE))
            }
        }

        $scope.sumcxList = all2.toFixed(2);
    });
    $scope.$on('to-dk', function (d, data) {
        $scope.openDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(1)").val(data.ZZPO).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /* tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all1 = 0;
        if ($scope.cxList.length > 0) {
            for (var i = 0; i < $scope.cxList.length; i++) {
                all1 += parseFloat($scope.cxList[i].ZCDJE);
            }
        }

        $scope.sumcxList = all1.toFixed(2);
    });
    //内部订单
    var nbindex = 0;
    $scope.nbSelect = function (index) {
        $("#nbBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#nbBox").dialog("open");
        $scope.$broadcast("to-nbData","data");
        nbindex = index;
    };
    $scope.$on('to-nb', function (d, data) {
        var tr = $("#nbList").find(".list").eq(nbindex);
        for(var i=0;i<$scope.nbList.length;i++){
            if($scope.nbList[i].AUFNR==data.AUFNR){
                swal("同一个费用申请单不能重复添加", "", "warning");
                return false;
            }
        }
        if(!$scope.ORDER_DATA.KOSTL){
            $scope.ORDER_DATA.KOSTL=data.RESPCCTR;
        }else{
            if($scope.ORDER_DATA.KOSTL!=data.RESPCCTR){
                swal("成本中心必须一致", "", "warning");
                return false;
            }
        }
        $scope.nbList[nbindex].AUFNR=data.AUFNR;
        $scope.nbList[nbindex].ZSQNR=data.ZSQNR;
        $scope.nbList[nbindex].ZYSJE=data.ZYSJE;
        $scope.nbList[nbindex].ZYFP=data.ZYFP;
        $scope.nbList[nbindex].WZYFP=data.WZYFP;
        $scope.nbList[nbindex].AUFEX=data.ZINORD;
        if (data.AUFNR) {
            $scope.fyShow = true;
        } else {
            $scope.fyShow = false;
        }
    });
//成本中心
    var enumlist= payment.enumlist();
    enumlist.success(function (data) {
        if (data.code == 200) {
            $scope.costcenterSel = data.rst.data.costcenter;
            $scope.provinceData=data.rst.data.province;
        }

    });
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    $scope.payCostcenterFn = function () {
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 500,
            modal: true
        });
        $("#costCenterDialog").dialog("open");
        $scope.groupsTreeModel = $scope.costcenterSel;
        $scope.showSelected = function (sel) {
            $scope.selectedNode = sel;
        };
        $scope.selectTypeFn = function () {
            var val = $scope.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
            $scope.ORDER_DATA.KOSTL= val.code;
            $scope.ORDER_DATA.KOSTLTEXT= val.text;
            $scope.nbList=[];
            $scope.sumnbList='';
            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    //运输委托单
    $scope.transportList=[];
    $scope.ErrowList=[];
    $scope.dns=[];
    $scope.addPage=true;
    $scope.transportClick = function () {
        $scope.excleFormData = {LIFNR: $scope.ORDER_DATA.LIFNR}
        if($scope.ORDER_DATA.ZSKDW){
            $("#transportBox").dialog({
                autoOpen: false,
                width:1000,
                modal: true
            });
            $("#transportBox").dialog("open");
        }else{
            swal("您先选择供应商名称", "", "warning");
            return false;
        }

    };
    $scope.closeTransport=function(){
        $("#transportBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.transportData=function(){
        console.log($scope.ErrowList)
        if($scope.ErrowList.length>0){
            swal("有不存在、未维护实际总费用或者有相应付款申请单号已被标记的数据，请删除后再操作！", "", "warning");
            return false;
        }
        $scope.dns=$scope.transportList;
        $("#transportBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    // 处理导入数据
    $scope.excleConf = {
        formData: $scope.excleFormData,
        buttonText: '上传单号',
        uploader: '/credit/importdns'
    };
    $scope.getUploadCallback = function (uploadData) {
        $scope.transportList = uploadData.right;
        $scope.ErrowList = uploadData.error;
        var sum=0;
        for(var i=0;i<$scope.transportList.length;i++){
            sum+=+$scope.transportList[i].ZSJZF;
        }
        for(var j=0;j<$scope.ErrowList.length;j++){
            sum+=+$scope.ErrowList[j].ZSJZF;
        }
        $scope.sum=sum;
    };
    $scope.filedataDel = function (idx,type) {
        if(type=="right"){
            $scope.transportList.splice(idx, 1);
        }else if(type=="errow"){
            $scope.ErrowList.splice(idx, 1);
        }
        var sum=0;
        for(var i=0;i<$scope.transportList.length;i++){
            sum+=+$scope.transportList[i].ZSJZF;
        }
        for(var j=0;j<$scope.ErrowList.length;j++){
            sum+=+$scope.ErrowList[j].ZSJZF;
        }
        $scope.sum=sum;
    };
    if ($stateParams.sapid) {//判断数据来源（sap or 草稿）
        $scope.dataEdit = true;
        $scope.draftStatue = true;
        $scope.payTime = true;
    } else {
        $scope.draftEdit = true;
        $scope.payTime = false;

    }

    $scope.commonEdit = true;
    var viewCont = payment.viewInside({
        sapid: $stateParams.sapid,
        processId: $stateParams.processId,
        nodeId: $stateParams.nodeId
    });
    viewCont.success(function (data) {
        $scope.payEdit = false;
        $scope.ORDER_DATA = data.rst.data.model;
        if(typeof $scope.ORDER_DATA.ZSQJE=="string"){
            $scope.ORDER_DATA.ZSQJE=parseFloat($scope.ORDER_DATA.ZSQJE,10);
        }
        if($scope.ORDER_DATA.ZFKZL){
            $scope.ORDER_DATA.BU1=$scope.ORDER_DATA.ZFKZL.substring(0, 2);
            $scope.ORDER_DATA.BU2=$scope.ORDER_DATA.ZFKZL.substring(2, 4);
            $scope.ORDER_DATA.BU3=$scope.ORDER_DATA.ZFKZL.substring(4);
        }
        if($scope.ORDER_DATA.BU1==15){
            $scope.centerShow=true;
        }else{
            $scope.centerShow=false;
        }
        if ((data.rst.data.hbs||[]).length== 0){
            if($scope.ORDER_DATA.BU1=="15"){
                $scope.cgOrder = true;
                $scope.glOrder = false;
                $scope.sfCol = false;
                $scope.transportShow=false;
            }else{
                if($scope.ORDER_DATA.BU1=="19"&&$scope.ORDER_DATA.BU2=="56"){
                    $scope.transportShow=true;
                    $scope.cgOrder = false;
                    $scope.glOrder = false;
                    $scope.sfCol = false;
                }else{
                    $scope.cgOrder = false;
                    $scope.glOrder = true;
                    $scope.sfCol = true;
                    $scope.transportShow=false;
                }
            }
        }

        $scope.docName = $scope.ORDER_DATA.ZURLNAM;
        $scope.processId = $stateParams.processId;
        $scope.nodeId = $stateParams.nodeId;
        if (data.rst.data.pos.length > 0) {
            $scope.cgList = data.rst.data.pos;//采购订单
            for(var w=0;w<$scope.cgList.length;w++){
                $scope.cgList[w].EKORGTXT=$scope.enumObj.EKORG[$scope.cgList[w].EKORG];
                $scope.cgList[w].BSARTTXT=$scope.enumObj.BSART[$scope.cgList[w].BSART];
                $scope.cgList[w].ZZCPTXT=$scope.enumObj.ZZCP[$scope.cgList[w].ZZCP];
            }
        }
        if (data.rst.data.hxs.length > 0) {
            $scope.cxList = data.rst.data.hxs;//冲抵核销信息
            for(var p=0;p<$scope.cxList.length;p++){
                if($scope.cxList[p].ZCDLX=="品牌基金/能力提升"){
                    for(var ii=0;ii<dkLimit.length;ii++){
                        if(dkLimit[ii].code=='xinxi_caigouzhuanyuan'||dkLimit[ii].code=='xinxi_caigouzhuguan'){
                            $scope.cxList[p].dkChange=false;
                        }else if(dkLimit[ii].code=='yyglb_neimao_jingli'||dkLimit[ii].code=='yyglb_guoji_jingli'||dkLimit[ii].code=='yyglb_neimao_xiaoshouzhixing'||dkLimit[ii].code=='yyglb_neimao_yuanchangxianjie'||dkLimit[ii].code=='yyglb_guoji_hetongzhixing'){
                            $scope.cxList[p].dkChange=true;
                        }
                    }
                }else{
                    for(var ii=0;ii<dkLimit.length;ii++){
                        if(dkLimit[ii].code=='xinxi_caigouzhuanyuan'||dkLimit[ii].code=='xinxi_caigouzhuguan'){
                            $scope.cxList[p].dkChange=true;
                        }else if(dkLimit[ii].code=='yyglb_neimao_jingli'||dkLimit[ii].code=='yyglb_guoji_jingli'||dkLimit[ii].code=='yyglb_neimao_xiaoshouzhixing'||dkLimit[ii].code=='yyglb_neimao_yuanchangxianjie'||dkLimit[ii].code=='yyglb_guoji_hetongzhixing'){
                            $scope.cxList[p].dkChange=false;
                        }
                    }
                }
            }
        }
        if (data.rst.data.ios.length > 0) {
            $scope.nbList = data.rst.data.ios;//内部订单
        }
        if ((data.rst.data.hbs||[]).length > 0) {
            $scope.payList = data.rst.data.hbs;
            $scope.payState = true;
            $scope.payEdit = true;
            $scope.cgOrder = false;
            $scope.glOrder = false;
            $scope.transportShow = false;
        }
        if(data.rst.data.dns&&(data.rst.data.dns).length> 0){
            $scope.transportList=data.rst.data.dns;
            $scope.dns =data.rst.data.dns;
            var sum=0;
            for(var k=0;k<$scope.transportList.length;k++){
                sum+=+$scope.transportList[k].ZSJZF;
            }
            $scope.sum=sum.toFixed(2);
        }
        var talcg = 0, talcx = 0, talnb = 0;
        for (var i = 0; i < $scope.cgList.length; i++) {
            /*talcg += parseFloat($scope.cgList[i].ZSQJE);*/
            talcg +=$scope.cgList[i].ZSQJE*1;
        }
        for (var j = 0; j < $scope.cxList.length; j++) {
            talcx += parseFloat($scope.cxList[j].ZCDJE);
        }
        for (var m = 0; m < $scope.nbList.length; m++) {
            talnb += parseFloat($scope.nbList[m].ZSQJE);
        }
        $scope.sumcgList = talcg.toFixed(2);
        $scope.sumcxList = talcx.toFixed(2);
        $scope.sumnbList = talnb.toFixed(2);

    });
    $scope.saleDir = function (index, ZZPO, ZZSDPO) {
        $("#saleBox").dialog({
            autoOpen: false,
            width:870,
            modal: true
        });
        $("#saleBox").dialog("open");
        var param = {supplierorderid: ZZPO, salesorderid: ZZSDPO};
        var getcontractbyorderid = payment.getcontractbyorderid(param);
        getcontractbyorderid.success(function (data) {
            if (data.code == 200) {
                $scope.saleDataList = data.rst.items;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    }
    $scope.saleSelect = function () {
        $("#saleBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    //合并添加付款单
    $scope.cArr = [];
    $scope.cArrIndex = [];
    var updateSelected = function (action, id, index, hbing, checkbox) {
        if (action == 'add') {
            if (hbing == true) {
                swal("付款申请号" + id + "正在合并中", "", "warning");
                $scope.paymentList[index].check=false;
                return false;
            }else{
                $scope.cArr.push($scope.paymentList[index]);
                $scope.cArrIndex.push(index);
            }

        }
        if (action == 'remove') {
            for (var i = 0; i < $scope.cArr.length; i++) {
                if ($scope.cArr[i].ZSQNO == id) {
                    $scope.cArr.splice(i, 1);
                    $scope.cArrIndex.splice(i, 1);
                }
            }
        }
    };
    $scope.updateSelection = function ($event, id, index, hbing,ZHB) {
        var checkbox = $event.target;
        var checkdohb= payment.checkdohb ({ZSQNOs: [id]});
        checkdohb .success(function (data) {
            if (data.code == 200) {
                if(data.rst.data.canhb!=true){
                    swal(data.rst.data.msg, "", "warning");
                    $scope.paymentList[index].check=false;
                    return false;
                }else{
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id, index, hbing, checkbox);
                }
            }
        });
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
    };
    $scope.allCheck = function ($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.paymentList.length; i++) {
                if($scope.paymentList[i].ZHB=='N'){
                    swal( $scope.paymentList[i].ZSQNO + "付款单不能合并", "", "warning");
                    checkbox.checked=false;
                    $scope.paymentList[i].check=false;
                }else{
                    $scope.paymentList[i].check=true;
                    $scope.cArr[i] = $scope.paymentList[i];
                    $scope.cArrIndex[i] = i;
                }

            }
        } else {
            $scope.cArr = [];
            $scope.cArrIndex = [];
        }
    };
    $scope.payAdd = function () {
        var ary=[];
        for(var i=0;i<$scope.payList.length;i++){
            ary.push($scope.payList[i].ZSQNO);
        }
        var par = {
            LIFNR: $scope.ORDER_DATA.LIFNR,
            ZFKZL: $scope.ORDER_DATA.BU1,
            ZFKSTA: '未付款',
            choosedsubs: ary,
            ZHB: 'Y',
            HAS_HB:'N'
        };
        var payPromise = payment.listInside(par);
        payPromise.success(function (data) {
            if (data.code == 200) {
                $("#payAddList").dialog({
                    autoOpen: false,
                    width:1200,
                    modal: true
                });
                $("#payAddList").dialog("open");
                $scope.enumobj = {ZFKZT: {1000: "中建材信息技术股份有限公司", 9000: "中建材集团进出口公司", 9001: "中国建材（香港）有限公司"}};
                $scope.paymentList = data.rst.data.items;
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
    $scope.payCancle = function () {
        $("#payAddList").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.paySelect = function () {
        $scope.payList = $scope.payList.concat($scope.cArr);
        $scope.cArr = [];
        $scope.cArrIndex = [];
        var sqNum= 0,whxNum= 0,sjNum=0;
        for(var i=0;i<$scope.payList.length;i++){
            sqNum+=$scope.payList[i].ZSQJE;
            whxNum+=$scope.payList[i].ZWHXJE;
            sjNum+=$scope.payList[i].ZSJFKJE;
        }
        $scope.ORDER_DATA.ZSQJE=sqNum.toFixed(2);
        $scope.ORDER_DATA.ZWHXJE=whxNum.toFixed(2);
        $scope.ORDER_DATA.ZSJFKJE=sjNum.toFixed(2);
        $("#payAddList").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.incomDir = function (index, ZZPO, ZZSDPO) {
        $("#incomeBox").dialog({
            autoOpen: false,
            width: 980,
            modal: true
        });
        $("#incomeBox").dialog("open");
        var param = {supplierorderid: ZZPO, salesorderid: ZZSDPO};
        var getskbysalesorderidorsupplierorderid = payment.getskbysalesorderidorsupplierorderid(param);
        getskbysalesorderidorsupplierorderid.success(function (data) {
            if (data.code == 200) {
                $scope.incomDataList = data.rst.data;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    };
    $scope.incomSelect = function () {
        $("#incomeBox").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.addData = function (data, statue) {
        var requiredObj1 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj1, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        //品牌基金类的的冲抵金额之和，必须小于等于该采购订单本次申请支付金额的50%
        if($scope.cxList.length>0){
            for(var i=0;i<$scope.cxList.length;i++ ){
                if($scope.cxList[i].ZCDLX=="品牌基金/能力提升"){
                    var cxNum=0;
                    cxNum+=+$scope.cxList[i].ZCDJE;
                    for(var j=(i+1);j<$scope.cxList.length;j++){
                        if($scope.cxList[j].ZCDLX=="品牌基金/能力提升"&&$scope.cxList[j].EBELN==$scope.cxList[i].EBELN){
                            cxNum+=+$scope.cxList[j].ZCDJE;
                        }
                    }
                    var ebeln=0;
                    for(var k=0;k<$scope.cgList.length;k++){
                        if($scope.cgList[k].EBELN==$scope.cxList[i].EBELN){
                            ebeln+=+$scope.cgList[k].ZSQJE;
                        }
                    }
                    console.log(cxNum)
                    console.log(ebeln/2)
                    if(cxNum>(ebeln/2)){
                        swal("采购订单号为"+$scope.cxList[i].EBELN+"的品牌基金的的冲抵金额之和，必须小于等于该采购订单本次申请支付金额的50%", "", "warning");
                        return false;
                    }
                }
            }
        }
        if ($scope.ORDER_DATA.BU3 == "") {
            $scope.ORDER_DATA.BU3 = "000";
        }
        $scope.ORDER_DATA.ZFKZL = $scope.ORDER_DATA.BU1 + $scope.ORDER_DATA.BU2 + $scope.ORDER_DATA.BU3;
        var doc = {}, param = {processId: $scope.processId, nodeId: $scope.nodeId};
        $scope.ORDER_DATA.ZURLNAM = $scope.docName;
        doc.HEADER_DATA = data;
        doc.PO_DATA = $scope.cgList;
        doc.HX_DATA = $scope.cxList;
        doc.IO_DATA = $scope.nbList;
        doc.HB_DATA = $scope.payList;
        doc.DN_DATA= $scope.dns ;
        if($scope.payList.length>0){
            doc.DOCTYPE = 'HBFK'
        }
        // doc.docName = $scope.docName;
        if($scope.payList.length==0){
            if ($scope.ORDER_DATA.BU1 == '15') {
                $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList||'0');
                $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");
            } else {
                $scope.ORDER_DATA.ZWHXJE = "";
                $scope.ORDER_DATA.ZSJFKJE = $scope.ORDER_DATA.ZSQJE;
            }
        }


        param.doc = doc;
        if (statue == "save") {

            var addInside = payment.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    window.location.href = '/index.html#/paymentOrder';
                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            if ($scope.ORDER_DATA.BU1 == '15' && $scope.ORDER_DATA.ZBM == "1000") {
                for (var i = 0; i < $scope.cgList.length; i++) {
                    if (!$scope.cgList[i].ZZCPTXT) {
                        swal("采购订单无产品线不能提交，请修改采购订单后再提交！", "", "warning");
                        return false;
                    }
                }
            }
            //运输委托单 申请付款金额 与 实际总费用小计值是否一致，不一致需提示允许保存草稿，不允许提交审批；
            if($scope.ORDER_DATA.BU1=="19"&&$scope.ORDER_DATA.BU2=="56"&&!$scope.payState){
                if($scope.dns.length){
                    if($scope.ORDER_DATA.ZSQJE!=$scope.sum){
                        swal("申请付款金额与实际总费用小计必须一致！", "", "warning");
                        return false;
                    }
                }/*else{
                    swal("运输委托单不能为空！", "", "warning");
                    return false;
                }*/
            }
            if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcxList && $scope.sumcgList*1 < $scope.sumcxList*1&&$scope.cgList.length) {
                swal("冲抵核销合计不能大于申请支付金额小计！", "", "warning");
                return false;
            }
            if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 < $scope.ORDER_DATA.ZSQJE&&$scope.cgList.length) {
                swal("申请支付金额大于采购订单申请支付金额小计！", "", "warning");
                return false;

            } else if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 > $scope.ORDER_DATA.ZSQJE&&$scope.cgList.length) {
                swal("申请支付金额不可小于采购订单申请支付金额小计！", "", "warning");
                return false;
            } else if ($scope.ORDER_DATA.BU1 !== '15' && $scope.sumnbList && $scope.sumnbList != $scope.ORDER_DATA.ZSQJE&&$scope.nbList.length) {
                swal("申请付款金额与费用申请单合计不相等！", "", "warning");
                return false;
            } else {
                var applyAdd = payment.applyAdd(param);
                applyAdd.success(function (data) {
                    if (data.code == 200) {
                        $scope.processId = data.rst.processId;
                        $scope.nodeId = data.rst.nodeId;
                        swal({
                            title: "提交成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回付款申请列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/paymentOrder';
                        });
                        /* if (($scope.ORDER_DATA.ZFKFS == "流动资金贷款" || $scope.ORDER_DATA.ZFKFS == "银行承兑汇票" || $scope.ORDER_DATA.ZFKFS == "国内信用证" || $scope.ORDER_DATA.ZFKFS == "商业承兑汇票") && $scope.payList.length == 0) {
                         $scope.goShow = true;
                         }*/
                    }
                    else {
                        if(data.msg.indexOf("不允许重复操作")>0){
                            swal("不能重复提交", "", "warning");
                        }else{
                            swal(data.msg, "", "warning");
                        }

                    }
                });
            }
        }
    }
}]);
paymentApp.controller('paymentOrderViewCtrl', ['$scope', '$stateParams', '$state', 'paymentServices', function ($scope, $stateParams, $state, payment) {
    var ORDER_DATA = {};
    $scope.cgList = [];
    $scope.cxList = [];
    $scope.nbList = [];
    $scope.payList = [];
    $scope.dns  = [];
    $scope.transportList =[];
    var ht = $scope.ht = {};
    //成本中心
    var costcenterflat = payment.costcenterflat();
    costcenterflat.success(function (data) {
        // 付款种类信息
        $scope.cenData = data;
    });
    var enumlist= payment.enumlist();
    enumlist.success(function (data) {
        if (data.code == 200) {
            $scope.provinceData=data.rst.data.province;
        }

    });

    $scope.getField = function (obj, f1, v1) {
      return getField(obj, f1, v1);
    };

    $scope.transportClick = function () {
        $("#transportBox").dialog({
            autoOpen: false,
            width:1000,
            modal: true
        });
        $("#transportBox").dialog("open");
    };
    $scope.closeTransport=function(){
        $("#transportBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    var viewCont = payment.viewInside({sapid: $stateParams.id});
    viewCont.success(function (data) {
        if(Object.keys(data.rst.data.model).length == 0){
            var selectprocredit = payment.selectprocredit({sapid: $stateParams.id});
            selectprocredit.success(function(data){
                if(data.code == 200){
                    $scope.ORDER_DATA = data.rst.data.model;
                    //废除按钮是否显示
                    var checkdozf= payment.checkdozf({ZSQNO:$scope.ORDER_DATA.ZSQNO});
                    checkdozf .success(function (data) {
                        if (data.code == 200) {
                            if(data.rst.data.canzf==false){
                                $scope.zfShow=false;
                            }else{
                                $scope.zfShow=true;
                            }
                        }
                    });
                }else if(data.rst.length == 0){
                    swal('该付款申请单已作废','','warning');
                }

            });
        }else{
            $scope.ORDER_DATA = data.rst.data.model;
            //废除按钮是否显示
            var checkdozf= payment.checkdozf({ZSQNO:$scope.ORDER_DATA.ZSQNO});
            checkdozf .success(function (data) {
                if (data.code == 200) {
                    if(data.rst.data.canzf==false){
                        $scope.zfShow=false;
                    }else{
                        $scope.zfShow=true;
                    }
                }
            });
        }

        //变更按钮是否显示
        if(data.rst.data.model.ZHBFK=='X'&&data.rst.data.model.ZFKSTA=='未付款'){
            $scope.hbEdit=true;

        }else{
            $scope.hbEdit=false;
        }
        $scope.pay1Chge=function(ZSQNO1){
            var checkdobg= payment.checkdobg({ZSQNO:ZSQNO1});
            checkdobg .success(function (data) {
                if (data.code == 200) {
                    if(data.rst.data.canbg ==false){
                        swal(data.rst.data.msg, "", "warning");
                        return false;
                    }else{
                        window.location.href = '/index.html#/hbEdit?sapid='+ZSQNO1;
                    }
                }
            });
        }
        if (data.rst.data.pos) {
            $scope.cgList = data.rst.data.pos;//采购订单
        }
        if (data.rst.data.hxs) {
            $scope.cxList = data.rst.data.hxs;//冲抵核销信息
        }
        if (data.rst.data.ios) {
            $scope.nbList = data.rst.data.ios;//内部订单
        }
        if (data.rst.data.hbs.length > 0) {
            $scope.payList = data.rst.data.hbs;
            $scope.payState = true;
            $scope.cgOrder = false;
            $scope.glOrder = false;
        }
        if(data.rst.data.dns&&(data.rst.data.dns).length> 0){

            $scope.addPage=false;
            $scope.transportShow=true;
            $scope.transportList=data.rst.data.dns;
            var sum=0;
            for(var f=0;f<$scope.transportList.length;f++){
                sum+=+$scope.transportList[f].ZSJZF;
            }
            $scope.sum=sum;
        }
       /* //审批流程
	    // 2017-4-14 loupei增加容错处理
        $scope.processlog=data.rst.data.processinfo ? data.rst.data.processinfo.processlog : [];*/
        switch (data.rst.data.model.WAERS) {
            case "CNY":
                $scope.WAERS = "人民币";
                break;
            case "EUR":
                $scope.WAERS = "欧元";
                break;
            case "USD":
                $scope.WAERS = "美元";
                break;
            case "CHF":
                $scope.WAERS = "瑞士法郎";
                break;
            case "HKD":
                $scope.WAERS = "港币";
                break;
            case "JPY":
                $scope.WAERS = "日元";
                break;
            default :
                $scope.WAERS = "人民币";
        }
        var enumPur = payment.enumPurchase();
        enumPur.success(function (data) {
            if (data.code == 200) {
                $scope.KOSTL = data.rst.enum.EKORG;
                $scope.enumObj = data.rst.enum;
            } else {
            }

        });
        var payData = payment.enumPay();
        payData.success(function (data) {
            var bug1 = getField(data, "CODE1", $scope.ORDER_DATA.ZFKZL.substring(0, 2));
            $scope.BU1 = bug1.TITLE;
            var bug2 = getField(bug1, "CODE2", $scope.ORDER_DATA.ZFKZL.substring(2, 4));
            $scope.BU2 = bug2.TITLE;
            if ($scope.payList.length == 0) {
                if ($scope.BU1 == "货款") {
                    $scope.cgOrder = true;
                    $scope.glOrder = false;
                    $scope.transportShow = false;
                } else {
                    if($scope.BU1 == "直接运营费用"&&$scope.BU2=="仓储物流费"){
                        $scope.cgOrder = false;
                        $scope.glOrder = false;
                        $scope.transportShow = true;
                    }else{
                        if($scope.nbList.length){
                            $scope.glOrder = true;
                        }else {
                            $scope.glOrder = false;
                        }
                        $scope.cgOrder = false;

                        $scope.transportShow = false;
                    }
                }
            }
            if (bug2.BU3.length > 0) {
                var bug3 = getField(bug2, "CODE3", $scope.ORDER_DATA.ZFKZL.substring(4));
                $scope.BU3 = '-' + bug3.TITLE;
            }
        });
        if ($scope.cgList.length > 0) {
            $scope.sumcgList = 0;
            for (var k = 0; k < $scope.cgList.length; k++) {
                $scope.sumcgList += $scope.cgList[k].ZSQJE * 1;
            }
        }
        if ($scope.cxList.length > 0) {
            $scope.sumcxList = 0;
            for (var j = 0; j < $scope.cxList.length; j++) {
                $scope.sumcxList += $scope.cxList[j].ZCDJE * 1;
            }
        }
        if ($scope.nbList.length > 0) {
            $scope.sumnbList = 0;
            for (var p = 0; p < $scope.nbList.length; p++) {
                $scope.sumnbList += $scope.nbList[p].ZSQJE * 1;
            }
        }
        if ($scope.ORDER_DATA.ZFKFS == "国内信用证") {
            $scope.type1 = true;
        } else if ($scope.ORDER_DATA.ZFKFS !== "国内信用证") {
            $scope.type1 = false;
        }


        if ($scope.ORDER_DATA.ZFKFS == "流动资金贷款" || $scope.ORDER_DATA.ZFKFS == "银行承兑汇票" || $scope.ORDER_DATA.ZFKFS == "国内信用证" || $scope.ORDER_DATA.ZFKFS == "商业承兑汇票") {
            if(data.rst.data.hasdoyhsx==false&&$scope.ORDER_DATA.ZFKSTA=="已付款"){
                $scope.bankShow = false;
            }else{
                $scope.bankShow = true;
            }
        } else {
            $scope.bankShow = false;
        }
        $scope.bankGoBox = function () {
            if (data.rst.data.hasdoyhsx == true) {
                if (data.rst.data.hasapprove == true) {
                    $state.go('bankCreditOrderView', {id: data.rst.data.yhsxid});
                } else {
                    $state.go('bankcredit', {processId: data.rst.data.yhsxprocessid, nodeId: data.rst.data.yhsxnodeid,myflag:"mysubscriber",pay:"payment"});
                }
            } else {
                $state.go('bankCreditOrderAdd', {sap: $stateParams.id});
            }
        }
        $scope.addData = function () {
            swal({title: "是否作废？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "否",
                    confirmButtonText: "是" },
                function(){
                    var doc = {}, param = {processId: $scope.processId, nodeId: $scope.nodeId,sapid:$stateParams.id};
                    doc.HEADER_DATA =data.rst.data.model;
                    doc.HEADER_DATA.LOEVM="X";
                    doc.PO_DATA = data.rst.data.pos;
                    doc.HX_DATA =data.rst.data.hxs;
                    doc.IO_DATA =data.rst.data.ios;
                    doc.HB_DATA = data.rst.data.hbs;
                    doc.DN_DATA  = data.rst.data.dns ;
                    doc.DOCTYPE = 'FKZF';
                    param.doc = doc;
                    var applyAdd = payment.applyAdd(param);
                    applyAdd.success(function (data) {
                        if (data.code == 200) {
                            swal("作废成功", "", "success");
                            $scope.processId = data.rst.processId;
                            $scope.nodeId = data.rst.nodeId;
                        }
                        else {
                            swal(data.msg, "", "warning");
                        }
                    });
                }
            );

        }
    });
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = payment.getprocesslog({type: 'FKSQ', id: vm.ORDER_DATA.ZSQNO,gettype:'group'}); // 直接取值数据中 申请人（proposer）
            processlog.success(function (data) {
                if (data.rst.length != 0) {
                    vm.processlog = data.rst;
                    vm.ht.activeTab = type;
                } else {
                    swal('没有审批信息', '', 'warning');
                }
            });
        } else {
            vm.ht.activeTab = type;
        }
    };
    // 审批记录 END
    $scope.saleDir = function (index, ZZPO, ZZSDPO) {
        $("#saleBox").dialog({
            autoOpen: false,
            width: 870,
            modal: true
        });
        $("#saleBox").dialog("open");
        var param = {supplierorderid: ZZPO, salesorderid: ZZSDPO};
        var getcontractbyorderid = payment.getcontractbyorderid(param);
        getcontractbyorderid.success(function (data) {
            if (data.code == 200) {
                $scope.saleDataList = data.rst.items;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    }
    $scope.saleSelect = function () {
        $("#saleBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.incomDir = function (index, ZZPO, ZZSDPO) {
        $("#incomeBox").dialog({
            autoOpen: false,
            width: 980,
            modal: true
        });
        $("#incomeBox").dialog("open");
        var param = {supplierorderid: ZZPO, salesorderid: ZZSDPO};
        var getskbysalesorderidorsupplierorderid = payment.getskbysalesorderidorsupplierorderid(param);
        getskbysalesorderidorsupplierorderid.success(function (data) {
            if (data.code == 200) {
                $scope.incomDataList = data.rst.data;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    };
    $scope.incomSelect = function () {
        $("#incomeBox").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.cusXy = function (stomerid,stomer) {
        // var listCredit = apply.listCredit({ cusname: stomer});
        var listCredit = payment.listCredit({ cusname: stomer});
        listCredit.success(function(data){
            if (data.code == 200) {
                if(data.rst.data.items.length==0){
                    swal("该客户没有维护客户信用", "", "warning");
                    return false;
                }else{
                    var param = {cuscode: stomerid};
                    var getcreditbycode = payment.getcreditbycode(param);
                    getcreditbycode.success(function (data) {
                        if (data.code == 200) {
                            var id = data.rst._id;
                            window.open("index.html#/creditTabView/" + id + "?flag=pay&cuscode="+stomerid+"&cusname="+stomer);
                            $("#saleBox").dialog("destroy");
                            $(".ui-dialog").remove();
                        } else {
                            swal(data.msg, "", "warning");
                        }
                    }).error(function (error) {
                        swal({
                            title: "",
                            text: error,
                            type: "error"
                        })
                    });
                }
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        })

    }

}]);
paymentApp.controller('applyCreditCtrl', ['$scope', '$stateParams', '$state','$rootScope','$filter', 'paymentServices', function ($scope, $stateParams, $state,$rootScope,$filter, apply) {
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    //作废成本中心
    var costcenterflat = apply.costcenterflat();
    costcenterflat.success(function (data) {
        // 付款种类信息
        $scope.cenData = data;
    });
    var enumlist= apply.enumlist();
    enumlist.success(function (data) {
        if (data.code == 200) {
            $scope.provinceData=data.rst.data.province;
        }

    });
    var viewPur = apply.applyView(param);
    $scope.cgList = [];
    $scope.cxList = [];
    $scope.nbList = [];
    $scope.payList = [];
    $scope.transportList = [];
    $scope.dns=[];
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.comeAdd = function (type) {
        if (type == 'cxList') {//冲抵核销信息
            var obj = {ZCDLX: '', ZSQNO_YF: '', ZZPO: '', left: '', EBELN: '', ZCDJE: ''};
            $scope.cxList.push(obj);
        }
    };
    $scope.cgCode = function (ZSQNO, index) {
        if (ZSQNO) {
            var num = 0;
            for (var i = 0; i < $scope.cgList.length; i++) {
                if (ZSQNO == $scope.cgList[i].EBELN) {
                    num++;
                }
            }
            if (num == 0) {
                swal("此采购订单号不存在", "", "warning");
                $scope.cxList[index].EBELN = "";
                return false;
            }
        }

    }
    var cxindex = 0;
    $scope.cxSelect = function (index, type) {
        if (type == '挂账款') {
            $scope.$broadcast('cxCtrl', $scope.ORDER_DATA.LIFNR);
            $("#cxBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.cxDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.cxDialog = false;
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].EBELN = '';
                            $scope.cxList[index].ZCDJE = '';
                            $scope.cxList[index].ZCDJENUM = '';
                            var all = 0;
                            if ($scope.cxList.length >0) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all += parseFloat($scope.cxList[i].ZCDJE||"0");
                                }
                            }

                            $scope.sumcxList = all.toFixed(2);

                        })
                    }, 0)
                }
            });
            $("#cxBox").dialog("open");
        } /*else if (type == '品牌基金/能力提升') {
         $scope.$broadcast('cxppCtrl', $scope.ORDER_DATA.ZSKDW);
         $("#cxppBox").dialog({
         autoOpen: false,
         width: 800,
         modal: true,
         close: function () {
         setTimeout(function () {
         $scope.$apply(function () {
         $scope.cxList[index].ZCDLX = '';
         $scope.cxList[index].ZSQNO_YF = '';
         $scope.cxList[index].ZZPO = '';
         $scope.cxList[index].left = '';
         $scope.cxList[index].EBELN = '';
         $scope.cxList[index].ZCDJE = '';
         $scope.cxList[index].ZCDJENUM = '';
         var all1 = 0;
         if ($scope.cxList.length > 1) {
         for (var i = 0; i < $scope.cxList.length; i++) {
         all1 += parseFloat($scope.cxList[i].ZCDJE);
         }
         }

         $scope.sumcxList = all1;
         })
         }, 0)
         }
         });
         $("#cxppBox").dialog("open");
         }*/ else if (type == '抵扣款') {
            $scope.$broadcast('dkCtrl', $scope.ORDER_DATA.LIFNR);
            $("#dkBox").dialog({
                autoOpen: false,
                width: 800,
                modal: true,
                open: function () {
                    setTimeout(function() {
                        $scope.$apply(function () {
                            $scope.openDialog = true;
                        })
                    })
                },
                close: function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.openDialog = false;
                            $scope.cxList[index].ZCDLX = '';
                            $scope.cxList[index].ZSQNO_YF = '';
                            $scope.cxList[index].ZZPO = '';
                            $scope.cxList[index].left = '';
                            $scope.cxList[index].EBELN = '';
                            $scope.cxList[index].ZCDJE = '';
                            $scope.cxList[index].ZCDJENUM = '';
                            var all1 = 0;
                            if ($scope.cxList.length >0) {
                                for (var i = 0; i < $scope.cxList.length; i++) {
                                    all1 += parseFloat($scope.cxList[i].ZCDJE||"0");
                                }
                            }

                            $scope.sumcxList = all1.toFixed(2);
                        })
                    }, 0)
                }
            });
            $("#dkBox").dialog("open");
        }
        ;
        cxindex = index;
    }
    $scope.$on('to-cx', function (d, data) {
        $scope.cxDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /* tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all = 0;
        if ($scope.cxList.length > 0) {
            for (var i = 0; i < $scope.cxList.length; i++) {
                all += parseFloat($scope.cxList[i].ZCDJE);
            }
        }

        $scope.sumcxList = all.toFixed(2);
        $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList|| "0");
        $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");

    });
    /*$scope.$on('to-cxpp', function (d, data) {
     var tr = $("#cxList").find(".list").eq(cxindex);
     tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
     tr.find("input:eq(2)").val(data.left).trigger('change');
     tr.find("input:eq(4)").val(data.left).trigger('change');
     /!*tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*!/
     var all2 = 0;
     if ($scope.cxList.length > 0) {
     for (var i = 0; i < $scope.cxList.length; i++) {
     all2 += parseFloat($scope.cxList[i].ZCDJE);
     console.log(($scope.cxList[i].ZCDJE))
     }
     }

     $scope.sumcxList = all2 ;
     $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE) - parseFloat($scope.sumcxList|| "0");
     $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");

     });*/
    $scope.$on('to-dk', function (d, data) {
        $scope.openDialog = false;
        var tr = $("#cxList").find(".list").eq(cxindex);
        tr.find("input:eq(0)").val(data.ZSQNO_YF).trigger('change');
        tr.find("input:eq(1)").val(data.ZZPO).trigger('change');
        tr.find("input:eq(2)").val(data.ZJE).trigger('change');
        tr.find("input:eq(3)").val(data.left).trigger('change');
        tr.find("input:eq(5)").val(data.left).trigger('change');
        /* tr.find("input:eq(2)").val(data.ZSQNO).trigger('change');*/
        var all1 = 0;
        if ($scope.cxList.length > 0) {
            for (var i = 0; i < $scope.cxList.length; i++) {
                all1 += parseFloat($scope.cxList[i].ZCDJE);
            }
        }

        $scope.sumcxList = all1.toFixed(2);
        $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList|| "0");
        $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");

    });
    $scope.sumFn1 = function (left, ZCDJE, id, index) {
        if (!id) return;
        var obj = $('#' + id);
        if (!obj || !obj[0]) return;
        if (left * 1 < ZCDJE * 1) {
            console.log(11)
            swal({
                    title: "冲抵金额不能大于可用冲抵金额！",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: "确定"
                },
                function () {
                    $scope.$apply(function () {
                        $scope.cxList[index].ZCDJE = "";
                       /* var sum = 0;
                        obj.find('.listNum').each(function () {
                            sum += +$(this).val();
                        });
                        $scope['sum' + id] = sum.toFixed(2) ;*/
                        var sum = 0;
                        for(var i=0;i<$scope.cxList.length;i++){
                            sum+=$scope.cxList[i].ZCDJE;
                        }
                        $scope.sumcxList = (sum*1).toFixed(2) ;
                        $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList|| "0");
                        $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");
                    })
                }
            );
            return false;
        }
        var sum = 0;
        obj.find('.listNum').each(function () {
            sum += +$(this).val();
        });
        console.log(sum)
        $scope['sum' + id] = sum.toFixed(2) ;
        $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList|| "0");
        $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");
    }
    $scope.comeDel = function (idx, type) {
        if (type == 'cxList') {
            $scope.cxList.splice(idx, 1);
            var sum = 0;
            for(var i=0;i<$scope.cxList.length;i++){
                sum+=$scope.cxList[i].ZCDJE;
            }
            $scope.sumcxList = sum.toFixed(2) ;
            $scope.ORDER_DATA.ZSJFKJE = parseFloat($scope.ORDER_DATA.ZSQJE || 0) - parseFloat($scope.sumcxList|| "0");
            $scope.ORDER_DATA.ZWHXJE = parseFloat($scope.ORDER_DATA.ZSJFKJE || 0) - parseFloat($scope.sumcgList || "0") + parseFloat($scope.sumcxList || "0");

        }
    };
    $scope.bankName = function (LIFNR1) {
        $("#bankBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#bankBox").dialog("open");
        var param = {LIFNR: LIFNR1};
        var bankList = apply.listBox(param);
        bankList.success(function (data) {
            if (data.code == 200) {
                $scope.bankList = data.rst.data.items;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    };
    $scope.bankSelect = function (BANKA, BANKN,PROVZ,ORT01) {
        $scope.ORDER_DATA.ZYHMC_CN = BANKA;
        $scope.ORDER_DATA.ZYHZH = BANKN;
        $scope.ORDER_DATA.PROVZ = PROVZ;
        $scope.ORDER_DATA.ORT01 = ORT01;
        $("#bankBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.transportClick = function () {
        $("#transportBox").dialog({
            autoOpen: false,
            width:1000,
            modal: true
        });
        $("#transportBox").dialog("open");
    };
    $scope.closeTransport=function(){
        $("#transportBox").dialog("destroy");
        $(".ui-dialog").remove();
    }
    viewPur.success(function (data) {
        if (data.code == 200) {
            var enumPur = apply.enumPurchase();
            enumPur.success(function (data) {
                if (data.code == 200) {
                    $scope.KOSTL = data.rst.enum.EKORG;
                    $scope.enumObj = data.rst.enum;
                } else {
                }

            });
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            if($scope.ORDER_DATA.LOEVM){
                $scope.desShow=true;
            }else{
                $scope.desShow=false;
            }
            if (data.rst.doc.pos.length > 0) {
                $scope.payState = false;
                $scope.cgOrder = true;
                $scope.glOrder = false;
                $scope.transportShow = false;
                $scope.cgList = data.rst.doc.pos;//采购订单
            }
            if (data.rst.doc.hxs.length > 0) {
                $scope.cxList = data.rst.doc.hxs;//冲抵核销信息
            }
            if (data.rst.doc.ios.length > 0) {
                $scope.payState = false;
                $scope.cgOrder = false;
                $scope.glOrder = true;
                $scope.transportShow = false;
                $scope.nbList = data.rst.doc.ios;//内部订单
            }
            if ((data.rst.doc.hbs||[]).length> 0) {
                $scope.payList = data.rst.doc.hbs;
                var pay1Data = apply.enumPay();
                pay1Data.success(function (data) {
                    // 付款种类信息
                    $scope.payData = data;
                });
                $scope.payState = true;
                $scope.cgOrder = false;
                $scope.glOrder = false;
                $scope.transportShow = false;
            }
            if(data.rst.doc.dns&&(data.rst.doc.dns).length> 0){
                $scope.transportShow=true;
                $scope.payState = false;
                $scope.cgOrder = false;
                $scope.glOrder = false;
                $scope.addPage=false;
                $scope.transportList=data.rst.doc.dns;
                $scope.dns =data.rst.doc.dns;
                var sum=0;
                for(var f=0;f<$scope.transportList.length;f++){
                    sum+=+$scope.transportList[f].ZSJZF;
                }
                $scope.sum=sum;
            }
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            var type = data.rst.doc.model.ZSKLX;
            $scope.comeList = data.rst.doc.items;
            $scope.billsList = data.rst.doc.bills;
            $scope.DOCTYPE = data.rst.property.type;
            if ($scope.cgList.length > 0) {
                $scope.sumcgList = 0;
                for (var k = 0; k < $scope.cgList.length; k++) {
                    $scope.sumcgList += $scope.cgList[k].ZSQJE * 1;
                }
                $scope.sumcgList=Math.round($scope.sumcgList*100)/100;
            }
            if ($scope.cxList.length > 0) {
                $scope.sumcxList = 0;
                for (var j = 0; j < $scope.cxList.length; j++) {
                    $scope.sumcxList += $scope.cxList[j].ZCDJE * 1;
                }
                $scope.sumcxList = $scope.sumcxList.toFixed(2);
            }
            if ($scope.nbList.length > 0) {
                $scope.sumnbList = 0;
                for (var p = 0; p < $scope.nbList.length; p++) {
                    $scope.sumnbList += $scope.nbList[p].ZSQJE * 1;
                }
            }
            switch (data.rst.doc.model.WAERS) {
                case "CNY":
                    $scope.WAERS = "人民币";
                    break;
                case "EUR":
                    $scope.WAERS = "欧元";
                    break;
                case "USD":
                    $scope.WAERS = "美元";
                    break;
                case "CHF":
                    $scope.WAERS = "瑞士法郎";
                    break;
                case "HKD":
                    $scope.WAERS = "港币";
                    break;
                case "JPY":
                    $scope.WAERS = "日元";
                    break;
                default :
                    $scope.WAERS = "人民币";
            }
            if ($scope.ORDER_DATA.ZFKFS == "国内信用证") {
                $scope.type1 = true;
            } else if ($scope.ORDER_DATA.ZFKFS !== "国内信用证") {
                $scope.type1 = false;
            }
            //跳转银行授信
            if ($scope.ORDER_DATA.ZFKFS == "流动资金贷款" || $scope.ORDER_DATA.ZFKFS == "银行承兑汇票" || $scope.ORDER_DATA.ZFKFS == "国内信用证" || $scope.ORDER_DATA.ZFKFS == "商业承兑汇票") {
                $scope.bankShow = true;
            } else {
                $scope.bankShow = false;
            }
            $scope.bankGoBox = function () {
                if (data.rst.doc.hasdoyhsx == true) {
                    if (data.rst.doc.hasapprove == true) {
                        $state.go('bankCreditOrderView', {id: data.rst.doc.yhsxid});
                    } else {
                        $state.go('bankcredit', {
                            processId: data.rst.doc.yhsxprocessid,
                            nodeId: data.rst.doc.yhsxnodeid,
                            myflag:"mysubscriber",
                            pay:"payment"
                        });
                    }
                } else {
                    $state.go('bankCreditOrderAdd', {proId: $stateParams.processId, noId: $stateParams.nodeId});
                }
            }
            //银行权限
            $scope.bankChange = true;
            $scope.hbPay = true;
            if ($stateParams.myflag == 'mydoing') {
                var bank = $rootScope.billPrev;
                if(bank.business_common){
                    $scope.bankChange = false;
                }else {
                    $scope.bankChange = true;
                }
                if(bank.hbfk_page && $scope.ORDER_DATA.BU1 == 15){
                    $scope.hbPay = false;
                } else {
                    $scope.hbPay = true;
                }
            }

            $scope.appZSJFKFS = true;
            var payData = apply.enumPay();
            payData.success(function (data) {
                if ($scope.ORDER_DATA.BU1) {
                    var bug1 = getField(data, "CODE1", $scope.ORDER_DATA.BU1);
                    $scope.BU1 = bug1.TITLE;
                    var bug2 = getField(bug1, "CODE2", $scope.ORDER_DATA.BU2);

                    $scope.BU2 = bug2.TITLE;
                    if (bug2.BU3.length > 0) {
                        var bug3 = getField(bug2, "CODE3", $scope.ORDER_DATA.BU3);
                        $scope.BU3 = '-' + bug3.TITLE;
                    }

                }else if($scope.ORDER_DATA.ZFKZL){
                    var bug1 = getField(data, "CODE1", $scope.ORDER_DATA.ZFKZL.substring(0, 2));
                    $scope.BU1 = bug1.TITLE;
                    $scope.ORDER_DATA.BU1=$scope.ORDER_DATA.ZFKZL.substring(0, 2);

                    var bug2 = getField(bug1, "CODE2", $scope.ORDER_DATA.ZFKZL.substring(2, 4));
                    $scope.BU2 = bug2.TITLE;
                    $scope.ORDER_DATA.BU2=$scope.ORDER_DATA.ZFKZL.substring(2, 4);
                    if (bug2.BU3.length > 0) {
                        var bug3 = getField(bug2, "CODE3", $scope.ORDER_DATA.ZFKZL.substring(4));
                        $scope.BU3 = '-' + bug3.TITLE;
                        $scope.ORDER_DATA.BU3=$scope.ORDER_DATA.ZFKZL.substring(4);
                    }
                }


            });
            $scope.canChange = true;
            //打印按钮在申请，待办，已办中显示
            if ($stateParams.myflag== 'mybegin'){
                $scope.printShow=false;
            }else{
                $scope.printShow=true;
            }
            //付款方式权限
            if ($stateParams.myflag == "mgdoing") {
                var limiter = $rootScope.billPrev;
                for (var x in limiter) {
                    if (limiter[x].name == "fkfspage") {
                        $scope.canChange = false;
                    }
                }
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
                $scope.apCot = data.rst.processlog.length > 1 ? true : false;
                //$scope.apCot = false;
            }
        } else {
            swal(data.msg, "", "warning");
        }
    }).error(function (error) {
        swal({
            title: "",
            text: error,
            type: "error"
        })
    });
    //打印
    $scope.printFn = function (e) {
        $(e.target).attr('href', '/print/printht.html?uri=/credit/printview&ZSQNO=' + $scope.ORDER_DATA.ZSQNO+'&processId='+$stateParams.processId+'&nodeId='+$stateParams.nodeId);
    };
    $scope.cusXy = function (stomerid,stomer) {
        var listCredit = apply.listCredit({ cusname: stomer});
        listCredit.success(function(data){
            if (data.code == 200) {
                if(data.rst.data.items.length==0){
                    swal("该客户没有维护客户信用", "", "warning");
                    return false;
                }else{
                    var param = {cuscode: stomerid};
                    var getcreditbycode = apply.getcreditbycode(param);
                    getcreditbycode.success(function (data) {
                        if (data.code == 200) {
                            var id = data.rst._id;
                            window.open("index.html#/creditTabView/" + id + "?flag=pay&cuscode="+stomerid+"&cusname="+stomer);
                            $("#saleBox").dialog("destroy");
                            $(".ui-dialog").remove();
                        } else {
                            swal(data.msg, "", "warning");
                        }
                    }).error(function (error) {
                        swal({
                            title: "",
                            text: error,
                            type: "error"
                        })
                    });
                }
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        })

    }
    $scope.saleDir = function (index, ZZPO, ZZSDPO) {
        $("#saleBox").dialog({
            autoOpen: false,
            width: 870,
            modal: true
        });
        $("#saleBox").dialog("open");
        var param = {supplierorderid: ZZPO, salesorderid: ZZSDPO};
        var getcontractbyorderid = apply.getcontractbyorderid(param);
        getcontractbyorderid.success(function (data) {
            if (data.code == 200) {

                $scope.saleDataList = data.rst.items;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    };
    $scope.saleSelect = function () {
        $("#saleBox").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.incomDir = function (index, ZZPO, ZZSDPO) {
        $("#incomeBox").dialog({
            autoOpen: false,
            width: 980,
            modal: true
        });
        $("#incomeBox").dialog("open");
        var param = {supplierorderid: ZZPO, salesorderid: ZZSDPO};
        var getskbysalesorderidorsupplierorderid = apply.getskbysalesorderidorsupplierorderid(param);
        getskbysalesorderidorsupplierorderid.success(function (data) {
            if (data.code == 200) {
                $scope.incomDataList = data.rst.data;
            } else {
                swal(data.msg, "", "warning");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    };
    $scope.incomSelect = function () {
        $("#incomeBox").dialog("destroy");
        $(".ui-dialog").remove();
    };
    var applyObj = $scope.applyObj = {};
    $scope.applySave = function(){

        var param = {};
        var doc={};
        doc=$scope.doc;
        doc.HEADER_DATA =  $scope.ORDER_DATA;
        doc.PO_DATA = $scope.cgList;
        doc.HX_DATA = $scope.cxList;
        doc.IO_DATA = $scope.nbList;
        doc.HB_DATA = $scope.payList;
        doc.DN_DATA  = $scope.dns ;
        doc.DOCTYPE  = $scope.DOCTYPE ;
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
    $scope.applyAgree = function () {
        var requiredObj1 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj1, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }

        if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 <$scope.sumcxList*1) {
            swal("冲抵核销信息合计不能大于申请支付金额小计！", "", "warning");
            return false;
        }
        // 提交
        $scope.applyFn = function (selIndex) {
            // var person = $cookieStore.get("persion");
            var person = $rootScope.loginPerson;
            var roles = person.roles;
            var ap = true;
            /*$.each(roles,function(key, value){
             if(value.name == 'purchase'){
             if($scope.ORDER_DATA.ZSJFKFS==""){
             alert("请填写实际付款方式");
             ap = false;
             return false;
             }
             }
             });*/
            if (ap == false) {//判断填写付款方式
                return false;
            }
            var param = {};
            param.doc = $scope.doc;
            param.doc.model = $scope.ORDER_DATA;
            param.doc.DOCTYPE = $scope.DOCTYPE;
            param.doc.model.ZSJFKFS = $scope.ORDER_DATA.ZSJFKFS;
            param.doc.hxs = $scope.cxList;
            param.comment = applyObj.applyIdea;
            param.processId = $stateParams.processId;
            param.nodeId = $stateParams.nodeId;
            param.candidates = $scope.candidates;

            if (selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
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
                        confirmButtonText: "返回我的待办",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=付款申请&controllercode=FKSQ,HBFK,FKZF,FKBG';
                    });
                } else {
                    swal(data.msg, '', "error");
                }
            }).error(function (error) {
                swal({
                    title: "",
                    text: error,
                    type: "error"
                })
            });
        };
        if ($scope.candidates.length && $scope.candidates[0].receivers > 1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
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
        var requiredObj1 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj1, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 <$scope.sumcxList*1) {
            swal("冲抵核销信息合计不能大于申请支付金额小计！", "", "warning");
            return false;
        }
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
                    confirmButtonText: "返回我的待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=付款申请&controllercode=FKSQ,HBFK,FKZF,FKBG';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    }
    $scope.applyCancel = function () {//取消
        var requiredObj1 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj1, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 <$scope.sumcxList*1) {
            swal("冲抵核销信息合计不能大于申请支付金额小计！", "", "warning");
            return false;
        }
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
                    confirmButtonText: "返回我的待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=付款申请&controllercode=FKSQ,HBFK,FKZF,FKBG';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    }
    $scope.applyRecall = function () {//召回
        var requiredObj1 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj1, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if ($scope.ORDER_DATA.BU1 == '15' && $scope.sumcgList && $scope.sumcgList*1 <$scope.sumcxList*1) {
            swal("冲抵核销信息合计不能大于申请支付金额小计！", "", "warning");
            return false;
        }
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
                    confirmButtonText: "返回我的待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=付款申请&controllercode=FKSQ,HBFK,FKZF,FKBG';
                });
            } else {
                swal(data.msg, '', "error");
            }
        }).error(function (error) {
            swal({
                title: "",
                text: error,
                type: "error"
            })
        });
    }
}]);
paymentApp.controller('hbEditCtrl', ['$scope', '$stateParams', 'paymentServices', function ($scope, $stateParams, payment) {
    var ORDER_DATA = $scope.ORDER_DATA = {};
    $scope.payList =[];
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    //成本中心
    var enumlist= payment.enumlist();
    enumlist.success(function (data) {
        if (data.code == 200) {
            $scope.costcenterSel = data.rst.data.costcenter;
        }

    });
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    $scope.payCostcenterFn = function () {
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 500,
            modal: true
        });
        $("#costCenterDialog").dialog("open");
        $scope.groupsTreeModel = $scope.costcenterSel;
        $scope.showSelected = function (sel) {
            $scope.selectedNode = sel;
        };
        $scope.selectTypeFn = function () {
            var val = $scope.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
            $scope.ORDER_DATA.KOSTL= val.code;
            $scope.ORDER_DATA.KOSTLTEXT= val.text;

            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    var payData = payment.enumPay();
    payData.success(function (data) {
        // 付款种类信息
        $scope.payData = data;
    });
    $scope.typeChange = function (type) {//付款方式
        if (type == "国内信用证") {
            $scope.type1 = true;
        } else {
            $scope.type1 = false;
        }
    }
    var viewCont = payment.viewInside({
        sapid: $stateParams.sapid
    });
    viewCont.success(function (data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.docName = $scope.ORDER_DATA.ZURLNAM;
        $scope.payList = data.rst.data.hbs;
        var bug1 = getField($scope.payData, "CODE1", $scope.ORDER_DATA.ZFKZL.substring(0, 2));
        $scope.BU1 = bug1.TITLE;
        var bug2 = getField(bug1, "CODE2", $scope.ORDER_DATA.ZFKZL.substring(2, 4));
        $scope.BU2 = bug2.TITLE;
        if (bug2.BU3.length > 0) {
            var bug3 = getField(bug2, "CODE3", $scope.ORDER_DATA.ZFKZL.substring(4));
            $scope.BU3 = '-' + bug3.TITLE;
        }
    });
    //合并添加付款单
    $scope.cArr = [];
    $scope.cArrIndex = [];
    var updateSelected = function (action, id, index, hbing, checkbox) {
        if (action == 'add') {
            if (hbing == true) {
                swal("付款申请号" + id + "正在合并中", "", "warning");
                $scope.paymentList[index].check=false;
                return false;
            }else{
                $scope.cArr.push($scope.paymentList[index]);
                $scope.cArrIndex.push(index);
            }

        }
        if (action == 'remove') {
            for (var i = 0; i < $scope.cArr.length; i++) {
                if ($scope.cArr[i].ZSQNO == id) {
                    $scope.cArr.splice(i, 1);
                    $scope.cArrIndex.splice(i, 1);
                }
            }
        }
    };
    $scope.updateSelection = function ($event, id, index, hbing,ZHB) {
        var checkbox = $event.target;
        var checkdohb= payment.checkdohb ({ZSQNOs: [id]});
        checkdohb .success(function (data) {
            if (data.code == 200) {
                if(data.rst.data.canhb!=true){
                    swal(data.rst.data.msg, "", "warning");
                    $scope.paymentList[index].check=false;
                    return false;
                }else{
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id, index, hbing, checkbox);
                }
            }
        });
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
    };
    $scope.allCheck = function ($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.paymentList.length; i++) {
                if($scope.paymentList[i].ZHB=='N'){
                    swal( $scope.paymentList[i].ZSQNO + "付款单不能合并", "", "warning");
                    checkbox.checked=false;
                    $scope.paymentList[i].check=false;
                }else{
                    $scope.paymentList[i].check=true;
                    $scope.cArr[i] = $scope.paymentList[i];
                    $scope.cArrIndex[i] = i;
                }

            }
        } else {
            $scope.cArr = [];
            $scope.cArrIndex = [];
        }
    };
    $scope.payAdd = function () {
        var ary=[];
        for(var i=0;i<$scope.payList.length;i++){
            ary.push($scope.payList[i].ZSQNO);
        }
        var par = {
            LIFNR: $scope.ORDER_DATA.LIFNR,
            ZFKZL: $scope.ORDER_DATA.ZFKZL.substring(0,2),
            ZFKSTA: '未付款',
            choosedsubs: ary,
            ZHB: 'Y',
            HAS_HB:'N'
        };

        var payPromise = payment.listInside(par);
        payPromise.success(function (data) {
            if (data.code == 200) {
                $("#payAddList").dialog({
                    autoOpen: false,
                    width:1200,
                    modal: true
                });
                $("#payAddList").dialog("open");
                $scope.enumobj = {ZFKZT: {1000: "中建材信息技术股份有限公司", 9000: "中建材集团进出口公司", 9001: "中国建材（香港）有限公司"}};
                $scope.paymentList = data.rst.data.items;
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
    $scope.payCancle = function () {
        $("#payAddList").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.paySelect = function () {
        $scope.payList = $scope.payList.concat($scope.cArr);
        $scope.cArr = [];
        $scope.cArrIndex = [];
        var sqNum= 0,whxNum= 0,sjNum=0;
        for(var i=0;i<$scope.payList.length;i++){
            sqNum+=$scope.payList[i].ZSQJE;
            whxNum+=$scope.payList[i].ZWHXJE;
            sjNum+=$scope.payList[i].ZSJFKJE;
        }
        $scope.ORDER_DATA.ZSQJE=sqNum.toFixed(2);
        $scope.ORDER_DATA.ZWHXJE=whxNum.toFixed(2);
        $scope.ORDER_DATA.ZSJFKJE=sjNum.toFixed(2);
        $("#payAddList").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.comeDel = function (idx, type) {
        $scope.payList.splice(idx, 1);
        var sqNum= 0,whxNum= 0,sjNum=0;
        for(var i=0;i<$scope.payList.length;i++){
            sqNum+=$scope.payList[i].ZSQJE;
            whxNum+=$scope.payList[i].ZWHXJE;
            sjNum+=$scope.payList[i].ZSJFKJE;
        }
        $scope.ORDER_DATA.ZSQJE=sqNum.toFixed(2);
        $scope.ORDER_DATA.ZWHXJE=whxNum.toFixed(2);
        $scope.ORDER_DATA.ZSJFKJE=sjNum.toFixed(2);
    }
    $scope.addData = function (data, statue) {
        var doc = {}, param = {processId: $scope.processId, nodeId: $scope.nodeId,sapid:$stateParams.sapid};
        $scope.ORDER_DATA.ZURLNAM = $scope.docName;
        doc.HEADER_DATA = data;
        doc.PO_DATA = [];
        doc.HX_DATA = [];
        doc.IO_DATA = $scope.nbList;
        doc.HB_DATA = $scope.payList;
        doc.DOCTYPE = 'FKBG';
        param.doc = doc;
        if (statue == "save") {
            var addInside = payment.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    window.location.href = '/index.html#/paymentOrder';
                } else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if (statue == 'apply') {
            var applyAdd = payment.applyAdd(param);
            applyAdd.success(function (data) {
                if (data.code == 200) {
                    swal("提交成功", "", "success");
                    window.location.href = '/index.html#/paymentOrder'
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }
                else {
                    if(data.msg.indexOf("不允许重复操作")>0){
                        swal("不能重复提交", "", "warning");
                    }else{
                        swal(data.msg, "", "warning");
                    }

                }
            });
        }
    }
}]);



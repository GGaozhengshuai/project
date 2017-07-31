var purchaseApp = angular.module('purchaseApp', ['pageDirectives', 'formDirectives']);
purchaseApp.service('purchaseServices', function ($http) {
  var service = {
    listPurchase: function (param) {//采购申请
      return $http.post('/purchase/list', param, {cache: false});
    },
    viewPurchase: function (param) {
      return $http.post('/purchase/read', param, {cache: true});
    },
    listPurOrder: function (param) {//采购订单
      return $http.post('/poheader/list', param, {cache: false});
    },
    viewPurOrder: function (param) {
      return $http.post('/poheader/read', param, {cache: true});
    },
    listPurRebate: function (param) {//采购返点
      return $http.post('/purchasefd/list', param, {cache: false});
    },
    viewPurRebate: function (param) {
      return $http.post('/purchasefd/read', param, {cache: true});
    },
    listPurMaintain: function (param) {//维修采购
      return $http.post('/wxpo/list', param, {cache: false});
    },
    viewPurMaintain: function (param) {
      return $http.post('/wxpo/read', param, {cache: true});
    },
    listPurPact: function (param) {//维修采购
      return $http.post('/kjpo/list', param, {cache: false});
    },
    viewPurPact: function (param) {
      return $http.post('/kjpo/read', param, {cache: true});
    },
    listPurStore: function (param) {//库存调整
      return $http.post('/stock/list', param, {cache: false});
    },
    viewPurStore: function (param) {
      return $http.post('/stock/read', param, {cache: true});
    },
    claimPur: function (param) {//采购申请认领
      return $http.post('/purchase/claim', param, {cache: true});
    },
    disclaimPur: function (param) {//取消认领
      return $http.post('/purchase/disclaim', param, {cache: true});
    },
    tqxdPur: function (param) {//提前下单
      return $http.post('/purchase/tqxd', param, {cache: true});
    },
    qxxdPur: function (param) {//取消下单
      return $http.post('/purchase/qxxd', param, {cache: true});
    },
    enumPurchase: function (param) { // 枚举接口
      return $http.post('/purchase/enumlist', param, {cache: true});
    },
    enumpur: function (param) { // 枚举接口
      return $http.post('/stock/enum', param, {cache: true});
    },
    enumCGKJHT: function (param) { // 采购框架合同
      return $http.post('/kjpo/enumlist', param, {cache: true});
    },
    enumcgdd: function (param) {
      return $http.post('/poheader/enumlist', param, {cache: true});
    },
    poheaderEnum: function (param) {
      return $http.post('/poheader/enum', param, {cache: true});
    },
    cgData: function (param) {//采购查应付
      return $http.post('/credit/selectpo', param, {cache: false});
    },
    purprocess: function (param) {
      return $http.post('/poheader/purprocess', param, {cache: false});
    },
    getprocesslog: function (param) {
      return $http.post('/poheader/getprocesslog', param, {cache: false});
    },
    getfdprocesslog: function (param) {
      return $http.post('/purchasefd/getprocesslog', param, {cache: false});
    },
    getStockProcesslog: function (param) {
      return $http.post('/stock/getprocesslog', param, {cache: false});
    },
    getkjpoProcesslog: function (param) {
      return $http.post('/kjpo/getprocesslog', param, {cache: false});
    },
    getwxpoProcesslog: function (param) {
      return $http.post('/wxpo/getprocesslog', param, {cache: false});
    },
    findDocs: function (param) {
      return $http.post('/docmanage/finddocs', param, {cache: false});
    },
    refrecords : function(param){
      return $http.post('/purchase/refrecords',param,{cache:false}); ////  采购申请添加引用记录
    },
    getskbysalesorderidorsupplierorderid :function(param){
      return $http.post('/credit/getskbysalesorderidorsupplierorderid',param,{cache:true});
    },
      selectconbyzzpo :function(param){//根据供应商订单号查询合同
      return $http.post('/poheader/selectconbyzzpo',param,{cache:true});
    },
      selectconbyzzsdpo :function(param){//根据销售订单号查询合同
          return $http.post('/poheader/selectconbyzzsdpo',param,{cache:true});
      }
  };
  return service;
});

purchaseApp.controller('purchaseCtrl', ['$scope', '$rootScope', '$timeout', 'purchaseServices', 'uiGridConstants', function ($scope, $rootScope, $timeout, purchase, uiGridConstants) {
  var pageData, limitData, vm = $scope;
  vm.table = false;
  vm.loadData = true;
  vm.tableApi = null;
  vm.tableOptions = {
    multiSelect: true,
    enableRowSelection: true,
    enableSelectAll: true,
    resizable: false,
    selectionRowHeaderWidth: 42,
    onRegisterApi: function (api) {
      vm.tableApi = api;
    }
  }
  vm.tableHeader = [
    {name: 'BANFN', displayName: "采购申请号",pinnedLeft: true, width: 100, cellTooltip: true, sort: {direction: 'desc'}, cellTemplate: '<div class="ui-grid-cell-contents link"><a target="_blank" href="index.html#/purchaseView/{{row.entity.BANFN}}">{{row.entity.BANFN}}</a></div>',enableSorting: true},
    {name: 'EKGRP', displayName: "采购组", width: 90, cellTooltip: true},
    {name: 'ZZQY', displayName: "供应商名称", width: 130, cellTooltip: true},
    {name: 'ZZPO', displayName: "供应商订单号", width: 130, cellTooltip: true},
    {name: 'BSART', displayName: "凭证类型", width: 120, cellTooltip: true},
    {name: 'ZZEJ', displayName: "二级经销商名称", width: 160, cellTooltip: true},
    {name: 'ZZXM', displayName: "项目名称", width: 180, cellTooltip: true},
    {name: 'ZZZJY', displayName: "进货总金额", width: 110, cellTooltip: true, cellFilter: 'currency: "￥"'},
    {name: 'ZZSQR', displayName: "销售员", width: 90, cellTooltip: true},
    {name: 'ZZTQXD', displayName: "是否提前下单", width: 120, cellTooltip: true, cellFilter: 'tqxd'},
    {name: 'ERNAM', displayName: "申请人", width: 90, cellTooltip: true},
    {name: 'ZZSPZT', displayName: "是否审批完成", width: 120, cellTooltip: true, cellFilter: 'spwc'},
    {name: 'ZSUBMIT_DATE', displayName: "提交日期", width: 90, cellTooltip: true},
    {name: 'hasprint', displayName: "是否打印", width: 90, cellTooltip: true},
    {
      name: 'actions',
      displayName: "操作",
      enableSorting: false,
      pinnedRight: true,
      width: 90,
      cellTemplate: 'purchaseAction.html'
    }
  ];

  vm.tableSelectRow = function() {
    if(vm.tableApi && vm.loadData) return;
    $timeout(function() {
      var _select = vm.tableApi.selection;
      // 监听单选
      _select.on.rowSelectionChanged(vm, function(row){
        var id = row.entity.BANFN, action = row.isSelected ? 'add' : 'remove';
        updateSelected(action, id);
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
      pageData = $scope.paginationConf.currentPage;
      limitData = $scope.paginationConf.itemsPerPage;
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        BANFN: $scope.BANFN,
        ZZPO: $scope.ZZPO,
        ZZQY: $scope.ZZQY,
        ZZSQR: $scope.ZZSQR,
        BSART: $scope.BSART,
        ZZSPZT: $scope.ZZSPZT,
        ZZXM: $scope.ZZXM,
        ZZEJ: $scope.ZZEJ,
        ZSUBMIT_DATE: $scope.ZSUBMIT_DATE
      };
      var purchasePromise = purchase.listPurchase(param);
      purchasePromise.success(function (data) {
        var curUser = person.user;
        var list = data.rst.data.items;
        list.forEach(function (v, k) {
          _.forEach(v, function (val, key) {
            switch (key) {
              case 'EKGRP': // 供应商名称
                v[key] = vm.enumObj[val];
                break;
              case 'BSART': // 凭证类型
                v[key] = vm.enumBSART[val];
                break;
              case 'hasprint': // 是否打印
                v[key] = val ? '是' : '否';
                break;
            }
          });
          v.rlflag = v.ZFLAG_RL == 'X'
          v.userflag = v.ZSQRID == curUser.login;
        })
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
      })
      $scope.paginationConf.pagePromise = purchasePromise;
    }
  };
  // var person = $cookieStore.get("persion");
  var person = $rootScope.loginPerson;
  $scope.userName = person.user.login.toUpperCase();
  var enumData = purchase.enumPurchase();
  enumData.success(function (data) {
    $scope.enumObj = data.rst.enum.EKGRP;
    $scope.enumBSART = data.rst.enum.BSART;
  }).error(function (error) {
    alert(error);
  });
  //认领
  $scope.claim = function (id) {
    swal({
      title: "您要认领吗?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定认领",
      cancelButtonText: '关闭',
      closeOnConfirm: true,
      allowOutsideClick: true
    }, function () {
      var param = {};
      param.ids = [];
      param.ids.push(id);
      var claimPur = purchase.claimPur(param);
      claimPur.success(function (data) {
        if (data.code == 200) {
          // $scope.search();
          // swal("认领成功", "", "success");
          swal({
            title: '认领成功',
            text: '',
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#8CD4F5",
            confirmButtonText: "确定",
            closeOnConfirm: true
          }, function () {
            var param = {
              page: pageData,
              limit: limitData,
              BANFN: $scope.BANFN,
              ZZPO: $scope.ZZPO,
              ZZQY: $scope.ZZQY,
              BSART: $scope.BSART,
              ZZSQR: $scope.ZZSQR,
              ZZSPZT: $scope.ZZSPZT,
              ZZXM: $scope.ZZXM,
              ZZEJ: $scope.ZZEJ,
              ZSUBMIT_DATE: $scope.ZSUBMIT_DATE
            };
            var purchasePromise = purchase.listPurchase(param);
            purchasePromise.success(function (data) {
              $scope.dataList = data.rst.data.items;
              var curUser = person.user;
              var list = data.rst.data.items;
              list.forEach(function (v, k) {
                _.forEach(v, function (val, key) {
                  switch (key) {
                    case 'EKGRP': // 供应商名称
                      v[key] = vm.enumObj[val];
                      break;
                    case 'BSART': // 凭证类型
                      v[key] = vm.enumBSART[val];
                      break;
                    case 'hasprint': // 是否打印
                      v[key] = val ? '是' : '否';
                      break;
                  }
                });
                v.rlflag = v.ZFLAG_RL == 'X'
                v.userflag = v.ZSQRID == curUser.login;
              })
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
            })
          });


        } else {
          swal(data.msg, '', 'error');
        }
      });
    });
  }
  //取消认领
  $scope.cancleClaim = function (id) {
    swal({
      title: "您要取消认领吗?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定取消",
      cancelButtonText: '关闭',
      closeOnConfirm: true,
      allowOutsideClick: true
    }, function () {
      var param = {};
      param.ids = [];
      param.ids.push(id);
      var disclaimPur = purchase.disclaimPur(param);
      disclaimPur.success(function (data) {
        if (data.code == 200) {
          $scope.search();
          swal("取消认领成功", "", "success");
        } else {
          swal(data.msg, '', 'error');
        }
      });
    });
  }
  //提前下单
  var tqxd_id;
  $scope.tqxdPur = function (id) {
    tqxd_id = id;
    $("#tqxdBox").dialog({
      autoOpen: false,
      width: 400,
      modal: true
    });
    $("#tqxdBox").dialog("open");
  }
  $scope.tqxdYes = function () {
    $("#tqxdBox").dialog("destroy");
    $(".ui-dialog").remove();
    $("#cusBox").dialog({
      autoOpen: false,
      width: 650,
      modal: true
    });
    $('textarea').val('');
    $("#cusBox").dialog("open");

    $scope.tqxdSave = function (COMMENT) {
      var param = {};
      param.ids = [];
      param.ids.push(tqxd_id);
      param.comment = COMMENT;
      param.tqxd = '1';
      var tqxdPur = purchase.tqxdPur(param);
      tqxdPur.success(function (data) {
        if (data.code == 200) {
          $scope.COMMENT = '';
          $("#cusBox").dialog("destroy");
          $(".ui-dialog").remove();
          $scope.search();
          swal("提交成功", "", "success");

        } else {
          swal(data.msg, '', 'error');
        }
      });
    }
  }
  $scope.tqxdNo = function () {
    var param = {};
    param.ids = [];
    param.ids.push(tqxd_id);
    var tqxdPur = purchase.tqxdPur(param);
    tqxdPur.success(function (data) {
      if (data.code == 200) {
        $("#tqxdBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.search();
        swal("提交成功", "", "success");

      } else {
        swal(data.msg, '', 'error');
      }
    });
  }
  /*$scope.returnBtn = function(){
   $( "#tqxdBox" ).dialog("destroy");
   $(".ui-dialog").remove();
   }*/
  //取消提前下单
  $scope.qxxdPur = function (id) {
    swal({
      title: "您要取消提前下单吗?",
      text: "取消下单后会终止审批流",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定取消",
      cancelButtonText: '关闭',
      closeOnConfirm: true,
      allowOutsideClick: true
    }, function () {
      var param = {};
      param.ids = [];
      param.ids.push(id);
      var qxxdPur = purchase.qxxdPur(param);
      qxxdPur.success(function (data) {
        if (data.code == 200) {
          $scope.search();
          swal("取消下单成功", "", "success");
        } else {
          swal(data.msg, '', 'error');
        }
      });
    });
  };
  $scope.cArr = [];
  $scope.cArrcode = [];
  var updateSelected = function (action, id) {
    if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
      $scope.cArr.push(id);
    }
    if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
      var idx = $scope.cArr.indexOf(id);
      $scope.cArr.splice(idx, 1);
    }
  };
  $scope.updateSelection = function ($event, id) {
    var checkbox = $event.target;
    var action = (checkbox.checked ? 'add' : 'remove');
    updateSelected(action, id);
  };
  // 清空
  $scope.emptyFn = function () {
    $scope.checkAll = false;
    $scope.cArr = [];
  };
  $scope.allCheck = function (check) {

    if (check) {
      for (var i = 0; i < $scope.dataList.length; i++) {
        $scope.cArr[i] = $scope.dataList[i].BANFN;
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
      $(e.target).attr('href', '/print/printest.html?uri=/purchase/printview&BANFN=' + $scope.cArr.join(';;'));
    }
    // &_id={{list._id}}&code={{list.code}}


  };
}]);

purchaseApp.controller('purchaseViewCtrl', ['$scope', '$stateParams', 'purchaseServices', function ($scope, $stateParams, purchase) {
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        BANFN: $stateParams.id
      };
      var viewPur = purchase.viewPurchase(param);
      var enumData = purchase.enumPurchase(param);
      $scope.paginationConf.pagePromise = viewPur;
      viewPur.success(function (data) {
        if (data.code == 200) {
          $scope.purchaseList = data.rst.data.model;//客户基本信息

        }
      }).error(function (error) {
        alert(error);
      });
      enumData.success(function (data) {
        $scope.enumObj = data.rst.enum;
      }).error(function (error) {
        alert(error);
      });
    }
  };
  // 下载清单
  $scope.downLoad = function () {
    window.open('/purchase/exportexcel?BANFN=' + $scope.purchaseList.BANFN);
  }
  $scope.claim = function () {
    if ($scope.purchaseList.ZSQRID) {
      swal('采购申请已被认领', '', 'warning');
      return false;
    } else {
      swal({
        title: "您要认领吗?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定认领",
        cancelButtonText: '关闭',
        closeOnConfirm: true
      }, function () {
        var param = {};
        param.ids = [];
        param.ids.push($scope.purchaseList.BANFN);
        var claimPur = purchase.claimPur(param);
        claimPur.success(function (data) {
          if (data.code == 200) {
            swal("认领成功", "", "success");
            location.reload();
          } else {
            alert(data.msg);
          }
        });
      });
    }
  }
  $scope.processlog = null;
  $scope.htTab = function (BANFN, type) {
    if ($scope.processlog != null && $scope.processlog.length > 0) {
      $scope.ht.activeTab = type;
    } else if(type == 2){
      var purprocess = purchase.purprocess({BANFN: BANFN});
      purprocess.success(function (data) {
        if (data.rst.length != 0) {
          $scope.processlog = data.rst;
          $scope.ht.activeTab = type;
        } else {
          swal('该采购申请没有审批信息', '', 'warning');
        }
      });
    }
    if(type == 3){
      var refrecords = purchase.refrecords({BANFN: BANFN});
      refrecords.success(function(data){
        if(data.code == 200){
          $scope.quoteList = data.rst.data.ITEM_DATA;
          $scope.ht.activeTab = type;
        }
      })
    }
  }

}]);

purchaseApp.controller('purOrderCtrl', ['$scope', '$state', 'purchaseServices', function ($scope, $state, purchase) {
  var fdenum = purchase.enumcgdd();
  fdenum.success(function (data) {
    $scope.enumobj = data.rst.enum;
  });
  var findenum = purchase.poheaderEnum();
  findenum.success(function (data) {
    $scope.orderenum = data.rst.data.enum;
  });
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        NAME: $scope.NAME,
        EBELN: $scope.EBELN,
        ZZPO: $scope.ZZPO,
        ERNAM: $scope.ERNAM,
        ZWFJE: $scope.ZWFJE,
        BSART: $scope.BSART,
        EKORG: $scope.EKORG
      };
      var purchasePromise = purchase.listPurOrder(param);
      $scope.paginationConf.pagePromise = purchasePromise;
      $scope.emptyFn && $scope.emptyFn();
    }
  };
// 清空
  $scope.emptyFn = function () {
    $scope.all = false;
    cArr = [], eArr = [], nArr = [];
  };


  cArr = [], eArr = [], nArr = [];
  $scope.checkSelect = function (idx, LIFNR, EBELN, name) {
    var parent = $("#occTable").find(".list").eq(idx), obj = {};
    var check = parent.find("input:eq(0)");
    if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
      check.attr("checked", 'checked');
      cArr.push(LIFNR);
      eArr.push(EBELN);
      nArr.push(name);
    } else {
      check.removeAttr("checked");
      for (var i = 0; i < cArr.length; i++) {
        if (cArr[i] == LIFNR && eArr[i] == EBELN) {
          cArr.splice(i, 1);
          eArr.splice(i, 1);
          nArr.splice(i, 1);
        }
      }
    }

  }
  $scope.allCheck = function (data) {
    cArr.splice(0, cArr.length);
    var check = $("#occTable").find("#allCheck");
    if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
      check.attr("checked", 'checked');
      var count = 0;
      for(var i=0;i<data.length;i++){
        if (data[i].ZWFJE <= 0) {
          swal("采购订单" + data[i].EBELN + "的应付金额<=0. 应付未添加或已经审核完成！", "", "warning");
          check.removeAttr("checked");
          cArr.splice(0, cArr.length);
          eArr.splice(0, eArr.length);
          nArr.splice(0, nArr.length);
          $scope.all = false;
          return false;
        } else {
          cArr.push(data[i].LIFNR);
          eArr.push(data[i].EBELN);
          nArr.push(data[i].NAME1);
          count++;
        }
      }
    } else {
      check.removeAttr("checked");
      cArr.splice(0, cArr.length);
      eArr.splice(0, eArr.length);
      nArr.splice(0, nArr.length);
    }
  }
  $scope.paymentBox = function () {
    if (cArr.length == 0) {
      swal("请选择数据！", "", "warning");
      return false;
    }
    for (var i = 0; i < nArr.length; i++) {
      if (i != 0 && nArr[i] !== nArr[0]) {
        swal("供应商名称必须一致！", "", "warning");
        return false;
      }
    }
    /* $state.go('paymentOrderAdd',{orderLifnr:cArr,orderEBELN:eArr,orderName:nArr});*/
    if (cArr && eArr) {
      var par = {LIFNR: cArr[0], EBELN: eArr, page: 1, limit: 5};
      console.log(par)
      var purchasePromise = purchase.cgData(par);
      purchasePromise.success(function (data) {
        if (data.code == 200) {
          if (data.rst.data.fkmsg) {
            swal(
              {
                title: "",
                text: data.msg,
                type: "warning",
              })
            return false;
          } else if (data.rst.data.items.length == 0) {
            swal(
              {
                title: "",
                text: data.rst.data.msg,
                type: "warning",
              })
            return false;
          } else {
            $state.go('paymentOrderAdd', {orderName: nArr, orderEBELN: eArr, orderLifnr: cArr});
          }
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
  }
}]);

purchaseApp.controller('purOrderViewCtrl', ['$scope', '$stateParams','$state', 'purchaseServices', function ($scope, $stateParams,$state, purchase) {
  var ZZSDPO;   //获取销售订单号
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        EBELN: $stateParams.id
      };
      var viewPur = purchase.viewPurOrder(param);
      //var enumData = purchase.enumPurchase(param);
      $scope.paginationConf.pagePromise = viewPur;
      $scope.enumMWSKZ = $scope.enumMATKL = $scope.enumObj = {};
      viewPur.success(function (data) {
        if (data.code == 200) {
          $scope.purchaseList = data.rst.data.model;//客户基本信息
          ZZSDPO = data.rst.data.model.ZZSDPO;
          $scope.dataList = data.rst.data.items;
          $scope.enumObj = data.rst.data.enum;
          if ($scope.purchaseList.ZZTQXD == '0') {
            $scope.purchaseList.ZZTQXD = '正常下单';
          } else if ($scope.purchaseList.ZZTQXD == '1') {
            $scope.purchaseList.ZZTQXD = '提前下单';
          } else {
            $scope.purchaseList.ZZTQXD = '未认领';
          }
        }
      }).error(function (error) {
        alert(error);
      });

      /*enumData.success(function(data) {
       $scope.enumObj =  data.rst.enum;
       }).error(function(error){
       alert(error);
       });*/

      $scope.arrparseJson = function (data, key) {
        var obj = {}, enumArr = data[key];
        for (var i in enumArr) {
          obj[enumArr[i].code] = enumArr[i].name;
        }
        return obj;
      }
    }
  };
  var idx = 1;
  $scope.show = function () {
    if (idx == 1) {
      $scope.emerge = true;
      idx = 2;
    } else {
      $scope.emerge = false;
      idx = 1;
    }

  }
  $scope.viewpurchase = function () {
    $("#chsBox").dialog({
      autoOpen: false,
      width: 400,
      modal: true,
      buttons: [{
        text: "关闭",
        class: "gray_bg",
        click: function () {
          $(this).dialog("close");
          $(".layer").hide();
        }
      }]
    });
    $("#chsBox").dialog("open");

    var param = {page: 1, limit: 9999, EBELN: $stateParams.id};
    var viewPur = purchase.viewPurOrder(param);
    viewPur.success(function (data) {
      if (data.code == 200) {
        $scope.cgList = [];
        var rep = {};
        data.rst.data.items.forEach(function (item) {    //去重
          if (item.BANFN != "") {
            if (!rep[item.BANFN]) {
              rep[item.BANFN] = true;
              return $scope.cgList.push(item);
            }
          }
        });
      }
    })
  }

  // 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null
  vm.docs = null;

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = purchase.getprocesslog({id: vm.purchaseList.EBELN, type: 'ZD02',gettype:'group'}); // 直接取值数据中 申请人（proposer）
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
    //if (type == 3 && (vm.docs == null || vm.docs.length == 0)) {
    //  search();
    //}
  };

  $scope.contractdetails = function(e,ZZPO,ZZSDPO){
      var param = { ZZPO:ZZPO};
      var purList = purchase.selectconbyzzpo(param);
      purList.success(function (data) {
          if(data.code==200){
              if(data.rst.items.length){
                $scope.purList=data.rst.items;
              }else {
                var par={ZZSDPO:ZZSDPO};
                  var pur2List = purchase.selectconbyzzsdpo(par);
                  pur2List.success(function (data) {
                      if(data.code==200){
                          $scope.purList=data.rst.items;
                      }else {
                          swal(data.msg,'','error');
                      }
                  })
              }
          }else {
              swal(data.msg,'','error');
          }
      })
      $("#purListBox").dialog({
          autoOpen: false,
          width: 400,
          modal: true,
          buttons: [{
              text: "关闭",
              class: "gray_bg",
              click: function () {
                  $(this).dialog("close");
                  $(".layer").hide();
              }
          }]
      });
      $("#purListBox").dialog("open");
  }
}]);

purchaseApp.controller('purRebateCtrl', ['$scope', 'purchaseServices', function ($scope, purchase) {
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        ZMZSBH: $scope.ZMZSBH,
        ZMFDLX: $scope.ZMFDLX,
        STARTDATE: $scope.STARTDATE,
        ENDDATE: $scope.ENDDATE,
        ZMDL: $scope.ZMDL,
        ZMFDXH : $scope.ZMFDXH,
        ZMZT:$scope.ZMZT
      };
      var purchasePromise = purchase.listPurRebate(param);
      $scope.paginationConf.pagePromise = purchasePromise;
    }
  };
}]);

purchaseApp.controller('purRebateViewCtrl', ['$scope', '$stateParams', 'purchaseServices', function ($scope, $stateParams, purchase) {
  var param = {ZMFDXH: $stateParams.id};
  var viewPur = purchase.viewPurRebate(param);
  viewPur.success(function (data) {
    if (data.code == 200) {
      $scope.purchaseList = data.rst.data.fdinfo;//客户基本信息
      if ($scope.purchaseList.ZOPERATION == 'I') {
        $scope.ZOPERATION = '新增';
      } else if ($scope.purchaseList.ZOPERATION == 'U') {
        $scope.ZOPERATION = '修改';
      } else if ($scope.purchaseList.ZOPERATION == 'D') {
        $scope.ZOPERATION = '作废';
      }
    }
  }).error(function (error) {
    alert(error);
  });
  // 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = purchase.getfdprocesslog({type: 'ZD04', id: vm.purchaseList.ZMFDXH}); // 直接取值数据中 申请人（proposer）
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

purchaseApp.controller('purMaintainCtrl', ['$scope', 'purchaseServices', function ($scope, purchase) {
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        NAME1: $scope.NAME1,
        EBELN: $scope.EBELN,
        ZZPO: $scope.ZZPO,
        ERNAM: $scope.ERNAM
      };
      var purchasePromise = purchase.listPurMaintain(param);
      purchasePromise.success(function (data) {
        if (data.code == 200) {
          $scope.dataList = data.rst.data.items;
          for (var x in $scope.dataList) {
            if ($scope.dataList[x].BSART) {
              var type = getField(data.rst.data.enum, 'code', $scope.dataList[x].BSART);
              $scope.BSART = type.name;
            }
            ;
            if ($scope.dataList[x].EKORG) {
              var type = getField(data.rst.data.enum, 'code', $scope.dataList[x].EKORG);
              $scope.EKORG = type.name;
            }
            if ($scope.dataList[x].EKGRP) {
              var type = getField(data.rst.data.enum, 'code', $scope.dataList[x].EKGRP);
              $scope.EKGRP = type.name;
            }
          }
        }
      }).error(function (error) {
        alert(error);
      });
      $scope.paginationConf.pagePromise = purchasePromise;
    }
  };
}]);

purchaseApp.controller('purMaintainViewCtrl', ['$scope', '$stateParams', 'purchaseServices', function ($scope, $stateParams, purchase) {

  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        EBELN: $stateParams.id
      };
      var viewPur = purchase.viewPurMaintain(param);
      $scope.paginationConf.pagePromise = viewPur;
      viewPur.success(function (data) {
        if (data.code == 200) {
          $scope.dataList = data.rst.data.items;
          $scope.purchaseList = data.rst.data.model;//客户基本信息
          $scope.enumobj = data.rst.data.enum;

          if ($scope.purchaseList.BSART) {
            var type = getField(data.rst.data.enum, 'code', $scope.purchaseList.BSART);
            $scope.BSART = type.name;
          }
          ;
          if ($scope.purchaseList.BUKRS) {
            var type = getField(data.rst.data.enum, 'code', $scope.purchaseList.BUKRS);
            $scope.BUKRS = type.name;
          }
          if ($scope.purchaseList.EKORG) {
            var type = getField(data.rst.data.enum, 'code', $scope.purchaseList.EKORG);
            $scope.EKORG = type.name;
          }
          if ($scope.purchaseList.EKGRP) {
            var type = getField(data.rst.data.enum, 'code', $scope.purchaseList.EKGRP);
            $scope.EKGRP = type.name;
          }
          if ($scope.purchaseList.WAERS) {
            var type = getField(data.rst.data.enum, 'code', $scope.purchaseList.WAERS);
            $scope.WAERS = type.name;
          }
          if ($scope.purchaseList.ZZCP) {
            var type = getField(data.rst.data.enum, 'code', $scope.purchaseList.ZZCP);
            $scope.ZZCP = type.name;
          }
          for (var x in $scope.dataList) {
            if ($scope.dataList[x].ERFME) {
              var type = getField(data.rst.data.enum, 'code', $scope.dataList[x].ERFME);
              $scope.dataList[x].ERFME = type.name;
            }
          }
        }
      }).error(function (error) {
        alert(error);
      });
    }
  };
  var idx = 1;
  $scope.show = function () {
    if (idx == 1) {
      $scope.emerge = true;
      idx = 2;
    } else {
      $scope.emerge = false;
      idx = 1;
    }

  }
  $scope.viewPurchase = function () {
    $("#chsBox").dialog({
      autoOpen: false,
      width: 400,
      modal: true,
      buttons: [{
        text: "关闭",
        class: "gray_bg",
        click: function () {
          $(this).dialog("close");
          $(".layer").hide();
        }
      }]
    });
    $("#chsBox").dialog("open");

    var param = {page: 1, limit: 9999, EBELN: $stateParams.id};
    var viewPur = purchase.viewPurMaintain(param);
    viewPur.success(function (data) {
      if (data.code == 200) {
        $scope.cgList = [];
        var rep = {};
        data.rst.data.items.forEach(function (item) {    //去重
          if (item.BANFN != "") {
            if (!rep[item.BANFN]) {
              rep[item.BANFN] = true;
              return $scope.cgList.push(item);
            }
          }
        });
      }
    })
  }
  // 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = purchase.getwxpoProcesslog({id: vm.purchaseList.EBELN, type: 'ZD12'}); // 直接取值数据中 申请人（proposer）
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
//采购框架合同
purchaseApp.controller('purPactCtrl', ['$scope', 'purchaseServices', function ($scope, purchase) {
  var enumList = purchase.enumCGKJHT();
  enumList.success(function (data) {
    if (data.code == 200) {
      $scope.enumObj = data.rst.enum;
    }
  });
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        NAME1: $scope.NAME1,
        EBELN: $scope.EBELN
      };
      var purchasePromise = purchase.listPurPact(param);
      $scope.paginationConf.pagePromise = purchasePromise;
      purchasePromise.success(function (data) {
        if (data.code == 200) {
          $scope.eunmObj = data.rst.data.enum;
        }
      });
    }
  };
}]);

purchaseApp.controller('purPactViewCtrl', ['$scope', '$stateParams', 'purchaseServices', function ($scope, $stateParams, purchase) {
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        EBELN: $stateParams.id
      };
      var viewPur = purchase.viewPurPact(param);
      $scope.paginationConf.pagePromise = viewPur;
      viewPur.success(function (data) {
        if (data.code == 200) {
          $scope.purchaseList = data.rst.data.model;//客户基本信息
          $scope.dataList = data.rst.data.items;
          $scope.enumObj = data.rst.data.enum;
        }
      }).error(function (error) {
        alert(error);
      });
    }
  };
// 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = purchase.getkjpoProcesslog({id: vm.purchaseList.EBELN, type: 'ZD03'}); // 直接取值数据中 申请人（proposer）
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

//库存调整
purchaseApp.controller('purStoreCtrl', ['$scope', 'purchaseServices', function ($scope, purchase) {
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      var param = {
        page: $scope.paginationConf.currentPage,
        limit: $scope.paginationConf.itemsPerPage,
        SQDH: $scope.SQDH,
        ZTYPE: $scope.ZTYPE,
        ERNAM: $scope.ERNAM,
        CDEPT: $scope.CDEPT,
        CDATE: $scope.CDATE
      };
      var purchasePromise = purchase.listPurStore(param);
      purchasePromise.success(function (data) {
        $scope.dataList = data.rst.data.items;
        var enumData = purchase.enumpur();
        enumData.success(function (data) {
          $scope.enumObj = data.rst.data.enum;
        });
      });
      $scope.paginationConf.pagePromise = purchasePromise;
    }
  };
  $scope.businessType = {
    'A1':'跨仓库调拨',
    'A2':'仓库内转移',
    'A3':'仓库产品报废',
    'A4':'产品组装拆卸',
    'A5':'产品拆箱',
    'A6':'销售退货库存转移',
    'A7':'内部部门领用申请',
    'A8':'内部领用发货到资产时'
  }
}]);

purchaseApp.controller('purStoreViewCtrl', ['$scope', '$stateParams', 'purchaseServices', function ($scope, $stateParams, purchase) {
  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPage: 0,
    pagesLength: 10,
    perPageOptions: [5, 10, 20, 30, 40, 50],
    pagePromise: {},
    onChange: function () {
      if ($stateParams.type == 'A4' || $stateParams.type == 'A5') {
        var param = {page: 1, limit: 9999, SQDH: $stateParams.id};
      } else {
        var param = {
          page: $scope.paginationConf.currentPage,
          limit: $scope.paginationConf.itemsPerPage,
          SQDH: $stateParams.id
        };
      }
      var viewPur = purchase.viewPurStore(param);
      $scope.paginationConf.pagePromise = viewPur;
      viewPur.success(function (data) {
        if (data.code == 200) {
          $scope.purchaseList = data.rst.data.model;//客户基本信息
          if (data.rst.data.model.ZTYPE == 'A4') {//产品组装拆卸
            $scope.storeType2 = true;
          } else if (data.rst.data.model.ZTYPE == 'A5') {//产品拆箱
            $scope.storeType3 = true;
          } else {
            $scope.storeType = true;
          }
          if (data.rst.data.model.ZTYPE == 'A1') {
            $scope.transportation = true;
          } else {
            $scope.transportation = false;
          }
          var enumData = purchase.enumpur();

          enumData.success(function (data) {
            $scope.enumObj = data.rst.data.enum;
            if ($scope.purchaseList.LGORT) {
              var type = getField(data.rst.data.enum.LGORT, 'code', $scope.purchaseList.LGORT);
              $scope.LGORT = type.name;
            }
            if ($scope.purchaseList.ZSTATUS) {
              var type = getField(data.rst.data.enum.ZSTATUS, 'code', $scope.purchaseList.ZSTATUS);
              $scope.ZSTATUS = type.name;
            }
            if ($scope.purchaseList.CDEPT) {
              var type = getField(data.rst.data.enum.CDEPT, 'code', $scope.purchaseList.CDEPT);
              $scope.CDEPT = type.name;
            }

            for (var x in $scope.dataList.before) {
              if ($scope.dataList.before[x].MEINS) {
                var type = getField(data.rst.data.enum.MEINS, 'code', $scope.dataList.before[x].MEINS);
                $scope.ZUMEINS = type.name;
              }
            }
          }).error(function (error) {
            alert(error);
          });
          if ($scope.purchaseList.YSFS == 'HK') {
            $scope.purchaseList.YSFS = '空运';
          } else if ($scope.purchaseList.YSFS == 'QY') {
            $scope.purchaseList.YSFS = '汽运';
          } else if ($scope.purchaseList.YSFS == 'KD') {
            $scope.purchaseList.YSFS = '快递';
          } else if ($scope.purchaseList.YSFS == 'NB') {
            $scope.purchaseList.YSFS = '仓库内移动';
          }
          $scope.businessType = {
            'A1':'跨仓库调拨',
            'A2':'仓库内转移',
            'A3':'仓库产品报废',
            'A4':'产品组装拆卸',
            'A5':'产品拆箱',
            'A6':'销售退货库存转移',
            'A7':'内部部门领用申请',
            'A8':'内部领用发货到资产时'
          }

        }
      }).error(function (error) {
        alert(error);
      });

    }
  };
  // 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = purchase.getStockProcesslog({type: 'ZD07', id: vm.purchaseList.SQDH}); // 直接取值数据中 申请人（proposer）
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

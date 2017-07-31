/**
 * Created by LP on 2016/5/27.
 * 引用方法：引用html页面
 *     <div class="viewTable ng-scope ng-hide" ng-show="ht.activeTab == 3" ng-include="'template/common/creditTab.html'" ng-controller="creditCtrl"></div>
 *     引用页面controller在获取到基本信息后添加
 *     var param = {name:'', id:''}; //根据自己页面返回数据定，需要的参数是{name:'', id:''}客户名称和客户编号
 $scope.$broadcast('transfer.type', param);
 */
var creditApp = angular.module('creditApp', ['pageDirectives','formDirectives','ui.autocomplete']);

creditApp.service('creditService', function ($http) {
    var service = {
        credit: function (param) {    //客户信用
            return $http.post('/customer/selectcus', param, {cache: false});
        },
        ysList: function (param) {    //应收列表
            return $http.post('/receivablesplan/selectar', param, {cache: false});
        },
        wsyfdList: function (param) {     // 未使用返点记录
            return $http.post('/salesbonus/list', param, {cache: false});
        },
        selectcustdn : function (param) {     // 客户信用交货单占用查询接口
            return $http.post('customer/selectcustdn', param, {cache: false});
        },
        selectcusfkjl : function (param) {     // 付款记录
          return $http.post('customer/selectcusfkjl', param, {cache: false});
        },
	    debitlist : function (param) {     // 收票信息
          return $http.post('debitbill/debitlist', param, {cache: false});
        },

        // 客户信用查询
        listCredit: function (param) {
            return $http.post('/cuscredit/list', param, {cache: false});
        },
        // 检验客户是否已有过信用记录
        checkcuscredit: function (param) {
            return $http.post('/cuscredit/checkcuscredit', param, {cache: false});
        },
        // 检验客户是否已维护过信用信息
        checkcreditmoney: function (param) {
            return $http.post('/cuscredit/checkcreditmoney', param, {cache: false});
        },
        // 客户信用查看
        viewCredit: function (param) {
            return $http.post('/cuscredit/view', param, {cache: true});
        },
        // 客户信用申请保存
        addCredit: function (param) {
            return $http.post('/cuscredit/save', param, {cache: false});
        },
        // 客户信用申请提交
        applyAdd: function (param) {
            return $http.post('/cuscredit/createprocess', param, {cache: false});
        },
        // 客户信用申请更新
        updateCredit: function (param) {
            return $http.post('/cuscredit/update', param, {cache: false});
        },

        //客户信用额度维护查询
        creditmoneyList: function (param) {
            return $http.post('/cuscredit/creditmoneylist', param, {cache: false});
        },
        //客户信用额度维护导出
        exportexcel: function(param) {  //导出现状
            return $http.post('/cuscredit/exportexcel',param ,{cache:false});
        },
        //客户信用额度维护新增
        creditmoneyAdd: function (param) {
            return $http.post('/cuscredit/creditmoneysave', param, {cache: false});
        },
	    //客户信用额度维护删除
	    changestatus: function (param) {
		    return $http.post('/cuscredit/changestatus', param, {cache: false});
	    },
        //客户信用额度维护
        creditmoneUpdate: function (param) {
            return $http.post('/cuscredit/creditmoneyupdate', param, {cache: false});
        },
        //客户信用额度维护查看
        creditmoneyView: function (param) {
            return $http.post('/cuscredit/creditmoneyview', param, {cache: false});
        },
        // 客户信用维护保存 - 客户信用（4个表）
        customcreditupdate: function (param) {
            return $http.post('/cuscredit/arrayupdate', param, {cache: false});
        },
        // 客户信用维护查看 - 客户信用（4个表）
        customcreditView: function (param) {
            return $http.post('/cuscredit/getcreditbycode', param, {cache: false});
        },
        // 客户信用维护新增 - 客户信用（4个表）
	    createarrwithoutcredit: function (param) {
            return $http.post('/cuscredit/createarrwithoutcredit', param, {cache: false});
        },
        // 客户信用变更保存
        savetomongo: function (param) {
            return $http.post('/cuscredit/savetomongo', param, {cache: false});
        },
        // 客户分组查看根据母公司
        customGroupList: function (param) {
            return $http.post('/cuscredit/relabycusname', param, {cache: false});
        },
        // 客户分组查看根据子公司
        customGroupListAsSon: function (param) {
            return $http.post('/cuscredit/relabysunname', param, {cache: false});
        },
        // 客户分组新增
        customGroupAdd: function (param) {
            return $http.post('/cuscredit/creditrela', param, {cache: false});
        },
        // 客户分组解除
        customGroupRemove: function (param) {
            return $http.post('/cuscredit/relaremove', param, {cache: false});
        },
        // 客户分组校验子公司
        checkCusName: function (param) {
            return $http.post('/cuscredit/checksun', param, {cache: false});
        },
        // 客户分组校验母公司
        checkMotherName: function (param) {
            return $http.post('/cuscredit/checkrela', param, {cache: false});
        },
        listCustomer: function(param){//客户接口
            return $http.post('/customer/list',param ,{cache:false});
        },
        // 审批接口
        applyView: function(param) {
            return $http.post('/cuscredit/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/cuscredit/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/cuscredit/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/cuscredit/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/cuscredit/recall',param ,{cache:false});
        },
        listInside: function(param) { // 选择合同
            return $http.post('/contract/list',param ,{cache:false});
        },
        getprocesslog: function (param) {
          return $http.post('/cuscredit/getprocesslog',param,{cache:false});
        }/*,
	    listCustomer: function(param){//客户接口
		    return $http.post('/customer/list',param ,{cache:false});
	    }*/
    };
    return service;
});

creditApp.controller('cusCusBoxCtrl', ['$scope','creditService',function($scope,service){
	/*$scope.paginationConf = {
	 currentPage: 1,
	 itemsPerPage: 5,
	 numberOfPage:0,
	 pagesLength: 10,
	 perPageOptions: [5,10, 20, 30, 40, 50],
	 pagePromise:{},
	 onChange: function(){
	 var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, KTOKD:'ZC01', NAME:$scope.NAME, KUNNR: $scope.KUNNR};
	 var customerPromise = service.listCustomer(param);
	 $scope.paginationConf.pagePromise = customerPromise;
	 }
	 };*/
	$scope.searchCus = function(){
		if($scope.NAME==''&&$scope.KUNNR==''){
			swal("必须输入一个查询条件", "", "warning");
			return false;
		}
		var param  = {page:1, limit:20, KTOKD:'ZC01', NAME:$scope.NAME, KUNNR: $scope.KUNNR};
		var customerPromise = service.listCustomer(param);
		customerPromise.success(function(data){
			if(data.code == 200){
				$scope.cusDateList = data.rst.data.items;
			}else {
				swal(data.msg, "", "warning");
			}
		}).error(function(data){
			alert(data);
		});
	}
	
}]);

creditApp.controller('creditTabCtrl', ['$scope','$http','$filter', 'creditService', function ($scope, $http, $filter, creditService) {
    $scope.zkList=function(type){
        var txt = {
            ys: '应收列表',
            wsyfd: '未使用返点记录',
            fkxc: '风控现场考察报告',
            ckh: '催款函信息',
            lsh: '律师函信息',
            ssxx: '诉讼信息'
        }[type];

        if($scope['dgList'+type]){
            $scope['dgList'+type] = false;
            $('#openCloseBtn'+type).html('展开'+txt+'∨');
        }else{
            $scope['dgList'+type] = true;
            $('#openCloseBtn'+type).html('收起'+txt+'∧');
        }

    };
    // 子级接收参数
    $scope.$on('transfer.type', function(event, data) {
        var d = {"id":'', "name":''};
        $.extend(d, data);
        var param = {'KUNNR':d.id},
            paramwsyfd = {'user': d.name,status:'valid'};
        var creditData = creditService.credit(param);
        var ysList = creditService.ysList(param);
        var wsyfdList = creditService.wsyfdList(paramwsyfd);
        var viewCont = creditService.customcreditView({cuscode:d.id});
        var creditmoneyView = creditService.creditmoneyView({cuscode:d.id});
        var selectcustdn  = creditService.selectcustdn(param); //客户信用交货单占用查询接口
        var today = new Date();
        today = $filter('date')(today,'yyyy-MM-dd');
        var selectcusfkjl  = creditService.selectcusfkjl({'KUNNR':d.id, 'ZDATE':today}); //付款记录

        $scope.ORDER_DATA_Tab={cusName:d.name};
        creditData.success(function(data){
            if(data.code == 200){
                $.extend(true, $scope.ORDER_DATA_Tab, data.rst.data.items);
            }else {
                swal(data.msg, "", "warning");
            }
        });
        ysList.success(function(data){
            if(data.code == 200){
                $scope.ysList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
        wsyfdList.success(function(data){
            if(data.code == 200){
                $scope.wsyfdList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
        viewCont.success(function(data){
            if (data.code = 200) {
                $scope.loading = false;
                //$scope.ORDER_DATA = data.rst.data;
                $.extend(true, $scope.ORDER_DATA_Tab, data.rst);
            }
        });
        selectcustdn.success(function(data){
            if (data.code = 200) {
                $scope.loading = false;
                //$scope.ORDER_DATA = data.rst.data;
                $scope.jhdList = data.rst.data ? data.rst.data.items : [];
            }
        });
        selectcusfkjl.success(function(data){
          if (data.code = 200) {
            $scope.loading = false;
            //$scope.ORDER_DATA = data.rst.data;
            $scope.fkjlList =  data.rst.data.items;
          }
        });
	    // 2017-3-13 新增信用状况
	    creditmoneyView.success(function(data){
          if (data.code = 200) {
            $scope.loading = false;
	          $.extend(true, $scope.ORDER_DATA_Tab, data.rst);
          }
        });
	
	    var debitlist  = creditService.debitlist(param); //收票信息 2017-6-23 6836
	    debitlist.success(function(data){
		    if (data.code = 200) {
			    $scope.loading = false;
			    $scope.spxxList = data.rst.data.items;
		    }
	    });
        // 过滤函数
        $scope.fun = function (e) {
            return e.bonusmoney.total-e.bonusmoney.freeze-e.bonusmoney.used>0 ;
        };
    });


}]);

// 客户信用列表
creditApp.controller('creditOrderCtrl', ['$scope','$stateParams','$http', '$filter', '$timeout', 'creditService', function ($scope, $stateParams, $http, $filter, $timeout, creditService) {
	/*var vm = $scope;
	vm.table = false;
	vm.loadData = true;
	vm.tableApi = null;
	vm.tableOptions = {
		headerTemplate: 'reimbursementHead.html',
		category: [
			{name: '客户编码', visible: true},
			{name: '客户名称', visible: true},
			{name: '信用等级', visible: true},
			{name: '授信额度', visible: true},
			{name: '最新财务数据年份', visible: true},
			{name: '股东担保', visible: true},
			{name: '房屋担保', visible: true},
			{name: '其他担保', visible: true},
			{name: '担保说明', visible: true},
			{name: '操作', visible: true}
		],
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
		{name: 'cuscode', displayName: "",category:'客户编码', width: 135, cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents link"><a target="_blank" href="index.html#/creditOrderView/{{row.entity._id}}?flag={{row.entity.inprocess}}">{{row.entity.cuscode}}</a></div>'/!*,pinnedLeft: true*!/},
		{name: 'cusname', displayName: "",category:'客户名称',width: 80, cellTooltip: true},
		{name: 'xydj', displayName: "",category:'信用等级',  width: 110, cellTooltip: true},
		{name: 'creditmoney', displayName: "",category:'授信额度',width: 110, cellTooltip: true},
		{name: 'financialdata[0].year', displayName: "",category:'最新财务数据年份', width: 120, cellTooltip: true},
		{name: 'gddb.dbje', width: 135, displayName: "担保金额",category:'股东担保', cellTooltip: true, cellFilter: 'currency : \'￥\''},
		{name: 'gddb.startdate',width: 80, displayName: "生效时间",category:'股东担保', cellTooltip: true , cellFilter: 'date: \'yyyy-MM-dd\''},
		{name: 'gddb.enddate', width: 80, displayName: "失效时间",category:'股东担保', cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\'' },
		{name: 'fwdb.dbje', width: 135, displayName: "担保金额",category:'房屋担保', cellTooltip: true, cellFilter: 'currency : \'￥\''},
		{name: 'fwdb.startdate',width: 80, displayName: "生效时间",category:'房屋担保', cellTooltip: true , cellFilter: 'date: \'yyyy-MM-dd\''},
		{name: 'fwdb.enddate', width: 80, displayName: "失效时间",category:'房屋担保', cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\'' },
		{name: 'qtdb.dbje', width: 135, displayName: "担保金额",category:'其他担保', cellTooltip: true, cellFilter: 'currency : \'￥\''},
		{name: 'qtdb.startdate',width: 80, displayName: "生效时间",category:'其他担保', cellTooltip: true , cellFilter: 'date: \'yyyy-MM-dd\''},
		{name: 'qtdb.enddate', width: 80, displayName: "失效时间",category:'其他担保', cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd\'' },
		{name: 'guaranteeinfo[0].explain', displayName: "担保说明",category:'股东担保',width: 120, cellTooltip: true},
		{
			name: 'actions',
			displayName: "操作",
			// category:'操作',
			enableSorting: false,
			pinnedRight: true,
			width: 85,
			cellTemplate: 'reimbursementAction.html'
		}
	];
	
	vm.tableSelectRow = function() {
		if(vm.tableApi && vm.loadData) return;
		$timeout(function() {
			angular.element('.grid').height($scope.gridHeight);
			var _select = vm.tableApi.selection;
			// 监听单选
			_select.on.rowSelectionChanged(vm, function(row){
				var id = row.entity._id, action = row.isSelected ? 'add' : 'remove',
					code = row.entity.code, status = row.entity.info.status,
					index = vm.tableApi.grid.renderContainers.body.visibleRowCache.indexOf(row);
				updateSelected(action, id, code , status, row.entity.hbing, row.entity.ZSQNO_HB, row.entity.ZHB);
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
	};*/
	
	
	// ...
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
                cusname: $scope.cusname
            };
            var customerPromise = creditService.listCredit(param);
            $scope.paginationConf.pagePromise = customerPromise;
            $scope.emptyFn && $scope.emptyFn();
	        customerPromise.success(function (data) {
		        if(data.code==200) {
			        // 6126 若同一担保类型有多条记录，取失效时间最小的记录展示
			        var items = data.rst.data.items || [],
				        now = $filter('date')(new Date(), 'yyyy-MM-dd');
				        
				        
				        for (var j=0,len=items.length; j<len; j++) {
				        	var guaranteeinfo = items[j].guaranteeinfo || [],
						        dbObj = {gddb:{}, fwdb:{}, qtdb:{}};
					        for(var i=0,l=guaranteeinfo.length; i<l; i++) {
					        	var dbType = {'法人':'gddb', '股东':'gddb', '房屋':'fwdb', '其他':'qtdb'}[guaranteeinfo[i].dblx]
						        var endD = $filter('date')(guaranteeinfo[i].enddate, 'yyyy-MM-dd');
						        if(endD>now || endD==now) {     //只取没有失效的
							        if( dbObj[dbType] && dbObj[dbType].enddate) {
								        dbObj[dbType] = items[j][dbType] = dbObj[dbType].enddate > endD ? guaranteeinfo[i] : dbObj[dbType];
							        } else {
								        dbObj[dbType] = items[j][dbType] = guaranteeinfo[i];
							        }
						        }
					        }
				        }
			
			        /*if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
			        genTable(vm.tableOptions, vm.tableHeader, items, function (data) {
				        var dataLen = data.data.length;
				        if(dataLen) {
					        if(dataLen < 10) {
						        $scope.gridHeight = data.data.length * data.rowHeight + data.headerRowHeight + 15;
						        /!* angular.element('.grid').height(
						         data.data.length * data.rowHeight + data.headerRowHeight + 15
						         );*!/
					        } else {
						        $scope.gridHeight =  10 * data.rowHeight + data.headerRowHeight + 15;
						        /!* angular.element('.grid').height(
						         10 * data.rowHeight + data.headerRowHeight + 15
						         );*!/
					        }
					        angular.element('.grid').height($scope.gridHeight);
					        vm.table = data;
					        vm.tableSelectRow();
					        console.log('gridHeight', $scope.gridHeight)
				        } else {
					        vm.loadData = false;
					        vm.table = false;
				        }
			        });*/
			        
		        } else {
		        	swal(data.msg, '', 'warning');
		        }
	        })
        }
    };
    $scope.sortFn = function (value) {
        var arr = [];

        if(value && value.financialdata) {
            arr = value.financialdata;
        }
        arr.sort(function(a,b){
            return b.year - a.year;
        });

        $.extend(value, {financialdata: arr});
        return value;
    };
    // 查看客户信用历史
    $scope.showHistory = function(cuscode) {
        var view = creditService.creditmoneyView({cuscode:cuscode});
        view.success(function (data) {
            if (data.code == 200) {
                $scope.dataHistoryList = data.rst.creditmoneyinfo;
            }
        });
        $( "#creditHistory" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#creditHistory" ).dialog( "open" );
    };
    $scope.cArr = [];
    $scope.cArrcode = [];
    var updateSelected = function (action, id, code) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrcode.push(code);
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrcode.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, code) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, code);
    };
    // 清空
    $scope.emptyFn = function() {
        $scope.checkAll = false;
        $scope.cArr = [];
        $scope.cArrcode = [];
    };
    $scope.allCheck=function($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.dataList.length; i++) {
                $scope.cArr[i] = $scope.dataList[i]._id;
                $scope.cArrcode[i] = $scope.dataList[i].cuscode;
            }
        } else {
            $scope.cArr = [];
            $scope.cArrcode = [];
        }
    };
    $scope.exportexcel=function(){
	
	    var path='/cuscredit/exportexcel';
        if($scope.cArr.length<=0){
            // swal("请勾选列表", "", "warning");
            // return false;
	        window.open(path);
        } else {
	        var strArr = [];
	        $.each($scope.cArr,function(key,value){
	            var para = 'ids='+value;
	            strArr.push(para);
	        });
	        var str = strArr.join("&");
	        path = path+'?'+str;
	        // console.log('path:', path)
	        window.open(path);
        }

    };
}]);
// 新增
creditApp.controller('creditOrderAddCtrl', ['$scope', 'creditService', function ($scope, creditService) {
    // ...
    $scope.ORDER_DATA = {"khjydxdjxz":0,"cussource":0,"ydfgcsfss":0,"yqnjyed":0,"industryreputation":0,"premises":0,"companysize":0};
    // 选择客户名称
    $scope.cusBox = function(){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
    };
    $scope.cusSelect = function(id,name){
        var checkcuscredit = creditService.checkcuscredit({cuscode:id});
        checkcuscredit.success(function (data) {
            if(data.code == 200) {
                if(data.rst.state == 1) {
                    $scope.ORDER_DATA.cusname = name;
                    $scope.ORDER_DATA.cuscode = id;
                    $( "#cusBox" ).dialog("destroy");
                    $(".ui-dialog").remove();
                } else {
                    swal(name+'已进行过信用申请！', '', 'warning');
                }
            }
        })
    };
    $scope.delupload = function(idx, type){
		$scope[type].splice(idx,1);
	}

    $scope.addData = function(data,statue){
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.myForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var addParam = {};
        var param={};
        //var param={processId:$scope.processId,nodeId:$scope.nodeId};
        data.scoresummary = $scope.ORDER_DATA.khjydxdjxz*1 + $scope.ORDER_DATA.cussource*1 + $scope.ORDER_DATA.ydfgcsfss*2 + $scope.ORDER_DATA.yqnjyed*1 + $scope.ORDER_DATA.industryreputation*1 + $scope.ORDER_DATA.premises*1 + $scope.ORDER_DATA.companysize*1;
        data.jysfkbl = data.jysfkbl*100/100;
        data.cwzl = $scope.cwzl || [];
        data.zzzm = $scope.zzzm || [];
        data.dbzl = $scope.dbzl || [];
        data.qtzl = $scope.qtzl || [];
        // 财务资料
       /* var objUpload = [];
        $('#cwzlBox').find('a').each(function(i,idx){
            var obj = {};
            obj.filePath = $(this).attr('href');
            obj.fileName = $('.showImg a').eq(i).html();
            objUpload.push(obj);
        });
        data.cwzl = objUpload;*/
        // data.cwzl = $scope.cwzl;
        // 2017-1-11 潘静提需求，财务资料必须上传
        // 判断“财务资料、资质证明”是否上传，没有上传给出提示
        // 财务资料允许上传多个
        // 2017-1-17 附件都允许上传多个
        if(!data.cwzl.length) {
            swal('财务资料附件为空，不允许提交！', '', 'warning');
            return false;
        }
        // 评分汇总为0时，不允许提交
        if(data.scoresummary == 0) {
            swal('请填写评分表！', '', 'warning');
            return false;
        }
        addParam.doc = data;
        param.doc = {model: data};
        // 判断“财务资料、资质证明”是否上传，没有上传给出提示
        if(!$scope.ORDER_DATA.cwzl || !$scope.ORDER_DATA.zzzm) {
            swal({
                title: "附件资料上传不完整，是否继续操作？",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定',
                closeOnConfirm: false
            }, function(){
                //prarm.doc.creator = person.user.name;
                addDataFn(statue, param);
            });
        } else {
            addDataFn(statue, param);
        }

    };

    var addDataFn = function(statue, param) {
        if(statue == "save"){
            var addInside = creditService.addCredit(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = creditService.applyAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function(){
                        window.location.href='/index.html#/creditOrder';
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };
}]);
//编辑
creditApp.controller('creditOrderEditCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', 'creditService', function ($scope, $rootScope, $stateParams, $filter, creditService) {
    // ...
    //var ORDER_DATA =  $scope.ORDER_DATA ={};
    $scope.ORDER_DATA = {
        // guaranteeinfo:[{dblx: '法人', dbje: '', startdate: '', enddate: '', explain: ''},{dblx: '房屋', dbje: '', startdate: '', enddate: '', explain: ''},{dblx: '其他', dbje: '', startdate: '', enddate: '', explain: ''}],
        guaranteeinfo:[],
        financialdata:[],fkxcreport:[],callletter:[],lawyerletter:[],lawsuitinfo:[],"khjydxdjxz":0,"cussource":0,"ydfgcsfss":0,"yqnjyed":0,"industryreputation":0,"premises":0,"companysize":0};

    if($stateParams.sapid !== undefined){//判断数据来源（sap or 草稿）
        $scope.draftStatue = false;
        $scope.changed = true;
        $scope.fkUser = false;
        // 判断当前登录人是不是风控人员
        // 风控变更时候至于徐变更“信用信息”；非风控人员变更“客户信用”信息
        var person = $rootScope.loginPerson;
        for(var i=0, l=person.user.parentorgList.length; i<l; i++) {
            if(person.user.parentorgList[i].orgname == '风险管理部') {
                $scope.fkUser = true;
                break;
            }
        }

    }else{  //草稿
        $scope.draftStatue = true;
    }


    $scope.userAdd = function(type){
        var obj= {
            'financialdata': {year: '', yysr: '', jzc: '', zcfzl: '', sszc: '', jlr: '', jyhdcsxjljz: '',xsmll:'',zzczzl:''},
            'guaranteeinfo': {dblx: '股东', dbje: 0, startdate: '', enddate: '', explain: ''},
            'fkxcreport': {createname: '', xckcsj: '', cusname: '', ysje: '', dzje: '',lslnjyje:'',bgmjorbghj:'', kczk: '', cwsfgf: '', gsgdgc: '',dgdsfgzsy:'',gddgsdsjtr:'',zyyw:'', zygys: '', xckhqjqdcwbg: '',qddzzjl:'',hykbqtkhpj:'',qyfkpjjsxjy:''},
            'callletter': {sendtime: '', contracttype: '', contractno: '', defaultvalue: '', trackinfo: '',updatename:'',updatedate:''},
            'lawyerletter': {sendtime: '', contracttype: '', contractno: '', defaultvalue: '', trackinfo: '',updatename:'',updatedate:''},
            'lawsuitinfo': {saler: '', deptment: '', contracttype: '', contractno: '', zcssjg: '',layermon:'',zcssfy:'', ssbd: '', ayjs: '', ajcl: '',updatename:'',updatedate:''}
        }[type];

        $scope.ORDER_DATA[type].push(obj);
    };
    $scope.userDel = function(idx,type){
        $scope.ORDER_DATA[type].splice(idx,1);
    };
    // 客户信用 - 客户备注字段 业务助理、客户经理、采购专员、供应链专员、销售助理、商务专员不可看全部内容，其它角色可看
    // var persion = $cookieStore.get('persion');
    var persion = $rootScope.loginPerson;
    var roles = persion.roles, roleArr = ['业务助理','客户经理','采购专员','供应链专员','销售助理','商务专员'];
    $scope.filterRole = false;
    for (var i= 0,l=roleArr.length; i<l; i++) {
        if( !$scope.filterRole ) {
            $scope.filterRole = $scope.filterRole || !!getField(roles, 'name', roleArr[i]);
        }
    }
    var viewCont = creditService.viewCredit({processId:$stateParams.processId,_id:$stateParams.sapid});
    viewCont.success(function (data) {
        if(data.code == 200) {
            var ORDER_DATA = $scope.draftStatue ? data.rst.data.findById.doc.content.model : data.rst.data;
            $.extend(true, $scope.ORDER_DATA,ORDER_DATA );
	        if($scope.draftStatue) {
	        	// 赋值是不是变更的客户信用
		        $scope.changed = $scope.ORDER_DATA.changeFlag;
	        }
	        // 因为之前修改了上传附件的格式，有旧数据需要特殊处理下
	        // 2017-2-23 变更客户信用不能删除原来上传的附件，这里对读取的数据加一个特殊的字段处理
	        if(typeof $scope.ORDER_DATA.cwzl == 'string') {
		        $scope.ORDER_DATA.cwzl = [{
			        filePath: $scope.ORDER_DATA.cwzl,
			        fileName: $scope.ORDER_DATA.cwname
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.zzzm == 'string') {
		        $scope.ORDER_DATA.zzzm = [{
			        filePath: $scope.ORDER_DATA.zzzm,
			        fileName: $scope.ORDER_DATA.zzname
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.dbzl == 'string') {
		        $scope.ORDER_DATA.dbzl = [{
			        filePath: $scope.ORDER_DATA.dbzl,
			        fileName: $scope.ORDER_DATA.dbname
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.qtzl == 'string') {
		        $scope.ORDER_DATA.qtzl = [{
			        filePath: $scope.ORDER_DATA.qtzl,
			        fileName: $scope.ORDER_DATA.othername
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.xyxx == 'string') {
		        $scope.ORDER_DATA.xyxx = [{
			        filePath: $scope.ORDER_DATA.xyxx,
			        fileName: $scope.ORDER_DATA.xyxxname
		        }]
	        }
            $scope.cwzl =  $scope.ORDER_DATA.cwzl || [];
            $scope.zzzm =  $scope.ORDER_DATA.zzzm || [];
            $scope.dbzl =  $scope.ORDER_DATA.dbzl || [];
            $scope.qtzl =  $scope.ORDER_DATA.qtzl || [];
            $scope.xyxx =  $scope.ORDER_DATA.xyxx || [];
            // $scope.xyxx =  $scope.ORDER_DATA.xyxxname;

	        for(var i=0,l=$scope.cwzl.length; i<l; i++) {
		        $.extend(true,$scope.cwzl[i],{cannotDel: $scope.changed})
	        }
	        for(var i=0,l=$scope.zzzm.length; i<l; i++) {
		        $.extend(true,$scope.zzzm[i],{cannotDel: $scope.changed})
	        }
	        for(var i=0,l=$scope.dbzl.length; i<l; i++) {
		        $.extend(true,$scope.dbzl[i],{cannotDel: $scope.changed})
	        }
	        for(var i=0,l=$scope.qtzl.length; i<l; i++) {
		        $.extend(true,$scope.qtzl[i],{cannotDel: $scope.changed})
	        }
	        for(var i=0,l=$scope.xyxx.length; i<l; i++) {
		        $.extend(true,$scope.xyxx[i],{cannotDel: $scope.changed})
	        }

            $scope.ORDER_DATA.builddate = $filter("date")($scope.ORDER_DATA.builddate, "yyyy-MM-dd");
            for(var i=0; i<$scope.ORDER_DATA.guaranteeinfo.length; i++) {
                $scope.ORDER_DATA.guaranteeinfo[i].startdate = $filter("date")($scope.ORDER_DATA.guaranteeinfo[i].startdate, "yyyy-MM-dd");
                $scope.ORDER_DATA.guaranteeinfo[i].enddate = $filter("date")($scope.ORDER_DATA.guaranteeinfo[i].enddate, "yyyy-MM-dd");
                $scope.explain = $scope.ORDER_DATA.guaranteeinfo[i].explain;
            }
            for(var i=0; i<$scope.ORDER_DATA.callletter.length; i++) {
                $scope.ORDER_DATA.callletter[i].sendtime = $filter("date")($scope.ORDER_DATA.callletter[i].sendtime, "yyyy-MM-dd");
                $scope.ORDER_DATA.callletter[i].updatedate = $filter("date")($scope.ORDER_DATA.callletter[i].updatedate, "yyyy-MM-dd");
            }
            for(var i=0; i<$scope.ORDER_DATA.lawyerletter.length; i++) {
                $scope.ORDER_DATA.lawyerletter[i].sendtime = $filter("date")($scope.ORDER_DATA.lawyerletter[i].sendtime, "yyyy-MM-dd");
                $scope.ORDER_DATA.lawyerletter[i].updatedate = $filter("date")($scope.ORDER_DATA.lawyerletter[i].updatedate, "yyyy-MM-dd");
            }
            for(var i=0; i<$scope.ORDER_DATA.lawsuitinfo.length; i++) {
                $scope.ORDER_DATA.lawsuitinfo [i].updatedate = $filter("date")($scope.ORDER_DATA.lawsuitinfo[i].updatedate, "yyyy-MM-dd");
            }
            /*for(var i=0; i<$scope.ORDER_DATA.financialdata.length; i++) {
                $scope.ORDER_DATA.financialdata [i].year = $filter("date")($scope.ORDER_DATA.financialdata[i].year, "yyyy");
            }*/

            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.delupload = function(idx, type){
                $scope.ORDER_DATA[type].splice(idx,1);
            }
        }
    });
    $scope.addData = function(data,statue){
        var requiredObj = $scope.myForm.$error.required, flagDate=false;
        $scope.flagDate = [];
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.myForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var addParam = {};
        //var param={processId:$scope.processId,nodeId:$scope.nodeId};
        var param = {};
        param.processId = $stateParams.processId || $scope.processId;
        param.nodeId = $stateParams.nodeId || $scope.nodeId;
        //data.scoresummary = +$scope.ORDER_DATA.khjydxdjxz+ +$scope.ORDER_DATA.cussource
        data.scoresummary = $scope.ORDER_DATA.khjydxdjxz*1 + $scope.ORDER_DATA.cussource*1 + $scope.ORDER_DATA.ydfgcsfss*2 + $scope.ORDER_DATA.yqnjyed*1 + $scope.ORDER_DATA.industryreputation*1 + $scope.ORDER_DATA.premises*1 + $scope.ORDER_DATA.companysize*1; //data.scoresummary = $scope.ORDER_DATA.khjydxdjxz + $scope.ORDER_DATA.cussource + $scope.ORDER_DATA.ydfgcsfss + $scope.ORDER_DATA.yqnjyed + $scope.ORDER_DATA.industryreputation + $scope.ORDER_DATA.premises + $scope.ORDER_DATA.companysize
        data.jysfkbl = data.jysfkbl*100/100 ;
	    data.cwzl = $scope.cwzl || [];
	    data.zzzm = $scope.zzzm || [];
	    data.dbzl = $scope.dbzl || [];
	    data.qtzl = $scope.qtzl || [];
	    data.xyxx = $scope.xyxx || [];
        // data.xyxxname = $scope.xyxx;
        // 财务资料
        /*var objUpload = [];
        $('#cwzlBox').find('a').each(function(i,idx){
            var obj = {};
            obj.filePath = $(this).attr('href');
            obj.fileName = $('.showImg a').eq(i).html();
            objUpload.push(obj);
        });
        data.cwzl = objUpload;*/
	    // data.cwzl = $scope.cwzl;
		// console.log('cwzl', objUpload, data.cwzl)
        // 2017-1-11 潘静提需求，财务资料必须上传
        // 判断“财务资料、资质证明”是否上传，没有上传给出提示
        if(!$scope.changed && !data.cwzl.length) {
            swal('财务资料附件为空，不允许提交！', '', 'warning');
            return false;
        }
        //
        // 评分汇总为0时，不允许提交
        if((!$scope.changed || $scope.changed && !$scope.fkUser) && data.scoresummary == 0) {
            swal('请填写评分表！', '', 'warning');
            return false;
        }
        for (var i = 0; i < data.guaranteeinfo.length; i++) {
            data.guaranteeinfo[i].explain = $scope.explain;
            flagDate = flagDate || (data.guaranteeinfo[i].startdate>data.guaranteeinfo[i].enddate);
            $scope.flagDate[i] = data.guaranteeinfo[i].startdate>data.guaranteeinfo[i].enddate;
        }
        if (flagDate) {
            swal("失效时间不能小于生效时间", "", "warning");
            return false;
        }
	    // 2017-2-23变更数据存的超过不允许删除附件，变更的数据增加一个标志字段，仅供草稿中使用
	    data.changeFlag = $scope.changed ;
        addParam.doc = data;
        param.doc = {model: data};
        //prarm.doc.creator = person.user.name;
        if(statue == "save"){
            var addInside = creditService.addCredit(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = creditService.applyAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function(){
                        window.location.href='/index.html#/creditOrder';
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        } else if(statue == 'saveFk'){
            var savetomongo  = creditService.savetomongo(param);
            savetomongo .success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };
}]);
//审批查看
creditApp.controller('cuscreditCtrl', ['$scope', '$rootScope','$stateParams', 'creditService', function ($scope, $rootScope,$stateParams, creditService) {
    // ...
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    $scope.ORDER_DATA = {financialdata:[],guaranteeinfo:[]};
    $scope.userAdd = function(type){
        var obj= {
            'financialdata': {year: '', yysr: '', jzc: '', zcfzl: '', sszc: '', jlr: '', jyhdcsxjljz: '',xsmll:'',zzczzl:''},
            'guaranteeinfo': {dblx: '股东', dbje: 0, startdate: '', enddate: '', explain: ''}
        }[type];
        $scope.ORDER_DATA[type].push(obj);
    };
    $scope.userDel = function(idx,type){
        $scope.ORDER_DATA[type].splice(idx,1);
    };
    // 客户信用 - 客户备注字段 业务助理、客户经理、采购专员、供应链专员、销售助理、商务专员不可看全部内容，其它角色可看
    // var persion = $cookieStore.get('persion');
    var persion = $rootScope.loginPerson;
    var roles = persion.roles, roleArr = ['业务助理','客户经理','采购专员','供应链专员','销售助理','商务专员'];
    $scope.filterRole = false;
    for (var i= 0,l=roleArr.length; i<l; i++) {
        if( !$scope.filterRole ) {
            $scope.filterRole = $scope.filterRole || !!getField(roles, 'name', roleArr[i]);
        }
    }
    var viewPur = creditService.applyView(param);
    viewPur.success(function(data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.purchaseList = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            //$scope.ORDER_DATA =  $scope.doc.model;
            $.extend($scope.ORDER_DATA, data.rst.doc.model);
            $scope.processlog = data.rst.processlog;
            if($scope.purchaseList.guaranteeinfo && $scope.purchaseList.guaranteeinfo[0]) {
                $scope.explain = $scope.purchaseList.guaranteeinfo[0].explain;
            }
            // $scope.xyxx =  $scope.ORDER_DATA.xyxxname;
	        // 因为之前修改了上传附件的格式，有旧数据需要特殊处理下
			if(typeof $scope.ORDER_DATA.cwzl == 'string') {
				$scope.ORDER_DATA.cwzl = [{
					filePath: $scope.ORDER_DATA.cwzl,
					fileName: $scope.ORDER_DATA.cwname
				}]
			}
	        if(typeof $scope.ORDER_DATA.zzzm == 'string') {
		        $scope.ORDER_DATA.zzzm = [{
			        filePath: $scope.ORDER_DATA.zzzm,
			        fileName: $scope.ORDER_DATA.zzname
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.dbzl == 'string') {
		        $scope.ORDER_DATA.dbzl = [{
			        filePath: $scope.ORDER_DATA.dbzl,
			        fileName: $scope.ORDER_DATA.dbname
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.qtzl == 'string') {
		        $scope.ORDER_DATA.qtzl = [{
			        filePath: $scope.ORDER_DATA.qtzl,
			        fileName: $scope.ORDER_DATA.othername
		        }]
	        }
	        if(typeof $scope.ORDER_DATA.xyxx == 'string') {
		        $scope.ORDER_DATA.xyxx = [{
			        filePath: $scope.ORDER_DATA.xyxx,
			        fileName: $scope.ORDER_DATA.xyxxname
		        }]
	        }

          // 判断是不是第一审批人
            //$scope.firstApproval = data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing' && data.rst.nodeIndex == 1 ? true : false;
            // 2016-7-6 修改需求，所有审批人都能编辑
            $scope.firstApproval = data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing' && data.rst.nodeIndex > 0 ? true : false;
            //$scope.otherApproval = data.rst.nodeIndex > 1 ? true : false;

            //    读取授信额度信息
            /*var creditmoneyView = creditService.creditmoneyView({cusname: $scope.ORDER_DATA.cusname});
             creditmoneyView.success(function(data) {
             if(data.code == 200) {
             $.extend($scope.ORDER_DATA, data.rst);
             }
             });*/

            if(data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
            }
            if(data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active'){
                //$scope.recallBtn = true;
                $scope.textareaBtn = true;
            }
            if($stateParams.myflag == 'mybegin'){
                $scope.editBtn = true;
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
            }
        }else {
        	swal(data.msg, '', 'warning');
        }
    }).error(function(error){
        alert(error);
    });


    var applyObj =  $scope.applyObj ={};
    var flagAgree = false, flagDisagree = false, flagCancel = false, flagRecall = false;
    // addCredit
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

        var addInside = creditService.addCredit(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        var requiredObj = $scope.myForm.$error.required, flagDate = false;
        $scope.flagDate = [];
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.myForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        if(flagAgree) return;
        flagAgree = false;
        if ($scope.firstApproval) {
            for (var i = 0; i < $scope.ORDER_DATA.guaranteeinfo.length; i++) {
                $scope.ORDER_DATA.guaranteeinfo[i].explain = $scope.explain;
                flagDate = flagDate || ($scope.ORDER_DATA.guaranteeinfo[i].startdate > $scope.ORDER_DATA.guaranteeinfo[i].enddate);
                $scope.flagDate[i] = $scope.ORDER_DATA.guaranteeinfo[i].startdate > $scope.ORDER_DATA.guaranteeinfo[i].enddate;
            }
            if (flagDate) {
                swal("失效时间不能小于生效时间", "", "warning");
                return false;
            }
            // $scope.ORDER_DATA.xyxxname = $scope.xyxx;
            $scope.ORDER_DATA.xyxx = $scope.xyxx;
            $scope.doc = $scope.ORDER_DATA;
        }
        param.doc = {model:$scope.doc};
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        //  param.candidates = $scope.candidates;
//console.log('agree',param);return false;
        var applyAgree = creditService.agree(param);
        applyAgree.success(function(data){
            flagAgree = true;
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回客户信用待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=客户信用&&controllercode=KHXY';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        if(flagDisagree) return;
        flagDisagree = true;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = creditService.disagree(param);
        disagree.success(function(data){
            flagDisagree = false;
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回客户信用待办"
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=客户信用&&controllercode=KHXY';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        if (flagCancel) return;
        flagCancel = true;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = creditService.cancel(param);
        cancel.success(function(data){
            flagCancel = false;
            if(data.code == 200){
                swal({
                    title: "取消成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回客户信用待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/myDraft';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=客户信用&&controllercode=KHXY';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
//alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        if (flagRecall) return;
        flagRecall = true;
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = creditService.recall(param);
        recall.success(function(data){
            flagRecall = false;
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
            swal(error, "", "warning");
            //alert(error);
        });
    }
}]);
//查看
creditApp.controller('creditOrderViewCtrl', ['$scope', '$rootScope', '$stateParams', 'creditService', function ($scope, $rootScope, $stateParams, creditService) {
    // ...
    var ORDER_DATA;
    ORDER_DATA = {};

    $scope.changeBtn = $stateParams.flag == 'true';
    // $scope.creditShow=true;
    if($stateParams.flag=="pay" || $stateParams.flag=="contract"){
        $scope.creditShow=false;
        try{
            // 往客户信用controller传递参数
            var param = {'id':$stateParams.cuscode,'name':$stateParams.cusname};
            window.setTimeout(function () {
                $scope.$broadcast('transfer.type', param);
            },0)
        } catch (e) {}
        return false;
    }else{
        $scope.creditShow=true;
    }
    var id = $stateParams.id;

    // var viewCont = creditService.viewCredit({_id:$stateParams.id});
    // 客户信用 - 风控评估字段 业务助理、客户经理、采购专员、供应链专员、销售助理、商务专员不可看全部内容，其它角色可看
    // var persion = $cookieStore.get('persion');
    var persion = $rootScope.loginPerson;
    var roles = persion.roles, roleArr = ['业务助理','客户经理','采购专员','供应链专员','销售助理','商务专员'];
    $scope.filterRole = false;
    for (var i= 0,l=roleArr.length; i<l; i++) {
        if( !$scope.filterRole ) {
            $scope.filterRole = $scope.filterRole || !!getField(roles, 'name', roleArr[i]);
        }
    }
    var  viewCont = creditService.viewCredit({_id:$stateParams.id});
    viewCont.success(function(data) {
        if (data.code == 200) {
            $scope.loading = false;
            $scope.ORDER_DATA = id ? data.rst.data : data.rst;
            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ORDER_DATA.cusname, 'id':$scope.ORDER_DATA.cuscode};
                $scope.$broadcast('transfer.type', param);
            } catch (e) {}
            //    读取授信额度信息
            /*var creditmoneyView = creditService.creditmoneyView({cusname: $scope.ORDER_DATA.cusname});
             creditmoneyView.success(function(data) {
             if(data.code == 200) {
             $.extend($scope.ORDER_DATA, data.rst);
             }
             });*/
        } else {
            swal(data.msg, '', 'warning');
        }
    });

    // 审批记录
    var vm = $scope;
    vm.processlog = null

    vm.$watch('ht.activeTab',function (nv, ov) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (nv == 3 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = creditService.getprocesslog({id: vm.ORDER_DATA.cuscode}); // 直接取值数据中 申请人（proposer）
        processlog.success(function (data) {
          if (data.rst.length != 0) {
            vm.processlog = data.rst;
            vm.activeTab = ov;
          } else {
            swal('没有审批信息', '', 'warning');
          }
        });
      }
    });
    // 审批记录 END

}]);

//额度维护列表
creditApp.controller('creditmaintenanceCtrl', ['$scope','$stateParams','$http', 'creditService', function ($scope, $stateParams, $http, creditService) {
    // ...
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
                cusname: $scope.cusname
            };
            // 清空选中数据
            $scope.cArr = [];
            $scope.cArrcode = [];
            var customerPromise = creditService.creditmoneyList(param);

            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    // 绑定客户信用维护按钮点击事件
    $scope.showcreditCustomMtceFn = function($event, cArrcode) {
        var obj = $event.target;
        obj.href = $(obj).hasClass('disabledbtn') ? '' : '/index.html#/creditCustomMtce?cuscode=' + cArrcode[0].cuscode+ '|' + cArrcode[0].fromcus + '&cusname=' + cArrcode[0].cusname ;
    };
    $scope.showHistory = function(cuscode) {
        var view = creditService.creditmoneyView({cuscode:cuscode});
        view.success(function (data) {
            if (data.code == 200) {
                $scope.dataHistoryList = data.rst.creditmoneyinfo;
            }
        });
        $( "#creditHistory" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#creditHistory" ).dialog( "open" );
    };
    $scope.cArr = [];
    $scope.cArrcode = [];
    var updateSelected = function (action, id, code) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrcode.push(code);
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrcode.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, code) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, code);
    };
}]);
// 维护客户额度信息
creditApp.controller('creditmaintenanceAddCtrl', ['$scope', '$stateParams','$filter', '$rootScope', 'creditService', function ($scope,$stateParams,$filter, $rootScope, creditService) {
    // ...
    // console.log($rootScope.busiRoles)
	//2017-2-24 5515 【客户信用维护】角色为风控经理时候，有删除操作权限
	$scope.fkjl = $rootScope.busiRoles[0].code == "fengkong_jingli";
    $scope.ORDER_DATA = {};
    $scope.userList = {"jlr":'',"startdate":'',"cusname":"","cuscode":"","creditmoney":null,"days":null,"advancepayment":null,"xyzk":"","xydj":"","khxyyj":""};

    if ($stateParams.id) {
        $scope.editFlag = true;
        var view = creditService.creditmoneyView({cuscode:$stateParams.id});
        view.success(function (data) {
            if (data.code == 200) {
                $scope.ORDER_DATA = data.rst.creditmoneyinfo.reverse();
	            for(var i=0,l=$scope.ORDER_DATA.length; i<l; i++) {
	            	if($scope.ORDER_DATA[i] && $scope.ORDER_DATA[i].status == 1) {
			            $scope.ORDER_DATA.splice(i, 1)
		            }
	            }
		        $.extend( $scope.userList, {"cusname":data.rst.cusname,"cuscode":data.rst.cuscode});
            }
        });
    }
    // var person = $cookieStore.get("persion"),
    var person = $rootScope.loginPerson,
        d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    $.extend( $scope.userList, {"jlr":person.user.name, startdate:$scope.today});

    // 选择客户名称
    $scope.cusBox = function(){
        // 维护时候不能修改客户
        if ($scope.editFlag) return false;
        $("#cusBox").dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $("#cusBox").dialog("open");
        $scope.cusSelect = function(id,name){
            // 判断是否有过信用申请
            var checkcuscredit = creditService.checkcuscredit({cuscode:id});
            checkcuscredit.success(function (data) {
                if(data.code == 200) {
                    if(data.rst.state == 2) {
                        // 判断是否维护过额度信息
                        var checkcreditmoney = creditService.checkcreditmoney({cuscode:id});
                        checkcreditmoney.success(function (data) {
                            if(data.code == 200) {
                                if(!data.rst.length) {
                                    $scope.userList.cusname = name;
                                    $scope.userList.cuscode = id;
                                    $( "#cusBox" ).dialog("destroy");
                                    $(".ui-dialog").remove();
                                }
                            }else {
                                // swal('该客户已有额度维护记录，请从授信额度维护列表中查询维护！')
                                swal(data.msg, '', 'warning');
                            }
                        })
                    } else {
                        var txt = {1:'该客户尚未进行客户信用申请，不可维护', 3:'该客户信用申请审批中，请审批完成后再做维护'}[data.rst.state];
                        swal(txt, '', 'warning');
                    }
                }
            })
        };
        /*$scope.cusSelect = function (id, name) {
         $scope.userList.cusname = name;
         $scope.userList.cuscode = id;
         $("#cusBox").dialog("destroy");
         $(".ui-dialog").remove();
         };*/
    };

    // 删除行项目
	$scope.delItem = function (idx, id) {
		swal({
			title: "确定要删除吗？",
			type: "warning",
			showCancelButton: true,
			cancelButtonText: "取消",
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		}, function () {
			var code = $stateParams.id;
			var changestatus = creditService.changestatus({cuscode: code, _id: id});
			changestatus.success(function (data) {
				if (data.code == 200) {
					swal('删除成功', '', 'success');
					$scope.ORDER_DATA.splice(idx, 1)
				} else {
					swal(data.msg, '', 'warning');
				}
			})
		});
	}
    $scope.addData = function(data,statue){
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.myForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        if (data.startdate == $scope.today) {
            data.startdate = '';
        }
        param.doc = data;
        //prarm.doc.creator = person.user.name;
        if(statue == "save"){
            if($scope.editFlag) {
                var addInside = creditService.creditmoneUpdate(param);
            } else {
                var addInside = creditService.creditmoneyAdd(param);
            }


            addInside.success(function(data){
                if(data.code == 200){
                    //swal("保存成功", "", "success");
                    swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function(){
                        window.location.href='/index.html#/creditmaintenance';
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };
}]);

// 客户信用
creditApp.controller('creditCustomMtceCtrl', ['$scope','$stateParams','$http','$filter', '$rootScope', 'creditService', function ($scope, $stateParams, $http, $filter,$rootScope, creditService) {
    // ...
    // var person = $cookieStore.get("persion"),d = new Date();
	console.log($stateParams.cuscode)
	var person = $rootScope.loginPerson,d = new Date(), cuscode = $stateParams.cuscode.split('|')[0], fromcus = $stateParams.cuscode.split('|')[1];
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    //$.extend( $scope.userList, {"jlr":person.user.name});
    $scope.ORDER_DATA_USER={fkxcreport:[],callletter:[],lawyerletter:[],lawsuitinfo:[]};
    $scope.ORDER_DATA={cusname:$stateParams.cusname, cuscode: cuscode};
    $scope.userAdd = function(type){
        var obj= {
            'fkxcreport': {createname: person.user.name, xckcsj: '', cusname: $stateParams.cusname, ysje: '', dzje: '',lslnjyje:'',bgmjorbghj:'', kczk: '', cwsfgf: '', gsgdgc: '',dgdsfgzsy:'',gddgsdsjtr:'',zyyw:'', zygys: '', xckhqjqdcwbg: '',qddzzjl:'',hykbqtkhpj:'',qyfkpjjsxjy:''},
            'callletter': {sendtime: '', contracttype: '', contractno: '', defaultvalue: '', trackinfo: '',updatename:person.user.name,updatedate:$scope.today},
            'lawyerletter': {sendtime: '', contracttype: '', contractno: '', defaultvalue: '', trackinfo: '',updatename:person.user.name,updatedate:$scope.today},
            'lawsuitinfo': {saler: '', deptment: '', contracttype: '', contractno: '', zcssjg: '',layermon:'',zcssfy:'', ssbd: '', ayjs: '', ajcl: '',updatename:person.user.name,updatedate:$scope.today}
        };
        // 2017-4-5 应收及交易状况下的【应收金额】、【呆账金额】、【历史两年交易金额】，在点击风控现场考察报告下的【增加】按钮时，需要提示是否带出【应收及交易状况】当前数据，如选【是】，则带出数据，并且可编辑，如选【否】则不带出
	    if(type=='fkxcreport' && fromcus != 1) {
		    swal({
			    title: "是否带出【应收及交易状况】当前数据？",
			    type: "warning",
			    showCancelButton: true,
			    cancelButtonText: "否",
			    confirmButtonColor: "#DD6B55",
			    confirmButtonText: "是",
			    closeOnConfirm: false
		    }, function () {
			    var param = {'KUNNR': cuscode}
			    var creditData = creditService.credit(param);
			    creditData.success(function (data) {
				    if (data.code == 200) {
					    data = data.rst.data.items;
					    obj[type].ysje = data.ZYSJE;
					    obj[type].dzje = data.ZDZJE;
				    }
			    });
			    var selectcusfkjl = creditService.selectcusfkjl({'KUNNR': cuscode, 'ZDATE': $scope.today}); //付款记录
			    selectcusfkjl.success(function (data) {
				    if (data.code = 200) {
					    $scope.loading = false;
					    data = data.rst.data.items;
					    var lslnjyje = 0;
					    for (var i = 0, l = data.length; i < l; i++) {
						    if (i > 1) {
							    lslnjyje += data[i].ZJYYJ * 1;
						    }
					    }
					    obj[type].lslnjyje = lslnjyje;
				    }
			    });
			    swal.close();
		    });
	    }
		   
        $scope.ORDER_DATA_USER[type].push(obj[type]);
    };
    $scope.userDel = function(idx,type){
        $scope.ORDER_DATA_USER[type].splice(idx,1);
    };

    // 选择合同
    $scope.conBox = function(index, type) {
        var type = type.split("_"),
            order= type.length>1 ? 'ORDER_DATA_USER' : 'ORDER_DATA',
            obj =  $scope[order][type[0]][index];
        $( "#conBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#conBox" ).dialog( "open" );

        $scope.conSelect = function(num,type, name, orgname){
            var sel = {contractno:num, contracttype:type, saler:name, deptment:orgname};
            $.extend(obj, sel);
            $( "#conBox" ).dialog("destroy");
            $(".ui-dialog").remove();
        };
    };

    // 填写客户名称
    //$scope.cusname = $stateParams.cusname;
    //console.log($stateParams)
    // 填写各个表格信息
    var view = creditService.customcreditView({cuscode: cuscode});
    view.success(function(data) {
        if(data.code == 200) {
            if(data.rst.length==0) return false;
            $scope.ORDER_DATA = $.extend('',$scope.ORDER_DATA ,data.rst);
            for(var i= 0,l=$scope.ORDER_DATA.fkxcreport.length; i<l; i++) {
                $scope.ORDER_DATA.fkxcreport[i].xckcsj = $filter("date")($scope.ORDER_DATA.fkxcreport[i].xckcsj, "yyyy-MM-dd");
            }
            for(var i= 0,l=$scope.ORDER_DATA.callletter.length; i<l; i++) {
                $scope.ORDER_DATA.callletter[i].sendtime = $filter("date")($scope.ORDER_DATA.callletter[i].sendtime, "yyyy-MM-dd");
                $scope.ORDER_DATA.callletter[i].updatedate = $filter("date")($scope.ORDER_DATA.callletter[i].updatedate, "yyyy-MM-dd");
            }
            for(var i= 0,l=$scope.ORDER_DATA.lawyerletter.length; i<l; i++) {
                $scope.ORDER_DATA.lawyerletter[i].sendtime = $filter("date")($scope.ORDER_DATA.lawyerletter[i].sendtime, "yyyy-MM-dd");
                $scope.ORDER_DATA.lawyerletter[i].updatedate = $filter("date")($scope.ORDER_DATA.lawyerletter[i].updatedate, "yyyy-MM-dd");
            }
            for(var i= 0,l=$scope.ORDER_DATA.lawsuitinfo.length; i<l; i++) {
                $scope.ORDER_DATA.lawsuitinfo[i].sendtime = $filter("date")($scope.ORDER_DATA.lawsuitinfo[i].sendtime, "yyyy-MM-dd");
                $scope.ORDER_DATA.lawsuitinfo[i].updatedate = $filter("date")($scope.ORDER_DATA.lawsuitinfo[i].updatedate, "yyyy-MM-dd");
            }

            $scope.initData={};
            for (var i in $scope.ORDER_DATA_USER) {
                $scope.initData[i] = [];
                for (var j = 0, l =$scope.ORDER_DATA[i].length; j < l; j++) { // 复制原始数据
                    var edit = false;
                    $scope.initData[i][j] = {};

                    for (var ii in $scope.ORDER_DATA[i][j]) {
                        $scope.initData[i][j][ii] = $scope.ORDER_DATA[i][j][ii];
                    }
                }
            }
        }
    });


    $scope.addData = function(data, data_user,statue){
        var addParam = [];
        var param={doc: {}}, servername='customcreditupdate';

        for(var i in data_user) {
            if (i !== 'fkxcreport') { // 日期由后台拼写
                for (var j = 0, l = data_user[i].length; j < l; j++) {
                    if(data_user[i][j].updatedate == $scope.today) {
                        data_user[i][j].updatedate = '';
                    }
                }
            }
        }
        // 对比 callletter 、lawyerletter 、lawsuitinfo  原有值是否改变，改变的话更新最后更新人和最后更新时间
        for (var i in $scope.initData) {
            if (i !== 'fkxcreport') {
                for (var j = 0, l = $scope.initData[i].length; j < l; j++) { // 比较原始数据
                    var edit = false;
                    for (var ii in $scope.initData[i][j]) {
                        edit = edit || (data[i][j][ii] != $scope.initData[i][j][ii]);
                        //console.log(data[i][j][ii] , $scope.initData[i][j][ii], data[i][j][ii] != $scope.initData[i][j][ii])
                    }
                    if (edit) {
                        data[i][j].updatename = person.user.name;
                        data[i][j].updatedate = '';
                    }
                }
            }
            addParam[i] = data_user[i].concat(data[i]);
        }
        $.extend(true, param.doc, data,data_user, addParam);
	    // 2017-4-7 添加逻辑，不是客户信用列表的数据，维护信息时调用接口createarrwithoutcredit
	    if(fromcus == 1) {
		    servername = 'createarrwithoutcredit';
	    }
        //param.doc = data;
        //prarm.doc.creator = person.user.name;
        if(statue == "save"){
            var addInside = creditService[servername](param); //?
            addInside.success(function(data){
                swal({
                    title: "保存成功",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回列表",
                    closeOnConfirm: true
                }, function(){
                    window.location.href='/index.html#/creditmaintenance';
                });
            });
        }


    };
}]);
// 客户分组
creditApp.controller('customGroupCtrl', ['$scope','$stateParams','$http', 'creditService', function ($scope, $stateParams, $http, creditService) {
    // ...
    $scope.ORDER_NAME = {};
    $scope.getList = function() {
        $scope.dataList = [];
        var serverName = {cusname : 'customGroupList', sunname: 'customGroupListAsSon'}[$scope.ORDER_DATA.type],
            param = {cusname: $scope.ORDER_DATA.cusname};
        var customerPromise = creditService[serverName](param);
        customerPromise.success(function(data) {
            if(data.code == 200) {
                $scope.dataList = data.rst;
            } else {
                swal(data.msg, "", "warning");
                //alert(data.message);
            }
        });
    };

    $scope.searchFn = function() {
        $scope.getList();
    };

    $scope.sunname = false;
    $scope.wrong = false;
    $scope.wrongMother = false;
    // 选择客户名称
    $scope.cusBox = function(){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true,
            dialogClass: 'closeOne'
        });
        $( "#cusBox" ).dialog( "open" );
    };
    $scope.cusSelect = function(id,name){
        $scope.ORDER_NAME.cusname = name;
        $scope.ORDER_NAME.cuscode = id;
        // 校验母公司（存在授信额度）
        var checkMotherName =  creditService.checkMotherName({cuscode:id});
        checkMotherName.success(function(data) {
            if(data.code !== 200) {
                $scope.wrongMother = true;
                $scope.wrongMotherTxt = data.msg;
            } else {
                $scope.wrongMother = false;
                $scope.wrongMotherTxt = '';
            }
        }).error(function(error){
            swal(error, "", "warning");
        });
        $( "#cusBox" ).dialog("destroy");
        $( "#cusBox" ).closest(".ui-dialog").remove();
    };
    $scope.cusBoxSon = function(){
        $( "#cusBoxSon" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true,
            dialogClass: 'closeOne'
        });
        $( "#cusBoxSon" ).dialog( "open" );
    };
    $scope.cusSelect2 = function(id,name){
        $scope.ORDER_NAME.sunname = name;
        $scope.ORDER_NAME.suncode = id;
        // 校验子公司 （没有关联的母公司）
        var checkCusName = creditService.checkCusName({cuscode:id});
        checkCusName.success(function (data) {
            if(data.code !== 200) {
                $scope.wrong = true;
                $scope.wrongTxt = data.msg;
                // $scope.checkAready[0] = 0;
            } else {
                // $scope.checkAready[0] = 1;
                $scope.wrong = false;
                $scope.wrongTxt = '';
                $scope.sunname = true;
            }
        }).error(function(error){
            swal(error, "", "warning");
        });
        $( "#cusBoxSon" ).dialog("destroy");
        //$(".ui-dialog").remove();
        $( "#cusBoxSon" ).closest(".ui-dialog").remove();
    };

    $scope.showAdd = function() {
        $( "#dialog" ).dialog({
            autoOpen: false,
            width: 600,
            modal: true
        });
        $( "#dialog" ).dialog( "open" );
    };
    $scope.isSend = false;
    $scope.addGroup = function(userData){
        // 检测是否填写
        var requiredObj = $scope.userForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.userForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        // 字母公司检测是否有错误
        if($scope.wrong || $scope.wrongMother) {
            swal("页面信息填写有误，请检查后再保存", '', 'warning');
            return false;
        }
        // 避免还未保存用户频繁发起请求
        if($scope.isSend) return false;
        $scope.isSend = true;
        var param = userData;
        var addGroup = creditService.customGroupAdd(param);
        addGroup.success(function(data){
            if(data.code == 200){
                swal("保存成功", '', 'success');
              $scope.ORDER_NAME.sunname = '';
              $scope.ORDER_NAME.cusname = '';

                $( '#dialog' ).dialog( "destroy" );
                //$scope.getList();
            }else{
                swal(data.msg, "", "warning");
            }
            $scope.isSend = false;
        }).error(function(error){
            swal(error, "", "warning");
            $scope.isSend = false;
        });

    };
    //取消分组
    $scope.cancelGroup = function(param, index) {
        //
        /* if(!$scope.selectedTags.length) {
         return false;
         }*/
        swal(
            {
                title: "确定要取消分组吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            },
            function () {
                //var param = $scope.selectedTags;
                var cancelGroup = creditService.customGroupRemove(param);
                cancelGroup.success(function (data) {
                    if (data.code == 200) {
                        $scope.dataList.splice(index, 1);
                        swal('取消分组成功', "", "warning");
                    } else {
                        swal('取消分组失败', "", "warning");
                    }
                }).error(function (error) {
                    swal(error, "", "warning");
                });
            }
        );
    };
    // 暂时不支持批量解除banding
    //选框点击事件
    /* $scope.selected = [];
     $scope.selectedTags = [];
     var updateSelected = function (action, id, moutherid, name) {
     if (action == 'add' && $scope.selected.indexOf(id) == -1) {
     $scope.selected.push(id);
     $scope.selectedTags.push({id: id, moutherid: moutherid});
     }
     if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
     var idx = $scope.selected.indexOf(id);
     $scope.selected.splice(idx, 1);
     $scope.selectedTags.splice(idx, 1);
     }
     };

     $scope.updateSelection = function ($event, id, moutherid) {
     var checkbox = $event.target;
     var action = (checkbox.checked ? 'add' : 'remove');
     updateSelected(action, id, moutherid);
     };
     $scope.isSelected = function (id) {
     return $scope.selected.indexOf(id) >= 0;
     };*/
}]);

// 选择合同
creditApp.controller('contractCtrl', ['$scope','creditService',function($scope,creditService){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, contractno:$scope.contractno, stomer: $scope.stomer, contracttype: $scope.contracttype, receipttype: $scope.receipttype, project: $scope.project};
            var customerPromise = creditService.listInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);

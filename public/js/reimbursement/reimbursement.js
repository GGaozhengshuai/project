/**
 * Created by PC on 2016/7/12.
 */
var reimbursementApp = angular.module('reimbursementApp', ['pageDirectives', 'formDirectives', 'treeControl']);
reimbursementApp.service('reimbursementServices', function ($http) {
    var service = {
        list: function (param) {
            return $http.post('/reimburse/list', param, {cache: false});
        },
        view: function (param) {
            return $http.post('/reimburse/view', param, {cache: true});
        },
        allpyView: function (param) {
            return $http.post('/reimburse/detail', param, {cache: true});
        },
        read: function (param) {
            return $http.post('/reimburse/read', param, {cache: true});
        },
        add: function (param) {
            return $http.post('/reimburse/save', param, {cache: false});
        },
        applyAdd: function (param) {
            return $http.post('/reimburse/createprocess', param, {cache: false});
        },
        // 当期信息接口
        reimlimitperiod: function (param) {
            return $http.post('/reimburse/reimlimitperiod', param, {cache: true});
        },
        // 当年信息接口
        reimlimityear: function (param) {
            return $http.post('/reimburse/reimlimityear', param, {cache: true});
        },
        // 部门全年报销汇总
        orglimityear: function (param) {
            return $http.post('/reimburse/orglimityear', param, {cache: true});
        },
        // 借款未还
        loaning: function (param) {
            return $http.post('/reimburse/loaning', param, {cache: true});
        },
        // 作废
        nullify: function (param) {
            return $http.post('/reimburse/nullify', param, {cache: true});
        },
        newcode: function (param) {  // 流水号
            return $http.post('/reimburse/newcode', param, {cache: true});
        },
        constlist: function (param) {  // 费用种类// 成本中心
            return $http.post('/reimburse/enumlist', param, {cache: false});
        },
        listInside: function (param) { // 费用申请单
            return $http.post('/reimburse/fysqdlist', param, {cache: false});
        },
        fysqdmoney: function (param) { // 可用余额
            return $http.post('/reimburse/fysqdmoney', param, {cache: false});
        },
        orglist: function (param) { //读直接子部门列表
            return $http.post('/reimburselimit/orglist', param, {cache: false});
        },
        listEmployee: function (param) { //读部门列表
            return $http.post('/org/list', param, {cache: false});
        },
        listUser: function (param) {  //根据部门读取人员列表
            return $http.post('/org/userlist', param);
        },
        chargeoff: function (param) {  //冲销
            return $http.post('/reimbursefinance/chargeoff', param);
        },
        markbusiness: function (param) {  //业务标记
            return $http.post('/reimbursefinance/markbusiness', param);
        },
        trans: function (param) {  //财务标记传送
            return $http.post('/reimbursefinance/trans', param);
        },
        userlimitlist: function (param) {  //获取人员额度管理数据
            return $http.post('/reimburselimit/userlimitlist', param);
        },
        userlimitsave: function (param) {  //保存人员额度管理数据
            return $http.post('/reimburselimit/userlimitsave', param);
        },
        orglimitlist: function (param) {  //获取部门额度管理数据
            return $http.post('/reimburselimit/orglimitlist', param);
        },
        orglimitsave: function (param) {  //保存部门额度管理数据
            return $http.post('/reimburselimit/orglimitsave', param);
        },
        //审批接口
        agree: function (param) {//同意
            return $http.post('/reimburse/agree', param, {cache: false});
        },
        disagree: function (param) {//驳回
            return $http.post('/reimburse/disagree', param, {cache: false});
        },
        cancel: function (param) {//取消
            return $http.post('/reimburse/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/reimburse/recall', param, {cache: false});
        }
    };
    return service;
});
// 报销单查询列表
reimbursementApp.controller('reimbursementOrderCtrl', ['$scope', '$stateParams', '$http','$rootScope', '$timeout', '$filter', 'reimbursementServices', function ($scope, $stateParams, $http,$rootScope, $timeout,$filter, service) {
	var vm = $scope;
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
		{name: 'code', displayName: "流水号",  width: 135, cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents link"><a target="_blank" href="index.html#/reimbursementView/{{row.entity.code}}">{{row.entity.code}}</a></div>',pinnedLeft: true},
		{name: 'user.name', displayName: "报销人",  width: 80, cellTooltip: true},
		{name: 'department.name', displayName: "报销部门",  width: 110, cellTooltip: true},
		{name: 'applydate', displayName: "报销申请日期",  width: 110, cellTooltip: true, cellFilter: 'date:\'yyyy-MM-dd\''},
		{name: 'cost.attanum', displayName: "附件张数",  width: 60, cellTooltip: true},
		{name: 'cost.typestr', displayName: "费用种类",  width: 135, cellTooltip: true},
		{name: 'cost.fromdate', displayName: "费用期间-起始月份",  width: 80, cellTooltip: true },
		{name: 'cost.enddate', displayName: "截止月份",  width: 80, cellTooltip: true },
		{name: 'cost.amount', displayName: "报销金额汇总",  width: 120, cellTooltip: true, cellFilter: 'currency : \'￥\''},
		{name: 'finance.due', displayName: "实际财务应付金额",  width: 120, cellTooltip: true, cellFilter: 'currency : \'￥\''},
		{name: 'finance.financedate', displayName: "财务标记时间",  width: 110, cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd HH:mm:ss\''},
		{name: 'finance.businessdate', displayName: "业务标记时间",  width: 100, cellTooltip: true, cellFilter: 'date: \'yyyy-MM-dd HH:mm:ss\''},
		{name: 'finance.certcode', displayName: "会计凭证号",  width: 100, cellTooltip: true},
		{name: 'info.statusTxt', displayName: "状态",  width: 85, cellTooltip: true},
		{
			name: 'actions',
			displayName: "操作",
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
	};



	// ...
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
	        $scope.emptyFn();
            var param = {
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                username: $scope.username,
                costtype: $scope.costtype,
	            code: $scope.code,
	            certcode: $scope.certcode,
                status: $scope.status
            };
            // 2017-1-9 Bug5003
          // 登陆人员角色 包含
          // 改为  判断登陆人的角色是否包含下面四种角色的一种：caiwu_zongjian、caiwu_baoxiao、caiwu_fujingli1、caiwu_fujingli2
          if($rootScope.busiRoles && $rootScope.busiRoles[0] && $rootScope.busiRoles[0].code && ($rootScope.busiRoles[0].code.indexOf('caiwu_zongjian') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_baoxiao') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_fujingli1') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_fujingli2') !== -1)) {
              $.extend(param, {scope: 'all'});
            }
            var customerPromise = service.list(param);
	        customerPromise.success(function (data) {
		        if (data.code = 200) {
			        var list = data.rst.data.items;

			        for(var i=0,len=list.length; i<len; i++) {
			        	list[i].info.statusTxt = {valid:'有效', invalid:'作废'}[list[i].info.status];
			        }

			        if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
			        genTable(vm.tableOptions, vm.tableHeader, list, function (data) {
				        var dataLen = data.data.length;
				        if(dataLen) {
				          vm.loadData = true;
					        if(dataLen < 10) {
					        	$scope.gridHeight = data.data.length * data.rowHeight + data.headerRowHeight + 15;
						       /* angular.element('.grid').height(
							        data.data.length * data.rowHeight + data.headerRowHeight + 15
						        );*/
					        } else {
						        $scope.gridHeight =  10 * data.rowHeight + data.headerRowHeight + 15;
						       /* angular.element('.grid').height(
							        10 * data.rowHeight + data.headerRowHeight + 15
						        );*/
					        }
					        angular.element('.grid').height($scope.gridHeight);
					        vm.table = data;
					        vm.tableSelectRow();
					        console.log('gridHeight', $scope.gridHeight)
				        } else {
					        vm.loadData = false;
					        vm.tableApi = null;
					        vm.table = false;
				        }
			        });
		        }
	        })
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

    $scope.nullifyFn = function (idx) {
        swal({
            title: "确定要作废吗？",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: false
        }, function () {
            // var nullify = service.nullify({docs: [$scope.dataList[idx]]});
            var nullify = service.nullify({docs: [idx]});
            nullify.success(function (data) {
                if (data.code == 200) {
                     swal({
		                title: '报销单作废成功',
		                type: 'success',
		                showCancelButton: false,
		                closeOnConfirm: false
	                },function () {
		                window.location.reload();
	                })
                    // swal('报销单作废成功', '', 'success');
                    // $scope.dataList[idx].info.status = 'nullifyed';
                    // window.location.reload()
                } else {
                    swal(data.rst, '', 'warning');
                }
            })
        });

    }

    $scope.cArr = [];
    $scope.cArrcode = [];
    $scope.cArrstatus = [];
    var updateSelected = function (action, id, code,status, hbing,ZSQNO_HB,ZHB) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrcode.push(code);
            $scope.cArrstatus.push(status);
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrcode.splice(idx, 1);
            $scope.cArrstatus.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, code, status) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, code, status);
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
        $scope.cArrcode = [];
        $scope.cArrstatus = [];
    };
    $scope.allCheck = function (check) {
        // var checkbox = $event.target;
        // $scope.checkAll = checkbox.checked ? true : false;
        // if ($scope.checkAll) {
        if (check) {
            for (var i = 0; i < $scope.dataList.length; i++) {
                $scope.cArr[i] = $scope.dataList[i]._id;
                $scope.cArrcode[i] = $scope.dataList[i].code;
                $scope.cArrstatus[i] = $scope.dataList[i].info.status;
            }
        } else {
            $scope.cArr = [];
            $scope.cArrcode = [];
            $scope.cArrstatus = [];
        }
    };
    // 2017-2-20 修改Bug5780 报销单导出时，如果没有勾选单据，默认导出查询出的所有报销单
    $scope.exportexcel = function () {

	    var path = '/reimburse/exportexcel?', str='';
        if ($scope.cArr.length <= 0) {
            // swal("请勾选列表", "", "warning");
            // return false;
	        var param = [
		        'username='+$scope.username,
		        'costtype='+$scope.costtype,
		        'code='+$scope.code,
		        'certcode='+$scope.certcode,
		        'status='+$scope.status
	        ];
	        if($rootScope.busiRoles && $rootScope.busiRoles[0] && $rootScope.busiRoles[0].code && ($rootScope.busiRoles[0].code.indexOf('caiwu_zongjian') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_baoxiao') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_fujingli1') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_fujingli2') !== -1)) {
		        param[param.length] = 'scope=all'
	        }
	        str = param.join("&")
        } else {
	        var strArr = [];
	        $.each($scope.cArr, function (key, value) {
		        var para = 'ids=' + value;
		        strArr.push(para);
	        });
	        str = strArr.join("&");
        }
        path = path + str;
	    // console.log(path)
        window.open(path);
    };

    // bug5935  导出  报销单(工资) @wangjingfeng  @20170309
    $scope.exportexcelgz = function () {
        var path = '/reimburse/exportexcelgz?', str='';
        var param = [
            // 'costtype='+$scope.costtype,
            // 'status='+$scope.status
        ];
        if($rootScope.busiRoles && $rootScope.busiRoles[0] && $rootScope.busiRoles[0].code && ($rootScope.busiRoles[0].code.indexOf('caiwu_zongjian') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_baoxiao') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_fujingli1') !== -1 || $rootScope.busiRoles[0].code.indexOf('caiwu_fujingli2') !== -1 || $rootScope.busiRoles[0].code.indexOf('renshi_fujingli') !== -1)) {
            param[param.length] = 'scope=all'
        }
        str = param.join("&")
        path = path + str;
        window.open(path);
    };

    $scope.printFn = function (e) {
        if ($scope.cArr.length <= 0) {
            swal("请勾选列表", "", "warning");
            return false;
        }
        for(var i=0,l=$scope.cArrstatus.length; i<l; i++) {
            if ($scope.cArrstatus[i] == 'invalid') {
                swal("已作废的报销单不能打印！", "", "warning");
                return false;
            }
        }
        $(e.target).attr('href', '/print/printbxd.html?uri=/reimburselimit/printview&code=' + $scope.cArrcode.join(';;'));

    };

}]);
// 新增
reimbursementApp.controller('reimbursementAddCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$filter', 'reimbursementServices', function ($scope, $stateParams, $rootScope, $http, $filter, service) {
    // 获取流水号
    // 由后台生成
    /*var newcode = service.newcode();
     newcode.success(function(data) {
     if(data.code == 200) {
     $scope.ORDER_DATA.code = data.rst.code;
     }
     });*/
    var person = $rootScope.loginPerson, d = new Date();
	var parOrg = getField(person.user.parentorgList, 'level', 0);
	parOrg = parOrg || {};
	// console.log('person',person)
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    $scope.ORDER_DATA = {
        fysqd: [{AUFNR: '', costcenter: '', wsyje: '', bcsyje: '',ZSQNR:''}],
        cost: {tripcost: [{startdate: '', origin: '', enddate: '', dest: '', trans: '', money: '', note: ''}]},
        limit: [],
        user: {},
        department: {},
	    extra: {fj:[]}
    };
    // 费用起始月份默认为上个月
    var year = $scope.today.split('-')[0],
        month = $scope.today.split('-')[1];
    if(month=='01') {
        year = year-1;
        month = 12;
    } else {
        month -= 1;
    }
    month = month-10<0 ? '0'+month : month;
    $scope.prevMonth = [year, month].join('-');
    $scope.ORDER_DATA.cost.fromdate = $scope.prevMonth;
    $scope.ORDER_DATA.cost.enddate = $scope.prevMonth;
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user._id = person.user._id;
    $scope.ORDER_DATA.user.login = person.user.login;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department._id = person.user.orgid;
    $scope.ORDER_DATA.user.costype = person.user.costcenter;
    // 成本中心
    var constlist = service.constlist();
    $scope.selectType = {};
    constlist.success(function (data) {
        if (data.code == 200) {
            $scope.selectType.categorySel = data.rst.data.costtype; // 费用种类
            $scope.costcenterSel = data.rst.data.costcenter;    // 成本中心
            // console.log('costcenterSel22',$scope.costcenterSel)
        } else {
            swal(data.msg, '', 'warning');
        }
    })
    // 变更成本中心
    // 清空关联的费用申请单列表
    $scope.changeCoscenter = function () {
        if ($scope.ORDER_DATA.hasfysqd == '1') {
            $scope.ORDER_DATA.fysqd = [{AUFNR: '', costcenter: '', wsyje: '', ZBXJE: '',ZSQNR:''}];
        }
    };

    $scope.typend = false;
    $scope.typejd = false;
    // 费用种类
    $scope.selTypestrFn = function () {
    	// 2017-3-14 如果已经关联了费用申请单，提示用户是否继续修改费用种类，继续修改的话会清空关联的费用申请单信息
	    if($scope.ORDER_DATA.fysqd.length && $scope.ORDER_DATA.fysqd[0].AUFNR) {
		    swal({
			    title: "修改费用类型的话关联的费用申请单信息会被清空，确定要继续修改费用类型吗？",
			    type: "warning",
			    showCancelButton: true,
			    confirmButtonColor: "#DD6B55",
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    closeOnConfirm: true
		    }, function(isConfirm){
		    	if(isConfirm) {
				    $("#costCategory").dialog({
					    autoOpen: false,
					    width: 500,
					    modal: true
				    });
				    $("#costCategory").dialog("open");
			    } else {}
		    });
	    } else {
		    $("#costCategory").dialog({
			    autoOpen: false,
			    width: 500,
			    modal: true
		    });
		    $("#costCategory").dialog("open");
	    }


        $scope.selectTypeFn = function (val) {
            if (!val || !val.category || !val.costtype) {
                swal("请选择费用种类", "", "warning");
                return false;
            }


	        var type1 = val.category.split('-');
            var type = val.costtype.split('-');
	        // 选择费用种类后会清空原来的成本中心，不需要验证了
	        // if($scope.checkCost(type1[0], 1)) { return false}
            $scope.ORDER_DATA.cost.category = type1[0];
            $scope.ORDER_DATA.cost.costtype = type[0];
            $scope.ORDER_DATA.cost.typestr = [type1[1], type[1]].join('-');
	        $scope.invoicetypeOnlyRead = false;
	        // 清空费用申请单信息
	        if($scope.ORDER_DATA.fysqd.length && $scope.ORDER_DATA.fysqd[0].AUFNR) {
		        $scope.ORDER_DATA.fysqd = [];
	        }
            // 差旅费特殊处理
            // $scope.ORDER_DATA.cost.invoicetype = type[0] == '49' ? '1849025' : '';
	        // 2017-2-16 修改逻辑，票据类型提到公用部分
	        // 差旅费需要特殊处理
	        // console.log('type', type[0])
	        if(type[0] == '49') {
		        $scope.ORDER_DATA.cost.invoicetype = '1849025';
		        $scope.ORDER_DATA.cost.invoicetypestr = '差旅费';
		        $scope.invoicetypeOnlyRead = true;
	        }
	        //2017-2-9 Bug5562 报销费用类型与票据类型对应关系
	        // 固定报销-市内交通费 市内交通费1
	        // 固定报销-招待费 招待费
	        // 固定报销-电话费 电话费
	        if(type1[0] == '12') {  // 固定报销
		        if(type[0]=='12') {    // 招待费
			        $scope.ORDER_DATA.cost.invoicetype = '1212048';
			        $scope.ORDER_DATA.cost.invoicetypestr = '业务招待费';
			        $scope.invoicetypeOnlyRead = true;
		        } else if(type[0]=='13') {    // 电话费
			        $scope.ORDER_DATA.cost.invoicetype = '1213049';
			        $scope.ORDER_DATA.cost.invoicetypestr = '电话费';
			        $scope.invoicetypeOnlyRead = true;
		        } else if(type[0]=='16') {    // 市内交通费
			        // $scope.ORDER_DATA.cost.invoicetype = '1216057';
			        // $scope.ORDER_DATA.cost.invoicetypestr = '市内交通费1';
			        // $scope.invoicetypeOnlyRead = true;
		        }
	        }

            // 清空票据类型选中项
            $scope.invoicetype = '';
            $scope.categorySel = val.categorySel[type1[0]].sub[type[0]].sub;
	        // 2017-3-2 Bug6061  固定报销-市内交通费默认票据类型调整
	        if(type[0]=='16') {    // 市内交通费
		        $scope.invoicetype = '1216057|市内交通费1';
	        }
            if(['13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {  // 季度、年度
                // 清空费用期间选中项
                $scope.ORDER_DATA.cost.fromdate = '';
                $scope.ORDER_DATA.cost.enddate = '';
            } else {
                $scope.ORDER_DATA.cost.fromdate = $scope.prevMonth;
                $scope.ORDER_DATA.cost.enddate = $scope.prevMonth;
            }

            // 是否关联费用申请单
            // 当费用种类=固定报销、季度浮动、年度浮动、房屋水电、福利支出时，该字段默认值为否，只读；
            //当费用种类=直接运营费用时，该字段默认值为是，只读，且关联的费用申请单类型必须为直接运营费用；
            //当费用种类=其他业务成本时，该字段默认值为是，只读，且关联的费用申请单类型必须为其他业务成本；
            //  当费用种类=间接运营费用时，该字段默认值为否，可编辑；当值为是时，关联的费用申请单类型必须为间接运营费用；

	        // 2017-1-18 逻辑修改
	        // 当报销人所在一级部门=信息产品事业群、合作业务部、医疗产品部时，选择报销种类=直接运营费用时，必须关联费用申请单；
	        // 当报销人所在一级部门≠信息产品事业群、合作业务部、医疗产品部时，选择报销种类=直接运营费用时，取消必须关联费用申请单限制；

	        // 2017-4-6 新增
	        // 18间接运营子项增加直接运营种类19的子项，新增的直接运营子项关联费用申请单逻辑同直接运营
            $scope.ctype = ['10', '11', '12', '13', '14', '19', '20'].indexOf($scope.ORDER_DATA.cost.category) !== -1;
	        var parOrg = getField(person.user.parentorgList, 'level', 0);
	        parOrg = parOrg || {};
	        if (['19', '20'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
            // if (['20'].indexOf($scope.ORDER_DATA.cost.category) !== -1 || ) {
	            if(['19'].indexOf($scope.ORDER_DATA.cost.category) !== -1 && ['信息产品事业群',"医疗产品部","合作业务部"].indexOf(parOrg.orgname) == -1) {
		            $scope.ORDER_DATA.hasfysqd = '0';
		            $scope.ctype = false;
	            } else {
                    $scope.ORDER_DATA.hasfysqd = '1';
		            $scope.userChangecostType = true;
	            }
            } else if($scope.ORDER_DATA.cost.category=='18') {
		        if( ['12','47','48','49'].indexOf($scope.ORDER_DATA.cost.costtype) == -1 && ['信息产品事业群',"医疗产品部","合作业务部"].indexOf(parOrg.orgname) != -1) {
			        $scope.ORDER_DATA.hasfysqd = '1';
			        $scope.userChangecostType = true;
		        } else {
			        $scope.ORDER_DATA.hasfysqd = '0';
			        $scope.ctype = false;
		        }
	        } else if (['10', '11', '12', '13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
                $scope.ORDER_DATA.hasfysqd = '0';
            }

            $scope.AUARTText = {'19': '直接运营费用', '18': '间接运营费用', '20': '市场费用'}[$scope.ORDER_DATA.cost.category] || '';
            $scope.AUART = {'19': 'ZJ02', '18': 'ZJ99', '20': 'ZJ01'}[$scope.ORDER_DATA.cost.category] || '';
            // console.log('category',$scope.ORDER_DATA.cost.category, $scope.AUART,$scope.AUARTText )

            // 不关联费用申请单时，费用种类=间接运营费用时，成本中心的取值规则同固定报销，且只读；
            // 固定报销-交通补助、招待费、笔记本电脑报销、电话费，成本中心为报销人所在部门对应的成本中心
            // 季度浮动/年度浮动，成本中心的取值同固定报销取值
            // 当报销种类=固定报销-主任津贴时，成本中心= 总经办成本中心，只读
            // console.log(type1[0], type[0])
            $scope.setcostcenter();
            if ($scope.ORDER_DATA.cost.category == '14') {
                $scope.typend = true;
                $scope.typejd = false;
            } else if ($scope.ORDER_DATA.cost.category == '13') {
                $scope.typejd = true;
                $scope.typend = false;
            } else {
                $scope.typend = false;
                $scope.typejd = false;
            }
            $("#costCategory").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
	// 信息产品事业群、医疗产品、合作业务 部门外其他部门直接运营费用成本中心不能选择自己的部门
	$scope.checkCost = function (val, type) {
		if(['5742a607779ec2cb740517f7',"5763cff40a1874d2339d301a","5763cd320a1874d2339d3009"].indexOf(parOrg._id) != -1) {  //这三个部门不处理
			return false;
		}
		var category = $scope.ORDER_DATA.cost.category,
			costcenter = $scope.ORDER_DATA.finance.costcenter;
		if(type==1) {   //选择费用种类
			category = val;
		}
		if(type==2) {   //选择成本中心
			costcenter = val;
		}
		if(!category || !costcenter) {
			return false;
		}
		// 部门id和成本中心code码对应表
		var costOrg = {
			'5745653fc05e086f1d6375c7': '9101A',    //运营管理
			'5746705e4e60fa6e56176410': '9101B',    //财务
			'574b9f8ee8b1244b23393591': '9101C',    //法务
			'574670514e60fa6e5617640f': '9101D',    //风控
			'57ad6fa48e7e8eedc5e31d9a': '9101E',    //总经办
			'57805ea6de594179ac76246a': '9101F',    //技术部
			'57ad6b768e7e8eedc5e31d75': '9101G',    //人力资源
			'57de66dc213748acdd1281f0': '9101H',    //市场部
			'58086e6abe93636896214b5d': '9101I',    //公共关系部
			'58087931be93636896214bf7': '9101J'    //证券事务部
		}, orgid = person.user.orgid;
		// 信息产品事业群、医疗产品、合作业务 部门外其他部门直接运营费用成本中心不能选择自己的部门
		if(category=='19' && costOrg[orgid] == costcenter.substr(0,5)) {
			swal('直接运营费用不可选择本部门的成本中心！', '', 'warning')
			return true;
		}
	};
	// 选择成本中心
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    $scope.selCostcenterFn = function () {
        /*if($scope.ORDER_DATA.finance.costcenter) {
            var sel = getField($scope.costcenterSel,'code',$scope.ORDER_DATA.finance.costcenter);
            $scope.treeselected = sel;
            console.log('sss', sel)
        }*/
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
           if($scope.checkCost(val.code, 2)) { return false}
            $scope.ORDER_DATA.finance.costcenter = val.code;
            $scope.ORDER_DATA.finance.costcenterstr = val.text;

            // 清空费用申请单
            $scope.changeCoscenter();
            // console.log('finance', $scope.ORDER_DATA.finance, val)

            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    // 定位成本中心
    $scope.setcostcenter = function () {
	   // 2017-6-8
	   //  Bug 6998 固定报销-主任津贴，成本中心自动选择报销人所在部门成本中心
        if ($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype == '14') {// 主任津贴
	        var office = person.user.office, obj;
	        if(office) {
		        obj = getField($scope.costcenterSel, 'text', office);
	        }
	        if(!office || !obj) {
		        swal('请先维护办事处','','warning');
		        $scope.ORDER_DATA.finance.costcenter = '';
		        $scope.ORDER_DATA.finance.costcenterstr = '';
	        } else {
		        $scope.ORDER_DATA.finance.costcenter = obj.code;
		        $scope.ORDER_DATA.finance.costcenterstr = office;
	        }
            $scope.fixedcoscenter = true;
        } else if ($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype !== '14' || $scope.ORDER_DATA.cost.category == '18' && $scope.ORDER_DATA.hasfysqd == '0' || ['13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
	        // 固定报销-非主任津贴或 间接运营费不关联费用申请单 / 季度浮动/年度浮动
			// 2017-5-27 6958
	        // 固定报销-高级工程师认证补贴，成本中心默认只读：中建材信息公共成本中心（管理）
            if($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype == '61') {
	            $scope.ORDER_DATA.finance.costcenter = '9109099999';
	            $scope.ORDER_DATA.finance.costcenterstr = '中建信息公共成本中心（管理）';
	            $scope.fixedcoscenter = true;
            } else if($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype == '64') {
	            // 6983 1、新增：固定报销-工程师认证一次性奖励，票据类型：业务招待费，市内交通费1；成本中心：报销人所在部门成本中心；
	            // 2、新增：固定报销-其他奖励，票据类型：业务招待费，市内交通费1；成本中心：总经办成本中心；
	            $scope.ORDER_DATA.finance.costcenter = '9101E00001';
	            $scope.ORDER_DATA.finance.costcenterstr = '总经理办公室成本中心';
	            $scope.fixedcoscenter = true;
            } else {
	            var code = $scope.ORDER_DATA.user.costype;
	            var obj = getField($scope.costcenterSel, 'code', code);
	            $scope.fixedcoscenter = true;
	            // console.log('add',obj, code, $scope.costcenterSel)
	            if (obj) {
		            $scope.ORDER_DATA.finance.costcenter = code;
		            $scope.ORDER_DATA.finance.costcenterstr = obj.text;
	            } else {
		            $scope.ORDER_DATA.finance.costcenter = '';
		            $scope.ORDER_DATA.finance.costcenterstr = '';
		            swal('该人员没有对应的成本中心', '', 'warning');
	            }
            }
        } else {
            $scope.ORDER_DATA.finance.costcenter = '';
            $scope.ORDER_DATA.finance.costcenterstr = '';
            $scope.fixedcoscenter = false;

        }

    };
    $scope.chanegeFYSQD = function () {
	    $scope.userChangecostType = false;
	    // 2016-12-7
	    // 修改逻辑，用户选择关联费用申请单时，成本中心和费用种类由费用申请单带出，不允许用户自己选择
	    $scope.ORDER_DATA.cost.category = '';
	    $scope.ORDER_DATA.cost.costtype = '';
	    $scope.ORDER_DATA.cost.typestr = '';

	    $scope.setcostcenter();

	    // 清空费用申请单信息
	    if($scope.ORDER_DATA.hasfysqd == '0' && $scope.ORDER_DATA.fysqd.length && $scope.ORDER_DATA.fysqd[0].AUFNR) {
		    $scope.ORDER_DATA.fysqd = [];
	    }
        $scope.setcostcenter();
        $scope.getReimlimitperiod();
    };
    $scope.comeAdd = function (type) {
        var obj = {
            'fysqd': {AUFNR: '', costcenter: '', wsyje: '', ZBXJE: '',ZSQNR:''},
            'tripcost': {startdate: '', origin: '', enddate: '', dest: '', trans: '', money: '', note: ''}
        };
        type == 'tripcost' ? $scope.ORDER_DATA.cost.tripcost.push(obj[type])
            : $scope.ORDER_DATA[type].push(obj[type]);
    };
    $scope.comeDel = function (idx, type) {
        if (type == 'tripcost') {
            $scope.ORDER_DATA.cost.tripcost.splice(idx, 1);
            $scope.jtjehzFn();
        } else {
            $scope.ORDER_DATA[type].splice(idx, 1);
            if(type == 'fysqd') {
                // 费用申请单
                // 计算本次使用金额小计
                $scope.ZBXJEBlurFn();
                // 如果一条费用申请单信息都没有的话，清除类型和成本中心
                if(!$scope.ORDER_DATA.fysqd.length) {
                    $scope.ORDER_DATA.cost.costtype = '';
                    $scope.ORDER_DATA.cost.typestr = '';
                    $scope.ORDER_DATA.finance.costcenter = '';
                }
            }
        }
    };
    $scope.jtjehzFn = function () {
        // 计算 差旅报金额
        var jtjehz = 0;
        for (var i = 0, l = $scope.ORDER_DATA.cost.tripcost.length; i < l; i++) {
            if ($scope.ORDER_DATA.cost.tripcost[i].money) {
                jtjehz += $scope.ORDER_DATA.cost.tripcost[i].money * 1;
            }
        }
        $scope.ORDER_DATA.cost.jtjehz = jtjehz;
    };
    $scope.amountclsum = function () {
        $scope.amountcl = $scope.ORDER_DATA.cost.citytranscost * 1 + $scope.ORDER_DATA.cost.accomcost * 1 + $scope.ORDER_DATA.cost.othercost * 1 + $scope.ORDER_DATA.cost.jtjehz * 1;
        $scope.ORDER_DATA.cost.amount = ($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1 ? $scope.ORDER_DATA.amount : $scope.amountcl;
	    // console.log($scope.invoicetypeOnlyRead,$scope.ORDER_DATA.cost.invoicetype, $scope.invoicetype,($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025'), $scope.ORDER_DATA.amount, $scope.amountcl,$scope.ORDER_DATA.cost.amount)
	    $scope.getReimlimitperiod();
    };

    $scope.$watch('ORDER_DATA.cost.jtjehz', function (newvalue, oldvalue) {
        if (newvalue == oldvalue) return false;
        $scope.amountclsum();
    })
    $scope.$watch('ORDER_DATA.amount', function (newvalue, oldvalue) {
        if (!oldvalue && (newvalue == oldvalue)) return false;
        $scope.ORDER_DATA.cost.amount = ($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1 ? $scope.ORDER_DATA.amount : $scope.amountcl;

    })
    // $scope.ORDER_DATA.amount2 = $scope.ORDER_DATA.citytranscost*1 + $scope.ORDER_DATA.accomcost*1 + $scope.ORDER_DATA.othercost*1 + $scope.ORDER_DATA.jtjehz*1;
    // 财务信息
    //添加费用申请
    $scope.purchaseClick = function (i) {
        // 判断是否已经选择成本中心
        /*var costcenter = $scope.ORDER_DATA.finance.costcenter;
        if (!costcenter) {
            swal('请先选择成本中心', '', 'warning');
            return false;
        }*/
        // 清空之前展示的列表
        $scope.dataList = [];
        // console.log('costcenter',costcenter)
        /*$scope.costcenterOn = costcenter;
        $scope.PRCTRCode = costcenter;*/

        /*setTimeout(function () {
         $scope.$apply(function () {
         $scope.PRCTRText = costcenter
         })
         })*/
        $("#fysqBox").dialog({
            autoOpen: false,
            width: 850,
            maxHeight: 540,
            modal: true
        });
        $("#fysqBox").dialog("open");
	    if($scope.ORDER_DATA.fysqd.length > 1) {
		    $scope.FYZFYLXTxt = [$scope.ORDER_DATA.cost.typestr.split('-')[0], $scope.ORDER_DATA.cost.typestr.split('-')[1]].join('-');
		    $scope.FYZFYLX = $scope.ORDER_DATA.fysqd[0].ZFYLX.substr(0,4);
		    $scope.FYcostcenter = $scope.ORDER_DATA.finance.costcenter;
	    } else {
		    $scope.FYZFYLXTxt = '';
		    $scope.FYZFYLX = '';
		    $scope.FYcostcenter = '';
	    }
        $scope.searchFn = function () {
            if(!$scope.AUFNR && !$scope.ZINORD) {
                swal('请输入费用申请单号或者申请流水号！','','warning');
                return false;
            }
            var customerPromise = service.listInside({
                AUFNR: $scope.AUFNR,
	            ZINORD: $scope.ZINORD,
                // USER0: $scope.USER0,
                costcenter: $scope.FYcostcenter,
	            ASTNR: '02',
                ZFYLX: $scope.FYZFYLX
            });
            // var customerPromise = service.listInside({AUFNR:$scope.AUFNR, USER0: $scope.USER0});
            customerPromise.success(function (data) {
                if (data.code == 200) {
                    $scope.dataList = data.rst.items;
                    for(var i=0,l=$scope.dataList.length; i<l; i++) {
                        var ZFYLX = $scope.dataList[i].ZFYLX;
                        var type=son='';

                        /*if(ZFYLX.substr(0,2)=='18') {
                            type = '18';
                            son = '12';
                        } else if(ZFYLX.substr(0,2)=='19') {
                            if(ZFYLX=='1952'){
                                type = '20';
                                son = '57';
                            } else {
                                type = '19';
                                son = ZFYLX.substr(2,2);
                            }
                        }*/
	                    type = ZFYLX.substr(0,2);
	                    son = ZFYLX.substr(2,2);

                        // $scope.dataList[i].ZFYLX = [type,son].join('');
	                    var textArr = [$scope.selectType.categorySel[type].text, $scope.selectType.categorySel[type].sub[son].text];
	                    if(ZFYLX.substr(4).length) {
		                    textArr.push($scope.selectType.categorySel[type].sub[son].sub[ZFYLX].text);
	                    }
                        $scope.dataList[i].ZFYLXTxt = textArr.join('-');
                    }
                }
            })
        }
        $scope.cusSelect = function (AUFNR,ZFYLX,ZFYLXTxt,RESPCCTR,ZSQNR,ZINORD) {

            var obj = {AUFNR: AUFNR, wsyje: 0,ZFYLX:ZFYLX, ZFYLXTxt:ZFYLXTxt,RESPCCTR:RESPCCTR,ZSQNR:ZSQNR,ZINORD:ZINORD};
            // 获取可用余额
            var fysqdmoney = service.fysqdmoney({AUFNR: AUFNR});
            fysqdmoney.success(function (data) {
                if (data.code == 200) {
                    obj.wsyje = data.rst.total - data.rst.used - data.rst.using;
                    $.extend(true, $scope.ORDER_DATA.fysqd[i], obj);
                    $scope.ORDER_DATA.finance.costcenter = RESPCCTR;
                    // 费用申请单间接运营 - 间接运营费用-招待费
                    // 费用申请单直接运营费用-市场费用 - 其他业务成本-其他业务成本
                    // 费用申请单直接运营其他费用 - 直接运营其他费用

                    // 清空票据类型选中项
                    $scope.invoicetype = '';
	                var txt = ZFYLXTxt.split('-');
                    $scope.categorySel = $scope.selectType.categorySel[ZFYLX.substr(0,2)].sub[ZFYLX.substr(2,2)].sub;
                    $scope.ORDER_DATA.cost.typestr = [txt[0],txt[1]].join('-');
                    $scope.ORDER_DATA.cost.category = ZFYLX.substr(0,2);
                    $scope.ORDER_DATA.cost.costtype = ZFYLX.substr(2,2);
                    // $scope.ORDER_DATA.cost.invoicetypestr = ZFYLX.substr(4);
	                if(txt.length>2) {
		                $scope.invoicetype = [ZFYLX,txt[2]].join('|');
		                // $scope.ORDER_DATA.cost.invoicetype = ZFYLX;
		                // $scope.ORDER_DATA.cost.invoicetypestr = txt[2];
		                // $scope.invoicetypeOnlyRead = true;
	                }
                } else {
                    swal('获取未使用金额失败', '', 'warning');
                }
                $("#fysqBox").dialog("destroy");
                $(".ui-dialog").remove();
            });
        }
    };
    $scope.ZBXJEBlurFn = function () {
        var total = 0;
        for (var i = 0, l = $scope.ORDER_DATA.fysqd.length; i < l; i++) {
            total += $scope.ORDER_DATA.fysqd[i].ZBXJE * 1;
        }
        $scope.ZBXJETotal = total;
    };
    // 变更是否有增值税发票
    $scope.changehaszzs = function (d) {
        if(d!='是'){
            $scope.ORDER_DATA.cost.tax = '';
        }
    };
    // 获取借款未还
    var loaning = service.loaning();
    loaning.success(function (data) {
        $scope.ORDER_DATA.finance.loan = data.rst.amount;
        // $scope.ORDER_DATA.finance.loan = $filter('number')($scope.ORDER_DATA.finance.loan, '2');
        // $scope.ORDER_DATA.finance.returnmoney = $filter('number')(data.rst.amount, '2');
    })
    // 获取当期信息接口
    $scope.getReimlimitperiod = function () {
        if (!$scope.ORDER_DATA.cost.fromdate || !$scope.ORDER_DATA.cost.enddate || !$scope.ORDER_DATA.cost.category || !$scope.ORDER_DATA.cost.costtype || $scope.ORDER_DATA.cost.fromdate > $scope.ORDER_DATA.cost.enddate) {
            return false;
        }
        // var amount = ($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1 ? $scope.ORDER_DATA.amount : ( $scope.ORDER_DATA.citytranscost * 1 + $scope.ORDER_DATA.accomcost * 1 + $scope.ORDER_DATA.othercost * 1 + $scope.ORDER_DATA.cost.jtjehz * 1);
        var amount = $scope.ORDER_DATA.cost.amount;
        var param = {
            fromdate: $scope.ORDER_DATA.cost.fromdate,
            enddate: $scope.ORDER_DATA.cost.enddate,
            category: $scope.ORDER_DATA.cost.category,
            costtype: $scope.ORDER_DATA.cost.costtype,
            amount: amount,
            hasfysqd: $scope.ORDER_DATA.hasfysqd
        };
        var reimlimitperiod = service.reimlimitperiod(param);
        reimlimitperiod.success(function (data) {
            if (data.code == 200) {
                $scope.ORDER_DATA.limit = data.rst.data.items;
            }
        })
    };
    $scope.dateCallback = function (data) {
        // 年度浮动，填写截止年度
        if (['14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
            $scope.ORDER_DATA.cost.enddate = $scope.ORDER_DATA.cost.fromdate;
        }
        // 季度浮动，填写起始时间、截止时间
        if (['13'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
            if (!$scope.fromdate || !$scope.fromdatejd || !$scope.enddatejd) {
                return false;
            }
            $scope.ORDER_DATA.cost.fromdate = [$scope.fromdate, $scope.fromdatejd].join('-');
            $scope.ORDER_DATA.cost.enddate = [$scope.fromdate, $scope.enddatejd].join('-');
        }
        // 起始月份、截止月份需为同一年度
        if ($scope.ORDER_DATA.cost.fromdate && $scope.ORDER_DATA.cost.enddate) {
            if (['14'].indexOf($scope.ORDER_DATA.cost.category) == -1) {
                var from = $scope.ORDER_DATA.cost.fromdate.split('-'),
                    end = $scope.ORDER_DATA.cost.enddate.split('-');
                if (from[0] != end[0]) {
	                // 2017-2-9 5589 报销单选择跨年日期时，给予提示后，点击确定，需清空选择时间（起止时间都清空）
	                swal({
	                	title: "费用期间-起始时间和截止时间必需为同一年度",
		                text: "",
		                type: "warning"
	                }, function(){
		                setTimeout(function() {
			                $scope.$apply(function () {
				                $scope.ORDER_DATA.cost.fromdate = '';
				                $scope.ORDER_DATA.cost.enddate = '';
			                })
		                })
	                });


	                return false;
                }
                if (from[1] - end[1] > 0) {
                	// 2017-3-14 优化，修改起始时间时，只清空，不提示
                    if(data){
                    	swal('费用期间-截止时间不能小于起始时间', '', 'warning');
                    }
                    // 清空截止时间
                    if(['13'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
                      $scope.enddatejd = '';
                    } else {
                      setTimeout(function () {
                          $('#enddate').val("");
                        },0)
                      $scope.ORDER_DATA.cost.enddate = '';


                    }
                    return false;
                }
            } else {
                if (data && ($scope.ORDER_DATA.cost.fromdate - $scope.ORDER_DATA.cost.enddate > 0)) {
                    swal('费用期间-截止时间不能小于起始时间', '', 'warning');
                    return false;
                }
            }
        } else {
            return false;
        }
        $scope.getReimlimitperiod();
        $scope.getReimlimityear();
    };


    $scope.$watch('ORDER_DATA.cost.costtype', function (newVal, oldVal) {
        $scope.getReimlimitperiod();
        $scope.getReimlimityear();
    });
    // 当年报销信息
    $scope.getReimlimityear = function () {
        if (!$scope.ORDER_DATA.cost.fromdate || !$scope.ORDER_DATA.cost.enddate || !$scope.ORDER_DATA.cost.category || !$scope.ORDER_DATA.cost.costtype || $scope.ORDER_DATA.cost.fromdate > $scope.ORDER_DATA.cost.enddate) {
            return false;
        }
        var param = {
            year: $scope.ORDER_DATA.cost.fromdate.split('-')[0],
            category: $scope.ORDER_DATA.cost.category,
            costtype: $scope.ORDER_DATA.cost.costtype
        };
        // console.log(param);
        var reimlimityear = service.reimlimityear(param);
        reimlimityear.success(function (data) {
            if (data.code == 200) {
                $scope.reimlimityearData = [data.rst.data];
            }
        })
    };
	// 删除附件
	$scope.delupload = function(idx, type){
		$scope[type].splice(idx,1);
	}

    $scope.addData = function (data, statue) {
        // console.log('data::', data)
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        // 有关联清单时候费用申请单详情必填
        if ($scope.ORDER_DATA.hasfysqd == '1' && !$scope.ORDER_DATA.fysqd.length) {
            swal('请填写费用申请单信息！', '', 'warning');
            return false;
        }
        if(!$scope.ORDER_DATA.cost.amount || $scope.ORDER_DATA.cost.amount==0) {
          swal('报销单金额不能为零！', '', 'warning');
          return false;
        }
        // 2017-1-20 差旅费时 明细列表必填
        if((($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') != -1) && !$scope.ORDER_DATA.cost.tripcost.length) {
	        swal('请填写差旅报销明细！', '', 'warning');
	        return false;
        }
        // 本次还款金额不能大于借款未还金额
        if ($scope.ORDER_DATA.finance.returnmoney - $scope.ORDER_DATA.finance.loan > 0) {
            swal('本次还款金额不能大于借款未还金额！', '', 'warning');
            return false;
        }
        // 本次还款金额不能大于报销金额
        if ($scope.ORDER_DATA.finance.returnmoney - $scope.ORDER_DATA.cost.amount > 0) {
          swal('本次还款金额不能大于报销金额！', '', 'warning');
          return false;
        }
        // 固定报销中，如果额度超了，是要禁止提交的
        // 间接费用,报销人所在部门为非信息产品事业群时，报销金额不能大于个人已分配额度；报销人所在部门为信息产品事业群时，不做额度校验
        // 报销类型=季度浮动/年度浮动时，有额度管理；报销人在提交单据时系统需判断是否超个人额度，超过就不允许提交
	    // 2017-1-13 Bug5271 所有人提交报销单时，费用种类=间接运营费用时，提交时不做个人额度校验，即个人无额度也可提交；当一级领导审批时对一级部门可用额度做判断，超过时则审批报错；
        var parOrg = getField(person.user.parentorgList, 'level', 0);
	    if (['12', '13', '14', '18'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
		    // if ($scope.ORDER_DATA.cost.category == '12') {
		    // 2016-11-29 修改限制逻辑，去掉原来的，所选范围有未分配额度时不允许提交限制
		    /*$scope.unvirtual=[];
		     for(var i=0,l=$scope.ORDER_DATA.limit.length; i<l; i++) {
		     if($scope.ORDER_DATA.limit[i].virtual !== '1') {
		     $scope.unvirtual.push($scope.ORDER_DATA.limit[i]);
		     }
		     }
		     if ($scope.ORDER_DATA.limit.length && $scope.unvirtual.length==$scope.ORDER_DATA.limit.length) {
		     if (['12', '13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1 || $scope.ORDER_DATA.cost.category == '18' && parOrg.orgname == "信息产品事业群") {
		     var val = $scope.ORDER_DATA.limit[$scope.ORDER_DATA.limit.length - 1];
		     if (val.amount - val.used - val.using < 0) {
		     swal('超过本期分配额度', '', 'warning');
		     return false;
		     }
		     }

		     } else {
		     swal('所选范围有未分配额度的，不允许提交', '', 'warning');
		     return false;
		     }*/
		    if ($scope.ORDER_DATA.hasfysqd == '0') {
			    $scope.unvirtual = {};
			    for (var i = 0, l = $scope.ORDER_DATA.limit.length; i < l; i++) {
				    if ($scope.ORDER_DATA.limit[i].virtual !== '1') {
					    $scope.unvirtual = $scope.ORDER_DATA.limit[i];
				    }
			    }
			    if ($scope.ORDER_DATA.limit.length) {
				    if (['12', '13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1 /*|| $scope.ORDER_DATA.cost.category == '18' && parOrg.orgname !== "信息产品事业群"*/) {
					    if ($.isEmptyObject($scope.unvirtual)) {
						    swal('还未分配额度', '', 'warning');
						    return false;
					    } else {
						    var val = $scope.unvirtual;
						    if (val.amount - val.used - val.using < 0) {
							    swal('超过本期分配额度', '', 'warning');
							    return false;
						    }
					    }
				    }

			    } else {
				    swal('还未分配额度', '', 'warning');
				    return false;
			    }
		    }
	    }
        //  关联费用申请单后，报销金额必须等于费用申请单中“本次使用金额”之和且不大于未使用金额,否则禁止提交
        if ($scope.ORDER_DATA.hasfysqd == '1') {
            for (var i = 0, l = $scope.ORDER_DATA.fysqd.length; i < l; i++) {
                var list = $scope.ORDER_DATA.fysqd[i];
                if (list.ZBXJE > list.wsyje) {
                    swal('信息填写有误，请检查修改后再保存提交！', '', 'warning');
                    return false;
                }
            }
            // console.log($scope.ZBXJETotal ,$scope.ORDER_DATA.cost.amount)
            if ($scope.ZBXJETotal != $scope.ORDER_DATA.cost.amount) {
                swal('报销金额必须等于费用申请单中“本次使用金额”之和！', '', 'warning');
                return false;
            }
        } else {    // 不关联费用申请单时，fysqd  为空数组
            $scope.ORDER_DATA.fysqd = [];
        }
        // 成本中心
        /*if (!$scope.fixedcoscenter) {
            var costcenter = $scope.costcentersubsubsub || $scope.costcentersubsub || $scope.costcentersub || $scope.costcenter;
            console.log('costcenter', costcenter)
            $scope.ORDER_DATA.finance.costcenter = costcenter.split('|')[2];
            $scope.ORDER_DATA.finance.costcenterstr = costcenter.split('|')[1];
            $scope.ORDER_DATA.finance.costcenterall = [$scope.costcenter, $scope.costcentersub, $scope.costcentersubsub, $scope.costcentersubsubsub].join('==');
        }*/
        // 票据类型
        if ($scope.invoicetype) {
            $scope.ORDER_DATA.cost.invoicetypestr = $scope.invoicetype.split('|')[1];
            $scope.ORDER_DATA.cost.invoicetype = $scope.invoicetype.split('|')[0];
        }
        // 本次报销金额
        // $scope.ORDER_DATA.cost.amount = $scope.ORDER_DATA.cost.costtype.indexOf('49') == -1 ? $scope.ORDER_DATA.amount : $scope.ORDER_DATA.amountcl;
        // $scope.ORDER_DATA.finance.returnmoney = $scope.ORDER_DATA.cost.amount > $scope.ORDER_DATA.finance.loan ? $scope.ORDER_DATA.finance.loan : $scope.ORDER_DATA.finance.amount;
        $scope.ORDER_DATA.finance.due = $scope.ORDER_DATA.cost.amount - $scope.ORDER_DATA.finance.returnmoney;
	    // 2017-3-3增加逻辑，非差旅费时清空差旅费列表，避免脏数据
	    if(($scope.ORDER_DATA.cost.invoicetype.indexOf('025') == -1) && $scope.ORDER_DATA.cost.tripcost.length) {
		    $scope.ORDER_DATA.cost.tripcost = [];
	    }
        var addParam = {};
        data.extra.fj = $scope.fj;
        var param = {processId: $scope.processId, nodeId: $scope.nodeId};
        addParam.doc = {model: data};
        param.doc = {model: data};
        //prarm.doc.creator = person.user.name;
        if (statue == "save") {
            var addInside = service.add(param);
            addInside.success(function (data) {
                // 有些时候错误了但会保存到草稿，所以先赋值
                $scope.processId = data.rst.processId;
                $scope.nodeId = data.rst.nodeId;
                if (data.code == 200) {
                    swal("保存成功", "", "success");
                } else {
                    alert(data.msg);
                }
            });
        } else if (statue == 'apply') {
            var applyAdd = service.applyAdd(param);
            applyAdd.success(function (data) {
                if (data.code == 200) {
	                // 2017-1-19 不知道为什么有时候提交审批后页面跳转没生效，导致用户重复提交
	                // 为避免重复提交接口调用成功后对nodeId和processId 赋值
	                $scope.processId = data.rst.processId;
	                $scope.nodeId = data.rst.nodeId;
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                    	window.setTimeout(function () {
		                    window.location.href = '/index.html#/reimbursementOrder';
	                    },1)
                    });
                } else {
                    alert(data.msg);
                }
            });
        }
    };

}]);
// 编辑
reimbursementApp.controller('reimbursementEditCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$filter', 'reimbursementServices', function ($scope, $stateParams, $rootScope, $http, $filter, service) {
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    var viewCont = service.allpyView(param);
    var person = $rootScope.loginPerson;
	var parOrg = getField(person.user.parentorgList, 'level', 0);
	parOrg = parOrg || {};

    viewCont.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.loading = false;
            $scope.ORDER_DATA = $.extend(true, {extra:{fj:[]}},data.rst.doc.model);
	        $scope.fj = $scope.ORDER_DATA.extra.fj;
            // 2016-12-29 因为新建时候保存的成本中心不一定是当前用户现在所属的成本中心（上线后应该就不会变来变去了）
            // 所以当前登陆用户所属的成本中心还取login里面的
            $scope.ORDER_DATA.user.costype = person.user.costcenter;
            // 计算 差旅报金额
            var jtjehz = 0;
            for (var i = 0, l = $scope.ORDER_DATA.cost.tripcost.length; i < l; i++) {
                if ($scope.ORDER_DATA.cost.tripcost[i].money) {
                    jtjehz += $scope.ORDER_DATA.cost.tripcost[i].money * 1;
                }
            }
            $scope.ORDER_DATA.cost.jtjehz = jtjehz;

            // 获取借款未还
            var loaning = service.loaning();
            loaning.success(function (data) {
                $scope.ORDER_DATA.finance.loan = data.rst.amount;
                // $scope.ORDER_DATA.finance.loan = $filter('number')($scope.ORDER_DATA.finance.loan, '2');
                // $scope.ORDER_DATA.finance.returnmoney = $filter('number')(data.rst.amount, '2');
            })

            // 票据类型
            $scope.invoicetype = [$scope.ORDER_DATA.cost.invoicetype, $scope.ORDER_DATA.cost.invoicetypestr].join('|');

	        //2017-2-9 Bug5562 报销费用类型与票据类型对应关系
	        // 2017-3-2 6061 市内交通费可选
	        // 固定报销-市内交通费 市内交通费1
	        // 固定报销-招待费 招待费
	        // 固定报销-电话费 电话费
	        $scope.invoicetypeOnlyRead = false;
	        // if(['1212048', '1213049', '1216057','1849025'].indexOf($scope.ORDER_DATA.cost.invoicetype) !== -1) {
	        if(['1212048', '1213049','1849025'].indexOf($scope.ORDER_DATA.cost.invoicetype) !== -1) {
			   $scope.invoicetypeOnlyRead = true;
	        }

            if (($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1) {
                $scope.ORDER_DATA.amount = $scope.ORDER_DATA.cost.amount;
                $scope.amountcl = 0;
            } else {
                $scope.amountcl = $scope.ORDER_DATA.cost.amount;
                $scope.ORDER_DATA.amount = 0;
            }

            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            // 计算费用申请单总额
            $scope.ZBXJEBlurFn();
            // 成本中心
            var constlist = service.constlist();
            $scope.selectType = {};
            constlist.success(function (data) {
                if (data.code == 200) {
                    $scope.selectType.categorySel = data.rst.data.costtype; // 费用种类
                    $scope.categorySel = $scope.selectType.categorySel[$scope.ORDER_DATA.cost.category].sub[$scope.ORDER_DATA.cost.costtype.substr(-2)].sub;
                    $scope.costcenterSel = data.rst.data.costcenter;    // 成本中心
                    $scope.setcostcenter(true);
                    // 成本中心为可修改下拉框时定位
                    /*if (!$scope.fixedcoscenter) {
                        // 定位成本中心
                        //  || "0|信息产品事业群|==1|软件及应用事业部|==2|Oracle销售成本中心|9100A22022=="
                        var costcenter = $scope.ORDER_DATA.finance.costcenterall;
                        costcenter = costcenter.split('==');
                        for (var i = 0, l = costcenter.length; i < l; i++) {
                            var sub = ['', 'sub', 'subsub', 'subsubsub'][i];
                            $scope['costcenter' + sub] = costcenter[i];
                        }
                    }*/
                } else {
                    swal(data.msg, '', 'warning');
                }
            });
            // 是否关联费用申请单
            $scope.ctype = ['10','11','12', '13', '14', '20'].indexOf($scope.ORDER_DATA.cost.category) !== -1
                            || (['19'].indexOf($scope.ORDER_DATA.cost.category) !== -1 && ['信息产品事业群',"医疗产品部","合作业务部"].indexOf(parOrg.orgname) != -1);
            $scope.AUARTText = {'19': '直接运营费用', '18': '间接运营费用', '20': '市场费用'}[$scope.ORDER_DATA.cost.category] || '';
            $scope.AUART = {'19': 'ZJ02', '18': 'ZJ99', '20': 'ZJ01'}[$scope.ORDER_DATA.cost.category] || '';

	        // 当期信息可能会用到费用种类，需要在费用种类获取到后再获取
	        // 获取当期信息
	        $scope.getReimlimitperiod();
	        // 获取当年信息
	        $scope.getReimlimityear();
        } else {
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }

    });
	// 删除附件
	$scope.delupload = function(idx, type){
		$scope[type].splice(idx,1);
	}
    // 变更成本中心
    // 清空关联的费用申请单列表
    $scope.changeCoscenter = function () {
        if ($scope.ORDER_DATA.hasfysqd == '1') {
            $scope.ORDER_DATA.fysqd = [{AUFNR: '', costcenter: '', wsyje: '', ZBXJE: '',ZSQNR:''}];
        }
    };
    // 选择成本中心
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    };
	// 信息产品事业群、医疗产品、合作业务 部门外其他部门直接运营费用成本中心不能选择自己的部门
	$scope.checkCost = function (val, type) {
		if(['5742a607779ec2cb740517f7',"5763cff40a1874d2339d301a","5763cd320a1874d2339d3009"].indexOf(parOrg._id) != -1) {  //这三个部门不处理
			return false;
		}
		var category = $scope.ORDER_DATA.cost.category,
			costcenter = $scope.ORDER_DATA.finance.costcenter;
		if(type==1) {   //选择费用种类
			category = val;
		}
		if(type==2) {   //选择成本中心
			costcenter = val;
		}
		if(!category || !costcenter) {
			return false;
		}
		// 部门id和成本中心code码对应表
		var costOrg = {
			'5745653fc05e086f1d6375c7': '9101A',    //运营管理
			'5746705e4e60fa6e56176410': '9101B',    //财务
			'574b9f8ee8b1244b23393591': '9101C',    //法务
			'574670514e60fa6e5617640f': '9101D',    //风控
			'57ad6fa48e7e8eedc5e31d9a': '9101E',    //总经办
			'57805ea6de594179ac76246a': '9101F',    //技术部
			'57ad6b768e7e8eedc5e31d75': '9101G',    //人力资源
			'57de66dc213748acdd1281f0': '9101H',    //市场部
			'58086e6abe93636896214b5d': '9101I',    //公共关系部
			'58087931be93636896214bf7': '9101J'    //证券事务部
		}, orgid = person.user.orgid;
		// 信息产品事业群、医疗产品、合作业务 部门外其他部门直接运营费用成本中心不能选择自己的部门
		if(category=='19' && costOrg[orgid] == costcenter.substr(0,5)) {
			swal('直接运营费用不可选择本部门的成本中心！', '', 'warning')
			return true;
		}
	};
    $scope.selCostcenterFn = function () {
        /*if($scope.ORDER_DATA.finance.costcenter) {
         var sel = getField($scope.costcenterSel,'code',$scope.ORDER_DATA.finance.costcenter);
         $scope.treeselected = sel;
            $scope.treeexpandedNodes = [sel];
         }*/
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 500,
            modal: true
        });
        $("#costCenterDialog").dialog("open");

        $scope.groupsTreeModel = $scope.costcenterSel;

        //item click
        $scope.showSelected = function (sel) {
            //alert(sel.name);
            $scope.selectedNode = sel;
            // console.log('sel', sel)
        };


        $scope.selectTypeFn = function () {
            var val = $scope.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
	        if($scope.checkCost(val.code, 2)) { return false}

	        $scope.ORDER_DATA.finance.costcenter = val.code;
            $scope.ORDER_DATA.finance.costcenterstr = val.text;
            // 清空费用申请单
            $scope.changeCoscenter();
            // console.log('finance', $scope.ORDER_DATA.finance, val)

            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    // 定位成本中心
    $scope.setcostcenter = function (init) {
        if ($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype == '14') {// 主任津贴
            if (!init) {
                /*$scope.ORDER_DATA.finance.costcenter = '9101E00001';
                $scope.ORDER_DATA.finance.costcenterstr = '总经理办公室成本中心';*/

	            var office = person.user.office, obj;
	            if(office) {
		            obj = getField($scope.costcenterSel, 'text', office);
	            }
	            if(!office || !obj) {
		            swal('请先维护办事处','','warning');
		            $scope.ORDER_DATA.finance.costcenter = '';
		            $scope.ORDER_DATA.finance.costcenterstr = '';
	            } else {
		            $scope.ORDER_DATA.finance.costcenter = obj.code;
		            $scope.ORDER_DATA.finance.costcenterstr = office;
	            }

            }

            $scope.fixedcoscenter = true;
        } else if ($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype !== '14' || $scope.ORDER_DATA.cost.category == '18' && $scope.ORDER_DATA.hasfysqd == '0' || ['13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
            // 固定报销-非主任津贴或 间接运营费不关联费用申请单
	        if($scope.ORDER_DATA.cost.category == '12' && $scope.ORDER_DATA.cost.costtype == '61') {
		        $scope.ORDER_DATA.finance.costcenter = '9109099999';
		        $scope.ORDER_DATA.finance.costcenterstr = '中建信息公共成本中心（管理）';
		        $scope.fixedcoscenter = true;
	        } else {
		        if (!init) {
			        var code = $scope.ORDER_DATA.user.costype;
			        var obj = getField($scope.costcenterSel, 'code', code);
			        // console.log('edit',obj, code, $scope.costcenterSel)
			        if (obj) {
				        $scope.ORDER_DATA.finance.costcenter = code;
				        $scope.ORDER_DATA.finance.costcenterstr = obj.text;
			        } else {
				        $scope.ORDER_DATA.finance.costcenter = '';
				        $scope.ORDER_DATA.finance.costcenterstr = '';
				        swal('该人员没有对应的成本中心', '', 'warning');
			        }
		        }
	        }
            $scope.fixedcoscenter = true;
        } else {
            if (!init) {
                $scope.ORDER_DATA.finance.costcenter = '';
                $scope.ORDER_DATA.finance.costcenterstr = '';
            }
            $scope.fixedcoscenter = false;

        }


    };
    $scope.chanegeFYSQD = function () {
        $scope.setcostcenter();
        // 获取当期信息
        $scope.getReimlimitperiod();
        // 2016-12-7
        // 修改逻辑，用户选择关联费用申请单时，成本中心和费用种类由费用申请单带出，不允许用户自己选择
	    $scope.ORDER_DATA.cost.category = '';
	    $scope.ORDER_DATA.cost.costtype = '';
	    $scope.ORDER_DATA.cost.typestr = '';

	    $scope.setcostcenter();
	    // 清空费用申请单信息
	    if($scope.ORDER_DATA.hasfysqd == '0' && $scope.ORDER_DATA.fysqd.length && $scope.ORDER_DATA.fysqd[0].AUFNR) {
		    $scope.ORDER_DATA.fysqd = [];
	    }

    };
    // 变更是否有增值税发票
    $scope.changehaszzs = function (d) {
        if(d!='是'){
            $scope.ORDER_DATA.cost.tax = '';
        }
    };
    // 费用种类
    $scope.selTypestrFn = function () {
	    // 2017-3-14 如果已经关联了费用申请单，提示用户是否继续修改费用种类，继续修改的话会清空关联的费用申请单信息
	    if($scope.ORDER_DATA.fysqd.length && $scope.ORDER_DATA.fysqd[0].AUFNR) {
		    swal({
			    title: "修改费用类型的话关联的费用申请单信息会被清空，确定要继续修改费用类型吗？",
			    type: "warning",
			    showCancelButton: true,
			    confirmButtonColor: "#DD6B55",
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    closeOnConfirm: true
		    }, function(isConfirm){
			    if(isConfirm) {
				    $("#costCategory").dialog({
					    autoOpen: false,
					    width: 500,
					    modal: true
				    });
				    $("#costCategory").dialog("open");
			    } else {}
		    });
	    } else {
		    $("#costCategory").dialog({
			    autoOpen: false,
			    width: 500,
			    modal: true
		    });
		    $("#costCategory").dialog("open");
	    }


	    $scope.selectTypeFn = function (val) {
            if (!val || !val.category || !val.costtype) {
                swal("请选择费用种类", "", "warning");
                return false;
            }
		    // 清空费用申请单信息
		    if($scope.ORDER_DATA.fysqd.length && $scope.ORDER_DATA.fysqd[0].AUFNR) {
			    $scope.ORDER_DATA.fysqd = [];
		    }
            var type1 = val.category.split('-');
            var type = val.costtype.split('-');
            $scope.ORDER_DATA.cost.category = type1[0];
            $scope.ORDER_DATA.cost.costtype = type[0];
            $scope.ORDER_DATA.cost.typestr = [type1[1], type[1]].join('-');
	        // 差旅费特殊处理
	        // $scope.ORDER_DATA.cost.invoicetype = type[0] == '49' ? '1849025' : '';
	        // 2017-2-16 修改逻辑，票据类型提到公用部分
	        // 差旅费需要特殊处理
	        if(type[0] == '49') {
		        $scope.ORDER_DATA.cost.invoicetype = '1849025';
		        $scope.ORDER_DATA.cost.invoicetypestr = '差旅费';
		        $scope.invoicetypeOnlyRead = true;
	        }
	        //2017-2-9 Bug5562 报销费用类型与票据类型对应关系
	        // 固定报销-市内交通费 市内交通费1
	        // 固定报销-招待费 招待费
	        // 固定报销-电话费 电话费
	        $scope.invoicetypeOnlyRead = false;
	        if(type1[0] == '12') {  // 固定报销
	        	if(type[0]=='12') {    // 招待费
			        $scope.ORDER_DATA.cost.invoicetype = '1212048';
			        $scope.ORDER_DATA.cost.invoicetypestr = '业务招待费';
			        $scope.invoicetypeOnlyRead = true;
		        } else if(type[0]=='13') {    // 电话费
			        $scope.ORDER_DATA.cost.invoicetype = '1213049';
			        $scope.ORDER_DATA.cost.invoicetypestr = '电话费';
			        $scope.invoicetypeOnlyRead = true;
		        } else if(type[0]=='16') {    // 市内交通费
			        // $scope.ORDER_DATA.cost.invoicetype = '1216057';
			        // $scope.ORDER_DATA.cost.invoicetypestr = '市内交通费1';
			        // $scope.invoicetypeOnlyRead = true;
		        }
	        }
            // 清空票据类型选中项
            // $scope.invoicetype = '';
            // $scope.categorySel = val.categorySel[type1[0]].sub[type[0]].sub;

	        //
	        // 清空票据类型选中项
	        $scope.invoicetype = '';
	        $scope.categorySel = val.categorySel[type1[0]].sub[type[0]].sub;
	        if(type[0]=='16') {    // 市内交通费
		        $scope.invoicetype = '1216057|市内交通费1';
	        }
	        if(['13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {  // 季度、年度
		        // 清空费用期间选中项
		        $scope.ORDER_DATA.cost.fromdate = '';
		        $scope.ORDER_DATA.cost.enddate = '';
	        } else {
		        $scope.ORDER_DATA.cost.fromdate = $scope.prevMonth;
		        $scope.ORDER_DATA.cost.enddate = $scope.prevMonth;
	        }
            // 是否关联费用申请单
            // 当费用种类=固定报销、季度浮动、年度浮动时，该字段默认值为否，只读；
            //当费用种类=直接运营费用时，该字段默认值为是，只读，且关联的费用申请单类型必须为直接运营费用；
            //当费用种类=其他业务成本时，该字段默认值为是，只读，且关联的费用申请单类型必须为其他业务成本；
            //  当费用种类=间接运营费用时，该字段默认值为否，可编辑；当值为是时，关联的费用申请单类型必须为间接运营费用；
            // console.log('category', $scope.ORDER_DATA.cost.category)
            $scope.ctype = ['10', '11', '12', '13', '14', '19', '20'].indexOf($scope.ORDER_DATA.cost.category) !== -1;

		    if (['19', '20'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
			    // if (['20'].indexOf($scope.ORDER_DATA.cost.category) !== -1 || ) {
			    if(['19'].indexOf($scope.ORDER_DATA.cost.category) !== -1 && ['信息产品事业群',"医疗产品部","合作业务部"].indexOf(parOrg.orgname) == -1) {
				    $scope.ORDER_DATA.hasfysqd = '0';
				    $scope.ctype = false;
			    } else {
				    $scope.ORDER_DATA.hasfysqd = '1';
				    // $scope.userChangecostType = true;
			    }
		    } else if($scope.ORDER_DATA.cost.category=='18') {
			    if( ['12','47','48','49'].indexOf($scope.ORDER_DATA.cost.costtype) == -1 && ['信息产品事业群',"医疗产品部","合作业务部"].indexOf(parOrg.orgname) != -1) {
				    $scope.ORDER_DATA.hasfysqd = '1';
				    // $scope.userChangecostType = true;
			    } else {
				    $scope.ORDER_DATA.hasfysqd = '0';
				    $scope.ctype = false;
			    }
		    } else if (['10', '11', '12', '13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
			    $scope.ORDER_DATA.hasfysqd = '0';
		    }
            $scope.AUARTText = {'19':'直接运营费用', '18':'间接运营费用', '20':'市场费用'}[$scope.ORDER_DATA.cost.category] || '';
            $scope.AUART = {'19': 'ZJ02', '18': 'ZJ99', '20': 'ZJ01'}[$scope.ORDER_DATA.cost.category] || '';
            // console.log('category',$scope.ORDER_DATA.cost.category, $scope.AUART,$scope.AUARTText )
            // 不关联费用申请单时，费用种类=间接运营费用时，成本中心的取值规则同固定报销，且只读；
            // 固定报销-交通补助、招待费、笔记本电脑报销、电话费，成本中心为报销人所在部门对应的成本中心
            // 季度浮动/年度浮动，成本中心的取值同固定报销取值
            // 当报销种类=固定报销-主任津贴时，成本中心= 总经办成本中心，只读
            // console.log(type1[0], type[0])
            $scope.setcostcenter();
            if ($scope.ORDER_DATA.cost.category == '14') {
                $scope.typend = true;
                $scope.typejd = false;
            } else if ($scope.ORDER_DATA.cost.category == '13') {
                $scope.typejd = true;
                $scope.typend = false;
            } else {
                $scope.typend = false;
                $scope.typejd = false;
            }
            $("#costCategory").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.comeAdd = function (type) {
        var obj = {
            'fysqd': {AUFNR: '', costcenter: '', wsyje: '', bcsyje: '',ZSQNR:''},
            'tripcost': {startdate: '', origin: '', enddate: '', dest: '', trans: '', money: '', note: ''}
        };
        type == 'tripcost' ? $scope.ORDER_DATA.cost.tripcost.push(obj[type])
            : $scope.ORDER_DATA[type].push(obj[type]);
    };
    $scope.comeDel = function (idx, type) {
        if (type == 'tripcost') {
            $scope.ORDER_DATA.cost.tripcost.splice(idx, 1);
            $scope.jtjehzFn();
        } else {
            $scope.ORDER_DATA[type].splice(idx, 1);
            if(type == 'fysqd') {
                // 费用申请单
                // 计算本次使用金额小计
                $scope.ZBXJEBlurFn();
                // 如果一条费用申请单信息都没有的话，清除类型和成本中心
                if(!$scope.ORDER_DATA.fysqd.length) {
                    $scope.ORDER_DATA.cost.costtype = '';
                    $scope.ORDER_DATA.cost.typestr = '';
                    $scope.ORDER_DATA.finance.costcenter = '';
                }
            }
        }
    };
    $scope.jtjehzFn = function () {
        // 计算 差旅报金额
        var jtjehz = 0;
        for (var i = 0, l = $scope.ORDER_DATA.cost.tripcost.length; i < l; i++) {
            if ($scope.ORDER_DATA.cost.tripcost[i].money) {
                jtjehz += $scope.ORDER_DATA.cost.tripcost[i].money * 1;
            }
        }
        $scope.ORDER_DATA.cost.jtjehz = jtjehz;
    };
    $scope.amountclsum = function () {
        $scope.amountcl = $scope.ORDER_DATA.cost.citytranscost * 1 + $scope.ORDER_DATA.cost.accomcost * 1 + $scope.ORDER_DATA.cost.othercost * 1 + $scope.ORDER_DATA.cost.jtjehz * 1;
        $scope.ORDER_DATA.cost.amount = ($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1 ? $scope.ORDER_DATA.amount : $scope.amountcl;
	    $scope.getReimlimitperiod();
    };

    $scope.$watch('ORDER_DATA.cost.jtjehz', function (newvalue, oldvalue) {
        if (newvalue == oldvalue) return false;
        $scope.amountclsum();
    })
    $scope.$watch('ORDER_DATA.amount', function (newvalue, oldvalue) {
        if (newvalue == oldvalue) return false;
        $scope.ORDER_DATA.cost.amount = ($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1 ? $scope.ORDER_DATA.amount : $scope.amountcl;
    })
    // $scope.ORDER_DATA.amount2 = $scope.ORDER_DATA.citytranscost*1 + $scope.ORDER_DATA.accomcost*1 + $scope.ORDER_DATA.othercost*1 + $scope.ORDER_DATA.jtjehz*1;
    // 财务信息
    //添加费用申请
	$scope.purchaseClick = function (i) {
		// 判断是否已经选择成本中心
		/*var costcenter = $scope.ORDER_DATA.finance.costcenter;
		 if (!costcenter) {
		 swal('请先选择成本中心', '', 'warning');
		 return false;
		 }*/
		// 清空之前展示的列表
		$scope.dataList = [];
		// console.log('costcenter',costcenter)
		/*$scope.costcenterOn = costcenter;
		 $scope.PRCTRCode = costcenter;*/

		/*setTimeout(function () {
		 $scope.$apply(function () {
		 $scope.PRCTRText = costcenter
		 })
		 })*/
		$("#fysqBox").dialog({
			autoOpen: false,
			width: 850,
			maxHeight: 540,
			modal: true
		});
		$("#fysqBox").dialog("open");
		if($scope.ORDER_DATA.fysqd.length > 1) {
			$scope.FYZFYLXTxt = [$scope.ORDER_DATA.cost.typestr.split('-')[0], $scope.ORDER_DATA.cost.typestr.split('-')[1]].join('-');
			$scope.FYZFYLX = $scope.ORDER_DATA.fysqd[0].ZFYLX.substr(0,4);
			$scope.FYcostcenter = $scope.ORDER_DATA.finance.costcenter;
		} else {
			$scope.FYZFYLXTxt = '';
			$scope.FYZFYLX = '';
			$scope.FYcostcenter = '';
		}
		$scope.searchFn = function () {
			if(!$scope.AUFNR && !$scope.ZINORD) {
				swal('请输入费用申请单号或者申请流水号！','','warning');
				return false;
			}
			var customerPromise = service.listInside({
				AUFNR: $scope.AUFNR,
				ZINORD: $scope.ZINORD,
				// USER0: $scope.USER0,
				costcenter: $scope.FYcostcenter,
				ZFYLX: $scope.FYZFYLX
			});
			// var customerPromise = service.listInside({AUFNR:$scope.AUFNR, USER0: $scope.USER0});
			customerPromise.success(function (data) {
				if (data.code == 200) {
					$scope.dataList = data.rst.items;
					for(var i=0,l=$scope.dataList.length; i<l; i++) {
						var ZFYLX = $scope.dataList[i].ZFYLX;
						var type=son='';

						/*if(ZFYLX.substr(0,2)=='18') {
						 type = '18';
						 son = '12';
						 } else if(ZFYLX.substr(0,2)=='19') {
						 if(ZFYLX=='1952'){
						 type = '20';
						 son = '57';
						 } else {
						 type = '19';
						 son = ZFYLX.substr(2,2);
						 }
						 }*/
						type = ZFYLX.substr(0,2);
						son = ZFYLX.substr(2,2);

						// $scope.dataList[i].ZFYLX = [type,son].join('');
						var textArr = [$scope.selectType.categorySel[type].text, $scope.selectType.categorySel[type].sub[son].text];
						if(ZFYLX.substr(4).length) {
							textArr.push($scope.selectType.categorySel[type].sub[son].sub[ZFYLX].text);
						}
						$scope.dataList[i].ZFYLXTxt = textArr.join('-');
					}
				}
			})
		}
		$scope.cusSelect = function (AUFNR,ZFYLX,ZFYLXTxt,RESPCCTR,ZSQNR,ZINORD) {

			var obj = {AUFNR: AUFNR, wsyje: 0,ZFYLX:ZFYLX, ZFYLXTxt:ZFYLXTxt,RESPCCTR:RESPCCTR,ZSQNR:ZSQNR,ZINORD:ZINORD};
			// 获取可用余额
			var fysqdmoney = service.fysqdmoney({AUFNR: AUFNR});
			fysqdmoney.success(function (data) {
				if (data.code == 200) {
					obj.wsyje = data.rst.total - data.rst.used - data.rst.using;
					$.extend(true, $scope.ORDER_DATA.fysqd[i], obj);
					$scope.ORDER_DATA.finance.costcenter = RESPCCTR;
					// 费用申请单间接运营 - 间接运营费用-招待费
					// 费用申请单直接运营费用-市场费用 - 其他业务成本-其他业务成本
					// 费用申请单直接运营其他费用 - 直接运营其他费用

					// 清空票据类型选中项
					$scope.invoicetype = '';
					var txt = ZFYLXTxt.split('-');
					$scope.categorySel = $scope.selectType.categorySel[ZFYLX.substr(0,2)].sub[ZFYLX.substr(2,2)].sub;
					$scope.ORDER_DATA.cost.typestr = [txt[0],txt[1]].join('-');
					$scope.ORDER_DATA.cost.category = ZFYLX.substr(0,2);
					$scope.ORDER_DATA.cost.costtype = ZFYLX.substr(2,2);
					// $scope.ORDER_DATA.cost.invoicetypestr = ZFYLX.substr(4);
					if(txt.length>2) {
						$scope.invoicetype = [ZFYLX,txt[2]].join('|');
						// $scope.ORDER_DATA.cost.invoicetype = ZFYLX;
						// $scope.ORDER_DATA.cost.invoicetypestr = txt[2];
						// $scope.invoicetypeOnlyRead = true;
					}
				} else {
					swal('获取未使用金额失败', '', 'warning');
				}
				$("#fysqBox").dialog("destroy");
				$(".ui-dialog").remove();
			});
		}
	};

    $scope.ZBXJEBlurFn = function () {
        var total = 0;
        for (var i = 0, l = $scope.ORDER_DATA.fysqd.length; i < l; i++) {
            total += $scope.ORDER_DATA.fysqd[i].ZBXJE * 1;
        }
        $scope.ZBXJETotal = total;
    };
    // 获取借款未还
    var loaning = service.loaning();
    loaning.success(function (data) {
        $scope.ORDER_DATA.finance.loan = data.rst.amount;
        // $scope.ORDER_DATA.finance.loan = $filter('number')($scope.ORDER_DATA.finance.loan, '2');
    })

    // 获取当期信息接口
    $scope.getReimlimitperiod = function () {
        if (!$scope.ORDER_DATA.cost.fromdate || !$scope.ORDER_DATA.cost.enddate || !$scope.ORDER_DATA.cost.category || !$scope.ORDER_DATA.cost.costtype || $scope.ORDER_DATA.cost.fromdate > $scope.ORDER_DATA.cost.enddate) {
            return false;
        }
        // var amount = ($scope.invoicetypeOnlyRead  ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') == -1 ? $scope.ORDER_DATA.amount : ( $scope.ORDER_DATA.citytranscost * 1 + $scope.ORDER_DATA.accomcost * 1 + $scope.ORDER_DATA.othercost * 1 + $scope.ORDER_DATA.cost.jtjehz * 1);
        var param = {
            fromdate: $scope.ORDER_DATA.cost.fromdate,
            enddate: $scope.ORDER_DATA.cost.enddate,
            category: $scope.ORDER_DATA.cost.category,
            costtype: $scope.ORDER_DATA.cost.costtype,
	        amount: $scope.ORDER_DATA.cost.amount,
            // amount: amount,
            hasfysqd: $scope.ORDER_DATA.hasfysqd
        };
        // console.log(param);
        var reimlimitperiod = service.reimlimitperiod(param);
        reimlimitperiod.success(function (data) {
            if (data.code == 200) {
                $scope.ORDER_DATA.limit = data.rst.data.items;
            }
        })
    };
    $scope.dateCallback = function (data) {
        // 年度浮动，填写截止年度
        if (['14'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
            $scope.ORDER_DATA.cost.enddate = $scope.ORDER_DATA.cost.fromdate;
        }
        // 季度浮动，填写起始时间、截止时间
        if (['13'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
            if (!$scope.fromdate || !$scope.fromdatejd || !$scope.enddatejd) {
                return false;
            }
            $scope.ORDER_DATA.cost.fromdate = [$scope.fromdate, $scope.fromdatejd].join('-');
            $scope.ORDER_DATA.cost.enddate = [$scope.fromdate, $scope.enddatejd].join('-');
        }
        // 起始月份、截止月份需为同一年度
        if ($scope.ORDER_DATA.cost.fromdate && $scope.ORDER_DATA.cost.enddate) {
            if (['14'].indexOf($scope.ORDER_DATA.cost.category) == -1) {
                var from = $scope.ORDER_DATA.cost.fromdate.split('-'),
                    end = $scope.ORDER_DATA.cost.enddate.split('-');
                if (from[0] != end[0]) {
	                // 2017-2-9 5589 报销单选择跨年日期时，给予提示后，点击确定，需清空选择时间（起止时间都清空）
	                swal({
		                title: "费用期间-起始时间和截止时间必需为同一年度",
		                text: "",
		                type: "warning"
	                }, function(){
		                setTimeout(function() {
			                $scope.$apply(function () {
				                $scope.ORDER_DATA.cost.fromdate = '';
				                $scope.ORDER_DATA.cost.enddate = '';
			                })
		                })
	                });
	                return false;
                }
                if (from[1] - end[1] > 0) {
	                if(data){
		                swal('费用期间-截止时间不能小于起始时间', '', 'warning');
	                }
                    // 清空截止时间
                    if(['13'].indexOf($scope.ORDER_DATA.cost.category) !== -1) {
                      $scope.enddatejd = '';
                    } else {
                      setTimeout(function () {
                        $('#enddate').val("");
                      },0)
                      $scope.ORDER_DATA.cost.enddate = '';


                    }
                    return false;
                }
            } else {
	            if (data && ($scope.ORDER_DATA.cost.fromdate - $scope.ORDER_DATA.cost.enddate > 0)) {
		            swal('费用期间-截止时间不能小于起始时间', '', 'warning');
		            return false;
	            }
            }
        } else {
            return false;
        }
        $scope.getReimlimitperiod();
        $scope.getReimlimityear();
    };
    $scope.$watch('ORDER_DATA.cost.costtype', function (newVal, oldVal) {
        $scope.getReimlimitperiod();
        $scope.getReimlimityear();
    });
    // 当年报销信息
    $scope.getReimlimityear = function () {
        if (!$scope.ORDER_DATA.cost.fromdate || !$scope.ORDER_DATA.cost.enddate || !$scope.ORDER_DATA.cost.category || !$scope.ORDER_DATA.cost.costtype || $scope.ORDER_DATA.cost.fromdate > $scope.ORDER_DATA.cost.enddate) {
            return false;
        }
        var param = {
            year: $scope.ORDER_DATA.cost.fromdate.split('-')[0],
            category: $scope.ORDER_DATA.cost.category,
            costtype: $scope.ORDER_DATA.cost.costtype
        };
        // console.log(param);
        var reimlimityear = service.reimlimityear(param);
        reimlimityear.success(function (data) {
            if (data.code == 200) {
                $scope.reimlimityearData = [data.rst.data];
            }
        })
    };

    $scope.addData = function (data, statue) {
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        // 有关联清单时候费用申请单详情必填
        if ($scope.ORDER_DATA.hasfysqd == '1' && !$scope.ORDER_DATA.fysqd.length) {
            swal('请填写费用申请单信息！', '', 'warning');
            return false;
        }
        if (!$scope.ORDER_DATA.cost.amount || $scope.ORDER_DATA.cost.amount==0) {
          swal('报销单金额不能为零！', '', 'warning');
          return false;
        }
	    // 2017-1-20 差旅费时 明细列表必填
	    if((($scope.invoicetypeOnlyRead ? $scope.ORDER_DATA.cost.invoicetype : $scope.invoicetype).indexOf('025') !== -1) && !$scope.ORDER_DATA.cost.tripcost.length) {
		    swal('请填写差旅报销明细！', '', 'warning');
		    return false;
	    }
        // 本次还款金额不能大于借款未还金额
        if ($scope.ORDER_DATA.finance.returnmoney - $scope.ORDER_DATA.finance.loan > 0) {
          swal('本次还款金额不能大于借款未还金额！', '', 'warning');
          return false;
        }
        // 本次还款金额不能大于报销金额
        if ($scope.ORDER_DATA.finance.returnmoney - $scope.ORDER_DATA.cost.amount > 0) {
          swal('本次还款金额不能大于报销金额！', '', 'warning');
          return false;
        }

        // console.log('data::', data)
        // 固定报销中，如果额度超了，是要禁止提交的
        // 间接费用,报销人所在部门为非信息产品事业群时，报销金额不能大于个人已分配额度；报销人所在部门为信息产品事业群时，不做额度校验
        // 报销类型=季度浮动/年度浮动时，有额度管理；报销人在提交单据时系统需判断是否超个人额度，超过就不允许提交
        var parOrg = getField(person.user.parentorgList, 'level', 0);
        if (['12', '13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1 /*|| $scope.ORDER_DATA.cost.category == '18' && parOrg.orgname !== "信息产品事业群"*/) {
            // if ($scope.ORDER_DATA.cost.category == '12') {
          if ($scope.ORDER_DATA.hasfysqd == '0') {
            $scope.unvirtual = {};
            for (var i = 0, l = $scope.ORDER_DATA.limit.length; i < l; i++) {
              if ($scope.ORDER_DATA.limit[i].virtual !== '1') {
                $scope.unvirtual = $scope.ORDER_DATA.limit[i];
              }
              // console.log(i, $scope.ORDER_DATA.limit[i].virtual, $scope.unvirtual)
            }
            if ($scope.ORDER_DATA.limit.length) {
              if (['12', '13', '14'].indexOf($scope.ORDER_DATA.cost.category) !== -1 /*|| $scope.ORDER_DATA.cost.category == '18' && parOrg.orgname !== "信息产品事业群"*/) {
                if ($.isEmptyObject($scope.unvirtual)) {
                  swal('还未分配额度', '', 'warning');
                  return false;
                } else {
                  var val = $scope.unvirtual;
                  if (val.amount - val.used - val.using < 0) {
                    swal('超过本期分配额度', '', 'warning');
                    return false;
                  }
                }
              }

            } else {
              swal('还未分配额度', '', 'warning');
              return false;
            }
          }
        }
        //  关联费用申请单后，报销金额必须等于费用申请单中“本次使用金额”之和,否则禁止提交
        if ($scope.ORDER_DATA.hasfysqd == '1') {
            for (var i = 0, l = $scope.ORDER_DATA.fysqd.length; i < l; i++) {
                var list = $scope.ORDER_DATA.fysqd[i];
                if (list.ZBXJE > list.wsyje) {
                    swal('信息填写有误，请检查修改后再保存提交！', '', 'warning');
                    return false;
                }
            }
            if ($scope.ZBXJETotal != $scope.ORDER_DATA.cost.amount) {
                swal('报销金额必须等于费用申请单中“本次使用金额”之和！', '', 'warning');
                return false;
            }
        } else {    // 不关联费用申请单时，fysqd  为空数组
            $scope.ORDER_DATA.fysqd = [];
        }
        // 成本中心
        /*if (!$scope.fixedcoscenter) {
            var costcenter = $scope.costcentersubsubsub || $scope.costcentersubsub || $scope.costcentersub || $scope.costcenter;
            console.log('costcenter', costcenter)
            $scope.ORDER_DATA.finance.costcenter = costcenter.split('|')[2];
            $scope.ORDER_DATA.finance.costcenterstr = costcenter.split('|')[1];
            $scope.ORDER_DATA.finance.costcenterall = [$scope.costcenter, $scope.costcentersub, $scope.costcentersubsub, $scope.costcentersubsubsub].join('==');
        }*/
        // 票据类型
        if ($scope.invoicetype) {
            $scope.ORDER_DATA.cost.invoicetypestr = $scope.invoicetype.split('|')[1];
            $scope.ORDER_DATA.cost.invoicetype = $scope.invoicetype.split('|')[0];
        }
        // 本次报销金额
        // $scope.ORDER_DATA.cost.amount = $scope.ORDER_DATA.cost.costtype.indexOf('49') == -1 ? $scope.ORDER_DATA.amount : $scope.ORDER_DATA.amountcl;
        // $scope.ORDER_DATA.finance.returnmoney = $scope.ORDER_DATA.cost.amount > $scope.ORDER_DATA.finance.loan ? $scope.ORDER_DATA.finance.loan : $scope.ORDER_DATA.finance.amount;
        $scope.ORDER_DATA.finance.due = $scope.ORDER_DATA.cost.amount - $scope.ORDER_DATA.finance.returnmoney;
	    // 2017-3-3增加逻辑，非差旅费时清空差旅费列表，避免脏数据
	    if(( $scope.ORDER_DATA.cost.invoicetype.indexOf('025') == -1) && $scope.ORDER_DATA.cost.tripcost.length) {
		    $scope.ORDER_DATA.cost.tripcost = [];
	    }
		    var addParam = {};
        var param = {processId: $scope.processId, nodeId: $scope.nodeId};
        addParam.doc = {model: data};
        param.doc = {model: data};
        //prarm.doc.creator = person.user.name;
        if (statue == "save") {
            var addInside = service.add(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                } else {
                    alert(data.msg);
                }
            });
        } else if (statue == 'apply') {
            var applyAdd = service.applyAdd(param);
            applyAdd.success(function (data) {
                if (data.code == 200) {
                	// 2017-1-19 不知道为什么有时候提交审批后页面跳转没生效，导致用户重复提交
	                // 为避免重复提交接口调用成功后对nodeId和processId 赋值
	                $scope.processId = data.rst.processId;
	                $scope.nodeId = data.rst.nodeId;
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
	                    window.setTimeout(function () {
		                    window.location.href = '/index.html#/reimbursementOrder';
	                    },1)
                    });
                } else {
                    alert(data.msg);
                }
            });
        }
    };

}]);
// 查看
reimbursementApp.controller('reimbursementViewCtrl', ['$scope', '$stateParams', 'reimbursementServices', function ($scope, $stateParams, service) {
    $scope.id = $stateParams.id;
	var viewCont = service.view({code: $stateParams.id});
    viewCont.success(function (data) {
        $scope.ORDER_DATA = data.rst.data;
        // 计算 差旅报金额
        var jtjehz = 0;
        for (var i = 0, l = $scope.ORDER_DATA.cost.tripcost.length; i < l; i++) {
            if ($scope.ORDER_DATA.cost.tripcost[i].money) {
                jtjehz += $scope.ORDER_DATA.cost.tripcost[i].money * 1;
            }
        }
        $scope.ORDER_DATA.cost.jtjehz = jtjehz;
	    // 判断是不是已作废的报销单，已作废的不提供打印
	    $scope.valid = $scope.ORDER_DATA.info.status === 'valid';
        // 获取借款未还
        // 查看页面读取本单借款未还金额，无需获取最新的
        /*var loaning = service.loaning();
        loaning.success(function (data) {
            $scope.ORDER_DATA.finance.loan = data.rst.amount;
        });*/
        // 获取当期信息接口 ,查看页面不需要再次获取
        /*var param = {
         fromdate: $scope.ORDER_DATA.cost.fromdate,
         enddate: $scope.ORDER_DATA.cost.enddate,
         category: $scope.ORDER_DATA.cost.category,
         costtype: $scope.ORDER_DATA.cost.costtype,
         amount: $scope.ORDER_DATA.cost.amount
         };
         var reimlimitperiod = service.reimlimitperiod(param);
         reimlimitperiod.success(function (data) {
         if (data.code == 200) {
         $scope.ORDER_DATA.limit = data.rst.data.items;
         }
         })*/

        // 当年报销信息
        var paramy = {
            year: $scope.ORDER_DATA.cost.fromdate.split('-')[0],
            category: $scope.ORDER_DATA.cost.category,
            costtype: $scope.ORDER_DATA.cost.costtype
        };
        var reimlimityear = service.reimlimityear(paramy);
        reimlimityear.success(function (data) {
            if (data.code == 200) {
                $scope.reimlimityearData = [data.rst.data];
            }
        })

	    // 费用申请单
	    for(var i=0,l=$scope.ORDER_DATA.fysqd.length; i<l; i++) {
		    var ZFYLX = $scope.ORDER_DATA.fysqd[i].ZFYLX;
		    if(ZFYLX) {
		    var type=son='';
		    type = ZFYLX.substr(0,2);
		    son = ZFYLX.substr(2,2);
		    console.log('aa',type,son,$scope.ORDER_DATA.fysqd,$scope.selectType.categorySel)

		    // $scope.dataList[i].ZFYLX = [type,son].join('');
		    var textArr = [$scope.selectType.categorySel[type].text, $scope.selectType.categorySel[type].sub[son].text];
		    if(ZFYLX.substr(4).length) {
			    textArr.push($scope.selectType.categorySel[type].sub[son].sub[ZFYLX].text);
		    }
		    $scope.ORDER_DATA.fysqd[i].ZFYLXTxt = textArr.join('-');
		    }
	    }

    });
    var constlist = service.constlist();
    $scope.selectType = {};
    constlist.success(function (data) {
        if (data.code == 200) {
            $scope.costcenterSel = data.rst.data.costcenter;
            $scope.selectType.categorySel = data.rst.data.costtype;
        } else {
            swal(data.msg, '', 'warning');
        }
    });
}]);
// 审批
reimbursementApp.controller('reimbursementCtrl', ['$scope','$rootScope', '$stateParams', '$http', 'reimbursementServices', function ($scope, $rootScope, $stateParams, $http, service) {
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewCont = service.allpyView(param);

    viewCont.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.loading = false;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.prostatus = data.rst.property.status;
            // 计算 差旅报金额
            var jtjehz = 0;
            for (var i = 0, l = $scope.ORDER_DATA.cost.tripcost.length; i < l; i++) {
                if ($scope.ORDER_DATA.cost.tripcost[i].money) {
                    jtjehz += $scope.ORDER_DATA.cost.tripcost[i].money * 1;
                }
            }
            $scope.ORDER_DATA.cost.jtjehz = jtjehz;
          // 草稿，申请，审批中查看应该取原报销单借款未还，不用再调一次代码
            /*// 获取借款未还
            var loaning = service.loaning();
            loaning.success(function (data) {
                $scope.ORDER_DATA.finance.loan = data.rst.amount;
            })*/
            // 获取当期信息接口 ,查看页面不需要再次获取
            /*var param = {
             fromdate: $scope.ORDER_DATA.cost.fromdate,
             enddate: $scope.ORDER_DATA.cost.enddate,
             category: $scope.ORDER_DATA.cost.category,
             costtype: $scope.ORDER_DATA.cost.costtype,
             amount: $scope.ORDER_DATA.cost.amount
             };
             var reimlimitperiod = service.reimlimitperiod(param);
             reimlimitperiod.success(function (data) {
             if (data.code == 200) {
             $scope.ORDER_DATA.limit = data.rst.data.items;
             }
             })*/

            // 当年报销信息
            var paramy = {
                year: $scope.ORDER_DATA.cost.fromdate.split('-')[0],
                category: $scope.ORDER_DATA.cost.category,
                costtype: $scope.ORDER_DATA.cost.costtype
            };
            var reimlimityear = service.reimlimityear(paramy);
            reimlimityear.success(function (data) {
                if (data.code == 200) {
                    $scope.reimlimityearData = [data.rst.data];
                }
            })
            // 部门全年报销汇总
	        // 2017-4-25 Bug 6373
            // orglimityear
	        // 只有待办已办显示部门全年报销汇总
	        // console.log()
            if(($stateParams.myflag == 'mydoing' || $stateParams.myflag == 'mydones') && $scope.ORDER_DATA.cost.category == '18') {
            	$scope.showbmqn = true;
	            var orgs = $scope.ORDER_DATA.orgs, orgids=[];
	            // 检测当前登录人所管理的部门id
	            var person = $rootScope.loginPerson;
	            // 2017-3-30 【报销】同一个领导兼职两个及以上部门的报销审批与额度设置权限
	            var roles = person.user.roles, extra=[], flag=false;
	            $scope.orgid = person.user.orgid;
	            for(var i=0,l=roles.length; i<l; i++) {
		            if(roles[i].name == 'approval_gmanager') {
			            extra = roles[i].extra || [];
		            }
	            }
	            // 检测当前审批人及子部门
	            for(var i=0,len=orgs.length; i<len; i++) {
		            if(!flag && extra.indexOf(orgs[i]._id) == -1) {
		            	continue;
		            }
		            flag = true;
		            orgids.push(orgs[i]._id);
	            }
	            var paramy = {
		            // year: $scope.ORDER_DATA.cost.fromdate.split('-')[0],
		            year: $scope.ORDER_DATA.cost.year,
		            month: $scope.ORDER_DATA.cost.month,
		            orgids: orgids,
		            category: $scope.ORDER_DATA.cost.category
	            };
	            var orglimityear = service.orglimityear(paramy);
	            orglimityear.success(function (data) {
	                if (data.code == 200) {
	                    $scope.bmqnbxhzxx = data.rst.data;
	                }
	            })
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
                $scope.apCot = data.rst.processlog.length > 1 ? true : false;
                //$scope.apCot = false;
            }

        } else {
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }

    });
    var constlist = service.constlist();
    $scope.selectType = {};
    constlist.success(function (data) {
        if (data.code == 200) {
            $scope.costcenterSel = data.rst.data.costcenter;
        } else {
            swal(data.msg, '', 'warning');
        }
    });
    var applyObj = $scope.applyObj = {};
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

        var addInside = service.add(param);
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
        var applyAgree = service.agree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回报销单待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=报销单&&controllercode=BXD';
                });
            } else {
            	var msg = data.msg || "提交失败！";
                swal(msg, '', "warning");
            }
        }).error(function (error) {
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = service.disagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回报销单待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=报销单&&controllercode=BXD';
                });
            } else {
	            var msg = data.msg || "驳回失败！";
	            swal(msg, '', "warning");
            }
        }).error(function (error) {
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyCancel = function () {//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = service.cancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回报销单待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=报销单&&controllercode=BXD';
                });
            } else {
	            var msg = data.msg || "驳回原点失败！";
	            swal(msg, '', "warning");
            }
        }).error(function (error) {
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyRecall = function () {//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = service.recall(param);
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
	            var msg = data.msg || "召回失败！";
	            swal(msg, '', "warning");
            }
        }).error(function (error) {
            swal(error, "", "warning");
            //alert(error);
        });
    }

}]);

// 额度管理
reimbursementApp.controller('accountsrembursCtrl', ['$scope', '$stateParams', 'reimbursementServices', function ($scope, $stateParams, service) {
    $scope.$watch('ht.activeTab', function (newVal, oldVal) {
        if (newVal == oldVal) return false;
        if ($('.uploadify').length > 0) {
            $('.uploadify').uploadify('destroy');
        }
    })

}]);
// 公司额度管理
reimbursementApp.controller('accountsCompanyCtrl', ['$scope', '$stateParams', '$rootScope', '$filter', 'reimbursementServices', function ($scope, $stateParams, $rootScope, $filter, service) {
    var d = new Date();
    $scope.today = $filter('date')(d, 'yyyy');
    var person = $rootScope.loginPerson;
    // var person = $cookieStore.get("persion");
    $scope.ORDER_DATA = {userList: [], dataList: [], user: {}, department: {}};
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user.id = person.user._id;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department.id = person.user.orgid;
    $scope.ready = $scope.readyD = false;
    $scope.listEmployee = $scope.listUser = [];

    $scope.$watch('ORDER_DATA.year', function (newVal, oldVal) {
        if (oldVal !== newVal) {
            // 加载之前维护数据
            var getList = service.orglimitlist({year: $scope.ORDER_DATA.year, pid: ''});
            getList.success(function (data) {
                if (data.code == 200) {
                    $scope.ORDER_DATA.dataList = data.rst.data.items;
                }
            })
        }
    });
    // 加载部门列表
    $scope.departmentObj = function () {
        $scope.readyD = false;
        var listEmployee = service.listEmployee({level: '0'});
        listEmployee.success(function (data) {
            if (data.code == 200) {
                $scope.listEmployee = data.rst.data;
                $scope.readyD = true;
            }
        })
    };
    $scope.departmentObj();
    $scope.comeAdd = function () {
        var obj = {
            org: {_id: '', orgname: '', pid: '', level: '0'},
            yearlimit: {year: $scope.ORDER_DATA.year, amount: ''},
            monthlimit: [{month: 1, amount: 0}, {month: 2, amount: 0}, {month: 3, amount: 0}, {
                month: 4,
                amount: 0
            }, {month: 5, amount: 0}, {month: 6, amount: 0}, {month: 7, amount: 0}, {month: 8, amount: 0}, {
                month: 9,
                amount: 0
            }, {month: 10, amount: 0}, {month: 11, amount: 0}, {month: 12, amount: 0}]
        };
        $scope.ORDER_DATA.userList.push(obj);
    };
    $scope.comeDel = function (idx, type) {
        $scope.ORDER_DATA[type].splice(idx, 1);
    };
    $scope.comedit = function (idx) {
        $scope.ORDER_DATA.dataList[idx].edit = true;
    };
    $scope.changeDepart = function (i, val) {
        if (!val) {
            // 清空额度数据
            $scope.ORDER_DATA.dataList[i].money = '';
            $scope.ORDER_DATA.userList[i].org = {_id: '', orgname: '', pid: '', level: '0'};
            return false;
        }
        val = val.split('|');
        // 检测数据列表中是否已有该部门的数据
        var idx = $scope.findIndexFn(val[0]),
            idxuser = $scope.findIndexFn(val[0], $scope.ORDER_DATA.userList);
        if (idx !== -1 || idxuser !== -1) {
            swal('列表中存在部门' + val[1] + '的记录，您可以直接编辑', '', 'warning');
            $scope.ORDER_DATA.userList[i].departmentSel = '';
            return false;
        }
        $.extend($scope.ORDER_DATA.userList[i].org, {_id: val[0], orgname: val[1], level: val[2], pid: val[3]});

    };
    // 根据部门id查到所在列表位置
    $scope.findIndexFn = function (id, arr, idName) {
        idName = idName || 'org';
        arr = arr || $scope.ORDER_DATA.dataList;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i][idName]._id == id) {
                return i;
            }
        }
        return -1;
    };

    $scope.sumFn = function (idx, type) {
        var sum = 0,
            list = $scope.ORDER_DATA[['userList', 'dataList'][type]][idx];

        for (var i = 0, l = list.monthlimit.length; i < l; i++) {
            sum += list.monthlimit[i].amount * 1;
        }
        list.yearlimit.monthcount = sum;
    };

    // 保存
    $scope.addData = function (data) {
        // 超额提示不阻止提交
        // console.log(data);
        if (!$scope.ORDER_DATA.year) {
            swal('请选择年度', '', 'warning');
            return false;
        }
	    // 有部门为空的数据提醒用户删除后保存
	    for (var i=0,len=data.userList.length; i<len; i++) {
	    	if(!data.userList[i].org._id) {
		    swal('请删除部门为空的行项目后，再保存！', '', 'warning');
		    return false;
		    }
	    }
        var param = {docs: data.userList.concat(data.dataList), top:true};

	    var orglimitsave = service.orglimitsave(param);
        orglimitsave.success(function (data) {
            if (data.code == 200) {
                swal('保存成功', '', 'success');
                $scope.ORDER_DATA.dataList = param.docs;
                $scope.ORDER_DATA.userList = [];
                for (var i = 0, l = $scope.ORDER_DATA.dataList.length; i < l; i++) {
                    $scope.ORDER_DATA.dataList[i].edit = false;
                }
            } else {
                swal(data.msg, '', 'warning');
            }
        })
    };
}]);
// 部门额度管理
reimbursementApp.controller('accountsDepartmentCtrl', ['$scope', '$stateParams', '$rootScope', '$filter', 'reimbursementServices', function ($scope, $stateParams, $rootScope, $filter, service) {
    var d = new Date();
    var today = $filter('date')(d, 'yyyy-MM');
	today = today.split('-');
    $scope.today = today[0];
    $scope.preMonth = today[1]*1;
    var person = $rootScope.loginPerson;
    // var person = $cookieStore.get("persion");
    $scope.ORDER_DATA = {userList: [], dataList: [], user: {}, department: {}};
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user.id = person.user._id;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department.id = person.user.orgid;
    $scope.ready = $scope.readyD = false;
    $scope.listEmployee = $scope.userList = [];

    $scope.dateCallback = function (data) {
        if (data) {
            // 加载之前维护数据
            var getList = service.orglimitlist({year: data, pid: $scope.ORDER_DATA.department.id});
            getList.success(function (data) {
                if (data.code == 200) {
                    $scope.ORDER_DATA.dataList = data.rst.data.items;
                    // $scope.ORDER_DATA.current = data.rst.data.current || {yearlimit: {amount: 0}, monthlimit:[{"month":1,"amount":0},{"month":2,"amount":0},{"month":3,"amount":0},{"month":4,"amount":0},{"month":5,"amount":0},{"month":6,"amount":0},{"month":7,"amount":0},{"month":8,"amount":0},{"month":9,"amount":0},{"month":10,"amount":0},{"month":11,"amount":0},{"month":12,"amount":0}]};
                    $scope.ORDER_DATA.current = data.rst.data.current;
                    $scope.maxMonth = $scope.ORDER_DATA.current ? $scope.ORDER_DATA.current.maxmonth-1 : -1;
                    if (!$scope.ORDER_DATA.current || !$scope.ORDER_DATA.current.yearlimit.monthcount) {
                        $scope.amountis0 = true;
                    } else {
                        $scope.amountis0 = false;
                    }
                    // $scope.ORDER_DATA.dataList[$scope.ORDER_DATA.dataList.length] = $scope.ORDER_DATA.current;
                    // 初始化时加载所有子部门
                    if (!$scope.ORDER_DATA.dataList.length && !$scope.amountis0) {
                        $scope.departmentObj($scope.ORDER_DATA.department.id);
                    }
                    // $scope.departmentObj($scope.ORDER_DATA.department.id );
                    /*if ($scope.amountis0) {
                        return false;
                    }

                    // 根据有无上月结余字段判断当前可以设置的月份
                    if ($scope.today - newVal > 0) {
                        $scope.maxMonth = 12;
                    } else if ($scope.today - newVal < 0) {
                        $scope.maxMonth = -1;
                    } else {
                        var monthlimit = $scope.ORDER_DATA.current ? $scope.ORDER_DATA.current.monthlimit : [];
                        for (var i = 0, l = monthlimit.length; i < l; i++) {
                            if (monthlimit[i].balance == undefined) {
                                $scope.maxMonth = i - 1;
                                break;
                            }
                        }
                    }*/
                }
            })
        }

    };
    // 初始化年份为当年，手动触发一次初始化
    $scope.dateCallback($scope.today);
    // 加载部门列表
    $scope.departmentObj = function (id) {
        $scope.readyD = false;
        var orglist = service.orglist({pid: id});
        orglist.success(function (data) {
            if (data.code == 200) {
                $scope.listEmployee = data.rst.data;
                $scope.readyD = true;

                for (var i = 0, l = $scope.listEmployee.length; i < l; i++) {
                    var o = $scope.listEmployee[i];
                    var obj = {
                        org: {_id: o._id, orgname: o.orgname, pid: o.pid, level: o.level},
                        yearlimit: {year: $scope.ORDER_DATA.year, amount: 0, monthcount: 0, used: 0},
                        monthlimit: [{month: 1, amount: 0}, {month: 2, amount: 0}, {month: 3, amount: 0}, {
                            month: 4,
                            amount: 0
                        }, {month: 5, amount: 0}, {month: 6, amount: 0}, {month: 7, amount: 0}, {
                            month: 8,
                            amount: 0
                        }, {month: 9, amount: 0}, {month: 10, amount: 0}, {month: 11, amount: 0}, {
                            month: 12,
                            amount: 0
                        }]
                    };
                    $scope.ORDER_DATA.dataList.push(obj);
                }
            }
        })
    };


    /*$scope.comeAdd = function(){
     // 若该部门还没分配额度，提示
     if(!$scope.ORDER_DATA.current.yearlimit.amount) {
     swal('该部门还未分配额度', '', 'warning');
     return false;
     }
     var obj= {org: {_id:'', orgname:'',pid:'', level:''},yearlimit:{year:$scope.ORDER_DATA.year,amount:''}, monthlimit:[{month:1,amount:0},{month:2,amount:0},{month:3,amount:0},{month:4,amount:0},{month:5,amount:0},{month:6,amount:0},{month:7,amount:0},{month:8,amount:0},{month:9,amount:0},{month:10,amount:0},{month:11,amount:0},{month:12,amount:0}]};
     $scope.ORDER_DATA.userList.push(obj);
     };

     $scope.comeDel = function(idx,type){
     $scope.ORDER_DATA[type].splice(idx,1);
     };*/
    // 2016-10-21 暂时去掉
    $scope.comedit = function (idx) {
        $scope.ORDER_DATA.dataList[idx].edit = true;
    };

    $scope.changeDepart = function (i, val) {
        if (!val) {
            // 清空额度数据
            $scope.ORDER_DATA.userList[i].org = {_id: '', orgname: '', pid: '', level: ''};
            return false;
        }
        val = val.split('|');
        // 检测数据列表中是否已有该部门的数据
        var idx = $scope.findIndexFn(val[0]),
            idxuser = $scope.findIndexFn(val[0], $scope.ORDER_DATA.userList);
        if (idx !== -1 || idxuser !== -1) {
            swal('列表中存在部门' + val[1] + '的记录，您可以直接编辑', '', 'warning');
            $scope.ORDER_DATA.userList[i].departmentSel = '';
            return false;
        }
        $.extend($scope.ORDER_DATA.userList[i].org, {_id: val[0], orgname: val[1], level: val[2], pid: val[3]});

    };
    // 根据部门id查到所在列表位置
    $scope.findIndexFn = function (id, arr, idName) {
        idName = idName || 'org';
        arr = arr || $scope.ORDER_DATA.dataList;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i][idName]._id == id) {
                return i;
            }
        }
        return -1;
    };
    // 判断该月上一个月子部门、人员是否分配，没有给用户提示
    /*$scope.checkPrev = function (index) {
     if(!index) return;
     var flag = false;
     for(var i=0,l=$scope.ORDER_DATA.dataList.length; i<l; i++) {

     if ($scope.ORDER_DATA.dataList[i].monthlimit[index-1].amount == '0') {
     flag = true;
     break;
     }
     }

     var usercount = $scope.ORDER_DATA.current.yearlimit.usercount[index-1];
     if(flag || usercount==undefined || usercount=='0' ) {
     var i = index*1+1,
     txt = '您现在在对'+ i + '月份进行额度设置。设置后，人员、子部门' + i + '月份之前月份的有关设置不能再修改！目前有未进行设置的子部门或人员，请确认是否继续修改！';
     swal('', txt, 'warning');
     }
     };*/
    $scope.errMonth = [];
    $scope.maxMonth = -1;//0 ~ 11
    $scope.maxMonthChange = 0;//0 ~ 11
    $scope.sumFn = function (idx, index) {
        // 计算已分配额度
        var sum = 0, sumM = 0,
            list = $scope.ORDER_DATA.dataList[idx];

        for (var i = 0, l = list.monthlimit.length; i < l; i++) {
            sum += list.monthlimit[i].amount * 1;
        }
        list.yearlimit.monthcount = sum;
        // 记录用户修改后的最大修改月份
	    if(list.monthlimit[index].amount-1<0) {
	    	return ;
	    }
	    $scope.maxMonthChange = index;
    };

    // 保存
    $scope.addData = function (data) {
        if (!$scope.ORDER_DATA.year) {
            swal('请选择年度', '', 'warning');
            return false;
        }
        var docs = data.dataList;
        // docs.pop();
        var param = {docs: docs}, amountsum = 0,
            excessName = [];
        // 分配额度总和大于部门费用额度，不允许提交
        for (var i = 0, l = param.docs.length; i < l; i++) {
            amountsum += param.docs[i].yearlimit.amount * 1;
            if (param.docs[i].assigned - param.docs[i].amount > 0) {
                excessName.push(param.docs[i].org.orgname);
            }
        }
        // 子部门 部门分配额度总和不能大于父部门
        if (amountsum - $scope.ORDER_DATA.current.yearlimit.monthcount > 0) {
            swal('部门分配额度总和不能超过部门间接费用额度', '', 'warning');
            return false;
        }
        // 已分配额度大于部门分配额度阻止提交
        if (excessName.length) {
            swal('以下部门已分配额度大于部门分配额度:' + excessName.join(','), '', 'warning');
            return false;
        }
        $scope.saveFn2 = function (param) {
	        // swal("Deleted!", "Your imaginary file has been deleted.", "success");
	        // 按月检测额度有没有超过父部门当月额度和结余之和
	        // 2017-3-21 每次保存都重新计算所有月份结余，避免公司给一级部门调整额度后结余不正确问题
	        var monthlimit = $scope.ORDER_DATA.current.monthlimit;
	        for(var i=0,l=monthlimit.length; i<l; i++) {
		        var maxM = $scope.maxMonth<$scope.maxMonthChange ? $scope.maxMonthChange : $scope.maxMonth;
		        if(i>maxM) break;
		        var balance = 0;
		        if( i>0 ) {
			        // 计算上月结余
			        balance =  monthlimit[i-1].amount + monthlimit[i-1].balance - monthlimit[i-1].orgcount - monthlimit[i-1].usercount;
		        }
		        monthlimit[i].balance = balance;
		        if(i<$scope.maxMonth) continue;
		        var orgcount = 0;
		        // 计算子部门累计使用
		        for (var j = 0, ll = param.docs.length; j < ll; j++) {
			        orgcount += param.docs[j].monthlimit[i].amount * 1;
		        }
		        monthlimit[i].orgcount = orgcount;
		        if(monthlimit[i].amount*1 +  monthlimit[i].balance*1 - orgcount - monthlimit[i].usercount < 0) {
			        if ($scope.errMonth.indexOf(i * 1 + 1) == -1){
				        $scope.errMonth.push(i * 1 + 1);
			        }
		        } else {
			        var ii = $scope.errMonth.indexOf(i * 1 + 1);
			        if (ii !== -1) {
				        $scope.errMonth.splice(ii, 1);
			        }
		        }
	        }
	        if ($scope.errMonth.length) {
		        $scope.errMonth.sort();
		        swal($scope.errMonth.join() + '月份部门累计使用额度超过父部门当月限额，请检查额度设置！', '', 'warning');
		        return false;
	        }
	        var maxmonth = $scope.maxMonthChange ? $scope.maxMonthChange : $scope.maxMonth;
	        $.extend(param, {maxmonth: maxmonth+1});
	        var orglimitsave = service.orglimitsave(param);
	        orglimitsave.success(function (data) {
		        if (data.code == 200) {
			        swal('保存成功', '', 'success');
			        $scope.ORDER_DATA.dataList = param.docs;
			        /*for (var i = 0, l = $scope.ORDER_DATA.dataList.length; i < l; i++) {
			         $scope.ORDER_DATA.dataList[i].edit = false;
			         }*/
			        // 更改有值得最大月份
			        $scope.maxMonth = maxmonth;
		        } else {
			        swal(data.msg, '', 'warning');
		        }
	        })
        }
        if($scope.maxMonth != $scope.maxMonthChange) {
		    swal({
			    title: "保存后，之前月份将被锁定不可更改！",
			    text: "",
			    type: "warning",
			    showCancelButton: true,
			    confirmButtonColor: "#DD6B55",
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    closeOnConfirm: false
		    }, function () {
			    $scope.saveFn2(param);
		    });
        } else {
	        $scope.saveFn2(param);
        }
    };

}]);
// 人员额度管理
reimbursementApp.controller('accountsStaffCtrl', ['$scope', '$stateParams', '$rootScope', 'reimbursementServices', function ($scope, $stateParams, $rootScope, service) {

    $scope.ORDER_DATA = {};
    var person = $rootScope.loginPerson;
	// 2017-3-30 【报销】同一个领导兼职两个及以上部门的报销审批与额度设置权限
	var roles = person.user.roles;
	$scope.orgid = person.user.orgid;
	for(var i=0,l=roles.length; i<l; i++) {
		if(roles[i].name == 'approval_gmanager') {
			var extra = roles[i].extra || [];
			$scope.extraArr = [];
			if(extra.length>1) {    // 构造部门下拉列表
				for(var j=0,len=roles[i].params.length; j<len; j++) {
					if(roles[i].params[j].org != undefined) {
						$scope.extraArr.push(roles[i].params[j]);
					}

				}
			}
			if(extra.length>0) {    // 2017-06-23 有些人可能是只负责一个其他部门的人员额度，所以只要extra有值默认就取第一个
				$scope.orgid = extra[0];
			}
		}
	}
    // var person = $cookieStore.get("persion");
    $scope.ORDER_DATA = {userList: [], dataList: [], errorList: [], user: {}, department: {}};
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user.id = person.user._id;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department.id = person.user.orgid;
	$scope.excleFormData = {category: "", zrjt: 0};
    $scope.ready = $scope.readyD = false;
    $scope.listEmployee = $scope.userList = [];
	// 人员额度设置页面中，固定报销-主任津贴选项，只能是有此权限的人且部门=总经办的人员才可见；对于固定报销-非主任津贴选项，只能是有此权限的人且部门=人力资源部的人员才可见
	// 2017-1-19 目前付菁兼职总经办角色，因为付菁隶属人力资源，暂时主任津贴也配到人力资源，等人员确定了，再修改
	// 2017-1-24 修改
	// if(person.user.orgname == "总经理办公室") {
	if(person.user.orgname == "人力资源部") {
		$scope.showzrjt = true;
	}
	if(person.user.orgname == "人力资源部") {
		$scope.showfzrjt = true;
	}
	// 加载部门列表
    /*$scope.departmentObj = function() {
     $scope.readyD = false;
     var listEmployee = service.listEmployee();
     listEmployee.success(function(data) {
     if(data.code == 200) {
     $scope.listEmployee = data.rst.data;
     $scope.readyD = true;
     }
     })
     };
     // 根据部门读取人员
     $scope.userObj = function(id) {
     $scope.ready = false;
     var listUser = service.listUser({orgid: id});
     listUser.success(function(data) {
     if(data.code == 200) {
     $scope.ready = true;
     $scope.listUser = data.rst.data;
     }
     })
     };
     $scope.departmentObj();
     $scope.userObj($scope.ORDER_DATA.department.id);
     $scope.changeDepart = function(sel) {
     var orgId = $scope.listEmployee[sel]._id;
     $scope.userObj(orgId);
     };
     $scope.comeAdd = function(type){
     var obj= {
     'other1': {department: {id:$scope.ORDER_DATA.department.id, name:$scope.ORDER_DATA.department.name}, user: {id:'',name:''}, jtbz: '',cb:'', bjbdnbx:'',phoneBill:''},
     'jjyyfy': {department: {id:'', name:''}, user: {id:'',name:''},zdf: '', phoneBill: '', snjtf: '',clf:'',ccbz:'',qtjjfy:'',jjjp:''}
     };
     $scope.ORDER_DATA[type].push(obj[type]);
     //console.log($scope.ORDER_DATA[type])
     };*/
    $scope.comeDel = function (idx, type) {
    	var d = $scope.ORDER_DATA[type][idx].limit;

	    for(var i in d) {
	    	if(d[i].used > 0) {
	    		swal('有额度被使用过，不允许删除！', '', 'warning');
	    		return false;
		    }
	    }
        $scope.ORDER_DATA[type].splice(idx, 1);
        // 间接费用计算费用汇总
        if ($scope.category == '2-18') {
            $scope.costTotal();
        }
    };

    $scope.categoryChangeFn = function () {
        // $scope.getList();
        $scope.applyDate = '';
        $scope.ORDER_DATA.dataList = '';
        $scope.ORDER_DATA.errorList = '';
        $scope.free = '';
        $scope.used = '';
        $scope.noChange = true;
	    if ($scope.category && $scope.category.split('-')[0] == '1') { // 主任津贴导入时候增加一个参数
		    $.extend($scope.excleFormData, {'zrjt': '1'});
	    }
	    if ($scope.category && $scope.category.split('-')[0] == '2') { // 间接运营导入时候增加一个参数
		    $.extend($scope.excleFormData, {'orgid': $scope.orgid});
	    }
        // 清空日期
        if ($('.uploadify').length > 0) {
            $('.uploadify').uploadify('destroy');
        }
    };
    // 更改部门
    $scope.changeOrgidFn = function () {
	    $scope.excleFormData.orgid = $scope.orgid;
	    // 清空数据
	    $scope.category = '';
    }
    $scope.dateCallback = function () {
        $scope.getList();
    }
    // 不符合导入条件处理方法
	$scope.forbidUploadFn = function () {
		// noChange || noChange2
		if($scope.noChange) {
			swal('请检查日期是否填写', '', 'warning');
			return false;
		}
		if($scope.noChange2) {
			swal('当前已分配到'+$scope.maxMonth+'月，之前月份不允许修改。', '', 'warning');
			return false;
		}
	}
    // 加载之前维护数据
    $scope.getList = function () {
        // 是否允许修改
        $scope.noChange = false;
        $scope.noChange2 = false;
	    if (!$scope.applyDate || $scope.category == '3-13'&&!$scope.jd) {
		    $scope.noChange = true;

	    }
        if (!$scope.applyDate || !$scope.category || $scope.category == '3-13'&&!$scope.jd) return false;
        $scope.excleFormData.category = $scope.category.split('-')[1];
        var applyDate;
        if($scope.category == '3-13') {
            applyDate = [$scope.applyDate, $scope.jd];
        } else {
            applyDate = $scope.applyDate.split('-');
        }
        $scope.excleFormData = {
            'category': $scope.category ? $scope.category.split('-')[1] : '',
            'year': applyDate[0],
            'month': applyDate[1]/*,
            'orgid': $scope.orgid*/
        };
       /* if ($scope.category && $scope.category.split('-')[0] == '1') { // 主任津贴导入时候增加一个参数
            $.extend($scope.excleFormData, {'zrjt': '1'});
        }
        if ($scope.category && $scope.category.split('-')[0] == '2') { // 间接运营导入时候增加一个参数
            $.extend($scope.excleFormData, {'orgid': $scope.orgid});
        }*/
        // console.log('format:', $scope.excleFormData)
        var getList = service.userlimitlist($scope.excleFormData);
        getList.success(function (data) {
            if (data.code == 200) {
                $scope.ORDER_DATA.dataList = data.rst.data.items;
                $scope.dataBF = data.rst.data.items.slice(0);
                $scope.ORDER_DATA.current = data.rst.data.current;
               /* for(var i=0; i<$scope.ORDER_DATA.dataList.length; i++) {
                    if($scope.ORDER_DATA.dataList[i].user.login == 'haobo') {
                        // console.log($scope.ORDER_DATA.dataList[i])
                    }
                }*/
                // 遍历数组，如果有人员已使用了额度，页面不允许再做任何修改
                // 2016-11-23 修改，具体到某个费用种类，已使用的不允许修改，其他的允许修改
                /*loop1:
                    for (var i = 0, l = $scope.ORDER_DATA.dataList.length; i < l; i++) {
                        var obj = $scope.ORDER_DATA.dataList[i].limit;
                        for (var j in obj) {
                            if ("used" in obj[j] && obj[j].used > 0) {
                                $scope.noChange = true;
                                break loop1;
                            }

                        }
                    }*/

                // 间接运营费用填写部门可用额度
                if ($scope.category == '2-18') {
	                if ($scope.ORDER_DATA.current) {
		                $scope.maxMonth = $scope.ORDER_DATA.current.maxmonth;   // 1-12
		                // 当前选择月份
		                var m = applyDate[1];
		                // 如果选择月份小于可编辑的月份，页面不允许修改
		                if ($scope.maxMonth - m > 0) {
			                $scope.noChange2 = true;
		                }
		                var monthlimit = $scope.ORDER_DATA.current.monthlimit;
		                // 计算结余
		                var balance = m == 1 ? 0 : monthlimit[m - 1].balance;
		                console.log('init',m, $scope.maxMonth,m - $scope.maxMonth)
		                // 如果超过部门分配月份，需要更新最大月份，并计算之前月份结余
		                if (m - $scope.maxMonth > 0) {
			                balance = 0;
			                if ($scope.maxMonth == 1) {
				                balance = 0;
			                } else {
				                /*// 计算可编辑最小月份$scope.maxMonth结余
				                var b = monthlimit[$scope.maxMonth - 1].amount + monthlimit[$scope.maxMonth - 1].balance - monthlimit[$scope.maxMonth - 1].orgcount - monthlimit[$scope.maxMonth - 1].usercount;

				                // $scope.maxMonth月到 m-1月份父部门分配额度累加再加 b 即为m月份的balance
				                for (var i = $scope.maxMonth; i < m - 1; i++) {
					                b += monthlimit[i - 1].amount;
				                }
				                balance = monthlimit[i - 1].amount + b - monthlimit[i - 1].orgcount - monthlimit[i - 1].usercount;*/
				                // console.log(monthlimit[i-1].amount, b, monthlimit[i-1].orgcount, monthlimit[i-1].usercount)

				                // 计算m月份的结余
				                for(var i=0; i<m-1; i++) {
					                balance += monthlimit[i].amount*1  - monthlimit[i].orgcount*1 - monthlimit[i].usercount*1;
				                }
			                }
		                }
		                // 本月可用额度
		                $scope.free = monthlimit[m - 1].amount * 1 + balance - monthlimit[m - 1].orgcount;
		                $scope.free = $scope.free || 0;
		                // 计算费用汇总
		                $scope.costTotal();
	                } else {
	                	// 没有 current 属性时把费用数据置为0
		                $scope.free =  0;
		                $scope.used = 0;
	                }
                }
            }
        })
    };
    // 下载模板
    $scope.downloadmb = function (e) {
      /*var userlimittemplate = service.userlimittemplate($scope.excleFormData);
        userlimittemplate.success(function (data) {
            if (data.code !== 200) {
                swal(data.msg, '', 'warning');
            }
        })*/
      // alert('/reimburselimit/userlimittemplate?category='+ $scope.excleFormData.category +'&year=' + $scope.excleFormData.year +'&month=' + $scope.excleFormData.month +'&zrjt=' + $scope.excleFormData.zrjt)
        var category = $scope.category ? $scope.category.split('-')[1] : '';
        $(e.target).attr('href','/reimburselimit/userlimittemplate?category='+ category +'&year=' + $scope.excleFormData.year +'&month=' + $scope.excleFormData.month +'&zrjt=' + $scope.excleFormData.zrjt+'&orgid=' + $scope.excleFormData.orgid) ;

    };

    // 处理导入数据
    $scope.excleConf = {
        formData: $scope.excleFormData,
        buttonText: '导入',
        uploader: '/reimburselimit/userlimitimport'
    };
    $scope.getUploadCallback = function (uploadData) {
        uploadData = uploadData.data;
        $scope.ORDER_DATA.dataList = $scope.dataBF.slice(0);
        // console.log('uploadData',uploadData, $scope.dataBF)
        // 遍历已有数据，没有相同id添加
        // 有相同id的，检查各项费用有没有被使用，没有被使用的替换，有被使用的，保持原数据
        for(var i=0,l=uploadData.right.length; i<l; i++ ){
             var idx = $scope.findIndexFn(uploadData.right[i].user._id, $scope.ORDER_DATA.dataList);

             if(idx != -1) {
                 var obj = $scope.ORDER_DATA.dataList[idx],
	                 dataJson = uploadData.right[i], no=0, nd=0, data, o, d;
	             // 2017-1-19
	             // 不知道为什么有些人没有limit字段，增加一个容错
	             // 容错
	             if( obj.limit == undefined) {
		             obj.limit = {};
	             }
	             if( dataJson.limit == undefined) {
		             dataJson.limit = {};
	             }
	             o = obj.limit;
	             d = dataJson.limit;
	             for(var ii in o) {
	             	no++;
	             }
	             for(var ii in d) {
		             nd++;
	             }
	             data = no<nd ? d : o;

                 for(var ii in data) {
                    // if( !o[ii]  || o[ii].used==0 || o[ii].used==undefined) {  // 替换数据
	                 if( !(o[ii] && o[ii].used)) {  // 替换数据
	                    o[ii] = d[ii];
                    }
                 }
             } else {
                $scope.ORDER_DATA.dataList.push(uploadData.right[i]);
             }
         }
        // 如果有人员已经使用了额度，则不允许修改
        /*if ($scope.noChange) {
            swal('额度已被使用，不允许修改！', '', 'warning');
            return false;
        }
        $scope.ORDER_DATA.dataList = uploadData.right;*/
        $scope.ORDER_DATA.errorList = uploadData.wrong;
        // 间接费用计算费用汇总
        if ($scope.category == '2-18') {
            $scope.costTotal();
        }
    };

    // 间接费用需要实时计算费用汇总
    $scope.costTotal = function () {
        var data = $scope.ORDER_DATA.dataList, d = 0;
        for (var i = 0, l = data.length; i < l; i++) {
            for(var p in data[i].limit) {
                if(['12','47','48','49'].indexOf(p) !== -1) {
                    if(data[i].limit[p].amount!= undefined) {
                        d += data[i].limit[p].amount * 1;
                    }
                }
            }
        }
        $scope.used = d;
    };

    // 根据code码查到所在列表位置
    $scope.findIndexFn = function (id, arr, idName) {
        idName = idName || 'user';
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i][idName]._id == id) {
                return i;
            }
        }
        return -1;
    }

    $scope.saveFn2 = function (param) {
	    var userlimitsave = service.userlimitsave(param);
	    userlimitsave.success(function (data) {
		    if (data.code == 200) {
			    $scope.dataBF = param.docs.slice(0);
			    swal('保存成功', '', 'success');
		    } else {
			    swal(data.msg, '', 'warning');
		    }
	    })
    }
    // 保存
    $scope.addData = function (data) {
        if (!$scope.applyDate || !$scope.category || $scope.category == '3-13'&&!$scope.jd) {
            swal('您有信息填写不全', '', 'warning');
            return false;
        }
        if (data.errorList.length) {
            swal("列表红色的为错误信息，请删除后再提交", "", "warning");
            return false;
        }
        if (!data.dataList.length) {
            swal("请先导入数据", "", "warning");
            return false;
        }
	    var param = {docs: data.dataList};
	    $.extend(param, $scope.excleFormData);
        // 间接费用额度
	    // 如果当前所选月份超过部门分配最大月份，保存时给用户提示
        // 超出部门可用额度，不允许提交
        if ($scope.category == '2-18') {
            if(!$scope.ORDER_DATA.current) {
                swal('所属部门还未分配额度！','', 'warning');
                return false;
            } else {
                if($scope.used - $scope.free > 0) {
                    swal('分配额度不能大于部门可用额度！', '', 'warning');
                    return false;
                }
            }
        }
	    if($scope.category == '2-18' && param.month-$scope.maxMonth>0) {
		    swal({
			    title: "保存后，之前月份将被锁定不可更改！",
			    text: "",
			    type: "warning",
			    showCancelButton: true,
			    confirmButtonColor: "#DD6B55",
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    closeOnConfirm: false
		    }, function () {
			    $scope.saveFn2(param);
		    });
	    } else {
		    $scope.saveFn2(param);
	    }

    };
}]);
// 业务/财务标记
reimbursementApp.controller('financialMarkCtrl', ['$scope', '$stateParams', '$rootScope', '$filter', 'reimbursementServices', function ($scope, $stateParams, $rootScope, $filter, service) {
    // 业务标示、财务标示
    // 暂时根据登录人是否属于财务部判断
    var person = $rootScope.loginPerson;
    // var person = $cookieStore.get("persion");
    if (person.user.orgid == '5746705e4e60fa6e56176410') {    // 财务部
        $scope.financeFlag = true;
    } else {
        $scope.businessFlag = true;
    }
    $scope.dataList = [];

    var d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    // 判断数组中是否有重复数据
    var isRepeat = function (arr) {
        var hash = {};

        for (var i in arr) {
            var h = hash[arr[i]];
            if (h){
                arr.splice(i,1);
                return h;
            }
            hash[arr[i]] = arr[i];
        }
        return false;
    };
    /*$scope.$watch('code', function (newValue, oldValue) {
        if (newValue === oldValue) return false;
        newValue = newValue.split('\n');
        oldValue = oldValue.split('\n');
        console.log(newValue.length, oldValue.length)
        if(newValue.length>1 && newValue[0].length != newValue[newValue.length-1].length) return false;
        console.log(newValue.length,  newValue[0], newValue[newValue.length-1])
        // console.log(newValue, oldValue, oldValue.length, newValue.length)
        if (oldValue.length == 1 && oldValue[0] && newValue.length === oldValue.length) return false;

        // 如果新加的数据在原有单号里面已存在，给用户提示
        var repeatValue = isRepeat(newValue);
        if (repeatValue) {
            alert(111)
            console.log(1111111111)
            $scope.code = newValue.pop();
            /!*swal({
                title: '单号' + repeatValue + '已存在',
                text: "",
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: true
            }, function () {
                 $scope.code = newValue.pop();
            });*!/
            return false;
        }
        for (var i = 0, l = newValue.length; i < l; i++) {
            var v = newValue[i];
            if (oldValue.indexOf(v) == -1) {
                // $scope.dataList.unshift({code:i});
                // 调接口获取数据
                var dataList = service.read({code: newValue[i]});
                dataList.success(function (data) {
                    if (data.code == 200) {
                        var d = data.rst.data;
                        if ($scope.businessFlag && d.finance.businessdate) {
                            swal('报销单' + v + '已做业务标记', '', 'warning');
                            return false;
                        }
                        if ($scope.financeFlag && d.finance.certcode) {
                            swal('报销单' + v + '已生成了会计凭证，不能再标记', '', 'warning');
                            return false;
                        }
                        if ( d.info.status == 'invalid') {
                            swal('报销单' + v + '已被作废', '', 'warning');
                            return false;
                        }

                        d.invoicetype = [d.cost.invoicetype, d.cost.invoicetypestr].join('|');
                        $scope.dataList.unshift(d);

                    }
                })
            }
        }
    })*/
    $scope.oldids = [];
    $scope.getDetail = function () {
        var oldValue = $scope.oldids, value=$scope.code.toUpperCase();
        if (value === oldValue.join('\n').toUpperCase()) return false;
        var newValue = value.split('\n');

        // 如果新加的数据在原有单号里面已存在，给用户提示
        var repeatValue = isRepeat(newValue);
        if (repeatValue) {
            window.setTimeout(function () {
                $scope.$apply(function () {
                    $scope.code = newValue.join('\n');
                    // console.log('code',$scope.code )
                });
            },0)
            swal('单号' + repeatValue + '已存在', '', 'warning');
            return false;
        }
        for (var i = 0, l = newValue.length; i < l; i++) {
            var v = newValue[i];
            if (v && oldValue.indexOf(v) == -1) {
                // $scope.dataList.unshift({code:i});
                // 调接口获取数据
                var dataList = service.read({code: newValue[i]});
                dataList.success(function (data) {
                    if (data.code == 200) {
                        var d = data.rst.data;
	                    $scope.oldids.unshift(d.code);
                        if ($scope.businessFlag && d.finance.businessdate) {
                            swal('报销单' + v + '已做业务标记', '', 'warning');
                            return false;
                        }
                        if ($scope.financeFlag && d.finance.certcode) {
                            swal('报销单' + v + '已生成了会计凭证，不能再标记', '', 'warning');
                            return false;
                        }
                        if (d.info.status == 'invalid') {
                            swal('报销单' + v + '已被作废', '', 'warning');
                            return false;
                        }

                        d.invoicetype = [d.cost.invoicetype, d.cost.invoicetypestr].join('|');
	                    // console.log('invoicetype', d.invoicetype)
                        $scope.dataList.unshift(d);

                    }
                })
            }
        }
    }

    // 禁止删除
    $('#markIpt').keydown(function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 8 || keycode == 46) {
            return false;
        }
        /*if(keycode == '13') {
            $scope.getDetail($scope.code, $scope.oldids);
        }*/
    }).keyup(function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if(keycode == '13') {
            $scope.getDetail();
        }
    });
    $('#markIpt').focus();


    // 复选框事件
    $scope.cArr = [];
    $scope.cArrdata = [];
    var updateSelected = function (action, id, index) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrdata.push($scope.dataList[index]);
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrdata.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, index);
        // console.log('cArrdata:', $scope.cArrdata);
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAllpurchasefd = false;
        $scope.cArr = [];
        $scope.cArrdata = [];
        // console.log('cArrdata:', $scope.cArrdata);
    };
    $scope.allCheck = function ($event) {
        //var checkbox = $event.target;
        //$scope['checkAll'+type] = checkbox.checked ? true : false;

        if ($scope.checkAll) {
            for (var i = 0; i < $scope.dataList.length; i++) {
                $scope.cArr[i] = $scope.dataList[i].code;
                $scope.cArrdata[i] = $scope.dataList[i];
            }
        } else {
            $scope.cArr = [];
            $scope.cArrdata = [];
        }
        // console.log('cArrdata:', $scope.cArrdata, $scope.dataList);
    };
    // 票据类型
    var constlist = service.constlist();
    $scope.selectType = {};
    constlist.success(function (data) {
        if (data.code == 200) {
            $scope.selectType.categorySel = data.rst.data.costtype; // 费用种类
        } else {
            swal(data.msg, '', 'warning');
        }
    })
    // 业务标记
    $scope.markFn = function () {
        if (!$scope.cArrdata.length) {
            swal("请勾选列表", "", "warning");
            return false;
        }
        var markbusiness = service.markbusiness({docs: $scope.cArrdata});
        markbusiness.success(function (data) {
            if (data.code == 200) {
                swal('标记成功！', '', 'success');
                // 更新对应数据
                var newData = data.rst.data;
                for (var i = 0, l = newData.length; i < l; i++) {
                    var idx = $scope.findIndexFn(newData[i].code, $scope.dataList);
                    newData[i].invoicetype = [newData[i].cost.invoicetype, newData[i].cost.invoicetypestr].join('|');
                    $scope.dataList[idx] = newData[i];
                }
            } else {
                swal(data.msg, '', 'warning');
            }
        })
    };
    // 财务标记
    $scope.sendFn = function () {
        if (!$scope.cArrdata.length) {
            swal("请勾选列表", "", "warning");
            return false;
        }
	    console.log('aaa',$scope.cArrdata)

        $("#sendDialog").dialog({
            autoOpen: false,
            width: 450,
            modal: true
        });
        $("#sendDialog").dialog("open");

        $scope.sendConfirmFn = function (d) {
            // 财务科修改附件张数、税额和种类，标记时更新对应数据
            if ($scope.financeFlag) {
                for (var i = 0, l = $scope.cArrdata.length; i < l; i++) {
                    var idx = $scope.findIndexFn($scope.cArrdata[i].code, $scope.dataList);
                    $scope.cArrdata[i].cost.attanum = $scope.dataList[idx].cost.attanum;
                    $scope.cArrdata[i].cost.tax = $scope.dataList[idx].cost.tax;
                    var invoicetype = $scope.dataList[idx].invoicetype.split('|');
                    $scope.cArrdata[i].cost.invoicetype = invoicetype[0];
                    $scope.cArrdata[i].cost.invoicetypestr = invoicetype[1];
                }
            }
            var trans = service.trans({docs: $scope.cArrdata, certdate: d.certdate});
            trans.success(function (data) {
                if (data.code == 200) {
                    // 更新对应数据
                    var newData = data.rst.data;
                    for (var i = 0, l = newData.length; i < l; i++) {
                        var idx = $scope.findIndexFn(newData[i].code, $scope.dataList);
                        newData[i].invoicetype = [newData[i].cost.invoicetype, newData[i].cost.invoicetypestr].join('|');
                        $scope.dataList[idx] = newData[i];
                    }

                    //有标记失败的  给出提示
                    var errData = data.rst.fail;
                    if (errData.length) {
                        var errCode = [];
                        for (var i = 0, l = errData.length; i < l; i++) {
                            errCode[i] = errData[i].code;
                        }
                        swal(errCode.join('<br>') + '标记传送失败', '', 'warning');
                    } else {
                        swal('标记传送成功！', '', 'success');
                    }
                } else {
                    swal(data.msg, '', 'warning');
                }
                $scope.cancelFn();
            })
        };

        $scope.cancelFn = function () {
            $("#sendDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }

    };

    // 根据code码查到所在列表位置
    $scope.findIndexFn = function (code, arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i].code == code) {
                return i;
            }
        }
    }

}]);

// 冲销
reimbursementApp.controller('writeOffCtrl', ['$scope', '$stateParams', '$filter', 'reimbursementServices', function ($scope, $stateParams, $filter, service) {

    var d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    $scope.dataList = [];
    // 查询
    $scope.searchFn = function () {
        var param = {
            certcode: $scope.certcode,
            certyear: $scope.certyear,
            scope: 'all'
        };
        if (!$scope.certcode || !$scope.certyear) {
            var txt = !$scope.certcode ? '请输入会计凭证号' : '请输入会计年度';
            swal(txt, '', 'warning');
            return false;
        }
        var customerPromise = service.list(param);
        customerPromise.success(function (data) {
            if (data.code == 200) {
                $scope.dataList = data.rst.data.items;
            } else {
                swal(data.msg, '', 'warning');
            }
        });
    };

    // 冲销
    $scope.chargeoffFn = function () {
        if (!$scope.dataList.length) {
            swal('没有可冲销的报销单', '', 'warning');
            return false;
        }
        $("#chargeoffDialog").dialog({
            autoOpen: false,
            width: 450,
            modal: true
        });
        $("#chargeoffDialog").dialog("open");

    };
    $scope.cancelFn = function () {
        $("#sendDialog").dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.chargeoffConfirmFn = function () {
        var requiredObj = $scope.userForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.userForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {
            certcode: $scope.certcode,
            certyear: $scope.certyear,
            chargeoffdate: $scope.chargeoffdate,
            reason: $scope.reason
        };
        var chargeoff = service.chargeoff(param);
        chargeoff.success(function (data) {
            if (data.code == 200) {
            	if(data.rst.status == 0) {
		            swal('冲销成功！', '', 'success');
	            } else {
		            swal(data.rst.msg, '', 'warning');
	            }
            } else {
                swal(data.msg, '', 'warning');
            }
            $scope.cancelFn();
        });
    };
}]);

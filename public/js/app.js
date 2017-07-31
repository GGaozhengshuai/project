var app = angular.module('app', [
	'ui.router','oc.lazyLoad', 'ngAnimate','ngCookies',"ngmodel.format", 'indexApp','SocketMessageApp'
	, 'ngTouch', 'ui.grid', 'ui.grid.pinning', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.autoResize'
	, 'customerApp'
	// , 'userApp', 'employeeApp', 'applyApp',
	// 'purchaseApp', 'insideApp','incomeApp','paymentApp','issueApp'
	// ,'receiptsApp','occupyApp','checkApp','bankCreditApp','contractApp','salesbonusApp','mkinvoiceApp','pojckApp','loanBillApp'
	// ,'productoutApp','sellclueApp','signApp','creditApp','deptassureApp','materielApp','creditMemoApp','intoBillApp'
	// ,'homeApp','reimbursementApp','loanManageApp','holidayApp','approvalApp'

]);

app.run(['$rootScope', '$state', '$stateParams'/*,'$cookieStore'*/, 'locals', '$window', 'SocketServe',
	function($rootScope, $state, $stateParams/*,$cookieStore*/, locals, $window, SocketServe) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		// var person = $cookieStore.get("persion");
		// $rootScope.loginPerson = $cookieStore.get("persion");
		var person = locals.getObject('persion');
		$window.onfocus = function () {
			var _u = locals.getObject('persion');
			if(!$.isEmptyObject(person) && person.username !== _u.username) {
				swal({
					title: "登录用户已变更为" + _u.user.name,
					text: "",
					type: "warning",
					confirmButtonText: "确认",
				}, function () {
					$window.location.reload();
				});
			}
		};
		$rootScope.loginPerson = locals.getObject('persion');
		if(!$.isEmptyObject(person)){
			$rootScope.userName = person.username;
			$rootScope.userChineseName = person.user.name;
			$rootScope.billPrev = person.user.newprev;
			$rootScope.opprev = person.user.opprev;
			$rootScope.busiRoles = person.user.busi_roles;
			// {service : person.user.socketUri,secretkey : person.user.socketUri}
			if(person.user.socketUri && person.user.socketUri.host){
				$rootScope.socketUri = 'http://'+ person.user.socketUri.host + ':' + person.user.socketUri.port;
				// 建立连接Socket @wenbo 2017/01/18
				SocketServe.msgInit($rootScope.socketUri + '/pns',person.token,person.user,
					function (res) {
						$rootScope.$apply(function () {
							$rootScope.openSocketStart = res;
						})
					}, function (err) {
						$rootScope.openSocketStart = false;
						console.log(err)
					}
				);
			}


		}else{
			window.location.href='login.html';
		}
		/* $.post('/user/getprev',{'login':person.user.login}, function(data) {
		 // $rootScope.billPrev = data.rst.data;
		 console.log(data.rst.data,2222)
		 locals.setObject('billPrev', data.rst.data)
		 });*/

		/**
		 * 增加页面标题，通过配置读取路由（$state）中 title, 之后需要加title直接在路由中配置即可
		 * @type {[type]}
		 */
		$rootScope.$on('$stateChangeSuccess', function(evt, state, params, fromState, fromParams){
			var defautlTitle = '中建信息数字化工作平台', title;

			// 我的单据（待办、已办等）列表title特殊处理
			if(state.name == 'typeList') {
				var getParaFromString = function (paraName) {
					var str = $window.location.href, dstr = str, arr=[],reg;
					try {
						str = decodeURIComponent(str);
					} catch (e) {
						str = str.replace(/"%26"/g, "&");
					}
					arr = str.split('?');
					str = arr.length>1 ? arr[1] : '';
					reg = new RegExp("(?:^|&)" + paraName + "=([^&$]*)", "gi");
					return reg.test(str) ? decodeURIComponent(RegExp.$1) : ""
				}

				var name = getParaFromString('controllerName'),
					type = getParaFromString('myflag');

				type = type ? {'mydoings': '待办', mydones: '已办', 'mysubscribers': '订阅', 'myapplys': '申请', 'mybegins': '草稿'}[type] : '';

				title = type ? [name, type].join('-') : name;
			}
			title = title != undefined ? title
				: state.title != undefined ? state.title : defautlTitle;
			$window.document.title = title;
		});

		//在angular中使用uploadify遇到几个很诡异的问题。
		//1、进入使用uploadify的view，一切正常。
		//2、切换路由到另一个view，IE下报出N多Error
		// 解决办法
		$rootScope.$on('$stateChangeStart', function(e, toState, toStateParams){
			if(e && $('.uploadify').length>0) {
				$('.uploadify').uploadify('destroy');
			}
			if ( toState.data && !(toState.data.noPermissions && $rootScope.opprev[toState.data.noPermissions]) ) {
				console.log('No permissions!');
				setTimeout(function () {
					window.location.href = '/index.html#/index';
					window.location.reload(true);
				},50)
			} else {
				$(window).scrollTop(0);
			}
		})
	}
]);
app.constant('MODULE_CONFIG', [])
	.config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
		$ocLazyLoadProvider.config({
			debug: false,
			events: false,
			modules: MODULE_CONFIG
		});
	}]);
app.config(
	function($stateProvider, $urlRouterProvider ,$httpProvider,MODULE_CONFIG) {
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};
		}

		$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
		$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

		$urlRouterProvider.otherwise('/index');
		$httpProvider.interceptors.push('timestampMarker');
		$stateProvider




			.state('index', {
				title: '中建材信息数字化工作平台-首页',
				url: '/index',
				templateUrl: '../template/home/home.html',
				resolve: load(['js/home/home.js']),
				controller: 'homeCtrl',
				data: {
					noPermissions: 'index'
				}
			})
			//.state('index',{
			//    url: '/index',
			//    templateUrl: '../template/index.html',
			//    controller: 'indexCtrl'
			//})
			.state('test', {
				url: '/test',
				templateUrl: '../template/test.html'
			})
			.state('userList', {
				title: '员工查询',
				url: '/userList',
				templateUrl: '../template/user/list.html',
				controller: 'userListCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'userList'
				}
			})
			.state('viewUser', {
				title: '员工详情',
				url: '/viewUser/:id',
				templateUrl: '../template/user/viewUser.html',
				controller: 'viewUserCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'userList'
				}
			})
		/**
		 * C: Shen
		 * D: 工资单
		 */
			.state('payroll', {
				title: '工资单查询',
				url: '/payroll',
				templateUrl: '../template/user/payroll.html',
				controller: 'payrollFindCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'payroll'
				}
			})
			.state('manageRole', {
				title: '人员角色管理',
				url: '/manageRole',
				templateUrl: '../template/user/role.html',
				controller: 'manageRoleCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'manageRole'
				}
			})
			.state('documentDescription', {
				title: '文档说明',
				url: '/documentDescription',
				resolve: load(['js/user/userApp.js']),
				templateUrl: '../template/user/documentDescription.html',
			})
			.state('roleBill', {
				title: '角色菜单权限配置',
				url: '/roleBill',
				templateUrl: '../template/user/role_bill.html',
				controller: 'roleBillCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'roleBill'
				}
			})
			.state('rolesName', {      //  角色管理
				title: '角色管理',
				url: '/rolesName',
				templateUrl: '../template/user/rolesName.html',
				controller: 'rolesNameCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'rolesName'
				}
			})
			.state('procprevs', {      //  角色审批权限管理
				title: '角色审批权限配置',
				url: '/procprevs',
				templateUrl: '../template/user/procprevs.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'procprevsCtrl'
			})
			.state('menuManagement', {
				title: '菜单权限管理',
				url: '/menuManagement',
				templateUrl: '../template/user/menuManagement.html',
				controller: 'menuManagementCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'menuManagement'
				}
			})
			.state('bussinessMan', {
				title: '销售-商务对应维护',
				url: '/bussinessMan',
				templateUrl: '../template/user/bussinessMan.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'bussinessManCtrl'
			})
			.state('position_set', {
				title: '审批负责人维护',
				url: '/position_set',
				templateUrl: '../template/user/position_set.html',
				controller: 'PositionSetCtrl',
				resolve: load(['js/user/userApp.js'])
			})
			.state('financialInfo', {
				title: '供方财务信息维护',
				url: '/financialInfo',
				templateUrl: '../template/user/financialInfo.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'financialInfoCtrl'
			})
			.state('employee', {
				title: '部门管理',
				url: '/employee',
				templateUrl: '../template/employee/list.html',
				controller: 'employeeCtrl',
				resolve: load(['js/employee/employeeApp.js']),
				data: {
					noPermissions: 'employee'
				}
			})
			.state('customerList', {
				title: '客户管理',
				url: '/customerList',
				templateUrl: '../template/customer/list.html',
				controller: 'customerList1Ctrl',
				resolve: load(['js/customer/customer.js']),
				data: {
					noPermissions: 'customerList'
				}
			})
			.state('viewCustomer', {
				title: '客户管理详情',
				url: '/viewCustomer/:id',
				templateUrl: '../template/customer/view.html',
				controller: 'viewCustomerCtrl',
				resolve: load(['js/customer/customer.js']),
				data: {
					noPermissions: 'customerList'
				}
			})

			.state('editCustomer', {
				title: '客户管理-变更',
				url: '/editCustomer?processId&sapid&nodeId',
				templateUrl: '../template/customer/edit.html',
				controller: 'editCustomerCtrl',
				resolve: load(['js/customer/customer.js']),
				data: {
					noPermissions: 'customer_change'
				}
			})
			.state('addCustomer', {
				title: '客户管理新建',
				url: '/addCustomer',
				templateUrl: '../template/customer/add.html',
				controller: 'addCustomerCtrl',
				resolve: load(['js/customer/customer.js']),
				data: {
					noPermissions: 'customer_add'
				}
			})
			.state('purchaseList', {  //采购申请
				title: '采购申请',
				url: '/purchaseList',
				templateUrl: '../template/purchase/list.html',
				controller: 'purchaseCtrl',
				resolve: load(['js/receiptsApply/receipts.js','js/purchase/purchase.js']),
				data: {
					noPermissions: 'purchaseList'
				}
			})
			.state('purchaseView', {  //采购申请查看
				title: '采购申请详情',
				url: '/purchaseView/:id',
				templateUrl: '../template/purchase/view.html',
				controller: 'purchaseViewCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purchaseList'
				}
			})
			.state('purOrder', {  //采购订单
				title: '采购订单',
				url: '/purOrder',
				templateUrl: '../template/purchase/purOrder.html',
				controller: 'purOrderCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purOrder'
				}
			})
			.state('purOrderView', {  //采购订单查看
				title: '采购订单详情',
				url: '/purOrderView/:id',
				templateUrl: '../template/purchase/purOrderView.html',
				controller: 'purOrderViewCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purOrder'
				}
			})
			.state('purRebate', {  //采购返点
				title: '采购返点',
				url: '/purRebate',
				templateUrl: '../template/purchase/purRebate.html',
				controller: 'purRebateCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purRebate'
				}
			})
			.state('purRebateView', {  //采购返点查看
				title: '采购返点详情',
				url: '/purRebateView/:id',
				templateUrl: '../template/purchase/purRebateView.html',
				controller: 'purRebateViewCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purRebate'
				}
			})
			.state('purMaintain', {  //采购维修
				title: '维修采购',
				url: '/purMaintain',
				templateUrl: '../template/purchase/purMaintain.html',
				resolve: load(['js/purchase/purchase.js']),
				controller: 'purMaintainCtrl'
			})
			.state('purMaintainView', {  //采购维修查看
				title: '维修采购详情',
				url: '/purMaintainView/:id',
				templateUrl: '../template/purchase/purMaintainView.html',
				resolve: load(['js/purchase/purchase.js']),
				controller: 'purMaintainViewCtrl'
			})
			.state('purPact', {  //采购框架合同
				title: '采购框架合同',
				url: '/purPact',
				templateUrl: '../template/purchase/purPact.html',
				controller: 'purPactCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purPact'
				}
			})
			.state('purPactView', {  //采购框架合同查看
				title: '采购框架合同详情',
				url: '/purPactView/:id',
				templateUrl: '../template/purchase/purPactView.html',
				controller: 'purPactViewCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purPact'
				}
			})
			.state('purStore', {  //库存调整
				title: '库存调整',
				url: '/purStore',
				templateUrl: '../template/purchase/purStore.html',
				controller: 'purStoreCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purStore'
				}
			})
			.state('purStoreView', {  //库存调整查看
				title: '库存调整详情',
				url: '/purStoreView/:id?type',
				templateUrl: '../template/purchase/purStoreView.html',
				controller: 'purStoreViewCtrl',
				resolve: load(['js/purchase/purchase.js']),
				data: {
					noPermissions: 'purStore'
				}
			})
			.state('insideOrder', {  //内部订单
				title: '费用申请单',
				url: '/insideOrder',
				templateUrl: '../template/insideOrder/list.html',
				controller: 'insideOrderCtrl',
				resolve: load(['js/insideOrder/insideOrder.js']),
				data: {
					noPermissions: 'insideOrder'
				}
			})
			.state('insideOrderAdd', {  //内部订单
				title: '新增费用申请单',
				url: '/insideOrderAdd',
				templateUrl: '../template/insideOrder/add.html',
				controller: 'insideOrderAddCtrl',
				resolve: load(['js/insideOrder/insideOrder.js']),
				data: {
					noPermissions: 'insideOrder_add'
				}
			})
			.state('insideOrderEdit', {  //内部订单
				title: '费用申请-追加预算',
				url: '/insideOrderEdit?processId&sapid&nodeId',
				templateUrl: '../template/insideOrder/edit.html',
				controller: 'insideOrderEditCtrl',
				resolve: load(['js/insideOrder/insideOrder.js']),
				data: {
					noPermissions: 'insideOrder_addmore'
				}
			})
			.state('insideEdit', {  //内部订单
				title: '费用申请-草稿编辑',
				url: '/insideEdit?processId&sapid&nodeId',
				templateUrl: '../template/insideOrder/insideEdit.html',
				resolve: load(['js/insideOrder/insideOrder.js']),
				controller: 'insideEditCtrl'
			})
			.state('insideOrderView', {  //内部订单
				title: '费用申请详情',
				url: '/insideOrderView/:id',
				templateUrl: '../template/insideOrder/view.html',
				controller: 'insideOrderViewCtrl',
				resolve: load(['js/insideOrder/insideOrder.js']),
				data: {
					noPermissions: 'insideOrder'
				}
			})
			//收款计划单
			.state('incomeOrder', {  //收款计划单
				title: '收款计划单',
				url: '/incomeOrder',
				templateUrl: '../template/income/list.html',
				controller: 'incomeOrderCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'incomeOrder'
				}
			})
			.state('incomeOrderAdd', {
				title: '收款计划单新建',
				url: '/incomeOrderAdd?receivable',
				templateUrl: '../template/income/add.html',
				controller: 'incomeOrderAddCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'incomeOrder_add'
				}
			})

			.state('incomeEdit', {//审批完成编辑
				title: '收款计划单变更',
				url: '/incomeEdit?sapid',
				templateUrl: '../template/income/edit.html',
				controller: 'incomeEditCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'incomeOrder_change'
				}
			})
			.state('incomeOrderView', {
				title: '收款计划单详情',
				url: '/incomeOrderView/:id',
				templateUrl: '../template/income/view.html',
				controller: 'incomeOrderViewCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'incomeOrder'
				}
			})

			.state('debitbillList', {
				title: '票据台账',
				url: "/debitbillList",
				templateUrl: '../template/income/debitbillList.html',
				controller: 'debitbillListCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'debitbillList'
				}
			})
			.state('debitbillAdd', {
				title: '票据台账新建',
				url: "/debitbillAdd",
				templateUrl: '../template/income/debitbillAdd.html',
				controller: 'debitbillAddCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'debitbillList_add'
				}
			})
			.state('debitbill', {//未审批的查看
				title: '票据台账审批详情',
				url: "/debitbill?myflag&processId&nodeId",
				templateUrl: '../template/income/debitbill.html',
				resolve: load(['js/income/income.js']),
				controller: 'debitbillCtrl'
			})
			.state('debitbillView', {
				title: '票据台账详情',
				url: '/debitbillView/:id',
				templateUrl: '../template/income/debitbillView.html',
				controller: 'debitbillViewCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'debitbillList'
				}
			})
			.state('debitbillOrderEdit', {//未审批完成编辑
				title: '票据台账草稿',
				url: '/debitbillOrderEdit?processId&nodeId',
				templateUrl: '../template/income/debitbillOrderEdit.html',
				resolve: load(['js/income/income.js']),
				controller: 'debitbillOrderEditCtrl'
			})
			.state('debitbillEdit', {
				title: '票据台账变更',
				url: '/debitbillEdit/:id',
				templateUrl: '../template/income/debitbillEdit.html',
				controller: 'debitbillEditCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'debitbillList_change'
				}
			})
			.state('receivableList', {
				title: '应收查询',
				url: "/receivableList",
				templateUrl: '../template/income/receivableList.html',
				controller: 'receivableListCtrl',
				resolve: load(['js/income/income.js']),
				data: {
					noPermissions: 'receivableList'
				}
			})
			//付款计划单
			.state('paymentOrder', {
				title: '付款申请单',
				url: '/paymentOrder',
				templateUrl: '../template/payment/list.html',
				controller: 'paymentOrderCtrl',
				resolve: load(['js/payment/payment.js']),
				data: {
					noPermissions: 'paymentOrder'
				}
			})
			.state('paymentOrderAdd', {
				title: '付款申请单新建',
				url: '/paymentOrderAdd?orderLifnr&orderEBELN&orderName&payCode',
				templateUrl: '../template/payment/add.html',
				controller: 'paymentOrderAddCtrl',
				resolve: load(['js/payment/payment.js']),
				data: {
					noPermissions: 'paymentOrder_add'
				}
			})
			/*.state('paymentAdd',{
			 url: '/paymentAdd?orderLifnr&orderEBELN',
			 templateUrl: '../template/payment/paymentAdd.html',
			 controller: 'paymentAddCtrl'
			 })*/
			.state('paymentOrderEdit', {
				title: '付款申请单-变更',
				url: '/paymentOrderEdit?processId&sapid&nodeId',
				templateUrl: '../template/payment/edit.html',
				resolve: load(['js/payment/payment.js']),
				controller: 'paymentOrderEditCtrl'
			})
			.state('hbEdit', {
				title: '合并付款申请单变更',
				url: '/hbEdit?sapid',
				templateUrl: '../template/payment/hbEdit.html',
				resolve: load(['js/payment/payment.js']),
				controller: 'hbEditCtrl'
			})
			.state('paymentOrderView', {
				title: '付款申请单详情',
				url: '/paymentOrderView/:id',
				templateUrl: '../template/payment/view.html',
				controller: 'paymentOrderViewCtrl',
				resolve: load(['js/payment/payment.js']),
				data: {
					noPermissions: 'paymentOrder'
				}
			})
			/* .state('getMoney',{//收款情况
			 url: '/getMoney?orderid',
			 templateUrl: '../template/payment/getMoney.html',
			 controller: 'getMoneyCtrl'
			 })*/
			.state('credit', {
				title: '付款申请-审批详情',
				url: "/credit?myflag&processId&nodeId",
				templateUrl: '../template/payment/applyView.html',
				resolve: load(['js/payment/payment.js']),
				controller: 'applyCreditCtrl'
			})
			//开证付汇
			.state('issueOrder', {
				title: '开证付汇',
				url: '/issueOrder',
				templateUrl: '../template/issue/list.html',
				controller: 'issueOrderCtrl',
				resolve: load(['js/issue/issue.js']),
				data: {
					noPermissions: 'issueOrder'
				}
			})
			.state('issueOrderAdd', {
				title: '新增开证付汇',
				url: '/issueOrderAdd',
				templateUrl: '../template/issue/add.html',
				controller: 'issueOrderAddCtrl',
				resolve: load(['js/issue/issue.js']),
				data: {
					noPermissions: 'issueOrder_add'
				}
			})
			.state('issueOrderEdit', {
				title: '开证付汇草稿',
				url: '/issueOrderEdit?processId&sapid&nodeId',
				templateUrl: '../template/issue/edit.html',
				resolve: load(['js/issue/issue.js']),
				controller: 'issueOrderEditCtrl'
			})
			.state('issueOrderView', {
				title: '开证付汇详情',
				url: '/issueOrderView/:id',
				templateUrl: '../template/issue/view.html',
				controller: 'issueOrderViewCtrl',
				resolve: load(['js/issue/issue.js']),
				data: {
					noPermissions: 'issueOrder'
				}
			})
			.state('issueOrderChange', {
				title: '开证付汇变更',
				url: '/issueOrderChange?id',
				templateUrl: '../template/issue/change.html',
				controller: 'issueOrderChangeCtrl',
				resolve: load(['js/issue/issue.js']),
				data: {
					noPermissions: 'issueOrder_change'
				}
			})
			.state('kzfh', {
				title: '开证付汇-审批详情',
				url: "/kzfh?myflag&processId&nodeId",
				templateUrl: '../template/issue/applyView.html',
				resolve: load(['js/issue/issue.js']),
				controller: 'applyKzfhCtrl'
			})
			//产品占用
			.state('occupyOrder', {
				title: '产品占用',
				url: '/occupyOrder',
				templateUrl: '../template/occupy/list.html',
				controller: 'occupyOrderCtrl',
				resolve: load(['js/occupy/occupy.js']),
				data: {
					noPermissions: 'occupancyOrder'
				}
			})
			.state('occupyOrderAdd', {
				title: '新增产品占用',
				url: '/occupyOrderAdd',
				templateUrl: '../template/occupy/add.html',
				controller: 'occupyOrderAddCtrl',
				resolve: load(['js/occupy/occupy.js']),
				data: {
					noPermissions: 'occupancyOrder_add'
				}
			})
			.state('occupyOrderEdit', {
				title: '产品占用变更',
				url: '/occupyOrderEdit/:id',
				templateUrl: '../template/occupy/edit.html',
				controller: 'occupyOrderEditCtrl',
				resolve: load(['js/sellclue/sellclue.js','js/occupy/occupy.js']),
				data: {
					noPermissions: 'occupancyOrder_change'
				}
			})
			.state('occupyOrderView', {
				title: '产品占用详情',
				url: '/occupyOrderView/:id',
				templateUrl: '../template/occupy/view.html',
				controller: 'occupyOrderViewCtrl',
				resolve: load(['js/occupy/occupy.js']),
				data: {
					noPermissions: 'occupancyOrder'
				}
			})//库存查询
			.state('repertoryOrder', {
				title: '库存查询',
				url: '/repertoryOrder',
				templateUrl: '../template/repertory/list.html',
				controller: 'repertoryOrderCtrl',
				resolve: load(['js/occupy/occupy.js']),
				data: {
					noPermissions: 'repertoryOrder'
				}
			})
			//银行授信
			.state('bankCreditOrder', {
				title: '银行授信',
				url: '/bankCreditOrder',
				templateUrl: '../template/bankCredit/list.html',
				controller: 'bankCreditOrderCtrl',
				resolve: load(['js/bankCredit/bankCredit.js']),
				data: {
					noPermissions: 'bankCreditOrder'
				}
			})
			.state('bankCreditOrderAdd', {
				title: '新增银行授信',
				url: '/bankCreditOrderAdd?sap&proId&noId',
				templateUrl: '../template/bankCredit/add.html',
				controller: 'bankCreditOrderAddCtrl',
				resolve: load(['js/bankCredit/bankCredit.js']),
				data: {
					noPermissions: 'bankCreditOrder_add'
				}
			})
			.state('bankCreditOrderEdit', {
				title: '编辑银行授信',
				url: '/bankCreditOrderEdit?processId&nodeId&sapid',
				templateUrl: '../template/bankCredit/edit.html',
				resolve: load(['js/bankCredit/bankCredit.js']),
				controller: 'bankCreditOrderEditCtrl'
			})
			.state('bankCreditOrderView', {
				title: '银行授信详情',
				url: '/bankCreditOrderView/:id',
				templateUrl: '../template/bankCredit/view.html',
				controller: 'bankCreditOrderViewCtrl',
				resolve: load(['js/bankCredit/bankCredit.js']),
				data: {
					noPermissions: 'bankCreditOrder'
				}
			})
			.state('bankcredit', {
				title: '银行授信-审批详情',
				url: "/bankcredit?myflag&processId&nodeId&pay",
				templateUrl: '../template/bankCredit/applyView.html',
				resolve: load(['js/bankCredit/bankCredit.js']),
				controller: 'applyBankCreditCtrl'
			})
			.state('bkBankCredit', {
				title: '银行授信额度',
				url: "/bkBankCredit",
				templateUrl: '../template/bankCredit/bklist.html',
				resolve: load(['js/bankCredit/bankCredit.js']),
				controller: 'bkBankCreditCtrl'
			})
			.state('bmBankCredit', {
				title: '部门银行授信额度',
				url: "/bmBankCredit",
				templateUrl: '../template/bankCredit/bmlist.html',
				resolve: load(['js/bankCredit/bankCredit.js']),
				controller: 'bmBankCreditCtrl'
			})
			.state('bankExport', {
				title: '银行授信报表',
				url: "/bankExport",
				templateUrl: '../template/bankCredit/bankExport.html',
				controller: 'bankExportCtrl',
				resolve: load(['js/bankCredit/bankCredit.js']),
				data: {
					noPermissions: 'bankExport'
				}
			})
			//销售合同
			.state('contractOrder', {
				title: '销售合同',
				url: '/contractOrder?purchaseid',
				templateUrl: '../template/contract/list.html',
				controller: 'contractOrderCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'contractOrder'
				}
			})
			.state('contractDraft', { //销售合同草稿
				url: '/contractDraft',
				templateUrl: '../template/contract/draftList.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'contractDraftCtrl'
			})
			.state('contractOrderAdd', {
				title: '新建销售合同',
				url: '/contractOrderAdd?copyId',
				templateUrl: '../template/contract/add.html',
				controller: 'contractOrderAddCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'contractOrder_add'
				}
			})
			.state('contractOrderEdit', {
				title: '编辑销售合同',
				url: '/contractOrderEdit?myflag&processId&nodeId&relationId&contractType',
				templateUrl: '../template/contract/edit.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'contractOrderEditCtrl'
			})
			.state('contractOrderView', {
				title: '查看销售合同详情',
				url: '/contractOrderView?id&relationId&myflag',
				templateUrl: '../template/contract/view.html',
				controller: 'contractOrderViewCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'contractOrder'
				}
			})
			.state('contract', {
				title: '销售合同-审批详情',
				url: "/contract?myflag&processId&nodeId",
				templateUrl: '../template/contract/applyView.html',
				resolve: load(['js/credit/credit.js', 'js/contract/contract.js']),
				controller: 'applyContractCtrl'
			})
			.state('cognatecontract', {
				title: '销售合同-审批详情',
				url: "/cognatecontract?myflag&processId&nodeId",
				templateUrl: '../template/contract/applyView.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'applyContractCtrl'
			})
			//销售合同基本信息变更
			.state('contractBaseChangeAdd', {
				title: '销售合同-内容变更',
				url: '/contractBaseChangeAdd?conid&myflag&processId&nodeId&relationId&conType',
				templateUrl: '../template/contract/baseChangeAdd.html',
				controller: 'contractBaseChangeAddCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'contractOrder_contentchange'
				}
			})
			.state('bndbList', {
				url: '/bmdbList?cusName',
				templateUrl: '../template/contract/bmdbList.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'bndbListCtrl'
			})
			.state('contractcontentchange', {
				title: '销售合同内容变更-审批详情',
				url: "/contractcontentchange?myflag&processId&nodeId",
				templateUrl: '../template/contract/baseChangeApplyView.html',
				resolve: load(['js/credit/credit.js', 'js/contract/contract.js']),
				controller: 'baseChangeApplyCtrl'
			})
			.state('getsalesorder', {
				url: "/getsalesorder?id",
				templateUrl: '../template/contract/getsalesorder.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'contractGetsalesorder'
			})

			//销售合同清单变更
			.state('contractChangeAdd', {
				title: '销售合同清单变更',
				url: '/contractChangeAdd?conid&id&myflag&processId&nodeId&relationId&conType',
				templateUrl: '../template/contract/changeBillAdd.html',
				controller: 'contractChangeAddCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'contractOrder_billchange'
				}
			})
			.state('contractchange', {
				title: '销售合同清单变更-审批详情',
				url: "/contractchange?myflag&processId&nodeId",
				templateUrl: '../template/contract/changeBillApplyView.html',
				resolve: load(['js/credit/credit.js', 'js/contract/contract.js']),
				controller: 'applyContractChangeCtrl'
			})
			//进出口销售合同
			.state('iecontractOrder', {
				title: '进出口销售合同列表',
				url: '/iecontractOrder',
				templateUrl: '../template/contract/iecontractList.html',
				controller: 'iecontractOrderCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'iecontractOrder'
				}
			})
			.state('iecontractAdd', {
				title: '新建进出口销售合同',
				url: '/iecontractAdd',
				templateUrl: '../template/contract/iecontractAdd.html',
				controller: 'iecontractAddCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'iecontractOrder_add'
				}
			})
			.state('iecontractEdit', {
				title: '编辑进出口销售合同',
				url: '/iecontractEdit?processId&nodeId&sapid',
				templateUrl: '../template/contract/iecontractEdit.html',
				controller: 'iecontractEditCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'iecontractOrder_add'
				}
			})
			.state('iecontractView', {
				title: '进出口销售合同查看详情',
				url: '/iecontractView?id',
				templateUrl: '../template/contract/iecontractView.html',
				controller: 'iecontractViewCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'iecontractOrder'
				}
			})
			.state('iecontract', {
				title: '进出口销售合同-审批详情',
				url: "/iecontract?myflag&processId&nodeId",
				templateUrl: '../template/contract/iecontractapplyView.html',
				resolve: load(['js/credit/credit.js','js/contract/contract.js']),
				controller: 'applyIecontractCtrl'
			})
			.state('iecBaseChange', {
				title: '进出口销售合同内容变更',
				url: "/iecBaseChange?conid&id&myflag&processId&nodeId",
				templateUrl: '../template/contract/iecBaseChange.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'iecBaseChangeCtrl'
			})
			.state('iecontractcontentchange', {
				title: '进出口销售合同内容变更-审批详情',
				url: "/iecontractcontentchange?myflag&processId&nodeId",
				templateUrl: '../template/contract/iecBaseChangeApply.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'iecBaseChangeApplyCtrl'
			})
			.state('iecChangeBillAdd', {
				title: '进出口销售清单变更',
				url: '/iecChangeBillAdd?conid&id&myflag&processId&nodeId',
				templateUrl: '../template/contract/ieChangeBillAdd.html',
				controller: 'iecChangeBillAddCtrl',
				resolve: load(['js/contract/contract.js']),
				data: {
					noPermissions: 'iecontractOrder_billchange'
				}
			})
			.state('iecontractchange', {
				title: '进出口销售清单变更-审批详情',
				url: "/iecontractchange?myflag&processId&nodeId",
				templateUrl: '../template/contract/ieChangeBillApplyView.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'applyIecChangeBillCtrl'
			})
			//借出单新建
			.state('loanBillOrder', {
				title: '借出单',
				url: '/loanBillOrder',
				templateUrl: '../template/loanBill/list.html',
				controller: 'loanBillOrderCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'loanBillOrder'
				}
			})
			.state('loanBillOrderAdd', {
				title: '新建借出单',
				url: '/loanBillOrderAdd',
				templateUrl: '../template/loanBill/add.html',
				controller: 'loanBillOrderAddCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'loanBillOrder_add'
				}
			})
			.state('loanBillOrderEdit', {
				title: '编辑借出单',
				url: '/loanBillOrderEdit?processId&sapid&nodeId&_id',
				templateUrl: '../template/loanBill/edit.html',
				resolve: load(['js/loanBill/loanBill.js']),
				controller: 'loanBillOrderEditCtrl'
			})
			.state('loanBillOrderView', {
				title: '查看借出单详情',
				url: '/loanBillView?id',
				templateUrl: '../template/loanBill/view.html',
				controller: 'loanBillViewCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'loanBillOrder'
				}
			})
			.state('productlend', {
				title: '借出单-审批详情',
				url: "/productlend?myflag&processId&nodeId",
				templateUrl: '../template/loanBill/applyView.html',
				resolve: load(['js/credit/credit.js','js/loanBill/loanBill.js']),
				controller: 'applyLoanBillCtrl'
			})
			//续借
			.state('renewBillOrder', {
				title: '借出续借',
				url: '/renewBillOrder',
				templateUrl: '../template/loanBill/renewList.html',
				controller: 'renewBillOrderCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'renewBillOrderAdd_history'
				}
			})
			.state('renewBillOrderAdd', {
				title: '新建借出续借',
				url: '/renewBillOrderAdd?code&ZJCDH',
				templateUrl: '../template/loanBill/renewAdd.html',
				controller: 'renewBillOrderAddCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'renewBillOrderAdd'
				}
			})
			.state('renewBillOrderEdit', {
				title: '编辑借出续借',
				url: '/renewBillOrderEdit?processId&nodeId&sapid',
				templateUrl: '../template/loanBill/renewEdit.html',
				resolve: load(['js/loanBill/loanBill.js']),
				controller: 'renewBillOrderEditCtrl'
			})
			.state('renewBillOrderView', {
				title: '查看借出续借详情',
				url: '/renewBillOrderView?id&code&rncode',
				templateUrl: '../template/loanBill/renewView.html',
				controller: 'renewBillViewCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'renewBillOrderAdd_history'
				}
			})
			.state('productlendrenew', {
				title: '借出续借-审批详情',
				url: "/productlendrenew?myflag&processId&nodeId",
				templateUrl: '../template/loanBill/renewApplyView.html',
				resolve: load(['js/credit/credit.js','js/loanBill/loanBill.js']),
				controller: 'applyRenewBillCtrl'
			})
			//借出还回
			.state('returnBillOrder', {
				title: '借出单还回',
				url: '/returnBillOrder',
				templateUrl: '../template/loanBill/returnList.html',
				controller: 'returnBillOrderCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'returnBillOrderAdd_history'
				}
			})
			.state('returnBillOrderAdd', {
				title: '新建借出单还回',
				url: '/returnBillOrderAdd?code&ZJCDH&id',
				templateUrl: '../template/loanBill/returnAdd.html',
				controller: 'returnBillOrderAddCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'returnBillOrderAdd'
				}
			})
			.state('returnBillOrderEdit', {
				title: '编辑借出单还回',
				url: '/returnBillOrderEdit?processId&nodeId&sapid',
				templateUrl: '../template/loanBill/returnEdit.html',
				resolve: load(['js/loanBill/loanBill.js']),
				controller: 'returnBillOrderEditCtrl'
			})
			.state('returnBillOrderView', {
				title: '查看借出单还回详情',
				url: '/returnBillOrderView?code&rtcode',
				templateUrl: '../template/loanBill/returnView.html',
				controller: 'returnBillViewCtrl',
				resolve: load(['js/loanBill/loanBill.js']),
				data: {
					noPermissions: 'returnBillOrderAdd_history'
				}
			})
			.state('productlendreturn', {
				title: '借出单还回-审批详情',
				url: "/productlendreturn?myflag&processId&nodeId",
				templateUrl: '../template/loanBill/returnApplyView.html',
				resolve: load(['js/loanBill/loanBill.js']),
				controller: 'applyReturnBillCtrl'
			})
			.state('myApply', {  //我的申请
				url: '/myApply',
				templateUrl: '../template/myApply/list.html',
				resolve: load(['js/index.js']),
				controller: 'myApplyCtrl'
			})
			.state('myDraft', {  //我的草稿
				url: '/myDraft',
				templateUrl: '../template/myDraft/list.html',
				resolve: load(['js/index.js']),
				controller: 'myDraftCtrl'
			})
			.state('myTodo', {  //我的待办
				url: '/myTodo',
				templateUrl: '../template/myTodo/list.html',
				resolve: load(['js/index.js']),
				controller: 'myTodoCtrl'
			})
			.state('alApply', {  //我的已办
				url: '/alApply',
				templateUrl: '../template/alApply/list.html',
				resolve: load(['js/index.js']),
				controller: 'alApplyCtrl'
			})
			.state('mySubscribe', {  //我的订阅
				title: '我的订阅',
				url: '/mySubscribe',
				templateUrl: '../template/mySubscribe/list.html',
				resolve: load(['js/index.js']),
				controller: 'mySubscribeCtrl'
			})
			//审批模板
			.state('purchase', {  //采购申请
				url: "/purchase?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/purchaseView.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyPurchaseCtrl'
			})
			.state('purchaseEdit', {  //采购申请编辑
				url: "/purchaseEdit?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/purchaseEdit.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'PurchaseEditCtrl'
			})
			.state('interiorbills', {  //内部订单
				title: "费用申请单",
				url: "/interiorbills?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/interiorbillsView.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyInteriorbillsCtrl'
			})
			.state('interiorbillscancel', {  //费用申请单作废审批
				title: "费用申请单作废审批",
				url: "/interiorbillscancel?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/interiorbillsView.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyInteriorbillsCtrl'
			})
			.state('purchasefd', {  //采购返点
				title: '采购返点-审批详情',
				url: "/purchasefd?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/purchasefd.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyPurchasefdCtrl'
			})
			.state('kjpo', {  //框架合同
				title: '框架合同-审批详情',
				url: "/kjpo?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/kjpo.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyKjpoCtrl'
			})
			.state('wxpo', {  //维修采购
				title: '维修采购-审批详情',
				url: "/wxpo?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/wxpo.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyWxpoCtrl'
			})
			.state('poheader', {  //采购订单
				title: '采购订单-审批详情',
				url: "/poheader?myflag&processId&nodeId",
				templateUrl: '../template/applyTem/poheader.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyPoheaderCtrl'
			})
			.state('stock', {  //采购订单
				title: '库存调整-审批详情',
				url: "/stock?myflag&processId&nodeId&type",
				templateUrl: '../template/applyTem/stock.html',
				resolve: load(['js/appplyTem/applyTem.js']),
				controller: 'applyStockCtrl'
			})
			.state('customer', {  //客户管理
				title: '客户管理-审批详情',
				url: "/customer?myflag&processId&nodeId",
				templateUrl: '../template/customer/customerView.html',
				resolve: load(['js/customer/customer.js']),
				controller: 'customerCtrl'
			})
			.state('receipts', {  //到单查询
				title: '到单申请',
				url: "/receipts",
				templateUrl: '../template/receiptsApply/list.html',
				controller: 'receiptsCtrl',
				resolve: load(['js/receiptsApply/receipts.js']),
				data: {
					noPermissions: 'receipts'
				}
			})
			.state('receiptsAdd', {  //到单新建
				title: '新建到单申请',
				url: "/receiptsAdd",
				templateUrl: '../template/receiptsApply/add.html',
				controller: 'receiptsAddCtrl',
				resolve: load(['js/receiptsApply/receipts.js']),
				data: {
					noPermissions: 'receipts_add'
				}
			})
			.state('receiptsView', {//到单查看
				title: '到单申请详情',
				url: '/receiptsView/:id',
				templateUrl: '../template/receiptsApply/view.html',
				controller: 'receiptsViewCtrl',
				resolve: load(['js/receiptsApply/receipts.js']),
				data: {
					noPermissions: 'receipts'
				}
			})
			.state('receiptsEdit', {//到单编辑
				title: '到单申请草稿',
				url: '/receiptsEdit?myflag&processId&sapid&nodeId',
				templateUrl: '../template/receiptsApply/edit.html',
				resolve: load(['js/receiptsApply/receipts.js']),
				controller: 'receiptsEditCtrl'
			})
			.state('billapply', {//到单申请
				title: '到单申请-审批详情',
				url: '/billapply?myflag&processId&sapid&nodeId',
				templateUrl: '../template/receiptsApply/newreceipts.html',
				resolve: load(['js/receiptsApply/receipts.js']),
				controller: 'newreceiptsCtrl'
			})
			.state('receiptsChange', {//到单变更
				title: '到单申请变更',
				url: '/receiptsChange?ZSQNO',
				templateUrl: '../template/receiptsApply/change.html',
				controller: 'receiptsChangeCtrl',
				resolve: load(['js/receiptsApply/receipts.js']),
				data: {
					noPermissions: 'receipts_change'
				}
			})
			.state('check', {//盘点查询
				title: '盘点报告',
				url: '/check',
				templateUrl: '../template/check/list.html',
				controller: 'checkCtrl',
				resolve: load(['js/check/check.js']),
				data: {
					noPermissions: 'check'
				}
			})
			.state('checkView', {//盘点查看
				title: '盘点报告详情',
				url: '/checkView/:id',
				templateUrl: '../template/check/view.html',
				controller: 'checkViewCtrl',
				resolve: load(['js/check/check.js']),
				data: {
					noPermissions: 'check'
				}
			})
			.state('inv', {// 盘点报告
				title: '盘点报告-审批详情',
				url: '/inv?myflag&processId&nodeId',
				templateUrl: '../template/check/check.html',
				resolve: load(['js/check/check.js']),
				controller: 'ApplycheckCtrl'
			})
			.state('salesbonusOrder', {// 销售返点
				title: '销售返点',
				url: '/salesbonusOrder',
				templateUrl: '../template/salesbonus/list.html',
				controller: 'salesbonusCtrl',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder'
				}
			})
			.state('salesbonusView', {// 查看销售返点
				title: '销售返点详情',
				url: '/salesbonusView/:id',
				templateUrl: '../template/salesbonus/view.html',
				controller: 'salesbonusViewCtrl',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder'
				}
			})
			.state('salesbonusAdd', {
				title: '新建销售返点',
				url: '/salesbonusAdd',
				templateUrl: '../template/salesbonus/add.html',
				controller: 'salesbonusAddCtrl',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder_add'
				}
			})
			.state('salesbonusTransfer', {// 销售返点转移
				title: '销售返点转移',
				url: '/salesbonusTransfer/:id',
				templateUrl: '../template/salesbonus/transfer.html',
				controller: 'salesbonusTransferCtrl',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder_transfer'
				}
			})
			.state('salesbonusChange', {// 销售返点修改
				title: '销售返点变更',
				url: '/salesbonusChange/:id',
				templateUrl: '../template/salesbonus/change.html',
				controller: 'salesbonusChangeCtrl',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder_change'
				}
			})
			.state('salesbonusbg', {// 销售返点修改
				title: '销售返点变更-审批详情',
				url: '/salesbonusbg?myflag&processId&nodeId',
				templateUrl: '../template/salesbonus/changeApply.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonusbgCtrl'
			})
			.state('salesbonusbgEdit', {// 销售返点修改
				title: '销售返点变更草稿',
				url: '/salesbonusbgEdit?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/bgEdit.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonusbgEditCtrl'
			})
			.state('salesbonusFreeze', {// 销售返点冻结
				title: '销售返点冻结',
				url: '/salesbonusFreeze/:id',
				templateUrl: '../template/salesbonus/freeze.html',
				controller: 'salesbonusFreezeCtrl',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder_freeze'
				}
			})
			.state('salesbonus', {// 销售返点
				title: '销售返点-审批详情',
				url: '/salesbonus?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/examine.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'examineCtrl'
			})
			.state('salesbonusEdit', {//销售返点编辑
				title: '销售返点草稿',
				url: '/salesbonusEdit?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/edit.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonusEditCtrl'
			})
			.state('salesbonuszy', {// 销售返点转移
				title: '销售返点转移-审批详情',
				url: '/salesbonuszy?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/zy.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonuszyCtrl'
			})
			.state('salesbonusjd', {// 销售返点
				title: '销售返点解冻-审批详情',
				url: '/salesbonusjd?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/jd.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonusjdCtrl'
			})
			.state('salesbonusjdedit', {// 销售返点
				title: '销售返点解冻草稿',
				url: '/salesbonusjdedit?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/jdedit.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonusjdeditCtrl'
			})
			.state('salesbonuszyedit', {// 销售返点
				title: '销售返点转移草稿',
				url: '/salesbonuszyedit?myflag&processId&sapid&nodeId',
				templateUrl: '../template/salesbonus/zyedit.html',
				resolve: load(['js/salesbonus/salesbonus.js']),
				controller: 'salesbonuszyedit'
			})
			.state('salesbonuszf', {// 销售返点
				title: '销售返点作废',
				url: '/salesbonuszf/:id',
				templateUrl: '../template/salesbonus/zf.html',
				controller: 'salesbonuszf',
				resolve: load(['js/salesbonus/salesbonus.js']),
				data: {
					noPermissions: 'salesbonusOrder_cancellation'
				}
			})
			.state('mkinvoiceCheck', {//开票查询
				title: '开票申请',
				url: '/mkinvoiceCheck',
				templateUrl: '../template/mkinvoice/list.html',
				controller: 'mkinvoiceCheckCtrl',
				resolve: load(['js/mkinvoice/mkinvoice.js']),
				data: {
					noPermissions: 'mkinvoiceCheck'
				}
			})
			.state('mkinvoiceAdd', {//开票新建
				title: '开票申请新建',
				url: "/mkinvoiceAdd?contractno&stomer&receipttype&stomerid&conId",
				templateUrl: '../template/mkinvoice/add.html',
				controller: 'mkinvoiceAddCtrl',
				resolve: load(['js/mkinvoice/mkinvoice.js']),
				data: {
					noPermissions: 'mkinvoiceCheck_add'
				}
			})
			.state('mkinvoiceEdit', {//开票编辑
				title: '开票申请草稿',
				url: '/mkinvoiceEdit?myflag&processId&nodeId',
				templateUrl: '../template/mkinvoice/edit.html',
				resolve: load(['js/mkinvoice/mkinvoice.js']),
				controller: 'mkinvoiceEdit'
			})
			.state('mkinvoice', {//开票查看
				title: '开票申请-审批详情',
				url: '/mkinvoice?myflag&processId&nodeId',
				templateUrl: '../template/mkinvoice/mkinvoiceView.html',
				resolve: load(['js/customer/customer.js','js/mkinvoice/mkinvoice.js']),
				controller: 'mkinvoiceCtrl'
			})
			.state('mkinvoiceView', {//开票查看
				title: '开票申请详情',
				url: '/mkinvoiceView/:id?recebill',
				templateUrl: '../template/mkinvoice/view.html',
				controller: 'mkinvoiceViewCtrl',
				resolve: load(['js/customer/customer.js','js/mkinvoice/mkinvoice.js']),
				data: {
					noPermissions: 'mkinvoiceCheck'
				}
			})
			.state('pojckOrder', { // 进出口采购订单查询
				title: '进出口采购订单',
				url: '/pojckOrder',
				templateUrl: '../template/pojck/list.html',
				controller: 'pojckOrderCtrl',
				resolve: load(['js/pojck/pojck.js']),
				data: {
					// noPermissions: 'mkinvoiceCheck_add'
				}
			})
			.state('pojckView', { // 进出口采购订单查看
				title: '进出口采购订单详情',
				url: '/pojckView/:id',
				templateUrl: '../template/pojck/view.html',
				resolve: load(['js/pojck/pojck.js']),
				controller: 'pojckViewCtrl'
			})
			.state('pojck', {// 进出口采购订单
				title: '进出口采购订单-审批详情',
				url: '/pojck?myflag&processId&nodeId',
				templateUrl: '../template/pojck/pojck.html',
				resolve: load(['js/pojck/pojck.js']),
				controller: 'pojckCtrl'
			})
			.state('productoutOrder', { // 放货单查询
				title: '放货单',
				url: '/productoutOrder?id',
				templateUrl: '../template/productout/list.html',
				controller: 'productoutOrderCtrl',
				resolve: load(['js/productout/productout.js']),
				data: {
					noPermissions: 'productout'
				}
			})
			.state('productoutView', { // 放货申请查看
				title: '放货单详情',
				url: '/productoutView/:id',
				templateUrl: '../template/productout/view.html',
				controller: 'productoutViewCtrl',
				resolve: load(['js/productout/productout.js']),
				data: {
					noPermissions: 'productout'
				}
			})
			.state('productoutWh', { // 放货申请
				title: '放货信息维护',
				url: '/productoutWh',
				templateUrl: '../template/productout/wh.html',
				controller: 'productoutWhCtrl',
				resolve: load(['js/productout/productout.js']),
				data: {
					noPermissions: 'productoutWh'
				}
			})
			.state('productoutWhAdd', { // 放货申请
				title: '新增放货信息维护',
				url: '/productoutWhAdd?code',
				templateUrl: '../template/productout/whadd.html',
				controller: 'productoutWhAddCtrl',
				resolve: load(['js/productout/productout.js']),
				data: {
					noPermissions: 'productoutWhAdd'
				}
			})
			.state('productoutAdd', { // 放货申请新增
				title: '新增放货单',
				url: '/productoutAdd?ordercode&orderno',
				templateUrl: '../template/productout/add.html',
				resolve: load(['js/productout/productout.js']),
				controller: 'productoutAddCtrl'
			})
			.state('productout', { // 放货新增审批
				title: '放货申请-审批详情',
				url: '/productout?myflag&processId&nodeId&nodeType',
				templateUrl: '../template/productout/productout.html',
				resolve: load(['js/credit/credit.js','js/productout/productout.js']),
				controller: 'productout'
			})
			.state('productoutEdit', {//放货编辑
				title: '放货单草稿',
				url: '/productoutEdit?myflag&processId&nodeId&ordercode',
				templateUrl: '../template/productout/edit.html',
				resolve: load(['js/productout/productout.js']),
				controller: 'productoutEdit'
			})
			.state('productoutChange', {//放货变更
				title: '放货单变更',
				url: '/productoutChange?id',
				templateUrl: '../template/productout/productoutChange.html',
				controller: 'productoutChangeCtrl',
				resolve: load(['js/productout/productout.js']),
				data: {
					noPermissions: 'productoutOrder_change'
				}
			})
			.state('cargooutinfo', {//放货维护
				title: '放货信息维护-审批详情',
				url: '/cargooutinfo?myflag&processId&nodeId',
				templateUrl: '../template/productout/whdetail.html',
				resolve: load(['js/productout/productout.js']),
				controller: 'cargooutinfo'
			})
			.state('cargooutinfoEdit', {//维护编辑
				title: '放货信息维护草稿',
				url: '/cargooutinfoEdit?myflag&processId&nodeId',
				templateUrl: '../template/productout/whedit.html',
				resolve: load(['js/productout/productout.js']),
				controller: 'cargooutinfoEdit'
			})
			.state('sellclueOrder', { // 销售线索查询
				title: '销售线索查询',
				url: '/sellclueOrder',
				templateUrl: '../template/sellclue/list.html',
				controller: 'sellclueOrderCtrl',
				resolve: load(['js/customer/customer.js','js/sellclue/sellclue.js']),
				data: {
					noPermissions: 'sellclueOrder'
				}
			})
			.state('sellclueAdd', { // 销售线索新建
				title: '新建销售线索',
				url: '/sellclueAdd',
				templateUrl: '../template/sellclue/sellclueAdd.html',
				controller: 'sellclueAddCtrl',
				resolve: load(['js/sellclue/sellclue.js']),
				data: {
					noPermissions: 'sellclueOrder_add'
				}
			})
			.state('productinfo', { // 基础信息维护
				title: '产品信息维护',
				url: '/productinfo',
				templateUrl: '../template/sellclue/productinfo.html',
				controller: 'productinfoCtrl',
				resolve: load(['js/sellclue/sellclue.js']),
				data: {
					noPermissions: 'productinfo'
				}
			})
			.state('sellclueView', {
				title: '销售线索详情',
				url: '/sellclueView/:id',
				templateUrl: '../template/sellclue/view.html',
				controller: 'sellclueViewCtrl',
				resolve: load(['js/sellclue/sellclue.js']),
				data: {
					noPermissions: 'sellclueOrder'
				}
			})
			.state('sellclueEdit', {//编辑
				title: '销售线索变更',
				url: '/sellclueEdit?sapid',
				templateUrl: '../template/sellclue/edit.html',
				resolve: load(['js/sellclue/sellclue.js']),
				controller: 'sellclueEditCtrl'
			})
			.state('signOrder', {    // 签报
				title: '签报查询',
				url: '/signOrder',
				templateUrl: '../template/sign/list.html',
				controller: 'signOrderCtrl',
				resolve: load(['js/sign/signApp.js']),
				data: {
					noPermissions: 'signOrder'
				}
			})
			.state('signOrderAdd', {    // 签报添加
				title: '新建签报单',
				url: '/signOrderAdd',
				templateUrl: '../template/sign/addSign.html',
				controller: 'signOrderAddCtrl',
				resolve: load(['js/sign/signApp.js']),
				data: {
					noPermissions: 'signOrder_add'
				}
			})
			.state('signOrderEdit', {// 签报编辑
				title: '签报编辑',
				url: '/signOrderEdit?myflag&processId&nodeId',
				templateUrl: '../template/sign/editSign.html',
				resolve: load(['js/sign/signApp.js']),
				controller: 'signOrderEditCtrl'
			})
			.state('sign', {    // 签报审批查看
				title: '签报-审批详情',
				url: '/sign?myflag&processId&nodeId',
				templateUrl: '../template/sign/listSign.html',
				resolve: load(['js/sign/signApp.js']),
				controller: 'signCtrl'
			})
			.state('signOrderView', {    // 签报详情
				title: '查看签报详情',
				url: '/signOrderView/:id',
				templateUrl: '../template/sign/viewSign.html',
				controller: 'signOrderViewCtrl',
				resolve: load(['js/sign/signApp.js']),
				data: {
					noPermissions: 'signOrder'
				}
			})

			.state('creditOrder', {    // 客户信用
				title: '客户信用',
				url: '/creditOrder',
				templateUrl: '../template/credit/list.html',
				controller: 'creditOrderCtrl',
				resolve: load(['js/credit/credit.js']),
				data: {
					noPermissions: 'creditOrder'
				}
			})
			.state('creditOrderAdd', {    // 添加
				title: '新建客户信用',
				url: '/creditOrderAdd',
				templateUrl: '../template/credit/add.html',
				resolve: load(['js/credit/credit.js']),
				controller: 'creditOrderAddCtrl'
			})
			.state('creditOrderEdit', {// 编辑
				title: '编辑客户信用',
				url: '/creditOrderEdit?myflag&processId&nodeId&sapid',
				templateUrl: '../template/credit/edit.html',
				resolve: load(['js/customer/customer.js','js/credit/credit.js']),
				controller: 'creditOrderEditCtrl'
			})
			.state('cuscredit', {    // 申请
				title: '客户信用-审批详情',
				url: '/cuscredit?myflag&processId&nodeId',
				templateUrl: '../template/credit/apply.html',
				resolve: load(['js/customer/customer.js','js/credit/credit.js']),
				controller: 'cuscreditCtrl'
			})
			.state('creditOrderView', {    // 详情
				title: '查看客户信用详情',
				url: '/creditOrderView/:id?flag&cuscode&cusname',
				templateUrl: '../template/credit/view.html',
				controller: 'creditOrderViewCtrl',
				resolve: load(['js/customer/customer.js','js/credit/credit.js']),
				data: {
					noPermissions: 'creditOrder'
				}
			})
			.state('viewTab', {    // 2017-4-24 添加，Bug6661
				title: '客户信用情況',
				url: '/creditTabView/:id?flag&cuscode&cusname',
				templateUrl: '../template/credit/viewTab.html',
				controller: 'creditOrderViewCtrl',
				resolve: load(['js/credit/credit.js'])
			})
			/*.state('creditChange', {    // 变更
			 url: '/creditChange/:id',
			 templateUrl: '../template/credit/creditChange.html',
			 controller: 'creditChangeCtrl'
			 })*/
			.state('creditmaintenance', {    // 客户授信额度维护
				title: '客户授信额度维护',
				url: '/creditmaintenance',
				templateUrl: '../template/credit/creditmaintenance.html',
				controller: 'creditmaintenanceCtrl',
				resolve: load(['js/credit/credit.js']),
				data: {
					noPermissions: 'creditmaintenance'
				}
			})
			.state('creditmaintenanceAdd', {    // 额度维护添加
				title: '客户额度信息维护',
				url: '/creditmaintenanceAdd?id',
				templateUrl: '../template/credit/maintenanceAdd.html',
				controller: 'creditmaintenanceAddCtrl',
				resolve: load(['js/credit/credit.js']),
				data: {
					noPermissions: 'creditmaintenance_add'
				}
			})
			.state('creditCustomMtce', {    // 客户信用
				title: '客户信用维护',
				url: '/creditCustomMtce?cuscode&cusname',
				templateUrl: '../template/credit/creditCustom.html',
				controller: 'creditCustomMtceCtrl',
				resolve: load(['js/credit/credit.js']),
				data: {
					noPermissions: 'creditManagement'
				}
			})
			.state('customGroup', {    // 客户分组
				title: '客户分组',
				url: '/customGroup',
				templateUrl: '../template/credit/customGroup.html',
				controller: 'customGroupCtrl',
				resolve: load([ 'js/credit/credit.js']),
				data: {
					noPermissions: 'customGroup'
				}
			})
			.state('deptassureOrder', { //部门担保查询
				title: '部门担保',
				url: '/deptassureOrder',
				templateUrl: '../template/deptassure/list.html',
				controller: 'deptassureOrderCtrl',
				resolve: load(['js/deptassure/deptassure.js']),
				data: {
					noPermissions: 'deptassureOrder'
				}
			})
			.state('deptassureAdd', { // 部门担保新建
				title: '部门担保新建',
				url: '/deptassureAdd',
				templateUrl: '../template/deptassure/add.html',
				controller: 'deptassureAddCtrl',
				resolve: load(['js/deptassure/deptassure.js']),
				data: {
					noPermissions: 'deptassureOrder_add'
				}
			})
			.state('deptassure', {    // 草稿查看
				title: '部门担保-审批详情',
				url: '/deptassure?myflag&processId&nodeId',
				templateUrl: '../template/deptassure/viewApply.html',
				resolve: load(['js/deptassure/deptassure.js']),
				controller: 'deptassureCtrl'
			})
			.state('deptassureView', {
				title: '部门担保详情',
				url: '/deptassureView/:id',
				templateUrl: '../template/deptassure/view.html',
				controller: 'deptassureViewCtrl',
				resolve: load(['js/deptassure/deptassure.js']),
				data: {
					noPermissions: 'deptassureOrder'
				}
			})
			//.state('deptassureEdit',{//编辑
			//    url: '/deptassureEdit?sapid',
			//    templateUrl: '../template/deptassure/edit.html',
			//    controller: 'deptassureEditCtrl'
			//})
			.state('deptassureEdit', {// 编辑
				title: '部门担保草稿',
				url: '/deptassureEdit?myflag&processId&nodeId&sapid',
				templateUrl: '../template/deptassure/edit.html',
				resolve: load(['js/deptassure/deptassure.js']),
				controller: 'deptassureEditCtrl'
			})
			.state('deptlimit', {//部门担保设置
				title: '部门担保设置',
				url: '/deptlimit',
				templateUrl: '../template/deptassure/deptlimit.html',
				resolve: load(['js/deptassure/deptassure.js']),
				controller: 'deptlimitCtrl'
			})
			.state('materielOrder', {//物料查询
				title: '物料查询',
				url: '/materielOrder',
				templateUrl: '../template/materiel/list.html',
				controller: 'materielOrderCtrl',
				resolve: load(['js/materiel/materiel.js']),
				data: {
					noPermissions: 'materielOrder'
				}
			})
			.state('materielAdd',{//物料新建
				title:'物料新建',
				url: '/materielAdd',
				templateUrl: '../template/materiel/add.html',
				controller: 'materielAddCtrl',
				resolve: load(['js/materiel/materiel.js']),
				/*data: {
				 noPermissions: 'materielAdd'
				 }*/
			})
			.state('materiel',{//物料审批查看
				title:'物料-审批查看',
				url: '/materialmanagement?myflag&processId&nodeId',
				templateUrl: '../template/materiel/applyView.html',
				controller: 'materielCtrl',
				resolve: load(['js/materiel/materiel.js']),
				/*data: {
				 noPermissions: 'materielOrder'
				 }*/
			})
			.state('materielEdit',{//物料编辑
				title:'物料编辑',
				url: '/materielEdit?myflag&processId&nodeId&sapid',
				templateUrl: '../template/materiel/edit.html',
				controller: 'materielEditCtrl',
				resolve: load(['js/materiel/materiel.js']),
				/*data: {
				 noPermissions: 'materielAdd'
				 }*/
			})
			//返点冲抵应收
			.state('creditMemoOrder', {    // 返点冲抵应收
				title: '返点冲抵应收',
				url: '/creditMemoOrder',
				templateUrl: '../template/creditMemo/list.html',
				controller: 'creditMemoOrderCtrl',
				resolve: load(['js/creditMemo/creditMemo.js']),
				data: {
					noPermissions: 'creditMemoOrder'
				}
			})
			.state('creditMemoOrderAdd', {    // 添加
				title: '新建返点冲抵应收',
				url: '/creditMemoOrderAdd',
				templateUrl: '../template/creditMemo/add.html',
				resolve: load(['js/creditMemo/creditMemo.js']),
				controller: 'creditMemoOrderAddCtrl'
			})
			.state('creditMemoOrderEdit', {// 编辑
				title: '编辑返点冲抵应收',
				url: '/creditMemoOrderEdit?myflag&processId&nodeId&sapid',
				templateUrl: '../template/creditMemo/edit.html',
				resolve: load(['js/creditMemo/creditMemo.js']),
				controller: 'creditMemoOrderEditCtrl'
			})
			.state('borrowcredence', {
				title: '返点冲抵应收-审批详情',
				url: '/borrowcredence?myflag&processId&nodeId',
				templateUrl: '../template/creditMemo/applyView.html',
				resolve: load(['js/creditMemo/creditMemo.js']),
				controller: 'applyCreditMemoCtrl'
			})
			.state('creditMemoOrderView', {    // 详情
				title: '查看返点冲抵应收详情',
				url: '/creditMemoOrderView/:id',
				templateUrl: '../template/creditMemo/view.html',
				controller: 'creditMemoOrderViewCtrl',
				resolve: load(['js/creditMemo/creditMemo.js']),
				data: {
					noPermissions: 'creditMemoOrder'
				}
			})
			.state('creditMemoOrderChange', {    // 详情
				title: '变更返点冲抵应收',
				url: '/creditMemoOrderChange?id&processId&nodeId',
				templateUrl: '../template/creditMemo/changeEdit.html',
				resolve: load(['js/creditMemo/creditMemo.js']),
				controller: 'creditMemoOrderChangeCtrl'
			})
			.state('intoBillOrder', {    // 到账单查询
				title: '到账单查询',
				url: '/intoBillOrder',
				templateUrl: '../template/intoBill/list.html',
				controller: 'intoBillOrderCtrl',
				resolve: load(['js/intoBill/intoBill.js']),
				data: {
					noPermissions: 'billOrder'
				}
			})
			//.state('home',{
			//    url: '/home',
			//    templateUrl: '../template/home/home.html',
			//    controller: 'homeCtrl'
			//})
			.state('typeList', {
				title: '我的单据列表',
				url: '/typeList?myflag&controllerName&controllercode',
				templateUrl: '../template/home/typeList.html',
				resolve: load(['js/home/home.js']),
				controller: 'typeListCtrl'
			})
			.state('reimbursementOrder', { //报销
				title: '报销单',
				url: '/reimbursementOrder',
				templateUrl: '../template/reimbursement/list.html',
				controller: 'reimbursementOrderCtrl',
				resolve: load(['js/reimbursement/reimbursement.js']),
				data: {
					noPermissions: 'reimbursementOrder'
				}
			})
			.state('reimbursementAdd', { //报销新建
				title: '新建报销单',
				url: '/reimbursementAdd',
				templateUrl: '../template/reimbursement/add.html',
				controller: 'reimbursementAddCtrl',
				resolve: load(['js/reimbursement/reimbursement.js']),
				data: {
					noPermissions: 'reimbursementOrder_add'
				}
			})
			.state('reimbursementView', { //报销查看
				title: '查看报销单详情',
				url: '/reimbursementView/:id',
				templateUrl: '../template/reimbursement/view.html',
				controller: 'reimbursementViewCtrl',
				resolve: load(['js/reimbursement/reimbursement.js']),
				data: {
					noPermissions: 'reimbursementOrder'
				}
			})
			.state('reimburse', { //报销审批查看
				title: '报销单-审批详情',
				url: '/reimburse?myflag&processId&nodeId',
				templateUrl: '../template/reimbursement/apply.html',
				resolve: load(['js/reimbursement/reimbursement.js']),
				controller: 'reimbursementCtrl'
			})
			.state('reimbursementEdit', { //报销草稿编辑
				title: '编辑报销单',
				url: '/reimbursementEdit?myflag&processId&nodeId',
				templateUrl: '../template/reimbursement/edit.html',
				resolve: load(['js/reimbursement/reimbursement.js']),
				controller: 'reimbursementEditCtrl'
			})
			.state('accountsremburs', { //额度管理
				title: '报销单额度设置',
				url: '/accountsremburs',
				templateUrl: '../template/reimbursement/accountsremburs.html',
				controller: 'accountsrembursCtrl',
				resolve: load(['js/reimbursement/reimbursement.js']),
				data: {
					noPermissions: 'accountsremburs'
				}
			})
			.state('accountsCompany', { //公司额度管理
				url: '/accountsCompany',
				templateUrl: '../template/reimbursement/company.html',
				resolve: load(['js/reimbursement/reimbursement.js']),
				controller: 'accountsCompanyCtrl'
			})
			.state('accountsDepartment', { //部门额度管理
				url: '/accountsDepartment',
				templateUrl: '../template/reimbursement/department.html',
				resolve: load(['js/reimbursement/reimbursement.js']),
				controller: 'accountsDepartmentCtrl'
			})
			.state('accountsStaff', { //人员额度管理
				url: '/accountsStaff',
				templateUrl: '../template/reimbursement/staff.html',
				resolve: load(['js/reimbursement/reimbursement.js']),
				controller: 'accountsStaffCtrl'
			})
			.state('financialMark', { //业务/财务标记
				title: '报销单-业务/财务标记',
				url: '/financialMark',
				templateUrl: '../template/reimbursement/financialMark.html',
				controller: 'financialMarkCtrl',
				resolve: load(['js/reimbursement/reimbursement.js']),
				data: {
					noPermissions: 'financialMark'
				}
			})
			.state('writeOff', { //冲销
				title: '报销单-冲销',
				url: '/writeOff',
				templateUrl: '../template/reimbursement/writeOff.html',
				controller: 'writeOffCtrl',
				resolve: load(['js/reimbursement/reimbursement.js']),
				data: {
					noPermissions: 'writeOff'
				}
			})
			.state('reset', { //重置密码
				title: '重置密码',
				url: '/reset',
				templateUrl: '../template/user/reset.html',
				controller: 'resetCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'reset'
				}
			})
			.state('changeInfo', { //修改信息
				title: '修改密码',
				url: '/changeInfo',
				templateUrl: '../template/user/changeInfo.html',
				controller: 'changeInfoCtrl',
				resolve: load(['js/user/userApp.js']),
				data: {
					noPermissions: 'changeInfo'
				}
			})

			// 消息任务管理 @wenbo add sendMessage 2017/01/18
			.state('sendMessage', { //消息任务管理
				title: '消息任务管理',
				url: '/sendMessage',
				templateUrl: '../template/message/sendMessage.html',
				controller: 'sendMessageCtrl',
			})
			// 消息任务详细页面 @wenbo add sendMessage 2017/01/18
			.state('viewMessage', {
				title: '消息任务详细页面',
				url: '/viewMessage/:id',
				templateUrl: '../template/message/viewMessage.html',
				controller: 'viewMessageCtrl',
			})
			// 我的消息 @wenbo add sendMessage 2017/01/18
			.state('listMessage', {
				title: '我的消息',
				url: '/listMessage',
				templateUrl: '../template/message/listMessage.html',
				controller: 'listMessageCtrl',
			})

			.state('loanManageOrder', { //借款
				title: '借款单',
				url: '/loanManageOrder',
				templateUrl: '../template/loanManage/list.html',
				controller: 'loanManageOrderCtrl',
				resolve: load(['js/loanManage/loanManage.js']),
				data: {
					noPermissions: 'loanManageOrder'
				}
			})
			.state('loanManageAdd', { //借款新建
				title: '新建借款单',
				url: '/loanManageAdd',
				templateUrl: '../template/loanManage/add.html',
				resolve: load(['js/loanManage/loanManage.js']),
				controller: 'loanManageAddCtrl',
				data: {
					noPermissions: 'loanManageOrder_add'
				}
			})
			.state('loanManageView', { //借款查看
				title: '查看借款单详情',
				url: '/loanManageView/:id',
				templateUrl: '../template/loanManage/view.html',
				controller: 'loanManageViewCtrl',
				resolve: load(['js/loanManage/loanManage.js']),
				data: {
					noPermissions: 'loanManageOrder'
				}
			})
			.state('loan', { //借款审批查看
				title: '借款申请-审批详情',
				url: '/loan?myflag&processId&nodeId',
				templateUrl: '../template/loanManage/apply.html',
				resolve: load(['js/loanManage/loanManage.js']),
				controller: 'loanManageCtrl'
			})
			.state('loanManageEdit', { //借款草稿编辑
				title: '编辑借款单',
				url: '/loanManageEdit?myflag&processId&nodeId',
				templateUrl: '../template/loanManage/edit.html',
				resolve: load(['js/loanManage/loanManage.js']),
				controller: 'loanManageEditCtrl'
			})
			.state('loanManageMark', { //借款财务标记
				title: '借款单标记',
				url: '/loanManageMark/:id',
				templateUrl: '../template/loanManage/mark.html',
				controller: 'loanManageMarkCtrl',
				resolve: load(['js/loanManage/loanManage.js']),
				data: {
					noPermissions: 'loanManageOrder_mark'
				}
			})
			.state('loanManageWriteOff', { //借款冲销
				title: '借款单冲销',
				url: '/loanManageWriteOff/:id?certcode',
				templateUrl: '../template/loanManage/writeOff.html',
				controller: 'loanManageWriteOffCtrl',
				resolve: load(['js/loanManage/loanManage.js']),
				data: {
					noPermissions: 'loanManageOrder_cancle'
				}
			})
			.state('loanManageReturn', { //还款
				title: '还款',
				url: '/loanManageReturn',
				templateUrl: '../template/loanManage/return.html',
				controller: 'loanManageReturnCtrl',
				resolve: load(['js/loanManage/loanManage.js']),
				data: {
					noPermissions: 'loanManageReturn'
				}
			})
			.state('holidayOrder', { //请休假查询
				url: '/holidayOrder',
				templateUrl: '../template/holiday/list.html',
				controller: 'holidayOrderCtrl',
				resolve: load(['js/holiday/holiday.js']),
				data: {
					noPermissions: 'holidayOrder'
				}
			})
			.state('holidayAdd', { //请休假新建
				url: '/holidayAdd',
				templateUrl: '../template/holiday/add.html',
				resolve: load(['js/holiday/holiday.js']),
				controller: 'holidayAddCtrl'
			})
			.state('holidayEdit', { //借款草稿编辑
				url: '/holidayEdit?myflag&processId&nodeId',
				templateUrl: '../template/holiday/edit.html',
				resolve: load(['js/holiday/holiday.js']),
				controller: 'holidayEditCtrl'
			})
			.state('holiday', { //请休假审批查看
				title:'请休假-审批详情',
				url: '/holiday?myflag&processId&nodeId',
				templateUrl: '../template/holiday/apply.html',
				resolve: load(['js/holiday/holiday.js']),
				controller: 'holidayCtrl'
			})
			.state('holidayView', { //请休假审批完成查看
				url: '/holidayView/:id',
				templateUrl: '../template/holiday/view.html',
				resolve: load(['js/holiday/holiday.js']),
				controller: 'holidayViewCtrl'
			})
			.state('receivableIncomeView', {
				title: '查看收款计划详情',
				url: '/receivableIncomeView?code&name',
				templateUrl: '../template/income/receivableIncome.html',
				resolve: load(['js/income/income.js']),
				controller: 'receivableIncomeViewCtrl'
			})
			.state('applyUpdata', {
				title: '审批流自动更新',
				url: '/applyUpdata',
				resolve: load(['js/user/userApp.js']),
				templateUrl: '../template/applyData/applyUpdata.html',
                controller: 'applyUpdataCtrl'
			})
			.state('applyUpdataView', {
				title: '审批流自动更新查看',
				url: '/applyUpdataView/:id',
				templateUrl: '../template/applyData/applyUpdataView.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'applyUpdataViewCtrl'
			})
			.state('listAdd', {
				title: '新增员工',
				url: '/listAdd',
				templateUrl: '../template/user/listAdd.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'listAddViewCtrl'
			})
			.state('onlineUsers', {
				title: '在线用户',
				url: '/onlineUsers',
				templateUrl: '../template/user/onlineUsers.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'onlineUsersCtrl'
			})
			.state('listEdit', {
				title: '编辑员工信息员工',
				url: '/listEdit/:id',
				templateUrl: '../template/user/listEdit.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'listEditViewCtrl'
			})
			.state('approval', {//
				title: '审批流程',
				url: '/approval?source',
				templateUrl: '../template/approval/approval.html',
				resolve: load(['js/approval/approval.js']),
				controller: 'approvalCtrl'
			})
			.state('rolesPermissions', {//
				title: '数据角色',
				url: '/rolesPermissions',
				templateUrl: '../template/user/rolesPermissions.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'rolesPermissionsCtrl'
			})
			.state('userroles', {
				title: '人员角色',
				url: '/userroles',
				templateUrl: '../template/user/userroles.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'userrolesCtrl'
			})
			.state('doc_auth', {
				title: '单据权限',
				url: '/doc_auth',
				templateUrl: '../template/user/doc_auth.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'docAuthCtrl'
			})
			.state('doc_type', {
				title: '单据类型',
				url: '/doc_type',
				templateUrl: '../template/user/doc_type.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'docTypeCtrl'
			})
			.state('doc_ops', {
				title: '单据规则维护',
				url: '/doc_ops',
				templateUrl: '../template/user/doc_ops.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'docOpsCtrl'
			})
			.state('docManage', {
				title: '文档管理',
				url: '/docManage',
				templateUrl: '../template/user/docManageList.html',
				resolve: load(['js/docManage/docManage.js']),
				controller: 'docManageListCtrl'
			})
			.state('docManageUpload', {
				title: '上传文档',
				url: '/docManageUpload',
				templateUrl: '../template/user/docManageUpload.html',
				resolve: load(['js/docManage/docManage.js']),
				controller: 'docManageUploadCtrl'
			})
			.state('docDownload', {
				title: '文档下载',
				url: '/docDownload/:code',
				templateUrl: '../template/user/docDownload.html',
				resolve: load(['js/docManage/docManage.js']),
				controller: 'docDownloadCtrl'
			})

			//采销单据关联
			.state('DocRelate', {
				title: '采销单据关联',
				url: '/DocRelate',
				templateUrl: '../template/contract/DocRelate.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'DocRelate'
			})

			//采销清单关联
			.state('SupplierOrder', {
				title: '采销清单关联',
				url: '/SupplierOrder',
				templateUrl: '../template/contract/SupplierOrder.html',
				resolve: load(['js/contract/contract.js']),
				controller: 'SupplierOrder'
			})

			//补全成本分析
			.state('costAnalysis', {
				title: '补全成本分析',
				url: '/costAnalysis',
				templateUrl: '../template/user/costAnalysis.html',
				resolve: load(['js/user/userApp.js']),
				controller: 'costAnalysis'
			})

			//转办申请
			.state('transfer', {
				title: '转办申请',
				url: '/transfer',
				templateUrl: '../template/transfer/transfer.html',
				resolve: load(['js/transfer/transfer.js']),
				controller: 'transferOrderCtrl'
			})

			//转办记录
			.state('transferHistory', {
				title: '转办记录',
				url: '/transferHistory',
				templateUrl: '../template/transfer/transferHistory.html',
				resolve: load(['js/transfer/transfer.js']),
				controller: 'transferHistoryCtrl'
			})
			.state('outPutlist', {
				title: '进销项开票查询',
				url: '/outPutlist',
				templateUrl: '../template/outPut/outPutList.html',
				resolve: load(['js/outPut/outPut.js']),
				controller: 'outPutListCtrl'
			})
			.state('outPutChnage', {
				title: '进销项开票变更',
				url: '/outPutChnage?year&month',
				templateUrl: '../template/outPut/outPutChange.html',
				resolve: load(['js/outPut/outPut.js']),
				controller: 'outPutChangeCtrl'
			})
			.state('outPutView', {
				title: '进销项开票查看',
				url: '/outPutView?year&month',
				templateUrl: '../template/outPut/outPutView.html',
				resolve: load(['js/outPut/outPut.js']),
				controller: 'outPutViewCtrl'
			})
			.state('arriveCargoinfoList', {
				title: '到货管理查询',
				url: '/arriveCargoinfoList',
				templateUrl: '../template/purchase/arriveCargoList.html',
				resolve: load(['js/arriveCargoinfo/arriveCargoinfo.js']),
				controller: 'arriveCargoinfoListCtrl'
			})
			.state('arriveCargoinfoAdd', {
				title: '预约提货-登记',
				url: '/arriveCargoinfoAdd',
				templateUrl: '../template/purchase/arriveCargoAdd.html',
				resolve: load(['js/arriveCargoinfo/arriveCargoinfo.js']),
				controller: 'arriveCargoinfoAddCtrl'
			})

            //lic库存查询
            .state('list', {
                title: 'lIC库存查询',
                url: '/list',
                templateUrl: '../template/LicRepertory/list.html',
                resolve: load(['js/LicRepertory/LicRepertory.js']),
                controller: 'LicRepertoryListCtrl'
            })

            //lic新建
            .state('add', {
                title: 'lIC新建',
                url: '/add',
                templateUrl: '../template/LicRepertory/add.html',
                resolve: load(['js/LicRepertory/LicRepertory.js']),
                controller: 'LicRepertoryAddCtrl'
            })

            //lic编辑
            .state('edit', {
                title: 'lIC编辑',
                url: '/edit?ids',
                templateUrl: '../template/LicRepertory/edit.html',
                resolve: load(['js/LicRepertory/LicRepertory.js']),
                controller: 'LicRepertoryEditCtrl'
            })

            //lic库存匹配
            .state('LicRepertory', {
                title: 'lIC库存匹配',
                url: '/LicRepertory',
                templateUrl: '../template/LicRepertory/LicRepertory.html',
                resolve: load(['js/LicRepertory/LicRepertory.js']),
                controller: 'LicRepertoryCtrl'
            });


		function load(srcs, callback) {
			return {
				deps: ['$ocLazyLoad', '$q',
					function ($ocLazyLoad, $q) {
						var deferred = $q.defer();
						var promise = false;
						srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
						if (!promise) {
							promise = deferred.promise;
						}
						angular.forEach(srcs, function (src) {
							promise = promise.then(function () {
								angular.forEach(MODULE_CONFIG, function (module) {
									if (module.name == src) {
										src = module.module ? module.name : module.files;
									}
								});
								return $ocLazyLoad.load(src);
							});
						});
						deferred.resolve();
						return callback ? promise.then(function () {
							return callback();
						}) : promise;
					}]
			}
		}

	}


);

app.factory('timestampMarker', ["$rootScope", '$window', function ($rootScope, $window) {
	var timestampMarker = {
		request: function (config) {
			if(config.url != '/customer/listcontact'){
				$("#loading").height(document.body.scrollHeight);
				$("#loading").show();
			}
			if(config.url == '/contract/enum'){
				$("#loading").hide();
			}
			if(config.url == '/customer/checkunique'){
				$("#loading").hide();
			}
			if(config.url == '/customer/checkzorg'){
				$("#loading").hide();
			}
			config.requestTimestamp = new Date().getTime();
			return config;
		},
		response: function (response) {
			$('#loading').hide();
			response.config.responseTimestamp = new Date().getTime();
			return response;
		},
		requestError: function(requestError) {
			$('#loading').hide();
			return requestError;
		},
		responseError: function(responseError) {
			$('#loading').hide();
			if(responseError.status === 403 && responseError.data !== null) {
				var msg = "不允许操作，请重新登录";
				swal({
					title: msg,
					text: "",
					type: "warning",
					confirmButtonText: "重新登录",
				}, function () {
					$window.localStorage.clear();
					$window.location.href = "/login.html";
				});
			}
			return responseError;
		}
	};
	return timestampMarker;
}]);
//
app.factory('locals', ["$window", function ($window) {
	return{
		//存储单个属性
		set :function(key,value){
			$window.localStorage[key]=value;
		},
		//读取单个属性
		get:function(key,defaultValue){
			return  $window.localStorage[key] || defaultValue;
		},
		//存储对象，以JSON格式存储
		setObject:function(key,value){
			$window.localStorage[key]=JSON.stringify(value);
		},
		//读取对象
		getObject: function (key) {
			return JSON.parse($window.localStorage[key] || '{}');
		},
		// 删除
		remove: function (key) {
			delete $window.localStorage[key];
		}

	}
}]);

/*app.config(function($routeProvider) {
 $routeProvider.when('/pwd', {//修改密码
 templateUrl: '../template/password.html',
 controller: 'pwdCtrl'
 }).when('/employee', {
 templateUrl: '../template/employee/list.html',
 controller: 'employeeCtrl'
 }).when('/addUser', {
 templateUrl: '../template/user/addUser.html',
 controller: 'addUserCtrl'
 }).when('/editUser/:id/',{
 templateUrl:'../template/user/editUser.html',
 controller:'editUserCtrl'
 }).when('/viewUser/:id/',{
 templateUrl:'../template/user/viewUser.html',
 controller:'viewUserCtrl'
 }).when('/userList',{
 templateUrl:'../template/user/list.html',
 controller:'userListCtrl'
 }).otherwise({
 redirectTo: '/userList'
 })
 });*/

app.service('messageService', ['$rootScope', function($rootScope) {

	return {
		publish: function(name, parameters) {
			$rootScope.$emit(name, parameters);
		},
		subscribe: function(name, listener) {
			$rootScope.$on(name, listener);
		}
	};
}]);

app.service('loginOutServices',
	function($http) {
		return {
			loginOut: function(){
				return $http.get('/logout');
			}
		}
	}
);
app.controller('loginOutCtrl',['$scope',/*'$cookieStore',*/'locals','loginOutServices',
	function($scope,/*$cookieStore,*/locals,loginOutServices){
		$scope.loginOut = function(){
			var loginOut = loginOutServices.loginOut();
			loginOut.success(function(data){
				if(data.code == 200){
					window.location.href='login.html';
					// $cookieStore.remove("persion");
					locals.remove('persion');
				}else{
					alert('退出失败，请重新退出');
				}
			}).error(function(error){
				alert(error);

			});
		}
	}
]);

$("body").delegate('.ui-icon-closethick','click',function(){
	// 有需要只关闭当前弹框的增加closeOne样式
	if( !!$(this).closest(".closeOne")[0] )
		return false;
	$( ".ui-dialog-content:eq(0)" ).dialog("destroy");
	$(".ui-dialog").remove();
});

/**
 * Created by PC on 2016/7/12.
 */
var loanManageApp = angular.module('loanManageApp', ['pageDirectives', 'formDirectives', 'treeControl']);
loanManageApp.service('loanManageServices', function ($http) {
    var service = {
        list: function (param) {
            return $http.post('/loan/list', param, {cache: false});
        },
        view: function (param) {
            return $http.post('/loan/view', param, {cache: true});
        },
        allpyView: function (param) {
            return $http.post('/loan/detail', param, {cache: true});
        },
        add: function (param) {
            return $http.post('/loan/save', param, {cache: false});
        },
        applyAdd: function (param) {
            return $http.post('/loan/createprocess', param, {cache: false});
        },
        // 银行枚举
        banklist: function () {
            return $http.post('/loan/banklist',  {cache: false});
        },
        // 查询未还清借款
        query: function (param) {
            return $http.post('/loan/query', param, {cache: true});
        },
        // 还款
        repayment: function (param) {
            return $http.post('/loan/repayment', param, {cache: true});
        },
        chargeoff: function (param) {  //冲销
            return $http.post('/loan/chargeoff', param);
        },
        mark: function (param) {  //财务标记
            return $http.post('/loan/mark', param);
        },
	    nullify: function (param) {  //作废
            return $http.post('/loan/nullify', param);
        },
        //审批接口
        agree: function (param) {//同意
            return $http.post('/loan/agree', param, {cache: false});
        },
        disagree: function (param) {//驳回
            return $http.post('/loan/disagree', param, {cache: false});
        },
        cancel: function (param) {//取消
            return $http.post('/loan/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/loan/recall', param, {cache: false});
        },
        getprocesslog: function (param) {
          return $http.post('/loan/getprocesslog',param,{cache:false});
        }
    };
    return service;
});
// 查询列表
loanManageApp.controller('loanManageOrderCtrl', ['$scope', '$stateParams', '$rootScope', '$http', 'loanManageServices', function ($scope, $stateParams, $rootScope, $http, service) {
    // ...
    var person = $rootScope.loginPerson;
    //2017-1-20 方便测试 admin也放开权限
    if (person.user.orgid == '5746705e4e60fa6e56176410' || person.username == "admin") {    // 财务部
        $scope.financeFlag = true;
    } else {
        $scope.financeFlag = false;
    }
    $scope.username = person.user.name;
    // console.log(person, 'financeFlag')
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
                username: $scope.username,
                code: $scope.code,
                fin: $scope.fin,
                department: $scope.department,
                star_time: $scope.star_time,
                end_time: $scope.end_time,
                pay_off: $scope.pay_off ? +$scope.pay_off : null,
	            status: $scope.status
            };
            var customerPromise = service.list(param);
            $scope.paginationConf.pagePromise = customerPromise;
	        customerPromise.success(function (data) {
	        	if(data.code==200){
		        $scope.dataList = data.rst.data.items;
		        
		        for(var i=0,l=$scope.dataList.length; i<l; i++) {
		        	var rep_sapsns = $scope.dataList[i].info.rep_sapsns, rep_sapsnsArr=[];
			        for(var j=0,len=rep_sapsns.length; j<len; j++) {
			        	console.log(rep_sapsns[j], !rep_sapsns[j])
				        if(rep_sapsns[j]) {
					        rep_sapsnsArr.push(rep_sapsns[j])
				        }
				        $scope.dataList[i].info.rep_sapsns = rep_sapsnsArr;
				        console.log($scope.dataList[i].info.rep_sapsns)
			        }
		        }
		        } else {
		        	swal(data.msg,'', 'warning')
		        }
	        })
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
			var nullify = service.nullify({ids: [idx]});
			nullify.success(function (data) {
				if (data.code == 200) {
					swal({
						title: '借款单作废成功',
						type: 'success',
						showCancelButton: false,
						closeOnConfirm: false
					},function () {
						window.location.reload();
					})
					// swal('借款单作废成功', '', 'success');
					// $scope.dataList[idx].info.status = 'nullifyed';
					
				} else {
					swal(data.msg, '', 'warning');
				}
			})
		});
		
	}

}]);
// 新增
loanManageApp.controller('loanManageAddCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$filter', 'loanManageServices', function ($scope, $stateParams, $rootScope, $http, $filter, service) {

    var person = $rootScope.loginPerson, d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    var user = {};
    user.name = person.user.name;
    user._id = person.user._id;
    user.login = person.user.login;
    $scope.ORDER_DATA = {
        user: {},
        department: {name:'', _id:''},
        fin: {code:'', name:''}/*,
        applicant: {name: person.user.name, _id:person.user._id, login:person.user.login}*/
    };
    $scope.ORDER_DATA.user = user;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department._id = person.user.orgid;

    // 选择人员
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
            $scope.ORDER_DATA.user.name = user;
            $scope.ORDER_DATA.user._id = userId;
            $scope.ORDER_DATA.user.login = login;
            $scope.ORDER_DATA.department.name = orgName;
            $scope.ORDER_DATA.department._id = orgId;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };


    $scope.addData = function (data, statue) {
        console.log('data::', data)
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
	    if ($scope.ORDER_DATA.brw_amount == 0) {
		    swal("借款金额不能为0", "", "warning");
		    return false;
	    }
        data.fin.name = {1:'现金', 2: '支票'}[$scope.fincode];
        data.fin.code = $scope.fincode*1;
        var addParam = {};
        var param = {processId: $scope.processId, nodeId: $scope.nodeId};
        addParam.doc = {'model': {'info':data}};
        param.doc = {'model': {'info':data}};
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
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/loanManageOrder';
                    });
                } else {
                    alert(data.msg);
                }
            });
        }
    };

}]);
// 编辑
loanManageApp.controller('loanManageEditCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$filter', 'loanManageServices', function ($scope, $stateParams, $rootScope, $http, $filter, service) {
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    var viewCont = service.allpyView(param);
    var person = $rootScope.loginPerson;

    viewCont.success(function (data) {
        $scope.processId = data.rst.processId;
        $scope.nodeId = data.rst.nodeId;
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.loading = false;
            $scope.ORDER_DATA = data.rst.doc.model.info;
            $scope.fincode = $scope.ORDER_DATA.fin.code+'';

        } else {
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }

    });
    // 选择人员
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
            $scope.ORDER_DATA.user.name = user;
            $scope.ORDER_DATA.user._id = userId;
            $scope.ORDER_DATA.user.login = login;
            $scope.ORDER_DATA.department.name = orgName;
            $scope.ORDER_DATA.department._id = orgId;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
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
        data.fin.name = {1:'现金', 2: '支票'}[$scope.fincode];
        data.fin.code = $scope.fincode*1;
        var addParam = {};
        var param = {processId: $scope.processId, nodeId: $scope.nodeId};
        addParam.doc = {'model': {'info':data}};
        param.doc = {'model': {'info':data}};
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
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/reimbursementOrder';
                    });
                } else {
                    alert(data.msg);
                }
            });
        }
    };

}]);
// 查看
loanManageApp.controller('loanManageViewCtrl', ['$scope', '$stateParams', 'loanManageServices', function ($scope, $stateParams, service) {
    /*$scope.bankList = {
            "10020020": "渤海银行北京分行",
            "10020027": "澳新银行广州分行",
            "10020025": "中国银行杭州星光大道支行定期存款",
            "10020007": "民生银行西坝河支行",
            "10020005": "北京银行景山支行",
            "10020002": "招行北京分行营业部",
            "10020012": "工行北京市分行营业部",
            "10020029": "北京农商银行四季青支行",
            "10020017": "工行上海丽园路支行（上海分公司）",
            "10020015": "建行月坛南街支行",
            "10020011": "建行首体南路支行",
            "10020013": "交通银行北京西三环支行",
            "10020009": "深圳发展银行北京建国门支行",
            "10020006": "(招行北京分行7天通知存款)",
            "10020021": "澳新银行北京分行",
            "10020001": "北京银行车公庄支行",
            "10020016": "中行车公庄西路支行",
            "10020022": "兴业银行安华支行",
            "10020023": "中国银行杭州星光大道支行",
            "10020026": "中国银行杭州沁园支行定期存款",
            "10020024": "中国银行杭州沁园支行",
            "10020008": "华夏银行车公庄支行",
            "10020004": "招商银行上海天山支行",
            "10020018": "中信银行总行营业部",
            "10020019": "光大天宁寺支行",
            "10020028": "兴业银行安华支行定期存款"
    };*/
    var banklist = service.banklist();
    banklist.success(function (data) {
        $scope.bankList = data.rst.data.banktype;
        var viewCont = service.view({code: $stateParams.id});
        viewCont.success(function (data) {
            $scope.ORDER_DATA = data.rst.data.info;
            $scope.repayment = data.rst.data.repayment;
        });
    });
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = service.getprocesslog({id: vm.ORDER_DATA.code}); // 直接取值数据中 申请人（proposer）
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
// 审批
loanManageApp.controller('loanManageCtrl', ['$scope','$rootScope', '$stateParams', '$http', 'loanManageServices', function ($scope, $rootScope, $stateParams, $http, service) {
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewCont = service.allpyView(param);

    viewCont.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.loading = false;
            $scope.ORDER_DATA = data.rst.doc.model.info;

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
                    confirmButtonText: "返回借款待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借款&&controllercode=JK';
                });
            } else {
                swal("提交失败！", '', "error");
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
                    confirmButtonText: "返回借款待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借款&&controllercode=JK';
                });
            } else {
                swal("提交失败！", '', "error");
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
                    confirmButtonText: "返回借款待办",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借款&&controllercode=JK';
                });
            } else {
                swal("提交失败！", '', "error");
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
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            swal(error, "", "warning");
            //alert(error);
        });
    }

}]);

//  标记
loanManageApp.controller('loanManageMarkCtrl', ['$scope', '$stateParams', '$rootScope', '$filter', 'loanManageServices', function ($scope, $stateParams, $rootScope, $filter, service) {
    var person = $rootScope.loginPerson, d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    var final = {};
    final.name = person.user.name;
    final._id = person.user._id;
    final.login = person.user.login;
    var banklist = service.banklist();
    banklist.success(function (data) {
        $scope.payBankList = data.rst.data.banktype;
    });
    // 加载银行列表
    var viewCont = service.view({code: $stateParams.id});
    viewCont.success(function (data) {
        $scope.ORDER_DATA = data.rst.data.info;
        $.extend($scope.ORDER_DATA, {fin_user: final, fin_date: $scope.today});
    });
    // 付款类型为 库存现金 时，付款银行为一个固定值
    $scope.changeFKType = function (val) {
        if(val == '01' ){
            $scope.ORDER_DATA.pay_bank = '10010000';
        } else {
            $scope.ORDER_DATA.pay_bank = '';
        }
    }
    // 标记
    $scope.sendFn = function (d) {
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有信息填写不完整，请检查后再标记", "", "warning");
            return false;
        }
        var trans = service.mark({pay: d});
        trans.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "标记成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借款管理页面",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/loanManageOrder';
                });

            } else {
                swal(data.msg, '', 'warning');
            }
        })
    }


}]);

// 冲销
loanManageApp.controller('loanManageWriteOffCtrl', ['$scope', '$stateParams', '$filter', 'loanManageServices', function ($scope, $stateParams, $filter, service) {

    var d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    $scope.dataList = [];
    var viewCont = service.view({code: $stateParams.id});
    viewCont.success(function (data) {
        $scope.ORDER_DATA = data.rst.data.info;
    });
    $scope.chargeoff = function (d) {
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有信息填写不完整，请检查后再冲销", "", "warning");
            return false;
        }
        var param = {
            "certcode":$stateParams.certcode,
            "certyear":$scope.chargeoffdate.split('-')[0],
            "chargeoffdate":$scope.chargeoffdate,
            "reason":$scope.reason
        };
        var chargeoff = service.chargeoff(param);
        chargeoff.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "冲销成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借款管理页面",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/loanManageOrder';
                });

            } else {
                swal(data.msg, '', 'warning');
            }
        })
    }
}]);

// 还款
loanManageApp.controller('loanManageReturnCtrl', ['$scope', '$stateParams', '$rootScope', '$filter', 'loanManageServices', function ($scope, $stateParams, $rootScope, $filter, service) {
    var person = $rootScope.loginPerson, d = new Date();
    $scope.today = $filter('date')(d, 'yyyy-MM-dd');
    var final = {};
    final.name = person.user.name;
    final._id = person.user._id;
    final.login = person.user.login;
    $scope.ORDER_DATA = {certdate: {rep_user: final, rep_date:$scope.today}};
    /*$scope.certdate = {rep_user: final};
    $scope.repayment = {};*/

    $scope.search = function () {
        if(!$scope.username) {
            swal('请填写借款人', '', 'warning');
            return false;
        }
        var param = {
            page: 1,
            limit: 999,
            username: $scope.username
        };
        var getList = service.query(param);
        getList.success(function (data) {
            if(data.code==200) {
                $scope.dataList = data.rst.data.items.reverse();
                var amountTotal = 0;
                for(var i=0,l=$scope.dataList.length; i<l; i++) {
                    amountTotal += $scope.dataList[i].info.cur_brw;
                }
                // 计算未还款金额
                $scope.amountTotal = amountTotal;
            }
        })
    };
    var banklist = service.banklist();
    banklist.success(function (data) {
        $scope.payBankList = data.rst.data.banktype;
    });
    // 付款类型为 库存现金 时，付款银行为一个固定值
    $scope.changeFKType = function (val) {
        if(val == '01' ){
            $scope.ORDER_DATA.certdate.rep_bank = '10010000';
        } else {
            $scope.ORDER_DATA.certdate.rep_bank = '';
        }
    }

    // 还款总额分摊到每单上
    $scope.repTotalsplit = function () {
        var total = $scope.ORDER_DATA.certdate.rep_total;
        if(!total || !$scope.dataList.length) {
            return false;
        }

        for(var i=0,l=$scope.dataList.length; i<l; i++) {
            var d = $scope.dataList[i].info;
            if(total-d.cur_brw<0) {
                d.rep_amount = total;
                total = 0;
            } else {
                d.rep_amount = d.cur_brw;
                total -= d.cur_brw;
            }
        }
    };

    // 还款
    $scope.returnoff = function (d) {
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有信息填写不完整，请检查后再标记", "", "warning");
            return false;
        }
	    if($scope.ORDER_DATA.certdate.rep_total == 0) {
		    swal("本次还款金额不能为0！", "", "warning");
		    return false;
	    }
        if($scope.ORDER_DATA.certdate.rep_total - $scope.amountTotal > 0) {
	        swal("本次还款金额不能大于个人未还总金额！", "", "warning");
	        return false;
        }
        var param = d, docs=[];
        for(var i=0,l=$scope.dataList.length; i<l; i++) {
            var o = $scope.dataList[i].info;
            docs[i] = {
                "code": o.code,
                "rep_amount": o.rep_amount,
                "user": o.user,
                "department": o.department
            }
        }
        $.extend(true, param, {docs: docs})
        var repayment = service.repayment(param);
        repayment.success(function (data) {
            if (data.code == 200) {
                //有标记失败的  给出提示
                var errData = data.rst.fail;
                if (errData) {
                    swal(errCode + '还款失败', '', 'warning');
                } else {
                    swal({
                        title: "还款成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回借款管理页面",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/loanManageOrder';
                    });
                }

            } else {
                swal(data.msg, '', 'warning');
            }
        })
    }


}]);

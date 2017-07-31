var userApp = angular.module('userApp', ['pageDirectives', 'treeControl']);
userApp.service('userServices', function($http, SocketServe) {
    var service = {
        addUser: function(param) {
            return $http.post('/user/add', param);
        },
        listUser: function(param) {
            return $http.post('/user/list',param ,{cache:false});
        },
        deleteUser: function(param){
            return $http.post('/user/delete',param);
        },
        activateUser: function(param) {
            return $http.post('/user/activate', param);
        },
        viewUser: function(param){
            return $http.post('/user/read',param);
        },
        editUser: function(param){
            return $http.post('/user/update',param);
        },
        listEmployee: function(param) {
            return $http.post('/org/read',param ,{cache:false});
        },
        restPwd: function(param) { // 重置密码
            return $http.post('/user/resetpwd',param ,{cache:false});
        },
        rmePwd: function(param) { //修改密码
            return $http.post('/userme/password',param ,{cache:false});
        },
        // 获取一级部门列表
        getDptEnum: function() {
            return $http.post('/user/getorgsenum', {cache: false});
        },
        // 工资查询
        payroll: function(param) {
            return $http.post('/eday/payroll', param, {cache: false});
        },
        //审批流更新 审批类型
        getprctype:function(param){
            return $http.post('/approval/getprctype',param,{cache:false});
        },
        //审批流更新  查询接口
        updatepcfgandprocess : function(param){
            return $http.post('/approval/updatepcfgandprocess',param,{cache:false});
        },
        //审批流查看旧审批流接口
        getprocessbylog : function(param){
            return $http.post('/approval/getprocessbylog',param,{cache:false});
        },
        getbelongaddr : function(param){
            return $http.post('/user/getbelongaddr',param,{cache:false});
        },
        setbelongaddr : function(param){
            return $http.post('/user/setbelongaddr',param,{cache:false});
        },
        //获取我的订阅配置
        userprctype : function(param){
            return $http.post('/user/getprctype', param, {cache:false});
        },
        //在线用户
        //在线用户统计建立连接
        olCountEmit: function(param) {
            return SocketServe.msgOnlineCount(param);
        },
        //在线用户统计监听数据
        olCount: function(cb) {
            return SocketServe.msgResOnlineCount(cb);
        },
        // 在线用户列表建立连接
        olUserListEmit: function(param) {
            return SocketServe.msgOlUserList(param);
        },
        // 在线用户列表监听数据
        olUserList: function(cb) {
            return SocketServe.msgResOlUserList(cb);
        },
        // 销售-商务对应管理
        busmanList: function() {
            return $http.post('/user/busisalegroup', {cache: false});
        },
        // 增加销售-商务关系
        addbusi: function(param) {
            return $http.post('/user/addbusi', param, {cache: false});
        },
        // 删除销售-商务关系
        delbusi: function(param) {
            return $http.post('/user/delbusi', param, {cache: false});
        },
        listbusi: function(param) {
            return $http.post('/user/listbusi', param, {cache: false});
        },
        rolesList : function(param) {
            return $http.post('/role/list',param,{cache:false});
        },
        // 供方财务信息
        supplierbank: function(param) {
            return $http.post('/user/supplierbank', param, {cache: false});
        },
        updatebankinfo: function(param) {
            return $http.post('/user/updatebankinfo', param, {cache: false});
        },
        //补全成本分析
        getcontract: function (param) {
            return $http.post('/admincontract/getcontract', param, {cache: false});
        },
        //补全成本分析
        saveothercost: function (param) {
            return $http.post('/admincontract/saveothercost', param, {cache: false});
        },
        rolesave : function(param){
            return $http.post('/role/save',param,{cache:false});
        },
        roleDelete : function(param){
            return $http.post('/role/delete',param,{cache:false});
        },
        roleupdate : function(param){
            return $http.post('/role/update',param,{cache:false});
        },
        // 人员角色参数管理/保存
        updateroles: function(param) {
            return $http.post('/user/updateroles', param, {cache: false});
        },
        updaterole: function(param) {
            return $http.post('/user/updaterole', param, {cache: false});
        },
        pr_roleDelete: function(param) {
            return $http.post('/user/deleterole', param, {cache: false});
        },
        // 给用户添加角色
        pr_newrole: function(param) {
            return $http.post('/user/adduserrole', param, {cache:false});
        },
        enum_doclist : function(param){
            return $http.post('/enum_doc/list',param,{cache:false});
        },
        enum_docAdd : function(param){
            return $http.post('/enum_doc/add',param,{cache:false});
        },
        enum_docUpdate :function(param){
            return $http.post('/enum_doc/update',param,{cache:false});
        },
        enum_docDelete : function(param){
            return $http.post('/enum_doc/delete',param,{cache:false});
        },
        // 单据权限
        da_list: function(param) {
            return $http.post('/enum_doc_auth/list', param, {cache: false});
        },
        da_add: function(param) {
            return $http.post('/enum_doc_auth/add', param, {cache: false});
        },
        da_update: function(param) {
            return $http.post('/enum_doc_auth/update', param, {cache: false});
        },
        da_delete: function(param) {
            return $http.post('/enum_doc_auth/delete', param, {cache: false});
        },
        // 单据规则配置
        do_update: function(param) {
            return $http.post('/enum_doc/updateops', param, {cache: false});
        },
        // 审批负责人维护
        poset_list: function(param) {
            return $http.post('/role/listrole', param, {cache: false});
        },
        poset_update: function(param) {
            return $http.post('/role/update', param, {cache: false});
        },
        poset_costcenter: function(param) {
            return $http.post('/role/costcenter', param, {cache: false});
        },
        poset_productline: function(param) {
            return $http.post('/role/zvmm_cpx', param, {cache: false});
        },
        enumlist : function(param){
            return $http.post('/enuminterface/enumlist',param,{cache:false});
        },
        // 未分配产品线
        poset_unallocated_productline: function(param) {
            return $http.post('role/zvmm_cpx_smwy', param, {cache: false});
        },
        // 未分配成本中心
        poset_unallocated_costcenter: function(param) {
            return $http.post('role/costcenter_smwy', param, {cache: false});
        },
        // 部门
        poset_unallocated_org: function(param) {
            return $http.post('role/org_smwy', param, {cache: false});
        }
    };
    return service;
});

userApp.factory('officeEnum', function() {
  return [{
           "text": "上海分公司",
          },
          {
           "text": "天津办事处",
          },
          {
           "text": "广州办事处",
          },
          {
           "text": "福州办事处",
          },
          {
           "text": "长沙办事处",
          },
          {
           "text": "南昌办事处",
          },
          {
           "text": "深圳办事处",
          },
          {
           "text": "成都办事处",
          },
          {
           "text": "重庆办事处",
          },
          {
           "text": "昆明办事处",
          },
          {
           "text": "武汉办事处",
          },
          {
           "text": "合肥办事处",
          },
          {
           "text": "南京办事处",
          },
          {
           "text": "乌鲁木齐办事处",
          },
          {
           "text": "呼和浩特办事处",
          },
          {
           "text": "长春办事处",
          },
          {
           "text": "沈阳办事处",
          },
          {
           "text": "哈尔滨办事处",
          },
          {
           "text": "大连办事处",
          },
          {
           "text": "青岛办事处",
          },
          {
           "text": "济南办事处",
          },
          {
           "text": "石家庄办事处",
          },
          {
           "text": "西安办事处",
          },
          {
           "text": "杭州办事处",
          },
          {
           "text": "南宁办事处",
          },
          {
           "text": "海口办事处",
          },
          {
           "text": "太原办事处",
          },
          {
           "text": "郑州办事处",
          },
          {
           "text": "兰州办事处",
          },
          {
           "text": "贵阳办事处",
          },
          {
           "text": "埃塞办事处",
          },
          {
           "text": "苏州办事处",
          },
          {
           "text": "温州办事处",
          },
          {
           "text": "宁波办事处",
          },
          {
           "text": "无锡办事处",
          },
          {
           "text": "常州办事处",
          },
          {
           "text": "银川办事处",
          },
          {
           "text": "西宁办事处",
          }];
});



userApp.controller('userListCtrl', ['$scope','$location','userServices','messageService',
    function($scope,$location,userServices,messageService) {
        $scope.empType = "false";
        $scope.pageClass = 'listuser';
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            numberOfPage:0,
            pagesLength: 15,
            perPageOptions: [5,10, 20, 30, 40, 50],
            pagePromise:{},
            onChange: function(){
                var everyoneBool = $scope.empType === "true" ? true : false;
                var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.useSname, orgid: $scope.orgId, everyone: everyoneBool, deletion: everyoneBool};
                var userPromise = userServices.listUser(param);
                $scope.paginationConf.pagePromise = userPromise;
            }
        };
        $scope.getEmployee = function(id,name){
            var param = { _id: id, hasuser:true};
            var employeeList = userServices.listEmployee(param);
            $scope.empViewName = name;
            if(name){
                $scope.empName = name;
            }else{
                $scope.empName = '中建材集团';
            }
            $scope.orgId = id;
            employeeList.success(function(data){
                if(data.code == 200){
                    if(data.rst.data.belongs.orgs != 0){
                        $scope.employeeList = data.rst.data.belongs.orgs;
                        $scope.employeeNav = data.rst.data.superorgs;
                        //$scope.employeeUser = data.rst.data.belongs.users;
                    }

                }
            })
        };

        $scope.employee = function(){
            $( "#dialog" ).dialog({
                autoOpen: false,
                width: 300,
                modal: true,
                buttons: [
                   /* {
                        text: "取消",
                        class: "gray_bg",
                        click: function() {
                            $( this ).dialog( "close" );
                            $(".layer").hide();
                        }
                    },*/
                    {
                        text: "确定",
                        class: "red_bg",
                        click: function() {
                            $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                            $(".ui-dialog").remove();
                        }
                    }
                ]
            });
            $scope.getEmployee();
            $( "#dialog" ).dialog( "open" );

        }

	    $scope.deleteUser = function(id,index){
		    // swal(
			  //   {
				//     title: "确定删除此用户吗？",
				//     text: '',
				//     type: "warning",
				//     showCancelButton: true,
				//     cancelButtonText: '取消',
				//     confirmButtonColor: '#DD6B55',
				//     confirmButtonText: '确定'
			  //   },
			  //   function(){
				//     //var userList = $scope.userList[id];
				//     //var deleteUser = userServices.deleteUser({_id:userList._id});
				//     var param = {_id: id};
				//     var deleteUser = userServices.deleteUser(param);
				//     deleteUser.success(function(data){
				// 	    if(data.code == 200){
				// 		    // $scope.dataList.splice(index,1);
				// 		    $scope.search();
        //
				// 		    swal('删除成功', '', 'warning');
				// 	    }else{
				// 		    swal('删除失败', '', 'warning');
				// 	    }
				//     }).error(function(error){
				// 	    alert(error);
				//     });
			  //   }
		    // );

        $scope.delete_extra = {roles: false, busi_roles: false};
        $( "#delDialog" ).dialog({
            autoOpen: false,
            draggable: false,
            resizable: false,
            width: 480,
            modal: true,
            show: "fade",
            dialogClass: "swalDialog",
            buttons: [
               {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".layer").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var param = {_id: id, roles: $scope.delete_extra.roles, busi_roles: $scope.delete_extra.busi_roles};
            				    var deleteUser = userServices.deleteUser(param);
            				    deleteUser.success(function(data){
            					    if(data.code == 200){
            						    // $scope.dataList.splice(index,1);
            						    $scope.search();

            						    swal('删除成功', '', 'warning');
            					    }else{
            						    swal('删除失败', '', 'warning');
            					    }
            				    }).error(function(error){
            					    alert(error);
            				    });
                        $( this ).dialog( "destroy" );
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#delDialog" ).dialog( "open" );
	    }

      // 已删除员工激活
      $scope.activate = function(id, index) {
        swal(
			    {
				    title: "确定激活此用户吗？",
				    text: "",
				    type: "warning",
				    showCancelButton: true,
				    cancelButtonText: '取消',
				    confirmButtonColor: '#DD6B55',
				    confirmButtonText: '确定'
			    },
			    function(){
				    var param = {_id: id};
				    var activateUser = userServices.activateUser(param);
				    activateUser.success(function(data){
					    if(data.code == 200){
						    // $scope.dataList.splice(index,1);
						    $scope.search();

						    swal('激活成功', '', 'warning');
					    }else{
						    swal('激活失败', '', 'warning');
					    }
				    }).error(function(error){
					    console.log(error);
				    });
			    }
		    );
      }

    }
]);
// 查看用户详情
userApp.controller('viewUserCtrl', ['$scope','$stateParams','userServices',
    function($scope,$stateParams,userServices) {

        var viewUser = userServices.viewUser({_id:$stateParams.id});
        viewUser.success(function(data){
            if(data.code == 200){
                $scope.ORDER_DATA = data.rst.data;
            }
        }).error(function(error){
            alert(error);
        });
    }
]);

// 重置
userApp.controller('resetCtrl', ['$scope', '$location', 'userServices', function ($scope, $location, userServices) {
    $scope.ORDER_DATA = {user: {id:'',name:'',login:''},department:{id:'',name:''}};
    $scope.userBox = function () {
        $("#userBox").dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $("#userBox").dialog("open");
    };

    // 重置密码
    $scope.resetPwd = function () {
        if(!$scope.ORDER_DATA.user.id) {
            swal('请选择人员','','warning');
            return false;
        }
        var restPwd = userServices.restPwd({login:$scope.ORDER_DATA.user.login});
        restPwd.success(function (data) {
            if(data.code == 200) {
                swal('密码重置成功', '', 'success');
            }
        })
    };
}
]);

// 修改信息
userApp.controller('changeInfoCtrl', ['$scope','$location', 'locals','userServices', function($scope,$location,locals,userServices) {
    $scope.saveFn = function () {
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        });
        if (!$scope.myForm.$valid) {
            swal("您有输入不符合规范，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.newpwd2 != $scope.newpwd.substr(1)) {
            swal("您有输入不符合规范，请检查后再保存", "", "warning");
            return false;
        }
        var rmePwd = userServices.rmePwd({ oldPwd:$scope.oldpwd,newPwd:$scope.newpwd2});
        rmePwd.success(function (data) {
            if(data.code == 200) {
                swal({
                    title: "密码修改成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "重新登录",
                    closeOnConfirm: true
                }, function () {
                    locals.remove('persion');
                    window.location.href='login.html';
                });
                // swal('密码修改成功', '', 'success');
            } else {
                swal(data.msg, '', 'warning');
            }
        })
    }
}
]);

// 人员列表
userApp.controller('userListBoxCtrl', ['$scope','userServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.useSname};
            var customerPromise = service.listUser(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.userSelect = function(user, userId, login, orgName, orgId){
        $scope.ORDER_DATA.user.name = user;
        $scope.ORDER_DATA.user.id = userId;
        $scope.ORDER_DATA.user.login = login;
        $scope.ORDER_DATA.department.name = orgName;
        $scope.ORDER_DATA.department.id = orgId;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
}]);

/**
 * C: Shen
 * D: 查询工资
 */
userApp.controller('payrollFindCtrl', ['$rootScope', '$scope', 'userServices', function($rootScope, $scope, service) {
    $scope.search = function() {
        // 空日期
        if (!$scope.findDate) {
            swal("请选择日期", "", "warning");
            return;
        }
        // 日期分割处理
        var inquireDate = $scope.findDate.split("-");

        // 工资查询
        var param = {year: inquireDate[0], month: inquireDate[1]};
        var payroll = service.payroll(param);
        payroll.success(function(data) {
            if (data.code == 200) {
                $scope.paymentData = data.data;
            } else {
                $scope.paymentData = null;
                swal(data.msg, "", "warning");
            }
        });
    }
}]);

userApp.controller('manageRoleCtrl', ['$scope','userServices',function($scope,service){
    $scope.getEmployee = function(id,name,type){
        var param = { _id: id, hasuser:true};
        var employeeList = service.listEmployee(param);
        if(type == 'roleUName'){
            $scope.roleUName = name;
            if(name){
                $scope.roleUName = name;
            }else{
                $scope.roleUName = '中建材集团';
            }
            $scope.roleUId = id;
        }else if(type == 'roleDName'){
            $scope.roleDName = name;
            if(name){
                $scope.roleDName = name;
            }else{
                $scope.roleDName = '中建材集团';
            }
            $scope.roleDId = id;

        }
        $scope.excleFormData ={'orgId':id}
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                    //$scope.employeeUser = data.rst.data.belongs.users;
                }

            }
        })
    };
    $scope.employee = function(type){
        $( "#dialog" ).dialog({
            autoOpen: false,
            width: 300,
            modal: true,
            buttons: [
                /* {
                 text: "取消",
                 class: "gray_bg",
                 click: function() {
                 $( this ).dialog( "close" );
                 $(".layer").hide();
                 }
                 },*/
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee('','',type);
        $( "#dialog" ).dialog( "open" );
        $scope.orgType = type;
    }
    $scope.excleConf = {
        formData:{},
        buttonText:'点击上传',
        uploader:'/user/importroles',
    };
    $scope.getUploadCallback = function(uploadCallData) {
        console.log(uploadCallData);
        if (uploadCallData.data.length) {
            swal(uploadCallData.data, "", "warning");
            return;
        } else {
            swal("上传成功", "", "success");
        }
    }
    $scope.download = function(event) {
      if ($scope.roleDId) {
        return true;
      }else{
        event.preventDefault();
        swal("请选择部门", "", "warning");
        return false;
      }
    }
}]);
userApp.controller('roleBillCtrl', ['$scope','userServices',function($scope,service){
    // 获取一级部门列表
    var getDptEnum = service.getDptEnum();
    getDptEnum.success(function(data) {
        if (data.code == 200) {
            $scope.dptList = data.rst.data;
        }
    })
    $scope.getUploadCallback = function(uploadCallData) {
        console.log(uploadCallData);
        if (uploadCallData.data.length) {
            swal(uploadCallData.data, "", "warning");
            return;
        } else {
            swal("上传成功", "", "success");
        }
    }
    $scope.getEmployee = function(id,name,type){
        var param = { _id: id, hasuser:true};
        var employeeList = service.listEmployee(param);
        if(type == 'roleUName'){
            $scope.roleUName = name;
            if(name){
                $scope.roleUName = name;
            }else{
                $scope.roleUName = '中建材集团';
            }
            $scope.roleUId = id;
        }else if(type == 'roleDName'){
            $scope.roleDName = name;
            if(name){
                $scope.roleDName = name;
            }else{
                $scope.roleDName = '中建材集团';
            }
            $scope.roleDId = id;

        }
        $scope.excleFormData ={'orgId':id,'orgName':name}
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                    //$scope.employeeUser = data.rst.data.belongs.users;
                }

            }
        })
    };
    $scope.employee = function(type){
        $( "#dialog" ).dialog({
            autoOpen: false,
            width: 300,
            modal: true,
            buttons: [
                /* {
                 text: "取消",
                 class: "gray_bg",
                 click: function() {
                 $( this ).dialog( "close" );
                 $(".layer").hide();
                 }
                 },*/
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee('','',type);
        $( "#dialog" ).dialog( "open" );
        $scope.orgType = type;
    }
    $scope.excleConf = {
        formData:{},
        buttonText:'点击上传',
        uploader:'/user/importopprevs',
    };
}]);

userApp.controller('rolesNameCtrl', ['$scope','userServices',function($scope,service){
    // 获取一级部门列表
    var getDptEnum = service.getDptEnum();
    getDptEnum.success(function(data) {
        if (data.code == 200) {
            $scope.dptList = data.rst.data;
        }
    })
    $scope.getUploadCallback = function(uploadCallData) {
        console.log(uploadCallData);
        if (uploadCallData.data.length) {
            swal(uploadCallData.data, "", "warning");
            return;
        } else {
            swal("上传成功", "", "success");
        }
    }
    $scope.getEmployee = function(id,name,type){
        var param = { _id: id, hasuser:true};
        var employeeList = service.listEmployee(param);
        if(type == 'roleUName'){
            $scope.roleUName = name;
            if(name){
                $scope.roleUName = name;
            }else{
                $scope.roleUName = '中建材集团';
            }
            $scope.roleUId = id;
        }else if(type == 'roleDName'){
            $scope.roleDName = name;
            if(name){
                $scope.roleDName = name;
            }else{
                $scope.roleDName = '中建材集团';
            }
            $scope.roleDId = id;

        }
        $scope.excleFormData ={'orgId':id}
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                    //$scope.employeeUser = data.rst.data.belongs.users;
                }

            }
        })
    };
    $scope.employee = function(type){
        $( "#dialog" ).dialog({
            autoOpen: false,
            width: 300,
            modal: true,
            buttons: [
                /* {
                 text: "取消",
                 class: "gray_bg",
                 click: function() {
                 $( this ).dialog( "close" );
                 $(".layer").hide();
                 }
                 },*/
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee('','',type);
        $( "#dialog" ).dialog( "open" );
        $scope.orgType = type;
    }
    $scope.excleConf = {
        formData:{},
        buttonText:'点击上传',
        uploader:'/user/importrolesname',
    };
}]);
userApp.controller('procprevsCtrl', ['$scope','userServices',function($scope,service){
    // 获取一级部门列表
    var getDptEnum = service.getDptEnum();
    getDptEnum.success(function(data) {
       if (data.code == 200) {
           $scope.dptList = data.rst.data;
       }
    })
    $scope.getEmployee = function(id,name,type){
        var param = { _id: id, hasuser:true};
        var employeeList = service.listEmployee(param);
        if(type == 'roleUName'){
            $scope.roleUName = name;
            if(name){
                $scope.roleUName = name;
            }else{
                $scope.roleUName = '中建材集团';
            }
            $scope.roleUId = id;
        }else if(type == 'roleDName'){
            $scope.roleDName = name;
            if(name){
                $scope.roleDName = name;
            }else{
                $scope.roleDName = '中建材集团';
            }
            $scope.roleDId = id;

        }
        $scope.excleFormData ={'orgId':id}
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                    //$scope.employeeUser = data.rst.data.belongs.users;
                }

            }
        })
    };
    $scope.employee = function(type){
        $( "#dialog" ).dialog({
            autoOpen: false,
            width: 300,
            modal: true,
            buttons: [
                /* {
                 text: "取消",
                 class: "gray_bg",
                 click: function() {
                 $( this ).dialog( "close" );
                 $(".layer").hide();
                 }
                 },*/
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee('','',type);
        $( "#dialog" ).dialog( "open" );
        $scope.orgType = type;
    }
    $scope.excleConf = {
        formData:{},
        buttonText:'点击上传',
        uploader:'/user/importprocprevs',
    };
}]);

userApp.controller('menuManagementCtrl', ['$scope','userServices',function($scope,service){

    $scope.excleConf = {
        formData:{},
        buttonText:'点击上传',
        uploader:'/user/importmanu',
    };
}]);

userApp.controller('bussinessManCtrl', ['$scope', 'userServices', function($scope, service) {
    var vm = $scope;
    vm.sel_saleGrpArr = [];
    vm.add_saleGrpArr = [];
    // 商务列表
    var busmanList = service.busmanList();
    busmanList.success(function(data) {
        if (data.code == 200) {
            vm.busmanList = data.rst.data;
        }
    });

    // 查询结果
    vm.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var self = this;
            // if (!vm.selected_orgid && !vm.selected_busman && !vm.selected_saleGrp) {
            //     self.pagePromise = {success: function(){return self.pagePromise;}, error: function(){;}};
            //     return;
            // }
            var param = {
                page: self.currentPage,
                limit: Number(self.itemsPerPage),
                orgid: vm.selected_orgid ? vm.selected_orgid : null,
                _id: vm.selected_busman ? vm.selected_busman._id : null,
                salegroup: vm.selected_saleGrp ? vm.selected_saleGrp._id : null
            }

            var listbusi = service.listbusi(param);
            self.pagePromise = listbusi;
        }
    }

    // 获取销售小组
    vm.get_salegroup = function(orgname, type) {
        // 获取销售小组
        var param = {orgname: orgname};
        var getbelongaddr = service.getbelongaddr(param);
        getbelongaddr.success(function(data){
            if(data.code == 200){
                if (type === 'add') {
                    angular.forEach(data.rst.data.group, function(k, v) {
                        vm.add_saleGrpArr.push({name: k, _id: v});
                    });
                }else{
                    angular.forEach(data.rst.data.group, function(k, v) {
                        vm.sel_saleGrpArr.push({name: k, _id: v});
                    });
                }
            }
        });

    }
    vm.employee = function(type){
        vm.selected_orgid = null;
        vm.paginationConf.onChange();
        var el = null;
        if (type === 'add') {
            el = $("#add_orgbox");
        }else{
            el = $("#select_orgbox");
        }
        el.dialog({
            autoOpen: false,
            width: 300,
            height:480,
            resizable: false,
            dialogClass: "noCloseBtn",
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                }
            ]
        });
        vm.getEmployee(type, null, null);
        el.dialog( "open" );

    }
    vm.getEmployee = function(type, id, name){
        var param = { _id: id, hasuser:true};
        if (type === 'add') {
            vm.add_orgname = name;
            vm.add_orgid = id;
            vm.add_saleGrpArr = [];
        }else{
            vm.selected_orgname = name;
            vm.selected_orgid = id;
            vm.sel_saleGrpArr = [];
        }
        // 更新销售小组列表
        vm.get_salegroup(name, type);
        var employeeList = service.listEmployee(param);
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    vm.employeeList = data.rst.data.belongs.orgs;
                    vm.employeeNav = data.rst.data.superorgs;
                }

            }
        });
    }
    vm.search_list = function() {
        if (!vm.selected_orgid && !vm.selected_busman && !vm.selected_saleGrp) {
            swal("请选择查询条件", "", "error");
            // vm.paginationConf.pagePromise = {success: function(){return self.pagePromise;}, error: function(){;}};
            return;
        }
        vm.search();
        // vm.paginationConf.onChange();
    }
    vm.addSave = function() {
        if (vm.add_orgname && vm.add_saleGrp && vm.add_busman) {
            var param = {_id: vm.add_busman._id, salegroup: vm.add_saleGrp._id}
            var addbusi = service.addbusi(param)
            addbusi.success(function(data) {
                if (data.code == 200) {
                    swal('保存成功', '', 'success');
                    vm.search();
                }else{
                    swal("操作失败", "", "error");
                }
            });
        }
    }
    vm.editSave = function(pre_busiid, afterid, grpcode) {
        // 删除
        var delParam = {_id: pre_busiid, salegroup: grpcode};
        var addParam = {_id: afterid, salegroup: grpcode};
        var del_pro = service.delbusi(delParam);
        del_pro.success(function(data) {
            if (data.code === 200) {
                // 增加
                var add_pro = service.addbusi(addParam);
                add_pro.success(function(data) {
                    if (data.code === 200) {
                        swal("变更成功", "", "success");
                    }else{
                        swal("变更失败", "", "error");
                    }
                });
            }
        });
    }
    vm.delbusi = function(id, grpcode) {
        swal(
            {
                title: "确定删除?",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            },
            function(){
                var param = {}
                var delbusi = service.delbusi({_id: id, salegroup: grpcode});
                delbusi.success(function(data) {
                    if (data.code === 200) {
                        swal("已删除", "", "success");
                    }else{
                        swal("操作失败", "", "error");
                    }
                });
            }
        );

    }
    vm.editbusi = function(list) {
        var _org = list.orglevel3 || list.orglevel2 || list.orglevel1;
        vm.edit_orgname = _org.orgname;
        vm.edit_saleGrp = list.salegroup.value;


        $('#editbox').dialog({
            autoOpen: false,
            width: 800,
            height: 250,
            resizable: false,
            dialogClass: "noCloseBtn",
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: '取消',
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        vm.editSave(list.busi._id, vm.edit_busman, list.salegroup.code);
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                }
            ]
        });
        $("#editbox").dialog("open");
    }

    vm.clickAdd = function() {
        vm.add_orgname = null;
        vm.add_saleGrp = null;
        vm.add_busman = null;

        $('#addbox').dialog({
            autoOpen: false,
            width: 800,
            height: 250,
            resizable: false,
            dialogClass: "noCloseBtn",
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: '取消',
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        if (vm.add_orgname && vm.add_saleGrp && vm.add_busman) {
                            vm.addSave();
                            $( this ).dialog( "close" );
                            $(".layer").remove();
                        }else{
                            swal("请完整填写信息", "", "error");
                        }
                    }
                }
            ]
        });

        $("#addbox").dialog("open");
    }

}]);

// 供方财务信息维护
userApp.controller('financialInfoCtrl', ['$scope', 'userServices', function($scope, service) {
    var vm = $scope;
    $scope.editable = false;

    $scope.employee = function(){
        $("#orgbox").dialog({
            autoOpen: false,
            width: 300,
            height:480,
            resizable: false,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $scope.getEmployee();
        $("#orgbox").dialog( "open" );
    }
    vm.getEmployee = function(id, name){
        var param = { _id: id, hasuser:true};
        $scope.orgname = name;
        $scope.orgid = id;
        var employeeList = service.listEmployee(param);
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                }
            }
        });
    }
    $scope.search = function() {
        $scope.editable = false;
        var param = {orgname: $scope.orgname};
        var supplierbank = service.supplierbank(param);
        supplierbank.success(function(data) {
            if (data.code === 200) {
                $scope.data = data.rst.data;
            }else{
                swal(data.msg, "", "error");
            }
        })
    }
    $scope.edit = function(bankno) {
        $scope.editable = !$scope.editable;
    }
    $scope.save = function(orgname, bank, bankno) {
        var param = {orgname: orgname, bank: bank, bankno: bankno};
        var updatebankinfo = service.updatebankinfo(param);
        updatebankinfo.success(function(data) {
            if (data.code === 200) {
                swal("修改成功","", "success");
            }else{
                swal(data.msg, "", "error");
            }
        })
    }
}]);

// 审批流自动更新controller
userApp.controller('applyUpdataCtrl',['$scope','userServices',function($scope,service){
    //审批类型
    var getprctype = service.getprctype();
    getprctype.success(function(data){
        $scope.processType = data.data.enum.PRC;
    });
    $scope.search = function(processtype,processid,autopass,preview,num){
        var updatepcfgandprocess = service.updatepcfgandprocess({'processtype':processtype,'processid':processid,'autopass':autopass,'preview':preview,'num':num});
        updatepcfgandprocess.success(function(data){
            if(data.code == 200){
                $scope.dataList = data.rst.data.right;
                $scope.dataList1 = data.rst.data.error;
                $scope.AllData = data.rst.data.all;
            }else{
                swal(data.msg,'','error');
            }
        });
    }
}]);
//  ↓查看
userApp.controller('applyUpdataViewCtrl',['$scope','$stateParams','userServices',function($scope,$stateParams,service){
    var  getprocessbylog = service.getprocessbylog({processid:$stateParams.id});
    getprocessbylog.success(function(data){
        if(data.code == 200){
            $scope.processlog = data.rst.data.snapshot.oldprocess.processlog;
            $scope.processlog1 = data.rst.data.snapshot.newprocess.processlog;
        }
    });
}]);

//新增员工
userApp.controller('listAddViewCtrl',['$scope','userServices', 'officeEnum', function($scope,service, officeEnum){
    // office enum
    $scope.officeList = officeEnum;
    // 用于销售小组维护
    var clsaleArr = {};
    $scope.getEmployee = function(id,name){
        var param = { _id: id, hasuser:true};
        $scope.orgname = name;
        $scope.orgid = id;
        // 更新销售小组列表
        $scope.get_salegroup($scope.orgname);
        var employeeList = service.listEmployee(param);
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                }

            }
        })
    };

    // 我的订阅配置项目
    var userprctype = service.userprctype();
    userprctype.success(function(data) {
        if (data.code == 200) {
            $scope.prctypelist = data.rst.data;
        }
    });

    $scope.employee = function(){
        $( "#userbox" ).dialog({
            autoOpen: false,
            width: 300,
            height:480,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee();
        $( "#userbox" ).dialog( "open" );

    }
    // 多选框
    $scope.selectedsubs = [];
    $scope.userprctype = function() {
      $('#prcbox').dialog({
          autoOpen: false,
          width: 400,
          height: 600,
          modal: true,
          buttons: [
              {
                  text: '确定',
                  class: "red_bg",
                  click: function() {
                      $( this ).dialog( "close" );
                      $(".layer").hide();
                  }
              }
            ]
      });
      $("#prcbox").dialog("open");
    }
    // 单个checkbox选中
    $scope.checkSelect = function($event, index, item) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.selectedsubs.push({code: item.code, name: item.name});
        } else {
            for (var i = 0; i < $scope.selectedsubs.length; i++) {
              if ($scope.selectedsubs[i].code == item.code && $scope.selectedsubs[i].name == item.name) {
                  $scope.selectedsubs.splice(i, 1);
                  break;
              }
            }
        }
    }
    // 对每个checkbox判断初始状态
    $scope.hasCheckStatus = function(code) {
      var _stat = false;
      $scope.selectedsubs.forEach(function(o){
        if(o.code == code) {
          _stat = true;
        }
      });
      return _stat;
    }

    $scope.checkAll = function($event) {
        var ca = $event.target;
        $scope.selectedsubs = [];
        if (ca.checked) {
            for (var i = 0; i < $scope.prctypelist.length; i++) {
                $scope.selectedsubs.push({code: $scope.prctypelist[i].code, name: $scope.prctypelist[i].name});
            }
        }
    }
    // 获取销售小组
    $scope.get_salegroup = function(orgname) {
      // 获取销售小组
      var param = {orgname: orgname};
      var getbelongaddr = service.getbelongaddr(param);
      getbelongaddr.success(function(data){
          if(data.code == 200){
              $scope.saleArr = data.rst.data.group;
              clsaleArr = data.rst.data.group;
              $scope.orgcode = data.rst.data.orgcode;
          }else{
              swal(data.msg, "", "error");
          }
      });

    }

    $scope.addsaleData = function(){
        $( "#salebox" ).dialog({
            autoOpen: false,
            width: 650,
            height:380,
            modal: true
        });
        $( "#salebox" ).dialog( "open" );
    }
    $scope.closesale = function(){
        $( "#salebox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.confirmAddsale = function(orgcode, code, name){
        if(code == '' && name == '' && orgcode == ''){
            swal('请填写数据','','warning');return false;
        }else if(code == ''){
            swal('请填写小组编码', '', 'warning');return false;
        }else if(name == ''){
            swal('请填写小组名称', '', 'warning');return false;
        }else if(orgcode == ''){
            swal('请填写部门编码', '', 'warning');return false;
        }
        var saleObj = {};
        saleObj[code] = name;
        clsaleArr = $.extend(clsaleArr,saleObj);

        var param = {
                        salegroup: {
                            "VKBUR" : {"code" : orgcode, "value" : $scope.orgname},
                            "VKGRP" : {"code" : code, "value" : name}
                        }
                    };
        var setbelongaddr = service.setbelongaddr(param);
        setbelongaddr.success(function(data){
            if(data.code == 200){
                swal('添加成功','','success');
                $( "#salebox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }else{
                swal(data.msg,'','error');
            }
        });
    }
    $scope.addData = function(userData,orgname,orgid){
        var param = {},contact = {};
        contact.tel = $scope.tel;
        contact.email = $scope.email;
        contact.phone = $scope.phone;
        contact.fax = $scope.fax;
        param = userData;
        param.contact = contact;
        // 订阅配置
        param.subscribeprctypes = $scope.selectedsubs;
        param = $.extend(param,{orgname:orgname,orgid:orgid});
        var adduser = service.addUser(param);
        adduser.success(function(data){
            if(data.code == 200){
                swal('保存成功','','success');
            }else{
                swal(data.message,'','error');
            }
        });
    }
}]);
userApp.controller('onlineUsersCtrl', ['$scope', 'userServices', '$rootScope', '$timeout', function($scope, service, $rootScope, $timeout) {
    var vm = $scope;
    vm.online = true;

    var get_onlinecount = function() {
        // 获取在线统计
        service.olCountEmit(null);
        service.olCount(cb);
        function cb(data) {
            if (data.code === 200) {
                vm.allCount = data.rst.all;
                vm.onlineCount = data.rst.online;
                vm.offlineCount = data.rst.offline;
                vm.$apply();
            }
        }
    }
    get_onlinecount();

    // 在线用户列表
    vm.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var param = {
                page: vm.paginationConf.currentPage,
                limit: vm.paginationConf.itemsPerPage,
                online: vm.online
            };
            // 建立在线列表连接
            service.olUserListEmit(param);
            vm.paginationConf.pagePromise = {success: service.olUserList}
        }
    };

    vm.refresh = function() {
        vm.search();
        get_onlinecount();
    }

    vm.online_only = function() {
        vm.online = true;
        vm.search();
    }

    vm.all_users = function() {
        vm.online = "";
        vm.search();
    }
}]);
//编辑员工信息
userApp.controller('listEditViewCtrl',['$scope','$stateParams','userServices','officeEnum',function($scope,$stateParams,service, officeEnum){
    // office enum
    $scope.officeList = officeEnum;
    var viewUser = service.viewUser({_id:$stateParams.id});
    // 用于维护添加
    var clsaleArr = {};
    viewUser.success(function(data){
        if(data.code == 200){
            $scope.userData = data.rst.data;
            $scope.orgname = data.rst.data.orgname;
            $scope.orgid = data.rst.data.orgid;
            $scope.contact = data.rst.data.contact;

            // 获取销售小组
            $scope.get_salegroup($scope.orgname);
        }
    });

    $scope.get_salegroup = function(orgname) {
      // 获取销售小组
      var param = {orgname: orgname};
      var getbelongaddr = service.getbelongaddr(param);
      getbelongaddr.success(function(data){
          if(data.code == 200){
              $scope.saleArr = data.rst.data.group;
              clsaleArr = data.rst.data.group;
              $scope.orgcode = data.rst.data.orgcode;
          }else{
              swal(data.msg, "", "error");
          }
      });
    }

    $scope.getEmployee = function(id,name){
        var param = { _id: id, hasuser:true};
        $scope.orgname = name;
        $scope.orgid = id;
        // 更新销售小组
        $scope.get_salegroup($scope.orgname);
        var employeeList = service.listEmployee(param);
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                }

            }
        })
    };
    $scope.employee = function(){
        $( "#userbox" ).dialog({
            autoOpen: false,
            width: 300,
            height:480,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                }
            ]
        });
        $scope.getEmployee();
        $( "#userbox" ).dialog( "open" );

    }
    // 多选框
    $scope.selectedsubs = [];
    var param = {_id: $stateParams.id};
    var userprctype = service.userprctype(param);
    userprctype.success(function(data) {
        if (data.code == 200) {
            $scope.prctypelist = data.rst.data;
            $scope.prctypelist.forEach(function(o) {
              if (o.status) {
                  delete o.status;
                  $scope.selectedsubs.push(o)
              }
            });
        }
    });

    $scope.userprctype = function() {
      $('#prcbox').dialog({
          autoOpen: false,
          width: 400,
          height: 600,
          modal: true,
          buttons: [
              {
                  text: '确定',
                  class: "red_bg",
                  click: function() {
                      $( this ).dialog( "close" );
                      $(".layer").hide();
                  }
              }
            ]
      });
      $("#prcbox").dialog("open");
    }
    // 单个checkbox选中
    $scope.checkSelect = function($event, index, item) {
        var checkbox = $event.target;
        if (checkbox.checked) {
            $scope.selectedsubs.push({code: item.code, name: item.name});
        } else {
            for (var i = 0; i < $scope.selectedsubs.length; i++) {
              if ($scope.selectedsubs[i].code == item.code && $scope.selectedsubs[i].name == item.name) {
                  $scope.selectedsubs.splice(i, 1);
                  break;
              }
            }
        }
    }
    // 对每个checkbox判断初始状态
    $scope.hasCheckStatus = function(code) {
      var _stat = false;
      $scope.selectedsubs.forEach(function(o){
        if(o.code == code) {
          _stat = true;
        }
      });
      return _stat;
    }
    $scope.checkAll = function($event) {
        var ca = $event.target;
        $scope.selectedsubs = [];
        if (ca.checked) {
            for (var i = 0; i < $scope.prctypelist.length; i++) {
                $scope.selectedsubs.push({code: $scope.prctypelist[i].code, name: $scope.prctypelist[i].name});
            }
        }
    }
    $scope.addsaleData = function(){
        $( "#salebox1" ).dialog({
            autoOpen: false,
            width: 650,
            height:380,
            modal: true
        });
        $( "#salebox1" ).dialog( "open" );
    }
    $scope.closesale = function(){
        $( "#salebox1" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.confirmAddsale = function(orgcode, code, name){
        if(code == '' && name == '' && orgcode == ''){
            swal('请填写数据','','warning');return false;
        }else if(code == ''){
            swal('请填写小组编码', '', 'warning');return false;
        }else if(name == ''){
            swal('请填写小组名称', '', 'warning');return false;
        }else if(orgcode == ''){
            swal('请填写部门编码', '', 'warning');return false;
        }
        var saleObj = {};
        saleObj[code] = name;
        clsaleArr = $.extend(clsaleArr,saleObj);

        var param = {
                        salegroup: {
                            "VKBUR" : {"code" : orgcode, "value" : $scope.orgname},
                            "VKGRP" : {"code" : code, "value" : name}
                        }
                    };
        var setbelongaddr = service.setbelongaddr(param);
        setbelongaddr.success(function(data){
            if(data.code == 200){
                swal('添加成功','','success');
                $( "#salebox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }else{
                swal(data.msg,'','error');
            }
        });
    }
    $scope.addData = function(userData,contact,orgname,orgid){
        var param = {};
        param = userData;
        param.contact = contact;
        param.subscribeprctypes = $scope.selectedsubs;
        param = $.extend(param,{orgname:orgname,orgid:orgid});
        var adduser = service.editUser(param);
        adduser.success(function(data){
            if(data.code == 200){
                swal('保存成功','','success');
            }else{
                swal(data.message,'','error');
            }
        });
    }
}]);

//数据角色
userApp.controller('rolesPermissionsCtrl',['$scope','userServices',function($scope,service) {
    $scope.addList = [];
    $scope.smaddlist = [];
    $scope.smaddlist2 = [];
    $scope.editable = true;
    function readpowerjk(){
        var rolesList1  = service.rolesList();
        rolesList1.success(function(data){
            if(data.code == 200){
                $scope.dataList = data.rst.role;
            }
        });
    }
    readpowerjk();
    var vm = $scope;
    vm.viewline = function(list){
        $scope.list = list;    //获取子集data

        vm.readonly = [];
        for (var i = 0; i < vm.list.prevs.length; i++) {
            vm.readonly[i] = true;
        }

        $("#xzbox").dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        //处理 子集数据save
                        $scope.list.prevs = $scope.list.prevs.concat($scope.smaddlist);
                        var itemSave = service.rolesave({role:$scope.list});
                        itemSave.success(function(data){
                            swal('保存成功','','success');
                            $scope.smaddlist = [];
                            readpowerjk();
                        });

                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }

            }]
        });
        $("#xzbox").dialog("open");
    }
    vm.viewPrevs = function(list, idx){
        $scope.list = list;    //获取子集data
	    var obj = $("#xz2box");
	    $scope.paramsList = list.prevs[idx].params;
	    $scope.paramsObj = [];
	    vm.readonly2 = [];
	    console.log(idx,$scope.paramsList)
	    for (var i = 0; i < $scope.paramsList.length; i++) {
		    vm.readonly2[i] = true;
		    $scope.paramsObj.push({name: $scope.paramsList[i]});
	    }

        obj.dialog({
            autoOpen: false,
            width: 600,
            modal: true,
	        dialogClass: 'closeOne',
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
	                    obj.dialog("destroy");
	                    obj.closest(".ui-dialog").remove();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        //处理 子集数据save
	                    $scope.paramsObj = $scope.paramsObj.concat($scope.smaddlist2);
	                    for(var i=0,len=$scope.paramsObj.length; i<len; i++) {
		                    $scope.paramsList[i] = $scope.paramsObj[i].name;
	                    }
	                    $scope.list.prevs[idx].params = $scope.paramsList;
	                    
                        var itemSave = service.rolesave({role:$scope.list});
                        itemSave.success(function(data){
                            swal('保存成功','','success');
                            $scope.paramsList = [];
                            $scope.smaddlist2 = [];
                        });

	                    obj.dialog("destroy");
	                    obj.closest(".ui-dialog").remove();
                    }

            }]
        });
        obj.dialog("open");
    }


    vm.addItem = function(str){
        if(str == 'Parent'){
            var obj = {name:'', text:'', prevs:[]};
            $scope.addList.push(obj)
        }else if(str == 'subset'){
            var obj1 = {
                name :'',
                text :'',
                prevs:[{
                    name:'',
                    text:'',
                    params:[]
                }]
            }
            $scope.smaddlist.unshift(obj1)
        } else if(str == 'subPrevs') {
	        $scope.smaddlist2.unshift({name:''})
        }
    }

    vm.itemSave = function(list,idx,str){
        if(str == 'Parent'){
            for(var i = 0 ; i < vm.dataList.length; i++){
                if(list.name == vm.dataList[i].name){
                    swal('不能重复英文名称','','warning');
                    return false;
                }
            }

            var itemSave = service.rolesave({role:list});
            itemSave.success(function(data){
                swal('保存成功','','success');
                $scope.addList.splice(idx,1);
                readpowerjk();
            });
        }

    }

    vm.itemDel = function(id){
        var roleDelete = service.roleDelete({_id:id});
        roleDelete.success(function(data){
            swal('删除成功','','success');
            readpowerjk();
        });
    }
    //子集删除
    vm.subSave = function(idx,paramsList){
	    if(paramsList==undefined) {  // 修改prevs
		    $scope.list.prevs.splice(idx,1);
	    } else {    // 修改params
		    paramsList.splice(idx,1);
	    }
        var itemSave = service.rolesave({role:$scope.list});
        itemSave.success(function(data){
            swal('删除成功','','success');
	        if(paramsList==undefined) {
		        $("#xzbox").dialog("destroy");
		        readpowerjk();
	        }
        });
    }
	
	// 新增数组删除
	vm.delNewdata = function (idx,obj) {
		$scope[obj].splice(idx,1)
	}
    //修改
    vm.itemUpdata = function(list){
        vm.name = list.name;
        vm.text = list.text;
        vm.des = list.des;
        $("#changebox").dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        var upobj = {
                            des: vm.des,
                            name : vm.name,
                            text : vm.text,
                            _id :  list.id,
                            prevs : list.prevs
                        }
                        var roleupdate = service.rolesave({role:upobj});
                        roleupdate.success(function(data){
                            swal('修改成功','','success');
                            $( "#changebox" ).dialog("destroy");
                            readpowerjk();
                        });
                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }

                }]
        });
        $("#changebox").dialog("open");
    }

    vm.edit = function(index,type) {
	    var typeObj = type ? 'readonly'+type : 'readonly',
		    obj = vm[typeObj];
	    obj[index] = !obj[index];
        if (!obj[index]) {
            for (var i = 0; i < obj.length; i++) {
                if (index != i) {
                    obj[i] = true;
                }
            }
        }
    }
}]);
// 2017-3-10
//补全成本分析
userApp.controller('costAnalysis',['$scope','userServices',function($scope,service){
    // 查询 
    var salesitem = [];
    //var dataList = [];
    $scope.search = function(){
        var viewUser = service.getcontract({no:$scope.contractno});
        viewUser.success(function (data) {
            console.log(data);
            if(data.code == 200) {
                $scope.cbfxObj = data.rst.othercost;
                $scope.id = data.rst.id;
                $scope.cpIf = data.rst.contractbase.cp == '0';
                $scope.dataList = data.rst.salesitem;
                console.log($scope.dataList);
                // if(salesitem.length == 0){
                //     swal("未查询到清单物料", "", "warning");
                //     return true;
                // }
            } else{
                swal(data.msg,'','error');
            }
        })
    } 
    // 保存 
    $scope.addData = function () {
        var params={id:$scope.id, othercost:$scope.cbfxObj,salesitem:$scope.dataList};
        $scope.maoliHan = ($scope.cbfxObj[0].money*1+$scope.cbfxObj[1].money*1+$scope.cbfxObj[2].money*1)-($scope.cbfxObj[0].salerebate*1+$scope.cbfxObj[1].salerebate*1+$scope.cbfxObj[2].salerebate*1)-($scope.cbfxObj[0].orderscost*1+$scope.cbfxObj[1].orderscost*1+$scope.cbfxObj[2].orderscost*1)+($scope.cbfxObj[0].purchaserebate*1+$scope.cbfxObj[1].purchaserebate*1+$scope.cbfxObj[2].purchaserebate*1)-($scope.cbfxObj[0].outorderost*1+$scope.cbfxObj[1].outorderost*1+$scope.cbfxObj[2].outorderost*1)-($scope.cbfxObj[0].mating*1+$scope.cbfxObj[1].mating*1+$scope.cbfxObj[2].mating*1)-($scope.cbfxObj[0].third*1+$scope.cbfxObj[1].third*1+$scope.cbfxObj[2].third*1);
        $scope.maoliBHan =  ($scope.cbfxObj[0].money/1.17+$scope.cbfxObj[1].money/1.06+$scope.cbfxObj[2].money*1)-($scope.cbfxObj[0].salerebate/1.17+$scope.cbfxObj[1].salerebate/1.06+$scope.cbfxObj[2].salerebate*1)-($scope.cbfxObj[0].orderscost/1.17+$scope.cbfxObj[1].orderscost/1.06+$scope.cbfxObj[2].orderscost*1)+($scope.cbfxObj[0].purchaserebate/1.17+$scope.cbfxObj[1].purchaserebate/1.06+$scope.cbfxObj[2].purchaserebate*1)-($scope.cbfxObj[0].outorderost/1.17+$scope.cbfxObj[1].outorderost/1.06+$scope.cbfxObj[2].outorderost*1)-($scope.cbfxObj[0].mating/1.17+$scope.cbfxObj[1].mating/1.06+$scope.cbfxObj[2].mating*1)-($scope.cbfxObj[0].third/1.17+$scope.cbfxObj[1].third/1.06+$scope.cbfxObj[2].third*1);
        $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj[0].money/1.17 + $scope.cbfxObj[1].money/1.06+$scope.cbfxObj[2].money*1)-($scope.cbfxObj[0].salerebate/1.17+$scope.cbfxObj[1].salerebate/1.06+$scope.cbfxObj[2].salerebate*1)))*10000)/100;
        $scope.xMaoliHan = ($scope.cbfxObj[0].money*1+$scope.cbfxObj[1].money*1+$scope.cbfxObj[2].money*1) - ($scope.cbfxObj[0].orderscost*1+$scope.cbfxObj[1].orderscost*1+$scope.cbfxObj[2].orderscost*1) - ($scope.cbfxObj[0].cashrebate*1+$scope.cbfxObj[1].cashrebate*1+$scope.cbfxObj[2].cashrebate*1) - ($scope.cbfxObj[0].selfpickup*1+$scope.cbfxObj[1].selfpickup*1+$scope.cbfxObj[2].selfpickup*1) - ($scope.cbfxObj[0].outorderost*1+$scope.cbfxObj[1].outorderost*1+$scope.cbfxObj[2].outorderost*1) - ($scope.cbfxObj[0].other*1+$scope.cbfxObj[1].other*1+$scope.cbfxObj[2].other*1) - ($scope.cbfxObj[0].mating*1+$scope.cbfxObj[1].mating*1+$scope.cbfxObj[2].mating*1) - ($scope.cbfxObj[0].third*1+$scope.cbfxObj[1].third*1+$scope.cbfxObj[2].third*1);
        $scope.xMaoliBHan = ($scope.cbfxObj[0].money/1.17+$scope.cbfxObj[1].money/1.06+$scope.cbfxObj[2].money*1) - ($scope.cbfxObj[0].orderscost/1.17+$scope.cbfxObj[1].orderscost/1.06+$scope.cbfxObj[2].orderscost*1) - ($scope.cbfxObj[0].cashrebate/1.17+$scope.cbfxObj[1].cashrebate/1.06+$scope.cbfxObj[2].cashrebate*1) - ($scope.cbfxObj[0].selfpickup/1.17+$scope.cbfxObj[1].selfpickup/1.06+$scope.cbfxObj[2].selfpickup*1) - ($scope.cbfxObj[0].outorderost/1.17+$scope.cbfxObj[1].outorderost/1.06+$scope.cbfxObj[2].outorderost*1) - ($scope.cbfxObj[0].other/1.17+$scope.cbfxObj[1].other/1.06+$scope.cbfxObj[2].other*1) - ($scope.cbfxObj[0].mating/1.17+$scope.cbfxObj[1].mating/1.06+$scope.cbfxObj[2].mating*1) - ($scope.cbfxObj[0].third/1.17+$scope.cbfxObj[1].third/1.06+$scope.cbfxObj[2].third*1);
        $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj[0].money/1.17 + $scope.cbfxObj[1].money/1.06+$scope.cbfxObj[2].money*1))*10000)/100;

        // if($scope.ORDER_DATA.contractbase.contractmoney == 0){
        //     $scope.companygain = 0;
        //     $scope.salesgain = 0;
        // }
        params.interest = $scope.maoliBHan;//毛利率
        params.interestContainTax = $scope.maoliHan;//含税利率
        params.contractInterest = $scope.companygain;//合约利率
        params.sellinterest = $scope.xMaoliBHan;//销售毛利率
        params.sellinterestContainTax = $scope.xMaoliHan;//销售含税利率
        params.sellcontractInterest = $scope.salesgain;//销售合约利率

        var viewUser2 = service.saveothercost(params)
        viewUser2.success(function(data){
            if(data.code == 200){
                swal("保存成功", "", "success");
                // $scope.cbfxObj = data.rst.othercost;
            }else {
                swal(data.msg,'','error');
            }
        });
    }
}]);

// 人员角色
userApp.controller('userrolesCtrl', ['$scope', 'userServices', function($scope, service) {
    var vm = $scope;
    // 查询全部角色列表 by wangjingfeng
    var pr = service.rolesList();
    pr.success(function(data) {
        if (data.code === 200) {
            vm.all_roles = data.rst.role;
            // 数据权限参数格式化,
            if (vm.all_roles) {
                angular.forEach(vm.all_roles, function(oneRoleData,index,array){
                    __params = [];
                    if(oneRoleData.prevs){
                        angular.forEach(oneRoleData.prevs, function(data,index,array){
                            var _params = {};
                            if(data.name){
                                _params.text = data.text;
                                if(data.params){
                                    _params[data.name] = data.params;
                                }else{
                                    _params[data.name] = null;
                                }
                                __params.push(_params);
                            }
                        });
                    };
                    oneRoleData.newparams = __params;
                });
            };
        }else{
            swal(data.code, "", "error");
        }
    }).error(function(error) {
        swal(error, "", "error");
    });

    // 全量数据
    var data_all = null;

    // 当前人员角色数组
    vm.dataList = [];

    // 搜索功能
    vm.search = function() {
        var param = {name: vm.name};
        var listUser = service.listUser(param);
        listUser.success(function(data) {
            if (data.code === 200) {
                data_all = data;
                if (data.rst.data.items.length > 0) {
                    vm.curName = data.rst.data.items[0].name;
                    vm.curLogin = data.rst.data.items[0].login;
                    vm.dataList = data.rst.data.items[0].roles;
                    // for test
                    // vm.dataList[1].params[0].org = [];
                    // vm.dataList[1].params[0].org.push('111111', '2222222', '333333');
                    // vm.dataList[1].params[1].costcenter.push('111111', '2222222', '333333');
                    // 点击编辑
                    // 是否可编辑，标识数组
                    vm.readonly = [];
                    for (var i = 0; i < vm.dataList.length; i++) {
                        vm.readonly[i] = true;
                    }
                }
            }else {
                swal(data.msg, "", "error");
            }
        });
    }

    // 点击param显示详情
    vm.param_detail = function(key, value, listLevelIndex, paramLevelIndex) {
        if (listLevelIndex === 'new') {
            vm.paramCNDes = vm.newRoleData.params[paramLevelIndex].text;
        }else{
            vm.paramCNDes = vm.dataList[listLevelIndex].params[paramLevelIndex].text;
        }
        // 参数paramson列表
        // input ng-model绑定为数组元素时，每次输入都会导致失焦
        var ps_li_temp = value;
        if (!(ps_li_temp instanceof Array) && key === 'org') {
            ps_li_temp = [value];
        }
        vm.paramson_list = [];
        for (var i = 0; i < ps_li_temp.length; i++) {
            var obj = {paramson: ps_li_temp[i]};
            vm.paramson_list.push(obj);
        }
        // 可否编辑,维护数组
        vm.readonly_paramson = [];
        for (var i = 0; i < vm.paramson_list.length; i++) {
            vm.readonly_paramson[i] = true;
        }
        // 触发弹出框
        $( "#param_detail" ).dialog({
            title: key + "参数配置",
            draggable: false,
            resizable: false,
            autoOpen: false,
            width: 300,
            height:480,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    // 参数paramson修改确认
                    click: function() {
                        var _temp;
                        // org字段，单个值为string，多个值为array
                        if (vm.paramson_list.length <= 1 && key === 'org') {
                            _temp = vm.paramson_list[0].paramson;
                        }else{
                            _temp = [];
                            var length = vm.paramson_list.length;
                            for (var i = 0; i < length; i++) {
                                _temp.push(vm.paramson_list[i].paramson);
                            }
                        }
                        vm.dataList[listLevelIndex].params[paramLevelIndex][key] = _temp;
                        vm.dataList[listLevelIndex].params[paramLevelIndex]['text'] = vm.paramCNDes;
                        vm.$apply();
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#param_detail" ).dialog( "open" );
    }

    // 新增参数名维护model
    vm.param_new = [];

    // 增加param结构
    vm.paramAdd = function(index) {

        // 空输入检测
        if (vm.param_new[index] === undefined) {
            return;
        }
        // param null检测
        if (vm.dataList[index].params === null) {
            vm.dataList[index].params = [];
        }
        if(vm.dataList[index].params.length === 1 && vm.dataList[index].params[0] === null){
            vm.dataList[index].params = [];
        }
        // 中英文分隔
        var _newArr = vm.param_new[index].split(",");
        // 重复检测
        var _dulp = false;
        var length = vm.dataList[index].params.length;
        for(var i = 0; i < length; i++) {
            if (_newArr[0] in vm.dataList[index].params[i]) {
                console.log("参数值重复！");
                return;
            }
        }
        var key = _newArr[0];
        var obj = {};
        obj[key] = [];
        obj['text'] = _newArr[1];
        vm.dataList[index].params.push(obj);
        vm.param_new[index] = undefined;
    }
    vm.paramDelete = function(index, key) {
        var length = vm.dataList[index].params.length;
        for (var i = 0; i < length; i++) {
            if (key in vm.dataList[index].params[i]) {
                vm.dataList[index].params.splice(i, 1);
                break;
            }
        }
    }

    // 新增时 select model绑定此变量
    vm.newRoleData = {data: null, newParam: '', params: [], extra: []};
    var clearNewRoleData = function() {
        vm.newRoleData = {data: null, newParam: '', params: [], extra: []};
    }
    // 控制显示新增 角色 行
    vm.newRole = function() {
        if (vm.curName) {
            vm.roleAdding = true;
        }
    }

    vm.newRoleCancel = function() {
        vm.roleAdding = false;
        clearNewRoleData();
    }
    // 选择角色
    vm.selectChange = function() {
        // 重复检测
        var length = vm.dataList.length;
        for (var i = 0; i < length; i++) {
            if (vm.newRoleData.data.name === vm.dataList[i].name) {
                swal("角色不可重复", "", "error");
                clearNewRoleData();
                break;
            }
        }
    }
    vm.newRoleParamAdd = function() {
        // 空检测
        if (!vm.newRoleData.newParam) {
            return;
        }
        // 中英文分隔
        var _newArr = vm.newRoleData.newParam.split(",");
        // 重复检测
        var _dulp = false;
        var length = vm.newRoleData.params.length;
        for (var i = 0; i < length; i++) {
            if (_newArr[0] in vm.newRoleData.params[i]) {
                _dulp = true;
            }
        }
        if (!_dulp) {
            var newParam_temp = {};
            newParam_temp[_newArr[0]] = [];
            newParam_temp['text'] = _newArr[1];
            vm.newRoleData.params.push(newParam_temp);
            vm.newRoleData.newParam = '';
        }
    }
    vm.newRoleParamDelete = function(key) {
        var length = vm.newRoleData.params.length;
        for (var i = 0; i < length; i++) {
            if (key in vm.newRoleData.params[i]) {
                vm.newRoleData.params.splice(i, 1);
                break;
            }
        }
    }
    // 保存选择的角色
    vm.newRoleSave = function() {
        // 空检测
        if (vm.newRoleData.data) {
            // 数据处理
            var pa = {
                login: data_all.rst.data.items[0].login,
                userrole: {
                    name: vm.newRoleData.data.name,
                    params: vm.newRoleData.data.newparams,
                    extra: vm.newRoleData.extra,
                    text: vm.newRoleData.data.text
                }
            };
            var pr = service.pr_newrole(pa);
            pr.success(function(data) {
                if (data.code === 200) {
                    clearNewRoleData();
                    // 数据源更新
                    vm.search(vm.name);
                    swal("新增成功", "", "success");
                }else{
                    swal(data.msg, "", "error");
                }
            }).error(function(error) {
                swal(error, "", "error");
            });
        }else{
            swal("请选择角色", "", "error");
        }
    }
    // 保存按钮
    vm.roleUpdate = function(index) {
        // 参数拼接
        var pa = {login: data_all.rst.data.items[0].login, userrole: vm.dataList[index]};
        // if (vm.dataList[index].type && vm.dataList[index].type === "new") {
        //     delete pa.userrole.type;
        //     var pr = service.pr_newrole(pa);
        // }else{
        var pr = service.updaterole(pa);
        // }
        pr.success(function(data) {
            if (data.code === 200) {
                swal("保存成功", "", "success");
            }else{
                swal(data.msg, "", "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }
    // 角色删除
    vm.pr_roleDelete = function(index) {
        var pa = {login: data_all.rst.data.items[0].login, userrolename: vm.dataList[index].name};
        var pr = service.pr_roleDelete(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                vm.dataList.splice(index, 1);
                vm.readonly.splice(index, 1);
                swal("删除成功", "", "success");
            }else{
                swal("删除失败", data.msg, "error");
            }
        }).error(function(error) {
            swal(data.msg, "", "error");
        });
    }
    // 参数删除
    vm.param_delete = function(index) {
        vm.paramson_list.splice(index, 1);
        vm.readonly_paramson.splice(index, 1);
    }

    // 增加参数子项
    vm.newParamson = function() {
        vm.paramson_list.unshift({paramson: ""});
        vm.readonly_paramson.unshift(true);
    }

    // 修改按钮
    vm.edit = function(type, index) {
        if (type === 'role') {
            vm.readonly[index] = !vm.readonly[index];
            if (!vm.readonly[index]) {
                for (var i = 0; i < vm.readonly.length; i++) {
                    if (index != i) {
                        vm.readonly[i] = true;
                    }
                }
            }
        }else if(type === 'paramson') {
            vm.readonly_paramson[index] = !vm.readonly_paramson[index];
            if (!vm.readonly_paramson[index]) {
                for (var i = 0; i < vm.readonly_paramson.length; i++) {
                    if (index != i) {
                        vm.readonly_paramson[i] = true;
                    }
                }
            }
        }else{
            console.log('type错误');
            return;
        }
    }
}]);

// 单据权限管理
userApp.controller('docAuthCtrl', ['$scope', 'userServices', function($scope, service) {
    vm = $scope;
    // 新增doc 基本数据
    vm.newDocKey = {ename: ""};
    vm.newDocValue = {datasrc: '', desc: '', roles: {}};
    // 新增单据基本数据
    vm.newDocData = {data: null};
    var clearNewDoc = function() {
        vm.newDocKey = {ename: ""};
        vm.newDocValue = {datasrc: '', desc: '', roles: {}};
        vm.newDocData = {data: null};
    };
    // 现有角色总表
    var roleList = service.rolesList();
    roleList.success(function(data) {
        if (data.code === 200) {
            vm.all_roles = data.rst.role;
        }else{
            swal(data.code, "", "error");
        }
    }).error(function(error) {
        swal(error, "", "error");
    });

    // 现有单据列表
    var da_list = service.da_list();
    da_list.success(function(data) {
        if (data.code === 200) {
            vm.dataList = data.rst.data;
            vm.doclenth = Object.getOwnPropertyNames(vm.dataList).length;
        }else{
            swal(data.msg, "", "error");
        }
    }).error(function(error) {
        swal(error, "", "error");
    });

    // 单据类型总表
    var enum_doclist = service.enum_doclist();
    enum_doclist.success(function(data) {
        if (data.code === 200) {
            // array
            vm.all_docTypes = data.rst.data;
        }else{
            swal("获取单据类型列表失败", "", "error");
        }
    }).error(function(error) {
        swal(error, "", "error");
    });
    // 新增单据
    vm.newDoc = function() {
        // UI显示
        vm.docAdding = true;
    }
    vm.newDocSave = function() {
        // 重复英文名称检测
        if (vm.newDocKey.ename in vm.dataList) {
            swal("英文名称不能重复", "", "warning");
            return;
        }
        var pa = {key: vm.newDocKey.ename, value: vm.newDocValue};
        var pr = service.da_add(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                vm.docAdding = false;
                vm.dataList[vm.newDocKey.ename] = vm.newDocValue;
                clearNewDoc();
                swal("新增成功", "", "success");
            }else{
                swal(data.msg, "", "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }
    vm.newDocCancel = function() {
        vm.docAdding = false;
        // 取消新增的数据
        clearNewDoc();
    }
    vm.newDocSelected = function() {
        vm.newDocKey.ename = vm.newDocData.data.name;
        vm.newDocValue.desc = vm.newDocData.data.desc;
        vm.newDocValue.datasrc = vm.newDocData.data.datasrc;
    }

    // 单条保存
    vm.docSave = function(docKey) {
        var pa = {key: docKey, value: vm.dataList[docKey]};
        var pr = service.da_update(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                swal("保存成功", "", "success");
            }else{
                swal(data.msg, "", "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }
    // 删除
    vm.docDelete = function(docKey) {
        var pa = {key: docKey};
        var pr = service.da_delete(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                delete vm.dataList[docKey];
                swal("删除成功", "", "success");
            }else{
                swal("删除失败", data.msg, "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }

    // select新增角色
    vm.newRoleChange = function(type, newRole, docKey) {
        if (newRole) {
            // 重复检测
            var datasource = type === 'new' ? vm.newDocValue.roles : vm.dataList[docKey].roles;
            if (!(newRole.name in datasource)) {
                if (type === 'new') {
                    datasource[newRole.name] = {ops: "*", params: {}, lmts: []};
                }else{
                    datasource[newRole.name] = {ops: "*", params: {}, lmts: []};
                }
                if (newRole.name === 'emp') {
                    datasource[newRole.name].default = 1;
                }
            }
        }
        // 恢复选中首项状态
        var select = document.getElementById("new_role");
        var new_doc_select = document.getElementById("new_docrole_select");
        if (select) {
            select.options[0].selected = true;
        }
        if (new_doc_select) {
            new_doc_select.options[0].selected = true;
        }
    }
    // select新lmt
    vm.newLmtSelected = function() {
        if (!(vm.currentRole.lmts)) {
            vm.currentRole.lmts = [];
        }
        // 重复检测
        var _dulp = false;
        var length = vm.currentRole.lmts.length;
        while(length--) {
            if (vm.currentRole.lmts[length].name === vm.newLmt.name) {
                _dulp = true;
            }
        }
        if (!_dulp && vm.newLmt.name) {
            vm.currentRole.lmts.push(vm.newLmt);
            vm.newLmt = null;
        }
    }
    // selectops
    vm.newOpsChange = function(newOps) {
        // 重复检测
        var _dulp = false;
        var length = vm.currentRole.ops.length;
        for (var i = 0; i < length; i++) {
            if (vm.currentRole.ops[i] === newOps.name) {
                _dulp = true;
            }
        }
        if (newOps && !_dulp) {
            vm.currentRole.ops.push(newOps.name);
        }
    }
    // param新增
    vm.paramAdd = function(newParamName) {
        if (!(vm.currentRole.params)) {
            vm.currentRole.params = {};
        }
        // newParamName不为空且不重复
        if (newParamName && !(newParamName in vm.currentRole.params)) {
            vm.currentRole.params[newParamName] = [];
            vm.newParamName = "";
        }
    }

    // lmt 新增
    vm.lmtAdd = function(newLmtName) {
        if (!(vm.currentRole.lmts)) {
            vm.currentRole.lmts = [];
        }
        // 重复检测
        var _dulp = false;
        var length = vm.currentRole.lmts.length;
        while(length--) {
            if (vm.currentRole.lmts[length].name === newLmtName) {
                _dulp = true;
            }
        }
        if (!_dulp && newLmtName) {
            vm.currentRole.lmts.push({name: newLmtName, type: '', args: []});
            vm.newLmtName = "";
        }
    }

    // 角色详情弹窗
    vm.roleDetail = function(type, docKey, docDesc, roleName, roleValue) {
        vm.newLmt = null;
        vm.lmtsList = null;
        var _tempDocKey = type === 'new' ? docKey.ename : docKey;
        var length = vm.all_docTypes.length;
        for (var i = 0; i < length; i++) {
            if (vm.all_docTypes[i].name === _tempDocKey) {
                vm.lmtsList = vm.all_docTypes[i].lmts;
            }
        }
        vm.newParamName = null;
        // // 查询单据对应的ops总表
        // var pa = {name: docKey};
        // var pr = service.enum_doclist(pa);
        // pr.success(function(data) {
        //     if (data.code === 200) {
        //         // ops array for current doc type
        //         vm.all_ops = data.rst.data && data.rst.data.ops ? data.rst.data.ops : [];
        //     }else{
        //         swal(data.msg, "", "error");
        //     }
        // }).error(function(error) {
        //     swal(error, "", "error");
        // });
        // 触发弹出框
        vm.currentRole = angular.copy(roleValue);
        $( "#role_detail" ).dialog({
            title: docDesc + ">>" + roleName + "配置",
            draggable: false,
            resizable: false,
            autoOpen: false,
            width: 800,
            // height:480,
            modal: true,
            position:{at: "center center"},
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        // 保存更改的数据到数据源中
                        if (type === 'new') {
                            vm.newDocValue.roles[roleName] = vm.currentRole;
                            vm.$apply();
                        }else{
                            vm.dataList[docKey].roles[roleName] = vm.currentRole;
                            vm.$apply();
                        }
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#role_detail" ).dialog( "open" );
    }
    // paramgra详情
    vm.paramgraDetail = function(paramsonKey, paramsonValue) {
        vm.newParamgra_model = {name: null};
        vm.paramgraList = angular.copy(paramsonValue);
        // 如果paramson 为空，统一转为空数组
        if (!vm.paramgraList) {
            vm.paramgraList = [];
        }
        // 触发弹出框
        $( "#paramgra_detail" ).dialog({
            title: "params >> " + paramsonKey + "参数配置",
            resizable: false,
            autoOpen: false,
            width: 300,
            height: 480,
            closeOnEscape: false,
            dialogClass: "noCloseBtn",
            modal: true,
            position:{at: "center center"},
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "gray_bg",
                    click: function() {
                        // 如果参数数组为空，恢复为null
                        if (vm.paramgraList.length === 0) {
                            vm.paramgraList = null;
                        }
                        vm.currentRole.params[paramsonKey] = vm.paramgraList
                        vm.$apply();
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#paramgra_detail" ).dialog( "open" );
    }
    //lmt详情
    vm.lmtDetail = function(lmt, index) {
        vm.lmtData = angular.copy(lmt);
        // vm.lmtData.type = 'conf';
        // args: array -> string
        var argsString = "";
        if (vm.lmtData.args && vm.lmtData.args.length > 0) {
            var length = vm.lmtData.args.length;
            for (var i = 0; i < length - 1; i++) {
                argsString = argsString + vm.lmtData.args[i] + ",";
            }
            vm.lmtData.args = argsString+vm.lmtData.args[vm.lmtData.args.length-1];
        }else if(vm.lmtData.args && vm.lmtData.args.length === 0) {
            vm.lmtData.args = "";
        }

        // 触发弹出框
        $( "#lmt_detail" ).dialog({
            title: "lmts >> " + lmt.name + "限制配置",
            resizable: false,
            autoOpen: false,
            width: 500,
            height: 300,
            closeOnEscape: false,
            dialogClass: "noCloseBtn",
            modal: true,
            position:{at: "center center"},
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "gray_bg",
                    click: function() {
                        // 按type类型重组lmtData
                        if (vm.lmtData.type === 'conf') {
                            delete vm.lmtData.args;
                        }else{
                            // args string->array
                            // 字符串分隔, 去空格, 去无效逗号
                            vm.lmtData.args = vm.lmtData.args.replace(/\s+/g, "");
                            var arr_temp = vm.lmtData.args.split(",");
                            vm.lmtData.args = [];
                            var length = arr_temp.length;
                            for (var i = 0; i < length; i++) {
                                if (arr_temp[i].length > 0) {
                                    vm.lmtData.args.push(arr_temp[i]);
                                }
                            }
                            delete vm.lmtData.fld;
                            delete vm.lmtData.op;
                            delete vm.lmtData.vp;
                        }
                        vm.currentRole.lmts[index] = vm.lmtData;
                        vm.$apply();
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#lmt_detail" ).dialog( "open" );
    }
    // 删除角色
    vm.roleDelete = function(type, docKey, roleName) {
        // 新增行删除角色
        if (type === 'new') {
            delete vm.newDocValue.roles[roleName];
        }else{
            delete vm.dataList[docKey].roles[roleName];
        }
    }
    // 角色ops删除
    vm.opsDelete = function(index) {
        vm.newOps = null;
        vm.currentRole.ops.splice(index, 1);
    }
    // 角色paramson删除
    vm.paramsonDelete = function(paramsonKey) {
        delete vm.currentRole.params[paramsonKey];
    }
    // 角色lmt删除
    vm.lmtDelete = function(index) {
        vm.currentRole.lmts.splice(index, 1);
    }

    // paramgra
    vm.paramgraDelete = function(index) {
        vm.paramgraList.splice(index, 1);
    }
    vm.newParamgra = function() {
        if (vm.newParamgra_model.name) {
            // 重复检测
            for (var i = 0; i < vm.paramgraList.length; i++) {
                if (vm.newParamgra_model.name == vm.paramgraList[i]) {
                    vm.newParamgra_model.name = null;
                    return;
                }
            }
            vm.paramgraList.unshift(vm.newParamgra_model.name);
            vm.newParamgra_model.name = null;
        }
    }
}]);

userApp.controller('docTypeCtrl',['$scope','userServices',function($scope,service){
    var vm = $scope;
    function doctypecb(){
        var enum_doclist = service.enum_doclist();
        enum_doclist.success(function(data){
            if (data.code === 200) {
                vm.dataList = data.rst.data;
                vm.readonly_array = [];
                var length = vm.dataList.length;
                for (var i = 0; i < length; i++) {
                    vm.readonly_array[i] = true;
                }
            }else{
                swal("列表获取失败", "", "error");
            }
        });
    }
    doctypecb();
    // new doc
    vm.newDoc = {name: '', desc: '', datasrc: '', lmts: []};
    vm.newLmt = {name: ''};
    vm.newDocAdd = function() {
        vm.docAdding = true;
    }
    vm.newDocCancel = function() {
        vm.docAdding = false;
    }
    vm.newDocSave = function() {
        var pa = {doc: vm.newDoc};
        var pr = service.enum_docAdd(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                // var deepCopyData = angular.copy(newDoc);
                vm.dataList.unshift(vm.newDoc);
                vm.docAdding = false;
                vm.newDoc = {name: '', desc: '', datasrc: '', lmts: []};
                vm.readonly_array.unshift(true);
                swal("新增成功", "", "success");
            }else{
                swal(data.msg, "", "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }
    vm.save = function(index) {
        var pa = {doc: vm.dataList[index]};
        // for test
        // pa.doc.lmts = [
        //     {name: "test1", type: "afun", args: ["args1", "args2", "args3"], text: "测试1"},
        //     {name: "test2", type: "afun", args: ["args1", "args2", "args3"], text: "测试2"}
        // ];
        var pr = service.enum_docUpdate(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                vm.editToggle(index);
                swal("保存成功", "", "success");
            }else{
                swal(data.msg, "", "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }
    vm.delete = function(index) {
        var pa = {doc: vm.dataList[index]};
        var pr = service.enum_docDelete(pa);
        pr.success(function(data) {
            if (data.code === 200) {
                vm.dataList.splice(index, 1);
                swal("删除成功", "", "success");
            }else{
                swal(data.msg, "", "error");
            }
        }).error(function(error) {
            swal(error, "", "error");
        });
    }
    vm.editToggle = function(index) {
        vm.readonly_array[index] = !vm.readonly_array[index];
        if (!vm.readonly_array[index]) {
            var length = vm.readonly_array.length;
            for (var i = 0; i < length; i++) {
                if (i !== index) {
                    vm.readonly_array[i] = true;
                }
            }
        }
    }

    vm.lmtDetail = function(type, lmt, index, dataListIndex) {
        var _dataSource = type === 'new' ? vm.newDoc : vm.dataList[dataListIndex];
        vm.lmtData = angular.copy(lmt);
        // vm.lmtData.type = 'conf';
        // args: array -> string
        var argsString = "";
        if (vm.lmtData.args && vm.lmtData.args.length > 0) {
            var length = vm.lmtData.args.length;
            for (var i = 0; i < length - 1; i++) {
                argsString = argsString + vm.lmtData.args[i] + ",";
            }
            vm.lmtData.args = argsString+vm.lmtData.args[vm.lmtData.args.length-1];
        }else if(vm.lmtData.args && vm.lmtData.args.length === 0) {
            vm.lmtData.args = "";
        }

        // 触发弹出框
        $( "#lmt_detail" ).dialog({
            title: "lmts >> " + lmt.name + "限制配置",
            resizable: false,
            autoOpen: false,
            width: 500,
            height: 300,
            closeOnEscape: false,
            dialogClass: "noCloseBtn",
            modal: true,
            position:{at: "center center"},
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "gray_bg",
                    click: function() {
                        // 按type类型重组lmtData
                        if (vm.lmtData.type === 'conf') {
                            delete vm.lmtData.args;
                        }else{
                            // args string->array
                            // 字符串分隔, 去空格, 去无效逗号
                            vm.lmtData.args = vm.lmtData.args.replace(/\s+/g, "");
                            var arr_temp = vm.lmtData.args.split(",");
                            vm.lmtData.args = [];
                            var length = arr_temp.length;
                            for (var i = 0; i < length; i++) {
                                if (arr_temp[i].length > 0) {
                                    vm.lmtData.args.push(arr_temp[i]);
                                }
                            }
                            delete vm.lmtData.fld;
                            delete vm.lmtData.op;
                            delete vm.lmtData.vp;
                        }
                        _dataSource.lmts[index] = vm.lmtData;
                        vm.$apply();
                        $(this).dialog("close");
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#lmt_detail" ).dialog( "open" );
    }
    vm.lmtAdd = function(type, name, index) {

        //
        var _dataSource = type === 'new' ? vm.newDoc : vm.dataList[index];
        if (!(_dataSource.lmts)) {
            _dataSource.lmts = [];
        }
        // 重复检测
        var _dulp = false, length = _dataSource.lmts.length;
        while(length--) {
            if (_dataSource.lmts[length].name === name) {
                _dulp = true;
            }
        }
        if (!_dulp && name) {
            _dataSource.lmts.push({name: name, type: '', args: []});
            vm.newLmt.name = "";
        }
    }

    vm.lmtDelete = function(type, index, dataListIndex) {
        var _dataSource = type === 'new' ? vm.newDoc : vm.dataList[dataListIndex];
        _dataSource.lmts.splice(index, 1);
    }

    // req.itemsave = function(li){
    //     var enum_docAdd = service.enum_docAdd({doc:{'name':li.name,'desc':li.desc,'datasrc':li.datasrc}});
    //     enum_docAdd.success(function(data){
    //         if(data.code == 200){
    //             swal('保存成功','','success');
    //             doctypecb();
    //             $( "#docbox" ).dialog("destroy");
    //         }else{
    //             swal(data.msg,'','warning');
    //         }
    //
    //     });
    // }

    // req.itemChangeView = function(val){
    //     console.log(val);
    //     req.changelist = val;
    //     $( "#chbox" ).dialog({
    //         autoOpen: false,
    //         width: 700,
    //         modal: true
    //     });
    //     $( "#chbox" ).dialog( "open" );
    // }

    // req.itemChangeSave = function(li){
    //     var enum_docAdd = service.enum_docUpdate({doc:{'name':li.name,'desc':li.desc,'datasrc':li.datasrc}});
    //     enum_docAdd.success(function(data){
    //         swal('修改成功','','success');
    //         doctypecb();
    //         $( "#chbox" ).dialog("destroy");
    //     });
    // }
    //
    // req.itemDelete = function(val){
    //     var enum_docDelete = service.enum_docDelete({doc:{'name':val.name,'desc':val.desc,'datasrc':val.datasrc}});
    //     enum_docDelete.success(function(data){
    //         if(data.code == 200){
    //             swal('删除成功','','success');
    //             doctypecb();
    //         }else{
    //             swal(data.msg,'','error');
    //         }
    //     });
    // }
}]);

userApp.controller('docOpsCtrl', ['$scope', 'userServices', function($scope, service) {
    vm = $scope;
    // 请求单据列表
    var pr = service.enum_doclist();
    pr.success(function(data) {
        if (data.code === 200) {
            vm.dataList = data.rst.data
        }else{
            swal(data.code, "", "error");
        }
    }).error(function(error) {
        swal(error, "", "error");
    });

    // 显示单据的规则
    vm.viewOps = function(index) {
        vm.doc_ops = angular.copy(vm.dataList[index].ops);
        // 弹窗
        // 触发弹出框
        $( "#ops_detail" ).dialog({
            title: '规则配置',
            draggable: false,
            resizable: false,
            autoOpen: false,
            width: 800,
            // height:480,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        vm.adding = false;
                        vm.newOps = {name: null, text: null, describe: null};
                        $( this ).dialog( "close" );
                        $(".layer").remove();
                    }
                },
                {
                    text: "保存",
                    class: "red_bg",
                    click: function() {
                        vm.dataList[index].ops = vm.doc_ops;
                        var pa = {doc: vm.dataList[index]};
                        var pr = service.do_update(pa);
                        pr.success(function(data) {
                            if (data.code === 200) {
                                swal("保存成功", "", "success");
                            }else{
                                swal(data.msg, "保存失败", "error");
                            }
                        }).error(function(error) {
                            swal(error, "", "error");
                        });

                        $("#ops_detail").dialog( "close" );
                        $(".layer").remove();
                    }
                }
            ]
        });
        $( "#ops_detail" ).dialog( "open" );
    }
    vm.ops_delete = function(index) {
        vm.doc_ops.splice(index, 1);
    }
    vm.new_ops = function(index) {
        vm.newOps = {name: null, text: null, describe: null};
        vm.adding = true;
    }
    vm.newOpsConfirm = function() {
        vm.adding = false;
        vm.doc_ops.push(vm.newOps);
    }
    vm.newOpsCancel = function() {
        vm.adding = false;
        vm.newOps = {name: null, text: null, describe: null};
    }
}]);
userApp.controller('PositionSetCtrl', ['$scope', 'userServices', function($scope, service) {
    var vm = $scope;
    vm.costcenter_list = null;
    vm.productline_list = null;

    var configGenerator = function(tab) {
        switch (tab) {
            case 1:
                vm.page_config = {staff_title: '产品线负责人', dept_title: '产品线'};
                // 产品线list
                if (!vm.productline_list) {
                    var poset_productline = service.poset_productline();
                    poset_productline.success(function(data) {
                        if (data.code === 200) {
                            vm.productline_list = data.rst.data;
                        }
                    }).error(function(error) {
                        console.log(error);
                    });
                }
                break;
            case 2:
                vm.page_config = {staff_title: '成本中心负责人', extra_title:'成本中心编码',dept_title: '成本中心'};
                // 成本中心list
                if (!vm.costcenter_list) {
                    var enumlist = service.enumlist({enums:['costcenter']});
                    enumlist.success(function(data){
                        vm.costcenter_list = data.data.costcenter;
                    }).error(function(error) {
                        console.log(error);
                    });
                }
                break;
            case 3:
                vm.page_config = {staff_title: '风控人员', dept_title: '部门'};
                break;
            case 4:
                vm.page_config = {staff_title: '法务人员', dept_title: '部门'};
                break;
            default:
                vm.page_config = {staff_title: '', dept_title: ''};
        }
    }
    vm.dataClear = function() {
        vm.query_data = {name: '', extra: ''};
        vm.dataList = null;
    }
    // tab
    vm.htTab = function (type) {
        vm.activeTab = type;
        configGenerator(type);
        vm.dataClear()
    }// 分页
    vm.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {limit: this.itemsPerPage, page: this.currentPage, tag: vm.page_config.staff_title, name: vm.query_data.name, extra: vm.query_data.extra};
            var listpromise = service.poset_list(param);
            listpromise.success(function(data) {
                if (param.tag === '产品线负责人') {
                    var arr = data.rst.data.items, items_length = data.rst.data.items.length;
                    for (var i = 0; i < items_length; i++) {
                        if (!arr[i].hasOwnProperty('extra')) {
                            arr[i]['extra'] = [];
                            continue;
                        }
                        var extra_length = arr[i].extra.length, temp_extra = [];
                        for (var j = 0; j < extra_length; j++) {
                            var _in = false;
                            var tempObj = {code: null, name: null};
                            for (var k in vm.productline_list) {
                                if (arr[i].extra[j] === k) {
                                    _in = true;
                                    tempObj.code = k, tempObj.name = vm.productline_list[k], tempObj.selected = true;
                                }
                            }
                            if (_in) {
                                temp_extra.push(tempObj);
                            }
                        }
                        arr[i].extra = temp_extra;
                    }
                }
            });
            this.pagePromise = listpromise;
        }
    };
    vm.activeTab = 1;
    vm.query_data = {name: '', extra: ''};
    configGenerator(vm.activeTab);

    vm.employee = function(){
        $("#orgbox").dialog({
            autoOpen: false,
            width: 300,
            height:480,
            resizable: false,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        vm.getEmployee();
        $("#orgbox").dialog( "open" );
    }
    vm.getEmployee = function(id, name){
        var param = { _id: id, hasuser:true};
        vm.query_data.extra = name;
        var employeeList = service.listEmployee(param);
        employeeList.success(function(data){
            if(data.code == 200){
                if(data.rst.data.belongs.orgs != 0){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                }
            }
        });
    }


    // 成本中心树形选择
    vm.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    vm.multiTreeOptions = {
        nodeChildren: "sub",
        dirSelectable: false,
        multiSelection: true
    }
    // vm.treeexpandedNodes = [{"code":"910Z","parent":"1000","text":"中建材信息香港公司成本中心组","sub":[{"code":"9100Z00000","parent":"910Z","text":"中建材信息香港公司公共成本中心","sub":null,"$$hashKey":"object:291"},{"code":"9100Z00001","parent":"910Z","text":"中建材信息香港公司折旧成本中心","sub":null,"$$hashKey":"object:292"}],"$$hashKey":"object:260"}];
    // vm.alterTreeexpandedNodes = [{"code":"9101A","parent":"9101","text":"运营平台","sub":[{"code":"9101A00001","parent":"9101A","text":"运营平台成本中心","$$hashKey":"object:503"}],"$$hashKey":"object:480"}];
    vm.alterTreeexpandedNodes = [];
    vm.alterSelectedNodes = [];
    vm.selCostcenterFn = function () {
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 350,
            modal: true
        });
        $("#costCenterDialog").dialog("open");
        vm.groupsTreeModel = vm.costcenter_list;
        vm.showSelected = function (sel) {
            vm.selectedNode = sel;
        };
        vm.selectTypeFn = function () {
            var val = vm.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
            vm.query_data.extra = val.code;


            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    }
    vm.costcenter_clear = function() {
      vm.dataClear();
    }


    // 变更
    vm.alter = function(item) {
        // 防止影响item
        var tempItem = angular.copy(item);
        vm.alter_data = {manInCharge: {name: tempItem.name, _id: tempItem._id}, extra: tempItem.extra};

        // 未分配产品线
        if (vm.page_config.staff_title === '产品线负责人') {
            var poset_unallocated_productline = service.poset_unallocated_productline();
            poset_unallocated_productline.success(function(data) {
                if (data.code === 200) {
                    var tempArr = [];
                    for (var key in data.rst.data) {
                        var obj = {code: key, name: data.rst.data[key], selected: false};
                        vm.alter_data.extra.push(obj);
                    }
                }
            });
        } else if (vm.page_config.staff_title === '成本中心负责人') {
            // 清空数据
            vm.alterTreeexpandedNodes = [];
            vm.alterSelectedNodes = [];
            vm.alterGroupsTreeModel = [];

            var param = {costcenter: item.extra};
            var poset_unallocated_costcenter = service.poset_unallocated_costcenter(param);
            poset_unallocated_costcenter.success(function(data) {
                if (data.code === 200) {
                    vm.alterGroupsTreeModel = data.rst.data;
                    var model = {code: 'root', sub: data.rst.data};
                    var route = [], result = [];
                    function deepSearch(node) {
                        if (node.hasOwnProperty('sub')) {
                            route.push(node);
                        }

                        if (node != null && node.sub) {
                            var sub = node.sub;
                            for (var i = 0; i < sub.length; i++){
                                deepSearch(sub[i]);
                            }
                            route.pop();
                        }else if (node != null && !node.hasOwnProperty('sub')) {
                            // 查找到可选节点
                            var ex_length = item.extra.length;
                            for (var i = 0; i < ex_length; i++) {
                                if (node.code === item.extra[i]) {
                                    vm.alterSelectedNodes.push(node);
                                    result = angular.copy(route);
                                    var re_length = result.length;
                                    for (var j = 1; j < re_length; j++) {
                                        vm.alterTreeexpandedNodes.push(result[j]);
                                    }
                                }
                            }
                        }
                    }
                    deepSearch(model);
                }
            }).error(function(error) {
                console.log(error);
            });
        }else{
            var param = {tag: vm.page_config.staff_title, orglist: vm.alter_data.extra};
            var poset_unallocated_org = service.poset_unallocated_org();
            poset_unallocated_org.success(function(data) {
                if (data.code === 200) {
                    vm.orglist_unallocated = data.rst.data;
                    var unsel_length = vm.orglist_unallocated.length, sel_length = vm.alter_data.extra.length, _in = false;
                    for (var i = 0; i < unsel_length; i++) {
                        _in = false;
                        for (var j = 0; j < sel_length; j++) {
                            if (vm.orglist_unallocated[i].orgname === vm.alter_data.extra[j]) {
                                _in = true;
                                break;
                            }
                        }
                        vm.orglist_unallocated[i]['selected'] = _in;
                    }
                }
            }).error(function(error) {
                console.log(error);
            });
        }

        $("#alter_box").dialog({
            title: '变更',
            autoOpen: false,
            width: 800,
            height: 480,
            modal: true,
            position:{  at: "center center" },
            buttons: [
                {
                    text: "取消",
                    class: "gray_bg",
                    click: function() {
                        $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        // param
                        var length = vm.alter_data.extra.length, param = {tag: vm.page_config.staff_title, extra: [], extraonly: false, _id: item._id};
                        // extraonly?
                        if (item._id === vm.alter_data.manInCharge._id) {
                            param.extraonly = true;
                        }else{
                            param.extraonly = false;
                            param.newid = vm.alter_data.manInCharge._id;
                        }

                        if (vm.page_config.staff_title === '产品线负责人') {
                            for (var i = 0; i < length; i++) {
                                if (vm.alter_data.extra[i].selected === true) {
                                    for (var k in vm.alter_data.extra[i]) {
                                        if (k === 'code' || k === 'name') {
                                            param.extra.push(vm.alter_data.extra[i][k]);
                                        }
                                    }
                                }
                            }
                        }else if (vm.page_config.staff_title === '成本中心负责人') {
                            var sel_length = vm.alterSelectedNodes.length;
                            for (var i = 0; i < sel_length; i++) {
                                param.extra.push(vm.alterSelectedNodes[i].code);
                            }
                        }else if (vm.page_config.staff_title === '风控人员') {
                            var length = vm.orglist_unallocated.length;
                            for (var i = 0; i < length; i++) {
                                if (vm.orglist_unallocated[i].selected) {
                                    param.extra.push(vm.orglist_unallocated[i].orgname);
                                }
                            }

                        }
                        var poset_update = service.poset_update(param);
                        poset_update.success(function(data) {
                            if (data.code === 200) {
                                swal("修改成功", "", "success");
                                // vm.paginationConf.onChange();
                                vm.search();
                            }
                        }).error(function(error) {
                            console.log(error);
                        });


                        $( ".ui-dialog-content:eq(0)" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $("#alter_box").dialog("open");
    }
    // vm.delete = function() {
    //     console.log('delete');
    // }
    vm.userGetByName = function (name) {
        if(!name) {vm.userDataList = {};return}
        var req = {limit:"10",name:name,orgid:"",page:1}
        var statusMessage = service.listUser(req);
        statusMessage.success(function(data){
            vm.userDataList = data.rst.data.items;
        }).error(function(error){
            alert(error);
        });
    },
    // 选择对象用户
    vm.receiversFun = function (list) {
        // vm.frmData.receivers  = _.union(vm.frmData.receivers,[list]);
        // vm.frmData.receiversName = list.name
        vm.alter_data.manInCharge.login = list.login;
        vm.alter_data.manInCharge.name = list.name;
        vm.alter_data.manInCharge._id = list._id;
    }

    vm.selectedFun = function(index) {
        vm.orglist_unallocated[index]['selected'] = !vm.orglist_unallocated[index]['selected'];
    }

    // vm.orglist_unselected = function() {
    //
    // }
}]);

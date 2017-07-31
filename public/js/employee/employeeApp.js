var employeeApp = angular.module('employeeApp', []);
employeeApp.service('employeeServices', function($http) {
    var service = {
        addEmployee: function(param) {
            return $http.post('/org/add', param);
        },
        listEmployee: function(param) {
            return $http.post('/org/read',param ,{cache:false});
        },
        deleteEmployee: function(param){
            return $http.post('/org/delete',param);
        },
        viewUser: function(param){
            return $http.post('/user/read',param);
        },
        editEmployee: function(param){
            return $http.post('/org/update',param);
        },
        addUser: function(param) {
            return $http.post('/user/add', param);
        },
        updateUser: function(param) {
            return $http.post('/user/update', param);
        },
        editUser: function(param){
            return $http.post('/user/update',param);
        },
        deleteUser: function(param){
            return $http.post('/user/delete',param);
        }
    };
    return service;
});



employeeApp.controller('employeeCtrl', ['$scope','employeeServices',
    function($scope,employeeServices) {
        $scope.pageClass = 'employee';
        $scope.userData = {};
        $scope.getEmployee = function(id,name){
            var param = { _id: id, hasuser:true};
            var employeeList = employeeServices.listEmployee(param);
           /* if(name){
                $scope.empName = name;
            }else{
                $scope.empName = '中建材集团';
            }*/
            $scope.pId = id;
            employeeList.success(function(data){
                if(data.code == 200){
                    $scope.employeeList = data.rst.data.belongs.orgs;
                    $scope.employeeNav = data.rst.data.superorgs;
                    $scope.employeeUser = data.rst.data.belongs.users;
                    if($scope.employeeNav.length>0){
                        $scope.empName = $scope.employeeNav[$scope.employeeNav.length-1].orgname;
                        $scope.userData.orgname = $scope.employeeNav[$scope.employeeNav.length-1].orgname;
                        $scope.userData.orgid = $scope.employeeNav[$scope.employeeNav.length-1]._id;
                    }else{
                        $scope.empName = '中建材信息技术';
                        $scope.userData.orgname = '中建材信息技术';
                    }

                }
            })
        };
        $scope.getEmployee();
        $scope.addEmployee = function(id){
            if($scope.orgName == ''){
                alert('部门名称不能为空');
                return false;
            }
            var param = {pid:$scope.pId, orgname:$scope.orgName};
            var addEmp = employeeServices.addEmployee(param);
            addEmp.success(function(data){
                if(data.code == 200) {
                    alert("添加成功");
                    $( "#dialog" ).dialog( "destroy" );
                    $scope.getEmployee($scope.pId ,$scope.orgName);
                }
            })
        };
        $scope.editEmployee = function(id,name){
            if($scope.orgName == ''){
                alert('部门名称不能为空');
                return false;
            }
            var param = {_id:id, orgname:$scope.orgName};
            var editEmp = employeeServices.editEmployee(param);
            editEmp.success(function(data){
                if(data.code == 200) {
                    alert("修改成功");
                    $( "#dialog" ).dialog( "destroy" );
                    $scope.getEmployee($scope.pId);
                }
            })

        }
        $scope.addBox = function(state, id, name){
            if(state == 'edit'){
                $scope.orgName = name;
                $scope.orgId = id;
            }else {
                $scope.orgName = '';
            }
            $( "#dialog" ).dialog({
                autoOpen: false,
                width: 400,
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
                            if(state == 'add'){
                                $scope.addEmployee();
                            }else {
                                $scope.editEmployee(id,name);
                            }
                        }
                    }
                ]
            });
            $( "#dialog" ).dialog( "open" );
        }
        $scope.deleteEmployee = function(id,index){
            swal(
                {
                    title: "确定删除此部门吗？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: '确定'
                },
                function(){
                    // employee check
                    var param = {_id: id, hasuser: true};
                    var user_check = employeeServices.listEmployee(param);
                    user_check.success(function(data) {
                        if (data.code === 200) {
                            if (data.rst.data.belongs.users.length > 0) {
                                swal("删除失败", "部门内尚有员工，不可删除", "error");
                            }else{
                                console.log('delete process');
                                //var userList = $scope.userList[id];
                                //var deleteUser = userServices.deleteUser({_id:userList._id});
                                var param = {_id: id};
                                var deleteEmployee = employeeServices.deleteEmployee(param);
                                deleteEmployee.success(function(data){
                                    if(data.code == 200){
                                        $scope.employeeList.splice(index,1);
                                        alert('删除成功');
                                    }else{
                                        alert('删除失败');
                                    }
                                }).error(function(error){
                                    alert(error);
                                });
                            }
                        }else{
                            swal(data.msg, "", "error");
                        }
                    }).error(function(error) {
                        swal(error, "", "error");
                    });
                }
            );


            /*deleteEmployee.success(function(data){
             if(data.code == 200) {
             console.log(data);
             }
             })*/
        }
        $scope.deleteUser = function(id,index){
            swal(
                {
                    title: "确定删除此用户吗？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: '确定'
                },
                function(){
                    //var userList = $scope.userList[id];
                    //var deleteUser = userServices.deleteUser({_id:userList._id});
                    var param = {_id: id};
                    var deleteUser = employeeServices.deleteUser(param);
                    deleteUser.success(function(data){
                        if(data.code == 200){
                            $scope.employeeUser.splice(index,1);
                            alert('删除成功');
                        }else{
                            alert('删除失败');
                        }
                    }).error(function(error){
                        alert(error);
                    });
                }
            );


            /*deleteEmployee.success(function(data){
             if(data.code == 200) {
             console.log(data);
             }
             })*/
        }
        $scope.addUser = function(userData){
            var param = userData;
            var dataUrl;
            if(userData._id){
                dataUrl = employeeServices.updateUser(param);
            }else{
                dataUrl = employeeServices.addUser(param);
            }
            dataUrl.success(function(data){
                if(data.code == 200){
                    $( '#dialog2' ).dialog( "destroy" );
                    $scope.getEmployee($scope.pId ,$scope.orgName);
                }else{
                    alert(data.message);
                }
            }).error(function(error){
                alert(error);
            });
            console.log(userData);
        }
        $scope.addEmUser = function(id,state){
            if(state == 'edit'){
                $("#dialog2").attr("title",'编辑员工');
                var param = {};
                param._id = id;
                var viewUser = employeeServices.viewUser(param);
                viewUser.success(function(data){
                    if(data.code == 200){
                        console.log(data);
                        $scope.userData = data.rst.data;
                    }
                }).error(function(error){
                    alert(error);
                });

            }else {
                $("#dialog2").attr("title",'添加新员工');
                $scope.userData.login = '';
                $scope.userData._id = '';
                $scope.userData.pwd = 'cbmie_cdwp_0103';
                $scope.userData.name = '';
                $scope.userData.title = '';
            }
            $( "#dialog2" ).dialog({
                autoOpen: false,
                width: 400,
                modal: true
            });
            $( "#dialog2" ).dialog( "open" );

        }
        $scope.closeUser = function(){
            $( "#dialog2" ).dialog( "close" );
        }

    }
]);

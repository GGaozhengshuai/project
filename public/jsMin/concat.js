var userCtrls = angular.module('userCtrls', ['userServices']);
userCtrls.controller('pwdCtrl',['$scope','pwdServices',
    function($scope,pwdServices){

    }
]);
userCtrls.controller('loginOutCtrl',['$scope','loginOutServices',
    function($scope,loginOutServices){
        $scope.loginOut = function(){
            var loginOut = loginOutServices.loginOut();
            loginOut.success(function(data){
                if(data.code == 200){
                    window.location.href='login.html';
                }else{
                    alert('退出失败，请重新退出');
                }
            }).error(function(error){
                alert(error);
            });
        }
    }
]);
userCtrls.controller('addUserCtrl', ['$scope','userServices',
    function($scope,userServices) {
        $scope.addData = {};
        $scope.submit = function() {
            var addUser = userServices.addUser(this.addData);
            addUser.success(function(data){
                if(data.code == 200){
                    swal("用户添加成功", "", "success");
                }else{
                    swal("用户添加失败，请重新添加", "", "error");
                }
            }).error(function(error){
                alert(error);
            });
        };
    }
]);

userCtrls.controller('UserListCtrl', ['$scope','userServices',
    function($scope,userServices) {
        $scope.listUser = function(){
            var listUser = userServices.listUser();
            listUser.success(function(data){
                if(data.code == 200){
                    $scope.userList = data.rst.data;
                }else{
                    alert('添加失败,请重新添加');
                }
            }).error(function(error){
                alert(error);
            });
        }();
        $scope.deleteUser = function(id){
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
                    var userList = $scope.userList[id];
                    var deleteUser = userServices.deleteUser({_id:userList._id});
                    deleteUser.success(function(data){
                        if(data.code == 200){
                            $scope.userList.splice(id,1);
                            alert('删除成功');
                        }else{
                            alert('删除失败');
                        }
                    }).error(function(error){
                        alert(error);
                    });
                }
            );

        };
        $scope.del_arr = [];
        $scope.ck = [];
        $scope.check = function(index,ck) {

            //console.log("index: " + index + " ck:" + ck);
            var id = $scope.userList[index]._id;
            var d_index = $scope.del_arr.indexOf(id);
            if((d_index > -1) && ck == false) {
                $scope.del_arr.splice(d_index,1);
            }else if((d_index == -1) && ck == true) {
                $scope.del_arr.push(id);
            }
            //console.log($scope.del_arr);
            if($scope.del_arr.length == $scope.userList.length) {
                $scope.ck_all = true;
            }else {
                $scope.ck_all = false;
            }
        }
        $scope.checkall = function(ck) {
            if(ck == true) {
                $scope.del_arr = [];
                for(var i = 0; i < $scope.userList.length; i++) {
                    $scope.del_arr.push($scope.userList[i]._id);
                    $scope.ck[i] = true;
                }
            }else {
                for(var i = 0; i < $scope.userList.length; i++) {
                    $scope.ck[i] = false;
                }
                $scope.del_arr = [];
            }
            console.log($scope.del_arr);
        }
        $scope.del = function() {
            console.log($scope.del_arr);
        }
    }
]);

userCtrls.controller('viewUserCtrl', ['$scope','$route','userServices',
    function($scope,$route,userServices) {

        var viewUser = userServices.viewUser({_id:$route.current.params.id});
        viewUser.success(function(data){
            if(data.code == 200){
                console.log(data);
                $scope.viewUser = data.rst.data;
            }
        }).error(function(error){
            alert(error);
        });
    }
]);

userCtrls.controller('editUserCtrl', ['$scope','$route','userServices',
    function($scope,$route,userServices) {
        var viewUser = userServices.viewUser({_id:$route.current.params.id});
        $scope.editUser = {};
        viewUser.success(function(data){
            if(data.code == 200){
                $scope.editUser = data.rst.data;;
            }
        }).error(function(error){
            alert(error);
        });


        $scope.submit = function() {

            console.log(this.editUser);
            var editUser = userServices.editUser(this.editUser);

            editUser.success(function(data){
                if(data.code == 200){
                    alert('修改成功');
                }else{
                    alert('修改失败');
                }
            }).error(function(error){
                alert(error);
            });
        };

    }
]);


userApp.controller('aaaC', function($scope) {
    $scope.formData = {};

    $scope.submit = function() {
        console.log(this.formData);
    };
});

//自定义指令
var usrDirectives = angular.module('usrDirectives', []);

usrDirectives.directive('userDirective_1', ['$scope',
    function($scope) {}
]);

usrDirectives.directive('userDirective_2', ['$scope',
    function($scope) {}
]);
var userFilters = angular.module('userFilters', []);

userFilters.filter('userFilter_1', ['$scope',
    function($scope) {}
]);

userFilters.filter('userFilter_2', ['$scope',
    function($scope) {}
]);

var loginApp = angular.module("loginApp", []);
loginApp.factory('User', function($http) {
    var service = {
        user_name_validate: function(userName) {
            var nameTip;
            var reg = /^[a-zA-Z0-9]{3,16}/
            if(userName.length == 0 ){
                nameTip = "请输入用户名";
            }else if(userName.length != 0 && !reg.test(userName)){
                nameTip ="请输入格式正确的用户名";
            }else if(userName.length != 0 && reg.test(userName)){
                nameTip ="";
            }
            return nameTip;
        },
        password_validate: function(userPassword) {
            var passTip;
            if(userPassword.length == 0){
                passTip = "请输入密码";
            }
            return passTip;
        },
        getLogin: function(param) {
            return $http.post('/login', param);
        }
    };
    return service;
});
loginApp.directive('loading',function(){
    return {
        restrict: 'AECM',
        link:function(scope, element, attr) {},
        template: '<div id="loading"><img src="img/loading.gif"/></div>',
        replace: true
    }
});
loginApp.controller('loginController', function($scope, User) {
    $scope.login = function(){
        $scope.statueLoding = true;
        var getLogin = User.getLogin({ 'login': $scope.user_name, 'password': $scope.password});
        getLogin.success(function(data){
            if(data.code == 200){
                window.location.href='index.html';
            }else{
                $scope.passwordTip = '登录名或密码错误！';
            }
            $scope.statueLoding = false;
        }).error(function(error){
            $scope.statueLoding = false;
            alert(error);
        });
    }
    $scope.name_validate =  function(){
        $scope.nameTip = User.user_name_validate($scope.user_name);
    };
    $scope.password_validate = function(){
        $scope.passwordTip = User.password_validate($scope.password);
    };
});

var userServices = angular.module('userServices', []);
userServices.service('userServices', function($http) {
    var service = {
        addUser: function(param) {
            return $http.post('/users/add', param);
        },
        listUser: function() {
            return $http.post('/users');
        },
        deleteUser: function(param){
            return $http.post('/users/delete',param);
        },
        viewUser: function(param){
            return $http.post('/users/read',param);
        },
        editUser: function(param){
            return $http.post('/users/update',param);
        }
    };
    return service;
});

userServices.service('pwdServices',
    function($http) {
        return {
            changePwd: function(param){
                //return $http.post('/service/users/changePwd',param);
            }
        }
    }
);
userServices.service('loginOutServices',
    function($http) {
        return {
            loginOut: function(){
                return $http.get('/logout');
            }
        }
    }
);

/*angular.module('myAppTest', []).
    controller('myController', ['$scope', function($scope){
        $scope.frameworks = ['Node.js', 'Express', 'AnjularJS'];
    }]);*/
var module = angular.module('myAppTest', []).
module.controller('myController', ['$scope', function($scope){
    $scope.frameworks = ['Node.js', 'Express', 'AnjularJS'];
}]);

var userApp = angular.module('userApp', [
    'ngRoute', 'ngAnimate', 'userCtrls','userServices'
]);

userApp.config(function($routeProvider) {
    $routeProvider.when('/pwd', {
        templateUrl: '../template/password.html',
        controller: 'pwdCtrl'
    }).when('/addUser', {
        templateUrl: '../template/user/addUser.html',
        controller: 'addUserCtrl'
    }).when('/editUser/:id/',{
        templateUrl:'../template/user/editUser.html',
        controller:'editUserCtrl'
    }).when('/viewUser/:id/',{
        templateUrl:'../template/user/viewUser.html',
        controller:'viewUserCtrl'
    }).when('/listUser',{
        templateUrl:'../template/user/listUser.html',
        controller:'UserListCtrl'
    }).otherwise({
        redirectTo: '/listUser'
    })
});

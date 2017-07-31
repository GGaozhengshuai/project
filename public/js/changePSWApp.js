var userApp = angular.module('userApp',[]);
userApp.factory('User', function($http) {
    var service = {
        rmePwd: function(param) { //修改密码
            return $http.post('/userme/password',param ,{cache:false});
        },
        loginOut: function(){
            return $http.get('/logout');
        }
    };
    return service;
});
userApp.factory('locals', ["$window", function ($window) {
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
            return JSON.parse($window.localStorage[key] != undefined ? $window.localStorage[key] : "{}");
        },
        // 删除
        remove: function (key) {
            delete $window.localStorage[key];
        }

    }
}]);
userApp.directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                if(scope.$$phase) {
                    ctrl.$focused = true;
                } else {
                    scope.$apply(function() {ctrl.$focused = true;});
                }
            }).bind('blur', function(evt) {
                element.removeClass(FOCUS_CLASS);
                if(scope.$$phase) {
                    ctrl.$focused = true;
                } else {
                    scope.$apply(function() {ctrl.$focused = false;});
                }
            });
        }
    }
}]);
// 密码强度
userApp.directive('passStrength', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            //CharMode函数
            //测试某个字符是属于哪一类.
            var charMode = function ( iN ){
                    if (iN>=48 && iN <=57) //数字
                        return 1;
                    if (iN>=65 && iN <=90) //大写字母
                        return 2;
                    if (iN>=97 && iN <=122) //小写
                        return 4;
                    else
                        return 8; //特殊字符
                },
                //bitTotal函数
                //计算出当前密码当中一共有多少种模式
                bitTotal = function ( num ){
                    var modes=0;
                    for (i=0;i<7;i++){
                        if (num & 1) {
                            modes += i==3 ? 2 : 1;
                        }
                        num>>>=1;
                    }
                    return modes;
                },
                //checkStrong函数
                //返回密码的强度级别
                checkStrong = function ( sPW ){
                    var modes = 0;
                    for (i=0; i<sPW.length; i++){
                        //测试每一个字符的类别并统计一共有多少种模式.
                        modes |= charMode(sPW.charCodeAt(i));
                    }
                    if( sPW.length>5 ) modes |= 16;
                    if( sPW.length>9 ) modes |= 32;
                    if( sPW.length>14 ) modes |= 64;
                    return bitTotal( modes );
                };
            ctrl.$parsers.unshift(function(viewValue) {
                var level = checkStrong(viewValue);
                level = level > 6 ? 6 : level;
                ctrl.$setValidity('pwd', viewValue && level>2);
                return level+viewValue;
            });
        }
    };
});
userApp.directive('loading',function(){
    return {
        restrict: 'AECM',
        link:function(scope, element, attr) {},
        template: '<div id="loading"><img src="img/loading.gif"/></div>',
        replace: true
    }
});
// 修改信息
userApp.controller('changeInfoCtrl',  function($scope,locals,User) {
    /*var person = locals.getObject('persion');
    $scope.userChineseName = person.user.name;
    $scope.userName = person.user.login;*/
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
        var rmePwd = User.rmePwd({ oldPwd:'cbmie_cdwp_0103',newPwd:$scope.newpwd2});
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
                    /*locals.remove('persion');*/
                    window.location.href='login.html';
                });
            } else {
                swal(data.msg, '', 'warning');
            }
        })
    };
        $scope.loginOut = function(){
            var loginOut = User.loginOut();
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
);
userApp.controller('loginOutCtrl',function($scope,/*$cookieStore,*/locals,User){
        $scope.loginOut = function(){
            var loginOut = User.loginOut();
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
);

var loginApp = angular.module("loginApp", ['ngCookies']);
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
loginApp.factory('locals', ["$window", function ($window) {
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
            console.log(key, $window.localStorage, $window.localStorage[key], $window.localStorage[key] != 'undefined')

            return JSON.parse($window.localStorage[key] != undefined ? $window.localStorage[key] : "{}");
        }

    }
}]);
loginApp.directive('loading',function(){
    return {
        restrict: 'AECM',
        link:function(scope, element, attr) {},
        template: '<div id="loading"><img src="img/loading.gif"/></div>',
        replace: true
    }
});
loginApp.controller('loginController', function($scope, $window, /*$cookieStore,*/ User, locals) {
    $window.localStorage.clear();
    $scope.login = function(){
        if($scope.user_name == ''){
            $scope.errorTip = '用户名不能为空！';
            return false;
        }else if($scope.password == ''){
            $scope.errorTip = '密码不能为空！';
            return false;
        }else{
            $scope.errorTip = '';
        }
        $scope.statueLoding = true;
        var getLogin = User.getLogin({ 'login': $scope.user_name, 'pwd': $scope.password});
        getLogin.success(function(data){
            if(data.code == 200){
                if(data.rst.data.user.changepwd){
                    window.location.href='changePSW.html';
                }else {
                    window.location.href='index.html';
                    locals.setObject('persion', {
                        username: data.rst.data.username,
                        token: data.rst.data.token,
                        roles: data.rst.data.user.roles,
                        user:data.rst.data.user
                    })
                }
               //
            }else{
                $scope.errorTip = '登录名或密码错误,请重新输入！';
            }
            $scope.statueLoding = false;
        }).error(function(error){
            $scope.statueLoding = false;
            alert(error);
        });
    }
    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
    };
    $scope.name_validate =  function(){
        $scope.nameTip = User.user_name_validate($scope.user_name);
    };
    $scope.password_validate = function(){
        $scope.passwordTip = User.password_validate($scope.password);
    };
});

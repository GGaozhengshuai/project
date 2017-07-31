/**
 * Created by LP on 2016/5/27.
 * 引用方法：引用html页面
 *     <div class="viewTable ng-scope ng-hide" ng-show="ht.activeTab == 3" ng-include="'template/common/creditTab.html'" ng-controller="creditCtrl"></div>
 *     引用页面controller在获取到基本信息后添加
 *     var param = {name:'', id:''}; //根据自己页面返回数据定，需要的参数是{name:'', id:''}客户名称和客户编号
        $scope.$broadcast('transfer.type', param);
 */
var creditApp = angular.module('creditApp', ['pageDirectives']);

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
        }

    };

    return service;
});


creditApp.controller('creditCtrl', ['$scope','$http', 'creditService', function ($scope, $http, creditService) {
    $scope.ORDER_DATA = {code: 'test'};
    // 子级接收参数
    $scope.$on('transfer.type', function(event, data) {
        var param = {'KUNNR':data.id},
            paramwsyfd = {'user': data.name,status:'valid'};
        var creditData = creditService.credit(param);
        var ysList = creditService.ysList(param);
        var wsyfdList = creditService.wsyfdList(paramwsyfd);

        creditData.success(function(data){
            if(data.code == 200){
                $scope.ORDER_DATA = data.rst.data.items;
            }else {
                alert(data.msg);
            }
        });
        ysList.success(function(data){
            if(data.code == 200){
                $scope.ysList = data.rst.data.items;
            }else {
                alert(data.msg);
            }
        });
        wsyfdList.success(function(data){
            if(data.code == 200){
                $scope.wsyfdList = data.rst.data.items;
            }else {
                alert(data.msg);
            }
        });
        // 过滤函数
        $scope.fun = function (e) {
            return e.bonusmoney.total-e.bonusmoney.freeze-e.bonusmoney.used>10 ;
        };
    });


}]);
/**
 * Created by LP on 2016/6/25.
 */
var intoBillApp = angular.module('intoBillApp', ['pageDirectives','formDirectives','ui.autocomplete', 'MyFilterApp']);
intoBillApp.service('intoBillServices', function($http) {
    var service = {
        list: function(param) {
            return $http.post('/dzd/list',param ,{cache:false});
        }
    };
    return service;
});

intoBillApp.controller('intoBillOrderCtrl', ['$scope','intoBillServices',function($scope,intoBillServices){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, NAME1:$scope.NAME1, ZHX: $scope.ZHX, dateStar: $scope.dateStar, dateEnd: $scope.dateEnd, KUNNR:$scope.KUNNR,VBELN:$scope.VBELN};
            var customerPromise = intoBillServices.list(param);
            $scope.paginationConf.pagePromise = customerPromise;
            $scope.hxStateTxt = {1: '未匹配', 2:'已匹配未核销', 3:'核销完成'};
        }
    };
}]);

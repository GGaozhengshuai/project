var indexApp = angular.module('indexApp', ['pageDirectives']);
indexApp.service('indexServices', function($http) {
    var service = {
        draftApproval: function(param) {//草稿
            return $http.post('/approval/mybegin',param, {cache:false});
        },
        listApproval: function(param) {//待办
            return $http.post('/approval/mydoing', param,{cache:false});
        },
        alApproval: function(param) {//已办
            return $http.post('/approval/mydone', param,{cache:true});
        },
        myApproval: function(param){//我的申请
            return $http.post('/approval/myapply', param, {cache:true});
        },
        getprctype: function(param){//我的申请
            return $http.post('/approval/getprctype', param, {cache:true});
        },
        listSubscriber: function(param) {//订阅
            return $http.post('/approval/mysubscriber',param, {cache:false});
        }
    };
    return service;
});

indexApp.controller('indexCtrl', ['$scope','$http','indexServices',function($scope,$http,service){
    var draftData = service.draftApproval();
    draftData.success(function(data){
        if(data.code == 200){
            $scope.draftList = data.rst.data.items;//草稿
            $scope.draftTotal = data.rst.data.total;
        }
    });
    var approvalData = service.listApproval();
    approvalData.success(function(data){
        if(data.code == 200){
            $scope.approvalList = data.rst.data.items;//待办
            $scope.approvalTotal = data.rst.data.total;
        }
    });
    var alApproval = service.alApproval();
    alApproval.success(function(data){
        if(data.code == 200){
            $scope.alApprovalList = data.rst.data.items;//已办
            $scope.alApprovalTotal = data.rst.data.total;
        }
    });
    var myApproval = service.myApproval();
    myApproval.success(function(data){
        if(data.code == 200){
            $scope.myApprovalList = data.rst.data.items;//我的申请
            $scope.myApprovalTotal = data.rst.data.total;
        }
    });
    $scope.deleteDraftBill = function(controller,processId,nodeId,index){
        var url = '/'+controller+'/cancel';
        var myDataPar = {};
        myDataPar.processId = processId;
        myDataPar.nodeId = nodeId;
        swal({
            title: "您确定要删除吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除",
            cancelButtonText:'关闭',
            closeOnConfirm: true
        }, function(){
            $http.post(url,myDataPar).success(function(data){
                if(data.code == 200){
                    $scope.draftList.splice(index,1)
                    swal("删除成功", "", "success");
                    return false;
                }else {
                    alert(data.msg);
                }
            }).error(function(data){
                alert('请求超时，服务器错误');
            });
        });

    }
}]);

//我的申请
indexApp.controller('myApplyCtrl', ['$scope','indexServices',function($scope,service){
    var getprctype = service.getprctype({});
    getprctype.success(function (data) {
        if(data.code == 200){
            $scope.getbilltype = data.data.enum.PRC;
        }
    });
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, processtype:$scope.processtype};
            var myApproval = service.myApproval(param);
            $scope.paginationConf.pagePromise = myApproval;
        }
    };
}]);
//我的草稿
indexApp.controller('myDraftCtrl', ['$scope','$http','indexServices',function($scope,$http,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, processtype:$scope.processtype};
            var myDraft = service.draftApproval(param);
            $scope.paginationConf.pagePromise = myDraft;
        }
    };
    var getprctype = service.getprctype({});
    getprctype.success(function (data) {
        if(data.code == 200){
            $scope.getbilltype = data.data.enum.PRC;
        }
    });
    $scope.deleteDraftBill = function(controller,processId,nodeId,index){
        var url = '/'+controller+'/cancel';
        var myDataPar = {};
        myDataPar.processId = processId;
        myDataPar.nodeId = nodeId;
        swal({
            title: "您确定要删除吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除",
            cancelButtonText:'关闭',
            closeOnConfirm: true
        }, function(){
            $http.post(url,myDataPar).success(function(data){
                if(data.code == 200){
                    $scope.dataList.splice(index,1)
                    swal("删除成功", "", "success");
                    return false;
                }else {
                    alert(data.msg);
                }
            }).error(function(data){
                alert('请求超时，服务器错误');
            });
        });

    }
}]);
//我的待办
indexApp.controller('myTodoCtrl', ['$scope','indexServices',function($scope,service){
    var getprctype = service.getprctype({});
    getprctype.success(function (data) {
        if(data.code == 200){
            $scope.getbilltype = data.data.enum.PRC;
        }
    });
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, processtype:$scope.processtype};
            var myTodo = service.listApproval(param);
            $scope.paginationConf.pagePromise = myTodo;
        }
    };
}]);
//我的已办
indexApp.controller('alApplyCtrl', ['$scope','indexServices',function($scope,service){
    var getprctype = service.getprctype({});
    getprctype.success(function (data) {
        if(data.code == 200){
            $scope.getbilltype = data.data.enum.PRC;
        }
    });
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, processtype:$scope.processtype};
            var alApply = service.alApproval(param);
            $scope.paginationConf.pagePromise = alApply;
        }
    };
}]);
//我的订阅
indexApp.controller('mySubscribeCtrl', ['$scope','$http','indexServices',function($scope,$http,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, processtype:$scope.processtype};
            var myDraft = service.listSubscriber(param);
            $scope.paginationConf.pagePromise = myDraft;
        }
    };
    var getprctype = service.getprctype({});
    getprctype.success(function (data) {
        if(data.code == 200){
            $scope.getbilltype = data.data.enum.PRC;
        }
    });
    $scope.deleteDraftBill = function(controller,processId,nodeId,index){
        var url = '/'+controller+'/cancel';
        var myDataPar = {};
        myDataPar.processId = processId;
        myDataPar.nodeId = nodeId;
        swal({
            title: "您确定要删除吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除",
            cancelButtonText:'关闭',
            closeOnConfirm: true
        }, function(){
            $http.post(url,myDataPar).success(function(data){
                if(data.code == 200){
                    $scope.dataList.splice(index,1)
                    swal("删除成功", "", "success");
                    return false;
                }else {
                    alert(data.msg);
                }
            }).error(function(data){
                alert('请求超时，服务器错误');
            });
        });

    }
}]);
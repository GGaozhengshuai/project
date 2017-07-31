var checkApp = angular.module('checkApp', ['pageDirectives','formDirectives']);
checkApp.service('checkService',function($http) {
    var service = {
        listcheck: function(param) {
            return $http.post('/inv/list',param ,{cache:false});
        },
        viewcheck: function(param) {
            return $http.post('/inv/read',param ,{cache:true});
        },
        inv: function (param) {  //审批
            return $http.post('/inv/detail', param, {cache: false});
        },
        invAgree: function (param) {//同意
            return $http.post('/inv/agree', param, {cache: false});
        },
        invDisagree: function (param) {//驳回
            return $http.post('/inv/disagree', param, {cache: false});
        },
        invCancel: function (param) {//取消
            return $http.post('/inv/cancel', param, {cache: false});
        },
        invRecall: function (param) {//召回
            return $http.post('/inv/recall', param, {cache: false});
        },
        invsave: function (param) {//召回
            return $http.post('/inv/save', param, {cache: false});
        },
        enumlist : function (param){
            return $http.post('/purchase/enumlist', param,{cache : false});
        },
        getprocesslog: function(param) {
            return $http.post('/inv/getprocesslog', param, {cache: false});
        }
    }
    return service;
});



checkApp.controller('checkCtrl',['$scope','$stateParams','$http','checkService',function($scope,$stateParams,$http,check){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, RPNUM: $scope.RPNUM, LGNUM: $scope.LGNUM, RPDATE: $scope.RPDATE};
            var customerPromise = check.listcheck(param);
            customerPromise.success(function(data){
                if(data.code == 200){
                    $scope.dataList = data.rst.data.items;
                    var cgl = check.enumlist();
                    cgl.success(function(data){
                        if(data.code == 200){
                            $scope.RPTYPE = data.rst.enum.RPTYPE;
                            $scope.RPCON = data.rst.enum.RPCON;
                        }else{
                            alert(data.msg);
                        }
                    })
                }else{
                    alert(data.msg);
                }
            });
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

    /*$scope.print=function(){
        $http.get('print/printcheck.html').success(function(data){
            CreateOneFormPage(data);
            LODOP.PRINT_SETUP();
        });
    }
    function  CreateOneFormPage(data){
        LODOP=getLodop();
        LODOP.PRINT_INIT("");
        LODOP.SET_PRINT_PAGESIZE (1, 0, 0,"A4");
        var strStyleCSS="<link href='../css/print.css' type='text/css' rel='stylesheet'>";
        LODOP.ADD_PRINT_HTM(50,50,"100%","100%",strStyleCSS+data);
        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");
        LODOP.SET_PRINT_STYLEA(0,"Horient",2); //水平居中
    };*/
}]);
checkApp.controller('checkViewCtrl',['$scope','$stateParams','checkService',function($scope,$stateParams,check){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, RPNUM:$stateParams.id};
            var viewPur = check.viewcheck(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function(data){
                if(data.code == 200){
                    $scope.purchaseList = data.rst.data.model;//客户基本信息
                    $scope.dataList = data.rst.data.items;
                    var cgl = check.enumlist();
                    cgl.success(function(data){
                        if(data.code == 200){
                            $scope.enumobj = data.rst.enum;
                        }else{
                            alert(data.msg);
                        }
                    })
                }
            }).error(function(error){
                alert(error);
            });
        }
    };
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = check.getprocesslog({type: 'ZD13', id: vm.purchaseList.RPNUM}); // 直接取值数据中 申请人（proposer）
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
checkApp.controller('ApplycheckCtrl',['$scope','$stateParams','checkService',function($scope,$stateParams,check){
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
                processId: $stateParams.processId,
                nodeId: $stateParams.nodeId
            };
            if($stateParams.myflag == 'mysubscriber') {
                $.extend(param, {myflag: "mysubscriber" })
            }
            var viewPur = check.inv(param);
            $scope.paginationConf.pagePromise = viewPur;
            viewPur.success(function (data) {
                if (data.code == 200) {
                    $scope.apCot = true;
                    $scope.purchaseList = data.rst.doc.model;//基本信息
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
                        $scope.apCot = data.rst.processlog.length>1 ? true : false;
                        //$scope.apCot = false;
                    }
                    var cgl = check.enumlist();
                    cgl.success(function(data){
                        if(data.code == 200){
                            $scope.enumobj = data.rst.enum;
                        }else{
                            alert(data.msg);
                        }
                    })
                }else {
                    alert(data.msg);
                }
            }).error(function (error) {
                alert(error);
            });
        }
    };

    var applyObj = $scope.applyObj = {};
    $scope.applySave = function(){
        var param = {};
        delete  $scope.doc.items;
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = check.invsave(param);
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
        //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
        var applyAgree = check.invAgree(param);
        applyAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回库存盘点待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=库存盘点&&controllercode=ZD13';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        var disagree = check.invDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回库存盘点待办",
                    closeOnConfirm: true
                }, function () {
                    // window.location.href = '/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=库存盘点&&controllercode=ZD13';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyCancel = function () {//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        var cancel = check.invCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回库存盘点待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=库存盘点&&controllercode=ZD13';
                });
            } else {
                swal("提交失败！", '', "error");
            }
        }).error(function (error) {
            alert(error);
        });
    }
    $scope.applyRecall = function () {//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = check.invRecall(param);
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
            alert(error);
        });
    }
}]);

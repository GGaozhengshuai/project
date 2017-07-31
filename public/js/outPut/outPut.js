var outPutApp = angular.module('outPutApp',['pageDirectives','formDirectives']);
outPutApp.service('outPutAppService',function($http){
    var service = {
        jinxiaoxiangList : function(param){
           return $http.post('/jinxiaoxiang/list',param,{cache:false});
        },
        jinxiaoxiangRead : function(param){
           return $http.post('/jinxiaoxiang/read',param,{cache:false});
        },
        saveitem : function(param){
            return $http.post('/jinxiaoxiang/saveitems',param,{cache:false});
        }
    }
    return service;
});

outPutApp.controller('outPutListCtrl',['$scope','$filter','$rootScope','outPutAppService',function($scope,$filter,$rootScope,output){
    var newYeMath = new Date();
    $scope.year = $filter('date')(newYeMath,'yyyy');
    $scope.month = $filter('date')(newYeMath,'MM');
    $scope.lssdatapower = $rootScope.userName == 'liushanshan' ? true : false;
    $scope.sydatapower = $rootScope.userName == 'sunyan' ? true : false;
    $scope.search = function(){
        var jinxiaoxiangList = output.jinxiaoxiangList({'year':$scope.year,'month':$scope.month});
        jinxiaoxiangList.success(function(data){
            if(data.code == 200){
                $scope.dataList = data.rst.items;
            }
        });
    }
}]);
outPutApp.controller('outPutChangeCtrl',['$scope','$stateParams','$rootScope','outPutAppService',function($scope,$stateParams,$rootScope,output){
    var vm = $scope;

    vm.wljdatapower = $rootScope.userName == 'wanglijuan' ? true : false;   //王丽娟数据操作权限
    vm.yxydatapower = $rootScope.userName == 'yangxuyan' ? true : false;   //杨旭艳数据操作权限
    vm.yhldatapower = $rootScope.userName == 'yanghongliang' ? true : false;   //杨宏亮数据操作权限
    vm.sxydatapower = $rootScope.userName == 'sunxueyan' ? true : false;   //孙雪雁数据操作权限
    vm.lgqdatapower = $rootScope.userName == 'liguiqin' ? true : false;   //李桂芹数据操作权限


    var jxxchange = output.jinxiaoxiangRead({'year':$stateParams.year,'month':$stateParams.month});
    jxxchange.success(function (data) {
        if(data.code == 200){
            //信息产品事业群分销待开
            vm.todo_it_fx = {
                text : data.rst.doc.jinxiaodata.todo_it_fx.text,
                amount : data.rst.doc.jinxiaodata.todo_it_fx.amount
            };
            //信息产品事业群项目待开
            vm.todo_it_xm = {
                text : data.rst.doc.jinxiaodata.todo_it_xm.text,
                amount : data.rst.doc.jinxiaodata.todo_it_xm.amount
            };
            //信息产品事业群其他待开
            vm.todo_it_other = {
                text : data.rst.doc.jinxiaodata.todo_it_other.text,
                amount : data.rst.doc.jinxiaodata.todo_it_other.amount
            };
            //医疗待开
            vm.todo_yl = {
                text : data.rst.doc.jinxiaodata.todo_yl.text,
                amount : data.rst.doc.jinxiaodata.todo_yl.amount
            };
            //合作待开
            vm.todo_hz = {
                text : data.rst.doc.jinxiaodata.todo_hz.text,
                amount : data.rst.doc.jinxiaodata.todo_hz.amount
            };
            //财务手中发票
            vm.got_cw = {
                text : data.rst.doc.jinxiaodata.got_cw.text,
                amount : data.rst.doc.jinxiaodata.got_cw.amount
            };
            //华为商务手中发票
            vm.got_hw_sw = {
                text : data.rst.doc.jinxiaodata.got_hw_sw.text,
                amount : data.rst.doc.jinxiaodata.got_hw_sw.amount
            };
            //华为代签收发票
            vm.pending_hw = {
                text : data.rst.doc.jinxiaodata.pending_hw.text,
                amount : data.rst.doc.jinxiaodata.pending_hw.amount
            };
            //华为处理中发票
            vm.processing_hw = {
                text : data.rst.doc.jinxiaodata.processing_hw.text,
                amount : data.rst.doc.jinxiaodata.processing_hw.amount
            };
            //华为已提交(不确定)
            vm.committed_hw = {
                text : data.rst.doc.jinxiaodata.committed_hw.text,
                amount : data.rst.doc.jinxiaodata.committed_hw.amount
            };
            //总公司预计本月收
            vm.expect_zgs = {
                text : data.rst.doc.jinxiaodata.expect_zgs.text,
                amount : data.rst.doc.jinxiaodata.expect_zgs.amount
            };
            //医疗预计本月收
            vm.expect_yl = {
                text : data.rst.doc.jinxiaodata.expect_yl.text,
                amount : data.rst.doc.jinxiaodata.expect_yl.amount
            };
            //迭代器预计本月收
            vm.expect_nbq = {
                text : data.rst.doc.jinxiaodata.expect_nbq.text,
                amount : data.rst.doc.jinxiaodata.expect_nbq.amount
            };


            //当月已批发票
            vm.confirmed = {
                text : data.rst.doc.jinxiaodata.confirmed.text,
                amount : data.rst.doc.jinxiaodata.confirmed.amount
            };

            //当当月进项-销项
            vm.heji_jxx = {
                text : data.rst.doc.hejidata.text,
                amount : data.rst.doc.hejidata.amount
            };
        }
    })

    vm.save = function(){
        var param = {};
        if(vm.wljdatapower) {      //王丽娟保存
            param.jxitems = [
                    {'category':'todo_it_fx','amount':vm.todo_it_fx.amount},
                    {'category':'todo_it_xm','amount':vm.todo_it_xm.amount},
                    {'category':'todo_it_other','amount':vm.todo_it_other.amount},
                    {'category':'got_hw_sw','amount':vm.got_hw_sw.amount},
                    {'category':'pending_hw','amount':vm.pending_hw.amount},
                    {'category':'processing_hw','amount':vm.processing_hw.amount},
                    {'category':'committed_hw','amount':vm.committed_hw.amount},
                    {'category':'confirmed','amount':vm.confirmed.amount}
            ];
            var saveitem = output.saveitem(param).success(function(data){
                if(data.code == 200){
                    swal({
                        title: '保存成功',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/outPutlist';
                    });
                }
            });
        }else if(vm.yxydatapower){      //杨旭艳保存
            param.jxitems = [
                {'category':'todo_yl','amount':vm.todo_yl.amount},
                {'category':'todo_hz','amount':vm.todo_hz.amount},
                {'category':'expect_yl','amount':vm.expect_yl.amount},
                {'category':'confirmed','amount':vm.confirmed.amount}
            ];
            var saveitem = output.saveitem(param).success(function(data){
                if(data.code == 200){
                    swal({
                        title: '保存成功',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/outPutlist';
                    });
                }
            });
        }else if(vm.yhldatapower){      //杨宏亮保存
            param.jxitems = [{'category':'got_cw','amount':vm.got_cw.amount}];
            var saveitem = output.saveitem(param).success(function(data){
                if(data.code == 200){
                    swal({
                        title: '保存成功',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/outPutlist';
                    });
                }
            });
        }else if(vm.sxydatapower){     //孙雪艳保存
            param.jxitems = [{'category':'expect_zgs','amount':vm.expect_zgs.amount}];
            var saveitem = output.saveitem(param).success(function(data){
                if(data.code == 200){
                    swal({
                        title: '保存成功',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/outPutlist';
                    });
                }
            });
        }else if(vm.lgqdatapower){     //李桂琴保存
            param.jxitems = [{'category':'expect_nbq','amount':vm.expect_nbq.amount}];
            var saveitem = output.saveitem(param).success(function(data){
                if(data.code == 200){
                    swal({
                        title: '保存成功',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/outPutlist';
                    });
                }
            });
        }
    }
}]);

outPutApp.controller('outPutViewCtrl',['$scope','$stateParams','$rootScope','outPutAppService',function($scope,$stateParams,$rootScope,output){
    var vm = $scope;

    vm.wljdatapower = $rootScope.userName == 'wanglijuan' ? true : false;      //王丽娟查看权限
    vm.sydatapower = $rootScope.userName == 'sunyan' ? true : false;        //孙艳查看权限
    vm.lssdatapower = $rootScope.userName == 'liushanshan' ? true : false;        //刘珊珊查看权限
    vm.yxydatapower = $rootScope.userName == 'yangxuyan' ? true : false;        //杨旭艳查看权限
    vm.sxydatapower = $rootScope.userName == 'sunxueyan' ? true : false;        //孙雪艳查看权限
    vm.yhldatapower = $rootScope.userName == 'yanghongliang' ? true : false;        //杨宏亮查看权限
    vm.lgqdatapower = $rootScope.userName == 'liguiqin' ? true : false;        //李桂琴查看权限

    var jinxiaoxiangRead = output.jinxiaoxiangRead({'year':$stateParams.year,'month':$stateParams.month});
    jinxiaoxiangRead.success(function(data){
        if(data.code == 200){
            //信息产品事业群分销待开
            vm.todo_it_fx = {
                text : data.rst.doc.jinxiaodata.todo_it_fx.text,
                amount : data.rst.doc.jinxiaodata.todo_it_fx.amount
            };
            //信息产品事业群项目待开
            vm.todo_it_xm = {
                text : data.rst.doc.jinxiaodata.todo_it_xm.text,
                amount : data.rst.doc.jinxiaodata.todo_it_xm.amount
            };
            //信息产品事业群其他待开
            vm.todo_it_other = {
                text : data.rst.doc.jinxiaodata.todo_it_other.text,
                amount : data.rst.doc.jinxiaodata.todo_it_other.amount
            };
            //医疗待开
            vm.todo_yl = {
                text : data.rst.doc.jinxiaodata.todo_yl.text,
                amount : data.rst.doc.jinxiaodata.todo_yl.amount
            };
            //合作待开
            vm.todo_hz = {
                text : data.rst.doc.jinxiaodata.todo_hz.text,
                amount : data.rst.doc.jinxiaodata.todo_hz.amount
            };
            //财务手中发票
            vm.got_cw = {
                text : data.rst.doc.jinxiaodata.got_cw.text,
                amount : data.rst.doc.jinxiaodata.got_cw.amount
            };
            //华为商务手中发票
            vm.got_hw_sw = {
                text : data.rst.doc.jinxiaodata.got_hw_sw.text,
                amount : data.rst.doc.jinxiaodata.got_hw_sw.amount
            };
            //华为代签收发票
            vm.pending_hw = {
                text : data.rst.doc.jinxiaodata.pending_hw.text,
                amount : data.rst.doc.jinxiaodata.pending_hw.amount
            };
            //华为处理中发票
            vm.processing_hw = {
                text : data.rst.doc.jinxiaodata.processing_hw.text,
                amount : data.rst.doc.jinxiaodata.processing_hw.amount
            };
            //华为已提交(不确定)
            vm.committed_hw = {
                text : data.rst.doc.jinxiaodata.committed_hw.text,
                amount : data.rst.doc.jinxiaodata.committed_hw.amount
            };
            //总公司预计本月收
            vm.expect_zgs = {
                text : data.rst.doc.jinxiaodata.expect_zgs.text,
                amount : data.rst.doc.jinxiaodata.expect_zgs.amount
            };
            //医疗预计本月收
            vm.expect_yl = {
                text : data.rst.doc.jinxiaodata.expect_yl.text,
                amount : data.rst.doc.jinxiaodata.expect_yl.amount
            };
            //迭代器预计本月收
            vm.expect_nbq = {
                text : data.rst.doc.jinxiaodata.expect_nbq.text,
                amount : data.rst.doc.jinxiaodata.expect_nbq.amount
            };


            //当月已批发票
            vm.confirmed = {
                text : data.rst.doc.jinxiaodata.confirmed.text,
                amount : data.rst.doc.jinxiaodata.confirmed.amount
            };

            //当当月进项-销项
            vm.heji_jxx = {
                text : data.rst.doc.hejidata.text,
                amount : data.rst.doc.hejidata.amount
            };

        }
    });
}]);



var arriveCargoinfo = angular.module('arriveCargoinfo',['pageDirectives','formDirectives','uploadifyApp']);
arriveCargoinfo.service('arriveCargoinfoService',function($http){
    var service = {
        arrivalList : function(param){
            return $http.post('arrival/list',param,{cache:false});
        },
        arrivalAdd : function(param){
            return $http.post('arrival/add',param,{cache:false});
        },
        arrivalupdate : function(param){
            return $http.post('arrival/update',param,{cache:false});
        },
        autostatus : function(param){
            return $http.post('arrival/autostatus',param,{cache:false});
        },
        checkcode : function(param){
            return $http.post('arrival/checkcode',param,{cache:false});
        }
    }
    return service;
});

arriveCargoinfo.controller('arriveCargoinfoListCtrl',['$scope','$timeout','$filter','arriveCargoinfoService','uiGridConstants',function($scope,$timeout,$filter,service){
    var vm = $scope;
    vm.table = false;
    vm.loadData = true;
    vm.tableApi = null;
    vm.tableOptions = {
        multiSelect: true,
        enableRowSelection: true,
        enableSelectAll: true,
        resizable: false,
        selectionRowHeaderWidth: 42,
        onRegisterApi: function (api) {
            vm.tableApi = api;
        }
    }
    vm.tableHeader = [
        {name: 'transportid', displayName: "货运单号", width: 100, cellTooltip: true},
        {name: 'supplierid', displayName: "供应商订单号", width: 90, cellTooltip: true},
        {name: 'thnum', displayName: "预约提货箱数", width: 130, cellTooltip: true},
        {name: 'dhnum', displayName: "已到货箱数", width: 130, cellTooltip: true},
        {name: 'sjnum', displayName: "已上架箱数", width: 120, cellTooltip: true},
        {name: 'gznum', displayName: "已过账箱数", width: 120, cellTooltip: true},
        {name: 'expectdate', displayName: "预计到厂时间", width: 160, cellTooltip: true,cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'createdate', displayName: "预约创建时间", width: 160, cellTooltip: true,cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'actualdate', displayName: "实际到库时间", width: 160, cellTooltip: true,cellFilter: 'date: \'yyyy-MM-dd\''},
        {name: 'status', displayName: "状态", width: 120, cellTooltip: true},
        {name: 'project', displayName: "项目名称", width: 180, cellTooltip: true},
        {name: 'thvolume', displayName: "提货体积(方)", width: 120, cellTooltip: true},
        {name: 'appointmentno', displayName: "预约号", width: 120, cellTooltip: true},
        {name: 'appointpepleno', displayName: "预约人工号", width: 120, cellTooltip: true}
    ];

    vm.tableSelectRow = function() {
        if(vm.tableApi && vm.loadData) return;
        $timeout(function() {
            var _select = vm.tableApi.selection;
            // 监听单选
            _select.on.rowSelectionChanged(vm, function(row){
                var v = row.entity, action = row.isSelected ? 'add' : 'remove';
                updateSelected(action, v);
            });
            // 监听全选
            _select.on.rowSelectionChangedBatch(vm, function(rows){
                if(rows[0].isSelected) {
                    vm.allCheck(rows[0].isSelected);
                    vm.allArr = vm.dataList;
                } else {
                    vm.emptyFn();
                }
            })
        })
    };

    var autostatus = service.autostatus().success(function(data){});   //更新一次状态

    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:vm.paginationConf.currentPage, limit:vm.paginationConf.itemsPerPage,supplierid:vm.supplierid,transportid:vm.transportid,status:vm.status,dateStar:vm.dateStar,dateEnd:vm.dateEnd};
            var customerPromise = service.arrivalList(param);
            customerPromise.success(function(data){
                if(data.code == 200){
                    var list = data.rst.data.items;
                    if(vm.tableApi) { vm.tableApi.selection.clearSelectedRows(); }
                    genTable(vm.tableOptions, vm.tableHeader, list, function (data) {
                        var dataLen = data.data.length;
                        if(dataLen) {
                            vm.loadData = true;
                            if(dataLen < 10) {
                                angular.element('.grid').height(
                                    data.data.length * data.rowHeight + data.headerRowHeight + 15
                                );
                            } else {
                                angular.element('.grid').height(
                                    10 * data.rowHeight + data.headerRowHeight + 15
                                );
                            }
                            vm.table = data;
                            vm.tableSelectRow();
                        } else {
                            vm.loadData = false;
                            vm.tableApi = null;
                            vm.table = false;
                        }
                    })
                }
            });
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

    vm.emptyFn = function () {
        vm.checkAll = false;
        vm.allArr = [];
        vm.singleArr = [];
    };

    vm.singleArr = [];
    vm.allArr = [];
    vm.arriveList = [];
    vm.numberAdjustment = [];
    var updateSelected = function (action, v) {
        if (action == 'add') vm.singleArr.push(v);
        if (action == 'remove') vm.singleArr.splice(v,1);
    };
    $scope.updateSelection = function ($event, v, type) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, v, type);
    };

    vm.allCheck=function(dataList) {
        if (vm.checkAll) {
            vm.allArr = vm.dataList;
        } else {
            vm.allArr = [];
        }
    };



    //到库时间登记
    vm.DateRegister = function(){
        if(vm.singleArr.length == 0 && vm.allArr.length == 0){
            swal('请选择数据','','warning');return;
        }
        if(vm.singleArr.length !== 0) vm.arriveList = vm.singleArr;
        if(vm.allArr.length !== 0) vm.arriveList = vm.allArr;

      //  vm.arriveList.length == 1 ? vm.alertDate = $filter('date')(vm.arriveList[0].expectdate,'yyyy-MM-dd') : vm.alertDate = '';
        if(vm.arriveList.length == 1){
            vm.arriveList[0].actualdate ? vm.alertDate = $filter('date')(vm.arriveList[0].actualdate,'yyyy-MM-dd') : vm.alertDate = $filter('date')(vm.arriveList[0].expectdate,'yyyy-MM-dd');
        }else{
            vm.alertDate = '';
        }
        $("#DateRegister").dialog({
            autoOpen: false,
            width: 1000,
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
                        if(vm.alertDate){
                            _.forEach(vm.arriveList,function(item){
                                item.actualdate = vm.alertDate;
                                if(item.status == '预约提货') item.status = '提货完成'
                            });
                            var arrivalupdate = service.arrivalupdate({docs:vm.arriveList}).success(function(data){
                                if(data.code == 200){
                                    swal('保存成功','','success');
                                }else {
                                    swal(data.msg,'','error');
                                }
                            });
                        }else{
                            _.forEach(vm.arriveList,function(item){
                                if(item.status == '预约提货') item.status = '提货完成'
                                item.actualdate = item.expectdate;
                            });
                            var arrivalupdate = service.arrivalupdate({docs:vm.arriveList}).success(function(data){
                                if(data.code == 200){
                                    swal('保存成功','','success');
                                }else {
                                    swal(data.msg,'','error');
                                }
                            });
                        }

                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }

                }]
        });
        $("#DateRegister").dialog("open");
    }


    //箱数调整
    vm.ContainerNumberAdjustment = function(){
        if(vm.singleArr.length == 0 && vm.allArr.length == 0){
            swal('请选择数据','','warning');return;
        }
        if(vm.singleArr.length !== 0){
            vm.numberAdjustment = vm.singleArr;
            _.forEach(vm.numberAdjustment,function(item){      //新建一个预约提货箱数字段 双向绑定影响
                item.thnumnew = item.thnum;
            });
        }
        if(vm.allArr.length !== 0){
            vm.numberAdjustment = vm.allArr;
            _.forEach(vm.numberAdjustment,function(item){
                item.thnumnew = item.thnum;
            });
        }


        $("#theNumberBox").dialog({
            autoOpen: false,
            width: 1000,
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
                        var flag,nullthnum;;
                        _.forEach(vm.numberAdjustment,function(item){
                            if(item.thnumnew < item.dhnum){
                                flag = true;
                            }
                            if(!item.thnumnew){
                                nullthnum = true;
                            }
                            item.thnum = item.thnumnew;

                            if(item.gznum >= item.thnum){
                                item.status = '过账完成'
                            }else if(item.sjnum >= item.thnum){
                                item.status = '上架完成'
                            }else if(item.dhnum >= item.thnum){
                                item.status = '到货登记'
                            }
                        });
                        if(flag){
                            return swal('不允许小于到货箱数','','warning');
                        }
                        if(nullthnum){
                            return swal('请填写预约提货箱数','','warning');
                        }
                        var arrivalupdate = service.arrivalupdate({docs:vm.numberAdjustment}).success(function(data){
                            if(data.code == 200){
                                swal('保存成功','','success');
                            }else {
                                swal(data.msg,'','error');
                            }
                        });

                        $( this ).dialog( "close" );
                        $(".layer").hide();
                    }

                }]
        });
        $("#theNumberBox").dialog("open");


    }
    //作废
    vm.cancellationClick = function(){
        var newDate = new Date();
        if(vm.singleArr.length == 0 && vm.allArr.length == 0){
            swal('请选择数据','','warning');return;
        }
        if(vm.singleArr.length !== 0){
            var flag,_id = [];
            _.forEach(vm.singleArr,function(item){
                if(item.sjnum == 0 ){
                    flag = true;
                    item.status = '作废';
                    item.code = item.code + Date.parse(newDate);
                }else{
                    _id.push(item.transportid);
                }
            });
            if(flag){
                var arrivalupdate = service.arrivalupdate({docs:vm.singleArr}).success(function(data){
                        if(data.code == 200){
                            swal('作废成功','','success');
                            vm.search();
                        }else {
                            swal(data.msg,'','error');
                        }
                });
            }else{
                swal('不可以作废','单据号:'+_id.join(','),'warning');
                _id = [];
            }

        }
        if(vm.allArr.length !== 0){
            var flagAll,_idAll = [];
            _.forEach(vm.allArr,function(item){
                if(item.sjnum == 0){
                    flag = true;
                    item.status = '作废';
                    item.code = item.code + Date.parse(newDate);
                }else{
                    _idAll.push(item.transportid);
                }
            });
            if(flag){
                var arrivalupdate = service.arrivalupdate({docs:vm.allArr}).success(function(data){
                    if(data.code == 200){
                        swal('作废成功','','success');
                        vm.search();
                    }else {
                        swal(data.msg,'','error');
                    }
                });
            }else{
                swal('不可以作废','单据号:'+_idAll.join(','),'warning');
                _idAll = [];
            }
        }
    }
}]);


arriveCargoinfo.controller('arriveCargoinfoAddCtrl',['$scope','arriveCargoinfoService',function($scope,service){
    var vm = $scope;

    vm.addCreateList = [];
    vm.uploadList = [];
    //添加行项目
    vm.Createlist = function(){
        var objitem = {
            'transportid':'',    //货运单号
            'supplierid':'',     //供应商订单号
            // 'project':'',        //项目名称
            'thvolume':'',       //提货体积（方）
            'thnum':'',          //预约提货箱数
            'expectdate':'',     //预计到厂时间
            'createdate':'',        //预约创建时间
            'appointmentno':'',       //预约号
            'appointpepleno':''       //预约人工号
        };
        vm.addCreateList.push(objitem);
    }



    var updateSelected = function (action, v, index) {
        if (action == 'add') {
            v.Delidentification = true;
        }
        if (action == 'remove') {
            delete v.Delidentification;
        }
    };
    $scope.updateSelection = function ($event, v, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, v, index);
    };

    vm.allCheck=function($event) {
        if (vm.checkAll) {
            _.forEach(vm.addCreateList,function(item){
                item.Delidentification = true;
            });
            _.forEach(vm.uploadList,function(item){
                item.Delidentification = true;
            });
        } else {
            _.forEach(vm.addCreateList,function(item){
               delete item.Delidentification;
            });
            _.forEach(vm.uploadList,function(item){
                delete item.Delidentification;
            });
        }

    };


    vm.commonDel = function(){
        var addArr = [],uploadArr = [];
        _.forEach(vm.addCreateList,function(item){
            if(item.Delidentification){}else{addArr.push(item);}
        });
        _.forEach(vm.uploadList,function(item){
            if(item.Delidentification){}else{addArr.push(item);}
        });
        vm.addCreateList = addArr;
        vm.uploadList = uploadArr;
    }




    vm.addData = function(){
        var param = [],swalArr = [];
        if(vm.addCreateList.length == 0 && vm.uploadList.length == 0){
            swal('请添加数据','','warning');return
        }
        var requiredObj = $scope.arriveCargoForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.arriveCargoForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }


        function VerifyThreefields(param){        //1）	货运单号+预约号+预约人工号，三个字段合起来作为唯一值校验
            var  nullObj = {};
            _.forEach(param,function(item){
                if (item.transportid + item.appointmentno + item.appointpepleno != "") {
                    if (!nullObj[item.transportid + item.appointmentno + item.appointpepleno]) {
                        nullObj[item.transportid + item.appointmentno + item.appointpepleno] = true;
                    }else{
                        swalArr.push(item);
                    }
                }

            })
        }

        param = vm.addCreateList.concat(vm.uploadList);

        VerifyThreefields(param)

        if(swalArr.length !== 0){
            vm.repNumber = [];
            for(var i = 0 ; i < swalArr.length;i++){
                vm.repNumber.push('货运单号'+swalArr[i].transportid+'\n');
            }
            return swal({
                title:'保存失败',
                text: vm.repNumber+'重复单据' ,
                type:'error'
            })

        }


        var checkcode = service.checkcode({docs:param});
        checkcode.success(function(data){
            if(data.code == 200){
                var arrivalAdd = service.arrivalAdd({docs:param}).success(function(data){
                    if(data.code == 200){
                        swal({
                            title: "保存成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/arriveCargoinfoList';
                        });
                    }else{
                        swal(data.msg,'','error');
                    }
                })
            }else{
                vm.msg = []
                for(var i = 0 ; i < data.msg.length;i++){
                    vm.msg.push('货运单号'+data.msg[i]+'\n');
                }
                swal({
                    title:'保存失败',
                    text: vm.msg+'已存在' ,
                    type:'error'
                })
            }
        });

    }
}]);
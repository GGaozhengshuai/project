var productoutApp = angular.module('productoutApp', ['pageDirectives','formDirectives','uploadifyApp']);
productoutApp.service('productoutServices', function($http) {
    var service = {
        list: function (param) {
            return $http.post('/productout/list',param,{cache:false});
        },
        view: function (param) {
            return $http.post('/productout/read',param,{cache:true});
        },
        ApplySave: function (param) {
            return $http.post('/productout/save',param,{cache:true});
        },
        Apply: function (param) {
            return $http.post('/productout/createprocess',param,{cache:true});
        },
        orders: function (param) {
            return $http.post('/cargooutinfo/orders',param,{cache:true});
        },
        viewInside: function(param) {
            return $http.post('/cargooutinfo/read',param ,{cache:false});
        },
        saveAdd: function(param){
            return $http.post('/cargooutinfo/save',param ,{cache:false});
        },
        productoutAdd: function(param){
            return $http.post('/cargooutinfo/createprocess',param ,{cache:false});
        },
        create: function(param){
            return $http.post('/cargooutinfo/create',param ,{cache:false});
        },
        applyView: function(param) {
            return $http.post('/productout/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/productout/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/productout/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/productout/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/productout/recall',param ,{cache:false});
        },
        askupdate: function(param){ //查询放货
            return $http.post('/cargooutinfo/askupdate',param ,{cache:false});
        },
        updatedelivery: function(param){ //更新放货
            return $http.post('/cargooutinfo/updatedelivery',param ,{cache:false});
        },
        applyViewWH: function(param) {
            return $http.post('/cargooutinfo/detail',param ,{cache:false});
        },
        agreeWH: function(param){//同意
            return $http.post('/cargooutinfo/agree',param ,{cache:false});
        },
        disagreeWH: function(param){//驳回
            return $http.post('/cargooutinfo/disagree',param ,{cache:false});
        },
        cancelWH: function(param){//取消
            return $http.post('/cargooutinfo/cancel',param ,{cache:false});
        },
        recallWH: function(param){//召回
            return $http.post('/cargooutinfo/recall',param ,{cache:false});
        },
        constlist: function(param){//常量列表
            return $http.post('/cargooutinfo/constlist',param ,{cache:false});
        },
        stock: function(param){//库存数量
            return $http.post('/cargooutinfo/stock',param ,{cache:false});
        },
        getCountry: function () {
            return $http.get('/js/json/country.json', {cache: true});
        },
        material : function(param){
            return $http.post('/cargooutinfo/material',param,{cache : false});
        },
        getCountry2: function () {
            return $http.get('/enum/getnewcity', {cache: true});
        },
        nullify : function(param){
            return $http.post('/productout/nullify',param,{cache : false});
        },
        destination : function(param){
            return $http.post('/cargooutinfo/destination',param,{cache:false});
        },
        deliverystatus : function(param){
            return $http.post('/cargooutinfo/deliverystatus',param,{cache:false});
        },
        getprocesslog: function (param) {
            return $http.post('/productout/getprocesslog',param,{cache:false});
        }

    };
    return service;
});
productoutApp.controller('productoutOrderCtrl',['$scope','$state','$stateParams','productoutServices',function($scope,$state,$stateParams,productout){
    var contractno = $stateParams.id;
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($stateParams.id && $scope.orderno == ''){
                $scope.orderno = contractno;
                contractno = '';
            }
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,orderno:$scope.orderno,sapcode: $scope.sapcode, code: $scope.code, client: $scope.client, department: $scope.department,sale:$scope.sale,fromdate:$scope.fromdate,todate:$scope.todate,status:$scope.status};
            var customerPromise = productout.list(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    var enumclg = productout.constlist({});
    enumclg.success(function (data) {
        if (data.code == 200) {
            $scope.signWay=data.rst.enumTransType;
            $scope.enumCargooutType = data.rst.enumCargooutType;
            $scope.siteDepot = data.rst.enumDepot;
        } else {
            alert(data.msg);
        }
    })

    $scope.productoutChange=function(id,xtph){
        //if(xtph == '1'){
        var fhdbg = productout.askupdate({_id:id});
        fhdbg.success(function(data){
            if(data.code == 200){
                if(data.rst.update == 'yes') {
                    $state.go('productoutChange',{id:id});
                }else if(data.rst.update == 'no'){
                    swal(data.rst.msg, "", "error");
                    return false;
                }
            }else{
                swal({title:'',text:data.rst.msg,type:'error'});
            }
        })
        //}else{
        //    swal({title:'',text:'交货单属于人工配货，不允许变更',type:'warning'});
        //}

    }
    $scope.clickNullify = function(list){
        swal(
            {
                title: "是否将要已经配货完成的放货单作废？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '作废',
                allowOutsideClick:true
            },
            function () {
                var fhdzf = productout.askupdate({_id:list._id});
                fhdzf.success(function(data){
                    if(data.code == 200){
                        if(data.rst.update == 'yes') {
                            var nullify = productout.nullify({sapcode:list.sapcode,code:list.code});
                            nullify.success(function(data){
                                if(data.code == 200){
                                    $scope.search();
                                    swal('作废成功','','success');
                                }else{
                                    swal('作废失败','','error');
                                }
                            });
                        }else if(data.rst.update == 'no'){
                            swal(data.rst.msg+',不能作废' , "", "error");
                        }
                    }else{
                        swal({title:'',text:data.msg,type:'error'});
                    }
                })
            }
        );

    }

}]);
productoutApp.controller('productoutViewCtrl',['$scope','$stateParams','$state','productoutServices',function($scope,$stateParams,$state,productout){
    var temp={};
    var enumclg = productout.constlist({});
    enumclg.success(function (data) {
        if (data.code == 200) {
            $scope.signWay=data.rst.enumTransType;
            $scope.cargooutType = data.rst.enumCargooutType;
            $scope.enumCarrier = data.rst.enumCarrier;
            data.rst.enumDepot.forEach(function(i){
                temp[i.code] = i.name;
            });
            $scope.siteDepot = temp;
            var viewCont = productout.view({_id:$stateParams.id});
            viewCont.success(function(data) {
                if(data.code == 200){
                    $scope.viewList = [data.rst.model.dest];
                    $scope.invoiceCgList = data.rst.items;
                    $scope.cargo_DATA = data.rst.model;
                    if($scope.cargo_DATA.dest.lgort){
                        var lgort = $scope.cargo_DATA.dest.lgort.split(',');
                        var lgortArr = [];
                        for(var x in lgort){
                            lgortArr.push($scope.siteDepot[lgort[x]]);
                        }
                        $scope.kufang = lgortArr.join(',');
                    }
                    var getCountry = productout.getCountry2();
                    getCountry.success(function (data) {
                        // 存储地区数据信息
                        $scope.countryData = data;
                    });
                    $scope.getField = function(obj, f1, v1) {
                        return getField(obj, f1, v1);
                    };
                }else {
                    alert(data.msg);
                }
            });
        } else {
            alert(data.msg);
        }
    })

    $scope.ViewChange=function(id,xtph){
        //  if(xtph == '1'){
        var fhdbg = productout.askupdate({_id:id});
        fhdbg.success(function(data){
            if(data.code == 200){
                if(data.rst.update == 'yes') {
                    $state.go('productoutChange',{id:id});
                }else if(data.rst.update == 'no'){
                    swal(data.rst.msg, "", "error");
                    return false;
                }
            }else{
                swal({title:'',text:data.rst.msg,type:'error'});
            }
        })
        //}else{
        //    swal({title:'',text:'交货单已人工配货，不能变更',type:'warning'});
        //}

    }


    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = productout.getprocesslog({id: vm.cargo_DATA.code}); // 直接取值数据中 申请人（proposer）
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

productoutApp.controller('productoutWhCtrl',['$scope','$state','$stateParams','$rootScope','productoutServices',function($scope,$state,$stateParams,$rootScope,productout){
    $scope.billNum = function(orderno){
        if(orderno.indexOf('SON')>-1){
            $scope.type = 'contract';
        }else if(orderno.indexOf('JCD')>-1){
            $scope.type = 'lend';
        }
    }

    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,orderno:$scope.orderno,sale:$scope.sale,client:$scope.client,type:$scope.type};
            var purchasePromise = productout.orders(param);
            purchasePromise.success(function(data){
                if(data.code == 200){
                    if($scope.type=='lend'){
                        $scope.dataList = data.rst.data.items;
                        $scope.showloanBill = true;
                        $scope.showContract = false;
                    }else{
                        $scope.showloanBill = false;
                        $scope.showContract = true;
                        $scope.dataList = data.rst.data.items;
                        _.forEach($scope.dataList,function(item){
                            if(item.ordertype == '分销' && ($rootScope.busiRoles[0].code == 'xinxi_fenxiaofanghuozhuanyuan' || $rootScope.busiRoles[0].code == 'xinxi_gongyinglianzhuanyuan' || $rootScope.busiRoles[0].code == 'xinxi_gongyinglianzhuguan' || $rootScope.busiRoles[0].code == 'xinxi_gongyinglianzhuanyuan1')){
                                item.gylpower = true;
                            }else{
                                item.gylpower = false;
                            }
                        });

                    }

                } else {
                    swal({
                        title:'',
                        text:data.msg,
                        type:'warning'
                    })
                }

            });
            $scope.paginationConf.pagePromise = purchasePromise;
        }

    };

    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search();
        }
    };
    //查询能不能维护 或者放货
    $scope.searchtest = function(code,ordercode,status){
        if(status == 'cargooutinfo'){
            var deliverystatus = productout.deliverystatus({ordercode:ordercode,orderno:code});
            deliverystatus.success(function(data){
                if(data.code == 200){
                    if(data.rst.cargo != 'inprocess'){
                        $state.go('productoutWhAdd',{code:code});
                        //    window.open('index.html#/productoutWhAdd/'+code);
                    }else{
                        swal('该维护地址已在审批中','','warning');
                    }
                }
            });
        }else if(status == 'productout'){
            var deliverystatus = productout.deliverystatus({ordercode:ordercode,orderno:code});
            deliverystatus.success(function(data){
                if(data.code == 200){
                    if(data.rst.saleorder != 'inprocess' && data.rst.saleorder != 'invalid'){
                        $state.go('productoutAdd',{ordercode:ordercode,orderno:code});
                        //window.open('index.html#/productoutAdd?ordercode='+ordercode+'&orderno='+code);
                    }else{
                        var msg = '放货维护审批中，不能放货';
                        if(data.rst.saleorder == 'invalid'){
                            msg = '该合同已全部放货'
                        }
                        swal(msg,'','warning');
                    }
                }
            });
        }
    }
}]);

productoutApp.controller('productoutWhAddCtrl',['$scope','$stateParams','$state','productoutServices',function($scope,$stateParams,$state,productout){
    var Filedata = $scope.Filedata =[];
    var array=[];  //存储内部物料编码
    var orderAdd = {orderno:$stateParams.code};
    var productoutStatus;
    var orderAddproductout = productout.viewInside(orderAdd);
    orderAddproductout.success(function(data){
        if(data.code == 200){
            productoutStatus = data.rst.model.inprocess;
            if(data.rst.model.inprocess == 'yes'){
                $scope.inprocessBtn = false;  //提交按钮
                $scope.tabOne = false;   //标题
                $scope.tabTwo = true;
                $scope.controlBtn = false;    //新增 删除  导入按钮
            }else{
                $scope.inprocessBtn = true;
                $scope.tabOne = true;
                $scope.tabTwo = false;
                $scope.controlBtn = true;
            }
            $scope.Cglist = data.rst.items;
            $scope.ORDER_DARA = data.rst.model;
            if($scope.ORDER_DARA.attachment.length != 0){
                $scope.uploadArr = $scope.ORDER_DARA.attachment;
            }
            var enumclg = productout.constlist({});
            enumclg.success(function (data) {
                if (data.code == 200) {
                    $scope.enumSourceType=data.rst.enumSourceType;
                    $scope.signWay=data.rst.enumSignType;
                } else {
                    alert(data.msg);
                }
            })
            $scope.getField = function(obj, f1, v1) {
                return getField(obj, f1, v1);
            };
            var getCountry = productout.getCountry2();
            getCountry.success(function (data) {
                // 存储地区数据信息
                $scope.countryData = data ;
            });
        }else{
            swal({title:'', text:data.msg, type:'error'});
        }
    });
    //省市联动
    var watchExcel = $scope.$watchCollection ('Filedata', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
        $scope.Btndis = newValue.every(function(item){
            return item.orderno.toLowerCase() ==  $scope.ORDER_DARA.code.toLowerCase();
        });
        console.log($scope.Btndis)
    });
    //新增
    $scope.add=function(){
        if(productoutStatus == 'yes'){
            return false;
        }
        var obj={source:'neo',receiver:'',mobile:'',phone:'',province:'',city:'',address:'',postcode:'',sign:'收货人签字+日期',site:'',items:[]}
        $scope.Cglist.push(obj);
        $scope.editConsole=false; //保存按钮
        $scope.applyConsole=false; //审批按钮
    }

    //删除
    $scope.delete=function(idx,statue){
        if(productoutStatus == 'yes'){
            return false;
        }
        if(statue == 'addList'){
            $scope.Cglist.splice(idx,1);
        }else if(statue == 'fileList'){
            $scope.Filedata.splice(idx,1);
        }
    }
    $scope.allCheck = function(){
        var parent = $("#cgList").find(".allist").eq(0);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.Cglist){
                $scope.Cglist[x].rightAdd = true;
            }
            for(var j in $scope.Filedata){
                $scope.Filedata[j].fileAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.Cglist){
                delete  $scope.Cglist[x].rightAdd;
            }
            for(var j in $scope.Filedata){
                delete $scope.Filedata[j].fileAdd;
            }
        }
    }
    $scope.checkDel = function(idx){
        var parent = $("#cgList").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.Cglist){
                $scope.Cglist[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.Cglist){
                delete  $scope.Cglist[idx].rightAdd;
            }

        }
    }
    $scope.filelist = function(idx){
        var parent = $("#cgList").find(".listError").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.Filedata){
                $scope.Filedata[idx].fileAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.Filedata){
                delete  $scope.Filedata[idx].fileAdd;
            }

        }
    }
    $scope.Delist = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.Cglist.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.Filedata.forEach(function(item){
            if(item.fileAdd){

            }else{
                errorArr.push(item)
            }
        });
        $scope.Cglist = rightArr;
        $scope.Filedata = errorArr;
    }
    $scope.addData = function(data,statue){
        if($scope.Cglist.length <= 0 && $scope.Filedata.length <= 0){
            swal("请添加数据", "", "warning");
            return false;
        }
        var objUpload = [];
        $('.formUpStyle').find('a').each(function(i,idx){
            var obj = {};
            obj.filePath = $(this).attr('href');
            obj.fileName = $('.showImg a').eq(i).html();
            objUpload.push(obj);

        });
        $scope.ORDER_DARA.attachment = [];
        $scope.ORDER_DARA.attachment = $scope.ORDER_DARA.attachment.concat(objUpload);
        var arr=$scope.Cglist.concat($scope.Filedata);
        var param={doc:{model:data,items:arr},processId:$scope.processId,nodeId:$scope.nodeId}
        param.shenpi = 'shenpi';
        if(statue == "save"){
            var addInside = productout.saveAdd(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    /*$scope.editConsole = false;
                     $scope.applyConsole = true;*/
                    if($scope.editAdd){
                        $scope.applyConsole = false;
                    }
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var applyAdd = productout.productoutAdd(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        //swal("提交成功", "", "success");
                        swal({
                            title: "提交成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/productoutOrder';
                        });
                    }else {
                        alert(data.msg);
                    }
                });
            };
            var addInside = productout.saveAdd(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.candidates = data.rst.candidates;
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                        $scope.receivers = data.rst.candidates[0].receivers;
                        param.candidates = data.rst.candidates;
                        $("#approversDialog").dialog({
                            autoOpen: false,
                            modal: true,
                            width: 500
                        });
                        $("#approversDialog").dialog("open");
                    } else {
                        $scope.applyFn(-1);
                    }
                } else {
                    swal(data.msg, '', 'warning');
                }
            })
        }
    }
}]);
//放货单申请
productoutApp.controller('productoutAddCtrl',['$scope','$stateParams','$filter','productoutServices',function($scope,$stateParams,$filter,productout){
    var array = [];
    var R05Array = []; /*存储R05物料数组*/
    var resultR05Array = [];  //保存数据比较
    var ZCP5ServiceArray = []; //存储ZC05类型物料
    var ZCP5ServiceArrayError = []; //非ZCP5类型物料
    var XZZCP5Array = []; //选择的ZCP5类型物料
    var XZZCP5ArrayError = [];  //选择的非ZCP5的物料
    var AllZCP5ServiceMaterial = [];  // 全是服务物料
    var XZFR05 = [];  //选中非R05的物料存储
    var storehouse;  //存储库房名称
    var lgortArr = [];   //-------
    var lgortcode;      //-------
    $scope.addCgList = [];
    $scope.glCgList = [];
    $scope.Filedata = [];
    var temp ={};
    var ordercode = $stateParams.ordercode;
    var orderno = $stateParams.orderno;
    var viewCont=productout.create({ordercode:ordercode,orderno:orderno});
    viewCont.success(function(data){
        if(data.code == 200){
            $scope.ADD_DATA=data.rst.model;
            if($scope.ADD_DATA.ordertype == 'ZC02'){
                $scope.Required = true;
            }else{
                $scope.Required = false;
            }
            $scope.ADD_DATA.logistics.transtype = $scope.ADD_DATA.dest.transtype;
            $scope.addressMsg = data.rst.model.dest;
            var cgl = productout.constlist({});
            cgl.success(function (data) {
                if (data.code == 200) {
                    $scope.siteDepot=data.rst.enumDepot;
                    $scope.enumTransType=data.rst.enumTransType;
                    $scope.MTART = data.rst.MTART;
                    $scope.enumDepotFX = data.rst.enumDepotFX;    //库房新枚举
                    $scope.enumCarrier = data.rst.enumCarrier;
                    data.rst.enumDepot.forEach(function(i){
                        temp[i.code] = i.name;
                    });
                    $scope.house = temp;
                } else {
                    alert(data.msg);
                }
            })
        }else{
            alert(data.msg);
        }
    });
    $scope.fzDate = function(deliverydate){
        $scope.ADD_DATA.logistics.expectdate = deliverydate;
    }
    $scope.addressADD = function(){
        var deliverystatus = productout.deliverystatus({ordercode:$scope.ADD_DATA.ordercode,orderno:$stateParams.orderno});
        deliverystatus.success(function(data){
            if(data.code == 200){
                if(data.rst.cargo == 'inprocess' && data.rst.saleorder == 'valid'){
                    swal('放货信息维护审批中，不能放货','','warning');
                }else{
                    var addredssMsg =productout.destination({orderno:$stateParams.orderno});
                    addredssMsg.success(function(data){
                        if(data.code == 200){
                            $( "#addressBox" ).dialog({
                                autoOpen: false,
                                width: 900,
                                height:500,
                                modal: true
                            });
                            $( "#addressBox" ).dialog( "open" );
                            $scope.addressList = data.rst.items;
                        }else{
                            swal(data.msg,'','error');
                        }
                    });
                }
            }
        });

    }
    $scope.selectAddress = function(item){
        if(item.contact == '' ||  item.mobile == ''|| item.province == '' || item.city =='' || item.address == ''){
            swal('信息不完整,请先进行放货地址维护','','warning');
            return false;
        }else{
            $scope.glCgList = [item];
            $scope.glCgList.forEach(function(item){
                $scope.ADD_DATA.logistics.province = item.province;
            });
            $scope.dest = $.extend({},item,$scope.addressMsg);
        }

        $( "#addressBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }

    var getCountry = productout.getCountry2();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.addMaterial=function(){
        array = [];
        R05Array = [];
        ZCP5ServiceArray = [];
        ZCP5ServiceArrayError = [];
        AllZCP5ServiceMaterial = [];
        var materialArr = productout.material({ordercode:$scope.ADD_DATA.ordercode});
        materialArr.success(function(data){
            if(data.code == 200){
                //判断能否进行放货
                if(data.rst.sapmsg.length !== 0){
                    swal({
                        title:'',
                        text:data.rst.sapmsg.join(';'),
                        type:'warning'
                    });
                    return false;
                }
                $scope.glaList = data.rst.data;
                for( var key=0; key < $scope.glaList.length;key++){
                    array.push($scope.glaList[key].code);
                    if($scope.glaList[key].sybz == 'R05' && $scope.glaList[key].sum !== 0){
                        R05Array.push($scope.glaList[key]);
                    }
                    if($scope.glaList[key].category == 'ZCP5' && $scope.glaList[key].sum != 0){
                        ZCP5ServiceArray.push($scope.glaList[key]);
                    }
                    if($scope.glaList[key].category != 'ZCP5' && $scope.glaList[key].sum != 0){
                        ZCP5ServiceArrayError.push($scope.glaList[key]);
                    } else{
                        if($scope.glaList[key].sum != 0){
                            AllZCP5ServiceMaterial.push($scope.glaList[key]);
                        }
                    }
                    if($scope.glaList[key].sum == 0){
                        $scope.glaList.splice(key,1);
                        key--;
                    }else{
                        var wuliao = $scope.glaList[key];
                        wuliao.count = wuliao.sum;
                        wuliao.num = '';
                        for( var i in  $scope.addCgList){ //遍历地址列表
                            var addr = $scope.addCgList[i];
                            if( wuliao.posnr == addr.posnr){ //该地址已经有选择该物料
                                wuliao.num = Number(addr.sum);
                            }else{
                                wuliao.count -= addr.sum

                            }
                        }
                    }
                }
                if(storehouse){
                    $scope.currentAddress = storehouse;
                    var material = productout.stock({lgort:$scope.currentAddress,code:array,clientid:$scope.ADD_DATA.contract.clientid,saleid:$scope.ADD_DATA.contract.saleid});
                    material.success(function(data){
                        if (data.code == 200) {
                            for(var x in $scope.glaList){
                                var change = false;
                                for(var j in data.rst.data){
                                    if($scope.glaList[x].code == data.rst.data[j].code){
                                        $scope.glaList[x].stockNum = data.rst.data[j].stock;
                                        $scope.glaList[x].yzy = data.rst.data[j].yzy;
                                        $scope.glaList[x].kzy = data.rst.data[j].kzy;
                                        // $scope.glaList[x].change = true;
                                        change = true;
                                    }
                                }
                                if(!change){
                                    $scope.glaList[x].stockNum = 0;
                                    $scope.glaList[x].yzy = 0;
                                    $scope.glaList[x].kzy = 0;
                                }
                            }
                            // for(var i = 0; i<$scope.glaList.length; i++){
                            //     if($scope.glaList[i].change){
                            //         delete $scope.glaList[i].change;
                            //     }else{
                            //         $scope.glaList[i].stockNum = 0;
                            //         $scope.glaList[i].yzy = 0;
                            //         $scope.glaList[i].kzy = 0;
                            //     }
                            // }
                            $scope.STOCK=true;
                        } else {
                            alert(data.msg);
                        }
                    });
                }
                $( "#cusBox" ).dialog({
                    autoOpen: false,
                    width: 1100,
                    height:500,
                    modal: true
                });
                $( "#cusBox" ).dialog( "open" );
            }else{
                alert(data.msg);
            }
        });

    }
    $scope.getUploadCallback = function(uploadCallData){      //处理上传返回数据
        var ifnum = [],ifnumerr = [];
        for(var i = 0; i < $scope.glaList.length; i++){
            for(var x = 0 ; x < uploadCallData.right.length ; x++){
                if(uploadCallData.right[x].posnr == $scope.glaList[i].posnr){
                    $scope.glaList[i].num = uploadCallData.right[x].num;
                    if($scope.glaList[i].num){
                        $scope.glaList[i].checkAll=true;      //自动勾选有值的物料
                        ifnum.push($scope.glaList[i]);
                    }
                }
            }
            if($scope.glaList[i].num ==''){
                ifnumerr.push($scope.glaList[i]);
            }
        }
        $scope.glaList = ifnum.concat(ifnumerr);     //本次放货数有值的放在最前面
        if(uploadCallData.error){
            var uploadErrorArr = [];
            for(var x = 0;x < uploadCallData.error.length; x++){
                uploadErrorArr.push(uploadCallData.error[x].code);
                swal({
                    title:'',
                    text:'编号'+uploadErrorArr.join(',')+'的物料没有可放货数量',
                    type:'warning'
                });
            }
        }
    }
    // 上传下载
    $scope.excleConf = {
        formData:{ordercode:$stateParams.ordercode},
        buttonText:'上传清单',
        uploader:'/productout/uploadmaterial'
    };
    // # @bug5592  @wangjingfeng  @20170320
    $scope.excleConfw = {
        formData:{ordercode:$stateParams.ordercode},
        buttonText:'上传清单',
        uploader:'/productout/uploadmaterial_w'
    };
    $scope.downLoad = function(){
        window.open('/productout/exportmaterial?ordercode=' + $stateParams.ordercode);
    }

    $scope.STOCK=false;
    $scope.close = function(){    /*关闭窗口*/
        R05Array = [];
        ZCP5ServiceArray = [];
        ZCP5ServiceArrayError = [];
        AllZCP5ServiceMaterial = [];
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.allCheck = function($event){
        var checkbox = $event.target;
        $scope.checkAll= checkbox.checked ? true : false;
        if(checkbox.checked){
            $scope.glaList.forEach(function(item){
                item.checkAll=true;
            })
        }
        if($scope.checkAll){
            $scope.glaList.forEach(function(item){
                if(item.num > item.sum){
                    swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                    checkbox.checked=false;
                    item.checkAll=false;
                    return false;
                }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) >= Number(item.sum)){
                    swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                    checkbox.checked=false;
                    item.checkAll=false;
                    return false;
                }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) < Number(item.sum)){
                    swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                    checkbox.checked=false;
                    item.checkAll=false;
                    return false;
                }else if('' == item.num){
                    item.num = item.sum
                }
            })
        }else{
            $scope.glaList.forEach(function(item){
                item.checkAll=false;
                item.num="";
            })
        }

    }

    $scope.singleCheck = function(idx,list){
        var parent = $("#wlTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
            for(var x in $scope.glaList){
                if(storehouse){
                    if(Number($scope.glaList[idx].num) > (Number($scope.glaList[idx].yzy) + Number($scope.glaList[idx].kzy)) &&　Number($scope.glaList[idx].num) >= Number($scope.glaList[idx].sum)){
                        swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
                        check.removeAttr("checked");
                        return false;

                    }else if(Number($scope.glaList[idx].num) > (Number($scope.glaList[idx].yzy) + Number($scope.glaList[idx].kzy)) &&　Number($scope.glaList[idx].num) < Number($scope.glaList[idx].sum)){
                        swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
                        check.removeAttr("checked");
                        return false;
                    }
                }else{
                    if(Number($scope.glaList[idx].num) > Number($scope.glaList[idx].sum)){
                        swal('本次放货数量不能大于未放货数量','','warning');
                        check.removeAttr("checked");
                    }
                }

            }
        } else {
            check.removeAttr("checked");
        }
    }

    $scope.stockSearch=function(lgort){
        storehouse =lgort;
        if(!lgort){
            for(var i in $scope.glaList){
                $scope.glaList[i].stockNum= 0;
            }
        }else{
            var material = productout.stock({lgort:lgort,code:array,clientid:$scope.ADD_DATA.contract.clientid,saleid:$scope.ADD_DATA.contract.saleid});
            material.success(function (data) {
                if (data.code == 200) {
                    for(var x in $scope.glaList){
                        for(var j in data.rst.data){
                            if($scope.glaList[x].code == data.rst.data[j].code){
                                $scope.glaList[x].stockNum = data.rst.data[j].stock;
                                $scope.glaList[x].yzy = data.rst.data[j].yzy;
                                $scope.glaList[x].kzy = data.rst.data[j].kzy;
                                $scope.glaList[x].change = true;
                            }
                        }
                    }
                    for(var i = 0; i<$scope.glaList.length; i++){
                        if($scope.glaList[i].change){
                            delete $scope.glaList[i].change;
                        }else{
                            $scope.glaList[i].stockNum = 0;
                            $scope.glaList[i].yzy = 0;
                            $scope.glaList[i].kzy = 0;
                        }
                    }
                    $scope.STOCK=true;
                } else {
                    alert(data.msg);
                }
            })
        }

    }
    $scope.addSelect=function(){
        var objMaterialArr = [];
        XZZCP5Array = [];
        XZZCP5ArrayError = [];
        resultR05Array = [];
        if($scope.Required == true && storehouse == undefined || storehouse == ''){
            swal('请选择库房','','warning');
            return false;
        }

        $scope.fylgort(storehouse);   ///翻译多个库房

        var addArr = $scope.addCgList;
        var wwList = [];
        var ckbox = $("#wlTable").find("[checked='checked']");
        $(ckbox).each(function(key,value){
            var par = $(this).parent().parent();
            var arr = {};
            arr.posnr = par.find("td:eq(1)").html();
            arr.code = par.find("td:eq(2)").html();
            arr.oemcode = par.find("td:eq(3)").html();
            arr.model = par.find("td:eq(4)").html();
            arr.note = par.find("td input:eq(1)").val();
            arr.category = par.find("td input:eq(2)").val();
            arr.total = par.find("td:eq(7)").html();
            arr.price = par.find("td:eq(8)").html();
            arr.sum = par.find("td input:eq(3)").val();
            arr.sybz = par.find("td input:eq(4)").val();

            //bug6935   需要两个字段判断
            arr.stock = par.find("td:eq(11)").html();
            arr.pstyv = par.find("td:eq(12)").html();
            if($scope.STOCK == true){
                arr.yzy = par.find("td:eq(13)").html();
                arr.kzy = par.find("td:eq(14)").html();
                arr.stockNum = par.find("td:eq(15)").html();
            }

            //2016.9.6 放货增加字段
            arr.lgort = storehouse;
            arr.zprice = '';
            arr.amount = '';
            wwList.push(arr);
        });

        for(var err in wwList){
            if(wwList[err].sum == ''){
                swal('请填写本次放货数量','','warning');
                return false;
            }else if(Number(wwList[err].sum) == 0){
                swal('本次放货数量不能为0','','warning');
                return false;
            }
            /*for(var mrr in $scope.addCgList){
                if(wwList[err].posnr == $scope.addCgList[mrr].posnr){
                    $scope.addCgList.splice(mrr,1);
                }
            }*/
            if(wwList[err].sybz == 'R05'){
                resultR05Array.push(wwList[err]);
            }else {
                XZFR05.push(wwList[err]);
            }
            if(wwList[err].category == 'ZCP5'){
                XZZCP5Array.push(wwList[err]);
            }else{
                XZZCP5ArrayError.push(wwList[err]);
            }


            if(Number(wwList[err].sum) > Number(wwList[err].total)){
                swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                return false;
            }else if(Number(wwList[err].sum) > (Number(wwList[err].yzy) + Number(wwList[err].kzy)) &&　Number(wwList[err].sum) >= Number(wwList[err].total)){
                swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                return false;
            }else if(Number(wwList[err].sum) > (Number(wwList[err].yzy) + Number(wwList[err].kzy)) &&　Number(wwList[err].sum) < Number(wwList[err].total)){
                swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                return false;
            }
        }
        if(wwList.length == 0 ){
            swal('请选择物料','','warning');
            return false;
        }


        //2016.11.15校验物料
        /*
         *
         * 服务物（ZCP5）必须搭配非服务物料放货，
         * 或者，全是服务物料，不能剩下必须全部放货，
         * 借出转销售（R05类型）全部放货，不能剩下
         * ZCP5 物料和 R05 物料不冲突
         *
         * */
        //判断R05物料是否全部放货
        //if(wwList.length != R05Array.length && resultR05Array.length != 0){
        //    console.log(1);
        //    swal({
        //        title:'',
        //        text:'借出转销售必须单独全部放货',
        //        type:'warning'
        //    });
        //    resultR05Array = [];
        //    return false;
        //}
        if(resultR05Array.length == R05Array.length && R05Array.length !== 0 && wwList.length > resultR05Array.length){
            swal({
                title:'',
                text:'借出转销售必须单独全部放货',
                type:'warning'
            });
            resultR05Array = [];
            return false;
        }
        if(resultR05Array.length !== R05Array.length && resultR05Array.length !== 0){
            swal({
                title:'',
                text:'借出转销售物料必须全部放货',
                type:'warning'
            });
            resultR05Array = [];
            return false;
        }else if(resultR05Array.length == R05Array.length){
            for(var i=0;i<resultR05Array.length;i++){
                if(Number(resultR05Array[i].sum) != Number(resultR05Array[i].total)){
                    swal({
                        title:'',
                        text:'借出转销售物料必须全部放货',
                        type:'warning'
                    });
                    resultR05Array = [];
                    return false;
                }

            }
        }


        //服务物料判断逻辑
        if(resultR05Array.length == 0 && ZCP5ServiceArray.length != 0){
            if(XZZCP5ArrayError!=0 && XZZCP5Array.length == 0){
                var flag = XZZCP5ArrayError.every(function(item){
                    return ZCP5ServiceArrayError.length == XZZCP5ArrayError.length  && Number(item.sum) == Number(item.total)
                });
                if(flag){
                    swal({
                        title:'',
                        text:'不能只剩下服务物料',
                        type:'warning'
                    });
                    XZZCP5Array = [];
                    XZZCP5ArrayError = [];
                    return false;
                }
            }else if(XZZCP5Array.length == ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                var check = XZZCP5ArrayError.every(function(item){
                    return Number(item.sum) == Number(item.total)
                });
                var check1 = XZZCP5Array.some(function(item){
                    return Number(item.sum) != Number(item.total)
                });
                console.log(check,check1);
                if(check == true && check1 == true){
                    swal({
                        title:'',
                        text:'不能只剩下服务物料',
                        type:'warning'
                    });
                    return false;
                }
            }else if(XZZCP5Array.length != ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                console.log(3)
                var check2 = XZZCP5ArrayError.every(function(item){
                    return Number(item.sum) == Number(item.total)
                });
                console.log(check2);
                console.log(XZZCP5ArrayError.length == ZCP5ServiceArrayError.length && check2 == true)
                if(XZZCP5ArrayError.length == ZCP5ServiceArrayError.length && check2 == true){
                    swal({
                        title:'',
                        text:'不能只剩下服务物料',
                        type:'warning'
                    });
                    return false;
                }
            }

            if(AllZCP5ServiceMaterial.length != XZZCP5Array.length && ZCP5ServiceArrayError.length == 0){
                swal('全是服务物料必须全部放货','','warning');
                return false;
            }
        }

        //********************************------------------*******************************************************
        if(storehouse){
            for(var i = 0 ;i < $scope.addCgList.length; i++){
                for(var j = 0 ; j < wwList.length ; j++){
                    if($scope.house[$scope.addCgList[i].lgort].indexOf('SN') > -1 && wwList[j].lgort == 'NP01'){
                        swal('手动配货库房不能和自动配货库房同时存在', '', 'warning');
                        return false;
                    }else if($scope.addCgList[i].lgort != 'NP01' && $scope.addCgList[i].lgort != wwList[j].lgort && wwList[j].lgort != 'NP01' && !$scope.house[wwList[j].lgort].indexOf('SN') > -1){
                        swal('只能一个实物库房','','warning');
                        return false;
                    }else if($scope.addCgList[i].lgort == 'NP01' && $scope.house[wwList[j].lgort].indexOf('SN') > -1){
                        swal('手动配货库房不能和自动配货库房同时存在', '', 'warning');
                        return false;
                    }else if($scope.addCgList[i].posnr == wwList[j].posnr &&  $scope.addCgList[i].lgort == wwList[j].lgort){
                        $scope.addCgList.splice(i,1);
                    }
                }
            }
        }

        //6935bug  项目放货  提前开票行项目放货增强校验
        var  vm = $scope;
        if(vm.Required == false){
            for(var i = 0 ; i < wwList.length; i++){
                if(vm.ADD_DATA.ordertype == 'ZC01' && wwList[i].pstyv == 'ZTA2' && Number(wwList[i].sum) > Number(wwList[i].stock)){
                    objMaterialArr.push(wwList[i].code + '物料为提前开票物料,库存数量为'+ wwList[i].stock+ ',放货数量不能大于库存数量');
                }
            }
        }
        if(vm.Required == false && objMaterialArr.length !== 0){
            return swal('',objMaterialArr,'warning');
        }
        $scope.addCgList =  $scope.addCgList.concat(wwList);

        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();


    }

    $scope.fylgort = function(lgort){
        var fxlgortArr = [];
        if(lgort){
            lgortArr.push(lgort);
            for(var x in lgortArr){
                fxlgortArr.push( $scope.house[lgortArr[x]]);
            }
            $scope.Lgort = fxlgortArr;
            lgortcode = lgortArr.join(',');
        }
    }
    //本次放货数量不能大于可放货数量
    $scope.changeNum=function(item){
        if(item.num == ''){
            return false;
        }else if(Number(item.num) > Number(item.sum) && $scope.STOCK == false){
            swal('放货数不能大于未放货数,请更改本次放货数量','','warning');
            return false;

        }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) >= Number(item.sum)){
            swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
            return false;

        }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) < Number(item.sum)){
            swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
            return false;
        }


    }

    //删除
    $scope.allistCheck = function($event){
        var checkbox = $event.target;
        $scope.checkAllDel= checkbox.checked ? true : false;
        if($scope.checkAllDel){
            $scope.addCgList.forEach(function(item){
                item.rightAdd = true;
            });
        }else{
            $scope.addCgList.forEach(function(item){
                delete  item.rightAdd;
            });
        }
    }
    $scope.checkDel = function(idx){
        var parent = $("#addCglist").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.addCgList){
                $scope.addCgList[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.addCgList){
                delete  $scope.addCgList[idx].rightAdd;
            }

        }
    }
    $scope.Delist = function(){
        var rightArr = [];
        $scope.addCgList.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.addCgList = rightArr;
        $scope.all = false;
        $scope.checkAllDel = false;
    }
    $scope.addData = function(data,statue){
        var today = new Date();
        var str = $filter('date')(today,'yyyy-MM-dd');
        if(Date.parse($scope.ADD_DATA.deliverydate) < Date.parse(str)){
            swal('要求到货日期不能小于今天','','warning');
            return false;
        }

        data.dest = $scope.dest;
        if(storehouse && $scope.dest){
            data.dest.lgort = lgortcode+'';
        }
        if($scope.glCgList.length <= 0){
            swal('请选择发货地址','','warning');
            return false;
        }
        if($scope.addCgList.length <= 0){
            swal('请选择物料','','warning');
            return false;
        }
        var arr = $scope.addCgList;
        var param={doc:{model:data,items:arr},processId:$scope.processId,nodeId:$scope.nodeId}
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.doc.model.task = 'neo';
        if(statue == "save"){
            var addInside = productout.ApplySave(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            // 物料校验最后一次校验
            XZZCP5Array = [];
            XZZCP5ArrayError = [];
            resultR05Array = [];
            for(var err in $scope.addCgList) {
                if ($scope.addCgList[err].sybz == 'R05') {
                    resultR05Array.push($scope.addCgList[err]);
                } else {
                    XZFR05.push($scope.addCgList[err]);
                }
                if ($scope.addCgList[err].category == 'ZCP5') {
                    XZZCP5Array.push($scope.addCgList[err]);
                } else {
                    XZZCP5ArrayError.push($scope.addCgList[err]);
                }
            }

            if(resultR05Array.length == R05Array.length && R05Array.length !== 0 && $scope.addCgList.length > resultR05Array.length){
                swal({
                    title:'',
                    text:'借出转销售必须单独全部放货',
                    type:'warning'
                });
                resultR05Array = [];
                return false;
            }
            if(resultR05Array.length !== R05Array.length && resultR05Array.length !== 0){
                swal({
                    title:'',
                    text:'借出转销售物料必须全部放货',
                    type:'warning'
                });
                resultR05Array = [];
                return false;
            }else if(resultR05Array.length == R05Array.length){
                for(var i=0;i<resultR05Array.length;i++){
                    if(Number(resultR05Array[i].sum) != Number(resultR05Array[i].total)){
                        swal({
                            title:'',
                            text:'借出转销售物料必须全部放货',
                            type:'warning'
                        });
                        resultR05Array = [];
                        return false;
                    }

                }
            }


            //服务物料判断逻辑
            if(resultR05Array.length == 0 && ZCP5ServiceArray.length != 0){
                if(XZZCP5ArrayError!=0 && XZZCP5Array.length == 0){
                    var flag = XZZCP5ArrayError.every(function(item){
                        return ZCP5ServiceArrayError.length == XZZCP5ArrayError.length  && Number(item.sum) == Number(item.total)
                    });
                    if(flag){
                        swal({title:'', text:'不能只剩下服务物料', type:'warning'});
                        XZZCP5Array = [];
                        XZZCP5ArrayError = [];
                        return false;
                    }
                }else if(XZZCP5Array.length == ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                    var check = XZZCP5ArrayError.every(function(item){return Number(item.sum) == Number(item.total)});
                    var check1 = XZZCP5Array.some(function(item){return Number(item.sum) != Number(item.total)});
                    console.log(check,check1);
                    if(check == true && check1 == true){
                        swal({title:'', text:'不能只剩下服务物料', type:'warning'});return false;
                    }
                }else if(XZZCP5Array.length != ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                    var check2 = XZZCP5ArrayError.every(function(item){return Number(item.sum) == Number(item.total)});
                    if(XZZCP5ArrayError.length == ZCP5ServiceArrayError.length && check2 == true){
                        swal({title:'', text:'不能只剩下服务物料', type:'warning'});return false;
                    }
                }
                if(AllZCP5ServiceMaterial.length != XZZCP5Array.length && ZCP5ServiceArrayError.length == 0){
                    swal('全是服务物料必须全部放货','','warning');
                    return false;
                }
            }
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                param.comment = $scope.comment;     //提交审批原因  提交时需传至接口
                var applyAdd = productout.Apply(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        if(data.rst.status == '0'){
                            swal({
                                title: '提交成功',
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "返回列表",
                                closeOnConfirm: true
                            }, function () {
                                window.location.href = '/index.html#/productoutOrder';
                            });
                        }else if(data.rst.status == '1'){
                            swal({
                                title: '提交失败',
                                text:data.rst.sapmsg.join(';'),
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonColor: 'light blue',
                                confirmButtonText: "关闭",
                                closeOnConfirm: true
                            }, function () {
                                // window.location.href = '/index.html#/productoutWh';
                            });
                        }else{
                            swal({
                                title: "提交成功",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "返回列表",
                                closeOnConfirm: true
                            }, function () {
                                window.location.href = '/index.html#/productoutOrder';
                            });
                        }

                    }else {
                        alert(data.msg);
                    }
                }).error(function(error){
                    swal('服务器异常','放货单将保存到草稿,请约30分钟后在草稿中再次提交','error');
                });
            };
            // 2016-7-12
            // 放货提交时需要增加选择下一审批人操作
            var addInside = productout.ApplySave(param);
            addInside.success(function(data){
                $scope.candidates = data.rst.candidates;
                param.processId = $scope.processId = data.rst.processId;
                param.nodeId = $scope.nodeId = data.rst.nodeId;
                //console.log('save:',$scope.processId, $scope.nodeId,param.processId, param.nodeId)
                if(data.code == 200){
                    if( $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                        $scope.receivers = $scope.candidates[0].receivers;
                        param.candidates = data.rst.candidates;
                        $("#approversDialog").dialog({
                            autoOpen: false,
                            modal: true,
                            width: 500
                        });
                        $("#approversDialog").dialog("open");
                    } else {
                        $scope.applyFn(-1);
                    }
                }else {
                    alert(data.msg);
                }
            });


        }
    }
}]);
productoutApp.controller('productout',['$scope','$stateParams','$filter','$rootScope','productoutServices',function($scope,$stateParams,$filter,$rootScope,productout){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = productout.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.loading = false;
            $scope.ADD_DATA=data.rst.doc.model;
            $scope.glCgList=[data.rst.doc.model.dest];
            $scope.addCgList=data.rst.doc.items;
            $scope.doc = data.rst.doc;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.nodeType = data.rst.nodeType;
            $scope.qxxgDate = true;      //权限控制物流日期
            var cgl = productout.constlist({});
            cgl.success(function (data) {
                if (data.code == 200) {
                    $scope.cargooutType = data.rst.enumCargooutType;
                    $scope.enumCarrier = data.rst.enumCarrier;
                    $scope.enumTransType = data.rst.enumTransType;
                    var temp={};
                    data.rst.enumDepot.forEach(function(i){
                        temp[i.code] = i.name;
                    });
                    $scope.siteDepot = temp;
                    if($scope.ADD_DATA.dest.lgort){
                        var lgort = $scope.ADD_DATA.dest.lgort.split(',');
                        var lgortArr = [];
                        for(var x in lgort){
                            lgortArr.push($scope.siteDepot[lgort[x]]);
                        }
                        $scope.kufang = lgortArr.join(',');
                    }
                } else {
                    alert(data.msg);
                }
            })
            if($scope.ADD_DATA.logistics.expectdate){
                $scope.ADD_DATA.logistics.expectdate = $filter('date')($scope.ADD_DATA.logistics.expectdate,"yyyy-MM-dd");
            }
            if(data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
                if(data.rst.doc.model.zzph == '1'){
                    $scope.agreeBtn = false;
                    $scope.disagreeBtn = false;
                    $scope.cancelBtn = false;
                    $scope.textareaBtn = false;
                }
                //-------权限控制日期
                var newprev = $rootScope.billPrev;
                console.log(newprev);
                /* var person = $cookieStore.get("persion");
                 var prevs = person.user.newprev;*/
                if(newprev.approval_logistic_manager){
                    $scope.qxxgDate = false;//判断是否能够做修改日期
                    $scope.btLable = true;
                    $scope.required = true;
                }
            }
            if(data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active'){
                $scope.recallBtn = true;
                $scope.textareaBtn = true;
                if(data.rst.doc.model.zzph == '1'){
                    $scope.recallBtn = false;
                    $scope.textareaBtn = false;
                }
            }
            if($stateParams.myflag == 'mybegin'){
                $scope.editBtn = true;
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
                $scope.deleteBtn=true;
            }
            if(data.rst.doc.model.task == 'neo'){
                $scope.materialAdd = true;    //新增物料
                $scope.materialChange = false;   //变更物料
            }else if(data.rst.doc.model.task == 'update'){
                $scope.materialAdd = false;    //新增物料
                $scope.materialChange = true;   //变更物料
            }

            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ADD_DATA.contract.client, 'id':$scope.ADD_DATA.contract.clientid};
                $scope.$broadcast('transfer.type', param);
            } catch (e) {}

        }

    }).error(function(error){
        alert(error);
    });
    var getCountry = productout.getCountry2();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = productout.ApplySave(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        // 提交
        var requiredObj2 = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("请填写必填项", "", "warning");
            return false;
        }
        $scope.applyFn = function (selIndex) {
            var param = {};
            param.doc = $scope.doc;
            param.comment = applyObj.applyIdea;
            param.processId = $stateParams.processId;
            param.nodeId = $stateParams.nodeId;
            param.nodeType = $scope.nodeType;
            param.candidates = $scope.candidates;
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            var applyAgree = productout.agree(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    if(data.rst.sapmsg){
                        swal({
                            title:'',
                            text: data.rst.sapmsg,
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回我的单据",
                            closeOnConfirm: true
                        }, function(){ window.location.href='/index.html#/index'; });
                    }else{
                        swal({
                            title: "审批成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回放货申请待办",
                            closeOnConfirm: true
                        }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=放货申请&&controllercode=FHSQ'; });
                    }
                }else {
                    swal("提交失败！", '', "error");
                }
            }).error(function(error){
                alert(error);
            });
        };
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' && $scope.candidates[0].coop!=='and')){
            $scope.receivers = $scope.candidates[0].receivers;
            $("#approversDialog").dialog({
                autoOpen: false,
                modal: true,
                width: 500
            });
            $("#approversDialog").dialog("open");
        } else {
            $scope.applyFn(-1);
        }

    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = productout.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回放货申请待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=放货申请&&controllercode=FHSQ'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = productout.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回放货申请待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=放货申请&&controllercode=FHSQ'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = productout.recall(param);
        recall.success(function(data){
            if(data.code == 200){
                swal({
                    title: "召回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function(){  window.location.href='/index.html#/index'; });
            }else {
                swal(data.msg, '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyDelete = function(){//取消
        swal(
            {
                title: "确定删除吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            },
            function () {
                // window.location.href='/index.html#/myDraft';
                var param = {};
                param.processId = $stateParams.processId;
                param.nodeId = $stateParams.nodeId;
                param.comment = applyObj.applyIdea;
                var cancel = productout.cancel(param);
                cancel.success(function(data){
                    if(data.code == 200){
                        swal({
                            title: "删除成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回我的草稿",
                            closeOnConfirm: true
                        }, function(){   window.location.href='/index.html#/myDraft'; });
                    }else {
                        swal("删除失败！", '', "error");
                    }

                }).error(function(error){
                    alert(error);
                });
            }
        );

    }
}]);
productoutApp.controller('productoutEdit',['$scope','$stateParams','$filter','productoutServices',function($scope,$stateParams,$filter,productout){
    var R05Array = []; /*存储R05物料数组*/
    var resultR05Array = [];  //保存数据比较
    var ZCP5ServiceArray = []; //存储ZC05类型物料
    var ZCP5ServiceArrayError = []; //非ZCP5类型物料
    var XZZCP5Array = []; //选择的ZCP5类型物料
    var XZZCP5ArrayError = [];  //选择的非ZCP5的物料
    var AllZCP5ServiceMaterial = [];  // 全是服务物料
    var XZFR05 = [];  //选中非R05的物料存储
    var storehouse;  //存储库房名称
    var lgortArr = [];   //-------
    var lgortcode;      //-------
    var ordercode;    //销售订单号
    $scope.addCgList = [];
    $scope.glCgList = [];
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = productout.applyView(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ADD_DATA=data.rst.doc.model;
            ordercode = $scope.ADD_DATA.ordercode;
            if($scope.ADD_DATA.ordertype == 'ZC02'){
                $scope.Required = true;
            }else{
                $scope.Required = false;
            }
            $scope.addCgList = data.rst.doc.items;
            $scope.addressMsg = data.rst.doc.model.dest;
            $scope.glCgList = [data.rst.doc.model.dest];
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;

            if(data.rst.doc.model.task == 'neo'){
                $scope.materialAdd = true;    //新增物料
                $scope.materialChange = false;   //变更物料
            }else if(data.rst.doc.model.task == 'update'){
                $scope.materialAdd = false;    //新增物料
                $scope.materialChange = true;   //变更物料
            }
            var temp ={};
            var cgl = productout.constlist({});
            cgl.success(function (data) {
                if (data.code == 200) {
                    $scope.enumTransType=data.rst.enumTransType;
                    $scope.MTART = data.rst.MTART;
                    $scope.enumDepotFX = data.rst.enumDepotFX;    //库房新枚举
                    $scope.enumCarrier = data.rst.enumCarrier;
                    data.rst.enumDepot.forEach(function(i){
                        temp[i.code] = i.name;
                    });
                    $scope.house = temp;
                    if($scope.ADD_DATA.dest.lgort){
                        var lgort = $scope.ADD_DATA.dest.lgort.split(',');
                        var lgortArr = [];
                        for(var x in lgort) {
                            lgortArr.push($scope.house[lgort[x]]);
                        }
                        $scope.Lgort = lgortArr.join(',');
                    }
                } else {
                    alert(data.msg);
                }
            })
            $scope.ADD_DATA.deliverydate=$filter('date')($scope.ADD_DATA.deliverydate, "yyyy-MM-dd");

            if($scope.ADD_DATA.sapcode){
                $scope.addMaterialBtn = false;
                $scope.showDel = false;
            }else{
                $scope.addMaterialBtn = true;
                $scope.showDel = true;;
            }


            //自动读取物料添加
            var materialArr = productout.material({ordercode:$scope.ADD_DATA.ordercode});
            materialArr.success(function(data){
                if(data.code == 200){
                    $scope.glaList = data.rst.data;
                    for( var key=0;key < $scope.glaList.length;key++){
                        array.push($scope.glaList[key].code);
                        if($scope.glaList[key].sybz == 'R05' && $scope.glaList[key].sum !== 0){
                            R05Array.push($scope.glaList[key]);
                        }
                        if($scope.glaList[key].category == 'ZCP5' && $scope.glaList[key].sum != 0){
                            ZCP5ServiceArray.push($scope.glaList[key]);
                        }
                        if($scope.glaList[key].category != 'ZCP5' && $scope.glaList[key].sum != 0){
                            ZCP5ServiceArrayError.push($scope.glaList[key]);
                        } else{
                            if($scope.glaList[key].sum != 0){
                                AllZCP5ServiceMaterial.push($scope.glaList[key]);
                            }
                        }
                        if($scope.glaList[key].sum == 0){
                            $scope.glaList.splice(key,1);
                            key--;
                        }
                    }
                }else{
                    alert(data.msg);
                }
            });

        }

    }).error(function(error){
        alert(error);
    });
    $scope.fzDate = function(deliverydate){
        $scope.ADD_DATA.logisticsdate = deliverydate;
    }
    $scope.addressADD = function(){
        $( "#addressBox" ).dialog({
            autoOpen: false,
            width: 900,
            height:500,
            modal: true
        });
        $( "#addressBox" ).dialog( "open" );
        var deliverystatus = productout.deliverystatus({ordercode:$scope.ADD_DATA.ordercode,orderno:$scope.ADD_DATA.contract.code});
        deliverystatus.success(function(data){
            if(data.code == 200){
                if(data.rst.saleorder != 'valid'){
                    swal('该合同已全部放货','','warning');
                }else{
                    var addredssMsg =productout.destination({orderno:$scope.ADD_DATA.contract.code});
                    addredssMsg.success(function(data){
                        if(data.code == 200){
                            $scope.addressList = data.rst.items;
                        }else{
                            swal(data.msg,'','error');
                        }
                    });
                }
            }
        });
    }
    $scope.selectAddress = function(item){
        if(item.contact == '' ||  item.mobile == ''|| item.province == '' || item.city =='' || item.address == ''){
            swal('信息不完整,请先进行放货地址维护','','warning');
            return false;
        }else{
            $scope.glCgList = [item];
            $scope.glCgList.forEach(function(item){
                $scope.ADD_DATA.logistics.province = item.province;
            });
            $scope.dest = $.extend({},item,$scope.addressMsg);
        }
        $( "#addressBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    var getCountry = productout.getCountry2();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.changeData = function(idx,sum,data){
        if(data > sum || data < 0){
            swal('修改不能大于已审批放货数量','','warning');
            $scope.addCgList[idx].newsum = 0;
        }
    }
    var array = [];
    ///添加 发货清单--------------------------------------
    $scope.addMaterial=function(){
        array = [];
        R05Array = [];
        ZCP5ServiceArray = [];
        ZCP5ServiceArrayError = [];
        AllZCP5ServiceMaterial = [];
        $scope.currentAddress = '';
        var materialArr = productout.material({ordercode:$scope.ADD_DATA.ordercode});
        materialArr.success(function(data){
            if(data.code == 200){
                $scope.glaList = data.rst.data;
                for( var key=0;key < $scope.glaList.length;key++){
                    array.push($scope.glaList[key].code);
                    if($scope.glaList[key].sybz == 'R05' && $scope.glaList[key].sum !== 0){
                        R05Array.push($scope.glaList[key]);
                    }
                    if($scope.glaList[key].category == 'ZCP5' && $scope.glaList[key].sum != 0){
                        ZCP5ServiceArray.push($scope.glaList[key]);
                    }
                    if($scope.glaList[key].category != 'ZCP5' && $scope.glaList[key].sum != 0){
                        ZCP5ServiceArrayError.push($scope.glaList[key]);
                    } else{
                        if($scope.glaList[key].sum != 0){
                            AllZCP5ServiceMaterial.push($scope.glaList[key]);
                        }
                    }
                    if($scope.glaList[key].sum == 0){
                        $scope.glaList.splice(key,1);
                        key--;
                    }else{
                        var wuliao = $scope.glaList[key];
                        wuliao.count = wuliao.sum;
                        wuliao.num = '';
                        for( var i in  $scope.addCgList){ //遍历地址列表
                            var addr = $scope.addCgList[i];
                            if( wuliao.posnr == addr.posnr){ //该地址已经有选择该物料
                                wuliao.num = Number(addr.sum);
                            }else{
                                wuliao.count -= addr.sum

                            }
                        }
                    }

                }
            }else{
                alert(data.msg);
            }
        });

        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 900,
            height:500,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
    }
    $scope.close = function(){    /*关闭窗口*/
        R05Array = [];
        ZCP5ServiceArray = [];
        ZCP5ServiceArrayError = [];
        AllZCP5ServiceMaterial = [];
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.getUploadCallback = function(uploadCallData){      //处理上传返回数据
        var ifnum = [],ifnumerr = [];
        for(var i = 0; i < $scope.glaList.length; i++){
            for(var x = 0 ; x < uploadCallData.right.length ; x++){
                if(uploadCallData.right[x].posnr == $scope.glaList[i].posnr){
                    $scope.glaList[i].num = uploadCallData.right[x].num;
                    if($scope.glaList[i].num){
                        $scope.glaList[i].checkAll=true;      //自动勾选有值的物料
                        ifnum.push($scope.glaList[i]);
                    }
                }
            }
            if($scope.glaList[i].num ==''){
                ifnumerr.push($scope.glaList[i]);
            }
        }
        $scope.glaList = ifnum.concat(ifnumerr);     //本次放货数有值的放在最前面
        if(uploadCallData.error){
            var uploadErrorArr = [];
            for(var x = 0;x < uploadCallData.error.length; x++){
                uploadErrorArr.push(uploadCallData.error[x].code);
                swal({
                    title:'',
                    text:'编号'+uploadErrorArr.join(',')+'的物料没有可放货数量',
                    type:'warning'
                });
            }
        }
    }
    //上传下载
    $scope.excleConf = {
        formData:{ordercode:$stateParams.ordercode},
        buttonText:'上传清单',
        uploader:'/productout/uploadmaterial'
    };
    $scope.downLoad = function(){
        window.open('/productout/exportmaterial?ordercode=' + $stateParams.ordercode);
    }
    $scope.allCheck = function($event){
        var checkbox = $event.target;
        $scope.checkAll= checkbox.checked ? true : false;
        if(checkbox.checked){
            $scope.glaList.forEach(function(item){
                item.checkAll=true;
            })
        }
        if($scope.checkAll){
            $scope.glaList.forEach(function(item){
                if(item.num > item.sum){
                    swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                    checkbox.checked=false;
                    item.checkAll=false;
                    return false;
                }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) >= Number(item.sum)){
                    swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                    checkbox.checked=false;
                    item.checkAll=false;
                    return false;
                }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) < Number(item.sum)){
                    swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                    checkbox.checked=false;
                    item.checkAll=false;
                    return false;
                }else if('' == item.num){
                    item.num = item.sum
                }
            })
        }else{
            $scope.glaList.forEach(function(item){
                item.checkAll=false;
                item.num="";
            })
        }

    }

    $scope.singleCheck = function(idx,list){
        var parent = $("#wlTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
            for(var x in $scope.glaList){
                if(storehouse){
                    if(Number($scope.glaList[idx].num) > (Number($scope.glaList[idx].yzy) + Number($scope.glaList[idx].kzy)) &&　Number($scope.glaList[idx].num) >= Number($scope.glaList[idx].sum)){
                        swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
                        check.removeAttr("checked");
                        return false;

                    }else if(Number($scope.glaList[idx].num) > (Number($scope.glaList[idx].yzy) + Number($scope.glaList[idx].kzy)) &&　Number($scope.glaList[idx].num) < Number($scope.glaList[idx].sum)){
                        swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
                        check.removeAttr("checked");
                        return false;
                    }
                }else{
                    if(Number($scope.glaList[idx].num) > Number($scope.glaList[idx].sum)){
                        swal('本次放货数量不能大于未放货数量','','warning');
                        check.removeAttr("checked");
                    }
                }
            }
        } else {
            check.removeAttr("checked");
        }
    }
    $scope.STOCK=false;
    $scope.stockSearch=function(lgort){
        storehouse = lgort;
        if(!lgort){
            for(var i in $scope.glaList){
                $scope.glaList[i].stockNum= 0;
            }
        }else{
            var material = productout.stock({lgort:lgort,code:array,clientid:$scope.ADD_DATA.contract.clientid,saleid:$scope.ADD_DATA.contract.saleid});
            material.success(function (data) {
                if (data.code == 200) {
                    for(var x in $scope.glaList){
                        for(var j in data.rst.data){
                            if($scope.glaList[x].code == data.rst.data[j].code){
                                $scope.glaList[x].stockNum = data.rst.data[j].stock;
                                $scope.glaList[x].yzy = data.rst.data[j].yzy;
                                $scope.glaList[x].kzy = data.rst.data[j].kzy;
                                $scope.glaList[x].change = true;
                            }
                        }
                    }
                    for(var i = 0; i<$scope.glaList.length; i++){
                        if($scope.glaList[i].change){
                            delete $scope.glaList[i].change;
                        }else{
                            $scope.glaList[i].stockNum = 0;
                            $scope.glaList[i].yzy = 0;
                            $scope.glaList[i].kzy = 0;
                        }
                    }
                    $scope.STOCK=true;
                } else {
                    alert(data.msg);
                }
            })
        }

    }

    //本次放货数量不能大于可放货数量
    $scope.changeNum=function(item){
        if(item.num == ''){
            return false;
        }else if(Number(item.num) > Number(item.sum) && $scope.STOCK == false){
            swal('放货数不能大于未放货数,请更改本次放货数量','','warning');
            return false;

        }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) >= Number(item.sum)){
            swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
            return false;

        }else if(Number(item.num) > (Number(item.yzy) + Number(item.kzy)) &&　Number(item.num) < Number(item.sum)){
            swal('放货数不能大于本人占用+可占用，请更改本次放货数量','','warning');
            return false;
        }
    }
    $scope.addSelect=function(){
        var objMaterialArr = [];
        XZZCP5Array = [];
        XZZCP5ArrayError = [];
        resultR05Array = [];
        if($scope.Required == true && storehouse == undefined || storehouse == ''){
            swal('请选择库房','','warning');
            return false;
        }

        $scope.fylgort(storehouse);   ///翻译多个库房

        var addArr = $scope.addCgList;
        var wwList = [];
        var ckbox = $("#wlTable").find("[checked='checked']");
        $(ckbox).each(function(key,value){
            var par = $(this).parent().parent();
            var arr = {};
            arr.posnr = par.find("td:eq(1)").html();
            arr.code = par.find("td:eq(2)").html();
            arr.oemcode = par.find("td:eq(3)").html();
            arr.model = par.find("td:eq(4)").html();
            arr.note = par.find("td input:eq(1)").val();
            arr.category = par.find("td input:eq(2)").val();
            arr.total = par.find("td:eq(7)").html();
            arr.price = par.find("td:eq(8)").html();
            arr.sum = par.find("td input:eq(3)").val();
            arr.sybz = par.find("td input:eq(4)").val();

            //bug6935   需要两个字段判断
            arr.stock = par.find("td:eq(11)").html();
            arr.pstyv = par.find("td:eq(12)").html();
            if($scope.STOCK == true){
                arr.yzy = par.find("td:eq(13)").html();
                arr.kzy = par.find("td:eq(14)").html();
                arr.stockNum = par.find("td:eq(15)").html();
            }

            //2016.9.6 放货增加字段
            arr.lgort = storehouse;
            arr.zprice = '';
            arr.amount = '';
            wwList.push(arr);
        });

        for(var err in wwList){
            if(wwList[err].sum == ''){
                swal('请填写本次放货数量','','warning');
                return false;
            }else if(Number(wwList[err].sum) == 0){
                swal('本次放货数量不能为0','','warning');
                return false;
            }
            /*for(var mrr in $scope.addCgList){
             if(wwList[err].posnr == $scope.addCgList[mrr].posnr){
             $scope.addCgList.splice(mrr,1);
             }
             }*/
            if(wwList[err].sybz == 'R05'){
                resultR05Array.push(wwList[err]);
            }else {
                XZFR05.push(wwList[err]);
            }
            if(wwList[err].category == 'ZCP5'){
                XZZCP5Array.push(wwList[err]);
            }else{
                XZZCP5ArrayError.push(wwList[err]);
            }


            if(Number(wwList[err].sum) > Number(wwList[err].total)){
                swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                return false;
            }else if(Number(wwList[err].sum) > (Number(wwList[err].yzy) + Number(wwList[err].kzy)) &&　Number(wwList[err].sum) >= Number(wwList[err].total)){
                swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                return false;
            }else if(Number(wwList[err].sum) > (Number(wwList[err].yzy) + Number(wwList[err].kzy)) &&　Number(wwList[err].sum) < Number(wwList[err].total)){
                swal({title:'', text:'请填写正确数据或者勾选有效数据', type:'warning'})
                return false;
            }
        }
        if(wwList.length == 0 ){
            swal('请选择物料','','warning');
            return false;
        }


        //2016.11.15校验物料
        /*
         *
         * 服务物（ZCP5）必须搭配非服务物料放货，
         * 或者，全是服务物料，不能剩下必须全部放货，
         * 借出转销售（R05类型）全部放货，不能剩下
         * ZCP5 物料和 R05 物料不冲突
         *
         * */
        //判断R05物料是否全部放货
        //if(wwList.length != R05Array.length && resultR05Array.length != 0){
        //    console.log(1);
        //    swal({
        //        title:'',
        //        text:'借出转销售必须单独全部放货',
        //        type:'warning'
        //    });
        //    resultR05Array = [];
        //    return false;
        //}
        if(resultR05Array.length == R05Array.length && R05Array.length !== 0 && wwList.length > resultR05Array.length){
            swal({
                title:'',
                text:'借出转销售必须单独全部放货',
                type:'warning'
            });
            resultR05Array = [];
            return false;
        }
        if(resultR05Array.length !== R05Array.length && resultR05Array.length !== 0){
            swal({
                title:'',
                text:'借出转销售物料必须全部放货',
                type:'warning'
            });
            resultR05Array = [];
            return false;
        }else if(resultR05Array.length == R05Array.length){
            for(var i=0;i<resultR05Array.length;i++){
                if(Number(resultR05Array[i].sum) != Number(resultR05Array[i].total)){
                    swal({
                        title:'',
                        text:'借出转销售物料必须全部放货',
                        type:'warning'
                    });
                    resultR05Array = [];
                    return false;
                }

            }
        }


        //服务物料判断逻辑
        if(resultR05Array.length == 0 && ZCP5ServiceArray.length != 0){
            if(XZZCP5ArrayError!=0 && XZZCP5Array.length == 0){
                var flag = XZZCP5ArrayError.every(function(item){
                    return ZCP5ServiceArrayError.length == XZZCP5ArrayError.length  && Number(item.sum) == Number(item.total)
                });
                if(flag){
                    swal({
                        title:'',
                        text:'不能只剩下服务物料',
                        type:'warning'
                    });
                    XZZCP5Array = [];
                    XZZCP5ArrayError = [];
                    return false;
                }
            }else if(XZZCP5Array.length == ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                var check = XZZCP5ArrayError.every(function(item){
                    return Number(item.sum) == Number(item.total)
                });
                var check1 = XZZCP5Array.some(function(item){
                    return Number(item.sum) != Number(item.total)
                });
                console.log(check,check1);
                if(check == true && check1 == true){
                    swal({
                        title:'',
                        text:'不能只剩下服务物料',
                        type:'warning'
                    });
                    return false;
                }
            }else if(XZZCP5Array.length != ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                console.log(3)
                var check2 = XZZCP5ArrayError.every(function(item){
                    return Number(item.sum) == Number(item.total)
                });
                console.log(check2);
                console.log(XZZCP5ArrayError.length == ZCP5ServiceArrayError.length && check2 == true)
                if(XZZCP5ArrayError.length == ZCP5ServiceArrayError.length && check2 == true){
                    swal({
                        title:'',
                        text:'不能只剩下服务物料',
                        type:'warning'
                    });
                    return false;
                }
            }

            if(AllZCP5ServiceMaterial.length != XZZCP5Array.length && ZCP5ServiceArrayError.length == 0){
                swal('全是服务物料必须全部放货','','warning');
                return false;
            }
        }

        //********************************------------------*******************************************************
        if(storehouse){
            for(var i = 0 ;i < $scope.addCgList.length; i++){
                for(var j = 0 ; j < wwList.length ; j++){
                    if($scope.house[$scope.addCgList[i].lgort].indexOf('SN') > -1 && wwList[j].lgort == 'NP01'){
                        swal('手动配货库房不能和自动配货库房同时存在', '', 'warning');
                        return false;
                    }else if($scope.addCgList[i].lgort != 'NP01' && $scope.addCgList[i].lgort != wwList[j].lgort && wwList[j].lgort != 'NP01' && !$scope.house[wwList[j].lgort].indexOf('SN') > -1){
                        swal('只能一个实物库房','','warning');
                        return false;
                    }else if($scope.addCgList[i].lgort == 'NP01' && $scope.house[wwList[j].lgort].indexOf('SN') > -1){
                        swal('手动配货库房不能和自动配货库房同时存在', '', 'warning');
                        return false;
                    }else if($scope.addCgList[i].posnr == wwList[j].posnr &&  $scope.addCgList[i].lgort == wwList[j].lgort){
                        $scope.addCgList.splice(i,1);
                    }
                }
            }
        }

        //6935bug  项目放货  提前开票行项目放货增强校验
        var  vm = $scope;
        if(vm.Required == false){
            for(var i = 0 ; i < wwList.length; i++){
                if(vm.ADD_DATA.ordertype == 'ZC01' && wwList[i].pstyv == 'ZTA2' && Number(wwList[i].sum) > Number(wwList[i].stock)){
                    objMaterialArr.push(wwList[i].code + '物料为提前开票物料,库存数量为'+ wwList[i].stock+ ',放货数量不能大于库存数量');
                }
            }
        }
        if(vm.Required == false && objMaterialArr.length !== 0){
            return swal('',objMaterialArr,'warning');
        }
        $scope.addCgList =  $scope.addCgList.concat(wwList);

        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();


    }
    $scope.fylgort = function(lgort){
        var fxlgortArr = [];
        if(lgort){
            lgortArr.push(lgort);
            for(var x in lgortArr){
                fxlgortArr.push( $scope.house[lgortArr[x]]);
            }
            $scope.Lgort = fxlgortArr;
            lgortcode = lgortArr.join(',');
        }
    }
    //删除
    $scope.allistCheck = function($event){
        var checkbox = $event.target;
        $scope.checkAllDel= checkbox.checked ? true : false;
        if($scope.checkAllDel){
            $scope.addCgList.forEach(function(item){
                item.rightAdd = true;
            });
        }else{
            $scope.addCgList.forEach(function(item){
                delete  item.rightAdd;
            });
        }
    }
    $scope.checkDel = function(idx){
        var parent = $("#addCglist").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.addCgList){
                $scope.addCgList[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.addCgList){
                delete  $scope.addCgList[idx].rightAdd;
            }

        }
    }
    $scope.Delist = function(){
        var rightArr = [];
        $scope.addCgList.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.addCgList = rightArr;
        $scope.all = false;
        $scope.checkAllDel = false;
    }
    $scope.addData = function(data,statue){
        var today = new Date();
        var str = $filter('date')(today,'yyyy-MM-dd');
        if(Date.parse($scope.ADD_DATA.deliverydate) < Date.parse(str)){
            swal('要求到货日期不能小于今天','','warning');
            return false;
        }
        if($scope.dest){
            data.dest = $scope.dest;
        }else{
            data.dest = $scope.addressMsg;
        }
        if(storehouse){
            data.dest.lgort = $scope.Lgort;
        }

        var arr=$scope.addCgList;
        var param={doc:{model:data,items:arr}}
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if(statue == "save"){
            var addInside = productout.ApplySave(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            // 物料校验最后一次校验
            XZZCP5Array = [];
            XZZCP5ArrayError = [];
            resultR05Array = [];
            for(var err in $scope.addCgList) {
                if ($scope.addCgList[err].sybz == 'R05') {
                    resultR05Array.push($scope.addCgList[err]);
                } else {
                    XZFR05.push($scope.addCgList[err]);
                }
                if ($scope.addCgList[err].category == 'ZCP5') {
                    XZZCP5Array.push($scope.addCgList[err]);
                } else {
                    XZZCP5ArrayError.push($scope.addCgList[err]);
                }
            }

            if(resultR05Array.length == R05Array.length && R05Array.length !== 0 && $scope.addCgList.length > resultR05Array.length){
                swal({
                    title:'',
                    text:'借出转销售必须单独全部放货',
                    type:'warning'
                });
                resultR05Array = [];
                return false;
            }
            if(resultR05Array.length !== R05Array.length && resultR05Array.length !== 0){
                swal({
                    title:'',
                    text:'借出转销售物料必须全部放货',
                    type:'warning'
                });
                resultR05Array = [];
                return false;
            }else if(resultR05Array.length == R05Array.length){
                for(var i=0;i<resultR05Array.length;i++){
                    if(Number(resultR05Array[i].sum) != Number(resultR05Array[i].total)){
                        swal({
                            title:'',
                            text:'借出转销售物料必须全部放货',
                            type:'warning'
                        });
                        resultR05Array = [];
                        return false;
                    }

                }
            }


            //服务物料判断逻辑
            if(resultR05Array.length == 0 && ZCP5ServiceArray.length != 0){
                if(XZZCP5ArrayError!=0 && XZZCP5Array.length == 0){
                    var flag = XZZCP5ArrayError.every(function(item){
                        return ZCP5ServiceArrayError.length == XZZCP5ArrayError.length  && Number(item.sum) == Number(item.total)
                    });
                    if(flag){
                        swal({title:'', text:'不能只剩下服务物料', type:'warning'});
                        XZZCP5Array = [];
                        XZZCP5ArrayError = [];
                        return false;
                    }
                }else if(XZZCP5Array.length == ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                    var check = XZZCP5ArrayError.every(function(item){return Number(item.sum) == Number(item.total)});
                    var check1 = XZZCP5Array.some(function(item){return Number(item.sum) != Number(item.total)});
                    console.log(check,check1);
                    if(check == true && check1 == true){
                        swal({title:'', text:'不能只剩下服务物料', type:'warning'});return false;
                    }
                }else if(XZZCP5Array.length != ZCP5ServiceArray.length && XZZCP5ArrayError.length == ZCP5ServiceArrayError.length){
                    var check2 = XZZCP5ArrayError.every(function(item){return Number(item.sum) == Number(item.total)});
                    if(XZZCP5ArrayError.length == ZCP5ServiceArrayError.length && check2 == true){
                        swal({title:'', text:'不能只剩下服务物料', type:'warning'});return false;
                    }
                }
                if(AllZCP5ServiceMaterial.length != XZZCP5Array.length && ZCP5ServiceArrayError.length == 0){
                    swal('全是服务物料必须全部放货','','warning');
                    return false;
                }
            }
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                param.comment = $scope.comment;  //审批意见
                var applyAdd = productout.Apply(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        if(data.rst.status == '0'){
                            swal({
                                title: '提交成功',
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "返回列表",
                                closeOnConfirm: true
                            }, function () {
                                window.location.href = '/index.html#/productoutOrder';
                            });
                        }else if(data.rst.status == '1'){
                            swal({
                                title: '提交失败',
                                text:data.rst.sapmsg.join(';'),
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonColor: 'light blue',
                                confirmButtonText: "关闭",
                                closeOnConfirm: true
                            }, function () {
                                // window.location.href = '/index.html#/productoutWh';
                            });
                        }else{
                            swal({
                                title: "提交成功",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "返回列表",
                                closeOnConfirm: true
                            }, function () {
                                window.location.href = '/index.html#/productoutOrder';
                            });
                        }
                    }else {
                        swal(data.msg,'','error');
                    }
                }).error(function(error){
                    swal('服务器异常','放货单将保存到草稿,请约30分钟后在草稿中再次提交','error');
                });
            };
            // 2016-7-12
            // 借出单放货提交时需要增加选择下一审批人操作
            // 2016-8-30 不能直接使用detail返回的候选人，需要根据用户输入值判断候选人，所以还需要先调用一下save
            var addInside = productout.ApplySave(param);
            addInside.success(function(data){
                $scope.candidates = data.rst.candidates;
                param.processId = $scope.processId = data.rst.processId;
                param.nodeId = $scope.nodeId = data.rst.nodeId;
                //console.log('save:',$scope.processId, $scope.nodeId,param.processId, param.nodeId)
                if(data.code == 200){
                    if( $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                        $scope.receivers = $scope.candidates[0].receivers;
                        param.candidates = data.rst.candidates;
                        $("#approversDialog").dialog({
                            autoOpen: false,
                            modal: true,
                            width: 500
                        });
                        $("#approversDialog").dialog("open");
                    } else {
                        $scope.applyFn(-1);
                    }
                }else {
                    alert(data.msg);
                }
            });
            /*if ( $scope.candidates.length && $scope.candidates[0].receivers.length > 1) {
             $scope.receivers = $scope.candidates[0].receivers;
             param.candidates = $scope.candidates;
             $("#approversDialog").dialog({
             autoOpen: false,
             modal: true,
             width: 500
             });
             $("#approversDialog").dialog("open");
             } else {
             $scope.applyFn(-1);
             }*/

        }
    }
}]);
//变更ctrl
productoutApp.controller('productoutChangeCtrl',['$scope','$stateParams','$filter','productoutServices',function($scope,$stateParams,$filter,productout){
    var temp ={} , vm = $scope , hisArrItem = []  // 读取原始物料;
    var fhchange = productout.updatedelivery({_id:$stateParams.id});
    fhchange.success(function(data){
        if(data.code == 200){
            $scope.ADD_DATA = data.rst.model;
            $scope.glCgList = [data.rst.model.dest];
            $scope.addCgList = data.rst.items;
            hisArrItem = data.rst.items;
            $scope.addressMsg = data.rst.model.dest;
            for(var x in $scope.addCgList){
                $scope.addCgList[x].newsum = $scope.addCgList[x].sum;
            }
            var cgl = productout.constlist({});
            cgl.success(function (data) {
                if (data.code == 200) {
                    $scope.enumTransType = data.rst.enumTransType;
                    $scope.cargooutType = data.rst.enumCargooutType;
                    if($scope.ADD_DATA.dest.lgort){
                        var type = getField(data.rst.enumDepot,'code',$scope.ADD_DATA.dest.lgort);
                        $scope.lgort = type.name;
                    }
                    data.rst.enumDepot.forEach(function(i){
                        temp[i.code] = i.name;
                    });
                    $scope.house = temp;
                } else {
                    alert(data.msg);
                }
            })

            $scope.ADD_DATA.deliverydate = $filter('date')($scope.ADD_DATA.deliverydate,"yyyy-MM-dd");
            $scope.ADD_DATA.logistics.expectdate = $filter('date')($scope.ADD_DATA.logistics.expectdate,"yyyy-MM-dd");
        }else{
            alert(data.msg);
        }
    });
    $scope.yqdhDate = function(date){
        $scope.ADD_DATA.logistics.expectdate = date;
    }
    $scope.addressADD = function(){
        var deliverystatus = productout.deliverystatus({ordercode:$scope.ADD_DATA.ordercode,orderno:$scope.ADD_DATA.contract.code});
        deliverystatus.success(function(data){
            if(data.code == 200){
                if(data.rst.cargo == 'inprocess' && data.rst.saleorder == 'valid'){
                    swal('放货信息维护审批中，不能放货','','warning');
                }else{
                    var addredssMsg =productout.destination({orderno:$scope.ADD_DATA.contract.code});
                    addredssMsg.success(function(data){
                        if(data.code == 200){
                            $( "#addressBox" ).dialog({
                                autoOpen: false,
                                width: 900,
                                height:500,
                                modal: true
                            });
                            $( "#addressBox" ).dialog( "open" );
                            $scope.addressList = data.rst.items;
                        }else{
                            swal(data.msg,'','error');
                        }
                    });
                }
            }
        });

    }
    $scope.selectAddress = function(item){
        if(item.contact == '' ||  item.mobile == ''|| item.province == '' || item.city =='' || item.address == ''){
            swal('信息不完整,请先进行放货地址维护','','warning');
            return false;
        }else{
            $scope.glCgList = [item];
            $scope.glCgList.forEach(function(item){
                $scope.ADD_DATA.logistics.province = item.province;
            });
            $scope.dest = $.extend($scope.addressMsg,item);
        }
        $( "#addressBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    var getCountry = productout.getCountry2();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    $scope.changeData = function(idx,sum,data){
        if(data > sum || data < 0){
            swal('修改不能大于已审批放货数量','','warning');
            $scope.addCgList[idx].newsum = 0;
        }
    }
    $scope.addData = function(data,statue){
        var today = new Date();
        var str = $filter('date')(today,'yyyy-MM-dd');
        if(Date.parse($scope.ADD_DATA.deliverydate) < Date.parse(str)){
            swal('要求到货日期不能小于今天','','warning');
            return false;
        }
        var newsum = 0;
        for(var x in $scope.addCgList){
            newsum+=$scope.addCgList[x].newsum;
        }
        if(newsum == 0){
            swal('全部为0时，请使用作废功能','','warning');
            return false;
        }
        if($scope.dest){
            data.dest = $scope.dest;
        }

        for(var i = 0 ; i < vm.addCgList.length; i++){
            for(var j = 0 ; j < hisArrItem.length; j++){
                if(Number(vm.addCgList[i].newsum) !== Number(hisArrItem[j].sum)){
                    vm.fixsucc = true;
                }
            }
        }

        //计算变更之后 放货总金额传给后台
        var single = 0 , total = 0;
        if(vm.fixsucc == true){
            for(var z = 0 ;z < vm.addCgList.length; z++){
                single = vm.addCgList[z].amount/vm.addCgList[z].sum * parseFloat(vm.addCgList[z].newsum);
                total += single;
            }
            console.log(total.toFixed(2));
        }

        var arr = vm.addCgList;

        var param={doc:{model:data,items:arr},processId:vm.processId,nodeId:vm.nodeId}
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.doc.model.task = 'update';
        if(vm.fixsucc == true){
            param.doc.model.money = total.toFixed(2);
        }

        if(statue == "save"){
            var addInside = productout.ApplySave(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    swal(data.msg,'','error');
                }
            });
        }else if(statue == 'apply'){
            //addParam.processId = data.rst.processId;
            //addParam.candidates = data.rst.candidates;
            var applyAdd = productout.Apply(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/productoutOrder';
                    });
                    //swal("提交成功", "", "success");
                }else {
                    swal(data.msg,'','warning');
                }
            });
        }
    }
}]);
//放货地址维护
productoutApp.controller('cargooutinfo',['$scope','$stateParams','productoutServices',function($scope,$stateParams,productout){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = productout.applyViewWH(param);
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = productout.getCountry2();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.Cglist = data.rst.doc.items;
            $scope.ORDER_DARA = data.rst.doc.model;
            $scope.signWay=data.rst.doc.items;
            $scope.doc = data.rst.doc;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;

            if(data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
            }
            if(data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active'){
                $scope.recallBtn = true;
                $scope.textareaBtn = true;
            }
            if($stateParams.myflag == 'mybegin'){
                $scope.editBtn = true;
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
                $scope.deleteBtn=true;
            }


            var cgl = productout.constlist({});
            cgl.success(function (data) {
                if (data.code == 200) {
                    console.log(data);
                    $scope.enumSourceType=data.rst.enumSourceType;
                    //$scope.signWay=data.rst.enumSignType.map(function(v){return {code:v,name:v}})
                    $scope.signWay=data.rst.enumSignType;
                } else {
                    alert(data.msg);
                }
            })


        }

    }).error(function(error){
        alert(error);
    });

    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = productout.saveAdd(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        // 提交
        $scope.applyFn = function (selIndex) {
            var param = {};
            param.doc = $scope.doc;
            param.comment = applyObj.applyIdea;
            param.processId = $stateParams.processId;
            param.nodeId = $stateParams.nodeId;
            param.candidates = $scope.candidates;
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            //param.candidates = [{receivers:[{_id:'56cc1a4c09d8eef814c11a9f'}]}];
            var applyAgree = productout.agreeWH(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回放货信息维护待办",
                        closeOnConfirm: true
                    }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=放货信息维护&&controllercode=FHXX'; });
                }else {
                    swal("提交失败！", '', "error");
                }
            }).error(function(error){
                alert(error);
            });
        }
        // 2016-7-8
        // 放货审批时需要增加选择下一审批人操作
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
            $scope.receivers = $scope.candidates[0].receivers;
            param.candidates = $scope.candidates;
            $("#approversDialog").dialog({
                autoOpen: false,
                modal: true,
                width: 500
            });
            $("#approversDialog").dialog("open");
        } else {
            $scope.applyFn(-1);
        }
    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = productout.disagreeWH(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回放货信息维护待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=放货信息维护&&controllercode=FHXX'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = productout.cancelWH(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回放货信息维护待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=放货信息维护&&controllercode=FHXX'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = productout.recallWH(param);
        recall.success(function(data){
            if(data.code == 200){
                swal({
                    title: "召回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function(){  window.location.href='/index.html#/index'; });
            }else {
                swal(data.msg, '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    }
    $scope.applyDelete = function(){//取消
        swal(
            {
                title: "确定删除吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            },
            function () {
                // window.location.href='/index.html#/myDraft';
                var param = {};
                param.processId = $stateParams.processId;
                param.nodeId = $stateParams.nodeId;
                param.comment = applyObj.applyIdea;
                var cancel = productout.cancelWH(param);
                cancel.success(function(data){
                    if(data.code == 200){
                        swal({
                            title: "删除成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回我的草稿",
                            closeOnConfirm: true
                        }, function(){   window.location.href='/index.html#/myDraft'; });
                    }else {
                        swal("删除失败！", '', "error");
                    }

                }).error(function(error){
                    alert(error);
                });
            }
        );

    }
}]);
productoutApp.controller('cargooutinfoEdit',['$scope','$stateParams','$state','productoutServices',function($scope,$stateParams,$state,productout){
    $scope.Filedata = [];
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var viewPur = productout.applyView(param);
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = productout.getCountry2();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.Cglist = data.rst.doc.items;
            $scope.ORDER_DARA = data.rst.doc.model;
            //上传附件数组
            $scope.uploadArr = $scope.ORDER_DARA.attachment;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            if(data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.agreeBtn = true;
                $scope.disagreeBtn = true;
                $scope.cancelBtn = true;
                $scope.textareaBtn = true;
            }
            if(data.rst.nodeStatus == 'approve' && data.rst.property.status == 'active'){
                $scope.recallBtn = true;
                $scope.textareaBtn = true;
            }
            if($stateParams.myflag == 'mybegin'){
                $scope.editBtn = true;
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
            }

            var cgl = productout.constlist({});
            cgl.success(function (data) {
                if (data.code == 200) {
                    $scope.enumSourceType=data.rst.enumSourceType;
                    $scope.signWay=data.rst.enumSignType;
                    $scope.siteDepot=data.rst.enumDepot;
                    $scope.MTART = data.rst.MTART;
                } else {
                    alert(data.msg);
                }
            })
        }

    }).error(function(error){
        alert(error);
    });
    //省市联动
    var watchExcel = $scope.$watchCollection ('Filedata', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);

        }

        $scope.Btndis = newValue.every(function(item){
            return item.orderno.toLowerCase() ==  $scope.ORDER_DARA.code.toLowerCase();
        });
        console.log($scope.Btndis)
    });


    //新增
    $scope.add=function(){
        var obj={source:'neo',receiver:'',mobile:'',phone:'',province:'',city:'',address:'',postcode:'',sign:'收货人签字+日期',site:'',items:[]}
        $scope.Cglist.push(obj);
    }

    //删除
    $scope.delete=function(idx,statue){
        if(statue == 'addList'){
            $scope.Cglist.splice(idx,1);
        }else if(statue == 'fileList'){
            $scope.Filedata.splice(idx,1);
        }
    }
    $scope.delupload = function(idx){
        $scope.uploadArr.splice(idx,1);
    }
    $scope.allCheck = function(){
        var parent = $("#cgList").find(".allist").eq(0);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.Cglist){
                $scope.Cglist[x].rightAdd = true;
            }
            for(var j in $scope.Filedata){
                $scope.Filedata[j].fileAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.Cglist){
                delete  $scope.Cglist[x].rightAdd;
            }
            for(var j in $scope.Filedata){
                delete $scope.Filedata[j].fileAdd;
            }
        }
    }
    $scope.checkDel = function(idx){
        var parent = $("#cgList").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.Cglist){
                $scope.Cglist[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.Cglist){
                delete  $scope.Cglist[idx].rightAdd;
            }

        }
    }
    $scope.filelist = function(idx){
        var parent = $("#cgList").find(".listError").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.Filedata){
                $scope.Filedata[idx].fileAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.Filedata){
                delete  $scope.Filedata[idx].fileAdd;
            }

        }
    }
    $scope.Delist = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.Cglist.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item)
            }
        });
        $scope.Filedata.forEach(function(item){
            if(item.fileAdd){

            }else{
                errorArr.push(item)
            }
        });
        $scope.Cglist = rightArr;
        $scope.Filedata = errorArr;
    }
    $scope.addData = function(data,statue){
        if($scope.Cglist.length <= 0 && $scope.Filedata.length <= 0){
            swal("请添加数据", "", "warning");
            return false;
        }
        var objUpload = [];
        $('.formUpStyle').find('a').each(function(i,idx){
            var obj = {};
            obj.filePath = $(this).attr('href');
            obj.fileName = $('.showImg a').eq(i).html();
            objUpload.push(obj);

        });
        $scope.ORDER_DARA.attachment = [];
        $scope.ORDER_DARA.attachment = $scope.ORDER_DARA.attachment.concat(objUpload);
        var arr=$scope.Cglist.concat($scope.Filedata);
        var param={doc:{model:data,items:arr},processId:$scope.processId,nodeId:$scope.nodeId}
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if(statue == "save"){
            var addInside = productout.saveAdd(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                //addParam.processId = data.rst.processId;
                //addParam.candidates = data.rst.candidates;
                var applyAdd = productout.productoutAdd(param);
                applyAdd.success(function(data){
                    if(data.code == 200){
                        //swal("提交成功", "", "success");
                        swal({
                            title: "提交成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/productoutOrder';
                        });
                    }else {
                        alert(data.msg);
                    }
                });
            };

            if ($scope.candidates.length && $scope.candidates[0].receivers.length > 1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
                $scope.receivers = $scope.candidates[0].receivers;
                param.candidates = $scope.candidates;
                $("#approversDialog").dialog({
                    autoOpen: false,
                    modal: true,
                    width: 500
                });
                $("#approversDialog").dialog("open");
            } else {
                $scope.applyFn(-1);
            }

        }

    }
}]);



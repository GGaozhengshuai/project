var insideApp = angular.module('insideApp', ['pageDirectives','formDirectives','treeControl']);
insideApp.service('insideServices', function($http) {
    var service = {
        listInside: function(param) {
            return $http.post('/interiorbills/list',param ,{cache:false});
        },
        viewInside: function(param) {
            return $http.post('/interiorbills/view',param ,{cache:true});
        },
        addInside: function(param){
            return $http.post('/interiorbills/save',param ,{cache:false});
        },
        updateInside: function(param){
            return $http.post('/interiorbills/update',param ,{cache:false});
        },
        deleteInside: function(param){
            return $http.post('/interiorbills/delete',param ,{cache:false});
        },
        applyAdd: function(param){
            return $http.post('/interiorbills/createprocess',param ,{cache:false});
        },
        interiorbills: function (param) {
            return $http.post('/interiorbills/detail', param, {cache: false});
        },
        costcenter : function(param){
            return $http.post('/enuminterface/costcenter',param,{cache:false});
        },
        // 获取枚举
        enumlist : function(param){
            return $http.post('/enuminterface/enumlist',param,{cache:false});
        },
        getprocesslog: function (param) {
            return $http.post('/interiorbills/getprocesslog',param,{cache:false});
        },
        details:function(param){
            return $http.post('/interiorbills/details',param,{cache:false});
        },
        insidefreeze : function (param) {              //完结
            return $http.post('/interiorbills/freeze',param,{cache :false});
        },
        insideDel : function(param){      //查询是否可以作废
            return $http.post('/interiorbillscancel/docheck',param,{cache:false});
        },
        insidenullify : function(param){
            return $http.post('/interiorbillscancel/createprocess',param,{cache:false});
        },
        insidenullifySave : function(param){
            return $http.post('/interiorbillscancel/save',param,{cache:false});
        }
    };
    return service;
});

insideApp.controller('insideOrderCtrl', ['$scope','$rootScope','insideServices',function($scope,$rootScope,inside){
    var person = $rootScope.loginPerson;
    $scope.USER0 = person.user.name;
    console.log($scope.USER0)
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,ZINORD:$scope.ZINORD, AUFNR:$scope.AUFNR, AUART: $scope.AUART, USER5: $scope.USER5, USER0: $scope.USER0,ZFYLX: $scope.ZFYLX,ASTNR:$scope.ASTNR};
            var customerPromise = inside.listInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    // 成本中心、费用种类
    $scope.selectType = {};
    var enumlist = inside.enumlist({enums:['costcenter','fysqdcosttype']});
    enumlist.success(function(data){
        $scope.costcenterSel = data.data.costcenter;
        $scope.categorySel = data.data.fysqdcosttype; // 费用种类
    });


    var vm = $scope;

    //完结
    vm.inSideEnd = function(i,type){
        if( type == 'end'){
            var end = inside.insidefreeze({doc:{sapid:i.AUFNR,AUFNR:i.AUFNR,ASTNR:'01',ZINORD:i.ZINORD}});
            end.success(function(data){
                if(data.code == 200){
                    swal('完结成功','','success');
                    $scope.search();
                }else{
                    swal('完结失败',data.msg,'error');
                }
            });
        }else if( type == 'cancel'){
            var cancel = inside.insidefreeze({doc:{sapid:i.AUFNR,AUFNR:i.AUFNR,ASTNR:'04',ZINORD:i.ZINORD}});
            cancel.success(function(data){
                if(data.code == 200){
                    swal('取消完结成功','','success');
                    $scope.search();
                }else{
                    swal('取消完结失败',data.msg,'error');
                }
            });
        }

    }

    //作废
    vm.clickDel = function(i){
        swal(
            {
                title: "是否作废?",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#A1D9F2',
                confirmButtonText: '确定'
            },
            function(){
                var docheck = inside.insideDel({AUFNR:i.AUFNR,ZINORD:i.ZINORD});
                docheck.success(function(data){
                    if(data.code == 200){
                        if(data.rst.data.pass == true){
                            i = _.extend(i,{'ZFYLXTXT':[vm.categorySel[i.ZFYLX.substr(0,2)].text,vm.categorySel[i.ZFYLX.substr(0,2)].sub[i.ZFYLX.substr(2,2)].text,i.ZFYLX.length > 4 ? vm.categorySel[i.ZFYLX.substr(0,2)].sub[i.ZFYLX.substr(2,2)].sub[i.ZFYLX.substr()].text : ''].join('-')});
                            var insidenullify = inside.insidenullify({doc:i});
                            insidenullify.success(function(data){
                                if(data.code == 200){
                                    swal('作废申请已提交','','success');
                                    $scope.search();
                                }else{
                                    swal('作废失败',data.msg,'error');
                                }
                            });
                        }else{
                            swal('作废失败',data.rst.data.msg,'error');
                        }
                    }else{
                        swal(data.msg,'','error');
                    }
                });
            }
        );





    }
}]);
insideApp.controller('insideOrderAddCtrl', ['$scope','$rootScope','insideServices',function($scope,$rootScope,inside){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var updateData = inside.updateInside({});
    updateData.success(function(data) {
        $scope.PRCTRS = data.rst.enum.PRCTR;
        $scope.BUKRS = data.rst.enum.BUKRS;
        ORDER_DATA.BUKRS = $scope.BUKRS[0].code;
    });
    //成本中心
    /*var costcenter = inside.costcenter();
    costcenter.success(function(data){
        $scope.costcenterSel = data;
    });*/
    // 成本中心、费用种类
    $scope.selectType = {};
    var fysqdType = {};
    var enumlist = inside.enumlist({enums:['costcenter','fysqdcosttype']});
    enumlist.success(function(data){
        $scope.costcenterSel = data.data.costcenter;
        fysqdType = data.data.fysqdcosttype;
        for(var x in fysqdType){
            for(var i in fysqdType[x].sub){
                if(fysqdType[x].sub[i].text=='市场费用'){
                    delete fysqdType[x].sub[i];
                }
            }
        }
        $scope.selectType.categorySel = fysqdType; // 费用种类
    });
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    var person = $rootScope.loginPerson;
    console.log(person);
    $scope.selCostcenterFn = function () {
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 500,
            modal: true
        });
        $("#costCenterDialog").dialog("open");
        $scope.groupsTreeModel = $scope.costcenterSel;
        $scope.showSelected = function (sel) {
            $scope.selectedNode = sel;
        };
        $scope.selectTypeFn = function () {
            var val = $scope.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
            $scope.ORDER_DATA.RESPCCTR = val.code;


            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.addInside = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.ZSQJE == 0){
            swal("预算金额不能为0",'','warning');
            return false;
        }

        if($scope.selectType.fulltype !== ''){
            data.ZFYLX = $scope.selectType.fulltype;
            console.log($scope.selectType.fulltype)
            data.ZFYLXTXT = [$scope.selectType.categorySel[$scope.selectType.category].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].sub[$scope.selectType.fulltype].text].join('-');
        }else{
            data.ZFYLX = [$scope.selectType.category,$scope.selectType.costtype].join('');
            data.ZFYLXTXT = [$scope.selectType.categorySel[$scope.selectType.category].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].text].join('-');
        }


        data.ZSQRID = person.user.login;
        data.ZBMID = person.user.orgid;
        var param = {};
        var addParam = {};
        addParam.doc = data;
        param.doc = data;
        param.processId = $scope.processId;
        param.candidates = $scope.candidates;
        param.nodeId = $scope.nodeId;
        addParam.processId = $scope.processId;
        addParam.candidates = $scope.candidates;
        addParam.nodeId = $scope.nodeId;
        if(statue == "save"){
            var addInside = inside.addInside(param);
            addInside.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.candidates = data.rst.candidates;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else{
                    swal(data.msg,'','error');
                }
            });
            //swal({title: "保存成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/insideOrder'; });
        }else if(statue == 'apply'){
            var applyAdd = inside.applyAdd(addParam);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/insideOrder'; });
                } else{
                    swal(data.msg,'','error');
                }
            });
        }


    }
    $scope.resetData = function(data){
        $scope.ORDER_DATA ={};
    }
}]);
insideApp.controller('insideOrderEditCtrl', ['$scope','$stateParams', 'insideServices',function($scope, $stateParams, inside){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    if($stateParams.sapid){//判断数据来源（sap or 草稿）
        $scope.dataEdit = true;
        $scope.draftStatue = true;
        $scope.dataExplain = true;
    }else{
        $scope.draftEdit = true;
        $scope.dataExplain = false;
    }
    $scope.commonEdit = true;

    $scope.selectType = {};
    var viewCont = inside.viewInside({sapid:$stateParams.sapid, processId:$stateParams.processId});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.model;
        $scope.selectType.category = $scope.ORDER_DATA.ZFYLX.substr(0,2);
        $scope.selectType.costtype = $scope.ORDER_DATA.ZFYLX.substr(2,2);
        if($scope.ORDER_DATA.ZFYLX.length > 4){
            $scope.selectType.fulltype = $scope.ORDER_DATA.ZFYLX.substr();
        }
        if($scope.ORDER_DATA.USER3.indexOf('{') > -1 || $scope.ORDER_DATA.USER3.indexOf('}') > -1){
            $scope.ORDER_DATA.USER3 = eval('('+ $scope.ORDER_DATA.USER3 +')');
        }else{
            $scope.ORDER_DATA.USER3 = {
              describe : $scope.ORDER_DATA.USER3,
              instructions : $scope.ORDER_DATA.USER3
            }
        }

    });
    var updateData = inside.updateInside({});
    updateData.success(function(data) {
        $scope.PRCTRS = data.rst.enum.PRCTR;
        $scope.BUKRS = data.rst.enum.BUKRS;
        //console.log(ORDER_DATA.ZZJYSJE);
    });
    //成本中心
    /*var costcenter = inside.costcenter();NBDD2016000227
    costcenter.success(function(data){
        $scope.costcenterSel = data;
    });*/
    var fysqdType = {};
    var enumlist = inside.enumlist({enums:['costcenter','fysqdcosttype']});
    enumlist.success(function(data){
        $scope.costcenterSel = data.data.costcenter;
        fysqdType = data.data.fysqdcosttype;
        for(var x in fysqdType){
            for(var i in fysqdType[x].sub){
                if(fysqdType[x].sub[i].text=='市场费用'){
                    delete fysqdType[x].sub[i];
                }
            }
        }
        $scope.selectType.categorySel = fysqdType; // 费用种类
    });

    $scope.addInside = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.ZSQJE == 0){
            swal('预算金额不能为0','','warning');
            return false;
        }
        if($scope.ORDER_DATA.ZZJYSJE == 0){
            swal('请输入追加预算金额','','warning');
            return false;
        }
        var param = {};
        var addParam = {};
        data.USER3 = JSON.stringify($scope.ORDER_DATA.USER3);

        if($scope.selectType.fulltype){
            data.ZFYLX = $scope.selectType.fulltype;
            data.ZFYLXTXT = [$scope.selectType.categorySel[$scope.selectType.category].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].sub[$scope.selectType.fulltype].text].join('-');
        }else{
            data.ZFYLX = [$scope.selectType.category,$scope.selectType.costtype].join('');
            data.ZFYLXTXT = [$scope.selectType.categorySel[$scope.selectType.category].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].text].join('-');
        }

        addParam.doc = data;
        param.doc = data;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.sapid = $stateParams.sapid;
        addParam.sapid = $stateParams.sapid;
        var addInside = inside.addInside(param);
        addInside.success(function(data){
            if(statue == "save"){
                swal("保存成功", "", "success");
            }else if(statue == 'apply'){
                addParam.processId = data.rst.processId;
                if($stateParams.sapid){
                    addParam.nodeId = data.rst.nodeId;
                }else{
                    addParam.nodeId = $stateParams.nodeId;
                }
                addParam.candidates = data.rst.candidates;
                var applyAdd = inside.applyAdd(addParam);
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
                            window.location.href = '/index.html#/insideOrder';
                        });
                    }else{
                        swal({
                            title:'',
                            text:data.msg,
                            type:'error'
                        });
                    }
                });
            }

        });
    }
}]);
insideApp.controller('insideOrderViewCtrl', ['$scope', '$stateParams', 'insideServices',function($scope, $stateParams, inside){
    var ORDER_DATA = {};
    // 成本中心、费用种类
    var enumlist = inside.enumlist({enums:['costcenter','fysqdcosttype']});
    enumlist.success(function(data){
        $scope.costcenterSel = data.data.costcenter;
        $scope.categorySel = data.data.fysqdcosttype; // 费用种类
    });
    var viewCont = inside.viewInside({sapid:$stateParams.id});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.model;
        if($scope.ORDER_DATA.USER3.indexOf('{') > -1|| $scope.ORDER_DATA.USER3.indexOf('}')> -1){
            $scope.ORDER_DATA.USER3 = eval('(' + data.rst.model.USER3 + ')');
            $scope.ddms = true;
            $scope.ddms1 = false;
        }else{
            $scope.ORDER_DATA.USER3 =  data.rst.model.USER3;
            $scope.ddms = false;
            $scope.ddms1 = true;
        }


        $scope.enumObj = data.rst.enum;
        $scope.alreadyAppend = $scope.ORDER_DATA.ZZJYSJE ? true : false;
        $scope.AUARTTxt = {ZJ01: '市场费用', ZJ02: '直接运营费用',ZJ03:'项目前期费用', ZJ99:'间接运营费用'};
        $scope.BUKRSTxt = {1000: '中建材信息技术股份有限公司'};


        var details = inside.details({'AUFNR':$scope.ORDER_DATA.AUFNR});
        details.success(function(data){
            if(data.code == 200){
                $scope.DontuseMoney = data.rst;
            }
        });
    });


    /*//成本中心
    var costcenter = inside.costcenter();
    costcenter.success(function(data){
        $scope.costcenterSel = data;
    });*/
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = inside.getprocesslog({id: vm.ORDER_DATA.ZINORD,gettype:'group'});
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
insideApp.controller('insideEditCtrl', ['$scope', '$stateParams','$rootScope', 'insideServices',function($scope, $stateParams,$rootScope,inside){
    var person = $rootScope.loginPerson;
    // 成本中心、费用种类
    $scope.selectType={};
    var fysqdType = {};
    var enumlist = inside.enumlist({enums:['costcenter','fysqdcosttype']});
    enumlist.success(function(data){
        $scope.costcenterSel = data.data.costcenter;
        fysqdType = data.data.fysqdcosttype;
        for(var x in fysqdType){
            for(var i in fysqdType[x].sub){
                if(fysqdType[x].sub[i].text=='市场费用'){
                    delete fysqdType[x].sub[i];
                }
            }
        }
        $scope.selectType.categorySel = fysqdType; // 费用种类
    });
    var applyView = inside.interiorbills({processId: $stateParams.processId, nodeId: $stateParams.nodeId});
    applyView.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
           // $scope.ORDER_DATA.USER3 = eval("("+$scope.ORDER_DATA.USER3+")")
            $scope.itemsList = data.rst.doc.items;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.selectType.category = $scope.ORDER_DATA.ZFYLX.substr(0,2);
            $scope.selectType.costtype = $scope.ORDER_DATA.ZFYLX.substr(2,2);
            if($scope.ORDER_DATA.ZFYLX.length > 4){
                $scope.selectType.fulltype = $scope.ORDER_DATA.ZFYLX.substr();
            }
            $scope.NBDDZF = data.rst.property.type == 'NBDDZF' ? true : false;
            var updateData = inside.updateInside({});
            updateData.success(function(data) {
                $scope.PRCTRS = data.rst.enum.PRCTR;
                $scope.BUKRS = data.rst.enum.BUKRS;
                $scope.ORDER_DATA.BUKRS = $scope.BUKRS[0].code;
            });
            if(data.rst.doc.model.ZZJYSJE){
                $scope.ORDER_DATA.USER3 = eval("("+$scope.ORDER_DATA.USER3+")");
                $scope.dataInside = true;
                $scope.dataWater = true;
                $scope.dataEdit = true;
                $scope.dataBtn = false;
                $scope.editLable = false;
                $scope.zjfield = true;
                $scope.ddms = false;
            }else{
                $scope.dataBtn = true;
                $scope.dataEdit = false;
                $scope.dataInside = false;
                $scope.dataWater = false;
                $scope.editLable = true;
                $scope.zjfield = false;
                $scope.ddms = true;
            }
        }else {
            alert(data.msg);
        }
    }).error(function (error) {
        alert(error);
    });
    //成本中心
   /* var costcenter = inside.costcenter();
    costcenter.success(function(data){
        $scope.costcenterSel = data;
    });*/
    $scope.treeOptions = {
        nodeChildren: "sub",
        dirSelectable: false
    }
    $scope.selCostcenterFn = function () {
        $("#costCenterDialog").dialog({
            autoOpen: false,
            width: 500,
            modal: true
        });
        $("#costCenterDialog").dialog("open");
        $scope.groupsTreeModel = $scope.costcenterSel;
        $scope.showSelected = function (sel) {
            $scope.selectedNode = sel;
        };
        $scope.selectTypeFn = function () {
            var val = $scope.selectedNode;
            if (!val) {
                swal("请选择成本中心", "", "warning");
                return false;
            }
            $scope.ORDER_DATA.RESPCCTR = val.code;


            $("#costCenterDialog").dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.addInside = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.ZSQJE == 0){
            swal("预算金额不能为0",'','warning');
            return false;
        }

        if($scope.zjfield == true && $scope.ORDER_DATA.ZZJYSJE == 0){
            swal('请输入追加预算金额','','warning');
            return false;
        }
        var param = {},addParam = {};
        //var user3,copyUser3;
        //user3 = _.extend($scope.ORDER_DATA.USER3);
        if($scope.ORDER_DATA.ZZJYSJE){
            data.USER3 = JSON.stringify($scope.ORDER_DATA.USER3);

        }
        if($scope.selectType.fulltype !== ''){
            data.ZFYLX = $scope.selectType.fulltype;
            data.ZFYLXTXT = [$scope.selectType.categorySel[$scope.selectType.category].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].sub[$scope.selectType.fulltype].text].join('-');
        }else{
            data.ZFYLX = [$scope.selectType.category,$scope.selectType.costtype].join('');
            data.ZFYLXTXT = [$scope.selectType.categorySel[$scope.selectType.category].text,$scope.selectType.categorySel[$scope.selectType.category].sub[$scope.selectType.costtype].text].join('-');
        }

        data.ZSQRID = person.user.login;
        data.ZBMID = person.user.orgid;
        addParam.doc = data;
        param.doc = data;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        if($scope.NBDDZF == true){       //作废单独的save，createprocess
            var addInside = inside.insidenullifySave(param);
            addInside.success(function(data){
                if(statue == "save"){
                    if(data.code == 200){
                        swal("保存成功", "", "success");
                    }else{
                        swal(data.msg,'','error');
                    }

                }else if(statue == 'apply'){
                    addParam.processId = data.rst.processId;
                    addParam.candidates = data.rst.candidates;
                    addParam.nodeId = data.rst.nodeId;
                    data.USER3 = JSON.stringify(data.USER3);
                    var docheck = inside.insideDel({AUFNR:$scope.ORDER_DATA.AUFNR,ZINORD:$scope.ORDER_DATA.ZINORD});
                    docheck.success(function(data){
                        if(data.code == 200){
                            if(data.rst.data.pass == true){
                                var applyAdd = inside.insidenullify(addParam);
                                applyAdd.success(function(data){
                                    if(data.code == 200){
                                        swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/insideOrder'; });
                                    }else{
                                        swal(data.msg, '', 'error');
                                    }
                                });
                            }else{
                                swal(data.rst.data.msg,'','error');
                            }
                        }
                    });
                }

            });
        }else{
            var addInside = inside.addInside(param);
            addInside.success(function(data){
                if(statue == "save"){
                    if(data.code == 200){
                        swal("保存成功", "", "success");
                    }else{
                        swal(data.msg,'','error');
                    }

                }else if(statue == 'apply'){
                    addParam.processId = data.rst.processId;
                    addParam.candidates = data.rst.candidates;
                    addParam.nodeId = data.rst.nodeId;
                   // data.USER3 = JSON.stringify(data.USER3);
                    var applyAdd = inside.applyAdd(addParam);
                    applyAdd.success(function(data){
                        if(data.code == 200){
                            if($scope.ORDER_DATA.ZZJYSJE){
                                $scope.ORDER_DATA.USER3 = eval('('+addParam.doc.USER3+')');
                            }
                            swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/insideOrder'; });
                        }else{
                            if($scope.ORDER_DATA.ZZJYSJE){
                                $scope.ORDER_DATA.USER3 = eval('('+addParam.doc.USER3+')');
                            }
                            swal(data.msg, '', 'error');
                        }
                    });
                }

            });
        }

    }
}]);

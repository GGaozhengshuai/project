var signApp = angular.module('signApp', ['pageDirectives', 'formDirectives', 'ui.autocomplete']);

signApp.service('signService', function ($http) {
    var service = {
        listSign: function (param) {
            return $http.post('/sign/list', param, {cache: false});
        },
        viewSign: function (param) {
            return $http.post('/sign/read', param, {cache: true});
        },

        addSign: function (param) {
            return $http.post('/sign/save', param, {cache: false});
        },
        applyAdd: function (param) {
            return $http.post('/sign/createprocess', param, {cache: false});
        },
        updateSign: function (param) {
            return $http.post('/sign/update', param, {cache: false});
        },
        deleteSign: function (param) {
            return $http.post('/sign/delete', param, {cache: false});
        },
        listUser: function(param) {//用户接口
            return $http.post('/user/list', param);
        },
        // 审批接口
        applyView: function(param) {
            return $http.post('/sign/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/sign/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/sign/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/sign/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/sign/recall',param ,{cache:false});
        },
        getprocesslog: function (param) {
          return $http.post('/sign/getprocesslog', param);
        }

        }

    return service;
})

// controller
signApp.controller('signOrderCtrl', ['$scope','$stateParams','$http', '$rootScope', 'signService', function ($scope, $stateParams, $http, $rootScope, signSer) {
    // ...
	var person = $rootScope.loginPerson;

	$scope.creator = person.user.name;
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
                code: $scope.code,
                signtype: $scope.signtype,
                signpeople: $scope.signpeople,
                creator: $scope.creator
            };
            var customerPromise = signSer.listSign(param);

            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

    /*$scope.print=function(){
        $http.get('print/printsign.html').success(function(data){
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
    $scope.cArr = [];
    $scope.cArrcode = [];
    var updateSelected = function (action, id, code) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrcode.push(code);
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrcode.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, code) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, code);
    };
    // 清空
    $scope.emptyFn = function() {
        $scope.checkAll = false;
        $scope.cArr = [];
        $scope.cArrcode = [];
    };
    $scope.allCheck=function($event) {
        var checkbox = $event.target;
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.dataList.length; i++) {
                $scope.cArr[i] = $scope.dataList[i]._id;
                $scope.cArrcode[i] = $scope.dataList[i].code;
            }
        } else {
            $scope.cArr = [];
            $scope.cArrcode = [];
        }
    };

    $scope.printFn = function (e) {
        if($scope.cArr.length<=0){
            swal("请勾选列表", "", "warning");
            return false;
        }
        // &_id={{list._id}}&code={{list.code}}
        $(e.target).attr('href','/print/printht.html?uri=/sign/printview&_id='+ $scope.cArr.join(';;') +'&code=' + $scope.cArrcode.join(';;')) ;

    };
}]);

signApp.controller('signOrderAddCtrl', ['$scope', '$rootScope', 'signService', function ($scope, $rootScope, signSer) {
    // ...
    var ORDER_DATA = $scope.ORDER_DATA = {};

    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.creator = person.user.name;
    $scope.ORDER_DATA.signpeople = person.user.name;
    $scope.ORDER_DATA.signpeopleid = person.user._id;
    $scope.ORDER_DATA.signdept = person.user.orgname;
    $scope.ORDER_DATA.signdeptid = person.user.orgid;

    $scope.userOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            mustMatch:true,
            source: function (request, response) {
                var userPromise = signSer.listUser({page:1, limit:100, name:$scope.ORDER_DATA.signpeople});
                userPromise.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.items;
                        //$('.ui-autocomplete').css({'height': (dataItems.length<4 ? !dataItems.length ? '25px' : 25*dataItems.length +'px' : '100px')});
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: "" };
                            }else{
                                return { label:item.name, value: item.name, nameid:item._id, orgname:item.orgname, orgid:item.orgid };
                            }
                        }));
                    }else {
                        alert(data.msg);
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.signpeopleid = ui.item.nameid;
                $scope.ORDER_DATA.signdept = ui.item.orgname;
                $scope.ORDER_DATA.signdeptid = ui.item.orgid;
            }
        }
    };

    $scope.addData = function(data,statue){
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.myForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var addParam = {};
        var param={processId:$scope.processId,nodeId:$scope.nodeId};
        addParam.doc = data;
        param.doc = data;
        //prarm.doc.creator = person.user.name;
        if(statue == "save"){
            var addInside = signSer.addSign(param);
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
            var applyAdd = signSer.applyAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function(){
                        window.location.href='/index.html#/signOrder';
                    });
                }else {
                    alert(data.msg);
                }
            });
        }
    };
}]);

signApp.controller('signOrderEditCtrl', ['$scope', '$stateParams', 'signService', function ($scope, $stateParams, signSer) {
    // ...
    var ORDER_DATA =  $scope.ORDER_DATA ={};

    var viewCont = signSer.viewSign({processId:$stateParams.processId});
    viewCont.success(function (data) {
        if(data.code == 200) {
            $scope.ORDER_DATA = data.rst.data.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
        }
    });
    $scope.ORDER_DATA.userid = '';
    $scope.ORDER_DATA.departmentid = '';

    $scope.userOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            mustMatch:true,
            source: function (request, response) {
                var userPromise = signSer.listUser({page:1, limit:100, name:$scope.ORDER_DATA.signpeople});
                userPromise.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.items;
                        //$('.ui-autocomplete').css({'height': (dataItems.length<4 ? !dataItems.length ? '25px' : 25*dataItems.length +'px' : '100px')});
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            console.log( { label:item.NAME1 } )
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: "" };
                            }else{
                                return { label:item.name, value: item.name, nameid:item._id, orgname:item.orgname, orgid:item.orgid };
                            }
                        }));
                    }else {
                        alert(data.msg);
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.userid = ui.item.nameid;
                $scope.ORDER_DATA.signdept = ui.item.orgname;
                $scope.ORDER_DATA.departmentid = ui.item.orgid;
                console.log( $scope.ORDER_DATA, ui)
            }
        }
    };

    $scope.addData = function(data,statue){
        var requiredObj = $scope.myForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.myForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        var addParam = {};
        addParam.doc = data;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.doc = data;
        if(statue == "save"){
            var addInside = signSer.addSign(param);
            addInside.success(function(data){
                if(data.code == 200){
                    /*swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function(){
                        window.location.href='/index.html#/index';
                    });*/
                    swal("保存成功", "", "success");
                }else {
                    alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAdd = signSer.applyAdd(param);
            applyAdd.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function(){
                        window.location.href='/index.html#/index';
                    });
                }else {
                    alert(data.msg);
                }
            });
        }
    };
}]);

signApp.controller('signCtrl', ['$scope','$stateParams', 'signService', function ($scope,$stateParams, signSer) {
    // ...
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = signSer.applyView(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.purchaseList = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.ORDER_DATA =  $scope.doc.model;
            //$scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
           // $scope.comeList = data.rst.doc.items;

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
        }

    }).error(function(error){
        alert(error);
    });

    var applyObj =  $scope.applyObj ={};
    var flagAgree = false, flagDisagree = false, flagCancel = false, flagRecall = false;

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

        var addInside = signSer.addSign(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        var param = {};
        if(flagAgree) return;
        flagAgree = false;
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
      //  param.candidates = $scope.candidates;

        var applyAgree = signSer.agree(param);
        applyAgree.success(function(data){
            flagAgree = true;
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回签报待办",
                    closeOnConfirm: true
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=签报&&controllercode=QB'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        if(flagDisagree) return;
        flagDisagree = true;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = signSer.disagree(param);
        disagree.success(function(data){
            flagDisagree = false;
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回签报待办"
                }, function(){ window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=签报&&controllercode=QB'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        if (flagCancel) return;
        flagCancel = true;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = signSer.cancel(param);
        cancel.success(function(data){
            flagCancel = false;
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回签报待办",
                    closeOnConfirm: true
                }, function(){   window.location.href='/index.html#/typeList?myflag=mydoings&controllerName=签报&&controllercode=QB'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        if (flagRecall) return;
        flagRecall = true;
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = signSer.recall(param);
        recall.success(function(data){
            flagRecall = false;
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
}]);

signApp.controller('signOrderViewCtrl', ['$scope','$stateParams', 'signService', function ($scope, $stateParams, signSer) {
    // ...
    var ORDER_DATA;
    ORDER_DATA = {};
    var viewCont = signSer.viewSign({_id:$stateParams.id});

    viewCont.success(function(data) {
        if (data.code = 200) {
            $scope.ORDER_DATA = data.rst.data.model;
        }
    });

    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = signSer.getprocesslog({id: vm.ORDER_DATA.code}); // 直接取值数据中 申请人（proposer）
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


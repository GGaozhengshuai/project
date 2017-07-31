var materielApp = angular.module('materielApp',['pageDirectives','formDirectives']);
materielApp.service('materielService',function($http){
    var service = {
        materiel : function(param){
            return $http.post('contract/materiellist',param,{cache:false});
        },
        addInside: function (param) {//保存
            return $http.post('/materialmanagement/save', param, {cache: false});
        },
        applyAdd: function (param) {//提交
            return $http.post('/materialmanagement/createprocess', param, {cache: false});
        },
        applyView: function (param) {//审批中查看
            return $http.post('/materialmanagement/detail', param, {cache: false});
        },
        agree: function (param) {//同意
            return $http.post('/materialmanagement/agree', param, {cache: false});
        },
        disagree: function (param) {//不同意
            return $http.post('/materialmanagement/disagree', param, {cache: false});
        },
        cancel: function (param) {//驳回
            return $http.post('/materialmanagement/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/materialmanagement/recall', param, {cache: false});
        },
        enumlist: function(param) { // 枚举接口
            return $http.post('/purchase/enumlist',param ,{cache:true});
        },
    }
    return service;
});
materielApp.controller('materielOrderCtrl',['$scope','materielService',function($scope,materiel){
    $scope.ExcelList = [];
    $scope.orIf = true;
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,thecode:$scope.thecode};
            var customerPromise = materiel.materiel(param);
            customerPromise.success(function(data){
                $scope.MTART = data.rst.MTART;
                $scope.MATKL = data.rst.MATKL;
                $scope.orIf = true;
            });
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.$watchCollection('ExcelList',function(newValue,oldValue){
        $scope.dataList = newValue;
        $scope.orIf = false;
    });
}]);
materielApp.controller('materielAddCtrl',['$scope','$rootScope','materielService',function($scope,$rootScope,materiel){
    //产品线enume
    var enumlist = materiel.enumlist();
    enumlist.success(function(data) {
        if(data.code==200){
            $scope.ZZCP =  data.rst.enum.ZZCP;
        }else{
            swal(data.msg, "", "warning");
        }

    }).error(function(error){
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    /*删除*/
    $scope.filedataDel = function (idx) {
        $scope.fileData.splice(idx, 1);
    };
    $scope.addData = function (fileData, statue) {
        for(var i=0;i<fileData.length;i++){
            if(fileData[i].MESSAGE){
                swal("有错误数据上传！", "", "warning");
                return false;
            }
        }
        var doc = {}, param = {};
        var requiredObj2 = $scope.matForm.$error.required;
        console.log(requiredObj2)
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.matForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        doc.items = fileData;
        param.doc = doc;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {
            var addInside = materiel.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");
                } else {
                    $scope.fileData=data.rst.findById.doc.content.items;
                    swal(data.msg, "", "warning");

                }
            }).error(function (error) {
                swal({
                    title:'',
                    text:error,
                    type:"error"
                })
            });
        } else if (statue == 'apply') {
            //var applyAdd = materiel.applyAdd(param);
            //applyAdd.success(function(data){
            //    if(data.code == 200){
            //        swal({
            //            title: "提交成功",
            //            type: "success",
            //            showCancelButton: false,
            //            confirmButtonColor: "#DD6B55",
            //            confirmButtonText: "返回列表",
            //            closeOnConfirm: true
            //        }, function(){
            //            window.location.href='/index.html#/materielOrder';
            //        });
            //    }else {
            //        $scope.fileData=data.rst.findById.doc.content.items;
            //        swal(data.msg, "", "warning");
            //    }
            //}).error(function (error) {
            //    swal({
            //        title:'',
            //        text:error,
            //        type:"error"
            //    })
            //});



            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var applyAdd = materiel.applyAdd(param);
                applyAdd.success(function (data) {
                    if (data.code == 200) {
                        swal({
                            title: "提交成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function(){
                            window.location.href='/index.html#/materielOrder';
                        });
                    } else {
                        $scope.fileData=data.rst.findById.doc.content.items;
                        swal(data.msg, "", "warning");
                        //alert(data.msg);
                    }
                });
            };
            var addInside = materiel.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' && data.rst.candidates[0].coop!=='and')) {
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

                }else {
                    swal(data.msg, '', 'warning');
                }
            })

        }
    }

}]);
materielApp.controller('materielCtrl', ['$scope', '$stateParams', 'materielService', function ($scope, $stateParams, materiel) {
    //产品线enume
    var enumlist = materiel.enumlist();
    enumlist.success(function(data) {
        if(data.code==200){
            $scope.ZZCP =  data.rst.enum.ZZCP;
        }else{
            swal(data.msg, "", "warning");
        }

    }).error(function(error){
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    var mkParam = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(mkParam, {myflag: "mysubscriber" })
    }

    var viewCont = materiel.applyView(mkParam);
    viewCont.success(function (data) {
        if (data.code == 200) {
            $scope.fileData=data.rst.doc.items;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
            $scope.apCot = true;
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
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function (error) {
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    var applyObj = $scope.applyObj = {};
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

        var addInside = materiel.addInside(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function (applyObj) {
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        var customerAgree = materiel.agree(param);
        customerAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=物料&&controllercode=MM';
                });
            }else {
                swal({
                    title:'',
                    text:data.msg,
                    type:'error'
                });
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    }
    $scope.applyDisagree = function () {//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = materiel.disagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=物料&&controllercode=MM';
                });
            } else {
                swal("驳回失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    }
    $scope.applyCancel = function () {//取消
        var param = {};
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        var cancel = materiel.cancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回我的单据",
                    closeOnConfirm: true
                }, function(){
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=物料&&controllercode=MM';
                });
            } else {
                swal("取消失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    }
    $scope.applyRecall = function () {//召回
        var param = {};
        param.comment = applyObj.applyIdea;
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        var recall = materiel.recall(param);
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
                swal("召回失败！", '', "error");
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    }

}]);
materielApp.controller('materielEditCtrl', ['$scope', '$stateParams', 'materielService', function ($scope,$stateParams, materiel) {
    //产品线enume
    var enumlist = materiel.enumlist();
    enumlist.success(function(data) {
        if(data.code==200){
            $scope.ZZCP =  data.rst.enum.ZZCP;
        }else{
            swal(data.msg, "", "warning");
        }

    }).error(function(error){
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    var mkParam = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(mkParam, {myflag: "mysubscriber" })
    }

    var materielData = materiel.applyView(mkParam);
    materielData.success(function(data){
        if (data.code == 200) {
            $scope.fileData = data.rst.doc.items;
            $scope.processId=data.rst.processId;
            $scope.nodeId=data.rst.nodeId;
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function (error) {
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });

    $scope.filedataDel = function (idx) {
        $scope.fileData.splice(idx, 1);
    };
    $scope.addData = function (fileData, statue) {
        for(var i=0;i<fileData.length;i++){
            if(fileData[i].MESSAGE){
                swal("有错误数据上传！", "", "warning");
                return false;
            }
        }
        var doc = {}, param = {};
        var requiredObj2 = $scope.matForm.$error.required;
        console.log(requiredObj2)
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })

        if(!$scope.matForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        doc.items = fileData;
        param.doc = doc;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {
            var addInside = materiel.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal("保存成功", "", "success");
                } else {
                    $scope.fileData=data.rst.findById.doc.content.items;
                    swal(data.msg, "", "warning");

                }
            }).error(function (error) {
                swal({
                    title:'',
                    text:error,
                    type:"error"
                })
            });
        } else if (statue == 'apply') {
            //var applyAdd = materiel.applyAdd(param);
            //applyAdd.success(function(data){
            //    if(data.code == 200){
            //        swal({
            //            title: "提交成功",
            //            type: "success",
            //            showCancelButton: false,
            //            confirmButtonColor: "#DD6B55",
            //            confirmButtonText: "返回列表",
            //            closeOnConfirm: true
            //        }, function(){
            //            window.location.href='/index.html#/materielOrder';
            //        });
            //    }else {
            //        $scope.fileData=data.rst.findById.doc.content.items;
            //        swal(data.msg, "", "warning");
            //    }
            //}).error(function (error) {
            //    swal({
            //        title:'',
            //        text:error,
            //        type:"error"
            //    })
            //});

            //保存添加候选人

            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var applyAdd = materiel.applyAdd(param);
                applyAdd.success(function (data) {
                    if (data.code == 200) {
                        swal({
                            title: "提交成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function(){
                            window.location.href='/index.html#/materielOrder';
                        });
                    } else {
                        $scope.fileData=data.rst.findById.doc.content.items;
                        swal(data.msg, "", "warning");
                    }
                });
            };
            var addInside = materiel.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' && data.rst.candidates[0].coop!=='and')) {
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

                }else {
                    swal(data.msg, '', 'warning');
                }
            })

        }
    }
}]);
materielApp.controller('materielViewCtrl', ['$scope', '$stateParams', '$http', 'materielService', function ($scope, $stateParams,$http, materiel) {
//产品线enume
    var enumlist = materiel.enumlist();
    enumlist.success(function(data) {
        if(data.code==200){
            $scope.ZZCP =  data.rst.enum.ZZCP;
        }else{
            swal(data.msg, "", "warning");
        }

    }).error(function(error){
        swal({
            title:'',
            text:error,
            type:"error"
        })
    });
    var viewCont = materiel.viewInside({_id:$stateParams.id});
    viewCont.success(function (data) {
        if (data.code == 200) {

        }
    })
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1;
    vm.processlog = null;

    vm.htTab = function (type) {
        // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
        if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = materiel.getprocesslog({type: 'MM', id: vm.sdef.XBLNR}); // 直接取值数据中 申请人（proposer）
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
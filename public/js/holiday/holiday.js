var holidayApp = angular.module('holidayApp', ['pageDirectives', 'formDirectives']);
holidayApp.service('holidayServices', function ($http) {
    var service = {
        listInside: function (param) {//查询接口
            return $http.post('/holiday/list', param, {cache: false});
        },
        holidayType: function (param) {//休假类型
            return $http.post('/holiday/types', param, {cache: false});
        },
        holidayCancle: function (param) {//作废
            return $http.post('/holiday/discard', param, {cache: false});
        },
        holidayTotal: function (param) {//请假合计
            return $http.post('/holiday/totaldays', param, {cache: false});
        },
        statistics: function (param) {//统计信息
            return $http.post('/holiday/statistics', param, {cache: false});
        },
        addInside: function (param) {//保存
            return $http.post('/holiday/save', param, {cache: false});
        },
        applyAdd: function (param) {//提交
            return $http.post('/holiday/createprocess', param, {cache: false});
        },
        applyView: function (param) {//审批中查看
            return $http.post('/holiday/detail', param, {cache: false});
        },
        agree: function (param) {//同意
            return $http.post('/holiday/agree', param, {cache: false});
        },
        disagree: function (param) {//不同意
            return $http.post('/holiday/disagree', param, {cache: false});
        },
        cancel: function (param) {//驳回
            return $http.post('/holiday/cancel', param, {cache: false});
        },
        recall: function (param) {//召回
            return $http.post('/holiday/recall', param, {cache: false});
        },
        viewInside: function (param) {//审批完成查看
            return $http.post('/holiday/view', param, {cache: true});
        },
        listUser: function(param){//申请人员
            return $http.post('/user/list',param);
        },
        getprocesslog: function (param) {
          return $http.post('/holiday/getprocesslog', param)
        }
    };
    return service;
});
holidayApp.controller('holidayOrderCtrl', ['$scope', '$rootScope','$filter','holidayServices',function($scope,$rootScope,$filter,holiday){
    //默认登陆人信息
    var person = $rootScope.loginPerson;
    $scope.login= person.user.login;
    $scope.name= person.user.name;
    //日期为必填项，默认给当年的第一天和当年的最后一天
    $scope.dayOk=false;
    var day = new Date();
    $scope.begin_date=day.getFullYear()+"-01-01";
    $scope.end_date=day.getFullYear()+"-12-31";
    //假期类型
  var  holidayType=holiday.holidayType();
    holidayType.success(function(data){
        if(data.code==200){
            $scope.holidayData=data.rst.enum;
        }
    });
    //翻译
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    //作废限制
    var day = new Date();
    var str = $filter('date')(day,'yyyy-MM-dd');
    var limitHoliday=function(today,cur,data){
        if(Date.parse(cur)<=Date.parse(today)){
            data.cancel=false;//作废日期大于等于请假日期不可作废
        }else{
            data.cancel=true;
        }
    }
  //查询开始日期不能大于结束日期
    $scope.dateLimit=function(begin,end){
      if(begin&&end){
        if(Date.parse(end)<Date.parse(begin)){
          swal("查询开始日期不能大于结束日期", "", "warning");
          $scope.dayOk=true;
          return false;
        }else{
          if($scope.name){
            $scope.dayOk=false;
          }else{
            $scope.dayOk=true;
          }

        }
      }else{
        $scope.dayOk=true;
      }
    }
    //查询历史数据
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {
                page:$scope.paginationConf.currentPage,
                limit:$scope.paginationConf.itemsPerPage,
                login:$scope.login,
                begin_date:$scope.begin_date,
                end_date:$scope.end_date,
                off_type:$scope.off_type
            };
            var holidayPromise = holiday.listInside(param);
            holidayPromise.success(function(data){
                if(data.code==200){
                    if(data.rst.data.items.length>0){
                        $scope.dataList=data.rst.data.items;
                        for(var i= 0,length=$scope.dataList.length;i<length;i++){
                            limitHoliday(str,$scope.dataList[i].begin_date,$scope.dataList[i]);
                        }
                    }
                }
            })
            $scope.paginationConf.pagePromise = holidayPromise;
        }
    };


    //作废
    $scope.destroy=function(docno,index){
        var  holidayDestroy=holiday.holidayCancle({docno:docno});
        holidayDestroy.success(function(data){
            if(data.code==200){
                swal(data.rst, "", "warning");
                window.location.reload();

            }else{
                swal(data.msg, "", "warning");
            }
        });
    }
}]);
holidayApp.controller('nameCtrl', ['$scope','holidayServices',function($scope,holiday){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {
                page:$scope.paginationConf.currentPage,
                limit:$scope.paginationConf.itemsPerPage,
                name:$scope.useSname
            };
            var customerPromise =  holiday.listUser(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
holidayApp.controller('holidayAddCtrl', ['$rootScope','$scope','holidayServices', function ($rootScope,$scope,holiday) {
   $scope.sdef= {};
    $scope.sdef.user= {};
   $scope.sdef.department= {};
    //统计信息方法
    var statistics=function(par){
        holiday.statistics(par).success(function(data){
            if(data.code==200){
                $scope.holidayNum=data.rst.data.off_days||[];//总天数
                $scope.holidayLeft=data.rst.data.left_days_y||[];//剩余天数
                $scope.totalObj={},$scope.leftObj={};
                for(var i= 0,length=$scope.holidayNum.length;i<length;i++){
                    $scope.totalObj[$scope.holidayNum[i].off_name]=$scope.holidayNum[i].days;
                }
                for(var j= 0,length=$scope.holidayLeft.length;j<length;j++){
                    $scope.leftObj[$scope.holidayLeft[j].off_name]=$scope.holidayLeft[j].days;
                }
                $scope.leftObj['医疗期'] = $scope.leftObj['医疗期'] ? $scope.leftObj['医疗期'] : 0
                $scope.leftObj['探亲假'] = $scope.leftObj['探亲假'] ? $scope.leftObj['探亲假'] : 0
            } else {
              $scope.totalObj={},$scope.leftObj={};
            }
        });
    }
    //获取登录人信息
    var person = $rootScope.loginPerson;
    $scope.sdef.user.login= person.user.login;
    $scope.sdef.user.name= person.user.name;
    $scope.sdef.user._id= person.user._id;
    $scope.sdef.department.name= person.user.orgname;
    $scope.sdef.department._id= person.user.orgid;
    statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type});//登陆人休假统计
    //更改申请人
    $scope.userBox = function(userType){
        $("#userBox").dialog({
            autoOpen: false,
            width: 800,
            modal: true
        });
        $("#userBox").dialog("open");
    };

    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        $scope.sdef.begin_date="";
        $scope.sdef.end_date="";
        $scope.sdef.off_days="";
        $scope.sdef.user.login =login;
        $scope.sdef.user.name =user;
        $scope.sdef.user._id =userId;
        $scope.sdef.department.name=orgName;
        $scope.sdef.department._id=orgId;
        $scope.openDialog = false;
        statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type});//申请人休假统计
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    //休假类型
    var  holidayType=holiday.holidayType();
    holidayType.success(function(data){
        if(data.code==200){
            $scope.holidayData=data.rst.enum;
        }
    });
    //更改假期类型
    $scope.typeChange=function(){
        statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type});
    }
    //请假合计
    $scope.totalDay=function(begin_date,begin_time,end_date,end_time,off_type){
        $scope.sdef.off_days="";
        if($scope.sdef.end_date&&$scope.sdef.begin_date&&off_type){
            var param={begin_date:begin_date,begin_time:begin_time,end_date:end_date,end_time:end_time, login:$scope.sdef.user.login,off_type:off_type}
            var  totalDay=holiday.holidayTotal(param);
            totalDay.success(function(data){
                if(data.code==200){
                    $scope.sdef.off_days=data.rst.data.days;
                }else{
                    swal(data.msg, "", "warning");
                    if($scope.sdef.end_date&&$scope.sdef.begin_date){
                        $scope.sdef.end_date="";
                        $scope.sdef.begin_date="";
                    }
                }
            });
        }

    }
    //保存提交
    $scope.addData = function (data, statue) {
        var requiredObj2 = $scope.leaveForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.leaveForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        param.doc = {};
        param.doc.model =data;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        if (statue == "save") {//保存
            var addInside = holiday.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    $scope.processId=data.rst.processId;
                    $scope.nodeId=data.rst.nodeId;
                    swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/holidayOrder';
                    });
                } else {
                    swal(
                        {
                            title: "",
                            text: data.msg,
                            type: "warning",
                        })
                }
            });
        }else if(statue == 'apply'){//提交
            var applyAdd = holiday.applyAdd(param);
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
                        window.location.href='/index.html#/holidayOrder';
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }
}]);
holidayApp.controller('holidayCtrl', ['$scope', '$stateParams', '$state', 'holidayServices', function ($scope, $stateParams, $state, holiday) {
    $scope.sdef= {};
    $scope.sdef.user= {};
    $scope.sdef.department= {};
    //假期类型
    var  holidayType=holiday.holidayType();
    holidayType.success(function(data){
        if(data.code==200){
            $scope.holidayData=data.rst.enum;
        }
    });
    //翻译
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = holiday.applyView(param);//页面数据
    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.sdef = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            holiday.statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type}).success(function(data){
                if(data.code==200){
                    $scope.holidayNum=data.rst.data.off_days||[];//总天数
                    $scope.holidayLeft=data.rst.data.left_days_y||[];//剩余天数
                    $scope.totalObj={},$scope.leftObj={};
                    for(var i= 0,length=$scope.holidayNum.length;i<length;i++){
                        $scope.totalObj[$scope.holidayNum[i].off_name]=$scope.holidayNum[i].days;
                    }
                    for(var j= 0,length=$scope.holidayLeft.length;j<length;j++){
                        $scope.leftObj[$scope.holidayLeft[j].off_name]=$scope.holidayLeft[j].days;
                    }
                    $scope.leftObj['医疗期'] = $scope.leftObj['医疗期'] ? $scope.leftObj['医疗期'] : 0
                    $scope.leftObj['探亲假'] = $scope.leftObj['探亲假'] ? $scope.leftObj['探亲假'] : 0
                  } else {
                    $scope.totalObj={},$scope.leftObj={};
                  }
            });
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
                $scope.apCot = data.rst.processlog.length > 1 ? true : false;
                //$scope.apCot = false;
            }
        } else {
            swal(data.msg, "", "warning");
        }
    }).error(function (error) {
        swal({
            title: "",
            text: error,
            type: "error"
        })
    });
    var applyObj = $scope.applyObj = {};
    $scope.applySave = function(){//保存

        var param = {};
        param.doc =$scope.doc;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        var addInside = holiday.addInside(param);
        addInside.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function (applyObj) {//同意
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        var customerAgree = holiday.agree(param);
        customerAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回请休假待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=请休假&&controllercode=QXJ';
                });
            } else {
                swal(data.msg, '', "error");
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
        var disagree = holiday.disagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回请休假待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=请休假&&controllercode=QXJ';
                });
            } else {
                swal("提交失败", '', "error");
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
        var cancel = holiday.cancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回请休假待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=请休假&&controllercode=QXJ';
                });
            } else {
                swal("提交失败", '', "error");
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
        var recall = holiday.recall(param);
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
                swal("提交失败", '', "error");
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
holidayApp.controller('holidayEditCtrl', ['$scope', '$stateParams', 'holidayServices', function ($scope, $stateParams, holiday) {
    $scope.sdef= {};
    $scope.sdef.user= {};
    $scope.sdef.department= {};
    //信息统计
    var statistics=function(par){
        holiday.statistics(par).success(function(data){
            if(data.code==200){
                $scope.holidayNum=data.rst.data.off_days||[];//总天数
                $scope.holidayLeft=data.rst.data.left_days_y||[];//剩余天数
                $scope.totalObj={},$scope.leftObj={};
                for(var i= 0,length=$scope.holidayNum.length;i<length;i++){
                    $scope.totalObj[$scope.holidayNum[i].off_name]=$scope.holidayNum[i].days;
                }
                for(var j= 0,length=$scope.holidayLeft.length;j<length;j++){
                    $scope.leftObj[$scope.holidayLeft[j].off_name]=$scope.holidayLeft[j].days;
                }
                $scope.leftObj['医疗期'] = $scope.leftObj['医疗期'] ? $scope.leftObj['医疗期'] : 0
                $scope.leftObj['探亲假'] = $scope.leftObj['探亲假'] ? $scope.leftObj['探亲假'] : 0
              } else {
                $scope.totalObj={},$scope.leftObj={};
              }
        });
    }
    var param = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = holiday.applyView(param);//获取页面数据
    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.sdef = data.rst.doc.model;
            statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type});//获取统计信息
        } else {
            swal(data.msg, "", "warning");
        }
    }).error(function (error) {
        swal({
            title: "",
            text: error,
            type: "error"
        })
    });
    //申请人变更
    $scope.userBox = function(userType){
        $("#userBox").dialog({
            autoOpen: false,
            width: 800,
            modal: true
        });
        $("#userBox").dialog("open");
    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        $scope.sdef.begin_date="";
        $scope.sdef.end_date="";
        $scope.sdef.off_days="";
        $scope.sdef.user.login =login;
        $scope.sdef.user.name =user;
        $scope.sdef.user._id =userId;
        $scope.sdef.department.name=orgName;
        $scope.sdef.department._id=orgId;
        $scope.openDialog = false;
        statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type});//申请人休假统计
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    //假期类型
    var  holidayType=holiday.holidayType();
    holidayType.success(function(data){
        if(data.code==200){
            $scope.holidayData=data.rst.enum;
        }
    });
    //更改假期类型
    $scope.typeChange=function(){
        statistics({login:$scope.sdef.user.login,type_name:$scope.sdef.off_type});
    }
    //合计天数
    $scope.totalDay=function(begin_date,begin_time,end_date,end_time,off_type){
        $scope.sdef.off_days="";
        if($scope.sdef.end_date&&$scope.sdef.begin_date&&off_type){
            var param={begin_date:begin_date,begin_time:begin_time,end_date:end_date,end_time:end_time, login:$scope.sdef.user.login,off_type:off_type}
            var  totalDay=holiday.holidayTotal(param);
            totalDay.success(function(data){
                if(data.code==200){
                    $scope.sdef.off_days=data.rst.data.days;
                }else{
                    swal(data.msg, "", "warning");
                    if($scope.sdef.end_date&&$scope.sdef.begin_date){
                        $scope.sdef.end_date="";
                        $scope.sdef.begin_date="";
                    }
                }
            });
        }

    }
    $scope.addData = function (data, statue) {
        var requiredObj2 = $scope.leaveForm.$error.required;
        angular.forEach(requiredObj2,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.leaveForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var param = {};
        param.doc = {};
        param.doc.model =data;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if (statue == "save") {//保存
            var addInside = holiday.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    swal({
                        title: "保存成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回列表",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = '/index.html#/holidayOrder';
                    });
                } else {
                    swal(
                        {
                            title: "",
                            text: data.msg,
                            type: "warning",
                        })
                }
            });
        }else if(statue == 'apply'){//提交
            var applyAdd = holiday.applyAdd(param);
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
                        window.location.href='/index.html#/holidayOrder';
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }
}]);
holidayApp.controller('holidayViewCtrl', ['$scope', '$stateParams',  'holidayServices', function ($scope, $stateParams, holiday) {
    $scope.sdef= {};
    //假期类型
    var  holidayType=holiday.holidayType();
    holidayType.success(function(data){
        if(data.code==200){
            $scope.holidayData=data.rst.enum;
        }
    });
    //翻译
    $scope.getField = function (obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var param = {sapid: $stateParams.id};
    var viewPur = holiday.viewInside(param);//获取页面数据
    viewPur.success(function (data) {
        if (data.code == 200) {
            $scope.sdef = data.rst.data.model;
            holiday.statistics({login:$scope.sdef.login,type_name:$scope.sdef.type}).success(function(data){
                if(data.code==200){
                    $scope.holidayNum=data.rst.data.off_days||[];//总天数
                    $scope.holidayLeft=data.rst.data.left_days_y||[];//剩余天数
                    $scope.totalObj={},$scope.leftObj={};
                    for(var i= 0,length=$scope.holidayNum.length;i<length;i++){
                        $scope.totalObj[$scope.holidayNum[i].off_name]=$scope.holidayNum[i].days;
                    }
                    for(var j= 0,length=$scope.holidayLeft.length;j<length;j++){
                        $scope.leftObj[$scope.holidayLeft[j].off_name]=$scope.holidayLeft[j].days;
                    }
                    $scope.leftObj['医疗期'] = $scope.leftObj['医疗期'] ? $scope.leftObj['医疗期'] : 0
                    $scope.leftObj['探亲假'] = $scope.leftObj['探亲假'] ? $scope.leftObj['探亲假'] : 0
                }
            });
        } else {
            swal(data.msg, "", "warning");
        }
    }).error(function (error) {
        swal({
            title: "",
            text: error,
            type: "error"
        })
    });
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = holiday.getprocesslog({id: vm.sdef._id}); // 直接取值数据中 docno
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


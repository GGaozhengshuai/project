var occupyApp = angular.module('occupyApp', ['pageDirectives','formDirectives','uploadifyApp']);
occupyApp.service('occupyServices', function($http) {
    var service = {
        listInside: function(param) {
            return $http.post('/cpzy/list',param ,{cache:false});
        },
        viewInside: function(param) {
            return $http.post('/cpzy/view',param ,{cache:true});
        },
        addInside: function(param){
            return $http.post('/cpzy/save',param ,{cache:false});
        },
        updateInside: function(param){
            return $http.post('/cpzy/update',param ,{cache:false});
        },
        deleteInside: function(param){
            return $http.post('/cpzy/release',param ,{cache:false});
        },
        selectstock: function(param){//库存查询
            return $http.post('/cpzy/selectstock',param ,{cache:false});
        },
        stockType: function(){//库存查询
            return $http.post('/cpzy/enum' , {cache:false});
        },
        customerList: function(param) {//客户名称
            return $http.post('/customer/list',param ,{cache:false});
        },
        listUser: function(param){//用户接口
            return $http.post('/user/list',param);
        },
        poheaderEnum : function(param){
            return $http.post('/poheader/enumlist',param,{cache:true});
        }
    };
    return service;
});

occupyApp.controller('customerListCtrl', ['$scope','occupyServices',function($scope,occupy){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, NAME:$scope.NAME, KUNNR: $scope.KUNNR};
            var customerPromise = occupy.customerList(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

}]);
occupyApp.controller('ccBoxCtrl', ['$scope','occupyServices',function($scope,occupy){
    var lgortArr = [];
    var stockType = occupy.stockType();
    stockType.success(function(data){
        if(data.code==200) {
            $scope.stockType = data.rst.data.enum;
            $scope.stockType.LGORT1.forEach(function(i){
              lgortArr.push(i.code);
            });
        }
    })
    var poheaderEnum = occupy.poheaderEnum();
        poheaderEnum.success(function(data){
            if(data.code == 200){
                $scope.enumObj = data.rst.enum;
            }
        });

    $scope.search = function(){
        if($scope.MATNR == ''&& $scope.BISMT == ''){
            swal('物料编码与供应商物料编码请至少输入一个值','','warning');
            return false;
        }
        var param  = {MATNR:$scope.MATNR,BISMT:$scope.BISMT,MATKL:$scope.MATKL,ZKCLX:$scope.ZKCLX,LGORT:lgortArr};
        var customerPromise = occupy.selectstock(param);
        customerPromise.success(function(data){
            if(data.code == 200){
                $scope.dataList = data.rst.data.items;
                var enumLgort = occupy.stockType();
                enumLgort.success(function(data){
                    for(var x in $scope.dataList){
                        if($scope.dataList[x].MATKL){
                            var type = getField(data.rst.data.enum,'code',$scope.dataList[x].MATKL);
                            $scope.matkl = type.name;
                        }
                        if($scope.dataList[x].LGORT){
                            var type = getField(data.rst.data.enum,'code',$scope.dataList[x].LGORT);
                            $scope.LGORT = type.name;
                        }
                        /*if($scope.dataList[x].LGORT){
                            var type = getField(data.rst.data.enum,'code',$scope.dataList[x].LGORT);
                            $scope.LGORT = type.name;
                        }*/
                    }
                });
            }else {
                alert(data.msg);
            }
        })
    }

}]);

occupyApp.controller('occupyOrderCtrl', ['$scope','$rootScope','occupyServices',function($scope,$rootScope,occupy){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, MATNR:$scope.MATNR, LGORT: $scope.LGORT, AUFUSER0: $scope.AUFUSER0,NAME1:$scope.NAME1,ZZYR:$scope.ZZYR,isrelease:$scope.isrelease};
            var customerPromise = occupy.listInside(param);
            customerPromise.success(function(data){
                if(data.code==200){
                    $scope.dataList=data.rst.data.items;
                    //产品经理 权限控制释放
                     var person = $rootScope.billPrev;
                     $scope.opprev = $rootScope.opprev;    //权限控制

                     var personMsg = $rootScope.loginPerson;
                     console.log(personMsg)
                     $scope.username = personMsg.user.name;
                     if(personMsg.user.orgname.indexOf('产品部') > -1 || personMsg.user.orgname.indexOf('分销业务部') > -1){
                         $scope.permissions = true;
                     }else{
                         $scope.permissions = false;;
                     }
                    var enumLgort = occupy.stockType();
                    enumLgort.success(function(data){
                       $scope.stockType = data.rst.data.enum;
                    });
                }else{
                    alert(data.msg);
                }
            })
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.delete = function(SQDH, index){
        swal(
            {
                title: "确定释放此用户吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定'
            },
            function () {

                var deleteUser = occupy.deleteInside({SQDH:SQDH});
                deleteUser.success(function (data) {
                    if (data.code == 200) {
                        /*var indexTr = $("#occTable").find('.list').eq(index);
                        indexTr.find(".sfbtn:eq(0)").remove();*/
                        swal('释放成功','','success');
                        $scope.search()
                    } else {
                        swal('释放失败','','error');
                    }
                }).error(function (error) {
                    alert(error);
                });
            }
        );
    }
}]);

occupyApp.controller('occupyOrderAddCtrl', ['$scope','$rootScope','occupyServices',function($scope,$rootScope,occupy){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    //var cgList = $scope.cgList =[{MATNR:'', LGORT:'', ZMOUNT:'', ZSFSL:'', ZZYR:'',KUNNR:'',NAME1:'', SQYY:''}];
    var cgList = $scope.cgList =[];
    var excleData = $scope.excleData =[];
    $scope.comeAdd = function(){
        $( "#ccBox" ).dialog({
            autoOpen: false,
            width: 800,
            modal: true,
            height:600
        });
        $( "#ccBox" ).dialog( "open" );
        var ckbox = $("#ccTable").find("[checked='checked']");
        $(ckbox).each(function(key, value){
            $(this).removeAttr("checked");
        });
    }

    $scope.checkSelect = function(idx){
        var parent = $("#ccTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr("checked",'checked');
        }else{
            check.removeAttr("checked");
        }
    }
    $scope.ccCancle = function(){
        $( "#ccBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    var person = $rootScope.loginPerson;
    // var person = $cookieStore.get("persion");
    $scope.userName = person.username;

    var userIdx;
    $scope.ccSelect = function(){
        var cArr = $scope.cgList;
        var ckbox = $("#ccTable").find("[checked='checked']");
        var ccList = [];
        $(ckbox).each(function(key, value){
            var par = $(this).parent().parent();
            var arr = {};
            if(person.user.orgname.indexOf('产品部') > -1 || person.user.orgname.indexOf('分销业务部') > -1){
                arr.ZYFS='部门';
            }else{
                arr.ZYFS='员工';
            }
            arr.MATNR = par.find("td:eq(1)").html();
            arr.stockLgort = par.find("td:eq(5)").html();
            arr.LGORT = par.find("td input:eq(1)").val();
            arr.ZKZYSL = par.find("td:eq(7)").html();
            arr.ZSFSL = '';
           // arr.ZZYRMS = person.user.name;
           // arr.ZZYR = $scope.userName;
            arr.KUNNR = '';
            arr.NAME1 = '';
            arr.SQYY = '';
            ccList.push(arr);
        });
        $scope.cgList = cArr.concat(ccList);
        $( "#ccBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.userBox = function(idx){
        userIdx = idx;
        $( "#userNameBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#userNameBox" ).dialog( "open" );
    }
    $scope.userSelect = function(user,login){
        for(var x in $scope.cgList){
            $scope.cgList[userIdx].ZZYRMS = user;
            $scope.cgList[userIdx].ZZYR = login;
        }
        for(var i in $scope.excleData){
            $scope.excleData[userIdx].ZZYRMS = user;
            $scope.excleData[userIdx].ZZYR = login;
        }
        for(var j in $scope.excleError){
            $scope.excleError[userIdx].ZZYRMS = user;
            $scope.excleError[userIdx].ZZYR = login;
        }

        $( "#userNameBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    var khIndex = 0;
    $scope.customerBox = function(index){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        khIndex = index;
    }
    $scope.cusCancle = function(){
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.cusSelect = function(id,name){
        var tr = $("#cgList").find(".list").eq(khIndex);
        tr.find(".KUNNR:eq(0)").val(id).trigger('change');
        tr.find(".NAME1:eq(0)").val(name).trigger('change');
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    $scope.comeDel = function(idx,type){
        if(type=='exc'){
            $scope.excleData.splice(idx,1);
        }else if(type == 'error'){
            $scope.excleError.splice(idx,1);
        }else{
            $scope.cgList.splice(idx,1);
        }
    }
    $scope.sqzyNum=function(ZKZYSL,ZMOUNT){
        if(parseInt(ZKZYSL)<parseInt(ZMOUNT)){
            $scope.reminder=true;
        }else{
            $scope.reminder=false;
        }
    }
    var enumLgort = occupy.stockType();
    enumLgort.success(function(data){
        $scope.enumobj = data.rst.data.enum;
    });
    $scope.addData = function(){
        for(var x in $scope.cgList){
           // $scope.cgList[x].ZZYRMS = $scope.cgList[x].ZZYR;
            delete $scope.cgList[x].stockLgort;
        }
        if($scope.cgList.length <= 0 && $scope.excleData.length <= 0){
            swal('请添加数据', '',"warning");
            return false;
        }
        for(var x in $scope.cgList){
            if($scope.cgList[x].ZMOUNT == 0){
                swal('申请占用数量不能为0', '',"warning");
                return false;
            }
        }
        var arr = $scope.cgList.concat($scope.excleData);
        var param = {doc:{ITEM_DATA:arr}};

        var addInside = occupy.addInside(param);
        addInside.success(function(data){
            if(data.code == 200){
                if(data.rst.STATUS == '0'){
                    $scope.excleData = [];
                    $scope.cgList = data.rst.RETURN;
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/occupyOrder'; });
                }else {
                    $scope.excleData = [];
                    $scope.cgList = data.rst.RETURN;
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/occupyOrder'; });
                }

            }else {
                swal({title:'',text:data.msg,type:'error'});
            }
        });
    }
}]);
occupyApp.controller('userCtrl', ['$scope','occupyServices',function($scope,occupy){
    $scope.userSearch = function(){
        if($scope.useSname==''){
            swal("必须输入查询条件", "", "warning");
            return false;
        }
        var param  = {page:1, limit:10, name:$scope.useSname};
        var listUser = occupy.listUser(param);
        listUser.success(function(data){
            if(data.code == 200){
                $scope.userDateList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    }
}]);
occupyApp.controller('occupyOrderEditCtrl', ['$scope','$stateParams', 'occupyServices',function($scope, $stateParams, occupy){
    var ZKZYSL;  ///可占用库存数量
    var yshistoryNum; ///原始占用数量
    var LGORTArr=[]
    var viewCont = occupy.viewInside({SQDH:$stateParams.id});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.items;
        $scope.yshistoryNum = $scope.ORDER_DATA.ZMOUNT;
        var enumLgort = occupy.stockType();
        enumLgort.success(function(data){
            if($scope.ORDER_DATA.LGORT){
                var type = getField(data.rst.data.enum,'code',$scope.ORDER_DATA.LGORT);
                $scope.LGORT = type.name;
            }
        });
        LGORTArr.push($scope.ORDER_DATA.LGORT);
        //查询可占用库存
        var selectstock = occupy.selectstock({MATNR:$scope.ORDER_DATA.MATNR,LGORT:LGORTArr,BISMT:$scope.ORDER_DATA.BISMT,MATKL:$scope.ORDER_DATA.MATKL,ZKCLX:'分销库存'});
        selectstock.success(function(data){
            if(data.code == 200){
                for(var x in data.rst.data.items){
                    $scope.ZKZYSL = data.rst.data.items[x].ZKZYSL;
                }
            }
        });
    });

    $scope.zyNum=function(ZMOUNT){
        if(ZMOUNT <= 0){
            $scope.showNum = true;
            $scope.invoRready = true
            $scope.invoiceForm.$invalid = true;
        }else if(ZMOUNT>$scope.ZKZYSL + $scope.yshistoryNum){
            $scope.showNum1 = true;
            $scope.invoRready = true
            $scope.invoiceForm.$invalid = true;
        }else if(ZMOUNT < $scope.ORDER_DATA.ZSFSL + $scope.ORDER_DATA.ZSFS2 + $scope.ORDER_DATA.ZSFS3){
            $scope.showNum2 = true;
            $scope.invoRready = true
            $scope.invoiceForm.$invalid = true;
        }else{
            $scope.showNum = false;
            $scope.showNum1 = false;
            $scope.showNum2 = false;
            $scope.invoRready = false;
        }
    }
    $scope.update = function(data){
        var ITEM_DATA = [];
        ITEM_DATA.push(data);
        var param = {doc:{ITEM_DATA:ITEM_DATA}};
        var addInside = occupy.updateInside(param);
        addInside.success(function(data){
            if(data.code == 200){
                swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/occupyOrder'; });
                //swal("提交成功", "", "success");
            }else {
                swal({title:'',text:data.msg,type:'error'});
            }
        });
    }
}]);
occupyApp.controller('occupyOrderViewCtrl', ['$scope', '$stateParams', 'occupyServices',function($scope, $stateParams, occupy){
    var ORDER_DATA = {};
    var viewCont = occupy.viewInside({SQDH:$stateParams.id});
    viewCont.success(function(data) {
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.data.items;
            var enumLgort = occupy.stockType();
            enumLgort.success(function(data){
                if($scope.ORDER_DATA.LGORT){
                    var type = getField(data.rst.data.enum,'code',$scope.ORDER_DATA.LGORT);
                    $scope.LGORT = type.name;
                }
            });
        }else {
            alert(data.msg);
        }

    });
}]);

occupyApp.controller('repertoryOrderCtrl', ['$scope','occupyServices',function($scope,occupy){
    var oldlgortArr = [];
    var lgortArr = [];
    var stockType = occupy.stockType();
    stockType.success(function(data){
        if(data.code==200) {
            $scope.stockType = data.rst.data.enum;
            $scope.stockType.LGORT1.forEach(function(i){
                lgortArr.push(i.code);
            });
        }
    })
   $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($scope.LGORT){
                oldlgortArr.push($scope.LGORT);
                var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,MATNR:$scope.MATNR,BISMT:$scope.BISMT,MATKL:$scope.MATKL,ZKCLX:$scope.ZKCLX,WERKS:$scope.WERKS,LGORT:oldlgortArr,tasker:'kccx',ZZGKXH:$scope.ZZGKXH};
                var selectstock =occupy.selectstock(param);
                $scope.paginationConf.pagePromise = selectstock;
                oldlgortArr = [];
            }else{
                var param1  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,MATNR:$scope.MATNR,BISMT:$scope.BISMT,MATKL:$scope.MATKL,ZKCLX:$scope.ZKCLX,WERKS:$scope.WERKS,LGORT:lgortArr,tasker:'kccx',ZZGKXH:$scope.ZZGKXH};
                var selectstock1 =occupy.selectstock(param1);
                $scope.paginationConf.pagePromise = selectstock1;

            }

        }
    };
    $scope.arrparseJson  = function(data, key) {
        var obj={}, enumArr=data[key];
        for(var i in enumArr) {
            obj[enumArr[i].code] = enumArr[i].name;
        }
        return obj;
    }
}]);

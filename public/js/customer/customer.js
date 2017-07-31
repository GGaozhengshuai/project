var customerApp = angular.module('customerApp', ['pageDirectives', 'formDirectives', 'uploadifyApp', 'MyFilterApp']);
customerApp.service('customerServices', function ($http) {
    var service = {
        listCustomer: function (param) {
            return $http.post('/customer/list', param, {cache: false});
        },
        viewCustomer: function (param) {
            return $http.post('/customer/read', param, {cache: true});
        },
        viewCustomerEidet: function (param) {
            return $http.post('/customer/view', param, {cache: true});
        },
        addCustomer: function (param) {
            return $http.post('/customer/save', param, {cache: false});
        },
        updateCustomer: function (param) {
            return $http.post('/customer/update', param, {cache: false});
        },
        deleteCustomer: function (param) {
            return $http.post('/customer/delete', param, {cache: false});
        },
        getCountry: function () {
            return $http.get('/js/json/country.json', {cache: true});
        },
        getCountry2: function () {
            return $http.get('/enum/getnewcity', {cache: true});
            //return $http.get('/js/json/country.json', {cache: true});
        },
        customerAdd: function (param) {
            return $http.post('/customer/createprocess', param, {cache: false});
        },//审批
        updatetosap: function (param) {
            return $http.post('/customer/updatetosap', param, {cache: false});
        },//审批
        customerView: function (param) {
            return $http.post('/customer/detail', param, {cache: false});
        },
        customerAgree: function (param) {//同意
            return $http.post('/customer/agree', param, {cache: false});
        },
        customerDisagree: function (param) {//驳回
            return $http.post('/customer/disagree', param, {cache: false});
        },
        customerCancel: function (param) {//取消
            return $http.post('/customer/cancel', param, {cache: false});
        },
        customerRecall: function (param) {//召回
            return $http.post('/customer/recall', param, {cache: false});
        },
        checkunique: function (param) {
            return $http.post('/customer/checkunique2', param, {cache: false});
        },
        updatetosapDel: function (param) {
            return $http.post('/customer/cancel', param, {cache: false});
        },
        getprocesslog: function (param) {
          return $http.post('/customer/getprocesslog',param,{cache:false});
        }
    };
    return service;
});
customerApp.controller('customerList1Ctrl', ['$scope', 'customerServices', function ($scope, customer) {
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
                NAME: $scope.NAME,
                KUNNR: $scope.KUNNR,
                KTOKD: $scope.KTOKD,
                ZORG_TYPE: $scope.ZORG_TYPE,
                ZCREATE_NAME: $scope.ZCREATE_NAME
            };
            var customerPromise = customer.listCustomer(param);
            customerPromise.success(function (data) {
                if (data.code == 200) {
                    var ary = data.rst.data.items;
                    for (var i = 0; i < ary.length; i++) {
                        if (ary[i].CENTRAL_DATA.KTOKD == "ZC01") {
                            ary[i].CENTRAL_DATA.KTOKD = "业务客户";
                        } else {
                            ary[i].CENTRAL_DATA.KTOKD = "财务客户";
                        }
                    }
                }
            });
            $scope.paginationConf.pagePromise = customerPromise;

        }
    };

}]);
customerApp.controller('addCustomerCtrl', ['$scope', '$state', '$stateParams', 'customerServices', function ($scope, $state, $stateParams, customer) {
    //拼接导航
    var ht = $scope.ht = {};
    $scope.htTab = function (type) {
        $scope.ht.activeTab = type;
        if(type==3){
            swal("", "请与客户核实是否完成三证合一及税号变更工作，如已完成，请录入统一社会信用机构代码（18位）；如未完成，请录入纳税人识别号（15位）！","warning");
        }
    };
    // 列表省市联动
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry2 = customer.getCountry2();
    getCountry2.success(function (data) {
        // 存储地区数据信息
        $scope.countryData2 = data ;
    });
    //省市联动
    var getCountry = customer.getCountry();
    getCountry.success(function (data) {
        $scope.countryData = data.countryCode;
        for (var i = 0; i < $scope.countryData.length; i++) {
            if ("CN" == $scope.countryData[i].CODE) {
                $scope.countrySel = $scope.countryData[i];
            }
        }
    });
    $scope.addApp = {};
    $scope.addReg = {};
    $scope.addInvo = {};
    $scope.doc = {};
    $scope.tab2 =false;
    $scope.tab3=false;
    $scope.tab4=false;
    $scope.addApp.CENTRAL_DATA = {};
    $scope.addInvo.BANK_DATA = {};
    $scope.addReg.REGISTER_DATA = {};
    $scope.addLinkList = [];
    $scope.addAddressList = [];
    $scope.addApp.CENTRAL_DATA.WAERS = "CNY";
    $scope.cusname=function(name){
        $scope.processName=name;
    }
    $scope.stras=function(data){
        if(data){
            $scope.pstlz=true;
        }else{
            $scope.pstlz=false;
        }
    }
    $scope.coustomerAdd = function (type) {
        var obj = {NAME1: '', TELF1: '', TITEL_AP: '', ABTPA: '', PARAU: ''};
        var obj1 = {
            ZCNEE_NAME: '',
            ZCNEE_MOBILE: '',
            ZCNEE_PROVINCE: '',
            ZCNEE_CITY: '',
            ZCNEE_ADDRESS: '',
            ZCNEE_PSTLZ: '',
            ZCNEE_CARD: '',
            ZCNEE_MEMO: ''
        };
        if (type == 'addLink') {
            $scope.addLinkList.push(obj);
        } else if (type == 'addAddress') {
            $scope.addAddressList.push(obj1);
        }
    };
    $scope.coustomerDel = function (idx, type) {
        if (type == 'addLink') {
            if ($scope.addLinkList.length <= 0) {
                swal("不能再删了！", "","warning");
                return false;
            }
            $scope.addLinkList.splice(idx, 1);
        } else if (type == 'addAddress') {
            if ($scope.addAddressList.length <= 0) {
                swal("不能再删了！", "","warning");
                return false;
            }
            $scope.addAddressList.splice(idx, 1);
        }

    };
    $scope.hide = function () {
        if($scope.cusMoney==true){
            if ($scope.addReg.REGISTER_DATA.ZORG_TYPE === "企业法人") {
                $scope.hideaddReg = true;
                $scope.require = true;
            } else {
                $scope.hideaddReg = false;
                $scope.require = false;
            }
        }else{
            $scope.hideaddReg = false;
            $scope.require = false;
        }

    };
    $scope.change=function(data){
        if(data=='ZC01'){
            $scope.orgType="业务客户";
            $scope.cusMoney=true;
            $scope.hide();
        }else{
            $scope.orgType="财务客户";
            $scope.cusMoney=false;
            $scope.hide();
        }
    }
    $scope.bkont=function(data){
        if(data=="是"){
            $scope.reMust=true;
        }else{
            $scope.reMust=false;
        }
    }
    $scope.addrChange=function(addr,index){
        if(addr){
            $scope.addAddressList[index].pst=true;
        }else{
            $scope.addAddressList[index].pst=false;
        }
    }
    $scope.countryChange=function(){
      $scope.provinceSel="";
      $scope.citySel="";
    }
    $scope.closeWarm=function () {
        $("#warmingBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.tab4=true;
        $scope.ht.activeTab=4;
    }
    $scope.addData = function (type1, button) {
        if($scope.ready==false){
            swal("客户名称正在验证，请稍候操作", "", "warning");
            return false;
        }
        var para = null;
        if (type1 == 'addApplication') {
            if ($scope.countrySel) {
                $scope.addApp.CENTRAL_DATA.LAND1 = $scope.countrySel.CODE;

                if ($scope.provinceSel) {
                    $scope.addApp.CENTRAL_DATA.REGIO = $scope.provinceSel.CODE;
                }else{
                  $scope.addApp.CENTRAL_DATA.REGIO="";
                }
                if ($scope.citySel) {
                    $scope.addApp.CENTRAL_DATA.ORT01 = $scope.citySel.TITLE;
                }else{
                  $scope.addApp.CENTRAL_DATA.ORT01="";
                }
            }
            var requiredObj = $scope.myForm.$error.required;
            angular.forEach(requiredObj,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.myForm.$valid||$scope.myForm.NAME1.$error.remote){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
            /*$scope.doc.CENTRAL_DATA = $scope.addApp.CENTRAL_DATA;*/
        } else if(type1 == 'link'){
            var requiredObj1 = $scope.linkForm.$invalid;
            angular.forEach(requiredObj1,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.linkForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
           /* $scope.doc.CONTACT_DATA = $scope.addLinkList;
            $scope.doc.CNEE_DATA =  $scope.addAddressList;*/
        }else if(type1 == 'addInvoice'){
            var requiredObj2 = $scope.modelForm.$error.required;
            angular.forEach(requiredObj2,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }else if(type1 == 'addRegMessage'){
            $scope.FILE_DATA=[];
            if($("#formUpStyle1").find("img")){
                var obj1={};
                $("#formUpStyle1").find("img").each(function(){
                    obj1={}
                    obj1.ZFTP=$(this).attr("src");
                    obj1.ZFILE_NAME=$(this).next().html();
                    obj1.ZFILETYPE="10";
                    $scope.FILE_DATA.push(obj1)
                });
            }
            if($("#formUpStyle1").find("a")){
                var obj2={};
                $("#formUpStyle1").find("a").each(function(){
                    obj2={}
                    obj2.ZFTP=$(this).attr("href");
                    obj2.ZFILE_NAME=$(this).html();
                    obj2.ZFILETYPE="20";
                    $scope.FILE_DATA.push(obj2)
                });
            }
            if($scope.require==true){
                if($scope.FILE_DATA.length==0){
                    swal("执照证件不能为空", "", "warning");
                    return false;
                }
            }

            var requiredObj3= $scope.regForm.$error.required;
            angular.forEach(requiredObj3,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.regForm.$valid||!$scope.myForm.$valid||!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
            if ($scope.addReg.REGISTER_DATA) {
               if($scope.addReg.REGISTER_DATA.ZREGIST_BEGIN ){
                   if(Date.parse($scope.addReg.REGISTER_DATA.ZREGIST_BEGIN) > Date.parse(new Date())){
                       swal("组织机构有效期限起不能大于当今日期！", "","warning");
                       return false;
                   }
                   if(Date.parse($scope.addReg.REGISTER_DATA.ZREGIST_END)< Date.parse(new Date())){
                       swal("组织机构有效期限止不能小于当今日期！", "","warning");
                       return false;
                   }

               }
                if($scope.addReg.REGISTER_DATA.ZBUSI_BEGIN ){
                    if(Date.parse($scope.addReg.REGISTER_DATA.ZBUSI_BEGIN) > Date.parse(new Date())){
                        swal("营业期限起不能大于当今日期！", "","warning");
                        return false;
                    }
                    if(Date.parse($scope.addReg.REGISTER_DATA.ZBUSI_END)< Date.parse(new Date())){
                        swal("营业期限止不能小于当今日期！", "","warning");
                        return false;
                    }

                }
            }

        }
        if(button=='save'||button=='next'){
            $scope.doc.CONTACT_DATA = $scope.addLinkList;
            $scope.doc.CNEE_DATA =  $scope.addAddressList;
            $scope.doc.CENTRAL_DATA = $scope.addApp.CENTRAL_DATA;
            $scope.doc.BANK_DATA = $scope.addInvo.BANK_DATA;
            $scope.doc.REGISTER_DATA = $scope.addReg.REGISTER_DATA;
            $scope.doc.FILE_DATA = $scope.FILE_DATA;
            para = {processId: $scope.processId, nodeId: $scope.nodeId,doc:$scope.doc, onlysave: true};
            para.comment = $scope.comment;
            var addCustomer = customer.addCustomer(para);
            addCustomer.success(function (data) {
                if (data.code == 200) {
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    /*if (type1 == 'addApplication') {
                        $scope.processId = data.rst.processId;
                        $scope.nodeId = data.rst.nodeId;
                        /!*$scope.processName = $scope.addApp.CENTRAL_DATA.NAME1;*!/
                    }*/
                    if(button=='save'){
                        swal("保存成功", "", "success");
                    }else if(button=='next'){
                         if(type1=='addApplication'){
                             $scope.tab2=true;
                             $scope.ht.activeTab=2;
                         }else if(type1=='link'){
                             $scope.tab3=true;
                             $scope.ht.activeTab=3;
                             swal("", "请与客户核实是否完成三证合一及税号变更工作，如已完成，请录入统一社会信用机构代码（18位）；如未完成，请录入纳税人识别号（15位）！","warning");
                        }else if(type1=='addInvoice'){
                             if($scope.addInvo.BANK_DATA.BKONT=="否" && !$scope.addInvo.BANK_DATA.STCEG){
                                 $("#warmingBox").dialog({
                                     autoOpen: false,
                                     width: 700,
                                     height: 200,
                                     modal: true
                                 });
                                 $("#warmingBox").dialog("open");
                             }else {
                                 $scope.tab4=true;
                                 $scope.ht.activeTab=4;
                             }


                         }
                    }

                } else {
                    swal(data.msg, "", "warning");
                }
            }).error(function (error) {
                swal({
                    title:'',
                    text:error,
                    type:"error"
                })
            });
        }else if(button=='update'){
            $scope.doc.CONTACT_DATA = $scope.addLinkList;
            $scope.doc.CNEE_DATA =  $scope.addAddressList;
            $scope.doc.CENTRAL_DATA = $scope.addApp.CENTRAL_DATA;
            $scope.doc.BANK_DATA = $scope.addInvo.BANK_DATA;
            $scope.doc.REGISTER_DATA = $scope.addReg.REGISTER_DATA;
            $scope.doc.FILE_DATA = $scope.FILE_DATA;
            para = {processId: $scope.processId, nodeId: $scope.nodeId,doc:$scope.doc, onlysave: true};
            para.comment = $scope.comment;
            if(type1 == 'addRegMessage'){
                    if($scope.FILE_DATA.length==0){
                        swal(
                            {
                                title: "三证上传不齐全，确定提交？",
                                text: "",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: '否',
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: '是'
                            },
                            function () {
                               var customerAdd = customer.customerAdd(para);
                                customerAdd.success(function (data) {
                                    if (data.code == 200) {
                                        swal({
                                            title: "提交成功",
                                            text: "",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "返回客户管理列表",
                                            closeOnConfirm: true
                                        }, function () {
                                            window.location.href = '/index.html#/customerList';
                                        });
                                    } else {
                                        swal("提交失败", "", "error");
                                    }
                                }).error(function (error) {
                                    swal({
                                        title:'',
                                        text:error,
                                        type:"error"
                                    })
                                });
                            }

                        );

                    }else{
                        var customerAdd = customer.customerAdd(para);
                        customerAdd.success(function (data) {
                            if (data.code == 200) {
                                swal({
                                    title: "提交成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回客户管理列表",
                                    closeOnConfirm: true
                                }, function () {
                                    window.location.href = '/index.html#/customerList';
                                });
                            } else {
                                swal("提交失败", "", "error");
                            }
                        }).error(function (error) {
                            swal({
                                title:'',
                                text:error,
                                type:"error"
                            })
                        });
                    }
            }

        }
    }
}]);
customerApp.controller('customerCtrl', ['$scope', '$stateParams', 'customerServices', function ($scope, $stateParams, customer) {
    var ht = $scope.ht = {};
    $scope.htTab = function (type) {
        $scope.ht.activeTab = type;
    }
    $scope.getField = function(obj, f1, v1) {
        console.log( f1, v1,getField(obj, f1, v1))
        return getField(obj, f1, v1);
    };
    var getCountry2 = customer.getCountry2();
    getCountry2.success(function (data) {
        // 存储地区数据信息
        $scope.countryData2 = data ;
    });
    var customerParam = {processId: $stateParams.processId, nodeId: $stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(customerParam, {myflag: "mysubscriber" })
    }
    var customerView = customer.customerView(customerParam);
    customerView.success(function (data) {
        if (data.code == 200) {
            $scope.apCot = true;
            $scope.applicationList = data.rst.doc.model.CENTRAL_DATA;//客户基本信息
            var customerType = {
                business: {
                    "CODE": "ZC01",
                    "NAME": "业务客户"
                },
                Finance: {
                    "CODE": "ZC04",
                    "NAME": "财务客户"
                }
            };
            if (data.rst.doc.model.CENTRAL_DATA.KTOKD) {
                var type = getField(customerType, "CODE", data.rst.doc.model.CENTRAL_DATA.KTOKD);
                $scope.KTOKD = type.NAME;
            }
            var currency = {
                RMB: {
                    "CODE": "CNY",
                    "NAME": "人民币"
                },
                dollar: {
                    "CODE": "USD",
                    "NAME": "美元"
                },
                euro: {
                    "CODE": "EUR",
                    "NAME": "欧元"
                }
            };
            if ($scope.applicationList.WAERS) {
                var type = getField(currency, "CODE", $scope.applicationList.WAERS);
                $scope.WAERS = type.NAME;
            }
            var getCountry = customer.getCountry();
            getCountry.success(function (data) {
                if ($scope.applicationList.LAND1) {
                    var country = getField(data, "CODE", $scope.applicationList.LAND1);
                    $scope.country = country.TITLE;
                }
                if ($scope.applicationList.REGIO) {
                    var province = getField(country, "CODE", $scope.applicationList.REGIO);
                    $scope.province = province.TITLE;
                }
                if ($scope.applicationList.ORT01) {
                    $scope.city = $scope.applicationList.ORT01;
                }
            });

            $scope.FILE_DATA = data.rst.doc.model.FILE_DATA;
            $scope.regMessageList = data.rst.doc.model.REGISTER_DATA;//注册信息
            $scope.invoiceList = data.rst.doc.model.BANK_DATA;//开票信息
            if (data.rst.doc.model.CONTACT_DATA) {
                $scope.linkmanList = data.rst.doc.model.CONTACT_DATA;//客户联系人
            }
            if (data.rst.doc.model.CNEE_DATA) {
                $scope.addressList = data.rst.doc.model.CNEE_DATA;
            }
            $scope.itemsList = data.rst.doc.items;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
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
                if(data.rst.processlog.length>1){
                    $scope.apCot = true;
                }else {
                    $scope.apCot = false;
                }
            }
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
        var doc={};
        $scope.doc.CONTACT_DATA = $scope.linkmanList;
        $scope.doc.CNEE_DATA =  $scope.addressList;
        $scope.doc.CENTRAL_DATA = $scope.applicationList;
        $scope.doc.BANK_DATA = $scope.invoiceList;
        $scope.doc.REGISTER_DATA = $scope.regMessageList;
        $scope.doc.FILE_DATA = $scope.FILE_DATA;
        param.doc = doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside = customer.addCustomer(param);
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
        var customerAgree = customer.customerAgree(param);
        customerAgree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回客户管理待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=客户管理&&controllercode=CUSTOMER';
                });
            } else {
                swal("审批失败！", '', "error");
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
        var disagree = customer.customerDisagree(param);
        disagree.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回客户管理待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=客户管理&&controllercode=CUSTOMER';
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
        var cancel = customer.customerCancel(param);
        cancel.success(function (data) {
            if (data.code == 200) {
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回客户管理待办",
                    closeOnConfirm: true
                }, function () {
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=客户管理&&controllercode=CUSTOMER';
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
        var recall = customer.customerRecall(param);
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
customerApp.controller('viewCustomerCtrl', ['$scope', '$stateParams', 'customerServices', function ($scope, $stateParams, customer) {
    $scope.id = $stateParams.id;
    // var ht = $scope.ht = {};
    // $scope.htTab = function (type) {
    //     $scope.ht.activeTab = type;
    // };
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };

    var getCountry2 = customer.getCountry2();
    getCountry2.success(function (data) {
        // 存储地区数据信息
        $scope.countryData2 = data ;
    });
        var viewCus = customer.viewCustomer({sapid: $stateParams.id});
        viewCus.success(function (data) {
            if (data.code == 200) {
                $scope.addressList = data.rst.model.CNEE_DATA;//常用收货地址*/
                $scope.applicationList = data.rst.model.CENTRAL_DATA;//客户基本信息
                $scope.regMessageList = data.rst.model.REGISTER_DATA;//注册信息
                $scope.invoiceList = data.rst.model.BANK_DATA;//开票信息
                $scope.FILE_DATA = data.rst.model.FILE_DATA;
                var customerType = {
                    business: {
                        "CODE": "ZC01",
                        "NAME": "业务客户"
                    },
                    Finance: {
                        "CODE": "ZC04",
                        "NAME": "财务客户"
                    }
                };
                if (data.rst.model.CENTRAL_DATA.KTOKD) {
                    var type = getField(customerType, "CODE", data.rst.model.CENTRAL_DATA.KTOKD);
                    $scope.KTOKD = type.NAME;
                }

                var currency = {
                    RMB: {
                        "CODE": "CNY",
                        "NAME": "人民币"
                    },
                    dollar: {
                        "CODE": "USD",
                        "NAME": "美元"
                    },
                    euro: {
                        "CODE": "EUR",
                        "NAME": "欧元"
                    }
                };
                if ($scope.applicationList.WAERS) {
                    var type = getField(currency, "CODE", $scope.applicationList.WAERS);
                    $scope.WAERS = type.NAME;
                }
                var getCountry = customer.getCountry();
                getCountry.success(function (data) {
                    if ($scope.applicationList.LAND1) {
                        var country = getField(data, "CODE", $scope.applicationList.LAND1);
                        $scope.country = country.TITLE;
                    }
                    if ($scope.applicationList.REGIO) {
                        var province = getField(country, "CODE", $scope.applicationList.REGIO);
                        $scope.province = province.TITLE;
                    }
                    if ($scope.applicationList.ORT01) {
                        $scope.city = $scope.applicationList.ORT01;
                    }
                });
                if(data.rst.model.BANK_DATA){
                    if(data.rst.model.BANK_DATA.BKONT=="X"){
                        $scope.invoiceList.BKONT='是';
                    }else if(data.rst.model.BANK_DATA.BKONT==""){
                        $scope.invoiceList.BKONT='否';
                    }
                }

                if (data.rst.model.CONTACT_DATA) {
                    $scope.linkmanList = data.rst.model.CONTACT_DATA;//客户联系人
                }
                if (data.rst.model.CNEE_DATA) {
                    $scope.addressList = data.rst.model.CNEE_DATA;
                }
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    // 审批记录
    var vm = $scope;
    vm.processlog = null

    vm.htTab = function (type) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (type == 5 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = customer.getprocesslog({id: vm.applicationList.NAME1,type:'CUSTOMER'}); // 直接取值数据中 申请人（proposer）
        processlog.success(function (data) {
          if (data.rst.length != 0) {
            vm.processlog = data.rst;
            vm.ht.activeTab = type;
          } else {
            swal('没有审批信息', '', 'warning');
          }
        });
      } else {
        vm.ht.activeTab = type;
      }
    };
    // 审批记录 END
}]);
customerApp.controller('editCustomerCtrl', ['$scope', '$stateParams', 'customerServices', function ($scope, $stateParams, customer) {
    var ht = $scope.ht = {};
    $scope.htTab = function (type) {
        $scope.ht.activeTab = type;
        if(type==3 && !$stateParams.sapid){
            swal("", "请与客户核实是否完成三证合一及税号变更工作，如已完成，请录入统一社会信用机构代码（18位）；如未完成，请录入纳税人识别号（15位）！","warning");
        }
    }
    $scope.closeWarm=function () {
        $("#warmingBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.tab4=true;
        $scope.ht.activeTab=4;
    }
    $scope.addApp = {};
    $scope.addReg = {};
    $scope.addInvo = {};
    $scope.doc = {};
    $scope.addApp.CENTRAL_DATA = {};
    $scope.addInvo.BANK_DATA= {};
    $scope.addReg.REGISTER_DATA = {};
    $scope.addLinkList=[];
    $scope.addAddressList=[];
    $scope.tab2 =false;
    $scope.tab3=false;
    $scope.tab4=false;
    $scope.cusOver=true;
        if ($stateParams.sapid) {//判断数据来源（sap or 草稿）
           $scope.showBut=false;
            $scope.over=false;

        } else {
            $scope.showBut=true;
            $scope.over=true;
        }
    //省市联动

    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry2 = customer.getCountry2();
    getCountry2.success(function (data) {
        // 存储地区数据信息
        $scope.countryData2 = data ;
    });

        var viewCus = customer.viewCustomerEidet({
            sapid: $stateParams.sapid,
            processId: $stateParams.processId,
            nodeId: $stateParams.nodeId
        });
    var cusbox1, cusbox2,cusbox3={};
    var dataBox={};
        viewCus.success(function (data) {
            if (data.code == 200) {
                $scope.processName = data.rst.model.CENTRAL_DATA.NAME1;
                $scope.processId = $stateParams.processId;
                $scope.nodeId = $stateParams.nodeId;
                $scope.addApp.CENTRAL_DATA= data.rst.model.CENTRAL_DATA||{};
                $scope.FILE_DATA1= data.rst.model.FILE_DATA;
                if(data.rst.model.BANK_DATA){
                    $scope.addInvo.BANK_DATA= data.rst.model.BANK_DATA||{};
                }
                $scope.addReg.REGISTER_DATA= data.rst.model.REGISTER_DATA||{};
                $scope.name=data.rst.model.CENTRAL_DATA.NAME1;
                $scope.ktokd=data.rst.model.CENTRAL_DATA.KTOKD;
                if($scope.addApp.CENTRAL_DATA.KUNNR){
                    $scope.cusOver=false;
                }else{
                    $scope.cusOver=true;
                }
                if($stateParams.sapid){

                  /*  cusbox1=JSON.stringify(data.rst.model.BANK_DATA);*/
                    cusbox2=JSON.stringify(data.rst.model.REGISTER_DATA);
                    cusbox3.KTOKD=data.rst.model.CENTRAL_DATA.KTOKD;
                    cusbox3.NEWNAME=data.rst.model.CENTRAL_DATA.NEWNAME;

                    dataBox.BANKL=data.rst.model.BANK_DATA.BANKL;
                    dataBox.STCEG=data.rst.model.BANK_DATA.STCEG;
                    dataBox.KOINH=data.rst.model.BANK_DATA.KOINH;
                    if(data.rst.model.BANK_DATA.BKONT=="X"){
                        dataBox.BKONT="是";
                    }else if(data.rst.model.BANK_DATA.BKONT==""){
                        dataBox.BKONT="否";
                    }
                    dataBox.BKREF=data.rst.model.BANK_DATA.BKREF;
                    dataBox.BRNCH=data.rst.model.BANK_DATA.BRNCH;
                    dataBox.BANKA=data.rst.model.BANK_DATA.BANKA;
                    dataBox.STRAS=data.rst.model.BANK_DATA.STRAS;



                }
                if(data.rst.model.REGISTER_DATA){
                    $scope.oragin=data.rst.model.REGISTER_DATA.ZORG_CODE;
                }

                if(data.rst.model.CONTACT_DATA){
                    $scope.addLinkList = data.rst.model.CONTACT_DATA;
                }
                if(data.rst.model.CNEE_DATA){
                    $scope.addAddressList = data.rst.model.CNEE_DATA;
                }
                if ($scope.addApp.CENTRAL_DATA.KTOKD === "ZC01") {
                    $scope.orgType="业务客户";
                    if($stateParams.sapid){
                        $scope.ywChange=true;
                    }else{
                        $scope.ywChange=false;
                    }
                    $scope.cusMoney=true
                    if ($scope.addReg.REGISTER_DATA.ZORG_TYPE === "企业法人") {
                        $scope.hideaddReg = true;
                        $scope.require = true;
                    } else {
                        $scope.hideaddReg = false;
                        $scope.require = false;
                    }

                }else{
                    $scope.orgType="财务客户";
                    $scope.ywChange=false;
                    $scope.cusMoney=false;
                    $scope.hideaddReg = false;
                    $scope.require = false;
                }
                if ($scope.addReg.REGISTER_DATA) {
                    $scope.pics=$scope.FILE_DATA1;
                    if ($scope.addReg.REGISTER_DATA.ZORG_TYPE === "企业法人"&&$scope.addApp.CENTRAL_DATA.KTOKD === "ZC01") {
                        $scope.require = true;
                        $scope.hideaddReg = false;

                    } else {
                        $scope.require = false;
                        $scope.hideaddReg = true;
                    }
                }
                if ($scope.addReg.REGISTER_DATA) {
                    if ($scope.addReg.REGISTER_DATA.ZBUSI_FTP) {
                        $scope.show1 = true;
                    }
                }
                if ($scope.addReg.REGISTER_DATA) {
                    if ($scope.addReg.REGISTER_DATA.ZTAX_FTP) {
                        $scope.show2 = true;
                    }
                }
                if ($scope.addReg.REGISTER_DATA) {
                    if ($scope.addReg.REGISTER_DATA.ZORG_FTP) {
                        $scope.show3 = true;
                    }
                }
                if(data.rst.model.BANK_DATA){
                    if(data.rst.model.BANK_DATA.BKONT=="X"){
                        $scope.addInvo.BANK_DATA.BKONT='是';
                    }else if(data.rst.model.BANK_DATA.BKONT==""){
                        $scope.addInvo.BANK_DATA.BKONT='否';
                    }
                }
                var getCountry = customer.getCountry();
                getCountry.success(function (data) {
                    $scope.countryData = data.countryCode;
                    if ($scope.addApp.CENTRAL_DATA.LAND1) {
                        var country = getField(data, "CODE", $scope.addApp.CENTRAL_DATA.LAND1);
                        $scope.countrySel = country;
                    }
                    if ($scope.addApp.CENTRAL_DATA.REGIO) {
                        var province = getField(data, "CODE", $scope.addApp.CENTRAL_DATA.REGIO);
                        $scope.provinceSel = province;
                    }
                    if ($scope.addApp.CENTRAL_DATA.ORT01) {
                        var area = getField(data, "TITLE", $scope.addApp.CENTRAL_DATA.ORT01);
                        $scope.citySel = area;
                    }
                });
            }
        }).error(function (error) {
            swal({
                title:'',
                text:error,
                type:"error"
            })
        });
    $scope.picDel=function(id){
        $scope.pics.splice(id,1);
      return false;
    }
    $scope.cusNewName=function(newname){
        $scope.processName = newname

    }
    $scope.addrChange=function(addr,index){
        if(addr){
            $scope.addAddressList[index].pst=true;
        }else{
            $scope.addAddressList[index].pst=false;
        }
    }
    $scope.stras=function(data){
        if(data){
            $scope.pstlz=true;
        }else{
            $scope.pstlz=false;
        }
    }
    $scope.coustomerAdd = function (type) {
        var obj = {NAME1: '', TELF1: '', TITEL_AP: '', ABTPA: '', PARAU: ''};
        var obj1 = {
            ZCNEE_NAME: '',
            ZCNEE_MOBILE: '',
            ZCNEE_PROVINCE: '',
            ZCNEE_CITY: '',
            ZCNEE_ADDRESS: '',
            ZCNEE_PSTLZ: '',
            ZCNEE_CARD: '',
            ZCNEE_MEMO: ''
        };
        if (type == 'addLink') {
            $scope.addLinkList.push(obj);
        } else if (type == 'addAddress') {
            $scope.addAddressList.push(obj1);
        }
    };
    $scope.coustomerDel = function (idx, type) {
        if (type == 'addLink') {
            if ($scope.addLinkList.length <= 0) {
                swal("不能再删了！", "","warning");
                return false;
            }
            $scope.addLinkList.splice(idx, 1);
        } else if (type == 'addAddress') {
            if ($scope.addAddressList.length <= 0) {
                swal("不能再删了！", "","warning");
                return false;
            }
            $scope.addAddressList.splice(idx, 1);
        }

    };
    $scope.bkont=function(data){
        if(data=="是"){
            $scope.reMust=true;
        }else{
            $scope.reMust=false;
        }
    }
    $scope.hide = function () {
            if($scope.cusMoney==true){
                if ($scope.addReg.REGISTER_DATA.ZORG_TYPE === "企业法人") {
                    $scope.hideaddReg = true;
                    $scope.require = true;
                } else {
                    $scope.hideaddReg = false;
                    $scope.require = false;
                }
            }else{
                $scope.hideaddReg = false;
                $scope.require = false;
            }

    };
    $scope.change=function(data){
        if(data=='ZC01'){
            $scope.orgType="业务客户";
            $scope.cusMoney=true;
            $scope.hide();
        }else{
            $scope.orgType="财务客户";
            $scope.cusMoney=false;
            $scope.hide();
        }
    }
  $scope.countryChange=function(){
    $scope.provinceSel="";
    $scope.citySel="";
  }
    $scope.addData = function (type1, button) {
        var para = null;
        if (type1 == 'addApplication') {
            /*if ($scope.addApp.CENTRAL_DATA) {
                if ($scope.addApp.CENTRAL_DATA.PSTLZ && $scope.addApp.CENTRAL_DATA.PSTLZ.length !== 6) {
                    alert("邮政编码必须6位");
                    return false;
                }
            }*/
          if ($scope.countrySel) {
            $scope.addApp.CENTRAL_DATA.LAND1 = $scope.countrySel.CODE;

            if ($scope.provinceSel) {
              $scope.addApp.CENTRAL_DATA.REGIO = $scope.provinceSel.CODE;
            }else{
              $scope.addApp.CENTRAL_DATA.REGIO="";
            }
            if ($scope.citySel) {
              $scope.addApp.CENTRAL_DATA.ORT01 = $scope.citySel.TITLE;
            }else{
              $scope.addApp.CENTRAL_DATA.ORT01="";
            }
          }
            var requiredObj = $scope.myForm.$error.required;
            angular.forEach(requiredObj,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.myForm.$valid||$scope.myForm.NAME1.$error.remote){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }else{
                if($scope.addApp.CENTRAL_DATA.KTOKD=="ZC04"){
                    $scope.cusMoney=false;
                }else{
                    $scope.cusMoney=true;
                }
            }
          /*  $scope.doc.CENTRAL_DATA = $scope.addApp.CENTRAL_DATA;*/
        } else if(type1 == 'link'){
            /*if($scope.addAddressList){
                for (var i = 0; i < $scope.addAddressList.length; i++) {
                    if ($scope.addAddressList[i].ZCNEE_PSTLZ && $scope.addAddressList[i].ZCNEE_PSTLZ.length !== 6) {
                        alert("邮政编码必须6位");
                        return false;
                    }
                }
            }*/
            var requiredObj1 = $scope.linkForm.$invalid;
            angular.forEach(requiredObj1,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.linkForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
           /* $scope.doc.CONTACT_DATA = $scope.addLinkList;
            $scope.doc.CNEE_DATA =  $scope.addAddressList;*/
        }else if(type1 == 'addInvoice'){
            var requiredObj2 = $scope.modelForm.$error.required;
            angular.forEach(requiredObj2,function(keyData){
                keyData.$dirty = true;
            })

            if(!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        /*    $scope.doc.BANK_DATA = $scope.addInvo.BANK_DATA;*/

        }else if(type1 == 'addRegMessage'){
            $scope.FILE_DATA=[];
            if($("#formUpStyle1").find("img")){
                var obj1={};
                $("#formUpStyle1").find("img").each(function(){
                    obj1={}
                    obj1.ZFTP=$(this).attr("src");
                    obj1.ZFILE_NAME=$(this).next().html();
                    obj1.ZFILETYPE="10";
                    $scope.FILE_DATA.push(obj1)
                });
            }
            if($("#formUpStyle1").find("a")){
                var obj2={};
                $("#formUpStyle1").find("a").each(function(){
                    obj2={}
                    obj2.ZFTP=$(this).attr("href");
                    obj2.ZFILE_NAME=$(this).html();
                    obj2.ZFILETYPE="20";
                    $scope.FILE_DATA.push(obj2)
                });
            }
            if($scope.require==true){
                if($scope.FILE_DATA.length==0){
                    swal("执照证件不能为空", "", "warning");
                    return false;
                }
            }
            var requiredObj3= $scope.regForm.$error.required;
            angular.forEach(requiredObj3,function(keyData){
                keyData.$dirty = true;
            })
            if(!$scope.regForm.$valid||!$scope.myForm.$valid||!$scope.modelForm.$valid){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
            if ($scope.addReg.REGISTER_DATA) {


                if($scope.addReg.REGISTER_DATA.ZREGIST_BEGIN ){
                    if(Date.parse($scope.addReg.REGISTER_DATA.ZREGIST_BEGIN) > Date.parse(new Date())){
                        swal("组织机构有效期限起不能大于当今日期！", "","warning");
                        return false;
                    }
                    if(Date.parse($scope.addReg.REGISTER_DATA.ZREGIST_END)< Date.parse(new Date())){
                        swal("组织机构有效期限止不能小于当今日期！", "","warning");
                        return false;
                    }

                }

                if($scope.addReg.REGISTER_DATA.ZBUSI_BEGIN ){
                    if(Date.parse($scope.addReg.REGISTER_DATA.ZBUSI_BEGIN) > Date.parse(new Date())){
                        swal("营业期限起不能大于当今日期！", "","warning");
                        return false;
                    }
                    if(Date.parse($scope.addReg.REGISTER_DATA.ZBUSI_END)< Date.parse(new Date())){
                        swal("营业期限止不能小于当今日期！", "","warning");
                        return false;
                    }

                }
            }
        }
            if(button=='save'||button=='next'){

                $scope.doc.CONTACT_DATA = $scope.addLinkList;
                $scope.doc.CNEE_DATA =  $scope.addAddressList;
                $scope.doc.CENTRAL_DATA = $scope.addApp.CENTRAL_DATA;
                $scope.doc.BANK_DATA = $scope.addInvo.BANK_DATA;
                $scope.doc.REGISTER_DATA = $scope.addReg.REGISTER_DATA;
                $scope.doc.FILE_DATA = $scope.FILE_DATA;
                para = {processId: $scope.processId, nodeId: $scope.nodeId,doc:$scope.doc};
                para.comment = $scope.comment;
                var addCustomer = customer.addCustomer(para);
                addCustomer.success(function (data) {
                    if (data.code == 200) {
                        $scope.processId = data.rst.processId;
                        $scope.nodeId = data.rst.nodeId;
                        /*if (type1 == 'addApplication') {
                            $scope.processId = data.rst.processId;
                            $scope.nodeId = data.rst.nodeId;
                            /!*if($scope.addApp.CENTRAL_DATA.NEWNAME){
                             $scope.processName = $scope.addApp.CENTRAL_DATA.NEWNAME;
                             }else{
                             $scope.processName = $scope.addApp.CENTRAL_DATA.NAME1;
                             }*!/

                        }*/
                        if(button=='save'){
                            swal("保存成功", "", "success");
                        }else if(button=='next'){
                            if(type1=='addApplication'){
                                $scope.tab2=true;
                                $scope.ht.activeTab=2;
                            }else if(type1=='link'){
                                $scope.tab3=true;
                                $scope.ht.activeTab=3;
                                if(!$stateParams.sapid) {
                                    swal("", "请与客户核实是否完成三证合一及税号变更工作，如已完成，请录入统一社会信用机构代码（18位）；如未完成，请录入纳税人识别号（15位）！", "warning");
                                }
                            }else if(type1=='addInvoice'){
                                if($scope.addInvo.BANK_DATA.BKONT=="否" && !$scope.addInvo.BANK_DATA.STCEG && !$stateParams.sapid){
                                    $("#warmingBox").dialog({
                                        autoOpen: false,
                                        width: 700,
                                        height: 200,
                                        modal: true
                                    });
                                    $("#warmingBox").dialog("open");
                                }else{
                                    $scope.tab4=true;
                                    $scope.ht.activeTab=4;
                                }
                            }
                        }

                    } else {
                        swal(data.msg, "", "warning");
                    }
                }).error(function (error) {
                    swal({
                        title:"",
                        text:error,
                        type:"error"
                    })
                });
            }else if(button=='update'){
                $scope.doc.CONTACT_DATA = $scope.addLinkList;
                $scope.doc.CNEE_DATA =  $scope.addAddressList;
                $scope.doc.CENTRAL_DATA = $scope.addApp.CENTRAL_DATA;
                $scope.doc.BANK_DATA = $scope.addInvo.BANK_DATA;
                $scope.doc.REGISTER_DATA = $scope.addReg.REGISTER_DATA;
                $scope.doc.FILE_DATA = $scope.FILE_DATA;

                if( $stateParams.sapid){
                    console.log(JSON.stringify(dataBox))
                    console.log(JSON.stringify($scope.addInvo.BANK_DATA))
                    console.log(cusbox2==JSON.stringify($scope.addReg.REGISTER_DATA))
                    console.log(cusbox3.KTOKD==$scope.addApp.CENTRAL_DATA.KTOKD&&cusbox3.NEWNAME==$scope.addApp.CENTRAL_DATA.NEWNAME)
                    para = {processId: $scope.processId, nodeId: $scope.nodeId,doc:$scope.doc};
                    para.comment = $scope.comment;
                    if(JSON.stringify(dataBox)==JSON.stringify($scope.addInvo.BANK_DATA)&&cusbox2==JSON.stringify($scope.addReg.REGISTER_DATA)&&cusbox3.KTOKD==$scope.addApp.CENTRAL_DATA.KTOKD&&cusbox3.NEWNAME==$scope.addApp.CENTRAL_DATA.NEWNAME){
                        console.log(1)
                        var updatetosapAdd = customer.updatetosap(para);
                        updatetosapAdd.success(function (data) {
                            if (data.code == 200) {
                                $scope.processId = data.rst.processId;
                                $scope.nodeId = data.rst.nodeId;
                                swal({
                                    title: "提交成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回客户管理列表",
                                    closeOnConfirm: true
                                }, function () {
                                    window.location.href = '/index.html#/customerList';
                                });
                            } else {
                                swal("提交失败", "", "error");
                            }
                        }).error(function (error) {
                            swal({
                                title:"",
                                text:error,
                                type:"error"
                            })
                        });
                    }else{
                        console.log(2)
                        if(type1 == 'addRegMessage'){
                            if($scope.FILE_DATA.length==0){
                                swal(
                                    {
                                        title: "三证上传不齐全，确定提交？",
                                        text: "",
                                        type: "warning",
                                        showCancelButton: true,
                                        cancelButtonText: '否',
                                        confirmButtonColor: '#DD6B55',
                                        confirmButtonText: '是'
                                    },
                                    function () {
                                        var customerAdd = customer.customerAdd(para);
                                        customerAdd.success(function (data) {
                                            if (data.code == 200) {
                                                swal({
                                                    title: "提交成功",
                                                    text: "",
                                                    type: "success",
                                                    showCancelButton: false,
                                                    confirmButtonColor: "#DD6B55",
                                                    confirmButtonText: "返回客户管理列表",
                                                    closeOnConfirm: true
                                                }, function () {
                                                    window.location.href = '/index.html#/customerList';
                                                });
                                            } else {
                                                swal("提交失败", "", "error");
                                            }
                                        }).error(function (error) {
                                            swal({
                                                title:"",
                                                text:error,
                                                type:"error"
                                            })
                                        });
                                    }

                                );

                            }else{
                                var customerAdd = customer.customerAdd(para);
                                customerAdd.success(function (data) {
                                    if (data.code == 200) {
                                        swal({
                                            title: "提交成功",
                                            text: "",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "返回客户管理列表",
                                            closeOnConfirm: true
                                        }, function () {
                                            window.location.href = '/index.html#/customerList';
                                        });
                                    } else {
                                        swal("提交失败", "", "error");
                                    }
                                }).error(function (error) {
                                    swal({
                                        title:"",
                                        text:error,
                                        type:"error"
                                    })
                                });
                            }

                        }
                    }

                }else{//草稿提交
                    para = {processId: $stateParams.processId, nodeId: $stateParams.nodeId,doc:$scope.doc, onlysave: true};
                    para.comment = $scope.comment;
                    if($scope.addApp.CENTRAL_DATA.KUNNR){
                        var keyValue = customer.viewCustomerEidet({
                            sapid:$scope.addApp.CENTRAL_DATA.KUNNR
                        });
                        keyValue.success(function (data) {
                            if (data.code == 200) {
                                cusbox2=JSON.stringify(data.rst.model.REGISTER_DATA);
                                cusbox3.KTOKD=data.rst.model.CENTRAL_DATA.KTOKD;
                                cusbox3.NEWNAME=data.rst.model.CENTRAL_DATA.NEWNAME;

                                dataBox.BANKL=data.rst.model.BANK_DATA.BANKL;
                                dataBox.STCEG=data.rst.model.BANK_DATA.STCEG;
                                dataBox.KOINH=data.rst.model.BANK_DATA.KOINH;
                                if(data.rst.model.BANK_DATA.BKONT=="X"){
                                    dataBox.BKONT="是";
                                }else if(data.rst.model.BANK_DATA.BKONT==""){
                                    dataBox.BKONT="否";
                                }
                                dataBox.BKREF=data.rst.model.BANK_DATA.BKREF;
                                dataBox.BRNCH=data.rst.model.BANK_DATA.BRNCH;
                                dataBox.BANKA=data.rst.model.BANK_DATA.BANKA;
                                dataBox.STRAS=data.rst.model.BANK_DATA.STRAS;
                                console.log(JSON.stringify(dataBox))
                                console.log(JSON.stringify($scope.addInvo.BANK_DATA))
                                console.log(cusbox2==JSON.stringify($scope.addReg.REGISTER_DATA))
                                console.log(cusbox3.KTOKD==$scope.addApp.CENTRAL_DATA.KTOKD&&cusbox3.NEWNAME==$scope.addApp.CENTRAL_DATA.NEWNAME)

                                if(JSON.stringify(dataBox)==JSON.stringify($scope.addInvo.BANK_DATA)&&cusbox2==JSON.stringify($scope.addReg.REGISTER_DATA)&&cusbox3.KTOKD==$scope.addApp.CENTRAL_DATA.KTOKD&&cusbox3.NEWNAME==$scope.addApp.CENTRAL_DATA.NEWNAME){
                                    console.log(1)
                                    var updatetosapAdd = customer.updatetosap(para);
                                    updatetosapAdd.success(function (data) {
                                        if (data.code == 200) {
                                            $scope.processId = data.rst.processId;
                                            $scope.nodeId = data.rst.nodeId;
                                            swal({
                                                title: "提交成功",
                                                text: "",
                                                type: "success",
                                                showCancelButton: false,
                                                confirmButtonColor: "#DD6B55",
                                                confirmButtonText: "返回客户管理列表",
                                                closeOnConfirm: true
                                            }, function () {
                                                updatetosapDel = customer.updatetosapDel({processId:$stateParams.processId,nodeId:$stateParams.nodeId});
                                                updatetosapDel.success(function(data){
                                                    if(data.code==200){
                                                        window.location.href = '/index.html#/customerList';
                                                    }
                                                })
                                            });
                                        } else {
                                            swal("提交失败", "", "error");
                                        }
                                    }).error(function (error) {
                                        swal({
                                            title:"",
                                            text:error,
                                            type:"error"
                                        })
                                    });
                                }else{
                                    console.log(2)
                                    if(type1 == 'addRegMessage'){
                                        if($scope.FILE_DATA.length==0){
                                            swal(
                                                {
                                                    title: "三证上传不齐全，确定提交？",
                                                    text: "",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    cancelButtonText: '否',
                                                    confirmButtonColor: '#DD6B55',
                                                    confirmButtonText: '是'
                                                },
                                                function () {
                                                    var customerAdd = customer.customerAdd(para);
                                                    customerAdd.success(function (data) {
                                                        if (data.code == 200) {
                                                            swal({
                                                                title: "提交成功",
                                                                text: "",
                                                                type: "success",
                                                                showCancelButton: false,
                                                                confirmButtonColor: "#DD6B55",
                                                                confirmButtonText: "返回客户管理列表",
                                                                closeOnConfirm: true
                                                            }, function () {
                                                                window.location.href = '/index.html#/customerList';
                                                            });
                                                        } else {
                                                            swal("提交失败", "", "error");
                                                        }
                                                    }).error(function (error) {
                                                        swal({
                                                            title:"",
                                                            text:error,
                                                            type:"error"
                                                        })
                                                    });
                                                }

                                            );

                                        }else{
                                            var customerAdd = customer.customerAdd(para);
                                            customerAdd.success(function (data) {
                                                if (data.code == 200) {
                                                    swal({
                                                        title: "提交成功",
                                                        text: "",
                                                        type: "success",
                                                        showCancelButton: false,
                                                        confirmButtonColor: "#DD6B55",
                                                        confirmButtonText: "返回客户管理列表",
                                                        closeOnConfirm: true
                                                    }, function () {
                                                        window.location.href = '/index.html#/customerList';
                                                    });
                                                } else {
                                                    swal("提交失败", "", "error");
                                                }
                                            }).error(function (error) {
                                                swal({
                                                    title:"",
                                                    text:error,
                                                    type:"error"
                                                })
                                            });
                                        }

                                    }
                                }
                            }
                        }).error(function (error) {
                            swal({
                                title:'',
                                text:error,
                                type:"error"
                            })
                        });

                    }else{
                        if(type1 == 'addRegMessage'){
                            if($scope.FILE_DATA.length==0){
                                swal(
                                    {
                                        title: "三证上传不齐全，确定提交？",
                                        text: "",
                                        type: "warning",
                                        showCancelButton: true,
                                        cancelButtonText: '否',
                                        confirmButtonColor: '#DD6B55',
                                        confirmButtonText: '是'
                                    },
                                    function () {
                                        var customerAdd = customer.customerAdd(para);
                                        customerAdd.success(function (data) {
                                            if (data.code == 200) {
                                                swal({
                                                    title: "提交成功",
                                                    text: "",
                                                    type: "success",
                                                    showCancelButton: false,
                                                    confirmButtonColor: "#DD6B55",
                                                    confirmButtonText: "返回客户管理列表",
                                                    closeOnConfirm: true
                                                }, function () {
                                                    window.location.href = '/index.html#/customerList';
                                                });
                                            } else {
                                                swal("提交失败", "", "error");
                                            }
                                        }).error(function (error) {
                                            swal({
                                                title:"",
                                                text:error,
                                                type:"error"
                                            })
                                        });
                                    }

                                );

                            }else{
                                var customerAdd = customer.customerAdd(para);
                                customerAdd.success(function (data) {
                                    if (data.code == 200) {
                                        swal({
                                            title: "提交成功",
                                            text: "",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "返回客户管理列表",
                                            closeOnConfirm: true
                                        }, function () {
                                            window.location.href = '/index.html#/customerList';
                                        });
                                    } else {
                                        swal("提交失败", "", "error");
                                    }
                                }).error(function (error) {
                                    swal({
                                        title:"",
                                        text:error,
                                        type:"error"
                                    })
                                });
                            }

                        }
                    }
                }
            }
        }
}]);




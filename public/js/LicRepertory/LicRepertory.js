var LicRepertoryApp = angular.module('LicRepertoryApp', ['pageDirectives', 'formDirectives']);
LicRepertoryApp.service('LicRepertoryServices', function ($http) {
    var service = {
        LicRepertorylist: function (param) {//库存查询
            return $http.post('/licstock/list', param, {cache: false});
        },
        LicRepertorysavelic: function (param) {//新建保存
            return $http.post('/licstock/savelic', param, {cache: false});
        },
        LicRepertorydellic: function (param) {//库存查询删除
            return $http.post('/licstock/dellic', param, {cache: false});
        },
        LicRepertoryreaddelivery: function (param) {//匹配查询
            return $http.post('/licstock/readdelivery', param, {cache: false});
        },
        LicRepertorymatch: function (param) {//匹配
            return $http.post('/licstock/match', param, {cache: false});
        },
        LicRepertoryeditlic: function (param) {//编辑保存
            return $http.post('/licstock/editlic', param, {cache: false});
        }
    };
    return service;
});
//查询
LicRepertoryApp.controller('LicRepertoryListCtrl', ['$scope','$state','$rootScope','$filter','LicRepertoryServices',function($scope,$state,$rootScope,$filter,LicRepertory) {
    var rowData = [];
    var allData = [];
    var xmcode,xsorder,xlickey;
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            $scope.emptyFn();
            var param = {
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                mcode:$scope.mcode,
                sorder:$scope.sorder,
                lickey:$scope.lickey,
                status:$scope.status,
                contractno:$scope.contractno,
                delivery:$scope.delivery
            };
            var LicRepertoryPromise = LicRepertory.LicRepertorylist(param);
            LicRepertoryPromise.success(function (data) {
                if (data.code == 200) {
                    $scope.dataList = data.rst.data.items;
                    var allData = data.rst.data.items;
                    for(var i = 0;i < allData.length;i++) {
                        var rowData = allData[i];
                        var xmcode = rowData.mcode;
                        var xsorder = rowData.sorder;
                        var xlickey = rowData.lickey;
                        //console.log(xmcode);
                    }
                }
            });
            $scope.paginationConf.pagePromise = LicRepertoryPromise;
        }
    };

    //选中（删除、导出）
    $scope.cArr = [];
    $scope.cArrdata = [];
    $scope.cArrstatus = [];
    $scope.cArrids = [];
    //$scope.cArrmatchnum = [];
    var updateSelected = function (action,id, i) {
        var ident = $scope.dataList[i].ident;
        if (action == 'add') {
            $scope.cArr.push(id);
            $scope.cArrdata.push($scope.dataList[i]);
            $scope.cArrids.push($scope.dataList[i].ident);
            //$scope.cArrmatchnum.push($scope.dataList[i].matchnum);
        }
        //console.log($scope.cArr);
        //console.log($scope.cArrids);
        //console.log($scope.cArrdata);

        if (action == 'remove') {
            var index = $scope.cArr.indexOf(id);
            $scope.cArr.splice(index, 1);
            $scope.cArrdata.splice(index, 1);
            $scope.cArrids.splice(index, 1);
            //$scope.cArrmatchnum.splice(index, 1);
            //console.log($scope.cArrdata);
        }
    };
    $scope.updateSelection = function ($event,id,i) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action,id, i);
        //console.log($scope.cArrdata);
    };

    $scope.allCheck = function ($event) {
        var checkbox = $('#allcheck')[0];
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            for (var i = 0; i < $scope.dataList.length; i++) {
                $scope.cArr[i] = $scope.dataList[i]._id;
                $scope.cArrids[i] = $scope.dataList[i].ident;
                //$scope.cArrmatchnum[i] = $scope.dataList[i].matchnum;
            }
            $scope.cArrdata = $scope.dataList
        } else {
            $scope.cArr = [];
            $scope.cArrdata = [];
            $scope.cArrids = [];
            //$scope.cArrmatchnum = [];
        }
        //console.log($scope.cArr);
        //console.log($scope.cArrids);
        //console.log($scope.cArrdata);
    };
    // 清空
    $scope.emptyFn = function () {
        $scope.checkAll = false;
        $scope.cArr = [];
        $scope.cArrcode = [];
        $scope.cArrstatus = [];
        $scope.cArrdata = [];
        //$scope.cArrmatchnum = [];
    };
    //编辑
    $scope.edit = function(e){
        //console.log($scope.cArr);
        //console.log($scope.cArrids.join(';;'));"index.html#/edit?ids={{list._id}}"
        $(e.target).attr('href', 'index.html#/edit?ids='+$scope.list._id.join(';;'));
        $scope.search();
    };

    //删除
    //$scope.cArrdata = [];
    $scope.deleteData = function () {
        //console.log($scope.cArrdata);
        var allData = $scope.cArrdata;
        for(var i = 0;i < allData.length;i++) {
            var cArrmatchnum = allData[i].matchnum;
            //console.log(cArrmatchnum);
            if(cArrmatchnum){
                swal("存在匹配过交货单的行项目，不可删除", "", "warning");
                return true;
            }
        }
        var param  =  {'mcode':$scope.mcode,'sorder':$scope.sorder,'lickey':$scope.lickey,ids:$scope.cArr};
        var viewUser = LicRepertory.LicRepertorydellic(param);
        viewUser.success(function(data){
            if(data.code == 200){
                $scope.dataList = data.rst;
                $scope.search();
            }
        });
    };

    //选中导出
    $scope.exportexcel=function(){
        if($scope.cArr.length == 0){
            swal('请勾选列表','','warning');return;
        }
        var path='/licstock/exportexcel';
        var strArr = [];
        $.each($scope.cArr,function(key,value){
            var para = 'ids='+value;
            strArr.push(para);
        });
        var str = strArr.join("&");
        path = path+'?'+str;
        // console.log('path:', path)
        window.open(path);
    };


    //全部导出
    $scope.exportexcelall=function(){
        if($scope.cArr.length != 0){
            return;
        }
        var path='/licstock/exportexcel';
        var strArr = [];
        $.each($scope.cArr,function(key,value){
            var para = 'ids='+value;
            strArr.push(para);
        });
        var str = strArr.join("&");
        path = path+'?'+str;
        // console.log('path:', path)
        window.open(path);
    };

    // $scope.exportexcelall = function (e) {
    //     window.open('/licstock/exportexcel?mcode='+xmcode+'&sorder='+xsorder+'&lickey='+xlickey)
    // };
    // $scope.excleFormData = {category: "", zrjt: 0};




}]);


//新建
LicRepertoryApp.controller('LicRepertoryAddCtrl', ['$scope', '$rootScope','$filter','LicRepertoryServices','$window',function($scope,$rootScope,$filter,LicRepertory,$window) {
    //手动添加、删除
    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];
    $scope.userAdd = function(){
        var obj= {mcode:'', stocknum:'', lickey:'', sorder:'', batchnum:''};
        $scope.userLinkList.push(obj);
        //console.log(obj);
    };
    $scope.userDel = function(idx,type) {
        if (type == 'userLinkList') {
            $scope.userLinkList.splice(idx, 1);
        }
    };

    //选中删除
    $scope.checkDel = function(idx){
        var parent = $("#itemTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if(check.attr("checked") == undefined || check.attr("checked") == 'false'){
            check.attr('checked','checked');
            for(var x in $scope.userLinkList){
                $scope.userLinkList[idx].rightAdd = true;
            }
        }else{
            check.removeAttr('checked');
            for(var x in $scope.userLinkList){
                delete  $scope.userLinkList[idx].rightAdd;
            }
        }
    };

    //全选删除
    $scope.addNumber = function($event){
        var checkbox = $event.target;
        $scope.checkAllDel= checkbox.checked ? true : false;
        if($scope.checkAllDel){
            $scope.userLinkList.forEach(function(item){
                item.rightAdd = true;
            });
        }else{
            $scope.userLinkList.forEach(function(item){
                delete  item.rightAdd;
            });
        }
        // console.log($scope.checkAllDel);
    };

    //刷新页面
    $scope.reloadRoute = function () {
        $window.location.reload();
    };

    //删除按钮
    $scope.optDel = function(){
        var rightArr = [];
        var errorArr = [];
        $scope.userLinkList.forEach(function(item){
            if(item.rightAdd){

            }else{
                rightArr.push(item);
            }
        });
        $scope.userLinkList = rightArr;
        if($scope.checkAllDel == true){
            $scope.reloadRoute();
        }
    };

    //上传
    $scope.excleConfW1 = {
        formData:{},
        buttonText:'上传',
        uploader:'/licstock/importexcel'
    };

    //上传后填写列表(上传回调函数)
    $scope.changeSalesList = function(uploadCallData) {
        //console.log('uploadCallData',uploadCallData);
        $scope.userLinkList = uploadCallData.items;
        if(uploadCallData.checkerror){
            swal("不能重复上传", "", "warning");
        }else{
            $scope.userLinkList = uploadCallData.items;
        }
    };

    //保存 
    $scope.addData = function () {
        for(var i = 0 ; i < $scope.userLinkList.length ;i ++){
            $scope.rowData = [];
            $scope.rowData = $scope.userLinkList[i];
            //console.log($scope.rowData);
            var rowerrormsg = $scope.rowData.errormsg;
            //console.log(rowerrormsg);
            if(rowerrormsg){
                swal("不能重复上传", "", "warning");
                return false;
            }
            if(!$scope.rowData.stocknum||!$scope.rowData.mcode||!$scope.rowData.lickey||!$scope.rowData.sorder){
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
            // var rowPhoneData  = rowData.stocknum;
            // //如果rowPhoneData不为数字则提示并return
            // if(isNaN(rowPhoneData)){
            //     swal("库区数量请填写数字", "", "warning");
            //     return false;
            // }
        }
        var param  =  {
            mcode:$scope.mcode,
            sorder:$scope.sorder,
            lickey:$scope.lickey,
            items:$scope.userLinkList
        };
        var viewUser = LicRepertory.LicRepertorysavelic(param);
        viewUser.success(function(data){
            if(data.code == 200){
                if(data.rst.checkerror == '1'){
                    swal("不能重复上传", "", "warning");
                }else{
                    $scope.userLinkList = [];
                    swal("保存成功", "", "success");}
            }else {
                swal(data.msg,'','error');
            }
        });
    };
}]);


//编辑
LicRepertoryApp.controller('LicRepertoryEditCtrl', ['$scope','$rootScope','$stateParams','$filter','LicRepertoryServices',function($scope,$rootScope,$stateParams,$filter,LicRepertory) {
    var ids = $stateParams.ids.split(';;');
    //console.log(ids);
    //$scope.currentPage = $stateParams.page;
    //$scope.itemsPerPage = $stateParams.limit;
    var currentData = [];
    $scope.paginationConf = {
        currentPage: $scope.currentPage,
        itemsPerPage: $scope.itemsPerPage,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var param = {
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                mcode:$scope.mcode,
                sorder:$scope.sorder,
                lickey:$scope.lickey
            };
            var LicRepertoryPromise = LicRepertory.LicRepertorylist(param);
            LicRepertoryPromise.success(function (data) {
                if (data.code == 200) {
                    $scope.dataLists = data.rst.data.items;

                    //多条编辑
                    //console.log($scope.ids);
                    //var currentData = [];
                    //var allData = data.rst.data.items;
                    //从全部数据中找到我需要的数据push到currentData中
                    // for(var i = 0;i < allData.length;i++){
                    //     var rowData = allData[i];
                    //     var rowIdent = rowData._id;
                    //     //console.log(rowIdent);
                    //     for(var j = 0;j < ids.length;j++){
                    //         var ident = ids[j];
                    //         console.log(ident);
                    //         if(ident == rowIdent){
                    //             //这行是选中
                    //             currentData.push(rowData);
                    //         }
                    //     }
                    // }

                    var dataLists = [];
                    var allData = data.rst.data.items;
                    //从全部数据中找到我需要的数据push到currentData中
                    for(var i = 0;i < allData.length;i++){
                        var rowData = allData[i];
                        //console.log(rowData);//所有的内容
                        var rowIdent = rowData._id;
                        //console.log(rowIdent);//所有的id
                        for(var j = 0;j < ids.length;j++){
                            var ident = ids[j];
                            //console.log(ident);//选取的id
                            if(ident == rowIdent){
                                //这行是选中
                                currentData.push(rowData);
                                //console.log(rowData)//选中的id内容
                                //console.log(currentData);
                                // var stocknumData = rowData.stocknum;
                                // var lickeyData = rowData.lickey;
                                // console.log(stocknumData);
                                // console.log(lickeyData);
                            }
                            $scope.dataLists = currentData;
                            //console.log(dataLists);
                        }

                    }
                }
            });
            $scope.paginationConf.pagePromise = LicRepertoryPromise;
        }
    };

    // $scope.cArr = [];
    // $scope.cArrdata = [];
    // $scope.cArrstatus = [];
    // $scope.cArrids = [];
    // var updateSelected = function (action,id, i) {
    //     var ident = $scope.dataLists[i].ident;
    //     if (action == 'add') {
    //         $scope.cArr.push(id);
    //         $scope.cArrdata.push($scope.dataLists[i]);
    //         $scope.cArrids.push($scope.dataLists[i].ident);
    //     }
    //     //console.log($scope.cArr);
    //     //console.log($scope.cArrids);
    //     if (action == 'remove') {
    //         var index = $scope.cArr.indexOf(id);
    //         $scope.cArr.splice(index, 1);
    //         $scope.cArrdata.splice(index, 1);
    //         $scope.cArrids.splice(index, 1);
    //     }
    // };
    // $scope.updateSelection = function ($event,id,i) {
    //     var checkbox = $event.target;
    //     var action = (checkbox.checked ? 'add' : 'remove');
    //     updateSelected(action,id, i);
    // };
    //
    // $scope.allCheck = function ($event) {
    //     var checkbox = $('#allcheck')[0];
    //     $scope.checkAll = checkbox.checked ? true : false;
    //     if ($scope.checkAll) {
    //         for (var i = 0; i < $scope.dataLists.length; i++) {
    //             $scope.cArr[i] = $scope.dataLists[i]._id;
    //             $scope.cArrids[i] = $scope.dataLists[i].ident;
    //         }
    //         $scope.cArrdata = $scope.dataLists
    //     } else {
    //         $scope.cArr = [];
    //         $scope.cArrdata = [];
    //         $scope.cArrids = [];
    //     }
    //     console.log($scope.cArr);
    //     //console.log($scope.cArrids);
    // };

    //删除
    // $scope.deleteDatas = function () {
    //     var param  =  {'mcode':$scope.mcode,'sorder':$scope.sorder,'lickey':$scope.lickey,ids:rowData};
    //     var viewUser = LicRepertory.LicRepertorydellic(param);
    //     viewUser.success(function(data){
    //         if(data.code == 200){
    //             $scope.dataLists = data.rst;
    //             $scope.search();
    //         }
    //     });
    // };

    //保存
    $scope.addData = function () {
        var param  =  {
            mcode:$scope.mcode,
            sorder:$scope.sorder,
            lickey:$scope.lickey,
            doc:$scope.dataLists[0]
        };
        var viewUser = LicRepertory.LicRepertoryeditlic(param);
        viewUser.success(function(data){
            if(data.code == 200){
                swal("保存成功", "", "success");
            }else {
                swal(data.msg,'','error');
            }
        });
    };
}]);


//匹配
LicRepertoryApp.controller('LicRepertoryCtrl', ['$scope', '$rootScope','$filter','LicRepertoryServices',function($scope,$rootScope,$filter,LicRepertory) {
    var LicList = [];
    var LicList1 = [];
    var xmcode,xsorder,xvercode,xactcode,xsaleorder,xdelivery;
    var xmcode1,xsorder1,xvercode1,xactcode1,xsaleorder1,xdelivery1;
    $scope.search = function () {
        var LicRepertoryPromise = LicRepertory.LicRepertoryreaddelivery({delivery:$scope.delivery});
        LicRepertoryPromise.success(function (data) {
            if (data.code == 200) {
                $scope.LicList = data.rst.nomatch ;
                $scope.LicList1 = data.rst.items;
                //console.log($scope.LicList1);

                //置顶
                var notequal1 = [];//标红新数组
                var equal1 = [];//未标红数组
                var newLicList1 = []; //新数组
                var notequal = [];//标红新数组
                var equal = [];//未标红数组
                var newLicList = [];//新数组
                var allData1 = data.rst.items;
                var allData = data.rst.nomatch;
                //console.log(allData1);
                for(var i = 0;i < allData1.length;i++){
                    //console.log(allData1);
                    var rowData1 = allData1[i];
                    //console.log(rowData1);
                    var rowstocknum1 = rowData1.stocknum;
                    var rowmatchnum1 = rowData1.matchnum;
                    xmcode1 = rowData1.mcode;
                    xsorder1 = rowData1.sorder;
                    xvercode1 = rowData1.vercode;
                    xactcode1 = rowData1.actcode;
                    xsaleorder1 = rowData1.saleorder;
                    xdelivery1 = rowData1.delivery;
                    //console.log(rowmatchnum1); //10 65
                    //console.log(rowstocknum1); //10 200
                    if(rowstocknum1 == rowmatchnum1) {
                        equal1.push(rowData1);
                    }else{
                        notequal1.push(rowData1);
                    }
                    //console.log(equal1);
                    //console.log(notequal1);
                    newLicList1 = notequal1 .concat(equal1 );
                    $scope.LicList1 = newLicList1;
                 }
                for(var j = 0;j < allData.length;j++){
                    //console.log(allData);
                    var rowData = allData[j];
                    //console.log(rowData);
                    var rowstocknum = rowData.stocknum;
                    var rowmatchnum = rowData.matchnum;
                    var xmcode = rowData.mcode;
                    xsorder = rowData.sorder;
                    xvercode = rowData.vercode;
                    xactcode = rowData.actcode;
                    xsaleorder = rowData1.saleorder;
                    xdelivery = rowData.delivery;
                    //console.log(xsorder);
                    //console.log(rowmatchnum);
                    //console.log(rowstocknum);
                    if(rowstocknum == rowmatchnum) {
                        equal.push(rowData);
                    }else{
                        notequal.push(rowData);
                    }
                    //console.log(equal);
                    //console.log(notequal);
                    newLicList = notequal .concat(equal);
                    $scope.LicList = newLicList;
                }
            }else {
                swal(data.msg,'','error');
            }
        });
    };

    // 生成lic
    $scope.downloadLic = function () {
        // $scope.LicList = data.rst.nomatch ;
        // $scope.LicList1 = data.rst.items;
        console.log(xsorder);

        var doc = new jsPDF();
        doc.setFontSize(38);
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.text(40, 33, "CNBM TECHNOLOGY");
        doc.setDrawColor(0);
        doc.setFillColor(203, 23, 35);
        doc.rect(20.5, 20.5, 14, 14, 'F');
        doc.setFillColor(255, 255, 255);
        doc.triangle(20, 20, 20, 25, 25, 20, 'F');
        doc.triangle(35, 20, 35, 25, 30, 20, 'F');
        doc.triangle(20, 35, 25, 35, 20, 30, 'F');
        doc.triangle(35, 35, 35, 30, 30, 35, 'F');
        doc.setFillColor(255, 255, 255);
        doc.rect(24, 24, 7, 7, 'F');
        doc.triangle(25.5, 24.5, 27.5, 22, 29.5, 24.5, 'F');
        doc.triangle(24.5, 26, 22, 27.5, 24.5, 29, 'F');
        doc.triangle(26, 30, 27.5, 33, 29, 30, 'F');
        doc.triangle(30, 25.5, 33, 27.5, 30.5, 29, 'F');

        doc.setFontSize(20);

        doc.text(20, 50, "Proof of Entitlement");
        doc.setFontSize(9);
        doc.text(20, 60, "    This Proof of Entitlement, supported by your matching paid invoice or receipt, is evidence of your level of authorized");
        doc.text(20, 65, "use of the Eligible Products.  This proof of Entitlement records the Entitlement ID and Activation Password,  which are");
        doc.text(20, 70, "used to download electronic license.");
        doc.text(20, 75, "    Please log in this website http://app.huawei.com/isdp to active and download the electronic license file for equipment");
        doc.text(20, 80, "installation. If you have any questions or need assistance,please contact Huawei Technical Assistance Center (TAC) at");
        doc.text(20, 85, "your respective geographic location.");

        doc.setFontSize(20);
        doc.setFillColor(117, 113, 112);
        doc.rect(20, 91, 170, 8, 'F');
        doc.text(20, 97, "Entitlement Information");
        doc.setFontSize(15);
        doc.text(20, 107, "Huawei Contract Number:");
        doc.text(90, 107, "xsorder ");
        doc.text(20, 114, "Product & Version:");
        doc.text(20, 121, "Entitlement ID (LAC):");
        doc.text(20, 128, "Activation Password:");
        doc.text(20, 135, "Require to Install License Key:YES");
        doc.text(20, 142, "Sale Number:");
        doc.text(20, 149, "receipt number:");

        doc.setFontSize(20);
        doc.setFillColor(117, 113, 112);
        doc.rect(20, 154, 170, 8, 'F');
        doc.text(20, 160, "The Eligible Products are listed below");
        doc.setFontSize(15);
        doc.text(20, 170, "Part Number:");
        doc.text(20, 177, "Quantity:");

        // doc.save('Lic.pdf');
        doc.output('datauri');//直接输出为新的web页
        //document.getElementById("iframe123").src = doc.output('datauristring');//在iframe中显示

        // doc.addPage();
        //
        // var createPDF = function (imgData) {
        //     var imgData = 'data:image/jpeg;base64,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';
        //     doc.addImage(imgData, 'JPEG', 0, 40, 180, 160)
        // };

    };



    //保存
    $scope.match = function () {
        var param  =  {
            mcode:$scope.mcode,
            sorder:$scope.sorder,
            lickey:$scope.lickey,
            delivery:$scope.delivery
        };
        var viewUser = LicRepertory.LicRepertorymatch(param);
        viewUser.success(function(data){
            if(data.code == 200){
                $scope.LicList = data.rst.nomatch;
                $scope.LicList1 = data.rst.items;
                $scope.search();
                swal("操作完成", "", "success");
            }else {
                swal(data.msg,'','error');
            }
        });
    };


}]);

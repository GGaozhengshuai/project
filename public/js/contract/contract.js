var contractApp = angular.module('contractApp', ['pageDirectives','formDirectives','ui.autocomplete', 'MyFilterApp']);
contractApp.service('contractServices', function($http) {
    var service = {
        listInside: function(param) {
            return $http.post('/contract/list',param ,{cache:false});
        },
        /*listContractDraft: function(param) {
         return $http.post('/contract/listdraft',param ,{cache:false});
         },*/
        viewInside: function(param) {
            return $http.post('/contract/view',param ,{cache:true});
        },
        addInside: function(param){
            return $http.post('/contract/save',param ,{cache:false});
        },
        updateInside: function(param){
            return $http.post('/contract/update',param ,{cache:false});
        },
        applyAdd: function(param){
            return $http.post('/contract/createprocess',param ,{cache:false});
        },
        addInsideCognatecontract: function(param){
            return $http.post('/cognatecontract/save',param ,{cache:false});
        },
        applyAddCognatecontract: function(param){
            return $http.post('/cognatecontract/createprocess',param ,{cache:false});
        },
        applyViewCognatecontract: function(param) {//审批接口
            return $http.post('/cognatecontract/detail',param ,{cache:false});
        },
        addCpqdCognatecontract: function(param){//添加物料清单
            return $http.post('/cognatecontract/saveitems',param ,{cache:false});
        },
        listUser: function(param){//用户接口
            return $http.post('/user/list',param);
        },
        listCustomer: function(param){//客户接口
            return $http.post('/customer/list',param ,{cache:false});
        },
        listcontact: function(param){//客户联系人
            return $http.post('/customer/listcontact',param ,{cache:false});
        },
        deptassure: function (param) {//部门担保
            return $http.post('/deptassure/list', param, {cache: false});
        },
        cusUser: function(param){//常用收货地址
            return $http.post('/contract/listzvsd',param ,{cache:false});
        },
        /*listProduct: function(param){//产品线接口
         return $http.post('/contract/listmara',param ,{cache:false});
         },*/
        listFd: function(param){//销售返点接口
            return $http.post('/salesbonus/list',param ,{cache:false});
        },
        listJc: function(param){//借出单查询
            return $http.post('/productlend/listforsales',param ,{cache:false});
        },
        listCgd: function(param){//采购申请单
            return $http.post('/contract/purchaseList',param ,{cache:false});
        },
        listwlqd: function(param){//物料清单
            return $http.post('/contract/materiellist',param ,{cache:false});
        },
        saveitems: function(param){//添加物料清单
            return $http.post('/contract/saveitems',param ,{cache:false});
        },
        listCpqd: function(param){//物料清单列表
            return $http.post('/contract/listitems',param ,{cache:false});
        },
        cpxenum: function(param){//产品线
            return $http.post('/contract/cpxenum',param ,{cache:false});
        },
        initcost: function(param){//成本分析
            return $http.post('/contract/initcost',param ,{cache:false});
        },
        matchcost: function(param){//成本分析差异匹配和重新匹配
            return $http.post('/contract/matchcost',param ,{cache:false});
        },
        savecost: function(param){//成本分析差异匹配和重新匹配
            return $http.post('/contract/savecost',param ,{cache:false});
        },
        listversion: function(param){//合同版本
            return $http.post('/contract/listversion',param ,{cache:false});
        },
        fenxiaointerestsap: function(param){//分销的成本分析要读SAP的利润值
            return $http.post('/contract/fenxiaointerestsap',param ,{cache:false});
        },
        applyView: function(param) {//审批接口
            return $http.post('/contract/detail',param ,{cache:false});
        },
        agreeCognatecontract: function(param){//同意
            return $http.post('/cognatecontract/agree',param ,{cache:false});
        },
        disagreeCognatecontract: function(param){//驳回
            return $http.post('/cognatecontract/disagree',param ,{cache:false});
        },
        cancelCognatecontract: function(param){//取消
            return $http.post('/cognatecontract/cancel',param ,{cache:false});
        },
        recallCognatecontract: function(param){//召回
            return $http.post('/cognatecontract/recall',param ,{cache:false});
        },
        listcandidates: function(param){//同意
            return $http.post('/contract/listcandidates',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/contract/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/contract/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/contract/cancel',param ,{cache:false});
        },
        recall: function(param){//召回1111
            return $http.post('/contract/recall',param ,{cache:false});
        },
        startchange: function(param){//审批完后 合同清单变更
            return $http.post('/contractchange/startchange',param ,{cache:false});
        },
        cancelchange: function(param){//审批完后 取消合同清单变更
            return $http.post('/contractchange/cancelchange',param ,{cache:false});
        },
        saverebate: function(param){//审批完后 合同清单变更 保存成本分析
            return $http.post('/contractchange/savecost',param ,{cache:false});
        },
        ViewInsideBillChange: function(param) {
            return $http.post('/contractchange/view',param ,{cache:true});
        },
        addInsideBillChangeSave: function(param){
            return $http.post('/contractchange/save',param ,{cache:false});
        },
        addInsideBillChange: function(param){//保存退换货协议基本信息
            return $http.post('/contractchange/addprotocal',param ,{cache:false});
        },
        addInsideBillChangeTtems: function(param){//保存退换货协清单明细
            return $http.post('/contractchange/addprotocalItem',param ,{cache:false});
        },
        getothercost: function(param){//读取清单变更的成本分析
            return $http.post('/contractchange/initcost',param ,{cache:false});
        },
        applyAddBillChange: function(param){
            return $http.post('/contractchange/createprocess',param ,{cache:false});
        },
        applyViewBillChange: function(param) {//审批接口
            return $http.post('/contractchange/detail',param ,{cache:false});
        },
        agreeBillChange: function(param){//同意
            return $http.post('/contractchange/agree',param ,{cache:false});
        },
        disagreeBillChange: function(param){//驳回
            return $http.post('/contractchange/disagree',param ,{cache:false});
        },
        cancelBillChange: function(param){//取消
            return $http.post('/contractchange/cancel',param ,{cache:false});
        },
        recallBillChange: function(param){//召回
            return $http.post('/contractchange/recall',param ,{cache:false});
        },
        //销售合同基本信息变更
        startchangeBase: function(param){//审批完后 基本信息是否能够变更
            return $http.post('/contractcontentchange/startchange',param ,{cache:false});
        },
        cancelchangeBase: function(param){//审批完后 取消合同基本信息变更
            return $http.post('/contractcontentchange/cancelchange',param ,{cache:false});
        },
        addBaseContract: function(param){
            return $http.post('/contractcontentchange/save',param ,{cache:false});
        },
        viewBaseContract: function(param) {
            return $http.post('/contractcontentchange/view',param ,{cache:true});
        },
        saveContcost: function(param){//成本分析差异匹配和重新匹配
            return $http.post('/contractcontentchange/savecost',param ,{cache:false});
        },
        applyBaseContract: function(param){
            return $http.post('/contractcontentchange/createprocess',param ,{cache:false});
        },
        detailBaseContract: function(param) {//审批接口
            return $http.post('/contractcontentchange/detail',param ,{cache:false});
        },
        agreeBaseContract: function(param){//同意
            return $http.post('/contractcontentchange/agree',param ,{cache:false});
        },
        disagreeBaseContract: function(param){//驳回
            return $http.post('/contractcontentchange/disagree',param ,{cache:false});
        },
        cancelBaseContract: function(param){//取消
            return $http.post('/contractcontentchange/cancel',param ,{cache:false});
        },
        recallBaseContract: function(param){//召回
            return $http.post('/contractcontentchange/recall',param ,{cache:false});
        },
        //配套销售合同内容变更----保存和审批 暂时用其他合同类型变更的 测试没问题
        cognatestartchangeBase: function(param){//审批完后 基本信息是否能够变更
            return $http.post('/cognatecontentchange/startchange',param ,{cache:false});
        },
        cognatecancelchangeBase: function(param){//审批完后 取消合同基本信息变更
            return $http.post('/cognatecontentchange/cancelchange',param ,{cache:false});
        },
        cognateapplyBaseContract: function(param){
            return $http.post('/cognatecontentchange/createprocess',param ,{cache:false});
        },
        cognateaddBaseContract: function(param){
            return $http.post('/cognatecontentchange/save',param ,{cache:false});
        },
        cognateagreeBaseContract: function(param){//同意
            return $http.post('/cognatecontentchange/agree',param ,{cache:false});
        },
        cognatedisagreeBaseContract: function(param){//驳回
            return $http.post('/cognatecontentchange/disagree',param ,{cache:false});
        },
        cognatecancelBaseContract: function(param){//取消
            return $http.post('/cognatecontentchange/cancel',param ,{cache:false});
        },
        cognaterecallBaseContract: function(param){//召回
            return $http.post('/cognatecontentchange/recall',param ,{cache:false});
        },
        //配套销售合同清单变更
        cognatestartchange: function(param){//审批完后 合同清单变更
            return $http.post('/cognatechange/startchange',param ,{cache:false});
        },
        cognatecancelchange: function(param){//审批完后 取消合同清单变更
            return $http.post('/cognatechange/cancelchange',param ,{cache:false});
        },
        cognateaddInsideBillChangeSave: function(param){
            return $http.post('/cognatechange/save',param ,{cache:false});
        },
        cognateapplyAddBillChange: function(param){
            return $http.post('/cognatechange/createprocess',param ,{cache:false});
        },
        cognateagreeBillChange: function(param){//同意
            return $http.post('/cognatechange/agree',param ,{cache:false});
        },
        cognatedisagreeBillChange: function(param){//驳回
            return $http.post('/cognatechange/disagree',param ,{cache:false});
        },
        cognatecancelBillChange: function(param){//取消
            return $http.post('/cognatechange/cancel',param ,{cache:false});
        },
        cognaterecallBillChange: function(param){//召回
            return $http.post('/cognatechange/recall',param ,{cache:false});
        },
        //进出口销售合同
        listInsideIecontract: function(param) {
            return $http.post('/iecontract/list',param ,{cache:false});
        },
        viewInsideIecontract: function(param) {
            return $http.post('/iecontract/view',param ,{cache:true});
        },
        addInsideIecontract: function(param){
            return $http.post('/iecontract/save',param ,{cache:false});
        },
        applyAddIecontract: function(param){
            return $http.post('/iecontract/createprocess',param ,{cache:false});
        },
        applyViewIecontract: function(param) {//审批接口
            return $http.post('/iecontract/detail',param ,{cache:false});
        },
        cbfxBeforIecontract: function(param) {//成本分析预取值(进出口)
            return $http.post('/iecontract/beforeiecost',param ,{cache:false});
        },
        saveiecost: function(param) {//成本分析保存
            return $http.post('/iecontract/savecost',param ,{cache:false});
        },
        readiecost: function(param) {//成本分析读取(进出口)
            return $http.post('/iecontract/initcost',param ,{cache:false});
        },
        agreeIecontract: function(param){//同意
            return $http.post('/iecontract/agree',param ,{cache:false});
        },
        disagreeIecontract: function(param){//驳回
            return $http.post('/iecontract/disagree',param ,{cache:false});
        },
        cancelIecontract: function(param){//取消
            return $http.post('/iecontract/cancel',param ,{cache:false});
        },
        recallIecontract: function(param){//召回
            return $http.post('/iecontract/recall',param ,{cache:false});
        },
        //审批完后 进出口基本信息是否能够变更
        startIechangeBase: function(param){
            return $http.post('/iecontractcontentchange/startchange',param ,{cache:false});
        },
        cancelIechangeBase: function(param){//审批完后 取消进出口合同基本信息变更
            return $http.post('/iecontractcontentchange/cancelchange',param ,{cache:false});
        },
        detailBaseIec: function(param){//审批完后 取消进出口合同清单变更detailBaseIec
            return $http.post('/iecontractcontentchange/detail',param ,{cache:false});
        },
        addInsideIecBaseChange: function(param){
            return $http.post('/iecontractcontentchange/save',param ,{cache:false});
        },
        applyAddIecBaseChange: function(param){
            return $http.post('/iecontractcontentchange/createprocess',param ,{cache:false});
        },
        agreeIecBaseChange: function(param){//同意
            return $http.post('/iecontractcontentchange/agree',param ,{cache:false});
        },
        disagreeIecBaseChange: function(param){//驳回
            return $http.post('/iecontractcontentchange/disagree',param ,{cache:false});
        },
        cancelIecBaseChange: function(param){//取消
            return $http.post('/iecontractcontentchange/cancel',param ,{cache:false});
        },
        recallIecBaseChange: function(param){//召回
            return $http.post('/iecontractcontentchange/recall',param ,{cache:false});
        },
        //审批完后 进出口合同清单变更
        startIechange: function(param){
            return $http.post('/iecontractchange/startchange',param ,{cache:false});
        },
        cancelIechange: function(param){//审批完后 取消进出口合同清单变更detailBaseIec
            return $http.post('/iecontractchange/cancelchange',param ,{cache:false});
        },
        detailIecBill: function(param){//审批完后 取消进出口合同清单变更
            return $http.post('/iecontractchange/detail',param ,{cache:false});
        },
        detailBillIec: function(param){//审批完后 取消进出口合同清单变更detailBaseIec
            return $http.post('/iecontractchange/detail',param ,{cache:false});
        },
        addInsideIecBillChangeSave: function(param){
            return $http.post('/iecontractchange/save',param ,{cache:false});
        },
        addInsideIecBillChange: function(param){//保存退换货协议基本信息
            return $http.post('/iecontractchange/addprotocal',param ,{cache:false});
        },
        addInsideIecBillChangeTtems: function(param){//保存退换货协清单明细
            return $http.post('/iecontractchange/addprotocalItem',param ,{cache:false});
        },
        saveiechangecost: function(param) {//成本分析保存
            return $http.post('/iecontractchange/savecost',param ,{cache:false});
        },
        readiechangecost: function(param) {//成本分析读取(进出口)
            return $http.post('/iecontractchange/initcost',param ,{cache:false});
        },
        applyAddIecBillChange: function(param){
            return $http.post('/iecontractchange/createprocess',param ,{cache:false});
        },
        agreeIecBillChange: function(param){//同意
            return $http.post('/iecontractchange/agree',param ,{cache:false});
        },
        disagreeIecBillChange: function(param){//驳回
            return $http.post('/iecontractchange/disagree',param ,{cache:false});
        },
        cancelIecBillChange: function(param){//取消
            return $http.post('/iecontractchange/cancel',param ,{cache:false});
        },
        recallIecBillChange: function(param){//召回
            return $http.post('/iecontractchange/recall',param ,{cache:false});
        },
        //获取省市
        getCountry: function () {
            return $http.get('/enum/getnewcity', {cache: true});
        },
        checkforcognate: function(param){//关联合同是否能用
            return $http.post('/cognatecontract/checkforcognate',param ,{cache:false});
        },
        getsalesorderrebate: function(param){//获取SAP返点余额
            return $http.post('/contractcontentchange/getsalesorderrebate',param ,{cache:false});
        },
        saleorglist: function(param){//获取销售部门
            return $http.post('/org/saleorglist',param ,{cache:false});
        },
        salesforcontractlist: function(param){//获取销售人员
            return $http.post('/user/salesforcontractlist',param ,{cache:false});
        },
        getsalesorderid: function(param){//需看到订单行项目的原单价、使用的返点金额、放货金额
            return $http.post('/contract/getsalesorderid',param ,{cache:false});
        },
        kpData: function (param) {//开票客户名称查询
            return $http.post('/mkinvoice/selectcusbank', param, {cache: false});
        },
        findorgwithlevel: function (param) {//查看销售人员二级部门
            return $http.post('/org/findorgwithlevel', param, {cache: false});
        },
        getExchangerate: function (param) {//获取实时汇率
            return $http.post('/contract/exchangerate', param, {cache: false});
        },
        enumlist: function(param) { // 枚举接口
            return $http.post('/purchase/enumlist',param ,{cache:true});
        },
        getprocesslog: function(param) {
            return $http.post('/contract/getprocesslog',param ,{cache:false});
        },
        //取得供应商订单号
        getsupplierorderidsforheader: function (param) {
            return $http.post('/contractrepair/getsupplierorderidsforheader', param, {cache: false});
        },
        //取得行项目列表
        getorderitems: function (param) {
            return $http.post('/contractrepair/getorderitems', param, {cache: false});
        },
        //行项目保存
        saveitems2: function (param) {
            return $http.post('/contractrepair/saveitems', param, {cache: false});
        },
        //保存
        save: function (param) {
            return $http.post('/contractrepair/save', param, {cache: false});
        },
        //上传
        uploaditems: function (param) {
            return $http.post('/contractrepair/uploaditems', param, {cache: false});
        },
        //文档下载
        findDocs: function (param) {
            return $http.post('/docmanage/finddocs', param ,{cache:false});
        },
        //查看采购订单
	    listbycontract: function (param) {
            return $http.post('/poheader/listbycontract', param ,{cache:false});
        }
    };
    return service;
});

contractApp.controller('contractOrderCtrl', ['$scope','$rootScope','$stateParams','contractServices',function($scope,$rootScope,$stateParams,payment){
    var saleorglist = payment.saleorglist({});
    saleorglist.success(function(data){
        if(data.code == 200){
            $scope.getSalesorgnanme = data.rst.data
        }else {
            swal(data.msg, "", "warning");
        }
    }).error(function(data){
        alert(data);
    });
    var purchaseid = $stateParams.purchaseid;
    var person = $rootScope.loginPerson;
    $scope.curUser = person.user.name;
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($stateParams.purchaseid && $scope.purchaseid == ''){
                $scope.purchaseid = purchaseid;
                purchaseid = '';
            }
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, contractno:$scope.contractno, stomer: $scope.stomer, contracttype: $scope.contracttype, receipttype: $scope.receipttype, project: $scope.project, salesname: $scope.salesname, salesorderid: $scope.salesorderid, salesorgid: $scope.salesorgid, purchaseid: $scope.purchaseid};
            var customerPromise = payment.listInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.kpShow=function(index,stomerid){
        var para= {KUNNR:stomerid};
        var nameCheck=payment.kpData(para);
        nameCheck.success(function(data){
            if(data.code==200) {
                if(data.rst.data.items.length==0){
                    swal("该客户的开票信息尚未维护！", "", "warning");
                    return false;
                }
                if(data.rst.data.items.length>0) {
                    if (data.rst.data.items[0].koinh == '') {
                        swal("该客户的开票信息尚未维护！", "", "warning");
                        return false;
                    }else{
                        if($scope.dataList[index].contractbase.receipttype=="税率0"){
                            $scope.receipttypeBox=$scope.dataList[index].contractbase.receipttype.substring(2,$scope.dataList[index].contractbase.receipttype.length);
                        }else{

                            $scope.receipttypeBox=$scope.dataList[index].contractbase.receipttype.substring(2,$scope.dataList[index].contractbase.receipttype.length-1);
                        }
                        window.open("index.html#/mkinvoiceAdd?contractno="+$scope.dataList[index].contractbase.contractno+"&stomer="+$scope.dataList[index].contractbase.stomer+"&receipttype="+$scope.receipttypeBox+"&stomerid="+$scope.dataList[index].contractbase.stomerid+"&conId="+$scope.dataList[index].contractbase.salesorderid[0].orderid);
                    }
                }
            }
        });

    }
}]);
contractApp.controller('bndbListCtrl', ['$scope','$stateParams','contractServices',function($scope,$stateParams,payment){
    if(!$stateParams.cusName){
        swal("请先选择客户名称", "", "warning");
    }else{
        $scope.cusName=$stateParams.cusName;
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
                    stomer: $stateParams.cusName,
                    isfree: "否",
                };
                var deptassurePromise = payment.deptassure(param);
                $scope.paginationConf.pagePromise = deptassurePromise;
            }
        };
    }

}]);
contractApp.controller('contractGetsalesorder', ['$scope','$stateParams','contractServices',function($scope,$stateParams,payment){
    var getsalesorderid = payment.getsalesorderid({contractId:$stateParams.id});
    getsalesorderid.success(function (data) {
        if(data.code == 200) {
            $scope.salesList = data.rst.ITEM_DATA;
        }else {
            alert(data.error);
        }
    });
}]);
contractApp.controller('contractDraftCtrl', ['$scope','contractServices',function($scope,payment){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, ZSQNO:$scope.ZSQNO, ZFKZT: $scope.ZFKZT, ZFKZL: $scope.ZFKZL, ZSKDW: $scope.ZSKDW, ZWHXJE: $scope.ZWHXJE};
            var customerPromise = payment.listContractDraft(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
contractApp.controller('contarctUserBoxCtrl', ['$scope','contractServices',function($scope,service){
    /*$scope.paginationConf = {
     currentPage: 1,
     itemsPerPage: 10,
     numberOfPage:0,
     pagesLength: 10,
     perPageOptions: [5,10, 20, 30, 40, 50],
     pagePromise:{},
     onChange: function(){
     var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.useSname};
     var customerPromise = service.listUser(param);
     $scope.paginationConf.pagePromise = customerPromise;
     }
     };*/
    // 2017-2-24 需求要增加分页
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(args){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.useSname};
            var serviceName='', userType = args[0];
            if (userType == 'salsUser') {
                serviceName = 'salesforcontractlist';
            } else {
                if(userType == 'bussinessUser') {
                    $.extend(true, param, {saleid:$scope.ORDER_DATA.salesid})
                }else if(userType == 'approval_business_inter'){
                    $.extend(true, param, {roles:'approval_business_inter'})
                }
                serviceName = 'listUser';
            }
            var customerPromise = service[serviceName](param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    }

    /*$scope.userSearch = function(userType) {
     /!*if($scope.useSname==''){
     swal("必须输入查询条件", "", "warning");
     return false;
     }*!/
     var param = '';
     if (userType == 'salsUser') {
     param = {page: 1, limit: 10, name: $scope.useSname};
     var salesforcontractlist = service.salesforcontractlist(param);
     salesforcontractlist.success(function(data){
     if(data.code == 200){
     $scope.userDateList = data.rst.data.items;
     }else {
     swal(data.msg, "", "warning");
     }
     }).error(function(data){
     alert(data);
     });
     } else {
     if(userType == 'bussinessUser') {
     // param  = {page:1, limit:10, name:$scope.useSname, roles:'op_business',orgname:$scope.ORDER_DATA.salesorgnanme};
     param  = {page:1, limit:10, name:$scope.useSname,saleid:$scope.ORDER_DATA.salesid};
     }else if(userType == 'approval_business_inter'){
     param  = {page:1, limit:10, name:$scope.useSname, roles:'approval_business_inter'};
     }

     var listUser = service.listUser(param);
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
     }

     $scope.userSearch($scope.userType);*/

}]);
contractApp.controller('cusCusBoxCtrl', ['$scope','contractServices',function($scope,service){
    /*$scope.paginationConf = {
     currentPage: 1,
     itemsPerPage: 5,
     numberOfPage:0,
     pagesLength: 10,
     perPageOptions: [5,10, 20, 30, 40, 50],
     pagePromise:{},
     onChange: function(){
     var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, KTOKD:'ZC01', NAME:$scope.NAME, KUNNR: $scope.KUNNR};
     var customerPromise = service.listCustomer(param);
     $scope.paginationConf.pagePromise = customerPromise;
     }
     };*/
    $scope.searchCus = function(){
        if($scope.NAME==''&&$scope.KUNNR==''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var param  = {page:1, limit:20, KTOKD:'ZC01', NAME:$scope.NAME, KUNNR: $scope.KUNNR};
        var customerPromise = service.listCustomer(param);
        customerPromise.success(function(data){
            if(data.code == 200){
                $scope.cusDateList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    }

}]);
contractApp.controller('contractBoxCtrl', ['$scope','contractServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, contractno:$scope.contractno};
            var customerPromise = service.listInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

}]);
contractApp.controller('htwlBoxCtrl', ['$scope','contractServices',function($scope,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($scope.code==''&& $scope.MAKTX=='' && $scope.ZZGKXH==''){
                swal("必须输入一个查询条件", "", "warning");
                return true;
            }
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, 'code':$scope.code,'MAKTX':$scope.MAKTX,'ZZGKXH':$scope.ZZGKXH, 'escompany': $scope.escompany, 'salesid': $scope.salesid, 'contracttype': $scope.contracttype};
            var customerPromise = service.listwlqd(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    /**
     $scope.wulSearch = function(){
        if($scope.code==''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var param  = {page:1, limit:10,'code':$scope.code, 'clientname': $scope.clientname};
        var listwlqd = service.listwlqd(param);
        listwlqd.success(function(data){
            if(data.code == 200){
                $scope.wulDateList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    }
     **/
}]);
contractApp.controller('contractOrderAddCtrl', ['$scope','$stateParams','$rootScope','contractServices',function($scope,$stateParams,$rootScope,service){
    var ht = $scope.ht = {};
    $scope.htTab = function(type){
        var type = type;
        if(type ==2 && $scope.contractId ==''){
            swal("请先保存合同基本信息", "", "warning");
            return false;
        }
        if($scope.contractId !=''){

        }
        $scope.ht.activeTab = type;

    };

    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];
    var excleData = $scope.excleData = [];
    var fdList = $scope.fdList = [];
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.salesname = person.user.name;
    $scope.ORDER_DATA.salesid = person.user._id;
    $scope.ORDER_DATA.salesorgnanme = person.user.orgname;
    $scope.ORDER_DATA.salesorgid = person.user.orgid;
    $scope.ifPtxsBot = true;
    $scope.fwfsType = function(type){
        if(type == '市场拓展服务'){
            $scope.ORDER_DATA.contracttemplate = '华为服务非标准合同';
            $scope.htTem('华为服务非标准合同');
            $scope.fwType = true;
            $scope.ORDER_DATA.product = '数通项目';
            $scope.ORDER_DATA.productId = 'F1';
        }else {
            $scope.fwType = false;
            $scope.ORDER_DATA.product = '';
            $scope.ORDER_DATA.productId = '';
        }
    }
    $scope.ifxf = true;
    //产品线enume
    var enumlist = service.enumlist();
    enumlist.success(function(data) {
        $scope.ZZCP =  data.rst.enum.ZZCP;
    }).error(function(error){
        alert(error);
    });

    //复制部分
    if($stateParams.copyId){
        var viewCont = service.viewInside({contractId:$stateParams.copyId});
        viewCont.success(function(data) {
            var contractbase = data.rst.data.model.contractbase;
            $scope.ORDER_DATA.escompany = contractbase.escompany;
            $scope.xszt($scope.ORDER_DATA.escompany);//销售主体
            $scope.ORDER_DATA.salesname = contractbase.salesname;
            $scope.ORDER_DATA.salesid = contractbase.salesid;
            $scope.ORDER_DATA.salesorgnanme = contractbase.salesorgnanme;
            $scope.ORDER_DATA.salesorgid = contractbase.salesorgid;
            $scope.ORDER_DATA.tradername = contractbase.tradername;
            $scope.ORDER_DATA.traderlogin = contractbase.traderlogin;
            $scope.ORDER_DATA.contracttype = contractbase.contracttype;
            $scope.htType($scope.ORDER_DATA.contracttype);//合同类型
            $scope.ORDER_DATA.receipttype = contractbase.receipttype;
            $scope.ORDER_DATA.project = contractbase.project;
            $scope.ORDER_DATA.contactname = contractbase.contactname;
            $scope.ORDER_DATA.contactphone = contractbase.contactphone;
            $scope.ORDER_DATA.contactemail = contractbase.contactemail;
            $scope.ORDER_DATA.contacttitle = contractbase.contacttitle;
            $scope.ORDER_DATA.contracttemplate = contractbase.contracttemplate;
            $scope.htTem($scope.ORDER_DATA.contracttemplate);//合同模板
            $scope.ORDER_DATA.isshowunitprice = contractbase.isshowunitprice;
            $scope.ORDER_DATA.sktj = contractbase.sktj;
            $scope.sktj($scope.ORDER_DATA.sktj);///收款条件
            $scope.kpsl($scope.ORDER_DATA.receipttype);//税率
            $scope.contactreceivablescondition = contractbase.contactreceivablescondition;
            $.each($scope.contactreceivablescondition,function(index,value){
                var type = value.thetype;
                switch ($scope.ORDER_DATA.contracttemplate)
                {
                    case '华为硬件标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前']
                        }else if(type=='货款'){
                            $scope.cond[index] = ['收到货物']
                        }
                        break;
                    case '华为硬件非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                        }else if(type=='货款'){//手动填写
                            $scope.cond[index] = ['收到货物','其他条件']
                        }
                        break;
                    case '华为服务标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case '华为服务非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case '自有服务标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case '自有服务非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case 'Oracle标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前']
                        }else if(type=='货款'){
                            $scope.cond[index] = ['收到货物']
                        }
                        break;
                    case '非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                        }else if(type=='其他付款'){//手动填写
                            $scope.cond[index] = ['其他条件']
                        }
                        break;
                }
            });
            $scope.ORDER_DATA.contactreceivablesconditionshowarea = contractbase.contactreceivablesconditionshowarea;
            $scope.ORDER_DATA.paymentdate = contractbase.paymentdate;
            $scope.ORDER_DATA.transferway = contractbase.transferway;
            $scope.ORDER_DATA.contactemail = contractbase.contactemail;
            $scope.ORDER_DATA.contactemail = contractbase.contactemail;
            $scope.getSW();
        });
    }
    $scope.contractBox = function(){
        $( "#contractBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractBox" ).dialog( "open" );
    };
    $scope.selectContr = function(contractId){
        var param  = {contractId:contractId};
        var checkforcognate = service.checkforcognate(param);
        checkforcognate.success(function(data){
            if(data.code == 200){
                $scope.matingContract = data.rst.contractNO;
                $scope.matingContractId = data.rst.contractId;
                $( "#contractBox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    };
    $scope.kpsl = function(type){
        if(type=='税率6%'){
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifgxsl = true;
        }else {
            if($scope.ORDER_DATA.contracttype=='项目'){
                $scope.ORDER_DATA.hasservicecontract = '';
                $scope.ifgxsl = false;
            }else {
                $scope.ORDER_DATA.hasservicecontract = '否';
                $scope.ifgxsl = true;
            }
        }
    };
    $scope.ifjckBot = true;
    $scope.xszt = function(type){
        if(type == '中建材集团进出口公司'){
            $scope.ifjck = true;
            $scope.ifjckBot = false;
            $scope.ifxf = false;//销售返点
            $scope.ORDER_DATA.is2body='是';
        }else {
            $scope.ifjck = false;
            $scope.ifjckBot = true;
            $scope.ORDER_DATA.interiooney = '';//内部结算金额设置空不可编辑
            $scope.ifxf = true;//销售返点
            $scope.ORDER_DATA.is2body='否';
        }
    };


    $scope.findorgwithlevel = function(orgid){
        var findorgwithlevel = service.findorgwithlevel({'orgid':orgid,'level':1});
        findorgwithlevel.success(function(data){
            if(data.code == 200){
                if(data.rst.data.orgname){
                    $scope.ORDER_DATA.salesorgnanme2 = data.rst.data.orgname;
                    $scope.ORDER_DATA.salesorgid2 = data.rst.data._id;
                }else {
                    $scope.ORDER_DATA.salesorgnanme2 = '';
                    $scope.ORDER_DATA.salesorgid2 = '';
                }
            }else{
                swal(data.msg, "", "warning");
                return false;
            }
        });
    }
    $scope.findorgwithlevel(person.user.orgid);

    $scope.userBox = function(userType){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true,
            open: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = true;
                    })
                })
            },
            close: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = false;
                    })
                })
            }

        });
        $( "#userBox" ).dialog( "open" );
        $scope.userType = userType;


    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        if(userType == 'salsUser'){
            $scope.ORDER_DATA.salesname = user;
            $scope.ORDER_DATA.salesid = userId;
            $scope.ORDER_DATA.salesorgnanme = orgName;
            $scope.ORDER_DATA.salesorgid = orgId;
            $scope.findorgwithlevel(orgId);
            $scope.getSW();
        }else if(userType == 'bussinessUser') {
            $scope.ORDER_DATA.tradername = user;
            $scope.ORDER_DATA.traderlogin = login;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    //
    // 获取商务人员列表
    $scope.traderSelect = [];
    $scope.getSW = function (login) {
        var param  = {page:1, limit:999, saleid:$scope.ORDER_DATA.salesid};
        var listUser = service.listUser(param);
        listUser.success(function(data){
            $scope.traderSelect = data.rst.data.items;
	        if(data.code == 200) {
	            if(login) {         // 如果存在login说明是编辑页面，初始化页面值
	                $scope.seltradername(login);
	            }else if($scope.traderSelect.length) {  //根据借货人匹配可选的商务人员
	                if($scope.traderSelect.length==1) {
	                    $scope.tradername = $scope.traderSelect[0];
	                    $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
	                    $scope.ORDER_DATA.tradername = $scope.tradername.name;
	                } else {
	                    $scope.tradername = '';
	                    $scope.ORDER_DATA.traderlogin = '';
	                    $scope.ORDER_DATA.tradername = '';
	                }
	            }
	        }
        }).error(function(data){
            alert(data);
        });
    };
    $scope.traderChange = function () {
        if($scope.tradername) {
            $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
            $scope.ORDER_DATA.tradername = $scope.tradername.name;
        }
    }

    // 根据名字定位商务人员
    $scope.seltradername = function (login) {
        for(var i=0,l=$scope.traderSelect.length; i<l; i++) {
            if($scope.traderSelect[i].login == login) {
                $scope.tradername = $scope.traderSelect[i];
            }
        }
    };
    //获取商务人员列表
    $scope.getSW();

    $scope.htMoney = function(money){
        if($scope.fdList.length>0){
            if(parseFloat(money) >= parseFloat($scope.ORDER_DATA.rebatemoney)){
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*100/$scope.ORDER_DATA.contractmoney*100)/100;
            }else{
                swal("合同金额不能小于返点金额，请先修改返点", "", "warning");
                $scope.ORDER_DATA.contractmoney = $scope.ORDER_DATA.rebatemoney;
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*100/$scope.ORDER_DATA.contractmoney*100)/100;
            }
        }
    }
    var watchExcel = $scope.$watchCollection ('excleData', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.excleConf = {
        formData:{contractId:$stateParams.id},
        buttonText:'物料上传',
        uploader:'/contract/importitems'
    };
    /*$scope.productOption = {
     options: {
     html: true,
     focusOpen: false,
     onlySelect: true,
     outHeight:0,
     delay: 500,
     mustMatch:true,
     source: function (request, response) {
     var cpxenum = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
     cpxenum.success(function(data){
     if(data.code == 200){
     var dataItems = data.rst.data.enum.CPX;
     if(!dataItems.length){
     dataItems.push({
     'name': '未找到'
     });
     }
     response($.map(dataItems, function(item) {
     if(item.name == '未找到'){
     return { label:item.name, value: '' };
     }else{
     return { label:item.name, value: item.name, code: item.code};
     }

     }));
     }else {
     swal(data.msg, "", "warning");
     }
     });
     },
     select: function( event, ui ) {
     $scope.ORDER_DATA.product = ui.item.value;
     $scope.ORDER_DATA.productId = ui.item.code;
     }
     }
     };*/
    // 搜索产品线
    $scope.productlineFn = function (name) {
        $scope.ORDER_DATA.productId  = "";
        var listCpx = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
        // var listCpx = payment.listCpx({cpxname:name});
        listCpx.success(function(data) {
            if (data.code == 200) {
                $scope.productlineList = data.rst.data.enum.CPX;
                if (!$scope.productlineList.length) {
                    $scope.productlineList.push({
                        'name': '未找到',
                        'value': ''
                    });
                }
            } else {
                //swal(data.msg, "", "warning");
                alert('error')
            }
        })
    };
    $scope.selProductlineFn = function (obj) {
        $scope.ORDER_DATA.product  = obj.name;
        $scope.ORDER_DATA.productId  = obj.code;
        $scope.productlineList = [];
    };

    $scope.htType = function(type){
        $scope.fwType = false;
        $scope.ORDER_DATA.product = '';
        $scope.ORDER_DATA.productId = '';
        //$scope.htTem('华为硬件标准合同');
        if(type == '分销'){
            $scope.ORDER_DATA.project = '分销';
            $scope.finalUserIf = true;
            $scope.ORDER_DATA.finalconsumer = $scope.ORDER_DATA.stomer;
            $scope.ifgxsl = true;
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifSerfas = false;
            $scope.ifSerfasBot = true;
            $scope.ORDER_DATA.servicemethod ='';
            $scope.ifPtxs = false;
            $scope.ifPtxsBot = true;
            //关联合同
            $scope.matingContract = '';
            $scope.matingContractId = '';
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = true;
            $scope.ORDER_DATA.cp = '0';
            $scope.ifBillCg = true;
            $scope.zyfwIf = true;
            if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                $scope.ifxf = false;//销售返点
            }else {
                $scope.ifxf = true;//销售返点
            }
        }else if(type == '项目'){
            $scope.ifgxsl = false;
            $scope.ORDER_DATA.hasservicecontract = '';
            $scope.ORDER_DATA.project = '';
            $scope.finalUserIf = false;
            $scope.ORDER_DATA.finalconsumer ='';
            $scope.ifSerfas = false;
            $scope.ifSerfasBot = true;
            $scope.ORDER_DATA.servicemethod ='';
            $scope.ifPtxs = false;
            $scope.ifPtxsBot = true;
            $scope.matingContract = '';
            $scope.matingContractId = '';
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = false;
            $scope.ifBillCg = false;
            $scope.zyfwIf = true;
            if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                $scope.ifxf = false;//销售返点
            }else {
                $scope.ifxf = true;//销售返点
            }
        }else if(type == '专有服务') {
            $scope.ORDER_DATA.project = '';
            $scope.finalUserIf = false;
            $scope.ORDER_DATA.finalconsumer ='';
            $scope.ifgxsl = true;
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifSerfas = true;
            $scope.ifSerfasBot = false;
            $scope.ifPtxs = false;
            $scope.ifPtxsBot = true;
            $scope.matingContract = '';
            $scope.matingContractId = '';
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = false;
            $scope.ORDER_DATA.cp = '0'

            $scope.zyfwIf = false;

            $scope.ifxf = false;//销售返点
            $scope.ifBillCg = true;
        }else if(type == '配套销售'){
            $scope.ORDER_DATA.project = '';
            $scope.finalUserIf = false;
            $scope.ORDER_DATA.finalconsumer ='';
            $scope.ifgxsl = true;
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifSerfas = false;
            $scope.ifSerfasBot = true;
            $scope.ORDER_DATA.servicemethod ='';
            $scope.ifPtxs = true;
            $scope.ifPtxsBot = false;
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = true;
            $scope.ORDER_DATA.cp = '0'
            $scope.ifBillCg = false;
            $scope.zyfwIf = true;
            $scope.ifxf = false;//销售返点
        }
    };
    $scope.cusBox = function(type){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            maxHeight:600,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        $scope.cusType = type;
    };
    $scope.cusSelect = function(id,name){
        if($scope.cusType == 'stomer'){
            if($scope.ORDER_DATA.stomerid != '' && $scope.ORDER_DATA.stomerid != undefined && $scope.ORDER_DATA.stomerid != id){
                swal({
                    title: "确定要修改客户名称吗?",
                    text: "修改后将会清空跟客户相关的数据!",//修改后将会清空选择的返点&& $scope.fdList.length>0
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定修改",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    $scope.$apply(function () {
                        $scope.ORDER_DATA.contactname ='';
                        $scope.ORDER_DATA.contactphone ='';
                        $scope.ORDER_DATA.contactemail ='';
                        $scope.ORDER_DATA.contacttitle ='';
                        $scope.fdList = [];
                        $scope.ORDER_DATA.rebatemoney = 0;
                        $scope.ORDER_DATA.rebatepercent = 0;
                        if($scope.ORDER_DATA.contracttype == '分销' || $scope.ORDER_DATA.servicemethod == '市场拓展服务'){
                            $scope.ORDER_DATA.finalconsumer = name;
                        }
                        $scope.ORDER_DATA.stomer = name;
                        $scope.ORDER_DATA.stomerid = id;
                        $scope.userLinkList = [];
                        $( "#cusBox" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    });
                    return false;
                });
            }else {
                if($scope.ORDER_DATA.contracttype == '分销'|| $scope.ORDER_DATA.servicemethod == '市场拓展服务'){
                    $scope.ORDER_DATA.finalconsumer = name;
                }
                $scope.ORDER_DATA.stomer = name;
                $scope.ORDER_DATA.stomerid = id;
                if(!$scope.ORDER_DATA.KPstomer){
                    $scope.ORDER_DATA.KPstomer = name;
                    $scope.ORDER_DATA.KPstomerid = id;
                }
                $( "#cusBox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }
        }else {
            $scope.ORDER_DATA.KPstomer = name;
            $scope.ORDER_DATA.KPstomerid = id;
            $( "#cusBox" ).dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.cusUserOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            delay: 500,
            source: function (request, response) {
                var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid,'NAME': $scope.ORDER_DATA.contactname};
                var listcontact = service.listcontact(cParam);
                listcontact.success(function(data){

                    if(data.code == 200){
                        /*response($.map(data.rst.data.items, function(item) {
                         return { label:item.NAME1, value: item.NAME1, tel:item.TELF1, title:item.TITLE_AP };
                         }));*/
                        var dataItems = data.rst.data;
                        if(!dataItems.length){
                            dataItems.push({
                                'NAME1': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.NAME1, value: item.NAME1, tel:item.TELF1 ,title:item.TITEL_AP};
                            }

                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.contactname = ui.item.value;
                $scope.ORDER_DATA.contactphone = ui.item.tel;
                $scope.ORDER_DATA.contacttitle = ui.item.title;
            }
        }
    };

    /*$scope.ifxsfd = function(value){//通过合同金额判断是否显示销售返点 如果是0不显示
     if(value=='0'){
     $scope.ifxf = false;
     }else{
     $scope.ifxf = true;
     }
     }*/
    $scope.fpkjDes = true;//判断是否显示发票开具说明
    $scope.htTem = function(type){//合同模板
        switch (type)
        {
            case '华为硬件标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = true;
                $scope.hkIf = true;
                $scope.hkIfBot = true;
                $scope.qtfkIf = false;
                $scope.qtfwIf = false;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = true;
                $scope.fpkjOption = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                $scope.jhtkIf = true;
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = false;
                $scope.xmgcfwfXs2 = true;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = true;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为硬件非标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = true;
                $scope.hkIf = false;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = false;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '';
                $scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = true;
                $scope.fpkjOption = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.ORDER_DATA.deliverconditionarea = '';
                $scope.jhtkIf = false;
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = true;
                $scope.xmgcfwfXs2 = false;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk= false;
                $scope.hkIf = true;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '参见服务清单';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款

                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务非标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '手工输入';
                $scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                if($scope.ORDER_DATA.servicemethod == '市场拓展服务'){
                    $scope.ifHttk = false;
                }else {
                    $scope.ifHttk = true;
                }
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '自有服务标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = true;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '待法务确定';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = false;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                break;
            case '自有服务非标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '手工输入';
                $scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = true;
                $scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '非标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.qtfkIf = true;
                $scope.hkIfBot = false;
                $scope.qtfwIf = false;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = true;
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = false;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
        }
    };

    $scope.fpkjsm = function(type){
        if(type=='供方就合同金额开具增值税专用发票'){
            $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
        }else if(type=='供方就合同金额开具服务发票'){
            $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
        }else {
            $scope.ORDER_DATA.receiptdescarea = '';
        }
    };
    var contactreceivablescondition = $scope.contactreceivablescondition =[];//合同收款条件
    $scope.sktj = function(type){
        //判断收款条件
        if(type=='按比例'){
            $scope.skblIf = true;
            $scope.skjeIf = false;
        }else{
            $scope.skblIf = false;
            $scope.skjeIf = true;
        }
        $scope.contactreceivablescondition = [];
    };
    $scope.httkAdd = function(type){
        if(type == 'sktkList'){//冲抵核销信息
            var obj= {type:'', scale:'', money:'', days:'', method:'', cond:''};
            $scope.contactreceivablescondition.push(obj);
        }
    };
    $scope.httkDel = function(idx,type){
        $scope.contactreceivablescondition.splice(idx,1);
    };
    $scope.cond = [];
    $scope.fkType = function(index,type){//选择收款类型和合同模板来判断收款条件显示的值
        switch ($scope.ORDER_DATA.contracttemplate)
        {
            case '华为硬件标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '华为硬件非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='货款'){//手动填写
                    $scope.cond[index] = ['收到货物','其他条件']
                }
                break;
            case '华为服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '华为服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case 'Oracle标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='其他付款'){//手动填写
                    $scope.cond[index] = ['其他条件']
                }
                break;
        }
    };
    $scope.putMeg = function(){
        var shtml = '';
        var sArr = [];
        if($scope.ORDER_DATA.sktj == undefined){
            swal("请先选择收款条件", "", "warning");
            return false;
        }
        if($scope.contactreceivablescondition.length<=0 ){
            swal("合同收款条款不能为空", "", "warning");
            return false;
        }else{
            var blTotal = 0;
            var monTotal = 0;
            angular.forEach($scope.contactreceivablescondition,function(datac){
                if(datac.scale){
                    /*blTotal += parseFloat(datac.scale);*/
                    blTotal = blTotal + Math.round(datac.scale*100)/100;
                }else if(datac.money){
                    //monTotal += parseFloat(datac.money);
                    monTotal = monTotal + Math.round(datac.money*100)/100;
                }
            });
            if($scope.contactreceivablescondition[0].scale){
                if(blTotal != 100){
                    swal("收款比例之和总和不是100%，请修改", "", "warning");
                    return false;
                }
            }
            if($scope.contactreceivablescondition[0].money){
                var contrNum = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.ORDER_DATA.rebatemoney*1)*100)/100;
                if(monTotal != contrNum){
                    swal("收款金额之和不等于合同总金额减去返点金额"+contrNum+"，请修改", "", "warning");
                    return false;
                }
            }
        }
        switch ($scope.ORDER_DATA.contracttemplate)
        {
            case '华为硬件标准合同':
                $.each($scope.contactreceivablescondition,function(key,value){
                    if($scope.ORDER_DATA.sktj == '按比例'){
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){//本合同生效之日起
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='供方发货前'){//供方发货前
                            shtml = '需方于供方发货前'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='货款' && value.cond=='收到货物'){
                            shtml = '需方于收到货物之日起'+value.days+'日内支付供方合同全款的'+value.scale+'%，支付方式为'+value.method+';';
                        }
                    }else if($scope.ORDER_DATA.sktj == '按金额') {
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){//本合同生效之日起
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='供方发货前'){
                            shtml = '需方于供方发货前'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='货款' && value.cond=='收到货物'){
                            shtml = '需方于收到货物之日起'+value.days+'日内支付供方'+value.money+'元，支付方式为'+value.method+';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '非标准合同':
                $.each($scope.contactreceivablescondition,function(key,value){
                    if($scope.ORDER_DATA.sktj == '按比例'){
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='供方发货前'){
                            shtml = '需方于供方发货前'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='其他付款' && value.cond=='其他条件'){
                            shtml = '其他条件;';
                        }
                    }else if($scope.ORDER_DATA.sktj == '按金额') {
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='供方发货前'){
                            shtml = '需方于供方发货前'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='其他付款' && value.cond=='其他条件'){
                            shtml = '其他条件;';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为硬件非标准合同':
                $.each($scope.contactreceivablescondition,function(key,value){
                    if($scope.ORDER_DATA.sktj == '按比例'){
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='供方发货前'){
                            shtml = '需方于供方发货前'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='货款' && value.cond=='收到货物'){
                            shtml = '需方于收到货物之日起'+value.days+'日内支付供方合同全款的'+value.scale+'%，支付方式为'+value.method+';';
                        }
                    }else if($scope.ORDER_DATA.sktj == '按金额') {
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='供方发货前'){
                            shtml = '需方于供方发货前'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='货款' && value.cond=='收到货物'){
                            shtml = '需方于收到货物之日起'+value.days+'日内支付供方'+value.money+'元，支付方式为'+value.method+';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务标准合同':
                $.each($scope.contactreceivablescondition,function(key,value){
                    if($scope.contactreceivablescondition.length == 1){
                        if(value.thetype=='预付款'){
                            shtml = '需方于'+value.cond+value.days+'个日历日内支付供方合同全款，支付方式为'+value.method+';';
                        }else if(value.thetype=='服务款'){
                            shtml = '需方于'+value.cond+value.days+'日内支付供方合同全款，支付方式为'+value.method+';';
                        }
                    }else{
                        if($scope.ORDER_DATA.sktj == '按比例'){
                            if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                                shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                            }else if(value.thetype=='预付款' && value.cond=='服务生效前'){
                                shtml = '需方于服务生效前'+value.days+'日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                            }
                            if(value.thetype=='服务款' && value.cond=='供方就本合同项下服务向原厂下单采购之日起'){//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%，支付方式为'+value.method+';';
                            }
                        }else if($scope.ORDER_DATA.sktj == '按金额') {
                            if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                                shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                            }else if(value.thetype=='预付款' && value.cond=='服务生效前'){
                                shtml = '需方于服务生效前'+value.days+'日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                            }
                            if(value.thetype=='服务款' && value.cond=='供方就本合同项下服务向原厂下单采购之日起'){
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起'+value.days+'个日历日内支付供方'+value.money+'元，支付方式为'+value.method+';';
                            }
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务非标准合同':
                $.each($scope.contactreceivablescondition,function(key,value){
                    if($scope.ORDER_DATA.sktj == '按比例'){
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='服务生效前'){
                            shtml = '需方于服务生效前'+value.days+'日内支付供方合同全款的'+value.scale+'%作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='服务款' && value.cond=='供方就本合同项下服务向原厂下单采购之日起'){//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起'+value.days+'个日历日内支付供方合同全款的'+value.scale+'%，支付方式为'+value.method+';';
                        }
                    }else if($scope.ORDER_DATA.sktj == '按金额') {
                        if(value.thetype=='预付款' && value.cond=='本合同生效之日起'){
                            shtml = '需方于本合同生效之日起'+value.days+'个日历日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }else if(value.thetype=='预付款' && value.cond=='服务生效前'){
                            shtml = '需方于服务生效前'+value.days+'日内支付供方'+value.money+'元作为预付款，支付方式为'+value.method+';';
                        }
                        if(value.thetype=='服务款' && value.cond=='供方就本合同项下服务向原厂下单采购之日起'){
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起'+value.days+'个日历日内支付供方'+value.money+'元，支付方式为'+value.method+';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
        }
        if($scope.ORDER_DATA.contracttemplate!='自有服务标准合同'&&$scope.ORDER_DATA.contracttemplate!='自有服务非标准合同'){
            $scope.ORDER_DATA.contactreceivablesconditionshowarea = sArr.join('   ');
        }

    };
    $scope.ORDER_DATA.deliverwaycheck = {};
    $scope.deliverwaycheck = true;
    $scope.jhFs = function(type){
        var typeDate = null;
        if(type!=undefined){
            typeDate = type;
        }

        if(typeDate.type2 == true){
            $scope.ifEmail = true;
        }else {
            $scope.ifEmail = false;
        }
        if($scope.ORDER_DATA.deliverwaycheck.type1 || $scope.ORDER_DATA.deliverwaycheck.type2 || $scope.ORDER_DATA.deliverwaycheck.type3){
            $scope.deliverwaycheck = false;
        }else{
            $scope.deliverwaycheck = true;
        }
    };
    $scope.xmgcfw = function(type){
        if(type == '原厂提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程由原厂提供，服务内容详见服务清单';
        }else if(type == '供方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由供方安装';
        }else if(type == '需方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由需方安装';
        }
    };
    /*$scope.userLinkList = [{name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''}];*/
    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type == 'userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type == 'excleData'){
            $scope.excleData.splice(idx,1);
        }

    };
    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = service.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.ORDER_DATA.cp = '0';

    $scope.fdBox = function(){//销售返点
        $scope.fdTotal = 0;
        if(!$scope.ORDER_DATA.receipttype){
            swal("请先选择开票税率", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.contractmoney){
            swal("请先填写合同总金额", "", "warning");
            return false;
        }
        if(parseInt($scope.ORDER_DATA.contractmoney) == 0){
            swal("合同总金额为0不能选择返点", "", "warning");
            return false;
        }
        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        var fParam = {'userid': $scope.ORDER_DATA.stomerid,'receipttype':$scope.ORDER_DATA.receipttype,'task':'contract'}//,'money': $scope.ORDER_DATA.contactname
        var listFd = service.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };;

    $scope.fdCheck = function(index){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());
        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        });
        $scope.fdTotal = Math.round(checkAccount*100)/100;
    };
    $scope.fdListDelet = function(index){
        $scope.ORDER_DATA.rebatemoney = Math.round(($scope.ORDER_DATA.rebatemoney*1 - $scope.fdList[index].amount*1)*100)/100;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
        $scope.fdList.splice(index,1);
    };
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else if(parseFloat($scope.fdTotal)> parseFloat($scope.ORDER_DATA.contractmoney)){
            swal("使用返点金额不能大于合同总金额", "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont=(allCheckCont*100+parseFloat(par2.find("td:eq(7)").html()*100))/100;
                });
                if(allCheckCont<kyToCount){
                    swal("选中的返点总金额"+allCheckCont+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money =par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(allCheckCont<kyToCount){
                    swal("您输入的返点金额"+kyToCount+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder =  Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }


            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();

            $scope.$apply(function () {
                $scope.fdList = checkArr;
                $scope.ORDER_DATA.rebatemoney = Math.round($scope.fdTotal*100)/100;
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.fdTotal*100/$scope.ORDER_DATA.contractmoney*100)/100;
                $scope.fdList = checkArr;
            });
        }
    };


    var contractId = $scope.contractId = '';
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }

        if(!data.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        var doc={},param= {},contractbase = {},relationcontractId = [];
        contractbase  = data;
        var userLink = $scope.userLinkList.concat($scope.excleData);
        if(userLink.length<=0 && contractbase.contracttype != '专有服务'){
            swal("请添加交货地点和联系人", "", "warning");
            return false;
        }
        if($scope.matingContractId && $scope.matingContractId != ''){//relationcontractId: [] #关联合同编号{relationId:,thetype:0/1} 0不一同审核,1 一同审核
            var reObj = {relationId:$scope.matingContractId,thetype:2,contractNo:$scope.matingContract};
            var relationcontractId = [];
            relationcontractId.push(reObj);
            contractbase.relationcontractId = relationcontractId;
        }
        $scope.escompany = contractbase.escompany;
        $scope.salesid = contractbase.salesid;
        $scope.contracttype = contractbase.contracttype;
        contractbase.receiver = userLink;//交货联系人
        contractbase.rebateitem  = $scope.fdList;//销售返点
        var contracttemplateType = true;
        if($scope.ORDER_DATA.contracttype =='专有服务' && $scope.ORDER_DATA.servicemethod == '市场拓展服务'){
            contracttemplateType = false;
        }else if($scope.ORDER_DATA.contracttemplate =='自有服务标准合同'){
            contracttemplateType = false;
        }
        if(contracttemplateType){
            if($scope.contactreceivablescondition.length<=0 ){
                swal("合同收款条款不能为空", "", "warning");
                return false;
            }else{
                var blTotal = 0;
                var monTotal = 0;
                angular.forEach($scope.contactreceivablescondition,function(datac){
                    if(datac.scale){
                        /*blTotal += parseFloat(datac.scale);*/
                        blTotal = blTotal + Math.round(datac.scale*100)/100;
                    }else if(datac.money){
                        /*monTotal += parseFloat(datac.money);*/
                        monTotal = monTotal + Math.round(datac.money*100)/100;
                    }
                });
                if($scope.contactreceivablescondition[0].scale){
                    if(blTotal != 100){
                        swal("收款比例之和总和不是100%，请修改", "", "warning");
                        return false;
                    }
                }
                if($scope.contactreceivablescondition[0].money){

                    if($scope.ORDER_DATA.rebatemoney){}
                    var contrNum = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.ORDER_DATA.rebatemoney*1)*100)/100;
                    if(monTotal != contrNum){
                        swal("收款金额之和不等于合同总金额减去返点金额"+contrNum+"，请修改", "", "warning");
                        return false;
                    }
                }
            }
        }
        if($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同'|| $scope.ORDER_DATA.contracttemplate == '华为服务标准合同'|| $scope.ORDER_DATA.contracttemplate == 'Oracle标准合同'){
            $scope.putMeg();
        }
        contractbase.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
        var attachment = [];//附件字段
        var fileObj = {};
        fileObj.filePath = $scope.uploadFile;
        fileObj.fileName = $scope.docName;
        attachment.push(fileObj);
        contractbase.attachment = attachment;
        doc.contractbase = contractbase;
        doc.processId = $scope.processId;
        doc.nodeId = $scope.nodeId;
        doc.relationId = $scope.relationId;
        doc.contractId = $scope.contractId;
        param.doc = doc;
        if(statue == "save"){
            var addInside;
            if($scope.ORDER_DATA.contracttype == '配套销售'){
                addInside = service.addInsideCognatecontract(param);
            }else {
                addInside = service.addInside(param);
            }
            addInside.success(function(data){
                if(data.code == 200){

                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                    $scope.candidates = data.rst.doc.candidates;
                    $scope.excleFormData ={contractId:$scope.contractId}
                    if(data.rst.doc.relationId){
                        $scope.ifRelationId = true;
                        $scope.relationId = data.rst.doc.relationId;
                        swal("保存成功,点击查看关联合同进行编辑", "", "success");
                    }else {
                        $scope.ifRelationId = false;
                        swal("保存成功", "", "success");
                    }
                    //$('html, body').scrollTop(0);
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var addInside;
            if($scope.ORDER_DATA.contracttype == '配套销售'){
                addInside = service.addInsideCognatecontract(param);
            }else {
                addInside = service.addInside(param);
            }
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.ht.activeTab = 2;
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                    $scope.candidates = data.rst.doc.candidates;
                    $scope.excleFormData ={contractId:$scope.contractId}
                    if(data.rst.doc.relationId){
                        $scope.ifRelationId = true;
                        $scope.relationId = data.rst.doc.relationId;
                        swal("保存成功,点击查看关联合同进行编辑", "", "success");
                    }else {
                        $scope.ifRelationId = false;
                        swal("保存成功", "", "success");
                    }
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };

    //产品清单----借出转销售
    $scope.jczxsObj = {};
    var wlList = $scope.wlList = [];//借出转销售的物料
    var htcgList = $scope.htcgList = [];//采购申请的物料
    var tjwlList = $scope.tjwlList = [];//手动添加物料
    var wlExcleData = $scope.wlExcleData = [];//导入的物料
    /*$scope.wlAdd = function(){
     var obj = {"goodscode":'',"goodsorigincode":'',"version":'',"goodsdesc":'',"count":'',"unitprice":''};
     $scope.tjwlList.push(obj);
     }*/
    $scope.tjwlDel = function(index){
        $scope.tjwlList.splice(index,1);
    };
    $scope.wlDel = function(index){
        $scope.wlList.splice(index,1);
    };
    $scope.htcgDel = function(index){
        $scope.htcgList.splice(index,1);
    };
    $scope.scwuDel = function(index,type){
        if(type=='right'){
            $scope.wlExcleData.right.splice(index,1);
        }else {
            $scope.wlExcleData.error.splice(index,1);
        }
    };
    $scope.jczxsBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $scope.jczxsObj.clientname = $scope.ORDER_DATA.stomer;
        $( "#jczxsBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#jczxsTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择物料", "", "warning");
                            return false;
                        }

                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parList = $(this).closest('.list');
                            var code = parList.find('.thw2:eq(0)').html();
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'jcdcode':code,
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(6)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(7)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(6)').find("input:eq(0)").val()*par.find('td:eq(7)').find("input:eq(0)").val()*100)/100,//小计
                                'from':20,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':'',//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(7)').find("input:eq(1)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':0,//税率
                                'purchasecount':0,//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': '', //采购申请ID
                                'supplierorderid': '',  //供应商订单号
                                'devicecost': '',  //设备费用
                                'servicecost': '', //服务费用
                                'amountcost': '',
                                'selfpickupcost': '',   //自提费用
                                'storeplace': '', //存储地点
                                'cashrebate': '',
                                'thesum': ''// #金额小计
                            };
                            lsArr.push(xObj);
                        });
                        $scope.$apply(function () {
                            $scope.wlList = $scope.wlList.concat(lsArr);
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#jczxsBox" ).dialog( "open" );
        /* var jcParam = {'limit':1000,'userid': $scope.ORDER_DATA.stomerid}//,'money': $scope.ORDER_DATA.contactname
         var listJc = service.listJc(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.jczxsList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.wlListBlur = function(wR,dR){
        if(parseInt(dR)>parseInt(wR)){
            swal("输入的数量不能大于未还数量", "", "warning");
            return false;
        }
    };
    $scope.clientname = $scope.ORDER_DATA.stomer;
    $scope.jczxsSearch = function(){
        var jcParam = {'limit':1000,'username': $scope.ORDER_DATA.salesname, 'code':$scope.code, 'clientname':$scope.ORDER_DATA.stomer};
        var listJc = service.listJc(jcParam);
        listJc.success(function(data){
            if(data.code == 200){
                $scope.jczxsList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    //产品清单----采购申请单
    $scope.cgsqdObj = {};
    var isservice = 0;
    if($scope.ORDER_DATA.contracttype =='专有服务'){
        isservice = 1;
    }else {
        isservice = 0;
    }
    $scope.cgsqdBox = function(){
        if(!$scope.ORDER_DATA.salesname){
            swal("请先输入销售人员", "", "warning");
            return false;
        }

        $scope.cgsqdObj.saName = $scope.ORDER_DATA.salesname;
        $( "#cgsqdBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#cgsqdTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择采购申请", "", "warning");
                            return false;
                        }
                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parGj = $(this).closest('.fTd');
                            var faTable = parGj.find("table:eq(0)");
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(5)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(6)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(5)').find("input:eq(0)").val()*par.find('td:eq(6)').find("input:eq(0)").val()*100)/100,//小计
                                'from':30,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':faTable.find('td:eq(0)').find("span:eq(0)").html(),//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(6)').find("input:eq(9)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':par.find('td:eq(6)').find("input:eq(1)").val(),//税率
                                'purchasecount':par.find('td:eq(5)').find("input:eq(1)").val(),//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': par.find('td:eq(6)').find("input:eq(10)").val(),//采购申请ID
                                'supplierorderid': faTable.find('td:eq(0)').find("input:eq(1)").val(),  //供应商订单号
                                'devicecost': par.find('td:eq(6)').find("input:eq(2)").val(),  //设备费用
                                'servicecost': par.find('td:eq(6)').find("input:eq(3)").val(), //服务费用
                                'amountcost': par.find('td:eq(6)').find("input:eq(4)").val(),
                                'selfpickupcost': par.find('td:eq(6)').find("input:eq(5)").val(),   //自提费用
                                'storeplace': par.find('td:eq(6)').find("input:eq(6)").val(), //存储地点
                                'cashrebate': par.find('td:eq(6)').find("input:eq(7)").val(),
                                'thesum': par.find('td:eq(6)').find("input:eq(8)").val(),// #金额小计
                                'tax': par.find('td:eq(6)').find("input:eq(11)").val(),// #金额小计
                                'purchasetype': par.find('td:eq(6)').find("input:eq(12)").val(),// #金额小计
                                'currencytype': par.find('td:eq(6)').find("input:eq(13)").val(),// #金额小计
                                'purchaseorderid': par.find('td:eq(6)').find("input:eq(14)").val(),// #金额小计
                                'purchaselineno': par.find('td:eq(6)').find("input:eq(15)").val()// #行编号
                            };
                            var purIdlineno = xObj.purchaseorderid+xObj.purchaselineno;
                            var ifwuEq = true;
                            $.each($scope.htcgList,function(key,value){
                                var purIdlineno_al = value.purchaseorderid+value.purchaselineno;
                                if(purIdlineno == purIdlineno_al){
                                    ifwuEq = false;
                                    //swal(xObj.goodscode+"物料选择重复将会合并此物料", "", "warning");
                                    swal("有重复物料系统将会自动合并", "", "warning");
                                    return false;
                                }
                            });
                            if(ifwuEq){
                                lsArr.push(xObj);
                            }

                        });
                        $scope.$apply(function () {
                            $scope.htcgList = $scope.htcgList.concat(lsArr);
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#cgsqdBox" ).dialog( "open" );
        /*var jcParam = {'userid': $scope.ORDER_DATA.salesid,'isservice': isservice}
         var listJc = service.listCgd(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.cgsqdList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.cgsqdSearch = function(){
        if($scope.code=='' && $scope.clientname=='' &&$scope.supplierId == ''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var jcParam = {'limit':1000,'escompany':$scope.ORDER_DATA.escompany,'userid': $scope.ORDER_DATA.salesid,'getgoods':1, 'code':$scope.code, 'clientname':$scope.clientname,'supplierId':$scope.supplierId};
        var listCgd = service.listCgd(jcParam);
        listCgd.success(function(data){
            if(data.code == 200){
                $scope.cgsqdList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.htwlBox = function(){
        $( "#htwlBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true
        });
        $( "#htwlBox" ).dialog( "open" );
    };
    $scope.htwlSelect = function(MATNR, BISMT, ZZGKXH, MAKTX, num, price ,ZZMAKTX){
        var obj = {
            'contractId':$scope.contractId,//合同保存ID
            'goodstype':'',//
            'goodscode':MATNR,//内部物料编码
            'sourcegoodscode':BISMT,//原厂物料编码
            'version':ZZGKXH,//型号
            'desc':MAKTX,//描述
            'sourcegoodsdesc':ZZMAKTX,//描述
            'count':num,//数量
            'unitprice':price,//单价
            'singTotal':Math.round(num*price*100)/100,//小计
            'from':0,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
            'thetype':0,//新增 0，加 10，退 20，换 30
            'purchaseorderid':'',//采购订单ID
            'purchasecontractid':'',//采购合同ID
            'purchaseprice':'',//采购单价，借出转销售使用移动平均价
            'cess':0,//税率
            'purchasecount':0,//采购数量
            'sapid': '',
            'salesitemid': '',
            'purchaseid': '', //采购申请ID
            'supplierorderid': '',  //供应商订单号
            'devicecost': '',  //设备费用
            'servicecost': '', //服务费用
            'amountcost': '',
            'selfpickupcost': '',   //自提费用
            'storeplace': '', //存储地点
            'cashrebate': '',
            'thesum': ''// #金额小计
        };
        $scope.tjwlList.push(obj);
        $( "#htwlBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    $scope.allCheck=function(event){
        var currentElement = event.target;
        var zCheck = $(currentElement).closest(".zTable").find(".zCheck");
        if($(currentElement).hasClass("allCheckAc")){
            $(currentElement).attr("class",'allCheck');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck');
            });
        }else {
            $(currentElement).attr("class",'allCheckAc');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck zCheckAc');
            });
        }
        event.stopPropagation();
    };
    $scope.zCheck = function(event){
        var currentElement = event.target;
        if($(currentElement).hasClass("zCheckAc")){
            $(currentElement).attr("class",'zCheck');
        }else {
            $(currentElement).attr("class",'zCheck zCheckAc');
        }
        event.stopPropagation();
    };
    $("body").delegate(".setCount","blur",function(){
        var obj = $(this);
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var unitprice = objParent.find(".unitprice:eq(0)").val();
        /*if(obj.hasClass('maxcont') && parseFloat(obj.val())> parseFloat(obj.attr('maxcount'))){
         swal('输入的数量不能大于'+obj.attr('maxcount'), "", "warning");
         obj.val(obj.attr('maxcount'));
         }*/
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(unitprice)*100)/100).trigger('change');
    });
    $("body").delegate(".setPrice","blur",function(){
        var obj = $(this);
        if(obj.val() == ''){
            obj.val('0')
        }
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var count = objParent.find(".count:eq(0)").val();
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(count)*100)/100).trigger('change');
    });
    $scope.comparBill = function(){
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if(isNaN(zTotal)){
            swal("销售合同金额不能为空", "", "warning");
            return false;
        }
        if(tList.length<=0){
            swal("请添加产品清单", "", "warning");
            return false;
        }
        if(zTotal == 0 || zTotal == 0.0 || zTotal == 0.00){
            swal({
                title: "您要分摊单价吗?",
                text: "合同总价为0，清单单价全部变成0!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定分摊",
                cancelButtonText:'关闭',
                closeOnConfirm: true
            }, function(){
                $.each(tList,function(key,value) {
                    var oThat = $(this);
                    //oThat.find(".count:eq(0)").val('0').trigger('change');
                    oThat.find(".unitprice:eq(0)").val('0').trigger('change');
                    oThat.find(".singTotal:eq(0)").val('0').trigger('change');
                });
            });
            return false;
        }
        var total = 0;
        var totalxy = 0;
        if(tList.length == 1){
            var oThat = $(tList);
            var count = parseFloat(oThat.find(".count:eq(0)").val());
            var unitpriceVal = parseFloat(oThat.find(".unitprice:eq(0)").val());
            var singTotalVal = parseFloat(count*unitpriceVal);
            if(count == 0){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(zTotal != singTotalVal){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+singTotalVal+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    var unitprice = oThat.find(".unitprice:eq(0)");
                    var singTotal = oThat.find(".singTotal:eq(0)");
                    singTotal.val(zTotal).trigger('change');
                    unitprice.val(Math.round((zTotal/count)*100)/100).trigger('change');
                });

            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }else {
            var tListLen = tList.length-1;
            var kTrue = true;
            $.each(tList,function(key,value){
                var oThat = $(this);
                var count = parseFloat(oThat.find(".count:eq(0)").val());
                var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                var singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
                if(count == 0){// || unitprice == 0
                    kTrue = false;
                    return false;
                }
                /*var jT = count*unitprice;
                 total += jT;*/
                /*if(tListLen > key){
                 var jT = count*unitprice;
                 total += jT;
                 }else {
                 total+=singTotal;//最后一行直接取小计相加
                 }*/
                var jT = Math.round(count*unitprice*100)/100;
                oThat.find(".singTotal:eq(0)").val(jT).trigger('change');
                total += jT;
            });
            if(kTrue == false){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(total == 0 && zTotal !=0){
                swal("合同总价不是"+zTotal+"，清单总价不能是0", "", "warning");
                return false;
            }

            total = parseInt(Math.round(total*100))/100;
            if(zTotal != total){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+total+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    $.each(tList,function(key,value){
                        var oThat = $(this);
                        var count = parseFloat(oThat.find(".count:eq(0)").val());
                        var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                        var curUnitprice = parseInt(unitprice*zTotal/total*100)/100;//(count*unitprice/total)*zTotal/count
                        //var curUnitprice = parseInt(Math.round((count*unitprice*zTotal)/(total*count)*100))/100;
                        var singTotal = oThat.find(".singTotal:eq(0)");
                        var tot = count*curUnitprice;
                        if(tListLen > key){
                            totalxy += tot;
                        }
                        if(tListLen == key){
                            singTotal.val(Math.round(zTotal*100-totalxy*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(parseInt(singTotal.val()/count*100)/100).trigger('change');
                        }else {
                            singTotal.val(Math.round(count*curUnitprice*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(curUnitprice).trigger('change');
                        }

                    });
                });
            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }
    };

    $scope.addDataAll = function(data,statue) {
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if ($scope.wlExcleData.error && $scope.wlExcleData.error.length > 0) {
            swal("请先删除错误的物料", "", "warning");
            return false;
        }
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);

        if (tList.length <= 0) {
            swal("请添加产品清单", "", "warning");
            return false;
        } else {
            var singTotal = 0;
            if (tList.length == 1) {
                var oThat = $(tList);
                singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
            } else {
                $.each(tList, function (key, value) {
                    var oThat = $(this);
                    var total = parseFloat(oThat.find(".singTotal:eq(0)").val());
                    singTotal += total;
                });
            }
            if (zTotal != Math.round(singTotal * 100) / 100) {
                swal("请先点击清单完成按钮,然后点击分摊单价", "", "warning");
                return false;
            }
        }
        var tLength = tList.length - 1;
        var tListPar = $("#wlList").find(".list").eq(tLength);
        var lastCont = tListPar.find('.count:eq(0)').val();
        var lastunitprice = tListPar.find('.unitprice:eq(0)').val();
        var lastsingTotal = tListPar.find('.singTotal:eq(0)').val();
        if (lastCont * lastunitprice != lastsingTotal) {
            swal({
                title: "物料中最后一行数量乘单价不等于分摊出来的小计,确定要保存吗",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: '关闭',
                closeOnConfirm: true
            }, function () {
                totalSub();
            });
        } else {
            totalSub();
        }
        function totalSub() {
            var basedoc = {}, param = {}, contractbase = {}, qdDoc = {}, qdParam = {};
            contractbase = data;
            var userLink = $scope.userLinkList.concat($scope.excleData);
            contractbase.receiver = userLink;//交货联系人

            if ($scope.matingContractId && $scope.matingContractId != '') {//relationcontractId: [] #关联合同编号{relationId:,thetype:0/1} 0不一同审核,1 一同审核
                var reObj = {relationId: $scope.matingContractId, thetype: 2, contractNo: $scope.matingContract};
                var relationcontractId = [];
                relationcontractId.push(reObj);
                contractbase.relationcontractId = relationcontractId;
            }
            contractbase.rebateitem = $scope.fdList;//销售返点

            var contracttemplateType = true;
            if ($scope.ORDER_DATA.contracttype == '专有服务' && $scope.ORDER_DATA.servicemethod == '市场拓展服务') {
                contracttemplateType = false;
            } else if ($scope.ORDER_DATA.contracttemplate == '自有服务标准合同') {
                contracttemplateType = false;
            }
            if (contracttemplateType) {
                if ($scope.contactreceivablescondition.length <= 0) {
                    swal("合同收款条款不能为空", "", "warning");
                    return false;
                } else {
                    /*if($scope.ORDER_DATA.contracttemplate !='自有服务标准合同') {
                     if ($scope.contactreceivablescondition.length <= 0) {
                     swal("合同收款条款不能为空", "", "warning");
                     return false;
                     } else {*/
                    var blTotal = 0;
                    var monTotal = 0;
                    angular.forEach($scope.contactreceivablescondition, function (datac) {
                        if (datac.scale) {
                            /*blTotal += parseFloat(datac.scale);*/
                            blTotal = blTotal + Math.round(datac.scale*100)/100;
                        } else if (datac.money) {
                            /*monTotal += parseFloat(datac.money);*/
                            monTotal = monTotal + Math.round(datac.money*100)/100;
                        }
                    });
                    if ($scope.contactreceivablescondition[0].scale) {
                        if (blTotal != 100) {
                            swal("收款比例之和总和不是100%，请修改", "", "warning");
                            return false;
                        }
                    }
                    if ($scope.contactreceivablescondition[0].money) {
                        if ($scope.ORDER_DATA.rebatemoney == undefined) {
                            $scope.ORDER_DATA.rebatemoney = 0;
                        }
                        var contrNum = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.ORDER_DATA.rebatemoney * 1) * 100) / 100;
                        if (monTotal != contrNum) {
                            swal("收款金额之和不等于合同总金额减去返点金额" + contrNum + "，请修改", "", "warning");
                            return false;
                        }
                    }
                }
            }
            if ($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同' || $scope.ORDER_DATA.contracttemplate == '华为服务标准合同' || $scope.ORDER_DATA.contracttemplate == 'Oracle标准合同') {
                $scope.putMeg();
            }
            contractbase.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
            var attachment = [];//附件字段
            var fileObj = {};
            fileObj.filePath = $scope.uploadFile;
            fileObj.fileName = $scope.docName;
            attachment.push(fileObj);
            contractbase.attachment = attachment;
            basedoc.contractbase = contractbase;
            basedoc.processId = $scope.processId;
            basedoc.nodeId = $scope.nodeId;
            basedoc.contractId = $scope.contractId;
            basedoc.relationId = $scope.relationId;
            param.doc = basedoc;
            qdDoc.lend = $scope.wlList;
            qdDoc.purchase = $scope.htcgList;
            qdDoc.upload = $scope.wlExcleData.right;
            qdDoc.handwork = $scope.tjwlList;
            qdDoc.processId = $scope.processId;
            qdDoc.nodeId = $scope.nodeId;
            qdDoc.contractId = $scope.contractId;
            qdDoc.relationId = $scope.relationId;
            qdParam.doc = qdDoc;
            if ($scope.wlList.length <= 0 && $scope.htcgList.length <= 0 && $scope.tjwlList.length <= 0 && $scope.wlExcleData.right.length <= 0) {
                swal("请添加物料信息", "", "warning");
                return false;
            }
            if (statue == "save") {
                var addCpqd;
                if ($scope.ORDER_DATA.contracttype == '配套销售') {
                    addCpqd = service.addCpqdCognatecontract(qdParam);
                } else {
                    addCpqd = service.saveitems(qdParam);
                }
                addCpqd.success(function (data) {
                    if (data.code == 200) {
                        if (data.rst.status == 1) {
                            $scope.wlList = data.rst.data.lend;//采购申请的物料
                            $scope.htcgList = data.rst.data.purchase;//采购申请的物料
                            $scope.wlExcleData.right = data.rst.data.upload;//导入的物料
                            $scope.tjwlList = data.rst.data.handwork;//手动添加物料
                            return false;
                        } else {
                            var addInside;
                            if ($scope.ORDER_DATA.contracttype == '配套销售') {
                                addInside = service.addInsideCognatecontract(param);
                            } else {
                                addInside = service.addInside(param);
                            }
                            addInside.success(function (data) {
                                if (data.code == 200) {

                                    swal("保存成功", "", "success");
                                } else {
                                    swal(data.msg, "", "warning");
                                }
                            });
                        }

                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            } else if (statue == 'apply') {
                // 提交
                $scope.applyFn = function (selIndex) {
                    if (selIndex !== -1) {
                        $("#approversDialog").dialog("destroy");
                        $(".ui-dialog").remove();
                        var selObj = $scope.receivers[selIndex];
                        param.candidates[0].receivers = [selObj];
                    }
                    var addCpqd;
                    if ($scope.ORDER_DATA.contracttype == '配套销售') {
                        addCpqd = service.addCpqdCognatecontract(qdParam);
                    } else {
                        addCpqd = service.saveitems(qdParam);
                    }
                    addCpqd.success(function (data) {
                        if (data.code == 200) {
                            if (data.rst.status == 1) {
                                $scope.wlList = data.rst.data.lend;//采购申请的物料
                                $scope.htcgList = data.rst.data.purchase;//采购申请的物料
                                $scope.wlExcleData.right = data.rst.data.upload;//导入的物料
                                $scope.tjwlList = data.rst.data.handwork;//手动添加物料
                                return false;
                            } else {
                                var applyAdd;
                                if ($scope.ORDER_DATA.contracttype == '配套销售') {
                                    applyAdd = service.applyAddCognatecontract(param);
                                } else {
                                    applyAdd = service.applyAdd(param);
                                }
                                applyAdd.success(function (data) {
                                    if (data.code == 200) {
                                        swal({
                                            title: "提交成功",
                                            text: "",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "返回合同列表",
                                            closeOnConfirm: true
                                        }, function () {
                                            window.location.href = '/index.html#/contractOrder';
                                        });
                                    } else {
                                        swal(data.msg, "", "warning");
                                    }
                                });
                            }
                        } else {
                            swal(data.msg, "", "warning");
                        }
                    });
                };
                // 2017-3-1 Bug6054 去掉对项目类型的限制
                // if(($scope.ORDER_DATA.contracttype == '项目' || $scope.ORDER_DATA.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                if ($scope.candidates.length && $scope.candidates[0].receivers.length > 1 && ($scope.candidates[0].coop !== 'or' || $scope.candidates[0].coop !== 'and')) {
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
    }
}]);
contractApp.controller('contractOrderEditCtrl', ['$scope','$filter','$rootScope','$stateParams', 'contractServices',function($scope,$filter, $rootScope, $stateParams, service){
    $('html, body').scrollTop(0);
    var ht = $scope.ht = {};
    $scope.htTab = function(type){
        var type = type;
        if(type ==2 && $scope.contractId ==''){
            swal("请先保存合同基本信息", "", "warning");
            return false;
        }
        $scope.ht.activeTab = type;

    };
    //产品线enume
    var enumlist = service.enumlist();
    enumlist.success(function(data) {
        $scope.ZZCP =  data.rst.enum.ZZCP;
    }).error(function(error){
        alert(error);
    });
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];
    var fdList = $scope.fdList = [];
    if($stateParams.sapid){//判断数据来源（sap or 草稿）
        $scope.draftStatue = true;
        $scope.saveBtn = true;
    }else{
        $scope.saveBtn = false;
    }
    $scope.ifNoguanlianBtn = true;
    if($stateParams.relationId){
        $scope.contractId = $stateParams.relationId;
        $scope.ifNoguanlianBtn = false;
        $scope.ifgxsl = true;
        $scope.ifglianSet = true;
        $scope.ifSerfasBot = true;
        $scope.ifSerfas = false;
        $scope.ifGulianKp = true;
    }
    $scope.commonEdit = true;
    //省市联动
    var watchExcel = $scope.$watchCollection ('excleData', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.excleConf = {
        formData:{contractId:$stateParams.id},
        buttonText:'物料上传',
        uploader:'/contract/importitems'
    };
    //基本信息
    var viewCont = service.applyView({sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId,contractId:$stateParams.relationId});
    viewCont.success(function(data) {
        var contractbase = null;
        if($stateParams.relationId){
            contractbase = data.rst.contractbase;
            $scope.contractId = data.rst._id;
        }else{
            contractbase = data.rst.doc.model.contractbase;
            $scope.contractId = data.rst.doc.model.contractId;
        }
        $scope.escompany = contractbase.escompany;
        $scope.salesid = contractbase.salesid;
        $scope.contracttype = contractbase.contracttype;
        $scope.candidates = data.rst.candidates;
        $scope.htType(contractbase.contracttype);
        $scope.excleFormData ={contractId:$scope.contractId}
        /*if(contractbase.relationcontractId.length>0){//如果配套销售 有关联合同的时候 此处要修改
         if(contractbase.hasservicecontract == '是'){
         $scope.relationId = contractbase.relationcontractId[0].relationId;
         $scope.ifRelationId = true;
         }else {
         $scope.matingContract = contractbase.relationcontractId[0].contractNo;
         $scope.matingContractId = contractbase.relationcontractId[0].relationId;
         }
         }*/
        if(contractbase.relationcontractId.length>0){
            angular.forEach(contractbase.relationcontractId, function(value,index,array){
                if(value.thetype == 1 && contractbase.hasservicecontract == '是'){
                    $scope.ifRelationId = true;
                    $scope.relationId = value.relationId;
                }
                if(value.thetype == 2){//如果配套销售 有关联合同的时候
                    $scope.matingContract = value.contractNo;
                    $scope.matingContractId = value.relationId;
                    $scope.cpDisable = true;
                    $scope.ifPtxs = true;
                }
            });

        }

        $scope.ORDER_DATA = contractbase;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatepercent*100)/100;

        $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
        if(contractbase.deliverwaycheck){
            if(contractbase.deliverwaycheck.type1){
                $scope.delive_type1 = true;
            }
            if(contractbase.deliverwaycheck.type2){
                $scope.delive_type2 = true;
                $scope.ifEmail = true;
            }
            if(contractbase.deliverwaycheck.type3){
                $scope.delive_type3 = true;
            }
        }
        if(contractbase.attachment[0]&&contractbase.attachment[0]!=null){
            $scope.uploadFile = contractbase.attachment[0].filePath;
            $scope.fileName = contractbase.attachment[0].fileName;
        }
        $scope.userLinkList = contractbase.receiver;
        $scope.fdList = contractbase.rebateitem;
        $scope.contactreceivablescondition = contractbase.contactreceivablescondition;
        $scope.processId = data.rst.processId;
        $scope.nodeId = data.rst.nodeId;
        $scope.contractId = data.rst.contractId;

        $.each($scope.ORDER_DATA.contactreceivablescondition,function(index,value){
            var type = value.thetype;
            switch ($scope.ORDER_DATA.contracttemplate)
            {
                case '华为硬件标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','供方发货前']
                    }else if(type=='货款'){
                        $scope.cond[index] = ['收到货物']
                    }
                    break;
                case '华为硬件非标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                    }else if(type=='货款'){//手动填写
                        $scope.cond[index] = ['收到货物','其他条件']
                    }
                    break;
                case '华为服务标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','服务生效前']
                    }else if(type=='服务款'){
                        $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                    }
                    break;
                case '华为服务非标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                    }else if(type=='服务款'){
                        $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                    }
                    break;
                case '自有服务标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','服务生效前']
                    }else if(type=='服务款'){
                        $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                    }
                    break;
                case '自有服务非标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                    }else if(type=='服务款'){
                        $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                    }
                    break;
                case 'Oracle标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','供方发货前']
                    }else if(type=='货款'){
                        $scope.cond[index] = ['收到货物']
                    }
                    break;
                case '非标准合同':
                    if(type=='预付款'){
                        $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                    }else if(type=='其他付款'){//手动填写
                        $scope.cond[index] = ['其他条件']
                    }
                    break;
            }
        });



        switch ($scope.ORDER_DATA.contracttemplate)
        {
            case '华为硬件标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = true;
                $scope.hkIf = true;
                $scope.qtfkIf = false;
                $scope.qtfwIf = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = true;
                $scope.fpkjOption = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                //$scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                $scope.jhtkIf = true;
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                //$scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = false;
                $scope.xmgcfwfXs2 = true;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = true;
                $scope.ifEmail = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为硬件非标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = true;
                $scope.hkIf = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //$scope.ORDER_DATA.receiptdesc = '';
                //$scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = true;
                $scope.fpkjOption = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                //$scope.ORDER_DATA.deliverconditionarea = '';
                $scope.jhtkIf = false;
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                //$scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = true;
                $scope.xmgcfwfXs2 = false;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = false;
                $scope.ifEmail = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk= false;
                $scope.hkIf = true;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                //发票开具说明
                $scope.fpkjDes = true;
                //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                //$scope.ORDER_DATA.guarantyterm = '参见服务清单';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务非标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                //发票开具说明
                $scope.fpkjDes = true;
                //$scope.ORDER_DATA.receiptdesc = '手工输入';
                //$scope.ORDER_DATA.receiptdescarea = '手工输入';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                //$scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '自有服务标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = true;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                //发票开具说明
                $scope.fpkjDes = true;
                //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                //$scope.ORDER_DATA.guarantyterm = '待法务确定';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = false;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                break;
            case '自有服务非标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                //发票开具说明
                $scope.fpkjDes = true;
                //$scope.ORDER_DATA.receiptdesc = '手工输入';
                //$scope.ORDER_DATA.receiptdescarea = '手工输入';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = true;
                //$scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                $scope.jhfs2 = false;
                // $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                //$scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '非标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.qtfkIf = true;
                $scope.qtfwIf = false;
                //发票开具说明
                $scope.fpkjDes = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = true;
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = false;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
        }

        $scope.xszt($scope.ORDER_DATA.escompany);
        if($scope.ORDER_DATA.contracttype == '分销'){
            $scope.ifFxiao = false;
            $scope.ifBillCg = true;
            $scope.ifSerfasBot = true;
            $scope.cpDisable = true;
            $scope.zyfwIf = true;
        }else if($scope.ORDER_DATA.contracttype == '专有服务' && $scope.ORDER_DATA.servicemethod == '市场拓展服务'){
            $scope.ifHttk = false;
            $scope.zsfwType = true;
        }else if($scope.ORDER_DATA.contracttype == '专有服务'){
            $scope.zyfwIf = false;
            $scope.ifBillCg = true;

            $scope.cpDisable = false;
        }else {
            $scope.ifFxiao = true;
            $scope.zyfwIf = true;
            $scope.ifBillCg = false;
            $scope.ifSerfasBot = true;
        }
        if($scope.ORDER_DATA.hasservicecontract){
            $scope.ifXiangMu=true;
        }
        if($scope.ORDER_DATA.isbody == 0){//附属合同不能修改cp
            $scope.cpDisable = true;
        }
        /*if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具增值税专用发票'){
         $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
         }else if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具服务发票'){
         $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
         }else {
         $scope.ORDER_DATA.receiptdescarea = '';
         }*/
        if($scope.ORDER_DATA.sktj=='按比例'){
            $scope.skblIf = true;
            $scope.skjeIf = false;
        }else{
            $scope.skblIf = false;
            $scope.skjeIf = true;
        }
        // 初始化商务人员
        $scope.getSW($scope.ORDER_DATA.traderlogin);
    });
    //产品清单
    var listCpqd = service.listCpqd({sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId,contractId:$stateParams.relationId});
    listCpqd.success(function(data){
        if(data.code == 200){
            $scope.wlList = data.rst.items.lend;//采购申请的物料
            $scope.htcgList = data.rst.items.purchase;//采购申请的物料
            $scope.wlExcleData.right = data.rst.items.upload;//导入的物料
            $scope.tjwlList = data.rst.items.handwork;//手动添加物料
        }
    });
    $scope.xszt = function(type){
        if(type == '中建材集团进出口公司'){
            $scope.ifjck = true;
            $scope.ifjckBot = false;
            $scope.ifxf = false;//销售返点
            $scope.ORDER_DATA.is2body='是';
        }else {
            $scope.ifjck = false;
            $scope.ifjckBot = true;
            $scope.ORDER_DATA.interiooney = '';//内部结算金额设置空不可编辑
            $scope.ifxf = true;//销售返点
            $scope.ORDER_DATA.is2body='否';
        }
    };
    var person = $rootScope.loginPerson;
    /*$scope.ORDER_DATA.salesname = person.user.name;
     $scope.ORDER_DATA.salesid = person.user._id;
     $scope.ORDER_DATA.salesorgnanme = person.user.orgname;
     $scope.ORDER_DATA.salesorgid = person.user.orgid;*/
    $scope.findorgwithlevel = function(orgid){
        var findorgwithlevel = service.findorgwithlevel({'orgid':orgid,'level':1});
        findorgwithlevel.success(function(data){
            if(data.code == 200){
                if(data.rst.data.orgname){
                    $scope.ORDER_DATA.salesorgnanme2 = data.rst.data.orgname;
                    $scope.ORDER_DATA.salesorgid2 = data.rst.data._id;
                }else {
                    $scope.ORDER_DATA.salesorgnanme2 = '';
                    $scope.ORDER_DATA.salesorgid2 = '';
                }
            }else{
                swal(data.msg, "", "warning");
                return false;
            }
        });
    }

    $scope.userBox = function(userType){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true,
            open: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = true;
                    })
                })
            },
            close: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = false;
                    })
                })
            }

        });
        $( "#userBox" ).dialog( "open" );
        $scope.userType = userType;
    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        if(userType == 'salsUser'){
            $scope.ORDER_DATA.salesname = user;
            $scope.ORDER_DATA.salesid = userId;
            $scope.ORDER_DATA.salesorgnanme = orgName;
            $scope.ORDER_DATA.salesorgid = orgId;
            $scope.findorgwithlevel(orgId);
            $scope.getSW();
        }else if(userType == 'bussinessUser') {
            $scope.ORDER_DATA.tradername = user;
            $scope.ORDER_DATA.traderlogin = login;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    // 获取商务人员列表
    $scope.traderSelect = [];
    $scope.getSW = function (login) {
        var param  = {page:1, limit:999,saleid:$scope.ORDER_DATA.salesid};
        var listUser = service.listUser(param);
        listUser.success(function(data){
            if(data.code == 200) {
                $scope.traderSelect = data.rst.data.items;
                if (login) {         // 如果存在login说明是编辑页面，初始化页面值
                    $scope.seltradername(login);
                } else if ($scope.traderSelect.length) {  //根据借货人匹配可选的商务人员
                    if($scope.traderSelect.length==1) {
                        $scope.tradername = $scope.traderSelect[0];
                        $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
                        $scope.ORDER_DATA.tradername = $scope.tradername.name;
                    } else {
                        $scope.tradername = '';
                        $scope.ORDER_DATA.traderlogin = '';
                        $scope.ORDER_DATA.tradername = '';
                    }
                }
            } else {
                swal('error', '', 'warning');
            }
        }).error(function(data){
            alert(data);
        });
    };
    $scope.traderChange = function () {
        if($scope.tradername) {
            $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
            $scope.ORDER_DATA.tradername = $scope.tradername.name;
        }
    }
    // 根据名字定位商务人员
    $scope.seltradername = function (login) {
        for(var i=0,l=$scope.traderSelect.length; i<l; i++) {
            if($scope.traderSelect[i].login == login) {
                $scope.tradername = $scope.traderSelect[i];
            }
        }
    };
    $scope.kpsl = function(type){
        if(type=='税率6%'){
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifgxsl = true;
        }else {
            if($scope.ORDER_DATA.contracttype=='项目'){
                $scope.ORDER_DATA.hasservicecontract = '';
                $scope.ifgxsl = false;
            }else {
                $scope.ORDER_DATA.hasservicecontract = '否';
                $scope.ifgxsl = true;
            }
        }
    };
    $scope.productOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            delay: 500,
            mustMatch:true,
            source: function (request, response) {
                var cpxenum = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
                cpxenum.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.enum.CPX;
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.name == '未找到'){
                                return { label:item.name, value: '' };
                            }else{
                                return { label:item.name, value: item.name, code: item.code};
                            }

                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.product = ui.item.value;
                $scope.ORDER_DATA.productId = ui.item.code;
            }
        }
    };
    $scope.htMoney = function(money){
        if($scope.fdList.length>0){
            if(parseFloat(money) >= parseFloat($scope.ORDER_DATA.rebatemoney)){
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*100/$scope.ORDER_DATA.contractmoney*100)/100;
            }else{
                swal("合同金额不能小于返点金额，请先修改返点", "", "warning");
                $scope.ORDER_DATA.contractmoney = $scope.ORDER_DATA.rebatemoney;
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*100/$scope.ORDER_DATA.contractmoney*100)/100;
            }
        }
    }

    // 搜索产品线
    $scope.productlineFn = function (name) {
        $scope.ORDER_DATA.productId  = "";
        var listCpx = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
        // var listCpx = payment.listCpx({cpxname:name});
        listCpx.success(function(data) {
            if (data.code == 200) {
                $scope.productlineList = data.rst.data.enum.CPX;
                if (!$scope.productlineList.length) {
                    $scope.productlineList.push({
                        'name': '未找到',
                        'value': ''
                    });
                }
            } else {
                //swal(data.msg, "", "warning");
                alert('error')
            }
        })
    };
    $scope.selProductlineFn = function (obj) {
        $scope.ORDER_DATA.product  = obj.name;
        $scope.ORDER_DATA.productId  = obj.code;
        $scope.productlineList = [];
    };

    $scope.htType = function(type){
        if(type == '分销'){
            $scope.ORDER_DATA.project = '分销';
            $scope.finalUserIf = true;
            $scope.ORDER_DATA.finalconsumer = $scope.ORDER_DATA.stomer;
            $scope.ifgxsl = true;
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifSerfas = false;
            $scope.ifSerfasBot = true;
            $scope.ORDER_DATA.servicemethod ='';
            $scope.ifPtxs = false;
            $scope.ifPtxsBot = true;
            //关联合同
            $scope.matingContract = '';
            $scope.matingContractId = '';
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = true;
            $scope.ORDER_DATA.cp = '0';
            $scope.ifBillCg = true;
            $scope.zyfwIf = true;
            if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                $scope.ifxf = false;//销售返点
            }else {
                $scope.ifxf = true;//销售返点
            }
        }else if(type == '项目'){
            $scope.ifgxsl = false;
            $scope.ORDER_DATA.hasservicecontract = '';
            $scope.ORDER_DATA.project = '';
            $scope.finalUserIf = false;
            $scope.ORDER_DATA.finalconsumer ='';
            $scope.ifSerfas = false;
            $scope.ifSerfasBot = true;
            $scope.ORDER_DATA.servicemethod ='';
            $scope.ifPtxs = false;
            $scope.ifPtxsBot = true;
            $scope.matingContract = '';
            $scope.matingContractId = '';
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = false;
            $scope.ifBillCg = false;
            $scope.zyfwIf = true;
            if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                $scope.ifxf = false;//销售返点
            }else {
                $scope.ifxf = true;//销售返点
            }
        }else if(type == '专有服务') {
            $scope.ORDER_DATA.project = '';
            $scope.finalUserIf = false;
            $scope.ORDER_DATA.finalconsumer ='';
            $scope.ifgxsl = true;
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifSerfas = true;
            $scope.ifSerfasBot = false;
            $scope.ifPtxs = false;
            $scope.ifPtxsBot = true;
            $scope.matingContract = '';
            $scope.matingContractId = '';
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = false;
            $scope.ORDER_DATA.cp = '0'
            $scope.ifBillCg = false;
            $scope.zyfwIf = false;

            $scope.ifxf = false;//销售返点

        }else if(type == '配套销售'){
            $scope.ORDER_DATA.project = '';
            $scope.finalUserIf = false;
            $scope.ORDER_DATA.finalconsumer ='';
            $scope.ifgxsl = true;
            $scope.ORDER_DATA.hasservicecontract = '否';
            $scope.ifSerfas = false;
            $scope.ifSerfasBot = true;
            $scope.ORDER_DATA.servicemethod ='';
            $scope.ifPtxs = true;
            $scope.ifPtxsBot = false;
            $scope.ORDER_DATA.product = '';
            $scope.cpDisable = true;
            $scope.ORDER_DATA.cp = '0'
            $scope.ifBillCg = false;
            $scope.zyfwIf = true;
            $scope.ifxf = false;//销售返点
        }
    };
    $scope.cusBox = function(type){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            maxHeight:600,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        $scope.cusType = type;
    };
    $scope.cusSelect = function(id,name) {
        if ($scope.cusType == 'stomer') {
            if ($scope.ORDER_DATA.stomerid != '' && $scope.ORDER_DATA.stomerid != undefined && $scope.ORDER_DATA.stomerid != id) {
                swal({
                    title: "确定要修改客户名称吗?",
                    text: "修改后将会清空跟客户相关的数据!",//修改后将会清空选择的返点&& $scope.fdList.length>0
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定修改",
                    cancelButtonText: '关闭',
                    closeOnConfirm: true
                }, function () {
                    $scope.$apply(function () {
                        $scope.ORDER_DATA.contactname = '';
                        $scope.ORDER_DATA.contactphone = '';
                        $scope.ORDER_DATA.contactemail = '';
                        $scope.ORDER_DATA.contacttitle = '';
                        $scope.fdList = [];
                        $scope.ORDER_DATA.rebatemoney = 0;
                        $scope.ORDER_DATA.rebatepercent = 0;
                        if ($scope.ORDER_DATA.contracttype == '分销') {
                            $scope.ORDER_DATA.finalconsumer = name;
                        }
                        $scope.ORDER_DATA.stomer = name;
                        $scope.ORDER_DATA.stomerid = id;
                        $scope.userLinkList = [];
                        $("#cusBox").dialog("destroy");
                        $(".ui-dialog").remove();
                    });
                    return false;
                });
            } else {
                if ($scope.ORDER_DATA.contracttype == '分销') {
                    $scope.ORDER_DATA.finalconsumer = name;
                }
                $scope.ORDER_DATA.stomer = name;
                $scope.ORDER_DATA.stomerid = id;
                $("#cusBox").dialog("destroy");
                $(".ui-dialog").remove();
            }
        }else{
            $scope.ORDER_DATA.KPstomer = name;
            $scope.ORDER_DATA.KPstomerid = id;
            $( "#cusBox" ).dialog("destroy");
            $(".ui-dialog").remove();
        }
    };
    $scope.cusUserOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            source: function (request, response) {
                var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid,'NAME': $scope.ORDER_DATA.contactname};
                var listcontact = service.listcontact(cParam);
                listcontact.success(function(data){

                    if(data.code == 200){
                        /*response($.map(data.rst.data.items, function(item) {
                         return { label:item.NAME1, value: item.NAME1, tel:item.TELF1, title:item.TITLE_AP };
                         }));*/
                        var dataItems = data.rst.data;
                        if(!dataItems.length){
                            dataItems.push({
                                'NAME1': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.NAME1, value: item.NAME1, tel:item.TELF1 ,title:item.TITEL_AP};
                            }

                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.contactname = ui.item.value;
                $scope.ORDER_DATA.contactphone = ui.item.tel;
                $scope.ORDER_DATA.contacttitle = ui.item.title;
            }
        }
    };
    $scope.ifxf = true;
    /*$scope.ifxsfd = function(value){//通过合同金额判断是否显示销售返点 如果是0不显示
     if(value=='0'){
     $scope.ifxf = false;
     }else{
     $scope.ifxf = true;
     }
     }*/
    $scope.fpkjDes = true;//判断是否显示发票开具说明
    $scope.htTem = function(type){//合同模板
        switch (type)
        {
            case '华为硬件标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = true;
                $scope.hkIf = true;
                $scope.hkIfBot = true;
                $scope.qtfkIf = false;
                $scope.qtfwIf = false;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = true;
                $scope.fpkjOption = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                $scope.jhtkIf = true;
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = false;
                $scope.xmgcfwfXs2 = true;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = true;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为硬件非标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = true;
                $scope.hkIf = false;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = false;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '';
                $scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = true;
                $scope.fpkjOption = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.ORDER_DATA.deliverconditionarea = '';
                $scope.jhtkIf = false;
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = true;
                $scope.xmgcfwfXs2 = false;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk= false;
                $scope.hkIf = true;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '参见服务清单';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款

                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务非标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '手工输入';
                $scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                if($scope.ORDER_DATA.servicemethod == '市场拓展服务'){
                    $scope.ifHttk = false;
                }else {
                    $scope.ifHttk = true;
                }
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '自有服务标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = true;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                $scope.kjIf = true;
                $scope.kjqyIf = true;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = true;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '待法务确定';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = false;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                break;
            case '自有服务非标准合同':
                $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.hkIfBot = false;
                $scope.qtfkIf = false;
                $scope.qtfwIf = true;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = true;
                $scope.ORDER_DATA.receiptdesc = '手工输入';
                $scope.ORDER_DATA.receiptdescarea = '';
                $scope.kjIf = false;
                $scope.kjqyIf = false;
                $scope.fpkjOptionZy = false;
                $scope.fpkjOption = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = true;
                $scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                $scope.jhfs2 = false;
                $scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkIf = false;
                $scope.cpbxtkXs = true;
                $scope.ORDER_DATA.guarantyterm = '';
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '非标准合同':
                $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                //合同收款条款
                $scope.hkttk = false;
                $scope.hkIf = false;
                $scope.qtfkIf = true;
                $scope.hkIfBot = false;
                $scope.qtfwIf = false;
                $scope.contactreceivablescondition = [];
                //发票开具说明
                $scope.fpkjDes = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = true;
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = false;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否有附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
        }
    };
    $scope.fpkjsm = function(type){
        if(type=='供方就合同金额开具增值税专用发票'){
            $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
        }else if(type=='供方就合同金额开具服务发票'){
            $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
        }else {
            $scope.ORDER_DATA.receiptdescarea = '';
        }
    };
    var contactreceivablescondition = $scope.contactreceivablescondition =[];//合同收款条件
    $scope.sktj = function(type){
        //判断收款条件
        if(type=='按比例'){
            $scope.skblIf = true;
            $scope.skjeIf = false;
        }else{
            $scope.skblIf = false;
            $scope.skjeIf = true;
        }
        $scope.contactreceivablescondition = [];
    };
    $scope.httkAdd = function(type){
        if(type == 'sktkList'){//冲抵核销信息
            var obj= {type:'', scale:'', money:'', days:'', method:'', cond:''};
            $scope.contactreceivablescondition.push(obj);
        }
    };
    $scope.httkDel = function(idx,type){
        $scope.contactreceivablescondition.splice(idx,1);
    };
    $scope.cond = [];
    $scope.fkType = function(index,type){//选择收款类型和合同模板来判断收款条件显示的值
        switch ($scope.ORDER_DATA.contracttemplate)
        {
            case '华为硬件标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '华为硬件非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='货款'){//手动填写
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '华为服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '华为服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case 'Oracle标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='其他付款'){//手动填写
                    $scope.cond[index] = ['其他条件']
                }
                break;
        }
        /*if(type == '预付款' && $scope.ORDER_DATA.contracttemplate == '硬件标准合同'){
         //交货条款区域
         $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
         $scope.jhtkIf = true;
         }else if(type == '货款' && $scope.ORDER_DATA.contracttemplate == '硬件标准合同'){
         $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效后25个日历日内交货';
         $scope.jhtkIf = true;
         }*/
    };
    $scope.putMeg = function () {
        var shtml = '';
        var sArr = [];
        if ($scope.ORDER_DATA.sktj == undefined) {
            swal("请先选择收款条件", "", "warning");
            return false;
        }
        if ($scope.contactreceivablescondition.length <= 0) {
            swal("合同收款条款不能为空", "", "warning");
            return false;
        } else {
            var blTotal = 0;
            var monTotal = 0;
            angular.forEach($scope.contactreceivablescondition, function (datac) {
                if (datac.scale) {
                    /*blTotal += parseFloat(datac.scale);*/
                    blTotal = blTotal + Math.round(datac.scale*100)/100;
                } else if (datac.money) {
                    /*monTotal += parseFloat(datac.money);*/
                    monTotal = monTotal + Math.round(datac.money*100)/100;
                }
            });
            if ($scope.contactreceivablescondition[0].scale) {
                if (blTotal != 100) {
                    swal("收款比例之和总和不是100%，请修改", "", "warning");
                    return false;
                }
            }
            if ($scope.contactreceivablescondition[0].money) {
                if($scope.ORDER_DATA.rebatemoney == undefined){
                    $scope.ORDER_DATA.rebatemoney = 0;
                }
                var contrNum = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.ORDER_DATA.rebatemoney * 1) * 100) / 100;
                if (monTotal != contrNum) {
                    swal("收款金额之和不等于合同总金额减去返点金额" + contrNum + "，请修改", "", "warning");
                    return false;
                }
            }
        }
        switch ($scope.ORDER_DATA.contracttemplate) {
            case '华为硬件标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {//本合同生效之日起
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {//供方发货前
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {//本合同生效之日起
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '其他付款' && value.cond == '其他条件') {
                            shtml = '其他条件;';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '其他付款' && value.cond == '其他条件') {
                            shtml = '其他条件;';
                        }
                    }
                    sArr.push(shtml);
                });

                break;
            case '华为硬件非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.contactreceivablescondition.length == 1) {
                        if (value.thetype == '预付款') {
                            shtml = '需方于' + value.cond + value.days + '个日历日内支付供方合同全款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '服务款') {
                            shtml = '需方于' + value.cond + value.days + '日内支付供方合同全款，支付方式为' + value.method + ';';
                        }
                    } else {
                        if ($scope.ORDER_DATA.sktj == '按比例') {
                            if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                                shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                            } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                                shtml = '需方于服务生效前' + value.days + '日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                            }
                            if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                            }
                        } else if ($scope.ORDER_DATA.sktj == '按金额') {
                            if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                                shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                            } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                                shtml = '需方于服务生效前' + value.days + '日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                            }
                            if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                            }
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                            shtml = '需方于服务生效前' + value.days + '日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                            shtml = '需方于服务生效前' + value.days + '日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
        }


        $scope.ORDER_DATA.contactreceivablesconditionshowarea = sArr.join('   ');
    };
    $scope.ORDER_DATA.deliverwaycheck = {};
    $scope.deliverwaycheck = true;
    $scope.jhFs = function(type){
        var typeDate = null;
        if(type!=undefined){
            typeDate = type;
        }
        if(typeDate.type2 == true){
            $scope.ifEmail = true;
        }else {
            $scope.ifEmail = false;
        }
        if($scope.ORDER_DATA.deliverwaycheck.type1 || $scope.ORDER_DATA.deliverwaycheck.type2 || $scope.ORDER_DATA.deliverwaycheck.type3){
            $scope.deliverwaycheck = false;
        }else{
            $scope.deliverwaycheck = true;
        }
    };
    $scope.xmgcfw = function(type){
        if(type == '原厂提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程由原厂提供，服务内容详见服务清单';
        }else if(type == '供方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由供方安装';
        }else if(type == '需方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由需方安装';
        }
    };
    /*$scope.userLinkList = [{name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''}];*/
    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type == 'userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type == 'excleData'){
            $scope.excleData.splice(idx,1);
        }
    };
    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = service.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    // $scope.ORDER_DATA.cp = '0';
    $scope.fdBox = function(){//销售返点
        $scope.fdTotal = 0;
        if(!$scope.ORDER_DATA.receipttype){
            swal("请先选择开票税率", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.contractmoney){
            swal("请先填写合同总金额", "", "warning");
            return false;
        }
        if(parseInt($scope.ORDER_DATA.contractmoney) == 0){
            swal("合同总金额为0不能选择返点", "", "warning");
            return false;
        }
        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        var fParam = {'userid': $scope.ORDER_DATA.stomerid,'receipttype':$scope.ORDER_DATA.receipttype,'task':'contract'}//,'money': $scope.ORDER_DATA.contactname
        var listFd = service.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };;
    $scope.fdCheck = function(index){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());
        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        });
        $scope.fdTotal = Math.round(checkAccount*100)/100;;
    };
    $scope.fdListDelet = function(index){
        $scope.ORDER_DATA.rebatemoney = Math.round(($scope.ORDER_DATA.rebatemoney*1 - $scope.fdList[index].amount*1)*100)/100;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
        $scope.fdList.splice(index,1);
    };
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else if(parseFloat($scope.fdTotal)> parseFloat($scope.ORDER_DATA.contractmoney)){
            swal("使用返点金额不能大于合同总金额", "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont=(allCheckCont*100+parseFloat(par2.find("td:eq(7)").html()*100))/100;
                });
                if(allCheckCont<kyToCount){
                    swal("选中的返点总金额"+allCheckCont+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){

                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }

            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(allCheckCont<kyToCount){
                    swal("您输入的返点金额"+kyToCount+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }
            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();
            $scope.$apply(function () {
                $scope.fdList = checkArr;
                $scope.ORDER_DATA.rebatemoney = Math.round($scope.fdTotal*100)/100;
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.fdTotal*100/$scope.ORDER_DATA.contractmoney*100)/100;
                $scope.fdList = checkArr;
            });
        }
    };


    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if(!data.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        var doc={},param= {},contractbase = {},relationcontractId = [];
        contractbase  = data;
        var userLink = $scope.userLinkList.concat($scope.excleData);
        if(userLink.length<=0 && contractbase.contracttype != '专有服务'){
            swal("请添加交货地点和联系人", "", "warning");
            return false;
        }
        contractbase.receiver = userLink;//交货联系人
        if($scope.matingContractId && $scope.matingContractId != ''){//relationcontractId: [] #关联合同编号{relationId:,thetype:0/1} 0不一同审核,1 一同审核
            var reObj = {relationId:$scope.matingContractId,thetype:2,contractNo:$scope.matingContract};
            var relationcontractId = [];
            relationcontractId.push(reObj);
            contractbase.relationcontractId = relationcontractId;
        }
        contractbase.rebateitem  = $scope.fdList;//销售返点
        var contracttemplateType = true;
        if($scope.ORDER_DATA.contracttype =='专有服务' && $scope.ORDER_DATA.servicemethod == '市场拓展服务'){
            contracttemplateType = false;
        }else if($scope.ORDER_DATA.contracttemplate =='自有服务标准合同'){
            contracttemplateType = false;
        }
        if(contracttemplateType){
            if($scope.contactreceivablescondition.length<=0 ){
                swal("合同收款条款不能为空", "", "warning");
                return false;
            }else{
                var blTotal = 0;
                var monTotal = 0;
                angular.forEach($scope.contactreceivablescondition, function (datac) {
                    if (datac.scale) {
                        /*blTotal += parseFloat(datac.scale);*/
                        blTotal = blTotal + Math.round(datac.scale*100)/100;
                    } else if (datac.money) {
                        /*monTotal += parseFloat(datac.money);*/
                        monTotal = monTotal + Math.round(datac.money*100)/100;
                    }
                });
                if ($scope.contactreceivablescondition[0].scale) {
                    if (blTotal != 100) {
                        swal("收款比例之和总和不是100%，请修改", "", "warning");
                        return false;
                    }
                }
                if ($scope.contactreceivablescondition[0].money) {
                    if($scope.ORDER_DATA.rebatemoney == undefined){
                        $scope.ORDER_DATA.rebatemoney = 0;
                    }
                    var contrNum = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.ORDER_DATA.rebatemoney*1)*100)/100;
                    if(monTotal != contrNum){
                        swal("收款金额之和不等于合同总金额减去返点金额"+contrNum+"，请修改", "", "warning");
                        return false;
                    }
                }
            }
        }
        if($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同'|| $scope.ORDER_DATA.contracttemplate == '华为服务标准合同'|| $scope.ORDER_DATA.contracttemplate == 'Oracle标准合同'){
            $scope.putMeg();
        }
        contractbase.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
        var attachment= [];//附件字段
        var fileObj = {};
        fileObj.filePath = $scope.uploadFile;
        fileObj.fileName = $scope.fileName;
        attachment.push(fileObj);
        contractbase.attachment= attachment;
        doc.contractbase = contractbase;
        doc.processId = $scope.processId;
        doc.nodeId = $scope.nodeId;
        if($stateParams.relationId){
            doc.contractId = $stateParams.relationId;
            $scope.contractId = $stateParams.relationId;
        }else{
            doc.contractId = $scope.contractId;
        }
        doc.relationId = $scope.relationId;
        param.doc = doc;
        if(statue == "save"){
            var addInside;
            if($scope.ORDER_DATA.contracttype == '配套销售'){
                addInside = service.addInsideCognatecontract(param);
            }else {
                addInside = service.addInside(param);
            }
            addInside.success(function(data){
                if(data.code == 200){
                    if(data.rst.doc.relationId){
                        $scope.ifRelationId = true;
                        $scope.relationId = data.rst.doc.relationId;
                        swal("保存成功,点击查看关联合同进行编辑", "", "success");
                    }else {
                        $scope.ifRelationId = false;
                        swal("保存成功", "", "success");
                    }

                    //$('html, body').scrollTop(0);
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var addInside;
            if($scope.ORDER_DATA.contracttype == '配套销售'){
                addInside = service.addInsideCognatecontract(param);
            }else {
                addInside = service.addInside(param);
            }
            addInside.success(function(data){
                if(data.code == 200){
                    if(data.rst.doc.relationId){
                        $scope.ifRelationId = true;
                        $scope.relationId = data.rst.doc.relationId;
                        swal("保存成功,点击查看关联合同进行编辑", "", "success");
                    }else {
                        $scope.ifRelationId = false;
                        swal("保存成功", "", "success");
                    }
                    $scope.ht.activeTab = 2;
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };

    //产品清单----借出转销售
    $scope.jczxsObj = {};
    var wlList = $scope.wlList = [];//借出转销售的物料
    var htcgList = $scope.htcgList = [];//采购申请的物料
    var tjwlList = $scope.tjwlList = [];//手动添加物料
    var wlExcleData = $scope.wlExcleData = [];//导入的物料
    /*$scope.wlAdd = function(){
     var obj = {"goodscode":'',"goodsorigincode":'',"version":'',"goodsdesc":'',"count":'',"unitprice":''};
     $scope.tjwlList.push(obj);
     }*/
    $scope.tjwlDel = function(index){
        $scope.tjwlList.splice(index,1);
    };
    $scope.wlDel = function(index){
        $scope.wlList.splice(index,1);
    };
    $scope.htcgDel = function(index){
        $scope.htcgList.splice(index,1);
    };
    $scope.scwuDel = function(index,type){
        if(type=='right'){
            $scope.wlExcleData.right.splice(index,1);
        }else {
            $scope.wlExcleData.error.splice(index,1);
        }
    };
    $scope.jczxsBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $scope.jczxsObj.clientname = $scope.ORDER_DATA.stomer;
        $( "#jczxsBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#jczxsTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择物料", "", "warning");
                            return false;
                        }

                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parList = $(this).closest('.list');
                            var code = parList.find('.thw2:eq(0)').html();
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'jcdcode':code,
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(6)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(7)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(6)').find("input:eq(0)").val()*par.find('td:eq(7)').find("input:eq(0)").val()*100)/100,//小计
                                'from':20,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':'',//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(7)').find("input:eq(1)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':0,//税率
                                'purchasecount':0,//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': '', //采购申请ID
                                'supplierorderid': '',  //供应商订单号
                                'devicecost': '',  //设备费用
                                'servicecost': '', //服务费用
                                'amountcost': '',
                                'selfpickupcost': '',   //自提费用
                                'storeplace': '', //存储地点
                                'cashrebate': '',
                                'thesum': ''// #金额小计
                            };
                            lsArr.push(xObj);
                        });
                        $scope.$apply(function () {
                            $scope.wlList = $scope.wlList.concat(lsArr);
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#jczxsBox" ).dialog( "open" );
        /*var jcParam = {'limit':1000,'userid': $scope.ORDER_DATA.stomerid}//,'money': $scope.ORDER_DATA.contactname
         var listJc = service.listJc(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.jczxsList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.wlListBlur = function(wR,dR){
        if(parseInt(dR)>parseInt(wR)){
            swal("输入的数量不能大于未还数量", "", "warning");
            return false;
        }
    };

    $scope.jczxsSearch = function(){
        var jcParam = {'limit':1000,'username': $scope.ORDER_DATA.salesname, 'code':$scope.code, 'clientname':$scope.ORDER_DATA.stomer};
        var listJc = service.listJc(jcParam);
        listJc.success(function(data){
            if(data.code == 200){
                $scope.jczxsList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    //产品清单----采购申请单
    $scope.cgsqdObj = {};
    var isservice = 0;
    if($scope.ORDER_DATA.contracttype =='专有服务'){
        isservice = 1;
    }else {
        isservice = 0;
    }
    $scope.cgsqdBox = function(){
        if(!$scope.ORDER_DATA.salesname){
            swal("请先输入销售人员", "", "warning");
            return false;
        }

        $scope.cgsqdObj.saName = $scope.ORDER_DATA.salesname;
        $( "#cgsqdBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#cgsqdTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择采购申请", "", "warning");
                            return false;
                        }
                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parGj = $(this).closest('.fTd');
                            var faTable = parGj.find("table:eq(0)");
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(5)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(6)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(5)').find("input:eq(0)").val()*par.find('td:eq(6)').find("input:eq(0)").val()*100)/100,//小计
                                'from':30,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':faTable.find('td:eq(0)').find("span:eq(0)").html(),//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(6)').find("input:eq(9)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':par.find('td:eq(6)').find("input:eq(1)").val(),//税率
                                'purchasecount':par.find('td:eq(5)').find("input:eq(1)").val(),//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': par.find('td:eq(6)').find("input:eq(10)").val(),//采购申请ID
                                'supplierorderid': faTable.find('td:eq(0)').find("input:eq(1)").val(),  //供应商订单号
                                'devicecost': par.find('td:eq(6)').find("input:eq(2)").val(),  //设备费用
                                'servicecost': par.find('td:eq(6)').find("input:eq(3)").val(), //服务费用
                                'amountcost': par.find('td:eq(6)').find("input:eq(4)").val(),
                                'selfpickupcost': par.find('td:eq(6)').find("input:eq(5)").val(),   //自提费用
                                'storeplace': par.find('td:eq(6)').find("input:eq(6)").val(), //存储地点
                                'cashrebate': par.find('td:eq(6)').find("input:eq(7)").val(),
                                'thesum': par.find('td:eq(6)').find("input:eq(8)").val(),// #金额小计
                                'tax': par.find('td:eq(6)').find("input:eq(11)").val(),// #金额小计
                                'purchasetype': par.find('td:eq(6)').find("input:eq(12)").val(),// #金额小计
                                'currencytype': par.find('td:eq(6)').find("input:eq(13)").val(),// #金额小计
                                'purchaseorderid': par.find('td:eq(6)').find("input:eq(14)").val(),// #金额小计
                                'purchaselineno': par.find('td:eq(6)').find("input:eq(15)").val()// #行编号
                            };
                            var purIdlineno = xObj.purchaseorderid+xObj.purchaselineno;
                            var ifwuEq = true;
                            $.each($scope.htcgList,function(key,value){
                                var purIdlineno_al = value.purchaseorderid+value.purchaselineno;
                                if(purIdlineno == purIdlineno_al){
                                    ifwuEq = false;
                                    //swal(xObj.goodscode+"物料选择重复将会合并此物料", "", "warning");
                                    swal("有重复物料系统将会自动合并", "", "warning");
                                    return false;
                                }
                            });
                            if(ifwuEq){
                                lsArr.push(xObj);
                            }

                        });
                        $scope.$apply(function () {
                            $scope.htcgList = $scope.htcgList.concat(lsArr);
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#cgsqdBox" ).dialog( "open" );
        /*var jcParam = {'userid': $scope.ORDER_DATA.salesid,'isservice': isservice}
         var listJc = service.listCgd(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.cgsqdList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };

    $scope.cgsqdSearch = function(){
        if($scope.code=='' && $scope.clientname=='' &&$scope.supplierId == ''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var jcParam = {'limit':1000,'escompany':$scope.ORDER_DATA.escompany,'userid': $scope.ORDER_DATA.salesid, 'code':$scope.code, 'clientname':$scope.clientname,'supplierId':$scope.supplierId,'getgoods':1};
        var listCgd = service.listCgd(jcParam);
        listCgd.success(function(data){
            if(data.code == 200){
                $scope.cgsqdList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.htwlBox = function(){
        $( "#htwlBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true
        });
        $( "#htwlBox" ).dialog( "open" );
    };
    $scope.htwlSelect = function(MATNR, BISMT, ZZGKXH, MAKTX, num, price ,ZZMAKTX){
        var obj = {
            'contractId':$scope.contractId,//合同保存ID
            'goodstype':'',//
            'goodscode':MATNR,//内部物料编码
            'sourcegoodscode':BISMT,//原厂物料编码
            'version':ZZGKXH,//型号
            'desc':MAKTX,//描述
            'sourcegoodsdesc':ZZMAKTX,//描述
            'count':num,//数量
            'unitprice':price,//单价
            'singTotal':Math.round(num*price*100)/100,//小计
            'from':0,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
            'thetype':0,//新增 0，加 10，退 20，换 30
            'purchaseorderid':'',//采购订单ID
            'purchasecontractid':'',//采购合同ID
            'purchaseprice':'',//采购单价，借出转销售使用移动平均价
            'cess':0,//税率
            'purchasecount':0,//采购数量
            'sapid': '',
            'salesitemid': '',
            'purchaseid': '', //采购申请ID
            'supplierorderid': '',  //供应商订单号
            'devicecost': '',  //设备费用
            'servicecost': '', //服务费用
            'amountcost': '',
            'selfpickupcost': '',   //自提费用
            'storeplace': '', //存储地点
            'cashrebate': '',
            'thesum': ''// #金额小计
        };
        $scope.tjwlList.push(obj);
        $( "#htwlBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.allCheck=function(event){
        var currentElement = event.target;
        var zCheck = $(currentElement).closest(".zTable").find(".zCheck");
        if($(currentElement).hasClass("allCheckAc")){
            $(currentElement).attr("class",'allCheck');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck');
            });
        }else {
            $(currentElement).attr("class",'allCheckAc');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck zCheckAc');
            });
        }
        event.stopPropagation();
    };
    $scope.zCheck = function(event){
        var currentElement = event.target;
        if($(currentElement).hasClass("zCheckAc")){
            $(currentElement).attr("class",'zCheck');
        }else {
            $(currentElement).attr("class",'zCheck zCheckAc');
        }
        event.stopPropagation();
    };
    /*$("body").delegate(".allCheck","click",function(event){
     var obj = $(this);
     var zCheck = obj.closest(".zTable").find(".zCheck");

     if(obj.hasClass("allCheckAc")){
     obj.attr("class",'allCheck');
     $(zCheck).each(function(){
     $(this).attr("class",'zCheck');
     });
     }else {
     obj.attr("class",'allCheck allCheckAc');
     $(zCheck).each(function(){
     $(this).attr("class",'zCheck zCheckAc');
     });
     }
     event.stopPropagation();
     });*/

    /*$("body").delegate(".zCheck","click",function(){
     var obj = $(this);
     if(obj.hasClass("zCheckAc")){
     obj.attr("class",'zCheck');
     }else {
     obj.attr("class",'zCheck zCheckAc');
     }

     });*/

    $("body").delegate(".setCount","blur",function(){
        var obj = $(this);
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var unitprice = objParent.find(".unitprice:eq(0)").val();
        /*if(obj.hasClass('maxcont') && parseFloat(obj.val())> parseFloat(obj.attr('maxcount'))){
         swal('输入的数量不能大于'+obj.attr('maxcount'), "", "warning");
         obj.val(obj.attr('maxcount'));
         }*/
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(unitprice)*100)/100).trigger('change');
    });
    $("body").delegate(".setPrice","blur",function(){
        var obj = $(this);
        if(obj.val() == ''){
            obj.val('0')
        }
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var count = objParent.find(".count:eq(0)").val();
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(count)*100)/100).trigger('change');
    });
    $scope.comparBill = function(){
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if(isNaN(zTotal)){
            swal("销售合同金额不能为空", "", "warning");
            return false;
        }
        if(tList.length<=0){
            swal("请添加产品清单", "", "warning");
            return false;
        }
        if(zTotal == 0 || zTotal == 0.0 || zTotal == 0.00){
            swal({
                title: "您要分摊单价吗?",
                text: "合同总价为0，清单单价全部变成0!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定分摊",
                cancelButtonText:'关闭',
                closeOnConfirm: true
            }, function(){
                $.each(tList,function(key,value) {
                    var oThat = $(this);
                    //oThat.find(".count:eq(0)").val('0').trigger('change');
                    oThat.find(".unitprice:eq(0)").val('0').trigger('change');
                    oThat.find(".singTotal:eq(0)").val('0').trigger('change');
                });
            });
            return false;
        }
        var total = 0;
        var totalxy = 0;
        if(tList.length == 1){
            var oThat = $(tList);
            var count = parseFloat(oThat.find(".count:eq(0)").val());
            var unitpriceVal = parseFloat(oThat.find(".unitprice:eq(0)").val());
            var singTotalVal = parseFloat(count*unitpriceVal);
            if(count == 0){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(zTotal != singTotalVal){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+singTotalVal+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    var unitprice = oThat.find(".unitprice:eq(0)");
                    var singTotal = oThat.find(".singTotal:eq(0)");
                    singTotal.val(zTotal).trigger('change');
                    unitprice.val(Math.round((zTotal/count)*100)/100).trigger('change');
                });

            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }else {
            var tListLen = tList.length-1;
            var kTrue = true;
            $.each(tList,function(key,value){
                var oThat = $(this);
                var count = parseFloat(oThat.find(".count:eq(0)").val());
                var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                var singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
                if(count == 0){// || unitprice == 0
                    kTrue = false;
                    return false;
                }
                /*var jT = count*unitprice;
                 total += jT;*/
                /*if(tListLen > key){
                    var jT = count*unitprice;
                    total += jT;
                }else {
                    total+=singTotal;//最后一行直接取小计相加
                }*/
                var jT = Math.round(count*unitprice*100)/100;
                oThat.find(".singTotal:eq(0)").val(jT).trigger('change');
                total += jT;
            });
            if(kTrue == false){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(total == 0 && zTotal !=0){
                swal("合同总价不是"+zTotal+"，清单总价不能是0", "", "warning");
                return false;
            }

            total = parseInt(Math.round(total*100))/100;
            if(zTotal != total){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+total+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    $.each(tList,function(key,value){
                        var oThat = $(this);
                        var count = parseFloat(oThat.find(".count:eq(0)").val());
                        var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                        var curUnitprice = parseInt(unitprice*zTotal/total*100)/100;//(count*unitprice/total)*zTotal/count
                        //var curUnitprice = parseInt(Math.round((count*unitprice*zTotal)/(total*count)*100))/100;
                        var singTotal = oThat.find(".singTotal:eq(0)");
                        var tot = count*curUnitprice;
                        if(tListLen > key){
                            totalxy += tot;
                        }
                        if(tListLen == key){
                            singTotal.val(Math.round(zTotal*100-totalxy*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(parseInt(singTotal.val()/count*100)/100).trigger('change');
                        }else {
                            singTotal.val(Math.round(count*curUnitprice*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(curUnitprice).trigger('change');
                        }

                    });
                });
            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }
    };

    $scope.addDataAll = function(data,statue) {
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj, function (keyData) {
            keyData.$dirty = true;
        })
        if (!$scope.invoiceForm.$valid) {
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if ($scope.wlExcleData.error && $scope.wlExcleData.error.length > 0) {
            swal("请先删除错误的物料", "", "warning");
            return false;
        }
        if ($stateParams.relationId) {
            $scope.contractId = $stateParams.relationId;
        }
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if (tList.length <= 0) {
            swal("请添加产品清单", "", "warning");
            return false;
        } else {
            var singTotal = 0;
            if (tList.length == 1) {
                var oThat = $(tList);
                singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
            } else {
                $.each(tList, function (key, value) {
                    var oThat = $(this);
                    var total = parseFloat(oThat.find(".singTotal:eq(0)").val());
                    singTotal += total;
                });
            }
            if (zTotal != Math.round(singTotal * 100) / 100) {
                swal("请先点击清单完成按钮,然后点击分摊单价", "", "warning");
                return false;
            }
        }
        var tLength = tList.length - 1;
        var tListPar = $("#wlList").find(".list").eq(tLength);
        var lastCont = tListPar.find('.count:eq(0)').val();
        var lastunitprice = tListPar.find('.unitprice:eq(0)').val();
        var lastsingTotal = tListPar.find('.singTotal:eq(0)').val();
        if (lastCont * lastunitprice != lastsingTotal) {
            swal({
                title: "物料中最后一行数量乘单价不等于分摊出来的小计,确定要保存吗",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: '关闭',
                closeOnConfirm: true
            }, function () {
                totalSub();
            });
        } else {
            totalSub();
        }
        function totalSub() {
            var basedoc = {}, param = {}, contractbase = {}, qdDoc = {}, qdParam = {}, relationcontractId = [];
            contractbase = data;
            var userLink = $scope.userLinkList.concat($scope.excleData);
            contractbase.receiver = userLink;//交货联系人
            if ($scope.matingContractId && $scope.matingContractId != '') {//relationcontractId: [] #关联合同编号{relationId:,thetype:0/1} 0不一同审核,1 一同审核
                var reObj = {relationId: $scope.matingContractId, thetype: 2, contractNo: $scope.matingContract};
                var relationcontractId = [];
                relationcontractId.push(reObj);
                contractbase.relationcontractId = relationcontractId;
            }
            contractbase.rebateitem = $scope.fdList;//销售返点
            var contracttemplateType = true;
            if ($scope.ORDER_DATA.contracttype == '专有服务' && $scope.ORDER_DATA.servicemethod == '市场拓展服务') {
                contracttemplateType = false;
            } else if ($scope.ORDER_DATA.contracttemplate == '自有服务标准合同') {
                contracttemplateType = false;
            }
            if (contracttemplateType) {
                if ($scope.contactreceivablescondition.length <= 0) {
                    swal("合同收款条款不能为空", "", "warning");
                    return false;
                } else {
                    var blTotal = 0;
                    var monTotal = 0;
                    angular.forEach($scope.contactreceivablescondition, function (datac) {
                        if (datac.scale) {
                            /*blTotal += parseFloat(datac.scale);*/
                            blTotal = blTotal + Math.round(datac.scale*100)/100;
                        } else if (datac.money) {
                            /*monTotal += parseFloat(datac.money);*/
                            monTotal = monTotal + Math.round(datac.money*100)/100;
                        }
                    });
                    if ($scope.contactreceivablescondition[0].scale) {
                        if (blTotal != 100) {
                            swal("收款比例之和总和不是100%，请修改", "", "warning");
                            return false;
                        }
                    }
                    if ($scope.contactreceivablescondition[0].money) {
                        if ($scope.ORDER_DATA.rebatemoney == undefined) {
                            $scope.ORDER_DATA.rebatemoney = 0;
                        }
                        var contrNum = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.ORDER_DATA.rebatemoney * 1) * 100) / 100;
                        if (monTotal != contrNum) {
                            swal("收款金额之和不等于合同总金额减去返点金额" + contrNum + "，请修改", "", "warning");
                            return false;
                        }
                    }
                }
            }
            if ($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同' || $scope.ORDER_DATA.contracttemplate == '华为服务标准合同' || $scope.ORDER_DATA.contracttemplate == 'Oracle标准合同') {
                $scope.putMeg();
            }
            contractbase.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
            var attachment = [];//附件字段
            var fileObj = {};
            fileObj.filePath = $scope.uploadFile;
            fileObj.fileName = $scope.fileName;
            attachment.push(fileObj);
            contractbase.attachment = attachment;
            basedoc.contractbase = contractbase;
            basedoc.processId = $scope.processId;
            basedoc.nodeId = $scope.nodeId;
            basedoc.contractId = $scope.contractId;
            basedoc.relationId = $scope.relationId;
            param.doc = basedoc;
            qdDoc.lend = $scope.wlList;
            qdDoc.purchase = $scope.htcgList;
            qdDoc.upload = $scope.wlExcleData.right;
            qdDoc.handwork = $scope.tjwlList;
            qdDoc.processId = $scope.processId;
            qdDoc.nodeId = $scope.nodeId;

            qdDoc.contractId = $scope.contractId;
            qdDoc.relationId = $scope.relationId;
            qdParam.doc = qdDoc;
            if ($scope.wlList.length <= 0 && $scope.htcgList.length <= 0 && $scope.tjwlList.length <= 0 && $scope.wlExcleData.right.length <= 0) {
                swal("请添加物料信息", "", "warning");
                return false;
            }
            if (statue == "save") {
                var addCpqd;
                if ($scope.ORDER_DATA.contracttype == '配套销售') {
                    addCpqd = service.addCpqdCognatecontract(qdParam);
                } else {
                    addCpqd = service.saveitems(qdParam);
                }
                addCpqd.success(function (data) {
                    if (data.code == 200) {
                        if (data.rst.status == 1) {
                            $scope.wlList = data.rst.data.lend;//采购申请的物料
                            $scope.htcgList = data.rst.data.purchase;//采购申请的物料
                            $scope.wlExcleData.right = data.rst.data.upload;//导入的物料
                            $scope.tjwlList = data.rst.data.handwork;//手动添加物料
                            return false;
                        } else {
                            var addInside;
                            if ($scope.ORDER_DATA.contracttype == '配套销售') {
                                addInside = service.addInsideCognatecontract(param);
                            } else {
                                addInside = service.addInside(param);
                            }
                            addInside.success(function (data) {
                                if (data.code == 200) {
                                    swal("保存成功", "", "success");
                                } else {
                                    swal(data.msg, "", "warning");
                                }
                            });
                        }
                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            } else if (statue == 'apply') {
                // 提交
                $scope.applyFn = function (selIndex) {
                    if (selIndex !== -1) {
                        $("#approversDialog").dialog("destroy");
                        $(".ui-dialog").remove();
                        var selObj = $scope.receivers[selIndex];
                        param.candidates[0].receivers = [selObj];
                    }
                    var addCpqd;
                    if ($scope.ORDER_DATA.contracttype == '配套销售') {
                        addCpqd = service.addCpqdCognatecontract(qdParam);
                    } else {
                        addCpqd = service.saveitems(qdParam);
                    }
                    addCpqd.success(function (data) {
                        if (data.code == 200) {
                            if (data.rst.status == 1) {
                                $scope.wlList = data.rst.data.lend;//采购申请的物料
                                $scope.htcgList = data.rst.data.purchase;//采购申请的物料
                                $scope.wlExcleData.right = data.rst.data.upload;//导入的物料
                                $scope.tjwlList = data.rst.data.handwork;//手动添加物料
                                return false;
                            } else {
                                var applyAdd;
                                if ($scope.ORDER_DATA.contracttype == '配套销售') {
                                    applyAdd = service.applyAddCognatecontract(param);
                                } else {
                                    applyAdd = service.applyAdd(param);
                                }
                                applyAdd.success(function (data) {
                                    if (data.code == 200) {
                                        swal({
                                            title: "提交成功",
                                            text: "",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "返回合同列表",
                                            closeOnConfirm: true
                                        }, function () {
                                            window.location.href = '/index.html#/contractOrder';
                                        });
                                    } else {
                                        swal(data.msg, "", "warning");
                                    }
                                });
                            }
                        } else {
                            swal(data.msg, "", "warning");
                        }
                    });
                };

                // if(($scope.ORDER_DATA.contracttype == '项目' || $scope.ORDER_DATA.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                if ($scope.candidates.length && $scope.candidates[0].receivers.length > 1 && ($scope.candidates[0].coop !== 'or' || $scope.candidates[0].coop !== 'and')) {
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
    }


}]);
contractApp.controller('contractOrderViewCtrl', ['$scope','$rootScope', '$stateParams','$state', 'contractServices',function($scope, $rootScope,$stateParams, $state,payment){
    var ORDER_DATA = {};
    var ht = $scope.ht = {};
    var Id = $scope.Id = '';
    var person = $rootScope.loginPerson;
    $scope.xsCbfx = true;
    if($stateParams.id){
        $scope.Id = Id = $stateParams.id;
        //$scope.ifNoFushuHt = true;
    }else if($stateParams.relationId) {
        $scope.Id = Id = $stateParams.relationId;
        // $scope.xsCbfx = false;//关联合同中要显示成本分析了

    }
    if($stateParams.relationId && $stateParams.myflag == 'mybegin'){
        $scope.fushuEditBtn = true;
    }
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };

    var viewCont = payment.viewInside({contractId:Id});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.groupno = data.rst.data.model.contractbase.groupno;
        $scope.saleOrderid  = data.rst.data.model.contractbase.salesorderid[0].orderid;
        $scope.status = data.rst.data.model.contractbase.status;
        /*if(data.rst.data.model.contractbase.isbody == 0){//0是关联合同 1是主合同
         $scope.xsCbfx = false;//关联合同中不现实成本分析
         }*/
        if(data.rst.data.model.othercost.length>0){
            var cbfxObj = $scope.cbfxObj = {};
            cbfxObj.t1 = $scope.cbfxObj.t1 = data.rst.data.model.othercost;
            if(data.rst.data.model.purchase != undefined){
                cbfxObj.t2 = data.rst.data.model.purchase;
            }
            if(data.rst.data.model.delta != undefined){
                cbfxObj.t3 = data.rst.data.model.delta;
            }
            /*$scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
            $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
            $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
            $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
            $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
            $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
           */
            $scope.maoliBHan = $scope.ORDER_DATA.contractbase.interest;
            $scope.maoliHan = $scope.ORDER_DATA.contractbase.interestContainTax;
            $scope.companygain = $scope.ORDER_DATA.contractbase.contractInterest;
            $scope.xMaoliBHan = $scope.ORDER_DATA.contractbase.sellinterest;
            $scope.xMaoliHan = $scope.ORDER_DATA.contractbase.sellinterestContainTax;
            $scope.salesgain = $scope.ORDER_DATA.contractbase.sellcontractInterest;
            /*if(isNaN($scope.companygain)){
                $scope.companygain = 0;
            }
            if(isNaN($scope.salesgain)){
                $scope.salesgain = 0;
            }*/
        }
        if(data.rst.data.model.contractbase.controller == 'contractchangeservice'&&data.rst.data.model.contractbase.contracttype!='配套销售'){//此合同是清单变更
            $scope.contractchangeservice = true;
            //$scope.xsCbfx = false; //把主合同的成本分析先去掉
            $scope.tuobjlength = data.rst.data.model.goodschangeprotocalcost;
            $scope.tuObj = data.rst.data.model.goodschangeprotocalcost[0];
            //成本分析部分
            if($scope.tuObj.ticketType == '税率6%'){
                $scope.tuObj.shulv = 0.06;
                //$scope.buObj.shulv = 0.06;
            }else {
                $scope.tuObj.shulv = 0.17;
                //$scope.buObj.shulv = 0.17;
            }
            if(data.rst.data.model.changeothercost != null && data.rst.data.model.changeothercost.length>0){
                $scope.changeothercost = data.rst.data.model.changeothercost;
                $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                $scope.billcompanygain = Math.round(($scope.billmaoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1))) * 10000) / 100;
                $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;

                if(isNaN($scope.billsalesgain) || $scope.billsalesgain==-Infinity){
                    $scope.billsalesgain = 0;
                }
                if(isNaN($scope.billcompanygain) || $scope.billcompanygain==-Infinity){
                    $scope.billcompanygain = 0;
                }
                if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                    $scope.companygain = 0;
                    $scope.salesgain = 0;
                }
            }
        }else if(data.rst.data.model.contractbase.controller == 'contractcontentchangeservice'){
            $scope.contractcontentchangeservice = '内容变更';
        }
        if(data.rst.data.model.contractbase.attachment&&data.rst.data.model.contractbase.attachment[0]!=null){
            $scope.uploadTrue = true;
            $scope.uploadFile = data.rst.data.model.contractbase.attachment[0].filePath;
            $scope.docName = data.rst.data.model.contractbase.attachment[0].fileName;
        }
        var islast = data.rst.data.model.contractbase.islast;

        if(islast == 1){
            $scope.versions = true;
        }else {
            $scope.versions = false;
        }
        //if(data.rst.data.model.contractbase.contracttype == '配套销售'){$scope.versions = false;}
        //判断是否有关联合同
        if(data.rst.data.model.contractbase.relationcontractId.length>0){
            angular.forEach(data.rst.data.model.contractbase.relationcontractId, function(value,index,array){
                if(value.thetype == 1 && data.rst.data.model.contractbase.hasservicecontract == '是'){
                    $scope.fushuHet = true;
                    $scope.relationId = value.relationId;
                    $scope.relationContractno = value.contractno;
                }
                if(value.thetype == 2){//如果配套销售 有关联合同的时候
                    $scope.matingContract = value.contractNo;
                    $scope.matingContractId = value.relationId;
                }
            });

        }

        if(data.rst.data.model.contractbase.contracttype == '分销' && $rootScope.opprev.contractOrder_costanalysis == true && $scope.xsCbfx == true){
            $scope.ifcbfxCy = true;
            $scope.ifBillCg = true;
            var fenxiaointerestsap = payment.fenxiaointerestsap({contractId:$scope.Id});
            fenxiaointerestsap.success(function(datafe) {
                if(datafe.code == 200){
                    if(datafe.rst.data.cost){
                        $scope.xMaoliBHan = datafe.rst.data.cost.sellinterest;//销售毛利率
                        $scope.xMaoliHan = datafe.rst.data.cost.sellinterestContainTax;//销售含税利率
                        $scope.salesgain = datafe.rst.data.cost.sellcontractInterest;//销售合约利率
                    }
                    if(datafe.rst.data.bucost){
                        $scope.billxMaoliBHan = datafe.rst.data.bucost.sellinterest;//销售毛利率
                        $scope.billxMaoliHan = datafe.rst.data.bucost.sellinterestContainTax;//销售含税利率
                        $scope.billsalesgain = datafe.rst.data.bucost.sellcontractInterest ;//销售合约利率
                    }
                    if(datafe.rst.data.tuicost){
                        $scope.tuixMaoliBHan = datafe.rst.data.tuicost.sellinterest;//销售毛利率
                        $scope.tuixMaoliHan = datafe.rst.data.tuicost.sellinterestContainTax;//销售含税利率
                        $scope.tuisalesgain = datafe.rst.data.tuicost.sellcontractInterest+'%';//销售合约利率
                    }
                }else {
                    swal(datafe.msg, datafe.rst, "warning");
                    $scope.xMaoliBHan = 0;//销售毛利率
                    $scope.xMaoliHan = 0;//销售含税利率
                    $scope.salesgain = 0;//销售合约利率

                    $scope.billxMaoliBHan = 0;//销售毛利率
                    $scope.billxMaoliHan = 0;//销售含税利率
                    $scope.billsalesgain = 0;//销售合约利率

                    $scope.tuixMaoliBHan = 0;//销售毛利率
                    $scope.tuixMaoliHan = 0;//销售含税利率
                    $scope.tuisalesgain = 0 + '%';//销售合约利率
                    return false
                }
            });
        }

        if(data.rst.data.model.contractbase.contracttype == '配套销售'){
            $scope.xsCbfx = false;
            $scope.contractchangeservice = false;
        }


        if(data.rst.data.model.contractbase.transferway && data.rst.data.model.contractbase.transferway!=''){//运输方式
            var deliverwayObj = [{code:'01',name:'国内陆运'},{code:'02',name:'国内海运'},{code:'03',name:'国内空运'},{code:'04',name:'国际陆运'},{code:'05',name:'国际海运'},{code:'06',name:'国际空运'},{code:'07',name:'陆运快件'},{code:'08',name:'火车运输'},{code:'09',name:'快递'},{code:'10',name:'专车'},{code:'11',name:'自提'},{
                code: '12',
                name: '无实物发货'
            }];
            var transferwayName = getField(deliverwayObj,'code',data.rst.data.model.contractbase.transferway);
            $scope.transferway = transferwayName.name;
        }
        if(data.rst.data.model.contractbase.contracttype == '专有服务'){
            $scope.ifzyfw = true;
        }
        if($scope.ORDER_DATA.receipttype == '税率17%'){
            $scope.shuilv1 = 0.17;
            $scope.shuilv2 = 0.06;
        }else {
            $scope.shuilv1 = 0.06;
            $scope.shuilv2 = 0.17;
        }
        if(data.rst.data.model.contractbase.escompany == '中建材集团进出口公司'){
            $scope.ifjck = true;
        }
        switch (data.rst.data.model.contractbase.contracttemplate)
        {
            case '华为硬件标准合同':
                $scope.hkttk = true;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkXs = true;
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = false;
                $scope.xmgcfwfXs2 = true;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = true;
                $scope.ifEmail = false;
                //是否显示附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为硬件非标准合同':
                $scope.hkttk = true;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = true;
                //产品保修条款区域
                $scope.cpbxtkXs = true;
                //项目工程服务方式
                $scope.xmgcfwfXs = true;
                $scope.xmgcfwfXs1 = true;
                $scope.xmgcfwfXs2 = false;
                $scope.xmgcfuXs = true;
                $scope.xmgcfsTr = false;
                $scope.ifEmail = false;
                //是否显示附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务标准合同':
                $scope.hkttk = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = true;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否显示附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '华为服务非标准合同':
                $scope.hkttk = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = true;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否显示附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '自有服务标准合同':
                $scope.hkttk = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = true;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否显示附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = false;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                break;
            case '自有服务非标准合同':
                $scope.hkttk = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = true;
                $scope.jhfs2 = false;
                //$scope.ORDER_DATA.deliverwaycheck = {};
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = true;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                $scope.ifEmail = false;
                //是否显示附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case 'Oracle标准合同':
                $scope.hkttk = false;
                //发票开具说明
                $scope.fpkjDes = true;
                //合同条款
                $scope.httkIf = false;
                $scope.jhfs1 = false;
                $scope.jhfs2 = true;
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = false;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否显示附件
                $scope.ifupload = false;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
            case '非标准合同':
                $scope.hkttk = false;
                //发票开具说明
                $scope.fpkjDes = false;
                //合同条款
                $scope.httkIf = true;
                $scope.jhfs1 = false;
                $scope.jhfs2 = true;
                //交货条款区域
                $scope.jhtkXs = false;
                //产品保修条款区域
                $scope.cpbxtkXs = false;
                //项目工程服务方式
                $scope.xmgcfwfXs = false;
                $scope.xmgcfuXs = false;
                //是否显示附件
                $scope.ifupload = true;
                //合同收款条款
                $scope.ifHttk = true;
                //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                break;
        }
        $scope.spfuht = true;
        if($stateParams.relationId && $scope.status == 10) {//新建的时候附属合同审批 20是审批完成
            $scope.spfuht = false;
        }
        if($stateParams.relationId && $scope.status == 0) {//新建的时候附属合同草稿
            $scope.fushuEditBtn = true;
        }
    });
    //销售合同清单变更(验证能否变更，如果能就跳转到新建清单页面)
    $scope.billChange = function(type){
        if($scope.ORDER_DATA.contractbase.salesorgid != person.user.orgid){
            swal("不能变更不同部门的合同", "", "warning");
            return false;
        }
        var startchange = null;
        if(type == '配套销售'){
            startchange = payment.cognatestartchange({contractId:Id});
        }else{
            startchange = payment.startchange({contractId:Id});
        }
        startchange.success(function(data) {
            if(data.code == 200){
                var cusname = data.rst.contractbase.stomer;
                var cusnameId = data.rst.contractbase.stomerid;
                var contractno = data.rst.contractbase.groupno;
                $state.go('contractChangeAdd', {conid:Id, id: data.rst._id,conType:type, contractno:contractno, cusname:cusname, cusnameId:cusnameId});
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //取消合同清单变更
    $scope.cancleBillChange = function(type){
        var cancelchange = null;
        if(type == '配套销售'){
            cancelchange = payment.cognatecancelchange({contractId:Id});
        }else{
            cancelchange = payment.cancelchange({contractId:Id});
        }
        cancelchange.success(function(data) {
            if(data.code == 200){
                swal("取消成功！", "", "warning");
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //产品清单
    var listCpqd = payment.listCpqd({contractId:Id});
    listCpqd.success(function(data){
        if(data.code == 200){
            $scope.lend = data.rst.items.lend;//采购申请的物料
            $scope.purchase = data.rst.items.purchase;//采购申请的物料
            $scope.upload = data.rst.items.upload;//导入的物料
            $scope.handwork = data.rst.items.handwork;//手动添加物料

        }
    });
    //合同基本信息变更
    $scope.baseChange = function(type){
        if($scope.ORDER_DATA.contractbase.salesorgid != person.user.orgid){
            swal("不能变更不同部门的合同", "", "warning");
            return false;
        }
        var startchangeBase = null;
       /* console.log(type);*/
        if(type == '配套销售'){
            startchangeBase = payment.cognatestartchangeBase({contractId:Id});
        }else{
            startchangeBase = payment.startchangeBase({contractId:Id});
        }
        startchangeBase.success(function(data) {
            if(data.code == 200){
                var cusname = data.rst.contractbase.stomer;
                var cusnameId = data.rst.contractbase.stomerid;
                var contractno = data.rst.contractbase.groupno;
                $state.go('contractBaseChangeAdd', {conid:Id, id: data.rst._id,conType:type, contractno:contractno, cusname:cusname, cusnameId:cusnameId});
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //取消合同基本信息变更
    $scope.cancleBaseChange = function(type){
        var cancleBaseChange = null;
        if(type == '配套销售'){
            cancleBaseChange = payment.cognatecancelchangeBase({contractId:Id});
        }else{
            cancleBaseChange = payment.cancelchangeBase({contractId:Id});
        }
        cancleBaseChange.success(function(data) {
            if(data.code == 200){
                swal("取消成功！", "", "warning");
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //成本分析
    var cbfxObj = $scope.cbfxObj = {};
    /*var listcost = payment.listcost({contractId:Id});
     listcost.success(function(data){
     if(data.code == 200){
     var cbfxObj = $scope.cbfxObj = data.rst;
     $scope.$watchCollection('cbfxObj.t1[0]',function(newValue,oldValue, scope){
     $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
     $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
     $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
     $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
     $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
     $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
     });
     $scope.$watchCollection('cbfxObj.t1[1]',function(newValue,oldValue, scope){
     $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
     $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
     $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
     $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
     $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
     $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
     });
     $scope.$watchCollection('cbfxObj.t1[2]',function(newValue,oldValue, scope){
     $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
     $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
     $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
     $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
     $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
     $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
     });
     }else {
     swal(data.msg, "", "warning");
     }
     });*/
    $scope.viewHistory = function(contractno){
        $( "#listversion" ).dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#listversion" ).dialog( "open" );
        var listversion = payment.listversion({groupno:contractno});
        listversion.success(function(data){
            if(data.code == 200){
                $scope.contractHistory = data.rst;
            }
        });
    }

	// 2017-06-16 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.contractbase.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.contractbase.salesorderid.length ? $scope.ORDER_DATA.contractbase.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = payment.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    // 审批记录
    var vm = $scope;
    vm.processlog = null
    vm.docs = null;
    vm.$watch('ht.activeTab', function(nv, ov) {
        if (nv == 5 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = payment.getprocesslog({id: vm.ORDER_DATA.contractbase.contractno}); // 直接取值数据中 申请人（proposer）
            processlog.success(function (data) {
                if (data.rst.length != 0) {
                    vm.processlog = data.rst;
                } else {
                    vm.ht.activeTab = ov;
                    swal('没有审批信息', '', 'warning');
                }
            });
        }

    });


}]);
contractApp.controller('applyContractCtrl', ['$scope','$rootScope','$stateParams','contractServices','messageAppServe',function($scope,$rootScope,$stateParams,apply,message){
    // 2016-11-29 loupei
    // 审批中的销售合同要增加是否打印标记，申请表的打印需要新增参数processId， nodeId
    $scope.processId = $stateParams.processId;
    $scope.nodeId = $stateParams.nodeId;
    // 判断是不是商务节点
    $scope.business = $rootScope.billPrev.business_common;
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var contractId = $scope.contractId = '';
    var person = $rootScope.loginPerson;
    //var prevs = person.user.prevs;
    var newprev = $rootScope.billPrev;
    //var newprev = person.user.newprev;
    $scope.myflag = $stateParams.myflag;
    if(newprev.contractcost_page){
        $scope.cbfxPrev = true;//判断是否能够做成本分析
    }
    if(newprev.ywyscreate_page){
        //$scope.ywysPrev = true; //判断填写业务应收创建方式字段值
        $scope.ywyscreate_page = true;
    }
    /*if(prevs.length>0){
     angular.forEach(prevs,function(preData){
     if(preData.name == 'contractcost_page'){
     $scope.cbfxPrev = true;//判断是否能够做成本分析
     }else if(preData.name == 'ywyscreate_page'){
     //$scope.ywysPrev = true; //判断填写业务应收创建方式字段值
     $scope.ywyscreate_page = true;
     }
     });
     }*/
    var getCountry = apply.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    //产品清单
    var listCpqd = apply.listCpqd(param);
    listCpqd.success(function(data){
        if(data.code == 200){
            $scope.lend = data.rst.items.lend;//采购申请的物料
            $scope.purchase = data.rst.items.purchase;//采购申请的物料
            $scope.upload = data.rst.items.upload;//导入的物料
            $scope.handwork = data.rst.items.handwork;//手动添加物料

        }
    });
    //基本信息
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var isservice = 0;
    var viewPur = apply.applyView(param);
    viewPur.success(function(data){
        if(data.code == 200) {
            ORDER_DATA = $scope.ORDER_DATA = data.rst.doc.model;
            /*if(data.rst.doc.model.contractbase.receivabletype != undefined && data.rst.nodeStatus != 'active' && $stateParams.myflag != 'mydoing'){
             $scope.ywysPrev = false; //判断填写业务应收创建方式字段值
             $scope.ywysPrevBot = true;
             }else {
             $scope.ywysPrevBot = false;
             }*/
            if($scope.ywyscreate_page == true && data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.ywysPrev = true;
                $scope.ywysPrevBot = false;
            }else if(data.rst.doc.model.contractbase.receivabletype != undefined){
                $scope.ywysPrev = false; //判断填写业务应收创建方式字段值
                $scope.ywysPrevBot = true;
            }
            if(newprev.contract_businessremarks == true && data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.contract_businessremarks = true;//商务备注字段，新建时不显示，销售商务/商务经理审批时可见可编辑
            }
            if (data.rst.doc.model.contractbase.attachment && data.rst.doc.model.contractbase.attachment[0] != null) {
                $scope.uploadTrue = true;
                $scope.uploadFile = data.rst.doc.model.contractbase.attachment[0].filePath;
                $scope.docName = data.rst.doc.model.contractbase.attachment[0].fileName;
            }
            if(data.rst.doc.model.contractbase.contracttype == '配套销售'){
                $scope.cognatecontract = 'cognatecontract';
            }

            if (data.rst.doc.model.contractbase.transferway && data.rst.doc.model.contractbase.transferway != '') {
                var deliverwayObj = [{code: '01', name: '国内陆运'}, {code: '02', name: '国内海运'}, {
                    code: '03',
                    name: '国内空运'
                }, {code: '04', name: '国际陆运'}, {code: '05', name: '国际海运'}, {code: '06', name: '国际空运'}, {
                    code: '07',
                    name: '陆运快件'
                }, {code: '08', name: '火车运输'}, {code: '09', name: '快递'}, {code: '10', name: '专车'}, {
                    code: '11',
                    name: '自提'
                }, {
                    code: '12',
                    name: '无实物发货'
                }];
                var transferwayName = getField(deliverwayObj, 'code', data.rst.doc.model.contractbase.transferway);
                $scope.transferway = transferwayName.name;
            }

            $scope.contracttype = data.rst.doc.model.contractbase.contracttype;
            $scope.othercostConId = data.rst.doc.model.othercost.contractId;
            $scope.cp = data.rst.doc.model.contractbase.cp;

            if(data.rst.doc.model.contractbase.cp == '0'){
                $scope.cpIf = true;
            }else {
                $scope.cpIf = false;
            }

            if(data.rst.doc.model.contractbase.receipttype == '税率17%'){
                $scope.shuilv1 = 0.17;
                $scope.shuilv2 = 0.06;
            }else {
                $scope.shuilv1 = 0.06;
                $scope.shuilv2 = 0.17;
            }
            if(data.rst.doc.model.contractbase.escompany == '中建材集团进出口公司'){
                $scope.ifjck = true;
            }
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.contractId = data.rst.doc.model.contractId;

            switch (data.rst.doc.model.contractbase.contracttemplate)
            {
                case '华为硬件标准合同':
                    $scope.hkttk = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = false;
                    $scope.xmgcfwfXs2 = true;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = true;
                    $scope.ifEmail = false;
                    //是否显示附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为硬件非标准合同':
                    $scope.hkttk = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = true;
                    $scope.xmgcfwfXs2 = false;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = false;
                    $scope.ifEmail = false;
                    //是否显示附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //是否显示附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //是否显示附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '自有服务标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //是否显示附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = false;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                    break;
                case '自有服务非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = true;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //是否显示附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case 'Oracle标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否显示附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = false;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否显示附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
            }


            if($scope.ORDER_DATA.contractbase.contracttype =='专有服务'){
                $scope.ifzyfw = true;
                isservice = 1;
            }else {
                isservice = 0;
            }
            if($scope.ORDER_DATA.contractbase.contracttype == '专有服务' && $scope.ORDER_DATA.contractbase.servicemethod=='市场拓展服务'){
                $scope.ORDER_DATA.contractbase.receivabletype = '修改模式';
                $scope.ywDisable  = true;
            }
            /*if(data.rst.doc.model.contractbase.relationcontractId.length>0  && data.rst.doc.model.contractbase.hasservicecontract == '是'){//如果配套销售 有关联合同的时候 此处要修改
             $scope.relationId = data.rst.doc.model.contractbase.relationcontractId[0].relationId;
             $scope.ifGulian = true;
             $scope.ifGulianBtn = true;
             }*/
            //判断是否有关联合同
            if(data.rst.doc.model.contractbase.relationcontractId.length>0){
                angular.forEach(data.rst.doc.model.contractbase.relationcontractId, function(value,index,array){
                    if(value.thetype == 1 && data.rst.doc.model.contractbase.hasservicecontract == '是'){
                        $scope.ifGulian = true;
                        $scope.ifGulianBtn = true;
                        $scope.relationId = value.relationId;
                        $scope.relationContractno = value.contractno;
                    }
                    if(value.thetype == 2){//如果配套销售 有关联合同的时候
                        $scope.matingContract = value.contractNo;
                        $scope.matingContractId = value.relationId;
                    }
                });

            }






            $scope.apCot = true;
            $scope.processlog = data.rst.processlog;
            $scope.doc = data.rst.doc.model;
            //判断是否显示关联合同相关信息
            if(data.rst.doc.model.contractbase.contracttype == '项目' || data.rst.doc.model.contractbase.contracttype == '分销'){
                $scope.ifGulian = true;
            }
            /*if(data.rst.doc.model.contractbase.contracttype == '项目' && data.rst.doc.model.contractbase.hasservicecontract == '是'){
             $scope.ifGulianBtn = true;
             }*/
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
                if(data.rst.processlog.length>1){
                    $scope.apCot = true;
                }else {
                    $scope.apCot = false;
                }
            }
            if ($scope.contracttype == '分销' ) {//|| data.rst.doc.model.othercost.length>0
                //if(data.rst.doc.model.othercost.contractId){
                $scope.xsCbfx = true;//显示成本分析
                $scope.ifcbfxCy = true;//不可编辑成本分析
                // }
            }else if($scope.contracttype == '配套销售'){
                $scope.xsCbfx = false;//不显示成本分析
            }else{
                if($scope.cbfxPrev == true && $scope.agreeBtn == true){
                    $scope.xsCbfx = true;//显示成本分析
                    $scope.ifcbfxCy = false;//编辑成本分析
                    if(data.rst.doc.model.contractbase.cp == '0'){
                        $scope.cpThirdIf = true;
                    }
                }else if(data.rst.doc.model.othercost.length>0){
                    $scope.xsCbfx = true;//只显示成本分析
                    $scope.ifcbfxCy = true;//编辑成本分析
                }
            }

            var cbfxObj = $scope.cbfxObj = {};
            //做成本分析的时候调用此接口
            if($scope.cbfxPrev == true && $scope.agreeBtn == true ) {//&& data.rst.doc.model.othercost.length <=0
                var initcost = apply.initcost({contractId:$scope.contractId});
                initcost.success(function(data){
                    if(data.code == 200){
                        cbfxObj = $scope.cbfxObj = data.rst;
                        $scope.$watchCollection('cbfxObj.t1[0]',function(newValue,oldValue, scope){
                            $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                            $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                            $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                            $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                            $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                            $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                            if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                                $scope.companygain = 0;
                                $scope.salesgain = 0;
                            }
                        });
                        $scope.$watchCollection('cbfxObj.t1[1]',function(newValue,oldValue, scope){
                            $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                            $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                            $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                            $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                            $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                            $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                            if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                                $scope.companygain = 0;
                                $scope.salesgain = 0;
                            }
                        });
                        $scope.$watchCollection('cbfxObj.t1[2]',function(newValue,oldValue, scope){
                            $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                            $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                            $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                            $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                            $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                            $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                            if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                                $scope.companygain = 0;
                                $scope.salesgain = 0;
                            }
                        });
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            }else {
                if(data.rst.doc.model.othercost.length>0){
                    cbfxObj.t1 = data.rst.doc.model.othercost;
                    if(data.rst.doc.model.purchase != undefined){
                        cbfxObj.t2 = data.rst.doc.model.purchase;
                    }
                    if(data.rst.doc.model.delta != undefined){
                        cbfxObj.t3 = data.rst.doc.model.delta;
                    }
                    $scope.$watchCollection('cbfxObj.t1[0]',function(newValue,oldValue, scope){
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                        if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                            $scope.companygain = 0;
                            $scope.salesgain = 0;
                        }
                    });
                    $scope.$watchCollection('cbfxObj.t1[1]',function(newValue,oldValue, scope){
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                        if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                            $scope.companygain = 0;
                            $scope.salesgain = 0;
                        }
                    });
                    $scope.$watchCollection('cbfxObj.t1[2]',function(newValue,oldValue, scope){
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                        if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                            $scope.companygain = 0;
                            $scope.salesgain = 0;
                        }
                    });
                    if ($scope.contracttype == '分销' && $scope.xsCbfx == true && $rootScope.opprev.contractOrder_costanalysis == true) {
                        var fenxiaointerestsap = apply.fenxiaointerestsap({contractId: $scope.contractId});
                        fenxiaointerestsap.success(function (datafe) {
                            if (datafe.code == 200) {
                                if (datafe.rst.data.cost) {
                                    $scope.xMaoliBHan = datafe.rst.data.cost.sellinterest;//销售毛利率
                                    $scope.xMaoliHan = datafe.rst.data.cost.sellinterestContainTax;//销售含税利率
                                    $scope.salesgain = datafe.rst.data.cost.sellcontractInterest;//销售合约利率
                                    $scope.maoliBHan = $scope.ORDER_DATA.contractbase.interest;//毛利率
                                    $scope.maoliHan = $scope.ORDER_DATA.contractbase.interestContainTax;//含税利率
                                    $scope.companygain = $scope.ORDER_DATA.contractbase.contractInterest;//合约利率
                                    if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                                        $scope.companygain = 0;
                                        $scope.salesgain = 0;
                                    }
                                }
                            } else {
                                swal(datafe.msg, datafe.rst, "warning");
                                $scope.xMaoliBHan = 0;//销售毛利率
                                $scope.xMaoliHan = 0;//销售含税利率
                                $scope.salesgain = 0;//销售合约利率
                                return false
                            }
                        });
                    }

                }
            }
            $scope.loading = false;
            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ORDER_DATA.contractbase.stomer, 'id':$scope.ORDER_DATA.contractbase.stomerid};

                $scope.$broadcast('transfer.type', param);
            } catch (e) {}
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function(error){
        swal(error, "", "warning");
    });
	// 2017-06-19 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.contractbase.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.contractbase.salesorderid.length ? $scope.ORDER_DATA.contractbase.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = apply.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    $scope.piPeiBox = function(type){

        $( "#cgsqdBox2" ).dialog({
            autoOpen: false,
            width: 850,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#cgsqfxdTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择采购申请单！", "", "warning");
                            return false;
                        }
                        $.each(zCheckAc,function(){
                            var par = $(this).closest('tr');
                            var faId = par.find("td:eq(1)").html();
                            lsArr.push(faId);
                        });
                        var purStr = lsArr.join(",");
                        var boxParam = {};
                        boxParam.processId = $stateParams.processId;
                        boxParam.purchaseId = purStr;
                        boxParam.redo = type;
                        var matchcost = apply.matchcost(boxParam);
                        matchcost.success(function(data){
                            if(data.code == 200){
                                var cbfxObj = $scope.cbfxObj = data.rst;
                            }
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#cgsqdBox2" ).dialog( "open" );
        /*var jcParam = {'userid': $scope.ORDER_DATA.contractbase.salesid,'escompany':$scope.ORDER_DATA.escompany, 'isservice': isservice, 'getgoods':0};
         var listJc = apply.listCgd(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.cpfxcgList = data.rst.data.items;
         }else {
         swal(data.msg, "", "warning");
         }
         });*/

    };
    $scope.cbfxSearch = function(){
        if($scope.code=='' && $scope.clientname=='' &&$scope.supplierId == ''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var jcParam = {'limit':1000,'escompany':$scope.ORDER_DATA.escompany,'userid': $scope.ORDER_DATA.stomerid,'isservice': isservice, 'getgoods':1, 'code':$scope.code, 'supplierorderid':$scope.supplierorderid,'clientname':$scope.clientname};
        var listCgd = apply.listCgd(jcParam);
        listCgd.success(function(data){
            if(data.code == 200){
                $scope.cpfxcgList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.allCheck=function(event){
        var currentElement = event.target;
        var zCheck = $(currentElement).closest(".zTable").find(".zCheck");
        if($(currentElement).hasClass("allCheckAc")){
            $(currentElement).attr("class",'allCheck');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck');
            });
        }else {
            $(currentElement).attr("class",'allCheckAc');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck zCheckAc');
            });
        }
        event.stopPropagation();
    };
    $scope.zCheck = function(event){
        var currentElement = event.target;
        if($(currentElement).hasClass("zCheckAc")){
            $(currentElement).attr("class",'zCheck');
        }else {
            $(currentElement).attr("class",'zCheck zCheckAc');
        }
        event.stopPropagation();
    };
    var enumlist = apply.enumlist();
    enumlist.success(function(data) {
        $scope.ZZCP =  data.rst.enum.ZZCP;
    }).error(function(error){
        alert(error);
    });

    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){

        var param = {};
        param.doc = $scope.doc;
        if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false) {
            var requiredObj = $scope.cbfxForm.$error;
            angular.forEach(requiredObj, function (keyData) {
                keyData.$dirty = true;
            })
            if (!$scope.cbfxForm.$valid) {
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
            var mating = $scope.cbfxObj.t1[0].mating*1 + $scope.cbfxObj.t1[1].mating*1 + $scope.cbfxObj.t1[2].mating*1+$scope.cbfxObj.t1[0].third*1 + $scope.cbfxObj.t1[1].third*1 + $scope.cbfxObj.t1[2].third*1;
            if(param.doc.contractbase.cp == '1' && mating <= 0){
                swal('配套采购不能都小于0', "", "warning");
                return false;
            }
        }

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addInside;
        if(param.doc.contractbase.contracttype == '配套销售'){
            addInside = apply.addInsideCognatecontract(param);
        }else {
            addInside = apply.addInside(param);
        }
        addInside.success(function(data){
            if(data.code == 200){
                //不是分销类型的合同并且是采购专员权限并且没有做过成本分析的时候才能提交成本分析
                if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false){
                    var savecost = apply.savecost({contractId: $scope.contractId, othercost: $scope.cbfxObj.t1});
                    savecost.success(function (data) {
                        if (data.code == 200) {
                            window.location.reload();
                        } else {
                            swal(data.msg, '', "error");
                        }
                    });
                }else {
                    window.location.reload();
                }

            }else {
                swal(data.msg, "", "warning");
            }
        });

    };

    $scope.applyAgree = function(){

        var param = {};
        param.doc = $scope.doc;
        if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false) {
            var requiredObj = $scope.cbfxForm.$error;
            angular.forEach(requiredObj, function (keyData) {
                keyData.$dirty = true;
            })
            if (!$scope.cbfxForm.$valid) {
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
            var mating = $scope.cbfxObj.t1[0].mating*1 + $scope.cbfxObj.t1[1].mating*1 + $scope.cbfxObj.t1[2].mating*1+$scope.cbfxObj.t1[0].third*1 + $scope.cbfxObj.t1[1].third*1 + $scope.cbfxObj.t1[2].third*1;
            if(param.doc.contractbase.cp == '1' && mating <= 0){
                swal('配套采购不能都小于0', "", "warning");
                return false;
            }
        }

        param.doc.contractbase.companygain = $scope.companygain;
        param.doc.contractbase.salesgain = $scope.salesgain;
        param.doc.contractbase.interest = $scope.maoliBHan;//毛利率
        param.doc.contractbase.interestContainTax = $scope.maoliHan;//含税利率
        param.doc.contractbase.contractInterest = $scope.companygain;//合约利率
        param.doc.contractbase.sellinterest = $scope.xMaoliBHan;//销售毛利率
        param.doc.contractbase.sellinterestContainTax = $scope.xMaoliHan;//销售含税利率
        param.doc.contractbase.sellcontractInterest = $scope.salesgain;//销售合约利率
        if($scope.ywysPrev == true && $scope.ORDER_DATA.contractbase.servicemethod == '市场拓展服务'){
            $scope.ORDER_DATA.contractbase.receivabletype == '修改模式';
            $scope.ywDisable = true;
        }else{
            $scope.ywDisable = false;
        }
        if($scope.ywysPrev == true && ($scope.ORDER_DATA.contractbase.receivabletype == undefined || $scope.ORDER_DATA.contractbase.receivabletype == '' )){
            swal("请在基本信息里面填写业务应收创建方式！", "", "warning");
            return false;
        }else if($scope.ywysPrev == true && $scope.ORDER_DATA.contractbase.receivabletype != undefined){
            param.doc.contractbase.receivabletype = $scope.ORDER_DATA.contractbase.receivabletype;
        }
        if($scope.ywysPrev == true && ($scope.ORDER_DATA.contractbase.effectdate == undefined || $scope.ORDER_DATA.contractbase.effectdate == '' )){
            swal("请在基本信息里面填写签订日期！", "", "warning");
            return false;
        }else if($scope.ywysPrev == true && $scope.ORDER_DATA.contractbase.effectdate != undefined){
            param.doc.contractbase.effectdate = $scope.ORDER_DATA.contractbase.effectdate;
        }
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        if($scope.ifGulianBtn){
            swal({
                title: "此合同有关联合同，是否一同审批通过",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText:'取消',
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定审批",
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function () {
                var listcandidates = apply.listcandidates(param);
                listcandidates.success(function (data) {
                    if (data.code == 200) {
                        $scope.candidates = data.rst.candidates;
                        // if( ($scope.contracttype == '项目' || $scope.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or'|| $scope.candidates[0].coop !=='and')) {
                        if( $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or'|| $scope.candidates[0].coop !=='and')) {
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
                });
            });
        }else {
            var listcandidates = apply.listcandidates(param);
            listcandidates.success(function (data) {
                if (data.code == 200) {
                    $scope.candidates = data.rst.candidates;
                    // if( ($scope.contracttype == '项目' || $scope.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
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
                }
            });
        }


        // 提交
        $scope.applyFn = function (selIndex) {

            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            //不是分销类型的合同并且是采购专员权限并且没有做过成本分析的时候才能提交成本分析
            if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false){
                var savecost = apply.savecost({contractId: $scope.contractId, othercost: $scope.cbfxObj.t1});
                savecost.success(function (data) {
                    if (data.code == 200) {
                        var applyAgree = apply.agree(param);
                        applyAgree.success(function (data) {
                            if (data.code == 200) {
                                swal({
                                    title: "审批成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回销售合同待办",
                                    closeOnConfirm: true
                                }, function () {
                                    // window.location.href = '/index.html#/index';
	                                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                                });
                                if(data.rst.status === 'done') {
                                    for(var i = $scope.processlog.length-1;i>=0;i--){
                                        if($scope.processlog[i].nodetype == 'purchase' || $scope.processlog[i].nodetype == 'sale_assistant'){
                                            $scope.msgReceiver=$scope.processlog[i].sender.login;
                                            break;
                                        };
                                    }
                                    if($scope.msgReceiver){
                                        var _title = '合同号：'+$scope.ORDER_DATA.contractbase.contractno+'，客户名称：'+$scope.ORDER_DATA.contractbase.stomer+'，项目名：'+$scope.ORDER_DATA.contractbase.project+'，合同金额：'+$scope.ORDER_DATA.contractbase.contractmoney+'合同生效。';
                                        var msg = {
                                            ntype: 'system',
                                            title: _title,
                                            content: "合同商务条款："+$scope.ORDER_DATA.contractbase.contactreceivablesconditionshowarea,
                                            receivers: $scope.msgReceiver,
                                            sendtype: "listcast"
                                        };
                                        sendMessage(message, msg, function(result){
                                            console.log(result);
                                        });
                                    }
                                }
                            }else if(data.code == 30){
                                var msgtip = data.msg;
                                if(msgtip.indexOf("sap错误") == 0){
                                    swal("SAP正在处理请稍后再提交!", '', "error");
                                    return false;
                                }else {
                                    swal(data.msg, '', "error");
                                    return false;
                                }
                            } else {
                                swal("提交失败！", '', "error");
                            }
                        }).error(function (error) {
                            swal(error, "", "warning");
                        });
                    } else {
                        swal(data.msg, '', "error");
                    }
                });
            }else {

                var applyAgree;
                if($scope.ORDER_DATA.contractbase.contracttype == '配套销售'){
                    applyAgree = apply.agreeCognatecontract(param);
                }else{
                    applyAgree = apply.agree(param);
                }
                applyAgree.success(function(data){
                    if(data.code == 200){
                        swal({
                            title: "审批成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回我的单据",
                            closeOnConfirm: true
                        }, function(){/* window.location.href='/index.html#/index';*/
	                        window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                        });
                        if(data.rst.status === 'done') {
                            for(var i = $scope.processlog.length-1;i>=0;i--){
                                if($scope.processlog[i].nodetype == 'purchase' || $scope.processlog[i].nodetype == 'sale_assistant'){
                                    $scope.msgReceiver=$scope.processlog[i].sender.login;
                                    break;
                                };
                            }
                            if($scope.msgReceiver){
                                var _title = '合同号：'+$scope.ORDER_DATA.contractbase.contractno+'，客户名称：'+$scope.ORDER_DATA.contractbase.stomer+'，项目名：'+$scope.ORDER_DATA.contractbase.project+'，合同金额：'+$scope.ORDER_DATA.contractbase.contractmoney+'合同生效。';
                                var msg = {
                                    ntype: 'system',
                                    title: _title,
                                    content: "合同商务条款："+$scope.ORDER_DATA.contractbase.contactreceivablesconditionshowarea,
                                    receivers: $scope.msgReceiver,
                                    sendtype: "listcast"
                                };
                                sendMessage(message, msg, function(result){
                                    console.log(result);
                                });
                            }
                        }
                    }else {
                        swal("提交失败！", '', "error");
                    }
                }).error(function(error){
                    swal(error, "", "warning");
                });
            }

        };






        // $scope.applyFn(-1);
    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree;
        if($scope.ORDER_DATA.contractbase.contracttype == '配套销售'){
            disagree = apply.disagreeCognatecontract(param);
        }else{
            disagree = apply.disagree(param);
        }
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售合同待办",
                    closeOnConfirm: true
                }, function(){ //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel;
        if($scope.ORDER_DATA.contractbase.contracttype == '配套销售'){
            cancel = apply.cancelCognatecontract(param);
        }else{
            cancel = apply.cancel(param);
        }
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售合同待办",
                    closeOnConfirm: true
                }, function(){   //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall;
        if($scope.ORDER_DATA.contractbase.contracttype == '配套销售'){
            recall = apply.recallCognatecontract(param);
        }else{
            recall = apply.recall(param);
        }
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
            swal(error, "", "warning");
        });
    }
}]);

//合同基本信息变更
contractApp.controller('contractBaseChangeAddCtrl', ['$scope','$filter','$stateParams','$rootScope','contractServices',function($scope,$filter,$stateParams,$rootScope,service){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var contractId = $scope.contractId = '';
    var relationcontractId = [];
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };

    if($stateParams.processId){
        var detailBaseContract = service.detailBaseContract({sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId});
        detailBaseContract.success(function(data) {
            $scope.ORDER_DATA = data.rst.doc.model.contractbase;
            $scope.contracttype = data.rst.doc.model.contractbase.contracttype;
            //$scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*100)/100;
            $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
            var getsalesorderrebate = service.getsalesorderrebate({groupno:data.rst.doc.model.contractbase.groupno,salesorderid:data.rst.doc.model.contractbase.salesorderid[0].orderid});
            getsalesorderrebate.success(function(data2) {
                if(data.code == 200){
                    $scope.ZREBATE_USED = Math.abs(data2.rst.ZREBATE_USED*1);
                }
            });
            if(data.rst.doc.model.contractbase.contracttype != '专有服务'){
                $scope.zyfwIf = true;
            }
            if(data.rst.doc.model.contractbase.deliverwaycheck.type1){
                $scope.delive_type1 = true;
            }
            if(data.rst.doc.model.contractbase.deliverwaycheck.type2){
                $scope.delive_type2 = true;
                $scope.ifEmail = true;
            }
            if(data.rst.doc.model.contractbase.deliverwaycheck.type3){
                $scope.delive_type3 = true;
            }
            if(data.rst.doc.model.contractbase.escompany == '中建材集团进出口公司'){
                $scope.ifxf = false;
            }
            if(data.rst.doc.model.contractbase.canRepairRebate == 1){
                $scope.fdDisable = true;
            }
            if(data.rst.doc.model.contractbase.attachment[0]&&data.rst.doc.model.contractbase.attachment[0]!=null){
                $scope.uploadFile = data.rst.doc.model.contractbase.attachment[0].filePath;
                $scope.fileName = data.rst.doc.model.contractbase.attachment[0].fileName;
                $scope.uploadTrue = true;
            }
            $scope.userLinkList = data.rst.doc.model.contractbase.receiver;
            $scope.rebateitem = data.rst.doc.model.contractbase.rebateitem;
            $.each(data.rst.doc.model.contractbase.contactreceivablescondition,function(index,value){
                var type = value.thetype;
                switch ($scope.ORDER_DATA.contracttemplate)
                {
                    case '华为硬件标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前']
                        }else if(type=='货款'){
                            $scope.cond[index] = ['收到货物']
                        }
                        break;
                    case '华为硬件非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                        }else if(type=='货款'){
                            $scope.cond[index] = ['收到货物','其他条件']
                        }
                        break;
                    case '华为服务标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case '华为服务非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case '自有服务标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case '自有服务非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                        }else if(type=='服务款'){
                            $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                        }
                        break;
                    case 'Oracle标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前']
                        }else if(type=='货款'){
                            $scope.cond[index] = ['收到货物']
                        }
                        break;
                    case '非标准合同':
                        if(type=='预付款'){
                            $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                        }else if(type=='其他付款'){//手动填写
                            $scope.cond[index] = ['其他条件']
                        }
                        break;
                }
            });
            $scope.contactreceivablescondition = data.rst.doc.model.contractbase.contactreceivablescondition;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.contractId = data.rst.contractId;
            $scope.relationId = data.rst.relationId;
            switch ($scope.ORDER_DATA.contracttemplate)
            {
                case '华为硬件标准合同':
                    $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                    $scope.hkttk = true;
                    //合同收款条款
                    $scope.hkIf = true;
                    $scope.qtfkIf = false;
                    $scope.qtfwIf = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                    //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                    $scope.kjIf = true;
                    $scope.kjqyIf = true;
                    $scope.fpkjOptionZy = true;
                    $scope.fpkjOption = false;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    //$scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                    $scope.jhtkIf = true;
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkIf = true;
                    $scope.cpbxtkXs = true;
                    //$scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = false;
                    $scope.xmgcfwfXs2 = true;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = true;
                    //是否有附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为硬件非标准合同':
                    $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                    $scope.hkttk = true;
                    //合同收款条款
                    $scope.hkIf = true;
                    $scope.qtfkIf = false;
                    $scope.qtfwIf = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //$scope.ORDER_DATA.receiptdesc = '';
                    //$scope.ORDER_DATA.receiptdescarea = '';
                    $scope.kjIf = false;
                    $scope.kjqyIf = false;
                    $scope.fpkjOptionZy = true;
                    $scope.fpkjOption = false;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    //$scope.ORDER_DATA.deliverconditionarea = '';
                    $scope.jhtkIf = false;
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkIf = false;
                    $scope.cpbxtkXs = true;
                    // $scope.ORDER_DATA.guarantyterm = '';
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = true;
                    $scope.xmgcfwfXs2 = false;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = false;
                    //是否有附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    // $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务标准合同':
                    $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                    $scope.hkttk = false;
                    //合同收款条款
                    $scope.hkIf = false;
                    $scope.qtfkIf = false;
                    $scope.qtfwIf = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                    // $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                    $scope.kjIf = true;
                    $scope.kjqyIf = true;
                    $scope.fpkjOptionZy = false;
                    $scope.fpkjOption = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    // $scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkIf = true;
                    $scope.cpbxtkXs = true;
                    $scope.ORDER_DATA.guarantyterm = '参见服务清单';
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否有附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务非标准合同':
                    $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                    $scope.hkttk = false;
                    //合同收款条款
                    $scope.hkIf = false;
                    $scope.qtfkIf = false;
                    $scope.qtfwIf = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    // $scope.ORDER_DATA.receiptdesc = '手工输入';
                    // $scope.ORDER_DATA.receiptdescarea = '手工输入';
                    $scope.kjIf = false;
                    $scope.kjqyIf = false;
                    $scope.fpkjOptionZy = false;
                    $scope.fpkjOption = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkIf = false;
                    $scope.cpbxtkXs = true;
                    //$scope.ORDER_DATA.guarantyterm = '';
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否有附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '自有服务标准合同':
                    $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                    $scope.hkttk = false;
                    //合同收款条款
                    $scope.hkIf = false;
                    $scope.qtfkIf = false;
                    $scope.qtfwIf = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                    //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                    $scope.kjIf = true;
                    $scope.kjqyIf = true;
                    $scope.fpkjOptionZy = false;
                    $scope.fpkjOption = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkIf = true;
                    $scope.cpbxtkXs = true;
                    $scope.ORDER_DATA.guarantyterm = '待法务确定';
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否有附件
                    $scope.ifupload = false;
                    //合同收款条款
                    $scope.ifHttk = false;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                    break;
                case '自有服务非标准合同':
                    $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                    $scope.hkttk = false;
                    //合同收款条款
                    $scope.hkIf = false;
                    $scope.qtfkIf = false;
                    $scope.qtfwIf = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //$scope.ORDER_DATA.receiptdesc = '手工输入';
                    //$scope.ORDER_DATA.receiptdescarea = '手工输入';
                    $scope.kjIf = false;
                    $scope.kjqyIf = false;
                    $scope.fpkjOptionZy = false;
                    $scope.fpkjOption = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = true;
                    $scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkIf = false;
                    $scope.cpbxtkXs = true;
                    //$scope.ORDER_DATA.guarantyterm = '';
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否有附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '非标准合同':
                    $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                    $scope.hkttk = false;
                    //合同收款条款
                    $scope.hkIf = false;
                    $scope.qtfkIf = true;
                    $scope.qtfwIf = false;
                    //发票开具说明
                    $scope.fpkjDes = false;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //是否有附件
                    $scope.ifupload = true;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
            }
            if($scope.ORDER_DATA.contracttype == '分销'){
                $scope.ifFxiao = false;
                $scope.ifBillCg = true;
                $scope.fxType = true;
            }else {
                $scope.ifFxiao = true;
                $scope.ifBillCg = false;
            }
            if($scope.ORDER_DATA.contracttype != '项目' && $scope.ORDER_DATA.contracttype != '专有服务'){
                $scope.fxType = true;
                $scope.cpDisable = true;
            }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1){
                $scope.cpDisable = true;
            }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.isbody==0){//附属合同不能变更CP
                $scope.cpDisable = true;
            }
            if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                $scope.ifxf = false;
            }else {
                if($scope.ORDER_DATA.contractmoney=='0' || data.rst.doc.model.contractbase.contracttype == '专有服务'|| data.rst.doc.model.contractbase.contracttype == '配套销售'){
                    $scope.ifxf = false;
                }else{
                    $scope.ifxf = true;
                }
            }

            if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具增值税专用发票'){
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
            }else if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具服务发票'){
                $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
            }else {
                $scope.ORDER_DATA.receiptdescarea = '';
            }
            if($scope.ORDER_DATA.sktj=='按比例'){
                $scope.skblIf = true;
                $scope.skjeIf = false;
            }else{
                $scope.skblIf = false;
                $scope.skjeIf = true;
            }
        });
    }else {
        var startchangeBase;
        if($stateParams.conType=='配套销售'){
            startchangeBase = service.cognatestartchangeBase({contractId:$stateParams.conid});
        }else {
            startchangeBase = service.startchangeBase({contractId:$stateParams.conid});
        }

        startchangeBase.success(function(data) {
            if(data.code == 200){
                $scope.ORDER_DATA = data.rst.contractbase;
                //$scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*100)/100;
                $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
                $scope.contractId = data.rst._id;
                var getsalesorderrebate = service.getsalesorderrebate({groupno:data.rst.contractbase.groupno,salesorderid:data.rst.contractbase.salesorderid[0].orderid});
                getsalesorderrebate.success(function(data2) {
                    if(data.code == 200){
                        $scope.ZREBATE_USED = Math.abs(data2.rst.ZREBATE_USED*1);
                    }
                });
                $scope.contracttype = data.rst.contractbase.contracttype;
                if(data.rst.contractbase.contracttype != '专有服务'){
                    $scope.zyfwIf = true;
                }
                if(data.rst.contractbase.deliverwaycheck&&data.rst.contractbase.deliverwaycheck.type1){
                    $scope.delive_type1 = true;
                }
                if(data.rst.contractbase.deliverwaycheck&&data.rst.contractbase.deliverwaycheck.type2){
                    $scope.delive_type2 = true;
                    $scope.ifEmail = true;
                }
                if(data.rst.contractbase.deliverwaycheck&&data.rst.contractbase.deliverwaycheck.type3){
                    $scope.delive_type3 = true;
                }
                if(data.rst.contractbase.attachment[0]&&data.rst.contractbase.attachment[0]!=null){
                    $scope.uploadFile = data.rst.contractbase.attachment[0].filePath;
                    $scope.fileName = data.rst.contractbase.attachment[0].fileName;
                    $scope.uploadTrue = true;
                }
                if(data.rst.contractbase.canRepairRebate == 1){
                    $scope.fdDisable = true;
                }
                $scope.userLinkList = data.rst.contractbase.receiver;
                $scope.rebateitem = data.rst.contractbase.rebateitem;
                $scope.contactreceivablescondition = data.rst.contractbase.contactreceivablescondition;
                $.each(data.rst.contractbase.contactreceivablescondition,function(index,value){
                    var type = value.thetype;
                    switch ($scope.ORDER_DATA.contracttemplate)
                    {
                        case '华为硬件标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物']
                            }
                            break;
                        case '华为硬件非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物','其他条件']
                            }
                            break;
                        case '华为服务标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '华为服务非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '自有服务标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '自有服务非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case 'Oracle标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物']
                            }
                            break;
                        case '非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                            }else if(type=='其他付款'){//手动填写
                                $scope.cond[index] = ['其他条件']
                            }
                            break;
                    }
                });
                //判断是否有关联合同
                if(data.rst.contractbase.relationcontractId.length>0){
                    angular.forEach(data.rst.contractbase.relationcontractId, function(value,index,array){
                        /*if(value.thetype == 1 && data.rst.contractbase.hasservicecontract == '是'){
                         $scope.fushuHet = true;
                         $scope.relationId = value.relationId;

                         }*/
                        if(value.thetype == 2){//如果配套销售 有关联合同的时候
                            $scope.matingContract = value.contractNo;
                            $scope.matingContractId = value.relationId;
                        }
                    });

                }
                switch ($scope.ORDER_DATA.contracttemplate)
                {
                    case '华为硬件标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = true;
                        //合同收款条款
                        $scope.hkIf = true;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = true;
                        $scope.fpkjOption = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        //$scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                        $scope.jhtkIf = true;
                        $scope.jhtkXs = true;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = true;
                        $scope.xmgcfwfXs1 = false;
                        $scope.xmgcfwfXs2 = true;
                        $scope.xmgcfuXs = true;
                        $scope.xmgcfsTr = true;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = true;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为硬件非标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = true;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '';
                        // $scope.ORDER_DATA.receiptdescarea = '';
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = true;
                        $scope.fpkjOption = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        //$scope.ORDER_DATA.deliverconditionarea = '';
                        $scope.jhtkIf = false;
                        $scope.jhtkXs = true;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = true;
                        $scope.xmgcfwfXs1 = true;
                        $scope.xmgcfwfXs2 = false;
                        $scope.xmgcfuXs = true;
                        $scope.xmgcfsTr = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为服务标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = true;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '参见服务清单';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = true;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为服务非标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        /*$scope.ORDER_DATA.receiptdesc = '手工输入';
                         $scope.ORDER_DATA.receiptdescarea = '手工输入';*/
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = false;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '自有服务标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = true;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '待法务确定';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = false;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                        break;
                    case '自有服务非标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = true;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '手工输入';
                        //$scope.ORDER_DATA.receiptdescarea = '手工输入';
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = false;
                        $scope.jhfs1 = true;
                        // $scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '非标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = true;
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkXs = false;
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        // $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                }
                if($scope.ORDER_DATA.contracttype == '分销'){
                    $scope.ifFxiao = false;
                    $scope.ifBillCg = true;
                    $scope.fxType = true;
                }else {
                    $scope.ifFxiao = true;
                    $scope.ifBillCg = false;
                }

                if($scope.ORDER_DATA.contracttype != '项目' && $scope.ORDER_DATA.contracttype != '专有服务'){
                    $scope.fxType = true;
                    $scope.cpDisable = true;
                }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1){
                    $scope.cpDisable = true;
                }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.isbody==0){//附属合同不能变更CP
                    $scope.cpDisable = true;
                }
                if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                    $scope.ifxf = false;
                }else {
                    if($scope.ORDER_DATA.contractmoney=='0' || data.rst.contractbase.contracttype == '专有服务' || data.rst.contractbase.contracttype == '配套销售'){
                        $scope.ifxf = false;
                    }else{
                        $scope.ifxf = true;
                    }
                }
                if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具增值税专用发票'){
                    $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                }else if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具服务发票'){
                    $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                }else {
                    $scope.ORDER_DATA.receiptdescarea = '';
                }
                if($scope.ORDER_DATA.sktj=='按比例'){
                    $scope.skblIf = true;
                    $scope.skjeIf = false;
                }else{
                    $scope.skblIf = false;
                    $scope.skjeIf = true;
                }
            }else{
                swal(data.msg, "", "warning");
            }
        });
    }

    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];
    var fdList = $scope.fdList = [];
    var Addrebateitem  = $scope.Addrebateitem = [];
    var rebateitem = $scope.rebateitem  = [];
    // 搜索产品线
    $scope.productlineFn = function (name) {
        $scope.ORDER_DATA.productId  = "";
        var listCpx = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
        // var listCpx = payment.listCpx({cpxname:name});
        listCpx.success(function(data) {
            if (data.code == 200) {
                $scope.productlineList = data.rst.data.enum.CPX;
                if (!$scope.productlineList.length) {
                    $scope.productlineList.push({
                        'name': '未找到',
                        'value': ''
                    });
                }
            } else {
                //swal(data.msg, "", "warning");
                alert('error')
            }
        })
    };
    $scope.selProductlineFn = function (obj) {
        $scope.ORDER_DATA.product  = obj.name;
        $scope.ORDER_DATA.productId  = obj.code;
        $scope.productlineList = [];
    };
    $scope.sktj = function(type){
        //判断收款条件
        if(type=='按比例'){
            $scope.skblIf = true;
            $scope.skjeIf = false;
        }else{
            $scope.skblIf = false;
            $scope.skjeIf = true;
        }
        $scope.contactreceivablescondition = [];
    };
    $scope.httkAdd = function(type){
        if(type == 'sktkList'){//冲抵核销信息
            var obj= {type:'', scale:'', money:'', days:'', method:'', cond:''};
            $scope.contactreceivablescondition.push(obj);
        }
    };
    $scope.httkDel = function(idx,type){
        $scope.contactreceivablescondition.splice(idx,1);
    };
    $scope.cond = [];
    $scope.fkType = function(index,type){//选择收款类型和合同模板来判断收款条件显示的值
        switch ($scope.ORDER_DATA.contracttemplate)
        {
            case '华为硬件标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '华为硬件非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物','其他条件']
                }
                break;
            case '华为服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '华为服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case 'Oracle标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='其他付款'){//手动填写
                    $scope.cond[index] = ['其他条件']
                }
                break;
        }
        /*if(type == '预付款' && $scope.ORDER_DATA.contracttemplate == '硬件标准合同'){
         //交货条款区域
         $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
         $scope.jhtkIf = true;
         }else if(type == '货款' && $scope.ORDER_DATA.contracttemplate == '硬件标准合同'){
         $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效后25个日历日内交货';
         $scope.jhtkIf = true;
         }*/
    };
    $scope.putMeg = function () {
        var shtml = '';
        var sArr = [];
        if ($scope.ORDER_DATA.sktj == undefined) {
            swal("请先选择收款条件", "", "warning");
            return false;
        }
        if ($scope.contactreceivablescondition.length <= 0) {
            swal("合同收款条款不能为空", "", "warning");
            return false;
        } else {
            var blTotal = 0;
            var monTotal = 0;
            angular.forEach($scope.contactreceivablescondition, function (datac) {
                if (datac.scale) {
                    /*blTotal += parseFloat(datac.scale);*/
                    blTotal = blTotal + Math.round(datac.scale*100)/100;
                } else if (datac.money) {
                    /*monTotal += parseFloat(datac.money);*/
                    monTotal = monTotal + Math.round(datac.money*100)/100;
                }
            });
            if ($scope.contactreceivablescondition[0].scale) {
                if (blTotal != 100) {
                    swal("收款比例之和总和不是100%，请修改", "", "warning");
                    return false;
                }
            }
            if ($scope.contactreceivablescondition[0].money) {

                var contrNum = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.ORDER_DATA.rebatemoney * 1) * 100) / 100;
                if (monTotal != contrNum) {
                    swal("收款金额之和不等于合同总金额减去返点金额" + contrNum + "，请修改", "", "warning");
                    return false;
                }
            }
        }
        switch ($scope.ORDER_DATA.contracttemplate) {
            case '华为硬件标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {//本合同生效之日起
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {//供方发货前
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {//本合同生效之日起
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '其他付款' && value.cond == '其他条件') {
                            shtml = '其他条件;';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '其他付款' && value.cond == '其他条件') {
                            shtml = '其他条件;';
                        }
                    }
                    sArr.push(shtml);
                });

                break;
            case '华为硬件非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.contactreceivablescondition.length == 1) {
                        if (value.thetype == '预付款') {
                            shtml = '需方于' + value.cond + value.days + '个日历日内支付供方合同全款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '服务款') {
                            shtml = '需方于' + value.cond + value.days + '日内支付供方合同全款，支付方式为' + value.method + ';';
                        }
                    } else {
                        if ($scope.ORDER_DATA.sktj == '按比例') {
                            if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                                shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                            } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                                shtml = '服务生效前' + value.days + '日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                            }
                            if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                            }
                        } else if ($scope.ORDER_DATA.sktj == '按金额') {
                            if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                                shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                            } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                                shtml = '服务生效前' + value.days + '日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                            }
                            if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                            }
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                            shtml = '服务生效前' + value.days + '日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                            shtml = '服务生效前' + value.days + '日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
        }

        if($scope.ORDER_DATA.contracttemplate!='自有服务标准合同'&&$scope.ORDER_DATA.contracttemplate!='自有服务非标准合同'){
            $scope.ORDER_DATA.contactreceivablesconditionshowarea = sArr.join('   ');
        }
    };
    $scope.ORDER_DATA.deliverwaycheck = {};
    $scope.deliverwaycheck = true;
    $scope.jhFs = function(type){
        var typeDate = null;
        if(type!=undefined){
            typeDate = type;
        }

        if(typeDate.type2 == true){
            $scope.ifEmail = true;
        }else {
            $scope.ifEmail = false;
        }
        if($scope.ORDER_DATA.deliverwaycheck.type1 || $scope.ORDER_DATA.deliverwaycheck.type2 || $scope.ORDER_DATA.deliverwaycheck.type3){
            $scope.deliverwaycheck = false;
        }else{
            $scope.deliverwaycheck = true;
        }
    };
    $scope.xmgcfw = function(type){
        if(type == '原厂提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程由原厂提供，服务内容详见服务清单';
        }else if(type == '供方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由供方安装';
        }else if(type == '需方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由需方安装';
        }
    };

    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type == 'userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type == 'excleData'){
            $scope.excleData.splice(idx,1);
        }
    };
    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = service.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    $scope.fdBox = function(){//销售返点
        $scope.fdTotal = 0;
        if($scope.ORDER_DATA.canRepairRebate == 1){
            swal("此合同不能变更返点", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.receipttype){
            swal("请先选择开票税率！", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称！", "", "warning");
            return false;
        }
        if(!$scope.ORDER_DATA.contractmoney){
            swal("请先填写合同总金额！", "", "warning");
            return false;
        }
        if(parseInt($scope.ORDER_DATA.contractmoney) == 0){
            swal("合同总金额为0不能选择返点！", "", "warning");
            return false;
        }
        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        var fParam = {'userid': $scope.ORDER_DATA.stomerid,'receipttype':$scope.ORDER_DATA.receipttype,'task':'contract'}//
        var listFd = service.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };;
//Oldrebatemoney SAP已使用返点 变更返点不能小于
    $scope.fdCheck = function(index,fdCode){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());

        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        });
        $scope.fdTotal = Math.round(checkAccount*100)/100;;
    };
    $scope.fdListDelet = function(index,type){
        var amTotal  = 0;
        if(type=='rebate'){
            $scope.rebateitem.splice(index,1);
            $.each($scope.rebateitem,function(key,value){
                amTotal+=parseFloat(value.amount3);
            });
        }else{
            $scope.Addrebateitem.splice(index,1);
            $.each($scope.Addrebateitem,function(key,value){
                amTotal+=parseFloat(value.amount3);
            });
            $.each($scope.rebateitem,function(key,value){
                amTotal+=parseFloat(value.amount3);
            });
        }
        $scope.ORDER_DATA.rebatemoney = amTotal;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
    };
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont=(allCheckCont*100+parseFloat(par2.find("td:eq(7)").html()*100))/100;
                });
                if(allCheckCont<kyToCount){
                    swal("选中的返点总金额"+allCheckCont+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder =  Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder =  Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(allCheckCont<kyToCount){
                    swal("您输入的返点金额"+kyToCount+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");

                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.invaliddate = par2.find("td:eq(3)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.desc = par2.find("td:eq(5)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.remainder = Math.round(par2.find("td:eq(7)").html()*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }


            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();

            $scope.$apply(function () {
                $scope.Addrebateitem = checkArr;
                $scope.ORDER_DATA.rebatemoney = parseFloat($scope.fdTotal)+parseFloat($scope.ORDER_DATA.rebatemoney);
                $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
            });
        }
    };
    $scope.fdBlur = function(amount,remainder,index){
        if(parseFloat(amount)>parseFloat(remainder)){
            $scope.ORDER_DATA.rebateitem[index].amount = remainder;
            swal('修改的金额不能大于'+remainder, "", "warning");
            return false;
        }
        var amountVal = $("#fdList").find('.amountVal');
        var amTotal = 0;
        $.each(amountVal,function(key,value){
            amTotal+=parseFloat($(this).val());
        });
        $scope.ORDER_DATA.rebatemoney = Math.round(amTotal*100)/100;
        $scope.ORDER_DATA.rebatepercent = Math.round($scope.ORDER_DATA.rebatemoney*10000/$scope.ORDER_DATA.contractmoney)/100;
    };


    $scope.addData = function(data,statue){
        var doc={},param= {},contractbase = {};
        contractbase  = data;
        var userLink = $scope.userLinkList.concat($scope.excleData);
        contractbase.receiver = userLink;//交货联系人
        if($scope.ORDER_DATA.receiver.length<=0){
            swal("请添加交货地点和联系人", "", "warning");
            return false;
        }
        var attachment= [];//附件字段
        var fileObj = {};
        fileObj.filePath = $scope.uploadFile;
        fileObj.fileName = $scope.fileName;
        attachment.push(fileObj);
        contractbase.attachment= attachment;
        if(!data.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        if(($scope.ORDER_DATA.rebatemoney*1)<$scope.ZREBATE_USED){
            swal("变更后返点使用金额不可小于该合同已消耗返点金额："+$scope.ZREBATE_USED+"元", "", "warning");
            return false;
        }
        if($scope.matingContractId && $scope.matingContractId != ''){//relationcontractId: [] #关联合同编号{relationId:,thetype:0/1} 0不一同审核,1 一同审核
            var reObj = {relationId:$scope.matingContractId,thetype:2,contractNo:$scope.matingContract};
            var relationcontractId = [];
            relationcontractId.push(reObj);
            contractbase.relationcontractId = relationcontractId;
        }
        contractbase.rebateitem = $scope.rebateitem.concat($scope.Addrebateitem);//销售返点
        if($scope.ORDER_DATA.contracttemplate !='自有服务标准合同') {
            if ($scope.contactreceivablescondition.length <= 0) {
                swal("合同收款条款不能为空", "", "warning");
                return false;
            } else {
                var blTotal = 0;
                var monTotal = 0;
                angular.forEach($scope.contactreceivablescondition, function (datac) {
                    if (datac.scale) {
                        /*blTotal += parseFloat(datac.scale);*/
                        blTotal = blTotal + Math.round(datac.scale*100)/100;
                    } else if (datac.money) {
                        /*monTotal += parseFloat(datac.money);*/
                        monTotal = monTotal + Math.round(datac.money*100)/100;
                    }
                });
                if ($scope.contactreceivablescondition[0].scale) {
                    if (blTotal != 100) {
                        swal("收款比例之和总和不是100%，请修改", "", "warning");
                        return false;
                    }
                }
                if ($scope.contactreceivablescondition[0].money) {
                    if($scope.ORDER_DATA.rebatemoney == undefined){
                        $scope.ORDER_DATA.rebatemoney = 0;
                    }
                    var contrNum = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.ORDER_DATA.rebatemoney*1)*100)/100;
                    if(monTotal != contrNum){
                        swal("收款金额之和不等于合同总金额减去返点金额"+contrNum+"，请修改", "", "warning");
                        return false;
                    }
                }
            }
        }
        if($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同'|| $scope.ORDER_DATA.contracttemplate == '华为服务标准合同'|| $scope.ORDER_DATA.contracttemplate == 'Oracle标准合同'){
            $scope.putMeg();
        }
        contractbase.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
        doc.contractbase = contractbase;
        doc.processId = $scope.processId;
        doc.nodeId = $scope.nodeId;
        doc.relationId = $scope.relationId;
        doc.contractId = $scope.contractId;
        param.doc = doc;
        if(statue == "save"){
            var addBaseContract;
            if($scope.contracttype == '配套销售'){
                addBaseContract = service.cognateaddBaseContract(param);
            }else{
                addBaseContract = service.addBaseContract(param);
            }
            addBaseContract.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                    $scope.relationId = data.rst.doc.relationId;
                }else {
                    swal(data.msg, "", "warning");
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
                param.processId = $scope.processId;
                param.nodeId = $scope.nodeId;
                var applyBaseContract;
                if($scope.contracttype == '配套销售'){
                    applyBaseContract = service.cognateapplyBaseContract(param);
                }else {
                    applyBaseContract = service.applyBaseContract(param);
                }
                applyBaseContract.success(function(data){
                    if(data.code == 200){

                        swal({
                            title: "提交成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回合同列表",
                            closeOnConfirm: true
                        }, function(){ window.location.href='/index.html#/contractOrder'; });
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            };
            var addBaseContract;
            if($scope.contracttype == '配套销售'){
                addBaseContract = service.cognateaddBaseContract(param);
            }else{
                addBaseContract = service.addBaseContract(param);
            }
            addBaseContract.success(function(data){
                if(data.code == 200){
                    $scope.candidates = data.rst.doc.candidates;
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                    $scope.relationId = data.rst.doc.relationId;
                    // if(($scope.ORDER_DATA.contracttype == '项目' || $scope.ORDER_DATA.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                    if( $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
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
                }else {
                    swal(data.msg, "", "warning");
                }
            });

        }
    }
}]);
contractApp.controller('baseChangeApplyCtrl', ['$scope','$rootScope','$stateParams','contractServices',function($scope,$rootScope,$stateParams,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    //var prevs = person.user.prevs;
    var newprev = $rootScope.billPrev;
    // 判断是不是商务节点
    $scope.business = $rootScope.billPrev.business_common;
    if(newprev.contractcost_page){
        $scope.cbfxPrev = true;//判断是否能够做成本分析
    }
    if(newprev.ywyscreate_page){
        $scope.ywyscreate_page = true;//判断是否能够做成本分析
    }
    /*if(prevs.length>0){
     angular.forEach(prevs,function(preData){
     if(preData.name == 'contractcost_page'){
     $scope.cbfxPrev = true;//判断是否能够做成本分析
     }else if(preData.name == 'ywyscreate_page'){
     //$scope.ywysPrev = true; //判断填写业务应收创建方式字段值
     $scope.ywyscreate_page = true
     }
     });
     }*/
    //基本信息
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var detailBaseContract = apply.detailBaseContract(param);
    detailBaseContract.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.contractId = data.rst.doc.model.contractId;
            $scope.candidates = data.rst.candidates;
            $scope.groupno = data.rst.doc.model.contractbase.groupno;
            $scope.cp = data.rst.doc.model.contractbase.cp;
            if(data.rst.doc.model.contractbase.transferway&&data.rst.doc.model.contractbase.transferway!=''){//运输方式
                var deliverwayObj = [{code:'01',name:'国内陆运'},{code:'02',name:'国内海运'},{code:'03',name:'国内空运'},{code:'04',name:'国际陆运'},{code:'05',name:'国际海运'},{code:'06',name:'国际空运'},{code:'07',name:'陆运快件'},{code:'08',name:'火车运输'},{code:'09',name:'快递'},{code:'10',name:'专车'},{code:'11',name:'自提'}, {
                    code: '12',
                    name: '无实物发货'
                }];
                var transferwayName = getField(deliverwayObj,'code',data.rst.doc.model.contractbase.transferway);
                $scope.transferway = transferwayName.name;
            }
            if(data.rst.doc.model.contractbase.cp == '0'){
                $scope.cpIf = true;
            }else {
                $scope.cpIf = false;
            }
            if(data.rst.doc.model.contractbase == '中建材集团进出口公司'){
                $scope.ifxf = false;
            }else {
                if(data.rst.doc.model.contractbase.contractmoney=='0' || data.rst.doc.model.contractbase.contracttype=='专有服务'|| data.rst.doc.model.contractbase.contracttype=='配套销售'){
                    $scope.ifxf = false;
                }else{
                    $scope.ifxf = true;
                }
            }
            switch (data.rst.doc.model.contractbase.contracttemplate)
            {
                case '华为硬件标准合同':
                    $scope.hkttk = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    // $scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = false;
                    $scope.xmgcfwfXs2 = true;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = true;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为硬件非标准合同':
                    $scope.hkttk = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = true;
                    $scope.xmgcfwfXs2 = false;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    // $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '自有服务标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = false;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                    break;
                case '自有服务非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = true;
                    $scope.jhfs2 = false;
                    // $scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case 'Oracle标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = false;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
            }
            /*if(data.rst.doc.model.contractbase.relationcontractId.length>0 && data.rst.doc.model.contractbase.hasservicecontract == '是'){//如果配套销售 有关联合同的时候 此处要修改

             $scope.relationId = data.rst.doc.model.contractbase.relationcontractId[0].relationId;
             $scope.ifGulian = true;
             $scope.ifGulianBtn = true;
             }*/
            if(data.rst.doc.model.contractbase.relationcontractId.length>0){
                angular.forEach(data.rst.doc.model.contractbase.relationcontractId, function(value,index,array){
                    if(value.thetype == 1 && data.rst.doc.model.contractbase.hasservicecontract == '是'){
                        $scope.ifGulian = true;
                        $scope.ifGulianBtn = true;
                        $scope.relationId = value.relationId;
                    }
                    if(value.thetype == 2){//如果配套销售 有关联合同的时候
                        $scope.matingContract = value.contractNo;
                        $scope.matingContractId = value.relationId;
                    }
                });

            }
            if (data.rst.doc.model.contractbase.attachment && data.rst.doc.model.contractbase.attachment[0] != null) {
                $scope.uploadTrue = true;
                $scope.uploadFile = data.rst.doc.model.contractbase.attachment[0].filePath;
                $scope.docName = data.rst.doc.model.contractbase.attachment[0].fileName;
            }


            $scope.apCot = true;
            $scope.processlog = data.rst.processlog;
            $scope.doc = data.rst.doc.model;
            //判断是否显示关联合同相关信息
            if(data.rst.doc.model.contractbase.contracttype == '项目' || data.rst.doc.model.contractbase.contracttype == '分销'){
                $scope.ifGulian = true;
            }
            /*if(data.rst.doc.model.contra1ctbase.contracttype == '项目' && data.rst.doc.model.contractbase.hasservicecontract == '是'){
             $scope.ifGulianBtn = true;
             }*/
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
                $scope.apCot = false;
            }
            $scope.contracttype = data.rst.doc.model.contractbase.contracttype;
            if($scope.contracttype == '配套销售'){
                $scope.xsCbfx = false;//不显示成本分析
            }else{
                if($scope.cbfxPrev == true && $scope.contracttype != '分销'&& $scope.agreeBtn == true){//分销是系统自动做成本分析
                    $scope.xsCbfx = true;//显示成本分析
                    $scope.ifcbfxCy = false;//编辑成本分析
                    if(data.rst.doc.model.contractbase.cp == '0'){
                        $scope.cpThirdIf = true;
                    }
                }else {
                    $scope.xsCbfx = true;//显示成本分析
                    $scope.ifcbfxCy = true;//不可编辑成本分析

                }
                if($scope.contracttype != '配套销售') {
                    var cbfxObj = $scope.cbfxObj = {};
                    $scope.cbfxObj.t1 = data.rst.doc.model.othercost;
                    $scope.$watchCollection('cbfxObj.t1[0]', function (newValue, oldValue, scope) {
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money * 1 + $scope.cbfxObj.t1[1].money * 1 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate * 1 + $scope.cbfxObj.t1[1].salerebate * 1 + $scope.cbfxObj.t1[2].salerebate * 1) - ($scope.cbfxObj.t1[0].orderscost * 1 + $scope.cbfxObj.t1[1].orderscost * 1 + $scope.cbfxObj.t1[2].orderscost * 1) + ($scope.cbfxObj.t1[0].purchaserebate * 1 + $scope.cbfxObj.t1[1].purchaserebate * 1 + $scope.cbfxObj.t1[2].purchaserebate * 1) - ($scope.cbfxObj.t1[0].outorderost * 1 + $scope.cbfxObj.t1[1].outorderost * 1 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].mating * 1 + $scope.cbfxObj.t1[1].mating * 1 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third * 1 + $scope.cbfxObj.t1[1].third * 1 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.maoliBHan = ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate / 1.17 + $scope.cbfxObj.t1[1].salerebate / 1.06 + $scope.cbfxObj.t1[2].salerebate * 1) - ($scope.cbfxObj.t1[0].orderscost / 1.17 + $scope.cbfxObj.t1[1].orderscost / 1.06 + $scope.cbfxObj.t1[2].orderscost * 1) + ($scope.cbfxObj.t1[0].purchaserebate / 1.17 + $scope.cbfxObj.t1[1].purchaserebate / 1.06 + $scope.cbfxObj.t1[2].purchaserebate * 1) - ($scope.cbfxObj.t1[0].outorderost / 1.17 + $scope.cbfxObj.t1[1].outorderost / 1.06 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].mating / 1.17 + $scope.cbfxObj.t1[1].mating / 1.06 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third / 1.17 + $scope.cbfxObj.t1[1].third / 1.06 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.companygain = Math.round(($scope.maoliBHan / (($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate / 1.17 + $scope.cbfxObj.t1[1].salerebate / 1.06 + $scope.cbfxObj.t1[2].salerebate * 1))) * 10000) / 100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money * 1 + $scope.cbfxObj.t1[1].money * 1 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].orderscost * 1 + $scope.cbfxObj.t1[1].orderscost * 1 + $scope.cbfxObj.t1[2].orderscost * 1) - ($scope.cbfxObj.t1[0].cashrebate * 1 + $scope.cbfxObj.t1[1].cashrebate * 1 + $scope.cbfxObj.t1[2].cashrebate * 1) - ($scope.cbfxObj.t1[0].selfpickup * 1 + $scope.cbfxObj.t1[1].selfpickup * 1 + $scope.cbfxObj.t1[2].selfpickup * 1) - ($scope.cbfxObj.t1[0].outorderost * 1 + $scope.cbfxObj.t1[1].outorderost * 1 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].other * 1 + $scope.cbfxObj.t1[1].other * 1 + $scope.cbfxObj.t1[2].other * 1) - ($scope.cbfxObj.t1[0].mating * 1 + $scope.cbfxObj.t1[1].mating * 1 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third * 1 + $scope.cbfxObj.t1[1].third * 1 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].orderscost / 1.17 + $scope.cbfxObj.t1[1].orderscost / 1.06 + $scope.cbfxObj.t1[2].orderscost * 1) - ($scope.cbfxObj.t1[0].cashrebate / 1.17 + $scope.cbfxObj.t1[1].cashrebate / 1.06 + $scope.cbfxObj.t1[2].cashrebate * 1) - ($scope.cbfxObj.t1[0].selfpickup / 1.17 + $scope.cbfxObj.t1[1].selfpickup / 1.06 + $scope.cbfxObj.t1[2].selfpickup * 1) - ($scope.cbfxObj.t1[0].outorderost / 1.17 + $scope.cbfxObj.t1[1].outorderost / 1.06 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].other / 1.17 + $scope.cbfxObj.t1[1].other / 1.06 + $scope.cbfxObj.t1[2].other * 1) - ($scope.cbfxObj.t1[0].mating / 1.17 + $scope.cbfxObj.t1[1].mating / 1.06 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third / 1.17 + $scope.cbfxObj.t1[1].third / 1.06 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan / ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1)) * 10000) / 100;
                    });
                    $scope.$watchCollection('cbfxObj.t1[1]', function (newValue, oldValue, scope) {
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money * 1 + $scope.cbfxObj.t1[1].money * 1 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate * 1 + $scope.cbfxObj.t1[1].salerebate * 1 + $scope.cbfxObj.t1[2].salerebate * 1) - ($scope.cbfxObj.t1[0].orderscost * 1 + $scope.cbfxObj.t1[1].orderscost * 1 + $scope.cbfxObj.t1[2].orderscost * 1) + ($scope.cbfxObj.t1[0].purchaserebate * 1 + $scope.cbfxObj.t1[1].purchaserebate * 1 + $scope.cbfxObj.t1[2].purchaserebate * 1) - ($scope.cbfxObj.t1[0].outorderost * 1 + $scope.cbfxObj.t1[1].outorderost * 1 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].mating * 1 + $scope.cbfxObj.t1[1].mating * 1 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third * 1 + $scope.cbfxObj.t1[1].third * 1 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.maoliBHan = ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate / 1.17 + $scope.cbfxObj.t1[1].salerebate / 1.06 + $scope.cbfxObj.t1[2].salerebate * 1) - ($scope.cbfxObj.t1[0].orderscost / 1.17 + $scope.cbfxObj.t1[1].orderscost / 1.06 + $scope.cbfxObj.t1[2].orderscost * 1) + ($scope.cbfxObj.t1[0].purchaserebate / 1.17 + $scope.cbfxObj.t1[1].purchaserebate / 1.06 + $scope.cbfxObj.t1[2].purchaserebate * 1) - ($scope.cbfxObj.t1[0].outorderost / 1.17 + $scope.cbfxObj.t1[1].outorderost / 1.06 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].mating / 1.17 + $scope.cbfxObj.t1[1].mating / 1.06 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third / 1.17 + $scope.cbfxObj.t1[1].third / 1.06 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.companygain = Math.round(($scope.maoliBHan / (($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate / 1.17 + $scope.cbfxObj.t1[1].salerebate / 1.06 + $scope.cbfxObj.t1[2].salerebate * 1))) * 10000) / 100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money * 1 + $scope.cbfxObj.t1[1].money * 1 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].orderscost * 1 + $scope.cbfxObj.t1[1].orderscost * 1 + $scope.cbfxObj.t1[2].orderscost * 1) - ($scope.cbfxObj.t1[0].cashrebate * 1 + $scope.cbfxObj.t1[1].cashrebate * 1 + $scope.cbfxObj.t1[2].cashrebate * 1) - ($scope.cbfxObj.t1[0].selfpickup * 1 + $scope.cbfxObj.t1[1].selfpickup * 1 + $scope.cbfxObj.t1[2].selfpickup * 1) - ($scope.cbfxObj.t1[0].outorderost * 1 + $scope.cbfxObj.t1[1].outorderost * 1 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].other * 1 + $scope.cbfxObj.t1[1].other * 1 + $scope.cbfxObj.t1[2].other * 1) - ($scope.cbfxObj.t1[0].mating * 1 + $scope.cbfxObj.t1[1].mating * 1 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third * 1 + $scope.cbfxObj.t1[1].third * 1 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].orderscost / 1.17 + $scope.cbfxObj.t1[1].orderscost / 1.06 + $scope.cbfxObj.t1[2].orderscost * 1) - ($scope.cbfxObj.t1[0].cashrebate / 1.17 + $scope.cbfxObj.t1[1].cashrebate / 1.06 + $scope.cbfxObj.t1[2].cashrebate * 1) - ($scope.cbfxObj.t1[0].selfpickup / 1.17 + $scope.cbfxObj.t1[1].selfpickup / 1.06 + $scope.cbfxObj.t1[2].selfpickup * 1) - ($scope.cbfxObj.t1[0].outorderost / 1.17 + $scope.cbfxObj.t1[1].outorderost / 1.06 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].other / 1.17 + $scope.cbfxObj.t1[1].other / 1.06 + $scope.cbfxObj.t1[2].other * 1) - ($scope.cbfxObj.t1[0].mating / 1.17 + $scope.cbfxObj.t1[1].mating / 1.06 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third / 1.17 + $scope.cbfxObj.t1[1].third / 1.06 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan / ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1)) * 10000) / 100;
                    });
                    $scope.$watchCollection('cbfxObj.t1[2]', function (newValue, oldValue, scope) {
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money * 1 + $scope.cbfxObj.t1[1].money * 1 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate * 1 + $scope.cbfxObj.t1[1].salerebate * 1 + $scope.cbfxObj.t1[2].salerebate * 1) - ($scope.cbfxObj.t1[0].orderscost * 1 + $scope.cbfxObj.t1[1].orderscost * 1 + $scope.cbfxObj.t1[2].orderscost * 1) + ($scope.cbfxObj.t1[0].purchaserebate * 1 + $scope.cbfxObj.t1[1].purchaserebate * 1 + $scope.cbfxObj.t1[2].purchaserebate * 1) - ($scope.cbfxObj.t1[0].outorderost * 1 + $scope.cbfxObj.t1[1].outorderost * 1 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].mating * 1 + $scope.cbfxObj.t1[1].mating * 1 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third * 1 + $scope.cbfxObj.t1[1].third * 1 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.maoliBHan = ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate / 1.17 + $scope.cbfxObj.t1[1].salerebate / 1.06 + $scope.cbfxObj.t1[2].salerebate * 1) - ($scope.cbfxObj.t1[0].orderscost / 1.17 + $scope.cbfxObj.t1[1].orderscost / 1.06 + $scope.cbfxObj.t1[2].orderscost * 1) + ($scope.cbfxObj.t1[0].purchaserebate / 1.17 + $scope.cbfxObj.t1[1].purchaserebate / 1.06 + $scope.cbfxObj.t1[2].purchaserebate * 1) - ($scope.cbfxObj.t1[0].outorderost / 1.17 + $scope.cbfxObj.t1[1].outorderost / 1.06 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].mating / 1.17 + $scope.cbfxObj.t1[1].mating / 1.06 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third / 1.17 + $scope.cbfxObj.t1[1].third / 1.06 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.companygain = Math.round(($scope.maoliBHan / (($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].salerebate / 1.17 + $scope.cbfxObj.t1[1].salerebate / 1.06 + $scope.cbfxObj.t1[2].salerebate * 1))) * 10000) / 100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money * 1 + $scope.cbfxObj.t1[1].money * 1 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].orderscost * 1 + $scope.cbfxObj.t1[1].orderscost * 1 + $scope.cbfxObj.t1[2].orderscost * 1) - ($scope.cbfxObj.t1[0].cashrebate * 1 + $scope.cbfxObj.t1[1].cashrebate * 1 + $scope.cbfxObj.t1[2].cashrebate * 1) - ($scope.cbfxObj.t1[0].selfpickup * 1 + $scope.cbfxObj.t1[1].selfpickup * 1 + $scope.cbfxObj.t1[2].selfpickup * 1) - ($scope.cbfxObj.t1[0].outorderost * 1 + $scope.cbfxObj.t1[1].outorderost * 1 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].other * 1 + $scope.cbfxObj.t1[1].other * 1 + $scope.cbfxObj.t1[2].other * 1) - ($scope.cbfxObj.t1[0].mating * 1 + $scope.cbfxObj.t1[1].mating * 1 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third * 1 + $scope.cbfxObj.t1[1].third * 1 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1) - ($scope.cbfxObj.t1[0].orderscost / 1.17 + $scope.cbfxObj.t1[1].orderscost / 1.06 + $scope.cbfxObj.t1[2].orderscost * 1) - ($scope.cbfxObj.t1[0].cashrebate / 1.17 + $scope.cbfxObj.t1[1].cashrebate / 1.06 + $scope.cbfxObj.t1[2].cashrebate * 1) - ($scope.cbfxObj.t1[0].selfpickup / 1.17 + $scope.cbfxObj.t1[1].selfpickup / 1.06 + $scope.cbfxObj.t1[2].selfpickup * 1) - ($scope.cbfxObj.t1[0].outorderost / 1.17 + $scope.cbfxObj.t1[1].outorderost / 1.06 + $scope.cbfxObj.t1[2].outorderost * 1) - ($scope.cbfxObj.t1[0].other / 1.17 + $scope.cbfxObj.t1[1].other / 1.06 + $scope.cbfxObj.t1[2].other * 1) - ($scope.cbfxObj.t1[0].mating / 1.17 + $scope.cbfxObj.t1[1].mating / 1.06 + $scope.cbfxObj.t1[2].mating * 1) - ($scope.cbfxObj.t1[0].third / 1.17 + $scope.cbfxObj.t1[1].third / 1.06 + $scope.cbfxObj.t1[2].third * 1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan / ($scope.cbfxObj.t1[0].money / 1.17 + $scope.cbfxObj.t1[1].money / 1.06 + $scope.cbfxObj.t1[2].money * 1)) * 10000) / 100;
                    });
                    if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                        $scope.companygain = 0;
                        $scope.salesgain = 0;
                    }
                    if($scope.contracttype == '分销' && $scope.xsCbfx == true && $rootScope.opprev.contractOrder_costanalysis == true){
                        var fenxiaointerestsap = apply.fenxiaointerestsap({contractId:$scope.contractId});
                        fenxiaointerestsap.success(function(datafe) {
                            if(datafe.code == 200){
                                if(datafe.rst.data.cost){
                                    $scope.xMaoliBHan = datafe.rst.data.cost.sellinterest;//销售毛利率
                                    $scope.xMaoliHan = datafe.rst.data.cost.sellinterestContainTax;//销售含税利率
                                    $scope.salesgain = datafe.rst.data.cost.sellcontractInterest;//销售合约利率
                                    if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                                        $scope.companygain = 0;
                                        $scope.salesgain = 0;
                                    }
                                }
                            }else{
                                swal(datafe.msg, datafe.rst, "warning");
                                $scope.xMaoliBHan = 0;//销售毛利率
                                $scope.xMaoliHan = 0;//销售含税利率
                                $scope.salesgain =0 ;
                                return false;
                            }
                        });
                    }

                }
            }
            // 客户信用情况查看
            $scope.loading = false;
            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ORDER_DATA.contractbase.stomer, 'id':$scope.ORDER_DATA.contractbase.stomerid};
                $scope.$broadcast('transfer.type', param);
            } catch (e) {}
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function(error){
        alert(error);
    });
	// 2017-06-19 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.contractbase.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.contractbase.salesorderid.length ? $scope.ORDER_DATA.contractbase.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = apply.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    $scope.viewHistory = function(Id){
        $( "#listversion" ).dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#listversion" ).dialog( "open" );
        var listversion = apply.listversion({groupno:$scope.groupno});
        listversion.success(function(data){
            if(data.code == 200){
                $scope.contractHistory = data.rst;
            }
        });
    }
    var getCountry = apply.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var applyObj =  $scope.applyObj ={};
    $scope.applySave = function(){
        var param = {};
        param.doc = $scope.doc;
        var mating = $scope.cbfxObj.t1[0].mating*1 + $scope.cbfxObj.t1[1].mating*1 + $scope.cbfxObj.t1[2].mating*1+$scope.cbfxObj.t1[0].third*1 + $scope.cbfxObj.t1[1].third*1 + $scope.cbfxObj.t1[2].third*1;
        if(param.doc.contractbase.cp == '1' && mating <= 0){
            swal('配套采购不能都小于0', "", "warning");
            return false;
        }
        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }

        if($scope.ifcbfxCy == false){
            var requiredObj = $scope.cbfxForm.$error;
            angular.forEach(requiredObj, function (keyData) {
                keyData.$dirty = true;
            })
            if (!$scope.cbfxForm.$valid) {
                swal("您有信息填写错误，请检查后再保存", "", "warning");
                return false;
            }
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        var addBaseContract = apply.addBaseContract(param);
        addBaseContract.success(function(data){
            if(data.code == 200){
                if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false){
                    var savecostParam = {};
                    savecostParam.contractId =  $scope.contractId;
                    savecostParam.othercost =  $scope.cbfxObj.t1;
                    savecostParam.interest = $scope.maoliBHan;//毛利率
                    savecostParam.interestContainTax = $scope.maoliHan;//含税利率
                    savecostParam.contractInterest = $scope.companygain;//合约利率
                    savecostParam.sellinterest = $scope.xMaoliBHan;//销售毛利率
                    savecostParam.sellinterestContainTax = $scope.xMaoliHan;//销售含税利率
                    savecostParam.sellcontractInterest = $scope.salesgain;//销售合约利率
                    var savecost = apply.saveContcost(savecostParam);
                    savecost.success(function (datac) {
                        if (datac.code == 200) {
                            window.location.reload();
                        } else {
                            swal(datac.msg, '', "error");
                        }
                    });


                } else {
                    window.location.reload();
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false && $scope.cp == '1'){
            var mating = $scope.cbfxObj.t1[0].mating*1 + $scope.cbfxObj.t1[1].mating*1 + $scope.cbfxObj.t1[2].mating*1+$scope.cbfxObj.t1[0].third*1 + $scope.cbfxObj.t1[1].third*1 + $scope.cbfxObj.t1[2].third*1;
            if(mating <= 0){
                swal('配套采购不能都小于0', "", "warning");
                return false;
            }
        }
        if($scope.ifcbfxCy == false) {
            var requiredObj = $scope.cbfxForm.$error;
            angular.forEach(requiredObj, function (keyData) {
                keyData.$dirty = true;
            })
            if (!$scope.cbfxForm.$valid) {
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }
        // 2016-8-2 审批中增加候选人选择操作
        // 提交
        $scope.applyFn = function (selIndex) {
            // var person = $cookieStore.get("persion");
            var person = $rootScope.loginPerson;
            var roles = person.roles;
            var param = {};
            param.doc = $scope.doc;
            param.comment = applyObj.applyIdea;
            param.processId = $stateParams.processId;
            param.nodeId = $stateParams.nodeId;



            param.doc.contractbase.interest = $scope.maoliBHan;//毛利率
            param.doc.contractbase.interestContainTax = $scope.maoliHan;//含税利率
            param.doc.contractbase.contractInterest = $scope.companygain;//合约利率
            param.doc.contractbase.sellinterest = $scope.xMaoliBHan;//销售毛利率
            param.doc.contractbase.sellinterestContainTax = $scope.xMaoliHan;//销售含税利率
            param.doc.contractbase.sellcontractInterest = $scope.salesgain;//销售合约利率
            var listcandidates = apply.listcandidates(param);
            listcandidates.success(function (data) {
                if (data.code == 200) {
                    $scope.candidates = data.rst.candidates;
                }
            });
            param.candidates = $scope.candidates;
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }

            if($scope.contracttype != '分销' && $scope.contracttype != '配套销售' && $scope.ifcbfxCy == false){
                var savecostParam = {};
                savecostParam.contractId =  $scope.contractId;
                savecostParam.othercost =  $scope.cbfxObj.t1;
                savecostParam.interest = $scope.maoliBHan;//毛利率
                savecostParam.interestContainTax = $scope.maoliHan;//含税利率
                savecostParam.contractInterest = $scope.companygain;//合约利率
                savecostParam.sellinterest = $scope.xMaoliBHan;//销售毛利率
                savecostParam.sellinterestContainTax = $scope.xMaoliHan;//销售含税利率
                savecostParam.sellcontractInterest = $scope.salesgain;//销售合约利率
                var savecost = apply.saveContcost(savecostParam);
                savecost.success(function (data) {
                    if (data.code == 200) {
                        var applyAgree = apply.agreeBaseContract(param);
                        applyAgree.success(function (data) {
                            if (data.code == 200) {
                                swal({
                                    title: "审批成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回销售合同待办",
                                    closeOnConfirm: true
                                }, function () {
	                                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
	                                // window.location.href = '/index.html#/index';
                                });
                            } else {
                                swal("提交失败！", '', "error");
                            }
                        }).error(function (error) {
                            swal(error, "", "warning");
                        });
                    } else {
                        swal(data.msg, '', "error");
                    }
                });


            } else {
                var applyAgree;
                if($scope.contracttype == '配套销售'){
                    applyAgree = apply.cognateagreeBaseContract(param);
                }else{
                    applyAgree = apply.agreeBaseContract(param);
                }
                applyAgree.success(function (data) {
                    if (data.code == 200) {
                        swal({
                            title: "审批成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回销售合同待办",
                            closeOnConfirm: true
                        }, function () {
                            // window.location.href = '/index.html#/index';
	                        window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                        });
                    } else {
                        swal("提交失败！", '', "error");
                    }
                }).error(function (error) {
                    alert(error);
                });
            };
        }

        // if(($scope.ORDER_DATA.contractbase.contracttype == '项目' || $scope.ORDER_DATA.contractbase.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
        if( $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
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
        // $scope.applyFn(-1);


    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree;
        if($scope.contracttype == '配套销售'){
            disagree = apply.cognatedisagreeBaseContract(param);
        }else{
            disagree = apply.disagreeBaseContract(param);
        }
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售合同待办",
                    closeOnConfirm: true
                }, function(){
                	// window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel;
        if($scope.contracttype == '配套销售'){
            cancel = apply.cognatecancelBaseContract(param);
        }else{
            cancel = apply.cancelBaseContract(param);
        }
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售合同待办",
                    closeOnConfirm: true
                }, function(){   //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall;
        if($scope.contracttype == '配套销售'){
            recall = apply.cognaterecallBaseContract(param);
        }else{
            recall = apply.recallBaseContract(param);
        }
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
}]);

//合同清单变更
contractApp.controller('contractChangeAddCtrl', ['$scope','$filter','$stateParams','$rootScope','contractServices',function($scope,$filter,$stateParams,$rootScope,payment){
    var ht = $scope.ht = {};
    $scope.htTab = function(type){
        var type = type;
        $scope.ht.activeTab = type;
    };
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var QD_DATA = $scope.QD_DATA = {};
    var contractId =  $scope.contractId = '';
    var relationcontractId = [];

    var excleData = $scope.excleData = [];
    var rightData = $scope.rightData = {};
    var errorError = $scope.errorError = {};
    var excleWlData = $scope.excleWlData = {};
    $scope.excleWlData.right = {};
    $scope.excleWlData.error = {};
    $scope.excleWlData.right.MatchSubtract = [];
    $scope.excleWlData.right.MatchAdd = [];
    $scope.excleWlData.error.noMatch = [];
    $scope.excleWlData.error.errMatchSubtract = [];
    var watchExcel = $scope.$watchCollection ('excleData', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    var userLinkList =  $scope.userLinkList = [];
    var fdList = $scope.fdList = [];
    var Addrebateitem  = $scope.Addrebateitem = [];
    var rebateitem = $scope.rebateitem  = [];

    // 搜索产品线
    $scope.productlineFn = function (name) {
        $scope.ORDER_DATA.productId  = "";
        var listCpx = payment.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
        // var listCpx = payment.listCpx({cpxname:name});
        listCpx.success(function(data) {
            if (data.code == 200) {
                $scope.productlineList = data.rst.data.enum.CPX;
                if (!$scope.productlineList.length) {
                    $scope.productlineList.push({
                        'name': '未找到',
                        'value': ''
                    });
                }
            } else {
                //swal(data.msg, "", "warning");
                alert('error')
            }
        })
    };
    $scope.selProductlineFn = function (obj) {
        $scope.ORDER_DATA.product  = obj.name;
        $scope.ORDER_DATA.productId  = obj.code;
        $scope.productlineList = [];
    };
    $scope.sktj = function(type){
        //判断收款条件
        if(type=='按比例'){
            $scope.skblIf = true;
            $scope.skjeIf = false;
        }else{
            $scope.skblIf = false;
            $scope.skjeIf = true;
        }
        $scope.contactreceivablescondition = [];
    };
    $scope.httkAdd = function(type){
        if(type == 'sktkList'){//冲抵核销信息
            var obj= {type:'', scale:'', money:'', days:'', method:'', cond:''};
            $scope.contactreceivablescondition.push(obj);
        }
    };
    $scope.httkDel = function(idx,type){
        $scope.contactreceivablescondition.splice(idx,1);
    };
    $scope.cond = [];
    $scope.fkType = function(index,type){//选择收款类型和合同模板来判断收款条件显示的值
        switch ($scope.ORDER_DATA.contracttemplate)
        {
            case '华为硬件标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '华为硬件非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物','其他条件']
                }
                break;
            case '华为服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '华为服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case '自有服务非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                }else if(type=='服务款'){
                    $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                }
                break;
            case 'Oracle标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前']
                }else if(type=='货款'){
                    $scope.cond[index] = ['收到货物']
                }
                break;
            case '非标准合同':
                if(type=='预付款'){
                    $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                }else if(type=='其他付款'){//手动填写
                    $scope.cond[index] = ['其他条件']
                }
                break;
        }
        /*if(type == '预付款' && $scope.ORDER_DATA.contracttemplate == '硬件标准合同'){
         //交货条款区域
         $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
         $scope.jhtkIf = true;
         }else if(type == '货款' && $scope.ORDER_DATA.contracttemplate == '硬件标准合同'){
         $scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效后25个日历日内交货';
         $scope.jhtkIf = true;
         }*/
    };
    $scope.putMeg = function () {
        var shtml = '';
        var sArr = [];
        if ($scope.ORDER_DATA.sktj == undefined) {
            swal("请先选择收款条件", "", "warning");
            return false;
        }
        if ($scope.contactreceivablescondition.length <= 0) {
            swal("合同收款条款不能为空", "", "warning");
            return false;
        } else {
            var blTotal = 0;
            var monTotal = 0;
            angular.forEach($scope.contactreceivablescondition, function (datac) {
                if (datac.scale) {
                    /*blTotal += parseFloat(datac.scale);*/
                    blTotal = blTotal + Math.round(datac.scale*100)/100;
                } else if (datac.money) {
                    /*monTotal += parseFloat(datac.money);*/
                    monTotal = monTotal + Math.round(datac.money*100)/100;
                }
            });
            if ($scope.contactreceivablescondition[0].scale) {
                if (blTotal != 100) {
                    swal("收款比例之和总和不是100%，请修改", "", "warning");
                    return false;
                }
            }
            if ($scope.contactreceivablescondition[0].money) {
                if(!$scope.QD_DATA.returngoodsmoney){$scope.QD_DATA.returngoodsmoney=0}
                if(!$scope.QD_DATA.addgoodsmoney){$scope.QD_DATA.addgoodsmoney=0}
                if(!$scope.QD_DATA.returnrebate){$scope.QD_DATA.returnrebate=0}
                if(!$scope.QD_DATA.addrebate){$scope.QD_DATA.addrebate=0}
                var contrNum = Math.round((($scope.ORDER_DATA.Oldcontractmoney*1+$scope.QD_DATA.returngoodsmoney+$scope.QD_DATA.addgoodsmoney)-($scope.ORDER_DATA.Oldrebatemoney*1-$scope.QD_DATA.returnrebate*1+$scope.QD_DATA.addrebate*1))*100)/100;
                if (monTotal != contrNum) {
                    swal("收款金额之和不等于合同总金额减去返点金额" + contrNum + "，请修改", "", "warning");
                    return false;
                }
            }
        }
        switch ($scope.ORDER_DATA.contracttemplate) {
            case '华为硬件标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {//本合同生效之日起
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {//供方发货前
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {//本合同生效之日起
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '其他付款' && value.cond == '其他条件') {
                            shtml = '其他条件;';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '其他付款' && value.cond == '其他条件') {
                            shtml = '其他条件;';
                        }
                    }
                    sArr.push(shtml);
                });

                break;
            case '华为硬件非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '供方发货前') {
                            shtml = '需方于供方发货前' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '货款' && value.cond == '收到货物') {
                            shtml = '需方于收到货物之日起' + value.days + '日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.contactreceivablescondition.length == 1) {
                        if (value.thetype == '预付款') {
                            shtml = '需方于' + value.cond + value.days + '个日历日内支付供方合同全款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '服务款') {
                            shtml = '需方于' + value.cond + value.days + '日内支付供方合同全款，支付方式为' + value.method + ';';
                        }
                    } else {
                        if ($scope.ORDER_DATA.sktj == '按比例') {
                            if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                                shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                            } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                                shtml = '服务生效前' + value.days + '日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                            }
                            if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                            }
                        } else if ($scope.ORDER_DATA.sktj == '按金额') {
                            if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                                shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                            } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                                shtml = '服务生效前' + value.days + '日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                            }
                            if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {
                                shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                            }
                        }
                    }
                    sArr.push(shtml);
                });
                break;
            case '华为服务非标准合同':
                $.each($scope.contactreceivablescondition, function (key, value) {
                    if ($scope.ORDER_DATA.sktj == '按比例') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                            shtml = '服务生效前' + value.days + '日内支付供方合同全款的' + value.scale + '%作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {//货款---服务款  本合同生效之日起---供方就本合同项下服务向原厂下单采购之日起
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方合同全款的' + value.scale + '%，支付方式为' + value.method + ';';
                        }
                    } else if ($scope.ORDER_DATA.sktj == '按金额') {
                        if (value.thetype == '预付款' && value.cond == '本合同生效之日起') {
                            shtml = '需方于本合同生效之日起' + value.days + '个日历日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        } else if (value.thetype == '预付款' && value.cond == '服务生效前') {
                            shtml = '服务生效前' + value.days + '日内支付供方' + value.money + '元作为预付款，支付方式为' + value.method + ';';
                        }
                        if (value.thetype == '服务款' && value.cond == '供方就本合同项下服务向原厂下单采购之日起') {
                            shtml = '需方于供方就本合同项下服务向原厂下单采购之日起' + value.days + '个日历日内支付供方' + value.money + '元，支付方式为' + value.method + ';';
                        }
                    }
                    sArr.push(shtml);
                });
                break;
        }

        if($scope.ORDER_DATA.contracttemplate!='自有服务标准合同'&&$scope.ORDER_DATA.contracttemplate!='自有服务非标准合同'){
            $scope.ORDER_DATA.contactreceivablesconditionshowarea = sArr.join('   ');
        }
    };
    $scope.ORDER_DATA.deliverwaycheck = {};
    $scope.deliverwaycheck = true;
    $scope.jhFs = function(type){
        var typeDate = null;
        if(type!=undefined){
            typeDate = type;
        }

        if(typeDate.type2 == true){
            $scope.ifEmail = true;
        }else {
            $scope.ifEmail = false;
        }
        if($scope.ORDER_DATA.deliverwaycheck.type1 || $scope.ORDER_DATA.deliverwaycheck.type2 || $scope.ORDER_DATA.deliverwaycheck.type3){
            $scope.deliverwaycheck = false;
        }else{
            $scope.deliverwaycheck = true;
        }
    };
    $scope.xmgcfw = function(type){
        if(type == '原厂提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程由原厂提供，服务内容详见服务清单';
        }else if(type == '供方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由供方安装';
        }else if(type == '需方提供'){
            $scope.ORDER_DATA.projectservicetermarea = '工程安装：本合同项下设备的工程安装由需方安装';
        }
    };

    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type == 'userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type == 'excleData'){
            $scope.excleData.splice(idx,1);
        }
    };
    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = payment.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.tuiHIf = true;
    $scope.buHIf = true;
    $scope.getUploadCallback = function(uploadData) {
        $scope.uploadDataBill = uploadData;
        if(uploadData.right.MatchSubtract.length > 0 ){
            $scope.tuiHIf = true;
            $scope.tuiHIfBot = true;
            /*if(uploadData.allBackMoney&&uploadData.allBackMoney!=0&&uploadData.allRemoveMoney&&uploadData.allRemoveMoney!=0){//即有退货金额又有撤货
                $scope.canuserebate = uploadData.rebate;
            }else if(uploadData.allBackMoney&&uploadData.allBackMoney!=0){//退货金额
                $scope.canuserebate = uploadData.rebate;

            }else if(uploadData.allRemoveMoney&&uploadData.allRemoveMoney!=0){//撤货金额
                $scope.canuserebate = Math.round((uploadData.rebate*100 - uploadData.usedrebate*100))/100;
            }*/
            if(uploadData.inventory == 0){
                $scope.removeZREBATE = parseFloat(uploadData.removeZREBATE);
            }else {
                $scope.removeZREBATE = 0;
            }
            $scope.QD_DATA.returnrebate = $scope.removeZREBATE;
            $scope.canuserebate = uploadData.rebate;
            if(parseFloat($scope.QD_DATA.returnrebate)>parseFloat($scope.canuserebate)){
                $scope.QD_DATA.returnrebate = $scope.canuserebate;
            }
        }else {
            $scope.tuiHIf = false;
            $scope.tuiHIfBot = false;
            $scope.QD_DATA.returngoodsmoney = 0;
            $scope.QD_DATA.returnrebate = 0;
        }
        if(uploadData.right.MatchAdd.length <= 0 ){
            $scope.buHIf = false;
            $scope.QD_DATA.addrebate = 0;
            $scope.QD_DATA.addgoodsmoney = 0;
            $scope.fdList = [];
        }else {
            $scope.buHIf = true;
            if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1&&$scope.ORDER_DATA.Oldcp == '0'){
                $scope.cpDisable = false;//有补货的时候 cp可以修改
            }
        }
    };
    $scope.validReturnrebate = function(returnrebate){
        if(parseFloat(returnrebate)< parseFloat($scope.removeZREBATE) || parseFloat(returnrebate) > parseFloat($scope.canuserebate)){
            swal("不能大于可用退货返点金额并且不能小于"+$scope.removeZREBATE, "", "warning");
            $scope.QD_DATA.returnrebate = $scope.removeZREBATE;
            return false;
        }
        if(returnrebate == '' || returnrebate == null){
            $scope.QD_DATA.returnrebate = $scope.removeZREBATE;
        }
    };
    $scope.indexofStr = function(str) {
        return (str.indexOf("SON") == 0) ? true : false;
    }
    $scope.contractSource = true;
    if($stateParams.processId){
        var applyViewBillChange = payment.applyViewBillChange({contractId:$stateParams.conid,sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId});
        applyViewBillChange.success(function(data) {
            if(data.code == 200){
                $scope.is2body = data.rst.doc.model.contractbase.is2body;
                $scope.doc = data.rst.doc;
                $scope.ORDER_DATA = data.rst.doc.model.contractbase;
                $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
                $scope.contractId = data.rst.doc.model.contractId;
                $scope.processId = data.rst.processId;
                $scope.nodeId = data.rst.nodeId;
                $scope.contracttype = $scope.ORDER_DATA.contracttype;
                $scope.contractSource = $scope.indexofStr($scope.ORDER_DATA.contractno);
                if($scope.contracttype != '专有服务'){
                    $scope.zyfwIf = true;
                }else {
                    $scope.zyfwIf = false;
                }
                if($scope.ORDER_DATA.deliverwaycheck&&$scope.ORDER_DATA.deliverwaycheck.type1){
                    $scope.delive_type1 = true;
                }
                if($scope.ORDER_DATA.deliverwaycheck&&$scope.ORDER_DATA.deliverwaycheck.type2){
                    $scope.delive_type2 = true;
                    $scope.ifEmail = true;
                }
                if($scope.ORDER_DATA.deliverwaycheck&&$scope.ORDER_DATA.deliverwaycheck.type3){
                    $scope.delive_type3 = true;
                }
                if($scope.ORDER_DATA.attachment[0]&&$scope.ORDER_DATA.attachment[0]!=null){
                    $scope.uploadFile = $scope.ORDER_DATA.attachment[0].filePath;
                    $scope.fileName = $scope.ORDER_DATA.attachment[0].fileName;
                    $scope.uploadTrue = true;
                }
                if($scope.ORDER_DATA.canRepairRebate == 1){
                    $scope.fdDisable = true;
                }
                $scope.userLinkList = $scope.ORDER_DATA.receiver;
                $scope.rebateitem = $scope.ORDER_DATA.rebateitem;
                $scope.contactreceivablescondition = $scope.ORDER_DATA.contactreceivablescondition;
                $.each($scope.ORDER_DATA.contactreceivablescondition,function(index,value){
                    var type = value.thetype;
                    switch ($scope.ORDER_DATA.contracttemplate)
                    {
                        case '华为硬件标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物']
                            }
                            break;
                        case '华为硬件非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物','其他条件']
                            }
                            break;
                        case '华为服务标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '华为服务非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '自有服务标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '自有服务非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case 'Oracle标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物']
                            }
                            break;
                        case '非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                            }else if(type=='其他付款'){//手动填写
                                $scope.cond[index] = ['其他条件']
                            }
                            break;
                    }
                });

                switch ($scope.ORDER_DATA.contracttemplate)
                {
                    case '华为硬件标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = true;
                        //合同收款条款
                        $scope.hkIf = true;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = true;
                        $scope.fpkjOption = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        //$scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                        $scope.jhtkIf = true;
                        $scope.jhtkXs = true;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = true;
                        $scope.xmgcfwfXs1 = false;
                        $scope.xmgcfwfXs2 = true;
                        $scope.xmgcfuXs = true;
                        $scope.xmgcfsTr = true;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = true;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为硬件非标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = true;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '';
                        // $scope.ORDER_DATA.receiptdescarea = '';
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = true;
                        $scope.fpkjOption = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        //$scope.ORDER_DATA.deliverconditionarea = '';
                        $scope.jhtkIf = false;
                        $scope.jhtkXs = true;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = true;
                        $scope.xmgcfwfXs1 = true;
                        $scope.xmgcfwfXs2 = false;
                        $scope.xmgcfuXs = true;
                        $scope.xmgcfsTr = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为服务标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = true;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '参见服务清单';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = true;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为服务非标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        /*$scope.ORDER_DATA.receiptdesc = '手工输入';
                         $scope.ORDER_DATA.receiptdescarea = '手工输入';*/
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = false;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '自有服务标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = true;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '待法务确定';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = false;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                        break;
                    case '自有服务非标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = true;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '手工输入';
                        //$scope.ORDER_DATA.receiptdescarea = '手工输入';
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = false;
                        $scope.jhfs1 = true;
                        // $scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '非标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = true;
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkXs = false;
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        // $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                }
                if($scope.ORDER_DATA.contracttype == '分销'){
                    $scope.ifFxiao = false;
                    $scope.ifBillCg = true;
                    $scope.fxType = true;
                }else {
                    $scope.ifFxiao = true;
                    $scope.ifBillCg = false;
                }

                if($scope.ORDER_DATA.contracttype != '项目' && $scope.ORDER_DATA.contracttype != '专有服务'){
                    $scope.fxType = true;
                    $scope.cpDisable = true;
                }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1){
                    $scope.cpDisable = true;
                }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.isbody==0){//附属合同不能变更CP
                    $scope.cpDisable = true;
                }
                if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                    $scope.ifxf = false;
                }else {
                    if($scope.ORDER_DATA.contractmoney=='0' || $scope.ORDER_DATA.contracttype == '专有服务' || $scope.ORDER_DATA.contracttype == '配套销售'){
                        $scope.ifxf = false;
                    }else{
                        $scope.ifxf = true;
                    }
                }
                if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具增值税专用发票'){
                    $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                }else if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具服务发票'){
                    $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                }else {
                    $scope.ORDER_DATA.receiptdescarea = '';
                }
                if($scope.ORDER_DATA.sktj=='按比例'){
                    $scope.skblIf = true;
                    $scope.skjeIf = false;
                }else{
                    $scope.skblIf = false;
                    $scope.skjeIf = true;
                }

                $scope.QD_DATA = data.rst.doc.model.goodschangeprotocal;

                $scope.stomerid = data.rst.doc.model.contractbase.stomerid;
                $scope.receipttype = data.rst.doc.model.contractbase.receipttype;
                if(data.rst.doc.model.goodschangeprotocal.theAttachment.length>0 && data.rst.doc.model.goodschangeprotocal.theAttachment[0] != null){
                    $scope.uploadFile = data.rst.doc.model.goodschangeprotocal.theAttachment[0].filePath;
                    $scope.docName = data.rst.doc.model.goodschangeprotocal.theAttachment[0].fileName;
                }
                $scope.canuserebate = data.rst.doc.model.goodschangeprotocal.canuserebate;
                $scope.removeZREBATE = data.rst.doc.model.goodschangeprotocal.removeZREBATE;
                $scope.QD_DATA.contractno = data.rst.doc.model.contractbase.contractno;
                $scope.QD_DATA.stomer = data.rst.doc.model.contractbase.stomer;
                $scope.fdList = data.rst.doc.model.goodschangeprotocal.addrebatelist;
                $scope.excleWlData.right.MatchAdd = data.rst.doc.model.MatchAdd;
                if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1&&$scope.ORDER_DATA.Oldcp == '0'&&$scope.excleWlData.right.MatchAdd.length>0){
                    $scope.cpDisable = false;//有补货的时候 cp可以修改
                }
                $scope.excleWlData.right.MatchSubtract = data.rst.doc.model.MatchSubtract;
                if($scope.excleWlData.right.MatchAdd.length<=0){
                    $scope.buHIf = false;
                }
                if($scope.excleWlData.right.MatchSubtract<=0){
                    $scope.tuiHIf = false;
                    $scope.tuiHIfBot = false;
                }
                if(data.rst.doc.model.contractbase.escompany == '中建材集团进出口公司' || data.rst.doc.model.contractbase.contracttype == '专有服务'|| data.rst.doc.model.contractbase.contracttype=='配套销售'){
                    $scope.sztIf = true;
                }

                $scope.excleFormData ={contractId:$scope.contractId,'userid':person.user._id}

            }else{
                swal(data.msg, "", "warning");
            }
        });
    }else{
        var startchange;
        if($stateParams.conType=='配套销售'){
            startchange = payment.cognatestartchange({contractId:$stateParams.conid});
        }else {
            startchange = payment.startchange({contractId:$stateParams.conid});
        }
        startchange.success(function(data) {
            if(data.code == 200){
                $scope.QD_DATA = data.rst.goodschangeprotocal;
                $scope.doc = data.rst;
                $scope.ORDER_DATA = data.rst.contractbase;
                $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
                $scope.contractId = data.rst._id;
                $scope.stomerid = $scope.ORDER_DATA.stomerid;
                $scope.contracttype = $scope.ORDER_DATA.contracttype;
                $scope.contractSource = $scope.indexofStr($scope.ORDER_DATA.contractno);
                console.log($scope.ORDER_DATA.contracttype)
                if($scope.ORDER_DATA.contracttype != '专有服务'){
                    $scope.zyfwIf = true;
                }else {
                    $scope.zyfwIf = false;
                }
                if($scope.ORDER_DATA.deliverwaycheck&&$scope.ORDER_DATA.deliverwaycheck.type1){
                    $scope.delive_type1 = true;
                }
                if($scope.ORDER_DATA.deliverwaycheck&&$scope.ORDER_DATA.deliverwaycheck.type2){
                    $scope.delive_type2 = true;
                    $scope.ifEmail = true;
                }
                if($scope.ORDER_DATA.deliverwaycheck&&$scope.ORDER_DATA.deliverwaycheck.type3){
                    $scope.delive_type3 = true;
                }
                if($scope.ORDER_DATA.attachment[0]&&$scope.ORDER_DATA.attachment[0]!=null){
                    $scope.uploadFile = $scope.ORDER_DATA.attachment[0].filePath;
                    $scope.fileName = $scope.ORDER_DATA.attachment[0].fileName;
                    $scope.uploadTrue = true;
                }
                if($scope.ORDER_DATA.canRepairRebate == 1){
                    $scope.fdDisable = true;
                }
                $scope.userLinkList = $scope.ORDER_DATA.receiver;
                $scope.rebateitem = $scope.ORDER_DATA.rebateitem;
                $scope.contactreceivablescondition = $scope.ORDER_DATA.contactreceivablescondition;
                $.each($scope.ORDER_DATA.contactreceivablescondition,function(index,value){
                    var type = value.thetype;
                    switch ($scope.ORDER_DATA.contracttemplate)
                    {
                        case '华为硬件标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物']
                            }
                            break;
                        case '华为硬件非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物','其他条件']
                            }
                            break;
                        case '华为服务标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '华为服务非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '自有服务标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case '自有服务非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','服务生效前','其他条件']
                            }else if(type=='服务款'){
                                $scope.cond[index] = ['供方就本合同项下服务向原厂下单采购之日起']
                            }
                            break;
                        case 'Oracle标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前']
                            }else if(type=='货款'){
                                $scope.cond[index] = ['收到货物']
                            }
                            break;
                        case '非标准合同':
                            if(type=='预付款'){
                                $scope.cond[index] = ['本合同生效之日起','供方发货前','其他条件']
                            }else if(type=='其他付款'){//手动填写
                                $scope.cond[index] = ['其他条件']
                            }
                            break;
                    }
                });

                switch ($scope.ORDER_DATA.contracttemplate)
                {
                    case '华为硬件标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = true;
                        //合同收款条款
                        $scope.hkIf = true;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具增值税专用发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = true;
                        $scope.fpkjOption = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        //$scope.ORDER_DATA.deliverconditionarea = '交货日期：供方在合同生效且收到预付款后25个日历日内交货';
                        $scope.jhtkIf = true;
                        $scope.jhtkXs = true;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '按原厂标准执行';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = true;
                        $scope.xmgcfwfXs1 = false;
                        $scope.xmgcfwfXs2 = true;
                        $scope.xmgcfuXs = true;
                        $scope.xmgcfsTr = true;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = true;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为硬件非标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = true;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '';
                        // $scope.ORDER_DATA.receiptdescarea = '';
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = true;
                        $scope.fpkjOption = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        //$scope.ORDER_DATA.deliverconditionarea = '';
                        $scope.jhtkIf = false;
                        $scope.jhtkXs = true;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = true;
                        $scope.xmgcfwfXs1 = true;
                        $scope.xmgcfwfXs2 = false;
                        $scope.xmgcfuXs = true;
                        $scope.xmgcfsTr = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为服务标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = true;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '参见服务清单';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = true;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '华为服务非标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        /*$scope.ORDER_DATA.receiptdesc = '手工输入';
                         $scope.ORDER_DATA.receiptdescarea = '手工输入';*/
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = false;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '自有服务标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = true;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '供方就合同金额开具服务发票';
                        //$scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                        $scope.kjIf = true;
                        $scope.kjqyIf = true;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = true;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '待法务确定';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = false;
                        //合同收款条款
                        $scope.ifHttk = false;
                        //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                        break;
                    case '自有服务非标准合同':
                        $scope.fkfsZpIf = false;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = false;
                        $scope.qtfwIf = true;
                        //发票开具说明
                        $scope.fpkjDes = true;
                        //$scope.ORDER_DATA.receiptdesc = '手工输入';
                        //$scope.ORDER_DATA.receiptdescarea = '手工输入';
                        $scope.kjIf = false;
                        $scope.kjqyIf = false;
                        $scope.fpkjOptionZy = false;
                        $scope.fpkjOption = true;
                        //合同条款
                        $scope.httkIf = false;
                        $scope.jhfs1 = true;
                        // $scope.ORDER_DATA.deliverway = '按原厂执行方式，参见服务清单';
                        $scope.jhfs2 = false;
                        //$scope.ORDER_DATA.deliverwaycheck = {};
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkIf = false;
                        $scope.cpbxtkXs = true;
                        //$scope.ORDER_DATA.guarantyterm = '';
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                    case '非标准合同':
                        $scope.fkfsZpIf = true;//合同条款 收款方式 里面的支票
                        $scope.hkttk = false;
                        //合同收款条款
                        $scope.hkIf = false;
                        $scope.qtfkIf = true;
                        $scope.qtfwIf = false;
                        //发票开具说明
                        $scope.fpkjDes = false;
                        //合同条款
                        $scope.httkIf = true;
                        $scope.jhfs1 = false;
                        $scope.jhfs2 = true;
                        //交货条款区域
                        $scope.jhtkXs = false;
                        //产品保修条款区域
                        $scope.cpbxtkXs = false;
                        //项目工程服务方式
                        $scope.xmgcfwfXs = false;
                        $scope.xmgcfuXs = false;
                        //是否有附件
                        $scope.ifupload = true;
                        //合同收款条款
                        $scope.ifHttk = true;
                        // $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                        break;
                }
                if($scope.ORDER_DATA.contracttype == '分销'){
                    $scope.ifFxiao = false;
                    $scope.ifBillCg = true;
                    $scope.fxType = true;
                }else {
                    $scope.ifFxiao = true;
                    $scope.ifBillCg = false;
                }

                if($scope.ORDER_DATA.contracttype != '项目' && $scope.ORDER_DATA.contracttype != '专有服务'){
                    $scope.fxType = true;
                    $scope.cpDisable = true;
                }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1){
                    $scope.cpDisable = true;
                }else if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.isbody==0){//附属合同不能变更CP
                    $scope.cpDisable = true;
                }
                if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'){
                    $scope.ifxf = false;
                }else {
                    if($scope.ORDER_DATA.contractmoney=='0' || $scope.ORDER_DATA.contracttype == '专有服务' || $scope.ORDER_DATA.contracttype == '配套销售'){
                        $scope.ifxf = false;
                    }else{
                        $scope.ifxf = true;
                    }
                }
                if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具增值税专用发票'){
                    $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具增值税专用发票';
                }else if($scope.ORDER_DATA.receiptdesc=='供方就合同金额开具服务发票'){
                    $scope.ORDER_DATA.receiptdescarea = '供方就合同金额开具服务发票';
                }else {
                    $scope.ORDER_DATA.receiptdescarea = '';
                }
                if($scope.ORDER_DATA.sktj=='按比例'){
                    $scope.skblIf = true;
                    $scope.skjeIf = false;
                }else{
                    $scope.skblIf = false;
                    $scope.skjeIf = true;
                }

                $scope.is2body = $scope.ORDER_DATA.is2body;
                $scope.receipttype = $scope.ORDER_DATA.receipttype;

                if(data.rst.goodschangeprotocal.theAttachment[0]!=null && data.rst.goodschangeprotocal.theAttachment.length>0){
                    $scope.uploadFile = data.rst.goodschangeprotocal.theAttachment[0].filePath;
                    $scope.docName = data.rst.goodschangeprotocal.theAttachment[0].fileName;
                }
                $scope.QD_DATA.contractno = $scope.ORDER_DATA.groupno;
                $scope.QD_DATA.stomer = $scope.ORDER_DATA.stomer;
                $scope.fdList = data.rst.goodschangeprotocal.addrebatelist;
                $scope.excleWlData.right.MatchAdd = data.rst.MatchAdd;
                $scope.excleWlData.right.MatchSubtract = data.rst.MatchSubtract;
                if($scope.excleWlData.right.MatchAdd.length<=0){
                    $scope.buHIf = false;
                }
                if($scope.excleWlData.right.MatchSubtract<=0){
                    $scope.tuiHIf = false;
                    $scope.tuiHIfBot = false;
                }
                if($scope.ORDER_DATA.escompany == '中建材集团进出口公司'|| $scope.ORDER_DATA.contracttype == '专有服务'|| $scope.ORDER_DATA.contracttype == '配套销售'){
                    $scope.sztIf = true;
                }
                $scope.contractId = data.rst._id;
                $scope.excleFormData ={contractId:$scope.contractId,'userid':person.user._id}
            }else{
                swal(data.msg, "", "warning");
            }
        });
    }


    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;

    $scope.fdBox = function(){//销售返点
        $( "#fdBox" ).dialog({
            autoOpen: false,
            width: 950,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $scope.fdBoxSub();
                    }
                }
            ]
        });
        $( "#fdBox" ).dialog( "open" );
        //var fParam = {'userid': $scope.stomerid}//,'money': $scope.QD_DATA.contactname
        var fParam = {'userid': $scope.stomerid,'receipttype':$scope.receipttype,'task':'contract'}
        var listFd = payment.listFd(fParam);
        listFd.success(function(data){
            if(data.code == 200){
                $scope.fDList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
        $scope.fdTotal = 0;
    };

    $scope.fdCheck = function(index){
        var fdTable = $("#fdTable");
        var curInput = $("#fdTable").find("input").eq(index);
        var par = $(curInput).parent().parent();
        var kyfd = parseFloat(par.find("td:eq(7)").html());
        if(!curInput.attr("checked") || curInput.attr("checked")==false){
            curInput.attr("checked",true);
            curInput.addClass('checkClass');
            //$scope.fdTotal += kyfd;
        }else {
            curInput.attr("checked",false);
            curInput.removeClass('checkClass');
            // $scope.fdTotal -= kyfd;
        }
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkAccount = 0;
        $.each(fdTrChecklist, function(key, value) {

            var par2 = $(this).parent().parent();
            checkAccount += parseFloat(par2.find("td:eq(7)").html());
        });
        $scope.fdTotal = Math.round(checkAccount*100)/100;;
    };
    $scope.fdListDelet = function(index){
        $scope.QD_DATA.addrebate = Math.round(($scope.QD_DATA.addrebate*1 - $scope.fdList[index].amount*1)*100)/100;
        $scope.fdList.splice(index,1);
    };
    $scope.fdBoxSub = function(){
        var fdTable = $("#fdTable");
        var fdTrlist = $("#fdTable").find("input");
        var fdTrChecklist = $("#fdTable").find(".checkClass");
        var checkArr = $scope.checkArr = [];
        var checkTotal = 0;
        var listTotal = 0;
        if(!$scope.fdTotal || $scope.fdTotal<=0){
            swal("请填写使用返点金额", "", "warning");
            return false;
        }else{
            if(fdTrChecklist.length > 0) {
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrChecklist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont=(allCheckCont*100+parseFloat(par2.find("td:eq(7)").html()*100))/100;
                });
                if(allCheckCont<kyToCount){
                    swal("选中的返点总金额"+allCheckCont+"小于输入的返点总金额"+kyToCount, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrChecklist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.amount3 = Math.round(kyToCount*100)/100;
                            checkObj.amount = Math.round(kyToCount*100)/100;
                            checkObj.amount2 = Math.round(kyToCount*100)/100;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.amount3 = Math.round(kyCount*100)/100;
                            checkObj.amount2 = Math.round(kyCount*100)/100;
                            checkObj.amount = Math.round(kyCount*100)/100;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }else if(fdTrChecklist.length <= 0){
                var kyToCount = $scope.fdTotal;//输入需要返点的总金额
                var allCheckCont = 0;
                $.each(fdTrlist, function(key, value){
                    var par2 = $(this).parent().parent();
                    allCheckCont+= parseFloat(par2.find("td:eq(7)").html());
                });
                if(allCheckCont<kyToCount){
                    swal("您输入的返点金额"+kyToCount+"大于总返点金额"+allCheckCont, "", "warning");
                    return false;
                }else{
                    var checkAccount = 0;
                    $.each(fdTrlist, function(key, value){
                        var checkObj = {};
                        var par2 = $(this).parent().parent();
                        checkAccount += parseFloat(par2.find("td:eq(7)").html());
                        var kyCount = parseFloat(par2.find("td:eq(7)").html());
                        if(kyToCount - kyCount <= 0){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.amount = kyToCount;
                            checkObj.amount2 = kyToCount;
                            checkObj.amount3 = kyToCount;
                            checkArr.push(checkObj);
                            return false;
                        }else if(kyToCount - kyCount > 0 ){
                            checkObj.theid = par2.find("td:eq(0)").attr("fdId");
                            checkObj.NO = par2.find("td:eq(1)").html();
                            checkObj.effectdate = par2.find("td:eq(2)").html();
                            checkObj.title = par2.find("td:eq(4)").html();
                            checkObj.money = par2.find("td:eq(6)").html();
                            checkObj.amount = kyCount;
                            checkObj.amount2 = kyCount;
                            checkObj.amount3 = kyCount;
                            kyToCount = kyToCount - kyCount;
                            checkArr.push(checkObj);
                        }
                    });
                }
            }

            $( "#fdBox" ).dialog("destroy");
            $(".ui-dialog").remove();

            $scope.$apply(function () {
                $scope.fdList = checkArr;
                $scope.QD_DATA.addrebate = $scope.fdTotal;
            });
        }
    };

    $scope.excleConf = {
        formData:{'userid':person.user._id},//contractId:$stateParams.id,
        buttonText:'上传清单',
        uploader:'/contractchange/uploadprotocal'
    };
    $scope.unitpriceFun = function(type,index,thesum,changeCount){
        var unitprice = Math.round((thesum*1)/(changeCount*1)*100)/100;
        if(type == 'MatchAdd'){
            $(".MatchAddClass").eq(index).find('.unitprice:eq(0)').val(unitprice).trigger('change');
        }else{
            $(".MatchSubtractClass").eq(index).find('.unitprice:eq(0)').val(unitprice).trigger('change');
        }
    }

    $scope.comeDel = function(index,type){
        if(type == 'MatchAdd'){
            $scope.excleWlData.right.MatchAdd.splice(index,1);
            if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务')&&$scope.ORDER_DATA.canRepairProjectFee ==1&&$scope.ORDER_DATA.Oldcp == '0'&&$scope.excleWlData.right.MatchAdd.length<=0){
                $scope.cpDisable = true;//有补货的时候 cp可以修改
            }
        }else if(type == 'MatchSubtract'){
            $scope.excleWlData.right.MatchSubtract.splice(index,1);
        }else if(type == 'noMatch'){
            $scope.excleWlData.error.noMatch.splice(index,1);
        }else if(type == 'errMatchSubtract'){
            $scope.excleWlData.error.errMatchSubtract.splice(index,1);
        }
        if($scope.excleWlData.right.MatchAdd<=0){
            $scope.buHIf = false;
            $scope.QD_DATA.addrebate = 0;
            $scope.QD_DATA.addgoodsmoney = 0;
            $scope.fdList = [];
        }
        if($scope.excleWlData.right.MatchSubtract<=0){
            $scope.tuiHIf = false;
            $scope.tuiHIfBot = false;
            $scope.QD_DATA.returngoodsmoney = 0;
            $scope.QD_DATA.returnrebate = 0;
        }
    };
    $scope.addDataBase = function(data,statue){
        if(!$scope.QD_DATA.returngoodsmoney){$scope.QD_DATA.returngoodsmoney=0}
        if(!$scope.QD_DATA.addgoodsmoney){$scope.QD_DATA.addgoodsmoney=0}
        $scope.ORDER_DATA.rebatemoney = $scope.ORDER_DATA.Oldrebatemoney*1-$scope.QD_DATA.returnrebate*1+$scope.QD_DATA.addrebate*1;
        var saveParam = {};
        saveParam.processId = $scope.processId;
        saveParam.nodeId = $scope.nodeId;
        saveParam.contractId = $scope.contractId;
        saveParam.doc = $scope.doc;
        if(!$scope.ORDER_DATA.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.contracttemplate !='自有服务标准合同' && $scope.contractSource == true) {
            if ($scope.contactreceivablescondition.length <= 0) {
                swal("合同收款条款不能为空", "", "warning");
                return false;
            } else {
                var blTotal = 0;
                var monTotal = 0;
                angular.forEach($scope.contactreceivablescondition, function (datac) {
                    if (datac.scale) {
                        /*blTotal += parseFloat(datac.scale);*/
                        blTotal = blTotal + Math.round(datac.scale*100)/100;
                    } else if (datac.money) {
                        /*monTotal += parseFloat(datac.money);*/
                        monTotal = monTotal + Math.round(datac.money*100)/100;
                    }
                });
                if ($scope.contactreceivablescondition[0].scale) {
                    if (blTotal != 100) {
                        swal("收款比例之和总和不是100%，请修改", "", "warning");
                        return false;
                    }
                }
                if ($scope.contactreceivablescondition[0].money) {
                    if($scope.ORDER_DATA.rebatemoney == undefined){
                        $scope.ORDER_DATA.rebatemoney = 0;
                    }
                    if(!$scope.QD_DATA.returngoodsmoney){$scope.QD_DATA.returngoodsmoney=0}
                    if(!$scope.QD_DATA.addgoodsmoney){$scope.QD_DATA.addgoodsmoney=0}
                    if(!$scope.QD_DATA.returnrebate){$scope.QD_DATA.returnrebate=0}
                    if(!$scope.QD_DATA.addrebate){$scope.QD_DATA.addrebate=0}
                    var contrNum = Math.round((($scope.ORDER_DATA.Oldcontractmoney*1+$scope.QD_DATA.returngoodsmoney+$scope.QD_DATA.addgoodsmoney)-($scope.ORDER_DATA.Oldrebatemoney*1-$scope.QD_DATA.returnrebate*1+$scope.QD_DATA.addrebate*1))*100)/100;
                    if(monTotal != contrNum){
                        swal("收款金额之和不等于变更后合同总金额减去返点金额"+contrNum+"，请修改条款", "", "warning");
                        return false;
                    }
                }
            }
        }
        if(($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同'|| $scope.ORDER_DATA.contracttemplate == '华为服务标准合同') && $scope.contractSource == true){
            $scope.putMeg();
        }
        $scope.ORDER_DATA.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
        if(saveParam.doc.model){
            saveParam.doc.model.contractbase = $scope.ORDER_DATA;
        }else {
            saveParam.doc.contractbase = $scope.ORDER_DATA;
        }
        if($scope.contractSource && $scope.zyfwIf && $scope.ORDER_DATA.receiver.length<=0){
            swal("请添加基本信息里面的交货地点和联系人", "", "warning");
            return false;
        }
        var addInsideBillChangeSave;
        if($scope.contracttype == '配套销售'){
            addInsideBillChangeSave = payment.cognateaddInsideBillChangeSave(saveParam);
        }else{
            addInsideBillChangeSave = payment.addInsideBillChangeSave(saveParam);
        }
        addInsideBillChangeSave.success(function(data3) {
            if (data3.code == 200) {
                $scope.processId = data3.rst.doc.processId;
                $scope.nodeId = data3.rst.doc.nodeId;
                swal("保存成功", "", "success");
            }else {
                swal(data3.msg, "", "warning");
            }
        });


    }
    $scope.addData = function(data,statue){
        if(!$scope.QD_DATA.returngoodsmoney){$scope.QD_DATA.returngoodsmoney=0}
        if(!$scope.QD_DATA.addgoodsmoney){$scope.QD_DATA.addgoodsmoney=0}
        $scope.ORDER_DATA.rebatemoney = $scope.ORDER_DATA.Oldrebatemoney*1-$scope.QD_DATA.returnrebate*1+$scope.QD_DATA.addrebate*1;
        var doc={},param= {},itemParam = {};
        doc = data;
        if(!$scope.ORDER_DATA.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        if($scope.contractSource && $scope.zyfwIf && $scope.ORDER_DATA.receiver.length<=0){
            swal("请添加基本信息里面的交货地点和联系人", "", "warning");
            return false;
        }
        if($scope.ORDER_DATA.contracttemplate !='自有服务标准合同' && $scope.contractSource == true) {
            if ($scope.contactreceivablescondition.length <= 0) {
                swal("合同收款条款不能为空", "", "warning");
                return false;
            } else {
                var blTotal = 0;
                var monTotal = 0;
                angular.forEach($scope.contactreceivablescondition, function (datac) {
                    if (datac.scale) {
                        /*blTotal += parseFloat(datac.scale);*/
                        blTotal = blTotal + Math.round(datac.scale*100)/100;
                    } else if (datac.money) {
                        /*monTotal += parseFloat(datac.money);*/
                        monTotal = monTotal + Math.round(datac.money*100)/100;
                    }
                });
                if ($scope.contactreceivablescondition[0].scale) {
                    if (blTotal != 100) {
                        swal("收款比例之和总和不是100%，请修改", "", "warning");
                        return false;
                    }
                }
                if ($scope.contactreceivablescondition[0].money) {
                    if($scope.ORDER_DATA.rebatemoney == undefined){
                        $scope.ORDER_DATA.rebatemoney = 0;
                    }
                    if(!$scope.QD_DATA.returngoodsmoney){$scope.QD_DATA.returngoodsmoney=0}
                    if(!$scope.QD_DATA.addgoodsmoney){$scope.QD_DATA.addgoodsmoney=0}
                    if(!$scope.QD_DATA.returnrebate){$scope.QD_DATA.returnrebate=0}
                    if(!$scope.QD_DATA.addrebate){$scope.QD_DATA.addrebate=0}
                    var contrNum = Math.round((($scope.ORDER_DATA.Oldcontractmoney*1+$scope.QD_DATA.returngoodsmoney+$scope.QD_DATA.addgoodsmoney)-($scope.ORDER_DATA.Oldrebatemoney*1-$scope.QD_DATA.returnrebate*1+$scope.QD_DATA.addrebate*1))*100)/100;
                    if(monTotal != contrNum){
                        swal("收款金额之和不等于合同总金额减去返点金额"+contrNum+"，请修改", "", "warning");
                        return false;
                    }
                }
            }
        }
        if(($scope.ORDER_DATA.contracttemplate == '华为硬件标准合同'|| $scope.ORDER_DATA.contracttemplate == '华为服务标准合同') && $scope.contractSource == true){
            $scope.putMeg();
        }
        $scope.ORDER_DATA.contactreceivablescondition = $scope.contactreceivablescondition;//合同收款条款
        var theAttachment = [];//附件字段
        var fileObj = {};
        fileObj.filePath = $scope.uploadFile;
        fileObj.fileName = $scope.docName;
        theAttachment.push(fileObj);
        doc.theAttachment = theAttachment;
        doc.canuserebate = $scope.canuserebate;
        doc.removeZREBATE = $scope.removeZREBATE;
        var protocalItem = [];
        protocalItem = $scope.excleWlData.right.MatchAdd.concat($scope.excleWlData.right.MatchSubtract);
        if($scope.excleWlData.error.noMatch.length>=1 || $scope.excleWlData.error.errMatchSubtract.length>=1){
            swal("变更清单中红色的为错误信息，请删除后再提交", "", "warning");
            return false;
        }
        if(protocalItem<=0){
            swal("请上传变更清单", "", "warning");
            return false;
        }
        if($scope.excleWlData.right.MatchAdd.length>0){
            var MatchAddTotal = 0;
            angular.forEach($scope.excleWlData.right.MatchAdd, function(data,index,array){
                //MatchAddTotal += Math.round(data.changeCount*data.unitprice*100)/100;
                MatchAddTotal += data.thesum*1
            });
            if(doc.addgoodsmoney == undefined){
                swal("补货金额不能为空", "", "warning");
                return false;
            }else if(Math.round(MatchAddTotal*100)/100 != parseFloat(doc.addgoodsmoney)){
                swal("补货金额"+doc.addgoodsmoney+"和清单里面的补货总金额"+Math.round(MatchAddTotal*100)/100+"不相等", "", "warning");
                return false;
            }
        }else if(($scope.excleWlData.right.MatchAdd == undefined || $scope.excleWlData.right.MatchAdd.length <= 0) && parseFloat(doc.addgoodsmoney) > 0){
            swal("没有补货清单，请把补货金额改成0", "", "warning");
            return false;
        }
        if($scope.excleWlData.right.MatchSubtract.length>0){
            var MatchSubtractTotal = 0;
            angular.forEach($scope.excleWlData.right.MatchSubtract, function(data,index,array){
                //MatchSubtractTotal += Math.round(data.changeCount*data.unitprice*100)/100;
                MatchSubtractTotal += data.thesum*1
            });
            if(doc.returngoodsmoney == undefined){
                swal("退货金额不能为空", "", "warning");
                return false;
            }else if(Math.round(MatchSubtractTotal*100)/100 != parseFloat(doc.returngoodsmoney)){
                swal("退货金额"+doc.returngoodsmoney+"和清单里面的退货总金额"+Math.round(MatchSubtractTotal*100)/100+"不相等", "", "warning");
                return false;
            }
        }else if(($scope.excleWlData.right.MatchSubtract == undefined || $scope.excleWlData.right.MatchSubtract.length <= 0 )&& parseFloat(doc.returngoodsmoney) > 0){
            swal("没有退货清单，请把退货金额改成0", "", "warning");
            return false;
        }
        if(($scope.ORDER_DATA.contracttype == '项目'||$scope.ORDER_DATA.contracttype == '专有服务') && $scope.ORDER_DATA.canRepairProjectFee ==1 && $scope.ORDER_DATA.cp == '1'&& $scope.ORDER_DATA.cp != $scope.ORDER_DATA.Oldcp && $scope.excleWlData.right.MatchAdd.length<=0){
            swal("没有补货，基本信息里面的CP值不能修改", "", "warning");
            return false;
        }

        /*//hasBack 退 hasRemove撤货
        if($scope.QD_DATA.returnrebate == ''){
            $scope.QD_DATA.returnrebate = 0;
        }*/
        if($scope.uploadDataBill && $scope.uploadDataBill.inventory == 0 && $scope.uploadDataBill.hasBack >0 && $scope.uploadDataBill.hasRemove >0 && parseFloat($scope.QD_DATA.returnrebate) < $scope.uploadDataBill.removeZREBATE){//有撤货也有退货
            swal("退货返点金额必须大于等于"+$scope.uploadDataBill.removeZREBATE, "", "warning");
            return false;
        }else if($scope.uploadDataBill && $scope.uploadDataBill.inventory == 0 && $scope.uploadDataBill.hasBack <=0 && $scope.uploadDataBill.hasRemove >0 && parseFloat($scope.QD_DATA.returnrebate) != $scope.uploadDataBill.removeZREBATE){//只有撤货
            swal("退货返点金额必须等于"+$scope.uploadDataBill.removeZREBATE, "", "warning");
            return false;
        }
        doc.addrebatelist = $scope.fdList;

        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.contractId = $scope.contractId;
        param.doc = doc;//addInsideBillChangeTtems
        itemParam.protocalItem = protocalItem;
        itemParam.contractId = $scope.contractId;
        itemParam.returnrebate = $scope.QD_DATA.returnrebate;
        itemParam.addrebate = $scope.QD_DATA.addrebate;
        var saveParam = {};
        saveParam.processId = $scope.processId;
        saveParam.nodeId = $scope.nodeId;
        saveParam.contractId = $scope.contractId;
        saveParam.doc = $scope.doc;

        if(statue == "save"){
            var addInsideBillChangeTtems = payment.addInsideBillChangeTtems(itemParam);
            addInsideBillChangeTtems.success(function(data){
                if(data.code == 200){
                    param.doc.inventory = data.rst.inventory;
                    param.doc.removeZREBATE  = data.rst.removeZREBATE;
                    var addInsideBillChange = payment.addInsideBillChange(param);
                    addInsideBillChange.success(function(data2){
                        if(data2.code == 200){
                            var addInsideBillChangeSave;
                            if($scope.contracttype == '配套销售'){
                                addInsideBillChangeSave = payment.cognateaddInsideBillChangeSave(saveParam);
                            }else{
                                addInsideBillChangeSave = payment.addInsideBillChangeSave(saveParam);
                            }
                            addInsideBillChangeSave.success(function(data3) {
                                if (data3.code == 200) {
                                    $scope.processId = data3.rst.doc.processId;
                                    $scope.nodeId = data3.rst.doc.nodeId;
                                    swal("保存成功", "", "success");
                                }else {
                                    swal(data3.msg, "", "warning");
                                }
                            });
                        }else {

                        }
                    });
                }else if(data.code == 30) {
                    swal(data.msg, "", "warning");
                    return false;
                }else {
                    swal(data.msg, "", "warning");
                    $scope.excleWlData.right.MatchAdd = data.rst.right.MatchAdd;
                    $scope.excleWlData.right.MatchSubtract = data.rst.right.MatchSubtract;
                    $scope.excleWlData.error.noMatch = data.rst.error.noMatch;
                    $scope.excleWlData.error.errMatchSubtract = data.rst.error.errMatchSubtract;
                    return false;
                }
            });

        }else if(statue == 'apply'){
            var paramApply = {};
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    paramApply.candidates[0].receivers = [selObj];
                }

                // paramApply = {'processId':$scope.processId,'nodeId':$scope.nodeId,'contractId':$scope.contractId,'doc':$scope.doc};
                $.extend(true,paramApply, {'processId':$scope.processId,'nodeId':$scope.nodeId,'contractId':$scope.contractId,'doc':$scope.doc});

                var applyAddBillChange;
                if($scope.contracttype == '配套销售'){
                    applyAddBillChange = payment.cognateapplyAddBillChange(paramApply);
                }else{
                    applyAddBillChange = payment.applyAddBillChange(paramApply);
                }
                applyAddBillChange.success(function (data) {
                    if (data.code == 200) {
                        $scope.processId = data.rst.processId;
                        $scope.nodeId = data.rst.nodeId;
                        swal({
                            title: "提交成功",
                            text: "",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回合同列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/contractOrder';
                            // window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                        });
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            };

            var addInsideBillChangeTtems = payment.addInsideBillChangeTtems(itemParam);
            addInsideBillChangeTtems.success(function(data){
                if(data.code == 200){
                    param.doc.inventory = data.rst.inventory;
                    param.doc.removeZREBATE  = data.rst.removeZREBATE;
                    var addInsideBillChange = payment.addInsideBillChange(param);
                    addInsideBillChange.success(function(data){
                        if(data.code == 200){
                            var addInsideBillChangeSave;
                            if($scope.contracttype == '配套销售'){
                                addInsideBillChangeSave = payment.cognateaddInsideBillChangeSave(saveParam);
                            }else{
                                addInsideBillChangeSave = payment.addInsideBillChangeSave(saveParam);
                            }
                            addInsideBillChangeSave.success(function(data) {
                                if (data.code == 200) {
                                    $scope.candidates = data.rst.doc.candidates;
                                    $scope.processId = data.rst.doc.processId;
                                    $scope.nodeId = data.rst.doc.nodeId;
                                    // if(($scope.contracttype == '项目' || $scope.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                                    if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
                                        $scope.receivers = $scope.candidates[0].receivers;
                                        paramApply.candidates = $scope.candidates;
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
                            });

                        }else {

                            swal(data.msg, "", "warning");
                        }
                    });
                }else if(data.code == 30) {
                    swal(data.msg, "", "warning");
                    return false;
                }else {
                    swal(data.msg, "", "warning");
                    $scope.excleWlData.right.MatchAdd = data.rst.right.MatchAdd;
                    $scope.excleWlData.right.MatchSubtract = data.rst.right.MatchSubtract;
                    $scope.excleWlData.error.noMatch = data.rst.error.noMatch;
                    $scope.excleWlData.error.errMatchSubtract = data.rst.error.errMatchSubtract;
                    return false;
                }
            });

        }
    }
}]);
contractApp.controller('applyContractChangeCtrl', ['$scope','$rootScope','$stateParams','contractServices',function($scope,$rootScope,$stateParams,service){

    // 判断是不是商务节点
    $scope.business = $rootScope.billPrev.business_common;
    var excleWlData = $scope.excleWlData = {};
    var QD_DATA = $scope.QD_DATA = {};
    var tuObj = $scope.tuObj = {};
    var buObj = $scope.buObj = {};
    $scope.excleWlData.right = {};
    $scope.excleWlData.error = {};
    $scope.excleWlData.right.MatchSubtract = [];
    $scope.excleWlData.right.MatchAdd = [];
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    var person = $rootScope.loginPerson;

    var newprev = $rootScope.billPrev;
    $scope.myflag = $stateParams.myflag;
    if(newprev.contractcost_page){
        $scope.cbfxPrev = true;//判断是否能够做成本分析
    }

    var paramChange = {sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(paramChange, {myflag: "mysubscriber" })
    }
    var applyViewBillChange = service.applyViewBillChange(paramChange);
    // var applyViewBillChange = service.applyViewBillChange({sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId});
    applyViewBillChange.success(function(data) {
        if(data.code == 200){
            $scope.doc = data.rst.doc;
            $scope.Id = data.rst.doc.model.contractId;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.contractId = data.rst.doc.model.contractId;
            $scope.candidates = data.rst.candidates;
            $scope.groupno = data.rst.doc.model.contractbase.groupno;
            $scope.cp = data.rst.doc.model.contractbase.cp;
            if(data.rst.doc.model.contractbase.transferway&&data.rst.doc.model.contractbase.transferway!=''){//运输方式
                var deliverwayObj = [{code:'01',name:'国内陆运'},{code:'02',name:'国内海运'},{code:'03',name:'国内空运'},{code:'04',name:'国际陆运'},{code:'05',name:'国际海运'},{code:'06',name:'国际空运'},{code:'07',name:'陆运快件'},{code:'08',name:'火车运输'},{code:'09',name:'快递'},{code:'10',name:'专车'},{code:'11',name:'自提'}, {
                    code: '12',
                    name: '无实物发货'
                }];
                var transferwayName = getField(deliverwayObj,'code',data.rst.doc.model.contractbase.transferway);
                $scope.transferway = transferwayName.name;
            }
            if(data.rst.doc.model.contractbase.cp == '0'){
                $scope.cpIf = true;
            }else {
                $scope.cpIf = false;
            }
            if(data.rst.doc.model.contractbase == '中建材集团进出口公司'){
                $scope.ifxf = false;
            }else {
                if(data.rst.doc.model.contractbase.contractmoney=='0' || data.rst.doc.model.contractbase.contracttype=='专有服务'|| data.rst.doc.model.contractbase.contracttype=='配套销售'){
                    $scope.ifxf = false;
                }else{
                    $scope.ifxf = true;
                }
            }
            switch (data.rst.doc.model.contractbase.contracttemplate)
            {
                case '华为硬件标准合同':
                    $scope.hkttk = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    // $scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = false;
                    $scope.xmgcfwfXs2 = true;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = true;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为硬件非标准合同':
                    $scope.hkttk = true;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = true;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = true;
                    $scope.xmgcfwfXs1 = true;
                    $scope.xmgcfwfXs2 = false;
                    $scope.xmgcfuXs = true;
                    $scope.xmgcfsTr = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '华为服务非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    // $scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '自有服务标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = false;
                    //$scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = false;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '鉴于，乙方已向甲方提供完本协议项下全部服务及商务工作，甲方同意在本协议生效后5日内将本合同项下服务费一次性全部支付给乙方。';
                    break;
                case '自有服务非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = true;
                    $scope.jhfs2 = false;
                    // $scope.ORDER_DATA.deliverwaycheck = {};
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = true;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    $scope.ifEmail = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case 'Oracle标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = true;
                    //合同条款
                    $scope.httkIf = false;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
                case '非标准合同':
                    $scope.hkttk = false;
                    //发票开具说明
                    $scope.fpkjDes = false;
                    //合同条款
                    $scope.httkIf = true;
                    $scope.jhfs1 = false;
                    $scope.jhfs2 = true;
                    //交货条款区域
                    $scope.jhtkXs = false;
                    //产品保修条款区域
                    $scope.cpbxtkXs = false;
                    //项目工程服务方式
                    $scope.xmgcfwfXs = false;
                    $scope.xmgcfuXs = false;
                    //合同收款条款
                    $scope.ifHttk = true;
                    //$scope.ORDER_DATA.contactreceivablesconditionshowarea = '';
                    break;
            }
            $scope.groupno = data.rst.doc.model.contractbase.groupno;
            $scope.contracttype = data.rst.doc.model.contractbase.contracttype;
            $scope.is2body = data.rst.doc.model.contractbase.is2body;
            $scope.QD_DATA = data.rst.doc.model.goodschangeprotocal;
            $scope.QD_DATA.contractmoney = data.rst.doc.model.contractbase.contractmoney;
            $scope.QD_DATA.contractno = data.rst.doc.model.contractbase.contractno;
            $scope.QD_DATA.returngoodsmoney = Math.round($scope.QD_DATA.returngoodsmoney*100)/100;
            if(data.rst.doc.model.goodschangeprotocal.theAttachment.length>0 && data.rst.doc.model.goodschangeprotocal.theAttachment[0] != null){
                $scope.uploadFile = data.rst.doc.model.goodschangeprotocal.theAttachment[0].filePath;
                $scope.docName = data.rst.doc.model.goodschangeprotocal.theAttachment[0].fileName;
            }
            $scope.QD_DATA.stomer = data.rst.doc.model.contractbase.stomer;
            $scope.QD_DATA.stomerid = data.rst.doc.model.contractbase.stomerid;
            $scope.fdList = data.rst.doc.model.goodschangeprotocal.addrebatelist;
            $scope.excleWlData.right.MatchAdd = data.rst.doc.model.MatchAdd;//补货
            $scope.excleWlData.right.MatchSubtract = data.rst.doc.model.MatchSubtract;//退货
            $scope.goodschangeprotocalcost = data.rst.doc.model.goodschangeprotocalcost;
            $scope.receipttype  = data.rst.doc.model.contractbase.receipttype;


            if(data.rst.doc.model.contractbase.cp == '0'){
                $scope.cpIf = true;
            }else {
                $scope.cpIf = false;
            }



            var matchNum = 0;
            angular.forEach($scope.excleWlData.right.MatchAdd, function(data,index,array){
                matchNum += data.changeCount;
            });
            $scope.buObj.amount = matchNum;

            $scope.buObj.allMoney = $scope.QD_DATA.addgoodsmoney;
            $scope.buObj.money1 = $scope.QD_DATA.addrebate;
            $scope.apCot = true;
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
                $scope.apCot = false;
            }
            $scope.ifcbfxCy = true;
            if($scope.cbfxPrev == true && $scope.agreeBtn == true && $scope.contracttype != '配套销售'){//data.rst.doc.model.changeothercost.length <=0
                $scope.xsCbfx = true;//显示成本分析
                $scope.ifcbfxCy = false;//编辑成本分析
                if(data.rst.doc.model.contractbase.cp == '0'){
                    $scope.cpThirdIf = true;
                }
            }else if(data.rst.doc.model.changeothercost.length >0 ){
                $scope.xsCbfx = true;//只显示成本分析
                $scope.ifcbfxCy = true;//编辑成本分析
            }
            var cbfxObj = $scope.cbfxObj = {};
            if(data.rst.doc.model.othercost.length>0){

                if(data.rst.doc.model.purchase != undefined){
                    cbfxObj.t2 = data.rst.doc.model.purchase;
                }
                if(data.rst.doc.model.delta != undefined){
                    cbfxObj.t3 = data.rst.doc.model.delta;
                }

            }
            if($scope.cbfxPrev == true && $scope.agreeBtn == true && $scope.contracttype != '配套销售') {
                var getothercost = service.getothercost({doc: {processId: $stateParams.processId}});
                getothercost.success(function (data) {
                    if (data.code == 200) {
                        if(data.rst.goodschangeprotocalcost.length>0){
                            $scope.tuObj = data.rst.goodschangeprotocalcost[0];
                            if($scope.tuObj.ticketType == '税率6%'){
                                $scope.tuObj.shulv = 0.06;
                                $scope.buObj.shulv = 0.06;
                            }else {
                                $scope.tuObj.shulv = 0.17;
                                $scope.buObj.shulv = 0.17;
                            }
                        }
                        //主合同成本分析数据
                        cbfxObj.t1 = $scope.cbfxObj.t1 = data.rst.othercost;
                        $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                        $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                        $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                        $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                        if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                            $scope.companygain = 0;
                            $scope.salesgain = 0;
                        }
                        $scope.changeothercost = data.rst.changeothercost;
                        $scope.$watchCollection('changeothercost[0]', function (newValue, oldValue, scope) {
                            $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                            $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                            $scope.billcompanygain = Math.round(($scope.billmaoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1))) * 10000) / 100;
                            $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                            $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                            $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;
                            if($scope.changeothercost[0].money == 0 && $scope.changeothercost[1].money == 0 && $scope.changeothercost[2].money == 0){
                                $scope.billsalesgain = 0;
                                $scope.billcompanygain = 0;
                            }
                        });
                        $scope.$watchCollection('changeothercost[1]', function (newValue, oldValue, scope) {
                            $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                            $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                            $scope.billcompanygain = Math.round(($scope.billmaoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1))) * 10000) / 100;
                            $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                            $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                            $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;
                            if($scope.changeothercost[0].money == 0 && $scope.changeothercost[1].money == 0 && $scope.changeothercost[2].money == 0){
                                $scope.billsalesgain = 0;
                                $scope.billcompanygain = 0;
                            }
                        });
                        $scope.$watchCollection('changeothercost[2]', function (newValue, oldValue, scope) {
                            $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                            $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                            $scope.billcompanygain = Math.round(($scope.maoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1))) * 10000) / 100;
                            $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                            $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                            $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;
                            if($scope.changeothercost[0].money == 0 && $scope.changeothercost[1].money == 0 && $scope.changeothercost[2].money == 0){
                                $scope.billsalesgain = 0;
                                $scope.billcompanygain = 0;
                            }
                        });

                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            }else if(data.rst.doc.model.changeothercost.length>0){
                //主合同成本分析数据
                cbfxObj.t1 = $scope.cbfxObj.t1 = data.rst.doc.model.othercost;
                $scope.maoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate*1+$scope.cbfxObj.t1[1].salerebate*1+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate*1+$scope.cbfxObj.t1[1].purchaserebate*1+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                $scope.maoliBHan =  ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)-($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1)+($scope.cbfxObj.t1[0].purchaserebate/1.17+$scope.cbfxObj.t1[1].purchaserebate/1.06+$scope.cbfxObj.t1[2].purchaserebate*1)-($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1)-($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1)-($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                $scope.companygain = Math.round(($scope.maoliBHan/(($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1)-($scope.cbfxObj.t1[0].salerebate/1.17+$scope.cbfxObj.t1[1].salerebate/1.06+$scope.cbfxObj.t1[2].salerebate*1)))*10000)/100;
                $scope.xMaoliHan = ($scope.cbfxObj.t1[0].money*1+$scope.cbfxObj.t1[1].money*1+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost*1+$scope.cbfxObj.t1[1].orderscost*1+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate*1+$scope.cbfxObj.t1[1].cashrebate*1+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup*1+$scope.cbfxObj.t1[1].selfpickup*1+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost*1+$scope.cbfxObj.t1[1].outorderost*1+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other*1+$scope.cbfxObj.t1[1].other*1+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating*1+$scope.cbfxObj.t1[1].mating*1+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third*1+$scope.cbfxObj.t1[1].third*1+$scope.cbfxObj.t1[2].third*1);
                $scope.xMaoliBHan = ($scope.cbfxObj.t1[0].money/1.17+$scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1) - ($scope.cbfxObj.t1[0].orderscost/1.17+$scope.cbfxObj.t1[1].orderscost/1.06+$scope.cbfxObj.t1[2].orderscost*1) - ($scope.cbfxObj.t1[0].cashrebate/1.17+$scope.cbfxObj.t1[1].cashrebate/1.06+$scope.cbfxObj.t1[2].cashrebate*1) - ($scope.cbfxObj.t1[0].selfpickup/1.17+$scope.cbfxObj.t1[1].selfpickup/1.06+$scope.cbfxObj.t1[2].selfpickup*1) - ($scope.cbfxObj.t1[0].outorderost/1.17+$scope.cbfxObj.t1[1].outorderost/1.06+$scope.cbfxObj.t1[2].outorderost*1) - ($scope.cbfxObj.t1[0].other/1.17+$scope.cbfxObj.t1[1].other/1.06+$scope.cbfxObj.t1[2].other*1) - ($scope.cbfxObj.t1[0].mating/1.17+$scope.cbfxObj.t1[1].mating/1.06+$scope.cbfxObj.t1[2].mating*1) - ($scope.cbfxObj.t1[0].third/1.17+$scope.cbfxObj.t1[1].third/1.06+$scope.cbfxObj.t1[2].third*1);
                $scope.salesgain = Math.round(($scope.xMaoliBHan/($scope.cbfxObj.t1[0].money/1.17 + $scope.cbfxObj.t1[1].money/1.06+$scope.cbfxObj.t1[2].money*1))*10000)/100;
                if($scope.ORDER_DATA.contractbase.contractmoney == 0){
                    $scope.companygain = 0;
                    $scope.salesgain = 0;
                }
                if(data.rst.doc.model.goodschangeprotocalcost.length > 0) {
                    $scope.tuObj = data.rst.doc.model.goodschangeprotocalcost[0];
                    //成本分析部分
                    if ($scope.tuObj.ticketType == '税率6%') {
                        $scope.tuObj.shulv = 0.06;
                        $scope.buObj.shulv = 0.06;
                    } else {
                        $scope.tuObj.shulv = 0.17;
                        $scope.buObj.shulv = 0.17;
                    }
                }
                $scope.changeothercost = data.rst.doc.model.changeothercost;
                $scope.$watchCollection('changeothercost[0]', function (newValue, oldValue, scope) {
                    $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                    $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                    $scope.billcompanygain = Math.round((($scope.billmaoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1)))) * 10000) / 100;
                    $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                    $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                    $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;
                    if($scope.changeothercost[0].money == 0 && $scope.changeothercost[1].money == 0 && $scope.changeothercost[2].money == 0){
                        $scope.billsalesgain = 0;
                        $scope.billcompanygain = 0;
                    }
                });
                $scope.$watchCollection('changeothercost[1]', function (newValue, oldValue, scope) {
                    $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                    $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                    $scope.billcompanygain = Math.round((($scope.billmaoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1)))) * 10000) / 100;
                    $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                    $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                    $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;
                    if($scope.changeothercost[0].money == 0 && $scope.changeothercost[1].money == 0 && $scope.changeothercost[2].money == 0){
                        $scope.billsalesgain = 0;
                        $scope.billcompanygain = 0;
                    }
                });
                $scope.$watchCollection('changeothercost[2]', function (newValue, oldValue, scope) {
                    $scope.billmaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate * 1 + $scope.changeothercost[1].salerebate * 1 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate * 1 + $scope.changeothercost[1].purchaserebate * 1 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                    $scope.billmaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) + ($scope.changeothercost[0].purchaserebate / 1.17 + $scope.changeothercost[1].purchaserebate / 1.06 + $scope.changeothercost[2].purchaserebate * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                    $scope.billcompanygain = Math.round((($scope.billmaoliBHan / (($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].salerebate / 1.17 + $scope.changeothercost[1].salerebate / 1.06 + $scope.changeothercost[2].salerebate * 1)))) * 10000) / 100;
                    $scope.billxMaoliHan = ($scope.changeothercost[0].money * 1 + $scope.changeothercost[1].money * 1 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost * 1 + $scope.changeothercost[1].orderscost * 1 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate * 1 + $scope.changeothercost[1].cashrebate * 1 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup * 1 + $scope.changeothercost[1].selfpickup * 1 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost * 1 + $scope.changeothercost[1].outorderost * 1 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other * 1 + $scope.changeothercost[1].other * 1 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating * 1 + $scope.changeothercost[1].mating * 1 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third * 1 + $scope.changeothercost[1].third * 1 + $scope.changeothercost[2].third * 1);
                    $scope.billxMaoliBHan = ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1) - ($scope.changeothercost[0].orderscost / 1.17 + $scope.changeothercost[1].orderscost / 1.06 + $scope.changeothercost[2].orderscost * 1) - ($scope.changeothercost[0].cashrebate / 1.17 + $scope.changeothercost[1].cashrebate / 1.06 + $scope.changeothercost[2].cashrebate * 1) - ($scope.changeothercost[0].selfpickup / 1.17 + $scope.changeothercost[1].selfpickup / 1.06 + $scope.changeothercost[2].selfpickup * 1) - ($scope.changeothercost[0].outorderost / 1.17 + $scope.changeothercost[1].outorderost / 1.06 + $scope.changeothercost[2].outorderost * 1) - ($scope.changeothercost[0].other / 1.17 + $scope.changeothercost[1].other / 1.06 + $scope.changeothercost[2].other * 1) - ($scope.changeothercost[0].mating / 1.17 + $scope.changeothercost[1].mating / 1.06 + $scope.changeothercost[2].mating * 1) - ($scope.changeothercost[0].third / 1.17 + $scope.changeothercost[1].third / 1.06 + $scope.changeothercost[2].third * 1);
                    $scope.billsalesgain = Math.round(($scope.billxMaoliBHan / ($scope.changeothercost[0].money / 1.17 + $scope.changeothercost[1].money / 1.06 + $scope.changeothercost[2].money * 1)) * 10000) / 100;
                    if($scope.changeothercost[0].money == 0 && $scope.changeothercost[1].money == 0 && $scope.changeothercost[2].money == 0){
                        $scope.billsalesgain = 0;
                        $scope.billcompanygain = 0;
                    }
                });
                if($scope.contracttype == '分销' && $rootScope.opprev.contractOrder_costanalysis == true && $scope.xsCbfx == true){
                    var fenxiaointerestsap = service.fenxiaointerestsap({contractId:$scope.Id});
                    fenxiaointerestsap.success(function(datafe) {
                        if(datafe.code == 200){
                            if(datafe.rst.data.cost){
                                $scope.xMaoliBHan = datafe.rst.data.cost.sellinterest;//销售毛利率
                                $scope.xMaoliHan = datafe.rst.data.cost.sellinterestContainTax;//销售含税利率
                                $scope.salesgain = datafe.rst.data.cost.sellcontractInterest;//销售合约利率
                            }
                            if(datafe.rst.data.bucost){
                                $scope.billxMaoliBHan = datafe.rst.data.bucost.sellinterest;//销售毛利率
                                $scope.billxMaoliHan = datafe.rst.data.bucost.sellinterestContainTax;//销售含税利率
                                $scope.billsalesgain = datafe.rst.data.bucost.sellcontractInterest ;//销售合约利率
                            }
                            if(datafe.rst.data.tuicost){
                                $scope.tuixMaoliBHan = datafe.rst.data.tuicost.sellinterest;//销售毛利率
                                $scope.tuixMaoliHan = datafe.rst.data.tuicost.sellinterestContainTax;//销售含税利率
                                $scope.tuisalesgain = datafe.rst.data.tuicost.sellcontractInterest+'%';//销售合约利率
                            }
                        }else{
                            swal(datafe.msg, datafe.rst, "warning");
                            $scope.xMaoliBHan = 0;//销售毛利率
                            $scope.xMaoliHan = 0;//销售含税利率
                            $scope.salesgain = 0;//销售合约利率

                            $scope.billxMaoliBHan = 0;//销售毛利率
                            $scope.billxMaoliHan = 0;//销售含税利率
                            $scope.billsalesgain = 0;//销售合约利率

                            $scope.tuixMaoliBHan = 0;//销售毛利率
                            $scope.tuixMaoliHan = 0;//销售含税利率
                            $scope.tuisalesgain = 0 + '%';//销售合约利率
                            return false
                        }
                    });
                }
            }


            // 客户信用情况查看
            $scope.loading = false;
            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ORDER_DATA.stomer, 'id':$scope.ORDER_DATA.stomerid};
                $scope.$broadcast('transfer.type', param);
            } catch (e) {}
        }else{
            swal(data.msg, "", "warning");
        }
    });
	// 2017-06-19 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.contractbase.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.contractbase.salesorderid.length ? $scope.ORDER_DATA.contractbase.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = service.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    $scope.viewHistory = function(Id){
        $( "#listversion" ).dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#listversion" ).dialog( "open" );
        var listversion = service.listversion({groupno:$scope.groupno});
        listversion.success(function(data){
            if(data.code == 200){
                $scope.contractHistory = data.rst;
            }
        });
    }
    var ifCost = true;//是否有成本分析
    var applyObj =  $scope.applyObj ={};

    $scope.applySave = function(){
        if($scope.excleWlData.right.MatchAdd.length>0 && $scope.ORDER_DATA.contractbase.cp == '1' && $scope.ifcbfxCy == false){
            var mating = $scope.changeothercost[0].mating*1+$scope.changeothercost[1].mating*1+$scope.changeothercost[2].mating*1;
            if(mating <= 0){
                swal('配套采购不能都小于0', "", "warning");
                return false;
            }
        }
        if($scope.ifcbfxCy == false) {
            var requiredObj = $scope.cbfxForm.$error;
            angular.forEach(requiredObj, function (keyData) {
                keyData.$dirty = true;
            })
            if (!$scope.cbfxForm.$valid) {
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }
        var param = {},saveParam = {},goodschangeprotocalcost = [];
        param.doc = $scope.doc;

        param.comment = applyObj.applyIdea;

        if(param.comment == '' || param.comment == undefined){
            swal('请填写保存意见', "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        goodschangeprotocalcost.push($scope.tuObj);
        //goodschangeprotocalcost.push(buObj);
        $scope.goodschangeprotocalcost = goodschangeprotocalcost;
        saveParam.processId = $stateParams.processId;
        var addInsideBillChangeSave;
        if($scope.contracttype == '配套销售'){
            addInsideBillChangeSave = service.cognateaddInsideBillChangeSave(param);
        }else{
            addInsideBillChangeSave = service.addInsideBillChangeSave(param);
        }
        addInsideBillChangeSave.success(function(data) {
            if(data.code == 200){
                if($scope.ifcbfxCy == false){//保存成本分析
                    var saverebate = service.saverebate({doc:saveParam,changeothercost:$scope.changeothercost,goodschangeprotocalcost: $scope.goodschangeprotocalcost});
                    saverebate.success(function(datac){
                        if(datac.code == 200){
                            window.location.reload();

                        }else {
                            swal(datac.msg, "", "warning");
                        }
                    });
                }else {
                    window.location.reload();
                }
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        if($scope.excleWlData.right.MatchAdd.length>0 && $scope.ORDER_DATA.contractbase.cp == '1' && $scope.ifcbfxCy == false){
            var mating = $scope.changeothercost[0].mating*1+$scope.changeothercost[1].mating*1+$scope.changeothercost[2].mating*1;
            if(mating <= 0){
                swal('配套采购不能都小于0', "", "warning");
                return false;
            }
        }
        if($scope.ifcbfxCy == false) {
            var requiredObj = $scope.cbfxForm.$error;
            angular.forEach(requiredObj, function (keyData) {
                keyData.$dirty = true;
            })
            if (!$scope.cbfxForm.$valid) {
                swal("您有信息填写不完整，请检查后再保存", "", "warning");
                return false;
            }
        }
        var param = {},saveParam = {},goodschangeprotocalcost = [];
        param.doc = $scope.doc;
        param.doc.model.contractbase.interest = $scope.maoliBHan;//毛利率
        param.doc.model.contractbase.interestContainTax = $scope.maoliHan;//含税利率
        param.doc.model.contractbase.contractInterest = $scope.companygain;//合约利率
        param.doc.model.contractbase.sellinterest = $scope.xMaoliBHan;//销售毛利率
        param.doc.model.contractbase.sellinterestContainTax = $scope.xMaoliHan;//销售含税利率
        param.doc.model.contractbase.sellcontractInterest = $scope.salesgain;//销售合约利率

        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        var listcandidates = service.listcandidates(param);
        listcandidates.success(function (data) {
            if (data.code == 200) {
                $scope.candidates = data.rst.candidates;
                param.candidates = $scope.candidates;
                goodschangeprotocalcost.push($scope.tuObj);
                //goodschangeprotocalcost.push(buObj);
                $scope.goodschangeprotocalcost = goodschangeprotocalcost;
                saveParam.processId = $stateParams.processId;

                // 提交
                $scope.applyFn = function (selIndex) {

                    if(selIndex !== -1) {
                        $("#approversDialog").dialog("destroy");
                        $(".ui-dialog").remove();
                        var selObj = $scope.receivers[selIndex];
                        param.candidates[0].receivers = [selObj];
                    }
                    if($scope.ifcbfxCy == false){//保存成本分析
                        var costParam = {};
                        costParam.doc = saveParam;
                        costParam.changeothercost = $scope.changeothercost;
                        costParam.goodschangeprotocalcost = $scope.goodschangeprotocalcost;
                        costParam.interest = $scope.maoliBHan;
                        costParam.interestContainTax = $scope.maoliHan;
                        costParam.contractInterest = $scope.companygain;
                        costParam.sellinterest = $scope.xMaoliBHan;
                        costParam.sellinterestContainTax = $scope.xMaoliHan;
                        costParam.sellcontractInterest = $scope.salesgain;

                        //{doc:saveParam,changeothercost:$scope.changeothercost,goodschangeprotocalcost: $scope.goodschangeprotocalcost}
                        var saverebate = service.saverebate(costParam);
                        saverebate.success(function(data){
                            if(data.code == 200){
                                var applyAgree = service.agreeBillChange(param);
                                applyAgree.success(function(data){
                                    if(data.code == 200){
                                        swal({
                                            title: "审批成功",
                                            text: "",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "返回销售合同待办",
                                            closeOnConfirm: true
                                        }, function(){ //window.location.href='/index.html#/index';
	                                        window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                                        });
                                    }else {
                                        swal("提交失败！", '', "error");
                                    }
                                }).error(function(error){
                                    alert(error);
                                });
                            }
                        });
                    }else {
                        var applyAgree;
                        if( $scope.contracttype == '配套销售'){
                            applyAgree = service.cognateagreeBillChange(param);
                        }else{
                            applyAgree = service.agreeBillChange(param);
                        }

                        applyAgree.success(function(data){
                            if(data.code == 200){
                                swal({
                                    title: "审批成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回销售合同待办",
                                    closeOnConfirm: true
                                }, function(){ //window.location.href='/index.html#/index';
	                                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                                });
                            }else {
                                swal("提交失败！", '', "error");
                            }
                        }).error(function(error){
                            alert(error);
                        });
                    }

                };

                // if((param.doc.model.contractbase.contracttype == '项目' || param.doc.model.contractbase.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
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
                // $scope.applyFn(-1);
            }
        });

    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree;
        if( $scope.contracttype == '配套销售'){
            disagree = service.cognatedisagreeBillChange(param);
        }else{
            disagree = service.disagreeBillChange(param);
        }
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售合同待办",
                    closeOnConfirm: true
                }, function(){ //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel;
        if( $scope.contracttype == '配套销售'){
            cancel = service.cognatecancelBillChange(param);
        }else{
            cancel = service.cancelBillChange(param);
        }
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回销售合同待办",
                    closeOnConfirm: true
                }, function(){   //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=销售合同&&controllercode=CONT,CONT_CHANGE,CONT_CONTENTCHANGE,COGN,COGN_CHANGE,COGN_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall;
        if( $scope.contracttype == '配套销售'){
            recall = service.cognaterecallBillChange(param);
        }else{
            recall = service.recallBillChange(param);
        }
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
}]);


//进出口销售合同
contractApp.controller('iecontractOrderCtrl', ['$scope','$rootScope','contractServices',function($scope,$rootScope,payment){
    var person = $rootScope.loginPerson;
    // var person = $cookieStore.get("persion");
    $scope.curUser = person.user.name;
    var saleorglist = payment.saleorglist({});
    saleorglist.success(function(data){
        if(data.code == 200){
            $scope.getSalesorgnanme = data.rst.data
        }else {
            swal(data.msg, "", "warning");
        }
    }).error(function(data){
        alert(data);
    });
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, classification:'1',salesname: $scope.salesname, contractno:$scope.contractno, stomer: $scope.stomer, salesorderid: $scope.salesorderid, projecttype: $scope.projecttype, tradername: $scope.tradername, salesorgid: $scope.salesorgid};
            var customerPromise = payment.listInsideIecontract(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.ikpShow=function(index,stomerid){
        var para= {KUNNR:stomerid};
        var nameCheck=payment.kpData(para);
        nameCheck.success(function(data){
            if(data.code==200) {
                if(data.rst.data.items.length==0){
                    swal("该客户的开票信息尚未维护！", "", "warning");
                    return false;
                }
                if(data.rst.data.items.length>0) {
                    if (data.rst.data.items[0].koinh == '') {
                        swal("该客户的开票信息尚未维护！", "", "warning");
                        return false;
                    }else{
                        if($scope.dataList[index].contractbase.receipttype=="税率0"){
                            $scope.receipttypeBox=$scope.dataList[index].contractbase.receipttype.substring(2,$scope.dataList[index].contractbase.receipttype.length);
                        }else{

                            $scope.receipttypeBox=$scope.dataList[index].contractbase.receipttype.substring(2,$scope.dataList[index].contractbase.receipttype.length-1);
                        }
                        window.open("index.html#/mkinvoiceAdd?contractno="+$scope.dataList[index].contractbase.contractno+"&stomer="+$scope.dataList[index].contractbase.stomer+"&receipttype="+$scope.receipttypeBox+"&stomerid="+$scope.dataList[index].contractbase.stomerid+"&conId="+$scope.dataList[index].contractbase.salesorderid[0].orderid);
                    }
                }
            }
        });

    }
}]);
contractApp.controller('iecontractAddCtrl', ['$scope','$stateParams','$rootScope','contractServices',function($scope,$stateParams,$rootScope,service){
    var ht = $scope.ht = {};
    var cbfxBs = $scope.cbfxBs = '';
    $scope.htTab = function(type){
        var type = type;
        if(type ==2 && $scope.contractId ==''){
            swal("请先保存合同基本信息", "", "warning");
            return false;
        }else if(type == 3 && $scope.cbfxBs != 'OK'){
            swal("请先保存产品清单", "", "warning");
            return false;
        }
        $scope.ht.activeTab = type;
    };
    //产品线enume
    var enumlist = service.enumlist();
    enumlist.success(function(data) {
        $scope.ZZCP =  data.rst.enum.ZZCP;
    }).error(function(error){
        alert(error);
    });
    var watchExcel = $scope.$watchCollection ('excleData', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.htType = function(type){
        if(type == '分销'){
            $scope.cpDisable = true;
            $scope.ORDER_DATA.cp = '0';
        }else {
            $scope.cpDisable = false;
        }
    }
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var CBFX = $scope.CBFX = {};//成本分析
    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];

    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.salesname = person.user.name;
    $scope.ORDER_DATA.salesid = person.user._id;
    $scope.ORDER_DATA.salesorgnanme = person.user.orgname;
    $scope.ORDER_DATA.salesorgid = person.user.orgid;
    $scope.salesnameOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            mustMatch:true,
            source: function (request, response) {
                var userPromise = service.listUser({page:1, limit:100, name:$scope.ORDER_DATA.salesname});
                userPromise.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.items;
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.name, value: item.name, nameid:item._id, orgname:item.orgname, orgid:item.orgid };
                            }
                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.salesid = ui.item.nameid;
                $scope.ORDER_DATA.salesorgnanme = ui.item.orgname;
                $scope.ORDER_DATA.salesorgid = ui.item.orgid;
            }
        }
    };

    $scope.projecttype = function(type){
        if(type == '出口'){
            $scope.interiooneyEdit = false;//内部结算合同金额是否能编辑
            $scope.currencyDisable = true;
            $scope.cbfxCk = true;
            $scope.ORDER_DATA.receipttype = '税率0';
            $scope.ckIfkp = true;
        }else if(type == '转口'){
            $scope.interiooneyEdit = true;//内部结算合同金额是否能编辑
            $scope.cbfxZk = true;
            $scope.currencyDisable = false;
            $scope.ckIfkp = false;
        }else{
            $scope.interiooneyEdit = true;//内部结算合同金额是否能编辑
            $scope.currencyDisable = true;
            $scope.cbfxOther = true;
            $scope.ckIfkp = false;
        }
    }
    $scope.jiesuanType = function(type){
        if(type == '是'){
            $scope.ifZiying = true;
            $scope.ORDER_DATA.interiooney  = 0;
        }else {
            $scope.ifZiying = false;
            $scope.ORDER_DATA.interiooney  = 0;
        }
    };
    $scope.userBox = function(userType){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true,
            open: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = true;
                    })
                })
            },
            close: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = false;
                    })
                })
            }

        });
        $( "#userBox" ).dialog( "open" );
        $scope.userType = userType;
    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        if(userType == 'salsUser'){
            $scope.ORDER_DATA.salesname = user;
            $scope.ORDER_DATA.salesid = userId;
            $scope.ORDER_DATA.salesorgnanme = orgName;
            $scope.ORDER_DATA.salesorgid = orgId;
            $scope.getSW();
        }else if(userType == 'approval_business_inter') {
            $scope.ORDER_DATA.tradername = user;
            $scope.ORDER_DATA.traderlogin = login;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    // 获取商务人员列表
    $scope.traderSelect = [];
    $scope.getSW = function (login) {
        var param  = {page:1, limit:999, saleid:$scope.ORDER_DATA.salesid};
        var listUser = service.listUser(param);
        listUser.success(function(data){
            if(data.code == 200) {
                $scope.traderSelect = data.rst.data.items;
                if (login) {         // 如果存在login说明是编辑页面，初始化页面值
                    $scope.seltradername(login);
                } else if ($scope.traderSelect.length) {  //根据借货人匹配可选的商务人员
                    if($scope.traderSelect.length==1) {
                        $scope.tradername = $scope.traderSelect[0];
                        $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
                        $scope.ORDER_DATA.tradername = $scope.tradername.name;
                    } else {
                        $scope.tradername = '';
                        $scope.ORDER_DATA.traderlogin = '';
                        $scope.ORDER_DATA.tradername = '';
                    }
                }
            } else {
                swal('error', '', 'warning');
            }
        }).error(function(data){
            alert(data);
        });
    };
    $scope.traderChange = function () {
        if($scope.tradername) {
            $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
            $scope.ORDER_DATA.tradername = $scope.tradername.name;
        }
    }
    // 根据名字定位商务人员
    $scope.seltradername = function (login) {
        for(var i=0,l=$scope.traderSelect.length; i<l; i++) {
            if($scope.traderSelect[i].login == login) {
                $scope.tradername = $scope.traderSelect[i];
            }
        }
    };
    $scope.getSW();
    /*$scope.productOption = {
     options: {
     html: true,
     focusOpen: false,
     onlySelect: true,
     outHeight:0,
     delay: 500,
     mustMatch:true,
     source: function (request, response) {
     var cpxenum = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
     cpxenum.success(function(data){
     if(data.code == 200){
     var dataItems = data.rst.data.enum.CPX;
     if(!dataItems.length){
     dataItems.push({
     'name': '未找到'
     });
     }
     response($.map(dataItems, function(item) {
     if(item.name == '未找到'){
     return { label:item.name, value: '' };
     }else{
     return { label:item.name, value: item.name, code: item.code};
     }

     }));
     }else {
     swal(data.msg, "", "warning");
     }
     });
     },
     select: function( event, ui ) {
     $scope.ORDER_DATA.product = ui.item.value;
     $scope.ORDER_DATA.productId = ui.item.code;
     }
     }
     };*/
    // 搜索产品线
    $scope.productlineFn = function (name) {
        $scope.ORDER_DATA.productId  = "";
        var listCpx = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
        // var listCpx = payment.listCpx({cpxname:name});
        listCpx.success(function(data) {
            if (data.code == 200) {
                $scope.productlineList = data.rst.data.enum.CPX;
                if (!$scope.productlineList.length) {
                    $scope.productlineList.push({
                        'name': '未找到',
                        'value': ''
                    });
                }
            } else {
                //swal(data.msg, "", "warning");
                alert('error')
            }
        })
    };
    $scope.selProductlineFn = function (obj) {
        $scope.ORDER_DATA.product  = obj.name;
        $scope.ORDER_DATA.productId  = obj.code;
        $scope.productlineList = [];
    };

    $scope.cusBox = function(type){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            maxHeight:600,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        $scope.cusType = type;
    };
    $scope.cusSelect = function(id,name){
        if($scope.cusType == 'stomer'){
            $scope.ORDER_DATA.stomer = name;
            $scope.ORDER_DATA.stomerid = id;
            if(!$scope.ORDER_DATA.KPstomer){
                $scope.ORDER_DATA.KPstomer = name;
                $scope.ORDER_DATA.KPstomerid = id;
            }
        }else {
            $scope.ORDER_DATA.KPstomer = name;
            $scope.ORDER_DATA.KPstomerid = id;
        }
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.cusUserOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            source: function (request, response) {
                var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid,'NAME': $scope.ORDER_DATA.contactname};
                var listcontact = service.listcontact(cParam);
                listcontact.success(function(data){

                    if(data.code == 200){
                        /*response($.map(data.rst.data.items, function(item) {
                         return { label:item.NAME1, value: item.NAME1, tel:item.TELF1, title:item.TITLE_AP };
                         }));*/
                        var dataItems = data.rst.data;
                        if(!dataItems.length){
                            dataItems.push({
                                'NAME1': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.NAME1, value: item.NAME1, tel:item.TELF1 ,title:item.TITEL_AP};
                            }

                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.contactname = ui.item.value;
                $scope.ORDER_DATA.contactphone = ui.item.tel;
                $scope.ORDER_DATA.contacttitle = ui.item.title;
            }
        }
    };

    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type=='userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type=='excleData'){
            $scope.excleData.splice(idx,1);
        }

    };
    $scope.cpIf = true;
    $scope.cpChange = function(type){
        if(type == '0'){
            $scope.cpIf = true;
            $scope.othercost[0].mating = 0;
            $scope.othercost[1].mating = 0;
            $scope.othercost[2].mating = 0;
            $scope.othercost[0].third = 0;
            $scope.othercost[1].third = 0;
            $scope.othercost[2].third = 0;
        }else {
            $scope.cpIf = false;
        }
    }

    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = service.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    var contractId = $scope.contractId = '';
    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if(!data.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        var doc={},param= {},contractbase = {};
        contractbase  = data;
        var userLink = $scope.userLinkList.concat($scope.excleData);
        if(userLink.length<=0){
            swal("请添加交货地点和联系人", "", "warning");
            return false;
        }
        contractbase.receiver = userLink;//交货联系人
        doc.contractbase = contractbase;
        doc.processId = $scope.processId;
        doc.nodeId = $scope.nodeId;
        doc.contractId = $scope.contractId;
        param.doc = doc;

        if(statue == "save"){
            var addInside = service.addInsideIecontract(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var addInside = service.addInsideIecontract(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.ht.activeTab = 2;
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                    if($scope.ORDER_DATA.cp == '0'){
                        $scope.cpIf = true;
                    }else {
                        $scope.cpIf = false;
                    }
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };

    //产品清单----借出转销售
    $scope.jczxsObj = {};
    var wlList = $scope.wlList = [];//借出转销售的物料
    var htcgList = $scope.htcgList = [];//采购申请的物料
    var tjwlList = $scope.tjwlList = [];//手动添加物料
    var wlExcleData = $scope.wlExcleData = [];//导入的物料
    /*$scope.wlAdd = function(){
     var obj = {"goodscode":'',"goodsorigincode":'',"version":'',"goodsdesc":'',"count":'',"unitprice":''};
     $scope.tjwlList.push(obj);
     }*/
    $scope.tjwlDel = function(index){
        $scope.tjwlList.splice(index,1);
    };
    $scope.wlDel = function(index){
        $scope.wlList.splice(index,1);
    };
    $scope.htcgDel = function(index){
        /*purchaseorderid*/
        var index = index;
        swal({
            title: "确定要删除同一个采购申请下面的物料吗?",
            text: "",//修改后将会清空选择的返点&& $scope.fdList.length>0
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除",
            cancelButtonText:'取消',
            closeOnConfirm: true
        }, function(){
            var purchaseorderid = $scope.htcgList[index].purchaseorderid;
            var arrObj = $scope.htcgList;
            for(var i =0; i<arrObj.length; i++){
                if(arrObj[i].purchaseorderid == purchaseorderid){
                    $scope.$apply(function () {
                        $scope.htcgList.splice(i,1);
                    });
                    i--;
                }
            };
        });
    };
    $scope.scwuDel = function(index,type){
        if(type=='right'){
            $scope.wlExcleData.right.splice(index,1);
        }else {
            $scope.wlExcleData.error.splice(index,1);
        }
    };
    $scope.jczxsBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $scope.jczxsObj.clientname = $scope.ORDER_DATA.stomer;
        $( "#jczxsBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#jczxsTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择物料", "", "warning");
                            return false;
                        }

                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parList = $(this).closest('.list');
                            var code = parList.find('.thw2:eq(0)').html();
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'jcdcode':code,
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(6)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(7)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(6)').find("input:eq(0)").val()*par.find('td:eq(7)').find("input:eq(0)").val()*100)/100,//小计
                                'from':20,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':'',//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(7)').find("input:eq(1)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':0,//税率
                                'purchasecount':0,//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': '', //采购申请ID
                                'supplierorderid': '',  //供应商订单号
                                'devicecost': '',  //设备费用
                                'servicecost': '', //服务费用
                                'amountcost': '',
                                'selfpickupcost': '',   //自提费用
                                'storeplace': '', //存储地点
                                'cashrebate': '',
                                'thesum': ''// #金额小计
                            };
                            lsArr.push(xObj);
                        });
                        $scope.$apply(function () {
                            $scope.wlList = $scope.wlList.concat(lsArr);
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#jczxsBox" ).dialog( "open" );
        /*var jcParam = {'limit':1000,'userid': $scope.ORDER_DATA.stomerid}//,'money': $scope.ORDER_DATA.contactname
         var listJc = service.listJc(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.jczxsList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.wlListBlur = function(wR,dR){
        if(parseInt(dR)>parseInt(wR)){
            swal("输入的数量不能大于未还数量", "", "warning");
            return false;
        }
    };
    $scope.jczxsSearch = function(){
        var jcParam = {'limit':1000,'username': $scope.ORDER_DATA.salesname, 'code':$scope.code, 'clientname':$scope.ORDER_DATA.stomer};
        var listJc = service.listJc(jcParam);
        listJc.success(function(data){
            if(data.code == 200){
                $scope.jczxsList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    //产品清单----采购申请单
    $scope.cgsqdObj = {};
    var isservice = 0;
    if($scope.ORDER_DATA.contracttype =='专有服务'){
        isservice = 1;
    }else {
        isservice = 0;
    }
    $scope.cgsqdBox = function(){
        if(!$scope.ORDER_DATA.salesname){
            swal("请先输入销售人员", "", "warning");
            return false;
        }

        $scope.cgsqdObj.saName = $scope.ORDER_DATA.salesname;
        $( "#cgsqdBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#cgsqdTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择采购申请", "", "warning");
                            return false;
                        }
                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parGj = $(this).closest('.fTd');
                            var faTable = parGj.find("table:eq(0)");
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(5)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(6)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(5)').find("input:eq(0)").val()*par.find('td:eq(6)').find("input:eq(0)").val()*100)/100,//小计
                                'from':30,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':faTable.find('td:eq(0)').find("span:eq(0)").html(),//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(6)').find("input:eq(9)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':par.find('td:eq(6)').find("input:eq(1)").val(),//税率
                                'purchasecount':par.find('td:eq(5)').find("input:eq(1)").val(),//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': par.find('td:eq(6)').find("input:eq(10)").val(), //采购申请ID
                                'supplierorderid': faTable.find('td:eq(0)').find("input:eq(1)").val(),  //供应商订单号
                                'currencytype': faTable.find('td:eq(0)').find("input:eq(2)").val(),  //供应商订单号
                                'devicecost': par.find('td:eq(6)').find("input:eq(2)").val(),  //设备费用
                                'servicecost': par.find('td:eq(6)').find("input:eq(3)").val(), //服务费用
                                'amountcost': par.find('td:eq(6)').find("input:eq(4)").val(),
                                'selfpickupcost': par.find('td:eq(6)').find("input:eq(5)").val(),   //自提费用
                                'storeplace': par.find('td:eq(6)').find("input:eq(6)").val(), //存储地点
                                'cashrebate': par.find('td:eq(6)').find("input:eq(7)").val(),
                                'thesum': par.find('td:eq(6)').find("input:eq(8)").val(),// #金额小计
                                'tax': par.find('td:eq(6)').find("input:eq(11)").val(),// #金额小计
                                'purchasetype': par.find('td:eq(6)').find("input:eq(12)").val(),// #金额小计
                                'currencytype': par.find('td:eq(6)').find("input:eq(13)").val(),// #金额小计
                                'purchaseorderid': par.find('td:eq(6)').find("input:eq(14)").val(),// #金额小计
                                'purchaselineno': par.find('td:eq(6)').find("input:eq(15)").val()// #金额小计
                            };
                            var eqPurchaseorderid = true;
                            $.each($scope.htcgList,function(key,value){
                                if(xObj.purchaseorderid == value.purchaseorderid){
                                    eqPurchaseorderid = false;
                                    swal("请不要重复选择相同的采购申请单物料", "", "warning");
                                    return false;
                                }
                            });
                            if(eqPurchaseorderid){
                                lsArr.push(xObj);
                            }else {
                                return false;
                            }
                        });
                        $scope.$apply(function () {
                            $scope.htcgList = $scope.htcgList.concat(lsArr);
                        });

                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#cgsqdBox" ).dialog( "open" );
        /*var jcParam = {'userid': $scope.ORDER_DATA.salesid,'isservice': isservice}
         var listJc = service.listCgd(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.cgsqdList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.cgsqdSearch = function(){
        if($scope.code=='' && $scope.clientname=='' &&$scope.supplierId == ''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var jcParam = {'limit':1000,'escompany':$scope.ORDER_DATA.escompany,'userid': $scope.ORDER_DATA.salesid, 'code':$scope.code, 'clientname':$scope.clientname,'supplierId':$scope.supplierId,'getgoods':1};
        var listCgd = service.listCgd(jcParam);
        listCgd.success(function(data){
            if(data.code == 200){
                $scope.cgsqdList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.htwlBox = function(){
        $( "#htwlBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true
        });
        $( "#htwlBox" ).dialog( "open" );
    };
    $scope.htwlSelect = function(MATNR, BISMT, ZZGKXH, MAKTX, num, price,ZZMAKTX){
        var obj = {
            'contractId':$scope.contractId,//合同保存ID
            'goodstype':'',//
            'goodscode':MATNR,//内部物料编码
            'sourcegoodscode':BISMT,//原厂物料编码
            'version':ZZGKXH,//型号
            'desc':MAKTX,//描述
            'sourcegoodsdesc':ZZMAKTX,//描述
            'count':num,//数量
            'unitprice':price,//单价
            'singTotal':Math.round(num*price*100)/100,//小计
            'from':0,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
            'thetype':0,//新增 0，加 10，退 20，换 30
            'purchaseorderid':'',//采购订单ID
            'purchasecontractid':'',//采购合同ID
            'purchaseprice':'',//采购单价，借出转销售使用移动平均价
            'cess':0,//税率
            'purchasecount':0,//采购数量
            'sapid': '',
            'salesitemid': '',
            'purchaseid': '', //采购申请ID
            'supplierorderid': '',  //供应商订单号
            'devicecost': '',  //设备费用
            'servicecost': '', //服务费用
            'amountcost': '',
            'selfpickupcost': '',   //自提费用
            'storeplace': '', //存储地点
            'cashrebate': '',
            'thesum': ''// #金额小计
        };
        $scope.tjwlList.push(obj);
        $( "#htwlBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.allCheck=function(event){
        var currentElement = event.target;
        var zCheck = $(currentElement).closest(".zTable").find(".zCheck");
        if($(currentElement).hasClass("allCheckAc")){
            $(currentElement).attr("class",'allCheck');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck');
            });
        }else {
            $(currentElement).attr("class",'allCheckAc');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck zCheckAc');
            });
        }
        event.stopPropagation();
    };
    $scope.zCheck = function(event){
        swal("只能全选", "", "warning");
        /*var currentElement = event.target;
         if($(currentElement).hasClass("zCheckAc")){
         $(currentElement).attr("class",'zCheck');
         }else {
         $(currentElement).attr("class",'zCheck zCheckAc');
         }*/
        event.stopPropagation();
    };
    $("body").delegate(".setCount","blur",function(){
        var obj = $(this);
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var unitprice = objParent.find(".unitprice:eq(0)").val();
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(unitprice)*100)/100).trigger('change');
    });
    $("body").delegate(".setPrice","blur",function(){
        var obj = $(this);
        if(obj.val() == ''){
            obj.val('0')
        }
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var count = objParent.find(".count:eq(0)").val();
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(count)*100)/100).trigger('change');
    });
    $scope.comparBill = function(){
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if(tList.length<=0){
            swal("请添加产品清单", "", "warning");
            return false;
        }
        if(zTotal == 0 || zTotal == 0.0 || zTotal == 0.00){
            swal({
                title: "您要分摊单价吗?",
                text: "合同总价为0，清单单价全部变成0!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定分摊",
                cancelButtonText:'关闭',
                closeOnConfirm: true
            }, function(){
                $.each(tList,function(key,value) {
                    var oThat = $(this);
                    //oThat.find(".count:eq(0)").val('0').trigger('change');
                    oThat.find(".unitprice:eq(0)").val('0').trigger('change');
                    oThat.find(".singTotal:eq(0)").val('0').trigger('change');
                });
            });
            return false;
        }
        var total = 0;
        var totalxy = 0;
        if(tList.length == 1){
            var oThat = $(tList);
            var count = parseFloat(oThat.find(".count:eq(0)").val());
            var unitpriceVal = parseFloat(oThat.find(".unitprice:eq(0)").val());
            var singTotalVal = parseFloat(count*unitpriceVal);
            if(count == 0){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(zTotal != singTotalVal){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+singTotalVal+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    var unitprice = oThat.find(".unitprice:eq(0)");
                    var singTotal = oThat.find(".singTotal:eq(0)");
                    singTotal.val(zTotal).trigger('change');
                    unitprice.val(Math.round((zTotal/count)*100)/100).trigger('change');
                });

            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }else {
            var tListLen = tList.length-1;
            var kTrue = true;
            $.each(tList,function(key,value){
                var oThat = $(this);
                var count = parseFloat(oThat.find(".count:eq(0)").val());
                var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                var singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
                if(count == 0){// || unitprice == 0
                    kTrue = false;
                    return false;
                }
                /*var jT = count*unitprice;
                 total += jT;*/
                /*if(tListLen > key){
                 var jT = count*unitprice;
                 total += jT;
                 }else {
                 total+=singTotal;//最后一行直接取小计相加
                 }*/
                var jT = Math.round(count*unitprice*100)/100;
                oThat.find(".singTotal:eq(0)").val(jT).trigger('change');
                total += jT;
            });
            if(kTrue == false){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(total == 0 && zTotal !=0){
                swal("合同总价不是"+zTotal+"，清单总价不能是0", "", "warning");
                return false;
            }

            total = parseInt(Math.round(total*100))/100;
            if(zTotal != total){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+total+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    $.each(tList,function(key,value){
                        var oThat = $(this);
                        var count = parseFloat(oThat.find(".count:eq(0)").val());
                        var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                        var curUnitprice = parseInt(unitprice*zTotal/total*100)/100;//(count*unitprice/total)*zTotal/count
                        //var curUnitprice = parseInt(Math.round((count*unitprice*zTotal)/(total*count)*100))/100;
                        var singTotal = oThat.find(".singTotal:eq(0)");
                        var tot = count*curUnitprice;
                        if(tListLen > key){
                            totalxy += tot;
                        }
                        if(tListLen == key){
                            singTotal.val(Math.round(zTotal*100-totalxy*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(parseInt(singTotal.val()/count*100)/100).trigger('change');
                        }else {
                            singTotal.val(Math.round(count*curUnitprice*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(curUnitprice).trigger('change');
                        }

                    });
                });
            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }
    };

    $scope.addDataAll = function(data,statue) {
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if (tList.length <= 0) {
            swal("请添加产品清单", "", "warning");
            return false;
        } else {
            var singTotal = 0;
            if (tList.length == 1) {
                var oThat = $(tList);
                singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
            } else {
                $.each(tList, function (key, value) {
                    var oThat = $(this);
                    var total = parseFloat(oThat.find(".singTotal:eq(0)").val());
                    singTotal += total;
                });
            }
            if (zTotal != Math.round(singTotal * 100) / 100) {
                swal("请先点击清单完成按钮,然后点击分摊单价", "", "warning");
                return false;
            }
        }
        var tLength = tList.length - 1;
        var tListPar = $("#wlList").find(".list").eq(tLength);
        var lastCont = tListPar.find('.count:eq(0)').val();
        var lastunitprice = tListPar.find('.unitprice:eq(0)').val();
        var lastsingTotal = tListPar.find('.singTotal:eq(0)').val();
        if (lastCont * lastunitprice != lastsingTotal) {
            swal({
                title: "物料中最后一行数量乘单价不等于分摊出来的小计,确定要保存吗",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: '关闭',
                closeOnConfirm: true
            }, function () {
                totalSub();
            });
        } else {
            totalSub();
        }
        function totalSub() {
            var basedoc = {}, param = {}, contractbase = {}, qdDoc = {}, qdParam = {};
            contractbase = data;
            var userLink = $scope.userLinkList.concat($scope.excleData);
            contractbase.receiver = userLink;//交货联系人
            basedoc.contractbase = contractbase;
            basedoc.processId = $scope.processId;
            basedoc.nodeId = $scope.nodeId;
            basedoc.contractId = $scope.contractId;
            param.doc = basedoc;
            qdDoc.lend = $scope.wlList;
            qdDoc.purchase = $scope.htcgList;
            qdDoc.upload = $scope.wlExcleData.right;
            qdDoc.handwork = $scope.tjwlList;
            qdDoc.processId = $scope.processId;
            qdDoc.nodeId = $scope.nodeId;
            qdDoc.contractId = $scope.contractId;
            qdParam.doc = qdDoc;
            if ($scope.wlList.length <= 0 && $scope.htcgList.length <= 0 && $scope.tjwlList.length <= 0 && $scope.wlExcleData.right.length <= 0) {
                swal("请添加物料信息", "", "warning");
                return false;
            }
            if (statue == "save") {
                var saveitems = service.saveitems(qdParam);
                saveitems.success(function (data) {
                    if (data.code == 200) {
                        if (data.rst.status == 1) {
                            $scope.htcgList = data.rst.data.purchase;
                            return false;
                        } else {
                            swal("保存成功", "", "success");
                            $scope.cbfxBs = 'OK';
                            $scope.ht.activeTab = 3;
                            var readiecost = service.readiecost({"processId": $scope.processId, "nodeId": $scope.nodeId});
                            readiecost.success(function (data) {
                                if (data.code == 200) {
                                    var CBFX = $scope.CBFX = data.rst.data.doc.iecost;
                                    var othercost = $scope.othercost = data.rst.data.doc.othercost;
                                    var index = 0;
                                    $.each(othercost, function (key, value) {
                                        if (value.money > 0) {
                                            index = key;
                                        }
                                    })
                                    $scope.$watchCollection('CBFX', function (newValue, oldValue, scope) {
                                        //转口的成本
                                        $scope.CBFX.cost = $scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.proxyfee * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1;
                                        $scope.zkLirunWbi = $scope.CBFX.contractmoney * 1 - $scope.CBFX.cost * 1;
                                        $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi / $scope.CBFX.contractmoney) * 100);
                                        //出口成本分析
                                        //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                                        //预估成本（外币） ：预估成本（RMB）/实时汇率
                                        $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.proxyfee * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1) * 100) / 100;
                                        $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB / $scope.CBFX.exchangerate) * 100) / 100;
                                        $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money * $scope.CBFX.exchangerate * 100) / 100;
                                        $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax * 1) * 100) / 100;
                                        $scope.ratio_tax = Math.round(($scope.RMB_tax / $scope.othercost[2].moneyRMB) * 100);
                                        $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost) * 100) / 100;
                                        $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB) * 100) / 100;
                                        $scope.ratio = Math.round(($scope.foreign / $scope.othercost[2].money) * 100);
                                        //其他类型的综合汇率和内部结算金额
                                        $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate * 1 + (($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.factoryservice * 1) * 1.17 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1) / $scope.CBFX.outpurchasecost) * 10000) / 10000;
                                        $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate * 100) / 100;
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });

                                    $scope.$watchCollection('othercost[0]', function (newValue, oldValue, scope) {
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });
                                    $scope.$watchCollection('othercost[1]', function (newValue, oldValue, scope) {
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });
                                    $scope.$watchCollection('othercost[2]', function (newValue, oldValue, scope) {
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });
                                }
                            });
                        }

                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            }
        }
    };
    $scope.getExchangerate = function(currency){
        var getExchangerate = service.getExchangerate({'currency':currency});
        getExchangerate.success(function(data){
            if(data.code == 200){
                $scope.CBFX.exchangerate = data.rst.data.rate;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    }
    $scope.addqdData = function(cbData, baseData, type){
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if(tList.length<=0){
            swal("请添加产品清单", "", "warning");
            return false;
        }else{
            var singTotal = 0;
            if(tList.length == 1){
                var oThat = $(tList);
                singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
            }else {
                $.each(tList, function (key, value) {
                    var oThat = $(this);
                    var total = parseFloat(oThat.find(".singTotal:eq(0)").val());
                    singTotal += total;
                });
            }
            if(zTotal != Math.round(singTotal*100)/100){
                swal("请先点击清单完成按钮,然后点击分摊单价", "", "warning");
                return false;
            }
        }
        /*if(parseFloat($scope.CBFX.outpurchasecost)<=0){
         swal("境外采购成本不能小于等于0，请重新关联采购申请单", "", "warning");
         return false;
         }*/
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var cbParam={},creParam = {},contractbase={};
        cbParam.iecost = cbData;
        cbParam.othercost = $scope.othercost;
        cbParam.contractId = $scope.contractId;
        cbParam.nodeId = $scope.nodeId;
        cbParam.processId = $scope.processId;
        cbParam.ieprofit = {'ratio_tax':$scope.ratio_tax,'foreign_tax':$scope.foreign_tax,'RMB_tax':$scope.RMB_tax,'ratio':$scope.ratio,'foreign':$scope.foreign,'RMB':$scope.RMB,'zkLirunWbi':$scope.zkLirunWbi,'zkHeyuelirunlv':$scope.zkHeyuelirunlv,'moHanshui':$scope.moHanshui,'moBuHanshui':$scope.moBuHanshui,'heYuelirun':$scope.heYuelirun}
        creParam.contractId = $scope.contractId;
        creParam.nodeId = $scope.nodeId;
        creParam.processId = $scope.processId;
        contractbase.contractbase = baseData;
        contractbase.iecost = cbData;
        contractbase.othercost = $scope.othercost;
        creParam.doc = contractbase;
        creParam.doc.contractbase.companygain = $scope.heYuelirun;
        creParam.doc.contractbase.interest = $scope.moBuHanshui;//毛利率
        creParam.doc.contractbase.interestContainTax = $scope.moHanshui;//含税利率
        creParam.doc.contractbase.contractInterest = $scope.heYuelirun;//合约利率
        var mating = parseFloat($scope.othercost[0].mating) + parseFloat($scope.othercost[1].mating) + parseFloat($scope.othercost[2].mating)+parseFloat($scope.othercost[0].third) + parseFloat($scope.othercost[1].third) + parseFloat($scope.othercost[2].third);
        if(creParam.doc.contractbase.cp == '1' && mating <= 0 ){
            swal("配套采购和第三方服务不能都小于0", "", "warning");
            return false;
        }
        if(type == 'save'){
            var saveiecost = service.saveiecost(cbParam);
            saveiecost.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else {
            var saveiecost = service.saveiecost(cbParam);
            saveiecost.success(function(data){
                if(data.code == 200){
                    if(creParam.doc.contractbase.projecttype != '出口' && creParam.doc.contractbase.is2body=='是'){
                        creParam.doc.contractbase.interiooney = $scope.CBFX.interiooney;
                    }
                    var applyAddIecontract = service.applyAddIecontract(creParam);
                    applyAddIecontract.success(function(cdata){
                        if(cdata.code == 200){
                            swal({
                                title: "提交成功",
                                text: "",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "返回进出口销售合同列表",
                                closeOnConfirm: true
                            }, function(){ window.location.href='/index.html#/iecontractOrder'; });
                        }else {
                            swal(cdata.msg, "", "warning");
                        }
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }
}]);
contractApp.controller('iecontractEditCtrl', ['$scope','$filter','$rootScope','$stateParams', 'contractServices',function($scope,$filter, $rootScope, $stateParams, service){
    var ht = $scope.ht = {};
    var cbfxBs = $scope.cbfxBs = '';
    $scope.htTab = function(type){
        var type = type;
        if(type ==2 && $scope.contractId ==''){
            swal("请先保存合同基本信息", "", "warning");
            return false;
        }else if(type == 3 && $scope.cbfxBs != 'OK'){
            swal("请先保存产品清单", "", "warning");
            return false;
        }
        $scope.ht.activeTab = type;
    };
    //产品线enume
    var enumlist = service.enumlist();
    enumlist.success(function(data) {
        $scope.ZZCP =  data.rst.enum.ZZCP;
    }).error(function(error){
        alert(error);
    });
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var CBFX = $scope.CBFX = {};//成本分析
    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    var watchExcel = $scope.$watchCollection ('excleData', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.htType = function(type){
        if(type == '分销'){
            $scope.cpDisable = true;
            $scope.ORDER_DATA.cp = '0';
        }else {
            $scope.cpDisable = false;
        }
    }
    $scope.projecttype = function(type){
        if(type == '出口'){
            $scope.interiooneyEdit = false;//内部结算合同金额是否能编辑
            $scope.currencyDisable = true;
            $scope.cbfxCk = true;
        }else if(type == '转口'){
            $scope.interiooneyEdit = true;//内部结算合同金额是否能编辑
            $scope.cbfxZk = true;
            $scope.currencyDisable = false;
        }else{
            $scope.interiooneyEdit = true;//内部结算合同金额是否能编辑
            $scope.currencyDisable = true;
            $scope.cbfxOther = true;
        }
    }
    //基本信息
    $scope.cpChange = function(type){
        if(type == '0'){
            $scope.cpIf = true;
            $scope.othercost[0].mating = 0;
            $scope.othercost[1].mating = 0;
            $scope.othercost[2].mating = 0;
            $scope.othercost[0].third = 0;
            $scope.othercost[1].third = 0;
            $scope.othercost[2].third = 0;
        }else {
            $scope.cpIf = false;
        }
    }
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var viewPur = service.viewInsideIecontract(param);

    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model.contractbase;
            $scope.userLinkList = data.rst.doc.model.contractbase.receiver;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.contractId = data.rst.contractId;
            $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
            if($scope.ORDER_DATA.cp == '0'){
                $scope.cpIf = true;
            }else {
                $scope.cpIf = false;
            }
            $scope.projecttype($scope.ORDER_DATA.projecttype);//项目类型
            /*//成本分析 需要在成本分析数据中得到一个标识来判断什么时候调用initcost
             var readiecost = service.readiecost(param);
             readiecost.success(function(data){
             if(data.code == 200){*/
            /*if($scope.ORDER_DATA.projecttype=='转口'){
             $scope.cbfxZk = true;
             $scope.currencyDisable = false;
             }else if($scope.ORDER_DATA.projecttype=='出口'){
             $scope.cbfxCk = true;
             $scope.currencyDisable = true;
             }else {
             $scope.cbfxOther = true;
             $scope.currencyDisable = true;
             }*/
            if(data.rst.doc.model.othercost.length>0){//这个条件不严谨

                var CBFX = $scope.CBFX = data.rst.doc.model.iecost;
                var othercost = $scope.othercost = data.rst.doc.model.othercost;


                var index = 0;
                $.each(othercost,function(key,value){
                    if(value.money > 0){
                        index = key;
                    }
                })
                $scope.$watchCollection('CBFX',function(newValue,oldValue, scope){
                    //转口的成本
                    $scope.CBFX.cost = $scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1;
                    $scope.zkLirunWbi  = $scope.CBFX.contractmoney*1 - $scope.CBFX.cost*1;
                    $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi/$scope.CBFX.contractmoney)*100);
                    //出口成本分析
                    //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                    //预估成本（外币） ：预估成本（RMB）/实时汇率
                    $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1)*100)/100;
                    $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB/$scope.CBFX.exchangerate)*100)/100;
                    $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money*$scope.CBFX.exchangerate*100)/100;
                    $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax*1)*100)/100;
                    $scope.ratio_tax = Math.round(($scope.RMB_tax/$scope.othercost[2].moneyRMB)*100);
                    $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost)*100)/100;
                    $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB)*100)/100;
                    $scope.ratio  = Math.round(($scope.foreign/$scope.othercost[2].money)*100);
                    //其他类型的综合汇率和内部结算金额
                    $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate*1 + (($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.factoryservice*1)*1.17+$scope.CBFX.duties*1+$scope.CBFX.addedtax*1)/$scope.CBFX.outpurchasecost)*10000)/10000;
                    $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate*100)/100;
                    if ($scope.ORDER_DATA.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });

                $scope.$watchCollection('othercost[0]',function(newValue,oldValue, scope){
                    if ($scope.ORDER_DATA.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
                $scope.$watchCollection('othercost[1]',function(newValue,oldValue, scope){
                    if ($scope.ORDER_DATA.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
                $scope.$watchCollection('othercost[2]',function(newValue,oldValue, scope){
                    if ($scope.ORDER_DATA.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.ORDER_DATA.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
            }else {
                var readiecost = service.readiecost({'processId':$scope.processId,'nodeId':$scope.nodeId});//不知道什么时候调用initcost
                readiecost.success(function(data){
                    if(data.code == 200){
                        var CBFX = $scope.CBFX = data.rst.data.doc.iecost;
                        var othercost = $scope.othercost = data.rst.data.doc.othercost;
                        $.each(othercost,function(key,value){
                            if(value.money > 0){
                                index = key;
                            }
                        })
                        $scope.$watchCollection('CBFX', function (newValue, oldValue, scope) {
                            //转口的成本
                            $scope.CBFX.cost = $scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.proxyfee * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1;
                            $scope.zkLirunWbi = $scope.CBFX.contractmoney * 1 - $scope.CBFX.cost * 1;
                            $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi / $scope.CBFX.contractmoney) * 100);
                            //出口成本分析
                            //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                            $scope.othercost[2].predictorderscost = $scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1;
                            //预估成本（外币） ：预估成本（RMB）/实时汇率
                            $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1)*100)/100;
                            $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB / $scope.CBFX.exchangerate) * 100) / 100;
                            $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money * $scope.CBFX.exchangerate * 100) / 100;
                            $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax*1)*100)/100;
                            $scope.ratio_tax = Math.round(($scope.RMB_tax / $scope.othercost[2].moneyRMB) * 100);
                            $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost) * 100) / 100;
                            $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB) * 100) / 100;
                            $scope.ratio = Math.round(($scope.foreign / $scope.othercost[2].money) * 100);
                            //其他类型的综合汇率和内部结算金额
                            $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate * 1 + (($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.factoryservice * 1) * 1.17 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1) / $scope.CBFX.outpurchasecost) * 10000) / 10000;
                            $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate * 100) / 100;
                            if ($scope.ORDER_DATA.counttype == '自营') {
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                } else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                }
                            } else {//代理
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                } else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                }
                            }
                            $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                        });

                        $scope.$watchCollection('othercost[0]', function (newValue, oldValue, scope) {
                            if ($scope.ORDER_DATA.counttype == '自营') {
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                } else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                }
                            } else {//代理
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                } else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                }
                            }
                            $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                        });
                        $scope.$watchCollection('othercost[1]', function (newValue, oldValue, scope) {
                            if ($scope.ORDER_DATA.counttype == '自营') {
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                } else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                }
                            } else {//代理
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                } else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                }
                            }
                            $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                        });
                        $scope.$watchCollection('othercost[2]',function(newValue,oldValue, scope){
                            if ($scope.ORDER_DATA.counttype == '自营') {
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                if($scope.ORDER_DATA.receipttype == '税率17%'){
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                                }else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                                }
                            }else {//代理
                                $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                if($scope.ORDER_DATA.receipttype == '税率17%'){
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.17))*10000)/100;
                                }else {
                                    $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                    $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.ORDER_DATA.contractmoney/1.06))*10000)/100;
                                }
                            }
                            $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                        });

                    }
                });
            }
            /* }
             });*/
            $scope.getSW($scope.ORDER_DATA.traderlogin);
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function(error){
        alert(error);
    });
    //产品清单
    var listCpqd = service.listCpqd(param);
    listCpqd.success(function(data){
        if(data.code == 200){
            $scope.wlList = data.rst.items.lend;//采购申请的物料
            $scope.htcgList = data.rst.items.purchase;//采购申请的物料
            $scope.wlExcleData = data.rst.items.upload;//导入的物料
            $scope.tjwlList = data.rst.items.handwork;//手动添加物料
            if($scope.wlList.length>0||$scope.htcgList.length>0||$scope.wlExcleData.length>0||$scope.tjwlList.length>0){
                $scope.cbfxBs = 'OK';
            }
        }
    });

    $scope.salesnameOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            mustMatch:true,
            source: function (request, response) {
                var userPromise = service.listUser({page:1, limit:100, name:$scope.ORDER_DATA.salesname});
                userPromise.success(function(data){
                    if(data.code == 200){
                        var dataItems = data.rst.data.items;
                        if(!dataItems.length){
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.name, value: item.name, nameid:item._id, orgname:item.orgname, orgid:item.orgid };
                            }
                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.salesid = ui.item.nameid;
                $scope.ORDER_DATA.salesorgnanme = ui.item.orgname;
                $scope.ORDER_DATA.salesorgid = ui.item.orgid;
            }
        }
    };

    $scope.jiesuanType = function(type){
        if(type == '是'){
            $scope.ifZiying = true;
            $scope.ORDER_DATA.interiooney  = 0;
        }else {
            $scope.ifZiying = false;
            $scope.ORDER_DATA.interiooney  = 0;
        }
    };
    $scope.userBox = function(userType){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true,
            open: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = true;
                    })
                })
            },
            close: function () {
                setTimeout(function() {
                    $scope.$apply(function () {
                        $scope.openDialog = false;
                    })
                })
            }

        });
        $( "#userBox" ).dialog( "open" );
        $scope.userType = userType;
    };
    $scope.userSelect = function(user, userId, orgName, orgId,login, userType){
        if(userType == 'salsUser'){
            $scope.ORDER_DATA.salesname = user;
            $scope.ORDER_DATA.salesid = userId;
            $scope.ORDER_DATA.salesorgnanme = orgName;
            $scope.ORDER_DATA.salesorgid = orgId;
            $scope.getSW();
        }else if(userType == 'approval_business_inter') {
            $scope.ORDER_DATA.tradername = user;
            $scope.ORDER_DATA.traderlogin = login;
        }
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    // 获取商务人员列表
    $scope.traderSelect = [];
    $scope.getSW = function (login) {
        var param  = {page:1, limit:999, saleid:$scope.ORDER_DATA.salesid};
        var listUser = service.listUser(param);
        listUser.success(function(data){
            if(data.code == 200) {
                $scope.traderSelect = data.rst.data.items;
                if (login) {         // 如果存在login说明是编辑页面，初始化页面值
                    $scope.seltradername(login);
                } else if ($scope.traderSelect.length) {  //根据借货人匹配可选的商务人员
                    if($scope.traderSelect.length==1) {
                        $scope.tradername = $scope.traderSelect[0];
                        $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
                        $scope.ORDER_DATA.tradername = $scope.tradername.name;
                    } else {
                        $scope.tradername = '';
                        $scope.ORDER_DATA.traderlogin = '';
                        $scope.ORDER_DATA.tradername = '';
                    }
                }
            } else {
                swal('error', '', 'warning');
            }
        }).error(function(data){
            alert(data);
        });
    };
    $scope.traderChange = function () {
        if($scope.tradername) {
            $scope.ORDER_DATA.traderlogin = $scope.tradername.login;
            $scope.ORDER_DATA.tradername = $scope.tradername.name;
        }
    }
    // 根据名字定位商务人员
    $scope.seltradername = function (login) {
        for(var i=0,l=$scope.traderSelect.length; i<l; i++) {
            if($scope.traderSelect[i].login == login) {
                $scope.tradername = $scope.traderSelect[i];
            }
        }
    };
    /*$scope.productOption = {
     options: {
     html: true,
     focusOpen: false,
     onlySelect: true,
     outHeight:0,
     delay: 500,
     mustMatch:true,
     source: function (request, response) {
     var cpxenum = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
     cpxenum.success(function(data){
     if(data.code == 200){
     var dataItems = data.rst.data.enum.CPX;
     if(!dataItems.length){
     dataItems.push({
     'name': '未找到'
     });
     }
     response($.map(dataItems, function(item) {
     if(item.name == '未找到'){
     return { label:item.name, value: '' };
     }else{
     return { label:item.name, value: item.name, code: item.code};
     }

     }));
     }else {
     swal(data.msg, "", "warning");
     }
     });
     },
     select: function( event, ui ) {
     $scope.ORDER_DATA.product = ui.item.value;
     $scope.ORDER_DATA.productId = ui.item.code;
     }
     }
     };*/
    // 搜索产品线
    $scope.productlineFn = function (name) {
        $scope.ORDER_DATA.productId  = "";
        var listCpx = service.cpxenum({contrattype:$scope.ORDER_DATA.contracttype,cpxname:$scope.ORDER_DATA.product});
        // var listCpx = payment.listCpx({cpxname:name});
        listCpx.success(function(data) {
            if (data.code == 200) {
                $scope.productlineList = data.rst.data.enum.CPX;
                if (!$scope.productlineList.length) {
                    $scope.productlineList.push({
                        'name': '未找到',
                        'value': ''
                    });
                }
            } else {
                //swal(data.msg, "", "warning");
                alert('error')
            }
        })
    };
    $scope.selProductlineFn = function (obj) {
        $scope.ORDER_DATA.product  = obj.name;
        $scope.ORDER_DATA.productId  = obj.code;
        $scope.productlineList = [];
    };
    $scope.cusBox = function(type){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            maxHeight:600,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
        $scope.cusType = type;
    };
    $scope.cusSelect = function(id,name){
        if($scope.cusType == 'stomer'){
            $scope.ORDER_DATA.stomer = name;
            $scope.ORDER_DATA.stomerid = id;
            if(!$scope.ORDER_DATA.KPstomer){
                $scope.ORDER_DATA.KPstomer = name;
                $scope.ORDER_DATA.KPstomerid = id;
            }
        }else {
            $scope.ORDER_DATA.KPstomer = name;
            $scope.ORDER_DATA.KPstomerid = id;
        }
        $( "#cusBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.cusUserOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            source: function (request, response) {
                var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid,'NAME': $scope.ORDER_DATA.contactname};
                var listcontact = service.listcontact(cParam);
                listcontact.success(function(data){

                    if(data.code == 200){
                        /*response($.map(data.rst.data.items, function(item) {
                         return { label:item.NAME1, value: item.NAME1, tel:item.TELF1, title:item.TITLE_AP };
                         }));*/
                        var dataItems = data.rst.data;
                        if(!dataItems.length){
                            dataItems.push({
                                'NAME1': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.NAME1, value: item.NAME1, tel:item.TELF1 ,title:item.TITEL_AP};
                            }

                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.contactname = ui.item.value;
                $scope.ORDER_DATA.contactphone = ui.item.tel;
                $scope.ORDER_DATA.contacttitle = ui.item.title;
            }
        }
    };

    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type=='userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type=='excleData'){
            $scope.excleData.splice(idx,1);
        }

    };
    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = service.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    var contractId = $scope.contractId = '';
    $scope.addData = function(data,statue){
        var doc={},param= {},contractbase = {};
        contractbase  = data;
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        if(!data.productId) {
            swal("请选择可用的产品线", "", "warning");
            return false;
        }
        var userLink = $scope.userLinkList.concat($scope.excleData);
        if(userLink.length<=0){
            swal("请添加交货地点和联系人", "", "warning");
            return false;
        }
        contractbase.receiver = userLink;//交货联系人
        doc.contractbase = contractbase;
        doc.processId = $scope.processId;
        doc.nodeId = $scope.nodeId;
        doc.contractId = $scope.contractId;
        param.doc = doc;

        if(statue == "save"){
            var addInside = service.addInsideIecontract(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var addInside = service.addInsideIecontract(param);
            addInside.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.ht.activeTab = 2;
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    };

    //产品清单----借出转销售
    $scope.jczxsObj = {};
    var wlList = $scope.wlList = [];//借出转销售的物料
    var htcgList = $scope.htcgList = [];//采购申请的物料
    var tjwlList = $scope.tjwlList = [];//手动添加物料
    var wlExcleData = $scope.wlExcleData = [];//导入的物料
    /*$scope.wlAdd = function(){
     var obj = {"goodscode":'',"goodsorigincode":'',"version":'',"goodsdesc":'',"count":'',"unitprice":''};
     $scope.tjwlList.push(obj);
     }*/
    $scope.tjwlDel = function(index){
        $scope.tjwlList.splice(index,1);
    };
    $scope.wlDel = function(index){
        $scope.wlList.splice(index,1);
    };
    $scope.htcgDel = function(index){
        /*purchaseorderid*/
        var index = index;
        swal({
            title: "确定要删除同一个采购申请下面的物料吗?",
            text: "",//修改后将会清空选择的返点&& $scope.fdList.length>0
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除",
            cancelButtonText:'取消',
            closeOnConfirm: true
        }, function(){
            var purchaseorderid = $scope.htcgList[index].purchaseorderid;
            var arrObj = $scope.htcgList;
            for(var i =0; i<arrObj.length; i++){
                if(arrObj[i].purchaseorderid == purchaseorderid){
                    $scope.$apply(function () {
                        $scope.htcgList.splice(i,1);
                    });
                    i--;
                }
            };
        });
    };
    $scope.scwuDel = function(index,type){
        if(type=='right'){
            $scope.wlExcleData.right.splice(index,1);
        }else {
            $scope.wlExcleData.error.splice(index,1);
        }
    };
    $scope.jczxsBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $scope.jczxsObj.clientname = $scope.ORDER_DATA.stomer;
        $( "#jczxsBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#jczxsTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择物料", "", "warning");
                            return false;
                        }

                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parList = $(this).closest('.list');
                            var code = parList.find('.thw2:eq(0)').html();
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'jcdcode':code,
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(6)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(7)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(6)').find("input:eq(0)").val()*par.find('td:eq(7)').find("input:eq(0)").val()*100)/100,//小计
                                'from':20,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':'',//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(7)').find("input:eq(1)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':0,//税率
                                'purchasecount':0,//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': '', //采购申请ID
                                'supplierorderid': '',  //供应商订单号
                                'devicecost': '',  //设备费用
                                'servicecost': '', //服务费用
                                'amountcost': '',
                                'selfpickupcost': '',   //自提费用
                                'storeplace': '', //存储地点
                                'cashrebate': '',
                                'thesum': ''// #金额小计
                            };
                            lsArr.push(xObj);
                        });
                        $scope.$apply(function () {
                            $scope.wlList = $scope.wlList.concat(lsArr);
                        });
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#jczxsBox" ).dialog( "open" );
        /* var jcParam = {'limit':1000,'userid': $scope.ORDER_DATA.stomerid}//,'money': $scope.ORDER_DATA.contactname
         var listJc = service.listJc(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.jczxsList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.wlListBlur = function(wR,dR){
        if(parseInt(dR)>parseInt(wR)){
            swal("输入的数量不能大于未还数量", "", "warning");
            return false;
        }
    };
    $scope.jczxsSearch = function(){
        var jcParam = {'limit':1000,'username': $scope.ORDER_DATA.salesname, 'code':$scope.code, 'clientname':$scope.ORDER_DATA.stomer};
        var listJc = service.listJc(jcParam);
        listJc.success(function(data){
            if(data.code == 200){
                $scope.jczxsList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    //产品清单----采购申请单
    $scope.cgsqdObj = {};
    var isservice = 0;
    if($scope.ORDER_DATA.contracttype =='专有服务'){
        isservice = 1;
    }else {
        isservice = 0;
    }
    $scope.cgsqdBox = function(){
        if(!$scope.ORDER_DATA.salesname){
            swal("请先输入销售人员", "", "warning");
            return false;
        }

        $scope.cgsqdObj.saName = $scope.ORDER_DATA.salesname;
        $( "#cgsqdBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:500,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        var zCheckAc = $("#cgsqdTable").find(".zCheckAc");
                        var lsArr = [];
                        if(zCheckAc.length<=0){
                            swal("请选择采购申请", "", "warning");
                            return false;
                        }
                        $.each(zCheckAc,function(){
                            var par = $(this).closest('.ztrList');
                            var parGj = $(this).closest('.fTd');
                            var faTable = parGj.find("table:eq(0)");
                            var xObj = {
                                'contractId':$scope.contractId,//合同保存ID
                                'goodstype':'',//
                                'goodscode':par.find('td:eq(1)').html(),//内部物料编码
                                'sourcegoodscode':par.find('td:eq(2)').html(),//原厂物料编码
                                'version':par.find('td:eq(3)').html(),//型号
                                'desc':par.find('td:eq(4)').html(),//描述
                                'count':par.find('td:eq(5)').find("input:eq(0)").val(),//数量
                                'unitprice':par.find('td:eq(6)').find("input:eq(0)").val(),//单价
                                'singTotal':Math.round(par.find('td:eq(5)').find("input:eq(0)").val()*par.find('td:eq(6)').find("input:eq(0)").val()*100)/100,//小计
                                'from':30,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
                                'thetype':0,//新增 0，加 10，退 20，换 30
                                'purchaseorderid':faTable.find('td:eq(0)').find("span:eq(0)").html(),//采购订单ID
                                'purchasecontractid':'',//采购合同ID
                                'purchaseprice':par.find('td:eq(6)').find("input:eq(9)").val(),//采购单价，借出转销售使用移动平均价
                                'cess':par.find('td:eq(6)').find("input:eq(1)").val(),//税率
                                'purchasecount':par.find('td:eq(5)').find("input:eq(1)").val(),//采购数量
                                'sapid': '',
                                'salesitemid': '',
                                'purchaseid': par.find('td:eq(6)').find("input:eq(10)").val(), //采购申请ID
                                'supplierorderid': faTable.find('td:eq(0)').find("input:eq(1)").val(),  //供应商订单号
                                'currencytype': faTable.find('td:eq(0)').find("input:eq(2)").val(),  //供应商订单号
                                'devicecost': par.find('td:eq(6)').find("input:eq(2)").val(),  //设备费用
                                'servicecost': par.find('td:eq(6)').find("input:eq(3)").val(), //服务费用
                                'amountcost': par.find('td:eq(6)').find("input:eq(4)").val(),
                                'selfpickupcost': par.find('td:eq(6)').find("input:eq(5)").val(),   //自提费用
                                'storeplace': par.find('td:eq(6)').find("input:eq(6)").val(), //存储地点
                                'cashrebate': par.find('td:eq(6)').find("input:eq(7)").val(),
                                'thesum': par.find('td:eq(6)').find("input:eq(8)").val(),// #金额小计
                                'tax': par.find('td:eq(6)').find("input:eq(11)").val(),// #金额小计
                                'purchasetype': par.find('td:eq(6)').find("input:eq(12)").val(),// #金额小计
                                'currencytype': par.find('td:eq(6)').find("input:eq(13)").val(),// #金额小计
                                'purchaseorderid': par.find('td:eq(6)').find("input:eq(14)").val(),// #金额小计
                                'purchaselineno': par.find('td:eq(6)').find("input:eq(15)").val()// #金额小计
                            };
                            var eqPurchaseorderid = true;
                            $.each($scope.htcgList,function(key,value){
                                if(xObj.purchaseorderid == value.purchaseorderid){
                                    eqPurchaseorderid = false;
                                    swal("请不要重复选择相同的采购申请单物料", "", "warning");
                                    return false;
                                }
                            });
                            if(eqPurchaseorderid){
                                lsArr.push(xObj);
                            }else {
                                return false;
                            }
                        });
                        $scope.$apply(function () {
                            $scope.htcgList = $scope.htcgList.concat(lsArr);
                        });

                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#cgsqdBox" ).dialog( "open" );
        /*var jcParam = {'userid': $scope.ORDER_DATA.salesid,'isservice': isservice}
         var listJc = service.listCgd(jcParam);
         listJc.success(function(data){
         if(data.code == 200){
         $scope.cgsqdList = data.rst.data.items;
         }else {
         alert(data.msg);
         }
         });*/

    };
    $scope.cgsqdSearch = function(){
        if($scope.code=='' && $scope.clientname=='' &&$scope.supplierId == ''){
            swal("必须输入一个查询条件", "", "warning");
            return false;
        }
        var jcParam = {'limit':1000,'escompany':$scope.ORDER_DATA.escompany,'userid': $scope.ORDER_DATA.salesid, 'code':$scope.code, 'clientname':$scope.clientname,'supplierId':$scope.supplierId,'getgoods':1};
        var listCgd = service.listCgd(jcParam);
        listCgd.success(function(data){
            if(data.code == 200){
                $scope.cgsqdList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.htwlBox = function(){
        $( "#htwlBox" ).dialog({
            autoOpen: false,
            width: 750,
            height:500,
            modal: true
        });
        $( "#htwlBox" ).dialog( "open" );
    };
    $scope.htwlSelect = function(MATNR, BISMT, ZZGKXH, MAKTX, num, price ,ZZMAKTX){
        var obj = {
            'contractId':$scope.contractId,//合同保存ID
            'goodstype':'',//
            'goodscode':MATNR,//内部物料编码
            'sourcegoodscode':BISMT,//原厂物料编码
            'sourcegoodsdesc':ZZMAKTX,//描述
            'version':ZZGKXH,//型号
            'desc':MAKTX,//描述
            'count':num,//数量
            'unitprice':price,//单价
            'singTotal':Math.round(num*price*100)/100,//小计
            'from':0,//行项目来源 ，手动添加 0，导入 10，借出转销售 20，采购中选择 30，服务物料 40
            'thetype':0,//新增 0，加 10，退 20，换 30
            'purchaseorderid':'',//采购订单ID
            'purchasecontractid':'',//采购合同ID
            'purchaseprice':'',//采购单价，借出转销售使用移动平均价
            'cess':0,//税率
            'purchasecount':0,//采购数量
            'sapid': '',
            'salesitemid': '',
            'purchaseid': '', //采购申请ID
            'supplierorderid': '',  //供应商订单号
            'devicecost': '',  //设备费用
            'servicecost': '', //服务费用
            'amountcost': '',
            'selfpickupcost': '',   //自提费用
            'storeplace': '', //存储地点
            'cashrebate': '',
            'thesum': ''// #金额小计
        };
        $scope.tjwlList.push(obj);
        $( "#htwlBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    $scope.allCheck=function(event){
        var currentElement = event.target;
        var zCheck = $(currentElement).closest(".zTable").find(".zCheck");
        if($(currentElement).hasClass("allCheckAc")){
            $(currentElement).attr("class",'allCheck');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck');
            });
        }else {
            $(currentElement).attr("class",'allCheckAc');
            $(zCheck).each(function(){
                $(this).attr("class",'zCheck zCheckAc');
            });
        }
        event.stopPropagation();
    };
    $scope.zCheck = function(event){
        swal("只能全选", "", "warning");
        /*var currentElement = event.target;
         if($(currentElement).hasClass("zCheckAc")){
         $(currentElement).attr("class",'zCheck');
         }else {
         $(currentElement).attr("class",'zCheck zCheckAc');
         }*/
        event.stopPropagation();
    };
    $("body").delegate(".setCount","blur",function(){
        var obj = $(this);
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var unitprice = objParent.find(".unitprice:eq(0)").val();
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(unitprice)*100)/100).trigger('change');
    });
    $("body").delegate(".setPrice","blur",function(){
        var obj = $(this);
        if(obj.val() == ''){
            obj.val('0')
        }
        var objParent = obj.closest('tr');
        var singTotal = objParent.find(".singTotal:eq(0)");
        var count = objParent.find(".count:eq(0)").val();
        singTotal.val(Math.round(parseFloat(obj.val())*parseFloat(count)*100)/100).trigger('change');
    });
    $scope.comparBill = function(){
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if(tList.length<=0){
            swal("请添加产品清单", "", "warning");
            return false;
        }
        if(zTotal == 0 || zTotal == 0.0 || zTotal == 0.00){
            swal({
                title: "您要分摊单价吗?",
                text: "合同总价为0，清单单价全部变成0!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定分摊",
                cancelButtonText:'关闭',
                closeOnConfirm: true
            }, function(){
                $.each(tList,function(key,value) {
                    var oThat = $(this);
                    //oThat.find(".count:eq(0)").val('0').trigger('change');
                    oThat.find(".unitprice:eq(0)").val('0').trigger('change');
                    oThat.find(".singTotal:eq(0)").val('0').trigger('change');
                });
            });
            return false;
        }
        var total = 0;
        var totalxy = 0;
        if(tList.length == 1){
            var oThat = $(tList);
            var count = parseFloat(oThat.find(".count:eq(0)").val());
            var unitpriceVal = parseFloat(oThat.find(".unitprice:eq(0)").val());
            var singTotalVal = parseFloat(count*unitpriceVal);
            if(count == 0){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(zTotal != singTotalVal){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+singTotalVal+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    var unitprice = oThat.find(".unitprice:eq(0)");
                    var singTotal = oThat.find(".singTotal:eq(0)");
                    singTotal.val(zTotal).trigger('change');
                    unitprice.val(Math.round((zTotal/count)*100)/100).trigger('change');
                });

            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }else {
            var tListLen = tList.length-1;
            var kTrue = true;
            $.each(tList,function(key,value){
                var oThat = $(this);
                var count = parseFloat(oThat.find(".count:eq(0)").val());
                var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                var singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
                if(count == 0){// || unitprice == 0
                    kTrue = false;
                    return false;
                }
                /*var jT = count*unitprice;
                 total += jT;*/
                /*if(tListLen > key){
                 var jT = count*unitprice;
                 total += jT;
                 }else {
                 total+=singTotal;//最后一行直接取小计相加
                 }*/
                var jT = Math.round(count*unitprice*100)/100;
                oThat.find(".singTotal:eq(0)").val(jT).trigger('change');
                total += jT;
            });
            if(kTrue == false){
                swal("数量不能等于0", "", "warning");
                return false;
            }
            if(total == 0 && zTotal !=0){
                swal("合同总价不是"+zTotal+"，清单总价不能是0", "", "warning");
                return false;
            }

            total = parseInt(Math.round(total*100))/100;
            if(zTotal != total){
                swal({
                    title: "您要分摊单价吗?",
                    text: "物料总价:"+total+"不等于销售合同总价:"+zTotal+"!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定分摊",
                    cancelButtonText:'关闭',
                    closeOnConfirm: true
                }, function(){
                    $.each(tList,function(key,value){
                        var oThat = $(this);
                        var count = parseFloat(oThat.find(".count:eq(0)").val());
                        var unitprice = parseFloat(oThat.find(".unitprice:eq(0)").val());
                        var curUnitprice = parseInt(unitprice*zTotal/total*100)/100;//(count*unitprice/total)*zTotal/count
                        //var curUnitprice = parseInt(Math.round((count*unitprice*zTotal)/(total*count)*100))/100;
                        var singTotal = oThat.find(".singTotal:eq(0)");
                        var tot = count*curUnitprice;
                        if(tListLen > key){
                            totalxy += tot;
                        }
                        if(tListLen == key){
                            singTotal.val(Math.round(zTotal*100-totalxy*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(parseInt(singTotal.val()/count*100)/100).trigger('change');
                        }else {
                            singTotal.val(Math.round(count*curUnitprice*100)/100).trigger('change');
                            oThat.find(".unitprice:eq(0)").val(curUnitprice).trigger('change');
                        }

                    });
                });
            }else{
                swal("分摊完成可以提交审批", "", "warning");
            }
        }
    };

    $scope.addDataAll = function(data,statue) {
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if (tList.length <= 0) {
            swal("请添加产品清单", "", "warning");
            return false;
        } else {
            var singTotal = 0;
            if (tList.length == 1) {
                var oThat = $(tList);
                singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
            } else {
                $.each(tList, function (key, value) {
                    var oThat = $(this);
                    var total = parseFloat(oThat.find(".singTotal:eq(0)").val());
                    singTotal += total;
                });
            }
            if (zTotal != Math.round(singTotal * 100) / 100) {
                swal("请先点击清单完成按钮,然后点击分摊单价", "", "warning");
                return false;
            }
        }
        var tLength = tList.length - 1;
        var tListPar = $("#wlList").find(".list").eq(tLength);
        var lastCont = tListPar.find('.count:eq(0)').val();
        var lastunitprice = tListPar.find('.unitprice:eq(0)').val();
        var lastsingTotal = tListPar.find('.singTotal:eq(0)').val();
        if (lastCont * lastunitprice != lastsingTotal) {
            swal({
                title: "物料中最后一行数量乘单价不等于分摊出来的小计,确定要保存吗",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: '关闭',
                closeOnConfirm: true
            }, function () {
                totalSub();
            });
        } else {
            totalSub();
        }
        function totalSub() {
            var basedoc = {}, param = {}, contractbase = {}, qdDoc = {}, qdParam = {};
            contractbase = data;
            var userLink = $scope.userLinkList.concat($scope.excleData);
            contractbase.receiver = userLink;//交货联系人
            basedoc.contractbase = contractbase;
            basedoc.processId = $scope.processId;
            basedoc.nodeId = $scope.nodeId;
            basedoc.contractId = $scope.contractId;
            param.doc = basedoc;
            qdDoc.lend = $scope.wlList;
            qdDoc.purchase = $scope.htcgList;
            qdDoc.upload = $scope.wlExcleData.right;
            qdDoc.handwork = $scope.tjwlList;
            qdDoc.processId = $scope.processId;
            qdDoc.nodeId = $scope.nodeId;
            qdDoc.contractId = $scope.contractId;
            qdParam.doc = qdDoc;

            if ($scope.wlList.length <= 0 && $scope.htcgList.length <= 0 && $scope.tjwlList.length <= 0 && $scope.wlExcleData.right.length <= 0) {
                swal("请添加物料信息", "", "warning");
                return false;
            }
            if (statue == "save") {
                var saveitems = service.saveitems(qdParam);
                saveitems.success(function (data) {
                    if (data.code == 200) {
                        if (data.rst.status == 1) {
                            $scope.htcgList = data.rst.data.purchase;
                            return false;
                        } else {
                            swal("保存成功", "", "success");
                            $scope.cbfxBs = 'OK';
                            $scope.ht.activeTab = 3;
                            var readiecost = service.readiecost({'processId': $scope.processId, 'nodeId': $scope.nodeId});//不知道什么时候调用initcost
                            readiecost.success(function (data) {
                                if (data.code == 200) {
                                    var CBFX = $scope.CBFX = data.rst.data.doc.iecost;
                                    var othercost = $scope.othercost = data.rst.data.doc.othercost;
                                    var index = 0;
                                    $.each(othercost, function (key, value) {
                                        if (value.money > 0) {
                                            index = key;
                                        }
                                    })
                                    $scope.$watchCollection('CBFX', function (newValue, oldValue, scope) {
                                        //转口的成本
                                        $scope.CBFX.cost = $scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.proxyfee * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1;
                                        $scope.zkLirunWbi = $scope.CBFX.contractmoney * 1 - $scope.CBFX.cost * 1;
                                        $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi / $scope.CBFX.contractmoney) * 100);
                                        //出口成本分析
                                        //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                                        $scope.othercost[2].predictorderscost = $scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.bankfee * 1;
                                        //预估成本（外币） ：预估成本（RMB）/实时汇率
                                        $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.proxyfee * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1) * 100) / 100;
                                        $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB / $scope.CBFX.exchangerate) * 100) / 100;
                                        $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money * $scope.CBFX.exchangerate * 100) / 100;
                                        $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax * 1) * 100) / 100;
                                        $scope.ratio_tax = Math.round(($scope.RMB_tax / $scope.othercost[2].moneyRMB) * 100);
                                        $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost) * 100) / 100;
                                        $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB) * 100) / 100;
                                        $scope.ratio = Math.round(($scope.foreign / $scope.othercost[2].money) * 100);
                                        //其他类型的综合汇率和内部结算金额
                                        $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate * 1 + (($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.factoryservice * 1) * 1.17 + $scope.CBFX.duties * 1 + $scope.CBFX.addedtax * 1) / $scope.CBFX.outpurchasecost) * 10000) / 10000;
                                        $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate * 100) / 100;
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });

                                    $scope.$watchCollection('othercost[0]', function (newValue, oldValue, scope) {
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });
                                    $scope.$watchCollection('othercost[1]', function (newValue, oldValue, scope) {
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });
                                    $scope.$watchCollection('othercost[2]', function (newValue, oldValue, scope) {
                                        if ($scope.ORDER_DATA.counttype == '自营') {
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.17) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney / 1.06) - ($scope.CBFX.outpurchasecost * $scope.CBFX.exchangerate) - ($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1) - ($scope.othercost[0].outorderost / 1.17 + $scope.othercost[1].outorderost / 1.06 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating / 1.17 + $scope.othercost[1].mating / 1.06 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third / 1.17 + $scope.othercost[1].third / 1.06 + $scope.othercost[2].third * 1)) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        } else {//代理
                                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee * 1 + $scope.CBFX.bankfee * 1 + $scope.CBFX.duties2 * 1 + $scope.CBFX.outtrance * 1 + $scope.CBFX.intrance * 1 + $scope.CBFX.insurance * 1 + $scope.CBFX.documentaryinterest * 1 + $scope.CBFX.otherfee * 1 + $scope.CBFX.addedtax * 1 + $scope.CBFX.duties * 1 + $scope.CBFX.factoryservice * 1 + $scope.othercost[0].outorderost * 1 + $scope.othercost[1].outorderost * 1 + $scope.othercost[2].outorderost * 1 + $scope.othercost[0].mating * 1 + $scope.othercost[1].mating * 1 + $scope.othercost[2].mating * 1 + $scope.othercost[0].third * 1 + $scope.othercost[1].third * 1 + $scope.othercost[2].third * 1) * 100) / 100;
                                            if ($scope.ORDER_DATA.receipttype == '税率17%') {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.17) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.17)) * 10000) / 100;
                                            } else {
                                                $scope.moBuHanshui = Math.round((($scope.ORDER_DATA.contractmoney - $scope.othercost[index].orderscost) / 1.06) * 100) / 100;
                                                $scope.heYuelirun = Math.round(($scope.moBuHanshui / ($scope.ORDER_DATA.contractmoney / 1.06)) * 10000) / 100;
                                            }
                                        }
                                        $scope.moHanshui = Math.round(($scope.ORDER_DATA.contractmoney * 1 - $scope.othercost[index].orderscost) * 100) / 100;
                                    });

                                }
                            });
                        }
                    } else {
                        swal(data.msg, "", "warning");
                    }
                });
            }
        }
    };
    $scope.getExchangerate = function(currency){
        var getExchangerate = service.getExchangerate({'currency':currency});
        getExchangerate.success(function(data){
            if(data.code == 200){
                $scope.CBFX.exchangerate = data.rst.data.rate;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    }
    $scope.addqdData = function(cbData, baseData, type){
        var tList = $("#wlList").find(".list");
        var zTotal = parseFloat($scope.ORDER_DATA.contractmoney);
        if(tList.length<=0){
            swal("请添加产品清单", "", "warning");
            return false;
        }else{
            var singTotal = 0;
            if(tList.length == 1){
                var oThat = $(tList);
                singTotal = parseFloat(oThat.find(".singTotal:eq(0)").val());
            }else {
                $.each(tList, function (key, value) {
                    var oThat = $(this);
                    var total = parseFloat(oThat.find(".singTotal:eq(0)").val());
                    singTotal += total;
                });
            }
            if(zTotal != Math.round(singTotal*100)/100){
                swal("请先点击清单完成按钮,然后点击分摊单价", "", "warning");
                return false;
            }
        }
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        })
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        /*var cbParam={},creParam = {};
         cbParam.doc = cbData;
         cbParam.contractId = $scope.contractId;
         cbParam.nodeId = $scope.nodeId;
         cbParam.processId = $scope.processId;
         creParam.contractId = $scope.contractId;
         creParam.nodeId = $scope.nodeId;
         creParam.processId = $scope.processId;
         creParam.doc = baseData;
         creParam.doc.contractbase.companygain = $scope.heYuelirun;*/
        /*if(parseFloat($scope.CBFX.outpurchasecost)<=0){
         swal("境外采购成本不能小于等于0，请重新关联采购申请单", "", "warning");
         return false;
         }*/
        var cbParam={},creParam = {},contractbase={};
        cbParam.contractId = $scope.contractId;
        cbParam.nodeId = $scope.nodeId;
        cbParam.processId = $scope.processId;
        cbParam.iecost = cbData;
        cbParam.othercost = $scope.othercost;
        cbParam.ieprofit = {'ratio_tax':$scope.ratio_tax,'foreign_tax':$scope.foreign_tax,'RMB_tax':$scope.RMB_tax,'ratio':$scope.ratio,'foreign':$scope.foreign,'RMB':$scope.RMB,'zkLirunWbi':$scope.zkLirunWbi,'zkHeyuelirunlv':$scope.zkHeyuelirunlv,'moHanshui':$scope.moHanshui,'moBuHanshui':$scope.moBuHanshui,'heYuelirun':$scope.heYuelirun}
        creParam.contractId = $scope.contractId;
        creParam.nodeId = $scope.nodeId;
        creParam.processId = $scope.processId;
        contractbase.contractbase = baseData;
        contractbase.iecost = cbData;
        contractbase.othercost = $scope.othercost;
        creParam.doc = contractbase;
        /*creParam.doc.contractbase.companygain = $scope.heYuelirun;
         creParam.doc.contractbase.interest = $scope.moBuHanshui;//毛利率
         creParam.doc.contractbase.interestContainTax = $scope.moHanshui;//含税利率
         creParam.doc.contractbase.contractInterest = $scope.heYuelirun;//合约利率*/
        var mating = parseFloat($scope.othercost[0].mating) + parseFloat($scope.othercost[1].mating) + parseFloat($scope.othercost[2].mating)+parseFloat($scope.othercost[0].third) + parseFloat($scope.othercost[1].third) + parseFloat($scope.othercost[2].third);
        if(creParam.doc.contractbase.cp == '1' && mating <= 0 ){
            swal("配套采购和第三方服务不能都小于0", "", "warning");
            return false;
        }
        if(type == 'save'){
            var saveiecost = service.saveiecost(cbParam);
            saveiecost.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else {
            var saveiecost = service.saveiecost(cbParam);
            saveiecost.success(function(data){
                if(data.code == 200){
                    if(creParam.doc.contractbase.projecttype != '出口' && creParam.doc.contractbase.is2body=='是'){
                        creParam.doc.contractbase.interiooney = $scope.CBFX.interiooney;
                    }
                    var applyAddIecontract = service.applyAddIecontract(creParam);
                    applyAddIecontract.success(function(cdata){
                        if(cdata.code == 200){
                            swal({
                                title: "提交成功",
                                text: "",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "返回进出口销售合同列表",
                                closeOnConfirm: true
                            }, function(){ window.location.href='/index.html#/iecontractOrder'; });
                        }else {
                            swal(cdata.msg, "", "warning");
                        }
                    });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }


}]);
contractApp.controller('applyIecontractCtrl', ['$scope','$rootScope','$stateParams','contractServices',function($scope,$rootScope,$stateParams,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    // 判断是不是商务节点
    $scope.business = $rootScope.billPrev.business_common;
    //基本信息
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var person = $rootScope.loginPerson;
    //var prevs = person.user.prevs;
    var newprev = $rootScope.billPrev;
    //var newprev = person.user.newprev;
    var CBFX = $scope.CBFX = {};
    var othercost = $scope.othercost = [];
    $scope.othercost[0] = {};
    $scope.myflag = $stateParams.myflag;
    if(newprev.ywyscreate_page){
        $scope.ywyscreate_page = true;
    }
    /*if(prevs.length>0){
     angular.forEach(prevs,function(preData){
     if(preData.name == 'ywyscreate_page'){
     //$scope.ywysPrev = true; //判断填写业务应收创建方式字段值
     $scope.ywyscreate_page = true;
     }
     });
     }*/
    //产品清单
    var listCpqd = apply.listCpqd(param);
    listCpqd.success(function(data){
        if(data.code == 200){
            $scope.lend = data.rst.items.lend;//采购申请的物料
            $scope.purchase = data.rst.items.purchase;//采购申请的物料
            $scope.upload = data.rst.items.upload;//导入的物料
            $scope.handwork = data.rst.items.handwork;//手动添加物料

        }
    });
    // 货币枚举
    $scope.currencyName = {
        'CNY': '人民币',
        'EUR': '欧元',
        'USD': '美元',
        'CHF': '瑞士法郎',
        'HKD': '港币',
        'JPY': '日元'
    };
    $scope.doorman = {
        'xingfang': '行方方',
        'luyue': '鲁玥',
        'zhangna': '张娜',
        'wangmutian': '王牧天',
        'piaoxianguo': '朴贤国'
    };
    //成本分析


    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = apply.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    var viewPur = apply.applyViewIecontract(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model.contractbase;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.contractId = data.rst.doc.model.contractId;
            if($scope.ywyscreate_page == true && data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.ywysPrev = true;
                $scope.ywysPrevBot = false;
            }else if(data.rst.doc.model.contractbase.receivabletype != undefined) {
                $scope.ywysPrev = false; //判断填写业务应收创建方式字段值
                $scope.ywysPrevBot = true;
            }
            if(newprev.contract_businessremarks == true && data.rst.nodeStatus == 'active' && $stateParams.myflag == 'mydoing'){
                $scope.contract_businessremarks = true;//商务备注字段，新建时不显示，销售商务/商务经理审批时可见可编辑
            }
            /*if(data.rst.doc.model.contractbase.receivabletype != undefined && $scope.ywyscreate_page != true ){
             $scope.ywysPrev = false; //判断填写业务应收创建方式字段值
             $scope.ywysPrevBot = true;
             }else {
             $scope.ywysPrevBot = false;
             }*/
            if(data.rst.doc.model.contractbase.transferway) {
                var deliverwayObj = [{code: '01', name: '国内陆运'}, {code: '02', name: '国内海运'}, {
                    code: '03',
                    name: '国内空运'
                }, {code: '04', name: '国际陆运'}, {code: '05', name: '国际海运'}, {code: '06', name: '国际空运'}, {
                    code: '07',
                    name: '陆运快件'
                }, {code: '08', name: '火车运输'}, {code: '09', name: '快递'}, {code: '10', name: '专车'}, {
                    code: '11',
                    name: '自提'
                }, {
                    code: '12',
                    name: '无实物发货'
                }];
                var transferwayName = getField(deliverwayObj, 'code', data.rst.doc.model.contractbase.transferway);
                $scope.transferway = transferwayName.name;
            }
            if($scope.ORDER_DATA.projecttype=='转口'){
                $scope.cbfxZk = true;
                $scope.currencyDisable = false;
            }else if($scope.ORDER_DATA.projecttype=='出口'){
                $scope.cbfxCk = true;
                $scope.currencyDisable = true;
            }else {
                $scope.cbfxOther = true;
                $scope.currencyDisable = true;
            }
            /*var readiecost = apply.readiecost(param);
             readiecost.success(function(data){
             if(data.code == 200){*/
            $scope.CBFX = data.rst.doc.model.iecost;
            $scope.ieprofit = data.rst.doc.model.ieprofit;
            $scope.othercost = data.rst.doc.model.othercost;

            /* }
             });*/

            // 2017-3-8 Bug5876 销售申请表放在部门经理节点审批后，即可见此按钮
            // 取 processlog 中nodetype=department_manager部门经理，老单据就先按人，现在的部门经理就只有李大庆、曹进、何军
            var pro = data.rst.processlog || [];
            for(var i=0,l=pro.length; i<l; i++) {
                var manage=false;
                if(pro[i].nodetype) {
                    manage = pro[i].nodetype == 'department_manager'
                } else {
                    manage = ['李大庆','曹晋','何军'].indexOf(pro[i].sender.name) != -1;
                }
                if(manage && pro[i].operation == '通过') {
                    $scope.manageAgree = true;
                }
            }
            $scope.apCot = true;
            $scope.processlog = data.rst.processlog;
            $scope.doc = data.rst.doc.model;

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
                $scope.apCot = false;
            }
            $scope.loading = false;
            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ORDER_DATA.stomer, 'id':$scope.ORDER_DATA.stomerid};
                $scope.$broadcast('transfer.type', param);
            } catch (e) {}
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function(error){
        alert(error);
    });
	// 2017-06-19 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.salesorderid.length ? $scope.ORDER_DATA.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = apply.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId, isie:1});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
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

        var addInside = apply.addInsideIecontract(param);
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
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        if($scope.ywysPrev == true && ($scope.ORDER_DATA.receivabletype == undefined || $scope.ORDER_DATA.receivabletype == '' )){
            swal("请在基本信息里面填写业务应收创建方式！", "", "warning");
            return false;
        }else if($scope.ywysPrev == true && $scope.ORDER_DATA.receivabletype != ''){
            param.doc.contractbase.receivabletype = $scope.ORDER_DATA.receivabletype;
        }
        if($scope.ywysPrev == true && ($scope.ORDER_DATA.effectdate == undefined || $scope.ORDER_DATA.effectdate == '' )){
            swal("请在基本信息里面填写签订日期！", "", "warning");
            return false;
        }else if($scope.ywysPrev == true && $scope.ORDER_DATA.effectdate != undefined){
            param.doc.contractbase.effectdate = $scope.ORDER_DATA.effectdate;
        }


        // 提交
        $scope.applyFn = function (selIndex) {

            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }
            var applyAgree = apply.agreeIecontract(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回进出口合同待办",
                        closeOnConfirm: true
                    }, function(){ //window.location.href='/index.html#/index';
	                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                    });
                }else {
                    swal("提交失败！", '', "error");
                }
            }).error(function(error){
                alert(error);
            });

        };
        // if(($scope.ORDER_DATA.contracttype == '项目' || $scope.ORDER_DATA.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop !=='and')) {
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
        // $scope.applyFn(-1);


    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagreeIecontract(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回进出口合同待办",
                    closeOnConfirm: true
                }, function(){ //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.cancelIecontract(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回进出口合同待办",
                    closeOnConfirm: true
                }, function(){   //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = apply.recallIecontract(param);
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
}]);
contractApp.controller('iecontractViewCtrl', ['$scope', '$stateParams','$state', 'contractServices',function($scope, $stateParams, $state,payment){
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var Id= $scope.Id = $stateParams.id;
    var param = {contractId:Id};


    //销售合同清单变更(验证能否变更，如果能就跳转到新建清单页面)
    $scope.billIeChange = function(){
        var startIechange = payment.startIechange({contractId:Id});
        startIechange.success(function(data) {
            if(data.code == 200){
                var cusname = data.rst.contractbase.stomer;
                var cusnameId = data.rst.contractbase.stomerid;
                var contractno = data.rst.contractbase.groupno;
                $state.go('iecChangeBillAdd', {conid:Id, id: data.rst._id, contractno:contractno, cusname:cusname, cusnameId:cusnameId});
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //取消合同清单变更
    $scope.cancleIeBillChange = function(){
        var cancelIechange = payment.cancelIechange({contractId:Id});
        cancelIechange.success(function(data) {
            if(data.code == 200){
                swal("取消成功", "", "warning");
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //合同基本信息变更
    $scope.baseIeChange = function(){
        var startIechangeBase = payment.startIechangeBase({contractId:Id});
        startIechangeBase.success(function(data) {
            if(data.code == 200){
                $state.go('iecBaseChange', {conid:Id});
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };
    //取消合同基本信息变更
    $scope.cancleIeBaseChange = function(){
        var cancelIechangeBase = payment.cancelIechangeBase({contractId:Id});
        cancelIechangeBase.success(function(data) {
            if(data.code == 200){
                swal("取消成功", "", "warning");
            }else{
                swal(data.msg, "", "warning");
            }
        });
    };

    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    var viewCont = payment.viewInsideIecontract(param);
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model.contractbase;
        $scope.CBFX = data.rst.data.model.iecost;
        $scope.ieprofit = data.rst.data.model.ieprofit;
        $scope.othercost = data.rst.data.model.othercost;
        if($scope.ORDER_DATA.projecttype=='转口'){
            $scope.cbfxZk = true;
            $scope.currencyDisable = false;
        }else if($scope.ORDER_DATA.projecttype=='出口'){
            $scope.cbfxCk = true;
            $scope.currencyDisable = true;
        }else {
            $scope.cbfxOther = true;
            $scope.currencyDisable = true;
        }
        var islast = data.rst.data.model.contractbase.islast;
        if(islast == 1){
            $scope.versions = true;
        }else {
            $scope.versions = false;
        }
        if(data.rst.data.model.contractbase.transferway) {
            var deliverwayObj = [{code: '01', name: '国内陆运'}, {code: '02', name: '国内海运'}, {
                code: '03',
                name: '国内空运'
            }, {code: '04', name: '国际陆运'}, {code: '05', name: '国际海运'}, {code: '06', name: '国际空运'}, {
                code: '07',
                name: '陆运快件'
            }, {code: '08', name: '火车运输'}, {code: '09', name: '快递'}, {code: '10', name: '专车'}, {
                code: '11',
                name: '自提'
            }, {
                code: '12',
                name: '无实物发货'
            }];
            var transferwayName = getField(deliverwayObj, 'code', data.rst.data.model.contractbase.transferway);
            $scope.transferway = transferwayName.name;
        }


    });
	// 2017-06-20 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.salesorderid.length ? $scope.ORDER_DATA.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = payment.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId, isie:1});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    // 货币枚举
    $scope.currencyName = {
        'CNY': '人民币',
        'EUR': '欧元',
        'USD': '美元',
        'CHF': '瑞士法郎',
        'HKD': '港币',
        'JPY': '日元'
    };
    $scope.doorman = {
        'xingfang': '行方方',
        'luyue': '鲁玥',
        'zhangna': '张娜',
        'wangmutian': '王牧天',
        'piaoxianguo': '朴贤国'
    };
    //产品清单
    var listCpqd = payment.listCpqd(param);
    listCpqd.success(function(data){
        if(data.code == 200){
            $scope.lend = data.rst.items.lend;//采购申请的物料
            $scope.purchase = data.rst.items.purchase;//采购申请的物料
            $scope.upload = data.rst.items.upload;//导入的物料
            $scope.handwork = data.rst.items.handwork;//手动添加物料

        }
    });
    // 审批记录
    var vm = $scope;
    vm.processlog = null
    vm.$watch('ht.activeTab', function(nv, ov) {
        if (nv == 4 && (vm.processlog == null || vm.processlog.length == 0)) {
            var processlog = payment.getprocesslog({id: vm.ORDER_DATA.contractno}); // 直接取值数据中 申请人（proposer）
            processlog.success(function (data) {
                if (data.rst.length != 0) {
                    vm.processlog = data.rst;
                } else {
                    vm.ht.activeTab = ov;
                    swal('没有审批信息', '', 'warning');
                }
            });
        }
    });
    // 审批记录 END
    /*//成本分析
     var readiecost = payment.readiecost(param);
     readiecost.success(function(data){
     if(data.code == 200){
     $scope.CBFX = data.rst.data.doc.iecost;
     }
     });*/

}]);
//进出口销售合同内容变更
contractApp.controller('iecBaseChangeCtrl', ['$scope','$filter','$stateParams','$rootScope','contractServices',function($scope,$filter,$stateParams,$rootScope,service){
    var ht = $scope.ht = {};
    var cbfxBs = $scope.cbfxBs = '';
    $scope.htTab = function(type){
        var type = type;
        $scope.ht.activeTab = type;
    };
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var contractId = $scope.contractId = '';
    $scope.cpChange = function(type){
        if(type == '0'){
            $scope.cpIf = true;
            $scope.othercost[0].mating = 0;
            $scope.othercost[1].mating = 0;
            $scope.othercost[2].mating = 0;
            $scope.othercost[0].third = 0;
            $scope.othercost[1].third = 0;
            $scope.othercost[2].third = 0;
        }else {
            $scope.cpIf = false;
        }
    }
    if($stateParams.processId){
        var detailBaseIec = service.detailBaseIec({sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId});
        detailBaseIec.success(function(data) {
            $scope.ORDER_DATA = data.rst.doc.model.contractbase;
            $scope.contractbase = data.rst.doc.model.contractbase;
            $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
            $scope.userLinkList = data.rst.doc.model.contractbase.receiver;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.contractId = data.rst.contractId;
            if($scope.ORDER_DATA.cp == '0'){
                $scope.cpIf = true;
            }else {
                $scope.cpIf = false;
            }
            if($scope.ORDER_DATA.canRepairProjectFee ==1){
                $scope.cpDisable = true;
            }
            if($scope.ORDER_DATA.contracttype == '专有服务'){
                $scope.zyfwIf = true;
            }else {
                $scope.zyfwIf = false;
            }
            if($scope.ORDER_DATA.projecttype=='转口'){
                $scope.cbfxZk = true;
                $scope.currencyDisable = false;
            }else if($scope.ORDER_DATA.projecttype=='出口'){
                $scope.cbfxCk = true;
                $scope.currencyDisable = true;
            }else {
                $scope.cbfxOther = true;
                $scope.currencyDisable = true;
            }
            var CBFX = $scope.CBFX = data.rst.doc.model.iecost;
            var othercost = $scope.othercost = data.rst.doc.model.othercost;
            var ieprofit = $scope.ieprofit = data.rst.doc.model.ieprofit;
            var index = 0;
            $.each(othercost,function(key,value){
                if(value.money > 0){
                    index = key;
                }
            })
            $scope.$watchCollection('CBFX',function(newValue,oldValue, scope){
                //转口的成本
                $scope.CBFX.cost = $scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1;
                $scope.zkLirunWbi  = $scope.CBFX.contractmoney*1 - $scope.CBFX.cost*1;
                $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi/$scope.CBFX.contractmoney)*100);
                //出口成本分析
                //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                //预估成本（外币） ：预估成本（RMB）/实时汇率
                $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1)*100)/100;
                $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB/$scope.CBFX.exchangerate)*100)/100;
                $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money*$scope.CBFX.exchangerate*100)/100;
                $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax*1)*100)/100;
                $scope.ratio_tax = Math.round(($scope.RMB_tax/$scope.othercost[2].moneyRMB)*100);
                $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost)*100)/100;
                $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB)*100)/100;
                $scope.ratio  = Math.round(($scope.foreign/$scope.othercost[2].money)*100);
                //其他类型的综合汇率和内部结算金额
                $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate*1 + (($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.factoryservice*1)*1.17+$scope.CBFX.duties*1+$scope.CBFX.addedtax*1)/$scope.CBFX.outpurchasecost)*10000)/10000;
                $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate*100)/100;
                if ($scope.contractbase.counttype == '自营') {
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }else {//代理
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }
                $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
            });
            $scope.$watchCollection('othercost[0]',function(newValue,oldValue, scope){
                if ($scope.contractbase.counttype == '自营') {
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }else {//代理
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }
                $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
            });
            $scope.$watchCollection('othercost[1]',function(newValue,oldValue, scope){
                if ($scope.contractbase.counttype == '自营') {
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }else {//代理
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }
                $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
            });
            $scope.$watchCollection('othercost[2]',function(newValue,oldValue, scope){
                if ($scope.contractbase.counttype == '自营') {
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }else {//代理
                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                    if($scope.contractbase.receipttype == '税率17%'){
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                    }else {
                        $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                    }
                }
                $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
            });
        });
    }else {
        var startchangeBase = service.startchangeBase({contractId:$stateParams.conid});
        startchangeBase.success(function(data) {
            if(data.code == 200){
                $scope.ORDER_DATA = data.rst.contractbase;
                $scope.contractbase = data.rst.contractbase;
                $scope.ORDER_DATA.paymentdate = $filter("date")($scope.ORDER_DATA.paymentdate, "yyyy-MM-dd");
                $scope.contractId = data.rst._id;
                $scope.userLinkList = data.rst.contractbase.receiver;
                $scope.oldId = data.rst.contractbase.oldId;
                if($scope.contractbase.cp == '0'){
                    $scope.cpIf = true;
                }else {
                    $scope.cpIf = false;
                }
                if($scope.ORDER_DATA.canRepairProjectFee ==1){
                    $scope.cpDisable = true;
                }
                if($scope.ORDER_DATA.projecttype=='转口'){
                    $scope.cbfxZk = true;
                    $scope.currencyDisable = false;
                }else if($scope.ORDER_DATA.projecttype=='出口'){
                    $scope.cbfxCk = true;
                    $scope.currencyDisable = true;
                }else {
                    $scope.cbfxOther = true;
                    $scope.currencyDisable = true;
                }
                var CBFX = $scope.CBFX = data.rst.iecost;
                var othercost = $scope.othercost = data.rst.othercost;
                var ieprofit = $scope.ieprofit = data.rst.ieprofit;
                var index = 0;
                $.each(othercost,function(key,value){
                    if(value.money > 0){
                        index = key;
                    }
                })
                $scope.$watchCollection('CBFX',function(newValue,oldValue, scope){
                    //转口的成本
                    $scope.CBFX.cost = $scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1;
                    $scope.zkLirunWbi  = $scope.CBFX.contractmoney*1 - $scope.CBFX.cost*1;
                    $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi/$scope.CBFX.contractmoney)*100);
                    //出口成本分析
                    //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                    //预估成本（外币） ：预估成本（RMB）/实时汇率
                    $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1)*100)/100;
                    $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB/$scope.CBFX.exchangerate)*100)/100;
                    $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money*$scope.CBFX.exchangerate*100)/100;
                    $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax*1)*100)/100;
                    $scope.ratio_tax = Math.round(($scope.RMB_tax/$scope.othercost[2].moneyRMB)*100);
                    $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost)*100)/100;
                    $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB)*100)/100;
                    $scope.ratio  = Math.round(($scope.foreign/$scope.othercost[2].money)*100);
                    //其他类型的综合汇率和内部结算金额
                    $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate*1 + (($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.factoryservice*1)*1.17+$scope.CBFX.duties*1+$scope.CBFX.addedtax*1)/$scope.CBFX.outpurchasecost)*10000)/10000;
                    $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate*100)/100;
                    if ($scope.contractbase.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
                $scope.$watchCollection('othercost[0]',function(newValue,oldValue, scope){
                    if ($scope.contractbase.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
                $scope.$watchCollection('othercost[1]',function(newValue,oldValue, scope){
                    if ($scope.contractbase.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
                $scope.$watchCollection('othercost[2]',function(newValue,oldValue, scope){
                    if ($scope.contractbase.counttype == '自营') {
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }else {//代理
                        $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                        if($scope.contractbase.receipttype == '税率17%'){
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.17))*10000)/100;
                        }else {
                            $scope.moBuHanshui = Math.round((($scope.contractbase.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                            $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractbase.contractmoney/1.06))*10000)/100;
                        }
                    }
                    $scope.moHanshui = Math.round(($scope.contractbase.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                });
            }else{
                swal(data.msg, "", "warning");
            }
        });
    }

    var watchExcel = $scope.$watchCollection ('excleData', function(newValue, oldValue) {
        // 导入的时候码为Number导致无法定位，转化一下类型
        for (var j=0,l=newValue.length; j<l; j++) {
            newValue[j].province = String(newValue[j].province);
            newValue[j].city = String(newValue[j].city);
        }
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var getCountry = service.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });

    var excleData =  $scope.excleData = [];
    var userLinkList =  $scope.userLinkList = [];

    $scope.cusUserOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            outHeight:0,
            source: function (request, response) {
                var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid,'NAME': $scope.ORDER_DATA.contactname};
                var listcontact = service.listcontact(cParam);
                listcontact.success(function(data){

                    if(data.code == 200){
                        /*response($.map(data.rst.data.items, function(item) {
                         return { label:item.NAME1, value: item.NAME1, tel:item.TELF1, title:item.TITLE_AP };
                         }));*/
                        var dataItems = data.rst.data;
                        if(!dataItems.length){
                            dataItems.push({
                                'NAME1': '未找到'
                            });
                        }
                        response($.map(dataItems, function(item) {
                            if(item.NAME1 == '未找到'){
                                return { label:item.NAME1, value: '' };
                            }else{
                                return { label:item.NAME1, value: item.NAME1, tel:item.TELF1 ,title:item.TITEL_AP};
                            }

                        }));
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.contactname = ui.item.value;
                $scope.ORDER_DATA.contactphone = ui.item.tel;
                $scope.ORDER_DATA.contacttitle = ui.item.title;
            }
        }
    };

    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type=='userLinkList'){
            $scope.userLinkList.splice(idx,1);
        }else if(type=='excleData'){
            $scope.excleData.splice(idx,1);
        }

    };
    $scope.cusLinkBox = function(){
        if(!$scope.ORDER_DATA.stomerid){
            swal("请先选择客户名称", "", "warning");
            return false;
        }
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            height:400,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        var cParam = {'KUNNR': $scope.ORDER_DATA.stomerid};
        var listCus = service.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    $scope.addData = function(data,statue){
        var doc={},param= {},contractbase = {};
        contractbase  = data;
        var userLink = $scope.userLinkList.concat($scope.excleData);
        contractbase.receiver = userLink;//交货联系人
        doc.contractbase = contractbase;
        doc.processId = $scope.processId;
        doc.nodeId = $scope.nodeId;
        doc.contractId = $scope.contractId;
        param.doc = doc;
        if(statue == "save"){
            var addInsideIecBaseChange = service.addInsideIecBaseChange(param);
            addInsideIecBaseChange.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                    $scope.processId = data.rst.doc.processId;
                    $scope.nodeId = data.rst.doc.nodeId;
                    $scope.contractId = data.rst.doc.contractId;
                    $scope.relationId = data.rst.doc.relationId;
                    $scope.cbfxBs = 'OK';
                    $scope.ht.activeTab = 3;
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else if(statue == 'apply'){
            var applyAddIecBaseChange = service.applyAddIecBaseChange(param);
            applyAddIecBaseChange.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "提交成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回合同列表",
                        closeOnConfirm: true
                    }, function(){ window.location.href='/index.html#/contractOrder'; });
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }
    }
    $scope.getExchangerate = function(currency){
        var getExchangerate = service.getExchangerate({'currency':currency});
        getExchangerate.success(function(data){
            if(data.code == 200){
                $scope.CBFX.exchangerate = data.rst.data.rate;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    }
    $scope.addqdData = function(cbData, type){

        var cbParam={},creParam = {},contractbase={};
        cbParam.doc = cbData;
        cbParam.contractId = $scope.contractId;
        cbParam.nodeId = $scope.nodeId;
        cbParam.processId = $scope.processId;
        cbParam.iecost = cbData;
        cbParam.othercost = $scope.othercost;
        cbParam.ieprofit = {'ratio_tax':$scope.ratio_tax,'foreign_tax':$scope.foreign_tax,'RMB_tax':$scope.RMB_tax,'ratio':$scope.ratio,'foreign':$scope.foreign,'RMB':$scope.RMB,'zkLirunWbi':$scope.zkLirunWbi,'zkHeyuelirunlv':$scope.zkHeyuelirunlv,'moHanshui':$scope.moHanshui,'moBuHanshui':$scope.moBuHanshui,'heYuelirun':$scope.heYuelirun}
        creParam.contractId = $scope.contractId;
        creParam.nodeId = $scope.nodeId;
        creParam.processId = $scope.processId;
        contractbase.contractbase = $scope.contractbase;
        contractbase.iecost = cbData;
        creParam.doc = contractbase;
        creParam.doc.contractbase.companygain = $scope.heYuelirun;
        creParam.doc.contractbase.interest = $scope.moBuHanshui;//毛利率
        creParam.doc.contractbase.interestContainTax = $scope.moHanshui;//含税利率
        creParam.doc.contractbase.contractInterest = $scope.heYuelirun;//合约利率
        var mating = parseFloat($scope.othercost[0].mating) + parseFloat($scope.othercost[1].mating) + parseFloat($scope.othercost[2].mating)+parseFloat($scope.othercost[0].third) + parseFloat($scope.othercost[1].third) + parseFloat($scope.othercost[2].third);
        if(creParam.doc.contractbase.cp == '1' && mating <= 0 ){
            swal("配套采购和第三方服务不能都小于0", "", "warning");
            return false;
        }
        if(type == 'save'){
            var saveiecost = service.saveiecost(cbParam);
            saveiecost.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else {
            if(creParam.doc.contractbase.is2body == '是'&&creParam.doc.contractbase.interiooney != cbParam.doc.interiooney){
                swal({
                    title: "基本信息里面的内部结算金额"+creParam.doc.contractbase.interiooney+"跟成本分析里面的内部结算金额"+cbParam.doc.interiooney+"不一致确定提交吗？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText:'取消',
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定提交",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true,
                }, function(){
                    var saveiecost = service.saveiecost(cbParam);
                    saveiecost.success(function(data){
                        if(data.code == 200){
                            /*if(creParam.doc.contractbase.projecttype != '出口'){
                             creParam.doc.contractbase.interiooney = $scope.CBFX.interiooney;
                             }*/
                            var applyAddIecBaseChange = service.applyAddIecBaseChange(creParam);
                            applyAddIecBaseChange.success(function(cdata){
                                if(cdata.code == 200){
                                    swal({
                                        title: "提交成功",
                                        text: "",
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "返回进出口销售合同列表",
                                        closeOnConfirm: true
                                    }, function(){ window.location.href='/index.html#/iecontractOrder'; });
                                }else {
                                    swal(cdata.msg,"","warning");
                                }
                            });
                        }else {
                            swal(data.msg,"","warning");
                        }
                    });
                });
            }else {
                var saveiecost = service.saveiecost(cbParam);
                saveiecost.success(function(data){
                    if(data.code == 200){
                        /*if(creParam.doc.contractbase.projecttype != '出口'){
                         creParam.doc.contractbase.interiooney = $scope.CBFX.interiooney;
                         }*/
                        var applyAddIecBaseChange = service.applyAddIecBaseChange(creParam);
                        applyAddIecBaseChange.success(function(cdata){
                            if(cdata.code == 200){
                                swal({
                                    title: "提交成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回进出口销售合同列表",
                                    closeOnConfirm: true
                                }, function(){ window.location.href='/index.html#/iecontractOrder'; });
                            }else {
                                swal(cdata.msg,"","warning");
                            }
                        });
                    }else {
                        swal(data.msg,"","warning");
                    }
                });
            }
        }
    }
}]);
contractApp.controller('iecBaseChangeApplyCtrl', ['$scope','$stateParams','$rootScope','contractServices',function($scope,$stateParams,$rootScope,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    // 判断是不是商务节点
    $scope.business = $rootScope.billPrev.business_common;
    //基本信息
    var ORDER_DATA = $scope.ORDER_DATA = {};

    // 货币枚举
    $scope.currencyName = {
        'CNY': '人民币',
        'EUR': '欧元',
        'USD': '美元',
        'CHF': '瑞士法郎',
        'HKD': '港币',
        'JPY': '日元'
    };
    $scope.doorman = {
        'xingfang': '行方方',
        'luyue': '鲁玥',
        'zhangna': '张娜',
        'wangmutian': '王牧天',
        'piaoxianguo': '朴贤国'
    };
    var getCountry = apply.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    var detailBaseContract = apply.detailBaseContract(param);
    detailBaseContract.success(function(data){
        if(data.code == 200){
            $scope.ORDER_DATA = data.rst.doc.model.contractbase;
            $scope.contractbase = data.rst.doc.model.contractbase;
            $scope.groupno = data.rst.doc.model.contractbase.groupno;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.contractId = data.rst.doc.model.contractId;
            $scope.oldId = data.rst.doc.model.contractbase.oldId;
            if(data.rst.doc.model.contractbase.transferway){
                var deliverwayObj = [{code:'01',name:'国内陆运'},{code:'02',name:'国内海运'},{code:'03',name:'国内空运'},{code:'04',name:'国际陆运'},{code:'05',name:'国际海运'},{code:'06',name:'国际空运'},{code:'07',name:'陆运快件'},{code:'08',name:'火车运输'},{code:'09',name:'快递'},{code:'10',name:'专车'},{code:'11',name:'自提'}, {
                    code: '12',
                    name: '无实物发货'
                }];
                var transferwayName = getField(deliverwayObj,'code',data.rst.doc.model.contractbase.transferway);
                $scope.transferway = transferwayName.name;
            }
            var CBFX = $scope.CBFX = data.rst.doc.model.iecost;
            if($scope.ORDER_DATA.projecttype=='转口'){
                $scope.cbfxZk = true;
                $scope.currencyDisable = false;
            }else if($scope.ORDER_DATA.projecttype=='出口'){
                $scope.cbfxCk = true;
                $scope.currencyDisable = true;
            }else {
                $scope.cbfxOther = true;
                $scope.currencyDisable = true;
            }
            if(data.rst.doc.model.othercost.length>0){
                var othercost = $scope.othercost = data.rst.doc.model.othercost;
                var ieprofit = $scope.ieprofit = data.rst.doc.model.ieprofit;
            }

            // 2017-3-8 Bug5876 销售申请表放在部门经理节点审批后，即可见此按钮
            // 取 processlog 中nodetype=department_manager部门经理，老单据就先按人，现在的部门经理就只有李大庆、曹进、何军
            var pro = data.rst.processlog || [];
            for(var i=0,l=pro.length; i<l; i++) {
                var manage=false;
                if(pro[i].nodetype) {
                    manage = pro[i].nodetype == 'department_manager'
                } else {
                    manage = ['李大庆','曹晋','何军'].indexOf(pro[i].sender.name) != -1;
                }
                if(manage && pro[i].operation == '通过') {
                    $scope.manageAgree = true;
                }
            }
            $scope.apCot = true;
            $scope.processlog = data.rst.processlog;
            $scope.doc = data.rst.doc.model;

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
                $scope.apCot = false;
            }
        }else{
            swal(data.msg, "", "warning");
        }
    }).error(function(error){
        alert(error);
    });
	// 2017-06-19 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.ORDER_DATA.groupno;
		saleOrderId = saleOrderId || $scope.ORDER_DATA.salesorderid.length ? $scope.ORDER_DATA.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = apply.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId, isie:1});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    $scope.viewHistory = function(Id){
        $( "#listversion" ).dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#listversion" ).dialog( "open" );
        var listversion = apply.listversion({groupno:$scope.groupno});
        listversion.success(function(data){
            if(data.code == 200){
                $scope.contractHistory = data.rst;
            }
        });
    }
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

        var addInsideIecBaseChange = apply.addInsideIecBaseChange(param);
        addInsideIecBaseChange.success(function(data){
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        var person = $rootScope.loginPerson;
        var roles = person.roles;
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;

        // 提交
        $scope.applyFn = function (selIndex) {
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }


            var applyAgree = apply.agreeIecBaseChange(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回进出口合同待办",
                        closeOnConfirm: true
                    }, function(){ //window.location.href='/index.html#/index';
	                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                    });
                }else {
                    swal("提交失败！", '', "error");
                }
            }).error(function(error){
                alert(error);
            });

        };

        // if(($scope.ORDER_DATA.contracttype == '项目' || $scope.ORDER_DATA.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
        if( $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or' || $scope.candidates[0].coop!=='and')) {
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
        // $scope.applyFn(-1);

    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagreeIecBaseChange(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回进出口合同待办",
                    closeOnConfirm: true
                }, function(){ //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.cancelIecBaseChange(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回进出口合同待办",
                    closeOnConfirm: true
                }, function(){   //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
				});
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = apply.recallIecBaseChange(param);
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
}]);
//进出口销售合同清单变更
contractApp.controller('iecChangeBillAddCtrl', ['$scope','$stateParams','$rootScope','contractServices',function($scope,$stateParams,$rootScope,payment){
    var ht = $scope.ht = {};
    var cbfxBs = $scope.cbfxBs = '';
    $scope.htTab = function(type){
        var type = type;
        $scope.ht.activeTab = type;
    };
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var CBFX = $scope.CBFX = {};
    var contractId =  $scope.contractId = '';
    var excleData = $scope.excleData = [];
    var rightData = $scope.rightData = {};
    var errorError = $scope.errorError = {};
    var excleWlData = $scope.excleWlData = {};
    $scope.excleWlData.right = {};
    $scope.excleWlData.error = {};
    $scope.excleWlData.right.MatchSubtract = [];
    $scope.excleWlData.right.MatchAdd = [];
    $scope.excleWlData.error.noMatch = [];
    $scope.excleWlData.error.errMatchSubtract = [];


    if($stateParams.processId){
        var applyViewBillChange = payment.applyViewBillChange({sapid:$stateParams.sapid,contractId:$stateParams.conid, processId:$stateParams.processId,nodeId:$stateParams.nodeId});
        applyViewBillChange.success(function(data) {
            if(data.code == 200){
                $scope.contractbase = data.rst.doc.model.contractbase;
                $scope.interiooney = data.rst.doc.model.contractbase.interiooney;
                $scope.doc = data.rst.doc.model;
                $scope.is2body = $scope.contractbase.is2body;
                $scope.ORDER_DATA = data.rst.doc.model.goodschangeprotocal;
                $scope.ORDER_DATA.contractno = data.rst.doc.model.contractbase.contractno;
                $scope.ORDER_DATA.stomer = data.rst.doc.model.contractbase.stomer;
                $scope.excleWlData.right.MatchAdd = data.rst.doc.model.MatchAdd;
                $scope.excleWlData.right.MatchSubtract = data.rst.doc.model.MatchSubtract;
                $scope.contractId = data.rst.doc.model.contractId;
                $scope.processId = data.rst.processId;
                $scope.nodeId = data.rst.nodeId;
                $scope.counttype = data.rst.doc.model.contractbase.counttype;
                $scope.oldId = data.rst.doc.model.contractbase.oldId;
                $scope.excleFormData ={contractId:$scope.contractId,'userid':person.user._id}
                if($scope.contractbase.cp == '0'){
                    $scope.cpIf = true;
                }else {
                    $scope.cpIf = false;
                }
                if($scope.contractbase.projecttype=='转口'){
                    $scope.cbfxZk = true;
                    $scope.currencyDisable = false;
                }else if($scope.contractbase.projecttype=='出口'){
                    $scope.cbfxCk = true;
                    $scope.currencyDisable = true;
                }else {
                    $scope.cbfxOther = true;
                    $scope.currencyDisable = true;
                }
                var CBFX = $scope.CBFX = data.rst.doc.model.iecost;
                var othercost = $scope.othercost = data.rst.doc.model.othercost;
                if($scope.othercost.length>0){
                    var index = 0;
                    $.each(othercost,function(key,value){
                        if(value.money > 0){
                            index = key;
                        }
                    })
                    $scope.contractmoney = othercost[index].money;
                    $scope.$watchCollection('CBFX',function(newValue,oldValue, scope){
                        //转口的成本
                        $scope.CBFX.cost = $scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1;
                        $scope.zkLirunWbi  = $scope.CBFX.contractmoney*1 - $scope.CBFX.cost*1;
                        $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi/$scope.CBFX.contractmoney)*100);
                        //出口成本分析
                        //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                        //预估成本（外币） ：预估成本（RMB）/实时汇率
                        $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1)*100)/100;
                        $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB/$scope.CBFX.exchangerate)*100)/100;
                        $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money*$scope.CBFX.exchangerate*100)/100;
                        $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax*1)*100)/100;
                        $scope.ratio_tax = Math.round(($scope.RMB_tax/$scope.othercost[2].moneyRMB)*100);
                        $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost)*100)/100;
                        $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB)*100)/100;
                        $scope.ratio  = Math.round(($scope.foreign/$scope.othercost[2].money)*100);
                        //其他类型的综合汇率和内部结算金额
                        $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate*1 + (($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.factoryservice*1)*1.17+$scope.CBFX.duties*1+$scope.CBFX.addedtax*1)/$scope.CBFX.outpurchasecost)*10000)/10000;
                        $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate*100)/100;
                        if ($scope.contractbase.counttype == '自营') {
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }else {//代理
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }
                        $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                    });
                    $scope.$watchCollection('othercost[0]',function(newValue,oldValue, scope){
                        if ($scope.contractbase.counttype == '自营') {
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }else {//代理
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }
                        $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                    });
                    $scope.$watchCollection('othercost[1]',function(newValue,oldValue, scope){
                        if ($scope.contractbase.counttype == '自营') {
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }else {//代理
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }
                        $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                    });
                    $scope.$watchCollection('othercost[2]',function(newValue,oldValue, scope){
                        if ($scope.contractbase.counttype == '自营') {
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }else {//代理
                            $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                            if($scope.contractbase.receipttype == '税率17%'){
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                            }else {
                                $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                            }
                        }
                        $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                    });
                }

            }else{
                swal(data.msg, "", "warning");
            }
        });
    }else{
        var startchange = payment.startIechange({contractId:$stateParams.conid});
        startchange.success(function(data) {
            if(data.code == 200){
                $scope.contractbase = data.rst.contractbase;
                $scope.interiooney = data.rst.contractbase.interiooney;
                $scope.is2body = $scope.contractbase.is2body;
                $scope.ORDER_DATA.contractno = data.rst.contractbase.groupno;
                $scope.ORDER_DATA = data.rst.goodschangeprotocal;
                $scope.ORDER_DATA.contractno = data.rst.contractbase.contractno;
                $scope.ORDER_DATA.stomer = data.rst.contractbase.stomer;
                $scope.ORDER_DATA.interiooney = data.rst.contractbase.interiooney;
                $scope.excleWlData.right.MatchAdd = data.rst.MatchAdd;
                $scope.excleWlData.right.MatchSubtract = data.rst.MatchSubtract;
                $scope.contractId = data.rst._id;
                $scope.oldId = data.rst.contractbase.oldId;
                $scope.excleFormData ={contractId:$stateParams.id,'userid':person.user._id};
                $scope.doc = data.rst;
                if($scope.contractbase.cp == '0'){
                    $scope.cpIf = true;
                }else {
                    $scope.cpIf = false;
                }
                if($scope.contractbase.projecttype=='转口'){
                    $scope.cbfxZk = true;
                    $scope.currencyDisable = false;
                }else if($scope.contractbase.projecttype=='出口'){
                    $scope.cbfxCk = true;
                    $scope.currencyDisable = true;
                }else {
                    $scope.cbfxOther = true;
                    $scope.currencyDisable = true;
                }
            }else{
                swal(data.msg, "", "warning");
            }
        });
    }

    $scope.ORDER_DATA.allmoney = $scope.conMoney;
    var person = $rootScope.loginPerson;

    $scope.excleConf = {
        formData:{contractId:$stateParams.id,'userid':person.user._id},
        buttonText:'上传清单',
        uploader:'/iecontractchange/uploadprotocal',
    };
    $scope.unitpriceFun = function(type,index,thesum,changeCount){
        var unitprice = Math.round((thesum*1)/(changeCount*1)*100)/100;
        if(type == 'MatchAdd'){
            $(".MatchAddClass").eq(index).find('.unitprice:eq(0)').val(unitprice).trigger('change');
        }else{
            $(".MatchSubtractClass").eq(index).find('.unitprice:eq(0)').val(unitprice).trigger('change');
        }
    }
    $scope.comeDel = function(index,type){
        if(type == 'MatchAdd'){
            $scope.excleWlData.right.MatchAdd.splice(index,1);
        }else if(type == 'MatchSubtract'){
            $scope.excleWlData.right.MatchSubtract.splice(index,1);
        }else if(type == 'noMatch'){
            $scope.excleWlData.error.noMatch.splice(index,1);
        }else if(type == 'errMatchSubtract'){
            $scope.excleWlData.error.errMatchSubtract.splice(index,1);
        }
    };
    $scope.addData = function(data,statue){
        var doc={},param= {},itemParam = {},paramSave = {};
        doc = data;
        var protocalItem = [];
        $scope.interiooney = doc.interiooney;
        $scope.doc.contractbase.interiooney = doc.interiooney;
        protocalItem = $scope.excleWlData.right.MatchAdd.concat($scope.excleWlData.right.MatchSubtract);
        if($scope.excleWlData.error.noMatch.length>=1 || $scope.excleWlData.error.errMatchSubtract.length>=1){
            swal("变更清单中红色的为错误信息，请删除后再提交", "", "warning");
            return false;
        }
        if(protocalItem<=0){
            swal("请上传变更清单", "", "warning");
            return false;
        }
        if($scope.excleWlData.right.MatchSubtract.length>0){
            var MatchSubtractTotal = 0;
            angular.forEach($scope.excleWlData.right.MatchSubtract, function(data,index,array){
                //MatchSubtractTotal += (data.changeCount*data.unitprice);
                MatchSubtractTotal += data.thesum*1
            });
            MatchSubtractTotal = Math.round(MatchSubtractTotal*100)/100;
            /*if(doc.returngoodsmoney!=undefined){
             swal("退货金额不能为空", "", "warning");
             return false;
             }*/
            if(doc.returngoodsmoney == undefined){
                swal("退货金额不能为空", "", "warning");
                return false;
            }else if(Math.round(MatchSubtractTotal*100)/100 != parseFloat(doc.returngoodsmoney)){
                swal("退货金额"+doc.returngoodsmoney+"和清单里面的退货总金额"+Math.round(MatchSubtractTotal*100)/100+"不相等", "", "warning");
                return false;
            }
        }else if(($scope.excleWlData.right.MatchSubtract == undefined || $scope.excleWlData.right.MatchSubtract.length <= 0) && parseFloat(doc.returngoodsmoney) > 0){
            swal("没有退货清单，请把退货金额改成0", "", "warning");
            return false;
        }
        if($scope.excleWlData.right.MatchAdd.length>0){
            var MatchAddTotal = 0;
            angular.forEach($scope.excleWlData.right.MatchAdd, function(data,index,array){
                //MatchAddTotal += data.changeCount*data.unitprice;
                MatchAddTotal += data.thesum*1
            });
            MatchAddTotal = Math.round(MatchAddTotal*100)/100;
            /*if(doc.addgoodsmoney!=undefined){
             swal("补货金额不能为空", "", "warning");
             return false;
             }*/
            if(doc.addgoodsmoney == undefined){
                swal("补货金额不能为空", "", "warning");
                return false;
            }else if(Math.round(MatchAddTotal*100)/100 != parseFloat(doc.addgoodsmoney)){
                swal("补货金额"+doc.addgoodsmoney+"和清单里面的补货总金额"+Math.round(MatchAddTotal*100)/100+"不相等", "", "warning");
                return false;
            }
        }else if(($scope.excleWlData.right.MatchAdd == undefined || $scope.excleWlData.right.MatchAdd.length <= 0) && parseFloat(doc.addgoodsmoney) > 0){
            swal("没有补货清单，请把补货金额改成0", "", "warning");
            return false;
        }



        doc.addrebatelist = $scope.fdList;

        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.contractId = $scope.contractId;
        param.doc = doc;//addInsideBillChangeTtems
        itemParam.protocalItem = protocalItem;
        itemParam.contractId = $scope.contractId;
        paramSave.doc = $scope.doc;
        paramSave.processId = $scope.processId;
        paramSave.nodeId = $scope.nodeId;
        paramSave.contractId = $scope.contractId;
        if(statue == "save"){
            var addInsideIecBillChangeTtems = payment.addInsideIecBillChangeTtems(itemParam);
            addInsideIecBillChangeTtems.success(function(data1){
                if(data1.code == 200){
                    var addInsideIecBillChange = payment.addInsideIecBillChange(param);
                    addInsideIecBillChange.success(function(data2){
                        if(data2.code == 200){
                            var addInsideIecBillChangeSave = payment.addInsideIecBillChangeSave(paramSave);
                            addInsideIecBillChangeSave.success(function(data3){
                                if(data3.code == 200){
                                    swal("保存成功", "", "success");
                                    $scope.cbfxBs = 'OK';
                                    $scope.ht.activeTab = 3;
                                    $scope.processId= data3.rst.doc.processId;
                                    $scope.nodeId= data3.rst.doc.nodeId;
                                    var readiecost = payment.readiechangecost({'processId':$scope.processId,'nodeId':$scope.nodeId});
                                    readiecost.success(function(data4){
                                        if(data4.code == 200){
                                            var CBFX = $scope.CBFX = data4.rst.data.doc.iecost;
                                            var othercost = $scope.othercost = data4.rst.data.doc.othercost;

                                            var index = 0;
                                            $.each(othercost,function(key,value){
                                                if(value.money > 0){
                                                    index = key;
                                                }
                                            })
                                            $scope.contractmoney = othercost[index].money;
                                            $scope.$watchCollection('CBFX',function(newValue,oldValue, scope){
                                                //转口的成本
                                                $scope.CBFX.cost = $scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1;
                                                $scope.zkLirunWbi  = $scope.CBFX.contractmoney*1 - $scope.CBFX.cost*1;
                                                $scope.zkHeyuelirunlv = Math.round(($scope.zkLirunWbi/$scope.CBFX.contractmoney)*100);
                                                //出口成本分析
                                                //预估成本（RMB） ： 采购合同金额+银行费+代理费+国际运费+报关杂费+保险费+国内运费+其他+押汇利息+关税+增值税
                                                //预估成本（外币） ：预估成本（RMB）/实时汇率
                                                $scope.othercost[2].orderscostRMB = Math.round(($scope.CBFX.outpurchasecost*1 + $scope.CBFX.bankfee*1 + $scope.CBFX.proxyfee*1 + $scope.CBFX.outtrance*1 + $scope.CBFX.duties2*1 + $scope.CBFX.insurance*1 + $scope.CBFX.intrance*1 + $scope.CBFX.otherfee*1 + $scope.CBFX.documentaryinterest*1 + $scope.CBFX.duties*1 + $scope.CBFX.addedtax*1)*100)/100;
                                                $scope.othercost[2].predictorderscost = Math.round(($scope.othercost[2].orderscostRMB/$scope.CBFX.exchangerate)*100)/100;
                                                $scope.othercost[2].moneyRMB = Math.round($scope.othercost[2].money*$scope.CBFX.exchangerate*100)/100;
                                                $scope.RMB_tax = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB + $scope.CBFX.predictbacktax*1)*100)/100;
                                                $scope.ratio_tax = Math.round(($scope.RMB_tax/$scope.othercost[2].moneyRMB)*100);
                                                $scope.foreign = Math.round(($scope.othercost[2].money - $scope.othercost[2].predictorderscost)*100)/100;
                                                $scope.RMB = Math.round(($scope.othercost[2].moneyRMB - $scope.othercost[2].orderscostRMB)*100)/100;
                                                $scope.ratio  = Math.round(($scope.foreign/$scope.othercost[2].money)*100);
                                                //其他类型的综合汇率和内部结算金额
                                                $scope.CBFX.generalrate = Math.round(($scope.CBFX.exchangerate*1 + (($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.factoryservice*1)*1.17+$scope.CBFX.duties*1+$scope.CBFX.addedtax*1)/$scope.CBFX.outpurchasecost)*10000)/10000;
                                                $scope.CBFX.interiooney = Math.round($scope.CBFX.outpurchasecost * $scope.CBFX.generalrate*100)/100;
                                                if ($scope.contractbase.counttype == '自营') {
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }else {//代理
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }
                                                $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                                            });
                                            $scope.$watchCollection('othercost[0]',function(newValue,oldValue, scope){
                                                if ($scope.contractbase.counttype == '自营') {
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }else {//代理
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }
                                                $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                                            });
                                            $scope.$watchCollection('othercost[1]',function(newValue,oldValue, scope){
                                                if ($scope.contractbase.counttype == '自营') {
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }else {//代理
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }
                                                $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                                            });
                                            $scope.$watchCollection('othercost[2]',function(newValue,oldValue, scope){
                                                if ($scope.contractbase.counttype == '自营') {
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.outpurchasecost*$scope.CBFX.generalrate+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.17)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney/1.06)-($scope.CBFX.outpurchasecost*$scope.CBFX.exchangerate)-($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1)-($scope.othercost[0].outorderost/1.17+$scope.othercost[1].outorderost/1.06+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating/1.17+$scope.othercost[1].mating/1.06+$scope.othercost[2].mating*1+$scope.othercost[0].third/1.17+$scope.othercost[1].third/1.06+$scope.othercost[2].third*1))*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }else {//代理
                                                    $scope.othercost[index].orderscost = Math.round(($scope.CBFX.proxyfee*1+$scope.CBFX.bankfee*1+$scope.CBFX.duties2*1+$scope.CBFX.outtrance*1+$scope.CBFX.intrance*1+$scope.CBFX.insurance*1+$scope.CBFX.documentaryinterest*1+$scope.CBFX.otherfee*1+$scope.CBFX.addedtax*1+$scope.CBFX.duties*1+$scope.CBFX.factoryservice*1+$scope.othercost[0].outorderost*1+$scope.othercost[1].outorderost*1+$scope.othercost[2].outorderost*1+$scope.othercost[0].mating*1+$scope.othercost[1].mating*1+$scope.othercost[2].mating*1+$scope.othercost[0].third*1+$scope.othercost[1].third*1+$scope.othercost[2].third*1)*100)/100;
                                                    if($scope.contractbase.receipttype == '税率17%'){
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.17)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.17))*10000)/100;
                                                    }else {
                                                        $scope.moBuHanshui = Math.round((($scope.contractmoney - $scope.othercost[index].orderscost)/1.06)*100)/100;
                                                        $scope.heYuelirun = Math.round(($scope.moBuHanshui/($scope.contractmoney/1.06))*10000)/100;
                                                    }
                                                }
                                                $scope.moHanshui = Math.round(($scope.contractmoney*1-$scope.othercost[index].orderscost)*100)/100;
                                            });

                                        }else {
                                            swal(data4.msg, "", "warning");
                                            return false;
                                        }
                                    });
                                }else {
                                    swal(data3.msg, "", "warning");
                                    return false;
                                }
                            })
                        }else {
                            swal(data2.msg, "", "warning");
                            return false;
                        }
                    });
                }else {
                    $scope.excleWlData.right.MatchAdd = data1.rst.right.MatchAdd;
                    $scope.excleWlData.right.MatchSubtract = data1.rst.right.MatchSubtract;
                    $scope.excleWlData.error.noMatch = data1.rst.error.noMatch;
                    $scope.excleWlData.error.errMatchSubtract = data1.rst.error.errMatchSubtract;
                    swal(data1.msg, "", "warning");
                    return false;
                }
            });

        }
    }
    $scope.getExchangerate = function(currency){
        var getExchangerate = payment.getExchangerate({'currency':currency});
        getExchangerate.success(function(data){
            if(data.code == 200){
                $scope.CBFX.exchangerate = data.rst.data.rate;
            }else {
                swal(data.msg, "", "warning");
            }
        });
    }
    $scope.addqdData = function(cbData, type){
        /* if(parseFloat($scope.CBFX.outpurchasecost)<=0){
         swal("境外采购成本不能小于等于0，请重新关联采购申请单", "", "warning");
         return false;
         }*/
        var cbParam={},creParam = {},contractbase={};
        cbParam.doc = cbData;
        cbParam.contractId = $scope.contractId;
        cbParam.nodeId = $scope.nodeId;
        cbParam.processId = $scope.processId;
        cbParam.iecost = cbData;
        cbParam.ieprofit = {'ratio_tax':$scope.ratio_tax,'foreign_tax':$scope.foreign_tax,'RMB_tax':$scope.RMB_tax,'ratio':$scope.ratio,'foreign':$scope.foreign,'RMB':$scope.RMB,'zkLirunWbi':$scope.zkLirunWbi,'zkHeyuelirunlv':$scope.zkHeyuelirunlv,'moHanshui':$scope.moHanshui,'moBuHanshui':$scope.moBuHanshui,'heYuelirun':$scope.heYuelirun}
        cbParam.othercost = $scope.othercost;
        creParam.contractId = $scope.contractId;
        creParam.nodeId = $scope.nodeId;
        creParam.processId = $scope.processId;
        creParam.doc = $scope.doc;
        creParam.doc.iecost = cbData;
        creParam.doc.contractbase.interiooney = $scope.interiooney;
        creParam.doc.contractbase.companygain = $scope.heYuelirun;
        creParam.doc.contractbase.interest = $scope.moBuHanshui;//毛利率
        creParam.doc.contractbase.interestContainTax = $scope.moHanshui;//含税利率
        creParam.doc.contractbase.contractInterest = $scope.heYuelirun;//合约利率
        creParam.doc.contractbase.interiooney = $scope.ORDER_DATA.interiooney;
        var mating = parseFloat($scope.othercost[0].mating) + parseFloat($scope.othercost[1].mating) + parseFloat($scope.othercost[2].mating)+parseFloat($scope.othercost[0].third) + parseFloat($scope.othercost[1].third) + parseFloat($scope.othercost[2].third);
        if(creParam.doc.contractbase.cp == '1' && mating <= 0 ){
            swal("配套采购和第三方服务不能都小于0", "", "warning");
            return false;
        }
        if(type == 'save'){
            var saveiecost = payment.saveiechangecost(cbParam);
            saveiecost.success(function(data){
                if(data.code == 200){
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                }
            });
        }else {
            if(creParam.doc.contractbase.is2body == '是'&&$scope.ORDER_DATA.interiooney != cbParam.doc.interiooney){
                swal({
                    title: "基本信息里面的内部结算金额"+$scope.ORDER_DATA.interiooney+"跟成本分析里面的内部结算金额"+cbParam.doc.interiooney+"不一致确定提交吗？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText:'取消',
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定提交",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true,
                }, function(){
                    var saveiecost = payment.saveiechangecost(cbParam);
                    saveiecost.success(function(data){
                        if(data.code == 200){
                            var applyAddIecBillChange = payment.applyAddIecBillChange(creParam);
                            applyAddIecBillChange.success(function(cdata){
                                if(cdata.code == 200){
                                    swal({
                                        title: "提交成功",
                                        text: "",
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "返回进出口销售合同列表",
                                        closeOnConfirm: true
                                    }, function(){ window.location.href='/index.html#/iecontractOrder'; });
                                }else {
                                    swal(cdata.msg, "", "warning");
                                }
                            });
                        }else {
                            swal(data.msg, "", "warning");
                        }
                    });
                });
            }else {
                var saveiecost = payment.saveiechangecost(cbParam);
                saveiecost.success(function(data){
                    if(data.code == 200){
                        var applyAddIecBillChange = payment.applyAddIecBillChange(creParam);
                        applyAddIecBillChange.success(function(cdata){
                            if(cdata.code == 200){
                                swal({
                                    title: "提交成功",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "返回进出口销售合同列表",
                                    closeOnConfirm: true
                                }, function(){ window.location.href='/index.html#/iecontractOrder'; });
                            }else {
                                swal(cdata.msg, "", "warning");
                            }
                        });
                    }else {
                        swal(data.msg, "", "warning");
                    }
                });
            }


        }
    }
}]);
contractApp.controller('applyIecChangeBillCtrl', ['$scope','$stateParams','$rootScope','contractServices',function($scope,$stateParams,$rootScope,service){

    var excleWlData = $scope.excleWlData = {};
    var ORDER_DATA = $scope.ORDER_DATA = {};
    var tuObj = $scope.tuObj = {};
    var buObj = $scope.buObj = {};
    $scope.excleWlData.right = {};
    $scope.excleWlData.error = {};
    $scope.excleWlData.right.MatchSubtract = [];
    $scope.excleWlData.right.MatchAdd = [];
    var paramChange = {sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(paramChange, {myflag: "mysubscriber" })
    }
    // 判断是不是商务节点
    $scope.business = $rootScope.billPrev.business_common;
    // var applyViewBillChange = service.applyViewBillChange({sapid:$stateParams.sapid, processId:$stateParams.processId,nodeId:$stateParams.nodeId});
    var applyViewBillChange = service.applyViewBillChange(paramChange);
    applyViewBillChange.success(function(data) {
        if(data.code == 200){
            $scope.contractbase = data.rst.doc.model.contractbase;
            $scope.is2body = $scope.contractbase.is2body;
            $scope.groupno = data.rst.doc.model.contractbase.groupno;
            $scope.ORDER_DATA = data.rst.doc.model.goodschangeprotocal;
            $scope.ORDER_DATA.contractno = data.rst.doc.model.contractbase.contractno;
            $scope.ORDER_DATA.stomer = data.rst.doc.model.contractbase.stomer;
            $scope.excleWlData.right.MatchAdd = data.rst.doc.model.MatchAdd;
            $scope.excleWlData.right.MatchSubtract = data.rst.doc.model.MatchSubtract;
            $scope.contractId = data.rst.doc.model.contractId;
            $scope.processId = data.rst.processId;
            $scope.nodeId = data.rst.nodeId;
            $scope.candidates = data.rst.candidates;
            $scope.oldId = data.rst.doc.model.contractbase.oldId;
            $scope.counttype = data.rst.doc.model.contractbase.counttype;

            var CBFX = $scope.CBFX = data.rst.doc.model.iecost;
            var othercost = $scope.othercost = data.rst.doc.model.othercost;
            var ieprofit = $scope.ieprofit = data.rst.doc.model.ieprofit;
            var index = 0;
            $.each(othercost,function(key,value){
                if(value.money > 0){
                    index = key;
                }
            })
            if($scope.contractbase.projecttype=='转口'){
                $scope.cbfxZk = true;
                $scope.currencyDisable = false;
            }else if($scope.contractbase.projecttype=='出口'){
                $scope.cbfxCk = true;
                $scope.currencyDisable = true;
            }else {
                $scope.cbfxOther = true;
                $scope.currencyDisable = true;
            }
            // 2017-3-8 Bug5876 销售申请表放在部门经理节点审批后，即可见此按钮
            // 取 processlog 中nodetype=department_manager部门经理，老单据就先按人，现在的部门经理就只有李大庆、曹进、何军
            var pro = data.rst.processlog || [];
            for(var i=0,l=pro.length; i<l; i++) {
                var manage=false;
                if(pro[i].nodetype) {
                    manage = pro[i].nodetype == 'department_manager'
                } else {
                    manage = ['李大庆','曹晋','何军'].indexOf(pro[i].sender.name) != -1;
                }
                if(manage && pro[i].operation == '通过') {
                    $scope.manageAgree = true;
                }
            }
            $scope.apCot = true;
            $scope.processlog = data.rst.processlog;
            $scope.doc = data.rst.doc.model;

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
                $scope.apCot = false;
            }
        }else{
            swal(data.msg, "", "warning");
        }
    });
	// 2017-06-19 增加“查看采购订单”
	$scope.viewCGDD = function(groupno, saleOrderId){
		groupno = groupno || $scope.contractbase.groupno;
		saleOrderId = saleOrderId || $scope.contractbase.salesorderid.length ? $scope.contractbase.salesorderid[0].orderid : null;
		$( "#listPoheader" ).dialog({
			autoOpen: false,
			width: 900,
			height:500,
			modal: true
		});
		$( "#listPoheader" ).dialog( "open" );
		var selectnotreturn = service.listbycontract({'conno':groupno, 'saleOrderId': saleOrderId, isie:1});
		selectnotreturn.success(function(data){
			if(!data.ERROR){
				$scope.dataList = data.RESULT;
				$scope.enumobj = data.enum;
			}else {
				swal(data.ERROR, "", "warning");
				//alert(data.msg);
			}
		})
	};
    $scope.viewHistory = function(Id){
        $( "#listversion" ).dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true,
            buttons: [
                {
                    text: "关闭",
                    class: "gray_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                },
                {
                    text: "确定",
                    class: "red_bg",
                    click: function() {
                        $( this ).dialog( "destroy" );
                        $(".ui-dialog").remove();
                    }
                }
            ]
        });
        $( "#listversion" ).dialog( "open" );
        var listversion = service.listversion({groupno:$scope.groupno});
        listversion.success(function(data){
            if(data.code == 200){
                $scope.contractHistory = data.rst;
            }
        });
    }
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

        var addInsideIecBillChangeSave = service.addInsideIecBillChangeSave(param);
        addInsideIecBillChangeSave.success(function(data) {
            if(data.code == 200){
                window.location.reload();
            }else {
                swal(data.msg, "", "warning");
            }
        });

    };
    $scope.applyAgree = function(){
        var param = {};
        param.doc = $scope.doc;
        param.comment = applyObj.applyIdea;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.candidates = $scope.candidates;
        // 提交
        $scope.applyFn = function (selIndex) {
            if(selIndex !== -1) {
                $("#approversDialog").dialog("destroy");
                $(".ui-dialog").remove();
                var selObj = $scope.receivers[selIndex];
                param.candidates[0].receivers = [selObj];
            }


            var applyAgree = service.agreeIecBillChange(param);
            applyAgree.success(function(data){
                if(data.code == 200){
                    swal({
                        title: "审批成功",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "返回进出口合同待办",
                        closeOnConfirm: true
                    }, function(){ //window.location.href='/index.html#/index';
	                    window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                    });
                }else {
                    swal("提交失败！", '', "error");
                }
            }).error(function(error){
                alert(error);
            });

        };

        // if(($scope.contractbase.contracttype == '项目' || $scope.contractbase.contracttype == '专有服务') && $scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or'|| $scope.candidates[0].coop !=='and')) {
        if($scope.candidates.length && $scope.candidates[0].receivers.length>1 && ($scope.candidates[0].coop!=='or'|| $scope.candidates[0].coop !=='and')) {
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
        // $scope.applyFn(-1);




    };
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = service.disagreeIecBillChange(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回进出口合同待办",
                    closeOnConfirm: true
                }, function(){ //window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = service.cancelIecBillChange(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回进出口合同待办",
                    closeOnConfirm: true
                }, function(){  // window.location.href='/index.html#/index';
	                window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=进出口合同&&controllercode=IECONTRACT,IECONTRACT_CHANGE,IECONT_CONTENTCHANGE';
                });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            alert(error);
        });
    };
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = service.recallIecBillChange(param);
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
}]);


// 2017-4-5
//采销单据关联
contractApp.controller('DocRelate',['$scope','contractServices',function($scope,service){
    //查询
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($scope.contractno==''){
                swal("必须查询条件", "", "warning");
                return true;
            }
            var param  = {page:$scope.paginationConf.currentPage,'VBELN':$scope.VBELN,'BSTKD':$scope.BSTKD,'POSNR':$scope.POSNR,'BISMT':$scope.BISMT,'MATNR':$scope.MATNR, 'KWMENG': $scope.KWMENG, 'ZPC_NUM': $scope.ZPC_NUM};
            var customerPromise = service.getsupplierorderidsforheader(param);
            $scope.paginationConf.pagePromise = customerPromise;
            $scope.list = '';
        }
    };
    $scope.contractBox = function(){
        $scope.matingContract = '';
        $scope.matingContractId = '';

        $scope.li = '';
        $( "#contractBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractBox" ).dialog( "open" );
    };
    $scope.dataList = [];
    $scope.selectContr = function(id,no,orderid,li){
        var param  =  {VBELN:orderid, BSTKD:no};
        var viewUser = service.getsupplierorderidsforheader(param);
        viewUser.success(function(data){
            if(data.code == 200){
                $scope.matingContract = no;
                $scope.orderid = orderid;
                $scope.list_cons = data.rst.ZPC_NUM;
                $scope.dataList.pop(li);
                $scope.dataList.push(li);
                $( "#contractBox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    };






    //保存 
    $scope.addData = function () {
        var param  =  {BSTKD:$scope.matingContract,VBELN:$scope.orderid,ZPC_NUM:$scope.list_cons};
        var viewUser = service.save(param);
        if(!$scope.list_cons){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        viewUser.success(function(data){
            if(data.code == 200){

                swal("保存成功", "", "success");
            }else {
                swal(data.msg,'','error');
            }
        });
    };
}]);

//采销清单关联
contractApp.controller('SupplierOrder',['$scope','contractServices',function($scope,service){
    //查询
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 5,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            if($scope.contractno==''){
                swal("必须查询条件", "", "warning");
                return true;
            }
            var param  = {page:$scope.paginationConf.currentPage,'VBELN':$scope.VBELN,'BSTKD':$scope.BSTKD,'POSNR':$scope.POSNR,'BISMT':$scope.BISMT,'MATNR':$scope.MATNR, 'KWMENG': $scope.KWMENG, 'ZPC_NUM': $scope.ZPC_NUM};
            var customerPromise = service.getorderitems(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.contractBox = function(){
        $( "#contractBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#contractBox" ).dialog( "open" );
    };
    var xscode ,contractno;
    $scope.dataList = [];
    $scope.selectContr = function(id,no,orderid,li){
        xscode = orderid;
        contractno = no;
        var param  =  {VBELN:orderid, BSTKD:no};
        var getorderitems = service.getorderitems(param);
        getorderitems.success(function(data){
            if(data.code == 200){
                $scope.matingContract = no;
                $scope.orderid = orderid;
                var ITEM_DATA = data.rst.ITEM_DATA;
                var MSG_DATA = data.rst.MSG_DATA;
                $scope.salesList = ITEM_DATA;
                $scope.excleFormData = {BSTKD:$scope.matingContract,VBELN:$scope.orderid};
                $scope.dataList.pop(li);
                $scope.dataList.push(li);
                $( "#contractBox" ).dialog("destroy");
                $(".ui-dialog").remove();
            }else {
                swal(data.msg, "", "warning");
            }
        }).error(function(data){
            alert(data);
        });
    };
    // 上传
    $scope.excleConfW1 = {
        formData:{BSTKD:$scope.matingContract,VBELN:$scope.orderid},
        buttonText:'上传',
        uploader:'/contractrepair/uploaditems'
    };

    $scope.changeSalesList = function(uploadCallData) {
        console.log('uploadCallData',uploadCallData);
        // if(uploadCallData == ''){
        //     swal("返回的数据为空", "", "warning");
        //     return false;
        // } else {
        //     swal("上传成功", "", "success");
        // }
        $scope.salesList = uploadCallData.ITEM_DATA;

    };


    // 下载
    $scope.downloadmb = function (e) {
        //var category = $scope.category ? $scope.category.split('-')[1] : '';
        //$(e.target).attr('href','/contractrepair/getorderitemscsv?VBELN'+xscode+'&BSTKD'+contractno);
        // console.log(xscode,contractno);
        window.open('/contractrepair/getorderitemscsv?VBELN='+xscode+'&BSTKD='+contractno)
    };
    $scope.excleFormData = {category: "", zrjt: 0};

    // 保存 
    $scope.addData = function () {
        // 判断是否有重复行项目，有重复不允许保存
        if($('#salesListBox').find('.errTip').length) {
            swal("当前清单中的信息有误，请重新上传！", "", "warning");
            return false;
        }
        var params  =  {BSTKD:$scope.matingContract,VBELN:$scope.orderid,items:$scope.salesList};
        var viewUser = service.saveitems2(params);
        if($scope.salesList ==''){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        viewUser.success(function(data){
            if(data.code == 200){
                swal("保存成功", "", "success");
            }else {
                swal(data.msg,'','error');
            }
        });
    };
}]);





var approvalApp = angular.module('approvalApp', ['pageDirectives', 'formDirectives', 'treeControl']);
approvalApp.controller('approvalCtrl', ['$scope','$stateParams', function ($scope,$stateParams) {
   $scope.obj={};
    $scope.obj.purOrder=false;
    $scope.obj.purRebate=false;
    $scope.obj.purchaseList=false;
    $scope.obj.receipts=false;
    $scope.obj.creditMemo=false;
    $scope.obj.productout=false;
    $scope.obj.reimbursement=false;
    $scope.obj.payment=false;
    $scope.obj.loanBill=false;
    $scope.obj.iecontractView=false;
    $scope.obj.mkinvoice=false;
    $scope.obj.issue=false;
    $scope.obj.credit=false;
    $scope.obj.customer=false;
    $scope.obj.purStore=false;
    $scope.obj.applyTem=false;
    $scope.obj.check=false;
    $scope.obj.debitbillList=false;
    $scope.obj.sign=false;
    $scope.obj.holiday=false;
    $scope.obj.purMaintain=false;
    $scope.obj.salesbonus=false;
    $scope.obj.contract=false;
    $scope.obj.bankCredit=false;
    $scope.obj.insideOrder=false;
    var source=$stateParams.source;
    $scope.picture=source;
    for(var p in $scope.obj){
        if(p==source){
            $scope.obj[p]=true;
        }else{
            $scope.obj[p]=false;
        }
    }
}]);


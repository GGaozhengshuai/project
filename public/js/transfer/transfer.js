var transferApp = angular.module('transferApp', ['pageDirectives', 'formDirectives']);
transferApp.service('transferServices', function ($http) {
    var service = {
        transferlist: function (param) {//转办申请查询接口
            return $http.post('/transfer/list', param, {cache: false});
        },
        transferupdate: function (param) {//转办申请保存接口
            return $http.post('/transfer/update', param, {cache: false});
        },
        transferstaff: function (param) {//人员查询接口
            return $http.post('/user/list', param, {cache: false});
        }
    };
    return service;
});
transferApp.controller('transferOrderCtrl', ['$scope', '$rootScope','$filter','transferServices',function($scope,$rootScope,$filter,transfer) {
    //转办申请查询
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
        	// 每次重填数据要清空之前选中记录
	        $scope.emptyFn();
	        if(!$scope.doc_type){
		        swal("请选择单据类型", "", "warning");
		        return true;
	        }
	        if(!$scope.doc_code && !$scope.sale && !$scope.busi && !$scope.appl){
		        swal("请至少再输入一个查询条件", "", "warning");
		        return true;
	        }
            var param = {
                status:'before',
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                doc_type: $scope.doc_type,
                doc_code: $scope.doc_code,
                sale: $scope.sale,
                busi: $scope.busi,
                appl: $scope.appl
            };
            var transferPromise = transfer.transferlist(param);
            transferPromise.success(function (data) {
                if (data.code == 200) {
                    $scope.dataList = data.rst.data.items;
                    /*$scope.doc_type = data.rst.data.items[0].doc_type;
                    var items = data.rst.data.items;
                    $scope.sale = items.sale;
                    $scope.appl = items.appl;
                    $scope.doc_code = items.doc_code;*/
                    //$scope.doc_type = items.doc_type;
                    }
            });
            $scope.paginationConf.pagePromise = transferPromise;
        }
    };

    /*$scope.checkAll = false;
    $scope.cArr = [];
    //全选checkbox value 有变化 触发的函数
    $scope.allCheck = function($event) {
        //获取checkbox对象
        var checkbox = $event.target;
        //判断当前是选中了还是没选中
        $scope.checkAll = checkbox.checked ? true : false;
        if ($scope.checkAll) {
            //如果选中了
            //那么 把整个表中的数据 存到一个数组中
            for (var i = 0; i < $scope.dataList.length; i++) {
                var rowData = $scope.dataList[i];
                $scope.cArr[i] = rowData;
            }
        } else {
            //如果没选中
            //那么 把这个数组 清空
            $scope.cArr = [];
            $scope.cArrcode = [];
        }
    };

    //某一行前面的checkbox value 有变化 触发的函数
    $scope.updateSelection=function($event, rowData) {
        //获取checkbox对象
        var checkbox = $event.target;
        if (checkbox.checked) {
            //如果选中了
            //把这行数据添加到数组
            $scope.cArr.push(rowData);
        } else {
            //如果没选中
            //那么 检查 数组中有没有这个数据，如果有把这个数据移除
            var _cArr = [];
            for (var i = 0; i < $scope.cArr.length; i++) {
                var _rowData =  $scope.cArr[i];
                if(rowData != _rowData){
                    _cArr[i] = _rowData ;
                }
            }
            $scope.cArr = _cArr;
        }
    };*/
	$scope.cArr = [];
	$scope.cArrdata = [];
	$scope.cArrstatus = [];
	var updateSelected = function (action, id, i) {
		if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
			$scope.cArr.push(id);
			$scope.cArrdata.push($scope.dataList[i]);
		}
		if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
			var idx = $scope.cArr.indexOf(id);
			$scope.cArr.splice(idx, 1);
			$scope.cArrdata.splice(idx, 1);
		}
	};
	$scope.updateSelection = function ($event, id, i) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		updateSelected(action, id, i);
	};
    $scope.empty = function (){
        $scope.doc_code ='',
        $scope.sale = '',
        $scope.busi = '',
        $scope.appl = ''
    };
	// 清空
	$scope.emptyFn = function () {
		$scope.checkAll = false;
		$scope.cArr = [];
		$scope.cArrcode = [];
		$scope.cArrstatus = [];
        $scope.cArrdata = [];
	};
    $scope.emptyOne = function(){
        $scope.sale = '',
        $scope.busi = '',
        $scope.appl = ''
    };
	$scope.allCheck = function ($event) {
		var checkbox = $event.target;
		$scope.checkAll = checkbox.checked ? true : false;
		if ($scope.checkAll) {
			for (var i = 0; i < $scope.dataList.length; i++) {
				$scope.cArr[i] = $scope.dataList[i]._id;
			}
			$scope.cArrdata = $scope.dataList
		} else {
			$scope.cArr = [];
			$scope.cArrdata = [];
		}
	};


    //申请人转办
    $scope.applytransferBox = function(){
        if($scope.cArr.length == 0){
            swal('请勾选列表','','warning');return;
        }
	    for (var i = 0; i < $scope.cArr.length; i++) {
		    if(!$scope.cArrdata[i].appl) {
			    swal('申请人为空的单据不能进行申请人转办','','warning');
			    return;
		    }
		    if($scope.cArrdata[i].appl !== $scope.cArrdata[0].appl) {
			    swal('不同申请人的单据不能同时进行申请人转办','','warning');
			    return;
		    }
	    }
	    $scope.appl = $scope.cArrdata[0].appl;

        $( "#applytransferBox" ).dialog({
            autoOpen: false,
            width: 450,
            modal: true
        });
        $( "#applytransferBox" ).dialog( "open" );
    };

    //商务人员转办
    $scope.commercetransferBox = function(){
        if($scope.cArr.length == 0){
            swal('请勾选列表','','warning');return;
        }
	    for (var i = 0; i < $scope.cArr.length; i++) {
		    if(!$scope.cArrdata[i].busi) {
			    swal('商务人员为空的单据不能进行商务转办','','warning');
			    return;
		    }
		    if($scope.cArrdata[i].busi !== $scope.cArrdata[0].busi) {
			    swal('不同商务人员的单据不能同时进行商务转办','','warning');
			    return;
		    }
	    }
	    $scope.busi = $scope.cArrdata[0].busi;

        $( "#commercetransferBox" ).dialog({
            autoOpen: false,
            width: 450,
            modal: true
        });
        $( "#commercetransferBox" ).dialog( "open" );
    };

    //销售人员转办
    $scope.salestransferBox = function(){
        if($scope.cArr.length == 0){
            swal('请勾选列表','','warning');
	        return;
        }
	    for (var i = 0; i < $scope.cArr.length; i++) {
		    if(!$scope.cArrdata[i].sale) {
			    swal('销售人员为空的单据不能进行销售员转办','','warning');
			    return;
		    }
        	if($scope.cArrdata[i].sale !== $scope.cArrdata[0].sale) {
		        swal('不同销售人员的单据不能同时进行销售员转办','','warning');
		        return;
	        }
        }
	    $scope.sales = $scope.cArrdata[0].sale;

        $( "#salestransferBox" ).dialog({
            autoOpen: false,
            width: 450,
            modal: true
        });
        $( "#salestransferBox" ).dialog( "open" )
    };
	
	$scope.$on('user', function(d,data) {
		$scope.usersale = data;
	});
}]);


transferApp.controller('transferboxCtrl', ['$scope','transferServices',function($scope,service){
    $scope.userbox = function () {
        $("#userbox").dialog({
            autoOpen: false,
            width: 550,
            modal: true,
	        dialogClass: 'closeOne'
        });
        $("#userbox").dialog("open");
    };

	var peop = null;
	$scope.user = {name: ''};
	$scope.paginationConf = {
		currentPage: 1,
		itemsPerPage: 10,
		numberOfPage:0,
		pagesLength: 10,
		perPageOptions: [5,10, 20, 30, 40, 50],
		pagePromise:{},
		onChange: function(){
			var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, name:$scope.username};
			var customerPromise = service.transferstaff(param);//调用人员查询接口
			$scope.paginationConf.pagePromise = customerPromise;
		}
	};
	//选择人员
	$scope.userSelect = function(user){
		peop = user;
		// $scope.name = data.rst.data.items[0].name;
		$scope.$emit('user', user);
		$( "#userbox" ).dialog("destroy");
        $( "#userbox" ).closest(".ui-dialog").remove();
		// $(".ui-dialog").remove();
		
	};

    //保存
    $scope.save = function(type) {
        // $scope.cArr;
        var param  =  {
          /*  sale: $scope.usersale,
            busi: $scope.busi,
            appl: $scope.appl,*/
            data: $scope.cArrdata
        };
	    // if(!$scope.usersale.name){
		 //    swal("请选择人员", "", "warning");
		 //    return false;
	    // }
        if(!$scope.usersale || !$scope.usersale.name){
            swal("请选择人员", "", "warning");
            return false;
        }
        param[type] = $scope.usersale;
        var viewUser = service.transferupdate(param);
        viewUser.success(function(data){
            if(data.code == 200){
                // $scope.dataList = data.rst.data.items;
                $scope.search();
                $scope.emptyFn();
                swal("保存成功", "", "success");
	            $scope.closeapply(type);
            }else {
                swal(data.msg,'','error');
            }
            $scope.emptyOne();
            //$( "#salestransferBox" ).dialog("destroy");
            // $( "#commercetransferBox" ).dialog("destroy");
            // $( "#applytransferBox" ).dialog("destroy");
        });
    };
    
    // 取消
	$scope.closeapply = function (type) {
		var obj = {
			'sale':  "salestransferBox",
			'busi':  "commercetransferBox" ,
			'appl':  "applytransferBox"
		}[type];
		
		obj = $('#'+obj);

		obj.dialog("destroy");
		$(".ui-dialog").remove();
	}
}]);



transferApp.controller('transferHistoryCtrl', ['$scope', '$rootScope','$filter','transferServices',function($scope,$rootScope,$filter,transfer) {
    //转办记录查询
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            if(!$scope.doc_code && !$scope.sale && !$scope.busi && !$scope.appl){
                swal("请至少再输入一个查询条件", "", "warning");
                return true;
            }
            var param = {
                status:'after',
                page: $scope.paginationConf.currentPage,
                limit: $scope.paginationConf.itemsPerPage,
                doc_type: $scope.doc_type,
                doc_code: $scope.doc_code,
                sale: $scope.sale,
                busi: $scope.busi,
                appl: $scope.appl,
                type: $scope.type
            };
            var transferPromise = transfer.transferlist(param);
            transferPromise.success(function (data) {
                if (data.code == 200) {
                    $scope.dataList = data.rst.data.items;
                }
            });
            $scope.paginationConf.pagePromise = transferPromise;
        }
    };
    $scope.empty = function (){
        $scope.doc_code = '',
        $scope.sale = '',
        $scope.busi = '',
        $scope.appl = ''
    };
}]);

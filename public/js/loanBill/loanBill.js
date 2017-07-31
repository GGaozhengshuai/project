var loanBillApp = angular.module('loanBillApp', ['pageDirectives','formDirectives','ui.autocomplete', 'MyFilterApp']);
loanBillApp.service('loanBillServices', function($http) {
    var service = {
        listInside: function(param) {
            return $http.post('/productlend/list',param ,{cache:false});
        },
        getCountry: function () {
            //return $http.get('/js/json/country.json', {cache: true});
            return $http.get('/enum/getnewcity', {cache: true});
        },
        viewInside: function(param) {
            return $http.post('/productlend/view',param ,{cache:true});
        },
        addInside: function(param){
            return $http.post('/productlend/save',param ,{cache:false});
        },
        updateInside: function(param){
            return $http.post('/productlend/update',param ,{cache:false});
        },
        deleteInside: function(param){
            return $http.post('/productlend/delete',param ,{cache:false});
        },
        applyAdd: function(param){
            return $http.post('/productlend/createprocess',param ,{cache:false});
        },
        selectnotreturnrecord: function(param) {
            return $http.post('/productlend/selectnotreturnrecord',param ,{cache:false});
        },
        listCpx: function(param){//产品线
            return $http.post('/contract/cpxenum',param ,{cache:false});
        },//审批接口
        applyView: function(param) {
            return $http.post('/productlend/detail',param ,{cache:false});
        },
        agree: function(param){//同意
            return $http.post('/productlend/agree',param ,{cache:false});
        },
        disagree: function(param){//驳回
            return $http.post('/productlend/disagree',param ,{cache:false});
        },
        cancel: function(param){//取消
            return $http.post('/productlend/cancel',param ,{cache:false});
        },
        recall: function(param){//召回
            return $http.post('/productlend/recall',param ,{cache:false});
        },
        listUser: function(param){//用户接口
            return $http.post('/user/list',param);
        },
        listProduct: function(param){//产品线接口
            return $http.post('/contract/listmara',param ,{cache:false});
        },
        listEnum: function(){//库房
            return $http.post('/productlend/enum' ,{cache:false});
        },
        selectproduct: function(param){//物料
            return $http.post('/productlend/materiellist' ,param,{cache:false});
        },
        checksalesorder : function(param){//校验物料能否删除
            return $http.post('/productlend/checksalesorder ' ,param,{cache:false});
        },
        listCustomer: function(param) {//客户名称
            return $http.post('/customer/list2',param ,{cache:false});
        },//借出续借
        listRenew: function(param) {
            return $http.post('/productlendrenew/list',param ,{cache:false});
        },
        viewRenew: function(param) {
            return $http.post('/productlendrenew/view',param ,{cache:true});
        },
        addRenew: function(param){
            return $http.post('/productlendrenew/save',param ,{cache:false});
        },
        updateRenew: function(param){
            return $http.post('/productlendrenew/update',param ,{cache:false});
        },
        deleteRenew: function(param){
            return $http.post('/productlendrenew/delete',param ,{cache:false});
        },
        applyAddRenew: function(param){
            return $http.post('/productlendrenew/createprocess',param ,{cache:false});
        },
        applyViewRenew: function(param) {
            return $http.post('/productlendrenew/detail',param ,{cache:false});
        },
        cusUser: function(param){//客户联系人
            return $http.post('/contract/listzvsd',param ,{cache:false});
        },//审批接口
        applyRenewView: function(param) {
            return $http.post('/productlendrenew/detail',param ,{cache:false});
        },
        agreeRenew: function(param){//同意
            return $http.post('/productlendrenew/agree',param ,{cache:false});
        },
        disagreeRenew: function(param){//驳回
            return $http.post('/productlendrenew/disagree',param ,{cache:false});
        },
        cancelRenew: function(param){//取消
            return $http.post('/productlendrenew/cancel',param ,{cache:false});
        },
        recallRenew: function(param){//召回
            return $http.post('/productlendrenew/recall',param ,{cache:false});
        },//借出还回
        listReturn: function(param) {
            return $http.post('/productlendreturn/list',param ,{cache:false});
        },
        viewReturn: function(param) {
            return $http.post('/productlendreturn/view',param ,{cache:true});
        },
        addReturn: function(param){
            return $http.post('/productlendreturn/save',param ,{cache:false});
        },
        updateReturn: function(param){
            return $http.post('/productlendreturn/update',param ,{cache:false});
        },
        deleteReturn: function(param){
            return $http.post('/productlendreturn/delete',param ,{cache:false});
        },
        applyAddReturn: function(param){
            return $http.post('/productlendreturn/createprocess',param ,{cache:false});
        },
        applyViewReturn: function(param) {
            return $http.post('/productlendreturn/detail',param ,{cache:false});
        },//审批接口
        agreeReturn: function(param){//同意
            return $http.post('/productlendreturn/agree',param ,{cache:false});
        },
        disagreeReturn: function(param){//驳回
            return $http.post('/productlendreturn/disagree',param ,{cache:false});
        },
        cancelReturn: function(param){//取消
            return $http.post('/productlendreturn/cancel',param ,{cache:false});
        },
        recallReturn: function(param){//召回
            return $http.post('/productlendreturn/recall',param ,{cache:false});
        },
        selectnotreturn: function(param){//借出产品信息
            return $http.post('/productlend/selectnotreturn',param ,{cache:false});
        },
        getprocesslog: function (param) {
          return $http.post('/productlend/getprocesslog',param,{cache:false});
        },
	    findorgwithlevel: function (param) {//查看人员二级部门
		    return $http.post('/org/findorgwithlevel', param, {cache: false});
	    }
    };
    return service;
});

loanBillApp.controller('loanBillOrderCtrl', ['$scope','loanBillServices',function($scope,payment){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, code:$scope.code, productline: $scope.productline, username: $scope.username, clientname: $scope.clientname};
            var customerPromise = payment.listInside(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
loanBillApp.controller('userLoanBoxCtrl', ['$scope','loanBillServices',function($scope,service){
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
			var userType = args[0];
			if(userType == 'bussinessUser') {
				// param  = {page:1, limit:10, name:$scope.useSname, roles:'op_business',orgname:$scope.ORDER_DATA.department.name};
				$.extend(true, param, {salesid:$scope.ORDER_DATA.user.id})
			}
			
			var customerPromise = service.listUser(param);
			$scope.paginationConf.pagePromise = customerPromise;
		}
	}
   /* $scope.userSearch = function(userType){
        /!*if($scope.useSname==''){
         swal("必须输入查询条件", "", "warning");
         return false;
         }*!/
        var param  = '';
        if(userType == 'salsUser'){
            param  = {page:1, limit:10, name:$scope.useSname};
        }else if(userType == 'bussinessUser') {
            // param  = {page:1, limit:10, name:$scope.useSname, roles:'op_business',orgname:$scope.ORDER_DATA.department.name};
            param  = {page:1, limit:10, name:$scope.useSname,salesid:$scope.ORDER_DATA.user.id};
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
    $scope.userSearch($scope.userType);*/
    
}]);
loanBillApp.controller('cusLoanBoxCtrl', ['$scope','loanBillServices',function($scope,occupy){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, KTOKD:'ZC01', NAME:$scope.NAME, KUNNR: $scope.KUNNR};
            var customerPromise = occupy.listCustomer(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
    $scope.cusSelect = function(id,name){
        if($scope.ORDER_DATA.client.id) {
            swal({
                title: "确定要修改客户名称吗?",
                text: "修改后将会清空跟客户相关的数据!",//修改后将会清空交货地点联系人信息
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定修改",
                cancelButtonText:'关闭',
                closeOnConfirm: true
            }, function(){
                setTimeout(function () {
                    $scope.$apply(function () {
                        // 2016-11-2
                        // 测试要求，变更借出客户名称时清空交货地点联系人信息
                        if($scope.userLinkList.list !== undefined){
                            $scope.userLinkList.list = [];
                        }
                        $scope.ORDER_DATA.client.name = name;
                        $scope.ORDER_DATA.client.id = id;
                        if( $scope.ORDER_DATA.client.id=='1000005246') {
                          $scope.ORDER_DATA.client.realname = '';
                        } else {
                          $scope.ORDER_DATA.client.realname = name;
                        }
                        $( "#cusBox" ).dialog("destroy");
                        $(".ui-dialog").remove();
                    });
                    return false;
                },0)
            });
        } else {
            $scope.ORDER_DATA.client.name = name;
            $scope.ORDER_DATA.client.id = id;
            // 2017-1-9 Bug5055
          // 1、首先 填写  “借出客户名称”    ，判断做填客户的编码是否等于   1000005246
          // 1）若不等于，则  实际借出客户   字段只读，默认取值等于  借出客户名称
          // 2）若等于，则  实际借出客户    字段  必填，可编辑
            if( $scope.ORDER_DATA.client.id=='1000005246') {
              $scope.ORDER_DATA.client.realname = '';
            } else {
              $scope.ORDER_DATA.client.realname = name;
            }
            $( "#cusBox" ).dialog("destroy");
            $(".ui-dialog").remove();
        }


    }
}]);
loanBillApp.controller('selectProductBoxCtrl', ['$scope','$rootScope','loanBillServices',function($scope,$rootScope,service){
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user.id = person.user._id;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department.id = person.user.orgid;
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 5,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var customerPromise = service.selectproduct({page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage,MATNR:$scope.MATNR,BISMT:$scope.BISMT,userid:person.user._id});
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };

}]);
loanBillApp.controller('loanBillOrderAddCtrl', ['$scope','$rootScope','loanBillServices',function($scope,$rootScope,payment){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    $scope.ORDER_DATA.user = {};//用户
    $scope.ORDER_DATA.department = {};//部门
    $scope.ORDER_DATA.lendbase = {};//基本信息
    $scope.ORDER_DATA.client = {};//客户
    $scope.ORDER_DATA.room = {};//库房
    $scope.ORDER_DATA.products = {};//物料
    var userLinkList =  $scope.userLinkList = {list:[]};
    var tjwlList = $scope.tjwlList = [];
    var excleWlData = $scope.excleWlData = {right:[], error:[],sum:0};
    var userLink = $scope.userLink = [];
    $scope.sumSD = 0;
    // 计算借出金额
    $scope.sumFn = function(price) {
        var obj = $('#tjwlList');
        price = price || 0;
        var sum=0;
        obj.find('.list').each(function(){
            sum += +$(this).attr('lendAmount');
        });
        $scope.sumSD = sum + price;
    };

    $scope.htwlBox = function(){
        $( "#wlBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#wlBox" ).dialog( "open" );
    };
    $scope.excleConfW1 = {
        formData:{},
        buttonText:'导入物料信息',
        uploader:'/productlend/importitems'
    };
    // 导入物料选择方法
    $scope.proSelect = function(code, productcode, productnumber, des, outnum,unitprice){
        var obj = {'code':code,'productcode':productcode,'productnumber':productnumber,'des':des,'outnum':0,'unitprice':unitprice,fhnum:0};

        $scope.tjwlList.push(obj);
        $( "#wlBox" ).dialog("destroy");
        $(".ui-dialog").remove();
        $scope.sumFn(unitprice);
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
            $scope.ORDER_DATA.user.name = user;
            $scope.ORDER_DATA.user.id = userId;
            $scope.ORDER_DATA.department.name = orgName;
            $scope.ORDER_DATA.department.id = orgId;

            $scope.getSW();
	        $scope.findorgwithlevel(orgId);
        }/*else if(userType == 'bussinessUser') {
            $scope.ORDER_DATA.tradername = user;
            $scope.ORDER_DATA.traderlogin = login;
        }*/
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
    //
	
	$scope.findorgwithlevel = function(orgid){
		$scope.ORDER_DATA.lendbase.transferway = '';
		$scope.transferwayReadOnly = false;
		var findorgwithlevel = payment.findorgwithlevel({'orgid':orgid,'level':1});
		findorgwithlevel.success(function(data){
			if(data.code == 200){
				if(data.rst.data.orgname){
					$scope.ORDER_DATA.department.name2 = data.rst.data.orgname;
					$scope.ORDER_DATA.department.id2 = data.rst.data._id;
					//借出单事业部=华为事业部/光伏事业部/软件及应用事业部时，运输方式全部默认国内陆运只读
					if(['5742a607779ec2cb740517f8','5742a607779ec2cb7405180c','5742a607779ec2cb74051813'].indexOf($scope.ORDER_DATA.department.id2)!= -1) {
						$scope.ORDER_DATA.lendbase.transferway = '01';
						$scope.transferwayReadOnly = true;
					}
				}else {
					$scope.ORDER_DATA.department.name2 = '';
					$scope.ORDER_DATA.department.id2 = '';
				}
			}else{
				swal(data.msg, "", "warning");
				return false;
			}
		});
	}
	// 获取商务人员列表
    $scope.traderSelect = [];
    $scope.getSW = function (login) {
        var param  = {page:1, limit:999, saleid:$scope.ORDER_DATA.user.id};

        var listUser = payment.listUser(param);
        listUser.success(function(data){
	        if(data.code != 200) {
        		swal(data.msg, '', 'warning');
		        return false;
	        }
            $scope.traderSelect = data.rst.data.items;
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


    /*$scope.userBox = function(){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#userBox" ).dialog( "open" );
    };*/

    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user.id = person.user._id;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department.id = person.user.orgid;
    $scope.excleFormData ={userid:person.user._id};
    //获取商务人员列表
    $scope.getSW();
	
	$scope.findorgwithlevel(person.user.orgid);
    //产品线
   /* var listCpx = payment.listCpx({});
    var cpxData = null;
    listCpx.success(function(data){
        if(data.code == 200){
            var cpxData = $scope.cpxData = [];
            $.map(data.rst.data.enum.CPX, function(item) {
                cpxData.push({label: item.name, value: item.name, code: item.code});
            });
        }else {
            alert(data.msg);
        }
    });*/
	// 根据用户姓名搜索用户
	$scope.productlineFn = function (name) {
		$scope.ORDER_DATA.lendbase.productlineid  = "";
		var listCpx = payment.listCpx({cpxname:name});
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
		$scope.ORDER_DATA.lendbase.productline  = obj.name;
		$scope.ORDER_DATA.lendbase.productlineid  = obj.code;
		$scope.productlineList = [];
	};
    /*$scope.productOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            mustMatch:true,
            outHeight:300,
            source: function (request, response) {
                var listCpx = payment.listCpx({cpxname:$scope.ORDER_DATA.lendbase.productline});
                listCpx.success(function(data) {
                    if (data.code == 200) {
                        var dataItems = data.rst.data.enum.CPX;
                        if (!dataItems.length) {
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function (item) {
                            if (item.name == '未找到') {
                                return {label: item.name, value: ''};
                            } else {
                                return {label: item.name, value: item.name, code: item.code};
                            }

                        }));
                    } else {
                        //swal(data.msg, "", "warning");
                        alert('error')
                    }
                })
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.lendbase.productline = ui.item.value;
                $scope.ORDER_DATA.lendbase.productlineid = ui.item.code;
            }
        }

    };*/
    $scope.cusBox = function(){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
    }
    $scope.setDate = function(){
        var date = $scope.ORDER_DATA.lendbase.start;
        var days = $scope.ORDER_DATA.lendbase.days ;
        var nd = new Date(date);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;
        $scope.ORDER_DATA.lendbase.end=result;
        if(days==null){
            $scope.ORDER_DATA.lendbase.end="";
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
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.list.push(obj);
       /* $scope.countryDataArr.push($scope.countryData);
        $scope.countrySelOn.push({country:'CN', province:'', city:''});*/
    }
    $scope.userDel = function(idx,type){
        if(type=='add'){
            $scope.userLinkList.list.splice(idx,1);
        }else {
            $scope.excleData.splice(idx,1);
        }
        /*$scope.countryDataArr.splice(idx,1);
        $scope.countrySelOn.splice(idx,1);*/
    }
    $scope.cusLinkBox = function(){
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 800,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        //var cParam = {'KUNNR': $scope.ORDER_DATA.client.id,'NAME1': $scope.ORDER_DATA.client.name}
        var cParam = {'KUNNR': $scope.ORDER_DATA.client.id};
        var listCus = payment.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.list.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    //var productsList = $scope.productsList =[{code:'', productcode:'', productnumber:'', des:'', outnum:'', batchid:''}];


    var excleData = $scope.excleData = [];
    $scope.comeDel = function(idx, type){
        var i = $("#proList .list").eq(idx).attr('lendAmount');
        switch (type) {
            case 'right':
                $scope.excleWlData.sum -= i;
                $scope.excleWlData.right.splice(idx,1);
                break;
            case 'error':
                $scope.excleWlData.error.splice(idx,1);
                break;
            case 'tjDel':
                $scope.sumSD -= i;
                $scope.tjwlList.splice(idx,1);
                break;
        }
    }

   $scope.addData = function(data,statue) {
       var requiredObj = $scope.invoiceForm.$error.required;
       angular.forEach(requiredObj, function (keyData) {
           keyData.$dirty = true;
       });
       if (!$scope.invoiceForm.$valid) {
           swal("您有信息填写不完整，请检查后再保存", "", "warning");
           return false;
       }
       if(!data.lendbase.productlineid) {
	       swal("请选择可用的产品线", "", "warning");
	       return false;
       }
       var doc = {}, param = {};
       doc = data;
       var userLink = $scope.userLink = $scope.userLinkList.list.concat($scope.excleData);
       // var userLinkSel = $scope.countrySelOn.concat($scope.countrySelOndr);
       //for(var i= 0,l=userLink.length; i<l ;i++ ) {
       //    userLink[i].province = userLinkSel[i].province;
       //    userLink[i].city = userLinkSel[i].city;
       //}
       doc.receivers = userLink;
       if (doc.receivers.length <= 0) {
           //alert("请添加联系人");
           swal("请添加联系人", "", "warning");
           return false;
       }
       var products = $scope.excleWlData.right.concat($scope.tjwlList);
       doc.products = products;
       if (doc.products.length <= 0 && $scope.excleWlData.error.length <= 0) {
           //alert("请上传借出产品信息");
           swal("请上传借出产品信息", "", "warning");
           return false;
       }
       if ($scope.excleWlData.error.length >= 1) {
           //alert("借出产品信息中红色的为错误信息，请删除后再提交");
           swal("借出产品信息中红色的为错误信息，请删除后再提交", "", "warning");
           return false;
       } // 变更的借出单需要对借货数量增加判断
	  
	   for(var i=0,l=products.length; i<l; i++) {
		   if(products[i].outnum == 0) {
			   swal("借出产品借货数量不能为0", "", "warning");
			   return false;
		   }
	   }
	   
       doc.docName = $scope.docName;
       doc.lendbase.sum = $scope.excleWlData.sum + $scope.sumSD;
       param.processId = $scope.processId;
       param.nodeId = $scope.nodeId;
       param.doc = doc;
       if (statue == "save") {
           var addInside = payment.addInside(param);
           addInside.success(function (data) {
               if (data.code == 200) {
                   $scope.processId = data.rst.processId;
                   $scope.nodeId = data.rst.nodeId;
                   swal("保存成功", "", "success");
               } else {
                   swal(data.msg, "", "warning");
                   //alert(data.msg);
               }
           });

       } else if (statue == 'apply') {
           // 提交
           $scope.applyFn = function (selIndex) {
               if(selIndex !== -1) {
                   $("#approversDialog").dialog("destroy");
                   $(".ui-dialog").remove();
                   var selObj = $scope.receivers[selIndex];
                   param.candidates[0].receivers = [selObj];
               }
               var applyAdd = payment.applyAdd(param);
               applyAdd.success(function (data) {
                   if (data.code == 200) {
                       //swal("提交成功", "", "success");
                       swal({
                           title: "提交成功",
                           type: "success",
                           showCancelButton: false,
                           confirmButtonColor: "#DD6B55",
                           confirmButtonText: "返回列表",
                           closeOnConfirm: true
                       }, function () {
                           window.location.href = '/index.html#/loanBillOrder';
                       });
                   } else {
                       swal(data.msg, "", "warning");
                       //alert(data.msg);
                   }
               });
           };
           var addInside = payment.addInside(param);
           addInside.success(function (data) {
               if (data.code == 200) {
                   param.processId = $scope.processId = data.rst.processId;
                   param.nodeId = $scope.nodeId = data.rst.nodeId;
                   if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' || data.rst.candidates[0].coop!=='and')) {
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
loanBillApp.controller('loanBillOrderEditCtrl', ['$scope','$stateParams', '$rootScope','loanBillServices',function($scope, $stateParams,$rootScope, payment){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var userLinkList =  $scope.userLinkList = {list:[]};
    var excleWlData = $scope.excleWlData = {right:[], error:[],sum:0};
    var userLink = $scope.userLink = [];
    var tjwlList = $scope.tjwlList = [];
    var productsList = $scope.productsList = [];
    if($stateParams.sapid){//判断数据来源（sap or 草稿）
        $scope.draftStatue = true;
        $scope.saveBtn = true;
    }else{
        $scope.saveBtn = false;
    }

    $scope.ORDER_DATA.user = {};//用户
    $scope.ORDER_DATA.department = {};//部门
    $scope.ORDER_DATA.lendbase = {};//基本信息
    $scope.ORDER_DATA.client = {};//客户
    $scope.ORDER_DATA.room = {};//库房
    $scope.ORDER_DATA.products = {};//物料

    $scope.sumSD = 0;
    // 计算借出金额
    $scope.sumFn = function(price) {
        var obj = $('#tjwlList');
        price = price || 0;
        var sum=0;
        obj.find('.list').each(function(){
            sum += +$(this).attr('lendAmount');
        });
        $scope.sumSD = sum + price;
    };
    $scope.excleConfW1 = {
        formData:{"bg":$scope.changed},
        buttonText:'导入物料信息',
        uploader:'/productlend/importitems'
    };
    // 导入物料选择方法
    $scope.proSelect = function(code, productcode, productnumber, des, outnum,unitprice){
        var obj = {'code':code,'productcode':productcode,'productnumber':productnumber,'des':des,'outnum':0,'unitprice':unitprice,fhnum:0}

        /*var idx = $scope.findIndex(code);
        if(idx != undefined) {
            $scope.tjwlList[idx] =  obj;
        } else {*/
            $scope.tjwlList.push(obj);
        // }
	    
        $("#wlBox").dialog("destroy");
        $(".ui-dialog").remove();
        $scope.sumFn(unitprice);
    };
    // 根据物料编码查找物料信息表中有无该条数据
    $scope.findIndex = function (code) {
        for(var i=0,l=$scope.tjwlList.length; i<l; i++) {
            console.log($scope.tjwlList[i].code, code)
            if($scope.tjwlList[i].code == code) {
                return i;
            }
        }
    };
    $scope.htwlBox = function(){
        $( "#wlBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#wlBox" ).dialog( "open" );
    }
    /*$scope.userBox = function(){
        $( "#userBox" ).dialog({
            autoOpen: false,
            width: 550,
            modal: true
        });
        $( "#userBox" ).dialog( "open" );
    }*/
    // var person = $cookieStore.get("persion");
    var person = $rootScope.loginPerson;
    $scope.ORDER_DATA.user.name = person.user.name;
    $scope.ORDER_DATA.user.id = person.user._id;
    $scope.ORDER_DATA.department.name = person.user.orgname;
    $scope.ORDER_DATA.department.id = person.user.orgid;
    $scope.excleFormData ={userid:person.user._id};
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
            $scope.ORDER_DATA.user.name = user;
            $scope.ORDER_DATA.user.id = userId;
            $scope.ORDER_DATA.department.name = orgName;
            $scope.ORDER_DATA.department.id = orgId;

            $scope.getSW();
	        $scope.findorgwithlevel(orgId);
        }/*else if(userType == 'bussinessUser') {
         $scope.ORDER_DATA.tradername = user;
         $scope.ORDER_DATA.traderlogin = login;
         }*/
        $scope.openDialog = false;
        $( "#userBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };
	$scope.findorgwithlevel = function(orgid){
		$scope.ORDER_DATA.lendbase.transferway = '';
		$scope.transferwayReadOnly = false;
		var findorgwithlevel = payment.findorgwithlevel({'orgid':orgid,'level':1});
		findorgwithlevel.success(function(data){
			if(data.code == 200){
				if(data.rst.data.orgname){
					$scope.ORDER_DATA.department.name2 = data.rst.data.orgname;
					$scope.ORDER_DATA.department.id2 = data.rst.data._id;
					//借出单事业部=华为事业部/光伏事业部/软件及应用事业部时，运输方式全部默认国内陆运只读
					if(['5742a607779ec2cb740517f8','5742a607779ec2cb7405180c','5742a607779ec2cb74051813'].indexOf($scope.ORDER_DATA.department.id2)!= -1) {
						$scope.ORDER_DATA.lendbase.transferway = '01';
						$scope.transferwayReadOnly = true;
					}
				}else {
					$scope.ORDER_DATA.department.name2 = '';
					$scope.ORDER_DATA.department.id2 = '';
				}
			}else{
				swal(data.msg, "", "warning");
				return false;
			}
		});
	}
    // 获取商务人员列表
    $scope.traderSelect = [];
    $scope.getSW = function (login) {
        var param  = {page:1, limit:999, saleid:$scope.ORDER_DATA.user.id};

        var listUser = payment.listUser(param);
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
    //产品线
    /*var listCpx = payment.listCpx({});
    var cpxData = null;
    listCpx.success(function(data){
        if(data.code == 200){
            var cpxData = $scope.cpxData = [];
            $.map(data.rst.data.enum.CPX, function(item) {
                cpxData.push({label: item.name, value: item.name, code: item.code});
            });
        }else {
            alert(data.msg);
        }
    });*/
    /*$scope.productOption = {
        options: {
            html: true,
            focusOpen: false,
            onlySelect: true,
            mustMatch:true,
            outHeight:300,
            source: function (request, response) {
                var listCpx = payment.listCpx({cpxname:$scope.ORDER_DATA.lendbase.productline});
                listCpx.success(function(data) {
                    if (data.code == 200) {
                        var dataItems = data.rst.data.enum.CPX;
                        if (!dataItems.length) {
                            dataItems.push({
                                'name': '未找到'
                            });
                        }
                        response($.map(dataItems, function (item) {
                            if (item.name == '未找到') {
                                return {label: item.name, value: ''};
                            } else {
                                return {label: item.name, value: item.name, code: item.code};
                            }

                        }));
                    } else {
                        swal(data.msg, "", "warning");
                    }
                })
            },
            select: function( event, ui ) {
                $scope.ORDER_DATA.lendbase.productline = ui.item.value;
                $scope.ORDER_DATA.lendbase.productlineid = ui.item.code;
            }
        }

    };*/
	// 搜索产品线
	$scope.productlineFn = function (name) {
		$scope.ORDER_DATA.lendbase.productlineid  = "";
		var listCpx = payment.listCpx({cpxname:name});
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
		$scope.ORDER_DATA.lendbase.productline  = obj.name;
		$scope.ORDER_DATA.lendbase.productlineid  = obj.code;
		$scope.productlineList = [];
	};
    $scope.cusBox = function(){
        $( "#cusBox" ).dialog({
            autoOpen: false,
            width: 750,
            modal: true
        });
        $( "#cusBox" ).dialog( "open" );
    }
    $scope.setDate = function(){
        var date = $scope.ORDER_DATA.lendbase.start;
        var days = $scope.ORDER_DATA.lendbase.days ;
        var nd = new Date(date);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;
        $scope.ORDER_DATA.lendbase.end=result;
        if(days==null){
            $scope.ORDER_DATA.lendbase.end="";
        }
    }
    // 交货地点和联系人导入
    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.list.push(obj);
    }
    $scope.userDel = function(idx,type){
        if(type=='add'){
            $scope.userLinkList.list.splice(idx,1);
        }else {
            $scope.excleData.splice(idx,1);
        }
    }
    $scope.cusLinkBox = function(){
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 650,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        //var cParam = {'KUNNR': $scope.ORDER_DATA.client.name,'NAME1': $scope.ORDER_DATA.client.id};
        var cParam = {'KUNNR': $scope.ORDER_DATA.client.id};
        var listCus = payment.cusUser(cParam);
        listCus.success(function(data){
            if(data.code == 200){
                $scope.cusLinkList = data.rst.data.items;
            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        });
    }
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var obj= {name:name, phone:phone, tel:tel, province:province, city:city, address:address, zipcode:zipcode};
        $scope.userLinkList.list.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    }
    //var productsList = $scope.productsList =[{code:'', productcode:'', productnumber:'', des:'', outnum:'', batchid:''}];
    //var excleWlData = $scope.excleWlData = {right:[], error:[],sum:0};
    //var userLink = $scope.userLink = [];

    var excleData = $scope.excleData = [];
    $scope.comeDel = function(idx, type, code){
        var i = $("#proList .list").eq(idx).attr('lendAmount');
        switch (type) {
            case 'right':
                $scope.ORDER_DATA.lendbase.sum -= i;
                $scope.excleWlData.right.splice(idx,1);
                break;
            case 'error':
                $scope.excleWlData.error.splice(idx,1);
                break;
            case 'tjDel':
                $scope.sumSD -= i;
                $scope.tjwlList.splice(idx,1);
                break;
            case 'products':
                // 判断能不能删除
                var checksalesorder = payment.checksalesorder({'ZJCDH':$scope.ORDER_DATA.ZJCDH, MATNR:code});
                checksalesorder.success(function (data) {
                    if(data.code == 200) {
                        var msg = data.rst.msg || '可还回数量为0时才可删除！'
                        if(!data.rst.candelete) {
                            swal(msg, '', 'warning');
                        } else {
                            $scope.productsList.splice(idx,1);
                        }
                    } else {
                        swal(data.rst.msg, '', 'warning');
                    }
                })
                break;
        }
    };
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
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    var viewCont = payment.viewInside({_id:$stateParams._id,sapid:$stateParams.sapid, processId:$stateParams.processId});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.docName = data.rst.data.model.docName;
        $scope.userLinkList.list = data.rst.data.model.receivers;
	
	    // 判断是不是借出单变更，借出单变更列表字段有所调整
	    // 根据是否有物料行项目号是否存在判断，存在是变更的
	    if($scope.draftStatue) {
		    $scope.changed = $scope.draftStatue;
	    } else {
	    	var products = $scope.ORDER_DATA.products || [], posnr = false;
		    for(var i=0,len=products.length; i<len; i++) {
			    posnr = posnr || $scope.ORDER_DATA.products[i].POSNR && $scope.ORDER_DATA.products[i].POSNR.length>4;
		    }
		    $scope.changed = posnr;
	    }
	    
	    // $scope.changed = $scope.draftStatue || $scope.ORDER_DATA.products && $scope.ORDER_DATA.products.length && $scope.ORDER_DATA.products[0].POSNR && $scope.ORDER_DATA.products[0].POSNR.length>4;
	    $scope.excleFormData = {"bg":$scope.changed};
	    // 变更时候导入按照新增处理，原有数据不能存放在excleWlData.right中，需要单独存一下
	    // 增加是否显示字段
	    for(var i=0,l=data.rst.data.model.products.length; i<l; i++) {
	    	var d = data.rst.data.model.products[i];
	    	if($scope.draftStatue) {
			    d.hideFlag = false;
		    } else if($scope.changed) {
			    d.hideFlag = !(d.outnum>0 || d.newoutnum>0);
		    } else {
			    d.hideFlag = !(d.outnum>0);
		    }
	    }
	    console.log(data.rst.data.model.products)
        if($scope.draftStatue || $scope.changed) {
            $scope.productsList = data.rst.data.model.products;
            $scope.excleWlData.sum = data.rst.data.model.lendbase.sum;
        } else {
            $scope.excleWlData.right = data.rst.data.model.products;
            $scope.excleWlData.sum = data.rst.data.model.lendbase.sum;
        }
        // 初始化商务人员
        $scope.getSW($scope.ORDER_DATA.traderlogin);
    });

    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
	    if(!data.lendbase.productlineid) {
		    swal("请选择可用的产品线", "", "warning");
		    return false;
	    }
        var doc={},param= {};
        doc = data;
        var userLink = $scope.userLink = $scope.userLinkList.list.concat($scope.excleData);
        //var userLinkSel = $scope.countrySelOn.concat($scope.countrySelOndr);
        //for(var i= 0,l=userLink.length; i<l ;i++ ) {
        //    userLink[i].province = userLinkSel[i].province;
        //    userLink[i].city = userLinkSel[i].city;
        //}
        doc.receivers = userLink;
        if(doc.receivers.length<=0){
            //alert("请添加联系人");
            swal("请添加联系人", "", "warning");
            return false;
        }
        var products = $scope.excleWlData.right.concat($scope.tjwlList,$scope.productsList);
        doc.products = products;
        if(doc.products.length<=0 && $scope.excleWlData.error.length<=0){
            //alert("请上传借出产品信息");
            swal("请上传借出产品信息", "", "warning");
            return false;
        }
        if($scope.excleWlData.error.length>=1){
            //alert("借出产品信息中红色的为错误信息，请删除后再提交");
            swal("借出产品信息中红色的为错误信息，请删除后再提交", "", "warning");
            return false;
        }
	    
		for(var i=0,l=products.length; i<l; i++) {
			// 变更的借出单需要对借货数量增加判断
			if($scope.changed && (products[i].fhnum - products[i].newoutnum > 0) ) {
				swal("借出产品变更后数量不能小于不可变更数量", "", "warning");
				return false;
			}
			// 借出单编辑页面借货数量不能为0
			if(!$scope.changed && products[i].outnum == 0) {
				swal("借出产品借货数量不能为0", "", "warning");
				return false;
			}
			
		}
	    
        var obj = $('#proList');
        var sum=0;
        obj.find('.list').each(function(i){
            sum += $(this).attr('lendAmount')*1;
        });
        doc.lendbase.sum = sum;
        doc.docName = $scope.docName;
        //doc.lendbase.sum = $scope.excleWlData.sum;
        // doc.lendbase.sum = $scope.excleWlData.sum + $scope.sumSD;
        param.processId = $stateParams.processId || $scope.processId;
        param.nodeId = $stateParams.nodeId || $scope.nodeId;
        param.doc = doc;
        if (statue == "save") {
            var addInside = payment.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
	                $scope.processId = data.rst.processId;
	                $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                } else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });

        } else if (statue == 'apply') {
            // 提交
            $scope.applyFn = function (selIndex) {
                if(selIndex !== -1) {
                    $("#approversDialog").dialog("destroy");
                    $(".ui-dialog").remove();
                    var selObj = $scope.receivers[selIndex];
                    param.candidates[0].receivers = [selObj];
                }
                var applyAdd = payment.applyAdd(param);
                applyAdd.success(function (data) {
                    if (data.code == 200) {
	                    $scope.processId = data.rst.processId;
	                    $scope.nodeId = data.rst.nodeId;
                        //swal("提交成功", "", "success");
                        swal({
                            title: "提交成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "返回列表",
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = '/index.html#/loanBillOrder';
                        });
                    } else {
                        swal(data.msg, "", "warning");
                        //alert(data.msg);
                    }
                });
            };
            console.log('param', param)
            var addInside = payment.addInside(param);
            addInside.success(function (data) {
                if (data.code == 200) {
                    param.processId = $scope.processId = data.rst.processId;
                    param.nodeId = $scope.nodeId = data.rst.nodeId;
                    if(data.rst.candidates.length && data.rst.candidates[0].receivers.length>1 && (data.rst.candidates[0].coop!=='or' || data.rst.candidates[0].coop!=='and')) {
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
                } else {
                    swal(data.msg, '', 'warning');
                }
            })
        }
    };
}]);
loanBillApp.controller('loanBillViewCtrl', ['$scope', '$stateParams', 'loanBillServices',function($scope, $stateParams, payment){
    var ORDER_DATA = {};
    var transferwayTxt = {
        "01" : '国内陆运',
        "02" : '国内海运',
        "03" : '国内空运',
        "04" : '国际陆运',
        "05" : '国际海运',
        "06" : '国际空运',
        "07" : '陆运快件',
        "08" : '火车运输',
        "09" : '快递',
        "10" : '专车',
        "11" : '自提'
    };
    var viewCont = payment.viewInside({_id:$stateParams.id});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.transferway = transferwayTxt[ $scope.ORDER_DATA.lendbase.transferway] || $scope.ORDER_DATA.lendbase.transferway;
        if(data.rst.canchange){
            $scope.ifChangeBill = true;
        }
        // 接口返回成功后，再显示‘变更’按钮
        $scope.showChangeBtn = true;
        $scope.msg = data.rst.msg;
    });
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    // 变更
    $scope.changeBillFn = function($event) {
        if( !$scope.ifChangeBill ) {
            swal($scope.msg, '', 'warning');
            return false;
        }
        var obj = $event.target;
        obj.href = "index.html#/loanBillOrderEdit?_id=" + $scope.ORDER_DATA._id + "&sapid=" + $scope.ORDER_DATA.ZJCDH;

    }
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = payment.getprocesslog({type: 'JCD', id: vm.ORDER_DATA.code,gettype:'group'});
        processlog.success(function (data) {
	        var processlogArr = [];
	        if (data.rst.length != 0) {
		        for(var i=data.rst.length; i>0; i--) {
			        var list = data.rst[i-1];
			        if(list.property.type == 'JCD') {
				        processlogArr.push(list);
			        }
		        }
		        vm.processlog = processlogArr;
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
loanBillApp.controller('applyLoanBillCtrl', ['$scope','$stateParams','loanBillServices',function($scope,$stateParams,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = apply.applyView(param);
    var transferwayTxt = {
        "01" : '国内陆运',
        "02" : '国内海运',
        "03" : '国内空运',
        "04" : '国际陆运',
        "05" : '国际海运',
        "06" : '国际空运',
        "07" : '陆运快件',
        "08" : '火车运输',
        "09" : '快递',
        "10" : '专车',
        "11" : '自提'
    };
    var getCountry = apply.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    $scope.getField = function(obj, f1, v1) {
        return getField(obj, f1, v1);
    };
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.loading = false;
            $scope.ORDER_DATA = data.rst.doc.model;
            //$scope.transferway = data.rst.doc.model.lendbase.transferway;
            $scope.transferway = transferwayTxt[ $scope.ORDER_DATA.lendbase.transferway] || $scope.ORDER_DATA.lendbase.transferway;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
            $scope.processlog = data.rst.processlog;
			// 判断是不是借出单变更，借出单变更列表字段有所调整
	        // 根据是否有物料行项目号是否存在判断，存在是变更的
	        if($scope.draftStatue) {
		        $scope.changed = $scope.draftStatue;
	        } else {
		        var products = $scope.ORDER_DATA.products || [], posnr = false;
		        for(var i=0,len=products.length; i<len; i++) {
			        posnr = posnr || $scope.ORDER_DATA.products[i].POSNR && $scope.ORDER_DATA.products[i].POSNR.length>4;
		        }
		        $scope.changed = posnr;
	        }
	        // $scope.changed = $scope.ORDER_DATA.products && $scope.ORDER_DATA.products.length && $scope.ORDER_DATA.products[0].POSNR && $scope.ORDER_DATA.products[0].POSNR.length>4;
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
            console.log($stateParams.myflag)
            if($stateParams.myflag == 'mybegin'){
                $scope.editBtn = true;
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
            }

            $scope.initLendingRecord = function() {
                var lendCont = apply.selectnotreturnrecord({username: $scope.ORDER_DATA.user.name});
                lendCont.success(function(data) {
                    if(data.code == 200) {
                        $scope.ORDER_LEND_DATA = data.rst.data.items;
                    }
                });
            };
            try{
            // 往客户信用controller传递参数
            var param = {'name':$scope.ORDER_DATA.client.name, 'id':$scope.ORDER_DATA.client.id};
            $scope.$broadcast('transfer.type', param);
            } catch (e) {}
        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    }).error(function(error){
        swal(error, "", "warning");
        //alert(error);
    });
    //addInside
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

        var addInside = apply.addInside(param);
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
        var applyAgree = apply.agree(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagree(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.cancel(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){   window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = apply.recall(param);
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
            //alert(error);
        });
    }
}]);


loanBillApp.controller('renewBillOrderCtrl', ['$scope','loanBillServices',function($scope,payment){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, code:$scope.code, clientname:$scope.clientName};
            var customerPromise = payment.listRenew(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
loanBillApp.controller('renewBillViewCtrl', ['$scope', '$stateParams', 'loanBillServices',function($scope, $stateParams, payment){
    var ORDER_DATA = {};
    var viewCont = payment.viewRenew({_id:$stateParams.id,code:$stateParams.code,rncode:$stateParams.rncode});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model.snapshot;
    });

  // 审批记录
  var vm = $scope;
  vm.activeTab = 1
  vm.processlog = null

  vm.htTab = function (type) {
    // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
    if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
      var processlog = payment.getprocesslog({type: 'JCDRN', id: vm.ORDER_DATA.pdrenew.rncode});
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
loanBillApp.controller('renewBillOrderAddCtrl', ['$scope','$stateParams','loanBillServices',function($scope,$stateParams,service){
    var ORDER_DATA =  $scope.ORDER_DATA ={};

    var updateRenew = service.updateRenew({"code":$stateParams.code});
    updateRenew.success(function(data){
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.ORDER_DATA.pdrenew = {};
    });
    $scope.renDate = function(){
        var date = $scope.ORDER_DATA.lendbase.start;
        var days = $scope.ORDER_DATA.lendbase.days;
        var days2 = $scope.ORDER_DATA.lendbase.renewdays;
        var days3 = $scope.ORDER_DATA.pdrenew.rndays;
        var nd = new Date(date);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000 + days2 * 24 * 60 * 60 * 1000 + days3 * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;
        $scope.ORDER_DATA.lendbase.end=result;
        if(days==null){
            $scope.ORDER_DATA.lendbase.end="";
        }
    }

    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var doc={},param= {};
        param.doc = data;
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;

        if(statue == "save"){
            var addRenew = service.addRenew(param);
            addRenew.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAddRenew = service.applyAddRenew(param);
            applyAddRenew.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.processId;
                    //swal("提交成功", "", "success");
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/loanBillOrder'; });
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }
    }

}]);
loanBillApp.controller('renewBillOrderEditCtrl', ['$scope','$stateParams','loanBillServices',function($scope,$stateParams,service){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    var userLinkList =  $scope.userLinkList = [];
    if($stateParams.sapid){//判断数据来源（sap or 草稿）
        $scope.draftStatue = true;
        $scope.saveBtn = true;
    }else{
        $scope.saveBtn = false;
    }

    var viewRenew = service.viewRenew({sapid:$stateParams.sapid, processId:$stateParams.processId});
    viewRenew.success(function(data){
        $scope.ORDER_DATA = data.rst.data.model;
    });
    $scope.renDate = function(){
        var date = $scope.ORDER_DATA.lendbase.start;
        var days = $scope.ORDER_DATA.lendbase.days;
        var days2 = $scope.ORDER_DATA.lendbase.renewdays;
        var days3 = $scope.ORDER_DATA.pdrenew.rndays;
        var nd = new Date(date);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000 + days2 * 24 * 60 * 60 * 1000 + days3 * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var result = y+"-"+m+"-"+d;
        $scope.ORDER_DATA.lendbase.end=result;
        if(days==null){
            $scope.ORDER_DATA.lendbase.end="";
        }
    }

    $scope.addData = function(data,statue){
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var doc={},param= {};
        param.doc = data;
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;

        if(statue == "save"){
            var addRenew = service.addRenew(param);
            addRenew.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.processId;
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAddRenew = service.applyAddRenew(param);
            applyAddRenew.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.processId;
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/loanBillOrder'; });
                    //swal("提交成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }
    }

}]);
loanBillApp.controller('applyRenewBillCtrl', ['$scope','$stateParams','loanBillServices',function($scope,$stateParams,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var viewPur = apply.applyViewRenew(param);
    viewPur.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
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
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
            }
            $scope.loading = false;

            try{
                // 往客户信用controller传递参数
                var param = {'name':$scope.ORDER_DATA.client.name, 'id':$scope.ORDER_DATA.client.id};
                $scope.$broadcast('transfer.type', param);
            } catch (e) {}

        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    }).error(function(error){
        swal(error, "", "warning");
        //alert(error);
    });
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
		
		var addInside = apply.addRenew(param);
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
        var applyAgree = apply.agreeRenew(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagreeRenew(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.cancelRenew(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){   window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = apply.recallRenew(param);
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
            //alert(error);
        });
    }
}]);

loanBillApp.controller('returnBillOrderCtrl', ['$scope','loanBillServices',function($scope,payment){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage:0,
        pagesLength: 10,
        perPageOptions: [5,10, 20, 30, 40, 50],
        pagePromise:{},
        onChange: function(){
            var param  = {page:$scope.paginationConf.currentPage, limit:$scope.paginationConf.itemsPerPage, code:$scope.code, rtcode:$scope.rtcode,username: $scope.username, clientname:$scope.clientname};
            var customerPromise = payment.listReturn(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    };
}]);
loanBillApp.controller('returnBillOrderAddCtrl', ['$scope','$stateParams','$filter','loanBillServices',function($scope,$stateParams,$filter,payment){
    var ORDER_DATA =  $scope.ORDER_DATA ={};
    $scope.ORDER_DATA.pdreturn = {};//产品信息
    var excleWlData = $scope.excleWlData = [];
    var userLink = $scope.userLink = [];
    var userLinkList =  $scope.userLinkList = [];
    var excleData = $scope.excleData = [];
    $scope.ORDER_DATA.code = $stateParams.code;
    // $scope.excleData=[{name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''}];
    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    };
    $scope.userDel = function(idx,type){
        if(type=='add'){
            $scope.userLinkList.splice(idx,1);
        }else {
            $scope.excleData.splice(idx,1);
        }
    };


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
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
        // 获取默认值
        var viewCont = payment.viewInside({_id:$stateParams.id});
        viewCont.success(function(data) {
            var d = data.rst.data.model;
            $scope.ORDER_DATA.pdreturn.shipper = d.client.realname;
            if(d.receivers && d.receivers.length) {
                $scope.ORDER_DATA.pdreturn.shippertel = d.receivers[0].phone;
                $scope.ORDER_DATA.pdreturn.shipperaddr = $filter('province')(d.receivers[0].province, $scope.countryData) + $filter('province')(d.receivers[0].city, $scope.countryData) + d.receivers[0].address;
                console.log( $filter('province')(d.receivers[0].province, $scope.countryData))
            }
        });
    });
    $scope.cusLinkBox = function(){
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        $scope.cusLinkList = [
            {
                'KF_NAME':' 北京飞力士库房样机库',
                'ZCNEE_NAME':'张萌',
                'ZCNEE_MOBILE':'15011327537',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'北京市',
                'ZCNEE_CITY':'北京市',
                'ZCNEE_ADDRESS':'北京市海淀区杏口路88号巨山农场翔远通物流15号库',
                'ZCNEE_PSTLZ':'100195'
            },
            {
                'KF_NAME':'东莞样机库',
                'ZCNEE_NAME':'李雪梅',
                'ZCNEE_MOBILE':'13528701334',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'广东省',
                'ZCNEE_CITY':'东莞市',
                'ZCNEE_ADDRESS':'东莞市寮步镇西溪黄菊工业区正明街9号（松湖仓储飞力士物流）',
                'ZCNEE_PSTLZ':'523402'
            },
            {
                'KF_NAME':'上海样机库',
                'ZCNEE_NAME':'程立东/任中',
                'ZCNEE_MOBILE':'13916367741/8034601',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'上海市',
                'ZCNEE_CITY':'上海市',
                'ZCNEE_ADDRESS':'上海市联友路1658号院内',
                'ZCNEE_PSTLZ':'201100'
            },
            {
                'KF_NAME':'北京海龙库房样机库',
                'ZCNEE_NAME':'王洪利、闫成',
                'ZCNEE_MOBILE':'13621304068',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'北京市',
                'ZCNEE_CITY':'北京市',
                'ZCNEE_ADDRESS':'北京市顺义区后沙峪地区铁匠营村村北500米，北京九龙汇海物流院内西侧3号库',
                'ZCNEE_PSTLZ':'101318'
            }
        ]
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var provinceObj = getField($scope.countryData, 'TITLE', province);
        // 市名字和省名字相同的会找不到市，通过省份找到对应的CODE码
        city = city==province ? provinceObj.CITY[0] :  getField($scope.countryData, 'TITLE', city);
        var obj= {name:name, phone:phone, tel:tel, province:provinceObj.CODE, city:city.CODE, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    $scope.comeDel = function(idx){
        $scope.excleWlData.splice(idx,1);
    };
    $scope.ORDER_DATA.pdreturn.products = [];
    $scope.returnWlBox = function(){
        $( "#wlBox2" ).dialog({
            autoOpen: false,
            width: 750,
            height:400,
            modal: true,
            close: function () {
                $scope.cArr = [];
                $scope.cArrdata = [];
                $scope.checkAll = false;
            }
        });
        $( "#wlBox2" ).dialog( "open" );
        var selectnotreturn = payment.selectnotreturn({'ZJCDH':$stateParams.ZJCDH});
        selectnotreturn.success(function(data){
            if(data.code == 200){
                $scope.retrunProduct = data.rst;
            }else {
                swal(data.msg, "", "warning");
                //alert(data.msg);
            }
        })
    };
    /*$scope.reproSelect = function(code, productcode, productnumber, des, outnum, notreturn, currentreturn){
        var obj = {'code':code,'productcode':productcode,'productnumber':productnumber,'des':des,'outnum':outnum,'notreturn':notreturn, 'currentreturn':currentreturn}
        if(!currentreturn){
            swal("请输入本次还回数量！", "", "warning");
            //alert();
            return false;
        }else if(parseInt(notreturn)<parseInt(currentreturn)){
            swal("还回数量不能大于未还数量", "", "warning");
            //alert();
            return false;
        }
        for(var x in $scope.ORDER_DATA.pdreturn.products){
            if($scope.ORDER_DATA.pdreturn.products[x].code == code){
                $scope.ORDER_DATA.pdreturn.products.splice(x,1);
               // $scope.ORDER_DATA.pdreturn.products[x].currentreturn = currentreturn;
            }
        }
        $scope.ORDER_DATA.pdreturn.products.push(obj);
        $( "#wlBox2" ).dialog("destroy");
        $(".ui-dialog").remove();
    };*/
    $scope.reproSelect = function () {
        for(var i=0,l=$scope.cArrdata.length; i<l; i++) {
            var obj = $scope.cArrdata[i], POSNR = obj.POSNR;
	        if($('#wlBox2Table').find('.errTip:visible').length>0){
		        swal("您有信息填写有误，请检查后再保存", "", "warning");
		        return false;
	        }
            if(!obj.currentreturn && obj.currentreturn!=0){
                swal("请输入本次还回数量！", "", "warning");
                return false;
            }
            if(obj.currentreturn-0<=0){
                swal("本次还回数量需大于0！", "", "warning");
                return false;
            }
            for(var x in $scope.ORDER_DATA.pdreturn.products){
            	// console.log($scope.ORDER_DATA.pdreturn.products[x].POSNR, POSNR, 'POSNR')
                if(POSNR && $scope.ORDER_DATA.pdreturn.products[x].POSNR == POSNR){
                    $scope.ORDER_DATA.pdreturn.products.splice(x,1);
                    // $scope.ORDER_DATA.pdreturn.products[x].currentreturn = currentreturn;
                }
            }
            // console.log(obj, $scope.ORDER_DATA.pdreturn.products,1)
	        $scope.ORDER_DATA.pdreturn.products.push(obj);
	        // console.log(obj, $scope.ORDER_DATA.pdreturn.products,2)
        }
        $scope.cArr = [];
        $scope.cArrdata = [];
        $scope.checkAll = false;
        $( "#wlBox2" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    $scope.reproDel = function(idx){
        $scope.ORDER_DATA.pdreturn.products.splice(idx,1);

    };
    $scope.comReturn = function(notreturn, currentreturn){

        if(parseInt(notreturn)<parseInt(currentreturn)){
            swal("还回数量不能大于未还数量", "", "warning");
            //alert();
            return false;
        }
    };
    // 2016-8-30 按需求物料选择增加全选
    $scope.cArr = [];
    $scope.cArrdata = [];
    var updateSelected = function (action, id, index) {
        if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
            $scope.cArr.push(id);
            $scope.cArrdata.push($scope.retrunProduct[index]);
            if(!$scope.retrunProduct[index].currentreturn) {
                $scope.retrunProduct[index].currentreturn = $scope.retrunProduct[index].notreturn;
            }
        }
        if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
            var idx = $scope.cArr.indexOf(id);
            $scope.cArr.splice(idx, 1);
            $scope.cArrdata.splice(idx, 1);
        }
    };
    $scope.updateSelection = function ($event, id, index) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, index);
        console.log('cArrdata:',$scope.cArrdata);
    };
    // 清空
    $scope.emptyFn = function() {
        $scope.checkAll = false;
        $scope.cArr = [];
        $scope.cArrdata = [];
    };
    $scope.allCheck=function($event) {

        if ($scope.checkAll) {
            for (var i = 0; i < $scope.retrunProduct.length; i++) {
            	if($scope.retrunProduct[i].outnum && $scope.retrunProduct[i].outnum != 0) {
	                $scope.cArr.push($scope.retrunProduct[i].POSNR);
	                $scope.cArrdata.push($scope.retrunProduct[i]);
	                if(!$scope.retrunProduct[i].currentreturn) {
	                    $scope.retrunProduct[i].currentreturn = $scope.retrunProduct[i].notreturn;
	                }
	            }
            }
        } else {
            $scope.cArr = [];
            $scope.cArrdata = [];
        }
        console.log('cArrdata:',$scope.checkAll,$scope.cArrdata, $scope.retrunProduct);
    };

    $scope.yjdhDate=function(date1,date2){
       if(Date.parse(date1)>Date.parse(date2)){
           swal('预计到货时间必须大于等于发货时间','','warning');
           return false;
       }
    };
    $scope.addData = function(data,statue){
        if(Date.parse($scope.ORDER_DATA.pdreturn.shipdate)>Date.parse($scope.ORDER_DATA.pdreturn.estimatetime)){
            swal('预计到货时间必须大于等于发货时间','','warning');
            return false;
        }
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var doc={},param= {};
        doc = data;
        var userLink = $scope.userLink = $scope.userLinkList.concat($scope.excleData);
        doc.pdreturn.rtreceivers = userLink;
        if(doc.pdreturn.rtreceivers.length<=0){
            //alert("请添加联系人");
            swal("请添加联系人", "", "warning");
            return false;
        }
        if(doc.pdreturn.products.length<=0){
            //alert("请添加借出产品信息");
            swal("请添加借出产品信息", "", "warning");
            return false;
        }
        param.processId = $scope.processId;
        param.nodeId = $scope.nodeId;
        param.doc = doc;

        if(statue == "save"){
            var addReturn = payment.addReturn(param);
            addReturn.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }else if(statue == 'apply'){
            var applyAddReturn = payment.applyAddReturn(param);
            applyAddReturn.success(function(data){
                if(data.code == 200){
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/loanBillOrder'; });
                    //swal("提交成功", "", "success");
                }else {
                    swal(data.msg, "", "warning");
                    //alert(data.msg);
                }
            });
        }
    }

}]);
loanBillApp.controller('applyReturnBillCtrl', ['$scope','$stateParams','loanBillServices',function($scope,$stateParams,apply){
    var param  = {processId:$stateParams.processId, nodeId:$stateParams.nodeId};
    if($stateParams.myflag == 'mysubscriber') {
        $.extend(param, {myflag: "mysubscriber" })
    }
    var applyViewReturn = apply.applyViewReturn(param);
    var transferwayTxt = {
        "01" : '国内陆运',
        "02" : '国内海运',
        "03" : '国内空运',
        "04" : '国际陆运',
        "05" : '国际海运',
        "06" : '国际空运',
        "07" : '陆运快件',
        "08" : '火车运输',
        "09" : '快递',
        "10" : '专车',
        "11" : '自提'
    };
    var getCountry = apply.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    applyViewReturn.success(function(data){
        if(data.code == 200){
            $scope.apCot = true;
            $scope.ORDER_DATA = data.rst.doc.model;
            $scope.transferway = transferwayTxt[$scope.ORDER_DATA.pdreturn.transferway] || $scope.ORDER_DATA.pdreturn.transferway;

            $scope.processId = data.rst.processId;
            $scope.nodeId = $stateParams.nodeId;
            $scope.doc = data.rst.doc;
            $scope.candidates = data.rst.candidates;
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
                $scope.apCot = data.rst.processlog.length>1 ? true : false;
                //$scope.apCot = false;
            }

        }else{
            swal(data.msg, "", "warning");
            //alert(data.msg);
        }
    }).error(function(error){
        swal(error, "", "warning");
        //alert(error);
    });
    var applyObj =  $scope.applyObj ={};
	//addInside
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
		
		var addInside = apply.addReturn(param);
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
        var applyAgree = apply.agreeReturn(param);
        applyAgree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "审批成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyDisagree = function(){//驳回
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var disagree = apply.disagreeReturn(param);
        disagree.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){ window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyCancel = function(){//取消
        var param = {};
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.comment = applyObj.applyIdea;
        var cancel = apply.cancelReturn(param);
        cancel.success(function(data){
            if(data.code == 200){
                swal({
                    title: "驳回原点成功",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "返回借出单待办",
                    closeOnConfirm: true
                }, function(){   window.location.href = '/index.html#/typeList?myflag=mydoings&controllerName=借出单&&controllercode=JCD,JCDRN,JCDRT'; });
            }else {
                swal("提交失败！", '', "error");
            }
        }).error(function(error){
            swal(error, "", "warning");
            //alert(error);
        });
    }
    $scope.applyRecall = function(){//召回
        var param = {};
        param.nodeId = $stateParams.nodeId;
        param.processId = $stateParams.processId;
        param.comment = applyObj.applyIdea;
        var recall = apply.recallReturn(param);
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
            //alert(error);
        });
    }
}]);
loanBillApp.controller('returnBillOrderEditCtrl', ['$scope','$stateParams','loanBillServices',function($scope, $stateParams, payment){

    if($stateParams.sapid){//判断数据来源（sap or 草稿）
        $scope.draftStatue = true;
        $scope.saveBtn = true;
    }else{
        $scope.saveBtn = false;
    }

    var ORDER_DATA =  $scope.ORDER_DATA ={};
    $scope.ORDER_DATA.pdreturn = {};//产品信息
    var excleWlData = $scope.excleWlData = [];
    var userLink = $scope.userLink = [];
    var userLinkList =  $scope.userLinkList = [];
    var excleData = $scope.excleData = [];
    $scope.ORDER_DATA.code = $stateParams.code;
    $scope.userAdd = function(){
        var obj= {name:'', phone:'', tel:'', province:'', city:'', address:'', zipcode:''};
        $scope.userLinkList.push(obj);
    }
    $scope.userDel = function(idx,type){
        if(type=='add'){
            $scope.userLinkList.splice(idx,1);
        }else {
            $scope.excleData.splice(idx,1);
        }
    }
    $scope.cusLinkBox = function(){
        $( "#cusLinkBox" ).dialog({
            autoOpen: false,
            width: 850,
            modal: true
        });
        $( "#cusLinkBox" ).dialog( "open" );
        $scope.cusLinkList = [
            {
                'KF_NAME':' 北京飞力士库房样机库',
                'ZCNEE_NAME':'张萌',
                'ZCNEE_MOBILE':'15011327537',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'北京市',
                'ZCNEE_CITY':'北京市',
                'ZCNEE_ADDRESS':'北京市海淀区杏口路88号巨山农场翔远通物流15号库',
                'ZCNEE_PSTLZ':'100195'
            },
            {
                'KF_NAME':'东莞样机库',
                'ZCNEE_NAME':'李雪梅',
                'ZCNEE_MOBILE':'13528701334',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'广东省',
                'ZCNEE_CITY':'东莞市',
                'ZCNEE_ADDRESS':'东莞市寮步镇西溪黄菊工业区正明街9号（松湖仓储飞力士物流）',
                'ZCNEE_PSTLZ':'523402'
            },
            {
                'KF_NAME':'上海样机库',
                'ZCNEE_NAME':'程立东/任中',
                'ZCNEE_MOBILE':'13916367741/8034601',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'上海市',
                'ZCNEE_CITY':'上海市',
                'ZCNEE_ADDRESS':'上海市联友路1658号院内',
                'ZCNEE_PSTLZ':'201100'
            },
            {
                'KF_NAME':'北京海龙库房样机库',
                'ZCNEE_NAME':'王洪利、闫成',
                'ZCNEE_MOBILE':'13621304068 ',
                'ZCNEE_PHONE':'',
                'ZCNEE_PROVINCE':'北京市',
                'ZCNEE_CITY':'北京市',
                'ZCNEE_ADDRESS':'北京市顺义区后沙峪地区铁匠营村村北500米，北京九龙汇海物流院内西侧3号库',
                'ZCNEE_PSTLZ':'101318'
            }
        ]
    };
    $scope.cusLinkSelect = function(name,phone,tel,province,city,address,zipcode){
        var provinceObj = getField($scope.countryData, 'TITLE', province);
        // 市名字和省名字相同的会找不到市，通过省份找到对应的CODE码
        city = city==province ? provinceObj.CITY[0] :  getField($scope.countryData, 'TITLE', city);
        var obj= {name:name, phone:phone, tel:tel, province:provinceObj.CODE, city:city.CODE, address:address, zipcode:zipcode};
        $scope.userLinkList.push(obj);
        $( "#cusLinkBox" ).dialog("destroy");
        $(".ui-dialog").remove();
    };

    $scope.comeDel = function(idx){
        $scope.excleWlData.splice(idx,1);
    }
    $scope.ORDER_DATA.pdreturn.products = [];
    $scope.returnWlBox = function(){
      $( "#wlBox2" ).dialog({
        autoOpen: false,
        width: 750,
        height:400,
        modal: true,
        close: function () {
          $scope.cArr = [];
          $scope.cArrdata = [];
          $scope.checkAll = false;
        }
      });

        $( "#wlBox2" ).dialog( "open" );
        var selectnotreturn = payment.selectnotreturn({'ZJCDH':$scope.ORDER_DATA.ZJCDH});
        selectnotreturn.success(function(data){
            if(data.code == 200){
                $scope.retrunProduct = data.rst;
            }else {
              swal(data.msg, "", "warning");
            }
        })
    }
    /*$scope.reproSelect = function(code, productcode, productnumber, des, outnum, notreturn, currentreturn){
        var obj = {'code':code,'productcode':productcode,'productnumber':productnumber,'des':des,'outnum':outnum,'notreturn':notreturn, 'currentreturn':currentreturn}
        if(!currentreturn){
            alert("请输入本次还回数量！");
            return false;
        }else if(parseInt(notreturn)<parseInt(currentreturn)){
            alert("还回数量不能大于未还数量");
            return false;
        }
        $scope.ORDER_DATA.pdreturn.products.push(obj);
        $( "#wlBox2" ).dialog("destroy");
        $(".ui-dialog").remove();
    };*/
    $scope.reproSelect = function () {
	    for(var i=0,l=$scope.cArrdata.length; i<l; i++) {
		    var obj = $scope.cArrdata[i], POSNR = obj.POSNR;
		    if($('#wlBox2Table').find('.errTip:visible').length>0){
			    swal("您有信息填写有误，请检查后再保存", "", "warning");
			    return false;
		    }
		    if(!obj.currentreturn && obj.currentreturn!=0){
			    swal("请输入本次还回数量！", "", "warning");
			    return false;
		    }
		    if(obj.currentreturn-0<=0){
			    swal("本次还回数量需大于0！", "", "warning");
			    return false;
		    }
		    for(var x in $scope.ORDER_DATA.pdreturn.products){
			    // console.log($scope.ORDER_DATA.pdreturn.products[x].POSNR, POSNR, 'POSNR')
			    if(POSNR && $scope.ORDER_DATA.pdreturn.products[x].POSNR == POSNR){
				    $scope.ORDER_DATA.pdreturn.products.splice(x,1);
				    // $scope.ORDER_DATA.pdreturn.products[x].currentreturn = currentreturn;
			    }
		    }
		    $scope.ORDER_DATA.pdreturn.products.push(obj);
	    }
	    $scope.cArr = [];
	    $scope.cArrdata = [];
	    $scope.checkAll = false;
	    $( "#wlBox2" ).dialog("destroy");
	    $(".ui-dialog").remove();
  };
    $scope.reproDel = function(idx){
        $scope.ORDER_DATA.pdreturn.products.splice(idx,1);

    };
    $scope.comReturn = function(notreturn, currentreturn){

      if(parseInt(notreturn)<parseInt(currentreturn)){
        swal("还回数量不能大于未还数量", "", "warning");
        //alert();
        return false;
      }
    };
  // 2016-8-30 按需求物料选择增加全选
  $scope.cArr = [];
  $scope.cArrdata = [];
  var updateSelected = function (action, id, index) {
    if (action == 'add' && $scope.cArr.indexOf(id) == -1) {
      $scope.cArr.push(id);
      $scope.cArrdata.push($scope.retrunProduct[index]);
      if(!$scope.retrunProduct[index].currentreturn) {
        $scope.retrunProduct[index].currentreturn = $scope.retrunProduct[index].notreturn;
      }
    }
    if (action == 'remove' && $scope.cArr.indexOf(id) != -1) {
      var idx = $scope.cArr.indexOf(id);
      $scope.cArr.splice(idx, 1);
      $scope.cArrdata.splice(idx, 1);
    }
  };
  $scope.updateSelection = function ($event, id, index) {
    var checkbox = $event.target;
    var action = (checkbox.checked ? 'add' : 'remove');
    updateSelected(action, id, index);
    console.log('cArrdata:',$scope.cArrdata);
  };
  // 清空
  $scope.emptyFn = function() {
    $scope.checkAll = false;
    $scope.cArr = [];
    $scope.cArrdata = [];
  };
  $scope.allCheck=function($event) {

    if ($scope.checkAll) {
      for (var i = 0; i < $scope.retrunProduct.length; i++) {
	      if($scope.retrunProduct[i].outnum && $scope.retrunProduct[i].outnum != 0) {
		      $scope.cArr.push($scope.retrunProduct[i].POSNR);
		      $scope.cArrdata.push($scope.retrunProduct[i]);
		      if(!$scope.retrunProduct[i].currentreturn) {
			      $scope.retrunProduct[i].currentreturn = $scope.retrunProduct[i].notreturn;
		      }
	      }
      }
    } else {
      $scope.cArr = [];
      $scope.cArrdata = [];
    }
    console.log('cArrdata:',$scope.checkAll,$scope.cArrdata, $scope.retrunProduct);
  };
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
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });

    var viewCont = payment.viewReturn({sapid:$stateParams.sapid, processId:$stateParams.processId});
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.userLinkList = data.rst.data.model.pdreturn.rtreceivers;
        $scope.ORDER_DATA.pdreturn.products = data.rst.data.model.pdreturn.products;
    });

    $scope.addData = function(data,statue){
        if(Date.parse($scope.ORDER_DATA.pdreturn.shipdate)>Date.parse($scope.ORDER_DATA.pdreturn.estimatetime)){
            swal('预计到货时间必须大于等于发货时间','','warning');
            return false;
        }
        var requiredObj = $scope.invoiceForm.$error.required;
        angular.forEach(requiredObj,function(keyData){
            keyData.$dirty = true;
        });
        if(!$scope.invoiceForm.$valid){
            swal("您有信息填写不完整，请检查后再保存", "", "warning");
            return false;
        }
        var doc={},param= {};
        doc = data;
        var userLink = $scope.userLink = $scope.userLinkList.concat($scope.excleData);
        doc.pdreturn.rtreceivers = userLink;
        if(doc.pdreturn.rtreceivers.length<=0){
          swal("请添加联系人", "", "warning");
            return false;
        }
        if(doc.pdreturn.products.length<=0){
          swal("请上传借出产品信息", "", "warning");
            return false;
        }
        param.processId = $stateParams.processId;
        param.nodeId = $stateParams.nodeId;
        param.doc = doc;

        if(statue == "save"){
            var addReturn = payment.addReturn(param);
            addReturn.success(function(data){
                if(data.code == 200){
                    $scope.processId = data.rst.processId;
                    $scope.nodeId = data.rst.nodeId;
                    swal("保存成功", "", "success");
                }else {
                  swal(data.msg, '', "warning");
                }
            });
        }else if(statue == 'apply'){
            var applyAddReturn = payment.applyAddReturn(param);
            applyAddReturn.success(function(data){
                if(data.code == 200){
                    //swal("提交成功", "", "success");
                    swal({title: "提交成功", type: "success",   showCancelButton: false,   confirmButtonColor: "#DD6B55",   confirmButtonText: "返回列表",   closeOnConfirm: true }, function(){   window.location.href='/index.html#/loanBillOrder'; });
                }else {
                  swal(data.msg, '', "warning");
                  // alert(data.msg);
                }
            });
        }
    }
}]);
loanBillApp.controller('returnBillViewCtrl', ['$scope', '$stateParams', 'loanBillServices',function($scope, $stateParams, payment){
    var ORDER_DATA = {};
    var viewCont = payment.viewReturn({code:$stateParams.code,rtcode:$stateParams.rtcode});
    var transferwayTxt = {
        "01" : '国内陆运',
        "02" : '国内海运',
        "03" : '国内空运',
        "04" : '国际陆运',
        "05" : '国际海运',
        "06" : '国际空运',
        "07" : '陆运快件',
        "08" : '火车运输',
        "09" : '快递',
        "10" : '专车',
        "11" : '自提'
    };
    var getCountry = payment.getCountry();
    getCountry.success(function (data) {
        // 存储地区数据信息
        $scope.countryData = data ;
    });
    viewCont.success(function(data) {
        $scope.ORDER_DATA = data.rst.data.model;
        $scope.userLinkList = data.rst.data.model.pdreturn.rtreceivers;
        $scope.ORDER_DATA.pdreturn.products = data.rst.data.model.pdreturn.products;
        $scope.transferway = transferwayTxt[data.rst.data.model.pdreturn.transferway] || $scope.ORDER_DATA.pdreturn.transferway;
    });
    // 审批记录
    var vm = $scope;
    vm.activeTab = 1
    vm.processlog = null

    vm.htTab = function (type) {
      // TODO 目前需求 type 为 2时是审批记录，后续如果增加或减少标签则需要更改数字
      if (type == 2 && (vm.processlog == null || vm.processlog.length == 0)) {
        var processlog = payment.getprocesslog({type: 'JCDRT', id: vm.ORDER_DATA.pdreturn.rtcode});
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










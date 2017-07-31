var app = angular.module('formDirectives', []);
/**
 * span class="errTip ng-hide" ng-show="invoiceForm.contactphone.$dirty && invoiceForm.contactphone.$invalid && invoiceForm.contactphone.$error.telnum && !invoiceForm.contactphone.$focused">格式不正确/span
 */
app.directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                if(scope.$$phase) {
                    ctrl.$focused = true;
                } else {
                    scope.$apply(function() {ctrl.$focused = true;});
                }
            }).bind('blur', function(evt) {
                element.removeClass(FOCUS_CLASS);
                if(scope.$$phase) {
                    ctrl.$focused = true;
                } else {
                    scope.$apply(function() {ctrl.$focused = false;});
                }
            });
        }
    }
}]);
//非负数
var FFS_CODE = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
app.directive('feifsValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FFS_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('feifs', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('feifs', false);
                    return undefined;
                }
            });
        }
    };
});
//空格
app.directive('spaceValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (viewValue.indexOf(" ")==-1) {
                    ctrl.$setValidity('spaceWord', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('spaceWord', false);
                    return undefined;
                }
            });
        }
    };
});
//大于零的 最多两位小数
var BIGZERO_CODE = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
app.directive('bigzeroValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (BIGZERO_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('bigzero', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('bigzero', false);
                    return undefined;
                }
            });
        }
    };
});
//大于零的 最多三位小数
var BIGZERO_CODE = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/;
app.directive('lessthreeValidation', function() {
  return {
    require : 'ngModel',
    link : function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (BIGZERO_CODE.test(viewValue) || viewValue=='') {
          ctrl.$setValidity('lessthree', true);
          return viewValue;
        } else {
          ctrl.$setValidity('lessthree', false);
          return undefined;
        }
      });
    }
  };
});
//正整数integer
var INTERGER_CODE = /^[1-9]*[1-9][0-9]*$/;
app.directive('integerValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTERGER_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});
//非负整数integer
var FFSInt_CODE = /^[+]{0,1}(\d+)$/;
app.directive('feifInter', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				//console.log(11, FFSInt_CODE.test(viewValue), viewValue)
				if (FFSInt_CODE.test(viewValue) || viewValue=='') {
					ctrl.$setValidity('feifsint', true);
					return viewValue;
				} else {
					ctrl.$setValidity('feifsint', false);
					return undefined;
				}
			});
		}
	};
});
//保留两位小数的非负数
var TWONUMPOINT_CODE = /^\d+(\.\d{1,2})?$/;
app.directive('numtwoValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (TWONUMPOINT_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('numtwo', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('numtwo', false);
                    return undefined;
                }
            });
        }
    };
});
//保留四位小数的非负数
var FOURNUMPOINT_CODE =  /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/;
app.directive('numfourValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FOURNUMPOINT_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('numfour', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('numfour', false);
                    return undefined;
                }
            });
        }
    };
});
//保留两位小数的负数
var TWONUMPOINTFS_CODE = /^\-\d+(\.\d{1,2})?$/;///^\-\d+\.?\d*$/;
app.directive('numtwofsValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (TWONUMPOINTFS_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('numtwofs', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('numtwofs', false);
                    return undefined;
                }
            });
        }
    };
});
//最多保留两位小数
var floatTwo= /^-?\d+(\.\d{0,2})?$/;
app.directive('floatValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (floatTwo.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('floattwo', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('floattwo', false);
                    return undefined;
                }
            });
        }
    };
});
//0-100之间的数字
var NUM_CODE = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$|^100$/;
app.directive('num100Validation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (NUM_CODE.test(viewValue )|| viewValue=='') {
                    ctrl.$setValidity('num100', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('num100', false);
                    return undefined;
                }
            });
        }
    };
});
//0-100之间的数字不包含0 或者0.0 0.00
//var NUM_CODE = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$|^100$/;
//var re = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$|^100$/;0< <=100
//var re = /(?!^0\.0?0$)^[1-9][0-9]?(\.[0-9]{1,2})?$|^100$/; 0-100
var NUM_CODE =/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;
app.directive('num1001Validation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (NUM_CODE.test(viewValue ) || viewValue=='') {

                        ctrl.$setValidity('num1001', true);
                        return viewValue;


                } else {
                    ctrl.$setValidity('num1001', false);
                    return undefined;
                }
            });
        }
    };
});
//邮政编码
var POST_CODE = /^[0-9][0-9]{5}$/;
app.directive('postcodeValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (POST_CODE.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('postcode', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('postcode', false);
                    return undefined;
                }
            });
        }
    };
});
//15或18位数字+字母
var ratnum= /^([a-zA-Z0-9]{15}|[a-zA-Z0-9]{18})$/;
app.directive('ratnumValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (ratnum.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('ratcode', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('ratcode', false);
                    return undefined;
                }
            });
        }
    };
});
//英文名称
var ENG_NAME = /^[A-Za-z0-9.,&()\s]{1,40}$/;
app.directive('engnameValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (ENG_NAME.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('engname', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('engname', false);
                    return undefined;
                }
            });
        }
    };
});
//固定电话
var tel = /^\d{3,4}-?\d{5,8}$/;
app.directive('telValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (tel.test(viewValue )|| viewValue=='') {
                    ctrl.$setValidity('telnum', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('telnum', false);
                    return undefined;
                }
            });
        }
    };
});
//手机号
var phone = /^\d{11}$/;
app.directive('phoneValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (phone.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('phonenum', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('phonenum', false);
                    return undefined;
                }
            });
        }
    };
});
//手机号或电话（7-13位数字、横杠）
var telphone = /^\d{3,4}-?\d{4,8}$/;
app.directive('telphoneValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (telphone.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('telphonenum', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('telphonenum', false);
                    return undefined;
                }
            });
        }
    };
});
//银行账号
var bank = /^\d{0,30}$/;
app.directive('bankValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (bank.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('banknum', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('banknum', false);
                    return undefined;
                }
            });
        }
    };
});
//身份证号
var card =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
app.directive('cardValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (card.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('cardnum', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('cardnum', false);
                    return undefined;
                }
            });
        }
    };
});
//保留两位小数的非负数
var keepNumber =/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
app.directive('keepnumberValidation', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (keepNumber.test(viewValue) || viewValue=='') {
                    ctrl.$setValidity('keepnum', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('keepnum', false);
                    return undefined;
                }
            });
        }
    };
});
//整数
var INTEGER_REGEXP = /^\-?\d*$/;
app.directive('integer', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue )|| viewValue=='') {
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});
//浮点数
var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
app.directive('smartFloat', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue )|| viewValue=='') {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',','.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});
//客户名称是否重复验证
/*app.directive('remoteValidation', function($http) {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            elm.bind('blur', function() {
                var param = '{'+attrs.param+'}';
                param = eval('('+ param +')');
                if(scope.showBut==false){
                    if(param.NAME1&&param.KTOKD){
                        scope.myForm.NEWNAME.$error.remote=false;
                        scope.myForm.KTOKD.$error.remote=false;
                        if(param.NAME1!=scope.name){
                            $http.post('/customer/checkunique',param ,{cache:false}).
                                success(function(data) {
                                    if(data.rst.exist == 'exist'){
                                        ctrl.$setValidity('remote',false);
                                    }else{
                                        ctrl.$setValidity('remote',true);
                                    }
                                }).
                                error(function(data) {
                                    ctrl.$setValidity('remote', false);
                                });
                        }else{
                            $http.post('/customer/checkunique2',param ,{cache:false}).
                                success(function(data) {
                                    if(data.rst.exist == 'exist'){
                                        ctrl.$setValidity('remote',false);
                                    }else{
                                        ctrl.$setValidity('remote',true);
                                    }
                                }).
                                error(function(data) {
                                    ctrl.$setValidity('remote', false);
                                });
                        }

                    }
                }else{
                    if(param.NAME1!=scope.name||param.KTOKD!=scope.ktokd){
                        if(param.NAME1&&param.KTOKD){
                            scope.myForm.NAME1.$error.remote=false;
                            scope.myForm.KTOKD.$error.remote=false;
                            if(param.NAME1!=scope.name){
                                $http.post('/customer/checkunique',param ,{cache:false}).
                                    success(function(data) {
                                        if(data.rst.exist == 'exist'){
                                            ctrl.$setValidity('remote',false);
                                        }else{
                                            ctrl.$setValidity('remote',true);
                                        }
                                    }).
                                    error(function(data) {
                                        ctrl.$setValidity('remote', false);
                                    });
                            }else{
                                $http.post('/customer/checkunique2',param ,{cache:false}).
                                    success(function(data) {
                                        if(data.rst.exist == 'exist'){
                                            ctrl.$setValidity('remote',false);
                                        }else{
                                            ctrl.$setValidity('remote',true);
                                        }
                                    }).
                                    error(function(data) {
                                        ctrl.$setValidity('remote', false);
                                    });
                            }

                        }
                    }
                }


            });
        }
    };
});*/
app.directive('remoteValidation', function($http) {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            elm.bind('change', function() {
                var param = '{'+attrs.param+'}';
                param = eval('('+ param +')');
                scope.ready=false;
                var flag=attrs.already;
                if(flag=="new"){
                    $http.post('/customer/checkunique',param ,{cache:false}).
                        success(function(data) {
                            scope.ready=true;
                            if(data.rst.exist == 'exist'){
                                ctrl.$setValidity('remote',false);
                            }else{
                                ctrl.$setValidity('remote',true);
                            }
                        }).
                        error(function(data) {
                            ctrl.$setValidity('remote', false);
                        });
                }else if(flag=="old"){
                    if(param.NAME1!=scope.name){
                        $http.post('/customer/checkunique2',param ,{cache:false}).
                            success(function(data) {
                                scope.ready=true;
                                if(data.rst.exist == 'exist'){
                                    ctrl.$setValidity('remote',false);
                                }else{
                                    ctrl.$setValidity('remote',true);
                                }
                            }).
                            error(function(data) {
                                ctrl.$setValidity('remote', false);
                            });
                    }else{
                        swal("与旧客户名称一样！", "","warning");
                        scope.addApp.CENTRAL_DATA.NEWNAME='';
                        return false;
                    }
                }



            });
        }
    };
});
//组织机构代码是否重复验证
var num = /^[a-zA-Z0-9-]+$/;
app.directive('checkzorgValidation', function($http) {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            elm.bind('blur', function() {
                var param = '{'+attrs.param+'}';
                param = eval('(' + param + ')');
                if(scope.oragin!=param.ZORG_CODE){
                    if (num.test(param.ZORG_CODE)) {
                        ctrl.$setValidity('onlynum', true);
                        $http.post('/customer/checkzorg',param ,{cache:false}).
                            success(function(data) {
                                if(data.rst.exist == 'exist'){
                                    ctrl.$setValidity('remoteorg',false);
                                }else{
                                    ctrl.$setValidity('remoteorg',true);
                                }
                            }).
                            error(function(data) {
                                ctrl.$setValidity('remoteorg', false);
                            });
                        return param;
                    } else {
                        ctrl.$setValidity('onlynum', false);
                        return undefined;
                    }
                }

            });
        }
    };
});
// 密码强度
app.directive('passStrength', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            //CharMode函数
            //测试某个字符是属于哪一类.
            var charMode = function ( iN ){
                    if (iN>=48 && iN <=57) //数字
                        return 1;
                    if (iN>=65 && iN <=90) //大写字母
                        return 2;
                    if (iN>=97 && iN <=122) //小写
                        return 4;
                    else
                        return 8; //特殊字符
                },
                //bitTotal函数
                //计算出当前密码当中一共有多少种模式
                bitTotal = function ( num ){
                    var modes=0;
                    for (i=0;i<7;i++){
                        if (num & 1) {
                            modes += i==3 ? 2 : 1;
                        }
                        num>>>=1;
                    }
                    return modes;
                },
                //checkStrong函数
                //返回密码的强度级别
                checkStrong = function ( sPW ){
                    var modes = 0;
                    for (i=0; i<sPW.length; i++){
                        //测试每一个字符的类别并统计一共有多少种模式.
                        modes |= charMode(sPW.charCodeAt(i));
                    }
                    if( sPW.length>5 ) modes |= 16;
                    if( sPW.length>9 ) modes |= 32;
                    if( sPW.length>14 ) modes |= 64;
                    return bitTotal( modes );
                };
            ctrl.$parsers.unshift(function(viewValue) {
                var level = checkStrong(viewValue);
                level = level > 6 ? 6 : level;
                ctrl.$setValidity('pwd', viewValue && level>2);
                return level+viewValue;
            });
        }
    };
});
app.directive('datePicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            minDate: '@',callBackMethod:'&getUploadCallback',
        },
        link: function (scope, element, attr, ngModel) {

            var uploadCallback = element.attr('get-upload-callback');
            element.val(ngModel.$viewValue);

            function onpicking(dp) {
                var date = dp.cal.getNewDateStr();
                scope.$apply(function () {
                    ngModel.$setViewValue(date);
                    if(uploadCallback){//上传回调方法
                        scope.callBackMethod({callbackDate:date});
                    }
                });
            }
	        element.bind('blur', function () {
		        scope.$apply(function () {
			        ngModel.$setViewValue(element.val());
			
		        });
	        })
            function oncleared(){
                scope.$apply(function () {
                    ngModel.$setViewValue("");
	                if(uploadCallback){//上传回调方法
		                scope.callBackMethod({callbackDate:''});
	                }
                });
            }
            element.bind('click', function () {
                var param = element.attr("dateParam")
                param = param ? (new Function("return " + param))() : {};
                // autoUpdateOnChanged: 是否自动更新el, 默认为null
                var obj = $.extend({},{autoUpdateOnChanged: false, onpicking: onpicking,oncleared: oncleared/*, readOnly: true*/}, param);
                WdatePicker(obj);
                /*WdatePicker({
                    onpicking: onpicking,
                    oncleared: oncleared,
                    onpicked: onpicked,
                    dateFmt: (attr.datefmt || 'yyyy-MM-dd')
                    //minDate: (scope.minDate || '%y-%M-%d'),
                })*/
            });
        }
    };
});

// 开始时间，结束时间验证 @wenbo 2017/0119
app.directive('datePickerlist', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            element.val(ngModel.$viewValue);
            function onpicking(dp) {
                var date = dp.cal.getNewDateStr();
                scope.$apply(function () {
                    ngModel.$setViewValue(date);
                });
            }
            function oncleared() {
                scope.$apply(function () {
                    ngModel.$setViewValue("");
                });
            }
            // function onpicked(dp){
            //    $(dp.el).validationEngine('validate');
            // }
            element.bind('click', function () {
                var fun = attr.wmaxdate;
                if (attr.wfun) {
                    fun = attr.wmaxdate && attr.wfun;
                }
                var param = element.attr("dateParam")
                param = param ? (new Function("return " + param))() : {};
                var obj = $.extend({},{autoUpdateOnChanged: false, onpicking: onpicking,oncleared: oncleared, dateFmt: attr.wdatefmt, maxDate: fun, minDate: attr.wmindate}, param);
                WdatePicker(obj)
            });
        }
    };
});

app.directive('goBottom',function(){
    return{
        restrict: 'A',
        require: 'ngModel',
        link:function ($scope, element, attr){
            element.bind("click",function(){
                $('html, body').animate({scrollTop:$(document).height()}, 'slow');
            })
        }
    }
});
app.directive('goTop',function(){
    return{
        restrict: 'A',
        require: 'ngModel',
        link:function ($scope, element, attr){
            element.bind("click",function(){
                $('html, body').animate({scrollTop: 0}, 500);
            });
        }
    }
});

// loading
app.directive('loading',function(){
    return {
        restrict: 'AECM',
        link:function(scope, element, attr) {
            element.height($(window).height());
        },
        template: '<div id="loading" class="hidden"><img src="img/loading.gif"/></div>',
        replace: true
    }
});

//<a href back-button>back</a> 后退
app.directive('backButton', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', goBack);
            function goBack() {
                history.back();
                scope.$apply();
            }
        }
    }
});

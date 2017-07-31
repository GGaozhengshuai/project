/**
 * Created by tyc on 2016/2/2.
 */
var myapp = angular.module('MyFilterApp', ['ngSanitize']);
myapp.filter('province', function() {
    return function(input, param1) {
       var out = '';
        out = input && getField(param1, 'CODE',input) ? getField(param1, 'CODE',input).TITLE : input;
        return out;
    };
});
//  | getName:param1 : keyName : fl
myapp.filter('getName', function() {
    return function(input, param1, keyName, fl) {
        var out = '', outArr=[],
            keyName = keyName || 'NAME',
            fl = fl || 'CODE',
            getValue = '';
        if(!input) {
            return '';
        }
        var iptArr = input.split(',');
        if(iptArr.length ==1) {
	        getValue = getField(param1, fl, input);
	        out = input && getValue ?
                keyName ? getValue[keyName] : getValue
                : input;
        } else {
        	// 2017-4-11 Bug 6531
	        // 记不清当时为什么用for..in,for in循环会把数组原型上的方法也遍历出来，先修改为for循环，记录一下，方便后期排查问题
            for(var i=0,len=iptArr.length; i<len; i++){
	           
                getValue = getField(param1, fl, iptArr[i]);
                var outval = iptArr[i] && getValue ?
                    keyName ? getValue[keyName] : getValue
                    : iptArr[i];
                outArr.push(outval);
	          
            }
            out = outArr.join(',')
        }
	
	    return out;
    };
});
/**
 * 1.字段截取 eg:{{some_text | cutfield:true:100:'...'}}
 *  2.{{ numbers | limitTo:numLimit }} angular内置直接截取
 *  3.white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
 *  2017-1-18 LP增强逻辑 wordwise：  true 中文字符长度为1、字母英文按照两个占位按1算
 *                                 false   不区分所有字符长度都按照1计算
 * **/
myapp.filter('cutfield', function () {
    return function (value, wordwise, max, tail) {
	    // value = String(value).trim();
	    if (!value) return '';
	    value = String(value);

	    if (!max) return value;
        if (wordwise) {
	        var posLen = value.posLen(), n = value.length, i=1;
	        value = value.replace(String.compileReg[1], "");
	        max = parseInt(max, 10)*2;
	        if (posLen <= max) return value;
	        for(; i<n; i++){
		        if( value.substr(0, i).posLen() >= max )
			        value = value.substr(0, i);
	        }
        } else {
        	if(value.length <= max){
		        return value;
	        }
        	value = value.substr(0, parseInt(max, 10));
        }

        return value + (tail || '…');
    };
});
// html安全绑定
myapp.filter('trustHtml',function ($sce) {
    return function (text) {
        if(typeof text=='string') {
            // console.log('aa：', text, $sce.trustAsHtml(text))
            return $sce.trustAsHtml(text)+'';
        }
    };
});
//过滤日期0000-00-00
myapp.filter('dataFilter',function () {
    return function (data) {
        var dataBox;
        if(data=="0000-00-00"){
            dataBox="";
        }else{
            dataBox=data;
        }
        return dataBox;
    };
});

// 舍弃小数位
myapp.filter('parseInt', function() {
	return function(input) {
		var out = '';
		out = input  ? parseInt(input) : '';
		return out;
	};
});

// // 格式化金额
// myapp.filter('currency', function () {
//   return function (value) {
//     return "￥ " + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//   }
// });

// 是否提前下单
myapp.filter('tqxd', function () {
  return function (value) {
    return {'2': '已认领', '1': '提前下单', '0': '正常下单', '': '未认领'}[value];
  }
});



// 是否审批完成
myapp.filter('spwc', function () {
  return function (value) {
    return value === '3' ? '是' : '否';
  }
});

/**
 * Created by tyc on 2016/2/2.
 */
//查询json数里面的值 obj ---- json  f1 --- 属性名字  v1 --- 属性的值 返回查找的一个对象
//  var selectObj = getField($scope.bklistItem,'_id',id); $scope.ORDER_DATA.bank.name = selectObj.bank;
function getField(obj, f1, v1) {
  var result;

  function dogetField(obj) {
    if (typeof obj != "object") {
      return false;
    }
    var found = false;
    for (var k in obj) {
      if (isArray(obj[k])) {
        for (var i = 0; i < obj[k].length; i++) {
          if (dogetField(obj[k][i])) {
            found = true;
            break;
          }
        }
      }
      else if (typeof obj[k] == "object") {
        if (dogetField(obj[k])) {
          found = true;
          break;
        }
      } else {
        if (k == f1 && v1 == obj[k]) {
          found = true;
          result = obj
          break;
        }
      }

    }
    return found
  }

  dogetField(obj)
  return result
}
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
/**
 * 公共消息发送处理
 * @param service  消息服务
 * @param message  消息详情
 * @param callback  回调
 *
 * 示例：
 * var msg = {
 *  ntype: 'system',  # 提醒类型，如果是system则会使用固定值，非则会调用当前用户
 *  title: ''， // 消息标题 不能为空，如果为空需敲个空格
 *  content: " ", //消息内容，不能为空，如果为空需敲个空格
 *  receivers: [] // 接收对象，需传入接受着基本信息，如果为登录名或中文名，则会自动查找相应用户 TODO 查找用户信息为临时方案
 *  sendtype: "listcast" // 发送类型 broadcast 广播，listcast 列表。如为广播，接收对象可以为空
 * };
 *
 *  sendMessage(service, msg, function(result) {
 *    result.status == 0 发送失败，会带有msg消息
 *    result.status == 1 发送成功
 *  }
 *
 */

function sendMessage(service, message, callback) {
  var _title, _content, _receivers, _sender, _user, _result = {}, _msg;
  // user info
  _user = JSON.parse(window.localStorage['persion'] || '{}');
  _sender = {
    senderName: _user.username,
    sender: {
      _id: _user.user._id,
      login: _user.user.login,
      name: _user.user.name,
      orgid: _user.user.orgid,
      orgname: _user.user.orgname,
    },
    sendtype: 'broadcast'
  };
  // message detail
  message = message || {};
  if ((message.ntype !== null || message.ntype !== undefined) && message.ntype === 'system') {
    _sender.senderName = '系统'
    _sender.sender._id = '58a6580ec0cefde224910168'
    _sender.sender.login = 'system'
    _sender.sender.name = '系统通知'
    _sender.sender.orgid = '58b78cca62fea31ed2117296'
    _sender.sender.orgname = '系统消息'
  }

  message = _.extend(_sender, message);
  if (!message.title || !message.content || (message.sendtype == 'listcast' && !_.size(message.receivers) )) {
    _title = !message.title ? '消息标题不能为空' : '';
    _content = !message.content ? '请填写消息内容' : '';
    _receivers = message.sendtype == 'listcast' && !_.size(message.receivers) ? '请填选择接收对象' : '';
    _result.msg = _title || _content || _receivers;
    _result.status = 0;
    return cb(_result, callback);
  }

  // 根据发送对象登录名查找用户信息，如果查找不到则发送对象为空
  // 目前查询方式根据登录名或中文名字查询，使用那种传那种即可 {login: ""} or {name: ""},如两个同时存在只会查第一个对象
  if (typeof message.receivers === "string") {
    var _param = {login: message.receivers.toLocaleLowerCase()};
    service.getUserInfo(_param)
      .success(function (result) {
        if (result.code === 200 && result.status) {
          message.receivers = result.data
        } else {
          message.receivers = []
          _receivers = message.sendtype == 'listcast' && !_.size(message.receivers) ? '请填选择接收对象' : '';
          _result.msg = _receivers;
          _result.status = 0;
          return cb(_result, callback);
        }
        send(message);
      })
  } else {
    send(message);
  }

  // send message
  function send(messate) {
    message.content = message.content.replace(/[\r\n]/g, '<br/>')
    service.sendMessage(message)
      .success(function (data) {
        if ((data != undefined && data != null) && (data.code != undefined && data.code != null) && data.code == 200) {
          _result.msg = "OK";
          _result.status = 1;
          return cb(_result, callback);
        } else {
          _result.msg = "消息发送失败"
          if (data) {
            _result.msg = data.msg || _result.msg
          }
          ;
          _result.status = 0;
          return cb(_result, callback);
        }
      }).error(function (error) {
      console.log(error)
    });
  }

  // callback
  function cb(data, callback) {
    if (typeof callback === 'function') {
      return callback(data);
    }
    return data;
  }

};

//测试浏览器是否支持正则表达式预编译
var testReg = /./, regCompile = testReg.compile && testReg.compile(testReg.source, "g");
//保存是否支持正则表达式预编译
RegExp.regCompile = regCompile;

//扩展String对象
String.compileReg = [
  /[\u4e00-\u9fa5\u3400-\u4db5\ue000-\uf8ff]/g,	//检测中文字符，共三区汉字：CJK-A、CJK-B、EUDC
  /^(?:\s|\xa0|\u3000)+|(?:\s|\xa0|\u3000)+$/g, //检测前后空格　\u00a0 == \xa0　是html中 &nbsp; 中文全角空格是 \u3000
  /([^\x00-\xff])/g	//检测双字节字符，并保留匹配结果
];
//正则表达式预编译
regCompile && $.each(String.compileReg, function (i, reg) {
  String.compileReg[i] = reg.compile(reg.source, "g");
});
$.extend(String.prototype, {
  //删除前后空格
  trim: function () {
    return this.replace(String.compileReg[1], "")
  },
  //计算字符占位长度
  //双字节字符占位 2，其他字符占位 1
  posLen: function () {
    return this.replace(String.compileReg[2], "rs").length;
  }
})

Array.prototype.remove = function (index) {
  if (isNaN(index) || index > this.length) {
    return false;
  }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[index]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
}

function genTable(options, header, data, callback) {
  options = options || {};
  var _options = {
    i18n: 'zh-cn',
    width:'*',
    enableFiltering: false,
    resizable: true,
    // enableVerticalScrollbar: 0,
    enableColumnResize: true,
    paginationPageSize: 100,
    headerRowHeight:42,
    rowHeight: 42,
    enableColumnMenus: false,
    enablePaginationControls: false,
    fastWatch: true,
    enableSorting: false,
    columnDefs: header,
    data: data
  }
  _options = _.extend(_options, options);
  if (callback && typeof callback === 'function') {
    callback(_options);
  } else {
    return _options
  }
}

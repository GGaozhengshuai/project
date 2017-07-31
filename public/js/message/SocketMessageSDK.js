/*
 * @Author: wenbo.Wang <wxl1314bobo@gmail.com>
 * @Date:  2017-01-13 09:55:03
 * @Last Modified by:   wenbo
 * @Last Modified time: 2017-01-13 09:55:03
 */
(function () {
  'use strict';
  var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this ||
    {};

  var YS_Massage = function (obj) {
    if (obj instanceof YS_Massage) return obj;
    if (!(this instanceof YS_Massage)) return new YS_Massage(obj);
    this._wrapped = obj;
  };

  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = YS_Massage;
    }
    exports.YS_Massage = YS_Massage;
  } else {
    root.YS_Massage = YS_Massage;
  }

  // 版本
  YS_Massage.version = '1.0.0';

  // 初始 socket； 并且建立连接
  YS_Massage.Init = function (obj) {
    YS_Massage.url = obj ? obj.url : '';
    YS_Massage.token = obj ? obj.token : '';
    YS_Massage.socket = io(YS_Massage.url);
    YS_Massage.user = {
      _id: obj ? obj.user._id : '',
      login: obj ? obj.user.login : '',
      name: obj ? obj.user.name : '',
      orgid: obj ? obj.user.orgid : '',
      orgname: obj ? obj.user.orgname : ''
    }
    YS_Massage.connect();
  };

  // 建立socket连接
  YS_Massage.connect = function () {
    YS_Massage.socket.on('connect', function () {
      YS_Massage.socket.emit('authentication', {token: YS_Massage.token, user: YS_Massage.user});
    });
    YS_Massage.authenticated(function () {
      console.log('authenticated.....');
    });
    YS_Massage.unauthorized(function (err) {
      console.log("There was an error with the authentication:", err.message);
    });
  };
  YS_Massage.authentication = function () {
    YS_Massage.socket.emit('authentication', {token: YS_Massage.token});
  };
  // 认证通过
  YS_Massage.authenticated = function (cb) {
    YS_Massage.socket.on('authenticated', cb);
  };

  // 认证失败，连接异常
  YS_Massage.unauthorized = function (cb) {
    YS_Massage.socket.on('unauthorized', cb);
  };

  // 通知
  YS_Massage.notify = function (cb) {
    YS_Massage.socket.on('notify', cb);
  };

  // 建立我的消息列表L
  YS_Massage.emitList = function (param) {
    YS_Massage.socket.emit('list', param);
  };
  // 我的消息列表
  YS_Massage.list = function (cb) {
    YS_Massage.socket.on('reslist', cb);
  };

  // 确认通知
  YS_Massage.isnotified = function (param) {
    YS_Massage.socket.emit('notified', param);
  };
  // 已读
  YS_Massage.isRead = function (param) {
    YS_Massage.socket.emit('read', param);
  };
  // 全部标记已读
  YS_Massage.readAll = function () {
    YS_Massage.socket.emit('readall');
  };
  // 删除
  YS_Massage.msgDelete = function(param) {
    YS_Massage.socket.emit('del', param);
  };
  // 消息数量建立连接
  YS_Massage.count = function (param) {
    YS_Massage.socket.emit('count', param);
  };
  // 消息数量
  YS_Massage.rescount = function (cb) {
    YS_Massage.socket.on('rescount', cb);
  };
  // 在线人数建立连接
  YS_Massage.olcount = function(param) {
      YS_Massage.socket.emit('onlinecount', param);
  };
  // 在线人数
  YS_Massage.res_olcount = function(cb) {
      YS_Massage.socket.on('resonlinecount', cb);
  };
  // 在线用户列表建立连接
  YS_Massage.oluserlist = function(param) {
      YS_Massage.socket.emit('userlist', param);
  };
  // 在线用户列表
  YS_Massage.res_oluserlist = function(cb) {
      YS_Massage.socket.on('resuserlist', cb);
  };

  // 断开连接
  YS_Massage.close = function () {
    YS_Massage.socket.disconnect()
  };

  if (typeof define == 'function' && define.amd) {
    define('YS_Massage', [], function () {
      return YS_Massage;
    });
  }
}());

/*
 * @Author: wenbo.Wang <wxl1314bobo@gmail.com>
 * @Date:  2017-01-16 09:55:03
 * @Last Modified by:   wenbo
 * @Last Modified time: 2017-01-16 09:55:03
 */
(function () {
  'use strict';

  var app = angular.module('SocketMessageSDK', []);
  app.factory('SocketServe', SocketServeFun);
  app.directive('ysMessage', ysMessage);
  app.directive('ysMessagecount', ysMessageCount);
  app.animation(".repeat-animation", animationFun);
  app.filter('ignorebr',function(){
    return function(content){
        var res = content;
        res = content.replace(/<br\s*\/>/g, " ");
        return res;
    }
});

  // 消息服务
  function SocketServeFun() {
    return {
      openSocketStart: false,
      msgInit: function (url, token, user, cb, err) {
        var that = this
        YS_Massage.Init({url: url, token: token, user: user});
        this.authenticated(cb);
        this.unauthorized(err);
      },
      connect: function (cb) {
        YS_Massage.connect(cb);
      },
      authentication: function () {
        YS_Massage.authentication();
      },
      authenticated: function (cb) {
        YS_Massage.authenticated(cb);
      },
      unauthorized: function (err) {
        YS_Massage.unauthorized(err);
      },
      msgNotify: function (cb) {
        YS_Massage.notify(cb);
      },
      msgEmitList: function (param) {
        YS_Massage.emitList(param);
      },
      msgList: function (cb) {
        YS_Massage.list(cb);
      },
      msgIsnotified: function (param) {
        YS_Massage.isnotified(param);
      },
      msgisRead: function (param) {
        YS_Massage.isRead(param);
      },
      msgReadAll: function() {
        YS_Massage.readAll();
      },
      msgDelete: function(param) {
        YS_Massage.msgDelete(param);
      },
      msgCount: function (param) {
        YS_Massage.count(param);
      },
      msgRescount: function (cb) {
        YS_Massage.rescount(cb);
      },
      msgOnlineCount: function(param) {
          YS_Massage.olcount(param);
      },
      msgResOnlineCount: function(cb) {
          YS_Massage.res_olcount(cb);
      },
      msgOlUserList: function(param) {
          YS_Massage.oluserlist(param);
      },
      msgResOlUserList: function(cb) {
          YS_Massage.res_oluserlist(cb);
      },
      close: function () {
        YS_Massage.close();
      }
    };

  }

  function ysMessageCount(SocketServe) {
    var directive = {
      restrict: "AE",
      require: '?ngModel',
      template: '<span ng-if="MsgUnreadCount.unreadCount">{{MsgUnreadCount.unreadCount}}</span>',
      link: link
    };
    return directive;
    function link(scope, element, attrs, controller) {
      var vm = scope;
      SocketServe.msgCount(null); // 建立消息数量
      SocketServe.msgRescount(msgCount); // 接收消息数量
      function msgCount(count) {
        vm.MsgUnreadCount = count;
        vm.$apply();
      }
    }
  }

  // 消息指令
  function ysMessage(SocketServe, $timeout) {
    var directive = {
      restrict: "AE",
      require: '?ngModel',
      templateUrl: '../template/message/remindMessage.html',
      link: link
    };
    return directive;
    function link(scope, element, attrs, controller) {

      var vm = scope;
      SocketServe.msgNotify(msgFun); // 接收通知

      // 消息展示推送
      vm.SocketServe = {};
      vm.SocketServe.msg = [];

      // 定时器
      var timer = null;

      // 忽略单条
      vm.SocketMsgMowe = function (_id) {
        if (!_id) return;
        var arr = [];
        angular.forEach(vm.SocketServe.msg, function (v, k) {
          if (_id != v._id) {
            arr.push(v)
          }
        });
        vm.SocketServe.msg = arr
      };
        // 关闭消息小窗
        vm.msgBoxRemove = function() {
            vm.SocketServe.msg = [];
        }
      // 查看详细
      vm.SockctMsgCart = function (data) {
        SocketServe.msgisRead({ids: [data._id]});
        $timeout(function () {
          SocketServe.msgCount(null); // 重新建立消息数量
        }, 100)

        var content = data.content ? '<b>内容：</b>' + data.content + '<br />' : '';
        vm.msgData = data;

        $("#msgdialogs").dialog({
          autoOpen: false,
          width: 768,
          modal: true,
          buttons: [{
            text: "关闭",
            class: "gray_bg",
            click: function () {
              vm.msgData = {}
              $(this).dialog("close");
              $(".layer").hide();
            }
          }]
        });
        $("#msgdialogs").dialog("open");

      }
        // 切换
        var pre_switch = true;
        var nex_switch = true;
        vm.previousMsg = function() {
            if (!pre_switch) {return;}
            pre_switch = false;
            var cbox = $("#content-flex");

            // 当前第一条时点击无效
            if (cbox[0].offsetLeft === 0) {pre_switch = true;return;}
            var trans = cbox[0].offsetLeft + 308 + 'px';
            cbox.animate({
              'margin-left': trans
            }, 300, function() {
                pre_switch = true;
            });
        }
        // 下一条
        vm.nextMsg = function() {
            if (!nex_switch) {return;}
            nex_switch = false;
            var cbox = $("#content-flex");

            // 当前最后一条时点击无效
            if (cbox[0].offsetLeft === (vm.SocketServe.msg.length-1)* 308 * -1) {nex_switch = true;return;}
            var trans = cbox[0].offsetLeft - 308 + 'px';
            cbox.animate({
              'margin-left': trans
            }, 300, function() {
                nex_switch = true;
            });
        }
      // 接受通知处理
      function msgFun(msg) {
        SocketServe.msgCount(null); // 重新建立消息数量
        if (msg && msg.notify) {
          var arr = [];
          arr.push(msgArr(msg.notify));
          timeOutFun(arr);// 通知确认
        } else if (msg && msg.rst && msg.rst.data.unotifylist && msg.rst.data.unotifylist.length > 0) {
          var arr = [];
          angular.forEach(msg.rst.data.unotifylist, function (v, k) {
            var size = _.size(_.where(vm.SocketServe.msg, {_id: v._id}));
            if (size == 0) arr.push(msgArr(v))
          })
          timeOutFun(arr);// 通知确认
        }
        function msgArr(v) {
          return {
            _id: v._id,
            title: v.payload.body.title,
            content: v.payload.body.content,
            timestamp: v.timestamp
          }
        }

        vm.$apply();
      }

      // 消息接收定时器
      function timeOutFun(arr) {
        vm.SocketServe.msg = _.union(vm.SocketServe.msg, arr);
        // 修改容器长度
        var _len = vm.SocketServe.msg.length * 308;
        $("#content-flex").css("width", _len + 'px');

        SocketServe.msgIsnotified({ids: _.pluck(arr, '_id')}); // 通知确认
        // 设置定时移除
        _re();
        // 为每条消息设置定时移除
    //     angular.forEach(arr, function (v, k) {
    //       $timeout(function () {
    //         vm.SocketMsgMowe(v._id);
    //         vm.$apply();
    //       }, 10000)
      }


      // 光标hover时取消定时
      element.hover(function() {
          if(timer) {$timeout.cancel(timer);}
      }, function() {
          _re();
      });
      // 定时移除弹窗
      var _re = function() {
          if(timer) {$timeout.cancel(timer);}
          timer = $timeout(function () {
              vm.msgBoxRemove();
          }, 10000);
      }
    }
  }

  // css 动画
  function animationFun($animateCss) {
    return {
      enter: function (element) {
        return $animateCss(element, {
          from: {opacity: 0, height: 0},
          to: {opacity: 1, height: element.height()},
          duration: 0.3
        })
      },
      leave: function (element) {
        return $animateCss(element, {
          from: {opacity: 1, height: element.height()},
          to: {opacity: 0, height: 0},
          duration: 0.6
        });
      },
      move: function (element) {
        return $animateCss(element, {
          from: {opacity: 1, height: element.height()},
          to: {opacity: 0, height: 0},
          duration: 0.6
        });
      }
    }
  }

}());

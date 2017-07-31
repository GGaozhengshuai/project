/*
 * @Author: wenbo.Wang <wxl1314bobo@gmail.com>
 * @Date:  2017-01-18 17:55:03
 * @Last Modified by:   wenbo
 * @Last Modified time: 2017-01-18 17:55:03
 */
(function () {
    'use strict';

    var messageApp = angular.module('SocketMessageApp', ['pageDirectives','SocketMessageSDK']);
    // 字符串信任html
    messageApp.filter('to_trusted', ['$sce', function($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]);
    messageApp.service('messageAppServe', function($http, SocketServe) {
        var service = {
            // 消息任务列表
            listMessage: function(param) {
                return $http.post('/message/list',param ,{cache:false});
            },
            // 创建消息任务
            sendMessage: function(param){
                return $http.post('/message/create',param ,{cache:false});
            },
            // 取消单条消息任务
            changeMessage: function(param){
                return $http.post('/message/change',param ,{cache:false});
            },
            // 查看单条发送状态
            statusMessage: function(param){
                return $http.post('/message/status',param ,{cache:false});
            },
            // 我的消息
            listMyMessageEmit: function(param) {
                return SocketServe.msgEmitList(param);
            },
            listMyMessage: function(cb) {
                return SocketServe.msgList(cb);
            },
            // 全部设置为已读
            readAllMsg: function() {
                return SocketServe.msgReadAll();
            },
            // 根据登录名获取某个用户信息
            getUserInfo: function(param){
              return $http.post('/user/info',param ,{cache:false});
            },
            // 删除
            deleteMsg: function(param) {
                return SocketServe.msgDelete(param);
            },
            // 查看单条我的消息（设置已读）
            readMyMessage: function(param) {
                return SocketServe.msgisRead(param);
            },
            // 查找用户信息
            userGetByName: function(param) {
                return $http.post('/user/list',param ,{cache:false});
            },
        };
        return service;
    });
    // 消息任务管理 @wenbo add sendMessageCtrl 2017/01/18
    messageApp.controller('sendMessageCtrl', ['$rootScope', '$scope', 'messageAppServe', 'locals', 'SocketServe', function($rootScope, $scope, service, locals, SocketServe) {
        var vm = $scope;
        function MsgFun(service,locals) {
            this.service = service;
            this.locals = locals;
        }
        MsgFun.prototype = {
            // 获取当前用户信息
            userInfo: function () {
                return this.locals.getObject('persion')
            },
            // 初始 form表单数据
            frmData: function() {
                return {
                    senderName: this.userInfo().username,
                    sender: {
                        _id : this.userInfo().user._id,
                        login : this.userInfo().user.login,
                        name : this.userInfo().user.name,
                        orgid : this.userInfo().user.orgid,
                        orgname : this.userInfo().user.orgname,
                    },
                    // newTime: this.formatDate(new Date().setDate(new Date().getDate()), 'yyyy-MM-dd HH:ss:mm')
                    sendtype: 'broadcast'
                }
            },
            // 发送
            sendMsg : function (obj) {
                if(!obj.title || !obj.content || (obj.sendtype == 'listcast' && !_.size(obj.receivers) )){
                    var _title = !obj.title ? '请填写标题\n' : '';
                    var _content = !obj.content ? '请填写内容\n' : '';
                    var _receivers = obj.sendtype == 'listcast' && !_.size(obj.receivers) ? '请填选择接收对象' : '';

                    swal("", _title + _content + _receivers, "error");
                    return;
                }
                var tmpObj = angular.copy(obj);
                tmpObj.content = tmpObj.content.replace(/[\r\n]/g, '<br/>')
                var sendMessage = this.service.sendMessage(tmpObj);
                sendMessage.success(function(data){
                    if((data != undefined && data != null) && (data.code != undefined &&  data.code != null) && data.code == 200){
                        vm.search();
                    } else {
                        var _msg = data.msg || "操作失败";
                        swal("", _msg, "error");
                    }
                }).error(function(error){
                    console.log(error)
                });
            },
            // 预览
            showMsg : function (obj) {
                if(!obj.title || !obj.content || (obj.sendtype == 'listcast' && !_.size(obj.receivers) )){
                    var _title = !obj.title ? '请填写标题\n' : '';
                    var _content = !obj.content ? '请填写内容\n' : '';
                    var _receivers = obj.sendtype == 'listcast' && !_.size(obj.receivers) ? '请填选择接收对象' : '';

                    swal("", _title + _content + _receivers, "error");
                    return;
                }

                var tmpObj = angular.copy(obj);
                tmpObj.content = tmpObj.content.replace(/[\r\n]/g, '<br />');
                vm.msgData = tmpObj;

                $( "#msgdialog" ).dialog({
                    autoOpen: false,
                    width: 768,
                    modal: true,
                    buttons: [{
                        text: "关闭",
                        class: "gray_bg",
                        click: function() {
                            vm.msgData = {}
                            $( this ).dialog( "close" );
                            $(".layer").hide();
                        }
                    }]
                });
                $( "#msgdialog" ).dialog( "open" );

            },
            // 根据用户姓名搜索用户
            userGetByName: function (name) {
                if(!name) {vm.userDataList = {};return}
                var req = {limit:"10",name:name,orgid:"",page:1}
                var statusMessage = service.userGetByName(req);
                statusMessage.success(function(data){
                    vm.userDataList = data.rst.data.items;
                }).error(function(error){
                    alert(error);
                });
            },
            // 选择对象用户
            receiversFun: function (list) {
                vm.frmData.receivers  = _.union(vm.frmData.receivers,[list]);
                vm.frmData.receiversName = list.name
            },
            // 删除单条对象
            delReceivers: function (data) {
                if(!data) return
                var arr = vm.frmData.receivers  = _.reject(vm.frmData.receivers, function(v){console.log(data,v._id); return v._id == data; });
            },
            // 获取数据列表
            paginationConf : function () {
                var that = this;
                var Conf = {
                    currentPage: 1,
                    itemsPerPage: 20,
                    numberOfPage:0,
                    pagesLength: 15,
                    perPageOptions: [5,10, 20, 30, 40, 50],
                    pagePromise:{},
                    onChange: function(){
                        var param  = {page:this.currentPage, limit:this.itemsPerPage, user:that.userInfo().user._id};
                        var msgPromise = that.service.listMessage(param);
                        this.pagePromise = msgPromise;
                    }
                }
                return Conf;
            },
            viewMsg: function (data) {
                var that = this;
                if(!data.msg_id){
                    // swal("", "消息不存在", "error");
                    var _data = null;
                    that.viewSwal(_data,data);
                    return
                }
                var statusMessage = service.statusMessage({"msg_id":data.msg_id});
                statusMessage.success(function(_data){
                    that.viewSwal(_data,data);
                }).error(function(error){
                    alert(error);
                });
            },
            viewSwal: function (_data,data) {
                var isnotify = _data && _data.rst.data.isnotify ? _data.rst.data.isnotify : 0;
                var unnotify = _data && _data.rst.data.unnotify ? _data.rst.data.unnotify : 0;
                var nowTime = new Date().getTime();
                var endTime = data.end_time ? new Date(data.end_time).getTime() : "";

                var receiversList = data.sendtype == 'broadcast' ? '' :_.pluck(data.receivers, 'name').join();
                var content = data.content ? '<b>内容：</b>' + data.content + '<br />' : '';
                var sendtype = data.sendtype == 'broadcast' ? '<br /><b>类型：广播</b><br />' : '<br /><b>类型：单播、列播；接收对象：'+receiversList+'</b><br />';
                var start_time = data.start_time ? '<b>开始时间：</b>'+ this.formatDate(data.start_time, 'yyyy-MM-dd HH:ss:mm') + '<br />': '';
                var end_time = data.end_time ? '<b>结束时间：</b>'+ this.formatDate(data.end_time, 'yyyy-MM-dd HH:ss:mm') + '<br />': '';

                swal({
                        title: data.title ? data.title : '',
                        text: '<span class="MsgAlert">  '+content + sendtype + start_time + end_time + "<br/>已发送（<b>"+isnotify+"</b>），未发送（<b>"+unnotify+"</b>）</span>",
                        type: null,
                        html:true,
                        showCancelButton: true,
                        showConfirmButton: (data.msg_id && data.status == 1 && end_time && nowTime < endTime && unnotify) || (data.msg_id && data.status == 1 && !data.end_time && unnotify) ? true : false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "取消任务",
                        cancelButtonText: "关闭窗口",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            var obj = {"status":"0","id":data._id,"msg_id":data.msg_id}
                            var changeMessage = service.changeMessage(obj);
                            changeMessage.success(function(data){
                                if(data.code == 200){
                                    swal("成功!", "任务已取消", "success");
                                    vm.search();
                                }
                            }).error(function(error){
                                alert(error);
                            });

                        }
                    });

            },
            //时间格式化
            formatDate : function(time, format) {
                var t = new Date(time);
                var tf = function(i) {
                    return (i < 10 ? '0' : '') + i
                };
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
                    switch (a) {
                        case 'yyyy':
                            return tf(t.getFullYear());
                            break;
                        case 'MM':
                            return tf(t.getMonth() + 1);
                            break;
                        case 'mm':
                            return tf(t.getMinutes());
                            break;
                        case 'dd':
                            return tf(t.getDate());
                            break;
                        case 'HH':
                            return tf(t.getHours());
                            break;
                        case 'ss':
                            return tf(t.getSeconds());
                            break;
                    }
                })
            }
        }
        vm.pageClass = 'sendMessage';
        var MsgFun = new MsgFun(service, locals);
        vm.MsgFun = MsgFun;
        vm.frmData = MsgFun.frmData();
        vm.frmData.receivers = [];
        vm.userGetByName = MsgFun.userGetByName;
        vm.delReceivers = MsgFun.delReceivers;
        vm.paginationConf = MsgFun.paginationConf();
        vm.sendtypeFn = function () {
            vm.frmData.receivers = '';
            vm.frmData.start_time = '';
            vm.frmData.end_time = '';
            vm.frmData.receivers = {};
        }
        vm.receiversFun = MsgFun.receiversFun;
  }]);

    // 消息任务详细 @wenbo add listMessageCtrl 2017/01/18
    messageApp.controller('viewMessageCtrl', ['$rootScope', '$scope', '$stateParams', 'messageAppServe', 'locals', function ($rootScope, $scope, $stateParams, service, locals) {
        var vm = $scope;
        var viewUser = service.viewMessage({_id: $stateParams.id});
        viewUser.success(function (data) {
            if (data.code == 200) {
                $scope.ORDER_DATA = data.rst.data;
            }
        }).error(function (error) {
            alert(error);
        });
    }]);


  // 我的消息 @wenbo add listMessageCtrl 2017/01/18
    messageApp.controller('listMessageCtrl', ['$q', '$rootScope', '$scope', '$timeout', 'messageAppServe', 'locals', 'SocketServe', function ($q, $rootScope, $scope, $timeout, service, locals, SocketServe) {
        var vm = $scope;
        var checked_msg = [];
        vm.msgCheck = false;

        function MsgFun(service, locals) {
            this.service = service;
            this.locals = locals;
        }

        MsgFun.prototype = {
            // 获取数据列表
            paginationConf: function () {
                var that = this;
                var Conf = {
                    currentPage: 1,
                    itemsPerPage: 20,
                    numberOfPage: 0,
                    pagesLength: 15,
                    perPageOptions: [5, 10, 20, 30, 40, 50],
                    pagePromise: {},
                    onChange: function () {
                        var param = {page: this.currentPage, limit: this.itemsPerPage};
                        that.service.listMyMessageEmit(param);
                        this.pagePromise = {
                            success: that.service.listMyMessage
                        };
                        // 清空已选项
                        checked_msg = [];
                        vm.msgCheck = false;
                    }
                }
                return Conf;
            },
            viewMsg: function (data) {
                service.readMyMessage({ids: [data._id]});
                $timeout(function () {
                    SocketServe.msgCount(null); // 重新建立消息数量
                }, 100)

                var content = data.payload.body.content ? '<b>内容：</b>' + data.payload.body.content + '<br />' : '';
                vm.msgData = data;

                $("#msgdialog").dialog({
                    autoOpen: false,
                    width: 768,
                    modal: true,
                    buttons: [{
                        text: "关闭",
                        class: "gray_bg",
                        click: function () {
                            vm.msgData = {}
                            $(this).dialog("close");
                            $(".ui-dialog").remove();
                        }
                    }]
                });
                $("#msgdialog").dialog("open");
                this.paginationConf.onChange();
            },
            // 标记选中项为已读
            batchRead: function() {
                var self = this;
                service.readMyMessage({ids: checked_msg});
                $timeout(function () {
                    self.paginationConf.onChange();
                    SocketServe.msgCount(null); // 重新建立消息数量
                }, 100);
            },
            // 标记全部已读
            batchAllRead: function() {
                var self = this;
                service.readAllMsg();
                $timeout(function() {
                    self.paginationConf.onChange();
                    SocketServe.msgCount(null); //重新建立消息数量
                }, 100);
            },
            batchDel: function() {
                var self = this;
                service.deleteMsg({ids: checked_msg});
                $timeout(function() {
                    self.paginationConf.onChange();
                    SocketServe.msgCount(null);
                }, 100);
            },
            //全选
            selectAll: function($event) {
                checked_msg = [];
                if ($event.target.checked) {
                    for (var i = 0; i < vm.dataList.length; i++) {
                        checked_msg.push(vm.dataList[i]._id);
                    }
                }
                vm.msgCheck = $event.target.checked && checked_msg.length === vm.dataList.length ? true : false;
            },
            //单选
            selectOne: function($event, list) {
                if ($event.target.checked) {
                    checked_msg.push(list._id);
                }else{
                    for (var i = 0; i < checked_msg.length; i++) {
                        if (checked_msg[i] === list._id) {
                            checked_msg.splice(i, 1);
                            break;
                        }
                    }
                }
            },
        }
        vm.pageClass = 'sendMessage messageList';
        var MsgFun = new MsgFun(service, locals);
        vm.paginationConf = MsgFun.paginationConf();
        vm.viewMsg = MsgFun.viewMsg;

        //message勾选
        vm.selectAll = MsgFun.selectAll;
        vm.selectOne = MsgFun.selectOne;

        //标记已读
        vm.batchRead = MsgFun.batchRead;
        //全部标记已读
        vm.batchAllRead = MsgFun.batchAllRead;
        //删除
        vm.batchDel = MsgFun.batchDel;
    }]);

    messageApp.directive('msgpagination', ['messageService',
        function (messageService) {
            return {
                restrict: 'EA',
                template: '<div class="pagination">' +
                '<span ng-show="conf.totalItems > 0" class="totalItem">共{{conf.totalItems}}条记录</span>' +

                '<ul class="pageNum"  ng-show="conf.totalItems > 0">' +
                '<li class="selPer">' +
                '<span>每页显示</span>' +
                '<select ng-change="changeItemsPerPage(itemsPerPage)" ng-model="itemsPerPage" ng-init="itemsPerPage=conf.itemsPerPage+\'\'" >' +
                '<option ng-repeat="x in conf.perPageOptions" value="{{x}}">{{x}}</option>' +
                '</select>' +
                '<span>条</span>' +
                '</li>' +
                '<li ng-click="prevPage()" ng-class="{disabled:conf.currentPage == 1}">' +
                '<a href="javascript:;">前一页</a>' +
                '</li>' +
                '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}">' +
                '<a href="javascript:;" class="paginate_button active" ng-click="changeCurrentPage(item)">{{item}}</a>' +
                '</li>' +
                '<li ng-class="{disabled: conf.currentPage == conf.numberOfPage}">' +
                '<a href="javascript:;" ng-click="nextPage()">后一页</a>' +
                '</li>' +
                '</ul>' +
                '</div>',
                replace: true,
                scope: {
                    conf: '='
                },
                link: function (scope, element, attrs) {
                    if (scope.conf.onChange && !attrs.manual) {
                        scope.conf.onChange();
                    }
                    scope.getPageList = function () {

                        var pagePromise = scope.conf.pagePromise;
                        pagePromise.success(function (data) {
                            if (data.code == 200) {
                                if (data.rst.doc) {

                                    scope.$parent.dataList = data.rst.doc.items;

                                    // scope.$parent.searcher = data.data["searcher"];
                                    scope.conf.numberOfPage = data.rst.doc.totalpage;
                                    scope.conf.totalItems = data.rst.doc.total;
                                } else {
                                    scope.$parent.dataList = data.rst.data.items;
                                    // scope.$parent.searcher = data.data["searcher"];
                                    scope.conf.numberOfPage = data.rst.data.totalpage;
                                    scope.conf.totalItems = data.rst.data.total;
                                }

                                scope.pageList = [];
                                if (scope.conf.numberOfPage <= scope.conf.pagesLength) {
                                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                                    for (var i = 1; i <= scope.conf.numberOfPage; i++) {
                                        scope.pageList.push(i);
                                    }
                                    [{a: {}}, {}, {}]
                                } else {
                                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                                    // 计算中心偏移量
                                    var offset = Math.ceil((scope.conf.pagesLength - 1) / 2); //添加向上取整

                                    if (scope.conf.currentPage <= offset) {
                                        // 左边没有...
                                        for (i = 1; i <= offset + 1; i++) {
                                            scope.pageList.push(i);
                                        }
                                        scope.pageList.push('...');
                                        scope.pageList.push(scope.conf.numberOfPage);
                                    } else if (scope.conf.currentPage > scope.conf.numberOfPage - offset) {
                                        scope.pageList.push(1);
                                        scope.pageList.push('...');
                                        for (i = offset + 1; i >= 1; i--) {
                                            scope.pageList.push(scope.conf.numberOfPage - i);
                                        }
                                        scope.pageList.push(scope.conf.numberOfPage);
                                    } else {
                                        // 最后一种情况，两边都有...
                                        scope.pageList.push(1);
                                        scope.pageList.push('...');

                                        for (i = Math.ceil(offset / 2); i >= 1; i--) {
                                            scope.pageList.push(scope.conf.currentPage - i);
                                        }
                                        scope.pageList.push(scope.conf.currentPage);
                                        for (i = 1; i <= offset / 2; i++) {
                                            scope.pageList.push(scope.conf.currentPage + i);
                                        }

                                        scope.pageList.push('...');
                                        scope.pageList.push(scope.conf.numberOfPage);
                                    }
                                }
                                scope.$apply();
                            } else {
                                messageService.publish('notifyMessage', ["获取列表失败！", "error"]);
                            }

                        })
                    };
                    // 默认自动加载列表
                    !attrs.manual && scope.getPageList();
                    scope.changeCurrentPage = function (item) {
                        if (item == '...') {
                            return;
                        } else {
                            scope.conf.currentPage = item;
                        }
                        scope.conf.onChange();
                        scope.getPageList();
                    };

                    scope.prevPage = function () {
                        if (scope.conf.currentPage > 1) {
                            scope.conf.currentPage -= 1;
                            scope.conf.onChange();
                            scope.getPageList();
                        }
                    }

                    scope.nextPage = function () {
                        if (scope.conf.currentPage < scope.conf.numberOfPage) {
                            scope.conf.currentPage += 1;
                            scope.conf.onChange();
                            scope.getPageList();
                        }
                    };

                    scope.changeItemsPerPage = function (pagesLength) {
                        scope.conf.currentPage = 1;
                        scope.conf.itemsPerPage = pagesLength;
                        scope.conf.onChange();
                        scope.getPageList();
                    };
                    scope.$parent.search = function () {
                        scope.conf.currentPage = 1;
                        scope.conf.itemsPerPage = scope.itemsPerPage;
                        // scope.conf.itemsPerPage=10;
                        var changeover = scope.conf.onChange();
                        !changeover && scope.getPageList();
                    };

                    //scope.$parent.reset = function(){
                    //    scope.$parent.searcher = {};
                    //    scope.conf.currentPage=1;
                    //    scope.conf.itemsPerPage=10;
                    //    scope.conf.onChange();
                    //    scope.getPageList();
                    //}

                    scope.$parent.first = function () {
                        scope.conf.currentPage = 1;
                        scope.conf.itemsPerPage = 20;
                        scope.conf.onChange();
                        scope.getPageList();
                    }
                }
            }
        }
    ]);
}());

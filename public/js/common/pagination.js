var pageDirectives = angular.module('pageDirectives', []);

pageDirectives.directive('pagination', ['messageService',
    function(messageService) {
        return{
            restrict: 'EA',
            template:'<div class="pagination">'+
            '<span ng-show="conf.totalItems > 0" class="totalItem">共{{conf.totalItems}}条记录</span>'+
            '<ul class="pageNum"  ng-show="conf.totalItems > 0">'+
            '<li class="selPer">'+
            '<span>每页显示</span>'+
            '<select ng-change="changeItemsPerPage(itemsPerPage)" ng-model="itemsPerPage" ng-init="itemsPerPage=conf.itemsPerPage+\'\'" >'+
            '<option ng-repeat="x in conf.perPageOptions" value="{{x}}">{{x}}</option>'+
            '</select>'+
            '<span>条</span>'+
            '</li>'+
            '<li ng-click="prevPage()" ng-class="{disabled:conf.currentPage == 1}">'+
            '<a href="javascript:;">前一页</a>'+
            '</li>'+
            '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}">'+
            '<a href="javascript:;" class="paginate_button active" ng-click="changeCurrentPage(item)">{{item}}</a>'+
            '</li>'+
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPage}">'+
            '<a href="javascript:;" ng-click="nextPage()">后一页</a>'+
            '</li>'+
            '</ul>'+
            '</div>',
            replace:true,
            scope:{
                conf:'='
            },
            link:function(scope, element, attrs){
                if(scope.conf.onChange && !attrs.manual){
                    scope.conf.onChange();
                }
                scope.getPageList = function(){

                    var pagePromise = scope.conf.pagePromise;
                    pagePromise.success(function(data){

                        if(data.code == 200){
                            if(data.rst.doc){

                                scope.$parent.dataList = data.rst.doc.items;

                                // scope.$parent.searcher = data.data["searcher"];
                                scope.conf.numberOfPage = data.rst.doc.totalpage;
                                scope.conf.totalItems = data.rst.doc.total;
                            }else{
                                scope.$parent.dataList = data.rst.data.items;
                                // scope.$parent.searcher = data.data["searcher"];
                                scope.conf.numberOfPage = data.rst.data.totalpage;
                                scope.conf.totalItems = data.rst.data.total;
                            }

                            scope.pageList = [];
                            if(scope.conf.numberOfPage <= scope.conf.pagesLength){
                                // 判断总页数如果小于等于分页的长度，若小于则直接显示
                                for(var i =1; i <= scope.conf.numberOfPage; i++){
                                    scope.pageList.push(i);
                                }[{a:{}},{},{}]
                            }else{
                                // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                                // 计算中心偏移量
                                var offset = Math.ceil((scope.conf.pagesLength - 1)/2); //添加向上取整

                                if(scope.conf.currentPage <= offset){
                                    // 左边没有...
                                    for(i =1; i <= offset +1; i++){
                                        scope.pageList.push(i);
                                    }
                                    scope.pageList.push('...');
                                    scope.pageList.push(scope.conf.numberOfPage);
                                }else if(scope.conf.currentPage > scope.conf.numberOfPage - offset){
                                    scope.pageList.push(1);
                                    scope.pageList.push('...');
                                    for(i = offset + 1; i >= 1; i--){
                                        scope.pageList.push(scope.conf.numberOfPage - i);
                                    }
                                    scope.pageList.push(scope.conf.numberOfPage);
                                }else{
                                    // 最后一种情况，两边都有...
                                    scope.pageList.push(1);
                                    scope.pageList.push('...');

                                    for(i = Math.ceil(offset/2) ; i >= 1; i--){
                                        scope.pageList.push(scope.conf.currentPage - i);
                                    }
                                    scope.pageList.push(scope.conf.currentPage);
                                    for(i = 1; i <= offset/2; i++){
                                        scope.pageList.push(scope.conf.currentPage + i);
                                    }

                                    scope.pageList.push('...');
                                    scope.pageList.push(scope.conf.numberOfPage);
                                }
                            }
                        }else{
                            messageService.publish('notifyMessage',["获取列表失败！","error"]);
                        }

                    }).error(function(error){
                        messageService.publish('notifyMessage',["获取列表失败！","error"]);
                    });
                };
                // 默认自动加载列表
                !attrs.manual && scope.getPageList();
                scope.changeCurrentPage = function(item){
                    if(item == '...'){
                        return;
                    }else{
                        scope.conf.currentPage = item;
                    }
                    scope.conf.onChange(scope.args);
                    scope.getPageList();
                };

                scope.prevPage = function(){
                    if(scope.conf.currentPage > 1){
                        scope.conf.currentPage -= 1;
                        scope.conf.onChange(scope.args);
                        scope.getPageList();
                    }
                }

                scope.nextPage = function(){
                    if(scope.conf.currentPage < scope.conf.numberOfPage){
                        scope.conf.currentPage += 1;
                        scope.conf.onChange(scope.args);
                        scope.getPageList();
                    }
                };

                scope.changeItemsPerPage = function(pagesLength){
                    scope.conf.currentPage=1;
                    scope.conf.itemsPerPage = pagesLength;
                    scope.conf.onChange(scope.args);
                    scope.getPageList();
                };
                scope.$parent.search = function(){
                    scope.conf.currentPage=1;
                    scope.conf.itemsPerPage=scope.itemsPerPage;
	                // console.log(scope.conf.itemsPerPage, 'bbb')
                    // scope.conf.itemsPerPage=10;
	                //2017-2-24 判断有没有参数
	                if(arguments.length>0) {
		                scope.args = arguments;
	                }
                    var changeover = scope.conf.onChange(arguments);
                    !changeover && scope.getPageList();
                };

                //scope.$parent.reset = function(){
                //    scope.$parent.searcher = {};
                //    scope.conf.currentPage=1;
                //    scope.conf.itemsPerPage=10;
                //    scope.conf.onChange();
                //    scope.getPageList();
                //}

                scope.$parent.first = function(){
                    scope.conf.currentPage=1;
                    scope.conf.itemsPerPage=20;
                    scope.conf.onChange(scope.args);
                    scope.getPageList();
                }
            }
        }
    }
]);
/*
angular.module('pageDirective', []).directive('pagination',['messageService',function(messageService){

}]);*/

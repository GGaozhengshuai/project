var docManageApp = angular.module('docManageApp', ['pageDirectives', 'ngFileUpload']);

docManageApp.service('docManageServices', function ($http) {
    var service = {
        docExists: function (param) {
            return $http.post('/docmanage/docexists', param, {cache: false});
        },
        billExists: function (param) {
            return $http.post('/docmanage/billexists', param, {cache: false});
        },
        doSearch: function (param) {
            return $http.post('/docmanage/search', param, {cache: false});
        },
        docType: function (param) {
            return $http.post('/docmanage/doctype', param);
        },
        docMgrUrl: function (param) {
            return $http.post('/docmanage/docmgrurl', param);
        },
        saleorglist: function (param) {          //获取销售部门
            return $http.post('/org/saleorglist', param, {cache: false});
        },
    };
    return service;
})

docManageApp.directive("limitTo", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("propertychange keyup keypress change paste", function (e) {
                if (this.value.length >= limit) e.preventDefault();
            });
        }
    }
}]);

docManageApp.controller('docManageListCtrl', ['$scope', '$http', '$rootScope', '$filter', '$stateParams', 'docManageServices', 'Upload', function ($scope, $http, $rootScope, $filter, $stateParams, service, Upload) {
    /*  separator = "_";
     displaySeparator = "、";
     dataSeparator = ",";
     cacheSeparator = "#";
     qualifiedDocTypeMap = {};*/
    docmgrurl = {};
    docTypeNameCodeMap = {};
    /*  docTypeShortnameCodeMap = {}
     docTypeShortnameNameMap = {}
     docTypeShortnameKeyMap = {}
     docTypeShortnameSearchkeyMap = {}*/

    $scope.initPage = function () {
        checkLogin();
        initDocTypeConf();
        initDocMgrUrlConf();
        //if ($stateParams.code) {
        //    if ($stateParams.code.indexOf('SON') > -1 || $stateParams.code.indexOf('CYSO') > -1) {
        //        $scope.doc_name = '销售_' + $stateParams.code;
        //        search();
        //    } else {
        //        $scope.doc_name = '采购_' + $stateParams.code;
        //        search();
        //    }
        //
        //}
    }
    /**
     * 检查登录
     * @returns {boolean}
     */
    checkLogin = function () {
        var loginPerson = $rootScope.loginPerson;
        if (isEmptyObject(loginPerson)) {//session中的user会长时间存在
            swal('', '登录用户为空，需要重新登录', 'error');
            return false;
        }
        return true;
    }

    /**
     * 初始化文档类型配置
     * @param cb
     */
    initDocTypeConf = function () {
        var doc_type = service.docType();
        doc_type.success(function (data) {
                if (data.code == 200) {
                    /* if (notNull(data.rst.qualifiedDocTypeMap)) {
                     qualifiedDocTypeMap = data.rst.qualifiedDocTypeMap;
                     }*/
                    if (notNull(data.rst.docTypeNameCodeMap)) {
                        docTypeNameCodeMap = data.rst.docTypeNameCodeMap;
                        $scope.doc_type = docTypeNameCodeMap;
                    }
                    /*   if (notNull(data.rst.docTypeShortnameCodeMap)) {
                     docTypeShortnameCodeMap = data.rst.docTypeShortnameCodeMap;
                     }
                     if (notNull(data.rst.docTypeShortnameNameMap)) {
                     docTypeShortnameNameMap = data.rst.docTypeShortnameNameMap;
                     }
                     if (notNull(data.rst.docTypeShortnameKeyMap)) {
                     docTypeShortnameKeyMap = data.rst.docTypeShortnameKeyMap;
                     }
                     if (notNull(data.rst.docTypeShortnameSearchkeyMap)) {
                     docTypeShortnameSearchkeyMap = data.rst.docTypeShortnameSearchkeyMap;
                     }*/
                } else {
                    swal('', '壳系统提示：' + data.msg + " 可能需要重新登录。", "error");
                }
            }
        )
    }

    /**
     * 初始化文档管理服务器地址配置
     * @returns {*}
     */
    initDocMgrUrlConf = function () {
        var url = service.docMgrUrl();//获取搜索服务器地址
        url.success(function (data) {
            if (data.code == 200) {
                if (notNull(data.rst.docmgrurl) && Object.keys(data.rst.docmgrurl).length) {
                    docmgrurl = data.rst.docmgrurl;
                    if (!notNull(docmgrurl.searchserver)) {
                        swal("", "搜索服务器配置为空，请检查配置", "warning");
                    }
                    if (!notNull(docmgrurl.fileserver)) {
                        swal("", "文件服务器配置为空，请检查配置", "warning");
                    }
                } else {
                    swal("", "服务器配置为空，请检查配置", "warning");
                }
            } else {
                swal('', '壳系统提示：' + data.msg + " 可能需要重新登录。", "error");
            }
        })
    }

    /**
     * 判断是否为空
     * @param obj
     * @returns {boolean}
     */
    notNull = function (obj) {
        return typeof obj != undefined && obj != 'undefined' && obj != null && obj != 'null';
    }

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    notEmpty = function (obj) {
        return notNull(obj) && obj != '';
    }

    isEmptyObject = function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    }

    /**
     * 构造查询条件：形如：q=id:SOQT-demo-其他.pdf AND uploader_name:刘迪
     * 注意：AND为大写，也可写成&&
     */
    buildConditions = function () {
        var conditions = [];
        var hasConditions = false;
        if (notEmpty($scope.selectedDocType)) {
            conditions.push('dm_doc_type_code:' + $scope.selectedDocType);
            hasConditions = true;
        }
        if (notEmpty($scope.doc_name)) {
            conditions.push('dm_doc_name:*' + $scope.doc_name + '*');
            hasConditions = true;
        }
        if (notEmpty($scope.dep_name)) {
            conditions.push('dm_bill_orgname:' + $scope.dep_name);
            hasConditions = true;
        }
        if (notEmpty($scope.uploader_name)) {
            conditions.push('dm_uploader_name:' + $scope.uploader_name);
            hasConditions = true;
        }
        if (notEmpty($scope.what)) {
            conditions.push($scope.what);
            hasConditions = true;
        }

        if (!hasConditions) {
            swal('', '查询条件不为空', 'warning');
            return false;
        }

        return conditions.join(" AND ");

    }

    search = function () {
        //if ($scope.docmgrSearchForm.what.$dirty) {
        //    if ($scope.docmgrSearchForm.what.$error.minlength) {
        //        //
        //    }
        //    if ($scope.docmgrSearchForm.what.$error.maxlength) {
        //        swal('查询内容不超过100个字符', '', 'error');
        //        return false;
        //    }
        //}
        var conditions = buildConditions();
        if (conditions) {
            var param = {
                pageNumber: $scope.paginationConf.currentPage,
                rowsPerPage: $scope.paginationConf.itemsPerPage,
                conditions: conditions
            }
            var promise = service.doSearch(param);
            promise.success(function (data) {
                if (notNull(data)) {
                    if (data.code == 40) {
                        swal('', data.msg, "warning");
                    } else if (data.code == 400) {
                        swal('查询搜索服务器出错', data.msg, "error");
                    } else if (data.code != 200) {
                        swal('', '壳系统提示：' + data.msg + " 可能需要重新登录。", "error");
                    }
                    if (notNull(data.rst.data) && notNull(data.rst.data.items) && notNull(data.rst.data.items.length) && data.rst.data.items.length == 0) {
                        $scope.doc_info = '没有找到文档';
                    }
                }

                //点击分页下一页取消全选按钮选中状态
                var allcheck = $("#allcheck");
                allcheck.removeAttr("checked");

                $scope.dataList=data.rst.data.items;
                if($scope.dataList.length > $scope.paginationConf.itemsPerPage){
                    $scope.dataList.forEach(function(item){
                        item.checkAll = false;
                    })
                }
            });
            $scope.paginationConf.pagePromise = promise;
        }
    }

    $scope.checkSelect = function (idx) {
        var parent = $("#billTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
        } else {
            check.removeAttr("checked");
        }
    }

    $scope.allCheck = function () {
        var check = $("#allcheck");
        $scope.checkAll= check.checked ? true : false;
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
            $scope.dataList.forEach(function(item){
                item.checkAll=true;
            })
        } else {
            check.removeAttr("checked");
            $scope.dataList.forEach(function(item){
                item.checkAll=false;
            })
        }
    }

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    $scope.downloaddocs = function () {
        var cArr = [];
        var check = $('.checkBox');
        for (var i = 0;i<check.length;i++){
            if (check[i].checked == true){
                cArr.push($scope.dataList[i].dm_upload_file_path);
            }
        }

        if (cArr.length == 0) {
            swal("请选择数据！", "", "warning");
            return false;
        }
        var params = {
            files: cArr,
        }
        if (!cArr.length<1){
            $http({
                method: 'POST',
                url: docmgrurl.fileserver + '/download',
                command: 'pack',
                data: params,
                responseType: 'arraybuffer'
            }).then(function successCallback(data) {
                if (notNull(data)){
                    if (data.status == 200 ){
                        var file = new Blob([data.data], { type: 'application/x-zip-compressed' });
                        var fileURL = URL.createObjectURL(file);
                        var time = new Date().Format("yyyy年MM月dd日 hh时mm分ss秒");
                        var name = '文档批量下载'+time+'.zip'
                        var a  = document.createElement('a');
                        a.href = fileURL;
                        a.target = '_blank';
                        a.download = name;
                        document.body.appendChild(a);
                        a.click();
                    }else {
                        swal("批量下载出错", data.statusText, "error");
                    }
                }else {
                    swal("请求下载失败！", "未知错误", "error");
                }
            },function errorCallback(response) {
                swal("请求下载失败！", "", "error");
            });
        }
    }

    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            search();
        }
    }

    var purchaseObj = {            //采购订单的采购组织
        '20':{orgname : '信息产品事业群'},
        '21':{orgname : '进出口公司采购组织'},
        '22':{orgname : '中建材香港公司采购组织'},
        '23':{orgname : 'Einkaufsorg. 0001'}
    }
    var saleorglist = service.saleorglist({});
    saleorglist.success(function (data) {
        if (data.code == 200) {
            $scope.getSalesorgnanme = _.extend(data.rst.data,purchaseObj);
        } else {
            swal(data.msg, "", "warning");
        }
    }).error(function (data) {
        alert(data);
    });
}
])
;

//上传文档controller
docManageApp.controller('docManageUploadCtrl', ['$scope', '$http', '$rootScope', '$filter', 'docManageServices', 'Upload', function ($scope, $http, $rootScope, $filter, service, Upload) {
    separator = "_";
    displaySeparator = "、";
    dataSeparator = ",";
    cacheSeparator = "#";
    wildcard = "*";
    orgnameMap = {};
    qualifiedDocTypeMap = {};
    docmgrurl = {};
    // docTypeNameCodeMap = {};
    docTypeShortnameCodeMap = {}
    docTypeShortnameNameMap = {}
    docTypeShortnameKeyMap = {}
    docTypeShortnameSearchkeyMap = {}

    $scope.initPage = function () {
        checkLogin();
        initDocTypeConf();
        initDocMgrUrlConf();
    }

    var validateOK = [];//记录页面显示的校验通过的文件
    var validateExists = [];//记录页面显示的已存在的文件
    var validateError = [];//记录页面显示的校验失败的文件

    /**
     * 检查登录
     * @returns {boolean}
     */
    checkLogin = function () {
        var loginPerson = $rootScope.loginPerson;
        if (isEmptyObject(loginPerson)) {//session中的user会长时间存在
            swal('', '登录用户为空，需要重新登录', 'error');
            return false;
        }
        return true;
    }

    /**
     * 初始化文档类型配置
     * @param cb
     */
    initDocTypeConf = function () {
        var doc_type = service.docType();
        doc_type.success(function (data) {
                if (data.code == 200) {
                    if (notNull(data.rst.qualifiedDocTypeMap)) {
                        qualifiedDocTypeMap = data.rst.qualifiedDocTypeMap;
                    }
                    /*
                     if (notNull(data.rst.docTypeNameCodeMap)) {
                     docTypeNameCodeMap = data.rst.docTypeNameCodeMap;
                     }*/
                    if (notNull(data.rst.docTypeShortnameCodeMap)) {
                        docTypeShortnameCodeMap = data.rst.docTypeShortnameCodeMap;
                    }
                    if (notNull(data.rst.docTypeShortnameNameMap)) {
                        docTypeShortnameNameMap = data.rst.docTypeShortnameNameMap;
                    }
                    if (notNull(data.rst.docTypeShortnameKeyMap)) {
                        docTypeShortnameKeyMap = data.rst.docTypeShortnameKeyMap;
                    }
                    if (notNull(data.rst.docTypeShortnameSearchkeyMap)) {
                        docTypeShortnameSearchkeyMap = data.rst.docTypeShortnameSearchkeyMap;
                    }
                } else {
                    swal('', '壳系统提示：' + data.msg + " 可能需要重新登录。", "error");
                    $scope.docmgrUploadForm.invalid = true;
                }
            }
        )
    }

    /**
     * 初始化文档管理服务器地址配置
     * @returns {*}
     */
    initDocMgrUrlConf = function () {
        var url = service.docMgrUrl();//获取搜索服务器地址
        url.success(function (data) {
            if (data.code == 200) {
                if (notNull(data.rst.docmgrurl) && Object.keys(data.rst.docmgrurl).length) {
                    docmgrurl = data.rst.docmgrurl;
                    if (!notNull(docmgrurl.searchserver)) {
                        swal("", "搜索服务器配置为空，请检查配置", "warning");
                    }
                    if (!notNull(docmgrurl.fileserver)) {
                        swal("", "文件服务器配置为空，请检查配置", "warning");
                    }
                } else {
                    swal("", "服务器配置为空，请检查配置", "warning");
                }
            } else {
                swal('', '壳系统提示：' + data.msg + " 可能需要重新登录。", "error");
                $scope.docmgrUploadForm.invalid = true;
            }
        })
    }

    removeExt = function (str) {
        if (notNull(str)) {
            return str.replace(/\.[^/.]+$/, "");
        } else {
            return str;
        }
    }

    // trim = function (str) {
    //     if (notNull(str)) {
    //         return str.toString().replace(/\s/g, '');//调用toString()方法将可能存在的数字转换为字符串，否则会出错
    //     }
    //     return str;
    // }

    isEmptyObject = function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    }

    /**
     * 判断是否为空
     * @param obj
     * @returns {boolean}
     */
    notNull = function (obj) {
        return typeof obj != undefined && obj != 'undefined' && obj != null && obj != 'null';
    }

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    notEmpty = function (obj) {
        return notNull(obj) && obj != '';
    }

    /**
     * 检查文档总数是否超出50个
     * @param docs
     * @returns {boolean}
     */
    checkDocCount = function (docs) {
        return docs.length <= 50;
    };

    /**
     * 检查文档总计大小是否超过100MB
     * @param docs
     */
    checkDocTotalSize = function (docs) {
        var totalSize = 0;
        angular.forEach(docs, function (doc) {
            totalSize += doc.size;
        })
        return totalSize / 1024 / 1024 <= 100;
    };

    /**
     * 检查文件名是否符合格式，形如：销售_SONXXXX_合同_*
     * @param docName
     * @returns {boolean}
     */
    checkDocNameValid = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                return true;
            }
            else {
                // swal("无效文件名", "", "error");
                return false;
            }
        }
    }

    /**
     * 检查文件名是否合法
     * @param doc
     * @returns {boolean}
     */
    checkDocName = function (doc) {
        if (notNull(doc)) {
            var docName = doc.name;
            if (notNull(docName)) {
                var arr = docName.split(separator);
                if (notNull(arr) && arr.length >= 3) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    /**
     * @param doc
     * @returns {boolean}
     */
//检查文档大类是否合法
    checkDocLargeType = function (doc) {
        if (notNull(doc)) {
            var docName = doc.name;
            if (notNull(docName)) {
                var da = removeExt(docName).split(separator);
                return da.length >= 3 && (Object.keys(qualifiedDocTypeMap)).indexOf(da[0]) != -1;
            }
        }
    };

    /**
     * 检查文档小类是否合法
     * @param doc
     * @returns {boolean}
     */
    checkDocSmallType = function (doc) {
        if (notNull(doc)) {
            var docName = doc.name;
            if (notNull(docName)) {
                var da = removeExt(docName).split(separator);
                return da.length >= 3 && (Object.keys(qualifiedDocTypeMap)).indexOf(da[0]) != -1 && $.inArray(da[2], qualifiedDocTypeMap[da[0]].join(dataSeparator).split(dataSeparator)) != -1;
            }
        }
    }

    /**
     * 获取文档类型编码
     * @param doc
     * @returns {*}
     */
    /* getDocTypeName = function (doc_name) {
     if (notNull(doc_name)) {
     var arr = doc_name.split(separator);
     if (notNull(arr) && arr.length >= 3) {
     return arr[2];
     } else {
     swal("", "无效文件名", "error");
     }
     }
     }*/
//检查是否为pdf
    checkPdf = function (doc) {
        return doc.type == "application/pdf";
    };

    checkDocExists = function (doc, cb) {
        var doc_name = doc.name;
        if (notNull(docmgrurl)) {
            var res = service.docExists({
                "name": doc_name
            });
            res.success(function (data) {
                (cb && typeof(cb) === "function") && cb(data);
            })
        }
    };

    checkBillExists = function (doc, cb) {
        var docName = removeExt(doc.name);
        var arr = docName.split(separator);
        if (notNull(arr) && arr.length >= 3) {
            var doclargetype = arr[0];
            var billno = arr[1];
            var res = service.billExists({doclargetype: doclargetype, billno: billno});
            res.success(function (data) {
                if (data == null) {
                    swal("不能访问壳系统", data.msg, "error");
                }
                if (notNull(data) && data.code == 200) {
                    if (notNull(data.rst.found)) {
                        cb({found: data.rst.found, orgname: data.rst.orgname});
                    }
                }
                else if (data.code != 200) {
                    swal("检查单据号出错", data.msg, "error");
                }
            })
        }
    }


    /**
     * 只简单返回文件名，不做逻辑判断
     * @param docName
     */
    getDocName = function (docName) {
        if (notNull(docName)) {
            var docName = removeExt(docName);
            return docName;
        }
    }

    /**
     * 获取文档类型
     * @param docName
     */
    getDocType = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                var shortname = da[0];
                var subshortname = da[2];
                var rtn = docTypeShortnameNameMap[shortname + cacheSeparator + subshortname];
                if (notNull(rtn)) {
                    return rtn;
                } else {
                    return docTypeShortnameNameMap[shortname + cacheSeparator + wildcard];
                }
            }
            else {
                return '未知';
            }
        }
    }

    /**
     * 获取文档类型code
     * @param docName
     * @returns {*}
     */
    getDocTypeCode = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                var shortname = da[0];
                var subshortname = da[2];
                var rtn = docTypeShortnameCodeMap[shortname + cacheSeparator + subshortname];
                if (notNull(rtn)) {
                    return rtn;
                } else {
                    return docTypeShortnameCodeMap[shortname + cacheSeparator + wildcard];
                }
            }
            else {
                return '未知';
            }
        }
    }

    /**
     * 获取文档类型名称
     * @param docName
     * @returns {*}
     */
    getDocTypeName = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                var shortname = da[0];
                var subshortname = da[2];
                var rtn = docTypeShortnameNameMap[shortname + cacheSeparator + subshortname];
                if (notNull(rtn)) {
                    return rtn;
                } else {
                    return docTypeShortnameNameMap[shortname + cacheSeparator + wildcard];
                }
            }
            else {
                return '未知';
            }
        }
    }

    /**
     * 获取文档类型key
     * @param docName
     * @returns {*}
     */
    getDocTypeKey = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                var shortname = da[0];
                var subshortname = da[2];
                var rtn = docTypeShortnameKeyMap[shortname + cacheSeparator + subshortname];
                if (notNull(rtn)) {
                    return rtn;
                } else {
                    return docTypeShortnameKeyMap[shortname + cacheSeparator + wildcard];
                }
            }
            else {
                return '未知';
            }
        }
    }

    /**
     * 获取文档类型searchkey
     * @param docName
     * @returns {*}
     */
    getDocTypeSearchkey = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                var shortname = da[0];
                var subshortname = da[2];
                var rtn = docTypeShortnameSearchkeyMap[shortname + cacheSeparator + subshortname];
                if (notNull(rtn)) {
                    return rtn;
                } else {
                    return docTypeShortnameSearchkeyMap[shortname + cacheSeparator + wildcard];
                }
            }
            else {
                return '未知';
            }
        }
    }

    getBillno = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                return da[1];
            }
            else {
                swal("", "无效文件名", "error");
            }
        }
    }

    getBillOrgname = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                var rtn = orgnameMap[docName];
                return rtn;
            }
            else {
                swal("", "无效文件名", "error");
            }
        }
    }

    getDocTypeShortName = function (docName) {
        if (notNull(docName)) {
            var da = removeExt(docName).split(separator);
            if (da.length >= 3) {
                return da[2];
            }
            else {
                swal("", "无效文件名", "error");
            }
        }
    }

    getCurrentTime = function () {
        var date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" +
            date.getMinutes() + ":" + date.getSeconds();
    }

    /**
     * 防止重复添加
     * @param array
     * @param doc
     * @returns {boolean}
     */
    checkDocPushed = function (array, doc) {
        var docPushed = false;
        if (notNull(array)) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name == removeExt(doc.name)) {
                    docPushed = true;
                    break;
                }
            }
            return docPushed;
        }
    }
    /**
     * 防止页面重复添加
     * @param array
     * @param doc
     * @returns {boolean}
     */
    checkPageDocPushed = function (array, doc) {
        var docPushed = false;
        if (notNull(array)) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].doc_name == removeExt(doc.name)) {
                    docPushed = true;
                    break;
                }
            }
            return docPushed;
        }
    }

    /**
     * 获取选取的文档对象
     * @param docs
     * @param checked
     */
    getCheckedDocs = function (docs, checked) {
        var checkedDocs = [];
        if (notNull(checked)) {
            for (var i = 0; i < checked.length; i++) {
                if (notNull(docs)) {
                    for (var j = 0; j < docs.length; j++) {
                        if (checked[i].doc_name == removeExt(docs[j].name)) {
                            checkedDocs.push(docs[j]);
                            break;
                        }
                    }
                } else {
                    checkedDocs.push([]);
                }
            }
        }
        return checkedDocs;
    }

    /**
     * 清空数组
     * @param which
     */
    emptyIt = function (which) {//todo:判断是否是数组
        if (notNull(which))
            which.splice(0, which.length);
    }

    emptyAll = function () {
        emptyIt(allDocs);
        emptyIt($scope.docs);
        emptyIt($scope.validateOK);
        emptyIt($scope.validateExists);
        emptyIt($scope.validateError);
    };

    emptyAllValidate = function () {
        emptyIt($scope.validateOK);
        emptyIt($scope.validateExists);
        emptyIt($scope.validateError);
    };

    getDocNames = function (docs) {
        var rtn = [];
        if (notNull(docs)) {
            for (var doc in docs) {
                rtn.put(removeExt(doc.name));
            }
        }
        return rtn;
    }

    /**
     *
     * @param mode mode='ref'为重新上传，要清空校验结果
     */
    $scope.validate = function (mode) {
        var docs = $scope.docs;
        if (docs.length == 0) {//避免重复触发该方法
            return;
        }

        if (notNull(mode)) {
            if (mode == 're') {
                emptyAllValidate();
            }
        }

        angular.forEach(docs, function (doc) {
            if (!checkDocPushed(allDocs, doc)) {
                allDocs.push(doc);
            }
        })

        if (!checkDocCount(docs)) {
            swal("", "上传文档不超过50个", "warning");
        } else if (!checkDocTotalSize(docs)) {
            swal("", "上传文档合计大小超过100MB", "warning");
        } else {
            //^^^----------forEach----------
            angular.forEach(docs, function (doc) {
                    if (!checkPageDocPushed(validateError, doc)) {
                        if (!checkPdf(doc)) {
                            validateError.push({
                                doc_type: getDocType(doc.name),
                                doc_name: getDocName(doc.name),
                                doc_size: doc.size,
                                msg: "不是pdf文件格式"
                            })
                            $scope.validateError = validateError;
                        } else if (!checkPageDocPushed(validateError, doc)) {
                            if (!checkDocName(doc)) {
                                validateError.push({
                                    doc_type: '未知',
                                    doc_name: getDocName(doc.name),
                                    doc_size: doc.size,
                                    msg: "无效文件名，文件名格式：文档类型_单号_*_*"
                                })
                                $scope.validateError = validateError;
                            } else if (!checkPageDocPushed(validateError, doc)) {
                                if (!checkDocLargeType(doc)) {
                                    validateError.push({
                                        doc_type: '未知',
                                        doc_name: getDocName(doc.name),
                                        doc_size: doc.size,
                                        msg: "未知文档类型，有效文档类型有：" + (Object.keys(qualifiedDocTypeMap)).join(displaySeparator)
                                    })
                                    $scope.validateError = validateError;
                                }/* else if (!checkPageDocPushed(validateError, doc)) {
                                 if (!checkDocSmallType(doc)) {
                                 validateError.push({
                                 doc_type: (doc.name).split(separator)[0],
                                 doc_name: getDocName(doc.name),
                                 doc_size: doc.size,
                                 msg: "文档名不规范，有效二级文档类型有：" + qualifiedDocTypeMap[(getDocName(doc.name).split(separator))[0]].join(displaySeparator)
                                 })
                                 $scope.validateError = validateError;
                                 } *///^^^----------checkDocExists----------
                                else if (!checkPageDocPushed(validateExists, doc)) {
                                    checkBillExists(doc, function (data) {
                                            //^^^----------checkBillExists----------
                                            if (!data.found) {
                                                validateError.push({
                                                    doc_type: getDocType(doc.name),
                                                    doc_name: getDocName(doc.name),
                                                    doc_size: doc.size,
                                                    msg: "文档名中包含的单据号不存在"
                                                })
                                                $scope.validateError = validateError;
                                            } else if (!checkPageDocPushed(validateError, doc)) {
                                                orgnameMap[doc.name] = data.orgname;
                                                checkDocExists(doc, function (data) {
                                                    if (data == null) {
                                                        swal('', '不能访问文档搜索服务', 'error');
                                                    } else if (data.code == 40) {
                                                        swal('', data.msg, 'warning');
                                                    } else if (data.code == 400) {
                                                        swal('查询搜索服务器出错', data.msg, 'error');
                                                    } else if (data.rst.found) {
                                                        validateExists.push({
                                                            doc_type: getDocType(doc.name),
                                                            doc_name: getDocName(doc.name),
                                                            doc_size: doc.size,
                                                            msg: "系统中已存在该文档，确认上传会覆盖原文档"
                                                        })
                                                        $scope.validateExists = validateExists;

                                                    } else {
                                                        if (!checkPageDocPushed(validateOK, doc)) {
                                                            validateOK.push({
                                                                bill_orgname: orgnameMap[doc.name],
                                                                doc_type: getDocType(doc.name),
                                                                doc_name: getDocName(doc.name),
                                                                uploader: $rootScope.loginPerson.user.name,
                                                                upload_date: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                                                doc_size: doc.size
                                                            })
                                                            $scope.validateOK = validateOK;
                                                        }
                                                    }
                                                });
                                            }
                                            //$$$----------checkBillExists----------
                                        }
                                    )
                                }
                                //$$$----------checkDocExists----------
                            }
                            // }
                            //$$$----------forEach----------
                        }
                    }
                }
            )
        }
    }

    $scope.confirmUpload = function () {
        //notice:用户每次选取文件后docs被自动设置，
        // 但上传可能选择界面上其他的文件,这些文件是以前选取的，所以根据现在的docs是找不到这些文件的。
        var f1;
        var f2;
        var f1Checked;
        var f2Checked;
        f1 = $scope.validateOK;
        f2 = $scope.validateExists;
        //上传校验通过的文档
        f1Checked = $filter("filter")(f1, {
            val: true
        });
        f2Checked = $filter("filter")(f2, {
            val: true
        });
        if (!notNull(f1Checked)) f1Checked = [];
        if (!notNull(f2Checked)) f2Checked = [];
        if (notNull(f1Checked) && notNull(f2Checked)) {
            var f1chks = f1Checked.length;
            var f2chks = f2Checked.length;
            if (f1chks == 0 && f2chks == 0) {
                swal("", "未选定将要上传的文档", "warning");
                return;
            } else {
                if (f1chks > 0 && f2chks == 0) {
                    swal({
                            title: "",
                            text: "将要上传" + f1chks + "个文档，您确定要上传吗？",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "是",
                            cancelButtonText: "否",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true
                        },
                        function () {
                            doUpload(f1, f1Checked, function (data) {
                                if (notNull(data)) {
                                    if (data.status == 200) {
                                        swal("上传成功", "成功上传了" + data.total + "个文档", "success");
                                    } else if (data.status == -1) {
                                        swal("上传[" + data.name + "]出错", data.msg, "error");
                                    }
                                } else {
                                    swal("上传出错", "未知错误", "error");
                                }
                            });
                        });
                } else if (f2chks > 0) {
                    swal({
                            title: "",
                            text: "本次上传会覆盖系统中" + f2chks + "个文档，您确定要上传吗？",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "是",
                            cancelButtonText: "否",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true
                        },
                        function () {
                            var totals = 0;
                            if (f1Checked != 0) {
                                doUpload(f1, f1Checked, function (data) {
                                    if (notNull(data)) {
                                        if (data.status == 200) {
                                            totals += data.total;
                                            doUpload(f2, f2Checked, function (data) {
                                                if (notNull(data)) {
                                                    if (data.status == 200) {
                                                        totals += data.total;
                                                        if (totals == f1chks + f2chks) {
                                                            swal("上传成功", "成功上传了" + totals + "个文档", "success");
                                                        }
                                                    } else if (data.status == -1) {
                                                        swal("上传出错", data.msg, "error");
                                                    }
                                                } else {
                                                    swal("上传出错", "未知错误", "error");
                                                }
                                            });
                                        } else if (data.status == -1) {
                                            swal("上传出错", data.msg, "error");
                                        }
                                    } else {
                                        swal("上传出错", "未知错误", "error");
                                    }
                                });
                            } else {
                                doUpload(f2, f2Checked, function (data) {
                                    if (notNull(data)) {
                                        if (data.status == 200) {
                                            totals += data.total;
                                            if (totals == f1chks + f2chks) {
                                                swal("上传成功", "成功上传了" + totals + "个文档", "success");
                                            }
                                        } else if (data.status == -1) {
                                            swal("上传出错", data.msg, "error");
                                        }
                                    } else {
                                        swal("上传出错", "未知错误", "error");
                                    }
                                })
                            }
                        });
                }
            }
        }
    }

    allDocs = [];//记录用户上传的所有文件

    /**
     *
     * @param which
     */
    doUpload = function (which, checked, cb) {
        if (notNull(which) && notNull(checked)) {
            var fileUploadDocs = 0;//成功上传到文件服务器的文件
            var searchUploadDocs = 0;//成功上传到搜索服务器的文件

            var checkedDocs = getCheckedDocs(allDocs, checked);
            var url;
            var fileUrl;
            url = docmgrurl.searchserver + "/upload?softCommit=true";
            fileUrl = docmgrurl.fileserver + "/upload";
            //^^^-------------for-------------
            for (var j = 0; j < checkedDocs.length; j++) {
                var toBeUploadedDoc = checkedDocs[j];
                //^^^-------------上传到文件服务器-------------
                /*            doc.fileUpload = Upload.upload({//notice:不能使用url param形式，否则解析json格式失败
                 url: "http://kdevelop.chinacloudapp.cn/upload" + "?org_id=" + $rootScope.loginPerson.user.orgid + "&org_name=" + $rootScope.loginPerson.user.orgname +
                 "&user_id=" + $rootScope.loginPerson.user._id + "&user_name=" + $rootScope.loginPerson.user.name,
                 data: {which: which, cb: cb},
                 file: doc
                 });*/
                var loginPerson = $rootScope.loginPerson;
                var fileData = {
                    'org_id': loginPerson.user.orgid,
                    'org_name': loginPerson.user.orgname,
                    'user_id': loginPerson.user._id,
                    'user_name': loginPerson.user.name
                }
                toBeUploadedDoc.fileUpload = Upload.upload({
                    url: fileUrl,
                    data: fileData,
                    file: toBeUploadedDoc
                });
                toBeUploadedDoc.fileUpload.then(function (resp) {
                        //判断是否出错
                        if (resp.data == null) {
                            (cb && typeof(cb) === "function") && cb({
                                status: -1,
                                name: resp.config.file.name,
                                msg: "上传到文件服务器时出错，请检查网络是否通畅或者文件服务器是否拒绝访问。"
                            });
                            return;
                        }
                        if (resp.data.status == -1) {
                            (cb && typeof(cb) === "function") && cb({
                                status: -1,
                                name: resp.config.file.name,
                                msg: "上传到文件服务器时出错，错误信息：'" + resp.data.info + "'"
                            });
                            return;
                        }
                        var fileUploadedDoc = resp.config.file;

                        //获取文件路径
                        var fileUploadedDocPath = resp.data.filePath;
                        if (!notNull(fileUploadedDoc)) {
                            (cb && typeof(cb) === "function") && cb({
                                status: -1,
                                name: resp.config.file.name,
                                msg: "上传到文件服务器时不能获取文件存储路径"
                            });
                            return;
                        }

                        for (var k = 0; k < which.length; k++) {
                            if (removeExt(fileUploadedDoc.name) == which[k].doc_name) {
                                // which.splice(k, 1);//暂不消除页面显示，待上传到搜索服务器完全成功后才消除
                                fileUploadDocs++;
                            }
                        }

                        /**
                         * 上传到文件服务器成功后才往搜索服务器上传
                         */
                        var fileUploadedDocName = fileUploadedDoc.name;
                        //^^^-------------上传到搜索服务器-------------
                        fileUploadedDoc.searchUpload = Upload.upload({//避免使用json参数，以免造成乱码和不方便从config.data取值
                            url: url + "&literal.id=" + fileUploadedDocName +
                            "&literal.dm_bill_no=" + getBillno(fileUploadedDocName) +
                            "&literal.dm_bill_orgname=" + getBillOrgname(fileUploadedDocName) +
                            "&literal.dm_doc_name=" + getDocName(fileUploadedDocName) +
                            "&literal.dm_doc_type_shortname=" + getDocTypeShortName(fileUploadedDocName) +
                            "&literal.dm_doc_type_code=" + getDocTypeCode(fileUploadedDocName) +
                            "&literal.dm_doc_type_name=" + getDocTypeName(fileUploadedDocName) +
                            "&literal.dm_doc_type_key=" + getDocTypeKey(fileUploadedDocName) +
                            "&literal.dm_doc_type_searchkey=" + getDocTypeSearchkey(fileUploadedDocName) +
                            "&literal.dm_doc_size=" + fileUploadedDoc.size +
                            "&literal.dm_uploader_id=" + loginPerson.user._id +
                            "&literal.dm_uploader_name=" + loginPerson.user.name +
                            "&literal.dm_uploader_orgid=" + loginPerson.user.orgid +
                            "&literal.dm_uploader_orgname=" + loginPerson.user.orgname +
                            "&literal.dm_upload_datetime=" + $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss') +
                            "&literal.dm_upload_file_path=" + docmgrurl.fileserver + "/" + fileUploadedDocPath,
                            file: fileUploadedDoc
                        })

                        fileUploadedDoc.searchUpload.then(function (resp) {
                                //判断是否出错
                                if (resp.data == null) {
                                    (cb && typeof(cb) === "function") && cb({
                                        status: -1,
                                        name: resp.config.file.name,
                                        msg: "上传到搜索服务器时出错，请检查网络是否通畅或者搜索服务器是否拒绝访问，需要重传[" + fileUploadedDoc.name + "]"
                                    });//todo:将错误反馈到文件服务器
                                    return;
                                }
                                if (notNull(resp.data.error)) {
                                    (cb && typeof(cb) === "function") && cb({
                                        status: -1,
                                        name: resp.config.file.name,
                                        msg: "上传到搜索服务器时出错，需要重传[" + fileUploadedDoc.name + "]，可能需要重启搜索服务器，错误信息：" + resp.data.error.msg
                                    });//todo:将错误反馈到文件服务器
                                    return;
                                }
                                var searchUploadedDoc = resp.config.file;
                                for (var k = 0; k < which.length; k++) {
                                    if (removeExt(searchUploadedDoc.name) == which[k].doc_name) {
                                        which.splice(k, 1);
                                        searchUploadDocs++;
                                    }
                                }
                                /**
                                 * 所有文件都成功上传后才回调
                                 */
                                //^^^-------------用户反馈-------------
                                if (cb && typeof(cb) === "function") {
                                    if (searchUploadDocs == fileUploadDocs) {
                                        cb({
                                            status: 200,
                                            total: fileUploadDocs,
                                            msg: "上传成功"
                                        })
                                    } else {
                                        cb({
                                            status: -1,
                                            msg: "上传[" + getDocNames(checkedDocs) + "]发生未知错误，请重传这些文档！"
                                        })
                                    }
                                }
                                //$$$-------------用户反馈-------------
                            }
                            ,
                            function (resp) {//bug:当搜索服务器宕机后，ng-file-upload不能进入此方法，仍激活前一个成功回调
                                //todo:有错误时也激活回调，返回文件名，暂不清楚在什么条件下激活该方法
                                (cb && typeof(cb) === "function") && cb({
                                    status: -1,
                                    name: resp.config.file.name,
                                    msg: "上传文件[" + resp.config.file.name + "到搜索服务器失败，需要重传该文件。错误信息：" + resp.statusText
                                });
                            }
                            ,
                            function (evt) {
                            }
                        );

                        fileUploadedDoc.searchUpload.catch(function (resp) {
                            (cb && typeof(cb) === "function") && cb({
                                status: -1,
                                name: fileUploadedDoc.name,
                                msg: "上传文件[" + fileUploadedDoc.name + "到搜索服务器失败。错误信息：" + resp.statusText
                            });
                        });
                        //bug:ng-file-upload不能在所有文件上传后回调，暂变通解决。
                        //$$$-------------上传到搜索服务器-------------

                    }
                    ,
                    function (resp) {//bug:当搜索服务器宕机后，ng-file-upload不能进入此方法，仍激活前一个成功回调
                        //todo:有错误时也激活回调，返回文件名，暂不清楚在什么条件下激活该方法
                        (cb && typeof(cb) === "function") && cb({
                            status: -1,
                            name: resp.config.file.name,
                            msg: "上传文件[" + resp.config.file.name + "到文件服务器失败。错误信息：" + resp.statusText
                        });
                    }

                    ,
                    function (evt) {
                    }
                );
                toBeUploadedDoc.fileUpload.catch(function (resp) {
                    (cb && typeof(cb) === "function") && cb({
                        status: -1,
                        name: toBeUploadedDoc.name,
                        msg: "上传文件[" + toBeUploadedDoc.name + "到文件服务器失败。错误信息：" + resp.statusText
                    });
                });
//bug:ng-file-upload不能在所有文件上传后回调，暂变通解决。
//$$$-------------上传到文件服务器-------------
            }
//$$$-------------for-------------
        }
    }

    $scope.cancelUpload = function () {
        emptyAll();
    };

    $scope.okSelectAll = function () {
        selectAll($scope.validateOK, $scope.okAll);
    }
    $scope.existsSelectAll = function () {
        selectAll($scope.validateExists, $scope.existsAll);
    }
    selectAll = function (docs, chkStatus) {
        angular.forEach(docs, function (doc) {
            doc.val = chkStatus;
        })
    }

}]);


//bug6944
docManageApp.controller('docDownloadCtrl',['$scope','$stateParams','$http','docManageServices',function($scope,$stateParams,$http,service){
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPage: 0,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50],
        pagePromise: {},
        onChange: function () {
            var param  = {pageNumber: $scope.paginationConf.currentPage, rowsPerPage: $scope.paginationConf.itemsPerPage, conditions: "dm_doc_name:*_" + $stateParams.code + "_*"};
            var customerPromise = service.doSearch(param);
            $scope.paginationConf.pagePromise = customerPromise;
        }
    }

    notNull = function (obj) {
        return typeof obj != undefined && obj != 'undefined' && obj != null && obj != 'null';
    }

    var url = service.docMgrUrl();//获取搜索服务器地址
    url.success(function (data) {
        if (data.code == 200) {
            if (notNull(data.rst.docmgrurl) && Object.keys(data.rst.docmgrurl).length) {
                docmgrurl = data.rst.docmgrurl;
                if (!notNull(docmgrurl.searchserver)) {
                    swal("", "搜索服务器配置为空，请检查配置", "warning");
                }
                if (!notNull(docmgrurl.fileserver)) {
                    swal("", "文件服务器配置为空，请检查配置", "warning");
                }
            } else {
                swal("", "服务器配置为空，请检查配置", "warning");
            }
        } else {
            swal('', '壳系统提示：' + data.msg + " 可能需要重新登录。", "error");
        }
    })

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    $scope.allCheck = function () {
        var check = $("#allcheck");
        $scope.checkAll= check.checked ? true : false;
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
            $scope.dataList.forEach(function(item){
                item.checkAll=true;
            })
        } else {
            check.removeAttr("checked");
            $scope.dataList.forEach(function(item){
                item.checkAll=false;
            })
        }
    }
    $scope.checkSelect = function (idx) {
        var parent = $("#billTable").find(".list").eq(idx);
        var check = parent.find("input:eq(0)");
        if (check.attr("checked") == undefined || check.attr("checked") == 'false') {
            check.attr("checked", 'checked');
        } else {
            check.removeAttr("checked");
        }
    }
    $scope.downloaddocs = function () {
        var cArr = [];
        var check = $('.checkBox');
        for (var i = 0;i<check.length;i++){
            if (check[i].checked == true){
                cArr.push($scope.dataList[i].dm_upload_file_path);
            }
        }

        if (cArr.length == 0) {
            swal("请选择数据！", "", "warning");
            return false;
        }
        var params = {
            files: cArr,
        }
        if (!cArr.length<1){
            $http({
                method: 'POST',
                url: docmgrurl.fileserver + '/download',
                command: 'pack',
                data: params,
                responseType: 'arraybuffer'
            }).then(function successCallback(data) {
                if (notNull(data)){
                    if (data.status == 200 ){
                        var file = new Blob([data.data], { type: 'application/x-zip-compressed' });
                        var fileURL = URL.createObjectURL(file);
                        var time = new Date().Format("yyyy年MM月dd日 hh时mm分ss秒");
                        var name = '文档批量下载'+time+'.zip'
                        var a  = document.createElement('a');
                        a.href  = fileURL;
                        a.target  = '_blank';
                        a.download  = name;
                        document.body.appendChild(a);
                        a.click();
                    }else {
                        swal("批量下载出错", data.statusText, "error");
                    }
                }else {
                    swal("请求下载失败！", "未知错误", "error");
                }
            },function errorCallback(response) {
                swal("请求下载失败！", "", "error");
            });
        }
    }
}]);

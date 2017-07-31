var uploadifyApp = angular.module('uploadifyApp', ['ngCookies']);
uploadifyApp.directive('uploadify', ['$rootScope',function ($rootScope) {
    var count = 0;
    return {
        /*require: 'ngModel',*/
        restrict: 'A',
        replace: 'true',
        template: '<input type="file" name="file_upload"/>',
        link: function ($scope, element, attr, ngModel) {
            // var persion = $cookieStore.get("persion"),
            var persion = $rootScope.loginPerson,
                userid = persion.user._id;
            element.attr("id", ++count);
            var btnname=element.attr("btnname");
            $(element).uploadify({
                'onFallback': function () {
                    swal("请安装FLASH插件", "", "warning");
                },
                'swf': 'js/lib/uploadify/uploadify.swf',
                'uploader': '/resource/uploadfile',
                'formData': {'userid': 'userid'},
                'auto': true,
                'buttonCursor': 'pointer',
                'buttonText': btnname,
                'buttonClass':'uplodBtn',
                'fileSizeLimit': '20MB',
                'fileTypeExts': '*.gif; *.jpg; *.png;*.jpeg;*.pdf;*.JPG',
                'multi': false,
                'queueID': 'some_file_queue',
                /*onUploadStart: function (file) {
                    if ($("#" + element[0].id).children().hasClass("showFile")) {
                        $("#" + element[0].id).children(".showFile").remove();
                    }
                    if($("#" + element[0].id).next(".imgShow")){
                        $("#" + element[0].id).next(".imgShow").remove();
                    }
                    $('#loading').show();
                },*/
                'onUploadSuccess': function (file, data, response) {
                    $('#loading').hide();
                    if(data == ''){
                        swal("返回的数据为空", "", "warning");
                        return false;
                    }
                    var dataJson = JSON.parse(data);
                    if (dataJson.code == 200) {
                        var fileName = dataJson.rst.attachment.Filedata[0].filename;
                        var path = dataJson.rst.attachment.Filedata[0].path;
                        var reg = /(.png|.jpg|.jpeg|.gif|.JPG)/g;
                        var str = "";
                        if (reg.test(fileName)){
                            str = "<div class='showImg'><img src='" + path + "'/><span class='name'>" + fileName + "</span></span><span class='del' style='margin-left: 5px'>删除</span>" + "</div>";
                        } else {
                            str = "<div class='showImg'><a target='_blank' href='" + path + "'>" + fileName + "</a><span class='del' style='margin-left: 5px'>删除</span>" + "</div>";
                        }
                        $("#" + element[0].id).parent().append(str);
                        $(".del").bind('click',function(){
                            $(this).parent().remove();
                            return false;
                        });
                        /*if (ngModel) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(path);
                            });
                        }*/
                    }else{
                        swal(dataJson.msg, "", "warning");
                    }

                }
            });

        }
    }
}]);
uploadifyApp.directive('uploadifyfile', ['$rootScope',function ($rootScope) {      //上传多个文件
    var count = 0;
    return {
        /*require: 'ngModel',*/
        restrict: 'A',
        replace: 'true',
        template: '<input type="file" name="file_upload"/>',
        link: function ($scope, element, attr, ngModel) {
            // var persion = $cookieStore.get("persion"),
            var persion = $rootScope.loginPerson,
                userid = persion.user._id;
            element.attr("id", ++count);
            var btnname=element.attr("btnname");
            $(element).uploadify({
                'onFallback': function () {
                    swal("请安装FLASH插件", "", "warning");
                },
                'swf': 'js/lib/uploadify/uploadify.swf',
                'uploader': '/resource/uploadfile',
                'formData': {'userid': 'userid'},
                'auto': true,
                'buttonCursor': 'pointer',
                'buttonText': btnname,
                'buttonClass':'uplodBtn',
                'fileSizeLimit': '20MB',
                'fileExt': '*.gif; *.jpg; *.png;*.jpeg;*.doc;*.xlsx;*.pdf;*.docx;*.xls;*.rar;*.zip;*.txt',
                'multi': false,
                'queueID': 'some_file_queue',
                'onUploadSuccess': function (file, data, response) {
                    $('#loading').hide();
                    if(data == ''){
                        swal("返回的数据为空", "", "warning");
                        return false;
                    }
                    var dataJson = JSON.parse(data);
                    if (dataJson.code == 200) {
                        var fileName = dataJson.rst.attachment.Filedata[0].filename;
                        var path = dataJson.rst.attachment.Filedata[0].path;
                        var str = "";
                        str = "<div class='showImg'><a target='_blank' href='" + path + "'>" + fileName + "</a><span class='del' style='margin-left: 5px;cursor: pointer;'>删除</span>" + "</div>";

                        $("#" + element[0].id).parent().append(str);
                        $(".del").bind('click',function(){
                            $(this).parent().remove();
                            return false;
                        });
                    }else{
                        swal(dataJson.msg, "", "warning");
                    }

                }
            });

        }
    }
}]);
uploadifyApp.directive('excleUploadify', ['$rootScope',function ($rootScope) {
    var count = 100;
    return {
        require: 'ngModel',
        restrict: 'A',
        replace: 'true',
        template: '<input type="file" name="file_upload"/>',
        link: function ($scope, element, attr, ngModel) {
            // var persion = $cookieStore.get("persion"),
            var persion = $rootScope.loginPerson,
                userid = persion.user._id;
            element.attr("id", ++count);
            var url = element.attr("url");
            var btnName = element.attr("btnname");
            var exceData = element.attr("excleData");
            var exceDataAll = element.attr("excleDataAll");
            var excleError =  element.attr("excleError");
            $(element).uploadify({
                'onFallback': function () {
                    swal("请安装FLASH插件", "", "warning");
                },
                'swf': 'js/lib/uploadify/uploadify.swf',
                'uploader': url,
                'formData': {'userid': userid},
                'auto': true,
                'buttonCursor': 'pointer',
                'buttonText': btnName,
                'buttonClass':'uplodBtn',
                'fileSizeLimit': '20MB',
                'fileTypeExts': '*.xlsx',
                'multi': false,
                'queueID': 'some_file_queue',
                'onUploadStart': function() {
                    $('#loading').show();
                },
                'onUploadSuccess': function (file, data, response) {
                    $('#loading').hide();
                    if(data == ''){
                        swal("返回的数据为空", "", "warning");
                        return false;
                    }
                    var dataJson = JSON.parse(data);
                    if(dataJson.code == 200){
                        $scope.$apply(function () {
                            $scope[exceData] = dataJson.rst.right;
                            $scope[excleError] = dataJson.rst.error;
                            $scope[exceDataAll] = dataJson.rst;
                        });
                    }else{
                        swal(dataJson.msg, "", "warning");
                    }

                },
                'onUploadError': function (err) {
                    $('#loading').hide();
                    swal("上传失败，服务器解析错误", "", "warning");
                }
            });

        }
    }
}]);
uploadifyApp.directive('excleUpdata', [function () {
    var count = 300;
    return {
        require: 'ngModel',
        restrict: 'A',
        replace: 'true',
        scope:{conf:'=',callBackMethod:'&getUploadCallback'},
        template: '<input type="file" name="file_upload"/>',
        link: function ($scope, element, attr, ngModel) {
            /*var persion = $cookieStore.get("persion"),
             userid = persion.user._id;*/
            element.attr("id", ++count);
            var rightData = element.attr("rightData");
            var errorError =  element.attr("errorError");
            var uploadCallback = element.attr('get-upload-callback');
            //var opts = angular.extend({}, $scope.$eval(attrs.nlUploadify));
            var conf = $scope.$eval(attr.excleUpdata);

            $(element).uploadify({
                'onFallback': function () {
                    swal("请安装FLASH插件", "", "warning");
                },
                'swf': 'js/lib/uploadify/uploadify.swf',
                'uploader': conf.uploader,
                'formData': conf.formData,
                'auto': true,
                'buttonCursor': 'pointer',
                'buttonText': conf.buttonText,
                'buttonClass':'uplodBtn',
                'fileSizeLimit': '20MB',
                'fileTypeExts': '*.xlsx;*.csv;*.xls',
                'multi': false,
                'queueID': 'some_file_queue',
                'onUploadStart': function() {
                    $(element).uploadify("settings", "formData", $scope.$parent.excleFormData);
                    console.log($scope.$parent.excleFormData);
                    $('#loading').show();
                },
                'onUploadSuccess': function (file, data, response) {
                    $('#loading').hide();
                    if(data == ''){
                        swal("返回的数据为空", "", "warning");
                        return false;
                    }
                    var dataJson = JSON.parse(data);
                    if(dataJson.code == 200){
                        if (ngModel) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(dataJson.rst);
                                if(uploadCallback){//上传回调方法 input excle-Updata="{{excleConf}}" get-upload-callback="getUploadCallback(uploadCallData)" ng-model="excleWlData"
                                    $scope.callBackMethod({uploadCallData:dataJson.rst});
                                }
                            });
                        }
                    }else{
                        swal(dataJson.msg, "", "warning");
                    }
                }
            });
        },
    }
}]);
uploadifyApp.directive('uploadifyAll', ['$rootScope',function ($rootScope) {
    var count = 200;
    return {
        require: 'ngModel',
        restrict: 'A',
        replace: 'true',
        template: '<input type="file" name="file_upload"/>',
        link: function ($scope, element, attr, ngModel) {
            // var persion = $cookieStore.get("persion"),
            var persion = $rootScope.loginPerson,
                userid = persion.user._id;

            element.attr("id", ++count);
            var btnname=element.attr("btnname");
            var url = element.attr("url");
            var fileName = element.attr("fileName");
            $(element).uploadify({
                'onFallback': function () {
                    swal("请安装FLASH插件", "", "warning");
                },
                'swf': 'js/lib/uploadify/uploadify.swf',
                'uploader': url,
                'formData': {'userid': userid},
                'auto': true,
                'buttonCursor': 'pointer',
                'buttonText': btnname,
                'fileSizeLimit': '100MB',
                'fileExt':'*.gif; *.jpg; *.png;*.jpeg;*.doc;*.xlsx;*.pdf;*.docx;*.xls;*.rar;*.zip;*.txt',
                'multi': false,
                'queueID': 'some_file_queue',
                'onUploadStart': function() {
                    $('#loading').show();
                    // 不知道为什么用ng控制，总是在success之后样式才起效，暂时直接操作dom
                    //$scope.$parent.showLoading = true;
                },
                'onUploadSuccess': function (file, data, response) {
                    $('#loading').hide();
                    if(data == ''){
                        swal("返回的数据为空", "", "warning");
                        return false;
                    }
                    var dataJson = JSON.parse(data);
                    if (dataJson.code == 200) {

                        var path = dataJson.rst.attachment.Filedata[0].path;
                        var docName = dataJson.rst.attachment.Filedata[0].filename;
                        if (ngModel) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(path);
                                $scope.docName = docName;
                                // $scope[fileName].docName = docName;
                                $scope[fileName] = docName;
                                console.log(fileName,$scope[fileName])
                            });
                        }
                    }else{
                        swal(dataJson.msg, "", "warning");
                    }
                }
            });
        }
    }
}]);

//2017-1-16
// 上传多个
uploadifyApp.directive('uploadifyMore', ['$rootScope',function ($rootScope) {
	var count = 0;
	return {
		require: 'ngModel',
		restrict: 'A',
		replace: 'true',
		template: '<input type="file" name="file_upload"/>',
		link: function ($scope, element, attr, ngModel) {
			// var persion = $cookieStore.get("persion"),
			var persion = $rootScope.loginPerson,
				userid = persion.user._id;
			element.attr("id", ++count);
			var btnname=element.attr("btnname"),
				modelName = element.attr("fileName");
			$(element).uploadify({
				'onFallback': function () {
					swal("请安装FLASH插件", "", "warning");
				},
				'swf': 'js/lib/uploadify/uploadify.swf',
				'uploader': '/resource/uploadfile',
				'formData': {'userid': 'userid'},
				'auto': true,
				'buttonCursor': 'pointer',
				'buttonText': btnname,
				'buttonClass':'uplodBtn',
				'fileSizeLimit': '20MB',
				'fileExt': '*.gif; *.jpg; *.png;*.jpeg;*.doc;*.xlsx;*.pdf;*.docx;*.xls;*.rar;*.zip;*.txt',
				'multi': false,
				'queueID': 'some_file_queue',
				'onUploadSuccess': function (file, data, response) {
					$('#loading').hide();
					if(data == ''){
						swal("返回的数据为空", "", "warning");
						return false;
					}
					var dataJson = JSON.parse(data);
					if (dataJson.code == 200) {
						var fileName = dataJson.rst.attachment.Filedata[0].filename;
						var path = dataJson.rst.attachment.Filedata[0].path;
						
						if (ngModel) {
							$scope.$apply(function () {
								// ngModel.$setViewValue(path);
								// $scope[fileName].docName = docName;
								$scope[modelName] = $scope[modelName] || [];
								$scope[modelName].push({filePath: path, fileName:fileName});
								console.log(modelName,$scope[modelName])
							});
						}
					}else{
						swal(dataJson.msg, "", "warning");
					}
					
				}
			});
			
		}
	}
}]);
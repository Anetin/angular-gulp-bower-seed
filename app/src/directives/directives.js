/**
 * Created by oxygen on 2017/4/6.
 */
angular.module('myApp.directives', [
    'myApp.services',
    'myApp.apiServices'
])
        .directive('hasPermission', function(permissions) {
          return {
            link: function(scope, element, attrs) {
              if(!angular.isString(attrs.hasPermission))
                throw "hasPermission value must be a string";

              var value = attrs.hasPermission.trim();
              var notPermissionFlag = value[0] === '!';
              if(notPermissionFlag) {
                value = value.slice(1).trim();
              }

              function toggleVisibilityBasedOnPermission() {
                var hasPermission = permissions.hasPermission(value);

                if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
                  element.show();
                else
                  element.hide();
              }
              toggleVisibilityBasedOnPermission();
              scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
            }
          };
        })
        .directive("secondaryDropdown",function($state){     //二级下拉菜单，必须满足data的格式[{style:图片样式，name：tab名称，content：[{name:二级菜单名},...]}...]
            return{
                restrict:'E',
                replace: false,
                scope:{
                    data:"=",
                    curState:"=",
                },
                controller:function($scope){
                    var viewObj = {};
                    $scope.datas = $scope.data;
                    $scope.setView = function(view){
                        if(!viewObj[view]){
                            viewObj[view] = true;
                        }else{
                            viewObj[view] = !viewObj[view];
                        }
                        $scope.viewObj = viewObj;
                   };

                   $scope.$watch("curState",function(){
                       $scope.selectData = $scope.curState;
                   })

                   $scope.curView = function($event,value){
                       $scope.selectData = value;
                       $state.go(value)
                       $scope.$emit("changeViewState",value);
                   }
                },
                templateUrl:"src/directives/tpls/secondary_dropdown.html"
            }
        })
        .directive("inputTab",function(){
            return{
                restrict:'A',
                link:function($scope,ele){
                    var inputs = $(ele).find("input");
                    inputs.focus(function(){
                        $(this).parent().addClass("active");
                    }).blur(function(){
                        $(this).parent().removeClass("active");
                    })
                }
            }
        })
        .directive("btnTab",function(){
            return{
                restrict:'E',
                scope:{
                    data:"=",
                    value:"=",
                },
                controller:function($scope){
                    $scope.datas = $scope.data;
                    $scope.selected = 0;
                },
                link:function($scope,ele){
                    $scope.btnClick = function($event,value,index){ //用$event来获取angular中的DOM
                        $scope.value = value.toString();
                        $scope.selected = index;
                    };
                },
                templateUrl:"src/directives/tpls/btn_tab.html"
            }
        })

    .directive("pagination",function(){
        return{
            restrict:'E',
            replace:true,
            scope:{
                options : "=" ,
                curPage : "=" ,
            },
            controller:function($scope){
                $scope.curPage = 1;
                $scope.isStart = true;

                $scope.$watch("options",function(newV,oldV){
                    var pagesNum = $scope.options.total_pages_num;
                    if($scope.curPage && $scope.options.per_page_num) {
                        if($scope.options.total_items_num == 0){
                            $scope.showDataNum = "0~0"
                        }else{
                            $scope.showDataNum = Number($scope.curPage * $scope.options.per_page_num) < Number($scope.options.total_items_num) ? (($scope.curPage - 1) * $scope.options.per_page_num + 1) + "~" + (($scope.curPage) * $scope.options.per_page_num) : (($scope.curPage - 1) * $scope.options.per_page_num + 1) + "~" + $scope.options.total_items_num;
                        }
                    }
                    var setBar = function(){
                        if(pagesNum < 5){                    //当页面小于5页时，显示应有页面数
                            for(var i=0 ;i<pagesNum ;i++){
                                $scope.lists[i] = {
                                    num : i ,
                                };
                            }
                        }else{                          //当页面大于5页时，显示5个页面数
                            if($scope.curPage-3 > 0){
                                if($scope.curPage+3 > pagesNum){
                                    for(var i=pagesNum-5 ;i<pagesNum ;i++){
                                        $scope.lists[i] = {
                                            num : i
                                        }
                                    }
                                }else{
                                    for(var i=$scope.curPage-3 ;i<$scope.curPage+2;i++){
                                        $scope.lists[i] = {
                                            num : i
                                        }
                                    }
                                }
                            }else{
                                for(var i=0 ;i<5 ;i++){
                                    $scope.lists[i] = {
                                        num : i
                                    }
                                }
                            }
                        }
                    }

                    $scope.lists = {};
                    $scope.pageNum = pagesNum;
                    setBar();                                //初置分页样式

                    $scope.getData = function($event,value){
                        $scope.lists = {};
                        $scope.curPage = value;
                        setBar();
                    }
                    $scope.getPreData = function(){
                        $scope.lists = {};
                        if($scope.curPage>1){
                            $scope.curPage -= 1;
                        }
                        setBar();
                    }
                    $scope.getNextData = function(){
                        $scope.lists = {};
                        if($scope.curPage<pagesNum){
                            $scope.curPage += 1;
                        }
                        setBar();
                    }
                })
            },
            link:function($scope,ele,attr){
            },
            templateUrl:"src/directives/tpls/pagination.html"
        }
    })

    .directive("datePicker",function(){
        return{
            restrict:'E',
            scope:{
                dt:"=",
                mindt:"@"
            },
            controller:function($scope){
                $scope.datas = $scope.data;
                $scope.today = function() {
                    $scope.dataStart = new Date();
                    $scope.dataEnd = new Date();
                  };
                  $scope.today();
                  $scope.minDate = !!$scope.mindt ? new Date($scope.mindt) : new Date();
                  $scope.dateOptions = {
                    // dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    // minDate: new Date(1970, 5, 22),
                    minDate: $scope.minDate,
                    startingDay: 1,
                    showbuttonbar:false,
                    showWeeks: false
                  };

                  function disabled(data) {
                    var date = data.date,
                      mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                  }

                  $scope.open = function() {
                    $scope.popup.opened = true;
                  };


                  $scope.setDate = function(year, month, day) {
                    $scope.dt = new Date(year, month, day);
                  };
                  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                  $scope.format = $scope.formats[1];
                  $scope.altInputFormats = ['M!/d!/yyyy'];

                  $scope.popup = {
                    opened: false
                  };
            },
            templateUrl:"src/directives/tpls/datepicker.html"
        }
    })
    .directive('modal',function(){
        return{
            restrict:"E",
            scope:{
                data:"="
            },
            controller: function ($scope,$state) {
                $scope.jumpTo = function (state) {
                    if (!!state) {
                        $state.go(state);
                    }
                }
            },
            templateUrl:"src/directives/tpls/modal.html"
        }
    })
    .directive('select2', function () {
        return {
            restrict: 'A',
            scope: {
                config: '=',
                ngModel: '=',
                select2Model: '=',
                handle: '&'
            },
            link: function (scope, element, attrs) {
                // 初始化
                var tagName = element[0].tagName,
                    config = {
                        allowClear: true,
                        multiple: !!attrs.multiple,
                        placeholder: attrs.placeholder || ' '   // 修复不出现删除按钮的情况
                    };

                // 生成select
                if(tagName === 'SELECT') {
                    // 初始化
                    var $element = $(element);
                    delete config.multiple;

                    $element
                        .prepend('<option value="1212" ng-if="false"></option>')//避免出现空的选项
                        .val('')
                        .select2(config);

                    // model - view
                    scope.$watch('ngModel', function (newVal) {
                        setTimeout(function () {
                            console.log(newVal);
                            $element.find('[value^="?"]').remove();    // 清除错误的数据
                            scope.ngModel = $($($element.children('[selected="selected"]'))[0]).html();
                        },0);
                    }, true);

                    $element.on('change', function () {
                      console.log('newVal');
                      scope.$apply(function () {
                          ngModel = $($($element.children('[selected="selected"]'))[0]).html();
                      });
                    });

                    return false;
                }
        // 处理input
                if(tagName === 'INPUT') {
                    // 初始化
                    var $element = $(element);

                    // 获取内置配置
                    if(attrs.query) {
                        scope.config = select2Query[attrs.query]();
                    }

                    // 动态生成select2
                    scope.$watch('config', function () {
                        angular.extend(config, scope.config);
                        $element.select2('destroy').select2(config);
                    }, true);

                    // view - model
                    $element.on('change', function () {
                        scope.$apply(function () {
                            scope.select2Model = $element.select2('data');
                        });
                    });

                    // model - view
                    scope.$watch('select2Model', function (newVal) {
                        $element.select2('data', newVal);
                    }, true);

                    // model - view
                    scope.$watch('ngModel', function (newVal) {
                        // 跳过ajax方式以及多选情况
                        if(config.ajax || config.multiple) { return false }

                       // $element.select2('val', newVal);
                    }, true);
                }
            }
        }
    })




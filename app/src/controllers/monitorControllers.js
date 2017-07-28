'use strict';
angular.module('myApp.monitorControllers', [
        'myApp.services',
        'app.filters'
])
  .controller("memberCtrl",['$scope','$filter','memberService','orderService', function ($scope,$filter,memberService,orderService) {
    $scope.titles = [{
      'name': 'date',
      'prop': '时间'
    },{
      'name': 'demMember',
      'prop': '需方会员'
    },{
      'name': 'supMember',
      'prop': '供方会员'
    },{
      'name': 'currency',
      'prop': '流通笔数'
    }];
    $scope.totalItems = 0;
    $scope.curPageNum = 1;
    $scope.pageOptions = {};
    var modalData = {
        templateUrl : './src/templates/modalViews/addToCartTipModal.html',
        content : ''
    };



    $scope.labels = ["7:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
      $scope.series = ['Series A'];
      $scope.data = [
        [645, 579, 820, 801, 566, 575, 430]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: false,
              position: 'right'
            }
          ]
        }
      };




      $scope._demMemId = '0000109';
      $scope._supMemId = '0000139';
      $scope.dateStar = new Date();
      $scope.dateEnd = new Date();

      memberService.get({detail:""},function (resp) {
        console.log(resp);
        $scope.demMemIds = resp.data;
      });

      $scope.$watch('_demMemId', function(newValue, oldValue) {
        memberService.get({detail:"member",mem_id:$scope._demMemId},function (resp) {
          console.log(resp);
          $scope.supMemIds = resp.data;
        });
      });

      $scope.getDatas = function (pageNo) {

        var _dateStar = $filter('appDateTimeFilter')(new Date($scope.dateStar), 0);
        var _dateEnd = $filter('appDateTimeFilter')(new Date($scope.dateEnd), 23);

        if (new Date(_dateEnd).getTime() - new Date(_dateStar).getTime() < 0) {
          modalData.content = "终止日期应在开始日期之后";
          $scope.$emit("setModalState", modalData);
          return;
        }


        orderService.save({
            detail:"detail",
            sta_type: 1,
            isPage:true,
            pageNo: pageNo || 1,
            pageSize:10,
            dem_mem_id: $scope._demMemId,
            sup_mem_id: $scope._supMemId,
            beginTime: $filter('appDateFilter')(new Date(_dateStar), true),
            endTime: $filter('appDateFilter')(new Date(_dateEnd), true)
          },function(resp){
          console.log(resp);
          $scope.dataList = resp.data.list;
          $scope.totalItems = resp.data.total_count;
          $scope.pageOptions = {
              "total_items_num": resp.data.total_count,   //总共的data数量
              "total_pages_num": resp.data.total_page,  //总共的page数量
              "per_page_num": resp.data.page_size                          //单页page的data数量
          };
        });


        orderService.get({
            detail:"group",
            sta_type: 1,
            dem_mem_id: $scope._demMemId,
            sup_mem_id: $scope._supMemId,
            beginTime: $filter('appDateFilter')(new Date(_dateStar), true),
            endTime: $filter('appDateFilter')(new Date(_dateEnd), true)
          },function(resp){
          console.log(resp);
          $scope.chartDatas = resp.data;
        });

      };

      $scope.$watch("curPageNum", function () {
        $scope.getDatas($scope.curPageNum);
      });

  }])

  .controller("orderCurrencyCtrl",['$scope','$filter','orderService','memberService', function ($scope,$filter,orderService,memberService) {
    $scope.titles = ['时间','配送任务','互联对象','需方会员','供方会员','需方请求数','成功命中','请求供方','成功缓存','失败缓存'];
    $scope.totalItems = 0;
    $scope.curPageNum = 1;
    $scope.pageOptions = {};
    $scope.dateStar = new Date();
    $scope.dateEnd = new Date();


    memberService.get({detail:"orders",mem_id:'0000079'},function (resp) {
      // console.log(resp);
      $scope.orderIds = resp.data;
    });

    $scope.getDatas = function (statisticsType,search) {
        var options1, options2 = {};


        if (!!search) {
          var _dateStar = $filter('appDateTimeFilter')(new Date($scope.dateStar),0);
          var _dateEnd = $filter('appDateTimeFilter')(new Date($scope.dateEnd),24);

          if (new Date(_dateEnd).getTime()-new Date(_dateStar).getTime() < 0) {
              modalData.content = "终止日期应在开始日期之后";
              $scope.$emit("setModalState",modalData);
              return ;
          }

          if (2 === statisticsType) {
            options1 = {
              detail:"group",
              sta_type:statisticsType,
              order_id: $scope._orderId,
              beginTime: $filter('appDateFilter')(new Date(_dateStar),true),
              endTime: $filter('appDateFilter')(new Date(_dateEnd),true)
            };
          }

          options2 = {
            detail:"",
            order_id: $scope._orderId,
            beginTime: $filter('appDateFilter')(new Date(_dateStar),true),
            endTime: $filter('appDateFilter')(new Date(_dateEnd),true),
            isPage:true,
            pageNo:1,
            pageSize:10
          };
        }
        $scope.detailDatas = [];
        orderService.get(options2, function (resp) {
          console.log(resp);
          $scope.detailDatas = resp.data.list;
          $scope.dataList = resp.data.list;
          $scope.totalItems = resp.data.total_count;
          $scope.pageOptions = {
              "total_items_num": resp.data.total_count, //总共的data数量
              "total_pages_num": resp.data.total_page,  //总共的page数量
              "per_page_num": resp.data.page_size       //单页page的data数量
          };
        });

        orderService.get(options1, function (resp) {
          console.log(resp);
          $scope.summaryDatas = resp.data;
          $scope.summaryDatas.orderId = $scope._orderId;
        });



      };

      // $scope.getDatas();

  }])

  .controller("monitorNodesCtrl", ['$scope','$filter','monitorNodesService','memberService', function ($scope,$filter,monitorNodesService,memberService) {
    $scope.titles = ['IP','名称' ,'节点类型' ,'创建日期' ,'创建者' ,'状态' ,'最后操作日期' ,'最后操作者' ,'操作'];
    $scope.totalItems = 0;
    $scope.curPageNum = 1;
    $scope.pageOptions = {};
    $scope._memId = '';
    $scope._nodeId = '';
    $scope._nodeType = '';
    $scope._nodeIp = '172.22.57.82';
    $scope.dateStar = new Date();
    $scope.dateEnd = new Date();
    var modalData = {
        templateUrl : './src/templates/modalViews/addToCartTipModal.html',
        content : ''
    };
    // monitorNodesService.get({detail:"",isPage:true,pageNo:1,pageSize:10}, function (resp) {
    //   console.log(resp);
    //   $scope.dataList = resp.data.list;
    //   $scope.totalItems = resp.data.total_count;
    //   $scope.pageOptions = {
    //       "total_items_num": resp.data.total_count,   //总共的data数量
    //       "total_pages_num": resp.data.total_page,  //总共的page数量
    //       "per_page_num": resp.data.page_size                          //单页page的data数量
    //   };
    // });
    $scope.getMemId = function () {
      memberService.get({detail:""}, function (resp) {
        console.log(resp.data);
        $scope.memId = resp.data;
      })

    };
    $scope.getMemId();

    $scope.$watch('_memId', function (newVal) {
      console.log(newVal);
    });
    $scope.$watch('_nodeId', function (newVal,oldVal) {
      console.log(newVal);
    });

    $scope.nodeDatas = [];
    $scope.getNodeId = function () {
      monitorNodesService.get({detail:"",mem_id:'0000109'}, function (resp) {
        // console.log(resp.data);
        for (var i = resp.data.length - 1; i >= 0; i--) {
          $scope.nodeDatas.push(resp.data[i].node_id);
        }
        // console.log($scope.nodeDatas);
      });
    };
    $scope.getNodeId();

    $scope.getDatas = function (search) { //是否带搜索条件
      var options = {detail:"",isPage:true,pageNo:1,pageSize:10};
      if (!!search) {
        if (new Date($scope.dateEnd).getTime()-new Date($scope.dateStar).getTime() < 0) {
            modalData.content = "终止日期应在开始日期之后";
            $scope.$emit("setModalState",modalData);
            return ;
        }
        angular.extend(options,{
          mem_id: $scope._memId,
          node_id: $scope._nodeId,
          svc_type: $scope._nodeType,
          out_ip: $scope._nodeIp,
          beginTime: $filter('appDateFilter')(new Date($scope.dateStar)),
          endTime: $filter('appDateFilter')(new Date($scope.dateEnd))
        });
      }
      monitorNodesService.get(options, function (resp) {
        console.log(resp);
        $scope.dataList = resp.data.list;
        $scope.totalItems = resp.data.total_count;
        $scope.pageOptions = {
            "total_items_num": resp.data.total_count,   //总共的data数量
            "total_pages_num": resp.data.total_page,  //总共的page数量
            "per_page_num": resp.data.page_size                          //单页page的data数量
        };
      });
    };

    $scope.getDatas();

    $scope.clearSearchDatas = function () {
      $scope._memId ='',
      $scope._nodeId ='',
      $scope._nodeType ='',
      $scope._nodeIp ='',
      $scope.dateStar ='',
      $scope.dateEnd =''
    }


  }])
  .controller("frontNodesCtrl", ['$scope','$filter','monitorNodesService','memberService','frontNodesService','servicesDatasService', function ($scope,$filter,monitorNodesService,memberService,frontNodesService,servicesDatasService) {
    $scope.dateStar = new Date();
    $scope.dateEnd = new Date();
    var modalData = {
        templateUrl : './src/templates/modalViews/addToCartTipModal.html',
        content : ''
    };

    $scope.getMemId = function () {
      memberService.get({detail:""}, function (resp) {
        console.log(resp.data);
        $scope.memIds = resp.data;
      })

    };
    $scope.getMemId();

    $scope.nodeDatas = [];
    $scope.getNodeId = function () {
      monitorNodesService.get({detail:"",mem_id:'0000109'}, function (resp) {
        for (var i = resp.data.length - 1; i >= 0; i--) {
          $scope.nodeDatas.push(resp.data[i].node_id);
        }
      });
    };
    $scope.getNodeId();

    $scope.newestPerformanceData = {
      'cpu_rate' : 0,
      'disk_rate' : 0,
      'memory_rate' : 0,
      'load_avg_1' : 0,
      'load_avg_5' : 0,
      'load_avg_15' : 0
    };

    $scope.performanceDatas = [];
    $scope.servicesDatas = [];
    $scope.getDatas = function () {
      if (new Date($scope.dateEnd).getTime()-new Date($scope.dateStar).getTime() < 0) {
          modalData.content = "终止日期应在开始日期之后";
          $scope.$emit("setModalState",modalData);
          return ;
      }

      monitorNodesService.get({
          detail:'',
          mem_id: $scope._memId,
          node_id: $scope._nodeId,
      }, function (resp) {
          console.log(resp);
          $scope.serverDatas = resp.data[0];
        });

      frontNodesService.get({
          detail:'',
          isPage: true,
          pageNo:1,
          pageSize:20,
          mem_id: $scope._memId,
          node_id: $scope._nodeId,
          beginTime: $filter('appDateFilter')(new Date($scope.dateStar)),
          endTime: $filter('appDateFilter')(new Date($scope.dateEnd))
      }, function (resp) {
          $scope.performanceDatas = resp.data.list;
          console.log($scope.performanceDatas[0]);
          $scope.newestPerformanceData = $scope.performanceDatas[0];
        });



      $scope.newestservicesDatas = {
        'process_num': 0,
        'redis_mem': 0,
        'qps_succ': 0
      };
      servicesDatasService.get({
          detail:'',
          isPage: true,
          pageNo:1,
          pageSize:20,
          mem_id: $scope._memId,
          node_id: $scope._nodeId,
          beginTime: $filter('appDateFilter')(new Date($scope.dateStar)),
          endTime: $filter('appDateFilter')(new Date($scope.dateEnd))
      }, function (resp) {
          $scope.servicesDatas = resp.data.list;
          console.log($scope.servicesDatas[0]);
          $scope.newestservicesDatas = $scope.servicesDatas[0];
        });
    };


    $scope.p_labels = [];
    $scope.s_labels = [];
    $scope.series = ['Series A'];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: false,
            position: 'right'
          }
        ]
      }
    };

    $scope.cpuDatas = [];
    $scope.diskDatas = [];
    $scope.memoryDatas = [];
    $scope.load_avg_15Datas = [];

    $scope.$watch('performanceDatas', function () {
      var p_length = $scope.performanceDatas.length;
      for (var i = p_length - 1; i >= 0; i--) {
        $scope.cpuDatas.push($scope.performanceDatas[i].cpu_rate);
        $scope.memoryDatas.push($scope.performanceDatas[i].memory_rate);
        $scope.diskDatas.push($scope.performanceDatas[i].disk_rate);
        $scope.load_avg_15Datas.push($scope.performanceDatas[i].load_avg_15);
        $scope.p_labels.unshift(i+1);
      }
    });

    $scope.processDatas = [];
    $scope.redisDatas = [];
    $scope.qpsDatas = [];

    $scope.$watch('servicesDatas', function () {
      var s_length = $scope.servicesDatas.length;
      for (var i = s_length - 1; i >= 0; i--) {
        $scope.processDatas.push($scope.servicesDatas[i].process_num);
        $scope.redisDatas.push($scope.servicesDatas[i].redis_mem);
        $scope.qpsDatas.push($scope.servicesDatas[i].qps_succ);
        $scope.s_labels.unshift(i+1);
      }
    });


  }])



'use strict';
angular.module('myApp.monitorControllers', [
        'myApp.services',
        'app.filters'
])
  .controller("memberCtrl",['$scope','memberService', function ($scope,memberService) {
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

    memberService.get({detail:""},function(resp){
      console.log(resp);
      $scope.dataList = resp.data.list;
      $scope.totalItems = resp.data.total_count;
      $scope.pageOptions = {
          "total_items_num": resp.data.total_count,   //总共的data数量
          "total_pages_num": resp.data.total_page,  //总共的page数量
          "per_page_num": resp.data.page_size                          //单页page的data数量
      };
    });


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

  }])

  .controller("orderCtrl",['$scope','orderService', function ($scope,orderService) {
    $scope.titles = ['时间','配送任务','互联对象','需方会员','供方会员','需方请求数','成功命中','请求供方','成功缓存','失败缓存'];
    $scope.totalItems = 0;
    $scope.curPageNum = 1;
    $scope.pageOptions = {};

    orderService.get({detail:""},function(resp){
      console.log(resp);
      $scope.dataList = resp.data.list;
      $scope.totalItems = resp.data.total_count;
      $scope.pageOptions = {
          "total_items_num": resp.data.total_count,   //总共的data数量
          "total_pages_num": resp.data.total_page,  //总共的page数量
          "per_page_num": resp.data.page_size                          //单页page的data数量
      };
    });
  }])

  .controller("monitorNodesCtrl", ['$scope','monitorNodesService', function ($scope,monitorNodesService) {
    $scope.titles = ['IP','名称' ,'节点类型' ,'创建日期' ,'创建者' ,'状态' ,'最后操作日期' ,'最后操作者' ,'操作'];
    $scope.totalItems = 0;
    $scope.curPageNum = 1;
    $scope.pageOptions = {};
    monitorNodesService.get({detail:"",isPage:true,pageNo:1,pageSize:10}, function (resp) {
      console.log(resp);
      $scope.dataList = resp.data.list;
      $scope.totalItems = resp.data.total_count;
      $scope.pageOptions = {
          "total_items_num": resp.data.total_count,   //总共的data数量
          "total_pages_num": resp.data.total_page,  //总共的page数量
          "per_page_num": resp.data.page_size                          //单页page的data数量
      };
    });

  }])
  .controller("frontNodesCtrl", ['$scope','monitorNodesService', function ($scope,monitorNodesService) {

  }])



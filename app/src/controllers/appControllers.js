'use strict';

angular.module('myApp.appControllers', [
        'myApp.services',
        'myApp.apiServices'
    ])
    .controller('appCtrl', ['$scope','$state', '$filter','localStorageService',function ($scope,$state, $filter,localStorageService) {

    }])
    .controller('dashboardCtrl', ['$scope', function ($scope){
      $scope.aside = {};
      $scope.aside.shortType = false;

    }])
    .controller('dashboardAsideCtrl', ['$scope', 'dashboardNavService', function ($scope,dashboardNavService){
      $scope.dashboard_nav_datas = dashboardNavService.dashboard_nav_datas;
    }])
    .controller('dashboardMainCtrl', ['$scope', function ($scope){

    }])



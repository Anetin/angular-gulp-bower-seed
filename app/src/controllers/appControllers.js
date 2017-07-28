'use strict';

angular.module('myApp.appControllers', [
        'myApp.services',
        'myApp.apiServices'
    ])
    .controller('appCtrl', ['$rootScope','$scope','$state', '$filter','localStorageService','AUTH_EVENTS',function ($rootScope,$scope,$state, $filter,localStorageService,AUTH_EVENTS) {
      $scope.$on(AUTH_EVENTS.loginSuccess,function(){
          console.log($state.current.name);
          if ("login" === $state.current.name) {
              $state.go("monitor.member");
          }
          if (!!$rootScope.redirectState && $rootScope.redirectState !== "login") {
              $state.go($rootScope.redirectState);
          }

      });

      $scope.$on("reLogin",function(event,data){
          console.log($state.current.name);
          $rootScope.redirectState = $state.current.name;
          $state.go("login");
      });
      $scope.$on("denied",function(event,data){
          $state.go("dls.denied");
      });

      $scope.$on('setModalState',function(event,data){  //设置全局的模态框
          $('#myModal').modal('toggle').addClass('modal-mid');
          $scope.modalData = data;
      });

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
    .controller('loginCtrl', ['$scope','$rootScope','AUTH_EVENTS','loginService', function ($scope,$rootScope,AUTH_EVENTS,loginService){
      $scope.credentials = {
        username: 'xintangli',
        pwdInput: '123456',
      };

      $scope.login = function (credentials) {
        console.log(credentials);

        loginService.save({detail: "",username:credentials.username,password:credentials.pwdInput}, function (resp) {

          console.log(resp);
          if (401 === resp.status) {
            $scope.createCode();
            $scope.credentialsShow = true;
            return;
          }
          console.log("login succeed");
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          var data = resp.data[0];
          // for (var i = 0, rights = {},len = data.perms.length; i < len; i++) {
          //   rights[String(data.perms[i][0])] = data.perms[i][1];
          // }
          // localStorageService.set('username', data.username);
          // localStorageService.set('memName',  data.memName);
          // localStorageService.set('memDept',  data.memDept);
          // localStorageService.set('cartNum',  data.cartNumber);
          // localStorageService.set('permissionList',  rights);

          // $rootScope.currentUser.username  = data.username;
          // $rootScope.currentUser.company   = data.memName;
          // $rootScope.currentUser.apartment = data.memDept;
          // $rootScope.cartNum = data.cartNumber;
          // $rootScope.permissionList = rights;
        });

      };
    }])




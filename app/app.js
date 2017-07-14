'use strict';

angular.module('myApp', [
  'ngCookies',
  'LocalStorageModule',
  'ui.router',
  'ui.bootstrap',
  'myApp.directives',
  'app.services.util',
  'myApp.appControllers',
  'myApp.services',
  'app.filters',
  'angular-md5'
])
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('sessionStorage');
})
.config(["$httpProvider", function ($httpProvider) {
　 //更改 Content-Type
   $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
   $httpProvider.defaults.headers.post["Accept"] = "*/*";
   $httpProvider.defaults.transformRequest = function (data) {
       if (data !== undefined) {
           return $.param(data);
       }
       return data;
   };

   $httpProvider.interceptors.push(function($q,$rootScope,$cookies) {
     return {
       responseError: function(err){
            // console.log(err);
             if(-1 === err.status) {
               console.log("远程服务器无响应");
             } else if(401 === err.status) {
               console.log("用户登录过期");
               $rootScope.$broadcast("reLogin");
             } else if(403 === err.status) {
               console.log("用户无权限访问");
               $rootScope.$broadcast("denied");
             }
             return $q.reject(err);
        }
     };
   });
}])
.run(['$rootScope', '$location','$state','csrfService','permissions',function($rootScope, $location, $state,csrfService,permissions){
  $rootScope.$on('$stateChangeSuccess', function(scope, next, nextParams, current, currentParams) {
    var userPermission = next.permission;


    if (!!userPermission && !permissions.hasPermission(userPermission)) {
      $state.go("app.denied");

    }


  });
}])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state("login", {
          url: "/login",
          views: {
              "": {
                templateUrl: "./src/templates/login.html"
              }
          }
      })
      .state("monitor",{
          url:"/monitor",
          templateUrl: "./src/templates/dashboard.html",
      })
      .state("monitor.denied",{
          url:"/denied",
          templateUrl: "./src/templates/noRight.html",
      })
      .state("monitor.member",{
          url:"/member",
          views:{
              "":{
                  template:"<div ui-view='detail'></div>"
              }
          }
      })

      .state("app.page1.welcome",{
          url:"/welcome",
          views:{
              "detail":{
                  templateUrl:"./src/templates/page1Views/page1_welcome.html"
              }
          }
      })
      .state("app.page1.welcome.item",{
          url:"/item",
          views:{
              "":{
                  templateUrl:"./src/templates/tradeViews/trade_welcome_item.html"
              }
          }
      })
      ;
      $urlRouterProvider.otherwise("/login");
})



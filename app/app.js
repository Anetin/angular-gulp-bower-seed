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
  'angular-md5',
  'chart.js'
])
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('sessionStorage');
})
.config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
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
// .config(['$locationProvider', function ($locationProvider) {
//     $locationProvider.html5Mode(true);
// }])
.config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
  $stateProvider
      .state("login", {
          url: "/login",
          views: {
              "": {
                templateUrl: "./src/templates/login.html"
              }
          }
      })




      ;
      $urlRouterProvider.otherwise("/login");
      // $locationProvider.html5Mode(true);
})



'use strict';

angular.module('app.services.util', [])
  .factory('appUtil', function(){
    var self = {};
    self.namePattern = /^(\w)*[^\<\>]*(\w)*$/;
    return self;
  })
  .factory('Excel', function ($window) {
       var uri = 'data:application/vnd.ms-excel;base64,',
           template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
           base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
           format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
       return {
           tableToExcel: function (tableId, worksheetName) {
               var table = $(tableId);
               var tableTemp = $("<div></div>");
               var tableHtml = table.html()
               tableTemp.html(tableHtml);

               //选择行
               var trs = tableTemp.find('tr');
               var trsLen = trs.length;
               var miss = table.attr("exporterSuppressColumns");//不需要导出的
               var misLen = miss ? miss.length : 0;

               for(var i=1; i<trsLen; i++){
                   for(var j=misLen-1; j>=0; j--){
                       if(i==1){
                           $($(trs[0]).find('th:eq('+miss[j]+')')[0]).remove()
                       }
                       $($(trs[i]).find('td:eq('+miss[j]+')')[0]).remove()
                   }
               }

               if(trsLen>1){
                   var ctx = { worksheet: worksheetName, table: tableTemp.html() };
                   var href = uri + base64(format(template, ctx));
                   return href;
               }
            }
       };
    })
  .constant('API','/api') //开发环境
   //.constant('API','') //部署
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    member: 'member'
  })

  .factory('permissions', function ($rootScope) {
    return {
        setPermissions: function(permissions) {
          $rootScope.permissionList = permissions;
          $rootScope.$broadcast('permissionsChanged')
        },
        hasPermission: function (permission) {
          permission = angular.isString(permission) && permission.trim();
          return !!$rootScope.permissionList && !!$rootScope.permissionList[permission];
        }
    };
  })

  .factory('dlsAPI', function (API) {
  	var dlsAPI= {};
  	dlsAPI.packApi = function (api) {
  		return API+api;
  	}
  	return dlsAPI;
  })
  .factory('csrfService', ['$http','dlsAPI', function ($http,dlsAPI) {
  	var csrfService = {};
  	csrfService.token = function () {
      var apiUrl=dlsAPI.packApi('/');
  		return $http
  		  .get(apiUrl)
  		  .then(function (resp) {
  		  	return resp;
  		  });
  	};
  	return csrfService;
  }])
  .factory('AuthService', ['$rootScope','$http', 'md5','Session', 'dlsAPI', function ($rootScope,$http,md5,Session,dlsAPI) {
    var authService = {};


    authService.login = function (credentials) {
      var pwdInput = md5.createHash(credentials.pwdInput || '');
      var username = credentials.username;
      var apiUrl = "";
      apiUrl = dlsAPI.packApi('/user_login/');


      return $http
        .post(apiUrl, {
            "username":username,
            "pwdInput":pwdInput
        })
        .then(function (res) {
          return res.data;
        },function (err) {
        	return err;
        });
    };

    authService.isAuthenticated = function () {
      return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };
    return authService;
  }])
  .service('Session', ['$cookies', function ($cookies) {
    this.create = function (sessionId, userId, userRole,rights) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
      this.rights = rights;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
      this.rights = null;
    };

    return this;
  }]);




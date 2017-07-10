/**
 * Created by oxygen on 2017/4/21.
 */
angular.module('myApp.apiServices', [
    "ngResource"
])
    .service("logInService",function(dlsAPI,$resource){
        var api = dlsAPI.packApi("/:detail")
        return $resource(api,{detail:"@detail"})
    })
    .service("tradeMallService",function(dlsAPI,$resource,$rootScope){
        var api = dlsAPI.packApi("/mall/:detail");
        return $resource(api,{detail:"@detail"},{
            save: {
                method: 'POST',
                cache:true,
                transformResponse: function (response) {
                  var resp = JSON.parse(response);
                  return {
                    data: resp.data,
                    msg:resp.msg,
                    status:resp.status
                  };
                }
            }
        });
    })
    .service("providerService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/sup/:detail");
        return $resource(api,{detail:"@detail"});
    })






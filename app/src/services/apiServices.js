/**
 * Created by oxygen on 2017/4/21.
 */
angular.module('myApp.apiServices', [
    "ngResource"
])
    .service("loginService",function(dlsAPI,$resource){
        var api = dlsAPI.packApi("/login/:detail")
        return $resource(api,{detail:"@detail"})
    })
    .service("memberCurrencyService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/v2/busiDatas/group/:detail");
        return $resource(api,{detail:"@detail"});
    })
    .service("orderService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/v2/busiDatas/:detail");
        return $resource(api,{detail:"@detail"});
    })
    .service("monitorNodesService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/v2/hosts/:detail");
        return $resource(api,{detail:"@detail"});
    })
    .service("memberService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/v2/members/:detail");
        return $resource(api,{detail:"@detail"});
    })
    .service("frontNodesService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/v2/sysDatas/:detail");
        return $resource(api,{detail:"@detail"});
    })
    .service("servicesDatasService",function($resource,dlsAPI){
        var api = dlsAPI.packApi("/v2/servicesDatas/:detail");
        return $resource(api,{detail:"@detail"});
    })











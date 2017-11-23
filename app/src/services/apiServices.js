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









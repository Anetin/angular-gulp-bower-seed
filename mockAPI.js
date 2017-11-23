//mockAPI.js

var fs = require('fs');
var path = require('path');

var mockbase = path.join(__dirname, 'app/data');

var mockApi = function(res, pathname, paramObj, next) {

    var pattern=new RegExp('api/');
    pathname=pathname.replace(/%2F/g, "/");
    if (pattern.test(pathname)) {
        switch (pathname) {

            case '/api/':
                var data = fs.readFileSync(path.join(mockbase, 'csrfToken.json'), 'utf-8');
                res.writeHead(200,{
                    "Content-type":"application/json;charset=UTF-8"
                });
                res.write(data);
                res.end();
                return ;

            case '/api/login':
                var data = fs.readFileSync(path.join(mockbase, 'login.json'), 'utf-8');
                res.writeHead(200,{
                    "Content-type":"application/json;charset=UTF-8"
                });
                res.write(data);
                res.end();
                return ;

            case '/api/v2/busiDatas':
                var data = fs.readFileSync(path.join(mockbase, 'orderLists.json'), 'utf-8');
                res.writeHead(200,{
                    "Content-type":"application/json;charset=UTF-8"
                });
                res.write(data);
                res.end();
                return ;

                case '/api/v2/busiDatas/group':
                var data = fs.readFileSync(path.join(mockbase, 'memberLists.json'), 'utf-8');
                res.writeHead(200,{
                    "Content-type":"application/json;charset=UTF-8"
                });
                res.write(data);
                res.end();
                return ;


            default:
                ;
        }
    }
    next();
};

module.exports = mockApi;

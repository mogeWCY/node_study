var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer();

server.on('request', (req, res) => {
    var urlPath = url.parse(req.url).pathname;
    var qs = querystring.parse(req.url.split('?')[1]);

    if(urlPath === '/jsonp' && qs.callback){
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
        var data = {
            name: 'wcy',
            age: 10
        }

        data = JSON.stringify(data);

        var callback = qs.callback + '('+ data +')';
        res.end(callback);
    }else if(urlPath === '/api'){
        var serviceFn = qs.m;
        var param = {};
        for(var key in qs){
            key !='m' && (param[key] = qs[key]);
        }
        var json = serviceMap[serviceFn](param);
            
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {"Content-Type": "application/json"});  
        res.end(JSON.stringify(json));
    }else{
        res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        res.end('<h1>hello world</h1>');
    }
})

function genMockData() {
    var num = Math.random() * 10;
}


var serviceMap = {
    getUserInfo: function(data) {
        return data;
    }
}
server.listen('9001');
console.log('服务器开启了');